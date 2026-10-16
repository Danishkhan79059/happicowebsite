import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/mailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      organization,
      inquiryType,
      eventScale,
      timeline,
      message,
    } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields (Name, Email, Message)." },
        { status: 400 }
      );
    }

    // Try sending email notification (will log if SMTP is not configured)
    let emailResult = { sent: false };
    try {
      emailResult = await sendContactNotification({
        fullName,
        email,
        phone,
        organization,
        inquiryType: inquiryType || "General Inquiry",
        eventScale: eventScale || "Not Specified",
        timeline: timeline || "Flexible",
        message,
      });
    } catch (mailErr) {
      console.warn("Contact email dispatch skipped/failed:", mailErr.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been received successfully! Our team will respond within 2 hours.",
        emailSent: emailResult?.sent || false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
