"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BounceCards from "@/components/BounceCards";
import SpotlightCard from "@/components/SpotlightCard";

// =============================================================================
// 📸 BOUNCE CARDS IMAGES (Aap yahan apni images add kar sakte hain)
// -----------------------------------------------------------------------------
// Note: Abhi images empty rakhi gayi hain jaisa aapne request kiya tha.
// Jab aapko photos add karni ho, bas yahan URLs ya local paths daal dijiye:
// Example:
//   "/community-event-stage.jpg",
//   "https://images.unsplash.com/photo-..."
// =============================================================================
const BOUNCE_GALLERY_IMAGES = [
  "", // Card 1 (Left)
  "", // Card 2
  "", // Card 3 (Center)
  "", // Card 4
  "", // Card 5 (Right)
];

// =============================================================================
// 👥 CORE ENGINEERING TEAM (Aap yahan photos & details update kar sakte hain)
// -----------------------------------------------------------------------------
// Note: Images empty rakhi gayi hain jaisa aapne request kiya tha.
// Jab aapko apni photos add karni ho, bas `image` field me URL ya path daal dijiye:
// Example:
//   image: "/team/danish.jpg"
//   image: "/team/gopal.jpg"
// =============================================================================
const ENGINEERING_TEAM = [
  {
    name: "Danish Khan",
    role: "Full Stack Developer",
    badge: "Core Engineering",
    image: "", // Photo URL ya local path yahan add karein (baad me)
    initials: "DK",
    bio: "Passionate Full Stack Developer specializing in high-performance Next.js architectures, modern front-end experiences, scalable backend systems, and automated event marketing pipelines.",
    skills: ["React & Next.js", "Full Stack Development", "Node.js & APIs", "Tailwind CSS", "Database Design"],
    quote: "Building seamless digital platforms with precision and modern web architecture.",
  },
  {
    name: "Gopal Krishan Vasudevan",
    role: "Full Stack Developer",
    badge: "Core Engineering",
    image: "", // Photo URL ya local path yahan add karein (baad me)
    initials: "GV",
    bio: "Accomplished Full Stack Developer focused on architecting resilient platforms, interactive interfaces, end-to-end data integrations, and scalable tech infrastructure for communities.",
    skills: ["Full Stack Engineering", "Next.js & React", "System Architecture", "Cloud Services", "API Integration"],
    quote: "Crafting scalable, data-driven applications that empower communities worldwide.",
  },
];

import {
  Code2,
  Terminal,
  Sparkles,

  Users,
  Award,
  Globe,
  CheckCircle2,
  ArrowRight,
  Target,
  Zap,
  CalendarCheck2,
  BarChart3,
  Megaphone,
  Rocket,
  MessageSquare,
  Share2,
  Layers,
  ShieldCheck,
  Check,
  Briefcase,
  GraduationCap,
  Mic,
  Lightbulb,
  HeartHandshake,
  Coffee,
  Mail,
  ChevronRight,
  TrendingUp,
  Cpu,
  Building,
  Handshake,
  Star,
  Quote,
  Network,
} from "lucide-react";

// Key Impact Stats
const IMPACT_STATS = [
  {
    value: "15+",
    label: "Years in IT & Tech Ecosystems",
    detail: "Leading transformative solutions & enterprise architectures",
    icon: Briefcase,
  },
  {
    value: "100+",
    label: "Events & Meetups Campaigned",
    detail: "Global conferences, hackathons, and local community stages",
    icon: Megaphone,
  },
  {
    value: "50K+",
    label: "Community Members Engaged",
    detail: "Empowering developers, students, founders & IT leaders",
    icon: Users,
  },
  {
    value: "7+",
    label: "Global Honors & Ecosystem Roles",
    detail: "Tableau Ambassador, Salesforce Champion, CMX Advisor",
    icon: Award,
  },
];

// Event & Community Marketing Pillars (Ham Kya Karte Hain)
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

// Tarun Gupta's Honors & Credentials
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

// Speaking & Mentorship Topics (Beyond Technology)
const SPEAKING_TOPICS = [
  { name: "Salesforce & Data Cloud", icon: Layers, tag: "Enterprise Tech" },
  { name: "Slack & Enterprise Collaboration", icon: MessageSquare, tag: "Workplace Tech" },
  { name: "Tableau & Data Analytics", icon: BarChart3, tag: "Data Culture" },
  { name: "AI & Agentforce", icon: Sparkles, tag: "Next-Gen AI" },
  { name: "Community Building & Scalable Growth", icon: Users, tag: "Ecosystem" },
  { name: "Technology Leadership & Culture", icon: Briefcase, tag: "Leadership" },
  { name: "Career Acceleration & Mentorship", icon: Lightbulb, tag: "People Growth" },
];

// How It Works / Campaign Execution Workflow
const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Strategy & Audience Blueprint",
    desc: "We analyze your event goals, target personas, sponsor expectations, and platform tech stack to design a customized campaign roadmap.",
  },
  {
    step: "02",
    title: "Multi-Channel Campaign Launch",
    desc: "We deploy high-converting landing pages, social media buzz, speaker teasers, community cross-promotions, and automated registration funnels.",
  },
  {
    step: "03",
    title: "Live Event & Community Activation",
    desc: "Whether virtual, hybrid, or on-ground, we orchestrate interactive chat rooms, live polls, Q&A stages, and real-time social amplification.",
  },
  {
    step: "04",
    title: "Analytics, Sponsor ROI & Retention",
    desc: "Post-event, we deliver comprehensive Tableau dashboards detailing attendee engagement, sponsor impressions, and ongoing community retention.",
  },
];

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
    <div className="bg-slate-50 min-h-screen text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* =========================================================================
          HERO SECTION: THE COMMUNITY & EVENT MARKETING MISSION
          ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/60 border-b border-slate-200">
        {/* Ambient Glows */}
        <div
          className="absolute -top-24 right-1/4 h-96 w-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <div
          className="absolute top-1/2 left-10 h-72 w-72 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ backgroundColor: "var(--secondary)" }}
        />

        <div className="relative mx-auto max-w-6xl">
          {/* Top Pill Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-slate-200 bg-white/90 shadow-2xs backdrop-blur-md">
              <span
                className="flex h-2.5 w-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--primary)" }}
              />
              <span className="text-xs font-bold text-slate-800 tracking-wide">
                Event Marketing • Community Strategy • Tech Ecosystems
              </span>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Connecting Communities,{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                }}
              >
                Scaling Events & Marketing
              </span>{" "}
              Modern Tech Platforms.
            </h1>

            <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal">
              Jab koi <strong className="text-slate-800 font-semibold">community</strong> ya{" "}
              <strong className="text-slate-800 font-semibold">event organizer</strong> apna summit
              ya hackathon organize karna chahta hai, ya koi tech company apna product market karna
              chahti hai—hum unke liye end-to-end, data-driven marketing campaigns, ecosystem
              technology, aur scalable community engagement deliver karte hain.
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/Bookdemo"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-white shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: "var(--primary)",
                  boxShadow: "0 10px 28px var(--primary-glow)",
                }}
              >
                <CalendarCheck2 className="h-4 w-4" />
                <span>Launch Your Event Campaign</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#founder-story"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-slate-700 bg-white border border-slate-200 shadow-2xs hover:bg-slate-100/80 transition-colors"
              >
                <span>Meet Founder & CTO</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Feature Showcase Banner / Image */}
          <div className="mt-14 relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-slate-900">
            <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden">
              <Image
                src="/community-event-stage.jpg"
                alt="Happico Event Marketing & Developer Conference Hub"
                fill
                priority
                className="object-cover object-center opacity-95 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Floating badges on top of banner */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3 text-white">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/20 backdrop-blur-md text-xs font-bold text-white">
                    <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
                    <span>Real-Time Community Stage & Campaign Engine</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium hidden sm:block">
                    From developer hackathons to enterprise summits — turning attendees into lifelong community advocates.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-semibold">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Active Campaigns Running</span>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Stats Grid */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {IMPACT_STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-3xl font-black text-slate-900 tracking-tight">
                      {stat.value}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">
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
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: WHAT WE DO — THE EVENT & COMMUNITY CAMPAIGN ECOSYSTEM
          ========================================================================= */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200 bg-white" style={{ color: "var(--primary)" }}>
            <Target className="h-3.5 w-3.5" />
            <span>Event & Community Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Comprehensive Marketing & Growth for Your Next Big Event
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Organizing an event or launching a tech product shouldn't be stressful. We provide the playbook, the marketing machinery, and the technological backbone to guarantee high turnouts, active engagement, and quantifiable ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CAMPAIGN_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Accent bar on top */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)",
                  }}
                />

                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div
                      className="h-13 w-13 rounded-2xl flex items-center justify-center shadow-sm"
                      style={{
                        backgroundColor: "var(--primary-light)",
                        color: "var(--primary)",
                      }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-100">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
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
                    className="text-xs font-bold px-3 py-1 rounded-lg"
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
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: HOW WE EXECUTE CAMPAIGNS (THE 4-STEP METHODOLOGY)
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden">
        <div
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full blur-[140px] opacity-25 pointer-events-none"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-[140px] opacity-20 pointer-events-none"
          style={{ backgroundColor: "var(--secondary)" }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-indigo-300 border border-white/10">
              <Zap className="h-3.5 w-3.5 text-indigo-400" />
              <span>Proven Campaign Framework</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              From Event Idea to Sold-Out Crowd
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Humare saath aapka event organizer process structured aur automated rehta hai. Here is how we turn your community gathering into an unforgettable summit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW_STEPS.map((wf, idx) => (
              <div
                key={idx}
                className="relative p-7 rounded-3xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-2xl font-black font-mono px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-white"
                      style={{ color: "var(--secondary)" }}
                    >
                      {wf.step}
                    </span>
                    <Sparkles className="h-4 w-4 text-slate-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2.5">
                    {wf.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {wf.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: INTERACTIVE COMMUNITY & EVENT HIGHLIGHTS (<BounceCards />)
          ========================================================================= */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-b from-white via-slate-50 to-slate-100/80 border border-slate-200/90 p-8 sm:p-14 shadow-xl overflow-hidden">
          {/* Ambient Glows */}
          <div
            className="absolute -top-24 right-10 h-72 w-72 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: "var(--primary)" }}
          />
          <div
            className="absolute -bottom-24 left-10 h-72 w-72 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ backgroundColor: "var(--secondary)" }}
          />

          {/* Section Header */}
          <div className="relative text-center max-w-3xl mx-auto space-y-4 mb-10">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200 bg-white shadow-2xs"
              style={{ color: "var(--primary)" }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Interactive Event Gallery</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Moments from Our Community Stages & Summits
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
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                <span>Hover / Swipe to fan out cards</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs">
                <span>Click any card to bounce</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                <span>📸 Image slots empty — ready for your photos</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: FOUNDER & LEADERSHIP PROFILE (TARUN GUPTA)
          ========================================================================= */}
      <section
        id="founder-story"
        className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20"
      >
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200 bg-white" style={{ color: "var(--primary)" }}>
            <Award className="h-3.5 w-3.5" />
            <span>Leadership & Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Meet the Leader Driving Ecosystems & Communities
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            At the intersection of deep enterprise technology, human connection, and global community building.
          </p>
        </div>

        {/* Master Executive Card */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Portrait & Key Badges (5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-10 bg-gradient-to-b from-slate-50 to-slate-100/60 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col items-center text-center">
              {/* Photo Frame */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white mb-6">
                <Image
                  src="/tarun-gupta.jpg"
                  alt="Tarun Gupta - Founder & CTO of Vivaansh Consulting"
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>

              {/* Founder Identity */}
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Tarun Gupta
              </h3>
              <p className="text-sm font-semibold text-indigo-600 mt-1">
                Founder & CTO • Vivaansh Consulting
              </p>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                Global Community Strategist & Enterprise Architect
              </p>

              {/* Status Chips */}
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                  <BarChart3 className="h-3.5 w-3.5" /> 2x Tableau Ambassador
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                  <Target className="h-3.5 w-3.5" /> Salesforce Marketing Champion
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
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
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white shadow-md transition-all active:scale-95"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  <Mail className="h-4 w-4" />
                  <span>Connect with Tarun</span>
                </Link>
                <Link
                  href="/Bookdemo"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
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
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                    Building the Intersection of Technology, People & Ecosystems
                  </h4>
                </div>

                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    I’m the <strong className="text-slate-900 font-semibold">Founder & CTO of Vivaansh Consulting</strong>, a technology consulting firm focused on Salesforce, Slack, Tableau, Data, AI, and modern workplace solutions.
                  </p>
                  <p>
                    With <strong className="text-slate-900 font-semibold">15+ years of experience in IT</strong> and a strong passion for technology and community building, I work at the intersection of technology, people, and ecosystems — helping organizations adopt the right solutions while helping professionals and communities grow.
                  </p>
                  <p>
                    I’m also a <strong className="text-slate-900 font-semibold">Global Community Strategist</strong>, focused on building data-driven, collaborative, and high-growth technology communities across global networks.
                  </p>
                  <p className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-indigo-900 font-medium text-sm">
                    🚀 <strong className="font-semibold">Core Mission:</strong> Helping organizations transform and connect their Salesforce, Slack, Tableau, Data & AI ecosystems while empowering event organizers to run viral, community-backed marketing campaigns.
                  </p>
                </div>

                {/* Key Roles Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-semibold">Slack SME & Architect</strong>
                      Enterprise collaboration, integrations, automations & AI experiences.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-semibold">First Country Advisor – CMX Connect</strong>
                      Strengthening the global community-building ecosystem.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-semibold">Community Growth Catalyst</strong>
                      Scaling communities across Salesforce, Slack, Tableau, CMX & Startup Grind.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-semibold">Certified SME & Mentor</strong>
                      Hands-on implementations, Superbadges, and continuous knowledge sharing.
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Vivaansh Consulting & Platform Ecosystem</span>
                <span>Open for Keynotes, Campaigns & Advisory</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: CORE ENGINEERING TEAM (<SpotlightCard />)
          ========================================================================= */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200 bg-white shadow-2xs"
            style={{ color: "var(--primary)" }}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Core Engineering Team</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            The Developers Powering Our Platform
          </h2>

          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Meet our Full Stack Developers driving architecture, high-performance web experiences, and seamless community technologies.
          </p>
        </div>

        {/* 2 Spotlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header row: Avatar & Badge */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  {/* Photo or Empty Avatar Placeholder */}
                  <div className="relative">
                    {dev.image ? (
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-4 ring-slate-100 shadow-md">
                        <Image
                          src={dev.image}
                          alt={dev.name}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                    ) : (
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
                        <div className="w-full h-full rounded-[14px] bg-slate-900 flex flex-col items-center justify-center text-white relative overflow-hidden">
                          <span className="text-xl sm:text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-cyan-200">
                            {dev.initials}
                          </span>
                          <span className="text-[9px] font-semibold text-slate-400 mt-0.5">
                            + Add Photo
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

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
                <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 italic">
                  &ldquo;{dev.quote}&rdquo;
                </div>

                {/* Skills Chips */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                    Technical Expertise & Stack
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

                <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-mono text-[11px] font-semibold border border-indigo-100">
                  Full Stack
                </span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CREDENTIALS & GLOBAL RECOGNITION (TABS / FILTER)
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Verified Industry Distinctions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Honors, Accreditations & Roles
            </h2>
          </div>

          {/* Interactive Filter Pills */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-200/70 text-xs font-bold text-slate-600">
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
              Tech & Analytics
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
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className="h-11 w-11 rounded-2xl flex items-center justify-center"
                      style={{
                        backgroundColor: "var(--primary-light)",
                        color: "var(--primary)",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${cred.badgeColor}`}
                    >
                      {cred.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
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
      </section>

      {/* =========================================================================
          SECTION 6: BEYOND TECHNOLOGY — SPEAKING, MENTORSHIP & WORKSHOPS
          ========================================================================= */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-100/70 to-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white border border-slate-200 text-indigo-600">
                <Mic className="h-3.5 w-3.5" />
                <span>Beyond Technology</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Public Speaker, Mentor & Ecosystem Catalyst
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                I regularly speak at meetups, conferences, workshops, and global community events, sharing practical, battle-tested insights from 15+ years in enterprise IT and community building.
              </p>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>Looking for a Keynote Speaker or Workshop Leader?</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Available for global conferences, corporate webinars, community meetups, and developer panels around modern tech architecture & community growth.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 pt-1"
                >
                  <span>Inquire for Speaking Engagements</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Col: Speaking Topics Grid (7 cols) */}
            <div className="lg:col-span-7">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                Core Keynote & Workshop Themes
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {SPEAKING_TOPICS.map((topic, idx) => {
                  const Icon = topic.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
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
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: REACH OUT / COLLABORATION INVITATION BANNER
          ========================================================================= */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden"
        style={{ backgroundColor: "var(--footer-bg)" }}
      >
        <div
          className="absolute -top-32 right-10 h-80 w-80 rounded-full blur-[120px] opacity-25 pointer-events-none"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <div
          className="absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ backgroundColor: "var(--secondary)" }}
        />

        <div className="relative mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold text-slate-200">
            <HeartHandshake className="h-4 w-4 text-rose-400" />
            <span>Open for Collaboration & Partnerships</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            If You’re Passionate About Technology, Data, AI, Communities, or Collaboration
          </h2>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Whether you want to exchange ideas, explore a project, discuss a community initiative, collaborate on an event marketing campaign, or simply have a conversation about technology — feel free to reach out.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-xs sm:text-sm font-bold text-white shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "var(--primary)",
                boxShadow: "0 10px 28px var(--primary-glow)",
              }}
            >
              <Mail className="h-4 w-4" />
              <span>Let&apos;s Connect & Collaborate</span>
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

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-400" /> Community Events & Hackathons
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-400" /> Platform & SaaS Marketing
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-400" /> Salesforce, Slack & AI Advisory
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
