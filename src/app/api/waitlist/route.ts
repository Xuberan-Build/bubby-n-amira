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

const KLAVIYO_BASE = "https://a.klaviyo.com/api";
const REVISION = "2024-07-15";

function klaviyoHeaders(privateKey: string) {
  return {
    "Content-Type": "application/vnd.api+json",
    Authorization: `Klaviyo-API-Key ${privateKey}`,
    revision: REVISION,
  };
}

async function subscribeEmailToList(
  privateKey: string,
  listId: string,
  email: string,
): Promise<boolean> {
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
  return res.status === 202;
}

async function upsertProfile(
  privateKey: string,
  email: string,
  firstName: string,
  lastName: string,
  source: string,
): Promise<void> {
  const attributes = {
    email,
    first_name: firstName,
    last_name: lastName,
    properties: { signup_source: source },
  };

  const createRes = await fetch(`${KLAVIYO_BASE}/profiles/`, {
    method: "POST",
    headers: klaviyoHeaders(privateKey),
    body: JSON.stringify({ data: { type: "profile", attributes } }),
  });

  if (createRes.status === 409) {
    const conflict = (await createRes.json()) as {
      errors?: { meta?: { duplicate_profile_id?: string } }[];
    };
    const profileId = conflict.errors?.[0]?.meta?.duplicate_profile_id;
    if (!profileId) return;

    await fetch(`${KLAVIYO_BASE}/profiles/${profileId}/`, {
      method: "PATCH",
      headers: klaviyoHeaders(privateKey),
      body: JSON.stringify({
        data: { type: "profile", id: profileId, attributes },
      }),
    });
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as WaitlistPayload;

  const firstName = normalizeString(body.firstName);
  const lastName = normalizeString(body.lastName);
  const email = normalizeString(body.email).toLowerCase();
  const source = normalizeString(body.source) || "manual";

  if (!firstName || !lastName || !email) {
    return NextResponse.json(
      { error: "First name, last name, and email are required." },
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
  const listId = process.env.KLAVIYO_LIST_ID;

  if (!privateKey || !listId) {
    return NextResponse.json(
      { error: "Waitlist signup is unavailable right now." },
      { status: 502 },
    );
  }

  const subscribed = await subscribeEmailToList(privateKey, listId, email);

  if (!subscribed) {
    return NextResponse.json(
      { error: "Waitlist signup is unavailable right now." },
      { status: 502 },
    );
  }

  await upsertProfile(privateKey, email, firstName, lastName, source);

  return NextResponse.json({ ok: true });
}
