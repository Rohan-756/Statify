// lib/spotify.js
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
