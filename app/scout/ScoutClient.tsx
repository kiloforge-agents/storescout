"use client";
import { useEffect, useMemo, useState } from "react";
import StoreMap from "@/components/StoreMap";
import {
  AISLES,
  DEALS,
  PRODUCTS,
  ROUTE,
  STORE_META,
  type Product,
} from "@/lib/store-data";

type GpsState =
  | { kind: "idle" }
  | { kind: "asking" }
  | { kind: "denied"; message: string }
  | { kind: "live"; lat: number; lng: number; accuracy: number; simulated?: boolean };

export default function ScoutClient() {
  const [tab, setTab] = useState<"map" | "list" | "saved">("map");
  const [gps, setGps] = useState<GpsState>({ kind: "idle" });
  const [selected, setSelected] = useState<Product | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [step, setStep] = useState(0);

  // Restore saved list
  useEffect(() => {
    try {
      const raw = localStorage.getItem("scout:saved");
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("scout:saved", JSON.stringify(saved));
    } catch {}
  }, [saved]);

  // Fake walking when in live mode
  useEffect(() => {
    if (gps.kind !== "live") return;
    const t = setInterval(() => setStep((s) => (s + 1) % ROUTE.length), 2400);
    return () => clearInterval(t);
  }, [gps.kind]);

  const requestGps = () => {
    setGps({ kind: "asking" });
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      // Fallback to simulated mode when geolocation not available
      setGps({
        kind: "live",
        lat: STORE_META.lat,
        lng: STORE_META.lng,
        accuracy: 0.7,
        simulated: true,
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGps({
          kind: "live",
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy ?? 5,
        });
      },
      (err) => {
        // Graceful fallback to simulated indoor positioning
        setGps({
          kind: "live",
          lat: STORE_META.lat,
          lng: STORE_META.lng,
          accuracy: 0.7,
          simulated: true,
        });
        console.info("Falling back to simulated indoor positioning:", err.message);
      },
      { enableHighAccuracy: true, timeout: 6000 }
    );
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter((p) =>
      `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q)
    );
  }, [query]);

  const isSaved = (id: string) => saved.includes(id);
  const toggleSave = (id: string) =>
    setSaved((curr) => (curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id]));

  const livePoint = ROUTE[step];
  const liveAisle = AISLES.find(
    (a) =>
      livePoint.x >= a.rect.x &&
      livePoint.x <= a.rect.x + a.rect.w &&
      livePoint.y >= a.rect.y &&
      livePoint.y <= a.rect.y + a.rect.h
  );

  const nearby = useMemo(() => {
    return PRODUCTS.map((p) => ({
      product: p,
      dist: Math.hypot(p.position.x - livePoint.x, p.position.y - livePoint.y),
    }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 4);
  }, [livePoint.x, livePoint.y]);

  return (
    <section className="mx-auto max-w-[1240px] px-5 sm:px-8 py-8">
      {/* Header */}
      <div className="grid md:grid-cols-12 gap-6 items-end mb-6">
        <div className="md:col-span-7">
          <div className="flex items-center gap-2 mb-3">
            <span className="tag">In-store mode</span>
            {gps.kind === "live" && (
              <span className="tag bg-[var(--color-citrus)] border-black/15">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-ink)] animate-ping-soft" />
                {gps.simulated ? "Simulated indoors" : "GPS locked"} · ±{gps.accuracy.toFixed(1)}m
              </span>
            )}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl leading-[1.0] tracking-tight">
            {STORE_META.name}
          </h1>
          <p className="mt-2 text-[var(--color-ink)]/70 text-sm">
            {STORE_META.city} · {STORE_META.square_ft.toLocaleString()} sq ft · {STORE_META.aisles} aisles · open until {STORE_META.hours.split(" — ")[1]}
          </p>
        </div>
        <div className="md:col-span-5 flex flex-wrap items-center gap-3 md:justify-end">
          {gps.kind !== "live" ? (
            <button onClick={requestGps} className="btn-primary text-sm">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
              </svg>
              {gps.kind === "asking" ? "Locating…" : "Start in-store mode"}
            </button>
          ) : (
            <button
              onClick={() => setGps({ kind: "idle" })}
              className="btn-ghost text-sm"
            >
              Pause tracking
            </button>
          )}
          <a href="/ar" className="btn-ghost text-sm">
            Open AR shelf →
          </a>
        </div>
      </div>

      {/* Search & tabs */}
      <div className="grid md:grid-cols-12 gap-3 mb-4">
        <div className="md:col-span-7">
          <label className="block relative">
            <span className="sr-only">Search products</span>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink)]/40">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
              </svg>
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 4,210 SKUs in this store…"
              className="w-full rounded-full border border-black/10 bg-white pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[var(--color-ink)]"
            />
          </label>
        </div>
        <div className="md:col-span-5 inline-flex bg-white border border-black/10 rounded-full p-1 text-sm">
          {(["map", "list", "saved"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 px-4 py-2 rounded-full transition ${
                tab === t ? "bg-[var(--color-ink)] text-[var(--color-bone)]" : "text-[var(--color-ink)]/70"
              }`}
            >
              {t === "map" ? "Floor map" : t === "list" ? `List · ${filtered.length}` : `Saved · ${saved.length}`}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          {tab === "map" && (
            <div className="rounded-[28px] bg-white border border-black/10 p-3 shadow-card">
              <StoreMap
                highlightProduct={selected?.id ?? null}
                onSelect={(p) => setSelected(p)}
              />
              <div className="mt-3 px-2 pb-1 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <Legend color="#1f3a2e" label="Pantry / Outerwear" />
                <Legend color="#ff9d3a" label="Home / Footwear" />
                <Legend color="#cfe1c8" label="Wellness / Kids" />
                <Legend color="#0e1411" label="Service / Checkout" />
              </div>
            </div>
          )}

          {tab === "list" && (
            <div className="rounded-[28px] bg-white border border-black/10 shadow-card divide-y divide-black/5 overflow-hidden">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-[var(--color-ink)]/60 text-sm">
                  No matches. Try a brand or category.
                </div>
              ) : (
                filtered.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelected(p);
                      setTab("map");
                    }}
                    className="w-full flex items-center gap-4 p-4 text-left hover:bg-black/[0.02]"
                  >
                    <span
                      className="h-12 w-12 rounded-2xl flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${p.swatch}, ${p.swatch}aa)` }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-mono-tight uppercase tracking-widest opacity-60">{p.brand}</div>
                      <div className="font-medium truncate">{p.name}</div>
                      <div className="text-xs opacity-60 mt-0.5">
                        {AISLES.find((a) => a.id === p.aisleId)?.name} · ★ {p.rating}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-base">${p.price.toFixed(2)}</div>
                      {p.was && (
                        <div className="text-xs line-through opacity-50">${p.was.toFixed(2)}</div>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(p.id);
                      }}
                      className={`ml-2 h-9 w-9 rounded-full border flex items-center justify-center ${
                        isSaved(p.id)
                          ? "bg-[var(--color-ink)] text-[var(--color-citrus)] border-[var(--color-ink)]"
                          : "border-black/10 hover:bg-black/5"
                      }`}
                      aria-label={isSaved(p.id) ? "Remove from list" : "Add to list"}
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill={isSaved(p.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                      </svg>
                    </button>
                  </button>
                ))
              )}
            </div>
          )}

          {tab === "saved" && (
            <div className="rounded-[28px] bg-white border border-black/10 shadow-card p-6">
              {saved.length === 0 ? (
                <div className="text-center py-12">
                  <div className="font-display text-2xl">Your shopping list is empty.</div>
                  <p className="mt-2 text-sm text-[var(--color-ink)]/60">
                    Save items from the list view to see them here. They&apos;ll
                    light up on the map as you walk in.
                  </p>
                  <button onClick={() => setTab("list")} className="btn-primary mt-5 text-sm">
                    Browse catalog
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {saved.map((id) => {
                    const p = PRODUCTS.find((x) => x.id === id);
                    if (!p) return null;
                    const aisle = AISLES.find((a) => a.id === p.aisleId);
                    return (
                      <li key={id} className="flex items-center gap-4 p-3 rounded-2xl bg-[var(--color-paper)] border border-black/10">
                        <span
                          className="h-12 w-12 rounded-xl flex-shrink-0"
                          style={{ background: p.swatch }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-mono-tight uppercase tracking-widest opacity-60">{aisle?.name}</div>
                          <div className="font-medium truncate">{p.name}</div>
                          <div className="text-xs opacity-60">${p.price.toFixed(2)}</div>
                        </div>
                        <button
                          onClick={() => {
                            setSelected(p);
                            setTab("map");
                          }}
                          className="btn-ghost text-xs"
                        >
                          Show on map
                        </button>
                        <button
                          onClick={() => toggleSave(id)}
                          className="text-xs underline opacity-70"
                        >
                          Remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-4">
          {selected ? (
            <ProductPanel
              product={selected}
              saved={isSaved(selected.id)}
              onToggleSave={() => toggleSave(selected.id)}
              onClose={() => setSelected(null)}
            />
          ) : (
            <NearbyPanel nearby={nearby} liveAisle={liveAisle?.name} active={gps.kind === "live"} onPick={(p) => setSelected(p)} />
          )}

          <DealsPanel onPick={(p) => setSelected(p)} />
        </aside>
      </div>
    </section>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[var(--color-ink)]/70">
      <span className="h-3 w-3 rounded" style={{ background: color }} />
      <span className="font-mono-tight tracking-wide uppercase text-[10px]">{label}</span>
    </div>
  );
}

function NearbyPanel({
  nearby,
  liveAisle,
  active,
  onPick,
}: {
  nearby: { product: Product; dist: number }[];
  liveAisle?: string;
  active: boolean;
  onPick: (p: Product) => void;
}) {
  return (
    <section className="rounded-3xl bg-white border border-black/10 shadow-card overflow-hidden">
      <header className="px-5 py-4 border-b border-black/10 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono-tight uppercase tracking-widest opacity-60">Around you</div>
          <div className="font-display text-xl leading-tight">{liveAisle ?? "Walking the floor"}</div>
        </div>
        <span className="tag">
          {active ? (
            <>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-citrus)] animate-ping-soft" />
              tracking
            </>
          ) : (
            "preview"
          )}
        </span>
      </header>
      <ul className="divide-y divide-black/5">
        {nearby.map(({ product, dist }) => (
          <li key={product.id}>
            <button
              onClick={() => onPick(product)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-black/[0.02]"
            >
              <span
                className="h-10 w-10 rounded-xl flex-shrink-0"
                style={{ background: product.swatch }}
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-mono-tight uppercase tracking-widest opacity-60">{product.brand}</div>
                <div className="font-medium truncate text-sm">{product.name}</div>
              </div>
              <div className="text-xs font-mono-tight opacity-70 whitespace-nowrap">
                {(dist * 0.6).toFixed(1)}m
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function DealsPanel({ onPick }: { onPick: (p: Product) => void }) {
  return (
    <section className="rounded-3xl bg-[var(--color-ink)] text-[var(--color-bone)] p-5 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[10px] font-mono-tight uppercase tracking-widest opacity-60">Live deals</div>
          <div className="font-display text-xl leading-tight">Triggered around you</div>
        </div>
        <span className="tag bg-white/5 border-white/15 text-white/70">{DEALS.length} active</span>
      </div>
      <ul className="space-y-3">
        {DEALS.slice(0, 3).map((d) => {
          const p = PRODUCTS.find((x) => x.id === d.productId)!;
          return (
            <li key={d.id}>
              <button
                onClick={() => onPick(p)}
                className="w-full text-left rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 p-3 flex items-center gap-3 transition"
              >
                <span className="h-9 w-9 rounded-xl" style={{ background: p.swatch }} />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-mono-tight uppercase tracking-widest opacity-60">{d.type}</div>
                  <div className="text-sm truncate">{d.title}</div>
                </div>
                <span className="text-[10px] font-mono-tight opacity-60">→</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function ProductPanel({
  product,
  saved,
  onToggleSave,
  onClose,
}: {
  product: Product;
  saved: boolean;
  onToggleSave: () => void;
  onClose: () => void;
}) {
  const aisle = AISLES.find((a) => a.id === product.aisleId);
  return (
    <section className="rounded-3xl bg-white border border-black/10 shadow-card overflow-hidden">
      <div
        className="h-44 relative"
        style={{
          background: `linear-gradient(135deg, ${product.swatch}, ${product.swatch}aa)`,
        }}
      >
        <span className="absolute inset-0 shimmer mix-blend-screen opacity-50" />
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/80 border border-black/10 flex items-center justify-center"
        >
          ×
        </button>
        {product.badge && (
          <span className="absolute top-3 left-3 tag bg-white/90 border-black/10">
            {product.badge}
          </span>
        )}
        <div className="absolute bottom-3 left-3 right-3 text-white/95">
          <div className="text-[10px] font-mono-tight uppercase tracking-widest">{product.brand}</div>
          <div className="font-display text-xl leading-tight">{product.name}</div>
        </div>
      </div>
      <div className="p-5 space-y-4">
        <p className="text-sm text-[var(--color-ink)]/75">{product.blurb}</p>
        <div className="flex items-baseline gap-3">
          <div className="font-display text-3xl">${product.price.toFixed(2)}</div>
          {product.was && <div className="text-sm line-through opacity-50">${product.was.toFixed(2)}</div>}
          <div className="ml-auto text-xs font-mono-tight">★ {product.rating} · {product.reviews}</div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <Pill k="Aisle" v={aisle?.name ?? "—"} />
          <Pill k="Category" v={product.category} />
        </div>
        <div className="flex gap-2">
          <button onClick={onToggleSave} className="btn-primary flex-1 justify-center text-sm">
            {saved ? "Saved" : "Save to list"}
          </button>
          <a href="/ar" className="btn-ghost text-sm">
            View in AR
          </a>
        </div>
      </div>
    </section>
  );
}

function Pill({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-[var(--color-paper)] p-3">
      <div className="text-[10px] font-mono-tight uppercase tracking-widest opacity-60">{k}</div>
      <div className="text-sm font-medium mt-1 truncate">{v}</div>
    </div>
  );
}
