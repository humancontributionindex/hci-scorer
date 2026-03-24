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
  if (recent.length >= MAX_REQUESTS) {
    rateLimitMap.set(ip, recent);
    return true;
  }
  if (recent.length === 0) {
    rateLimitMap.delete(ip);
  } else {
    recent.push(now);
    rateLimitMap.set(ip, recent);
  }
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

    // Compute HCI score on 0–100 scale
    const dims = parsed.dimensions;
    let hciScore: number | null = null;
    if (dims) {
      let weightedSum = 0;
      let totalWeight = 0;
      for (const dim of DIMENSIONS) {
        const d = dims[dim.key];
        if (d && d.score != null) {
          const numScore =
            typeof d.score === "string" ? parseFloat(d.score) : d.score;
          if (!isNaN(numScore)) {
            weightedSum += numScore * dim.weight;
            totalWeight += dim.weight;
          }
        }
      }
      if (totalWeight > 0) {
        const normalized = weightedSum / totalWeight;
        hciScore = Math.round(normalized * 20);
      }
    }

    // Save assessment to DB (fire-and-forget)
    getSupabase()
      .from("assessments")
      .insert({
        research_field: researchField.trim().slice(0, 200),
        epistemic_agency: dims?.epistemic_agency?.score ?? null,
        cognitive_transformation: dims?.cognitive_transformation?.score ?? null,
        methodological_autonomy: dims?.methodological_autonomy?.score ?? null,
        original_synthesis: dims?.original_synthesis?.score ?? null,
        metacognitive_oversight: dims?.metacognitive_oversight?.score ?? null,
        hci_score: hciScore,
        agency_tier:
          hciScore !== null
            ? hciScore >= 80
              ? "high"
              : hciScore >= 60
                ? "hybrid"
                : "low"
            : null,
        confidence: parsed.confidence ?? null,
        overall_note: parsed.overall_note ?? null,
        scoring_version: 2,
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
