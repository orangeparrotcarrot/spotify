import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [recentTracks, setRecentTracks] = useState([]);
  const accessToken = localStorage.getItem('access_token');

  // Fetch user profile
  useEffect(() => {
    if (!accessToken) return;
    fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error('Error fetching profile:', err));
  }, [accessToken]);

  // Fetch top tracks
  useEffect(() => {
    if (!accessToken) return;
    fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(res => res.json())
      .then(data => setTopTracks(data.items || []))
      .catch(err => console.error('Error fetching top tracks:', err));
  }, [accessToken]);

  // Fetch recently played tracks
  useEffect(() => {
    if (!accessToken) return;
    fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(res => res.json())
      .then(data => setRecentTracks(data.items || []))
      .catch(err => console.error('Error fetching recent tracks:', err));
  }, [accessToken]);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>🎵 MySpotify</h2>
        <nav>
          <a href="/">Home</a>
          <a href="/dashboard">Dashboard</a>
        </nav>
      </aside>

      <main className="main-content">
        {profile && (
          <header className="profile-header">
            <img
              src={profile.images?.[0]?.url}
              alt="Profile"
              className="profile-avatar"
            />
            <h1>Welcome, {profile.display_name}</h1>
          </header>
        )}

        <section>
          <h2 className="section-title">🎧 Top Tracks</h2>
          <div className="track-grid">
            {topTracks.map(track => (
              <div className="track-card" key={track.id}>
                <img src={track.album.images[0]?.url} alt={track.name} />
                <div className="track-info">
                  <strong>{track.name}</strong>
                  <p>{track.artists.map(a => a.name).join(', ')}</p>
                  <span className="album-name">{track.album.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">⏪ Recently Played</h2>
          <div className="track-grid">
            {recentTracks.map(({ track }, i) => (
              <div className="track-card" key={i}>
                <img src={track.album.images[0]?.url} alt={track.name} />
                <div className="track-info">
                  <strong>{track.name}</strong>
                  <p>{track.artists.map(a => a.name).join(', ')}</p>
                  <span className="album-name">{track.album.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
