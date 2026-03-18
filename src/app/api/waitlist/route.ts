import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

type WaitlistPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  source?: string;
  pagePath?: string;
};

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const body = (await request.json()) as WaitlistPayload;

  const firstName = normalizeString(body.firstName);
  const lastName = normalizeString(body.lastName);
  const email = normalizeString(body.email).toLowerCase();
  const source = normalizeString(body.source);
  const pagePath = normalizeString(body.pagePath);

  if (!firstName || !lastName || !email) {
    return NextResponse.json(
      { error: "First name, last name, and email are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin.from("waitlist").upsert(
    {
      email,
      first_name: firstName,
      last_name: lastName,
      source: source || "manual",
      page_path: pagePath || "/",
    },
    { onConflict: "email", ignoreDuplicates: true }
  );

  if (error) {
    console.error("Supabase waitlist error:", error.message);
    return NextResponse.json(
      { error: "Waitlist signup is unavailable right now." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
