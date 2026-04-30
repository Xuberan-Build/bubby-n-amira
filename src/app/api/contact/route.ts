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

const KLAVIYO_HEADERS = (key: string) => ({
  accept: "application/vnd.api+json",
  revision: "2024-07-15",
  "content-type": "application/vnd.api+json",
  Authorization: `Klaviyo-API-Key ${key}`,
});

async function subscribeToContactList(email: string, name: string, privateKey: string): Promise<boolean> {
  const listId = process.env.KLAVIYO_CONTACT_LIST_ID;
  if (!listId) return false;

  const res = await fetch("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/", {
    method: "POST",
    headers: KLAVIYO_HEADERS(privateKey),
    body: JSON.stringify({
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          list_id: listId,
          subscriptions: [
            {
              channels: { email: { subscriptions: [{ type: "MARKETING" }] } },
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
          ],
        },
      },
    }),
  });

  return res.ok;
}

async function trackContactEvent(email: string, name: string, message: string, privateKey: string): Promise<void> {
  await fetch("https://a.klaviyo.com/api/events/", {
    method: "POST",
    headers: KLAVIYO_HEADERS(privateKey),
    body: JSON.stringify({
      data: {
        type: "event",
        attributes: {
          properties: { message, contact_name: name },
          metric: {
            data: { type: "metric", attributes: { name: "Contact Form Submitted" } },
          },
          profile: {
            data: { type: "profile", attributes: { email } },
          },
        },
      },
    }),
  }).catch((err) => console.error("Klaviyo contact event error:", err));
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

  const privateKey = process.env.KLAVIYO_PRIVATE_KEY;
  if (!privateKey) {
    return NextResponse.json({ error: "Message could not be sent right now." }, { status: 502 });
  }

  const ok = await subscribeToContactList(email, name, privateKey);

  if (!ok) {
    return NextResponse.json(
      { error: "Message could not be sent right now." },
      { status: 502 }
    );
  }

  // Fire-and-forget event for timeline + future metric-based flows
  void trackContactEvent(email, name, message, privateKey);

  return NextResponse.json({ ok: true });
}
