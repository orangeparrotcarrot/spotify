import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SpotifyCallback from './components/SpotifyCallback';
import Dashboard from './components/Dashboard';
import Error from './components/Error';
import ToDo from './components/ToDo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<SpotifyCallback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/error" element={<Error />} />
        <Route path="/todo" element={<ToDo />} />
      </Routes>
    </Router>
  );
}

export default App;