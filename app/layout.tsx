import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agisano — Building Together",
  description:
    "Agisano connects South Africa's public schools to the internet, technology, and digital tools their learners deserve. Gauteng-based. Community-focused.",
  keywords: ["school ICT", "public school wifi", "school internet South Africa", "managed IT services schools", "Gauteng school technology"],
  metadataBase: new URL("https://agisano.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Agisano — Building Together",
    description: "Connecting the schools that have been waiting.",
    url: "https://agisano.com",
    siteName: "Agisano",
    locale: "en_ZA",
    type: "website",
    images: [{ url: "/logo.png", width: 2400, height: 771, alt: "Agisano" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Cursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
