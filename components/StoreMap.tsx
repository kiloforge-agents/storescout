"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { AISLES, PRODUCTS, ROUTE, type Product } from "@/lib/store-data";

type Props = {
  highlightProduct?: string | null;
  onSelect?: (p: Product) => void;
  showRoute?: boolean;
  compact?: boolean;
  className?: string;
};

// The viewBox is sized to the floorplan grid so all coords stay in 0-100/0-60.
const VIEW_W = 100;
const VIEW_H = 56;

const TONE: Record<string, { fill: string; stroke: string; text: string }> = {
  moss: { fill: "#1f3a2e", stroke: "#16271f", text: "#f6f1e7" },
  amber: { fill: "#ff9d3a", stroke: "#cf7d24", text: "#0e1411" },
  lichen: { fill: "#cfe1c8", stroke: "#92ad8b", text: "#0e1411" },
  ink: { fill: "#0e1411", stroke: "#0e1411", text: "#d4ff3c" },
};

export default function StoreMap({
  highlightProduct,
  onSelect,
  showRoute = true,
  compact = false,
  className,
}: Props) {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Cycle through ROUTE points
  useEffect(() => {
    if (!showRoute || paused) return;
    const t = setInterval(() => {
      setStep((s) => (s + 1) % ROUTE.length);
    }, 2200);
    return () => clearInterval(t);
  }, [showRoute, paused]);

  const path = useMemo(() => {
    return ROUTE.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  }, []);

  const pos = ROUTE[step];
  const labelPoint = ROUTE.find((r, i) => i <= step && r.label) ?? ROUTE[0];

  const highlight = highlightProduct
    ? PRODUCTS.find((p) => p.id === highlightProduct)
    : null;

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full ${className ?? ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full h-auto block"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Store floorplan with live routing"
      >
        <defs>
          <pattern id="grid" width="2" height="2" patternUnits="userSpaceOnUse">
            <path d="M 2 0 L 0 0 0 2" fill="none" stroke="rgba(14,20,17,0.08)" strokeWidth="0.08" />
          </pattern>
          <linearGradient id="floor" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#fbf8f1" />
            <stop offset="100%" stopColor="#ece4d2" />
          </linearGradient>
          <radialGradient id="pulse" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#d4ff3c" stopOpacity="0.7" />
            <stop offset="80%" stopColor="#d4ff3c" stopOpacity="0" />
          </radialGradient>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.4" />
          </filter>
        </defs>

        {/* Floor */}
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="url(#floor)" rx="1.5" />
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="url(#grid)" rx="1.5" />

        {/* Aisles */}
        {AISLES.map((a) => {
          const tone = TONE[a.tone];
          return (
            <g key={a.id}>
              <rect
                x={a.rect.x}
                y={a.rect.y}
                width={a.rect.w}
                height={a.rect.h}
                rx="1.4"
                fill={tone.fill}
                stroke={tone.stroke}
                strokeWidth="0.18"
              />
              {/* Shelves striping */}
              <g opacity="0.18" stroke={tone.text} strokeWidth="0.12">
                <line x1={a.rect.x + 0.6} y1={a.rect.y + a.rect.h / 2} x2={a.rect.x + a.rect.w - 0.6} y2={a.rect.y + a.rect.h / 2} />
              </g>
              {!compact && (
                <text
                  x={a.rect.x + a.rect.w / 2}
                  y={a.rect.y + a.rect.h / 2 + 0.6}
                  textAnchor="middle"
                  fontSize="1.4"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="500"
                  letterSpacing="0.02"
                  fill={tone.text}
                  opacity="0.9"
                >
                  {a.name.toUpperCase()}
                </text>
              )}
            </g>
          );
        })}

        {/* Walking path */}
        {showRoute && (
          <path
            d={path}
            fill="none"
            stroke="#0e1411"
            strokeWidth="0.32"
            strokeDasharray="0.6 0.7"
            strokeLinecap="round"
            opacity="0.55"
          />
        )}

        {/* Product pins */}
        {PRODUCTS.map((p) => {
          const isHighlight = highlight?.id === p.id;
          return (
            <g
              key={p.id}
              transform={`translate(${p.position.x}, ${p.position.y})`}
              style={{ cursor: onSelect ? "pointer" : "default" }}
              onClick={() => onSelect?.(p)}
            >
              {isHighlight && (
                <circle r="3.4" fill="url(#pulse)" />
              )}
              <circle r="0.95" fill="#fbf8f1" stroke="#0e1411" strokeWidth="0.25" />
              <circle r="0.4" fill={p.swatch} />
              {p.badge === "deal" && (
                <circle cx="0.65" cy="-0.65" r="0.4" fill="#d4ff3c" stroke="#0e1411" strokeWidth="0.12" />
              )}
              {p.badge === "lowstock" && (
                <circle cx="0.65" cy="-0.65" r="0.4" fill="#ff5a4d" stroke="#0e1411" strokeWidth="0.12" />
              )}
            </g>
          );
        })}

        {/* Live position */}
        {showRoute && (
          <g transform={`translate(${pos.x}, ${pos.y})`} style={{ transition: "transform 1.4s cubic-bezier(.2,.7,.1,1)" }}>
            <circle r="2.4" fill="#d4ff3c" opacity="0.35" className="animate-ping-soft" />
            <circle r="1.2" fill="#d4ff3c" opacity="0.55" />
            <circle r="0.7" fill="#0e1411" />
            <circle r="0.32" fill="#fbf8f1" />
          </g>
        )}

        {/* Compass */}
        <g transform={`translate(${VIEW_W - 6}, 4)`} opacity="0.7">
          <circle r="2.1" fill="#fbf8f1" stroke="#0e1411" strokeWidth="0.15" />
          <text x="0" y="-1" textAnchor="middle" fontSize="0.9" fontFamily="JetBrains Mono, monospace" fill="#0e1411">N</text>
          <line x1="0" y1="-1.6" x2="0" y2="1.6" stroke="#ff5a4d" strokeWidth="0.12" />
        </g>
      </svg>

      {/* Floating labels */}
      {showRoute && (
        <div className="absolute left-3 bottom-3 sm:left-5 sm:bottom-5 max-w-[78%] flex items-center gap-2 rounded-full bg-[var(--color-ink)]/95 text-[var(--color-bone)] px-3 py-1.5 text-xs font-mono-tight">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-citrus)] animate-ping-soft" />
          <span className="truncate">
            {labelPoint.label ?? "On route"} · ETA {Math.max(1, ROUTE.length - step)} min
          </span>
        </div>
      )}
    </div>
  );
}
