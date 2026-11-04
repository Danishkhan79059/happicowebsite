"use client";

import { useState } from "react";
import Link from "next/link";
import PixelCard from "@/components/PixelCard";
import RotatingText from "@/components/RotatingText";
import {
  Check,
  X,
  Zap,
  Sparkles,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Building2,
  Users2,
  Rocket,
  ShieldCheck,
  Globe2,
  HeartHandshake,
  Calendar,
  Layers,
  Code2,
  Video,
  Trophy,
  MessageSquare,
  Award,
  ExternalLink,
} from "lucide-react";

// Top Pricing Plans Data from Buzzoraa
const PLANS = [
  {
    id: "individuals-startups",
    name: "Buzzoraa Starter",
    badge: "For Founders & Startups",
    tagline: "Turn conversations into growth at an accelerated pace.",
    description:
      "Drive social engagement, community activation, and content amplification with unlimited reach.",
    priceMonthly: 0,
    priceAnnual: 0,
    originalMonthly: 0,
    originalAnnual: 0,
    discountBadge: "Save 20%",
    priceSubtitle: "per workspace/month billed",
    keyFeatures: [
      "Social Conversation Telemetry",
      "Buzzoraa Multi-Channel Streaming",
      "Community Activation Sprints",
      "Content Amplification Engine",
      "Custom GTM Landing Builder",
      "Social Channels & Advocate Forums",
      "Paid Monetization & Ticketing**",
      "Survey Forms & Feedback Collection",
    ],
    ctaText: "Buy Now",
    ctaLink: "/book-demo",
    popular: false,
    pixelColors: ["#f8fafc", "#f1f5f9", "#cbd5e1"],
    pixelGlow: "#cbd5e1",
  },
  {
    id: "enterprises",
    name: "Buzzoraa for Growth & Brands",
    badge: "Most Popular • Multi-Brand",
    tagline: "Create unified social engagement with a branded organization hub.",
    description:
      "Accelerate GTM pipeline with deep conversation analytics, advocate activation, and dedicated management.",
    priceMonthly: 0,
    priceAnnual: 0,
    originalMonthly: 0,
    originalAnnual: 0,
    discountBadge: "Save 10%",
    priceSubtitle: "per workspace/month billed",
    keyFeatures: [
      "Branded Organization Hub",
      "Minimum 5 community hubs included",
      "Conversation Analytics Across Networks",
      "Unlimited Community Organizers",
      "Automated Advocate Newsletters & Forums",
      "Key Account Manager - Buzzoraa Specialist",
      "Custom GTM Insights Dashboard*",
      "Advanced Page Builder & API Access",
    ],
    ctaText: "Buy Now",
    ctaLink: "/book-demo",
    popular: true,
    pixelColors: ["#e0e7ff", "#a5b4fc", "#818cf8", "#6366f1"],
    pixelGlow: "#6366f1",
  },
  {
    id: "devrel-agencies",
    name: "Buzzoraa for Enterprise Ecosystems",
    badge: "For Agency & Enterprise Partners",
    tagline: "Manage social engagement and GTM programs for your clients & brand.",
    description:
      "Buzzoraa is your platform engine to turn conversations into growth across client hubs.",
    priceMonthly: null,
    priceAnnual: null,
    isCustom: true,
    customPriceText: "Let's Talk",
    priceSubtitle: "Contact us for best pricing",
    keyFeatures: [
      "Branded Enterprise Hubs",
      "Custom Reporting For Each Client",
      "Key Account Manager - Buzzoraa Specialist",
      "Customized GTM Platform Engine",
      "Unlimited Admin Team & Organizers",
      "Unlimited Members Across Client Hubs",
      "Exclusive Access To Emerging AI Features",
      "Buzzoraa Content Amplification Credits",
    ],
    ctaText: "Get Onboarded",
    ctaLink: "/contact",
    trialText: "Custom Onboarding Session",
    popular: false,
    pixelColors: ["#ecfeff", "#a5f3fc", "#38bdf8", "#06b6d4"],
    pixelGlow: "#06b6d4",
  },
];

// Detailed Feature Comparison Matrix Data
const COMPARISON_CATEGORIES = [
  {
    title: "Organization",
    icon: Building2,
    features: [
      {
        name: "Public Organization Page",
        individuals: false,
        enterprise: true,
        agency: true,
      },
      {
        name: "Admin Team",
        individuals: false,
        enterprise: "Unlimited Admins",
        agency: "Unlimited Admins",
      },
      {
        name: "Admin Dashboard",
        individuals: false,
        enterprise: true,
        agency: true,
      },
      {
        name: "Organization Wide Newsletters",
        individuals: false,
        enterprise: true,
        agency: true,
      },
      {
        name: "Organization Wide Survey Forms",
        individuals: false,
        enterprise: true,
        agency: true,
      },
      {
        name: "Data Export",
        individuals: false,
        enterprise: true,
        agency: true,
      },
      {
        name: "Custom Dashboards",
        individuals: false,
        enterprise: true,
        agency: true,
      },
      {
        name: "API Access",
        individuals: false,
        enterprise: true,
        agency: true,
      },
      {
        name: "Key Account Manager",
        individuals: false,
        enterprise: true,
        agency: true,
      },
      {
        name: "Buzzoraa Expert Consultations",
        individuals: false,
        enterprise: true,
        agency: true,
      },
    ],
  },
  {
    title: "Community",
    icon: Users2,
    features: [
      { name: "Events", individuals: true, enterprise: true, agency: true },
      { name: "Dashboard", individuals: true, enterprise: true, agency: true },
      { name: "Hackathons", individuals: true, enterprise: true, agency: true },
      { name: "Channels", individuals: true, enterprise: true, agency: true },
      { name: "Forums", individuals: true, enterprise: true, agency: true },
      { name: "Newsletters", individuals: true, enterprise: true, agency: true },
      {
        name: "Custom Page Builder",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Admin Team",
        individuals: "Unlimited",
        enterprise: "Unlimited",
        agency: "Unlimited",
      },
      {
        name: "Member Activity Dashboard",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Emails",
        individuals: "Unlimited",
        enterprise: "Unlimited",
        agency: "Unlimited",
      },
      { name: "Analytics", individuals: true, enterprise: true, agency: true },
    ],
  },
  {
    title: "Events",
    icon: Calendar,
    features: [
      {
        name: "Smart Shortlisting",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "QR Code Entry Passes",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Event Attendance (QR Scanner)",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Buzzoraa Stage with Multi-Streaming",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Paid Ticketing (India Only)",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Free Ticketing",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Custom Emails With Filters",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Post Event Networking",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Calendar Invite",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      { name: "Live Polls", individuals: true, enterprise: true, agency: true },
      { name: "QnA", individuals: true, enterprise: true, agency: true },
      {
        name: "Registration Forms",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Call for Speaker Forms",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Feedback Forms",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Community Collaborations",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      { name: "Sponsors", individuals: true, enterprise: true, agency: true },
      {
        name: "Volunteer Team",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Event Update Posts",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Speaker Slides Upload & Display",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      { name: "Analytics", individuals: true, enterprise: true, agency: true },
    ],
  },
  {
    title: "Buzzoraa Stage",
    icon: Video,
    features: [
      {
        name: "Live Online Event",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      { name: "iFrame Embed", individuals: true, enterprise: true, agency: true },
      {
        name: "External Platform Link",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "YouTube Streaming",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Auto Attendance",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Attended Members' Stats",
        individuals: true,
        enterprise: true,
        agency: true,
      },
    ],
  },
  {
    title: "Hackathons",
    icon: Trophy,
    features: [
      {
        name: "Application Management",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Communication Channels",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      { name: "Emails", individuals: true, enterprise: true, agency: true },
      {
        name: "Multiple Tracks",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Multiple Rounds",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Registration Forms",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Public Project Display",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Multiple Prizes",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Judges, Speakers & Mentors",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      { name: "FAQ's", individuals: true, enterprise: true, agency: true },
    ],
  },
  {
    title: "Channels",
    icon: MessageSquare,
    features: [
      {
        name: "Public Channel",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Announcement (Readonly) Channel",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Private Channel",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Channel Admins",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Search Engine Discoverable Content",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Send Emails To Members",
        individuals: true,
        enterprise: true,
        agency: true,
      },
    ],
  },
  {
    title: "Forums",
    icon: Layers,
    features: [
      { name: "Public Forum", individuals: true, enterprise: true, agency: true },
      {
        name: "Announcement (Readonly) Forum",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Private Forum",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Grouped Topics",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Channel Admins",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Search Engine Discoverable Content",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Send Emails To Members",
        individuals: true,
        enterprise: true,
        agency: true,
      },
    ],
  },
  {
    title: "Developer Profiles",
    icon: Award,
    features: [
      {
        name: "Community Activity Showcase",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      { name: "Badges", individuals: true, enterprise: true, agency: true },
      {
        name: "Verified Expert Blue Tick",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Work Experience",
        individuals: true,
        enterprise: true,
        agency: true,
      },
      {
        name: "Content Sharing (external links)",
        individuals: true,
        enterprise: true,
        agency: true,
      },
    ],
  },
];

// Featured Communities Already On Buzzoraa
const COMMUNITIES = [
  {
    name: "Google Developer Groups",
    category: "Developer Ecosystem",
    description:
      "GDG New Delhi, Noida, Cloud, Siliguri and many more active communities from Google Developers.",
  },
  {
    name: "Women Who Code Delhi",
    category: "Diversity & Inclusion",
    description:
      "WWC Delhi is one of the largest and most active communities of engineers inspiring women in technology.",
  },
  {
    name: "Microsoft Learn Student Ambassadors",
    category: "Campus & Ambassadorship",
    description:
      "From Student Partner Communities to Ambassador and MVP communities, a flourishing developer hub.",
  },
  {
    name: "Tensor Flow User Groups",
    category: "AI / Machine Learning",
    description:
      "The most active machine learning and AI practitioners communities in the world.",
  },
  {
    name: "Robotex India",
    category: "Robotics & Hardware",
    description:
      "One of the largest robotics communities empowering young students to build unique solutions.",
  },
  {
    name: "IEEE",
    category: "Global Engineering",
    description:
      "The largest communities of engineers and technology researchers across the globe.",
  },
];

// Complete 10 Buzzoraa FAQs with exact verified answers
const FAQS = [
  {
    q: "Do I need to purchase any other platform when I setup on Buzzoraa?",
    a: "We don't think so, brands and communities on Buzzoraa are able to manage all their activities here. From social engagement and community activation to content amplification and conversation-led GTM funnels, everything is integrated into one unified workspace.",
  },
  {
    q: "How many communities or brand hubs can I host on Buzzoraa?",
    a: "You can host your complete brand ecosystem with multiple hubs and chapters on Buzzoraa. You have access to all the conversation telemetry, member analytics, and GTM data you need to govern and scale smoothly.",
  },
  {
    q: "How does Buzzoraa turn conversations into growth?",
    a: "Buzzoraa unites social engagement, community activation, and content amplification. By tracking high-intent conversations across social networks and activating advocates, it converts audience interactions into qualified pipeline and revenue.",
  },
  {
    q: "I want to display activities from Buzzoraa on my website, is it possible?",
    a: "Yes! From Growth plan and upwards you get access to our APIs and embed widgets which can be used to display summary of your activities on your own web page seamlessly.",
  },
  {
    q: "Will you help me migrate from other platforms?",
    a: "Yes! And it's very easy. Our support and onboarding team assists you step-by-step in importing your members, historical events, and community data without downtime.",
  },
  {
    q: "I lead a startup or community, is Buzzoraa right for me?",
    a: "Absolutely! Buzzoraa is built specifically for brands, startups, founders, and communities who want to build meaningful connections, amplify their presence, and grow through conversations.",
  },
  {
    q: "Does Buzzoraa support paid ticketing and community monetization?",
    a: "Yes, Buzzoraa supports paid tickets, paid community tiers, and sponsorships with full analytics.",
  },
  {
    q: "What are the charges for payments received through payment gateway on Buzzoraa?",
    a: "For every ticket or membership sale, the payment gateway charges a standard fee per transaction and there is a transparent platform fee charged by Buzzoraa. Transparent breakdown is provided directly in your billing reports.",
  },
  {
    q: "Will I get access to new features which are rolled out after I pay for my subscription?",
    a: "Yes, unless it's an enterprise custom module, it will be a part of your existing subscription, and we will notify you in advance whenever new enhancements launch.",
  },
  {
    q: "Is Buzzoraa the right platform for my global audience and members?",
    a: "Yes, our users extend across the world. With support for global time zones, multi-track streams, and worldwide email deliverability, international communities thrive here.",
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState(0); // first FAQ open by default
  const [expandedCategory, setExpandedCategory] = useState(null); // optional category filter

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const renderCellContent = (val) => {
    if (typeof val === "boolean") {
      return val ? (
        <span
          className="inline-flex h-6 w-6 items-center justify-center rounded-full"
          style={{
            backgroundColor: "var(--primary-light)",
            color: "var(--primary)",
          }}
        >
          <Check className="h-4 w-4 stroke-[3]" />
        </span>
      ) : (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <X className="h-4 w-4 stroke-[2.5]" />
        </span>
      );
    }
    return (
      <span className="text-xs sm:text-sm font-semibold text-slate-800">
        {val}
      </span>
    );
  };

  return (
    <div className="bg-slate-50/60 min-h-screen text-slate-900 pb-24">
      {/* =========================================================================
          HERO SECTION (Header + Billing Toggle)
          ========================================================================= */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border-b border-slate-200/80">
        {/* Ambient Theme Background Blobs */}
        <div
          className="absolute -top-20 -left-20 h-96 w-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: "var(--secondary)" }}
        />
        <div
          className="absolute -top-32 right-1/4 h-96 w-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: "var(--primary)" }}
        />

        <div className="relative mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white/90 backdrop-blur-xs text-xs font-bold text-slate-700 shadow-2xs">
            <Zap className="h-4 w-4 text-amber-500 fill-amber-400" />
            <span>Community Platform Subscriptions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <span>Select a plan for your</span>
            <RotatingText
              texts={["Community", "Events", "Startups", "Ecosystem"]}
              effect="slide"
              direction="up"
              highlight={true}
              highlightColor="#6366f1"
              staggerFrom="last"
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              mainClassName="px-3 sm:px-4 py-0.5 sm:py-1 rounded-2xl shadow-xl shadow-indigo-500/25 inline-flex align-baseline text-white"
              rotationInterval={2400}
            />
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Increase your DevRel's efficiency by{" "}
            <span className="font-bold text-slate-900">10x</span> and your
            engagements by{" "}
            <span className="font-bold text-slate-900">100x</span>.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm gap-2">
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${!isAnnual
                  ? "text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
                style={
                  !isAnnual
                    ? {
                      backgroundColor: "var(--primary)",
                      boxShadow: "0 4px 12px var(--primary-glow)",
                    }
                    : {}
                }
              >
                Monthly
              </button>

              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${isAnnual
                  ? "text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
                style={
                  isAnnual
                    ? {
                      backgroundColor: "var(--primary)",
                      boxShadow: "0 4px 12px var(--primary-glow)",
                    }
                    : {}
                }
              >
                <span>Annual</span>
                <span className="text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shadow-2xs">
                  Save Up to 20%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRICING CARDS SECTION (3 TIERS)
          ========================================================================= */}
      <section className="relative mt-6 sm:mt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan, pIdx) => {
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;
            const originalPrice = isAnnual
              ? plan.originalAnnual
              : plan.originalMonthly;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col transition-all duration-300 ${plan.popular
                  ? "scale-[1.02] lg:-translate-y-2 z-20" : "hover:-translate-y-1 z-10"
                  }`}
              >
                {/* Most Popular Ribbon - placed outside PixelCard so overflow:hidden does not clip it */}
                {plan.popular && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-black text-white shadow-xl flex items-center gap-1.5 uppercase tracking-wide z-30"
                    style={{
                      backgroundColor: "var(--primary)",
                      boxShadow: "0 6px 20px var(--primary-glow)",
                    }}
                  >
                    <Sparkles className="h-3.5 w-3.5 fill-white" />
                    <span>Recommended for Growth</span>
                  </div>
                )}

                <PixelCard
                  colors={plan.pixelColors || ["#f8fafc", "#f1f5f9", "#cbd5e1"]}
                  glowColor={plan.pixelGlow || "#cbd5e1"}
                  shape="square"
                  origin="center"
                  gap={5}
                  pixelSize={2}
                  speed={35}
                  revealDuration={600}
                  spotlight={0.5}
                  glow={0.5}
                  opacity={0.35}
                  fade={0.7}
                  trigger="hover"
                  radius={24}
                  clickPulse
                  intro
                  introDelay={pIdx * 120}
                  theme="dark"
                  className={`w-full h-full flex flex-col justify-between ${plan.popular
                    ? "ring-2 ring-indigo-500/50 shadow-2xl shadow-indigo-500/20"
                    : "shadow-xl"
                    }`}
                  style={{
                    width: "100%",
                    minHeight: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="p-7 sm:p-9 flex flex-col justify-between h-full w-full">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                          style={{
                            backgroundColor: plan.popular
                              ? "rgba(99, 102, 241, 0.25)"
                              : "rgba(255, 255, 255, 0.08)",
                            color: plan.popular ? "#c7d2fe" : "#cbd5e1",
                            border: plan.popular
                              ? "1px solid rgba(99, 102, 241, 0.35)"
                              : "1px solid rgba(255, 255, 255, 0.12)",
                          }}
                        >
                          {plan.badge}
                        </span>
                        {isAnnual && plan.discountBadge && (
                          <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {plan.discountBadge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 tracking-tight">
                        {plan.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium leading-relaxed">
                        {plan.description}
                      </p>

                      {/* Pricing Display */}
                      <div className="mt-6 pt-6 border-t border-white/10">
                        {plan.isCustom ? (
                          <div className="space-y-1">
                            <div className="text-4xl sm:text-5xl font-black text-white">
                              {plan.customPriceText}
                            </div>
                            <p className="text-xs text-slate-400 font-medium">
                              {plan.priceSubtitle}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-4xl sm:text-5xl font-black text-white">
                                ${price}
                                <span className="text-2xl font-bold text-slate-400">
                                  .00
                                </span>
                              </span>
                              {isAnnual && originalPrice > price && (
                                <span className="text-base text-slate-500 line-through font-semibold">
                                  ${originalPrice}.00
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 font-medium mt-1">
                              {plan.priceSubtitle} {isAnnual ? "annually" : "monthly"}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Key Features List */}
                      <div className="mt-8 pt-6 border-t border-white/10 space-y-3.5">
                        <div className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <span>Key Features</span>
                        </div>

                        <div className="space-y-3">
                          {plan.keyFeatures.map((feat, fIdx) => (
                            <div
                              key={fIdx}
                              className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-medium leading-snug"
                            >
                              <span
                                className="h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                                style={{
                                  backgroundColor: plan.popular
                                    ? "rgba(99, 102, 241, 0.3)"
                                    : "rgba(255, 255, 255, 0.1)",
                                  color: plan.popular ? "#c7d2fe" : "#f1f5f9",
                                }}
                              >
                                <Check className="h-3.5 w-3.5 stroke-[3]" />
                              </span>
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions & Trial */}
                    <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                      <Link
                        href={plan.ctaLink}
                        className={`flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-xl text-sm font-bold transition-all shadow-md active:scale-98 ${plan.popular
                          ? "text-white hover:brightness-110 shadow-indigo-500/40"
                          : "bg-white text-slate-900 hover:bg-slate-100 shadow-white/10"
                          }`}
                        style={
                          plan.popular
                            ? {
                              backgroundColor: "var(--primary)",
                              boxShadow: "0 6px 20px var(--primary-glow)",
                            }
                            : {}
                        }
                      >
                        <span>{plan.ctaText}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>

                      <div className="text-center">
                        <Link
                          href={plan.ctaLink}
                          className="text-xs font-semibold text-slate-400 hover:text-white underline underline-offset-4 decoration-slate-600 hover:decoration-slate-300 transition-colors"
                        >
                          {plan.trialText}
                        </Link>
                      </div>
                    </div>
                  </div>
                </PixelCard>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          QUOTE BANNER (Buzzoraa Platform)
          ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-50/70 via-white to-cyan-50/70 border border-slate-200/80 shadow-sm">
          <div
            className="absolute top-4 left-6 text-5xl font-serif select-none opacity-20"
            style={{ color: "var(--primary)" }}
          >
            “
          </div>
          <p className="text-base sm:text-xl font-medium text-slate-800 italic leading-relaxed max-w-3xl mx-auto">
            "Developers want to engage with other developers, brands and their
            awesome product teams, they don't want to just be an outlet to
            marketing efforts. Communities need to be built with a lot of
            passion and care."
          </p>
          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--primary)" }}
            />
            <span>Community-First Philosophy</span>
          </div>
        </div>
      </section>



    </div>
  );
}
