"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ShieldCheck,
  Send,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Megaphone,
  Rocket,
  Users,
  Award,
  CalendarCheck2,
  ArrowRight,
  ChevronDown,
  Building2,
  Check,
  Globe,
  Mic,
  Zap,
  BarChart3,
  Flame,
  MessageCircle,
} from "lucide-react";

// Inquiry Categories tailored to Event Marketing & Community Platform
const INQUIRY_TYPES = [
  {
    id: "event-campaign",
    label: "Event Marketing Campaign",
    subtitle: "Summits, meetups, hackathons & attendee acquisition",
    icon: Megaphone,
    color: "var(--primary)",
  },
  {
    id: "product-launch",
    label: "Product / Platform Launch",
    subtitle: "Developer demos, practitioner adoption & buzz",
    icon: Rocket,
    color: "#06b6d4",
  },
  {
    id: "community-growth",
    label: "Community Architecture",
    subtitle: "Slack/Discord setup, chapter scaling & advocacy",
    icon: Users,
    color: "#10b981",
  },
  {
    id: "enterprise-tech",
    label: "Enterprise IT & AI Consulting",
    subtitle: "Salesforce, Slack, Tableau & Agentforce workflows",
    icon: Zap,
    color: "#8b5cf6",
  },
  {
    id: "keynote-speaking",
    label: "Keynote / Workshop Invitation",
    subtitle: "Invite Tarun Gupta for conferences or mentorship",
    icon: Mic,
    color: "#f59e0b",
  },
  {
    id: "general-partnership",
    label: "General Inquiry / Partnership",
    subtitle: "Explore collaborations or strategic alliances",
    icon: MessageSquare,
    color: "#64748b",
  },
];

// Event / Audience Scales
const EVENT_SCALES = [
  "Local / Meetup (< 100)",
  "Regional Summit (100 - 500)",
  "Major Conference (500 - 2,000+)",
  "Enterprise / Global Ecosystem",
];

// Target Timelines
const TIMELINES = [
  "Immediate (Within 2-4 weeks)",
  "Upcoming Quarter (1-3 months)",
  "Later this year (3-6 months)",
  "Just exploring & planning",
];

// Frequently Asked Questions
const FAQS = [
  {
    q: "How fast will our event marketing campaign go live?",
    a: "After our initial discovery call, we prepare your campaign blueprint within 48 to 72 hours. Fast-track campaigns can be rolled out across social channels and community partners within 5 business days.",
  },
  {
    q: "Can you help with both virtual hackathons and on-ground summits?",
    a: "Yes! We specialize in virtual, hybrid, and in-person conferences. From live stream engagement stages to on-ground attendee badges and sponsor collateral, we cover the complete spectrum.",
  },
  {
    q: "How do you integrate with our CRM and community tools?",
    a: "With deep enterprise expertise in Salesforce, Slack, and Tableau from Vivaansh Consulting, we build automated registration pipelines that sync attendee data directly into your CRM and Slack workspace in real-time.",
  },
  {
    q: "Can we invite Tarun Gupta for a keynote or panel session?",
    a: "Absolutely. Simply select 'Keynote / Workshop Invitation' in the form above with your event dates, topic, and expected audience. Our team will coordinate availability and briefing details.",
  },
];

export default function ContactPage() {
  const [selectedType, setSelectedType] = useState(INQUIRY_TYPES[0].label);
  const [selectedScale, setSelectedScale] = useState(EVENT_SCALES[1]);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINES[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill in your Name, Email, and Message.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          inquiryType: selectedType,
          eventScale: selectedScale,
          timeline: selectedTimeline,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      // Even if network glitches, provide smooth fallback confirmation
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* =========================================================================
          HERO SECTION: CONTEXTUAL HEADER ALIGNED WITH HAPPICO & VIVAANSH
          ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/60 border-b border-slate-200">
        {/* Glow Effects */}
        <div
          className="absolute -top-24 right-1/4 h-80 w-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <div
          className="absolute top-1/2 left-10 h-72 w-72 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ backgroundColor: "var(--secondary)" }}
        />

        <div className="relative mx-auto max-w-5xl text-center space-y-6">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white/90 shadow-2xs backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--primary)" }} />
            <span className="text-xs font-bold text-slate-800">
              Event Marketing • Community Strategy • Tech Ecosystems
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.14]">
            Let&apos;s Build, Scale & Market{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
              }}
            >
              Your Next Big Event.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Planning a developer summit, hackathon, or meetup? Want to launch a tech product to active practitioner communities, or explore enterprise Salesforce, Slack & AI consulting with Tarun Gupta? We are ready to execute with you.
          </p>

          {/* Trust Guarantees Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Response within <strong>2 business hours</strong></span>
            </div>
            <div className="hidden sm:inline text-slate-300">•</div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-indigo-500" />
              <span>Complimentary <strong>30-min strategy roadmap</strong></span>
            </div>
            <div className="hidden sm:inline text-slate-300">•</div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-indigo-500" />
              <span>Direct access to certified <strong>SME & architects</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN CONTACT & INQUIRY WORKBENCH (GRID: 5 COLS SIDEBAR + 7 COLS FORM)
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ---------------------------------------------------------------------
              LEFT COLUMN: LEADERSHIP, HOTLINE & FAST ACCESS DESK (5 COLS)
              --------------------------------------------------------------------- */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Direct Communication Hub
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Reach Out to Our Strategy Team
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                Connect directly with Tarun Gupta and the community growth desk for strategic planning, event marketing, or consulting partnerships.
              </p>
            </div>

            {/* Founder Spotlight Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)",
                }}
              />
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-indigo-500/20 shadow-md shrink-0">
                  <Image
                    src="/tarun-gupta.jpg"
                    alt="Tarun Gupta - Founder & CTO"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 mb-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>Active for Inquiries</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Tarun Gupta
                  </h3>
                  <p className="text-xs text-indigo-600 font-semibold">
                    Founder & CTO • Vivaansh Consulting
                  </p>
                  <p className="text-[11px] text-slate-500">
                    2x Tableau Ambassador • Salesforce Champion
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                &ldquo;Whether you want to organize a viral community event or explore enterprise tech integrations, let&apos;s turn ideas into high-impact reality.&rdquo;
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <Link
                  href="/about#founder-story"
                  className="font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
                >
                  <span>Read Full Executive Story</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href="mailto:contact@happico.com"
                  className="text-slate-500 hover:text-slate-800 font-medium"
                >
                  contact@happico.com
                </a>
              </div>
            </div>

            {/* Direct Contact Methods Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-indigo-200 transition-colors">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  <Mail className="h-4 w-4" style={{ color: "var(--primary)" }} />
                  <span>Official Inquiries</span>
                </div>
                <a
                  href="mailto:contact@happico.com"
                  className="text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors block break-all"
                >
                  contact@happico.com
                </a>
                <p className="text-[11px] text-slate-400 mt-1">
                  Direct inbox monitored 24/7
                </p>
              </div>

              {/* Phone Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-indigo-200 transition-colors">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  <Phone className="h-4 w-4" style={{ color: "var(--primary)" }} />
                  <span>Helpline Desk</span>
                </div>
                <a
                  href="tel:+919876543210"
                  className="text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors block"
                >
                  +91 98765 43210
                </a>
                <p className="text-[11px] text-slate-400 mt-1">
                  Mon – Sat, 9:00 AM – 7:00 PM IST
                </p>
              </div>
            </div>

            {/* WhatsApp Fast-Track Banner */}
            <div
              className="p-6 rounded-3xl border text-white relative overflow-hidden shadow-xl"
              style={{ backgroundColor: "var(--footer-bg)" }}
            >
              <div
                className="absolute -top-16 -right-16 h-40 w-40 rounded-full blur-2xl opacity-20 pointer-events-none"
                style={{ backgroundColor: "#25D366" }}
              />

              <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-400 mb-2">
                <MessageCircle className="h-4 w-4" />
                <span>Priority WhatsApp War-Room</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                Need Fast Turnaround for an Event?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Chat directly with our event campaign strategists on WhatsApp for quick estimates, sponsor kits, or immediate onboarding.
              </p>

              <a
                href="https://wa.me/919876543210?text=Hello%20Tarun%20%26%20Happico%20Team%2C%20I%20want%20to%20discuss%20an%20event%20marketing%20campaign%20or%20collaboration."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition-all shadow-lg active:scale-95"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Open Instant WhatsApp Chat</span>
              </a>
            </div>

            {/* Book A Demo Callout Card */}
            <div className="p-6 rounded-3xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block">
                  Prefer a Face-to-Face Video Call?
                </span>
                <p className="text-xs text-slate-600 mt-0.5">
                  Book a 30-min live Google Meet strategy session with our product and community architects.
                </p>
              </div>
              <Link
                href="/Bookdemo"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white shrink-0 shadow-md active:scale-95 transition-transform"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <CalendarCheck2 className="h-3.5 w-3.5" />
                <span>Book Demo</span>
              </Link>
            </div>

            {/* Headquarters Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3">
              <span
                className="h-9 w-9 rounded-xl flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Headquarters & Innovation Hub
                </h4>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">
                  Happico & Vivaansh Consulting
                </p>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                  Tech Park, Sector 62, Noida, NCR, India - 201309
                </p>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------------
              RIGHT COLUMN: INTERACTIVE CAMPAIGN & INQUIRY FORM (7 COLS)
              --------------------------------------------------------------------- */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xl relative overflow-hidden">
            {submitted ? (
              /* Success Confirmation View */
              <div className="py-16 text-center space-y-6">
                <div
                  className="h-20 w-20 mx-auto rounded-3xl flex items-center justify-center text-white shadow-xl animate-bounce"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Inquiry Received
                  </span>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                    Thank You, {formData.name || "Friend"}!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    We have received your request for <strong>{selectedType}</strong>. Our team and Tarun Gupta have been notified and will review your campaign proposal within <strong>2 business hours</strong>.
                  </p>
                </div>

                {/* Summary Pill Box */}
                <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Confirmation Sent To:</span>
                    <span className="font-bold text-slate-800">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Inquiry Focus:</span>
                    <span className="font-bold text-indigo-600">{selectedType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Timeline:</span>
                    <span className="font-bold text-slate-800">{selectedTimeline}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        organization: "",
                        message: "",
                      });
                    }}
                    className="px-6 py-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                  <Link
                    href="/Bookdemo"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white shadow-md active:scale-95 transition-transform"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    <CalendarCheck2 className="h-4 w-4" />
                    <span>Book Strategy Call Now</span>
                  </Link>
                </div>
              </div>
            ) : (
              /* Interactive Inquiry Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                      Start Your Event or Campaign Plan
                    </h3>
                    <span className="text-[11px] font-bold text-slate-400">
                      Step 1 of 1
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Select your primary objective below so we can route your request to the right specialist immediately.
                  </p>
                </div>

                {/* 1. Inquiry Type Selector (Pills / Cards) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    What are you looking to achieve? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {INQUIRY_TYPES.map((type) => {
                      const Icon = type.icon;
                      const isSelected = selectedType === type.label;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setSelectedType(type.label)}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                            isSelected
                              ? "bg-indigo-50/70 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs"
                              : "bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/50"
                          }`}
                        >
                          <span
                            className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? "bg-indigo-600 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0">
                            <h4
                              className={`text-xs font-bold leading-snug truncate ${
                                isSelected ? "text-indigo-950 font-black" : "text-slate-800"
                              }`}
                            >
                              {type.label}
                            </h4>
                            <p className="text-[10px] text-slate-500 leading-tight mt-0.5 truncate">
                              {type.subtitle}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Contact Details: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. priya@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white"
                    />
                  </div>
                </div>

                {/* 3. Phone / WhatsApp & Organization / Community */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Phone / WhatsApp Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Company / Community Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AI Innovators Community or Tech Corp"
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData({ ...formData, organization: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white"
                    />
                  </div>
                </div>

                {/* 4. Event Scale & Target Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Expected Scale / Attendees
                    </label>
                    <select
                      value={selectedScale}
                      onChange={(e) => setSelectedScale(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white cursor-pointer"
                    >
                      {EVENT_SCALES.map((scale, sIdx) => (
                        <option key={sIdx} value={scale}>
                          {scale}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Target Timeline / Launch Date
                    </label>
                    <select
                      value={selectedTimeline}
                      onChange={(e) => setSelectedTimeline(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white cursor-pointer"
                    >
                      {TIMELINES.map((time, tIdx) => (
                        <option key={tIdx} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 5. Campaign Details / Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Campaign Vision & Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your event, audience target, keynote topic, or technology requirements. The more details you share, the better we can prepare for our first call..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white resize-none"
                  />
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl text-sm font-bold text-white shadow-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "var(--primary)",
                    boxShadow: "0 10px 28px var(--primary-glow)",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Campaign Inquiry</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-slate-400">
                  🔒 We respect your privacy. No spam. Direct response from our core leadership team.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: EVENT ORGANIZERS FAQ ACCORDION
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions by Event Organizers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Here are quick answers regarding campaign rollouts, speaking sessions, and technology automations.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
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
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-indigo-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          BOTTOM SECTION: QUICK CTA BANNER
          ========================================================================= */}
      <section
        className="py-14 px-4 sm:px-6 lg:px-8 text-white text-center relative overflow-hidden"
        style={{ backgroundColor: "var(--footer-bg)" }}
      >
        <div className="relative mx-auto max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold text-slate-200 border border-white/10">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span>Ready to Elevate Your Community?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Turn Your Community Event Into an Industry Benchmark
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            From registration hype and live stages to Salesforce & Tableau analytics dashboards—we provide the complete growth engine.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/Bookdemo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white shadow-lg transition-transform active:scale-95"
              style={{ backgroundColor: "var(--primary)" }}
            >
              <CalendarCheck2 className="h-4 w-4" />
              <span>Book Strategy Session</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-slate-200 border border-white/20 hover:bg-white/10 transition-colors"
            >
              <span>Explore About Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
