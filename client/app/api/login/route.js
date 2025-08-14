// app/api/login/route.js
export async function GET() {
  const scopes = [
    "user-top-read",
    "user-read-email",
    "user-read-private",
    "user-read-recently-played",
  ];

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: scopes.join(" "),
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  });

  return Response.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`,
    302
  );
}
