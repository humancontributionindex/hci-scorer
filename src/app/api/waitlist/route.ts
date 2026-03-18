import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !email ||
      typeof email !== "string" ||
      !EMAIL_RE.test(email) ||
      email.length > 320
    ) {
      return NextResponse.json(
        { error: "Valid email required." },
        { status: 400 }
      );
    }

    const { error } = await getSupabase()
      .from("waitlist_emails")
      .insert({ email: email.trim().toLowerCase() });

    if (error) {
      // Duplicate email — treat as success for UX
      if (error.code === "23505") {
        return NextResponse.json({ success: true });
      }
      console.error("Waitlist insert error:", error);
      return NextResponse.json({ error: "Failed to save." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save." }, { status: 500 });
  }
}
