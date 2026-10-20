"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import LaserFlow from "@/components/LaserFlow";
import {
  Users,
  Trophy,
  Megaphone,
  Rocket,
  Terminal,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Calendar,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Globe2,
  Code2,
  Zap,
  Target,
  BarChart3,
  Award,
  Layers,
  Check,
  Building2,
  ExternalLink,
  Flame,
  HelpCircle,
  Clock,
  Compass,
} from "lucide-react";

// =============================================================================
// 🌟 6 CORE SOLUTIONS DATA (Tailored to Happico Community & Event Engine)
// =============================================================================
const SOLUTIONS_DATA = [
  {
    id: "community-building",
    number: "01",
    category: "community",
    badge: "Community Growth",
    title: "Community Building & Management",
    tagline: "Nayi community banana aur existing community ko grow karna.",
    description:
      "Transform passive audiences into vibrant, self-sustaining developer and tech ecosystems. We architect onboarding journeys, moderate 24/7 across multiple chat platforms, and cultivate long-term member advocacy.",
    icon: Users,
    gradient: "from-indigo-500 to-blue-600",
    bgSoft: "bg-indigo-50/70",
    borderSoft: "border-indigo-100",
    accentColor: "#6366f1",
    features: [
      {
        title: "Community Setup & Seamless Onboarding",
        desc: "Automated verification bots, welcome sequences, role assignment architectures, and clear code-of-conduct guidelines.",
      },
      {
        title: "Member Engagement Strategy",
        desc: "Structured weekly rituals, technical AMAs, discussion prompts, peer code reviews, and gamified member recognition badges.",
      },
      {
        title: "Discord, WhatsApp & Telegram Ops",
        desc: "24/7 proactive moderation, custom webhook alert systems, spam filters, and channel topic categorization.",
      },
      {
        title: "Community Growth Campaigns",
        desc: "Viral referral programs, community-led growth (CLG) funnels, cross-community meetups, and organic tech member acquisition.",
      },
      {
        title: "Member Retention & Networking",
        desc: "Peer matchmaking, regional study groups, mentorship circles, and alumni chapter connections that sustain stickiness.",
      },
    ],
    deliverables: [
      "Custom Server/Group Setup & Bot Config",
      "Monthly 30-Day Engagement Content Calendar",
      "Active 24/7 Multi-Platform Moderation",
      "Bi-Weekly Analytics & Member Retention Reports",
    ],
    metrics: [
      { label: "Member Growth", value: "3.4x" },
      { label: "Active Engagement", value: "88%" },
      { label: "Retention Rate", value: "94%" },
    ],
    supportedPlatforms: ["Discord", "WhatsApp", "Telegram", "Slack", "Circle"],
  },
  {
    id: "hackathon-management",
    number: "02",
    category: "events",
    badge: "Event Orchestration",
    title: "Hackathon & Event Management",
    tagline: "Online aur offline events ko plan, organize aur execute karna.",
    description:
      "End-to-end execution of high-energy hackathons, technical workshops, and global developer summits. From problem statement curation to live stage judging, we handle every logistical and technical detail.",
    icon: Trophy,
    gradient: "from-amber-500 to-orange-600",
    bgSoft: "bg-amber-50/70",
    borderSoft: "border-amber-100",
    accentColor: "#f59e0b",
    features: [
      {
        title: "Hackathons & Coding Competitions",
        desc: "Design multi-track problem statements, developer toolkits, sandbox environments, and clear project submission rubrics.",
      },
      {
        title: "Webinars, Workshops & Meetups",
        desc: "Technical live stream orchestration, hands-on lab environments, dual-speaker coordination, and interactive audience Q&A.",
      },
      {
        title: "Tech Conferences & Community Summits",
        desc: "Stage management, audio/video streaming, speaker itineraries, sponsor booths, and physical venue coordination.",
      },
      {
        title: "Registration & Participant Management",
        desc: "Branded ticketing portals, identity verification, automated calendar invites, and multi-channel RSVP reminder alerts.",
      },
      {
        title: "Judging, Prizes & Winner Announcements",
        desc: "Impartial judge scoring panels, live transparent leaderboards, certificate generation, and fast bounty distributions.",
      },
    ],
    deliverables: [
      "Dedicated Hackathon Registration Portal",
      "Judge Rubric & Submission Verification System",
      "Live Production, Stage Hosts & AV Stream",
      "Certificate of Participation & Prize Dispatch",
    ],
    metrics: [
      { label: "Avg Hackers / Event", value: "4,500+" },
      { label: "Submission Rate", value: "72%" },
      { label: "Check-in Velocity", value: "< 90s" },
    ],
    supportedPlatforms: ["Devpost", "GitHub", "YouTube Live", "Zoom Pro", "Happico Stage"],
  },
  {
    id: "event-promotion",
    number: "03",
    category: "promotion",
    badge: "Audience Acquisition",
    title: "Community & Event Promotion",
    tagline: "Aapke event, product ya community ko relevant audience tak pahunchana.",
    description:
      "Targeted multi-channel amplification campaigns that fill your registrations with qualified builders, founders, and decision-makers. We leverage data-backed distribution to maximize attendance and hype.",
    icon: Megaphone,
    gradient: "from-rose-500 to-pink-600",
    bgSoft: "bg-rose-50/70",
    borderSoft: "border-rose-100",
    accentColor: "#f43f5e",
    features: [
      {
        title: "Targeted Social Media Campaigns",
        desc: "High-converting tech Twitter/X threads, LinkedIn industry campaigns, Reddit developer subreddits, and Instagram reels.",
      },
      {
        title: "Event Promotion & Attendee Registrations",
        desc: "Conversion-optimized landing funnels, retargeting pixels, email blast automation, and verified attendee pipeline generation.",
      },
      {
        title: "Community Cross-Partnerships",
        desc: "Syndication across 50+ partnered developer clubs, university hubs, open-source communities, and regional tech groups.",
      },
      {
        title: "Influencer & Tech Creator Collaborations",
        desc: "Engage top DevRel leaders, YouTube coders, and open-source influencers for organic endorsements and live demos.",
      },
      {
        title: "Promotional Content & Campaign Planning",
        desc: "Viral video hooks, teaser collateral, speaker highlight cards, countdown graphics, and persuasive email newsletters.",
      },
    ],
    deliverables: [
      "Custom Campaign Strategy & Media Kit",
      "Cross-Posting Across 50+ Partner Communities",
      "Performance Tracking Funnel & UTM Dashboards",
      "Creator Sponsorship Outreach & Management",
    ],
    metrics: [
      { label: "Total Impressions", value: "15M+" },
      { label: "RSVP Conversion", value: "3.8x" },
      { label: "Cost Per Registrant", value: "-45%" },
    ],
    supportedPlatforms: ["Twitter/X", "LinkedIn", "Reddit", "Substack", "Tech Hubs"],
  },
  {
    id: "product-launch",
    number: "04",
    category: "product",
    badge: "Go-To-Market",
    title: "Product Launch & Brand Awareness",
    tagline: "Startups aur tech brands ko apne products audience ke saamne introduce karne mein help karna.",
    description:
      "Ignite high-velocity product launches for APIs, SaaS tools, and developer platforms. We generate early-adopter buzz, source rigorous beta feedback, and position your product in front of the right technical audience.",
    icon: Rocket,
    gradient: "from-cyan-500 to-blue-600",
    bgSoft: "bg-cyan-50/70",
    borderSoft: "border-cyan-100",
    accentColor: "#06b6d4",
    features: [
      {
        title: "Product Launch Campaigns",
        desc: "Product Hunt #1 orchestrations, Hacker News show-HN prep, tech launch-day Twitter blitz, and press release distribution.",
      },
      {
        title: "Beta Testing & Early-User Acquisition",
        desc: "Curate vetted cohorts of developer beta testers, early feedback surveys, bug bounty incentives, and feature wishlist telemetry.",
      },
      {
        title: "Product Demos & Launch Events",
        desc: "Live interactive keynote streams, founder walkthroughs, architectural deep-dives, and real-time live audience Q&A sessions.",
      },
      {
        title: "Brand Awareness Campaigns",
        desc: "Positioning teardowns, technical whitepapers, architectural comparison charts, and engineering blog showcases.",
      },
      {
        title: "Developer & Student Outreach",
        desc: "Seed your product directly into the hands of 10,000+ computer science students, hackathon builders, and startup founders.",
      },
    ],
    deliverables: [
      "Product Hunt Launch Strategy & Hunter Support",
      "Curated 500+ Qualified Beta Tester Cohort",
      "Interactive Virtual Demo & Launch Stream",
      "Comprehensive Usability & Feedback Report",
    ],
    metrics: [
      { label: "Day-1 Signups", value: "10K+" },
      { label: "Product Hunt Rank", value: "Top 3" },
      { label: "Beta Feedback Rate", value: "89%" },
    ],
    supportedPlatforms: ["Product Hunt", "Hacker News", "GitHub", "Dev.to", "TechCrunch"],
  },
  {
    id: "devrel-programs",
    number: "05",
    category: "devrel",
    badge: "Developer Relations",
    title: "Developer Relations & Tech Programs",
    tagline: "Technology companies ko developers, students aur technical communities ke saath connect karna.",
    description:
      "Cultivate enduring technical credibility through sustainable DevRel initiatives. We build ambassador programs, author developer-first documentation, and host hands-on workshops that turn programmers into passionate evangelists.",
    icon: Terminal,
    gradient: "from-emerald-500 to-teal-600",
    bgSoft: "bg-emerald-50/70",
    borderSoft: "border-emerald-100",
    accentColor: "#10b981",
    features: [
      {
        title: "Developer Community Programs",
        desc: "DevRel strategy blueprints, contributor codes, recognition badges, champion leagues, and developer advisory councils.",
      },
      {
        title: "Technical Workshops & Bootcamps",
        desc: "Hands-on tutorials, SDK code-alongs, quickstart guides, architectural workshops, and practical problem-solving labs.",
      },
      {
        title: "Campus Ambassador Programs",
        desc: "End-to-end management of 100+ student campus leads across premier technical universities to drive grassroots platform adoption.",
      },
      {
        title: "Open-Source Initiatives",
        desc: "Curate good-first-issues, open-source sponsorship drives, Hacktoberfest sprints, and contributor recognition pipelines.",
      },
      {
        title: "Technical Challenges & Learning Programs",
        desc: "Skill verification hackathons, certification milestones, interactive gamified leaderboards, and digital badges.",
      },
    ],
    deliverables: [
      "Complete Campus Ambassador Program Playbook",
      "Monthly Developer Hands-on Workshops",
      "SDK Tutorials & Quickstart Code Repositories",
      "Contributor Recognition & Swag Dispatch Pipeline",
    ],
    metrics: [
      { label: "Campus Chapters", value: "120+" },
      { label: "Active Contributors", value: "4,500+" },
      { label: "Developer NPS", value: "78+" },
    ],
    supportedPlatforms: ["GitHub", "Stack Overflow", "Discord", "University Hubs", "Hashnode"],
  },
  {
    id: "sponsorships-partnerships",
    number: "06",
    category: "sponsorships",
    badge: "Ecosystem Alliances",
    title: "Sponsorships & Partnerships",
    tagline: "Event organizers, brands aur communities ke beech meaningful partnerships banana.",
    description:
      "Unlock high-ROI commercial and strategic alliances. We bridge event organizers with enterprise sponsors, coordinate brand visibility, and deliver transparent post-campaign performance reporting.",
    icon: HeartHandshake,
    gradient: "from-violet-500 to-purple-600",
    bgSoft: "bg-violet-50/70",
    borderSoft: "border-violet-100",
    accentColor: "#8b5cf6",
    features: [
      {
        title: "Event Sponsorship Opportunities",
        desc: "Tiered sponsor pitch decks, physical and virtual booth opportunities, sponsored keynote tracks, and logo placement rights.",
      },
      {
        title: "Brand Collaborations",
        desc: "Co-branded hackathon tracks, sponsored coding challenges, co-hosted tech webinars, and strategic co-marketing initiatives.",
      },
      {
        title: "Sponsor Outreach & Coordination",
        desc: "Targeted sponsor identification, pitch presentations, contract coordination, brand asset collection, and day-of-event support.",
      },
      {
        title: "Community Partnerships",
        desc: "Bilateral community syndications, co-host alliances, joint hackathon initiatives, and cross-chapter meetup exchanges.",
      },
      {
        title: "Campaign Performance Reporting",
        desc: "Granular ROI analytics, booth footfall data, attendee impressions, lead capture summaries, and post-event sponsor recap decks.",
      },
    ],
    deliverables: [
      "Custom Sponsorship Deck & Pricing Rate Card",
      "Targeted Sponsor Matchmaking & Outreach List",
      "Sponsor Booth & Deliverable Management",
      "Post-Event Sponsor ROI & Lead Analytics Report",
    ],
    metrics: [
      { label: "Sponsor Capital", value: "$600K+" },
      { label: "Brand Retention", value: "96%" },
      { label: "Partner Network", value: "85+ Brands" },
    ],
    supportedPlatforms: ["Enterprise CRM", "LinkedIn Outreach", "Happico Sponsor Portal", "Analytics"],
  },
];

// =============================================================================
// 📊 KEY HIGHLIGHT STATS
// =============================================================================
const STATS = [
  { value: "100K+", label: "Verified Developers & Builders", sub: "Active ecosystem reach" },
  { value: "50+", label: "Hackathons & Tech Summits", sub: "Organized with zero friction" },
  { value: "15M+", label: "Targeted Tech Impressions", sub: "Across digital campaigns" },
  { value: "98.6%", label: "Client Satisfaction & ROI", sub: "Repeat partner retention" },
];

// =============================================================================
// ⚙️ 4-STEP DELIVERY FRAMEWORK
// =============================================================================
const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Blueprint",
    desc: "We analyze your target developer personas, community baseline, and key business KPIs to build a bespoke execution roadmap.",
    icon: Compass,
  },
  {
    step: "02",
    title: "Asset & Architecture Setup",
    desc: "From Discord/Slack channels and registration portals to pitch decks and media kits, we assemble all technical and marketing assets.",
    icon: Layers,
  },
  {
    step: "03",
    title: "High-Energy Execution",
    desc: "Flawless day-to-day community operations, live event broadcasting, promotional blitzes, and real-time moderation.",
    icon: Flame,
  },
  {
    step: "04",
    title: "Analytics, ROI & Scale",
    desc: "Comprehensive post-campaign intelligence, verified lead handover, member retention loops, and continuous growth iterations.",
    icon: BarChart3,
  },
];

// =============================================================================
// ❓ FREQUENTLY ASKED QUESTIONS
// =============================================================================
const FAQS = [
  {
    q: "Kya hum koi specific ek solution le sakte hain ya bundle lena zaroori hai?",
    a: "Aap apni zaroorat ke hisaab se kisi bhi single solution (jaise sirf Hackathon Management ya sirf Community Promotion) ko select kar sakte hain, ya multiple solutions ko customize karke bundle bana sakte hain.",
  },
  {
    q: "Hackathons online aur offline dono format me organize kar sakte hain?",
    a: "Haan! Happico online virtual hackathons, physical in-person coding challenges, aur hybrid formats teeno ko end-to-end manage karta hai — including stage, AV, portals, judging, aur prizes.",
  },
  {
    q: "Product launch me relevant developers aur early users kaise laate hain?",
    a: "Hamare paas 100K+ verified developers, campus ambassador networks, aur 50+ partnered tech clubs ka direct access hai. Iske alawa targeted Product Hunt, Twitter/X tech campaigns, aur beta cohorts se high-intent builders onboard hote hain.",
  },
  {
    q: "Sponsorships laane me Happico kaise madad karta hai?",
    a: "Hum customized sponsorship pitch decks banate hain, leading tech brands aur startups ke saath matchmaking karte hain, sponsor coordination karte hain, aur post-event detailed ROI reports deliver karte hain.",
  },
  {
    q: "Project start karne ke liye process kya hota hai?",
    a: "Sabse pehle aap 'Book a Strategy Call' par click karke hamari team ke saath 15-minute ka consultation schedule karein. Hum aapke requirements samajh kar 24 hours me custom proposal aur execution timeline deliver karenge.",
  },
];

export default function SolutionsPage() {
  const cardRef = useRef(null);
  const [activeTab, setActiveTab] = useState("all");
  const [dashboardView, setDashboardView] = useState("community");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeSolutionId, setActiveSolutionId] = useState("community-building");

  const filteredSolutions =
    activeTab === "all"
      ? SOLUTIONS_DATA
      : SOLUTIONS_DATA.filter((sol) => sol.category === activeTab);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-white">
        {/* Subtle Ambient Background Glows */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[140px] opacity-25 pointer-events-none"
          style={{ backgroundColor: "var(--primary, #6366f1)" }}
        />
        <div
          className="absolute top-48 right-10 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ backgroundColor: "var(--secondary, #06b6d4)" }}
        />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm animate-fade-in">
            <Sparkles className="h-4 w-4 text-indigo-500" />
            <span>Happico End-to-End Solutions</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Supercharge Your{" "}
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--primary, #6366f1) 0%, #a855f7 50%, var(--secondary, #06b6d4) 100%)",
              }}
            >
              Developer Communities
            </span>
            , Hackathons & Product Growth
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Whether you want to build an active developer community from scratch, organize a world-class hackathon, amplify a product launch, or secure high-value brand sponsorships — Happico provides the complete blueprint and execution engine.
          </p>

          {/* Dual CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book-demo"
              className="px-7 py-3.5 rounded-xl text-sm font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 group"
              style={{
                backgroundColor: "var(--primary, #6366f1)",
                boxShadow: "0 10px 25px -5px var(--primary-glow, rgba(99, 102, 241, 0.35))",
              }}
            >
              <span>Book a Strategy Call</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#solutions-grid"
              className="px-7 py-3.5 rounded-xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 border border-slate-200 shadow-sm transition-all duration-300 flex items-center gap-2"
            >
              <span>Explore All 6 Solutions</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </a>
          </div>

          {/* Quick Pillars Fast-Jump Pills */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto">
            {SOLUTIONS_DATA.map((sol) => {
              const Icon = sol.icon;
              return (
                <a
                  key={sol.id}
                  href={`#${sol.id}`}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100/80 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 text-slate-600 border border-slate-200/60 transition-all flex items-center gap-1.5"
                >
                  <Icon className="h-3.5 w-3.5 text-slate-400" />
                  <span>{sol.title}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY STATS IMPACT BAR
          ========================================================================= */}
      <section className="py-12 border-y border-slate-100 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {STATS.map((stat, i) => (
              <div key={i} className="space-y-1">
                <div
                  className="text-3xl sm:text-4xl font-black tracking-tight"
                  style={{ color: "var(--primary, #6366f1)" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-800">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE LASER FLOW PLATFORM COMMAND CENTER (React Bits Showcase)
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            <span>Interactive Platform Engine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Unified Command Center for Every Solution
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Hover over the terminal to experience real-time WebGL laser flow illumination while toggling between active solution operations.
          </p>
        </div>

        {/* LaserFlow Container */}
        <div className="relative w-full h-[620px] sm:h-[660px] rounded-3xl overflow-hidden bg-[#070913] border border-slate-800 shadow-2xl">
          <LaserFlow
            surfaceRef={cardRef}
            beamPosition={0.5}
            color="#6366f1"
            intensity={1.9}
            flare={1.6}
            spread={1.6}
            spill={1.1}
            fog={0.25}
            dust={1.8}
            streaks={1.6}
            dots={1}
            pulse={1.5}
            speed={1.5}
            mouseInteraction={true}
            theme="dark"
          />

          {/* Interactive Card Hit by Laser Beam */}
          <div
            ref={cardRef}
            className="absolute left-3 right-3 sm:left-10 sm:right-10 md:left-16 md:right-16 lg:left-24 lg:right-24 top-[38%] sm:top-[40%] bottom-0 rounded-t-3xl border-t border-x border-indigo-500/40 bg-[#0c1022]/95 backdrop-blur-xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Window Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-mono font-bold text-slate-300 hidden sm:inline">
                  happico-engine // telemetry: active
                </span>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
                {[
                  { id: "community", label: "Community Ops", icon: Users },
                  { id: "events", label: "Hackathons", icon: Trophy },
                  { id: "growth", label: "Growth & ROI", icon: TrendingUp },
                ].map((tab) => {
                  const TabIcon = tab.icon;
                  const isSelected = dashboardView === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setDashboardView(tab.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <TabIcon className="h-3.5 w-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>99.9% Uptime</span>
              </div>
            </div>

            {/* Dynamic Content based on dashboardView */}
            <div className="py-4 sm:py-6 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 flex-1">
              {dashboardView === "community" && (
                <>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Discord / Telegram Pulse</span>
                      <Users className="h-4 w-4 text-indigo-400" />
                    </div>
                    <div className="text-2xl font-black text-white">48,250+</div>
                    <p className="text-[11px] text-slate-400">
                      Active tech members engaged in daily discussions & AMAs.
                    </p>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full w-[88%]" />
                    </div>
                    <div className="flex justify-between text-[10px] text-indigo-300 font-mono">
                      <span>Verification Velocity</span>
                      <span>88% High Retention</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Automated Moderation</span>
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-black text-emerald-400">24/7 Shield</div>
                    <p className="text-[11px] text-slate-400">
                      Custom anti-spam bots & instant onboarding welcoming 120+ builders daily.
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">Zero Spam</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">&lt; 30s Onboarding</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Multi-Channel Growth</span>
                      <Flame className="h-4 w-4 text-amber-400" />
                    </div>
                    <div className="text-2xl font-black text-amber-400">+340%</div>
                    <p className="text-[11px] text-slate-400">
                      Viral referral loops and campus lead networks driving organic velocity.
                    </p>
                    <div className="text-[10px] text-slate-300 font-mono pt-1">
                      Top Channels: WhatsApp, Discord, Telegram
                    </div>
                  </div>
                </>
              )}

              {dashboardView === "events" && (
                <>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Hackathon Submissions</span>
                      <Trophy className="h-4 w-4 text-amber-400" />
                    </div>
                    <div className="text-2xl font-black text-white">1,420 Teams</div>
                    <p className="text-[11px] text-slate-400">
                      Multi-track GitHub repositories verified with automated test rubrics.
                    </p>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full w-[76%]" />
                    </div>
                    <div className="flex justify-between text-[10px] text-amber-300 font-mono">
                      <span>Submission Rate</span>
                      <span>76% (Top Quartile)</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Stage & AV Broadcasting</span>
                      <Code2 className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div className="text-2xl font-black text-cyan-400">Happico Stage</div>
                    <p className="text-[11px] text-slate-400">
                      Multi-speaker keynote streaming, live sponsor breakout rooms & judging.
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">1080p 60fps</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">Live Q&amp;A</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Attendee Check-in</span>
                      <Zap className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-black text-emerald-400">&lt; 90 Seconds</div>
                    <p className="text-[11px] text-slate-400">
                      QR badge scanning & instant RSVP confirmation via WhatsApp and SMS alerts.
                    </p>
                    <div className="text-[10px] text-slate-300 font-mono pt-1">
                      Seamless physical & virtual hybrid check-ins.
                    </div>
                  </div>
                </>
              )}

              {dashboardView === "growth" && (
                <>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Campaign Reach</span>
                      <Megaphone className="h-4 w-4 text-rose-400" />
                    </div>
                    <div className="text-2xl font-black text-white">15.4M+</div>
                    <p className="text-[11px] text-slate-400">
                      Targeted developer impressions delivered across X, LinkedIn & Tech Hubs.
                    </p>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full w-[92%]" />
                    </div>
                    <div className="flex justify-between text-[10px] text-rose-300 font-mono">
                      <span>Conversion Boost</span>
                      <span>3.8x Above Average</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Product Hunt & Launchpad</span>
                      <Rocket className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div className="text-2xl font-black text-cyan-400">#1 Product of the Day</div>
                    <p className="text-[11px] text-slate-400">
                      Orchestrated 10K+ day-one developer registrations and vetted beta cohorts.
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">500+ Reviews</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">Hacker News Top 5</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Sponsor Capital Routed</span>
                      <HeartHandshake className="h-4 w-4 text-violet-400" />
                    </div>
                    <div className="text-2xl font-black text-violet-400">$600,000+</div>
                    <p className="text-[11px] text-slate-400">
                      Matched leading developer platforms with premier hackathons & summits.
                    </p>
                    <div className="text-[10px] text-slate-300 font-mono pt-1">
                      85+ Active Enterprise Brands
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Bottom Terminal Action Bar */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-indigo-400 font-bold">✨ Theme Engine:</span>
                <span className="text-slate-300">WebGL2 Interactive Laser Lighting</span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/book-demo"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg transition-all active:scale-95 flex items-center gap-1.5"
                  style={{
                    backgroundColor: "var(--primary, #6366f1)",
                    boxShadow: "0 4px 15px var(--primary-glow, rgba(99, 102, 241, 0.35))",
                  }}
                >
                  <span>Deploy Solutions</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href="#solutions-grid"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  Explore Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SOLUTIONS GRID & CATEGORY FILTER
          ========================================================================= */}
      <section id="solutions-grid" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
            <Layers className="h-3.5 w-3.5 text-indigo-500" />
            <span>Comprehensive Service Suite</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            6 Specialized Solutions Built for Modern Ecosystems
          </h2>

          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Every solution is engineered with battle-tested workflows, dedicated community managers, proven distribution playbooks, and transparent analytics.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Solutions" },
              { id: "community", label: "Community" },
              { id: "events", label: "Hackathons & Events" },
              { id: "promotion", label: "Promotion" },
              { id: "product", label: "Product Launch" },
              { id: "devrel", label: "DevRel Programs" },
              { id: "sponsorships", label: "Sponsorships" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Full-Fledged Detailed Solution Cards */}
        <div className="space-y-16">
          {filteredSolutions.map((sol, index) => {
            const Icon = sol.icon;
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={sol.id}
                id={sol.id}
                className="scroll-mt-28 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 lg:p-12 shadow-lg shadow-slate-100 transition-all duration-300 hover:border-slate-300 relative overflow-hidden"
              >
                {/* Decorative Soft Corner Glow */}
                <div
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none"
                  style={{ backgroundColor: sol.accentColor }}
                />

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center`}>
                  {/* Left Column: Solution Identity, Description & Deliverables */}
                  <div className={`lg:col-span-7 space-y-6 ${isReversed ? "lg:order-2" : ""}`}>
                    {/* Number & Badge */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-black px-2.5 py-1 rounded-md bg-slate-900 text-white">
                        {sol.number}
                      </span>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${sol.bgSoft} border ${sol.borderSoft}`}
                        style={{ color: sol.accentColor }}
                      >
                        {sol.badge}
                      </span>
                    </div>

                    {/* Title & Hinglish Tagline */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        {sol.title}
                      </h3>
                      <p
                        className="text-sm font-semibold mt-1.5 italic"
                        style={{ color: sol.accentColor }}
                      >
                        "{sol.tagline}"
                      </p>
                    </div>

                    {/* Full Description */}
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {sol.description}
                    </p>

                    {/* 5 Bullet Points */}
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        What's Included in this Solution:
                      </h4>
                      <div className="space-y-2.5">
                        {sol.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div
                              className="mt-1 h-4 w-4 rounded-full flex items-center justify-center shrink-0"
                              style={{ backgroundColor: `${sol.accentColor}18` }}
                            >
                              <Check
                                className="h-2.5 w-2.5 stroke-[3]"
                                style={{ color: sol.accentColor }}
                              />
                            </div>
                            <div className="text-xs sm:text-sm">
                              <span className="font-bold text-slate-800">{feat.title}: </span>
                              <span className="text-slate-600 font-normal">{feat.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Actions */}
                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/book-demo?solution=${sol.id}`}
                        className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all active:scale-95 flex items-center gap-2 group"
                        style={{ backgroundColor: "var(--primary, #6366f1)" }}
                      >
                        <span>Consult on this Solution</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <Link
                        href="/contact"
                        className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
                      >
                        Ask a Question
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Visual Bento Box with Deliverables, Metrics & Platforms */}
                  <div className={`lg:col-span-5 ${isReversed ? "lg:order-1" : ""}`}>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7 space-y-6">
                      {/* Card Header with Icon */}
                      <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
                        <div className="flex items-center gap-3">
                          <div
                            className="h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                            style={{
                              backgroundImage: `linear-gradient(135deg, ${sol.accentColor}, #0f172a)`,
                            }}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                              Solution Pillar
                            </div>
                            <div className="text-sm font-black text-slate-900">
                              {sol.badge}
                            </div>
                          </div>
                        </div>

                        <div className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 shadow-2xs">
                          {sol.number} / 06
                        </div>
                      </div>

                      {/* Deliverables List */}
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Core Deliverables:</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-600">
                          {sol.deliverables.map((item, dIdx) => (
                            <li key={dIdx} className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Impact Metrics Grid */}
                      <div className="pt-2">
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                          Proven Impact Benchmarks:
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {sol.metrics.map((metric, mIdx) => (
                            <div
                              key={mIdx}
                              className="rounded-xl bg-white p-2.5 text-center border border-slate-200 shadow-2xs"
                            >
                              <div
                                className="text-base sm:text-lg font-black tracking-tight"
                                style={{ color: sol.accentColor }}
                              >
                                {metric.value}
                              </div>
                              <div className="text-[10px] font-semibold text-slate-500 leading-tight mt-0.5">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Ecosystem / Supported Platforms */}
                      <div className="pt-2 border-t border-slate-200/80">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Supported Ecosystems & Channels:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {sol.supportedPlatforms.map((plat, pIdx) => (
                            <span
                              key={pIdx}
                              className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700"
                            >
                              {plat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          THE HAPPICO 4-STEP DELIVERY FRAMEWORK
          ========================================================================= */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50/80 border-t border-slate-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-indigo-600 border border-indigo-100 shadow-xs">
              <Zap className="h-3.5 w-3.5 text-indigo-500" />
              <span>How We Execute</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              The Happico 4-Stage Execution Engine
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              From the first discovery brainstorm to post-event ROI audits, here is how our specialized community and event squad delivers guaranteed results.
            </p>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-2xl font-black tracking-tight"
                        style={{ color: "var(--primary, #6366f1)" }}
                      >
                        {step.step}
                      </span>
                      <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                        <StepIcon className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-slate-400">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Milestone Verified</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE FAQS SECTION
          ========================================================================= */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
            <HelpCircle className="h-3.5 w-3.5 text-indigo-500" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Solutions aur execution model ke baare me commonly pooche jaane wale sawaal aur unke jawab.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = expandedFaq === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : i)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-indigo-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          BOTTOM HIGH-CONVERTING CTA BANNER
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-20">
        <div
          className="rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #090d16 0%, #111827 50%, #1e1b4b 100%)",
          }}
        >
          {/* Ambient Glow */}
          <div
            className="absolute -top-24 right-0 h-64 w-64 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ backgroundColor: "var(--primary, #6366f1)" }}
          />

          <div className="relative z-10 space-y-5 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-indigo-300 border border-white/15">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Let's Build Something Extraordinary</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Ready to Scale Your Community or Launch Your Next Big Event?
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Schedule a 15-minute strategy call with our community architects and event specialists. We'll build a tailored proposal within 24 hours.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/book-demo"
                className="px-7 py-3.5 rounded-xl text-sm font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 flex items-center gap-2 group"
                style={{
                  backgroundColor: "var(--primary, #6366f1)",
                  boxShadow: "0 8px 25px -4px var(--primary-glow, rgba(99, 102, 241, 0.4))",
                }}
              >
                <span>Book a Strategy Call</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20"
              >
                Contact Solutions Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
