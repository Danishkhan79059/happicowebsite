import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Mail,
  Clock,
  Server,
  UserCheck,
  ChevronRight,
  Shield,
  ExternalLink,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Buzzoraa",
  description:
    "Learn how Buzzoraa collects, protects, and uses your personal and platform data with enterprise-grade privacy and security standards.",
};

const SECTIONS = [
  {
    id: "overview",
    number: "01",
    title: "Overview & Commitment",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          Buzzoraa (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) respects your privacy and is dedicated to protecting the personal information you share with us. This Privacy Policy outlines our standards and practices regarding the collection, storage, usage, and disclosure of your data when you visit our website, use our Social Engagement &amp; GTM SaaS platform, or book demos.
        </p>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          We adhere to globally recognized privacy standards including GDPR and applicable Indian Information Technology (IT) regulations. We never sell your personal information to third-party data brokers.
        </p>
      </div>
    ),
  },
  {
    id: "information-collected",
    number: "02",
    title: "Information We Collect",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          We collect information that you provide directly to us, as well as data gathered automatically when you interact with our services:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1 flex items-center gap-1.5">
              <UserCheck className="h-3.5 w-3.5" />
              <span>Direct Account Information</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full name, professional work email, telephone/WhatsApp number, job title, company or community organization name, and password credentials.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 mb-1 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              <span>Event &amp; Campaign Data</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Event dates, attendee capacity, registration submissions, attendee survey responses, speaker bios, and sponsor collateral uploaded for marketing campaigns.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              <span>Inquiry &amp; Support Records</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transcripts of inquiry messages, feedback forms, and support requests exchanged with our solutions team.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-1 flex items-center gap-1.5">
              <Server className="h-3.5 w-3.5" />
              <span>Device &amp; Telemetry Data</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              IP address, browser type, device identifiers, operating system, pages visited, time spent, and referring URLs collected via secure cookies and analytical scripts.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "how-we-use-information",
    number: "03",
    title: "How We Use Your Information",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          We utilize the information collected strictly for legitimate business operations and delivering superior software services:
        </p>
        <div className="space-y-2.5">
          {[
            "Delivering, operating, and maintaining our software and community platforms.",
            "Executing customized multi-channel event marketing campaigns, ticket registration, and attendee communication.",
            "Sending critical transactional updates, demo calendar invitations, and service announcements.",
            "Integrating with enterprise tools (Salesforce, Slack, Tableau) upon your authorization.",
            "Protecting against unauthorized transactions, fraud, spam, and security breaches.",
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "event-community-data",
    number: "04",
    title: "Event & Community Attendee Data Handling",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          When we run marketing campaigns for event organizers and communities, data governance is paramount:
        </p>
        <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs sm:text-sm text-indigo-950 space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-indigo-950 font-bold mb-0.5">Organizer Ownership</strong>
              <span>Attendee lists and registration data collected for a specific event remain the exclusive property of the event organizer.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-indigo-950 font-bold mb-0.5">Explicit Opt-In Consent</strong>
              <span>Attendees are provided transparent opt-in checkboxes before their information is shared with sponsors or community partners.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-indigo-950 font-bold mb-0.5">Zero Cross-Selling</strong>
              <span>We never harvest attendee lists from one community to cross-market unrelated commercial products or competitor events.</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "data-protection",
    number: "05",
    title: "Data Security & Encryption",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          We implement rigorous technical and organizational safeguards to ensure data security at every layer:
        </p>
        <ul className="space-y-2 text-slate-700 text-xs sm:text-sm list-disc pl-5">
          <li>All web traffic is encrypted end-to-end using TLS 1.3 / SSL encryption.</li>
          <li>Database volumes and confidential records are encrypted at rest using AES-256 standard.</li>
          <li>Access to client data is strictly restricted via role-based access control (RBAC) and multi-factor authentication (MFA).</li>
          <li>Regular vulnerability assessments and automated audit trails.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "third-party",
    number: "06",
    title: "Third-Party Integrations & Service Providers",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          To provide high-performance solutions, we collaborate with trusted enterprise infrastructure providers:
        </p>
        <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
          These include cloud infrastructure (Vercel, AWS), CRM &amp; messaging ecosystems (Salesforce, Slack Technologies), analytics suites (Tableau / Salesforce Data Cloud), and video conferencing (Google Meet, Zoom). All service providers are bound by strict Data Processing Agreements (DPAs) preventing them from using your data for independent purposes.
        </p>
      </div>
    ),
  },
  {
    id: "your-rights",
    number: "07",
    title: "Your Rights & Choices",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          You retain full authority over your personal information:
        </p>
        <ul className="space-y-2 text-slate-700 text-xs sm:text-sm list-disc pl-5">
          <li><strong>Right to Access:</strong> You may request a copy of the personal data we store about you.</li>
          <li><strong>Right to Rectification:</strong> You can ask us to correct inaccurate or outdated information.</li>
          <li><strong>Right to Erasure (Be Forgotten):</strong> You may request the permanent deletion of your data, subject to legal recordkeeping obligations.</li>
          <li><strong>Opt-Out of Communications:</strong> Every promotional email includes an instant one-click unsubscribe mechanism.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "cookies",
    number: "08",
    title: "Cookies & Tracking Technologies",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
          We use essential cookies to maintain user sessions, remember theme preferences, and prevent malicious attacks. Analytics cookies are utilized solely to understand aggregated page performance and optimize usability. You can adjust cookie preferences at any time through your browser settings.
        </p>
      </div>
    ),
  },
  {
    id: "contact-dpo",
    number: "09",
    title: "Contact Our Privacy Team",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
          If you have questions, concerns, or requests regarding this Privacy Policy or your data, please contact our Data Protection Office:
        </p>
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
          <p className="font-bold text-slate-900 text-sm">Buzzoraa Privacy &amp; Data Protection Desk</p>
          <p>
            Email:{" "}
            <a href="mailto:privacy@buzzoraa.com" className="text-indigo-600 font-semibold hover:underline">
              privacy@buzzoraa.com
            </a>{" "}
            /{" "}
            <a href="mailto:contact@buzzoraa.com" className="text-indigo-600 font-semibold hover:underline">
              contact@buzzoraa.com
            </a>
          </p>
          <p>
            Website:{" "}
            <a href="https://buzzoraa.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:underline">
              https://buzzoraa.com
            </a>
          </p>
          <p className="text-slate-500 font-medium">Response SLA: Within 48 business hours</p>
        </div>
      </div>
    ),
  },
];

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="h-4 w-4 text-indigo-600" />
            <span>Legal &amp; Data Protection</span>
            <span className="text-slate-300">|</span>
            <span className="text-indigo-600 font-semibold">GDPR &amp; IT Act Compliant</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Privacy Policy
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Your trust is our highest priority. Learn how we collect, protect, and respect your personal information across all Buzzoraa services.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>Last Updated: October 16, 2026</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              <span>Applies to all Global Users</span>
            </span>
          </div>
        </div>
      </section>

      {/* =======================================================================
          MAIN CONTENT WITH CLEAN TOC & CONTENT SECTIONS
         ======================================================================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Quick Highlights 3-Card Grid */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
            <div className="h-10 w-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 shadow-xs">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Never Sold</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We never sell, rent, or trade your personal or attendee data to third-party data brokers.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
            <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 shadow-xs">
              <Server className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Encrypted by Default</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              All communications and stored databases are secured with TLS 1.3 and AES-256 standards.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
            <div className="h-10 w-10 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3 shadow-xs">
              <UserCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Full Control</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Request data export, correction, or permanent account deletion anytime with ease.
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
                  9 Sections
                </span>
              </div>

              <nav className="space-y-1">
                {SECTIONS.map((sec) => (
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
                Need a signed Data Processing Agreement (DPA)?{" "}
                <Link href="/contact" className="text-indigo-600 font-bold hover:underline">
                  Contact our compliance team
                </Link>
                .
              </div>
            </div>
          </aside>

          {/* Right Column: Detailed Policy Sections (8 cols) */}
          <main className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-12 shadow-xl divide-y divide-slate-100 space-y-8">
              {SECTIONS.map((sec) => (
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

            {/* Bottom Contact / Assistance Banner */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-slate-800">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-white">Have a Privacy Question or Data Request?</h3>
                <p className="text-xs sm:text-sm text-slate-300 font-normal">
                  Our privacy desk is happy to assist you with compliance inquiries, GDPR rights, or custom DPAs.
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
                <span>Contact Privacy Desk</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
