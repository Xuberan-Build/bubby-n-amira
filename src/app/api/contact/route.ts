import { NextResponse } from "next/server";

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

async function trackKlaviyoEvent(
  email: string,
  name: string,
  message: string,
): Promise<boolean> {
  const privateKey = process.env.KLAVIYO_PRIVATE_KEY;
  if (!privateKey) return false;

  try {
    const res = await fetch("https://a.klaviyo.com/api/events/", {
      method: "POST",
      headers: {
        accept: "application/vnd.api+json",
        revision: "2024-07-15",
        "content-type": "application/vnd.api+json",
        Authorization: `Klaviyo-API-Key ${privateKey}`,
      },
      body: JSON.stringify({
        data: {
          type: "event",
          attributes: {
            properties: { message, contact_name: name },
            metric: {
              data: {
                type: "metric",
                attributes: { name: "Contact Form Submitted" },
              },
            },
            profile: {
              data: {
                type: "profile",
                attributes: {
                  email,
                  properties: { contact_name: name },
                },
              },
            },
          },
        },
      }),
    });

    return res.ok;
  } catch (err) {
    console.error("Klaviyo contact event error:", err);
    return false;
  }
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

  const ok = await trackKlaviyoEvent(email, name, message);

  if (!ok) {
    return NextResponse.json(
      { error: "Message could not be sent right now." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
