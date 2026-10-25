import mongoose from "mongoose";

const DemoBookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: "",
    },
    companyName: {
      type: String,
      trim: true,
      default: "",
    },
    country: {
      type: String,
      trim: true,
      default: "India",
    },
    teamSize: {
      type: String,
      trim: true,
      default: "1-10",
    },
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
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["confirmed", "rescheduled", "cancelled", "completed"],
      default: "confirmed",
    },
    meetingType: {
      type: String,
      default: "Video Conference (Google Meet)",
    },
    meetingLink: {
      type: String,
      default: "https://meet.google.com/buzzoraa-demo-session",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation of the model during Next.js hot reloads
const DemoBooking =
  mongoose.models.DemoBooking ||
  mongoose.model("DemoBooking", DemoBookingSchema);

export default DemoBooking;
