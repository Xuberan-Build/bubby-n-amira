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

async function subscribeToKlaviyo(
  email: string,
  firstName: string,
  lastName: string,
  source: string,
) {
  const privateKey = process.env.KLAVIYO_PRIVATE_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;
  if (!privateKey || !listId) return;

  await fetch(
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
  ).catch((err) => console.error("Klaviyo subscribe error:", err));
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

  // Fire-and-forget — Klaviyo failure doesn't block the response
  void subscribeToKlaviyo(email, firstName, lastName, source || "manual");

  return NextResponse.json({ ok: true });
}
