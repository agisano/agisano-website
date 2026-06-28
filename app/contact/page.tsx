"use client";

import { useState } from "react";
import AnimateIn from "@/components/AnimateIn";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

const services = [
  "Internet & WiFi Installation",
  "ICT Equipment Supply",
  "Managed IT Services",
  "Digital Presence (website, newsletter)",
  "Not sure — need advice",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    school: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission — wire to Formspree/Resend/email in production
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-20 bg-[#1C2B3A]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn>
            <p
              className="text-[#E85D1B] text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Free · No obligation
            </p>
            <h1
              className="text-5xl md:text-7xl font-bold text-white leading-tight max-w-3xl mb-6"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Book a free
              <br />
              <span className="text-[#E85D1B]">school assessment.</span>
            </h1>
            <p
              className="text-white/65 text-lg max-w-xl leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              60 minutes on-site. We assess your school&apos;s connectivity, equipment, and digital needs — then give you a clear, honest picture of what&apos;s possible and what it costs.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* Contact info */}
            <AnimateIn direction="left" className="lg:col-span-2">
              <div className="space-y-10">
                <div>
                  <h2
                    className="text-2xl font-bold text-[#1C2B3A] mb-6"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    Get in touch
                  </h2>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#E85D1B]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin size={16} className="text-[#E85D1B]" />
                      </div>
                      <div>
                        <p
                          className="text-[#1C2B3A] font-semibold text-sm mb-0.5"
                          style={{ fontFamily: "var(--font-sora)" }}
                        >
                          Location
                        </p>
                        <p
                          className="text-[#1C2B3A]/60 text-sm"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          Gauteng, South Africa
                          <br />
                          Serving schools across the province
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#E85D1B]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <Mail size={16} className="text-[#E85D1B]" />
                      </div>
                      <div>
                        <p
                          className="text-[#1C2B3A] font-semibold text-sm mb-0.5"
                          style={{ fontFamily: "var(--font-sora)" }}
                        >
                          Email
                        </p>
                        <a
                          href="mailto:hello@agisano.com"
                          className="text-[#E85D1B] text-sm hover:underline"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          hello@agisano.com
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#E85D1B]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <Phone size={16} className="text-[#E85D1B]" />
                      </div>
                      <div>
                        <p
                          className="text-[#1C2B3A] font-semibold text-sm mb-0.5"
                          style={{ fontFamily: "var(--font-sora)" }}
                        >
                          Phone / WhatsApp
                        </p>
                        <a
                          href="tel:+27000000000"
                          className="text-[#E85D1B] text-sm hover:underline"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          +27 (0) 00 000 0000
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* What to expect */}
                <div className="bg-[#1C2B3A] rounded-lg p-6 space-y-4">
                  <h3
                    className="text-white font-bold text-base"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    What to expect
                  </h3>
                  {[
                    "We reply within 1 business day",
                    "Assessment scheduled at a time that suits you",
                    "60-minute on-site visit — no sales pressure",
                    "Clear proposal within 3 business days",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle size={15} className="text-[#E85D1B] shrink-0 mt-0.5" />
                      <p
                        className="text-white/70 text-sm"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>

            {/* Form */}
            <AnimateIn direction="right" className="lg:col-span-3">
              {submitted ? (
                <div className="bg-white border border-[#3A7D44]/30 rounded-lg p-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#3A7D44]/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={32} className="text-[#3A7D44]" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-[#1C2B3A]"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    Message received.
                  </h3>
                  <p
                    className="text-[#1C2B3A]/60 text-base"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    We&apos;ll be in touch within 1 business day to schedule your free assessment.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white border border-[#1C2B3A]/8 rounded-lg p-8 space-y-5"
                >
                  <h2
                    className="text-xl font-bold text-[#1C2B3A] mb-2"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    Book your free assessment
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-[#1C2B3A] text-sm font-semibold mb-1.5"
                        style={{ fontFamily: "var(--font-sora)" }}
                      >
                        Your name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-[#1C2B3A]/15 rounded-sm px-4 py-3 text-sm text-[#1C2B3A] placeholder-[#1C2B3A]/35 focus:outline-none focus:border-[#E85D1B] focus:ring-1 focus:ring-[#E85D1B]/30 transition-all"
                        placeholder="Principal / HOD / IT coordinator"
                        style={{ fontFamily: "var(--font-inter)" }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[#1C2B3A] text-sm font-semibold mb-1.5"
                        style={{ fontFamily: "var(--font-sora)" }}
                      >
                        School name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.school}
                        onChange={(e) => setForm({ ...form, school: e.target.value })}
                        className="w-full border border-[#1C2B3A]/15 rounded-sm px-4 py-3 text-sm text-[#1C2B3A] placeholder-[#1C2B3A]/35 focus:outline-none focus:border-[#E85D1B] focus:ring-1 focus:ring-[#E85D1B]/30 transition-all"
                        placeholder="Full school name"
                        style={{ fontFamily: "var(--font-inter)" }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-[#1C2B3A] text-sm font-semibold mb-1.5"
                        style={{ fontFamily: "var(--font-sora)" }}
                      >
                        Email address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-[#1C2B3A]/15 rounded-sm px-4 py-3 text-sm text-[#1C2B3A] placeholder-[#1C2B3A]/35 focus:outline-none focus:border-[#E85D1B] focus:ring-1 focus:ring-[#E85D1B]/30 transition-all"
                        placeholder="you@school.edu.za"
                        style={{ fontFamily: "var(--font-inter)" }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[#1C2B3A] text-sm font-semibold mb-1.5"
                        style={{ fontFamily: "var(--font-sora)" }}
                      >
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-[#1C2B3A]/15 rounded-sm px-4 py-3 text-sm text-[#1C2B3A] placeholder-[#1C2B3A]/35 focus:outline-none focus:border-[#E85D1B] focus:ring-1 focus:ring-[#E85D1B]/30 transition-all"
                        placeholder="+27 82 000 0000"
                        style={{ fontFamily: "var(--font-inter)" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-[#1C2B3A] text-sm font-semibold mb-1.5"
                      style={{ fontFamily: "var(--font-sora)" }}
                    >
                      What are you most interested in?
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full border border-[#1C2B3A]/15 rounded-sm px-4 py-3 text-sm text-[#1C2B3A] focus:outline-none focus:border-[#E85D1B] focus:ring-1 focus:ring-[#E85D1B]/30 transition-all bg-white"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-[#1C2B3A] text-sm font-semibold mb-1.5"
                      style={{ fontFamily: "var(--font-sora)" }}
                    >
                      Tell us about your school
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-[#1C2B3A]/15 rounded-sm px-4 py-3 text-sm text-[#1C2B3A] placeholder-[#1C2B3A]/35 focus:outline-none focus:border-[#E85D1B] focus:ring-1 focus:ring-[#E85D1B]/30 transition-all resize-none"
                      placeholder="Number of learners, current connectivity situation, what you need most..."
                      style={{ fontFamily: "var(--font-inter)" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#E85D1B] hover:bg-[#F07340] disabled:opacity-60 text-white font-bold text-base px-8 py-4 rounded-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Book free assessment
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  <p
                    className="text-[#1C2B3A]/40 text-xs text-center"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    No spam. No sales calls. Just a conversation about what&apos;s possible.
                  </p>
                </form>
              )}
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  );
}
