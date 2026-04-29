"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/scout", label: "In-store mode" },
  { href: "/ar", label: "AR shelf" },
  { href: "/deals", label: "Deals" },
  { href: "/brands", label: "For brands" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-[var(--color-bone)]/85 backdrop-blur-md border-b border-black/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--color-ink)] text-[var(--color-citrus)] font-display text-lg">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"/>
            </svg>
          </span>
          <span className="font-display text-xl tracking-tight">StoreScout</span>
          <span className="hidden md:inline-block tag ml-2">v0.4 · beta</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 rounded-full text-sm transition ${
                  active
                    ? "bg-[var(--color-ink)] text-[var(--color-bone)]"
                    : "hover:bg-black/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/scout" className="btn-primary text-sm">
            Open in-store mode
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-black/10 bg-white/60"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/5 bg-[var(--color-bone)]/95 backdrop-blur-md">
          <nav className="mx-auto max-w-[1240px] px-5 py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2.5 rounded-xl hover:bg-black/5"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/scout" className="btn-primary text-sm justify-center mt-2">
              Open in-store mode →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
