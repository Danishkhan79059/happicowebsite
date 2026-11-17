import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";
import { sendSubscriberWelcomeEmail } from "@/lib/mailer";

// In-memory fallback if MongoDB connection is not available in development
const inMemorySubscribers = new Set();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const body = await request.json();
    const rawEmail = body?.email;

    if (!rawEmail || typeof rawEmail !== "string") {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    const email = rawEmail.trim().toLowerCase();

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    let isNewSubscriber = true;

    // 1. Save / Update in MongoDB
    try {
      const db = await connectToDatabase();
      if (db) {
        const existingSubscriber = await Subscriber.findOne({ email });

        if (existingSubscriber) {
          isNewSubscriber = false;
          if (existingSubscriber.status !== "active") {
            existingSubscriber.status = "active";
            await existingSubscriber.save();
          }
        } else {
          await Subscriber.create({
            email,
            source: "footer",
            status: "active",
            subscribedAt: new Date(),
          });
        }
      } else {
        // Fallback in-memory
        if (inMemorySubscribers.has(email)) {
          isNewSubscriber = false;
        } else {
          inMemorySubscribers.add(email);
        }
      }
    } catch (dbError) {
      console.warn("⚠️ [Subscribe DB Warning]: Failed to save to database:", dbError.message);
      // Fallback in-memory on error
      if (inMemorySubscribers.has(email)) {
        isNewSubscriber = false;
      } else {
        inMemorySubscribers.add(email);
      }
    }

    // 2. Dispatch Welcome & "What We Do" Email from the configured .env email
    let mailResult = { sent: false };
    try {
      mailResult = await sendSubscriberWelcomeEmail(email);
    } catch (mailError) {
      console.error("❌ [Subscribe Mail Error]:", mailError.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: isNewSubscriber
          ? "🎉 Welcome to Buzzoraa! We've sent complete details to your email."
          : "✨ Welcome back! We've resent our introductory details to your email.",
        emailSent: mailResult.sent || mailResult.simulated || false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ [POST /api/subscribe Error]:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
