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
    <div>
      <section className="page-shell section-pad">
        <div className="grid gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)] lg:grid-cols-2">

          {/* ── Practice info + Bubby presence ── */}
          <div className="bg-[var(--color-gray-100)] px-10 py-12 flex flex-col gap-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-3">
                Contact
              </p>
              <h1 className="font-display text-4xl font-light leading-snug mb-6">
                Reach the practice.<br />Amira will handle it.
              </h1>
              <p className="text-sm leading-relaxed text-[var(--color-gray-500)]">
                You can email us. We&apos;ll respond. Bubby supervises all
                incoming communications. He does not reply. That is Amira&apos;s
                department.
              </p>
            </div>

            <div className="border border-[var(--color-gray-500)]/10">
              {[
                { label: "Email", value: "bubbynamiramedia@gmail.com" },
                { label: "Response time", value: "Within a couple of days. No promises." },
                { label: "Bubby availability", value: "At his discretion." },
                { label: "Amira availability", value: "Always. She did not choose this." },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  className={`px-6 py-5 ${i < arr.length - 1 ? "border-b border-[var(--color-gray-500)]/10" : ""}`}
                >
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-gray-500)] mb-1">
                    {item.label}
                  </p>
                  <p className="font-display text-base font-light">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Bubby presence */}
            <div className="flex gap-5 items-start border border-[var(--color-gray-500)]/10 px-6 py-6">
              <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-full bg-[var(--color-gray-100)]">
                <Image
                  src="/images/meet-bubby/meetbubby_section1_1.webp"
                  alt="Bubby"
                  fill
                  className="object-cover object-[center_5%]"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="font-display text-lg font-light mb-1">Bubby</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-gray-500)] mb-2">
                  Supervising Director
                </p>
                <p className="text-sm leading-relaxed text-[var(--color-gray-500)]">
                  He is aware of your inquiry. He has chosen not to respond
                  directly. You are in good hands.
                </p>
              </div>
            </div>
          </div>

          {/* ── Form ── */}
          <div className="bg-[var(--color-white)] px-10 py-12">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-8">
              Send a message
            </p>

            {status === "sent" ? (
              <div className="border border-[var(--color-gray-100)] px-8 py-10">
                <p className="font-display text-2xl font-light mb-3">Got it.</p>
                <p className="text-sm text-[var(--color-gray-500)]">
                  Amira will be in touch. Bubby has been informed.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid gap-2">
                  <label className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-gray-500)]">
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="border border-[var(--color-gray-100)] bg-[var(--color-white)] px-4 py-3 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-gray-500)] focus:outline-none focus:border-[var(--color-gray-500)]"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-gray-500)]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="border border-[var(--color-gray-100)] bg-[var(--color-white)] px-4 py-3 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-gray-500)] focus:outline-none focus:border-[var(--color-gray-500)]"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-gray-500)]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    required
                    className="border border-[var(--color-gray-100)] bg-[var(--color-white)] px-4 py-3 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-gray-500)] focus:outline-none focus:border-[var(--color-gray-500)] resize-none"
                  />
                </div>
                <p className="text-[10px] text-[var(--color-gray-500)] leading-relaxed italic">
                  Bubby reviews all submissions. Amira handles the responses.
                  This is the arrangement.
                </p>
                {status === "error" && (
                  <p className="text-sm text-red-500">
                    Something went wrong. Try again in a moment.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="border border-[var(--color-charcoal)] bg-[var(--color-charcoal)] px-8 py-3 text-[10px] uppercase tracking-[0.14em] text-white transition hover:opacity-80 disabled:opacity-50 self-start"
                >
                  {status === "sending" ? "Sending…" : "Send It"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
