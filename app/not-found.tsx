import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "#07090C" }}
    >
      <div className="text-center max-w-xl">
        <p
          className="text-[10vw] md:text-[120px] font-black leading-none mb-0"
          style={{
            fontFamily: "var(--font-sora)",
            background:
              "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80') center/cover",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "brightness(1.3) contrast(1.1)",
          }}
        >
          404
        </p>
        <h1
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-sora)", color: "#F2EDE6" }}
        >
          Page not found.
        </h1>
        <p
          className="text-base mb-10"
          style={{ color: "rgba(242,237,230,0.45)", fontFamily: "var(--font-inter)", lineHeight: 1.8 }}
        >
          The page you're looking for doesn't exist or has moved.
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 text-white font-bold text-sm px-8 py-4 rounded-sm transition-all duration-200 hover:scale-105"
            style={{ background: "#E85D1B", fontFamily: "var(--font-sora)", letterSpacing: "0.05em" }}
          >
            Back to home <ArrowRight size={16} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-4 rounded-sm transition-all duration-200"
            style={{
              border: "1px solid rgba(242,237,230,0.15)",
              color: "rgba(242,237,230,0.6)",
              fontFamily: "var(--font-sora)",
            }}
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
