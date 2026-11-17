import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET(request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      {
        error:
          "GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be configured in .env.local",
      },
      { status: 400 }
    );
  }

  const { origin } = new URL(request.url);
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI || `${origin}/api/auth/google/callback`;

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events",
    ],
  });

  return NextResponse.redirect(authUrl);
}
