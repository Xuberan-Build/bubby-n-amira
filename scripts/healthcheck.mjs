#!/usr/bin/env node
// Production silent-failure monitor.
//
// A Vercel deploy can be "Ready" yet the storefront silently breaks: the
// product page calls Shopify at request time, so an unpublished product
// 404s, a handle change 404s, an API error 500s, and a sold-out / unpublished
// variant quietly swaps the "Get One" buy button for the waitlist CTA. None
// of that notifies anyone. This script asserts the *rendered* result so any
// of those regressions fail the run (and GitHub emails on a failed run).
//
// No secrets required: the public product page already reflects Shopify state.
// Run: node scripts/healthcheck.mjs   (override base with HEALTHCHECK_BASE)

const BASE = (process.env.HEALTHCHECK_BASE || "https://bubbynamira.com").replace(/\/$/, "");
const TIMEOUT_MS = 15_000;
const RETRIES = 2; // transient-failure tolerance so the monitor isn't noisy

const checks = [
  {
    name: "Sticker sheet — product page",
    path: "/product/sticker-sheet",
    expectStatus: 200,
    mustContain: [
      "Dr. Bubby Sticker Sheet", // Shopify product actually resolved
      "Get One",                 // buyable (AddToCart rendered, not waitlist)
      "Product features",        // descriptionHtml rendering, not flattened text
    ],
    // If the product goes unavailable the page renders this waitlist CTA instead:
    mustNotContain: ["sure i like you"],
  },
  {
    name: "Practice store grid",
    path: "/available",
    expectStatus: 200,
    mustContain: ["The Sticker Sheet", "stickersheet.webp"],
  },
  {
    name: "Homepage",
    path: "/",
    expectStatus: 200,
    mustContain: ["The Sticker Sheet"],
  },
];

async function fetchWithRetry(url) {
  let lastErr;
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    if (attempt > 0) await new Promise((r) => setTimeout(r, 2000 * attempt));
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        signal: ctrl.signal,
        redirect: "follow",
        headers: { "User-Agent": "bubbynamira-healthcheck" },
      });
      const body = await res.text();
      clearTimeout(t);
      // Retry only on server-side flakiness, not on a real 404/content failure.
      if (res.status >= 500 && attempt < RETRIES) {
        lastErr = new Error(`HTTP ${res.status}`);
        continue;
      }
      return { status: res.status, body };
    } catch (err) {
      clearTimeout(t);
      lastErr = err;
    }
  }
  throw lastErr;
}

async function run() {
  const failures = [];
  console.log(`Health check → ${BASE}\n`);

  for (const c of checks) {
    const url = `${BASE}${c.path}`;
    const problems = [];
    try {
      const { status, body } = await fetchWithRetry(url);
      if (status !== c.expectStatus) {
        problems.push(`expected HTTP ${c.expectStatus}, got ${status}`);
      }
      for (const needle of c.mustContain ?? []) {
        if (!body.includes(needle)) problems.push(`missing: "${needle}"`);
      }
      for (const needle of c.mustNotContain ?? []) {
        if (body.includes(needle)) problems.push(`unexpected: "${needle}"`);
      }
    } catch (err) {
      problems.push(`request failed: ${err.message}`);
    }

    if (problems.length === 0) {
      console.log(`✓ ${c.name}`);
    } else {
      console.log(`✗ ${c.name}  [${url}]`);
      for (const p of problems) console.log(`    - ${p}`);
      failures.push(c.name);
    }
  }

  console.log("");
  if (failures.length > 0) {
    console.error(`FAILED: ${failures.length}/${checks.length} check(s) — ${failures.join(", ")}`);
    process.exit(1);
  }
  console.log(`OK: all ${checks.length} checks passed`);
}

run().catch((err) => {
  console.error(`Health check crashed: ${err.stack || err}`);
  process.exit(1);
});
