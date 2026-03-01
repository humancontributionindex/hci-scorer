import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "@/lib/system-prompt";
import { getSupabase } from "@/lib/supabase";

const rateLimitMap = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return true;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { text, reflection } = body;

    if (!text || typeof text !== "string" || text.trim().length < 500) {
      return NextResponse.json(
        { error: "Text must be at least 500 characters." },
        { status: 400 }
      );
    }

    const trimmedText = text.trim().slice(0, 50000);

    let userMessage = trimmedText;
    if (reflection && typeof reflection === "string" && reflection.trim()) {
      userMessage = `RESEARCHER'S STATED INTELLECTUAL DECISION:\n${reflection.trim().slice(0, 1000)}\n\nTEXT TO ANALYZE:\n${trimmedText}`;
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const result = await model.generateContent(userMessage);
    const rawText = result.response.text();

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      // Fallback: strip markdown fencing if present
      const cleaned = rawText.replace(/```json\n?|```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    }

    // Increment counter (fire-and-forget)
    getSupabase().rpc("increment_counter").then(({ error: rpcError }) => {
      if (rpcError) console.error("Counter increment failed:", rpcError);
    });

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Assessment error:", err);
    return NextResponse.json(
      { error: "Assessment failed. Please try again." },
      { status: 500 }
    );
  }
}
