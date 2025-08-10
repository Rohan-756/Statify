// app/api/refreshAccessToken/route.js
import axios from "axios";

export async function refreshAccessToken(refresh_token) {
  try {
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    });

    const authHeader = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      params.toString(),
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    return null;
  }
}

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
