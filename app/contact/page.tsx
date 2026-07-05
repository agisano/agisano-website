"use client";

import { useState } from "react";

const services = [
  "Internet & WiFi Installation",
  "ICT Equipment Supply",
  "Managed IT Services",
  "Digital Presence",
  "Not sure — need advice",
];

const whatHappensNext = [
  "We reply within 1 business day",
  "Assessment scheduled at a time that suits you",
  "60-minute on-site visit — no sales pressure",
  "Clear proposal within 3 business days",
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
      <section className="contact-hero">
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <span className="eyebrow">Free · No obligation</span>
          <h1>
            Book a free
            <br />
            <em>school assessment.</em>
          </h1>
          <p>
            60 minutes on-site. We assess your school&apos;s connectivity, equipment, and digital
            needs — then give you a clear, honest picture of what&apos;s possible and what it costs.
          </p>
        </div>
      </section>

      <section className="contact-body">
        <div className="c-info">
          <h2>Get in touch</h2>

          <div className="c-item">
            <strong>Location</strong>
            <span>
              Gauteng, South Africa
              <br />
              Serving schools across the province
            </span>
          </div>
          <div className="c-item">
            <strong>Email</strong>
            <a href="mailto:hello@agisano.com">hello@agisano.com</a>
          </div>

          <div className="c-promise">
            <h3>What happens next</h3>
            <ul>
              {whatHappensNext.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="c-form">
          {submitted ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <h2 style={{ marginBottom: 16 }}>Message received.</h2>
              <p style={{ fontSize: 14, color: "rgba(242,237,230,0.55)", lineHeight: 1.7 }}>
                We&apos;ll be in touch within 1 business day to schedule your free assessment.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2>Book your free assessment</h2>
              <div className="f-row">
                <div className="f-group" style={{ marginBottom: 0 }}>
                  <label>Your name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Principal / HOD / IT coordinator"
                  />
                </div>
                <div className="f-group" style={{ marginBottom: 0 }}>
                  <label>School name *</label>
                  <input
                    type="text"
                    required
                    value={form.school}
                    onChange={(e) => setForm({ ...form, school: e.target.value })}
                    placeholder="Full school name"
                  />
                </div>
              </div>

              <div className="f-row" style={{ marginTop: 20 }}>
                <div className="f-group" style={{ marginBottom: 0 }}>
                  <label>Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@school.edu.za"
                  />
                </div>
                <div className="f-group" style={{ marginBottom: 0 }}>
                  <label>Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+27 82 000 0000"
                  />
                </div>
              </div>

              <div className="f-group" style={{ marginTop: 20 }}>
                <label>What are you most interested in?</label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                >
                  <option value="">Select a service...</option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="f-group">
                <label>Tell us about your school</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Number of learners, current situation, what you need most..."
                />
              </div>

              <button type="submit" className="f-submit" disabled={loading}>
                {loading ? "Sending..." : "Book free assessment"}
                {!loading && (
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                )}
              </button>
              <p className="f-note">No spam. No sales calls. Just a conversation about what&apos;s possible.</p>
            </form>
          )}
        </div>
      </section>

      <style>{`
        .contact-hero {
          min-height: 55vh; background: var(--ink); padding: 140px 48px 64px;
          display: flex; flex-direction: column; justify-content: flex-end;
        }
        .contact-hero h1 {
          font-family: var(--font-sora); font-size: clamp(52px,8vw,110px); font-weight: 900;
          color: var(--cream); letter-spacing: -0.05em; line-height: 0.9; margin: 16px 0 24px;
        }
        .contact-hero h1 em { font-style: normal; color: var(--orange); }
        .contact-hero p { font-size: 15px; color: rgba(242,237,230,0.45); max-width: 480px; line-height: 1.8; }
        .contact-body {
          background: var(--cream); padding: 80px 48px;
          display: grid; grid-template-columns: 5fr 7fr; gap: 80px; align-items: start;
          max-width: 1440px; margin: 0 auto;
        }
        .c-info h2 { font-family: var(--font-sora); font-size: 24px; font-weight: 700; color: var(--ink); margin-bottom: 32px; }
        .c-item { margin-bottom: 24px; }
        .c-item strong {
          display: block; font-family: var(--font-sora); font-size: 11px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--orange); margin-bottom: 4px;
        }
        .c-item span, .c-item a { font-size: 14px; color: rgba(7,9,12,0.65); line-height: 1.7; }
        .c-item a:hover { color: var(--ink); }
        .c-promise { margin-top: 40px; padding-top: 32px; border-top: 1px solid rgba(7,9,12,0.1); }
        .c-promise h3 { font-family: var(--font-sora); font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 16px; letter-spacing: 0.04em; }
        .c-promise ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .c-promise li { font-size: 13px; color: rgba(7,9,12,0.55); display: flex; gap: 10px; }
        .c-promise li::before { content: '→'; color: var(--orange); flex-shrink: 0; }
        .c-form { background: var(--ink); border-radius: 12px; padding: 48px; }
        .c-form h2 { font-family: var(--font-sora); font-size: 22px; font-weight: 700; color: var(--cream); margin-bottom: 32px; }
        .f-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .f-group { margin-bottom: 20px; }
        .f-group label {
          display: block; font-family: var(--font-sora); font-size: 10px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; color: rgba(242,237,230,0.4); margin-bottom: 8px;
        }
        .f-group input, .f-group select, .f-group textarea {
          width: 100%; background: rgba(242,237,230,0.05); border: 1px solid rgba(242,237,230,0.1);
          border-radius: 4px; padding: 14px 16px; font-size: 14px; color: var(--cream);
          font-family: var(--font-inter); outline: none; transition: border 0.2s;
        }
        .f-group input::placeholder, .f-group textarea::placeholder { color: rgba(242,237,230,0.25); }
        .f-group input:focus, .f-group select:focus, .f-group textarea:focus { border-color: var(--orange); }
        .f-group select option { background: #1a2232; color: var(--cream); }
        .f-group textarea { resize: none; }
        .f-submit {
          width: 100%; background: var(--orange); color: white; font-family: var(--font-sora);
          font-weight: 700; font-size: 14px; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 18px; border-radius: 4px; border: none; cursor: none; transition: all 0.25s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .f-submit:hover { background: var(--orange2); box-shadow: 0 16px 40px rgba(232,93,27,0.35); }
        .f-submit:disabled { opacity: 0.6; }
        .f-note { text-align: center; margin-top: 12px; font-size: 11px; color: rgba(242,237,230,0.25); }
        @media (max-width: 768px) {
          .contact-hero { padding: 120px 24px 56px; }
          .contact-body { grid-template-columns: 1fr; padding: 64px 24px; gap: 48px; }
          .f-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
