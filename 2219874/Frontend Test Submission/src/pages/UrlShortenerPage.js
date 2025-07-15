import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';
import Log from '../utils/log';

const API_BASE = 'http://localhost:5000';

const defaultRows = [
  { url: '', validity: '', shortcode: '', result: null, error: '' }
];

export default function UrlShortenerPage() {
  const [rows, setRows] = useState(defaultRows);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (idx, field, value) => {
    const updated = rows.map((row, i) => i === idx ? { ...row, [field]: value } : row);
    setRows(updated);
  };

  const addRow = () => {
    if (rows.length < 5) setRows([...rows, { url: '', validity: '', shortcode: '', result: null, error: '' }]);
  };

  const removeRow = idx => {
    if (rows.length > 1) setRows(rows.filter((_, i) => i !== idx));
  };

  const validateRow = row => {
    if (!row.url.trim()) return 'URL is required';
    try { new URL(row.url); } catch { return 'Invalid URL'; }
    if (row.validity && (isNaN(row.validity) || row.validity <= 0)) return 'Validity must be a positive number';
    if (row.shortcode && !/^[a-zA-Z0-9_-]+$/.test(row.shortcode)) return 'Shortcode must be alphanumeric, dash or underscore';
    return '';
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const updated = await Promise.all(rows.map(async (row, idx) => {
      const error = validateRow(row);
      if (error) {
        await Log('frontend', 'warn', 'UrlShortenerPage', `Validation error: ${error}`);
        return { ...row, result: null, error };
      }
      try {
        const payload = { url: row.url };
        if (row.validity) payload.validity = Number(row.validity);
        if (row.shortcode) payload.shortcode = row.shortcode;
        const res = await axios.post(`${API_BASE}/shorturls`, payload);
        await Log('frontend', 'info', 'UrlShortenerPage', `Shortened: ${row.url} -> ${res.data.shortLink}`);
        return { ...row, result: res.data, error: '' };
      } catch (err) {
        let msg = 'Error creating short URL';
        if (err.response && err.response.data && err.response.data.error) msg = err.response.data.error;
        await Log('frontend', 'error', 'UrlShortenerPage', `Error: ${msg}`);
        return { ...row, result: null, error: msg };
      }
    }));
    setRows(updated);
    setSubmitting(false);
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>URL Shortener</Typography>
      {rows.map((row, idx) => (
        <Paper key={idx} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={5}>
              <TextField
                label="URL"
                value={row.url}
                onChange={e => handleChange(idx, 'url', e.target.value)}
                fullWidth
                required
                error={!!row.error && row.error.includes('URL')}
                helperText={row.error && row.error.includes('URL') ? row.error : ''}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Validity (min)"
                value={row.validity}
                onChange={e => handleChange(idx, 'validity', e.target.value)}
                fullWidth
                error={!!row.error && row.error.includes('Validity')}
                helperText={row.error && row.error.includes('Validity') ? row.error : ''}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Shortcode (optional)"
                value={row.shortcode}
                onChange={e => handleChange(idx, 'shortcode', e.target.value)}
                fullWidth
                error={!!row.error && row.error.includes('Shortcode')}
                helperText={row.error && row.error.includes('Shortcode') ? row.error : ''}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button color="error" onClick={() => removeRow(idx)} disabled={rows.length === 1}>Remove</Button>
            </Grid>
            {row.result && (
              <Grid item xs={12}>
                <Typography color="primary">Short Link: <a href={row.result.shortLink} target="_blank" rel="noopener noreferrer">{row.result.shortLink}</a></Typography>
                <Typography>Expiry: {row.result.expiry}</Typography>
              </Grid>
            )}
            {row.error && !row.error.includes('URL') && !row.error.includes('Validity') && !row.error.includes('Shortcode') && (
              <Grid item xs={12}>
                <Typography color="error">{row.error}</Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
      ))}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button variant="outlined" onClick={addRow} disabled={rows.length >= 5}>Add Row</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={submitting}>Shorten URLs</Button>
      </Box>
    </Box>
  );
} 