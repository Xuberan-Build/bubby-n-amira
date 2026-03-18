import Link from "next/link";
import CartIcon from "@/components/layout/CartIcon";
import AccountIcon from "@/components/layout/AccountIcon";

const navItems = [
  { href: "/available", label: "Shop" },
  { href: "/bubby", label: "Meet Bubby" },
  { href: "/amira", label: "Meet Us" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
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
        <div className="flex items-center gap-1">
          <AccountIcon />
          <CartIcon />
        </div>
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
