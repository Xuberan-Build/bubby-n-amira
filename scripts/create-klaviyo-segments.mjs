import { readFileSync } from "fs";
import { resolve } from "path";

// Load env vars from .env.local
const env = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
const getEnv = (key) => {
  const match = env.match(new RegExp(`^${key}=(.+)$`, "m"));
  return match ? match[1].trim() : null;
};

const KEY = getEnv("KLAVIYO_PRIVATE_KEY");
const LIST_ID = getEnv("KLAVIYO_LIST_ID");

if (!KEY || !LIST_ID) {
  console.error("Missing KLAVIYO_PRIVATE_KEY or KLAVIYO_LIST_ID in .env.local");
  process.exit(1);
}

const HEADERS = {
  Authorization: `Klaviyo-API-Key ${KEY}`,
  revision: "2024-07-15",
  accept: "application/vnd.api+json",
  "content-type": "application/vnd.api+json",
};

// ── Step 1: inspect an existing segment to learn the definition format ──
async function getExistingSegments() {
  const res = await fetch("https://a.klaviyo.com/api/segments/", { headers: HEADERS });
  const data = await res.json();
  return data.data ?? [];
}

// ── Step 2: create a segment ──
async function createSegment(name, definition) {
  const res = await fetch("https://a.klaviyo.com/api/segments/", {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      data: {
        type: "segment",
        attributes: { name, definition },
      },
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error(`  ✗ ${name}:`, JSON.stringify(data.errors, null, 2));
    return null;
  }
  return data.data;
}

async function createList(name) {
  const res = await fetch("https://a.klaviyo.com/api/lists/", {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      data: { type: "list", attributes: { name } },
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error(`  ✗ list "${name}":`, JSON.stringify(data.errors, null, 2));
    return null;
  }
  return data.data;
}

async function main() {
  // ── Step 1: create Contact Inquiries list ──────────────────────
  console.log("\n── Creating Contact Inquiries list ─────────────────");
  const contactList = await createList("Contact Inquiries");
  if (!contactList) { process.exit(1); }
  const CONTACT_LIST_ID = contactList.id;
  console.log(`  ✓ Contact Inquiries list created (${CONTACT_LIST_ID})`);
  console.log(`\n  ⚠  Add to .env.local and Vercel:\n  KLAVIYO_CONTACT_LIST_ID=${CONTACT_LIST_ID}\n`);

  await new Promise((r) => setTimeout(r, 1500));

  console.log("── Creating Klaviyo segments ───────────────────────");

  const onWaitlist    = { type: "profile-group-membership", is_member: true,  group_ids: [LIST_ID],         timeframe_filter: null };
  const onContact     = { type: "profile-group-membership", is_member: true,  group_ids: [CONTACT_LIST_ID], timeframe_filter: null };
  const notOnWaitlist = { type: "profile-group-membership", is_member: false, group_ids: [LIST_ID] };
  const notOnContact  = { type: "profile-group-membership", is_member: false, group_ids: [CONTACT_LIST_ID] };

  // 1. Waitlist only — on waitlist, never contacted
  const waitlistOnly = await createSegment("Bubby — Waitlist (not yet contacted)", {
    condition_groups: [
      { conditions: [onWaitlist] },
      { conditions: [notOnContact] },
    ],
  });
  console.log(waitlistOnly ? `  ✓ Waitlist only  (${waitlistOnly.id})` : "  ✗ failed — waitlist only");

  await new Promise((r) => setTimeout(r, 1500));

  // 2. High intent — on waitlist AND has contacted
  const highIntent = await createSegment("Bubby — High Intent (waitlist + contacted)", {
    condition_groups: [
      { conditions: [onWaitlist, onContact] },
    ],
  });
  console.log(highIntent ? `  ✓ High intent    (${highIntent.id})` : "  ✗ failed — high intent");

  await new Promise((r) => setTimeout(r, 1500));

  // 3. Warm leads — contacted but NOT on waitlist
  const warmLeads = await createSegment("Bubby — Warm Leads (contacted, no waitlist)", {
    condition_groups: [
      { conditions: [onContact, notOnWaitlist] },
    ],
  });
  console.log(warmLeads ? `  ✓ Warm leads     (${warmLeads.id})` : "  ✗ failed — warm leads");
}

main().catch(console.error);
