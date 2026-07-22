import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { CAPABILITY_SCRIPT } from "@/lib/capabilityScript";

export const metadata: Metadata = {
  title: "Agisano — one partner for your institution's technology",
  description:
    "One accountable partner for your institution's internet, equipment, IT support and digital presence — so running the technology stops being your problem.",
  metadataBase: new URL("https://agisano.com"),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Agisano — one partner for your institution's technology",
    description:
      "One accountable partner for your institution's internet, equipment, IT support and digital presence.",
    type: "website",
    locale: "en_ZA",
  },
};

export const viewport: Viewport = {
  themeColor: "#0C1A18",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <head>
        {/* Decides cinematic-vs-fast BEFORE first paint. Prevents CLS and gives
            the pinned sections their scroll travel. See lib/capabilityScript.ts */}
        <script dangerouslySetInnerHTML={{ __html: CAPABILITY_SCRIPT }} />
        <link
          rel="preload"
          href="/fonts/satoshi-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/fraunces-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
