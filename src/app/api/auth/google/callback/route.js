import { NextResponse } from "next/server";
import { google } from "googleapis";
import fs from "fs";
import path from "path";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return new Response(
      `<!DOCTYPE html><html><body style="font-family:sans-serif;padding:30px;background:#0f172a;color:#fff;"><h2>Google Authorization Denied / Error</h2><p>${error}</p><a href="/Bookdemo" style="color:#38bdf8;">Return to Book Demo</a></body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  if (!code) {
    return new Response(
      `<!DOCTYPE html><html><body style="font-family:sans-serif;padding:30px;background:#0f172a;color:#fff;"><h2>Missing authorization code from Google.</h2></body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri =
      process.env.GOOGLE_REDIRECT_URI || `${origin}/api/auth/google/callback`;

    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri
    );
    const { tokens } = await oauth2Client.getToken(code);

    const refreshToken = tokens.refresh_token;

    let autoSaved = false;
    if (refreshToken) {
      try {
        const envPath = path.resolve(process.cwd(), ".env.local");
        if (fs.existsSync(envPath)) {
          let envContent = fs.readFileSync(envPath, "utf-8");
          if (envContent.includes("GOOGLE_REFRESH_TOKEN=")) {
            envContent = envContent.replace(
              /GOOGLE_REFRESH_TOKEN=.*(\r?\n|$)/,
              `GOOGLE_REFRESH_TOKEN=${refreshToken}\n`
            );
          } else {
            envContent += `\nGOOGLE_REFRESH_TOKEN=${refreshToken}\n`;
          }
          fs.writeFileSync(envPath, envContent, "utf-8");
          autoSaved = true;
        }
      } catch (fErr) {
        console.warn("Could not auto-write to .env.local:", fErr.message);
      }
    }

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Google Calendar Authorization Successful - Buzzoraa</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0b0f19; color: #f8fafc; padding: 40px 20px; display: flex; justify-content: center; align-items: center; min-height: 80vh; margin: 0; }
    .card { background: #151d2f; border: 1px solid #1e293b; border-radius: 20px; padding: 36px 30px; max-width: 600px; width: 100%; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); text-align: center; }
    .badge { display: inline-block; padding: 6px 14px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #34d399; border-radius: 9999px; font-size: 12px; font-weight: 700; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
    h1 { color: #ffffff; font-size: 24px; font-weight: 800; margin: 0 0 10px; }
    p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 8px 0; }
    .token-box { background: #0b0f19; border: 1px solid #334155; padding: 16px; border-radius: 12px; font-family: monospace; font-size: 12px; color: #38bdf8; word-break: break-all; margin: 24px 0; text-align: left; }
    .btn { display: inline-block; background: #6366f1; color: white; padding: 12px 28px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px; margin-top: 12px; transition: background 0.2s; }
    .btn:hover { background: #4f46e5; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">Google Calendar Connected</div>
    <h1>Google Calendar Authorized! 🎉</h1>
    <p>Your Google Calendar API is now connected with offline access for automated Google Meet generation.</p>
    
    ${
      autoSaved
        ? `<p style="color: #34d399; font-weight: 700; margin-top: 16px;">✅ GOOGLE_REFRESH_TOKEN has been automatically saved into your .env.local file!</p>`
        : `<p style="margin-top: 16px;">Please copy and paste this token into your <strong>.env.local</strong> file:</p>`
    }

    <div class="token-box">
      <strong>GOOGLE_REFRESH_TOKEN=</strong>${refreshToken || "(Token already acquired or active)"}
    </div>

    <a href="/Bookdemo" class="btn">Return to Book a Demo Page</a>
  </div>
</body>
</html>
    `;

    return new Response(html, { headers: { "Content-Type": "text/html" } });
  } catch (err) {
    return new Response(
      `<!DOCTYPE html><html><body style="font-family:sans-serif;padding:30px;background:#0f172a;color:#fff;"><h2>Token Exchange Failed</h2><p>${err.message}</p></body></html>`,
      { headers: { "Content-Type": "text/html" }, status: 500 }
    );
  }
}
