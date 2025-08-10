// app/api/refreshAccessToken/route.js
import axios from "axios";

// Optional: if you want to be able to call this via a GET request
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const refreshToken = searchParams.get("refresh_token");

  if (!refreshToken) {
    return new Response(
      JSON.stringify({ error: "Missing refresh_token" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const token = await refreshAccessToken(refreshToken);

  if (!token) {
    return new Response(
      JSON.stringify({ error: "Failed to refresh token" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ access_token: token }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
