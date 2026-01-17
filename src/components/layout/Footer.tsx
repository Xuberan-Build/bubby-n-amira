import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[var(--color-gray-100)]">
      <div className="page-shell flex flex-col items-center justify-between gap-4 py-8 text-xs text-[var(--color-gray-500)] md:flex-row">
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com"
            className="link-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a href="mailto:hello@bubbynamira.com" className="link-underline">
            Contact
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="link-underline">
            Privacy
          </Link>
          <Link href="/terms" className="link-underline">
            Terms
          </Link>
        </div>
        <span>© 2026 Bubby n Amira</span>
      </div>
    </footer>
  );
}
