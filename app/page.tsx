import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import StoreMap from "@/components/StoreMap";
import ArViewer from "@/components/ArViewer";
import { DEALS, PRODUCTS, STORE_META } from "@/lib/store-data";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Pillars />
        <DemoSection />
        <ArShowcase />
        <DealsRow />
        <BrandsRow />
        <Voices />
        <CTA />
      </main>
      <SiteFooter />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 pt-10 sm:pt-16 pb-10">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7 relative">
            <div className="flex items-center gap-2 mb-6">
              <span className="tag">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-coral)] animate-ping-soft" />
                Pilot live · Hayes Valley, SF
              </span>
              <span className="tag hidden sm:inline-flex">PWA · iOS / Android / Web</span>
            </div>
            <h1 className="font-display text-[44px] sm:text-[68px] lg:text-[88px] leading-[0.92] tracking-tight">
              Walk in.
              <br />
              <span className="italic text-[var(--color-moss)]">See</span> everything.
              <br />
              Skip the wandering.
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-[var(--color-ink)]/75 leading-relaxed">
              StoreScout is the in-store layer for brand apps. GPS-guided
              aisles, AR product overlays, and geofenced deals — packaged as a
              progressive web app you ship in days.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/scout" className="btn-primary">
                Try the in-store demo
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/brands" className="btn-ghost">
                For retailers & brands
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 max-w-md gap-6">
              <Stat n="2.4×" label="Basket size lift in pilot" />
              <Stat n="−38s" label="Time to find a SKU" />
              <Stat n="74%" label="Re-open within 7 days" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <PhoneMock />
          </div>
        </div>
      </div>

      {/* Bottom seam */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-black/10" />
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl sm:text-4xl tracking-tight">{n}</div>
      <div className="text-xs uppercase tracking-widest font-mono-tight text-[var(--color-ink)]/60 mt-1 leading-snug">
        {label}
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="relative mx-auto max-w-[380px] aspect-[9/19] rounded-[44px] bg-[var(--color-ink)] p-2 shadow-[0_30px_80px_-20px_rgba(14,20,17,0.4)] animate-drift">
      {/* Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 h-6 w-28 rounded-b-2xl bg-[var(--color-ink)]" />
      <div className="relative h-full w-full rounded-[36px] overflow-hidden bg-[var(--color-bone)]">
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-3 text-[10px] font-mono-tight">
          <span>9:41</span>
          <span>scout · live</span>
        </div>
        <div className="px-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono-tight uppercase tracking-widest opacity-60">Now in</div>
              <div className="font-display text-xl leading-tight">{STORE_META.name}</div>
            </div>
            <div className="h-9 w-9 rounded-full bg-[var(--color-ink)] text-[var(--color-citrus)] flex items-center justify-center text-xs font-mono-tight">
              IN
            </div>
          </div>
        </div>
        <div className="mt-3 mx-3 rounded-2xl overflow-hidden border border-black/10 bg-[var(--color-paper)]">
          <StoreMap compact showRoute />
        </div>
        <div className="px-4 mt-3 grid grid-cols-2 gap-2">
          <MiniCard
            title="Aisle 4 · Outerwear"
            sub="Your saved coat is 12 ft ahead"
            tone="citrus"
          />
          <MiniCard title="Member deal" sub="Magnesium stack — $28 (was $34)" tone="ink" />
        </div>
        <div className="px-4 mt-3">
          <div className="rounded-2xl bg-white/70 border border-black/10 p-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--color-amber-glow)]" />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-mono-tight uppercase tracking-widest opacity-60">AR Shelf</div>
              <div className="text-sm truncate font-medium">Tap to scan Aisle 5</div>
            </div>
            <div className="text-[10px] font-mono-tight">→</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniCard({ title, sub, tone }: { title: string; sub: string; tone: "citrus" | "ink" }) {
  return (
    <div
      className={`rounded-2xl p-3 border ${
        tone === "ink"
          ? "bg-[var(--color-ink)] text-[var(--color-bone)] border-black/30"
          : "bg-[var(--color-citrus)] text-[var(--color-ink)] border-black/10"
      }`}
    >
      <div className="text-[10px] font-mono-tight uppercase tracking-widest opacity-70">{title}</div>
      <div className="text-xs mt-1 leading-snug">{sub}</div>
    </div>
  );
}

function Marquee() {
  const brands = ["NORTHRUN", "FOGLIGHT", "PACER CO.", "HOURS HOME", "LUME", "HALFTONE", "MILE & HOUR", "SPROUTWEAR"];
  return (
    <section className="border-y border-black/10 bg-[var(--color-paper)]">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 py-6 grid sm:grid-cols-[auto_1fr] items-center gap-4">
        <div className="text-xs font-mono-tight uppercase tracking-widest text-[var(--color-ink)]/60 whitespace-nowrap">
          Building with
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-10 animate-[spinslow_unset] whitespace-nowrap font-display text-xl tracking-tight justify-between">
            {brands.map((b) => (
              <span key={b} className="opacity-70">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const pillars = [
    {
      n: "01",
      title: "Indoor positioning, no extra hardware",
      body:
        "We fuse GPS, BLE beacons (when available), Wi-Fi RTT, and IMU dead-reckoning to put a shopper on the floorplan within ±0.7m — even in a basement.",
    },
    {
      n: "02",
      title: "AR overlays in the browser",
      body:
        "WebXR + Scene Viewer fallbacks. Spawn product reticles, try-on cards, and stock signals straight from the camera — no app store install.",
    },
    {
      n: "03",
      title: "Geofenced commerce",
      body:
        "Trigger member offers, bundle pricing, and concierge handoffs as shoppers cross aisle boundaries. Edge-evaluated, privacy-first.",
    },
    {
      n: "04",
      title: "White-labeled in 14 days",
      body:
        "Drop the SDK into your existing brand app or use the standalone PWA. Tokens, layouts, and copy all map to your brand system.",
    },
  ];
  return (
    <section className="mx-auto max-w-[1240px] px-5 sm:px-8 py-20 sm:py-28">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="tag mb-5">The platform</div>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight leading-[1.0]">
            The in-store mode shoppers say is the <em className="text-[var(--color-moss)]">#1 missing feature</em> in retail apps.
          </h2>
          <p className="mt-5 text-[var(--color-ink)]/70 max-w-md">
            Forrester&apos;s 2024 retail UX survey put &ldquo;in-store guidance&rdquo; at
            the top of consumer wishlists. We built the platform that fills it.
          </p>
        </div>
        <div className="md:col-span-8 grid sm:grid-cols-2 gap-6">
          {pillars.map((p) => (
            <article
              key={p.n}
              className="relative rounded-3xl bg-[var(--color-paper)] border border-black/10 p-6 shadow-card overflow-hidden"
            >
              <div className="absolute top-4 right-5 font-mono-tight text-xs opacity-50">{p.n}</div>
              <h3 className="font-display text-xl leading-tight">{p.title}</h3>
              <p className="mt-3 text-sm text-[var(--color-ink)]/75 leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section className="bg-[var(--color-ink)] text-[var(--color-bone)] py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <div className="tag bg-white/5 border-white/10 text-[var(--color-bone)]/70">Live demo</div>
          <h2 className="font-display text-4xl sm:text-5xl mt-5 leading-[1.0]">
            Watch a shopper move through {STORE_META.name}.
          </h2>
          <p className="mt-5 text-white/70 max-w-md">
            Hover the map to pause. Each pin is a real SKU on the floor —
            tinted by category, ringed when on deal, dotted red when stock dips
            below five.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              [`${STORE_META.beacons} beacons`, "fused with phone IMU"],
              [`${STORE_META.aisles} aisles`, "auto-snapped to your CAD floor"],
              ["±0.7m", "median positioning error"],
            ].map(([k, v]) => (
              <li key={k} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-citrus)]" />
                <div>
                  <span className="font-display text-lg">{k}</span>
                  <span className="ml-2 text-white/60 text-sm">— {v}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link href="/scout" className="btn-primary bg-[var(--color-citrus)] text-[var(--color-ink)] hover:bg-[var(--color-citrus)]/90">
              Open the full prototype →
            </Link>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-[28px] bg-[var(--color-bone)] p-3 shadow-card">
            <StoreMap />
          </div>
        </div>
      </div>
    </section>
  );
}

function ArShowcase() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 sm:px-8 py-20 sm:py-28">
      <div className="grid md:grid-cols-12 gap-10 items-end mb-10">
        <div className="md:col-span-7">
          <div className="tag mb-4">AR shelf</div>
          <h2 className="font-display text-4xl sm:text-5xl leading-[1.0] tracking-tight">
            Look up. The <em className="italic text-[var(--color-moss)]">shelf</em> is annotated.
          </h2>
        </div>
        <p className="md:col-span-5 text-[var(--color-ink)]/70">
          Reticles tag every SKU in your line of sight. Tap to compare,
          stack deals, and see if your size lives in the back room — without
          flagging an associate.
        </p>
      </div>
      <ArViewer />
    </section>
  );
}

function DealsRow() {
  return (
    <section className="bg-[var(--color-paper)] border-y border-black/10 py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <div className="tag mb-3">Deals feed</div>
            <h2 className="font-display text-4xl sm:text-5xl leading-[1.0]">
              Offers that find you on the way to the rack.
            </h2>
          </div>
          <Link href="/deals" className="btn-ghost text-sm hidden sm:inline-flex">
            See all deals →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEALS.map((d) => {
            const product = PRODUCTS.find((p) => p.id === d.productId)!;
            return (
              <article
                key={d.id}
                className="rounded-3xl bg-white border border-black/10 shadow-card p-5 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2 text-xs font-mono-tight uppercase tracking-widest">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background:
                        d.type === "flash"
                          ? "var(--color-coral)"
                          : d.type === "geofenced"
                          ? "var(--color-citrus)"
                          : d.type === "stack"
                          ? "var(--color-amber-glow)"
                          : "var(--color-moss)",
                    }}
                  />
                  {d.type}
                  <span className="ml-auto opacity-60">ends {d.expiresAt}</span>
                </div>
                <div
                  className="rounded-2xl h-32 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${product.swatch}, ${product.swatch}cc)` }}
                >
                  <span className="absolute inset-0 shimmer mix-blend-screen" />
                  <span className="absolute bottom-3 left-3 right-3 text-white/95 text-xs font-mono-tight tracking-wider uppercase">
                    {product.brand}
                  </span>
                </div>
                <h3 className="font-display text-lg leading-tight">{d.title}</h3>
                <p className="text-sm text-[var(--color-ink)]/70 line-clamp-3">{d.copy}</p>
                <div className="mt-auto flex items-center justify-between text-sm">
                  <span className="font-mono-tight">${product.price.toFixed(2)}</span>
                  <span className="opacity-60">★ {product.rating} · {product.reviews}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BrandsRow() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 sm:px-8 py-20 sm:py-28">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="tag mb-4">For brands</div>
          <h2 className="font-display text-4xl sm:text-5xl leading-[1.0]">
            Cross-platform, low-code, ship in two sprints.
          </h2>
          <p className="mt-5 text-[var(--color-ink)]/70 max-w-md">
            Our SDK is &lt;90KB gzipped and wraps every native capability we
            need — Geolocation, WebXR, Web NFC, Wallet passes — behind a
            JSON-driven config.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            <KPI n="14d" label="Median go-live" />
            <KPI n="6" label="Lines of config" />
            <KPI n="0" label="App store reviews" />
          </div>
          <div className="mt-8">
            <Link href="/brands" className="btn-primary text-sm">
              Read the brand brief
            </Link>
          </div>
        </div>
        <div className="md:col-span-7">
          <CodeCard />
        </div>
      </div>
    </section>
  );
}

function KPI({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-2xl border border-black/10 p-4 bg-[var(--color-paper)]">
      <div className="font-display text-3xl">{n}</div>
      <div className="text-[11px] font-mono-tight uppercase tracking-widest opacity-60 mt-1">{label}</div>
    </div>
  );
}

function CodeCard() {
  return (
    <div className="rounded-3xl bg-[var(--color-ink)] text-[var(--color-bone)] p-1.5 shadow-card overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 text-xs font-mono-tight opacity-70">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-coral)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-amber-glow)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-citrus)]" />
        <span className="ml-2">storescout.config.ts</span>
      </div>
      <pre className="px-5 pb-5 text-[12px] sm:text-[13px] leading-[1.7] font-mono-tight overflow-auto">
{`import { defineStore } from "@storescout/sdk";

export default defineStore({
  store: { id: "hayes-valley", floorplan: "./floor.svg" },
  positioning: { provider: "fused", precision: 0.7 /* meters */ },
  ar: { mode: "webxr", fallback: "scene-viewer" },
  catalog: "https://api.brand.com/skus",
  deals: {
    geofences: [
      { aisle: "outerwear", trigger: "enter", offer: "OUT-15" },
      { aisle: "wellness", trigger: "dwell:8s", offer: "MAG-MEMBER" },
    ],
  },
  brand: { tokens: "./brand.tokens.json", motion: "calm" },
});`}
      </pre>
    </div>
  );
}

function Voices() {
  const voices = [
    {
      quote:
        "Our customers spend less time looking and more time looking. The dwell-time chart inverted in week one.",
      who: "Maya R., Director of Retail Tech",
      brand: "Northrun",
    },
    {
      quote:
        "The fact that it's a PWA is the whole point. We rolled to all 14 stores without a single TestFlight invite.",
      who: "Devin O., Head of Digital",
      brand: "Hours Home",
    },
    {
      quote:
        "AR overlays put a tasting note on every olive oil. Sales of single-estate jumped 31%.",
      who: "Lara T., Buyer",
      brand: "Foglight Pantry",
    },
  ];
  return (
    <section className="bg-[var(--color-moss)] text-[var(--color-bone)] py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid md:grid-cols-12 gap-10 mb-10 items-end">
          <div className="md:col-span-7">
            <div className="tag bg-white/10 border-white/15 text-white/80">Voices from the floor</div>
            <h2 className="font-display text-4xl sm:text-5xl mt-4 leading-[1.0]">
              Built with retailers who care how a store <em className="italic">feels</em>.
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {voices.map((v) => (
            <figure key={v.who} className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <svg className="w-7 h-7 text-[var(--color-citrus)] mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 7H5a2 2 0 00-2 2v4a4 4 0 004 4v-2a2 2 0 11-2-2V9h4V7zm10 0h-4a2 2 0 00-2 2v4a4 4 0 004 4v-2a2 2 0 11-2-2V9h4V7z" />
              </svg>
              <blockquote className="font-display text-xl leading-snug">&ldquo;{v.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 text-xs font-mono-tight uppercase tracking-widest text-white/60">
                {v.who} · {v.brand}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 sm:px-8 py-20 sm:py-28">
      <div className="rounded-[36px] bg-[var(--color-citrus)] p-10 sm:p-16 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-72 h-72 rounded-full bg-[var(--color-ink)] opacity-90" />
        <div className="absolute right-10 bottom-10 text-[var(--color-citrus)] font-display text-7xl">↗</div>
        <div className="relative max-w-2xl">
          <div className="tag bg-white/40 border-black/10">Pilot cohort 2025</div>
          <h2 className="font-display text-4xl sm:text-6xl mt-5 leading-[1.0] tracking-tight">
            Bring the in-store mode to your floor.
          </h2>
          <p className="mt-5 text-[var(--color-ink)]/80 max-w-lg">
            We&apos;re onboarding ten flagship retailers next quarter. Indie
            brands welcome. Pilot pricing covers the install, the SDK, and a
            launch playbook.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/brands" className="btn-primary">
              Apply to pilot
            </Link>
            <Link href="/scout" className="btn-ghost">
              Explore the demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
