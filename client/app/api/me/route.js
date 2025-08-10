// pages/api/me.js
import axios from 'axios';
import { parse } from 'cookie';
import { refreshAccessToken } from '../refreshAccessToken';

export default async function handler(req, res) {
  const cookies = parse(req.headers.cookie || '');

  let token = cookies.access_token;
  const refreshToken = cookies.refresh_token;

  if (!token && refreshToken) {
    token = await refreshAccessToken(refreshToken);
    if (token) {
      res.setHeader(
        'Set-Cookie',
        `access_token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Lax`
      );
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Access token missing in cookies' });
  }

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/player/recently-played?limit=50`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch recently played', details: error.message });
  }
}
