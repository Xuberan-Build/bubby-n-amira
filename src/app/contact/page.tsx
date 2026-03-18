"use client";

import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setStatus(res.ok ? "sent" : "error");
  }

  return (
    <div className="page-shell section-pad-lg">
      <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr] lg:items-start">
        <div>
          <h1 className="font-display text-4xl">Contact</h1>
          <p className="mt-4 max-w-xl text-sm text-[var(--color-gray-500)]">
            You can email us. We&apos;ll probably respond.
          </p>
          <p className="mt-1 text-xs text-[var(--color-gray-500)]">
            We try to respond within a couple days. No promises.
          </p>

          {status === "sent" ? (
            <div className="mt-10 max-w-xl rounded-2xl bg-[var(--color-mint)]/60 px-6 py-8">
              <p className="font-display text-lg">Got it.</p>
              <p className="mt-2 text-sm text-[var(--color-gray-500)]">
                We&apos;ll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 grid max-w-xl gap-5">
              <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
                Your name
                <input
                  type="text"
                  name="name"
                  required
                  className="rounded-2xl border border-transparent bg-[var(--color-gray-100)] px-4 py-3 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-gray-500)] focus:outline-none"
                />
              </label>
              <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  className="rounded-2xl border border-transparent bg-[var(--color-gray-100)] px-4 py-3 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-gray-500)] focus:outline-none"
                />
              </label>
              <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
                What&apos;s up
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="rounded-2xl border border-transparent bg-[var(--color-gray-100)] px-4 py-3 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-gray-500)] focus:outline-none resize-none"
                />
              </label>
              {status === "error" && (
                <p className="text-sm text-red-500">
                  Something went wrong. Try again in a moment.
                </p>
              )}
              <div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-2xl bg-[var(--color-charcoal)] px-8 py-3 text-sm text-white transition hover:opacity-80 disabled:opacity-50"
                >
                  {status === "sending" ? "Sending…" : "Send It"}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="relative aspect-[3/4] overflow-hidden rounded-3xl lg:sticky lg:top-28">
          <Image
            src="/images/contact/contactus_section1_priority.webp"
            alt="Bubby and Amira"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
      </div>
    </div>
  );
}
