// app/api/top-tracks/route.js
import axios from "axios";
import { cookies } from "next/headers";
import { refreshAccessToken } from "../refreshAccessToken/route";

export async function GET(request) {
  const cookieStore = cookies();
  const timeRange =
    new URL(request.url).searchParams.get("time_range") || "medium_term";

  let token = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!token && refreshToken) {
    token = await refreshAccessToken(refreshToken);
    if (token) {
      cookieStore.set({
        name: "access_token",
        value: token,
        httpOnly: true,
        path: "/",
        maxAge: 3600,
        secure: true,
        sameSite: "lax",
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
      `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${timeRange}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch top tracks",
        details: error.message,
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}
