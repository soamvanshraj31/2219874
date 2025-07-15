import React, { useState } from 'react';
import { TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import axios from 'axios';
import Log from '../utils/log';

const API_BASE = 'http://localhost:5000';

export default function StatisticsPage() {
  const [shortcode, setShortcode] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setError('');
    setStats(null);
    if (!shortcode.trim()) {
      setError('Shortcode is required');
      await Log('frontend', 'warn', 'StatisticsPage', 'Shortcode input empty');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/shorturls/${shortcode.trim()}`);
      setStats(res.data);
      await Log('frontend', 'info', 'StatisticsPage', `Fetched stats for shortcode: ${shortcode}`);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError('Shortcode not found');
          await Log('frontend', 'error', 'StatisticsPage', `404 Not Found for shortcode: ${shortcode}`);
        } else if (err.response.status === 410) {
          setError('Shortcode expired');
          await Log('frontend', 'warn', 'StatisticsPage', `410 Gone (expired) for shortcode: ${shortcode}`);
        } else {
          setError('Error fetching stats');
          await Log('frontend', 'error', 'StatisticsPage', `Error fetching stats for shortcode: ${shortcode}`);
        }
      } else {
        setError('Network error');
        await Log('frontend', 'error', 'StatisticsPage', `Network error for shortcode: ${shortcode}`);
      }
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Short URL Statistics</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Shortcode"
          value={shortcode}
          onChange={e => setShortcode(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleFetch} disabled={loading}>
          Fetch
        </Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      {stats && (
        <Box>
          <Typography>Original URL: {stats.originalURL}</Typography>
          <Typography>Created At: {stats.createdAt}</Typography>
          <Typography>Expiry: {stats.expiry}</Typography>
          <Typography>Total Clicks: {stats.totalClicks}</Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Referrer</TableCell>
                  <TableCell>Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stats.clicks.map((click, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{click.timestamp}</TableCell>
                    <TableCell>{click.referrer}</TableCell>
                    <TableCell>{click.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
} 