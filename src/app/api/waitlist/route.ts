import { NextResponse } from "next/server";
import { appendRow } from "@/lib/googleSheets";

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

async function subscribeToKlaviyo(
  email: string,
  firstName: string,
  lastName: string,
  source: string,
): Promise<boolean> {
  const privateKey = process.env.KLAVIYO_PRIVATE_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;
  if (!privateKey || !listId) return false;

  try {
    const res = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
      {
        method: "POST",
        headers: {
          accept: "application/vnd.api+json",
          revision: "2024-07-15",
          "content-type": "application/vnd.api+json",
          Authorization: `Klaviyo-API-Key ${privateKey}`,
        },
        body: JSON.stringify({
          data: {
            type: "profile-subscription-bulk-create-job",
            attributes: {
              list_id: listId,
              subscriptions: [
                {
                  channels: {
                    email: { subscriptions: [{ type: "MARKETING" }] },
                  },
                  profile: {
                    data: {
                      type: "profile",
                      attributes: {
                        email,
                        first_name: firstName,
                        last_name: lastName,
                        properties: { signup_source: source },
                      },
                    },
                  },
                },
              ],
            },
          },
        }),
      },
    );

    return res.ok;
  } catch (err) {
    console.error("Klaviyo subscribe error:", err);
    return false;
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as WaitlistPayload;

  const firstName = normalizeString(body.firstName);
  const lastName = normalizeString(body.lastName);
  const email = normalizeString(body.email).toLowerCase();
  const source = normalizeString(body.source) || "manual";
  const pagePath = normalizeString(body.pagePath) || "/";

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

  const ok = await subscribeToKlaviyo(email, firstName, lastName, source);

  if (!ok) {
    return NextResponse.json(
      { error: "Waitlist signup is unavailable right now." },
      { status: 502 }
    );
  }

  // Backup to Google Sheets — fire-and-forget
  void appendRow("Waitlist", [
    new Date().toISOString(),
    firstName,
    lastName,
    email,
    source,
    pagePath,
  ]).catch((err) => console.error("Sheets waitlist error:", err));

  return NextResponse.json({ ok: true });
}
