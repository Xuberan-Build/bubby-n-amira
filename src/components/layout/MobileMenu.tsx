"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

// Phone-only hamburger: a 44px toggle in the header row that drops a panel
// of large tap rows below the header, with the current section highlighted.
export default function MobileMenu({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close whenever the route changes (link tapped, back button, etc.).
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }

  // Escape closes; lock page scroll while the panel is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  // Product pages live under the shop.
  const isActive = (href: string) =>
    pathname === href ||
    pathname.startsWith(`${href}/`) ||
    (href === "/available" && pathname.startsWith("/product/"));

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-charcoal)] active:bg-[var(--color-gray-100)]"
      >
        <span aria-hidden className="relative block h-4 w-6">
          <span
            className={`absolute left-0 top-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-200 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[7px] h-0.5 w-6 rounded-full bg-current transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[14px] h-0.5 w-6 rounded-full bg-current transition-transform duration-200 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {/* Backdrop — tap outside the panel to close */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        // absolute, not fixed: the header's backdrop-blur makes it the
        // containing block for fixed children, which would clip this.
        className={`absolute inset-x-0 top-full h-[100dvh] bg-[var(--color-charcoal)]/20 transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <nav
        id="mobile-menu"
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-0 top-full border-t border-[var(--color-gray-100)] bg-[var(--color-white)] shadow-[var(--shadow-md)]"
      >
        <ul className="page-shell py-3">
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-14 items-center justify-between rounded-2xl px-4 font-display text-xl font-light transition-colors active:bg-[var(--color-pink)] ${
                    active ? "bg-[var(--color-pink)]" : ""
                  }`}
                >
                  {item.label}
                  <span aria-hidden className="text-base text-[var(--color-gray-500)]">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
