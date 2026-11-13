"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Iridescence from "@/components/Iridescence";
import FadeContent from "@/components/FadeContent";
import SpotlightCard from "@/components/SpotlightCard";
import LogoLoop from "@/components/LogoLoop";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Megaphone,
  Rocket,
  Users,
  Award,
  CalendarCheck2,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Building2,
  Check,
  Globe,
  Mic,
  Zap,
  BarChart3,
  MessageCircle,
  Compass,
  Copy,
  Target,
  Quote,
} from "lucide-react";
import {
  FaSalesforce,
  FaSlack,
  FaGithub,
  FaDiscord,
  FaDocker,
  FaReact,
  FaProductHunt,
  FaFigma,
} from "react-icons/fa6";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiVercel,
} from "react-icons/si";

// =============================================================================
// ❓ FREQUENTLY ASKED QUESTIONS
// =============================================================================
const FAQS = [
  {
    q: "How fast can we kick off a campaign or community initiative?",
    a: "After our initial discovery call, we prepare your campaign blueprint within 48 to 72 hours. Fast-track campaigns can be rolled out across social channels and community partners within 5 business days.",
  },
  {
    q: "Can you help with both virtual hackathons and on-ground summits?",
    a: "Yes! We specialize in virtual, hybrid, and in-person conferences. From live stream engagement stages to on-ground attendee badges and sponsor collateral, we cover the complete spectrum.",
  },
  {
    q: "How do you integrate with our CRM and community tools?",
    a: "Buzzoraa seamlessly connects with your CRM (Salesforce, HubSpot), social channels (LinkedIn, X/Twitter, Reddit), and community platforms (Slack, Discord) to sync conversations, leads, and engagement metrics in real-time.",
  },
  {
    q: "Can we invite Tarun Gupta for a keynote or panel session?",
    a: "Absolutely. You can reach out directly via WhatsApp, email us at contact@buzzoraa.com, or schedule a 1-on-1 strategy call through our Book Demo desk.",
  },
  {
    q: "What makes Buzzoraa different from a traditional marketing agency?",
    a: "We are built at the intersection of enterprise tech ecosystems (Salesforce, Tableau, Agentforce) and organic community advocacy. We drive authentic practitioner engagement rather than empty impressions.",
  },
];

// =============================================================================
// 🧭 DEDICATED DEPARTMENT CHANNELS
// =============================================================================
const CONTACT_CHANNELS = [
  {
    title: "GTM & Growth Strategy",
    description: "Event attendee acquisition, campaign roadmaps, product launch amplification & sponsor outreach.",
    email: "contact@buzzoraa.com",
    badge: "2-Hour Response",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: Rocket,
    action: "Email Growth Desk",
    link: "mailto:contact@buzzoraa.com?subject=GTM%20%26%20Growth%20Inquiry",
  },
  {
    title: "Community & Developer Advocacy",
    description: "Meetups, hackathons, Slack/Discord community architecture & student/practitioner programs.",
    email: "contact@buzzoraa.com",
    badge: "Fast Turnaround",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    icon: Users,
    action: "Connect Community",
    link: "mailto:contact@buzzoraa.com?subject=Community%20Advocacy%20Inquiry",
  },
  {
    title: "Enterprise IT & AI Consulting",
    description: "Certified Salesforce, Tableau, Agentforce, and custom workflow integrations by Vivaansh Consulting.",
    email: "contact@buzzoraa.com",
    badge: "Architect Consultation",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    icon: Zap,
    action: "Consult Architects",
    link: "mailto:contact@buzzoraa.com?subject=Enterprise%20Tech%20Consulting",
  },
  {
    title: "Keynotes & Executive Briefings",
    description: "Invite Tarun Gupta for conference keynotes, executive fireside chats, and masterclasses.",
    email: "contact@buzzoraa.com",
    badge: "Speaker Availability",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Mic,
    action: "Request Keynote",
    link: "mailto:contact@buzzoraa.com?subject=Keynote%20Speaker%20Request",
  },
];

// =============================================================================
// 🔄 ECOSYSTEM LOGOS (matching page.js LogoLoop)
// =============================================================================
const ECOSYSTEM_LOGOS = [
  { node: <FaSalesforce />, title: "Salesforce", href: "https://salesforce.com", hoverColor: "#00a1e0" },
  { node: <FaSlack />, title: "Slack", href: "https://slack.com", hoverColor: "#e01e5a" },
  { node: <FaGithub />, title: "GitHub", href: "https://github.com", hoverColor: "#ffffff" },
  { node: <FaDiscord />, title: "Discord", href: "https://discord.com", hoverColor: "#5865f2" },
  { node: <FaProductHunt />, title: "Product Hunt", href: "https://producthunt.com", hoverColor: "#da552f" },
  { node: <FaDocker />, title: "Docker", href: "https://docker.com", hoverColor: "#2496ed" },
  { node: <FaReact />, title: "React", href: "https://react.dev", hoverColor: "#61dafb" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org", hoverColor: "#ffffff" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://typescriptlang.org", hoverColor: "#3178c6" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com", hoverColor: "#38bdf8" },
  { node: <FaFigma />, title: "Figma", href: "https://figma.com", hoverColor: "#f24e1e" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://postgresql.org", hoverColor: "#336791" },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com", hoverColor: "#ffffff" },
];

// =============================================================================
// 👤 FOUNDER PORTRAIT WITH FALLBACK
// =============================================================================
function FounderPortraitSmall() {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-4 ring-indigo-500/10 shadow-md shrink-0 bg-slate-100">
      {!hasError ? (
        <Image
          src="/Tarun.png"
          alt="Tarun Gupta - Founder & CTO"
          fill
          sizes="(max-width: 640px) 80px, 96px"
          className="object-cover object-center"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 flex flex-col items-center justify-center text-white">
          <span className="text-xl font-black tracking-tight">TG</span>
          <span className="text-[8px] font-semibold text-white/80 uppercase">Founder</span>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// 🚀 CONTACT PAGE COMPONENT
// =============================================================================
export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("contact@buzzoraa.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* =======================================================================
          🎨 FIXED INTERACTIVE AMBIENT IRIDESCENT BACKGROUND (matching page.js)
         ======================================================================= */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <Iridescence
          color="#6366f1"
          hueShift={0}
          saturation={1}
          brightness={1.3}
          contrast={1.1}
          speed={0.7}
          scale={1}
          detail={8}
          warp={1}
          rotation={0}
          mouseReact={true}
          amplitude={0.12}
          stir={0.45}
          sheen={0.3}
          clickSwirl={true}
          grain={0.02}
          fade={0}
        />
        {/* Soft frosted glass overlay for high text contrast across the entire page */}
        <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />
      </div>

      {/* =======================================================================
          HERO SECTION: CONTEXTUAL HEADER ALIGNED WITH BUZZORAA
         ======================================================================= */}
      <section className="relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-b from-white via-slate-50/40 to-white pt-16 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-6 lg:px-8">
        {/* Technical Grid Pattern Background matching page.js layout */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_70%,transparent_100%)]" />

        {/* Ambient subtle radial glow matching theme */}
        <div
          className="pointer-events-none absolute top-12 right-1/4 h-96 w-96 rounded-full opacity-20 blur-3xl transition-colors duration-500 z-1"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <div
          className="pointer-events-none absolute bottom-12 left-10 h-80 w-80 rounded-full opacity-15 blur-3xl transition-colors duration-500 z-1"
          style={{ backgroundColor: "var(--secondary, #06b6d4)" }}
        />

        <div className="relative z-10 mx-auto max-w-5xl text-center space-y-6">
          <FadeContent effect="fade" blur={true} duration={1} delay={0.05} trigger="mount" className="space-y-6">
            {/* Top Pill Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs sm:text-sm font-bold shadow-2xs backdrop-blur-md transition-colors"
              style={{
                borderColor: "color-mix(in srgb, var(--primary) 35%, transparent)",
                backgroundColor: "color-mix(in srgb, var(--primary) 8%, white)",
                color: "var(--primary)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: "var(--primary)" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: "var(--primary)" }}
                />
              </span>
              <span>Direct Communication Hub • Instant Response</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12]">
              Let&apos;s Connect &amp; Turn Conversations Into{" "}
              <br className="hidden sm:inline" />
              <span
                className="text-transparent bg-clip-text transition-all duration-300"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--primary) 0%, #8b5cf6 50%, var(--secondary, #06b6d4) 100%)",
                }}
              >
                Sustainable Growth.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Whether you&apos;re planning a community hackathon, scaling a product launch, or seeking enterprise tech consultation—skip the forms and reach out directly through your preferred channel.
            </p>

            {/* Quick CTA Actions inside Hero */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="https://wa.me/919799472445?text=Hello%20Buzzoraa%20Team%2C%20I%20would%20like%20to%20discuss%20our%20growth%20and%20events."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/25 active:scale-95 transition-all duration-200 hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

              <Link
                href="/Bookdemo"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white text-xs sm:text-sm font-bold shadow-lg active:scale-95 transition-all duration-200 hover:scale-[1.02]"
                style={{
                  backgroundColor: "var(--primary)",
                  boxShadow: "0 10px 24px var(--primary-glow)",
                }}
              >
                <CalendarCheck2 className="h-4 w-4" />
                <span>Book Strategy Call (30 min)</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs sm:text-sm font-bold shadow-2xs hover:bg-slate-50 transition-all cursor-pointer active:scale-95"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span className="text-emerald-700">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-slate-400" />
                    <span>Copy contact@buzzoraa.com</span>
                  </>
                )}
              </button>
            </div>

            {/* Trust Guarantees Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-600">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Response within <strong>2 business hours</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                <span>Complimentary <strong>30-min strategy roadmap</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                <ShieldCheck className="h-4 w-4 text-indigo-500" />
                <span>Direct access to certified <strong>SME &amp; architects</strong></span>
              </div>
            </div>
          </FadeContent>
        </div>
      </section>

      {/* =======================================================================
          KEY CONTACT TILES (DIRECT CHANNELS INSTEAD OF FORM)
         ======================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-8">
        <FadeContent
          effect="focus"
          blur={true}
          stagger={0.12}
          duration={1}
          threshold={0.15}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Card 1: WhatsApp Priority Desk */}
          <div className="group rounded-3xl bg-white/95 p-6 sm:p-7 border border-slate-200/90 shadow-xl hover:shadow-2xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-300 shadow-sm">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200 shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Instant Chat
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                WhatsApp Desk
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Connect directly for quick turnarounds, event sponsorship inquiries, or immediate collaboration.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Available:</span>
                  <span className="font-semibold text-slate-800">Mon – Sat, 9am - 8pm</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Phone:</span>
                  <span className="font-semibold text-slate-800">+91 98765 43210</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <a
                href="https://wa.me/919799472445?text=Hello%20Buzzoraa%20Team%2C%20I%20want%20to%20discuss%20social%20engagement%20and%20GTM%20growth."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md active:scale-95"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 2: Official Email Inbox */}
          <div className="group rounded-3xl bg-white/95 p-6 sm:p-7 border border-slate-200/90 shadow-xl hover:shadow-2xl hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className="h-12 w-12 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:scale-105 shadow-sm"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  <Mail className="h-6 w-6" />
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200 shadow-2xs">
                  24/7 Monitored
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                Email Dispatch
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Send RFP briefs, deck presentations, sponsorship proposals, or detailed scope documents.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Primary:</span>
                  <span className="font-semibold text-slate-900">contact@buzzoraa.com</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Avg Response:</span>
                  <span className="font-semibold text-indigo-600">Under 2 Hours</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <a
                href="mailto:contact@buzzoraa.com"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-white text-xs font-bold transition-all shadow-md active:scale-95"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Send Direct Email</span>
              </a>
            </div>
          </div>

          {/* Card 3: Live Video Consultation (Book Demo) */}
          <div className="group rounded-3xl bg-white/95 p-6 sm:p-7 border border-slate-200/90 shadow-xl hover:shadow-2xl hover:border-cyan-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <CalendarCheck2 className="h-6 w-6" />
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-[11px] font-bold border border-cyan-200 shadow-2xs">
                  Google Meet
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 group-hover:text-cyan-700 transition-colors">
                Book Video Call
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Schedule a 30-minute tailored strategy session directly on our interactive calendar.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Format:</span>
                  <span className="font-semibold text-slate-800">1-on-1 Video Session</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Includes:</span>
                  <span className="font-semibold text-cyan-700">Custom Roadmap</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/Bookdemo"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md active:scale-95"
              >
                <CalendarCheck2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>Open Calendar Slots</span>
              </Link>
            </div>
          </div>

          {/* Card 4: Phone & Advisory Hotline */}
          <div className="group rounded-3xl bg-white/95 p-6 sm:p-7 border border-slate-200/90 shadow-xl hover:shadow-2xl hover:border-amber-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Phone className="h-6 w-6" />
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200 shadow-2xs">
                  Direct Line
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                Phone Support
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Need to speak with a human right away? Call our client relations desk during business hours.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Hotline:</span>
                  <span className="font-semibold text-slate-900">+91 98765 43210</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Hours:</span>
                  <span className="font-semibold text-slate-800">9:00 AM – 7:00 PM IST</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <a
                href="tel:+919799472445"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-md active:scale-95"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call Now (+91)</span>
              </a>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* =======================================================================
          EXECUTIVE LEADERSHIP SPOTLIGHT & INNOVATION HUB (2-COLUMN SHOWCASE)
         ======================================================================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/60">
        <FadeContent effect="fade" blur={true} duration={1} threshold={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Executive Founder Card (7 cols) */}
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white/95 border border-slate-200/90 shadow-2xl relative overflow-hidden flex flex-col justify-between backdrop-blur-md">
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--primary) 0%, var(--secondary, #06b6d4) 100%)",
                }}
              />

              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
                  <FounderPortraitSmall />

                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-1.5 shadow-2xs">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>Direct Executive Access</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Tarun Gupta
                    </h3>
                    <p className="text-xs sm:text-sm text-indigo-600 font-bold">
                      Founder &amp; CTO • Vivaansh Consulting
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                      2x Tableau Ambassador • Salesforce Champion • Keynote Speaker
                    </p>
                  </div>
                </div>

                <blockquote className="text-sm sm:text-base text-slate-700 leading-relaxed italic bg-slate-50/90 p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  &ldquo;Whether you want to organize a viral developer hackathon, execute a high-profile summit, or integrate Agentforce &amp; Tableau analytics into your pipeline—we treat your growth as our own.&rdquo;
                </blockquote>

                {/* Badges / Credibility Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-center shadow-2xs">
                    <div className="text-sm font-black text-slate-900">100+</div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">Events Guided</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-center shadow-2xs">
                    <div className="text-sm font-black text-slate-900">50K+</div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">Community Members</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-center col-span-2 sm:col-span-1 shadow-2xs">
                    <div className="text-sm font-black text-indigo-600">Salesforce &amp; Tableau</div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">Ecosystem Leader</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/about#founder-story"
                  className="font-bold text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1.5 group"
                >
                  <span>Read Full Executive Story &amp; Accreditations</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="mailto:contact@buzzoraa.com?subject=Inquiry%20for%20Tarun%20Gupta"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors shadow-2xs"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Message Tarun</span>
                </a>
              </div>
            </div>

            {/* Headquarters & Global Presence Card (5 cols) - Sleek Dark Aesthetic */}
            <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-slate-950 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl border border-slate-800 backdrop-blur-md">
              <div
                className="absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl opacity-30 pointer-events-none"
                style={{ backgroundColor: "var(--primary)" }}
              />

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-slate-300 border border-white/10 mb-4 shadow-inner">
                  <Building2 className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Global Headquarters</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Buzzoraa Innovation Hub
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-normal">
                  Operating at the heart of technological innovation, coordinating physical and virtual community events worldwide.
                </p>

                <div className="mt-6 space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold">Location:</strong>
                      <span className="text-slate-300">Tech Park, Cyber City, Tech Hub • Global Operations</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold">Operating Hours:</strong>
                      <span className="text-slate-300">Monday – Saturday: 9:00 AM – 7:00 PM IST (Online Desk: 24/7)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold">Global Coverage:</strong>
                      <span className="text-slate-300">India, North America, EMEA, and APAC ecosystems.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10">
                <Link
                  href="/Bookdemo"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-xl active:scale-95 transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    backgroundColor: "var(--primary)",
                    boxShadow: "0 10px 24px var(--primary-glow)",
                  }}
                >
                  <CalendarCheck2 className="h-4 w-4" />
                  <span>Book Live Demonstration</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* =======================================================================
          DEPARTMENT INQUIRY DESKS (GRID OF 4 PURPOSE-BUILT PATHWAYS)
         ======================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/60">
        <FadeContent effect="fade" blur={true} duration={1} threshold={0.15} className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-2xs backdrop-blur-md"
            style={{
              borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)",
              backgroundColor: "color-mix(in srgb, var(--primary) 8%, white)",
              color: "var(--primary)",
            }}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Dedicated Channels</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Connect With the Right Specialization
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Pick your exact domain so we route your inquiry with full context and no delays.
          </p>
        </FadeContent>

        <FadeContent
          effect="focus"
          blur={true}
          stagger={0.12}
          duration={1}
          threshold={0.15}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {CONTACT_CHANNELS.map((channel, cIdx) => {
            const Icon = channel.icon;
            return (
              <div
                key={cIdx}
                className="p-6 sm:p-7 rounded-3xl bg-white/95 border border-slate-200/90 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group backdrop-blur-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span
                      className="h-12 w-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border shadow-2xs ${channel.badgeColor}`}>
                      {channel.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {channel.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                    {channel.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    {channel.email}
                  </span>
                  <a
                    href={channel.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <span>{channel.action}</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </FadeContent>
      </section>

      {/* =======================================================================
          SECTION: ECOSYSTEM & TECH INTEGRATIONS (LogoLoop from page.js)
         ======================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 text-center font-semibold">
            Trusted Platforms, CRM Integrations &amp; Global Networks
          </p>
          <div className="relative w-full overflow-hidden py-3">
            <LogoLoop
              logos={ECOSYSTEM_LOGOS}
              speed={75}
              direction="left"
              logoHeight={34}
              gap={60}
              scaleOnHover={true}
              fadeOut={true}
              fadeOutWidth={0.15}
              labels="hover"
              ariaLabel="Buzzoraa Ecosystem Partners"
            />
          </div>
        </div>
      </section>

      {/* =======================================================================
          SECTION: FREQUENTLY ASKED QUESTIONS
         ======================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-200/60">
        <FadeContent effect="fade" blur={true} duration={1} threshold={0.15}>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-2xs backdrop-blur-md"
              style={{
                borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)",
                backgroundColor: "color-mix(in srgb, var(--primary) 8%, white)",
                color: "var(--primary)",
              }}
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Common questions regarding campaign rollouts, speaking sessions, partnerships, and technical capabilities.
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl bg-white/95 border transition-all duration-200 shadow-sm backdrop-blur-md ${isOpen ? "border-indigo-300 ring-2 ring-indigo-500/10 shadow-md" : "border-slate-200/90 hover:border-slate-300"
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-bold text-slate-900">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-indigo-600" : ""
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </FadeContent>
      </section>

      {/* =======================================================================
          BOTTOM SECTION: QUICK CTA BANNER (DARK THEME)
         ======================================================================= */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-white text-center relative overflow-hidden bg-slate-950 border-t border-slate-800"
      >
        <div
          className="absolute -top-32 right-10 h-80 w-80 rounded-full blur-[130px] opacity-25 pointer-events-none"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <div
          className="absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[130px] opacity-20 pointer-events-none"
          style={{ backgroundColor: "var(--secondary, #06b6d4)" }}
        />

        <div className="relative mx-auto max-w-3xl space-y-5">
          <FadeContent effect="fade" blur={true} duration={1} threshold={0.15}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold text-slate-200 border border-white/10 shadow-inner">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span>Ready to Elevate Your Community &amp; GTM?</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              Turn Your Next Campaign Into an Industry Benchmark
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto font-normal mt-2">
              From registration hype and live stages to Salesforce &amp; Tableau analytics dashboards—we provide the complete growth engine.
            </p>
            <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/Bookdemo"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: "var(--primary)",
                  boxShadow: "0 10px 24px var(--primary-glow)",
                }}
              >
                <CalendarCheck2 className="h-4 w-4" />
                <span>Book Strategy Session</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/919799472445?text=Hello%20Buzzoraa%20Team%2C%20I%20want%20to%20discuss%20our%20community%20growth."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-md transition-all active:scale-95 hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Us Directly</span>
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-200 border border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all"
              >
                <span>Explore About Us</span>
              </Link>
            </div>
          </FadeContent>
        </div>
      </section>
    </div>
  );
}
