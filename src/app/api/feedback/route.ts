import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { feedback_text } = await request.json();

    if (
      !feedback_text ||
      typeof feedback_text !== "string" ||
      feedback_text.trim().length < 3 ||
      feedback_text.trim().length > 2000
    ) {
      return NextResponse.json(
        { error: "Feedback required (max 2000 characters)." },
        { status: 400 }
      );
    }

    const { error } = await getSupabase()
      .from("feedback")
      .insert({ feedback_text: feedback_text.trim() });

    if (error) {
      console.error("Feedback insert error:", error);
      return NextResponse.json({ error: "Failed to save." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save." }, { status: 500 });
  }
}
