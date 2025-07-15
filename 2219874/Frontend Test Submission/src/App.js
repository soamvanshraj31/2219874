import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import UrlShortenerPage from './pages/UrlShortenerPage';
import StatisticsPage from './pages/StatisticsPage';

function NavBar() {
  const location = useLocation();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>URL Shortener Microservice</Typography>
        <Button color={location.pathname === '/' ? 'secondary' : 'inherit'} component={Link} to="/">Shortener</Button>
        <Button color={location.pathname === '/stats' ? 'secondary' : 'inherit'} component={Link} to="/stats">Statistics</Button>
      </Toolbar>
    </AppBar>
  );
}

function Footer() {
  return (
    <Box sx={{ mt: 6, py: 2, bgcolor: 'grey.100', textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} URL Shortener Microservice
      </Typography>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<UrlShortenerPage />} />
          <Route path="/stats" element={<StatisticsPage />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App; 