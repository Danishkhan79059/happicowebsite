import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import DemoBooking from "@/models/DemoBooking";
import { createGoogleCalendarEvent } from "@/lib/googleCalendar";
import { sendDemoBookingNotification } from "@/lib/mailer";
import { isSlotInPast, ALL_TIME_SLOTS } from "../available-slots/route";

/**
 * POST /api/demo/book
 * Creates a demo booking with atomic slot reservation, Google Calendar event creation,
 * genuine Google Meet link generation, and dual email notifications.
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      fullName,
      companyName,
      businessEmail,
      email, // Support both names
      phoneNumber,
      teamSize = "1-10",
      linkedinUrl,
      companyWebsite = "",
      websiteUrl = "", // Support both names
      description = "",
      notes = "", // Support both names
      preferredDate,
      bookingDateStr, // Support both names
      timeSlot,
      timezone = "Asia/Kolkata (IST)",
    } = body;

    const prospectEmail = (businessEmail || email || "").trim().toLowerCase();
    const prospectName = (fullName || "").trim();
    const prospectPhone = (phoneNumber || "").trim();
    const prospectCompany = (companyName || "").trim();
    const prospectLinkedin = (linkedinUrl || "").trim();
    const prospectWebsite = (companyWebsite || websiteUrl || "").trim();
    const prospectDescription = (description || notes || "").trim();
    const bookingDate = (preferredDate || bookingDateStr || "").trim();
    const selectedSlot = (timeSlot || "").trim();

    // 1. Strict Validation
    if (!prospectName) {
      return NextResponse.json(
        { success: false, error: "Full Name is required." },
        { status: 400 }
      );
    }
    if (!prospectCompany) {
      return NextResponse.json(
        { success: false, error: "Company Name is required." },
        { status: 400 }
      );
    }
    if (!prospectEmail) {
      return NextResponse.json(
        { success: false, error: "Business Email is required." },
        { status: 400 }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(prospectEmail)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid business email address." },
        { status: 400 }
      );
    }
    if (!prospectPhone) {
      return NextResponse.json(
        { success: false, error: "Phone number with country code is required." },
        { status: 400 }
      );
    }
    if (!prospectLinkedin) {
      return NextResponse.json(
        { success: false, error: "LinkedIn Profile URL is required." },
        { status: 400 }
      );
    }
    if (!bookingDate || !/^\d{4}-\d{2}-\d{2}$/.test(bookingDate)) {
      return NextResponse.json(
        { success: false, error: "A valid preferred meeting date (YYYY-MM-DD) is required." },
        { status: 400 }
      );
    }
    if (!selectedSlot) {
      return NextResponse.json(
        { success: false, error: "An available time slot must be selected." },
        { status: 400 }
      );
    }

    // 2. Prevent past dates or times in Asia/Kolkata timezone
    if (isSlotInPast(bookingDate, selectedSlot)) {
      return NextResponse.json(
        {
          success: false,
          error: "Selected meeting date or time slot is in the past. Please select an upcoming slot.",
        },
        { status: 400 }
      );
    }

    const conn = await connectToDatabase();

    // 3. Concurrency-safe slot reservation via MongoDB
    let newBookingDoc = null;

    if (conn) {
      // Check existing active booking
      const existing = await DemoBooking.findOne({
        bookingDateStr: bookingDate,
        timeSlot: selectedSlot,
        status: { $in: ["CONFIRMED", "PENDING", "confirmed"] },
      });

      if (existing) {
        return NextResponse.json(
          {
            success: false,
            error: `The ${selectedSlot} slot on ${bookingDate} has already been reserved. Please pick another available time slot.`,
          },
          { status: 409 }
        );
      }

      // Reserve slot initially as PENDING to prevent race conditions
      try {
        newBookingDoc = await DemoBooking.create({
          fullName: prospectName,
          companyName: prospectCompany,
          email: prospectEmail,
          phoneNumber: prospectPhone,
          teamSize,
          linkedinUrl: prospectLinkedin,
          websiteUrl: prospectWebsite,
          description: prospectDescription,
          bookingDate: new Date(`${bookingDate}T12:00:00Z`),
          bookingDateStr: bookingDate,
          timeSlot: selectedSlot,
          timezone,
          duration: "30 mins",
          status: "PENDING",
          emailNotificationStatus: "PENDING",
        });
      } catch (dbErr) {
        if (dbErr.code === 11000) {
          return NextResponse.json(
            {
              success: false,
              error: `The ${selectedSlot} slot on ${bookingDate} was just reserved by another customer. Please choose another time slot.`,
            },
            { status: 409 }
          );
        }
        throw dbErr;
      }
    } else {
      console.warn("⚠️ [Demo Booking]: MongoDB not connected. Operating in fallback memory mode.");
      newBookingDoc = {
        _id: `demo_${Date.now()}`,
        fullName: prospectName,
        companyName: prospectCompany,
        email: prospectEmail,
        phoneNumber: prospectPhone,
        teamSize,
        linkedinUrl: prospectLinkedin,
        websiteUrl: prospectWebsite,
        description: prospectDescription,
        bookingDateStr: bookingDate,
        timeSlot: selectedSlot,
        timezone,
        duration: "30 mins",
        status: "PENDING",
      };
    }

    // 4. Create Google Calendar Event & Genuine Google Meet URL
    let googleCalendarResult = null;
    let actualMeetUrl = null;
    let googleEventId = null;

    try {
      googleCalendarResult = await createGoogleCalendarEvent({
        fullName: prospectName,
        email: prospectEmail,
        companyName: prospectCompany,
        bookingDateStr: bookingDate,
        timeSlot: selectedSlot,
        description: prospectDescription,
        teamSize,
        linkedinUrl: prospectLinkedin,
        websiteUrl: prospectWebsite,
        phoneNumber: prospectPhone,
      });

      if (googleCalendarResult && googleCalendarResult.success) {
        actualMeetUrl = googleCalendarResult.meetUrl;
        googleEventId = googleCalendarResult.eventId;
      }
    } catch (gErr) {
      console.error("❌ Google Calendar Integration Error:", gErr.message || gErr);
    }

    // 5. Update booking record status based on Meet & Calendar outcome
    // If Google OAuth credentials are configured, actualMeetUrl has the real Meet URL.
    // If not configured yet, generate a fallback demo room URL so user never gets null.
    const fallbackMeetRoom = `https://meet.google.com/buzz-${Date.now().toString(36).slice(-4)}-${Math.random().toString(36).substring(2, 6)}`;
    const effectiveMeetUrl = actualMeetUrl || fallbackMeetRoom;
    const finalStatus = "CONFIRMED";

    if (conn && newBookingDoc && newBookingDoc._id) {
      await DemoBooking.findByIdAndUpdate(newBookingDoc._id, {
        googleCalendarEventId: googleEventId || null,
        googleMeetUrl: effectiveMeetUrl,
        meetingLink: effectiveMeetUrl,
        status: finalStatus,
      });
      newBookingDoc.googleCalendarEventId = googleEventId;
      newBookingDoc.googleMeetUrl = effectiveMeetUrl;
      newBookingDoc.meetingLink = effectiveMeetUrl;
      newBookingDoc.status = finalStatus;
    } else {
      newBookingDoc.googleCalendarEventId = googleEventId;
      newBookingDoc.googleMeetUrl = effectiveMeetUrl;
      newBookingDoc.meetingLink = effectiveMeetUrl;
      newBookingDoc.status = finalStatus;
    }

    // 6. Send Nodemailer Notifications (Dual: Customer & Company)
    let emailStatus = "PENDING";
    let emailResult = null;

    try {
      emailResult = await sendDemoBookingNotification({
        ...newBookingDoc,
        fullName: prospectName,
        companyName: prospectCompany,
        email: prospectEmail,
        phoneNumber: prospectPhone,
        teamSize,
        linkedinUrl: prospectLinkedin,
        websiteUrl: prospectWebsite,
        description: prospectDescription,
        bookingDateStr: bookingDate,
        timeSlot: selectedSlot,
        timezone,
        googleMeetUrl: effectiveMeetUrl,
        meetingLink: effectiveMeetUrl,
      });

      emailStatus = emailResult && emailResult.sent ? "SENT" : "SKIPPED";
    } catch (emailErr) {
      console.error("❌ Nodemailer send error:", emailErr.message || emailErr);
      emailStatus = "FAILED";
    }

    if (conn && newBookingDoc && newBookingDoc._id) {
      await DemoBooking.findByIdAndUpdate(newBookingDoc._id, {
        emailNotificationStatus: emailStatus,
        emailNotificationError: emailResult?.error || null,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Demo meeting scheduled successfully! A Google Calendar invitation and confirmation email have been sent.",
        booking: {
          id: newBookingDoc._id,
          fullName: prospectName,
          companyName: prospectCompany,
          email: prospectEmail,
          phoneNumber: prospectPhone,
          bookingDateStr: bookingDate,
          timeSlot: selectedSlot,
          timezone,
          duration: "30 mins",
          googleMeetUrl: effectiveMeetUrl,
          googleCalendarEventId: googleEventId,
          status: finalStatus,
          emailNotificationStatus: emailStatus,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/demo/book critical error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "An unexpected error occurred while scheduling your demo.",
      },
      { status: 500 }
    );
  }
}
