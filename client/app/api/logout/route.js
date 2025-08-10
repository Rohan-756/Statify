// app/api/logout/route.js
export async function GET() {
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `access_token=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Lax`
  );
  headers.append(
    "Set-Cookie",
    `refresh_token=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Lax`
  );

  return new Response(JSON.stringify({ message: "Logged out successfully" }), {
    status: 200,
    headers,
  });
}
