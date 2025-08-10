// pages/api/logout.js
export default function handler(req, res) {
    res.setHeader('Set-Cookie', [
      `access_token=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Lax`,
      `refresh_token=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Lax`,
    ]);
    res.json({ message: 'Logged out successfully' });
  }
  