// Synthetic store catalog used across the demo.
// Coordinates are in store-grid units (0-100 across, 0-60 down)
// representing a flagship retailer floorplan.

export type Aisle = {
  id: string;
  name: string;
  rect: { x: number; y: number; w: number; h: number };
  tone: "moss" | "amber" | "lichen" | "ink";
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  aisleId: string;
  position: { x: number; y: number };
  price: number;
  was?: number;
  rating: number;
  reviews: number;
  badge?: "deal" | "lowstock" | "new" | "exclusive";
  swatch: string;
  blurb: string;
};

export type Deal = {
  id: string;
  title: string;
  productId: string;
  expiresAt: string;
  type: "geofenced" | "member" | "flash" | "stack";
  copy: string;
};

export const STORE_META = {
  name: "Hayes Valley Flagship",
  city: "San Francisco, CA",
  square_ft: 18400,
  aisles: 14,
  hours: "9:00 — 21:00",
  phone: "(415) 555-0148",
  beacons: 32,
  lat: 37.7762,
  lng: -122.4241,
};

export const AISLES: Aisle[] = [
  { id: "a-entrance", name: "Welcome", rect: { x: 38, y: 0, w: 24, h: 6 }, tone: "ink" },
  { id: "a1", name: "Pantry & Coffee", rect: { x: 6, y: 10, w: 18, h: 8 }, tone: "moss" },
  { id: "a2", name: "Wellness", rect: { x: 28, y: 10, w: 18, h: 8 }, tone: "lichen" },
  { id: "a3", name: "Home & Bath", rect: { x: 50, y: 10, w: 18, h: 8 }, tone: "amber" },
  { id: "a4", name: "Apparel — Outerwear", rect: { x: 72, y: 10, w: 22, h: 8 }, tone: "moss" },
  { id: "a5", name: "Footwear", rect: { x: 6, y: 22, w: 18, h: 8 }, tone: "amber" },
  { id: "a6", name: "Accessories", rect: { x: 28, y: 22, w: 18, h: 8 }, tone: "lichen" },
  { id: "a7", name: "Electronics", rect: { x: 50, y: 22, w: 18, h: 8 }, tone: "ink" },
  { id: "a8", name: "Sports & Outdoors", rect: { x: 72, y: 22, w: 22, h: 8 }, tone: "moss" },
  { id: "a9", name: "Beauty", rect: { x: 6, y: 34, w: 18, h: 8 }, tone: "amber" },
  { id: "a10", name: "Books & Stationery", rect: { x: 28, y: 34, w: 18, h: 8 }, tone: "moss" },
  { id: "a11", name: "Kids", rect: { x: 50, y: 34, w: 18, h: 8 }, tone: "lichen" },
  { id: "a12", name: "Grocery", rect: { x: 72, y: 34, w: 22, h: 8 }, tone: "amber" },
  { id: "a-checkout", name: "Self Checkout", rect: { x: 38, y: 48, w: 24, h: 6 }, tone: "ink" },
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Single-origin cold brew, 32oz",
    brand: "Foglight Coffee",
    category: "Coffee",
    aisleId: "a1",
    position: { x: 11, y: 14 },
    price: 6.5,
    was: 8,
    rating: 4.8,
    reviews: 412,
    badge: "deal",
    swatch: "#5c3a1f",
    blurb: "Slow-steeped 18 hours in steel. Notes of cocoa nib and dried fig.",
  },
  {
    id: "p2",
    name: "Sourdough miche, 1.2kg",
    brand: "Mill House Bakery",
    category: "Bakery",
    aisleId: "a1",
    position: { x: 18, y: 16 },
    price: 12,
    rating: 4.9,
    reviews: 88,
    badge: "lowstock",
    swatch: "#c9a26c",
    blurb: "Hearth-baked daily. Two left at this location.",
  },
  {
    id: "p3",
    name: "Magnesium glycinate sleep stack",
    brand: "Northrun",
    category: "Wellness",
    aisleId: "a2",
    position: { x: 33, y: 14 },
    price: 28,
    was: 34,
    rating: 4.6,
    reviews: 1240,
    badge: "deal",
    swatch: "#3a5a4a",
    blurb: "Member-pricing unlocked when you walk past Aisle 3.",
  },
  {
    id: "p4",
    name: "Linen waffle bath sheet",
    brand: "Hours Home",
    category: "Bath",
    aisleId: "a3",
    position: { x: 56, y: 14 },
    price: 64,
    rating: 4.7,
    reviews: 311,
    badge: "exclusive",
    swatch: "#e6d8b8",
    blurb: "Stonewashed Belgian linen. Store-exclusive ochre dye.",
  },
  {
    id: "p5",
    name: "Recycled wool topcoat",
    brand: "Northrun",
    category: "Outerwear",
    aisleId: "a4",
    position: { x: 80, y: 14 },
    price: 248,
    was: 320,
    rating: 4.5,
    reviews: 96,
    badge: "deal",
    swatch: "#1f3a2e",
    blurb: "Try in AR — see fit on your build before you reach the rack.",
  },
  {
    id: "p6",
    name: "Trail runner, gum sole",
    brand: "Pacer Co.",
    category: "Footwear",
    aisleId: "a5",
    position: { x: 12, y: 26 },
    price: 138,
    rating: 4.8,
    reviews: 2104,
    badge: "new",
    swatch: "#d4a55a",
    blurb: "Ships in your size to checkout if shelf is empty.",
  },
  {
    id: "p7",
    name: "Field watch, 38mm",
    brand: "Mile & Hour",
    category: "Accessories",
    aisleId: "a6",
    position: { x: 34, y: 26 },
    price: 220,
    rating: 4.7,
    reviews: 188,
    swatch: "#0e1411",
    blurb: "Pair the watch in AR to see all 12 strap options on your wrist.",
  },
  {
    id: "p8",
    name: "Compact OLED monitor",
    brand: "Halftone",
    category: "Electronics",
    aisleId: "a7",
    position: { x: 56, y: 26 },
    price: 549,
    was: 649,
    rating: 4.4,
    reviews: 542,
    badge: "deal",
    swatch: "#2a2a2a",
    blurb: "Stack today's flash deal with the member 5% — total $521.55.",
  },
  {
    id: "p9",
    name: "Insulated trail bottle, 1L",
    brand: "Pacer Co.",
    category: "Sports",
    aisleId: "a8",
    position: { x: 80, y: 26 },
    price: 38,
    rating: 4.9,
    reviews: 3122,
    swatch: "#ff5a4d",
    blurb: "Six colors on shelf right now. AR-tap to compare.",
  },
  {
    id: "p10",
    name: "Tinted SPF 50, fragrance-free",
    brand: "Lume",
    category: "Beauty",
    aisleId: "a9",
    position: { x: 14, y: 38 },
    price: 32,
    rating: 4.6,
    reviews: 904,
    badge: "new",
    swatch: "#f1c39c",
    blurb: "Find your shade with the AR mirror behind Aisle 9.",
  },
  {
    id: "p11",
    name: "Linen-bound notebook, A5",
    brand: "Hours Home",
    category: "Stationery",
    aisleId: "a10",
    position: { x: 35, y: 38 },
    price: 24,
    rating: 4.8,
    reviews: 178,
    swatch: "#c9a26c",
    blurb: "100gsm Tomoe River. Three colors stocked.",
  },
  {
    id: "p12",
    name: "Toddler rain set, recycled",
    brand: "Sproutwear",
    category: "Kids",
    aisleId: "a11",
    position: { x: 56, y: 38 },
    price: 58,
    was: 78,
    rating: 4.7,
    reviews: 244,
    badge: "deal",
    swatch: "#ffd24a",
    blurb: "Sized 2T — 6Y. Member pricing applied at the door.",
  },
  {
    id: "p13",
    name: "Single estate olive oil, 500ml",
    brand: "Foglight Pantry",
    category: "Grocery",
    aisleId: "a12",
    position: { x: 82, y: 38 },
    price: 22,
    rating: 4.9,
    reviews: 612,
    badge: "exclusive",
    swatch: "#5d7a4a",
    blurb: "Cold-pressed Arbequina. Tasting bar at the end of Aisle 12.",
  },
];

export const DEALS: Deal[] = [
  {
    id: "d1",
    title: "Flash: 19% off pantry until 4pm",
    productId: "p1",
    expiresAt: "16:00",
    type: "flash",
    copy: "Cold brew + miche pairing — bundle saves $4.50.",
  },
  {
    id: "d2",
    title: "Member unlock near Wellness",
    productId: "p3",
    expiresAt: "23:59",
    type: "member",
    copy: "Walk past Aisle 3 and the magnesium stack drops to $28.",
  },
  {
    id: "d3",
    title: "Stack two: Electronics + Tier 2",
    productId: "p8",
    expiresAt: "21:00",
    type: "stack",
    copy: "Today only — 15% off OLED monitors stacks with member 5%.",
  },
  {
    id: "d4",
    title: "Geofenced: Outerwear",
    productId: "p5",
    expiresAt: "20:00",
    type: "geofenced",
    copy: "Triggered when you cross into Aisle 4. Wool coat at $248.",
  },
];

// A guided demo route through the store, used by the live tracker.
export const ROUTE: { x: number; y: number; label?: string }[] = [
  { x: 50, y: 4, label: "Welcome — entrance" },
  { x: 50, y: 9 },
  { x: 33, y: 9 },
  { x: 33, y: 14, label: "Aisle 2 · Wellness" },
  { x: 33, y: 18 },
  { x: 12, y: 18 },
  { x: 12, y: 14, label: "Aisle 1 · Pantry" },
  { x: 12, y: 26, label: "Aisle 5 · Footwear" },
  { x: 35, y: 26, label: "Aisle 6 · Accessories" },
  { x: 56, y: 26, label: "Aisle 7 · Electronics" },
  { x: 80, y: 26, label: "Aisle 8 · Sports" },
  { x: 80, y: 14, label: "Aisle 4 · Outerwear" },
  { x: 56, y: 14, label: "Aisle 3 · Home" },
  { x: 50, y: 50, label: "Self checkout" },
];
