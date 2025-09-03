import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SpotifyCallback from './components/SpotifyCallback';
import Dashboard from './components/Dashboard';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/callback" element={<SpotifyCallback />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/error" element={<h2>Something went wrong</h2>} />
  </Routes>
</BrowserRouter>
