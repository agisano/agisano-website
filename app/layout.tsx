import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Agisano — Building Together",
    description: "Connecting the schools that have been waiting.",
    url: "https://agisano.com",
    siteName: "Agisano",
    locale: "en_ZA",
    type: "website",
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
