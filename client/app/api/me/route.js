// app/api/me/route.js
import axios from "axios";
import { cookies } from "next/headers";
import { refreshAccessToken } from "@/lib/spotify";
export async function GET() {
  const cookieStore = cookies();
  let token = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  // If no access token but we have a refresh token, refresh it
  if (!token && refreshToken) {
    token = await refreshAccessToken(refreshToken);
    if (token) {
      cookieStore.set("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 3600, // 1 hour
      });
    }
  }

  if (!token) {
    return new Response(
      JSON.stringify({ error: "Access token missing in cookies" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/player/recently-played?limit=50`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch recently played",
        details: error.message,
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}
