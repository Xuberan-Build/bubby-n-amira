"use client";

import { useEffect, useState } from "react";

export type WaitlistSource =
  | "homepage-auto"
  | "homepage-cta"
  | "footer-cta"
  | "coming-soon"
  | "manual";

type WaitlistModalProps = {
  isOpen: boolean;
  source: WaitlistSource;
  onClose: () => void;
  onSubmitted: () => void;
};

export default function WaitlistModal({
  isOpen,
  source,
  onClose,
  onSubmitted,
}: WaitlistModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setError("");
      setSubmitted(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      return;
    }

    setError("");
    setSubmitted(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          source,
          pagePath: window.location.pathname,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setSubmitted(true);
      onSubmitted();
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="waitlist-overlay fixed inset-0 z-50 flex items-center justify-center bg-[rgba(51,51,51,0.45)] px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-title"
      onClick={onClose}
    >
      <div
        className="waitlist-panel soft-card relative w-full max-w-xl bg-[var(--color-white)] p-7 shadow-[0_24px_80px_rgba(51,51,51,0.18)] md:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-gray-500)] transition hover:bg-[var(--color-gray-100)] hover:text-[var(--color-charcoal)]"
          aria-label="Close waitlist modal"
        >
          <span aria-hidden>×</span>
        </button>

        <div className="max-w-lg">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
            Waitlist
          </p>
          <h2
            id="waitlist-title"
            className="mt-4 font-display text-3xl leading-tight text-[var(--color-charcoal)] md:text-4xl"
          >
            join bubby&apos;s waitlist for a massage .. or something
          </h2>
          <p className="mt-4 text-sm text-[var(--color-gray-500)] md:text-base">
            bubby will notify you when he feels like it.
          </p>
        </div>

        {submitted ? (
          <div className="mt-8 rounded-[24px] bg-[var(--color-yellow)]/60 p-6">
            <p className="font-display text-xl text-[var(--color-charcoal)]">
              you&apos;re on the list.
            </p>
            <p className="mt-2 text-sm text-[var(--color-gray-500)]">
              if bubby feels generous, you&apos;ll hear from him first.
            </p>
          </div>
        ) : (
          <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
                First name
                <input
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="rounded-2xl border border-transparent bg-[var(--color-gray-100)] px-4 py-3 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-gray-500)] focus:outline-none"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
                Last name
                <input
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className="rounded-2xl border border-transparent bg-[var(--color-gray-100)] px-4 py-3 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-gray-500)] focus:outline-none"
                  required
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
              Email
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-2xl border border-transparent bg-[var(--color-gray-100)] px-4 py-3 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-gray-500)] focus:outline-none"
                required
              />
            </label>

            {error ? <p className="text-sm text-[#b42318]">{error}</p> : null}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="soft-button inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-charcoal)] px-6 py-3 text-sm text-white transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "adding you..." : "sure i like you, add me"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
