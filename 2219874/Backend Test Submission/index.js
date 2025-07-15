const express = require('express');
const cors = require('cors');
const { Log } = require('../Logging Middleware/log');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}`;

// In-memory store
const urlStore = {};

function generateShortcode() {
  return crypto.randomBytes(4).toString('hex');
}

app.post('/shorturls', async (req, res) => {
  const { url, validity, shortcode } = req.body;
  let code = shortcode || generateShortcode();
  let validMinutes = typeof validity === 'number' && validity > 0 ? validity : 30;
  const now = new Date();
  const expiry = new Date(now.getTime() + validMinutes * 60000).toISOString();

  if (!url || typeof url !== 'string') {
    await Log('backend', 'error', 'shorturls', 'Invalid or missing URL');
    return res.status(400).json({ error: 'Invalid or missing URL' });
  }

  // Store in memory with createdAt and clicks
  urlStore[code] = { url, expiry, createdAt: now.toISOString(), clicks: [] };

  const response = {
    shortLink: `${BASE_URL}/${code}`,
    expiry
  };

  await Log('backend', 'info', 'shorturls', `Short URL created: ${response.shortLink}`);
  res.json(response);
});

app.get('/:shortcode', async (req, res) => {
  const { shortcode } = req.params;
  const entry = urlStore[shortcode];

  if (!entry) {
    await Log('backend', 'warn', 'redirect', `Shortcode not found: ${shortcode}`);
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  const now = new Date();
  const expiry = new Date(entry.expiry);
  if (now > expiry) {
    await Log('backend', 'warn', 'redirect', `Shortcode expired: ${shortcode}`);
    return res.status(410).json({ error: 'Shortcode expired' });
  }

  // Log the click
  const timestamp = new Date().toISOString();
  const referrer = req.headers.referer || req.headers.referrer || 'unknown';
  const location = 'India'; // Hardcoded as per requirements
  entry.clicks.push({ timestamp, referrer, location });
  await Log('backend', 'info', 'redirect', `Click: shortcode=${shortcode}, timestamp=${timestamp}, referrer=${referrer}, location=${location}`);

  res.redirect(entry.url);
});

// Stats route
app.get('/shorturls/:shortcode', async (req, res) => {
  const { shortcode } = req.params;
  const entry = urlStore[shortcode];

  if (!entry) {
    await Log('backend', 'warn', 'stats', `Shortcode not found: ${shortcode}`);
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  const now = new Date();
  const expiry = new Date(entry.expiry);
  if (now > expiry) {
    await Log('backend', 'warn', 'stats', `Shortcode expired: ${shortcode}`);
    return res.status(410).json({ error: 'Shortcode expired' });
  }

  const stats = {
    originalURL: entry.url,
    createdAt: entry.createdAt,
    expiry: entry.expiry,
    totalClicks: entry.clicks.length,
    clicks: entry.clicks
  };
  await Log('backend', 'info', 'stats', `Stats fetched for shortcode: ${shortcode}`);
  res.json(stats);
});

app.listen(PORT, () => {
  Log('backend', 'info', 'server', `Server started on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
}); 