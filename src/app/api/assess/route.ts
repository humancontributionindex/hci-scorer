import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "@/lib/system-prompt";
import { DIMENSIONS } from "@/lib/constants";
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
    const { text, researchField } = body;

    if (!researchField || typeof researchField !== "string" || !researchField.trim()) {
      return NextResponse.json(
        { error: "Research field is required." },
        { status: 400 }
      );
    }

    if (!text || typeof text !== "string" || text.trim().length < 500) {
      return NextResponse.json(
        { error: "Text must be at least 500 characters." },
        { status: 400 }
      );
    }

    const trimmedText = text.trim().slice(0, 50000);

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const result = await model.generateContent(trimmedText);
    const rawText = result.response.text();

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      // Fallback: strip markdown fencing if present
      const cleaned = rawText.replace(/```json\n?|```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    }

    // Compute HCI midpoint for storage
    let hciScore: number | null = null;
    const dims = parsed.dimensions;
    if (dims) {
      let weightedSum = 0;
      let totalWeight = 0;
      for (const dim of DIMENSIONS) {
        const d = dims[dim.key];
        if (d && d.score !== null && d.score !== undefined) {
          weightedSum += d.score * dim.weight;
          totalWeight += dim.weight;
        }
      }
      if (totalWeight > 0) {
        hciScore = Math.round((weightedSum / totalWeight) * 100) / 100;
      }
    }

    // Save assessment to DB (fire-and-forget)
    getSupabase()
      .from("assessments")
      .insert({
        research_field: researchField.trim().slice(0, 200),
        conceptual_direction: dims?.conceptual_direction?.score ?? null,
        creative_synthesis: dims?.creative_synthesis?.score ?? null,
        critical_judgment: dims?.critical_judgment?.score ?? null,
        ethical_reasoning: dims?.ethical_reasoning?.score ?? null,
        scholarly_voice: dims?.scholarly_voice?.score ?? null,
        hci_score: hciScore,
        confidence: parsed.confidence ?? null,
        overall_note: parsed.overall_note ?? null,
      })
      .then(({ error: insertError }) => {
        if (insertError) console.error("Assessment insert failed:", insertError);
      });

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
