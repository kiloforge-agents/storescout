import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StoreScout — In-store mode for the modern shopper",
  description:
    "A pocketable PWA that turns any retail store into a guided AR experience. Find every product, surface every deal, skip the wandering.",
  applicationName: "StoreScout",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    title: "StoreScout",
    capable: true,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "StoreScout — In-store mode",
    description:
      "GPS-guided aisles, AR overlays, deals that find you. The in-store layer for brand apps.",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
