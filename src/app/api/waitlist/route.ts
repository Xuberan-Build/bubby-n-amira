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

async function createNotionWaitlistEntry(submission: {
  firstName: string;
  lastName: string;
  email: string;
  source: string;
  pagePath: string;
  submittedAt: string;
}) {
  const notionToken = process.env.NOTION_TOKEN;
  const notionDatabaseId = process.env.NOTION_DATABASE_ID;

  if (!notionToken || !notionDatabaseId) {
    return false;
  }

  const notionResponse = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${notionToken}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: {
        database_id: notionDatabaseId,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: `${submission.firstName} ${submission.lastName}`.trim(),
              },
            },
          ],
        },
        "First name": {
          rich_text: [
            {
              text: {
                content: submission.firstName,
              },
            },
          ],
        },
        "Last name": {
          rich_text: [
            {
              text: {
                content: submission.lastName,
              },
            },
          ],
        },
        Email: {
          email: submission.email,
        },
        Source: {
          rich_text: [
            {
              text: {
                content: submission.source,
              },
            },
          ],
        },
        "Page path": {
          url: submission.pagePath.startsWith("http")
            ? submission.pagePath
            : `https://bubbynamira.com${submission.pagePath}`,
        },
        "Submitted at": {
          date: {
            start: submission.submittedAt,
          },
        },
      },
    }),
    cache: "no-store",
  });

  if (!notionResponse.ok) {
    const notionError = await notionResponse.text();
    throw new Error(`Notion write failed: ${notionError}`);
  }

  return true;
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

  try {
    const wroteToNotion = await createNotionWaitlistEntry(submission);

    if (wroteToNotion) {
      return NextResponse.json({ ok: true });
    }
  } catch (error) {
    console.error("Failed to write waitlist entry to Notion", error);
    return NextResponse.json(
      { error: "Waitlist signup is unavailable right now." },
      { status: 502 }
    );
  }

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
