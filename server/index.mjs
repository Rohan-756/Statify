import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import querystring from 'querystring';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(cors({
  origin: "http://127.0.0.1:3000",
  credentials: true
}));
app.use(cookieParser());

const PORT = process.env.PORT;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI='http://127.0.0.1:3000/auth';


app.get('/', (req, res) => {
  res.send(
    "test message"
  );
});

// Redirect user to Spotify login
app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email user-top-read user-read-recently-played';

  const queryParams = querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI,
    show_dialog: 'true',
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// Handle callback & get tokens
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  const tokenData = querystring.stringify({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URI,
  });

  const headers = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
    },
  };

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      tokenData,
      headers
    );

    const { access_token, refresh_token } = response.data;

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600 * 1000
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600 * 1000 * 30
    });
    // console.log("Cookies set");

    res.json("Cookies set successfully");


  } catch (error) {
    res.status(400).json({ error: 'Token exchange failed', details: error.message });
  }
});

// Get user's top tracks (pass access token in header as Bearer token)
app.get('/top-tracks', async (req, res) => {
  const token = req.headers.authorization;

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        Authorization: token,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch top tracks', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
