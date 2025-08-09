import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import querystring from 'querystring';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors({
  origin: "http://127.0.0.1:3000",
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://127.0.0.1:3000/auth';

app.use((req, res, next) => {
  // console.log('Cookies:', req.cookies); // Logs cookies from each request
  next();
});

async function refreshAccessToken(refresh_token) {
  const data = querystring.stringify({
    grant_type: 'refresh_token',
    refresh_token: refresh_token,
  });

  const headers = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
    },
  };

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', data, headers);
    return response.data.access_token;
  } catch (error) {
    console.error('Failed to refresh token:', error.message);
    return null;
  }
}


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
  const timeRange = req.query.time_range || 'medium_term';

  let token = req.cookies["access_token"];
  const refreshToken = req.cookies["refresh_token"];

  if (!token && refreshToken) {
    token = await refreshAccessToken(refreshToken);
    if (token) {
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3600 * 1000
      });
    }
  }

  // console.log(req.cookies)

  if (!token) {
    return res.status(401).json({ error: 'Access token missing in cookies' });
  }

  try {
    const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${timeRange}`
      , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch top tracks', details: error.message });
  }
});

app.get('/top-artists', async (req, res) => {
  const timeRange = req.query.time_range || 'medium_term';

  let token = req.cookies["access_token"];
  const refreshToken = req.cookies["refresh_token"];

  if (!token && refreshToken) {
    token = await refreshAccessToken(refreshToken);
    if (token) {
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3600 * 1000
      });
    }
  }

  // console.log(req.cookies)

  if (!token) {
    return res.status(401).json({ error: 'Access token missing in cookies' });
  }

  try {
    const response = await axios.get(`https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${timeRange}`
      , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch top artists', details: error.message });
  }
});

app.get('/profile', async (req, res) => {
  let token = req.cookies["access_token"];
  const refreshToken = req.cookies["refresh_token"];

  if (!token && refreshToken) {
    token = await refreshAccessToken(refreshToken);
    if (token) {
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3600 * 1000
      });
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Access token missing in cookies' });
  }

  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` }
    });

    res.json(response.data); // ✅ make sure it's JSON
  } catch (error) {
    return res.status(400).json({ error: 'Failed to fetch profile', details: error.message });
  }
});

// app.get('/profile', async (req, res) => {
//   console.log("Incoming request to /profile");
//   console.log("Cookies:", req.cookies);

//   let token = req.cookies["access_token"];
//   const refreshToken = req.cookies["refresh_token"];

//   // Try refreshing if token is missing
//   if (!token && refreshToken) {
//     console.log("Access token missing, trying to refresh...");
//     token = await refreshAccessToken(refreshToken);
//     if (token) {
//       res.cookie("access_token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "lax",
//         maxAge: 3600 * 1000
//       });
//     } else {
//       console.log("Failed to refresh access token.");
//     }
//   }

//   if (!token) {
//     return res.status(401).json({ error: 'Access token missing in cookies' });
//   }

//   try {
//     const response = await axios.get('https://api.spotify.com/v1/me', {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.log("Spotify API call failed:", error.response?.data || error.message);
//     return res.status(400).json({ error: 'Failed to fetch profile', details: error.message });
//   }
// });

// Check login status + return user profile if logged in
app.get("/me", async (req, res) => {
  const token = req.cookies["access_token"];
  if (!token) {
    return res.json({ loggedIn: false });
  }

  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.json({
      loggedIn: true,
      profile: response.data,
    });
  } catch (err) {
    console.error("Error fetching user profile:", err.message);
    return res.json({ loggedIn: false });
  }
});

// Logout route
app.post("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  return res.json({ success: true });
});


app.get('/testing', (req, res) => {
  console.log('Cookies received:', req.cookies); // needs cookie-parser middleware

  res.json({ message: 'Cookie received!', cookies: req.cookies });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
