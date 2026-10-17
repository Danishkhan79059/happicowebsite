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

// Top Pricing Plans Data from HappioCo
const PLANS = [
  {
    id: "individuals-startups",
    name: "For Individuals & Startups",
    badge: "Independent & Early-Stage",
    tagline: "Build and grow your developer communities at an accelerated pace.",
    description:
      "Drive events, hackathons, newsletters and more with unlimited members.",
    priceMonthly: 149,
    priceAnnual: 119,
    originalMonthly: 149,
    originalAnnual: 149,
    discountBadge: "Save 20%",
    priceSubtitle: "per community/month billed",
    keyFeatures: [
      "Online & Offline Events",
      "HappioCo Stage with YouTube Streaming",
      "Hackathons with Multi-tracks",
      "Community Newsletters",
      "Custom Page Builder",
      "Community Channels & Forums",
      "Paid Ticketing for Events**",
      "Survey Forms & Feedback Collection",
    ],
    ctaText: "Buy Now",
    ctaLink: "/book-demo",
    trialText: "Start 7-Day Free Trial",
    popular: false,
    pixelColors: ["#f8fafc", "#f1f5f9", "#cbd5e1"],
    pixelGlow: "#cbd5e1",
  },
  {
    id: "enterprises",
    name: "HappioCo for Enterprises",
    badge: "Most Popular • Multi-Community",
    tagline: "Create a hub of communities with a branded organization hub.",
    description:
      "Drive multiple developer programs with deep analytics and dedicated management.",
    priceMonthly: 199,
    priceAnnual: 179,
    originalMonthly: 199,
    originalAnnual: 199,
    discountBadge: "Save 10%",
    priceSubtitle: "per community/month billed",
    keyFeatures: [
      "Branded Organization Hub",
      "Minimum 5 communities included",
      "Member Analytics Across Organization",
      "Unlimited Community Organizers",
      "Organization Newsletters, Channels & Forums",
      "Key Account Manager - HappioCo Specialist",
      "Custom Insights Dashboard*",
      "Advanced Page Builder & API Access",
    ],
    ctaText: "Buy Now",
    ctaLink: "/book-demo",
    trialText: "Start 7-Day Free Trial",
    popular: true,
    pixelColors: ["#e0e7ff", "#a5b4fc", "#818cf8", "#6366f1"],
    pixelGlow: "#6366f1",
  },
  {
    id: "devrel-agencies",
    name: "HappioCo for DevRel Agencies",
    badge: "For Agency Partners",
    tagline: "Manage developer programs for your clients & build their brand.",
    description:
      "HappioCo is your platform engine to boost engagements across client hubs.",
    priceMonthly: null,
    priceAnnual: null,
    isCustom: true,
    customPriceText: "Let's Talk",
    priceSubtitle: "Contact us for best pricing",
    keyFeatures: [
      "Branded Organization Hubs",
      "Custom Reporting For Each Client",
      "Key Account Manager - HappioCo Specialist",
      "Customized Platform Engine",
      "Unlimited Admin Team & Organizers",
      "Unlimited Members Across Client Hubs",
      "Exclusive Access To Emerging Features",
      "HappioCo Newsletter & Ad Slot Credits",
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
        name: "HappioCo Expert Consultations",
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
        name: "HappioCo Stage with YouTube Streaming",
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
    title: "HappioCo Stage",
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

// Featured Communities Already On HappioCo
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

// Complete 10 HappioCo FAQs with exact verified answers
const FAQS = [
  {
    q: "Do I need to purchase any other platform when I setup a Community on HappioCo?",
    a: "We don't think so, the Developer Communities on HappioCo are able to manage all their activities here. From event ticketing and online stages to forums and hackathons, everything is integrated into one unified workspace.",
  },
  {
    q: "How many Communities can I host on HappioCo?",
    a: "You can host your complete Developer Ecosystem with 100's of Communities on HappioCo. We have an organization page too. You have access to all the data and stats you need to govern and scale multiple chapters smoothly.",
  },
  {
    q: "I'm looking to build a career in DevRel, how can HappioCo be useful in that?",
    a: "As a DevRel, it's important to have an experience of building and growing your own Developer Community. Some folks are at leading DevRel positions who started by building their own Community here.",
  },
  {
    q: "I want to display activities from HappioCo on my website, is it possible?",
    a: "Yes! From Startup plan and upwards you get access to our API's which can be used to display summary of your communities' activities on your own web page seamlessly.",
  },
  {
    q: "Will you help me migrate from other platforms?",
    a: "Yes! And it's very easy. Our support and onboarding team assists you step-by-step in importing your members, historical events, and community data without downtime.",
  },
  {
    q: "I lead a Design Community, is HappioCo for me?",
    a: "Absolutely, a few Design Communities are already using HappioCo. The event tools, attendee management, portfolios, and engagement workflows work seamlessly for creative and design groups.",
  },
  {
    q: "Does HappioCo support paid ticketing for my community events?",
    a: "Yes, HappioCo supports paid tickets in events. Community organizers can access this feature from their community admin dashboard with full ticketing analytics.",
  },
  {
    q: "What are the charges for payments received through payment gateway on HappioCo?",
    a: "For every ticket sale, the payment gateway charges a fee per transaction and there is a platform fee charged by HappioCo. Transparent breakdown is provided directly in your billing reports.",
  },
  {
    q: "Will I get access to new features which are rolled out after I pay for my subscription?",
    a: "Yes, unless it's a premium feature, it will be a part of your existing subscription, we will notify you in advance whenever new enhancements launch.",
  },
  {
    q: "Is HappioCo the right platform for my global community members?",
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
              texts={["Community", "Events", "Hackathons", "Startups", "Ecosystem"]}
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
          QUOTE BANNER (From HappioCo)
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

      {/* =========================================================================
          DETAILED COMPARISON TABLE ("Discover the Plan That's Right for You")
          ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700">
            <Layers className="h-3.5 w-3.5 text-indigo-500" />
            <span>Full Feature Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Discover the Plan That's Right for You
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Here are all the amazing features included in our plans
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          {/* Table Header (Sticky / Top) */}
          <div className="grid grid-cols-12 bg-slate-900 text-white p-5 sm:p-6 items-center border-b border-slate-800">
            <div className="col-span-5 sm:col-span-4 font-bold text-sm sm:text-base text-slate-300">
              Features by Category
            </div>
            <div className="col-span-7 sm:col-span-8 grid grid-cols-3 text-center gap-2">
              <div className="space-y-1">
                <div className="text-xs sm:text-sm font-extrabold text-white">
                  Individuals & Startups
                </div>
                <div className="text-xs text-indigo-200 font-medium hidden sm:block">
                  ${isAnnual ? "119" : "149"}/mo
                </div>
                <Link
                  href="/book-demo"
                  className="inline-block mt-1 text-[11px] font-bold px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Start Now
                </Link>
              </div>

              <div className="space-y-1 relative">
                <div
                  className="text-xs sm:text-sm font-extrabold"
                  style={{ color: "var(--secondary)" }}
                >
                  Enterprises
                </div>
                <div className="text-xs text-cyan-200 font-medium hidden sm:block">
                  ${isAnnual ? "179" : "199"}/mo
                </div>
                <Link
                  href="/book-demo"
                  className="inline-block mt-1 text-[11px] font-bold px-3 py-1 rounded-lg text-white shadow-sm transition-all"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  Start Now
                </Link>
              </div>

              <div className="space-y-1">
                <div className="text-xs sm:text-sm font-extrabold text-white">
                  DevRel Agencies
                </div>
                <div className="text-xs text-slate-400 font-medium hidden sm:block">
                  Custom
                </div>
                <Link
                  href="/contact"
                  className="inline-block mt-1 text-[11px] font-bold px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Get Onboarded
                </Link>
              </div>
            </div>
          </div>

          {/* Table Body by Categories */}
          <div className="divide-y divide-slate-100">
            {COMPARISON_CATEGORIES.map((category, catIdx) => {
              const IconComponent = category.icon;
              return (
                <div key={catIdx} className="overflow-x-auto">
                  {/* Category Title Row */}
                  <div className="bg-slate-50/80 px-6 py-4 flex items-center gap-2.5 border-t border-b border-slate-200/70">
                    <span
                      className="p-1.5 rounded-lg"
                      style={{
                        backgroundColor: "var(--primary-light)",
                        color: "var(--primary)",
                      }}
                    >
                      <IconComponent className="h-4 w-4" />
                    </span>
                    <h3 className="text-sm font-black text-slate-900 tracking-wide uppercase">
                      {category.title}
                    </h3>
                  </div>

                  {/* Feature Rows */}
                  <div className="divide-y divide-slate-100">
                    {category.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="grid grid-cols-12 px-6 py-3.5 items-center hover:bg-slate-50/50 transition-colors text-xs sm:text-sm"
                      >
                        <div className="col-span-5 sm:col-span-4 font-medium text-slate-700 pr-2">
                          {feat.name}
                        </div>
                        <div className="col-span-7 sm:col-span-8 grid grid-cols-3 text-center items-center">
                          <div className="flex justify-center">
                            {renderCellContent(feat.individuals)}
                          </div>
                          <div className="flex justify-center bg-indigo-50/20 py-1.5 rounded-lg">
                            {renderCellContent(feat.enterprise)}
                          </div>
                          <div className="flex justify-center">
                            {renderCellContent(feat.agency)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Table Footer Bottom Action Row */}
          <div className="grid grid-cols-12 bg-slate-50 px-6 py-6 border-t border-slate-200 items-center">
            <div className="col-span-5 sm:col-span-4 font-bold text-sm sm:text-base text-slate-800">
              Choose a Plan
            </div>
            <div className="col-span-7 sm:col-span-8 grid grid-cols-3 text-center gap-3">
              <Link
                href="/book-demo"
                className="py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs"
              >
                Start Now
              </Link>
              <Link
                href="/book-demo"
                className="py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold text-white transition-all shadow-md active:scale-95"
                style={{
                  backgroundColor: "var(--primary)",
                  boxShadow: "0 4px 14px var(--primary-glow)",
                }}
              >
                Start Now
              </Link>
              <Link
                href="/contact"
                className="py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs"
              >
                Get Onboarded
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          NON-PROFIT COMMUNITIES CARD (From HappioCo)
          ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-indigo-200/80 bg-gradient-to-br from-white via-indigo-50/40 to-slate-100 p-8 sm:p-12 shadow-xl">
          {/* Ambient Glow */}
          <div
            className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: "var(--primary)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
                <HeartHandshake className="h-4 w-4" />
                <span>Non-Profit & Student Initiatives</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                  HappioCo for Non-profit Communities
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                  Get a dedicated community space for all your members, their
                  content, profiles & multiple engagement options to share
                  knowledge and build recognition.
                </p>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-4">
                  For The Tech Community Leaders:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    "Community and events dashboard",
                    "Member management",
                    "Community & Event Analytics",
                    "Community newsletters",
                    "Generative member growth",
                    "Channels and forums",
                    "Online & Offline events with smart shortlisting",
                    "Networking with experts and community leaders",
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium"
                    >
                      <span
                        className="h-4 w-4 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: "var(--primary-light)",
                          color: "var(--primary)",
                        }}
                      >
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/book-demo"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all active:scale-95"
                  style={{
                    backgroundColor: "var(--primary)",
                    boxShadow: "0 8px 24px var(--primary-glow)",
                  }}
                >
                  <span>Apply Now</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Graphic Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl bg-white border border-slate-200 p-6 shadow-md text-center space-y-4">
                <div
                  className="h-16 w-16 mx-auto rounded-2xl flex items-center justify-center shadow-inner"
                  style={{
                    backgroundColor: "var(--primary-light)",
                    color: "var(--primary)",
                  }}
                >
                  <Rocket className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-slate-900">
                    Empowering Tech Leaders
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Free and subsidized community infrastructure for student
                    clubs, open-source maintainers, and grassroots developer
                    networks worldwide.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-600">
                  ⚡ Over 500+ student and grassroots chapters powered
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          COMMUNITIES ALREADY ON HappioCo (Social Proof & Interaction Avenues)
          ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            More avenues to interact with Developers on HappioCo
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto">
            Sponsor badges, sessions, run content campaigns with labs & builds,
            get a sponsored slot in our sponsored emailers through community
            organizers.
          </p>
          <div className="pt-4">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
              Communities Already on HappioCo
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMMUNITIES.map((comm, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <span
                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-3"
                  style={{
                    backgroundColor: "var(--primary-light)",
                    color: "var(--primary)",
                  }}
                >
                  {comm.category}
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  {comm.name}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {comm.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
                <Globe2 className="h-3.5 w-3.5" />
                <span>Verified Ecosystem Chapter</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          FAQS ACCORDION SECTION (All 10 Questions from HappioCo)
          ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700">
            <HelpCircle className="h-3.5 w-3.5 text-amber-500" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Everything you need to know about setting up, billing, and scaling
            your community platform.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 pr-2">
                    {faq.q}
                  </span>
                  <span
                    className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen
                      ? "rotate-180 bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600"
                      }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CTA BANNER
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-8">
        <div
          className="rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #090d16 0%, #111827 50%, #1e1b4b 100%)",
          }}
        >
          <div
            className="absolute -top-24 right-0 h-64 w-64 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ backgroundColor: "var(--primary)" }}
          />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Ready to Accelerate Your Developer Community?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Join leading global developer chapters and scale your events,
              hackathons, and ecosystem in minutes.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/book-demo"
                className="px-6 py-3 rounded-xl text-sm font-bold text-white shadow-lg transition-all active:scale-95"
                style={{
                  backgroundColor: "var(--primary)",
                  boxShadow: "0 6px 20px var(--primary-glow)",
                }}
              >
                Start 7-Day Free Trial
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
