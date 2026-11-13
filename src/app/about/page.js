"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Iridescence from "@/components/Iridescence";
import FadeContent from "@/components/FadeContent";
import BounceCards from "@/components/BounceCards";
import SpotlightCard from "@/components/SpotlightCard";
import LogoLoop from "@/components/LogoLoop";
import {
  Code2,
  Terminal,
  Sparkles,
  Users,
  Award,
  Globe,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Target,
  Zap,
  CalendarCheck2,
  BarChart3,
  Megaphone,
  Rocket,
  MessageSquare,
  Layers,
  ShieldCheck,
  Check,
  Briefcase,
  GraduationCap,
  Mic,
  Lightbulb,
  HeartHandshake,
  Mail,
  ChevronRight,
  TrendingUp,
  Cpu,
  Star,
  Quote,
  Network,
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
// 📸 BOUNCE CARDS IMAGES (Curated tech summit & community event glimpses)
// -----------------------------------------------------------------------------
// Aap yahan apni photos ke URLs ya local paths bhi daal sakte hain
// =============================================================================
const BOUNCE_GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80",
];

// =============================================================================
// 👥 CORE ENGINEERING TEAM (SpotlightCard developer profiles)
// =============================================================================
const ENGINEERING_TEAM = [
  {
    name: "Danish Khan",
    role: "Full Stack Developer",
    badge: "Core Engineering",
    image: "/Danish.png",
    initials: "DK",
    bio: "Passionate Full Stack Developer specializing in high-performance Next.js architectures, modern front-end experiences, scalable backend systems, and automated event marketing pipelines.",
    skills: ["React & Next.js", "Full Stack Development", "Node.js & APIs", "Tailwind CSS", "Database Design"],
    quote: "Building seamless digital platforms with precision and modern web architecture.",
  },
  {
    name: "Gopal Krishan Vasudevan",
    role: "Full Stack Developer",
    badge: "Core Engineering",
    image: "/Gopal.png",
    initials: "GV",
    bio: "Accomplished Full Stack Developer focused on architecting resilient platforms, interactive interfaces, end-to-end data integrations, and scalable tech infrastructure for communities.",
    skills: ["Full Stack Engineering", "Next.js & React", "System Architecture", "Cloud Services", "API Integration"],
    quote: "Crafting scalable, data-driven applications that empower communities worldwide.",
  },
];

// =============================================================================
// 📊 KEY IMPACT STATS
// =============================================================================
const IMPACT_STATS = [
  {
    value: "15+",
    label: "Years in IT & Tech Ecosystems",
    detail: "Leading transformative solutions & enterprise architectures",
    icon: Briefcase,
    accent: "#6366f1",
  },
  {
    value: "100+",
    label: "Events & Meetups Campaigned",
    detail: "Global conferences, hackathons, and local community stages",
    icon: Megaphone,
    accent: "#06b6d4",
  },
  {
    value: "50K+",
    label: "Community Members Engaged",
    detail: "Empowering developers, students, founders & IT leaders",
    icon: Users,
    accent: "#ec4899",
  },
  {
    value: "7+",
    label: "Global Honors & Ecosystem Roles",
    detail: "Tableau Ambassador, Salesforce Champion, CMX Advisor",
    icon: Award,
    accent: "#f59e0b",
  },
];

// =============================================================================
// 🎯 EVENT & COMMUNITY MARKETING PILLARS (Ham Kya Karte Hain)
// =============================================================================
const CAMPAIGN_SERVICES = [
  {
    id: "event-campaigns",
    title: "High-Impact Event Marketing Campaigns",
    badge: "For Event Organizers & Communities",
    description:
      "When a community or company plans a summit, meetup, or hackathon, we craft full-funnel marketing campaigns—from teaser hype and attendee acquisition to speaker branding and sold-out registrations.",
    icon: Megaphone,
    features: [
      "Targeted multi-channel attendee acquisition & registration funnels",
      "Speaker spotlights, social teaser buzz & sponsor collateral kits",
      "Live event amplification, real-time social engagement & hashtags",
      "Post-event retention, session recordings distribution & follow-up nurture",
    ],
    highlight: "Sold-out attendance & measurable buzz",
  },
  {
    id: "product-activation",
    title: "Product & Platform Launch Activation",
    badge: "For Tech Companies & SaaS Startups",
    description:
      "Launching a new developer tool, enterprise platform, or SaaS feature? We position your product directly in front of active practitioner communities, developers, and decision-makers who actually adopt it.",
    icon: Rocket,
    features: [
      "Interactive demo days, hands-on workshops & live teardowns",
      "Hackathons with multi-track challenges & live judging",
      "Practitioner-led reviews, technical blogs & case studies",
      "Early adopter feedback loops & high-intent sales pipeline",
    ],
    highlight: "Authentic developer & enterprise adoption",
  },
  {
    id: "community-strategy",
    title: "Data-Driven Community Architecture",
    badge: "Global Ecosystem Building",
    description:
      "We design, build, and scale high-growth communities from zero to global networks across Salesforce, Slack, Tableau, CMX, and modern technology ecosystems.",
    icon: Network,
    features: [
      "Community charter, governance & chapter growth frameworks",
      "Slack / Discord engagement architecture & automated onboarding",
      "Ambassador & champion programs that self-sustain growth",
      "Data-backed community health metrics & member sentiment tracking",
    ],
    highlight: "High retention & passionate brand advocates",
  },
  {
    id: "tech-automation",
    title: "Ecosystem Integration & AI Automations",
    badge: "Salesforce • Slack • Tableau • AI",
    description:
      "Backed by enterprise IT consulting expertise at Vivaansh Consulting, we integrate your CRM, messaging, analytics, and Agentforce AI workflows to automate campaign pipelines end-to-end.",
    icon: Cpu,
    features: [
      "Salesforce & Data Cloud event pipelines & attendee tracking",
      "Slack bots, interactive community notifications & app integrations",
      "Tableau executive dashboards measuring campaign and sponsor ROI",
      "AI & Agentforce agents for automated attendee support & matchmaking",
    ],
    highlight: "Seamless operations & sub-second automation",
  },
];

// =============================================================================
// ⚡ WORKFLOW STEPS (HOW WE EXECUTE CAMPAIGNS)
// =============================================================================
const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Strategy & Audience Blueprint",
    desc: "We analyze your event goals, target personas, sponsor expectations, and platform tech stack to design a customized campaign roadmap.",
    tag: "Discovery & Fit",
  },
  {
    step: "02",
    title: "Multi-Channel Campaign Launch",
    desc: "We deploy high-converting landing pages, social media buzz, speaker teasers, community cross-promotions, and automated registration funnels.",
    tag: "Audience Engine",
  },
  {
    step: "03",
    title: "Live Event & Community Activation",
    desc: "Whether virtual, hybrid, or on-ground, we orchestrate interactive chat rooms, live polls, Q&A stages, and real-time social amplification.",
    tag: "Real-Time Hype",
  },
  {
    step: "04",
    title: "Analytics, Sponsor ROI & Retention",
    desc: "Post-event, we deliver comprehensive Tableau dashboards detailing attendee engagement, sponsor impressions, and ongoing community retention.",
    tag: "Verified Growth",
  },
];

// =============================================================================
// 🏆 TARUN GUPTA'S HONORS & CREDENTIALS
// =============================================================================
const CREDENTIALS = [
  {
    title: "2x Tableau Ambassador",
    category: "Analytics & Data Culture",
    icon: BarChart3,
    badgeColor: "bg-blue-500/10 text-blue-700 border-blue-200",
    description:
      "Passionate about analytics, data culture, Tableau, and enabling people to make better, confident decisions with real-time data.",
  },
  {
    title: "Salesforce Marketing Champion",
    category: "Ecosystem & Platform",
    icon: Target,
    badgeColor: "bg-indigo-500/10 text-indigo-700 border-indigo-200",
    description:
      "Active contributor to the Salesforce ecosystem, with deep expertise spanning Salesforce, Data Cloud, AI, Marketing Cloud, and core platform tech.",
  },
  {
    title: "Slack SME & Architect",
    category: "Collaboration & AI",
    icon: MessageSquare,
    badgeColor: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    description:
      "Architecting enterprise collaboration, Slack integrations, workflow automation, migrations, and modern AI-powered conversational experiences.",
  },
  {
    title: "First Country Advisor – CMX Connect",
    category: "Global Community Leadership",
    icon: Globe,
    badgeColor: "bg-amber-500/10 text-amber-700 border-amber-200",
    description:
      "Supporting community professionals globally and strengthening the worldwide ecosystem of community builders, organizers, and strategists.",
  },
  {
    title: "Copado Community Professional of the Year 2023",
    category: "Industry Recognition",
    icon: Award,
    badgeColor: "bg-purple-500/10 text-purple-700 border-purple-200",
    description:
      "Honored with global industry recognition for transformative contributions to the developer, DevOps, and technology community ecosystem.",
  },
  {
    title: "Community Growth Catalyst & Builder",
    category: "Ecosystem Builder",
    icon: TrendingUp,
    badgeColor: "bg-cyan-500/10 text-cyan-700 border-cyan-200",
    description:
      "Building and growing resilient communities across Salesforce, Slack, Tableau, CMX, Startup Grind, and emerging technology networks.",
  },
  {
    title: "Certified SME & Continuous Learner",
    category: "Certifications & Hands-on",
    icon: GraduationCap,
    badgeColor: "bg-rose-500/10 text-rose-700 border-rose-200",
    description:
      "Multiple Salesforce certifications, Superbadges, hands-on enterprise implementation expertise, and a dedicated habit of sharing knowledge openly.",
  },
];

// =============================================================================
// 🎤 SPEAKING & MENTORSHIP TOPICS
// =============================================================================
const SPEAKING_TOPICS = [
  { name: "Salesforce & Data Cloud", icon: Layers, tag: "Enterprise Tech" },
  { name: "Slack & Enterprise Collaboration", icon: MessageSquare, tag: "Workplace Tech" },
  { name: "Tableau & Data Analytics", icon: BarChart3, tag: "Data Culture" },
  { name: "AI & Agentforce", icon: Sparkles, tag: "Next-Gen AI" },
  { name: "Community Building & Scalable Growth", icon: Users, tag: "Ecosystem" },
  { name: "Technology Leadership & Culture", icon: Briefcase, tag: "Leadership" },
  { name: "Career Acceleration & Mentorship", icon: Lightbulb, tag: "People Growth" },
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
// 🌟 ABOUT HERO INTERACTIVE VISUAL (Matching page.js floating badge styling)
// =============================================================================
function AboutHeroInteractiveVisual() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-[620px] sm:max-w-[700px] lg:max-w-[800px] h-[500px] sm:h-[600px] lg:h-[680px] flex items-center justify-center">
      {/* Decorative ambient radial glow */}
      <div
        className="pointer-events-none absolute inset-4 rounded-full opacity-40 blur-3xl transition-all duration-700"
        style={{
          background:
            "radial-gradient(circle at 55% 50%, var(--primary) 0%, var(--secondary, #06b6d4) 60%, transparent 80%)",
        }}
      />

      {/* Main Hero Visual Slot with logohome.png - TALL & PROMINENT */}
      <div className="relative z-10 h-full w-full flex items-center justify-center">
        {!imageError ? (
          <Image
            src="/logohome.png"
            alt="Buzzoraa Social Engagement & GTM Platform"
            width={1200}
            height={900}
            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 65vw, 850px)"
            className="relative z-10 h-full w-auto max-w-none object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-[1.01]"
            onError={() => setImageError(true)}
            priority
          />
        ) : (
          <div className="flex aspect-[4/3] w-full flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-md">
            <div
              className="h-16 w-16 rounded-2xl flex items-center justify-center mb-3 shadow-inner"
              style={{
                backgroundColor: "var(--primary-light)",
                color: "var(--primary)",
              }}
            >
              <Sparkles className="h-8 w-8" />
            </div>
            <p className="text-base font-black text-slate-900">Buzzoraa Mission &amp; Community</p>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Turning conversations into sustainable, measurable GTM growth.
            </p>
          </div>
        )}
      </div>

      {/* Floating Badges hugging the visual (Matching page.js layout) */}

      {/* 1. Top-Left: 15+ YEARS / IT & ECOSYSTEMS */}
      <div className="absolute top-[12%] sm:top-[14%] left-[12%] sm:left-[16%] z-20 rounded-2xl border border-slate-200/90 bg-white/95 px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer text-center">
        <div
          className="text-xs sm:text-sm font-black tracking-tight"
          style={{ color: "var(--primary)" }}
        >
          15+ YEARS
        </div>
        <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500">
          IT &amp; ECOSYSTEMS
        </div>
      </div>

      {/* 2. Middle-Left: 50K+ / MEMBERS ENGAGED */}
      <div className="absolute top-[40%] sm:top-[42%] left-[6%] sm:left-[10%] z-20 rounded-2xl border border-slate-200/90 bg-white/95 px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer text-center">
        <div
          className="text-xs sm:text-sm font-black tracking-tight"
          style={{ color: "var(--secondary)" }}
        >
          50K+
        </div>
        <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500">
          MEMBERS ENGAGED
        </div>
      </div>

      {/* 3. Bottom-Left: 100+ / SUMMITS & MEETUPS */}
      <div className="absolute bottom-[14%] sm:bottom-[16%] left-[10%] sm:left-[14%] z-20 rounded-2xl border border-slate-200/90 bg-white/95 px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer text-center">
        <div className="text-xs sm:text-sm font-black tracking-tight text-emerald-600">
          100+
        </div>
        <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500">
          SUMMITS CAMPAIGNED
        </div>
      </div>

      {/* 4. Top-Right: 2x TABLEAU / AMBASSADOR */}
      <div className="absolute top-[10%] sm:top-[12%] right-[10%] sm:right-[14%] z-20 rounded-2xl border border-slate-200/90 bg-white/95 px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer text-center">
        <div className="text-xs sm:text-sm font-black tracking-tight text-amber-500">
          2x
        </div>
        <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500">
          TABLEAU AMBASSADOR
        </div>
      </div>

      {/* 5. Middle-Right: Live notification pill */}
      <div className="absolute top-[42%] sm:top-[44%] right-[2%] sm:right-[6%] z-20 rounded-full border border-slate-200/90 bg-white/95 px-3.5 sm:px-4 py-2 shadow-[0_12px_28px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2">
        <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs shrink-0">
          <MessageSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-white text-white" />
        </div>
        <span className="text-[10px] sm:text-xs font-semibold text-slate-800 whitespace-nowrap">
          Engage. Amplify. Grow.
        </span>
      </div>

      {/* 6. Bottom-Right: Live Telemetry / Dispatch-style Card */}
      <div className="absolute bottom-[6%] sm:bottom-[8%] right-[6%] sm:right-[10%] z-20 rounded-2xl border border-slate-200/90 bg-white/95 p-3.5 sm:p-4 shadow-[0_16px_36px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer max-w-[210px] sm:max-w-[250px] text-left">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[10px] sm:text-xs font-bold text-slate-800">Platform Active</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>
        <p className="text-[10px] sm:text-[11px] leading-snug text-slate-600 mb-2">
          Social engagement &amp; GTM pipelines turning chats into customers.
        </p>
        <Link
          href="/Bookdemo"
          className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold"
          style={{ color: "var(--primary)" }}
        >
          <span>Schedule Strategy</span>
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

// =============================================================================
// 👤 FOUNDER & TEAM PORTRAITS WITH ROBUST FALLBACKS
// =============================================================================
function FounderPortrait() {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white mb-6 bg-slate-100">
      {!hasError ? (
        <Image
          src="/Tarun.png"
          alt="Tarun Gupta - Founder & CTO of Vivaansh Consulting"
          fill
          priority
          sizes="(max-width: 640px) 192px, 224px"
          className="object-cover object-center"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 flex flex-col items-center justify-center text-white p-4">
          <div className="h-20 w-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
            <span className="text-3xl font-black tracking-tight text-white">TG</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-white/90 mt-2">
            Tarun Gupta
          </span>
          <span className="text-[10px] text-white/70">Founder &amp; CTO</span>
        </div>
      )}
    </div>
  );
}

function DevPortrait({ dev }) {
  const [hasError, setHasError] = useState(false);

  if (dev.image && !hasError) {
    return (
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-4 ring-slate-100 shadow-md bg-slate-100 group-hover:scale-105 transition-transform shrink-0">
        <Image
          src={dev.image}
          alt={dev.name}
          fill
          sizes="(max-width: 640px) 80px, 96px"
          className="object-cover object-center"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 p-0.5 shadow-md group-hover:scale-105 transition-transform shrink-0">
      <div className="w-full h-full rounded-[14px] bg-slate-900 flex flex-col items-center justify-center text-white relative overflow-hidden">
        <span className="text-xl sm:text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-cyan-200">
          {dev.initials}
        </span>
        <span className="text-[9px] font-semibold text-slate-400 mt-0.5">
          {dev.name.split(" ")[0]}
        </span>
      </div>
    </div>
  );
}

// =============================================================================
// 🚀 MAIN ABOUT US PAGE COMPONENT
// =============================================================================
export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredCredentials =
    activeTab === "all"
      ? CREDENTIALS
      : activeTab === "tech"
      ? CREDENTIALS.filter(
          (c) =>
            c.category.includes("Analytics") ||
            c.category.includes("Ecosystem") ||
            c.category.includes("Collaboration") ||
            c.category.includes("Certifications")
        )
      : CREDENTIALS.filter(
          (c) =>
            c.category.includes("Global") ||
            c.category.includes("Industry") ||
            c.category.includes("Builder")
        );

  return (
    <div className="relative min-h-screen text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* =======================================================================
          🎨 FIXED INTERACTIVE AMBIENT IRIDESCENT BACKGROUND (from page.js)
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
          HERO SECTION: THE COMMUNITY & EVENT MARKETING MISSION
         ======================================================================= */}
      <section className="relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-b from-white via-slate-50/40 to-white py-16 sm:py-24 lg:py-28">
        {/* Technical Grid Pattern Background matching page.js */}
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

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Heading, Subtitle, CTAs & Trust Badges */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-start text-left">
              <FadeContent effect="fade" blur={true} duration={1} delay={0.05} trigger="mount" className="w-full flex flex-col items-start">
                {/* Top Pill Badge */}
                <div
                  className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs sm:text-sm font-bold shadow-2xs backdrop-blur-md transition-colors"
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
                  <span>Social Engagement • Community Activation • GTM SaaS</span>
                </div>

                {/* Main Headline */}
                <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.12] tracking-tight text-slate-950">
                  Turning Conversations
                  <br />
                  <span
                    className="text-transparent bg-clip-text transition-all duration-300"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, var(--primary) 0%, #8b5cf6 50%, var(--secondary, #06b6d4) 100%)",
                    }}
                  >
                    Into Sustainable Growth.
                  </span>
                </h1>

                {/* Subtitle / Narrative */}
                <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-slate-700 font-normal">
                  <strong className="text-slate-900 font-semibold">Buzzoraa</strong> is a Social Engagement &amp; Go-to-Market (GTM) SaaS platform designed to turn conversations into growth. Our vision is to bring social engagement, community activation, content amplification, and GTM growth together in one unified platform. We help brands, startups, founders, and communities build meaningful connections, amplify their presence, and grow through conversations. <span className="font-semibold text-slate-900">Engage. Amplify. Grow.</span>
                </p>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    href="/Bookdemo"
                    className="cursor-pointer rounded-xl px-7 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                    style={{
                      backgroundColor: "var(--primary)",
                      boxShadow: "0 10px 24px var(--primary-glow)",
                    }}
                  >
                    <CalendarCheck2 className="h-4 w-4" />
                    <span>Book a Buzzoraa Demo</span>
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>

                  <Link
                    href="/solutions"
                    className="cursor-pointer rounded-xl border border-slate-300 bg-white/90 backdrop-blur-md px-6 py-3.5 text-base font-bold text-slate-800 transition-colors hover:bg-white flex items-center gap-2 shadow-2xs"
                  >
                    <span>Explore Solutions</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </Link>

                  <a
                    href="#founder-story"
                    className="cursor-pointer rounded-xl border border-slate-200 bg-white/80 backdrop-blur-md px-5 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:text-slate-900 hover:bg-white shadow-2xs"
                  >
                    Meet Leadership
                  </a>
                </div>

                {/* Micro Trust Indicators */}
                <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm font-semibold text-slate-600">
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>15+ Years IT Heritage</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>50K+ Community Network</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Enterprise &amp; AI Ready</span>
                  </div>
                </div>
              </FadeContent>
            </div>

            {/* Right Column: Visual Mockup with Person + Floating Badges */}
            <div className="lg:col-span-7 xl:col-span-7 relative w-full flex items-center justify-center pt-8 lg:pt-0">
              <FadeContent effect="focus" blur={true} duration={1.2} delay={0.2} trigger="mount" className="w-full flex items-center justify-center">
                <AboutHeroInteractiveVisual />
              </FadeContent>
            </div>
          </div>

          {/* Impact Stats Grid (Clean 4-Card layout) */}
          <FadeContent effect="fade" blur={true} duration={1} delay={0.2} threshold={0.15}>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {IMPACT_STATS.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white/90 border border-slate-200/80 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between backdrop-blur-md group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: stat.accent || "var(--primary)" }}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        {stat.value}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                        {stat.label}
                      </h3>
                      <p className="text-xs text-slate-500 leading-snug">
                        {stat.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeContent>
        </div>
      </section>

      {/* =======================================================================
          SECTION 2: WHAT WE DO — THE EVENT & COMMUNITY CAMPAIGN ECOSYSTEM
         ======================================================================= */}
      <section className="relative overflow-hidden bg-white/60 backdrop-blur-xs border-b border-slate-200/60 py-20 sm:py-28">
        {/* Technical Grid Pattern Background matching page.js layout */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeContent effect="fade" blur={true} duration={1} threshold={0.15} className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-2xs backdrop-blur-md"
              style={{
                borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)",
                backgroundColor: "color-mix(in srgb, var(--primary) 8%, white)",
                color: "var(--primary)",
              }}
            >
              <Target className="h-3.5 w-3.5" />
              <span>Event &amp; Community Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Comprehensive Marketing &amp; Growth for Your Next Big Event
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Organizing an event or launching a tech product shouldn&apos;t be stressful. We provide the playbook, the marketing machinery, and the technological backbone to guarantee high turnouts, active engagement, and quantifiable ROI.
            </p>
          </FadeContent>

          <FadeContent
            effect="focus"
            blur={true}
            duration={1.1}
            stagger={0.12}
            threshold={0.15}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {CAMPAIGN_SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="group relative p-8 rounded-3xl bg-white/95 border border-slate-200/90 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-md"
                >
                  {/* Accent bar on top */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, var(--primary) 0%, var(--secondary, #06b6d4) 100%)",
                    }}
                  />

                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div
                        className="h-14 w-14 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform"
                        style={{
                          backgroundColor: "var(--primary-light)",
                          color: "var(--primary)",
                        }}
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <span className="text-xs font-semibold px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {service.description}
                    </p>

                    <div className="space-y-3 mb-6 pt-4 border-t border-slate-100">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                          <CheckCircle2
                            className="h-4 w-4 shrink-0 mt-0.5"
                            style={{ color: "var(--primary)" }}
                          />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Key Outcome
                    </span>
                    <span
                      className="text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-2xs"
                      style={{
                        backgroundColor: "var(--primary-light)",
                        color: "var(--primary)",
                      }}
                    >
                      ✨ {service.highlight}
                    </span>
                  </div>
                </div>
              );
            })}
          </FadeContent>
        </div>
      </section>

      {/* =======================================================================
          SECTION 3: HOW WE EXECUTE CAMPAIGNS (THE 4-STEP METHODOLOGY - DARK THEME)
         ======================================================================= */}
      <section className="relative overflow-hidden bg-slate-950/85 backdrop-blur-md text-white py-20 sm:py-28 border-b border-slate-800/80">
        {/* Subtle grid pattern matching page.js dark sections */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient radial glows */}
        <div
          className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full blur-[140px] opacity-25"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-[140px] opacity-20"
          style={{ backgroundColor: "var(--secondary, #06b6d4)" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeContent effect="fade" blur={true} duration={1} threshold={0.15} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-indigo-300 border border-white/10 shadow-inner backdrop-blur-md">
              <Zap className="h-3.5 w-3.5 text-indigo-400" />
              <span>Proven Campaign Framework</span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400 font-mono">4-Stage Precision</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              From Event Idea to Sold-Out Crowd
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Humare saath aapka event organizer process structured aur automated rehta hai. Here is how we turn your community gathering into an unforgettable summit.
            </p>
          </FadeContent>

          <FadeContent
            effect="focus"
            blur={true}
            stagger={0.12}
            duration={1}
            threshold={0.15}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {WORKFLOW_STEPS.map((wf, idx) => (
              <div
                key={idx}
                className="relative p-7 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md flex flex-col justify-between hover:border-slate-700 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-2xl font-black font-mono px-3.5 py-1 rounded-xl bg-white/10 border border-white/10 text-white shadow-inner group-hover:scale-105 transition-transform"
                      style={{ color: "var(--secondary, #06b6d4)" }}
                    >
                      {wf.step}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
                      {wf.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                    {wf.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {wf.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Verified milestone</span>
                </div>
              </div>
            ))}
          </FadeContent>
        </div>
      </section>

      {/* =======================================================================
          SECTION: INTERACTIVE COMMUNITY & EVENT HIGHLIGHTS (<BounceCards />)
         ======================================================================= */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeContent effect="fade" blur={true} duration={1} threshold={0.15}>
          <div className="relative rounded-3xl bg-gradient-to-b from-white via-slate-50/80 to-slate-100/90 border border-slate-200/90 p-8 sm:p-14 shadow-2xl overflow-hidden backdrop-blur-md">
            {/* Ambient Glows */}
            <div
              className="absolute -top-24 right-10 h-72 w-72 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: "var(--primary)" }}
            />
            <div
              className="absolute -bottom-24 left-10 h-72 w-72 rounded-full blur-3xl opacity-15 pointer-events-none"
              style={{ backgroundColor: "var(--secondary, #06b6d4)" }}
            />

            {/* Section Header */}
            <div className="relative text-center max-w-3xl mx-auto space-y-4 mb-10">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200 bg-white shadow-2xs"
                style={{ color: "var(--primary)" }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Interactive Event Gallery</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Moments from Our Community Stages &amp; Summits
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Hover over the cards to fan them out, inspect event glimpses, and click to feel the physics bounce.
              </p>
            </div>

            {/* BounceCards Interactive Container */}
            <div className="relative flex flex-col items-center justify-center my-4">
              <div className="w-full flex justify-center py-6 overflow-x-auto sm:overflow-visible">
                <BounceCards
                  images={BOUNCE_GALLERY_IMAGES}
                  containerWidth={500}
                  containerHeight={320}
                  cardSize={200}
                  spread={85}
                  rotation={10}
                  arc={0}
                  pushDistance={160}
                  hoverScale={1.06}
                  bounciness={0.6}
                  animationDelay={0.5}
                  animationStagger={0.06}
                  borderWidth={5}
                  borderColor="#ffffff"
                  radius={25}
                  shadow
                  enableHover
                />
              </div>

              {/* Quick Interactive Hints */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs font-medium">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Hover / Swipe to fan out cards</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs font-medium">
                  <span>Click any card to bounce</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold shadow-2xs">
                  <span>📸 Real community moments &amp; summits</span>
                </span>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* =======================================================================
          SECTION 4: FOUNDER & LEADERSHIP PROFILE (TARUN GUPTA)
         ======================================================================= */}
      <section
        id="founder-story"
        className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-slate-200/60"
      >
        <FadeContent effect="fade" blur={true} duration={1} threshold={0.15} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-2xs backdrop-blur-md"
            style={{
              borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)",
              backgroundColor: "color-mix(in srgb, var(--primary) 8%, white)",
              color: "var(--primary)",
            }}
          >
            <Award className="h-3.5 w-3.5" />
            <span>Leadership &amp; Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Meet the Leader Driving Ecosystems &amp; Communities
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            At the intersection of deep enterprise technology, human connection, and global community building.
          </p>
        </FadeContent>

        {/* Master Executive Card */}
        <FadeContent effect="focus" blur={true} duration={1.1} threshold={0.15}>
          <div className="rounded-3xl bg-white/95 border border-slate-200/90 shadow-2xl overflow-hidden backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Portrait & Key Badges (5 cols) */}
              <div className="lg:col-span-5 p-8 sm:p-10 bg-gradient-to-b from-slate-50 via-white to-slate-100/60 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col items-center text-center">
                {/* Photo Frame with graceful TG avatar fallback */}
                <FounderPortrait />

                {/* Founder Identity */}
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Tarun Gupta
                </h3>
                <p className="text-sm font-semibold text-indigo-600 mt-1">
                  Founder &amp; CTO • Vivaansh Consulting
                </p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Global Community Strategist &amp; Enterprise Architect
                </p>

                {/* Status Chips */}
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 shadow-2xs">
                    <BarChart3 className="h-3.5 w-3.5" /> 2x Tableau Ambassador
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 shadow-2xs">
                    <Target className="h-3.5 w-3.5" /> Salesforce Marketing Champion
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 shadow-2xs">
                    <Award className="h-3.5 w-3.5" /> Copado Professional 2023
                  </span>
                </div>

                {/* Personal Mission Quote Box */}
                <div className="mt-7 w-full p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-left">
                  <div className="flex items-center gap-2 text-indigo-600 mb-2">
                    <Quote className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Guiding Philosophy
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    &ldquo;One of the things I value most is creating spaces where people can learn, connect, and grow — whether they are experienced professionals, students, founders, or someone just beginning their technology journey.&rdquo;
                  </p>
                </div>

                {/* Direct Reach Out Action */}
                <div className="mt-6 w-full pt-6 border-t border-slate-200 flex flex-col gap-2.5">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs font-bold text-white shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-95"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    <Mail className="h-4 w-4" />
                    <span>Connect with Tarun</span>
                  </Link>
                  <Link
                    href="/Bookdemo"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    <CalendarCheck2 className="h-4 w-4 text-slate-500" />
                    <span>Schedule Strategy Session</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Bio Narrative & Strategic Impact (7 cols) */}
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      Executive Profile
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 leading-tight">
                      Building the Intersection of Technology, People &amp; Ecosystems
                    </h4>
                  </div>

                  <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                    <p>
                      I’m the <strong className="text-slate-900 font-semibold">Founder &amp; CTO of Vivaansh Consulting</strong>, a technology consulting firm focused on Salesforce, Slack, Tableau, Data, AI, and modern workplace solutions.
                    </p>
                    <p>
                      With <strong className="text-slate-900 font-semibold">15+ years of experience in IT</strong> and a strong passion for technology and community building, I work at the intersection of technology, people, and ecosystems — helping organizations adopt the right solutions while helping professionals and communities grow.
                    </p>
                    <p>
                      I’m also a <strong className="text-slate-900 font-semibold">Global Community Strategist</strong>, focused on building data-driven, collaborative, and high-growth technology communities across global networks.
                    </p>
                    <p className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-indigo-950 font-medium text-sm leading-relaxed shadow-2xs">
                      🚀 <strong className="font-semibold text-indigo-950">Core Mission:</strong> Helping organizations transform and connect their Salesforce, Slack, Tableau, Data &amp; AI ecosystems while empowering event organizers to run viral, community-backed marketing campaigns.
                    </p>
                  </div>

                  {/* Key Roles Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    <div className="flex items-start gap-3 text-xs text-slate-700 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-900 font-semibold mb-0.5">Slack SME &amp; Architect</strong>
                        Enterprise collaboration, integrations, automations &amp; AI experiences.
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-xs text-slate-700 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-900 font-semibold mb-0.5">First Country Advisor – CMX Connect</strong>
                        Strengthening the global community-building ecosystem.
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-xs text-slate-700 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-900 font-semibold mb-0.5">Community Growth Catalyst</strong>
                        Scaling communities across Salesforce, Slack, Tableau, CMX &amp; Startup Grind.
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-xs text-slate-700 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-900 font-semibold mb-0.5">Certified SME &amp; Mentor</strong>
                        Hands-on implementations, Superbadges, and continuous knowledge sharing.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Vivaansh Consulting &amp; Platform Ecosystem</span>
                  <span className="text-indigo-600 font-semibold">Open for Keynotes, Campaigns &amp; Advisory</span>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* =======================================================================
          SECTION: CORE ENGINEERING TEAM (<SpotlightCard />)
         ======================================================================= */}
      <section id="team" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/60">
        <FadeContent effect="fade" blur={true} duration={1} threshold={0.15} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-2xs backdrop-blur-md"
            style={{
              borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)",
              backgroundColor: "color-mix(in srgb, var(--primary) 8%, white)",
              color: "var(--primary)",
            }}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Core Engineering Team</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            The Developers Powering Our Platform
          </h2>

          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Meet our Full Stack Developers driving architecture, high-performance web experiences, and seamless community technologies.
          </p>
        </FadeContent>

        {/* 2 Spotlight Cards Grid */}
        <FadeContent
          effect="focus"
          blur={true}
          stagger={0.15}
          duration={1.1}
          threshold={0.15}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {ENGINEERING_TEAM.map((dev, idx) => (
            <SpotlightCard
              key={idx}
              theme="light"
              spotlightColor="rgba(99, 102, 241, 0.35)"
              intensity={0.25}
              spotlightSize={300}
              softness={0.7}
              borderGlow={0.7}
              proximity={90}
              smoothing={0.25}
              flare={true}
              className="p-8 sm:p-10 rounded-3xl bg-white/95 border border-slate-200/90 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group backdrop-blur-md"
            >
              <div>
                {/* Header row: Avatar & Badge */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  {/* Photo with robust fallback */}
                  <DevPortrait dev={dev} />

                  {/* Role Badge */}
                  <div className="flex flex-col items-end gap-1.5">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full shadow-2xs"
                      style={{
                        backgroundColor: "var(--primary-light)",
                        color: "var(--primary)",
                      }}
                    >
                      {dev.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active Developer
                    </span>
                  </div>
                </div>

                {/* Developer Name & Role */}
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                  {dev.name}
                </h3>
                <p className="text-sm font-bold text-indigo-600 mt-1 flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  <span>{dev.role}</span>
                </p>

                {/* Bio Narrative */}
                <p className="text-sm text-slate-600 leading-relaxed font-normal mt-4">
                  {dev.bio}
                </p>

                {/* Guiding Quote */}
                <div className="mt-4 p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 text-xs text-slate-700 italic shadow-2xs">
                  &ldquo;{dev.quote}&rdquo;
                </div>

                {/* Skills Chips */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                    Technical Expertise &amp; Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dev.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/80 group-hover:border-indigo-200 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors"
                >
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span>Connect with {dev.name.split(" ")[0]}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                </Link>

                <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-mono text-[11px] font-semibold border border-indigo-100 shadow-2xs">
                  Full Stack
                </span>
              </div>
            </SpotlightCard>
          ))}
        </FadeContent>
      </section>

      {/* =======================================================================
          SECTION 5: CREDENTIALS & GLOBAL RECOGNITION (TABS / FILTER)
         ======================================================================= */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/60">
        <FadeContent effect="fade" blur={true} duration={1} threshold={0.15}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Verified Industry Distinctions
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Honors, Accreditations &amp; Roles
              </h2>
            </div>

            {/* Interactive Filter Pills */}
            <div className="inline-flex p-1 rounded-2xl bg-slate-200/70 text-xs font-bold text-slate-600 shadow-inner">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === "all"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "hover:text-slate-900"
                }`}
              >
                All Honors ({CREDENTIALS.length})
              </button>
              <button
                onClick={() => setActiveTab("tech")}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === "tech"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "hover:text-slate-900"
                }`}
              >
                Tech &amp; Analytics
              </button>
              <button
                onClick={() => setActiveTab("community")}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === "community"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "hover:text-slate-900"
                }`}
              >
                Community Leadership
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCredentials.map((cred, idx) => {
              const Icon = cred.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white/95 border border-slate-200/90 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between backdrop-blur-md group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className="h-12 w-12 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform"
                        style={{
                          backgroundColor: "var(--primary-light)",
                          color: "var(--primary)",
                        }}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <span
                        className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-2xs ${cred.badgeColor}`}
                      >
                        {cred.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {cred.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {cred.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeContent>
      </section>

      {/* =======================================================================
          SECTION 6: BEYOND TECHNOLOGY — SPEAKING, MENTORSHIP & WORKSHOPS
         ======================================================================= */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-100/70 via-white to-slate-50/60 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto">
          <FadeContent effect="fade" blur={true} duration={1} threshold={0.15}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Col (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white border border-slate-200 text-indigo-600 shadow-2xs">
                  <Mic className="h-3.5 w-3.5" />
                  <span>Beyond Technology</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Public Speaker, Mentor &amp; Ecosystem Catalyst
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  I regularly speak at meetups, conferences, workshops, and global community events, sharing practical, battle-tested insights from 15+ years in enterprise IT and community building.
                </p>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span>Looking for a Keynote Speaker or Workshop Leader?</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Available for global conferences, corporate webinars, community meetups, and developer panels around modern tech architecture &amp; community growth.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 pt-1 group"
                  >
                    <span>Inquire for Speaking Engagements</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Col: Speaking Topics Grid (7 cols) */}
              <div className="lg:col-span-7">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Core Keynote &amp; Workshop Themes
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {SPEAKING_TOPICS.map((topic, idx) => {
                    const Icon = topic.icon;
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs"
                            style={{
                              backgroundColor: "var(--primary-light)",
                              color: "var(--primary)",
                            }}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {topic.name}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {topic.tag}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-500 transition-colors shrink-0" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeContent>
        </div>
      </section>

      {/* =======================================================================
          SECTION: ECOSYSTEM & TECH INTEGRATIONS (LogoLoop from page.js)
         ======================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 text-center font-semibold">
            Trusted Platforms, CRM Integrations &amp; Community Ecosystems
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
          SECTION 7: REACH OUT / COLLABORATION INVITATION BANNER (DARK THEME)
         ======================================================================= */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden bg-slate-950 border-t border-slate-800"
      >
        <div
          className="absolute -top-32 right-10 h-80 w-80 rounded-full blur-[130px] opacity-25 pointer-events-none"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <div
          className="absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[130px] opacity-20 pointer-events-none"
          style={{ backgroundColor: "var(--secondary, #06b6d4)" }}
        />

        <div className="relative mx-auto max-w-4xl text-center space-y-6">
          <FadeContent effect="fade" blur={true} duration={1} threshold={0.15}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold text-slate-200 shadow-inner">
              <HeartHandshake className="h-4 w-4 text-rose-400" />
              <span>Open for Collaboration &amp; Partnerships</span>
            </div>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              If You’re Passionate About Technology, Data, AI, Communities, or Collaboration
            </h2>

            <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed font-normal mt-4">
              Whether you want to exchange ideas, explore a project, discuss a community initiative, collaborate on an event marketing campaign, or simply have a conversation about technology — feel free to reach out.
            </p>

            <div className="pt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-xs sm:text-sm font-bold text-white shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: "var(--primary)",
                  boxShadow: "0 10px 28px var(--primary-glow)",
                }}
              >
                <Mail className="h-4 w-4" />
                <span>Let&apos;s Connect &amp; Collaborate</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/Bookdemo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-xs sm:text-sm font-bold text-slate-200 border border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all"
              >
                <CalendarCheck2 className="h-4 w-4 text-indigo-300" />
                <span>Book an Event Strategy Call</span>
              </Link>
            </div>

            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-400" /> Community Events &amp; Hackathons
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-400" /> Platform &amp; SaaS Marketing
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-400" /> Salesforce, Slack &amp; AI Advisory
              </span>
            </div>
          </FadeContent>
        </div>
      </section>
    </div>
  );
}
