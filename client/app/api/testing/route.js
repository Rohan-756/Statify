// app/api/testing/route.js
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const allCookies = {};

  cookieStore.getAll().forEach(({ name, value }) => {
    allCookies[name] = value;
  });

  return new Response(JSON.stringify({ cookies: allCookies }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
