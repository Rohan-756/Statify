// pages/api/top-tracks.js
import axios from 'axios';
import { parse } from 'cookie';
import { refreshAccessToken } from '../refreshAccessToken/route';

export default async function handler(req, res) {
  const cookies = parse(req.headers.cookie || '');
  const timeRange = req.query.time_range || 'medium_term';

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
      `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${timeRange}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch top tracks', details: error.message });
  }
}
