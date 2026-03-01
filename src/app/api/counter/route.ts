import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await getSupabase()
      .from("assessments_counter")
      .select("count")
      .eq("id", 1)
      .single();

    if (error) {
      console.error("Counter read error:", error);
      return NextResponse.json({ count: 0 });
    }

    return NextResponse.json({ count: data?.count ?? 0 });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
