import Link from "next/link";
import {
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  HelpCircle,
  Mail,
  Calendar,
  CreditCard,
  AlertCircle,
  Check,
  ChevronRight,
  Shield,
  FileCheck,
} from "lucide-react";

export const metadata = {
  title: "Refund & Cancellation Policy | Buzzoraa",
  description:
    "Buzzoraa's clear and transparent refund, cancellation, and rescheduling policies for platform subscriptions and SaaS plans.",
};

const REFUND_SECTIONS = [
  {
    id: "commitment",
    number: "01",
    title: "Commitment to Fair & Transparent Practices",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          At Buzzoraa, we believe in long-term relationships built on value, trust, and transparency. Whether you are subscribing to our Social Engagement &amp; GTM SaaS platform or scheduling a product demo, our refund and cancellation policies are crafted to be fair to both parties.
        </p>
      </div>
    ),
  },
  {
    id: "platform-subscriptions",
    number: "02",
    title: "Software Platform Subscriptions",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>7-Day Free Trial</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            New community organizers can explore our platform risk-free. You will not be charged if you cancel before the trial period concludes.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
          <h4 className="text-sm font-bold text-slate-900">Monthly Subscriptions</h4>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            You can cancel your monthly subscription at any time directly through your account dashboard or by emailing{" "}
            <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono font-bold">
              support@buzzoraa.com
            </code>
            .
          </p>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Upon cancellation, your subscription remains active until the end of the current paid billing cycle. No further recurring charges will be incurred. Partial month refunds are generally not issued once the billing cycle has started.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2">
          <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Annual Subscriptions (14-Day Cooling Period)</span>
          </h4>
          <p className="text-emerald-900 text-xs sm:text-sm leading-relaxed">
            If you purchase an annual subscription plan and find that Buzzoraa does not fulfill your requirements, you may request a{" "}
            <strong>100% full refund within 14 calendar days</strong> of initial payment. After 14 days, annual plans are non-refundable, but access will persist through the remainder of the annual contract.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "event-campaigns-cancellation",
    number: "03",
    title: "Event Marketing & Campaign Services Cancellation",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          When engaging Buzzoraa for custom enterprise onboarding, community activation programs, or dedicated GTM setups:
        </p>
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <strong className="text-slate-900 font-bold text-xs sm:text-sm block">Notice Period</strong>
            <p className="text-xs text-slate-600 leading-relaxed">
              Because event marketing campaigns require dedicated resource allocation, campaign setup, and third-party ad spend, cancellations must be provided in writing at least <strong>14 business days</strong> prior to the scheduled campaign launch date.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <strong className="text-slate-900 font-bold text-xs sm:text-sm block">Milestone-Based Billing</strong>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fees paid for completed campaign milestones (such as brand collateral creation, website landing page construction, or initial outreach blasts) are non-refundable once approved and delivered.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <strong className="text-slate-900 font-bold text-xs sm:text-sm block">Third-Party Hard Costs</strong>
            <p className="text-xs text-slate-600 leading-relaxed">
              Any non-recoverable direct outlays committed on your behalf (such as sponsored ads, third-party press release distributions, or custom domains) will be deducted from any refund amount.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "demo-rescheduling",
    number: "04",
    title: "Demo Sessions & Strategy Call Rescheduling",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          We understand that schedules change dynamically:
        </p>
        <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs sm:text-sm text-indigo-950 space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-indigo-950 font-bold mb-0.5">Free Rescheduling</strong>
              <span>
                You can reschedule your 1-on-1 demo or strategy session up to <strong>4 hours before</strong> the appointment at zero cost via your confirmation email link.
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-indigo-950 font-bold mb-0.5">Paid Keynotes / Consulting Engagements</strong>
              <span>
                For formal speaking engagements or enterprise consulting retainers with Tarun Gupta, rescheduling terms are governed by your specific engagement letter.
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "refund-processing",
    number: "05",
    title: "Refund Processing Timelines & Methods",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          Approved refunds are processed promptly and securely:
        </p>
        <ul className="space-y-2 text-slate-700 text-xs sm:text-sm list-disc pl-5">
          <li>Refunds are credited back to the <strong>original payment method</strong> (credit card, debit card, UPI, or net banking).</li>
          <li>Processing typically takes <strong>5 to 7 business days</strong>, depending on your banking institution or card issuer.</li>
          <li>You will receive an automated email receipt confirming the transaction reference number as soon as the refund is initiated.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "how-to-request",
    number: "06",
    title: "How to Request a Cancellation or Refund",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
          To initiate a cancellation or refund request, please email our billing department with your order details:
        </p>
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
          <p className="font-bold text-slate-900 text-sm">Buzzoraa Billing &amp; Accounts Desk</p>
          <p>
            Email:{" "}
            <a href="mailto:refunds@buzzoraa.com" className="text-indigo-600 font-semibold hover:underline">
              refunds@buzzoraa.com
            </a>{" "}
            /{" "}
            <a href="mailto:contact@buzzoraa.com" className="text-indigo-600 font-semibold hover:underline">
              contact@buzzoraa.com
            </a>
          </p>
          <p className="text-slate-600">
            <strong>Required Details:</strong> Account email, invoice/transaction ID, and a brief description of the reason for cancellation.
          </p>
          <p className="text-slate-500 font-medium">
            Response Time: We review and respond to all refund requests within <strong>24 to 48 business hours</strong>.
          </p>
        </div>
      </div>
    ),
  },
];

export default function RefundAndCancellationPage() {
  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 selection:bg-indigo-500 selection:text-white pb-24">
      {/* =======================================================================
          HEADER BANNER
         ======================================================================= */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/60 border-b border-slate-200">
        {/* Subtle technical background grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_70%,transparent_100%)]" />

        <div className="relative mx-auto max-w-4xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white shadow-2xs text-xs font-bold text-slate-800">
            <RotateCcw className="h-4 w-4 text-indigo-600" />
            <span>Fair &amp; Transparent Policies</span>
            <span className="text-slate-300">|</span>
            <span className="text-indigo-600 font-semibold">Customer-First Guarantee</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Refund &amp; Cancellation Policy
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            We are dedicated to transparent, flexible, and customer-first policies across our software subscriptions, event marketing campaigns, and strategy sessions.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>Last Updated: October 16, 2026</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              <span>Customer-First Guarantee</span>
            </span>
          </div>
        </div>
      </section>

      {/* =======================================================================
          MAIN CONTENT WITH CLEAN TOC & CONTENT SECTIONS
         ======================================================================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Core Pillars Grid */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
            <div className="h-10 w-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 shadow-xs">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">7-Day Free Trial</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Explore the full power of Buzzoraa without upfront billing or surprise charges.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
            <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 shadow-xs">
              <CreditCard className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">5-7 Day Processing</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Approved refunds are credited directly back to your original payment method promptly.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
            <div className="h-10 w-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 shadow-xs">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Flexible Rescheduling</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Reschedule demo strategy sessions up to 4 hours in advance at zero additional charge.
            </p>
          </div>
        </div>

        {/* 2-Column Layout: Sidebar TOC + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Sticky Table of Contents (4 cols) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Table of Contents
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  6 Sections
                </span>
              </div>

              <nav className="space-y-1">
                {REFUND_SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors group"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[10px] text-slate-400 group-hover:text-indigo-500">
                        {sec.number}
                      </span>
                      <span className="truncate">{sec.title}</span>
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-indigo-500 shrink-0" />
                  </a>
                ))}
              </nav>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
                Have questions about billing or invoices?{" "}
                <Link href="/contact" className="text-indigo-600 font-bold hover:underline">
                  Talk with our accounts team
                </Link>
                .
              </div>
            </div>
          </aside>

          {/* Right Column: Detailed Sections (8 cols) */}
          <main className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-12 shadow-xl divide-y divide-slate-100 space-y-8">
              {REFUND_SECTIONS.map((sec) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="scroll-mt-28 pt-8 first:pt-0 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-600 px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100">
                      {sec.number}
                    </span>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      {sec.title}
                    </h2>
                  </div>

                  <div>{sec.content}</div>
                </section>
              ))}
            </div>

            {/* Bottom Help Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-slate-800">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-white">Questions About a Subscription or Invoice?</h3>
                <p className="text-xs sm:text-sm text-slate-300 font-normal">
                  Our billing support team is here to review your account, invoices, or cancellation requests promptly.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-white shadow-xl active:scale-95 transition-all duration-200 hover:scale-102 shrink-0"
                style={{
                  backgroundColor: "var(--primary, #6366f1)",
                  boxShadow: "0 8px 20px var(--primary-glow, rgba(99, 102, 241, 0.25))",
                }}
              >
                <Mail className="h-4 w-4" />
                <span>Contact Billing Desk</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
