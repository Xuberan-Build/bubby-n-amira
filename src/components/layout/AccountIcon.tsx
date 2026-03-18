"use client";

import Link from "next/link";
import { useCustomer } from "@/context/CustomerContext";

export default function AccountIcon() {
  const { customer } = useCustomer();
  const href = customer ? "/account" : "/account/login";

  return (
    <Link
      href={href}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-[var(--color-charcoal)] transition"
      aria-label={customer ? "My account" : "Sign in"}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
      {customer && (
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[var(--color-coral)]" />
      )}
    </Link>
  );
}
