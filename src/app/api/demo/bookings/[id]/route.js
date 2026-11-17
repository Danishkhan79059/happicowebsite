import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import DemoBooking from "@/models/DemoBooking";
import { verifyAdminAuth } from "../route";

/**
 * GET /api/demo/bookings/:id
 * Retrieve single booking by its ID
 */
export async function GET(request, context) {
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

    const booking = await DemoBooking.findById(id).lean();

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("GET /api/demo/bookings/:id error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch booking details" },
      { status: 500 }
    );
  }
}
