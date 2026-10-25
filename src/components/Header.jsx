"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GooeyNav from "@/components/GooeyNav";
import {
  Menu,
  X,
  LogIn,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  ChevronRight,
  ShieldCheck,
  CalendarCheck2,
  Users,
  Zap,
  MessageSquare,
  Layers,
} from "lucide-react";

const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
    desc: "Platform & social GTM overview",
    icon: Sparkles,
  },
  {
    label: "Solutions",
    href: "/solutions",
    desc: "Social engagement, amplification & GTM",
    icon: Layers,
    badge: "Popular",
  },
  {
    label: "About Us",
    href: "/about",
    desc: "Vision, mission & leadership",
    icon: Users,
    badge: "Champion",
  },
  {
    label: "Pricing",
    href: "/pricing",
    desc: "Engagement tiers & SaaS plans",
    icon: Zap,
    badge: "Save 20%",
  },
  {
    label: "Contact Us",
    href: "/contact",
    desc: "GTM strategy & 24/7 assistance",
    icon: MessageSquare,
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll effect for shadow and blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isDemoActive = pathname === "/Bookdemo" || pathname === "/book-demo";
  const isLoginActive = pathname === "/login";

  const activeNavIndex = NAV_LINKS.findIndex((link) =>
    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
  );

  const gooeyItems = NAV_LINKS.map((link) => {
    const IconComp = link.icon;
    return {
      label: link.label,
      href: link.href,
      icon: IconComp ? <IconComp className="h-4 w-4" /> : null,
    };
  });

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Micro Utility Bar */}
      <div
        className="hidden lg:block text-xs py-1.5 border-b font-medium transition-colors"
        style={{
          backgroundColor: "var(--topbar-bg)",
          color: "var(--topbar-text)",
          borderColor: "var(--topbar-border)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left Announcement */}
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold text-white"
              style={{ backgroundColor: "var(--primary)" }}
            >
              <Sparkles className="h-3 w-3" />
              New in 2026
            </span>

          </div>

          {/* Right Micro Links */}
          <div className="flex items-center gap-5 text-xs">
            <a
              href="mailto:contact@buzzoraa.com"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="h-3.5 w-3.5" style={{ color: "var(--secondary)" }} />
              <span>contact@buzzoraa.com</span>
            </a>

            <span className="text-white/20">|</span>

            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="h-3.5 w-3.5" style={{ color: "var(--secondary)" }} />
              <span>Helpline: <strong className="text-white font-semibold">+91 98765 43210</strong></span>
            </a>

            <span className="text-white/20">|</span>

            <div className="inline-flex items-center gap-1.5 text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>

            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 backdrop-blur-md border-b ${isScrolled
          ? "shadow-[0_10px_30px_-10px_rgba(15,23,42,0.08)] py-3"
          : "py-3.5 sm:py-4"
          }`}
        style={{
          backgroundColor: isScrolled
            ? "var(--header-scrolled-bg)"
            : "var(--header-bg)",
          borderColor: "var(--header-border)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo - Powered by Gooey Liquid Nav */}
          <div id="header-brand-target" data-brand-target="true" className="flex items-center shrink-0">
            <GooeyNav
              items={[
                {
                  label: "Buzzoraa",
                  href: "/",
                  icon: (
                    <span
                      className="h-6 w-6 rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm font-black text-xs"
                      style={{
                        background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                      }}
                    >
                      B
                    </span>
                  ),
                },
              ]}
              initialActiveIndex={0}
              theme="light"
              size="sm"
              frame={true}
              color="var(--primary)"
              activeTextColor="#ffffff"
              colors={["var(--primary)", "var(--secondary)", "#8b5cf6"]}
              particleCount={14}
              spread={38}
              animationTime={500}
              timeVariance={200}
              gooeyness={0.5}
              wobble={0.4}
              hoverEffect={true}
            />
          </div>

          {/* Desktop Navigation - Gooey Liquid Nav (React Bits) */}
          <div className="hidden lg:flex items-center justify-center">
            <GooeyNav
              items={gooeyItems}
              activeIndex={activeNavIndex >= 0 ? activeNavIndex : 0}
              theme="light"
              size="sm"
              frame={true}
              color="var(--primary)"
              activeTextColor="#ffffff"
              colors={["var(--primary)", "var(--secondary)", "#8b5cf6"]}
              particleCount={15}
              spread={46}
              animationTime={550}
              timeVariance={220}
              gooeyness={0.5}
              wobble={0.4}
              hoverEffect={true}
            />
          </div>

          {/* Desktop Right CTAs: Login & Book a Demo - Powered by Gooey Liquid Nav */}
          <div className="hidden sm:flex items-center">
            <GooeyNav
              items={[
                {
                  label: "Login",
                  target: "_blank",
                  href: "https://buzzoraa.com",
                  icon: <LogIn className="h-3.5 w-3.5" />,
                },
                {
                  label: "Book a Demo",
                  href: "/Bookdemo",
                  icon: <CalendarCheck2 className="h-3.5 w-3.5" />,
                },
              ]}
              activeIndex={isLoginActive ? 0 : 1}
              theme="light"
              size="sm"
              frame={true}
              color="var(--primary)"
              activeTextColor="#ffffff"
              colors={["var(--primary)", "var(--secondary)", "#f43f5e", "#8b5cf6"]}
              particleCount={15}
              spread={44}
              animationTime={520}
              timeVariance={200}
              gooeyness={0.5}
              wobble={0.4}
              hoverEffect={true}
            />
          </div>

          {/* Mobile Right Bar: Quick Demo CTA & Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/Bookdemo"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-transform active:scale-95"
              style={{
                backgroundColor: "var(--primary)",
                boxShadow: "0 4px 14px var(--primary-glow)",
              }}
            >
              <CalendarCheck2 className="h-3.5 w-3.5" />
              <span>Demo</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-slate-800 shadow-2xs hover:bg-slate-100 hover:text-slate-900 transition-all active:scale-90 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Full-Screen Native Style) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-white animate-in fade-in duration-200">
          {/* Header inside Mobile Drawer */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-white/95 backdrop-blur-md">
            {/* Brand Logo inside Drawer */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5"
            >
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center shadow-md text-white font-black text-sm"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                }}
              >
                B
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-slate-900 leading-none">
                  Buzzoraa<span style={{ color: "var(--primary)" }}>.</span>
                </span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
                  Social Engagement &amp; GTM SaaS
                </span>
              </div>
            </Link>

            {/* Crisp Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors active:scale-90"
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Body - Scrollable */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
            {/* Announcement / Status Banner */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 text-white shadow-sm border border-slate-800">
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-white shrink-0"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold">Buzzoraa SaaS Platform</div>
                  <div className="text-[10px] text-slate-300">Turn Conversations Into Growth</div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center gap-1 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>

            {/* Navigation Cards */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-2.5">
                Explore Platform
              </div>

              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all active:scale-[0.99] ${isActive
                        ? "border-slate-300 bg-slate-50 shadow-2xs"
                        : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/80"
                        }`}
                      style={
                        isActive
                          ? {
                            borderColor:
                              "color-mix(in srgb, var(--primary) 35%, transparent)",
                            backgroundColor:
                              "color-mix(in srgb, var(--primary) 6%, white)",
                          }
                          : {}
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all"
                          style={
                            isActive
                              ? {
                                backgroundColor: "var(--primary)",
                                color: "#ffffff",
                                boxShadow: "0 4px 14px var(--primary-glow)",
                              }
                              : {
                                backgroundColor: "var(--primary-light, #f1f5f9)",
                                color: "var(--primary, #475569)",
                              }
                          }
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div
                            className={`text-sm font-bold ${isActive ? "text-slate-900" : "text-slate-800"
                              }`}
                          >
                            {link.label}
                          </div>
                          <div className="text-xs text-slate-500">
                            {link.desc}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {link.badge && (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: "var(--primary-light)",
                              color: "var(--primary)",
                            }}
                          >
                            {link.badge}
                          </span>
                        )}
                        <ChevronRight
                          className={`h-4 w-4 ${isActive
                            ? "text-[var(--primary)] translate-x-0.5"
                            : "text-slate-300"
                            } transition-transform`}
                        />
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                href="/Bookdemo"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-2xl text-sm font-bold text-white shadow-lg transition-all active:scale-[0.98]"
                style={{
                  backgroundColor: "var(--primary)",
                  boxShadow: "0 10px 24px var(--primary-glow)",
                }}
              >
                <CalendarCheck2 className="h-4 w-4" />
                <span>Book a Live Demo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="https://buzzoraa.com"
                target="_blank"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-2xl text-sm font-semibold border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <LogIn className="h-4 w-4 text-slate-600" />
                <span>Login to Customer Portal</span>
              </Link>
            </div>

            {/* Quick Contact & Assistance Bar */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Direct Helpline
                </span>
                <span className="text-[10px] font-medium text-slate-400">
                  Mon - Sat: 9 AM - 7 PM
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors shadow-2xs"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Call Us</span>
                </a>

                <a
                  href="mailto:contact@buzzoraa.com"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors shadow-2xs"
                >
                  <Mail className="h-3.5 w-3.5 text-blue-600" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
