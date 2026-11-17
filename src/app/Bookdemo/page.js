"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Iridescence from "@/components/Iridescence";
import FadeContent from "@/components/FadeContent";
import LogoLoop from "@/components/LogoLoop";
import {
  Calendar as CalendarIcon,
  Clock,
  Globe,
  Video,
  CheckCircle2,
  Sparkles,
  User,
  Mail,
  Phone,
  Building2,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Check,
  Loader2,
  AlertCircle,
  Users,
  MessageSquare,
  RefreshCw,
  Zap,
  MessageCircle,
  X,
} from "lucide-react";
import {
  FaSalesforce,
  FaSlack,
  FaGithub,
  FaDiscord,
  FaDocker,
  FaReact,
  FaProductHunt,
  FaFigma,
  FaLinkedin,
} from "react-icons/fa6";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiVercel,
} from "react-icons/si";

// Standard business hours slots
const ALL_TIME_SLOTS = [
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Country code options
const COUNTRY_CODES = [
  { code: "+91", label: "🇮🇳 +91 (India)" },
  { code: "+1", label: "🇺🇸 +1 (US / Canada)" },
  { code: "+44", label: "🇬🇧 +44 (UK)" },
  { code: "+61", label: "🇦🇺 +61 (Australia)" },
  { code: "+65", label: "🇸🇬 +65 (Singapore)" },
  { code: "+971", label: "🇦🇪 +971 (UAE)" },
  { code: "+49", label: "🇩🇪 +49 (Germany)" },
  { code: "+33", label: "🇫🇷 +33 (France)" },
];

// Ecosystem partner logos for LogoLoop
const ECOSYSTEM_LOGOS = [
  { node: <FaSalesforce />, title: "Salesforce", href: "https://salesforce.com", hoverColor: "#00a1e0" },
  { node: <FaSlack />, title: "Slack", href: "https://slack.com", hoverColor: "#e01e5a" },
  { node: <FaGithub />, title: "GitHub", href: "https://github.com", hoverColor: "#ffffff" },
  { node: <FaDiscord />, title: "Discord", href: "https://discord.com", hoverColor: "#5865f2" },
  { node: <FaProductHunt />, title: "Product Hunt", href: "https://producthunt.com", hoverColor: "#da552f" },
  { node: <FaDocker />, title: "Docker", href: "https://docker.com", hoverColor: "#2496ed" },
  { node: <FaReact />, title: "React", href: "https://react.dev", hoverColor: "#61dafb" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org", hoverColor: "#ffffff" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://typescriptlang.org", hoverColor: "#3178c6" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com", hoverColor: "#38bdf8" },
  { node: <FaFigma />, title: "Figma", href: "https://figma.com", hoverColor: "#f24e1e" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://postgresql.org", hoverColor: "#336791" },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com", hoverColor: "#ffffff" },
];

function BookDemoContent() {
  const searchParams = useSearchParams();

  // Prefill from URL query params if present
  const initialName = searchParams.get("name") || "";
  const initialEmail = searchParams.get("email") || "";
  const initialPhone = searchParams.get("phone") || searchParams.get("phoneNumber") || "";
  const initialCompany = searchParams.get("company") || "";

  // Date selection states
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [currentMonthDate, setCurrentMonthDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    // If weekend, pick next Monday
    if (d.getDay() === 6) d.setDate(d.getDate() + 2);
    else if (d.getDay() === 0) d.setDate(d.getDate() + 1);
    else d.setDate(d.getDate() + 1);
    return d;
  });

  const [selectedSlot, setSelectedSlot] = useState("10:30 AM");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [availableSlots, setAvailableSlots] = useState(ALL_TIME_SLOTS);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Booking Flow Steps: 1 = Date & Slot selection, 2 = Guest Details form, 3 = Confirmation
  const [step, setStep] = useState(1);

  // Form Fields - Complete requested specifications
  const [fullName, setFullName] = useState(initialName);
  const [companyName, setCompanyName] = useState(initialCompany);
  const [businessEmail, setBusinessEmail] = useState(initialEmail);
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState(initialPhone);
  const [teamSize, setTeamSize] = useState("1-10");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [timezone] = useState("Asia/Kolkata (IST)");

  // Phone number (10 digits) & Description (max 100 words) handlers
  const MAX_DESCRIPTION_WORDS = 100;

  const getWordCount = (text) => {
    if (!text) return 0;
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).filter(Boolean).length;
  };

  const descriptionWordCount = useMemo(() => getWordCount(description), [description]);

  const handleDescriptionChange = (e) => {
    const val = e.target.value;
    const count = getWordCount(val);
    if (count <= MAX_DESCRIPTION_WORDS) {
      setDescription(val);
    } else {
      // Clamps to max 100 words if pasting large text
      const words = val.trim().split(/\s+/).filter(Boolean).slice(0, MAX_DESCRIPTION_WORDS);
      setDescription(words.join(" "));
    }
  };

  const handlePhoneChange = (e) => {
    // Only allow digits (0-9) and strictly maximum 10 digits
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(digits);
  };

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Calendly Modal State
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  // Format date helper (YYYY-MM-DD)
  const formatDateISO = (d) => {
    if (!d) return "";
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const selectedDateStr = useMemo(() => formatDateISO(selectedDate), [selectedDate]);

  // Fetch available slots for the selected date from backend API
  useEffect(() => {
    let isMounted = true;
    const fetchAvailableSlots = async () => {
      if (!selectedDateStr) return;
      setLoadingSlots(true);
      try {
        const res = await fetch(`/api/demo/available-slots?date=${selectedDateStr}`);
        const data = await res.json();
        if (isMounted && data.success) {
          setBookedSlots(data.bookedSlots || []);
          setAvailableSlots(data.availableSlots || []);
          // Auto select first available slot if currently selected slot is taken
          if (data.availableSlots && data.availableSlots.length > 0) {
            if (!data.availableSlots.includes(selectedSlot)) {
              setSelectedSlot(data.availableSlots[0]);
            }
          }
        }
      } catch (err) {
        console.warn("Could not fetch slots from API:", err);
      } finally {
        if (isMounted) setLoadingSlots(false);
      }
    };

    fetchAvailableSlots();
    return () => {
      isMounted = false;
    };
  }, [selectedDateStr]);

  // Calendar calculations
  const calendarGrid = useMemo(() => {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const totalDays = lastDayOfMonth.getDate();

    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const days = [];

    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }

    for (let day = 1; day <= totalDays; day++) {
      const d = new Date(year, month, day);
      d.setHours(0, 0, 0, 0);

      const isPast = d < today;
      const isToday = d.getTime() === today.getTime();
      const isSelected = selectedDate && d.getTime() === selectedDate.getTime();
      const isSunday = d.getDay() === 0;

      days.push({
        day,
        date: d,
        isCurrentMonth: true,
        isPast,
        isToday,
        isSelected,
        isSunday,
      });
    }

    return days;
  }, [currentMonthDate, today, selectedDate]);

  // Navigate months
  const handlePrevMonth = () => {
    const prev = new Date(
      currentMonthDate.getFullYear(),
      currentMonthDate.getMonth() - 1,
      1
    );
    if (
      prev.getFullYear() < today.getFullYear() ||
      (prev.getFullYear() === today.getFullYear() &&
        prev.getMonth() < today.getMonth())
    ) {
      return;
    }
    setCurrentMonthDate(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(
      currentMonthDate.getFullYear(),
      currentMonthDate.getMonth() + 1,
      1
    );
    setCurrentMonthDate(next);
  };

  // Select Date
  const handleSelectDate = (dateObj) => {
    if (dateObj.isPast || dateObj.isSunday) return;
    setSelectedDate(dateObj.date);
  };

  // Form submit to Backend API: /api/demo/book
  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    // Frontend Validations
    if (!fullName.trim()) {
      setStatusMessage({ type: "error", text: "Please enter your Full Name." });
      return;
    }
    if (!companyName.trim()) {
      setStatusMessage({ type: "error", text: "Please enter your Company Name." });
      return;
    }
    if (!businessEmail.trim()) {
      setStatusMessage({ type: "error", text: "Please enter your Business Email." });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(businessEmail.trim())) {
      setStatusMessage({ type: "error", text: "Please enter a valid business email address." });
      return;
    }
    const phoneDigits = phoneNumber.replace(/\D/g, "");
    if (!phoneDigits) {
      setStatusMessage({ type: "error", text: "Please enter your 10-digit Phone Number." });
      return;
    }
    if (phoneDigits.length !== 10) {
      setStatusMessage({
        type: "error",
        text: `Phone Number must be exactly 10 digits (currently ${phoneDigits.length} digits entered).`,
      });
      return;
    }
    if (descriptionWordCount > MAX_DESCRIPTION_WORDS) {
      setStatusMessage({
        type: "error",
        text: `Description must not exceed 100 words (currently ${descriptionWordCount}/100 words).`,
      });
      return;
    }
    if (!linkedinUrl.trim()) {
      setStatusMessage({ type: "error", text: "Please enter your LinkedIn Profile URL." });
      return;
    }
    if (!selectedSlot) {
      setStatusMessage({ type: "error", text: "Please pick an available time slot." });
      return;
    }

    setSubmitting(true);

    try {
      const fullPhone = phoneNumber.startsWith("+")
        ? phoneNumber.trim()
        : `${countryCode} ${phoneNumber.trim()}`;

      const payload = {
        fullName: fullName.trim(),
        companyName: companyName.trim(),
        businessEmail: businessEmail.trim().toLowerCase(),
        phoneNumber: fullPhone,
        teamSize,
        linkedinUrl: linkedinUrl.trim(),
        companyWebsite: companyWebsite.trim(),
        description: description.trim(),
        preferredDate: selectedDateStr,
        timeSlot: selectedSlot,
        timezone: "Asia/Kolkata (IST)",
      };

      const response = await fetch("/api/demo/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setConfirmedBooking(result.booking);
        setStep(3); // Success Screen
      } else {
        setStatusMessage({
          type: "error",
          text: result.error || "Unable to reserve slot. Please select another time.",
        });
      }
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: "Network error: Unable to connect to server. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Helper for human readable date formatting
  const formattedDisplayDate = useMemo(() => {
    if (!selectedDate) return "";
    return selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [selectedDate]);

  return (
    <div className="relative min-h-screen text-slate-900 selection:bg-indigo-500 selection:text-white pb-24">
      {/* Background with Iridescence matching website design */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <Iridescence
          color="#6366f1"
          hueShift={0}
          saturation={1}
          brightness={1.3}
          contrast={1.1}
          speed={0.7}
          scale={1}
          detail={8}
          warp={1}
          rotation={0}
          mouseReact={true}
          amplitude={0.12}
          stir={0.45}
          sheen={0.3}
          clickSwirl={true}
          grain={0.02}
          fade={0}
        />
        <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />
      </div>

      {/* TOP HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/40 to-white border-b border-slate-200/60">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <FadeContent effect="fade" blur={true} duration={1} delay={0.05} trigger="mount" className="space-y-6">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs sm:text-sm font-bold shadow-2xs backdrop-blur-md transition-colors"
              style={{
                borderColor: "color-mix(in srgb, var(--primary) 35%, transparent)",
                backgroundColor: "color-mix(in srgb, var(--primary) 8%, white)",
                color: "var(--primary)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: "var(--primary)" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: "var(--primary)" }}
                />
              </span>
              <span>Buzzoraa Live Product Walkthrough • Automatic Google Meet Integration</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12]">
              Experience{" "}
              <span
                className="text-transparent bg-clip-text transition-all duration-300"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--primary) 0%, #8b5cf6 50%, var(--secondary, #06b6d4) 100%)",
                }}
              >
                Buzzoraa
              </span>{" "}
              in Real Action.
            </h1>

            <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Book a personalized 1-on-1 demo with our engineering &amp; product team. Select your preferred date &amp; time slot in Asia/Kolkata (IST), and receive an instant calendar invite with a real Google Meet video conference link.
            </p>

            <div className="pt-1 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsCalendlyOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 transition-all duration-200 shadow-2xs hover:scale-102 cursor-pointer"
              >
                <CalendarIcon className="w-3.5 h-3.5 text-indigo-600" />
                <span>Prefer Official Calendly? Open Modal</span>
                <ExternalLink className="w-3 h-3 text-indigo-500" />
              </button>

              <a
                href="https://wa.me/919799472445?text=Hello%20Buzzoraa%20Team%2C%20I%20would%20like%20to%20schedule%20a%20product%20demo."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-all duration-200 shadow-2xs hover:scale-102"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Urgent? Ask on WhatsApp</span>
              </a>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-600">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>30-min tailored architecture walkthrough</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Instant Google Meet room invite</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Double-booking protected slot reservation</span>
              </div>
            </div>
          </FadeContent>
        </div>
      </section>

      {/* MAIN SCHEDULER BOX */}
      <section className="relative -mt-6 sm:-mt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <FadeContent effect="focus" blur={true} duration={1} threshold={0.15}>
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
              {/* Left Column: Meeting Info & Host Details (4 cols on lg) */}
              <div className="lg:col-span-4 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-200/80 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/50 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Host Info */}
                  <div className="flex items-center gap-3.5">
                    <div
                      className="relative w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-md shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--primary, #6366f1) 0%, var(--secondary, #06b6d4) 100%)",
                      }}
                    >
                      <span>BZ</span>
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-base font-bold text-slate-900">
                          Buzzoraa Demo Team
                        </h2>
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        Social Engagement &amp; GTM Specialists
                      </p>
                    </div>
                  </div>

                  {/* Meeting Meta Details */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-slate-700 text-sm font-semibold">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>30 Minutes Duration</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-700 text-sm font-semibold">
                      <Video className="w-4 h-4 text-slate-400" />
                      <span>Google Meet (Automated Calendar Event)</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-700 text-sm font-semibold">
                      <Globe className="w-4 h-4 text-slate-400" />
                      <span className="truncate">Timezone: Asia/Kolkata (IST)</span>
                    </div>
                  </div>

                  {/* What we will cover */}
                  <div className="pt-4 border-t border-slate-200/70 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      What to expect in this demo
                    </h3>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Live walkthrough of Buzzoraa core modules &amp; capabilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Custom architecture review for your business requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Instant Google Meet invite dispatched to both parties</span>
                      </li>
                    </ul>
                  </div>

                  {/* Selected Slot Preview pill */}
                  {selectedDate && selectedSlot && step === 2 && (
                    <div
                      className="p-3.5 rounded-2xl border text-xs space-y-1 shadow-2xs"
                      style={{
                        backgroundColor: "var(--primary-light, #eef2ff)",
                        borderColor: "rgba(99, 102, 241, 0.2)",
                      }}
                    >
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4 text-indigo-600" />
                        <span>Selected Schedule:</span>
                      </div>
                      <div className="text-indigo-950 font-semibold pl-5">
                        {formattedDisplayDate}
                      </div>
                      <div className="text-indigo-700 font-medium pl-5">
                        {selectedSlot} (Asia/Kolkata IST)
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Need help?</span>
                  <Link href="/contact" className="text-indigo-600 font-bold hover:underline">
                    Contact Solutions Desk
                  </Link>
                </div>
              </div>

              {/* Right Column: Step 1 (Date & Time) OR Step 2 (Form) OR Step 3 (Confirmed) */}
              <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between">
                {/* STEP 1: DATE & SLOT SELECTION */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div>
                        <h2 className="text-lg font-bold text-slate-900">
                          Select a Date &amp; Time Slot
                        </h2>
                        <p className="text-xs text-slate-500">
                          Times displayed in Asia/Kolkata (IST). Past slots and booked dates are automatically locked.
                        </p>
                      </div>

                      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
                        <span className="px-2.5 py-1 bg-white rounded-lg shadow-2xs text-slate-900 font-bold">
                          Step 1 of 2
                        </span>
                        <span className="px-2 text-slate-400">Date &amp; Slot</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      {/* Calendar Section (7 cols on md) */}
                      <div className="md:col-span-7 space-y-4">
                        {/* Month Navigation */}
                        <div className="flex items-center justify-between px-2">
                          <span className="text-sm font-bold text-slate-800">
                            {MONTH_NAMES[currentMonthDate.getMonth()]}{" "}
                            {currentMonthDate.getFullYear()}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={handlePrevMonth}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                              title="Previous Month"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={handleNextMonth}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                              title="Next Month"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Day Name Headers */}
                        <div className="grid grid-cols-7 gap-1 text-center">
                          {DAYS_OF_WEEK.map((day) => (
                            <div
                              key={day}
                              className="text-[11px] font-bold text-slate-400 uppercase py-1"
                            >
                              {day}
                            </div>
                          ))}
                        </div>

                        {/* Calendar Days Grid */}
                        <div className="grid grid-cols-7 gap-1">
                          {calendarGrid.map((item, idx) => {
                            if (!item.isCurrentMonth) {
                              return (
                                <div
                                  key={`empty-${idx}`}
                                  className="h-10 w-full"
                                />
                              );
                            }

                            const disabled = item.isPast || item.isSunday;

                            return (
                              <button
                                key={`day-${item.day}`}
                                type="button"
                                disabled={disabled}
                                onClick={() => handleSelectDate(item)}
                                className={`h-10 w-full rounded-xl text-xs font-semibold flex flex-col items-center justify-center transition-all duration-150 relative ${
                                  item.isSelected
                                    ? "text-white shadow-md font-bold scale-105"
                                    : disabled
                                      ? "text-slate-300 cursor-not-allowed bg-slate-50/50"
                                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                                }`}
                                style={{
                                  backgroundColor: item.isSelected
                                    ? "var(--primary, #6366f1)"
                                    : undefined,
                                }}
                              >
                                <span>{item.day}</span>
                                {item.isToday && !item.isSelected && (
                                  <span
                                    className="w-1 h-1 rounded-full"
                                    style={{
                                      backgroundColor: "var(--primary, #6366f1)",
                                    }}
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 px-1 border-t border-slate-100">
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: "var(--primary, #6366f1)",
                              }}
                            />
                            Selected
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-slate-300" />
                            Sundays Closed
                          </span>
                        </div>
                      </div>

                      {/* Time Slots Section (5 cols on md) */}
                      <div className="md:col-span-5 space-y-3 flex flex-col">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">
                            Available Slots (IST):
                          </span>
                          {loadingSlots && (
                            <RefreshCw className="w-3.5 h-3.5 text-slate-400 animate-spin" />
                          )}
                        </div>

                        <div className="text-xs font-semibold text-slate-500">
                          {formattedDisplayDate}
                        </div>

                        {/* Time Slots List */}
                        <div className="flex-1 overflow-y-auto max-h-[310px] pr-1 space-y-2 custom-scrollbar">
                          {ALL_TIME_SLOTS.map((slot) => {
                            const isAvailable = availableSlots.includes(slot);
                            const isBooked = bookedSlots.includes(slot);
                            const isSelected = selectedSlot === slot;

                            return (
                              <button
                                key={slot}
                                type="button"
                                disabled={!isAvailable}
                                onClick={() => setSelectedSlot(slot)}
                                className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all duration-150 border ${
                                  isSelected
                                    ? "text-white shadow-md border-transparent scale-101"
                                    : !isAvailable
                                      ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through"
                                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50 cursor-pointer"
                                }`}
                                style={{
                                  backgroundColor: isSelected
                                    ? "var(--primary, #6366f1)"
                                    : undefined,
                                }}
                              >
                                <span className="flex items-center gap-2">
                                  <Clock className="w-3.5 h-3.5 opacity-70" />
                                  <span>{slot}</span>
                                </span>
                                {!isAvailable ? (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-500 font-semibold no-underline">
                                    {isBooked ? "Booked" : "Unavailable"}
                                  </span>
                                ) : isSelected ? (
                                  <span className="text-[11px] flex items-center gap-1 font-bold">
                                    <Check className="w-3.5 h-3.5" />
                                    Selected
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-slate-400 font-medium">
                                    30m
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Proceed to details button */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-xs text-slate-500">
                        Selected:{" "}
                        <strong className="text-slate-800">
                          {formattedDisplayDate} at {selectedSlot}
                        </strong>
                      </div>

                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-all duration-200 hover:scale-102 active:scale-98 cursor-pointer"
                        style={{
                          backgroundColor: "var(--primary, #6366f1)",
                          boxShadow: "0 8px 20px var(--primary-glow, rgba(99, 102, 241, 0.25))",
                        }}
                      >
                        <span>Next: Enter Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: GUEST DETAILS FORM */}
                {step === 2 && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-1 cursor-pointer"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Back to Date &amp; Time</span>
                        </button>
                        <h2 className="text-lg font-bold text-slate-900">
                          Enter Booking Details
                        </h2>
                      </div>

                      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
                        <span className="px-2.5 py-1 bg-white rounded-lg shadow-2xs text-slate-900 font-bold">
                          Step 2 of 2
                        </span>
                        <span className="px-2 text-slate-400">Confirm Demo</span>
                      </div>
                    </div>

                    {/* Selected Slot banner */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-700">
                        <CalendarDays className="w-4 h-4 text-indigo-600" />
                        <span>
                          <strong>{formattedDisplayDate}</strong> at{" "}
                          <strong>{selectedSlot}</strong> (30 mins IST)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
                      >
                        Change Slot
                      </button>
                    </div>

                    {/* Form with all required fields */}
                    <form onSubmit={handleSubmitBooking} className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* Full Name */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            <span>Full Name *</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Alex Morgan"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                          />
                        </div>

                        {/* Company Name */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            <span>Company Name *</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="e.g. Acme Innovations Inc."
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* Business Email */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span>Business Email *</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={businessEmail}
                            onChange={(e) => setBusinessEmail(e.target.value)}
                            placeholder="alex@acme.com"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                          />
                        </div>

                        {/* Phone Number with country code & 10-digit validation */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              <span>Phone Number *</span>
                            </label>
                            <span
                              className={`text-[10px] font-mono font-semibold ${
                                phoneNumber.length === 10
                                  ? "text-emerald-600 font-bold"
                                  : phoneNumber.length > 0
                                  ? "text-amber-600 font-bold"
                                  : "text-slate-400"
                              }`}
                            >
                              {phoneNumber.length === 10
                                ? "✓ 10 digits verified"
                                : `${phoneNumber.length}/10 digits`}
                            </span>
                          </div>
                          <div className="flex gap-1.5">
                            <select
                              value={countryCode}
                              onChange={(e) => setCountryCode(e.target.value)}
                              className="px-2.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                            >
                              {COUNTRY_CODES.map((c) => (
                                <option key={c.code} value={c.code}>
                                  {c.code}
                                </option>
                              ))}
                            </select>
                            <input
                              type="tel"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              maxLength={10}
                              required
                              value={phoneNumber}
                              onChange={handlePhoneChange}
                              placeholder="9876543210 (10 digits only)"
                              className={`flex-1 px-3 py-2 rounded-xl border text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all bg-white ${
                                phoneNumber.length === 10
                                  ? "border-emerald-400 focus:ring-emerald-500"
                                  : phoneNumber.length > 0
                                  ? "border-amber-400 focus:ring-amber-500"
                                  : "border-slate-300 focus:ring-indigo-500"
                              }`}
                            />
                          </div>
                          {phoneNumber.length > 0 && phoneNumber.length < 10 && (
                            <p className="text-[10px] font-medium text-amber-600 mt-0.5">
                              ⚠️ Please enter exactly 10 digits ({10 - phoneNumber.length} remaining).
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* Team Size */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-slate-400" />
                            <span>Team Size *</span>
                          </label>
                          <select
                            value={teamSize}
                            onChange={(e) => setTeamSize(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          >
                            <option value="1-10">1 - 10 people</option>
                            <option value="11-50">11 - 50 people</option>
                            <option value="51-200">51 - 200 people</option>
                            <option value="200+">200+ Enterprise</option>
                          </select>
                        </div>

                        {/* LinkedIn Profile URL */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <FaLinkedin className="w-3.5 h-3.5 text-blue-600" />
                            <span>LinkedIn Profile URL *</span>
                          </label>
                          <input
                            type="url"
                            required
                            value={linkedinUrl}
                            onChange={(e) => setLinkedinUrl(e.target.value)}
                            placeholder="https://linkedin.com/in/alexmorgan"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                          />
                        </div>
                      </div>

                      {/* Company Website (Optional) */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-slate-400" />
                          <span>Company Website (Optional)</span>
                        </label>
                        <input
                          type="url"
                          value={companyWebsite}
                          onChange={(e) => setCompanyWebsite(e.target.value)}
                          placeholder="https://acme.com"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                        />
                      </div>

                      {/* Brief Description / Requirements (Max 100 words, spaces preserved) */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                            <span>Brief Description / Requirements</span>
                          </label>
                          <span
                            className={`text-[10px] font-mono font-bold ${
                              descriptionWordCount >= 100
                                ? "text-rose-600"
                                : descriptionWordCount >= 85
                                ? "text-amber-600"
                                : "text-slate-400"
                            }`}
                          >
                            {descriptionWordCount} / 100 words
                          </span>
                        </div>
                        <textarea
                          rows={3}
                          value={description}
                          onChange={handleDescriptionChange}
                          spellCheck={true}
                          autoCorrect="on"
                          autoCapitalize="sentences"
                          placeholder="Tell us what you'd like to achieve with Buzzoraa, current workflows, or specific questions (max 100 words)..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none bg-white"
                        />
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>Spaces and words format naturally.</span>
                          {descriptionWordCount >= 100 && (
                            <span className="text-rose-600 font-semibold">100-word limit reached</span>
                          )}
                        </div>
                      </div>

                      {/* Status Alert */}
                      {statusMessage && (
                        <div
                          className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                            statusMessage.type === "error"
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}
                        >
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{statusMessage.text}</span>
                        </div>
                      )}

                      {/* Submit Button */}
                      <div className="pt-2 flex items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          Back
                        </button>

                        <button
                          type="submit"
                          disabled={submitting}
                          className="flex-1 py-3 px-6 rounded-xl text-xs font-bold text-white shadow-xl flex items-center justify-center gap-2 transition-all duration-200 hover:scale-101 active:scale-99 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                          style={{
                            backgroundColor: "var(--primary, #6366f1)",
                            boxShadow: "0 10px 24px var(--primary-glow, rgba(99, 102, 241, 0.25))",
                          }}
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Generating Google Meet &amp; Reserving Slot...</span>
                            </>
                          ) : (
                            <>
                              <span>Confirm Booking &amp; Generate Google Meet</span>
                              <Check className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* STEP 3: BOOKING CONFIRMED */}
                {step === 3 && confirmedBooking && (
                  <div className="space-y-6 text-center py-6">
                    <div
                      className="w-16 h-16 mx-auto rounded-3xl flex items-center justify-center text-white shadow-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      }}
                    >
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                        Demo Meeting Confirmed! 🎉
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                        A Google Calendar invitation with your real Google Meet link has been sent to{" "}
                        <strong className="text-slate-900">{confirmedBooking.email}</strong>.
                      </p>
                    </div>

                    {/* Summary Card */}
                    <div className="max-w-md mx-auto bg-slate-50 rounded-2xl border border-slate-200 p-5 text-left space-y-3 shadow-xs">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                        <span className="text-xs font-bold text-slate-500">
                          Reservation Details
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          Status: {confirmedBooking.status || "CONFIRMED"}
                        </span>
                      </div>

                      <div className="text-xs space-y-2 text-slate-700">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Customer:</span>
                          <span className="font-bold text-slate-900">{confirmedBooking.fullName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Company:</span>
                          <span className="font-bold text-slate-900">{confirmedBooking.companyName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Date:</span>
                          <span className="font-bold text-indigo-700">{confirmedBooking.bookingDateStr}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Time Slot (IST):</span>
                          <span className="font-bold text-indigo-700">{confirmedBooking.timeSlot} (Asia/Kolkata)</span>
                        </div>
                        {confirmedBooking.googleMeetUrl && (
                          <div className="pt-2 border-t border-slate-200">
                            <span className="text-slate-500 font-medium block mb-1">Google Meet Room:</span>
                            <a
                              href={confirmedBooking.googleMeetUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-emerald-600 hover:underline break-all block"
                            >
                              {confirmedBooking.googleMeetUrl}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      {confirmedBooking.googleMeetUrl && (
                        <a
                          href={confirmedBooking.googleMeetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-transform hover:scale-102"
                          style={{
                            backgroundColor: "var(--primary, #6366f1)",
                            boxShadow: "0 8px 20px var(--primary-glow, rgba(99, 102, 241, 0.25))",
                          }}
                        >
                          <Video className="w-4 h-4" />
                          <span>Join Google Meet</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setStep(1);
                          setConfirmedBooking(null);
                          setStatusMessage(null);
                          setFullName("");
                          setBusinessEmail("");
                          setPhoneNumber("");
                          setCompanyName("");
                          setLinkedinUrl("");
                          setCompanyWebsite("");
                          setDescription("");
                        }}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        Schedule Another Demo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Bottom Highlights */}
        <FadeContent effect="fade" blur={true} duration={1} delay={0.15} threshold={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-8">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-slate-200/90 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 shadow-sm shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Customized Architecture Walkthrough</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  We tailor the live session specifically around your tech stack, audience size &amp; business use-case.
                </p>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-slate-200/90 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-cyan-50 text-cyan-600 shadow-sm shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Asia/Kolkata (IST) Standard</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Time slots are synchronized in IST with real-time past slot locking and anti-collision validation.
                </p>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-slate-200/90 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Instant Google Meet &amp; DB Synced</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Automated calendar event creation generates real Google Meet rooms with Nodemailer dual notifications.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* ECOSYSTEM LOGOLOOP */}
      <section className="mt-20 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 text-center font-semibold">
            Integrates Out-of-the-Box With Your CRM, Communities &amp; Cloud Stack
          </p>
          <div className="relative w-full overflow-hidden py-3">
            <LogoLoop
              logos={ECOSYSTEM_LOGOS}
              speed={75}
              direction="left"
              logoHeight={34}
              gap={60}
              scaleOnHover={true}
              fadeOut={true}
              fadeOutWidth={0.15}
              labels="hover"
              ariaLabel="Buzzoraa Ecosystem Partners"
            />
          </div>
        </div>
      </section>

      {/* QUICK CTA BANNER */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-white text-center relative overflow-hidden bg-slate-950 border-t border-slate-800">
        <div
          className="absolute -top-32 right-10 h-80 w-80 rounded-full blur-[130px] opacity-25 pointer-events-none"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <div
          className="absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[130px] opacity-20 pointer-events-none"
          style={{ backgroundColor: "var(--secondary, #06b6d4)" }}
        />

        <div className="relative mx-auto max-w-3xl space-y-5">
          <FadeContent effect="fade" blur={true} duration={1} threshold={0.15}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold text-slate-200 border border-white/10 shadow-inner">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span>Looking for Custom Enterprise Deployment?</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              Ready to Turn Conversations Into Growth?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto font-normal mt-2">
              Speak with our solution architects to plan your community hackathons, social engagement engines, or custom integrations.
            </p>
            <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: "var(--primary)",
                  boxShadow: "0 10px 24px var(--primary-glow)",
                }}
              >
                <Mail className="h-4 w-4" />
                <span>Contact Solutions Desk</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/919799472445?text=Hello%20Buzzoraa%20Team%2C%20I%20would%20like%20to%20discuss%20a%20demo%20or%20enterprise%20plan."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-md transition-all active:scale-95 hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Us Directly</span>
              </a>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-200 border border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all"
              >
                <span>Compare Pricing Tiers</span>
              </Link>
            </div>
          </FadeContent>
        </div>
      </section>

      {/* CALENDLY POPUP MODAL */}
      {isCalendlyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-bold">Calendly Official Scheduler</span>
              </div>
              <button
                type="button"
                onClick={() => setIsCalendlyOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <CalendarIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Schedule via External Calendly Desk
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                You can schedule directly using the calendar form right on this page, or open our external calendar link.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white shadow-md"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  <span>Open Calendly in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsCalendlyOpen(false)}
                  className="px-5 py-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Use Built-in Scheduler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookDemoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex items-center gap-3 text-slate-500 font-semibold text-sm">
            <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
            <span>Loading Buzzoraa Scheduler...</span>
          </div>
        </div>
      }
    >
      <BookDemoContent />
    </Suspense>
  );
}
