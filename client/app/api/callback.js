// pages/api/callback.js
import axios from 'axios';

export default async function handler(req, res) {
  const code = req.query.code || null;

  if (!code) {
    return res.status(400).json({ error: 'Missing code' });
  }

  const params = new URLSearchParams({
    code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    grant_type: 'authorization_code',
  });

  const authHeader = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');

  try {
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      params.toString(),
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    res.setHeader('Set-Cookie', [
      `access_token=${access_token}; HttpOnly; Path=/; Max-Age=${expires_in}; Secure; SameSite=Lax`,
      `refresh_token=${refresh_token}; HttpOnly; Path=/; Max-Age=31536000; Secure; SameSite=Lax`,
    ]);

    res.redirect('/');
  } catch (error) {
    res.status(400).json({ error: 'Token exchange failed', details: error.message });
  }
}
