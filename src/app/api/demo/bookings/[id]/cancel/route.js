import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import DemoBooking from "@/models/DemoBooking";
import { deleteGoogleCalendarEvent } from "@/lib/googleCalendar";
import { verifyAdminAuth } from "../../route";

/**
 * PATCH /api/demo/bookings/:id/cancel
 * Cancels a demo booking, updates its status in the database to CANCELLED,
 * and removes or cancels the associated Google Calendar event.
 */
export async function PATCH(request, context) {
  try {
    const authCheck = verifyAdminAuth(request);
    if (!authCheck.authorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access: Valid Admin credentials required." },
        { status: 401 }
      );
    }

    const { params } = context;
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Booking ID is required" },
        { status: 400 }
      );
    }

    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        { success: false, error: "Database not connected" },
        { status: 503 }
      );
    }

    const booking = await DemoBooking.findById(id);

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    if (booking.status === "CANCELLED" || booking.status === "cancelled") {
      return NextResponse.json(
        { success: true, message: "Booking is already cancelled", booking },
        { status: 200 }
      );
    }

    // Cancel Google Calendar event if event ID exists
    let calendarCancellation = { skipped: true };
    if (booking.googleCalendarEventId) {
      calendarCancellation = await deleteGoogleCalendarEvent(booking.googleCalendarEventId);
    }

    // Update status in database
    booking.status = "CANCELLED";
    await booking.save();

    return NextResponse.json({
      success: true,
      message: "Booking and Google Calendar event cancelled successfully",
      booking,
      calendarCancellation,
    });
  } catch (error) {
    console.error("PATCH /api/demo/bookings/:id/cancel error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to cancel booking" },
      { status: 500 }
    );
  }
}
