import nodemailer from "nodemailer";

// Create reusable transporter
function getTransporter() {
  const host = process.env.EMAIL_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.EMAIL_PORT || "587", 10);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.EMAIL_SECURE === "true" || port === 465,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Generate Google Calendar URL for one-click add
 */
function createGoogleCalendarUrl({ title, description, location, dateStr, timeSlot }) {
  try {
    // Parse time like "10:30 AM" into hours and minutes
    const [time, modifier] = timeSlot.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const [year, month, day] = dateStr.split("-").map(Number);
    const start = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 minutes duration

    const formatGDate = (d) =>
      d.toISOString().replace(/-|:|\.\d\d\d/g, "");

    const dates = `${formatGDate(start)}/${formatGDate(end)}`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${dates}&details=${encodeURIComponent(
      description
    )}&location=${encodeURIComponent(location)}`;
  } catch (err) {
    return "https://calendar.google.com";
  }
}

/**
 * Send Demo Booking Emails:
 * 1. To the Client (Confirmation with Google Meet link & Calendar invite)
 * 2. To Admin (Notification of incoming lead)
 */
export async function sendDemoBookingNotification(booking) {
  const {
    fullName,
    email,
    phoneNumber,
    companyName,
    country,
    bookingDateStr,
    timeSlot,
    timezone,
    notes,
    meetingLink,
  } = booking;

  const transporter = getTransporter();
  const fromEmail = process.env.EMAIL_FROM || '"Buzzoraa Team" <demo@buzzoraa.com>';
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.EMAIL_USER || "admin@buzzoraa.com";

  const googleCalUrl = createGoogleCalendarUrl({
    title: `Buzzoraa 1-on-1 Product Demo with ${fullName}`,
    description: `Personalized walkthrough of Buzzoraa platform.\nMeeting Link: ${meetingLink}\nBooked for: ${fullName} (${email})`,
    location: meetingLink,
    dateStr: bookingDateStr,
    timeSlot,
  });

  // Client Confirmation HTML
  const clientHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%); padding: 36px 30px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { margin: 8px 0 0; opacity: 0.95; font-size: 15px; }
          .content { padding: 32px 30px; }
          .greeting { font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #0f172a; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin: 20px 0; }
          .slot-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #e2e8f0; font-size: 14px; }
          .slot-row:last-child { border-bottom: none; }
          .label { color: #64748b; font-weight: 500; }
          .value { color: #0f172a; font-weight: 700; }
          .btn-primary { display: block; text-align: center; background: #6366f1; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 15px; margin: 24px 0 12px; }
          .btn-secondary { display: block; text-align: center; background: #eef2ff; color: #4f46e5 !important; text-decoration: none; padding: 12px 24px; border-radius: 12px; font-weight: 600; font-size: 14px; }
          .footer { background: #f1f5f9; padding: 20px 30px; text-align: center; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Demo Session Confirmed! 🎉</h1>
            <p>Your personalized Buzzoraa walkthrough is scheduled.</p>
          </div>
          <div class="content">
            <div class="greeting">Hi ${fullName},</div>
            <p style="color: #475569; line-height: 1.6;">
              Thank you for booking a demo with Buzzoraa. We're excited to show you how our Social Engagement &amp; Go-to-Market (GTM) SaaS platform turns conversations into sustainable growth.
            </p>

            <div class="card">
              <div class="slot-row">
                <span class="label">📅 Scheduled Date:</span>
                <span class="value">${bookingDateStr}</span>
              </div>
              <div class="slot-row">
                <span class="label">⏰ Time Slot:</span>
                <span class="value">${timeSlot} (${timezone})</span>
              </div>
              <div class="slot-row">
                <span class="label">⏳ Duration:</span>
                <span class="value">30 Minutes</span>
              </div>
              <div class="slot-row">
                <span class="label">📍 Location:</span>
                <span class="value">Google Meet / Video Call</span>
              </div>
            </div>

            <a href="${meetingLink}" class="btn-primary" target="_blank">
              🎥 Join Meeting Room
            </a>

            <a href="${googleCalUrl}" class="btn-secondary" target="_blank">
              📅 Add to Google Calendar
            </a>

            <div style="margin-top: 24px; padding: 14px; background: #eff6ff; border-radius: 10px; font-size: 13px; color: #1e40af;">
              💡 <strong>Tip:</strong> Please join 2 minutes before the call. Have your questions or team requirements ready for an interactive session!
            </div>
          </div>
          <div class="footer">
            Buzzoraa Inc. • Social Engagement &amp; Go-to-Market (GTM) SaaS<br/>
            Need to reschedule? Simply reply to this email.
          </div>
        </div>
      </body>
    </html>
  `;

  // Admin Notification HTML
  const adminHtml = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; background: #f1f5f9; padding: 20px; color: #334155;">
        <div style="max-width: 580px; margin: auto; background: white; border-radius: 16px; overflow: hidden; border: 1px solid #cbd5e1;">
          <div style="background: #0f172a; padding: 24px; color: white;">
            <h2 style="margin: 0; font-size: 20px; color: #67e8f9;">🚀 New Demo Booking Received</h2>
            <p style="margin: 6px 0 0; color: #94a3b8; font-size: 14px;">Buzzoraa Website Lead Generation</p>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b;">Prospect Name:</td><td style="padding: 10px 0; font-weight: bold; color: #0f172a;">${fullName}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b;">Email:</td><td style="padding: 10px 0; font-weight: bold;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b;">Phone:</td><td style="padding: 10px 0; font-weight: bold;">${phoneNumber || "Not provided"}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b;">Company:</td><td style="padding: 10px 0; font-weight: bold;">${companyName || "Not provided"}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b;">Country:</td><td style="padding: 10px 0;">${country || "India"}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b;">Date:</td><td style="padding: 10px 0; font-weight: bold; color: #4338ca;">${bookingDateStr}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b;">Time Slot:</td><td style="padding: 10px 0; font-weight: bold; color: #4338ca;">${timeSlot} (${timezone})</td></tr>
              <tr><td style="padding: 10px 0; color: #64748b; vertical-align: top;">Notes/Message:</td><td style="padding: 10px 0; color: #334155;">${notes || "None provided"}</td></tr>
            </table>

            <div style="margin-top: 20px; padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 13px;">
              <strong>Scheduled Meeting Room:</strong><br/>
              <a href="${meetingLink}" target="_blank" style="color: #6366f1;">${meetingLink}</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  // If no mailer credentials provided, simulate safely
  if (!transporter) {
    console.log(
      `📧 [Mailer Simulated]: SMTP credentials not set in .env.local.\n` +
      `   -> To Client: ${email} | Subject: "Demo Session Confirmed!"\n` +
      `   -> To Admin: ${adminEmail} | Subject: "New Demo Booking Received from ${fullName}"\n` +
      `   -> Meeting Details: ${bookingDateStr} at ${timeSlot}`
    );
    return {
      sent: false,
      reason: "SMTP credentials not configured. Email logged to console.",
    };
  }

  try {
    // Send to client
    const clientPromise = transporter.sendMail({
      from: fromEmail,
      to: email,
      subject: `✨ Confirmed: Your Buzzoraa Demo on ${bookingDateStr} at ${timeSlot}`,
      html: clientHtml,
    });

    // Send to admin
    const adminPromise = transporter.sendMail({
      from: fromEmail,
      to: adminEmail,
      subject: `🚀 New Demo Booking: ${fullName} (${companyName || "Individual"})`,
      html: adminHtml,
    });

    const [clientRes, adminRes] = await Promise.all([clientPromise, adminPromise]);
    console.log("✅ [Mailer]: Confirmation & notification emails sent successfully");
    return { sent: true, clientMessageId: clientRes.messageId, adminMessageId: adminRes.messageId };
  } catch (error) {
    console.error("❌ [Mailer Error]: Failed to send emails:", error.message);
    return { sent: false, error: error.message };
  }
}

/**
 * Send Contact Form Inquiries:
 * 1. To Admin (Notification of inquiry)
 * 2. To Client (Confirmation receipt)
 */
export async function sendContactNotification({
  fullName,
  email,
  phone,
  organization,
  inquiryType,
  eventScale,
  timeline,
  message,
}) {
  const transporter = getTransporter();
  const fromEmail = process.env.EMAIL_FROM || "Buzzoraa <no-reply@buzzoraa.com>";
  const adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.EMAIL_USER ||
    "contact@buzzoraa.com";

  const adminHtml = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; background: #f8fafc; padding: 20px; color: #1e293b;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
          <div style="background: #6366f1; padding: 24px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px;">🎯 New Contact Inquiry Received</h2>
            <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Buzzoraa Social Engagement &amp; GTM Strategy</p>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 8px 0; color: #64748b; width: 140px;">Name:</td><td style="font-weight: bold; color: #0f172a;">${fullName}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Email:</td><td><a href="mailto:${email}" style="color: #6366f1;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Phone / WhatsApp:</td><td>${phone || "Not provided"}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Organization / Community:</td><td>${organization || "Not provided"}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Inquiry Type:</td><td><strong style="color: #6366f1;">${inquiryType || "General Inquiry"}</strong></td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Event / Community Scale:</td><td>${eventScale || "Not specified"}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Target Timeline:</td><td>${timeline || "Flexible"}</td></tr>
            </table>
            <div style="margin-top: 18px; padding: 14px; background: #f1f5f9; border-radius: 8px; font-size: 13px; line-height: 1.6;">
              <strong>Message / Campaign Notes:</strong><br/>
              ${message.replace(/\n/g, "<br/>")}
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const clientHtml = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; background: #f8fafc; padding: 20px; color: #1e293b;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
          <div style="background: #6366f1; padding: 24px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px;">👋 We've Received Your Inquiry</h2>
            <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Buzzoraa • Social Engagement &amp; GTM SaaS</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 14px; line-height: 1.6;">Hello <strong>${fullName}</strong>,</p>
            <p style="font-size: 14px; line-height: 1.6;">Thank you for reaching out to us regarding <strong>${inquiryType}</strong>. Our team and Tarun Gupta have received your details.</p>
            <p style="font-size: 14px; line-height: 1.6;">We typically review campaign proposals and technical inquiries within <strong>2 business hours</strong>.</p>
            <div style="margin-top: 20px; padding: 14px; background: #eef2ff; border-radius: 8px; font-size: 13px; color: #3730a3;">
              <strong>Need immediate assistance?</strong><br/>
              You can also ping us directly on WhatsApp or book a 30-min strategy session directly via our website.
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  if (!transporter) {
    console.log(
      `📧 [Mailer Simulated]: Contact message received from ${fullName} (${email}) for [${inquiryType}].\n` +
      `   Organization: ${organization || "N/A"} | Scale: ${eventScale || "N/A"}\n` +
      `   Message: "${message.substring(0, 80)}..."`
    );
    return { sent: false, simulated: true };
  }

  try {
    const adminPromise = transporter.sendMail({
      from: fromEmail,
      to: adminEmail,
      subject: `🎯 New Contact Inquiry: ${fullName} [${inquiryType}]`,
      html: adminHtml,
    });

    const clientPromise = transporter.sendMail({
      from: fromEmail,
      to: email,
      subject: `✨ We've Received Your Inquiry - Buzzoraa`,
      html: clientHtml,
    });

    await Promise.all([adminPromise, clientPromise]);
    console.log("✅ [Mailer]: Contact emails sent successfully");
    return { sent: true };
  } catch (error) {
    console.error("❌ [Mailer Error]: Failed to send contact emails:", error.message);
    return { sent: false, error: error.message };
  }
}

