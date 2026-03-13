import Link from "next/link";

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/bubbynamira",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@bubbynamira",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@bubbynamira",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.13-2.14C19.52 3.6 12 3.6 12 3.6s-7.52 0-9.37.48A3.02 3.02 0 0 0 .5 6.19 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.13 2.14C4.48 20.4 12 20.4 12 20.4s7.52 0 9.37-.48a3.02 3.02 0 0 0 2.13-2.14A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.81zM9.75 15.52V8.48L15.86 12l-6.11 3.52z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-[var(--color-gray-100)]">
      <div className="page-shell py-10">
        <div className="mb-8 flex flex-col gap-2">
          <p className="font-display text-lg">Bubby n Amira</p>
          <p className="text-sm text-[var(--color-gray-500)]">
            A cat. His person. Some stuff they like.
          </p>
        </div>

        <div className="mb-8 flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-gray-500)] transition hover:text-[var(--color-charcoal)]"
            >
              {s.icon}
            </a>
          ))}
        </div>

        <div className="mb-8 border-t border-[var(--color-gray-200)] pt-8">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--color-gray-500)]">
            Stay in the loop
          </p>
          <form className="flex max-w-sm gap-3">
            <input
              type="email"
              placeholder="your email"
              className="flex-1 rounded-2xl border border-transparent bg-white px-4 py-2.5 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-gray-500)] focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-2xl bg-[var(--color-charcoal)] px-5 py-2.5 text-sm text-white transition hover:opacity-80"
            >
              Sure
            </button>
          </form>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-[var(--color-gray-200)] pt-6 text-xs text-[var(--color-gray-500)] md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <Link href="/bubby" className="link-underline">
              Meet Bubby
            </Link>
            <Link href="/amira" className="link-underline">
              Meet Us
            </Link>
            <Link href="/contact" className="link-underline">
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="link-underline">
              Privacy
            </Link>
            <Link href="/terms" className="link-underline">
              Terms
            </Link>
          </div>
          <span>© Bubby n Amira. All rights reserved or whatever.</span>
        </div>
      </div>
    </footer>
  );
}
