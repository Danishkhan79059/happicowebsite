import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  Scale,
  AlertCircle,
  HelpCircle,
  Mail,
  Zap,
  ChevronRight,
  Shield,
  FileCode,
} from "lucide-react";

export const metadata = {
  title: "Terms & Services | Buzzoraa",
  description:
    "Review the terms and conditions governing the use of Buzzoraa's Social Engagement & Go-to-Market (GTM) SaaS platform.",
};

const TERMS_SECTIONS = [
  {
    id: "acceptance",
    number: "01",
    title: "Acceptance of Terms",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          By accessing or using the Buzzoraa website, SaaS platform, social engagement tools, or scheduling product demos (&ldquo;Services&rdquo;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;).
        </p>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          If you are entering into these Terms on behalf of an organization, brand, or startup, you represent that you have the authority to legally bind that entity to these Terms.
        </p>
      </div>
    ),
  },
  {
    id: "services-description",
    number: "02",
    title: "Description of Services",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          Buzzoraa provides an all-in-one Social Engagement &amp; Go-to-Market (GTM) SaaS platform that includes:
        </p>
        <div className="space-y-2.5">
          {[
            "Social engagement tools, conversation tracking, and social interaction management.",
            "Community activation workflows, advocate management, and peer-to-peer engagement loops.",
            "Content amplification pipelines, viral reach distribution, and multi-network syndication.",
            "GTM conversation-to-pipeline attribution, lead generation, and CRM synchronization.",
            "Demo scheduling, client onboarding, and dedicated technical support.",
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-slate-600 leading-relaxed text-xs sm:text-sm pt-2">
          We continually enhance our services and reserve the right to modify, upgrade, or temporarily suspend specific features to maintain optimal performance and security.
        </p>
      </div>
    ),
  },
  {
    id: "account-registration",
    number: "03",
    title: "Account Registration & Security",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          To access certain administrative features, you must register for an account:
        </p>
        <ul className="space-y-2 text-slate-700 text-xs sm:text-sm list-disc pl-5">
          <li>You agree to provide true, accurate, current, and complete registration information.</li>
          <li>You are responsible for safeguarding your login credentials and maintaining the confidentiality of your account.</li>
          <li>
            You must notify us immediately at{" "}
            <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono font-bold">
              contact@buzzoraa.com
            </code>{" "}
            of any unauthorized use or security compromise.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "acceptable-use",
    number: "04",
    title: "Acceptable Use & Conduct Guidelines",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          When using our platform or participating in event campaigns, you agree strictly NOT to:
        </p>
        <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100 text-xs sm:text-sm text-rose-950 space-y-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            <span>Engage in unlawful, defamatory, harassing, or fraudulent activities.</span>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            <span>Harvest attendee email addresses or spam community channels without explicit consent.</span>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            <span>Attempt to bypass platform authentication, decompile code, or introduce malicious payloads.</span>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            <span>Infringe upon intellectual property rights, trademarks, or copyrights.</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "event-campaigns-terms",
    number: "05",
    title: "Event Organizers & Campaign Milestones",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          For clients engaging our marketing campaign execution services:
        </p>
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <strong className="text-slate-900 font-bold text-xs sm:text-sm block mb-1">Campaign Approvals</strong>
            <p className="text-xs text-slate-600 leading-relaxed">
              Creative assets, branding, and messaging will be submitted for client review prior to public dissemination.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <strong className="text-slate-900 font-bold text-xs sm:text-sm block mb-1">Deliverables</strong>
            <p className="text-xs text-slate-600 leading-relaxed">
              Marketing campaign scopes (e.g. target registrations, impressions, hackathon submissions) are detailed in the respective engagement agreement.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <strong className="text-slate-900 font-bold text-xs sm:text-sm block mb-1">Organizer Obligations</strong>
            <p className="text-xs text-slate-600 leading-relaxed">
              Organizers are responsible for providing accurate event dates, speaker credentials, and adhering to venue or platform codes of conduct.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "fees-payments",
    number: "06",
    title: "Fees, Subscriptions & Payment Terms",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          Pricing for platform subscription tiers and bespoke campaign contracts are outlined on our Pricing page or in your custom statement of work (SOW):
        </p>
        <ul className="space-y-2 text-slate-700 text-xs sm:text-sm list-disc pl-5">
          <li>All subscription fees are billed in advance on a recurring monthly or annual basis.</li>
          <li>Event campaign projects are billed based on defined milestones (e.g. initial kickoff deposit, mid-campaign delivery, post-event analytics).</li>
          <li>Payments are processed securely via accredited payment gateways. Applicable taxes (GST/VAT) are applied based on billing jurisdiction.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "intellectual-property",
    number: "07",
    title: "Intellectual Property Rights",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          Buzzoraa retains all proprietary rights, trademarks, software code, and platform designs. You retain all ownership rights in your community content, trademarks, logos, and attendee data. You grant us a limited, revocable license to utilize your logos solely for executing authorized campaign collateral.
        </p>
      </div>
    ),
  },
  {
    id: "limitation-liability",
    number: "08",
    title: "Limitation of Liability",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
          To the maximum extent permitted by applicable law, in no event shall Buzzoraa Inc., or its directors, employees, or partners be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill arising out of or related to your use of the Services.
        </p>
        <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
          Our aggregate liability for all claims arising out of or related to these Terms shall not exceed the total amount paid by you to Buzzoraa during the twelve (12) months preceding the event giving rise to liability.
        </p>
      </div>
    ),
  },
  {
    id: "governing-law",
    number: "09",
    title: "Governing Law & Dispute Resolution",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
          These Terms shall be governed by and construed in accordance with the laws of India. Any disputes or claims arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts in Noida / New Delhi, India. Both parties agree to attempt amicable, good-faith negotiation before initiating formal legal proceedings.
        </p>
      </div>
    ),
  },
  {
    id: "contact-terms",
    number: "10",
    title: "Contact Us Regarding Terms",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
          If you have questions about these Terms of Service or need customized enterprise agreements, please get in touch:
        </p>
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
          <p className="font-bold text-slate-900 text-sm">Buzzoraa Legal &amp; Compliance Desk</p>
          <p>
            Email:{" "}
            <a href="mailto:legal@buzzoraa.com" className="text-indigo-600 font-semibold hover:underline">
              legal@buzzoraa.com
            </a>{" "}
            /{" "}
            <a href="mailto:contact@buzzoraa.com" className="text-indigo-600 font-semibold hover:underline">
              contact@buzzoraa.com
            </a>
          </p>
          <p>Phone: +91 98765 43210 (Mon – Sat, 9am – 7pm IST)</p>
          <p>
            Website:{" "}
            <a href="https://buzzoraa.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:underline">
              https://buzzoraa.com
            </a>
          </p>
        </div>
      </div>
    ),
  },
];

export default function TermsAndServicesPage() {
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
            <Scale className="h-4 w-4 text-indigo-600" />
            <span>Terms of Agreement</span>
            <span className="text-slate-300">|</span>
            <span className="text-indigo-600 font-semibold">Global Applicability</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Terms &amp; Services
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Please review these terms and conditions governing the access and usage of Buzzoraa&apos;s Social Engagement &amp; GTM SaaS platform.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>Effective Date: October 16, 2026</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              <span>Standard Enterprise Terms</span>
            </span>
          </div>
        </div>
      </section>

      {/* =======================================================================
          MAIN CONTENT WITH CLEAN TOC & CONTENT SECTIONS
         ======================================================================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Core Principles Cards */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
            <div className="h-10 w-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 shadow-xs">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Clear Commitments</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Transparent service level agreements, uptime guarantees, and defined project scopes.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
            <div className="h-10 w-10 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3 shadow-xs">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">100% IP Ownership</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              You maintain 100% ownership of your community content, attendee data, and brand assets.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
            <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 shadow-xs">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Fair Practices</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Straightforward billing, milestone approvals, and ethical community engagement guidelines.
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
                  10 Sections
                </span>
              </div>

              <nav className="space-y-1">
                {TERMS_SECTIONS.map((sec) => (
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
                Need custom terms or a Master Services Agreement (MSA)?{" "}
                <Link href="/contact" className="text-indigo-600 font-bold hover:underline">
                  Inquire with legal
                </Link>
                .
              </div>
            </div>
          </aside>

          {/* Right Column: Detailed Sections (8 cols) */}
          <main className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-12 shadow-xl divide-y divide-slate-100 space-y-8">
              {TERMS_SECTIONS.map((sec) => (
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

            {/* Bottom Action Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-slate-800">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-white">Need Custom Enterprise Terms or an MSA?</h3>
                <p className="text-xs sm:text-sm text-slate-300 font-normal">
                  We offer customized Master Services Agreements (MSAs) and custom SLAs for corporate enterprise deployments.
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
                <span>Contact Legal Team</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
