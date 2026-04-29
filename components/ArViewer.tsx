"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { PRODUCTS, type Product } from "@/lib/store-data";

// Simulated AR shelf. Renders an isometric "shelf in front of you"
// with floating product reticles that respond to device orientation
// (where supported) and parallax scrolling.

type Mode = "outerwear" | "footwear" | "wellness";

const MODES: Record<Mode, { aisleId: string; tag: string; tone: string }> = {
  outerwear: { aisleId: "a4", tag: "Aisle 4 · Outerwear", tone: "#1f3a2e" },
  footwear: { aisleId: "a5", tag: "Aisle 5 · Footwear", tone: "#ff9d3a" },
  wellness: { aisleId: "a2", tag: "Aisle 2 · Wellness", tone: "#4a6b53" },
};

export default function ArViewer({ defaultMode = "outerwear" as Mode }: { defaultMode?: Mode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState<string | null>(null);
  const [scanned, setScanned] = useState(false);

  const items = useMemo(
    () => PRODUCTS.filter((p) => p.aisleId === MODES[mode].aisleId),
    [mode]
  );

  // Pointer parallax (works on desktop hover + touch)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const handle = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: cx, y: cy });
    };
    el.addEventListener("pointermove", handle);
    return () => el.removeEventListener("pointermove", handle);
  }, []);

  // Device orientation (mobile)
  useEffect(() => {
    const onOri = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      setTilt({
        x: Math.max(-0.4, Math.min(0.4, (e.gamma ?? 0) / 60)),
        y: Math.max(-0.4, Math.min(0.4, ((e.beta ?? 0) - 45) / 60)),
      });
    };
    window.addEventListener("deviceorientation", onOri);
    return () => window.removeEventListener("deviceorientation", onOri);
  }, []);

  useEffect(() => {
    setScanned(false);
    const t = setTimeout(() => setScanned(true), 1400);
    return () => clearTimeout(t);
  }, [mode]);

  const tone = MODES[mode].tone;

  return (
    <div className="rounded-[28px] overflow-hidden bg-[var(--color-ink)] shadow-card">
      {/* Mode switcher */}
      <div className="flex items-center justify-between gap-3 px-5 py-3 bg-[var(--color-ink)] text-[var(--color-bone)] border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono-tight">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-coral)] animate-ping-soft" />
          AR · LIVE · 60fps
        </div>
        <div className="flex bg-white/5 p-0.5 rounded-full text-[11px] font-mono-tight">
          {(Object.keys(MODES) as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-2.5 py-1 rounded-full transition uppercase tracking-widest ${
                mode === m ? "bg-[var(--color-citrus)] text-[var(--color-ink)]" : "text-white/70 hover:text-white"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Camera frame */}
      <div
        ref={wrapRef}
        className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden grain"
        style={{
          background: `radial-gradient(circle at 50% 80%, ${tone}55 0%, #0e1411 60%)`,
          perspective: "900px",
        }}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      >
        {/* Floor */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background:
              "linear-gradient(to top, rgba(212,255,60,0.07), transparent)",
            transform: `rotateX(60deg) translateZ(-60px) translateY(${tilt.y * 20}px)`,
            transformOrigin: "bottom center",
          }}
        >
          <div
            className="h-full w-full opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(212,255,60,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,255,60,0.18) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
        </div>

        {/* Shelf */}
        <div
          className="absolute inset-x-[10%] top-[18%] h-[58%] rounded-xl border border-white/10"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            transform: `translate3d(${tilt.x * -16}px, ${tilt.y * -10}px, 0) rotateY(${tilt.x * -6}deg) rotateX(${tilt.y * 4}deg)`,
            transition: "transform 0.18s ease",
          }}
        >
          {/* Shelf rows */}
          <div className="absolute inset-0 flex flex-col justify-around p-3">
            {[0, 1, 2].map((row) => (
              <div key={row} className="relative h-[30%]">
                <div className="absolute inset-x-0 bottom-0 h-px bg-white/15" />
                <div className="flex items-end gap-3 h-full">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-md"
                      style={{
                        height: `${50 + ((i * 13 + row * 7) % 40)}%`,
                        background: `linear-gradient(180deg, ${
                          ["#3a5a4a", "#d4a55a", "#1f3a2e", "#5c3a1f", "#cfe1c8", "#0e1411"][
                            (i + row) % 6
                          ]
                        }, rgba(0,0,0,0.6))`,
                        opacity: 0.85,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reticles */}
        <div className="absolute inset-0">
          {items.map((p, i) => {
            const left = 18 + ((i * 22) % 64);
            const top = 25 + ((i * 17) % 45);
            const isActive = active === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActive(isActive ? null : p.id)}
                className="absolute group"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  transform: `translate(${tilt.x * -28}px, ${tilt.y * -14}px) scale(${isActive ? 1.05 : 1})`,
                  transition: "transform 0.25s ease",
                }}
                aria-label={`Inspect ${p.name}`}
              >
                <span className="relative flex">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping-soft"
                    style={{ background: "rgba(212,255,60,0.4)" }}
                  />
                  <span
                    className="relative inline-flex h-5 w-5 rounded-full border border-[var(--color-citrus)] items-center justify-center"
                    style={{
                      background: "rgba(14,20,17,0.75)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <span className="block h-1.5 w-1.5 rounded-full bg-[var(--color-citrus)]" />
                  </span>
                </span>

                {/* Floating card */}
                <ProductCallout
                  product={p}
                  visible={isActive || (i === 0 && !active && scanned)}
                />
              </button>
            );
          })}
        </div>

        {/* Scanline */}
        {!scanned && (
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-x-0 h-1 animate-scanline"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(212,255,60,0.85), transparent)",
                boxShadow: "0 0 20px rgba(212,255,60,0.4)",
              }}
            />
          </div>
        )}

        {/* HUD */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono-tight text-[var(--color-bone)]/80">
          <span>{MODES[mode].tag}</span>
          <span>{scanned ? `${items.length} items detected` : "scanning shelf…"}</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono-tight text-[var(--color-bone)]/80">
          <span>FOV 78° · GPS LOCKED</span>
          <span>BAT 87% · 5G</span>
        </div>

        {/* Corner brackets */}
        {[
          { className: "top-2 left-2 border-t-2 border-l-2 rounded-tl" },
          { className: "top-2 right-2 border-t-2 border-r-2 rounded-tr" },
          { className: "bottom-2 left-2 border-b-2 border-l-2 rounded-bl" },
          { className: "bottom-2 right-2 border-b-2 border-r-2 rounded-br" },
        ].map((b, i) => (
          <span
            key={i}
            className={`absolute h-5 w-5 ${b.className} border-[var(--color-citrus)] opacity-70`}
          />
        ))}
      </div>

      {/* Detail tray */}
      <div className="bg-[var(--color-ink-soft)] text-[var(--color-bone)] p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.slice(0, 3).map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={`text-left rounded-2xl p-3 border transition ${
              active === p.id
                ? "border-[var(--color-citrus)] bg-white/5"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="h-9 w-9 rounded-xl" style={{ background: p.swatch }} />
              <div className="min-w-0">
                <div className="text-xs font-mono-tight uppercase opacity-70 tracking-wider">{p.brand}</div>
                <div className="text-sm font-medium truncate">{p.name}</div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="font-mono-tight">${p.price.toFixed(2)}</span>
              <span className="opacity-70">★ {p.rating}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductCallout({ product, visible }: { product: Product; visible: boolean }) {
  return (
    <span
      className={`absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 origin-top transition-all duration-300 text-left ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-1 scale-95 pointer-events-none"
      }`}
    >
      <span className="block rounded-2xl bg-[var(--color-bone)] text-[var(--color-ink)] p-3 shadow-card">
        <span className="flex items-center gap-2 mb-1">
          <span className="h-5 w-5 rounded-md" style={{ background: product.swatch }} />
          <span className="text-[10px] font-mono-tight uppercase tracking-widest opacity-70">{product.brand}</span>
        </span>
        <span className="block font-medium leading-tight text-sm">{product.name}</span>
        <span className="mt-2 flex items-baseline gap-2">
          <span className="font-display text-base">${product.price.toFixed(2)}</span>
          {product.was && (
            <span className="text-xs line-through opacity-60">${product.was.toFixed(2)}</span>
          )}
          <span className="ml-auto text-[10px] font-mono-tight">★ {product.rating}</span>
        </span>
        <span className="block mt-1 text-[11px] opacity-70 leading-snug line-clamp-2">{product.blurb}</span>
      </span>
    </span>
  );
}
