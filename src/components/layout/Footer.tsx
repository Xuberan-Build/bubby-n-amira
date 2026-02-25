import Link from "next/link";

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
