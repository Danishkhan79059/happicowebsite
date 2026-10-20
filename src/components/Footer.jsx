"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Heart,
} from "lucide-react";

const PRODUCT_LINKS = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "About Us", href: "/about" },
  { label: "Pricing & Plans", href: "/pricing" },
  { label: "Book a Demo", href: "/Bookdemo" },
  { label: "Contact Us", href: "/contact" },
  { label: "Client Portal Login", href: "/login" },
];

const COMPANY_LINKS = [
  { label: "About Happico", href: "/about" },
  { label: "Platform Solutions", href: "/solutions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Services", href: "/terms-and-services" },
  { label: "Refund & Cancellation", href: "/refund-and-cancellation" },
  { label: "Contact & Support", href: "/contact" },
];

function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      className="w-full text-white border-t transition-colors relative overflow-hidden"
      style={{
        backgroundColor: "var(--footer-bg)",
        borderColor: "var(--footer-border)",
      }}
    >
      {/* Subtle Top Ambient Glow Accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 blur-3xl opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top, var(--primary) 0%, transparent 70%)",
        }}
      />

      {/* Main Footer Container */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand Info & Mission (Col span: 4) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div
                className="h-10 w-10 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                  boxShadow: "0 8px 20px var(--primary-glow)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                >
                  <path
                    d="M6 4V20M18 4V20M6 12H18"
                    stroke="currentColor"
                    strokeWidth="2.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="7" r="1.5" fill="currentColor" />
                </svg>
              </div>

              <span className="text-2xl font-black tracking-tight text-white">
                Happico<span style={{ color: "var(--primary)" }}>.</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-slate-300 max-w-sm">
              Happico is designed to elevate your digital experience with modern workflows, intuitive interfaces, and unified customer-centric solutions.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-col gap-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Enterprise grade security &amp; 99.9% uptime SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>24/7 dedicated support &amp; seamless integration</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
                { icon: LinkedInIcon, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: GitHubIcon, href: "https://github.com", label: "GitHub" },
                { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="h-9 w-9 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 text-slate-400 hover:text-white transition-all duration-200"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--primary)";
                      e.currentTarget.style.borderColor = "var(--primary)";
                      e.currentTarget.style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.color = "#94a3b8";
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Navigation / Product Links (Col span: 2) */}
          <div className="lg:col-span-2 sm:col-span-1 flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span
                      className="h-1 w-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: "var(--primary)" }}
                    />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company Links (Col span: 2) */}
          <div className="lg:col-span-2 sm:col-span-1 flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span
                      className="h-1 w-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: "var(--primary)" }}
                    />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact Hub (Col span: 4) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Stay Connected
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Subscribe to get product announcements, exclusive updates, and early feature access.
            </p>

            {/* Newsletter Input Box */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center rounded-xl p-1.5 border"
              style={{
                backgroundColor: "var(--footer-surface)",
                borderColor: "var(--footer-border)",
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
                aria-label="Email Address"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-bold text-white transition-transform active:scale-95 shrink-0 shadow-md cursor-pointer"
                style={{
                  backgroundColor: "var(--primary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--primary-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--primary)";
                }}
              >
                <span>Join</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>

            {/* Quick Contact Information */}
            <div
              className="mt-2 p-4 rounded-xl border flex flex-col gap-2.5 text-xs text-slate-300"
              style={{
                backgroundColor: "var(--footer-surface)",
                borderColor: "var(--footer-border)",
              }}
            >
              <a
                href="mailto:contact@happico.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" style={{ color: "var(--secondary)" }} />
                <span>contact@happico.com</span>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" style={{ color: "var(--secondary)" }} />
                <span>+91 98765 43210 (Mon-Sat, 9am - 7pm)</span>
              </a>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" style={{ color: "var(--secondary)" }} />
                <span>Happico Headquarters, Cyber City, Tech Hub</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Compliance */}
      <div
        className="border-t py-6"
        style={{
          backgroundColor: "var(--footer-bottom-bg)",
          borderColor: "var(--footer-border)",
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          {/* Copyright */}
          <p className="text-xs text-slate-400 text-center sm:text-left flex items-center gap-1 flex-wrap justify-center">
            <span>© 2026 Happico Inc. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span>Crafted with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500 inline" />
            <span>for seamless customer experiences.</span>
          </p>

          {/* Quick Legal Links & Status */}
          <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap justify-center sm:justify-end">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-services" className="hover:text-white transition-colors">
              Terms & Services
            </Link>
            <Link href="/refund-and-cancellation" className="hover:text-white transition-colors">
              Refund & Cancellation
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Support
            </Link>
            <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
