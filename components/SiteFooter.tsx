import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-black/10 bg-[var(--color-paper)]">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--color-ink)] text-[var(--color-citrus)]">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
              </svg>
            </span>
            <span className="font-display text-2xl">StoreScout</span>
          </div>
          <p className="mt-4 max-w-md text-sm/relaxed text-[var(--color-ink)]/70">
            The in-store layer for brand apps. Drop our SDK in, ship guided
            aisles, AR shelves, and geofenced offers in days — not quarters.
          </p>
          <div className="mt-6 flex gap-2">
            <Link href="/scout" className="btn-primary text-sm">Try the demo</Link>
            <Link href="/brands" className="btn-ghost text-sm">For brands</Link>
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-xs font-mono-tight uppercase tracking-widest text-[var(--color-ink)]/60 mb-3">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/scout" className="hover:underline">In-store mode</Link></li>
            <li><Link href="/ar" className="hover:underline">AR shelf</Link></li>
            <li><Link href="/deals" className="hover:underline">Deals feed</Link></li>
            <li><Link href="/brands" className="hover:underline">Brand console</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-xs font-mono-tight uppercase tracking-widest text-[var(--color-ink)]/60 mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/manifesto" className="hover:underline">Manifesto</Link></li>
            <li><Link href="/brands" className="hover:underline">Pricing</Link></li>
            <li><a className="hover:underline" href="mailto:hi@storescout.app">Contact</a></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-xs font-mono-tight uppercase tracking-widest text-[var(--color-ink)]/60 mb-3">Pilot stores</h4>
          <p className="text-sm/relaxed text-[var(--color-ink)]/70">
            We&rsquo;re onboarding ten flagship retailers in North America for
            our 2025 cohort. Indie brands welcome.
          </p>
          <a
            href="mailto:pilot@storescout.app"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
          >
            pilot@storescout.app
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
      <div className="border-t border-black/10">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 py-6 flex flex-col sm:flex-row gap-3 justify-between text-xs text-[var(--color-ink)]/55">
          <span>© {new Date().getFullYear()} StoreScout Labs · Built for shoppers, by shoppers.</span>
          <span className="font-mono-tight tracking-wider">37.7762° N · 122.4241° W</span>
        </div>
      </div>
    </footer>
  );
}
