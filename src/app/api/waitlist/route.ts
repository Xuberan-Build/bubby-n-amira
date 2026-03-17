import { NextResponse } from "next/server";

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

  const submission = {
    firstName,
    lastName,
    email,
    source: source || "manual",
    pagePath: pagePath || "/",
    submittedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;

  if (webhookUrl) {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submission),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        { error: "Waitlist signup is unavailable right now." },
        { status: 502 }
      );
    }
  } else {
    console.info("Waitlist submission received", submission);
  }

  return NextResponse.json({ ok: true });
}
