"use client";

import { useState } from "react";
import Blob from "@/components/ui/Blob";
import Card from "@/components/ui/Card";

export default function WaitlistPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          source: "waitlist-page",
          pagePath: "/waitlist",
        }),
      });

      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative overflow-hidden">
      <Blob id="waitlist-page" variant={1} fill="#e5d9f2" className="blob-slow" style={{ width: 288, height: 288, right: -60, top: 80 }} />

      <section className="page-shell section-pad-lg relative">
        {submitted ? (
          <div className="max-w-xl fade-up">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
              Waitlist
            </p>
            <h1 className="mt-4 font-display text-4xl md:text-5xl">
              you&apos;re on the list.
            </h1>
            <p className="mt-5 text-base text-[var(--color-gray-500)]">
              bubby has been notified. he looked up, held eye contact for a moment,
              and went back to whatever he was doing.
            </p>
            <p className="mt-2 text-base text-[var(--color-gray-500)]">
              that&apos;s basically a confirmation.
            </p>

            <div className="mt-10 grid gap-4">
              <Card className="bg-[var(--color-yellow)]/70 perspective-slab">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
                  What happens now
                </p>
                <ul className="mt-4 space-y-3 text-sm text-[var(--color-gray-500)]">
                  <li>we&apos;ll reach out when there&apos;s something worth reaching out about.</li>
                  <li>bubby sets the timeline.</li>
                  <li>we tried to negotiate. it didn&apos;t go well.</li>
                </ul>
              </Card>

              <Card className="bg-[var(--color-mint)]/70 perspective-slab-right">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
                  In the meantime
                </p>
                <ul className="mt-4 space-y-3 text-sm text-[var(--color-gray-500)]">
                  <li>nothing is required of you.</li>
                  <li>no confirmation email. no onboarding sequence. no next steps.</li>
                  <li>you can close this tab. bubby will find you when he&apos;s ready.</li>
                </ul>
              </Card>
            </div>
          </div>
        ) : (
          <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <div className="fade-up">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
                Waitlist
              </p>
              <h1 className="mt-4 font-display text-4xl md:text-5xl">
                join bubby&apos;s waitlist for a massage .. or something
              </h1>
              <p className="mt-5 text-base text-[var(--color-gray-500)]">
                bubby will notify you when he feels like it.
              </p>

              <form onSubmit={handleSubmit} className="mt-10 grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
                    First name
                    <input
                      type="text"
                      name="firstName"
                      autoComplete="given-name"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="rounded-2xl border border-transparent bg-[var(--color-gray-100)] px-4 py-3 text-sm text-[var(--color-charcoal)] focus:outline-none"
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
                    Last name
                    <input
                      type="text"
                      name="lastName"
                      autoComplete="family-name"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="rounded-2xl border border-transparent bg-[var(--color-gray-100)] px-4 py-3 text-sm text-[var(--color-charcoal)] focus:outline-none"
                    />
                  </label>
                </div>

                <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
                  Email
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-2xl border border-transparent bg-[var(--color-gray-100)] px-4 py-3 text-sm text-[var(--color-charcoal)] focus:outline-none"
                  />
                </label>

                {error && (
                  <p className="text-sm text-[#b42318]">{error}</p>
                )}

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="soft-button inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-charcoal)] px-8 py-3 text-sm text-white transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "adding you..." : "sure i like you, add me"}
                  </button>
                </div>
              </form>
            </div>

            <div className="fade-up space-y-4 lg:pt-16" style={{ animationDelay: "100ms" }}>
              <Card className="bg-[var(--color-peach)]/70 perspective-slab">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
                  What you&apos;re signing up for
                </p>
                <p className="mt-3 text-sm text-[var(--color-gray-500)]">
                  early access to new drops. occasional updates. the general sense that
                  bubby is aware of you.
                </p>
              </Card>
              <Card className="bg-[var(--color-gray-100)] perspective-slab-right">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
                  What you&apos;re not signing up for
                </p>
                <p className="mt-3 text-sm text-[var(--color-gray-500)]">
                  daily emails. a nurture sequence. anything bubby wouldn&apos;t personally
                  endorse. he has standards. unclear ones, but still.
                </p>
              </Card>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
