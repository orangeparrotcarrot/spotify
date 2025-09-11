import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SpotifyCallback from './components/SpotifyCallback';
import Dashboard from './components/Dashboard';
import Error from './components/Error';
import ToDo from './components/ToDo';
import RecentlyPlayed from './components/RecentlyPlayed';
import TopTracks from './components/TopTracks';
import TopArtists from './components/TopArtists';
import StravaAuth from './components/StravaAuth';
import StravaCallback from './components/StravaCallBack';
import StravaDashboard from './components/StravaDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<SpotifyCallback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/error" element={<Error />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/recentlyPlayed" element={<RecentlyPlayed />} />
        <Route path="/topTracks" element={<TopTracks />} />
        <Route path="/topArtists" element={<TopArtists />} />
        <Route path="/strava" element={<StravaAuth/>} />
        <Route path="/strava/callback" element={<StravaCallback />} />
        <Route path="/strava/dashboard" element={<StravaDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;