import mongoose from "mongoose";

const DemoBookingSchema = new mongoose.Schema(
  {
    // Customer Details
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Business email address is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    teamSize: {
      type: String,
      required: [true, "Team size is required"],
      trim: true,
      default: "1-10",
    },
    linkedinUrl: {
      type: String,
      required: [true, "LinkedIn profile URL is required"],
      trim: true,
    },
    websiteUrl: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },

    // Meeting Schedule
    bookingDate: {
      type: Date,
      required: [true, "Booking date is required"],
    },
    bookingDateStr: {
      type: String,
      required: [true, "Booking date string is required (YYYY-MM-DD)"],
      index: true,
    },
    timeSlot: {
      type: String,
      required: [true, "Time slot is required"],
      trim: true,
    },
    timezone: {
      type: String,
      default: "Asia/Kolkata (IST)",
    },
    duration: {
      type: String,
      default: "30 mins",
    },

    // Google Calendar & Meet Integration
    googleCalendarEventId: {
      type: String,
      default: null,
      index: true,
    },
    googleMeetUrl: {
      type: String,
      default: null,
    },

    // Booking Status: PENDING, CONFIRMED, FAILED, CANCELLED
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "FAILED", "CANCELLED", "confirmed", "cancelled"],
      default: "CONFIRMED",
      uppercase: true,
      index: true,
    },

    // Email Notification Status
    emailNotificationStatus: {
      type: String,
      enum: ["SENT", "FAILED", "PENDING", "SKIPPED"],
      default: "PENDING",
    },
    emailNotificationError: {
      type: String,
      default: null,
    },

    // Legacy fields for backward compatibility
    meetingType: {
      type: String,
      default: "Video Conference (Google Meet)",
    },
    meetingLink: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "India",
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index to prevent double bookings on active bookings
// (Excludes CANCELLED/cancelled and FAILED bookings)
DemoBookingSchema.index(
  { bookingDateStr: 1, timeSlot: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: { $in: ["CONFIRMED", "PENDING", "confirmed"] },
    },
  }
);

// Prevent re-compilation of the model during Next.js hot reloads
const DemoBooking =
  mongoose.models.DemoBooking ||
  mongoose.model("DemoBooking", DemoBookingSchema);

export default DemoBooking;
