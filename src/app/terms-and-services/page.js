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
} from "lucide-react";

export const metadata = {
  title: "Terms & Services | Buzzoraa",
  description:
    "Review the terms and conditions governing the use of Buzzoraa's Social Engagement & Go-to-Market (GTM) SaaS platform.",
};

const TERMS_SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed mb-3">
          By accessing or using the Buzzoraa website, SaaS platform, social engagement tools, or scheduling product demos (&ldquo;Services&rdquo;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;).
        </p>
        <p className="text-slate-600 leading-relaxed">
          If you are entering into these Terms on behalf of an organization, brand, or startup, you represent that you have the authority to legally bind that entity to these Terms.
        </p>
      </>
    ),
  },
  {
    id: "services-description",
    title: "2. Description of Services",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed mb-3">
          Buzzoraa provides an all-in-one Social Engagement &amp; Go-to-Market (GTM) SaaS platform that includes:
        </p>
        <ul className="space-y-2 text-slate-600 text-sm list-disc pl-5 mb-4">
          <li>Social engagement tools, conversation tracking, and social interaction management.</li>
          <li>Community activation workflows, advocate management, and peer-to-peer engagement loops.</li>
          <li>Content amplification pipelines, viral reach distribution, and multi-network syndication.</li>
          <li>GTM conversation-to-pipeline attribution, lead generation, and CRM synchronization.</li>
          <li>Demo scheduling, client onboarding, and dedicated technical support.</li>
        </ul>
        <p className="text-slate-600 leading-relaxed text-sm">
          We continually enhance our services and reserve the right to modify, upgrade, or temporarily suspend specific features to maintain optimal performance and security.
        </p>
      </>
    ),
  },
  {
    id: "account-registration",
    title: "3. Account Registration & Security",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed mb-3">
          To access certain administrative features, you must register for an account:
        </p>
        <ul className="space-y-2 text-slate-600 text-sm list-disc pl-5">
          <li>You agree to provide true, accurate, current, and complete registration information.</li>
          <li>You are responsible for safeguarding your login credentials and maintaining the confidentiality of your account.</li>
          <li>You must notify us immediately at <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded text-xs font-mono font-bold">contact@buzzoraa.com</code> of any unauthorized use or security compromise.</li>
        </ul>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "4. Acceptable Use & Conduct Guidelines",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed mb-3">
          When using our platform or participating in event campaigns, you agree strictly NOT to:
        </p>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
            <span>Engage in unlawful, defamatory, harassing, or fraudulent activities.</span>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
            <span>Harvest attendee email addresses or spam community channels without explicit consent.</span>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
            <span>Attempt to bypass platform authentication, decompile code, or introduce malicious payloads.</span>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
            <span>Infringe upon intellectual property rights, trademarks, or copyrights.</span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "event-campaigns-terms",
    title: "5. Event Organizers & Campaign Milestones",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed mb-3">
          For clients engaging our marketing campaign execution services:
        </p>
        <ul className="space-y-2 text-slate-600 text-sm list-disc pl-5">
          <li><strong>Campaign Approvals:</strong> Creative assets, branding, and messaging will be submitted for client review prior to public dissemination.</li>
          <li><strong>Deliverables:</strong> Marketing campaign scopes (e.g. target registrations, impressions, hackathon submissions) are detailed in the respective engagement agreement.</li>
          <li><strong>Organizer Obligations:</strong> Organizers are responsible for providing accurate event dates, speaker credentials, and adhering to venue or platform codes of conduct.</li>
        </ul>
      </>
    ),
  },
  {
    id: "fees-payments",
    title: "6. Fees, Subscriptions & Payment Terms",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed mb-3">
          Pricing for platform subscription tiers and bespoke campaign contracts are outlined on our Pricing page or in your custom statement of work (SOW):
        </p>
        <ul className="space-y-2 text-slate-600 text-sm list-disc pl-5">
          <li>All subscription fees are billed in advance on a recurring monthly or annual basis.</li>
          <li>Event campaign projects are billed based on defined milestones (e.g. initial kickoff deposit, mid-campaign delivery, post-event analytics).</li>
          <li>Payments are processed securely via accredited payment gateways. Applicable taxes (GST/VAT) are applied based on billing jurisdiction.</li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "7. Intellectual Property Rights",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed mb-3">
          Buzzoraa retains all proprietary rights, trademarks, software code, and platform designs. You retain all ownership rights in your community content, trademarks, logos, and attendee data. You grant us a limited, revocable license to utilize your logos solely for executing authorized campaign collateral.
        </p>
      </>
    ),
  },
  {
    id: "limitation-liability",
    title: "8. Limitation of Liability",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed text-sm mb-3">
          To the maximum extent permitted by applicable law, in no event shall Buzzoraa Inc., or its directors, employees, or partners be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill arising out of or related to your use of the Services.
        </p>
        <p className="text-slate-600 leading-relaxed text-sm">
          Our aggregate liability for all claims arising out of or related to these Terms shall not exceed the total amount paid by you to Buzzoraa during the twelve (12) months preceding the event giving rise to liability.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "9. Governing Law & Dispute Resolution",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed text-sm">
          These Terms shall be governed by and construed in accordance with the laws of India. Any disputes or claims arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts in Noida / New Delhi, India. Both parties agree to attempt amicable, good-faith negotiation before initiating formal legal proceedings.
        </p>
      </>
    ),
  },
  {
    id: "contact-terms",
    title: "10. Contact Us Regarding Terms",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed text-sm mb-3">
          If you have questions about these Terms of Service or need customized enterprise agreements, please get in touch:
        </p>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 space-y-1">
          <p className="font-bold text-slate-900">Buzzoraa Legal &amp; Compliance Desk</p>
          <p>Email: <a href="mailto:legal@buzzoraa.com" className="text-indigo-600 font-semibold hover:underline">legal@buzzoraa.com</a> / <a href="mailto:contact@buzzoraa.com" className="text-indigo-600 font-semibold hover:underline">contact@buzzoraa.com</a></p>
          <p>Phone: +91 98765 43210 (Mon – Sat, 9am – 7pm IST)</p>
          <p>Website: <a href="https://buzzoraa.com" target="_blank" className="text-indigo-600 font-semibold hover:underline">https://buzzoraa.com</a></p>
        </div>
      </>
    ),
  },
];

export default function TermsAndServicesPage() {
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
            <Scale className="h-4 w-4" style={{ color: "var(--primary)" }} />
            <span>Terms of Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Terms & Services
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Please review these terms and conditions governing the access and usage of Buzzoraa&apos;s Social Engagement &amp; GTM SaaS platform.
          </p>

          <div className="pt-2 flex items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" /> Effective Date: October 16, 2026
            </span>
            <span>•</span>
            <span>Global Applicability</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Core Principles Cards */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="h-9 w-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Clear Commitments</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Transparent service level agreements, uptime guarantees, and defined project scopes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="h-9 w-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">IP Ownership</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              You maintain 100% ownership of your community content, attendee data, and brand assets.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Fair Practices</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Straightforward billing, milestone approvals, and ethical community engagement guidelines.
            </p>
          </div>
        </div>

        {/* Detailed Terms Container */}
        <div className="space-y-8 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-12 shadow-sm">
          {TERMS_SECTIONS.map((sec) => (
            <div key={sec.id} id={sec.id} className="scroll-mt-24 space-y-3 pb-8 border-b border-slate-100 last:border-b-0 last:pb-0">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {sec.title}
              </h2>
              <div className="text-sm">{sec.content}</div>
            </div>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-12 p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">Need Custom Enterprise Terms or an MSA?</h3>
            <p className="text-xs text-slate-300">
              We offer customized Master Services Agreements (MSAs) and custom SLAs for corporate events.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white shadow-md active:scale-95 transition-transform shrink-0"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <Mail className="h-4 w-4" />
            <span>Contact Legal Team</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
