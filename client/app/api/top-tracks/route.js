// app/api/top-tracks/route.js
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { refreshAccessToken } from "@/lib/spotify";
import { redis } from "@/lib/redis";

export async function GET(request) {
  const cookieStore = cookies();
  const timeRange =
    new URL(request.url).searchParams.get("time_range") || "medium_term";

  // Check Redis cache
  const cached = await redis.get(`top-tracks:${timeRange}`);
  if (cached) {
    return new NextResponse(cached, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  let token = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  // Prepare response so we can attach cookies to it
  const res = new NextResponse();

  // Refresh token if missing
  if (!token && refreshToken) {
    token = await refreshAccessToken(refreshToken);
    if (token) {
      res.cookies.set("access_token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 3600,
        secure: true,
        sameSite: "lax",
      });
    }
  }

  if (!token) {
    return NextResponse.json(
      { error: "Access token missing in cookies" },
      { status: 401 }
    );
  }

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${timeRange}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Save in Redis
    await redis.set(
      `top-tracks:${timeRange}`,
      JSON.stringify(response.data),
      { ex: 3600 }
    );

    // Send final response with data + any cookies we set earlier
    res.headers.set("Content-Type", "application/json");
    res.body = JSON.stringify(response.data);
    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch top tracks", details: error.message },
      { status: 400 }
    );
  }
}
