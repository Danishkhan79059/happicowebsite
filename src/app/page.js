"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MaskedHeading from "@/components/MaskedHeading";
import FadeContent from "@/components/FadeContent";
import GooeyNav from "@/components/GooeyNav";
import SwarmCursor from "@/components/SwarmCursor";
import MagicBento from "@/components/MagicBento";
import AccordionGallery from "@/components/AccordionGallery";
import LogoLoop from "@/components/LogoLoop";
import Iridescence from "@/components/Iridescence";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import DepthCarousel from "@/components/DepthCarousel";
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
// 🖼️ ACCORDION GALLERY ITEMS (Community & Event Highlights)
// =============================================================================
const ACCORDION_GALLERY_ITEMS = [
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    label: "Social Engagement Summits",
    link: "/book-demo",
    alt: "Social Engagement & GTM Summits",
  },
  {
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    label: "Community Activation Sprints",
    link: "/book-demo",
    alt: "Advocate & Community Activation Sprints",
  },
  {
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    label: "Content Amplification Live",
    link: "/book-demo",
    alt: "Buzzoraa Content Amplification & Broadcasts",
  },
  {
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    label: "Founder & Brand Networks",
    link: "/book-demo",
    alt: "Founder & Brand Thought Leadership Hubs",
  },
  {
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
    label: "GTM Growth Pipelines",
    link: "/book-demo",
    alt: "Conversation-Led GTM Pipelines",
  },
];

// =============================================================================
// 🎴 DEPTH CAROUSEL ITEMS (React Bits Component - 3D Perspective Experience)
// =============================================================================
const BUZZORAA_DEPTH_CAROUSEL_ITEMS = [
  {
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    alt: "Social Listening & Real-Time Intent Intelligence",
    title: "Social Listening Engine",
    subtitle: "AI Intent Scoring & Real-Time Alerts",
  },
  {
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    alt: "Advocate & Super-Fan Mobilization",
    title: "Advocate Mobilization",
    subtitle: "Gamified Bounties & Ambassador Perks",
  },
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    alt: "Global Social Engagement Summits",
    title: "Global Engagement Summits",
    subtitle: "Worldwide Community Thought Leadership",
  },
  {
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    alt: "Developer Hackathons & Arena Competitions",
    title: "Developer Arena Sprints",
    subtitle: "Automated Evaluation & Leaderboard",
  },
  {
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    alt: "Multi-Network Content Amplification Loops",
    title: "Content Amplification",
    subtitle: "Cross-Platform Syndication & Timing",
  },
  {
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    alt: "High-Intent GTM Pipeline Engine",
    title: "GTM Pipeline Sync",
    subtitle: "Sub-Second Salesforce & HubSpot Routing",
  },
];

// =============================================================================
// 🌐 ECOSYSTEM & PLATFORM INTEGRATIONS FOR LOGOLOOP
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
// 🍱 MAGIC BENTO GRID ITEMS (Buzzoraa Social Engagement & GTM SaaS Content)
// =============================================================================
const BUZZORAA_BENTO_ITEMS = [
  {
    label: "Social Engagement",
    title: "Real-Time Conversation Intelligence",
    description: "Turn every mention, comment, and discussion across social networks into meaningful customer relationships.",
    visual: "analytics",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    label: "Community Activation",
    title: "Advocate & Super-Fan Mobilization",
    description: "Mobilize super-fans, power users, and community champions to fuel organic advocacy and virality.",
    visual: "dashboard",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    label: "Content Amplification",
    title: "Multi-Network Viral Syndication",
    description: "Amplify brand stories, launch updates, and product announcements across social networks with automated distribution loops.",
    visual: "collaboration",
    colSpan: 2,
    rowSpan: 2,
  },
  {
    label: "GTM Growth Engine",
    title: "Conversations to High-Intent Pipeline",
    description: "Bridge social touchpoints directly into CRM pipelines, automated lead scoring, and closed-won deals sub-second.",
    visual: "automation",
    colSpan: 2,
    rowSpan: 2,
  },
  {
    label: "Social Networking Hub",
    title: "Sync LinkedIn, X, Slack, Discord & Reddit",
    description: "Bi-directional pipelines keeping social discussions, community channels, and enterprise analytics synchronized.",
    visual: "integration",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    label: "Enterprise Governance",
    title: "Bank-Grade SSO & Telemetry Privacy",
    description: "Enterprise conversation telemetry, GDPR compliance, 2FA protocols, and secure brand data architecture.",
    visual: "security",
    colSpan: 1,
    rowSpan: 1,
  },
];

// =============================================================================
// 📚 SCROLL STACK CARDS: 4 CORE PILLARS OF BUZZORAA (React Bits Component)
// 👉 NOTE FOR USER: Isme images nahi lagayi gayi hain. Baad me images add karne
//    ke liye har card ke visual slot me <Image /> ka code laga sakte hain!
// =============================================================================
const BUZZORAA_STACK_CARDS = [
  {
    step: "01",
    pillar: "Pillar 01",
    tag: "Social Intelligence",
    title: "Real-Time Conversation Listening & Intent Scoring",
    description:
      "Capture multi-channel discussions across LinkedIn, X, Slack, Discord, and Reddit in real-time. Buzzoraa's AI decodes buying signals, sentiment shifts, and competitor mentions in sub-seconds.",
    badge: "Real-Time Telemetry",
    accent: "#6366f1",
    features: [
      "Omnichannel Signal Stream Sync (LinkedIn, X, Slack, Discord)",
      "AI High-Intent Buyer Lead Scoring & Classification",
      "Real-Time Sentiment Velocity & Trend Anomaly Alerts",
      "Zero-Loss Real-Time Stream Ingestion Engine",
    ],
    stats: [
      { label: "Signals / Day", value: "2.4M+" },
      { label: "Intent Accuracy", value: "99.4%" },
      { label: "Alert Latency", value: "< 250ms" },
    ],
    ctaText: "Explore Social Intelligence",
    ctaLink: "/solutions",
    codeOrSlotNote: "Signal Ingestion: 8,420 Active Signals / min",
  },
  {
    step: "02",
    pillar: "Pillar 02",
    tag: "Community Activation",
    title: "Advocate & Super-Fan Mobilization Engine",
    description:
      "Transform community advocates into your most powerful go-to-market distribution channel. Mobilize super-fans with automated bounties, gamified sprints, and verified leaderboards.",
    badge: "Advocacy Velocity",
    accent: "#06b6d4",
    features: [
      "Automated Power-User Identification & Scoring",
      "Gamified Referral Sprints & Community Bounties",
      "Dynamic Leaderboard Telemetry & Verified Ranks",
      "Tiered Digital Credentials & Ambassador Perks",
    ],
    stats: [
      { label: "Active Advocates", value: "14,800+" },
      { label: "Peer Conversion", value: "4.8x" },
      { label: "Retention Rate", value: "92%" },
    ],
    ctaText: "Discover Community Sprints",
    ctaLink: "/solutions",
    codeOrSlotNote: "Advocate Network: 14.8k Active Champions",
  },
  {
    step: "03",
    pillar: "Pillar 03",
    tag: "Content Amplification",
    title: "Multi-Network Viral Syndication & Automated Loops",
    description:
      "Amplify your product announcements, launches, and founder stories with automated cross-platform syndication, optimal algorithmic timing, and dynamic snippet generation.",
    badge: "Viral Syndication",
    accent: "#ec4899",
    features: [
      "1-Click Cross-Platform Omnichannel Broadcast",
      "Algorithmic Peak-Engagement Optimal Timing",
      "Smart Multi-Format Snippet & Thread Repurposing",
      "Predictive Reach Modeling & Virality Scoring",
    ],
    stats: [
      { label: "Organic Reach", value: "+340%" },
      { label: "Weekly Saved", value: "18 hrs" },
      { label: "Viral Depth", value: "6.2x" },
    ],
    ctaText: "Explore Content Loops",
    ctaLink: "/solutions",
    codeOrSlotNote: "Broadcast Engine: Multi-Network Syndication Active",
  },
  {
    step: "04",
    pillar: "Pillar 04",
    tag: "Revenue Engine",
    title: "Conversations to High-Intent Pipeline & CRM Sync",
    description:
      "Bridge social touchpoints directly into Salesforce, HubSpot, and executive channels. Automatically enrich inbound social leads, attribute revenue to advocate touchpoints, and accelerate deal cycles.",
    badge: "Enterprise GTM",
    accent: "#10b981",
    features: [
      "Sub-Second CRM Lead Routing & Opportunity Mapping",
      "Multi-Touch Social Attribution & Deal Attribution",
      "Automated Account Enrichment & Buying Committee Mapping",
      "Executive Revenue Telemetry & Closed-Won Dashboards",
    ],
    stats: [
      { label: "Influenced ARR", value: "$12.4M" },
      { label: "Routing Latency", value: "< 30s" },
      { label: "Win Rate Lift", value: "+38%" },
    ],
    ctaText: "Book a Pipeline Demo",
    ctaLink: "/Bookdemo",
    codeOrSlotNote: "CRM Telemetry: Sub-Second Bi-directional Sync Active",
  },
];

import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Palette,
  ShieldCheck,
  CalendarCheck2,
  LogIn,
  Zap,
  Globe,
  Layers,
  Sliders,
  Check,
  Star,
  Users,
  Trophy,
  Code2,
  Cpu,
  TrendingUp,
  BarChart3,
  Megaphone,
  Rocket,
  Award,
  Briefcase,
  Network,
  MessageSquare,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

const THEME_PRESETS = [
  { name: "Indigo Tech", primary: "#6366f1", hover: "#4f46e5", light: "#eef2ff", glow: "rgba(99, 102, 241, 0.25)" },
  { name: "Ocean Blue", primary: "#2563eb", hover: "#1d4ed8", light: "#eff6ff", glow: "rgba(37, 99, 235, 0.25)" },
  { name: "Emerald Growth", primary: "#10b981", hover: "#059669", light: "#ecfdf5", glow: "rgba(16, 185, 129, 0.25)" },
  { name: "Sunset Crimson", primary: "#f97316", hover: "#ea580c", light: "#fff7ed", glow: "rgba(249, 115, 22, 0.25)" },
  { name: "Royal Violet", primary: "#8b5cf6", hover: "#7c3aed", light: "#f5f3ff", glow: "rgba(139, 92, 246, 0.25)" },
  { name: "Rose Passion", primary: "#f43f5e", hover: "#e11d48", light: "#fff1f2", glow: "rgba(244, 63, 94, 0.25)" },
];

{/* =========================================================================
    VISUAL FUNCTION 0: HeroInteractiveVisual (Hero Section Visual)
    -------------------------------------------------------------------------
    👉 Baad me apni custom image lagane ke liye:
       Image path src="/community-event-stage.jpg" ko badal dein.
   ========================================================================= */}
function HeroInteractiveVisual() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      {/* Decorative ambient radial glow */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-3xl opacity-30 blur-2xl transition-all duration-700"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--primary) 0%, var(--secondary) 60%, transparent 80%)",
        }}
      />

      {/* React Bits SwarmCursor Live Interactive Particle Background */}
      <SwarmCursor
        count={850}
        size={3.2}
        spread={140}
        speed={1.1}
        swirl={0.65}
        color="#6366f1"
        accentColor="#06b6d4"
        clickEffect="burst"
        idle="roam"
        lightMode={true}
        targets="a, button, [data-swarm-target]"
        className="relative rounded-3xl p-4 sm:p-6 -m-4 sm:-m-6"
        style={{ overflow: "visible" }}
      >
        {/* Main Glassmorphic Visual Frame */}
        <div className="relative rounded-3xl border border-slate-200/80 bg-white/85 p-3 sm:p-4 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-indigo-500/10 hover:-translate-y-0.5">
          {/* Top Window Bar (Mockup Controls) */}
          <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>buzzoraa.com/platform</span>
            </div>
            <span
              data-swarm-target
              className="text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer transition-transform hover:scale-105"
              style={{
                backgroundColor: "var(--primary-light)",
                color: "var(--primary)",
              }}
            >
              Live Engine
            </span>
          </div>

          {/* 📸 HERO IMAGE SLOT */}
          <div className="relative mt-3 aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 via-indigo-50/30 to-slate-100 border border-slate-100 group">
            {!imageError ? (
              <Image
                src="/community-event-stage.jpg"
                alt="Buzzoraa Social Engagement & GTM Platform"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px)"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                onError={() => setImageError(true)}
                priority
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-slate-50">
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center mb-3 shadow-inner"
                  style={{
                    backgroundColor: "var(--primary-light)",
                    color: "var(--primary)",
                  }}
                >
                  <Sparkles className="h-7 w-7" />
                </div>
                <p className="text-sm font-bold text-slate-800">Hero Image Slot</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Aap baad me yahan apni image laga sakte hain (<code className="text-indigo-600 font-mono">public/your-image.jpg</code>)
                </p>
              </div>
            )}

            {/* Bottom subtle gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

            {/* Overlay details */}
            <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between gap-2">
              <div>
                <p className="text-xs sm:text-sm font-bold text-white drop-shadow-sm">
                  Global Tech Community &amp; Live Hackathons
                </p>
                <p className="text-[11px] text-slate-200">
                  Full-Funnel Attendee Acquisition &amp; Developer Growth
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-500/90 text-white shadow-sm backdrop-blur-xs shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                Active
              </span>
            </div>
          </div>

          {/* Floating Animated Badge 1 - Top Right */}
          <div
            data-swarm-target
            className="absolute -top-4 -right-2 sm:-right-4 rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 sm:p-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-md"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900">50,000+</div>
                <div className="text-[10px] font-medium text-slate-500">Tech Members</div>
              </div>
            </div>
          </div>

          {/* Floating Animated Badge 2 - Bottom Left */}
          <div
            data-swarm-target
            className="absolute -bottom-4 -left-2 sm:-left-4 rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 sm:p-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md">
                <CalendarCheck2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900">100+ Events</div>
                <div className="text-[10px] font-medium text-slate-500">Sold-Out Campaigns</div>
              </div>
            </div>
          </div>
        </div>
      </SwarmCursor>
    </div>
  );
}

{/* =========================================================================
    VISUAL FUNCTION 1: HackathonInteractiveVisual (Hackathon Arena)
    -------------------------------------------------------------------------
    👉 Baad me apni custom image lagane ke liye:
       Image path src="/hackathon-dashboard.jpg" ko badal dein.
   ========================================================================= */}
function HackathonInteractiveVisual() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      {/* Glow */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-3xl opacity-25 blur-2xl transition-all duration-700"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, var(--secondary) 0%, var(--primary) 70%, transparent 80%)",
        }}
      />

      <div className="relative rounded-3xl border border-slate-200/80 bg-white/90 p-3 sm:p-4 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-cyan-500/10 hover:-translate-y-0.5 group">
        {/* Window controls */}
        <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <Code2 className="h-3.5 w-3.5 text-cyan-500" />
            <span>buzzoraa.com/community/activation</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200/60">
            Activation Sprints
          </span>
        </div>

        {/* 📸 IMAGE SLOT */}
        <div className="relative mt-3 aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-200/60">
          {!imageError ? (
            <Image
              src="/hackathon-dashboard.jpg"
              alt="Buzzoraa Community Activation Dashboard"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px)"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-slate-900 text-white">
              <Trophy className="h-10 w-10 text-amber-400 mb-2" />
              <p className="text-sm font-bold">Hackathon Visual Slot</p>
              <p className="text-xs text-slate-400 mt-1">Image: public/hackathon-dashboard.jpg</p>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between gap-2">
            <div>
              <p className="text-xs sm:text-sm font-bold text-white drop-shadow-sm">
                AI &amp; Cloud Innovation Arena
              </p>
              <p className="text-[11px] text-slate-300">
                Live Submissions, Automated Judging &amp; Instant Leaderboard
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-cyan-500 text-white shadow-sm shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
              Live Arena
            </span>
          </div>
        </div>

        {/* Floating Badge 1 - Top Left */}
        <div className="absolute -top-4 -left-2 sm:-left-4 rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 sm:p-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900">1,200+ Teams</div>
              <div className="text-[10px] font-medium text-slate-500">Live Code Evaluations</div>
            </div>
          </div>
        </div>

        {/* Floating Badge 2 - Bottom Right */}
        <div className="absolute -bottom-4 -right-2 sm:-right-4 rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 sm:p-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-md"
              style={{ backgroundColor: "var(--primary)" }}
            >
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900">Multi-Track Prizes</div>
              <div className="text-[10px] font-medium text-slate-500">Holographic Awards</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{/* =========================================================================
    VISUAL FUNCTION 2: EventCampaignInteractiveVisual (Event Marketing)
    -------------------------------------------------------------------------
    👉 Baad me apni custom image lagane ke liye:
       Image path src="/community-analytics.jpg" ko badal dein.
   ========================================================================= */}
function EventCampaignInteractiveVisual() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      {/* Glow */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-3xl opacity-25 blur-2xl transition-all duration-700"
        style={{
          background:
            "radial-gradient(circle at 60% 50%, var(--primary) 0%, #ec4899 60%, transparent 80%)",
        }}
      />

      <div className="relative rounded-3xl border border-slate-200/80 bg-white/90 p-3 sm:p-4 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-indigo-500/10 hover:-translate-y-0.5 group">
        {/* Window controls */}
        <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <BarChart3 className="h-3.5 w-3.5 text-indigo-500" />
            <span>buzzoraa.com/gtm/growth</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            Real-Time ROI
          </span>
        </div>

        {/* 📸 IMAGE SLOT */}
        <div className="relative mt-3 aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-200/60">
          {!imageError ? (
            <Image
              src="/community-analytics.jpg"
              alt="Buzzoraa Content Amplification Funnels"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px)"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-slate-900 text-white">
              <Megaphone className="h-10 w-10 text-indigo-400 mb-2" />
              <p className="text-sm font-bold">Event Marketing Visual Slot</p>
              <p className="text-xs text-slate-400 mt-1">Image: public/community-analytics.jpg</p>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between gap-2">
            <div>
              <p className="text-xs sm:text-sm font-bold text-white drop-shadow-sm">
                Full-Funnel Attendee Acquisition
              </p>
              <p className="text-[11px] text-slate-300">
                Awareness → Consideration → Sold-Out Registrations
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-500 text-white shadow-sm shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
              Live Funnel
            </span>
          </div>
        </div>

        {/* Floating Badge 1 - Top Right */}
        <div className="absolute -top-4 -right-2 sm:-right-4 rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 sm:p-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900">98% Turnout</div>
              <div className="text-[10px] font-medium text-slate-500">Attendee Show-up Rate</div>
            </div>
          </div>
        </div>

        {/* Floating Badge 2 - Bottom Left */}
        <div className="absolute -bottom-4 -left-2 sm:-left-4 rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 sm:p-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500 text-white shadow-md">
              <Megaphone className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900">100+ Campaigns</div>
              <div className="text-[10px] font-medium text-slate-500">Viral Speaker Kits</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{/* =========================================================================
    VISUAL FUNCTION 3: EcosystemIntegrationVisual (Enterprise AI & Integrations)
    -------------------------------------------------------------------------
    👉 Baad me apni custom architecture image ya card lagayein.
   ========================================================================= */}
function EcosystemIntegrationVisual() {
  const integrations = [
    {
      name: "Salesforce Data Cloud",
      badge: "Real-Time Sync",
      desc: "Instant lead ingestion, attendee scoring & pipeline attribution",
      color: "#00a1e0",
      status: "Connected",
    },
    {
      name: "Slack Automated Channels",
      badge: "Sub-Second Bots",
      desc: "Automated onboarding, community matchmaking & instant event alerts",
      color: "#e01e5a",
      status: "Active",
    },
    {
      name: "Tableau Executive Analytics",
      badge: "ROI Dashboards",
      desc: "Live sponsor performance, churn analytics & sentiment metrics",
      color: "#e97627",
      status: "Live Feed",
    },
    {
      name: "Agentforce & GenAI Agents",
      badge: "Autonomous",
      desc: "24/7 intelligent attendee matchmaking & ticketing assistance",
      color: "#8b5cf6",
      status: "AI Enabled",
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      {/* Ambient Glow */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-3xl opacity-25 blur-2xl transition-all duration-700"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--primary) 0%, var(--secondary) 60%, transparent 80%)",
        }}
      />

      <div className="relative rounded-3xl border border-slate-200/80 bg-white/95 p-4 sm:p-5 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-indigo-500/10">
        {/* Window Bar */}
        <div className="flex items-center justify-between pb-3 px-1 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5 text-indigo-500" />
            <span>buzzoraa.com/integrations</span>
          </div>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: "var(--primary-light)",
              color: "var(--primary)",
            }}
          >
            Enterprise Ready
          </span>
        </div>

        {/* Interactive Hub Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {integrations.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50/80 to-white hover:border-slate-300 hover:shadow-md transition-all group/card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover/card:bg-slate-200 transition-colors">
                    {item.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover/card:text-indigo-600 transition-colors">
                  {item.name}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-400">
                <span>{item.badge}</span>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Hub Summary */}
        <div className="mt-4 p-3 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <Network className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold">Sub-Second Bi-directional Sync</p>
              <p className="text-[10px] text-slate-400">Vivaansh Consulting Enterprise Architecture</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold">
            99.99% SLA
          </span>
        </div>

        {/* Floating Badge 1 - Top Left */}
        <div className="absolute -top-4 -left-2 sm:-left-4 rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 sm:p-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-600 text-white shadow-md">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900">&lt; 150ms Sync</div>
              <div className="text-[10px] font-medium text-slate-500">Zero Data Latency</div>
            </div>
          </div>
        </div>

        {/* Floating Badge 2 - Bottom Right */}
        <div className="absolute -bottom-4 -right-2 sm:-right-4 rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 sm:p-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900">SOC2 &amp; GDPR</div>
              <div className="text-[10px] font-medium text-slate-500">Enterprise Certified</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{/* =========================================================================
    VISUAL FUNCTION 4: LeadershipImpactVisual (Ecosystem Leadership)
    -------------------------------------------------------------------------
    👉 Baad me apni custom image lagane ke liye:
       Image path src="/tarun-gupta.jpg" ko badal dein.
   ========================================================================= */}
function LeadershipImpactVisual() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      {/* Glow */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-3xl opacity-25 blur-2xl transition-all duration-700"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--primary) 0%, #eab308 60%, transparent 80%)",
        }}
      />

      <div className="relative rounded-3xl border border-slate-200/80 bg-white/90 p-3 sm:p-4 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-indigo-500/10 hover:-translate-y-0.5 group">
        {/* Window controls */}
        <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-amber-500" />
            <span>buzzoraa.com/about</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60">
            Ambassador
          </span>
        </div>

        {/* 📸 IMAGE SLOT */}
        <div className="relative mt-3 aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200/60">
          {!imageError ? (
            <Image
              src="/tarun-gupta.jpg"
              alt="Tarun Gupta - Tableau Ambassador & Salesforce Champion"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px)"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-slate-100">
              <Award className="h-10 w-10 text-amber-500 mb-2" />
              <p className="text-sm font-bold text-slate-800">Leadership Visual Slot</p>
              <p className="text-xs text-slate-500 mt-1">Image: public/tarun-gupta.jpg</p>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between gap-2">
            <div>
              <p className="text-xs sm:text-sm font-bold text-white drop-shadow-sm">
                Tarun Gupta • Founder &amp; Architect
              </p>
              <p className="text-[11px] text-slate-300">
                2x Tableau Ambassador • Salesforce Champion • CMX Advisor
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-500 text-white shadow-sm shrink-0">
              <Star className="h-3 w-3 fill-white" />
              Ecosystem Leader
            </span>
          </div>
        </div>

        {/* Floating Badge 1 - Top Right */}
        <div className="absolute -top-4 -right-2 sm:-right-4 rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 sm:p-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900">2x Ambassador</div>
              <div className="text-[10px] font-medium text-slate-500">Global Data Honors</div>
            </div>
          </div>
        </div>

        {/* Floating Badge 2 - Bottom Left */}
        <div className="absolute -bottom-4 -left-2 sm:-left-4 rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 sm:p-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900">15+ Years IT</div>
              <div className="text-[10px] font-medium text-slate-500">Enterprise Solutions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedTheme, setSelectedTheme] = useState(THEME_PRESETS[0]);

  // Apply theme in runtime dynamically so user can test colors live in the browser!
  const applyPreset = (preset) => {
    setSelectedTheme(preset);
    document.documentElement.style.setProperty("--primary", preset.primary);
    document.documentElement.style.setProperty("--primary-hover", preset.hover);
    document.documentElement.style.setProperty("--primary-light", preset.light);
    document.documentElement.style.setProperty("--primary-glow", preset.glow);
    document.documentElement.style.setProperty("--header-active-bg", `${preset.primary}15`);
  };

  return (
    <div className="relative min-h-screen">
      {/* =======================================================================
          GLOBAL FULL-PAGE IRIDESCENCE BACKGROUND (React Bits)
          Fixed across entire viewport from top to bottom
         ======================================================================= */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <Iridescence
          color={selectedTheme?.primary || "#6366f1"}
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
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />
      </div>

      {/* =======================================================================
          SECTION 0: Hero Section (Centered Layout)
         ======================================================================= */}
      <section className="relative overflow-hidden border-b border-slate-200/50 py-20 sm:py-28 lg:py-32">
        {/* Ambient subtle radial glow matching theme */}
        <div
          className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full opacity-20 blur-3xl transition-colors duration-500 z-1"
          style={{ backgroundColor: "var(--primary)" }}
        />

        {/* Centered Main Container */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Centered Content wrapped in FadeContent */}
          <FadeContent effect="fade" blur={true} duration={1} delay={0.05} trigger="mount" className="w-full flex flex-col items-center">
            <div className="flex flex-col items-center max-w-4xl mx-auto">
              {/* Top Pill Badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm font-bold shadow-xs backdrop-blur-md transition-colors"
                style={{
                  borderColor: "color-mix(in srgb, var(--primary) 35%, transparent)",
                  backgroundColor: "color-mix(in srgb, var(--primary) 10%, white)",
                  color: "var(--primary)",
                }}
              >
                <span
                  className="flex h-4 w-4 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  <Zap className="h-2.5 w-2.5 fill-current" />
                </span>
                <span>Social Engagement &amp; Go-to-Market (GTM) SaaS</span>
              </div>

              {/* Main Headline */}
              <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight text-slate-950">
                Turn Conversations
                <br />
                <span
                  className="text-transparent bg-clip-text transition-all duration-300"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, var(--primary) 0%, #8b5cf6 50%, var(--secondary) 100%)",
                  }}
                >
                  Into Sustainable Growth.
                </span>
              </h1>

              {/* Subtitle / Description */}
              <p className="mt-6 max-w-2xl text-base sm:text-xl leading-relaxed text-slate-700 font-normal">
                <strong className="text-slate-900 font-semibold">Buzzoraa</strong> is a Social Engagement &amp; Go-to-Market (GTM) SaaS platform designed to turn conversations into growth. Our vision is to bring social engagement, community activation, content amplification, and GTM growth together in one unified platform.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/Bookdemo"
                  className="cursor-pointer rounded-xl px-7 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                  style={{
                    backgroundColor: "var(--primary)",
                    boxShadow: "0 10px 24px var(--primary-glow)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--primary-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--primary)";
                  }}
                >
                  <span>Book a Live Demo</span>
                  <ArrowUpRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/contact"
                  className="cursor-pointer rounded-xl border border-slate-300 bg-white/90 backdrop-blur-md px-6 py-3.5 text-base font-bold text-slate-800 transition-colors hover:bg-white flex items-center gap-2 shadow-2xs"
                >
                  Talk to Support
                </Link>

                <Link
                  href="/pricing"
                  className="cursor-pointer rounded-xl border border-slate-200 bg-white/80 backdrop-blur-md px-5 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:text-slate-900 hover:bg-white shadow-2xs"
                >
                  Explore Pricing
                </Link>
              </div>

              {/* Micro Trust Indicators */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-600">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>No credit card needed</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Instant 7-day free trial</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Enterprise &amp; AI ready</span>
                </div>
              </div>
            </div>
          </FadeContent>

          {/* Centered Product Visual Mockup */}
          <FadeContent effect="focus" blur={true} duration={1.2} delay={0.2} trigger="mount" className="w-full mt-12 sm:mt-16 max-w-4xl">
            <HeroInteractiveVisual />
          </FadeContent>
        </div>
      </section>

      {/* =======================================================================
          SECTION 1: Hackathons & Developer Arena (Layout: Visual Left | Content Right)
         ======================================================================= */}
      <section className="relative overflow-hidden bg-white/50 backdrop-blur-xs border-b border-slate-200/50 py-16 sm:py-24">
        {/* Soft background ambient light */}
        <div
          className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ backgroundColor: "var(--secondary)" }}
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16">
          {/* Visual on Left (Desktop) */}
          <FadeContent effect="focus" blur={true} duration={1.1} threshold={0.15} className="order-2 lg:order-1">
            <HackathonInteractiveVisual />
          </FadeContent>

          {/* Content on Right (Desktop) */}
          <FadeContent effect="fade" blur={true} duration={1} threshold={0.15} className="order-1 lg:order-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50/90 px-4 py-1.5 text-sm font-semibold text-cyan-800 shadow-2xs">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-600 text-white">
                  <Code2 className="h-2.5 w-2.5" />
                </span>
                Developer Challenges &amp; Hackathons
              </div>

              <h2 className="mt-5 text-3xl sm:text-5xl font-black leading-[1.12] tracking-tight text-blue-950">
                Run High-Stakes Hackathons.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600">
                  Live Code Evaluation &amp; Global Stages.
                </span>
              </h2>

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600">
                Scale from 50 to 5,000+ developers seamlessly. Provide multi-track challenges, automated GitHub repo evaluations, real-time stage broadcasts, and transparent leaderboard scoring that builders love.
              </p>

              {/* Feature Checklist */}
              <div className="mt-6 space-y-3">
                {[
                  "Multi-track challenge architecture (AI/ML, Web3, Cloud & Mobile)",
                  "Automated repo evaluation test-suites with anti-plagiarism checks",
                  "Live virtual stage streaming with YouTube & Twitch integrations",
                  "Holographic sponsor booths, digital prize distribution & certificates",
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-white">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/Bookdemo"
                  className="cursor-pointer rounded-xl bg-cyan-600 hover:bg-cyan-700 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-cyan-600/20 transition flex items-center gap-2"
                >
                  <span>Host a Hackathon</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/pricing"
                  className="cursor-pointer rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-100"
                >
                  View Plans &amp; Pricing
                </Link>
              </div>
            </div>
          </FadeContent>
        </div>
      </section>

      {/* =======================================================================
          SECTION 2: High-Impact Event Marketing (Layout: Content Left | Visual Right)
         ======================================================================= */}
      <section className="relative overflow-hidden bg-slate-50/40 backdrop-blur-xs border-b border-slate-200/50 py-16 sm:py-24">
        {/* Subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #d7e2e9 1px, transparent 1px), linear-gradient(to bottom, #d7e2e9 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16">
          {/* Content on Left (Desktop) */}
          <FadeContent effect="fade" blur={true} duration={1} threshold={0.15}>
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold shadow-2xs"
                style={{
                  borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)",
                  backgroundColor: "color-mix(in srgb, var(--primary) 8%, white)",
                  color: "var(--primary)",
                }}
              >
                <span
                  className="flex h-4 w-4 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  <Megaphone className="h-2.5 w-2.5 fill-current" />
                </span>
                Full-Funnel Event Marketing Engine
              </div>

              <h2 className="mt-5 text-3xl sm:text-5xl font-black leading-[1.12] tracking-tight text-blue-950">
                Turn Community Buzz Into
                <br />
                <span
                  className="text-transparent bg-clip-text transition-all duration-300"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, var(--primary) 0%, #ec4899 60%, #f43f5e 100%)",
                  }}
                >
                  Sold-Out Registrations &amp; Packed Rooms.
                </span>
              </h2>

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600">
                When scaling your presence, fragmented outreach and generic social posts lose 70% of potential buyers. Buzzoraa builds social engagement and content amplification engines that convert conversations into active advocates and pipeline.
              </p>

              {/* Campaign Pillar Cards */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: "Speaker Buzz Kits", desc: "Pre-made social carousels & video trailers for every speaker" },
                  { title: "Targeted Funnels", desc: "Multi-channel attendee acquisition across LinkedIn, X & Discord" },
                  { title: "Live Hype Amplification", desc: "Real-time attendee engagement, hashtag trends & live polls" },
                  { title: "Post-Event Nurture", desc: "Instant session recordings distribution & qualified lead pipeline" },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl border border-slate-200/80 bg-white/90 shadow-2xs">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="cursor-pointer rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:scale-[1.02] flex items-center gap-2"
                  style={{
                    backgroundColor: "var(--primary)",
                    boxShadow: "0 10px 24px var(--primary-glow)",
                  }}
                >
                  <span>Launch an Event Campaign</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/about"
                  className="cursor-pointer rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <span>See Our Track Record</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </FadeContent>

          {/* Visual on Right (Desktop) */}
          <FadeContent effect="focus" blur={true} duration={1.1} threshold={0.15}>
            <EventCampaignInteractiveVisual />
          </FadeContent>
        </div>
      </section>

      {/* =======================================================================
          SECTION 3: Enterprise Architecture & AI (Layout: Visual Left | Content Right)
         ======================================================================= */}
      <section className="relative overflow-hidden bg-white/50 backdrop-blur-xs border-b border-slate-200/50 py-16 sm:py-24">
        {/* Soft background glow */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ backgroundColor: "var(--primary)" }}
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16">
          {/* Visual on Left (Desktop) */}
          <FadeContent effect="focus" blur={true} duration={1.1} threshold={0.15} className="order-2 lg:order-1">
            <EcosystemIntegrationVisual />
          </FadeContent>

          {/* Content on Right (Desktop) */}
          <FadeContent effect="fade" blur={true} duration={1} threshold={0.15} className="order-1 lg:order-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/90 px-4 py-1.5 text-sm font-semibold text-indigo-700 shadow-2xs">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-white">
                  <Cpu className="h-2.5 w-2.5" />
                </span>
                Salesforce • Slack • Tableau • Agentforce AI
              </div>

              <h2 className="mt-5 text-3xl sm:text-5xl font-black leading-[1.12] tracking-tight text-blue-950">
                Sub-Second Automation.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500">
                  Connected Systems That Drive Pipeline.
                </span>
              </h2>

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600">
                Backed by enterprise architecture, Buzzoraa integrates your CRM, social networks, messaging hubs, and AI workflows to automate engagement pipelines end-to-end without manual friction.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Salesforce Data Cloud ingestion for real-time attendee scoring",
                  "Slack bots for automated welcome flows, badges & channels",
                  "Tableau executive dashboards proving campaign & sponsor ROI",
                  "Agentforce AI agents for 24/7 attendee assistance & matchmaking",
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/Bookdemo"
                  className="cursor-pointer rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition flex items-center gap-2"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  <span>Schedule Architecture Demo</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/contact"
                  className="cursor-pointer rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-100"
                >
                  Speak with Architects
                </Link>
              </div>
            </div>
          </FadeContent>
        </div>
      </section>

      {/* =======================================================================
          SECTION 4: Leadership & Ecosystem Trust (Layout: Content Left | Visual Right)
         ======================================================================= */}
      <section className="relative overflow-hidden bg-slate-50/40 backdrop-blur-xs border-b border-slate-200/50 py-16 sm:py-24">
        {/* Subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #d7e2e9 1px, transparent 1px), linear-gradient(to bottom, #d7e2e9 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16">
          {/* Content on Left (Desktop) */}
          <FadeContent effect="fade" blur={true} duration={1} threshold={0.15}>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/90 px-4 py-1.5 text-sm font-semibold text-amber-800 shadow-2xs">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-white">
                  <Award className="h-2.5 w-2.5" />
                </span>
                Led by Recognized Ecosystem Champions
              </div>

              <h2 className="mt-5 text-3xl sm:text-5xl font-black leading-[1.12] tracking-tight text-blue-950">
                Built by Practitioners.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-indigo-600">
                  15+ Years Empowering Tech Ecosystems.
                </span>
              </h2>

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600">
                Buzzoraa isn&apos;t just software—it is steered by industry practitioners with over 15 years leading enterprise solutions, social networking platforms, and global community movements.
              </p>

              {/* Honors Badges */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
                  <div className="flex items-center gap-2 text-amber-600 text-xs font-bold mb-1">
                    <Award className="h-4 w-4" />
                    <span>2x Tableau Ambassador</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Global Data &amp; Analytics Ecosystem Honors</p>
                </div>

                <div className="p-3.5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
                  <div className="flex items-center gap-2 text-blue-600 text-xs font-bold mb-1">
                    <Star className="h-4 w-4" />
                    <span>Salesforce Champion</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Enterprise Architecture &amp; CRM Authority</p>
                </div>

                <div className="p-3.5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
                  <div className="flex items-center gap-2 text-purple-600 text-xs font-bold mb-1">
                    <Users className="h-4 w-4" />
                    <span>50K+ Community</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Global Developers, Students &amp; Leaders</p>
                </div>

                <div className="p-3.5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
                  <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold mb-1">
                    <Briefcase className="h-4 w-4" />
                    <span>100+ Keynotes Campaigned</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Hackathons, Summits &amp; User Groups</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className="cursor-pointer rounded-xl bg-amber-500 hover:bg-amber-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-amber-500/20 transition flex items-center gap-2"
                >
                  <span>Read Tarun&apos;s Full Story</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/contact"
                  className="cursor-pointer rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-100"
                >
                  Partner With Buzzoraa
                </Link>
              </div>
            </div>
          </FadeContent>

          {/* Visual on Right (Desktop) */}
          <FadeContent effect="focus" blur={true} duration={1.1} threshold={0.15}>
            <LeadershipImpactVisual />
          </FadeContent>
        </div>
      </section>

      {/* =======================================================================
          REACT BITS: MASKED HEADING SHOWCASE SECTION
         ======================================================================= */}
      <section className="relative overflow-hidden bg-slate-950/85 backdrop-blur-md text-white py-20 sm:py-28 border-b border-slate-800/80">
        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Ambient background glow */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full opacity-25 blur-[130px] transition-colors duration-500"
          style={{ backgroundColor: "var(--primary)" }}
        />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 text-center space-y-8">
          <FadeContent effect="fade" blur={true} duration={1} threshold={0.15}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/70 px-4 py-1.5 text-xs font-semibold text-indigo-300 shadow-inner backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>React Bits Integration</span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400 font-mono">&lt;MaskedHeading /&gt;</span>
            </div>

            <div className="max-w-2xl mx-auto space-y-3 mt-4">
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Interactive Media-Masked Typography
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Hover and move your mouse over the heading to experience real-time cursor spotlight, parallax physics, and letter outline reveals powered by GSAP.
              </p>
            </div>
          </FadeContent>

          {/* The Live MaskedHeading Component */}
          <div className="py-8 sm:py-12 border-y border-slate-800/80 bg-slate-900/40 rounded-3xl backdrop-blur-xs px-4">
            <MaskedHeading
              text="EXPERIENCE BUZZORAA"
              mediaType="image"
              src="/community-event-stage.jpg"
              fillScale={1.3}
              parallax={32}
              drift={16}
              reveal="rise"
              trigger="view"
              spotlight={true}
              spotlightRadius={180}
              outline={true}
              outlineColor="rgba(255, 255, 255, 0.4)"
              outlineWidth={1.5}
              weight={900}
              tracking={-0.03}
              textScale={0.095}
              className="cursor-pointer font-black"
            />
          </div>

          {/* Quick Info & Props Guide */}
          <FadeContent
            effect="focus"
            blur={true}
            stagger={0.12}
            duration={0.9}
            threshold={0.15}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left max-w-4xl mx-auto"
          >
            <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold mb-1.5">
                <Sparkles className="h-4 w-4" />
                <span>Spotlight &amp; Parallax</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Image slides smoothly under letters based on mouse movement with a glowing spotlight beam.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold mb-1.5">
                <Code2 className="h-4 w-4" />
                <span>Image &amp; Video Ready</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Plug any image or looping video file via <code className="text-indigo-300 font-mono">src</code> and <code className="text-indigo-300 font-mono">mediaType</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1.5">
                <Zap className="h-4 w-4" />
                <span>5 Entrance Styles</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Supports <code className="text-emerald-300 font-mono">rise</code>, <code className="text-emerald-300 font-mono">scale</code>, <code className="text-emerald-300 font-mono">blur</code>, <code className="text-emerald-300 font-mono">wipe</code>, and <code className="text-emerald-300 font-mono">fade</code> reveals.
              </p>
            </div>
          </FadeContent>
        </div>
      </section>

      {/* =======================================================================
          PLATFORM PILLARS: ENTERPRISE HACKATHON & EVENT AUTOMATION
         ======================================================================= */}
      <section className="relative overflow-hidden bg-slate-900/85 backdrop-blur-md text-white py-20 sm:py-28 border-b border-slate-800/80">
        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient radial glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-20 blur-[120px]"
          style={{ backgroundColor: "var(--secondary)" }}
        />

        <div className="relative mx-auto max-w-6xl px-6 sm:px-8 space-y-10">
          {/* Header */}
          <FadeContent effect="fade" blur={true} duration={1} threshold={0.15} className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-4 py-1.5 text-xs font-semibold text-emerald-300 shadow-inner backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Enterprise Hackathon Engine</span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-mono">Automated Scale</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Automate Every Phase of Your Hackathon &amp; Tech Summit
            </h2>
            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-400 leading-relaxed">
              From social engagement and advocate activation to automated content syndication, lead attribution, and verified GTM analytics — Buzzoraa orchestrates modern conversation-driven growth with effortless precision.
            </p>
          </FadeContent>

          {/* Three Core Capability Cards */}
          <FadeContent
            effect="mist"
            duration={1.6}
            ease="power2.out"
            stagger={0.12}
            threshold={0.15}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            <div className="p-6 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-xl backdrop-blur-md space-y-3 hover:border-slate-700 transition-all hover:-translate-y-1">
              <div
                className="h-10 w-10 rounded-2xl flex items-center justify-center text-white shadow-md"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Smart Registrations &amp; Squads</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated role verification, gated ticketing, and intelligent teammate matching pairing developers, designers, and domain experts effortlessly.
              </p>
              <div className="pt-2 text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>50k+ Active Builders • 98.4% Check-in</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-xl backdrop-blur-md space-y-3 hover:border-slate-700 transition-all hover:-translate-y-1">
              <div className="h-10 w-10 rounded-2xl flex items-center justify-center bg-cyan-500 text-white shadow-md">
                <Trophy className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Multi-Track Blind Judging</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Customizable rubric scoring, automated GitHub repository commit analysis, and real-time live scoreboards that eliminate evaluation bias completely.
              </p>
              <div className="pt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Automated Plagiarism &amp; Git Verification</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-xl backdrop-blur-md space-y-3 hover:border-slate-700 transition-all hover:-translate-y-1">
              <div className="h-10 w-10 rounded-2xl flex items-center justify-center bg-purple-500 text-white shadow-md">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Sponsor ROI &amp; Talent Pipelines</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transparent brand impression reports for title sponsors and direct high-intent talent sourcing queues to convert winners into full-time hires.
              </p>
              <div className="pt-2 text-[11px] font-mono text-purple-400 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5" />
                <span>10x Sponsor Renewal • Direct Hiring Queues</span>
              </div>
            </div>
          </FadeContent>

          {/* Platform Performance & Capability Dashboard */}
          <FadeContent effect="fade" blur={true} duration={1} threshold={0.15}>
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center border-b border-slate-800/80 pb-6 mb-6">
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                    500+
                  </div>
                  <div className="text-xs font-semibold text-slate-300 mt-1">Hackathons Hosted</div>
                  <div className="text-[11px] text-slate-500">Across 15+ tech hubs</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                    100k+
                  </div>
                  <div className="text-xs font-semibold text-slate-300 mt-1">Projects Built</div>
                  <div className="text-[11px] text-slate-500">AI, Web3, Cloud &amp; FinTech</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-400">
                    70%
                  </div>
                  <div className="text-xs font-semibold text-slate-300 mt-1">Time Saved</div>
                  <div className="text-[11px] text-slate-500">In organizer coordination</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    4.9/5
                  </div>
                  <div className="text-xs font-semibold text-slate-300 mt-1">Organizer Rating</div>
                  <div className="text-[11px] text-slate-500">From 250+ university chapters</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400 text-center sm:text-left">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Integrated with Discord, Slack, GitHub, Devfolio &amp; Zoom API</span>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    href="/Bookdemo"
                    className="cursor-pointer w-full sm:w-auto text-center px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    <span>Schedule Platform Tour</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="cursor-pointer w-full sm:w-auto text-center px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </FadeContent>
        </div>
      </section>

      {/* =======================================================================
          ECOSYSTEM SOLUTIONS: TAILORED STAKEHOLDER ARCHITECTURE
         ======================================================================= */}
      <section className="relative overflow-hidden bg-slate-950/85 backdrop-blur-md text-white py-20 sm:py-28 border-b border-slate-800/80">
        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #8b5cf6 1px, transparent 1px), linear-gradient(to bottom, #8b5cf6 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient radial glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] rounded-full opacity-25 blur-[130px]"
          style={{ backgroundColor: "var(--primary)" }}
        />

        <div className="relative mx-auto max-w-6xl px-6 sm:px-8 space-y-10 text-center">
          <FadeContent effect="fade" blur={true} duration={1} threshold={0.15} className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/60 px-4 py-1.5 text-xs font-semibold text-purple-300 shadow-inner backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
              <span>Ecosystem Solutions</span>
              <span className="text-slate-600">|</span>
              <span className="text-purple-400 font-mono">Tailored For Every Role</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Tailored Solutions for Every Community Stakeholder
            </h2>
            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-400 leading-relaxed">
              Explore how Buzzoraa fuels acquisition, social engagement, and community activation across every segment of the modern ecosystem.
            </p>
          </FadeContent>

          {/* Interactive GooeyNav Audience Selector */}
          <FadeContent effect="focus" blur={true} duration={1} threshold={0.15}>
            <div className="py-8 px-4 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex flex-col items-center gap-5">
              <GooeyNav
                items={[
                  { label: "Enterprise Brands", href: "#" },
                  { label: "Hackathon Organizers", href: "#" },
                  { label: "Campus & Universities", href: "#" },
                  { label: "Web3 & Dev DAOs", href: "#" },
                  { label: "Tech Startups", href: "#" },
                ]}
                initialActiveIndex={0}
                theme="dark"
                size="md"
                frame={true}
                color="var(--primary)"
                activeTextColor="#ffffff"
                colors={["var(--primary)", "var(--secondary)", "#ec4899", "#8b5cf6"]}
                particleCount={18}
                spread={54}
                animationTime={600}
                timeVariance={280}
                gooeyness={0.55}
                wobble={0.45}
                hoverEffect={true}
              />
              <p className="text-[11px] font-mono text-slate-400">
                ✨ Click any stakeholder segment above to preview tailored ecosystem workflows
              </p>
            </div>
          </FadeContent>

          {/* Three Tailored Value Columns */}
          <FadeContent effect="fade" blur={true} duration={1} threshold={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-md space-y-4 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">For Enterprise &amp; Brands</h4>
                    <p className="text-[11px] text-slate-400">Direct Developer Adoption</p>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Launch sponsored challenge tracks &amp; cash prize bounties.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Live virtual booth stages and product onboarding workshops.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Pre-screened tech talent pipeline and direct interview queues.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-md space-y-4 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">For Campus Ambassadors</h4>
                    <p className="text-[11px] text-slate-400">Student &amp; College Chapters</p>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Turn-key hackathon starter kits with pre-approved sponsors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Free platform tier for accredited college tech clubs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Swag fulfillment, mentor network, and leadership certifications.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-md space-y-4 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">For Builders &amp; Hackers</h4>
                    <p className="text-[11px] text-slate-400">Career &amp; Bounty Acceleration</p>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Compete in high-stakes hackathons with verified payouts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>1-on-1 feedback from senior tech leads and venture mentors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Showcase verified project repos on the global leaderboard.</span>
                  </li>
                </ul>
              </div>
            </div>
          </FadeContent>

          {/* 🔄 ECOSYSTEM LOGO LOOP (React Bits LogoLoop) */}
          <FadeContent effect="fade" blur={true} duration={1} threshold={0.15}>
            <div className="pt-8 pb-2 w-full space-y-3">
              <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400 text-center">
                Trusted Integrations &amp; Global Tech Ecosystems
              </p>
              <div className="relative w-full overflow-hidden py-3">
                <LogoLoop
                  logos={ECOSYSTEM_LOGOS}
                  speed={80}
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
          </FadeContent>

          {/* Quick Action Footer */}
          <FadeContent effect="fade" blur={true} duration={1} threshold={0.15}>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/Bookdemo"
                className="cursor-pointer rounded-xl px-7 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] flex items-center gap-2"
                style={{
                  backgroundColor: "var(--primary)",
                  boxShadow: "0 10px 24px var(--primary-glow)",
                }}
              >
                <span>Launch Your Growth on Buzzoraa</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="cursor-pointer rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3 text-sm font-bold text-slate-200 transition-colors hover:bg-slate-800 flex items-center gap-2"
              >
                <span>Compare Platform Tiers</span>
              </Link>
            </div>
          </FadeContent>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE SCROLL STACK SECTION (React Bits Component)
          The 4 Core Growth Pillars of Buzzoraa GTM
          ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-slate-200/60 bg-gradient-to-b from-slate-50/70 via-white/80 to-slate-50/70 backdrop-blur-xs">
        {/* Soft Ambient Light Glows */}
        <div
          className="absolute -top-32 left-1/3 h-96 w-96 rounded-full blur-[140px] opacity-15 pointer-events-none"
          style={{ backgroundColor: selectedTheme.primary || "#6366f1" }}
        />
        <div
          className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full blur-[140px] opacity-15 pointer-events-none"
          style={{ backgroundColor: selectedTheme.secondary || "#06b6d4" }}
        />

        <div className="relative max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <FadeContent effect="fade" duration={0.8} threshold={0.15} className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              <span>Interactive Architecture Stack</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              The Engine Powering Every Conversation
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Scroll through the interactive card deck below to explore how Buzzoraa unifies listening, advocate mobilization, content amplification, and GTM revenue attribution.
            </p>
          </FadeContent>

          {/* Interactive ScrollStack Showcase Frame */}
          <div className="w-full mx-auto max-w-5xl">
            <div className="relative rounded-3xl border border-slate-200/90 bg-white/70 backdrop-blur-xl shadow-2xl p-2 sm:p-4">
              {/* Top Window Bar Controls */}
              <div className="flex items-center justify-between pb-3 px-3 sm:px-4 border-b border-slate-200/70 text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-[11px] font-mono text-slate-400 hidden sm:inline">
                    buzzoraa.com/architecture-stack
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    Scroll / Drag Stack
                  </span>
                </div>
              </div>

              {/* ScrollStack Component (React Bits) */}
              <div style={{ height: 640 }} className="w-full relative mt-3">
                <ScrollStack
                  itemDistance={130}
                  itemStackDistance={26}
                  stackPosition="8%"
                  itemScale={0.04}
                  baseScale={0.88}
                  dimAmount={0.14}
                  blurAmount={0}
                  tiltAmount={3}
                  rotationAmount={1.2}
                  holdDistance={200}
                  smoothScroll={true}
                  snap={true}
                >
                  {BUZZORAA_STACK_CARDS.map((card) => (
                    <ScrollStackItem
                      key={card.step}
                      itemClassName="!h-auto !min-h-[22rem] sm:!min-h-[20rem] !p-6 sm:!p-8 rounded-3xl border border-slate-200/90 bg-white/95 text-slate-900 shadow-xl backdrop-blur-md"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        {/* Left Column: Rich Content */}
                        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                          <div>
                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span
                                className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full text-white shadow-xs"
                                style={{ backgroundColor: card.accent }}
                              >
                                {card.pillar}
                              </span>
                              <span className="text-[11px] font-semibold text-slate-600 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200/60">
                                {card.tag}
                              </span>
                              <span className="text-[11px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                {card.badge}
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-snug">
                              {card.title}
                            </h3>

                            {/* Description */}
                            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                              {card.description}
                            </p>
                          </div>

                          {/* Feature Highlights */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {card.features.map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                                <CheckCircle2
                                  className="h-3.5 w-3.5 shrink-0 mt-0.5"
                                  style={{ color: card.accent }}
                                />
                                <span className="leading-snug">{feat}</span>
                              </div>
                            ))}
                          </div>

                          {/* Action CTA */}
                          <div className="pt-2 flex items-center gap-4">
                            <Link
                              href={card.ctaLink}
                              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white px-5 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
                              style={{ backgroundColor: card.accent }}
                            >
                              <span>{card.ctaText}</span>
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>

                        {/* Right Column: Visual Telemetry Slot (NO Images used; ready for user image later) */}
                        <div className="lg:col-span-5 w-full">
                          {/* 
                            =======================================================================
                            🖼️ IMAGE SLOT PLACEHOLDER (USER NOTE):
                            Agar aap baad mein image lagana chahein, to is visual box ki jagah
                            apni <Image /> tag laga sakte hain:
                            <Image src="/your-image.jpg" alt={card.title} width={500} height={320} className="rounded-2xl object-cover" />
                            =======================================================================
                          */}
                          <div className="rounded-2xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-5 shadow-xs relative overflow-hidden group">
                            {/* Box Header */}
                            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-3">
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-7 w-7 rounded-lg flex items-center justify-center text-white text-xs font-black shadow-xs"
                                  style={{ backgroundColor: card.accent }}
                                >
                                  {card.step}
                                </div>
                                <div>
                                  <p className="text-[11px] font-bold text-slate-800 leading-none">
                                    Architecture Telemetry
                                  </p>
                                  <p className="text-[9px] font-mono text-slate-400 mt-0.5">
                                    buzzoraa.engine.v1
                                  </p>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 font-semibold border border-emerald-100 flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Live
                              </span>
                            </div>

                            {/* 3 Metrics */}
                            <div className="grid grid-cols-3 gap-2 mb-3">
                              {card.stats.map((st, sIdx) => (
                                <div
                                  key={sIdx}
                                  className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200/70 text-center shadow-2xs"
                                >
                                  <div
                                    className="text-sm sm:text-base font-black tracking-tight"
                                    style={{ color: card.accent }}
                                  >
                                    {st.value}
                                  </div>
                                  <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                                    {st.label}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Status Activity Row */}
                            <div className="p-2.5 rounded-xl bg-slate-900 text-white flex items-center justify-between text-[11px]">
                              <div className="flex items-center gap-2 truncate">
                                <TrendingUp className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                <span className="font-mono text-[10px] sm:text-[11px] text-slate-200 truncate">
                                  {card.codeOrSlotNote}
                                </span>
                              </div>
                              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-300 shrink-0">
                                Synced
                              </span>
                            </div>

                            {/* Developer Hint */}
                            <div className="mt-2.5 text-center text-[10px] font-medium text-slate-400 italic">
                              Image slot ready for future custom visual
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollStackItem>
                  ))}
                </ScrollStack>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAGIC BENTO GRID: ECOSYSTEM & PLATFORM ARCHITECTURE (DARK THEME)
          ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden border-t border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        {/* Ambient Dark Glows */}
        <div
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full blur-[140px] opacity-25 pointer-events-none"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-[140px] opacity-20 pointer-events-none"
          style={{ backgroundColor: "var(--secondary)" }}
        />

        <div className="relative max-w-7xl mx-auto">
          <FadeContent effect="fade" duration={0.8} threshold={0.15} className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-indigo-300 border border-white/10 shadow-sm backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>Interactive Platform Architecture</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Comprehensive Community & Event Technology
            </h2>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              Explore our ecosystem capabilities — interactive live analytics, multi-track collaboration, automated workflows, connected developer tools, and enterprise security.
            </p>
          </FadeContent>

          <div className="w-full">
            <MagicBento
              items={BUZZORAA_BENTO_ITEMS}
              columns={4}
              rowHeight={230}
              gap={16}
              radius={24}
              theme="dark"
              glowColor={selectedTheme.primary || "#6366f1"}
              enableBorderGlow={true}
              enableSpotlight={true}
              spotlightRadius={320}
              enableStars={true}
              particleCount={24}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              intro={true}
              textAutoHide={false}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE ACCORDION GALLERY SECTION (React Bits Component - Light Theme)
          ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-xs text-slate-900 relative overflow-hidden border-t border-slate-200/60">
        {/* Soft Ambient Light Glows */}
        <div
          className="absolute -top-32 right-1/4 h-96 w-96 rounded-full blur-[140px] opacity-10 pointer-events-none"
          style={{ backgroundColor: selectedTheme.primary || "#6366f1" }}
        />
        <div
          className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full blur-[140px] opacity-10 pointer-events-none"
          style={{ backgroundColor: selectedTheme.secondary || "#06b6d4" }}
        />

        <div className="relative max-w-7xl mx-auto space-y-12">
          <FadeContent effect="fade" duration={0.8} threshold={0.15} className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              <span>Interactive Visual Gallery</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Moments That Inspire Global Communities
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Hover over each panel to experience fluid 3D tilt, parallax depth drift, and smooth responsive transitions powered by GSAP.
            </p>
          </FadeContent>

          <div className="w-full">
            <AccordionGallery
              items={ACCORDION_GALLERY_ITEMS}
              defaultIndex={2}
              expandRatio={0.52}
              trigger="hover"
              height={460}
              radius={20}
              gap={14}
              accentColor={selectedTheme.primary || "#6366f1"}
              overlayColor="#020617"
              textColor="#ffffff"
              grayscale={false}
              showLabels={true}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE 3D DEPTH CAROUSEL SECTION (React Bits Component)
          ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
        {/* Ambient Dark Glows */}
        <div
          className="absolute -top-32 left-1/4 h-96 w-96 rounded-full blur-[140px] opacity-25 pointer-events-none"
          style={{ backgroundColor: selectedTheme.primary || "#6366f1" }}
        />
        <div
          className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full blur-[140px] opacity-20 pointer-events-none"
          style={{ backgroundColor: selectedTheme.secondary || "#06b6d4" }}
        />

        <div className="relative max-w-7xl mx-auto space-y-12">
          <FadeContent effect="fade" duration={0.8} threshold={0.15} className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-indigo-300 border border-white/10 shadow-sm backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>3D Interactive Depth Deck</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Experience Buzzoraa in Multi-Dimensional Depth
            </h2>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              Swipe, drag, or scroll through our 3D perspective stack. Explore real-time social listening, advocate mobilization, content amplification, and closed-loop GTM execution with fluid physics.
            </p>
          </FadeContent>

          {/* Depth Carousel Stage Container */}
          <div className="w-full relative flex items-center justify-center py-6" style={{ height: "540px" }}>
            <DepthCarousel
              items={BUZZORAA_DEPTH_CAROUSEL_ITEMS}
              cardWidth={310}
              cardHeight={390}
              radius={20}
              tint="#030712"
              depth={220}
              spread={95}
              tilt={22}
              tiltDirection="right"
              perspective={1400}
              visibleCards={4}
              falloff={0.2}
              blur={6}
              duration={700}
              ease="power3.out"
              autoplay={true}
              autoplayDelay={3400}
              loop={true}
              showControls={true}
              showIndicators={true}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
