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

const KLAVIYO_BASE = "https://a.klaviyo.com/api";
const REVISION = "2024-07-15";

function klaviyoHeaders(key: string) {
  return {
    "Content-Type": "application/vnd.api+json",
    Authorization: `Klaviyo-API-Key ${key}`,
    revision: REVISION,
  };
}

async function subscribeToContactList(
  email: string,
  name: string,
  privateKey: string,
): Promise<boolean> {
  const listId = process.env.KLAVIYO_CONTACT_LIST_ID;
  if (!listId) return false;

  const res = await fetch(
    `${KLAVIYO_BASE}/profile-subscription-bulk-create-jobs/`,
    {
      method: "POST",
      headers: klaviyoHeaders(privateKey),
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email,
                    subscriptions: {
                      email: { marketing: { consent: "SUBSCRIBED" } },
                    },
                  },
                },
              ],
            },
          },
          relationships: {
            list: { data: { type: "list", id: listId } },
          },
        },
      }),
    },
  );

  if (res.status !== 202) return false;

  // Upsert profile with contact name as a property
  const createRes = await fetch(`${KLAVIYO_BASE}/profiles/`, {
    method: "POST",
    headers: klaviyoHeaders(privateKey),
    body: JSON.stringify({
      data: {
        type: "profile",
        attributes: {
          email,
          properties: { contact_name: name },
        },
      },
    }),
  });

  if (createRes.status === 409) {
    const conflict = (await createRes.json()) as {
      errors?: { meta?: { duplicate_profile_id?: string } }[];
    };
    const profileId = conflict.errors?.[0]?.meta?.duplicate_profile_id;
    if (profileId) {
      await fetch(`${KLAVIYO_BASE}/profiles/${profileId}/`, {
        method: "PATCH",
        headers: klaviyoHeaders(privateKey),
        body: JSON.stringify({
          data: {
            type: "profile",
            id: profileId,
            attributes: {
              email,
              properties: { contact_name: name },
            },
          },
        }),
      });
    }
  }

  return true;
}

async function trackContactEvent(
  email: string,
  name: string,
  message: string,
  privateKey: string,
): Promise<void> {
  await fetch(`${KLAVIYO_BASE}/events/`, {
    method: "POST",
    headers: klaviyoHeaders(privateKey),
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
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const privateKey = process.env.KLAVIYO_PRIVATE_KEY;
  if (!privateKey) {
    return NextResponse.json(
      { error: "Message could not be sent right now." },
      { status: 502 },
    );
  }

  const ok = await subscribeToContactList(email, name, privateKey);

  if (!ok) {
    return NextResponse.json(
      { error: "Message could not be sent right now." },
      { status: 502 },
    );
  }

  void trackContactEvent(email, name, message, privateKey);

  return NextResponse.json({ ok: true });
}
