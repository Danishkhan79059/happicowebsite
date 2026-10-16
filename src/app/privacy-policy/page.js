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
  HelpCircle,
  Clock,
  Server,
  UserCheck,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Happico",
  description:
    "Learn how Happico and Vivaansh Consulting collect, protect, and use your personal and event data with enterprise-grade privacy and security standards.",
};

const SECTIONS = [
  {
    id: "overview",
    title: "1. Overview & Commitment",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed mb-4">
          Happico (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), operated in association with Vivaansh Consulting, respects your privacy and is dedicated to protecting the personal information you share with us. This Privacy Policy outlines our standards and practices regarding the collection, storage, usage, and disclosure of your data when you visit our website, use our community platform, book demos, or engage our event marketing services.
        </p>
        <p className="text-slate-600 leading-relaxed">
          We adhere to globally recognized privacy standards including GDPR and applicable Indian Information Technology (IT) regulations. We never sell your personal information to third-party data brokers.
        </p>
      </>
    ),
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed mb-3">
          We collect information that you provide directly to us, as well as data gathered automatically when you interact with our services:
        </p>
        <ul className="space-y-2.5 text-slate-600 text-sm list-disc pl-5 mb-4">
          <li>
            <strong className="text-slate-800">Direct Contact & Account Information:</strong> Full name, professional work email, telephone/WhatsApp number, job title, company or community organization name, and password credentials.
          </li>
          <li>
            <strong className="text-slate-800">Event & Campaign Information:</strong> Event dates, attendee capacity, registration submissions, attendee survey responses, speaker bios, and sponsor collateral uploaded for marketing campaigns.
          </li>
          <li>
            <strong className="text-slate-800">Communication & Inquiry Records:</strong> Transcripts of inquiry messages, feedback forms, and support requests exchanged with our team.
          </li>
          <li>
            <strong className="text-slate-800">Technical & Device Telemetry:</strong> IP address, browser type, device identifiers, operating system, pages visited, time spent, and referring URLs collected via secure cookies and analytical scripts.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "3. How We Use Your Information",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed mb-3">
          We utilize the information collected for legitimate business purposes, including:
        </p>
        <ul className="space-y-2 text-slate-600 text-sm list-disc pl-5 mb-4">
          <li>Delivering, operating, and maintaining our software and community platforms.</li>
          <li>Executing customized multi-channel event marketing campaigns, ticket registration, and attendee communication.</li>
          <li>Sending critical transactional updates, demo calendar invitations, and service announcements.</li>
          <li>Integrating with enterprise tools (Salesforce, Slack, Tableau) upon your authorization.</li>
          <li>Protecting against unauthorized transactions, fraud, spam, and security breaches.</li>
        </ul>
      </>
    ),
  },
  {
    id: "event-community-data",
    title: "4. Event & Community Attendee Data Handling",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed mb-3">
          When we run marketing campaigns for event organizers and communities:
        </p>
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-sm text-indigo-950 space-y-2">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
            <span>
              <strong>Organizer Ownership:</strong> Attendee lists and registration data collected for a specific event remain the property of the event organizer.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
            <span>
              <strong>Opt-In Consent:</strong> Attendees are provided transparent opt-in checkboxes before their information is shared with sponsors or community partners.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
            <span>
              <strong>No Cross-Selling:</strong> We never harvest attendee lists from one community to cross-market unrelated commercial products.
            </span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "data-protection",
    title: "5. Data Security & Encryption",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed mb-3">
          We implement rigorous technical and organizational safeguards to ensure data security:
        </p>
        <ul className="space-y-2 text-slate-600 text-sm list-disc pl-5">
          <li>All web traffic is encrypted end-to-end using TLS 1.3 / SSL encryption.</li>
          <li>Database volumes and confidential records are encrypted at rest using AES-256 standard.</li>
          <li>Access to client data is strictly restricted via role-based access control (RBAC) and multi-factor authentication (MFA).</li>
          <li>Regular vulnerability assessments and automated audit trails.</li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party",
    title: "6. Third-Party Integrations & Service Providers",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed mb-3">
          To provide high-performance solutions, we collaborate with trusted enterprise infrastructure providers:
        </p>
        <p className="text-slate-600 leading-relaxed text-sm">
          These include cloud infrastructure (Vercel, AWS), CRM & messaging ecosystems (Salesforce, Slack Technologies), analytics suites (Tableau / Salesforce Data Cloud), and video conferencing (Google Meet, Zoom). All service providers are bound by strict Data Processing Agreements (DPAs) preventing them from using your data for independent purposes.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "7. Your Rights & Choices",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed mb-3">
          You retain full authority over your personal information:
        </p>
        <ul className="space-y-2 text-slate-600 text-sm list-disc pl-5 mb-4">
          <li><strong>Right to Access:</strong> You may request a copy of the personal data we store about you.</li>
          <li><strong>Right to Rectification:</strong> You can ask us to correct inaccurate or outdated information.</li>
          <li><strong>Right to Erasure (Be Forgotten):</strong> You may request the permanent deletion of your data, subject to legal recordkeeping obligations.</li>
          <li><strong>Opt-Out of Communications:</strong> Every promotional email includes an instant one-click unsubscribe mechanism.</li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "8. Cookies & Tracking Technologies",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed text-sm">
          We use essential cookies to maintain user sessions, remember theme preferences, and prevent malicious attacks. Analytics cookies are utilized solely to understand aggregated page performance and optimize usability. You can adjust cookie preferences at any time through your browser settings.
        </p>
      </>
    ),
  },
  {
    id: "contact-dpo",
    title: "9. Contact Our Privacy Team",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed text-sm mb-3">
          If you have questions, concerns, or requests regarding this Privacy Policy or your data, please contact our Data Protection Office:
        </p>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 space-y-1">
          <p className="font-bold text-slate-900">Happico & Vivaansh Consulting Privacy Desk</p>
          <p>Email: <a href="mailto:privacy@happico.com" className="text-indigo-600 font-semibold hover:underline">privacy@happico.com</a> / <a href="mailto:contact@happico.com" className="text-indigo-600 font-semibold hover:underline">contact@happico.com</a></p>
          <p>Address: Tech Park, Sector 62, Noida, NCR, India - 201309</p>
          <p>Response SLA: Within 48 business hours</p>
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="h-4 w-4" style={{ color: "var(--primary)" }} />
            <span>Legal & Data Protection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Privacy Policy
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Your trust is our highest priority. Learn how we collect, protect, and respect your personal information across all Happico and Vivaansh Consulting services.
          </p>

          <div className="pt-2 flex items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" /> Last Updated: October 16, 2026
            </span>
            <span>•</span>
            <span>Applies to all Global Users</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Quick Highlights Box */}
        <div className="mb-12 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
            <Sparkles className="h-4 w-4" />
            <span>Key Privacy Principles at a Glance</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="h-8 w-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                <Lock className="h-4 w-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 mb-1">Never Sold</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                We never sell, rent, or trade your personal or attendee data to third parties.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <Server className="h-4 w-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 mb-1">Encrypted by Default</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                All communications and stored databases are secured with high-grade encryption.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                <UserCheck className="h-4 w-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 mb-1">Full Control</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Request data export, correction, or permanent account deletion anytime with ease.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Policy Sections */}
        <div className="space-y-8 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-12 shadow-sm">
          {SECTIONS.map((sec) => (
            <div key={sec.id} id={sec.id} className="scroll-mt-24 space-y-3 pb-8 border-b border-slate-100 last:border-b-0 last:pb-0">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {sec.title}
              </h2>
              <div className="text-sm">{sec.content}</div>
            </div>
          ))}
        </div>

        {/* Bottom Contact / Assistance Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">Have a Privacy Question or Data Request?</h3>
            <p className="text-xs text-slate-300">
              Our privacy desk is happy to assist you with compliance inquiries or custom DPAs.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white shadow-md active:scale-95 transition-transform shrink-0"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <Mail className="h-4 w-4" />
            <span>Contact Privacy Desk</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
