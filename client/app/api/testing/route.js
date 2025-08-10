// pages/api/testing.js
import { parse } from 'cookie';

export default function handler(req, res) {
  const cookies = parse(req.headers.cookie || '');
  res.json({ cookies });
}
