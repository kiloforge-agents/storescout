import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "StoreScout — In-store mode",
    short_name: "StoreScout",
    description:
      "GPS-guided aisles, AR overlays, and deals that find you. The in-store layer for brand apps.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f6f1e7",
    theme_color: "#0e1411",
    categories: ["shopping", "lifestyle", "navigation"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
