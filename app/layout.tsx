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
  alternates: { canonical: "/" },
  openGraph: {
    title: "Agisano — one partner for your institution's technology",
    description:
      "One accountable partner for your institution's internet, equipment, IT support and digital presence.",
    type: "website",
    locale: "en_ZA",
    url: "https://agisano.com",
    siteName: "Agisano",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Agisano — one partner for your institution's technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agisano — one partner for your institution's technology",
    description:
      "One accountable partner for your institution's internet, equipment, IT support and digital presence.",
    images: ["/og.png"],
  },
};

/**
 * Organisation schema. Every claim here is already public on the site or in the
 * company profile — do not add a credential, an address or a contact point that
 * is not. `areaServed` and `knowsAbout` are what a local search actually keys
 * off for a services business.
 */
const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Agisano",
  legalName: "Agisano (Pty) Ltd",
  url: "https://agisano.com",
  logo: "https://agisano.com/favicon-512.png",
  image: "https://agisano.com/og.png",
  description:
    "One accountable partner for an institution's internet and WiFi, security, ICT equipment and AV, power resilience, managed IT support, and digital presence.",
  areaServed: { "@type": "AdministrativeArea", name: "Gauteng, South Africa" },
  address: { "@type": "PostalAddress", addressRegion: "Gauteng", addressCountry: "ZA" },
  knowsAbout: [
    "Internet and WiFi installation",
    "Network security and content filtering",
    "ICT equipment and classroom AV",
    "Power resilience and load-shedding backup",
    "Managed IT support",
    "School websites and digital administration",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />
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
