import Link from "next/link";

const navItems = [
  { href: "/bubby", label: "Meet Bubby" },
  { href: "/amira", label: "Meet Amira" },
  { href: "/available", label: "What's Available" },
];

export default function Header() {
  const cartCount = 0;

  return (
    <header className="sticky top-0 z-20 bg-[var(--color-white)]/80 backdrop-blur-sm">
      <div className="page-shell flex items-center justify-between gap-6 py-6">
        <Link href="/" className="font-display text-lg tracking-tight">
          Bubby n Amira
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[var(--color-charcoal)] md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="link-underline">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/cart"
          className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-[var(--color-charcoal)] transition ${
            cartCount ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-label="Cart"
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
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.4 12.4a2 2 0 0 0 2 1.6h9.6a2 2 0 0 0 2-1.6L23 6H6" />
          </svg>
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-coral)] text-xs text-white">
            {cartCount}
          </span>
        </Link>
      </div>
      <div className="page-shell border-t border-[var(--color-gray-100)] py-3 text-xs text-[var(--color-gray-500)] md:hidden">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="link-underline">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
