"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
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
} from "lucide-react";


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
    // Tomorrow as default or today if weekday
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
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Booking Flow Steps: 1 = Date & Slot selection, 2 = Guest Details form, 3 = Confirmation
  const [step, setStep] = useState(1);

  // Form Fields
  const [fullName, setFullName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phoneNumber, setPhoneNumber] = useState(initialPhone);
  const [companyName, setCompanyName] = useState(initialCompany);
  const [teamSize, setTeamSize] = useState("1-10");
  const [notes, setNotes] = useState("");
  const [timezone, setTimezone] = useState("Asia/Kolkata (IST)");

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Calendly Modal State
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  // Auto-detect browser timezone
  useEffect(() => {
    try {
      const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (userTz) {
        setTimezone(userTz);
      }
    } catch (e) {
      // fallback
    }
  }, []);

  // Format date helper (YYYY-MM-DD)
  const formatDateISO = (d) => {
    if (!d) return "";
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const selectedDateStr = useMemo(() => formatDateISO(selectedDate), [selectedDate]);

  // Fetch booked slots for the selected date from backend API
  useEffect(() => {
    let isMounted = true;
    const fetchBookedSlots = async () => {
      if (!selectedDateStr) return;
      setLoadingSlots(true);
      try {
        const res = await fetch(`/api/book-demo?date=${selectedDateStr}`);
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.bookedSlots)) {
          setBookedSlots(data.bookedSlots);
        }
      } catch (err) {
        console.warn("Could not fetch slots from API:", err);
      } finally {
        if (isMounted) setLoadingSlots(false);
      }
    };

    fetchBookedSlots();
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

    // Days in current month
    const totalDays = lastDayOfMonth.getDate();

    // Monday is index 0
    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const days = [];

    // Empty spaces for previous month offset
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }

    // Current month days
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
    // Don't go before current month
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
    // If current selected slot is already booked on this new date, reset slot
    if (bookedSlots.includes(selectedSlot)) {
      const firstAvailable = ALL_TIME_SLOTS.find(
        (s) => !bookedSlots.includes(s)
      );
      if (firstAvailable) setSelectedSlot(firstAvailable);
    }
  };

  // Form submit to Backend API
  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!fullName.trim() || !email.trim()) {
      setStatusMessage({
        type: "error",
        text: "Please provide both your name and email address.",
      });
      return;
    }

    if (!selectedSlot) {
      setStatusMessage({
        type: "error",
        text: "Please pick an available time slot.",
      });
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        fullName,
        email,
        phoneNumber,
        companyName,
        teamSize,
        bookingDateStr: selectedDateStr,
        timeSlot: selectedSlot,
        timezone,
        notes,
      };

      const response = await fetch("/api/book-demo", {
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

  // Google Calendar URL generator for step 3
  const googleCalendarUrl = useMemo(() => {
    if (!confirmedBooking) return "#";
    try {
      const [time, modifier] = confirmedBooking.timeSlot.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const [year, month, day] = confirmedBooking.bookingDateStr
        .split("-")
        .map(Number);
      const start = new Date(Date.UTC(year, month - 1, day, hours, minutes));
      const end = new Date(start.getTime() + 30 * 60 * 1000);

      const formatGDate = (d) =>
        d.toISOString().replace(/-|:|\.\d\d\d/g, "");

      const dates = `${formatGDate(start)}/${formatGDate(end)}`;
      const title = encodeURIComponent("Happico 1-on-1 Product Demo");
      const details = encodeURIComponent(
        `Personalized walkthrough of Happico platform.\nMeeting Link: ${confirmedBooking.meetingLink}`
      );
      const location = encodeURIComponent(confirmedBooking.meetingLink || "Google Meet");

      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    } catch {
      return "https://calendar.google.com";
    }
  }, [confirmedBooking]);

  return (
    <div className="min-h-screen bg-slate-50/70 pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[720px] h-[360px] blur-[140px] rounded-full opacity-20 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: "var(--primary, #6366f1)" }}
      />
      <div
        className="absolute top-96 right-10 w-[400px] h-[400px] blur-[150px] rounded-full opacity-15 pointer-events-none"
        style={{ backgroundColor: "var(--secondary, #06b6d4)" }}
      />

      <div className="relative max-w-6xl mx-auto space-y-8">
        {/* Top Header & Page Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white/90 shadow-2xs backdrop-blur-md">
            <span
              className="flex h-2 w-2 rounded-full animate-ping"
              style={{ backgroundColor: "var(--primary, #6366f1)" }}
            />
            <span className="text-xs font-bold text-slate-800">
              Happico Live Product Walkthrough
            </span>
            <span className="text-slate-300">|</span>
            <span
              className="text-xs font-semibold"
              style={{ color: "var(--primary, #6366f1)" }}
            >
              Calendly-Powered Experience
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Experience{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--primary, #6366f1) 0%, var(--secondary, #06b6d4) 100%)",
              }}
            >
              Happico
            </span>{" "}
            in Real Action.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Book an interactive 1-on-1 session tailored to your workflows. Pick your
            preferred date & time slot below, and get immediate instant calendar
            confirmation with meeting invite.
          </p>

          {/* Quick Option to Open Calendly Modal Directly */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsCalendlyOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 transition-all duration-150 shadow-2xs hover:scale-102"
            >
              <CalendarIcon className="w-3.5 h-3.5 text-indigo-600" />
              <span>Prefer Official Calendly? Open Modal</span>
              <ExternalLink className="w-3 h-3 text-indigo-500" />
            </button>
          </div>
        </div>

        {/* Main Interactive Scheduler Box */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
            {/* Left Column: Meeting Info & Host Details (4 cols on lg) */}
            <div className="lg:col-span-4 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-100 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/40 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Host Info */}
                <div className="flex items-center gap-3.5">
                  <div
                    className="relative w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-md"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--primary, #6366f1) 0%, var(--secondary, #06b6d4) 100%)",
                    }}
                  >
                    <span>HP</span>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-base font-bold text-slate-900">
                        Happico Demo Team
                      </h2>
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      Product Architecture & Solutions
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
                    <span>Google Meet / Video Conference</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-700 text-sm font-semibold">
                    <Globe className="w-4 h-4 text-slate-400" />
                    <span className="truncate">Timezone: {timezone}</span>
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
                      <span>Live walkthrough of Happico core modules & capabilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Custom architecture review for your business requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Direct Q&A with tech experts, transparent pricing & roadmap</span>
                    </li>
                  </ul>
                </div>

                {/* Selected Slot Preview pill */}
                {selectedDate && selectedSlot && step === 2 && (
                  <div
                    className="p-3.5 rounded-2xl border text-xs space-y-1 animate-in fade-in"
                    style={{
                      backgroundColor: "var(--primary-light, #eef2ff)",
                      borderColor: "rgba(99, 102, 241, 0.2)",
                    }}
                  >
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <CalendarDays className="w-4 h-4 text-indigo-600" />
                      <span>Selected Schedule:</span>
                    </div>
                    <div className="text-indigo-900 font-semibold pl-5">
                      {formattedDisplayDate}
                    </div>
                    <div className="text-indigo-700 font-medium pl-5">
                      {selectedSlot} ({timezone})
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Step 1 (Calendar + Slots) OR Step 2 (Form) OR Step 3 (Success) */}
            <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between">
              {/* ================= STEP 1: DATE & SLOT SELECTION ================= */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        Select a Date & Time
                      </h2>
                      <p className="text-xs text-slate-500">
                        Choose a day and time slot that fits your schedule
                      </p>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
                      <span className="px-2.5 py-1 bg-white rounded-lg shadow-2xs text-slate-900 font-bold">
                        Step 1 of 2
                      </span>
                      <span className="px-2 text-slate-400">Date & Slot</span>
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
                            onClick={handlePrevMonth}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            title="Previous Month"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleNextMonth}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
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
                              className={`h-10 w-full rounded-xl text-xs font-semibold flex flex-col items-center justify-center transition-all duration-150 relative ${item.isSelected
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
                          Available Slots for:
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
                          const isBooked = bookedSlots.includes(slot);
                          const isSelected = selectedSlot === slot;

                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={isBooked}
                              onClick={() => setSelectedSlot(slot)}
                              className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all duration-150 border ${isSelected
                                ? "text-white shadow-md border-transparent scale-101"
                                : isBooked
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
                              {isBooked ? (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-500 font-semibold no-underline">
                                  Booked
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
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-all duration-200 hover:scale-102 active:scale-98"
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

              {/* ================= STEP 2: GUEST DETAILS FORM ================= */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <button
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-1"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Back to Calendar</span>
                      </button>
                      <h2 className="text-lg font-bold text-slate-900">
                        Enter Your Details
                      </h2>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
                      <span className="px-2.5 py-1 bg-white rounded-lg shadow-2xs text-slate-900 font-bold">
                        Step 2 of 2
                      </span>
                      <span className="px-2 text-slate-400">Confirm</span>
                    </div>
                  </div>

                  {/* Slot banner */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <CalendarDays className="w-4 h-4 text-indigo-600" />
                      <span>
                        <strong>{formattedDisplayDate}</strong> at{" "}
                        <strong>{selectedSlot}</strong> (30 mins)
                      </span>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline"
                    >
                      Edit Slot
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmitBooking} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="space-y-1.5">
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>Work Email *</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>Phone / WhatsApp</span>
                        </label>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                      </div>

                      {/* Company Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>Company Name</span>
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Acme Innovations"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Team Size */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>Team Size</span>
                        </label>
                        <select
                          value={teamSize}
                          onChange={(e) => setTeamSize(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        >
                          <option value="1-10">1 - 10 people</option>
                          <option value="11-50">11 - 50 people</option>
                          <option value="51-200">51 - 200 people</option>
                          <option value="200+">200+ Enterprise</option>
                        </select>
                      </div>

                      {/* Timezone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-slate-400" />
                          <span>Timezone</span>
                        </label>
                        <input
                          type="text"
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                        <span>What specific features or workflows would you like to explore?</span>
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Tell us about your current challenges or what you want to achieve with Happico..."
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    {/* Status Alert */}
                    {statusMessage && (
                      <div
                        className={`p-3 rounded-xl text-xs flex items-center gap-2 ${statusMessage.type === "error"
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
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 py-3 px-6 rounded-xl text-xs font-bold text-white shadow-xl flex items-center justify-center gap-2 transition-all duration-200 hover:scale-101 active:scale-99 disabled:opacity-70 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: "var(--primary, #6366f1)",
                          boxShadow: "0 10px 24px var(--primary-glow, rgba(99, 102, 241, 0.25))",
                        }}
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Confirming & Saving to Database...</span>
                          </>
                        ) : (
                          <>
                            <span>Confirm & Schedule Demo</span>
                            <Check className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ================= STEP 3: BOOKING CONFIRMED ================= */}
              {step === 3 && confirmedBooking && (
                <div className="space-y-6 text-center py-6 animate-in zoom-in-95 duration-300">
                  <div
                    className="w-16 h-16 mx-auto rounded-3xl flex items-center justify-center text-white shadow-xl animate-bounce"
                    style={{
                      background:
                        "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    }}
                  >
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      You're Scheduled! 🎉
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                      A calendar invitation and confirmation email have been sent to{" "}
                      <strong className="text-slate-900">{confirmedBooking.email}</strong>.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="max-w-md mx-auto bg-slate-50 rounded-2xl border border-slate-200 p-5 text-left space-y-3 shadow-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                      <span className="text-xs font-bold text-slate-500">
                        Meeting Details
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                        Confirmed & Saved
                      </span>
                    </div>

                    <div className="text-xs space-y-2 text-slate-700">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        <span><strong>Name:</strong> {confirmedBooking.fullName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-slate-400" />
                        <span><strong>Date:</strong> {confirmedBooking.bookingDateStr}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span><strong>Time Slot:</strong> {confirmedBooking.timeSlot} ({confirmedBooking.timezone})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-slate-400" />
                        <span><strong>Room:</strong> Google Meet</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={googleCalendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-transform hover:scale-102"
                      style={{
                        backgroundColor: "var(--primary, #6366f1)",
                        boxShadow: "0 8px 20px var(--primary-glow, rgba(99, 102, 241, 0.25))",
                      }}
                    >
                      <CalendarIcon className="w-4 h-4" />
                      <span>Add to Google Calendar</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setConfirmedBooking(null);
                        setStatusMessage(null);
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      Schedule Another Demo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Highlights & FAQ Quick Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Customized Tailored Walkthrough</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                We adjust the presentation strictly around your tech stack & use-case.
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Global Timezone Friendly</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Our solutions engineering team accommodates APAC, EMEA, and Americas.
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Database & Email Synced</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Every booking is recorded to MongoDB with immediate email confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>


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
            <span>Loading Happico Scheduler...</span>
          </div>
        </div>
      }
    >
      <BookDemoContent />
    </Suspense>
  );
}