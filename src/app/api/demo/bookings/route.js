import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import DemoBooking from "@/models/DemoBooking";

/**
 * Authentication helper for Admin endpoints
 * Checks for Bearer token or ADMIN_API_KEY header
 */
export function verifyAdminAuth(request) {
  const adminKey = process.env.ADMIN_API_KEY || process.env.ADMIN_SECRET;

  // In local development or if no ADMIN_API_KEY set, allow with warning or require a key if configured
  if (!adminKey) {
    return { authorized: true, note: "No ADMIN_API_KEY set in environment" };
  }

  const authHeader = request.headers.get("authorization") || "";
  const apiKeyHeader = request.headers.get("x-api-key") || "";

  const token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : "";

  if (token === adminKey || apiKeyHeader === adminKey) {
    return { authorized: true };
  }

  return { authorized: false };
}

/**
 * GET /api/demo/bookings
 * Fetch list of bookings with optional filtering (status, date, limit, page)
 * Admin-protected
 */
export async function GET(request) {
  try {
    const authCheck = verifyAdminAuth(request);
    if (!authCheck.authorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access: Valid Admin credentials required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const dateStr = searchParams.get("date");
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);

    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        { success: false, error: "Database connection unavailable", bookings: [] },
        { status: 503 }
      );
    }

    const filter = {};
    if (status) {
      filter.status = status.toUpperCase();
    }
    if (dateStr) {
      filter.bookingDateStr = dateStr;
    }

    const skip = (page - 1) * limit;

    const [bookings, totalCount] = await Promise.all([
      DemoBooking.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      DemoBooking.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      totalCount,
      page,
      limit,
      bookings,
    });
  } catch (error) {
    console.error("GET /api/demo/bookings error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings list" },
      { status: 500 }
    );
  }
}
