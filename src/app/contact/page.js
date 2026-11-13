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
  Headphones,
  Laptop,
  Compass,
  FileQuestion,
  ExternalLink,
  Copy,
} from "lucide-react";

// Frequently Asked Questions
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

// Dedicated Department Channels
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

export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@buzzoraa.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* =========================================================================
          HERO SECTION: CONTEXTUAL HEADER ALIGNED WITH BUZZORAA
          ========================================================================= */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/60 border-b border-slate-200">
        {/* Ambient Glows */}
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
              Direct Communication Hub • Instant Response
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Let&apos;s Connect &amp; Turn Conversations Into{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
              }}
            >
              Sustainable Growth.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Whether you&apos;re planning a community hackathon, scaling a product launch, or seeking enterprise tech consultation—skip the forms and reach out directly through your preferred channel.
          </p>

          {/* Quick CTA Actions inside Hero */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://wa.me/919876543210?text=Hello%20Buzzoraa%20Team%2C%20I%20would%20like%20to%20discuss%20our%20growth%20and%20events."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat on WhatsApp</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            <Link
              href="/Bookdemo"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-white text-xs sm:text-sm font-bold shadow-lg active:scale-95 transition-all"
              style={{
                backgroundColor: "var(--primary)",
                boxShadow: "0 10px 24px var(--primary-glow)",
              }}
            >
              <CalendarCheck2 className="h-4 w-4" />
              <span>Book Strategy Call (30 min)</span>
            </Link>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs sm:text-sm font-bold shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
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
          KEY CONTACT TILES (DIRECT CHANNELS INSTEAD OF FORM)
          ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: WhatsApp Priority Desk */}
          <div className="group rounded-3xl bg-white p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-300">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
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

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Available:</span>
                  <span className="font-semibold text-slate-700">Mon – Sat, 9am - 8pm</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Phone:</span>
                  <span className="font-semibold text-slate-700">+91 98765 43210</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4">
              <a
                href="https://wa.me/919876543210?text=Hello%20Buzzoraa%20Team%2C%20I%20want%20to%20discuss%20social%20engagement%20and%20GTM%20growth."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md active:scale-95"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 2: Official Email Inbox */}
          <div className="group rounded-3xl bg-white p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className="h-12 w-12 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:scale-105"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  <Mail className="h-6 w-6" />
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200">
                  24/7 Monitored
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                Email Dispatch
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Send RFP briefs, deck presentations, sponsorship proposals, or detailed scope documents.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs">
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

            <div className="mt-6 pt-4">
              <a
                href="mailto:contact@buzzoraa.com"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white text-xs font-bold transition-all shadow-md active:scale-95"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Send Direct Email</span>
              </a>
            </div>
          </div>

          {/* Card 3: Live Video Consultation (Book Demo) */}
          <div className="group rounded-3xl bg-white p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                  <CalendarCheck2 className="h-6 w-6" />
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 text-[11px] font-bold border border-cyan-200">
                  Google Meet
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 group-hover:text-cyan-700 transition-colors">
                Book Video Call
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Schedule a 30-minute tailored strategy session directly on our interactive calendar.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Format:</span>
                  <span className="font-semibold text-slate-700">1-on-1 Video Session</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Includes:</span>
                  <span className="font-semibold text-cyan-700">Custom Roadmap</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4">
              <Link
                href="/Bookdemo"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md active:scale-95"
              >
                <CalendarCheck2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>Open Calendar Slots</span>
              </Link>
            </div>
          </div>

          {/* Card 4: Phone & Advisory Hotline */}
          <div className="group rounded-3xl bg-white p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                  <Phone className="h-6 w-6" />
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200">
                  Direct Line
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                Phone Support
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Need to speak with a human right away? Call our client relations desk during business hours.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Hotline:</span>
                  <span className="font-semibold text-slate-900">+91 98765 43210</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Hours:</span>
                  <span className="font-semibold text-slate-700">9:00 AM – 7:00 PM IST</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4">
              <a
                href="tel:+919876543210"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-md active:scale-95"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call Now (+91)</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          EXECUTIVE LEADERSHIP SPOTLIGHT & INNOVATION HUB (2-COLUMN SHOWCASE)
          ========================================================================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Executive Founder Card (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)",
              }}
            />

            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-4 ring-indigo-500/10 shadow-md shrink-0">
                  <Image
                    src="/tarun-gupta.jpg"
                    alt="Tarun Gupta - Founder & CTO"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Direct Executive Access</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Tarun Gupta
                  </h3>
                  <p className="text-xs sm:text-sm text-indigo-600 font-bold">
                    Founder &amp; CTO • Vivaansh Consulting
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    2x Tableau Ambassador • Salesforce Champion • Keynote Speaker
                  </p>
                </div>
              </div>

              <blockquote className="text-sm sm:text-base text-slate-700 leading-relaxed italic bg-slate-50/80 p-5 rounded-2xl border border-slate-100">
                &ldquo;Whether you want to organize a viral developer hackathon, execute a high-profile summit, or integrate Agentforce &amp; Tableau analytics into your pipeline—we treat your growth as our own.&rdquo;
              </blockquote>

              {/* Badges / Credibility Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <div className="text-sm font-black text-slate-900">100+</div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">Events Guided</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <div className="text-sm font-black text-slate-900">50K+</div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">Community Members</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center col-span-2 sm:col-span-1">
                  <div className="text-sm font-black text-indigo-600">Salesforce &amp; Tableau</div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">Ecosystem Leader</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/about#founder-story"
                className="font-bold text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1.5"
              >
                <span>Read Full Executive Story &amp; Accreditations</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:contact@buzzoraa.com?subject=Inquiry%20for%20Tarun%20Gupta"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Message Tarun</span>
              </a>
            </div>
          </div>

          {/* Headquarters & Global Presence Card (5 cols) */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-slate-900 text-white relative overflow-hidden flex flex-col justify-between shadow-xl">
            <div
              className="absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ backgroundColor: "var(--primary)" }}
            />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-slate-300 border border-white/10 mb-4">
                <Building2 className="h-3.5 w-3.5 text-indigo-400" />
                <span>Global Headquarters</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white">
                Buzzoraa Innovation Hub
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
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
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-lg active:scale-95 transition-all"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <CalendarCheck2 className="h-4 w-4" />
                <span>Book Live Demonstration</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          DEPARTMENT INQUIRY DESKS (GRID OF 4 PURPOSE-BUILT PATHWAYS)
          ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100">
            <Compass className="h-3.5 w-3.5" />
            <span>Dedicated Channels</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Connect With the Right Specialization
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Pick your exact domain so we route your inquiry with full context and no delays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONTACT_CHANNELS.map((channel, cIdx) => {
            const Icon = channel.icon;
            return (
              <div
                key={cIdx}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span
                      className="h-11 w-11 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${channel.badgeColor}`}>
                      {channel.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {channel.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
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
        </div>
      </section>

      {/* =========================================================================
          SECTION: FREQUENTLY ASKED QUESTIONS
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100">
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
        className="py-16 px-4 sm:px-6 lg:px-8 text-white text-center relative overflow-hidden"
        style={{ backgroundColor: "var(--footer-bg)" }}
      >
        <div className="relative mx-auto max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold text-slate-200 border border-white/10">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span>Ready to Elevate Your Community &amp; GTM?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
            Turn Your Next Campaign Into an Industry Benchmark
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            From registration hype and live stages to Salesforce &amp; Tableau analytics dashboards—we provide the complete growth engine.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/Bookdemo"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-lg transition-transform active:scale-95"
              style={{ backgroundColor: "var(--primary)" }}
            >
              <CalendarCheck2 className="h-4 w-4" />
              <span>Book Strategy Session</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hello%20Buzzoraa%20Team%2C%20I%20want%20to%20discuss%20our%20community%20growth."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Us Directly</span>
            </a>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-slate-200 border border-white/20 hover:bg-white/10 transition-colors"
            >
              <span>Explore About Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
