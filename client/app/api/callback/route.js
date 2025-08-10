// app/api/callback/route.js
import axios from "axios";
import { cookies } from "next/headers";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response(
      JSON.stringify({ error: "Missing code" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const params = new URLSearchParams({
    code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    grant_type: "authorization_code",
  });

  const authHeader = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      params.toString(),
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    const cookieStore = cookies();
    cookieStore.set("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: expires_in,
    });
    cookieStore.set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 31536000, // 1 year
    });

    // Redirect back to home page
    return Response.redirect(new URL("/", req.url), 302);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Token exchange failed", details: error.message }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}
