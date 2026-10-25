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
} from "lucide-react";

export const metadata = {
  title: "Refund & Cancellation Policy | Buzzoraa",
  description:
    "Buzzoraa's clear and transparent refund, cancellation, and rescheduling policies for platform subscriptions and SaaS plans.",
};

const REFUND_SECTIONS = [
  {
    id: "commitment",
    title: "1. Commitment to Fair & Transparent Practices",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed mb-3">
          At Buzzoraa, we believe in long-term relationships built on value, trust, and transparency. Whether you are subscribing to our Social Engagement &amp; GTM SaaS platform or scheduling a product demo, our refund and cancellation policies are crafted to be fair to both parties.
        </p>
      </>
    ),
  },
  {
    id: "platform-subscriptions",
    title: "2. Software Platform Subscriptions",
    content: (
      <>
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              7-Day Free Trial
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              New community organizers can explore our platform risk-free. You will not be charged if you cancel before the trial period concludes.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">Monthly Subscriptions</h4>
            <p className="text-slate-600 text-sm leading-relaxed mb-2">
              You can cancel your monthly subscription at any time directly through your account dashboard or by emailing <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded text-xs font-mono font-bold">support@buzzoraa.com</code>.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Upon cancellation, your subscription remains active until the end of the current paid billing cycle. No further recurring charges will be incurred. Partial month refunds are generally not issued once the billing cycle has started.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">Annual Subscriptions (14-Day Cooling Period)</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              If you purchase an annual subscription plan and find that Buzzoraa does not fulfill your requirements, you may request a <strong>100% full refund within 14 calendar days</strong> of initial payment. After 14 days, annual plans are non-refundable, but access will persist through the remainder of the annual contract.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "event-campaigns-cancellation",
    title: "3. Event Marketing & Campaign Services Cancellation",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed mb-3">
          When engaging Buzzoraa for custom enterprise onboarding, community activation programs, or dedicated GTM setups:
        </p>
        <ul className="space-y-2.5 text-slate-600 text-sm list-disc pl-5 mb-4">
          <li>
            <strong className="text-slate-800">Notice Period:</strong> Because event marketing campaigns require dedicated resource allocation, campaign setup, and third-party ad spend, cancellations must be provided in writing at least <strong>14 business days</strong> prior to the scheduled campaign launch date.
          </li>
          <li>
            <strong className="text-slate-800">Milestone-Based Billing:</strong> Fees paid for completed campaign milestones (such as brand collateral creation, website landing page construction, or initial outreach blasts) are non-refundable once approved and delivered.
          </li>
          <li>
            <strong className="text-slate-800">Third-Party Hard Costs:</strong> Any non-recoverable direct outlays committed on your behalf (such as sponsored ads, third-party press release distributions, or custom domains) will be deducted from any refund amount.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "demo-rescheduling",
    title: "4. Demo Sessions & Strategy Call Rescheduling",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed mb-3">
          We understand that schedules change dynamically:
        </p>
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs sm:text-sm text-indigo-950 space-y-2">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
            <span>
              <strong>Free Rescheduling:</strong> You can reschedule your 1-on-1 demo or strategy session up to <strong>4 hours before</strong> the appointment at zero cost via your confirmation email link.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
            <span>
              <strong>Paid Keynotes / Consulting Engagements:</strong> For formal speaking engagements or enterprise consulting retainers with Tarun Gupta, rescheduling terms are governed by your specific engagement letter.
            </span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "refund-processing",
    title: "5. Refund Processing Timelines & Methods",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed mb-3">
          Approved refunds are processed promptly:
        </p>
        <ul className="space-y-2 text-slate-600 text-sm list-disc pl-5">
          <li>Refunds are credited back to the <strong>original payment method</strong> (credit card, debit card, UPI, or net banking).</li>
          <li>Processing typically takes <strong>5 to 7 business days</strong>, depending on your banking institution or card issuer.</li>
          <li>You will receive an automated email receipt confirming the transaction reference number as soon as the refund is initiated.</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-to-request",
    title: "6. How to Request a Cancellation or Refund",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed text-sm mb-3">
          To initiate a cancellation or refund request, please email our billing department with your order details:
        </p>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 space-y-1">
          <p className="font-bold text-slate-900">Buzzoraa Billing &amp; Accounts Desk</p>
          <p>Email: <a href="mailto:refunds@buzzoraa.com" className="text-indigo-600 font-semibold hover:underline">refunds@buzzoraa.com</a> / <a href="mailto:contact@buzzoraa.com" className="text-indigo-600 font-semibold hover:underline">contact@buzzoraa.com</a></p>
          <p>Required Details: Account email, invoice/transaction ID, and a brief description of the reason for cancellation.</p>
          <p>Response Time: We review and respond to all refund requests within <strong>24 to 48 business hours</strong>.</p>
        </div>
      </>
    ),
  },
];

export default function RefundAndCancellationPage() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/60 border-b border-slate-200">
        <div
          className="absolute -top-24 right-1/4 h-80 w-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: "var(--primary)" }}
        />

        <div className="relative mx-auto max-w-4xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white/90 shadow-2xs text-xs font-bold text-slate-700">
            <RotateCcw className="h-4 w-4" style={{ color: "var(--primary)" }} />
            <span>Fair & Transparent Policies</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Refund & Cancellation Policy
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            We are dedicated to transparent, flexible, and customer-first policies across our software subscriptions, event marketing campaigns, and strategy sessions.
          </p>

          <div className="pt-2 flex items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" /> Last Updated: October 16, 2026
            </span>
            <span>•</span>
            <span>Customer-First Guarantee</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Core Pillars Grid */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="h-9 w-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">7-Day Free Trial</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Explore the full power of Buzzoraa without upfront billing or surprise charges.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <CreditCard className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">5-7 Day Processing</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Approved refunds are credited directly back to your original payment method promptly.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Flexible Rescheduling</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Reschedule demo strategy sessions up to 4 hours in advance at zero additional charge.
            </p>
          </div>
        </div>

        {/* Detailed Policy Sections */}
        <div className="space-y-8 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-12 shadow-sm">
          {REFUND_SECTIONS.map((sec) => (
            <div key={sec.id} id={sec.id} className="scroll-mt-24 space-y-3 pb-8 border-b border-slate-100 last:border-b-0 last:pb-0">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {sec.title}
              </h2>
              <div className="text-sm">{sec.content}</div>
            </div>
          ))}
        </div>

        {/* Bottom Help Card */}
        <div className="mt-12 p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">Questions About a Subscription or Invoice?</h3>
            <p className="text-xs text-slate-300">
              Our billing support team is here to review your account and assist with any inquiries.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white shadow-md active:scale-95 transition-transform shrink-0"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <Mail className="h-4 w-4" />
            <span>Contact Billing Desk</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
