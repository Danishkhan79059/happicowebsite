import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import DemoBooking from "@/models/DemoBooking";

// Standard business hours slots (Asia/Kolkata IST)
export const ALL_TIME_SLOTS = [
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

/**
 * Helper to check if a slot on dateStr is in the past in Asia/Kolkata timezone
 */
export function isSlotInPast(dateStr, timeSlot) {
  try {
    const [time, modifier] = timeSlot.trim().split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const pad = (n) => String(n).padStart(2, "0");
    const slotISO = `${dateStr}T${pad(hours)}:${pad(minutes)}:00+05:30`;
    const slotDate = new Date(slotISO);

    // Current time
    const now = new Date();
    return slotDate.getTime() <= now.getTime();
  } catch (err) {
    return false;
  }
}

/**
 * GET: Retrieve available time slots for a specific date (Asia/Kolkata IST)
 * Query: ?date=YYYY-MM-DD
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get("date");

    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return NextResponse.json(
        {
          success: false,
          error: "A valid date in format YYYY-MM-DD is required as a query parameter (?date=YYYY-MM-DD)",
          availableSlots: [],
          bookedSlots: [],
        },
        { status: 400 }
      );
    }

    // Verify day is not Sunday (Sundays closed)
    const [y, m, d] = dateStr.split("-").map(Number);
    const targetDate = new Date(Date.UTC(y, m - 1, d));
    const dayOfWeek = targetDate.getUTCDay();

    if (dayOfWeek === 0) {
      return NextResponse.json({
        success: true,
        date: dateStr,
        availableSlots: [],
        bookedSlots: ALL_TIME_SLOTS,
        message: "We are closed on Sundays.",
      });
    }

    const conn = await connectToDatabase();
    let bookedSlots = [];

    if (conn) {
      const activeBookings = await DemoBooking.find({
        bookingDateStr: dateStr,
        status: { $in: ["CONFIRMED", "PENDING", "confirmed"] },
      }).select("timeSlot");

      bookedSlots = activeBookings.map((b) => b.timeSlot);
    }

    // Filter available slots: must not be booked and must not be in the past
    const availableSlots = ALL_TIME_SLOTS.filter((slot) => {
      if (bookedSlots.includes(slot)) return false;
      if (isSlotInPast(dateStr, slot)) return false;
      return true;
    });

    return NextResponse.json({
      success: true,
      date: dateStr,
      timezone: "Asia/Kolkata (IST)",
      allSlots: ALL_TIME_SLOTS,
      bookedSlots,
      availableSlots,
    });
  } catch (error) {
    console.error("GET /api/demo/available-slots error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve available slots",
        availableSlots: [],
        bookedSlots: [],
      },
      { status: 500 }
    );
  }
}
