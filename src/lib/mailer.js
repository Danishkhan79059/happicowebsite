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
 * Send Demo Booking Emails to both Customer and Company
 * Subject (Customer): Your Demo Meeting Has Been Confirmed!
 * Subject (Company): New Demo Booking Received
 */
export async function sendDemoBookingNotification(booking) {
  const {
    fullName,
    companyName = "N/A",
    email,
    phoneNumber = "N/A",
    teamSize = "N/A",
    linkedinUrl = "N/A",
    websiteUrl = "N/A",
    description = "",
    notes = "",
    bookingDateStr,
    timeSlot,
    timezone = "Asia/Kolkata (IST)",
    googleMeetUrl,
    meetingLink,
  } = booking;

  const actualMeetLink = googleMeetUrl || meetingLink || "https://meet.google.com";
  const briefDescription = description || notes || "No requirements specified.";

  const transporter = getTransporter();
  const companyEmail =
    process.env.COMPANY_MEETING_EMAIL ||
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.EMAIL_USER ||
    "khandanish30599@gmail.com";

  // Prevent invalid placeholder sender which causes Gmail SMTP reject
  const rawFrom = process.env.EMAIL_FROM || "";
  const fromEmail =
    rawFrom && !rawFrom.includes("your_company_email")
      ? rawFrom
      : `"Buzzoraa Team" <${process.env.EMAIL_USER || companyEmail}>`;

  // Customer Email HTML Template
  const customerHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Demo Meeting Has Been Confirmed!</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06); }
      .header { background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); padding: 36px 30px; text-align: center; color: #ffffff; }
      .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
      .header p { margin: 8px 0 0; opacity: 0.95; font-size: 14px; }
      .content { padding: 32px 30px; }
      .greeting { font-size: 18px; font-weight: 700; margin-bottom: 12px; color: #0f172a; }
      .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0; }
      .slot-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
      .slot-row:last-child { border-bottom: none; }
      .label { color: #64748b; font-weight: 500; }
      .value { color: #0f172a; font-weight: 700; text-align: right; }
      .btn-meet { display: block; text-align: center; background: #4f46e5; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 15px; margin: 24px 0 16px; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.3); }
      .meet-box { background: #eff6ff; border: 1px dashed #3b82f6; border-radius: 10px; padding: 14px; text-align: center; font-size: 13px; color: #1d4ed8; word-break: break-all; margin-bottom: 20px; }
      .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 30px; text-align: center; font-size: 12px; color: #64748b; }
      .company-info { margin-top: 16px; font-size: 13px; color: #475569; border-top: 1px solid #f1f5f9; padding-top: 16px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Your Demo Meeting Has Been Confirmed!</h1>
        <p>Buzzoraa 1-on-1 Product Walkthrough &amp; Technical Consultation</p>
      </div>
      <div class="content">
        <div class="greeting">Hi ${fullName},</div>
        <p style="color: #475569; line-height: 1.6; margin: 0 0 16px;">
          Thank you for scheduling a demo with Buzzoraa! We've reserved your time slot and a Google Meet room has been created automatically.
        </p>

        <div class="card">
          <div class="slot-row">
            <span class="label">Customer Name:</span>
            <span class="value">${fullName}</span>
          </div>
          <div class="slot-row">
            <span class="label">Company Name:</span>
            <span class="value">${companyName}</span>
          </div>
          <div class="slot-row">
            <span class="label">Meeting Date:</span>
            <span class="value">${bookingDateStr}</span>
          </div>
          <div class="slot-row">
            <span class="label">Meeting Time (IST):</span>
            <span class="value">${timeSlot} (${timezone})</span>
          </div>
          <div class="slot-row">
            <span class="label">Duration:</span>
            <span class="value">30 Minutes</span>
          </div>
          <div class="slot-row">
            <span class="label">Platform:</span>
            <span class="value">Google Meet (Live Video)</span>
          </div>
        </div>

        <a href="${actualMeetLink}" class="btn-meet" target="_blank">
          Join Google Meet
        </a>

        <div class="meet-box">
          <strong>Direct Meet Link:</strong><br/>
          <a href="${actualMeetLink}" target="_blank" style="color: #2563eb;">${actualMeetLink}</a>
        </div>

        <div class="company-info">
          <strong>Need to reschedule or have urgent questions?</strong><br/>
          Email: <a href="mailto:${companyEmail}" style="color: #4f46e5;">${companyEmail}</a><br/>
          WhatsApp: <a href="https://wa.me/919799472445" style="color: #4f46e5;">+91 97994 72445</a>
        </div>
      </div>
      <div class="footer">
        Buzzoraa Inc. • Social Engagement &amp; Go-to-Market (GTM) SaaS<br/>
        An automated calendar invite has also been dispatched to your calendar.
      </div>
    </div>
  </body>
</html>
  `;

  // Company Email HTML Template
  const companyHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Demo Booking Received</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 24px; color: #334155; }
      .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #334155; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
      .header { background: #0f172a; padding: 28px 24px; color: #ffffff; border-bottom: 2px solid #4f46e5; }
      .header h2 { margin: 0; font-size: 22px; color: #38bdf8; }
      .header p { margin: 6px 0 0; color: #94a3b8; font-size: 13px; }
      .content { padding: 28px 24px; }
      .data-table { width: 100%; border-collapse: collapse; font-size: 14px; }
      .data-table tr { border-bottom: 1px solid #f1f5f9; }
      .data-table tr:last-child { border-bottom: none; }
      .data-table td { padding: 10px 0; vertical-align: top; }
      .label { width: 160px; color: #64748b; font-weight: 600; }
      .val { color: #0f172a; font-weight: 500; }
      .val-bold { color: #0f172a; font-weight: 700; }
      .highlight { color: #4f46e5; font-weight: 700; }
      .meet-cta { margin-top: 24px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; text-align: center; }
      .meet-cta a { color: #15803d; font-weight: 700; font-size: 15px; text-decoration: none; word-break: break-all; }
      .notes-box { margin-top: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; font-size: 13px; color: #334155; line-height: 1.5; }
      .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>🚀 New Demo Booking Received</h2>
        <p>A new customer has booked a product walkthrough via Buzzoraa.</p>
      </div>
      <div class="content">
        <table class="data-table">
          <tr>
            <td class="label">Customer Name:</td>
            <td class="val-bold">${fullName}</td>
          </tr>
          <tr>
            <td class="label">Company Name:</td>
            <td class="val-bold">${companyName}</td>
          </tr>
          <tr>
            <td class="label">Email:</td>
            <td class="val"><a href="mailto:${email}" style="color: #4f46e5; font-weight: 600;">${email}</a></td>
          </tr>
          <tr>
            <td class="label">Phone Number:</td>
            <td class="val">${phoneNumber}</td>
          </tr>
          <tr>
            <td class="label">Team Size:</td>
            <td class="val">${teamSize}</td>
          </tr>
          <tr>
            <td class="label">LinkedIn URL:</td>
            <td class="val">${linkedinUrl !== "N/A" ? `<a href="${linkedinUrl}" target="_blank" style="color: #0284c7;">${linkedinUrl}</a>` : "Not provided"}</td>
          </tr>
          <tr>
            <td class="label">Company Website:</td>
            <td class="val">${websiteUrl && websiteUrl !== "N/A" ? `<a href="${websiteUrl}" target="_blank" style="color: #0284c7;">${websiteUrl}</a>` : "Not provided"}</td>
          </tr>
          <tr>
            <td class="label">Meeting Date:</td>
            <td class="highlight">${bookingDateStr}</td>
          </tr>
          <tr>
            <td class="label">Meeting Time (IST):</td>
            <td class="highlight">${timeSlot} (${timezone})</td>
          </tr>
        </table>

        <div class="notes-box">
          <strong>Customer Description / Requirements:</strong><br/>
          ${briefDescription}
        </div>

        <div class="meet-cta">
          <div style="font-size: 12px; color: #166534; font-weight: 600; margin-bottom: 6px;">GOOGLE MEET LINK:</div>
          <a href="${actualMeetLink}" target="_blank">${actualMeetLink}</a>
        </div>
      </div>
      <div class="footer">
        Buzzoraa Demo Notification System
      </div>
    </div>
  </body>
</html>
  `;

  if (!transporter) {
    console.log(
      `📧 [Mailer Simulated]: SMTP credentials not set in .env.local.\n` +
      `   -> To Customer: ${email} | Subject: "Your Demo Meeting Has Been Confirmed!"\n` +
      `   -> To Company: ${companyEmail} | Subject: "New Demo Booking Received"\n` +
      `   -> Meet: ${actualMeetLink}`
    );
    return {
      sent: false,
      simulated: true,
      reason: "SMTP credentials not configured. Email logged to console.",
    };
  }

  let clientSent = false;
  let companySent = false;
  let clientMessageId = null;
  let companyMessageId = null;
  const errors = [];

  try {
    const clientRes = await transporter.sendMail({
      from: fromEmail,
      to: email,
      replyTo: companyEmail,
      subject: "Your Demo Meeting is Confirmed! (Google Meet Attached) - Buzzoraa",
      html: customerHtml,
    });
    clientSent = true;
    clientMessageId = clientRes?.messageId;
    console.log("✅ [Mailer]: Customer confirmation email sent to:", email);
  } catch (cErr) {
    console.error("❌ [Mailer]: Failed sending email to customer:", cErr.message);
    errors.push(`Customer email: ${cErr.message}`);
  }

  try {
    const companyRes = await transporter.sendMail({
      from: fromEmail,
      to: companyEmail,
      replyTo: email,
      subject: `[New Demo Booking] ${fullName} from ${companyName || "N/A"} (${bookingDateStr} at ${timeSlot})`,
      html: companyHtml,
    });
    companySent = true;
    companyMessageId = companyRes?.messageId;
    console.log("✅ [Mailer]: Company notification email sent to:", companyEmail);
  } catch (cmpErr) {
    console.error("❌ [Mailer]: Failed sending email to company:", cmpErr.message);
    errors.push(`Company email: ${cmpErr.message}`);
  }

  return {
    sent: clientSent || companySent,
    clientSent,
    companySent,
    customerMessageId: clientMessageId,
    companyMessageId: companyMessageId,
    error: errors.length > 0 ? errors.join("; ") : null,
  };
}

/**
 * Send Contact Form Inquiries (Existing function preserved)
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
              ${message ? message.replace(/\n/g, "<br/>") : "None"}
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
            <p style="font-size: 14px; line-height: 1.6;">Thank you for reaching out to us regarding <strong>${inquiryType}</strong>. Our team has received your details.</p>
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
      `📧 [Mailer Simulated]: Contact message received from ${fullName} (${email}) for [${inquiryType}].`
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

/**
 * Send Welcome Email to New Newsletter / Platform Subscriber
 * Subject: ✨ Welcome to Buzzoraa! Here's What We Do & How We Help You Grow 🚀
 */
export async function sendSubscriberWelcomeEmail(email) {
  const transporter = getTransporter();
  const rawFrom = process.env.EMAIL_FROM || "";
  const fromEmail =
    rawFrom && !rawFrom.includes("your_company_email")
      ? rawFrom
      : `"Buzzoraa Team" <${process.env.EMAIL_USER || "contact@buzzoraa.com"}>`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://buzzoraa.com";

  const welcomeHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Buzzoraa!</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; margin: 0; padding: 24px; color: #f1f5f9; }
      .container { max-width: 600px; margin: 0 auto; background: #13192b; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
      .header { background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #06b6d4 100%); padding: 40px 30px; text-align: center; color: #ffffff; }
      .header h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
      .header p { margin: 10px 0 0; opacity: 0.95; font-size: 15px; font-weight: 500; }
      .content { padding: 32px 30px; background-color: #13192b; }
      .greeting { font-size: 18px; font-weight: 700; margin-bottom: 16px; color: #ffffff; }
      .intro-text { color: #94a3b8; font-size: 15px; line-height: 1.7; margin-bottom: 24px; }
      .feature-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px 20px; margin-bottom: 16px; }
      .feature-title { font-size: 16px; font-weight: 700; color: #38bdf8; margin: 0 0 6px 0; }
      .feature-desc { font-size: 13.5px; color: #cbd5e1; line-height: 1.6; margin: 0; }
      .cta-section { text-align: center; margin: 32px 0 16px; }
      .cta-btn { display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4); }
      .cta-secondary { display: inline-block; margin-top: 14px; color: #a5b4fc; text-decoration: underline; font-size: 13px; }
      .divider { border-top: 1px solid rgba(255,255,255,0.08); margin: 28px 0; }
      .footer { background: #0c101c; border-top: 1px solid rgba(255,255,255,0.06); padding: 24px 30px; text-align: center; font-size: 12px; color: #64748b; }
      .footer a { color: #818cf8; text-decoration: none; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome to Buzzoraa! 🚀</h1>
        <p>Social Engagement &amp; Go-to-Market (GTM) SaaS Platform</p>
      </div>
      <div class="content">
        <div class="greeting">Hey there,</div>
        <p class="intro-text">
          Thank you for joining <strong>Buzzoraa</strong>! We are thrilled to welcome you to our growing community. You will now be the first to receive exclusive platform updates, product releases, and high-impact GTM playbooks.
        </p>

        <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 14px; text-transform: uppercase; letter-spacing: 0.5px;">
          What We Do at Buzzoraa
        </h3>

        <div class="feature-box">
          <div class="feature-title">📣 Social Engagement &amp; Community Activation</div>
          <p class="feature-desc">
            We help you turn social conversations into qualified revenue pipeline. Monitor brand mentions, engage directly with high-intent prospects, and build vibrant brand communities across modern channels.
          </p>
        </div>

        <div class="feature-box">
          <div class="feature-title">🚀 Go-To-Market (GTM) Acceleration</div>
          <p class="feature-desc">
            Streamline your product launches with precision. Buzzoraa unifies multi-channel outreach, audience segmenting, and campaign coordination so your team reaches market faster.
          </p>
        </div>

        <div class="feature-box">
          <div class="feature-title">⚡ Content Amplification &amp; Viral Loops</div>
          <p class="feature-desc">
            Multiply the reach of your high-impact content by turning customers, team members, and advocates into active brand champions with smart distribution mechanisms.
          </p>
        </div>

        <div class="feature-box">
          <div class="feature-title">📊 Real-Time Analytics &amp; Conversion Intelligence</div>
          <p class="feature-desc">
            Gain transparent visibility into campaign performance, sentiment trends, and conversion attribution from conversation to customer.
          </p>
        </div>

        <div class="cta-section">
          <a href="${siteUrl}/Bookdemo" class="cta-btn" target="_blank">
            Book a 1-on-1 Product Demo &rarr;
          </a>
          <br/>
          <a href="${siteUrl}/solutions" class="cta-secondary" target="_blank">
            Explore all Buzzoraa Solutions
          </a>
        </div>
      </div>

      <div class="footer">
        <p style="margin: 0 0 8px;">
          Have questions or want to partner with us? Simply reply to this email or visit our <a href="${siteUrl}/contact">Contact Support</a> page.
        </p>
        <p style="margin: 0;">
          &copy; ${new Date().getFullYear()} Buzzoraa Inc. All rights reserved. • <a href="${siteUrl}/privacy-policy">Privacy Policy</a>
        </p>
      </div>
    </div>
  </body>
</html>
  `;

  if (!transporter) {
    console.log(`📧 [Mailer Simulated]: Subscriber welcome email dispatched to: ${email}`);
    return { sent: false, simulated: true };
  }

  try {
    const info = await transporter.sendMail({
      from: fromEmail,
      to: email,
      subject: `✨ Welcome to Buzzoraa! Here's What We Do & How We Turn Conversations Into Growth 🚀`,
      html: welcomeHtml,
    });
    console.log("✅ [Mailer]: Welcome email sent to subscriber:", email, info?.messageId);
    return { sent: true, messageId: info?.messageId };
  } catch (error) {
    console.error("❌ [Mailer Error]: Failed to send subscriber welcome email:", error.message);
    return { sent: false, error: error.message };
  }
}
