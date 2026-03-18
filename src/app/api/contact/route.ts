import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;

  const name = normalizeString(body.name);
  const email = normalizeString(body.email).toLowerCase();
  const message = normalizeString(body.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin.from("contact_submissions").insert({
    name,
    email,
    message,
  });

  if (error) {
    console.error("Supabase contact error:", error.message);
    return NextResponse.json(
      { error: "Message could not be sent right now." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
