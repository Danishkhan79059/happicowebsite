import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import DemoBooking from "@/models/DemoBooking";
import { sendDemoBookingNotification } from "@/lib/mailer";


/**
 * GET: Retrieve booked slots for a specific date
 * Query param: ?date=YYYY-MM-DD
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get("date");

    if (!dateStr) {
      return NextResponse.json(
        { success: true, bookedSlots: [] },
        { status: 200 }
      );
    }

    const conn = await connectToDatabase();
    if (!conn) {
      // If DB is not connected yet, return empty list so UI continues to function smoothly
      return NextResponse.json({
        success: true,
        bookedSlots: [],
        note: "MongoDB not connected. All default slots are open.",
      });
    }

    const bookings = await DemoBooking.find({
      bookingDateStr: dateStr,
      status: { $ne: "cancelled" },
    }).select("timeSlot");

    const bookedSlots = bookings.map((b) => b.timeSlot);

    return NextResponse.json({
      success: true,
      date: dateStr,
      bookedSlots,
    });
  } catch (error) {
    console.error("GET /api/book-demo error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch slots", bookedSlots: [] },
      { status: 500 }
    );
  }
}

/**
 * POST: Create a new demo booking
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phoneNumber = "",
      companyName = "",
      country = "India",
      teamSize = "1-10",
      bookingDateStr,
      timeSlot,
      timezone = "Asia/Kolkata (IST)",
      notes = "",
    } = body;

    // Basic Validations
    if (!fullName || !email || !bookingDateStr || !timeSlot) {
      return NextResponse.json(
        {
          success: false,
          error: "Full name, email, booking date, and time slot are required.",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Prepare booking object
    const bookingDate = new Date(`${bookingDateStr}T12:00:00Z`);
    const bookingPayload = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      companyName: companyName.trim(),
      country: country.trim(),
      teamSize,
      bookingDate,
      bookingDateStr,
      timeSlot,
      timezone,
      duration: "30 mins",
      notes: notes.trim(),
      status: "confirmed",
      meetingType: "Google Meet",
      meetingLink: "https://meet.google.com/happico-demo-live",
    };

    let savedBooking = null;
    let dbStatus = "saved";

    // Attempt MongoDB save
    const conn = await connectToDatabase();
    if (conn) {
      // Check if slot is already booked
      const existing = await DemoBooking.findOne({
        bookingDateStr,
        timeSlot,
        status: { $ne: "cancelled" },
      });

      if (existing) {
        return NextResponse.json(
          {
            success: false,
            error: `The ${timeSlot} slot on ${bookingDateStr} has already been reserved. Please pick another available time slot.`,
          },
          { status: 409 }
        );
      }

      savedBooking = await DemoBooking.create(bookingPayload);
      console.log(`✅ [MongoDB]: Saved demo booking id=${savedBooking._id} for ${email}`);
    } else {
      console.warn("⚠️ [Demo Booking]: MongoDB URI not set. Proceeding in mock mode.");
      dbStatus = "simulated (add MONGODB_URI to .env.local to persist)";
      savedBooking = {
        _id: `temp_${Date.now()}`,
        ...bookingPayload,
        createdAt: new Date(),
      };
    }

    // Send email notification (user confirmation + admin alert)
    const emailResult = await sendDemoBookingNotification(savedBooking);

    return NextResponse.json(
      {
        success: true,
        message:
          "Demo scheduled successfully! A calendar invitation and confirmation email have been sent.",
        booking: savedBooking,
        dbStatus,
        emailResult,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/book-demo error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error.message ||
          "An unexpected error occurred while scheduling your demo. Please try again.",
      },
      { status: 500 }
    );
  }
}
