import Link from "next/link";

const navItems = [
  { href: "/available", label: "Shop" },
  { href: "/bubby", label: "Meet Bubby" },
  { href: "/amira", label: "Meet Us" },
  { href: "/contact", label: "Contact" },
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
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-[var(--color-charcoal)] transition"
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
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-coral)] text-xs text-white">
              {cartCount}
            </span>
          )}
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
