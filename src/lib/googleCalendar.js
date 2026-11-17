import { google } from "googleapis";

/**
 * Returns an authenticated Google OAuth2 client for Google Calendar API
 */
export function getGoogleOAuth2Client() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || "https://developers.google.com/oauthplayground";
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  return oauth2Client;
}

/**
 * Helper to parse time slot like "10:30 AM" and date string "YYYY-MM-DD"
 * in Asia/Kolkata timezone (IST is UTC+5:30)
 */
export function getISTStartAndEndTimes(bookingDateStr, timeSlot, durationMinutes = 30) {
  // Parse slot string, e.g. "10:30 AM" or "02:00 PM"
  const [time, modifier] = timeSlot.trim().split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const pad = (n) => String(n).padStart(2, "0");

  // Construct start date string in ISO format with +05:30 offset
  const startISO = `${bookingDateStr}T${pad(hours)}:${pad(minutes)}:00+05:30`;

  // Calculate end time
  const startDate = new Date(startISO);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

  // Convert endDate back to +05:30 representation
  // IST offset is +330 minutes
  const istOffsetMs = 5.5 * 60 * 60 * 1000;
  const istEndDate = new Date(endDate.getTime() + istOffsetMs);
  const endYear = istEndDate.getUTCFullYear();
  const endMonth = pad(istEndDate.getUTCMonth() + 1);
  const endDay = pad(istEndDate.getUTCDate());
  const endHours = pad(istEndDate.getUTCHours());
  const endMinutes = pad(istEndDate.getUTCMinutes());
  const endSeconds = pad(istEndDate.getUTCSeconds());

  const endISO = `${endYear}-${endMonth}-${endDay}T${endHours}:${endMinutes}:${endSeconds}+05:30`;

  return {
    startDateTime: startISO,
    endDateTime: endISO,
    startDate,
    endDate,
  };
}

/**
 * Create a real Google Calendar Event with Google Meet conference link
 */
export async function createGoogleCalendarEvent({
  fullName,
  email,
  companyName,
  bookingDateStr,
  timeSlot,
  description = "",
  teamSize = "",
  linkedinUrl = "",
  websiteUrl = "",
  phoneNumber = "",
}) {
  const oauth2Client = getGoogleOAuth2Client();

  if (!oauth2Client) {
    console.warn(
      "⚠️ [Google Calendar]: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, or GOOGLE_REFRESH_TOKEN not configured. Skipping Calendar creation."
    );
    return {
      success: false,
      reason: "Google OAuth credentials not configured in environment variables",
    };
  }

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const { startDateTime, endDateTime } = getISTStartAndEndTimes(bookingDateStr, timeSlot, 30);

  const companyEmail =
    process.env.COMPANY_MEETING_EMAIL ||
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.EMAIL_USER;

  const attendees = [{ email: email.trim() }];
  if (companyEmail && companyEmail !== email) {
    attendees.push({ email: companyEmail.trim() });
  }

  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

  const eventSummary = `Demo Meeting: ${fullName}${companyName ? ` (${companyName})` : ""} | Buzzoraa`;
  const eventDescription = `
Product Demo & Technical Walkthrough

Prospect Details:
• Name: ${fullName}
• Email: ${email}
• Company: ${companyName || "N/A"}
• Phone: ${phoneNumber || "N/A"}
• Team Size: ${teamSize || "N/A"}
• LinkedIn: ${linkedinUrl || "N/A"}
• Website: ${websiteUrl || "N/A"}

Requirements / Notes:
${description || "None provided"}

Timezone: Asia/Kolkata (IST)
`.trim();

  try {
    const calendarResponse = await calendar.events.insert({
      calendarId,
      conferenceDataVersion: 1,
      sendUpdates: "all",
      requestBody: {
        summary: eventSummary,
        description: eventDescription,
        start: {
          dateTime: startDateTime,
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: endDateTime,
          timeZone: "Asia/Kolkata",
        },
        attendees,
        conferenceData: {
          createRequest: {
            requestId: crypto.randomUUID(),
            conferenceSolutionKey: {
              type: "hangoutsMeet",
            },
          },
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 },
            { method: "popup", minutes: 15 },
          ],
        },
      },
    });

    const event = calendarResponse.data;
    const eventId = event.id;

    // Check conference creation status & find Google Meet entry point
    const conferenceData = event.conferenceData;
    let meetUrl = null;

    if (conferenceData && conferenceData.entryPoints) {
      const videoEntry = conferenceData.entryPoints.find(
        (ep) => ep.entryPointType === "video"
      );
      if (videoEntry && videoEntry.uri) {
        meetUrl = videoEntry.uri;
      }
    }

    if (!meetUrl && event.hangoutLink) {
      meetUrl = event.hangoutLink;
    }

    const statusCode = conferenceData?.createRequest?.status?.statusCode;
    if (statusCode && statusCode !== "success" && !meetUrl) {
      console.warn(
        `⚠️ [Google Calendar]: Conference creation status is "${statusCode}". Meet link pending or failed.`
      );
    }

    return {
      success: true,
      eventId,
      meetUrl,
      conferenceStatusCode: statusCode || (meetUrl ? "success" : "pending"),
      htmlLink: event.htmlLink,
    };
  } catch (error) {
    console.error("❌ [Google Calendar Error]: Failed to create event:", error?.message || error);
    return {
      success: false,
      error: error?.message || "Failed to create Google Calendar event",
    };
  }
}

/**
 * Cancel a Google Calendar Event by Event ID
 */
export async function deleteGoogleCalendarEvent(eventId) {
  if (!eventId) return { success: false, reason: "No eventId provided" };

  const oauth2Client = getGoogleOAuth2Client();
  if (!oauth2Client) {
    return { success: false, reason: "Google OAuth credentials not configured" };
  }

  try {
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

    await calendar.events.delete({
      calendarId,
      eventId,
      sendUpdates: "all",
    });

    return { success: true };
  } catch (error) {
    console.error("❌ [Google Calendar Delete Error]:", error?.message || error);
    return { success: false, error: error?.message || "Failed to delete event" };
  }
}
