import { useEffect, useState } from "react";
import './Dashboard.css'

const RecentlyPlayed = () => {
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (!accessToken) return;
    fetch('https://api.spotify.com/v1/me/player/recently-played?limit=15', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(res => res.json())
      .then(data => setRecentlyPlayed(data.items || []))
      .catch(err => console.error('Error fetching recent tracks:', err));
  }, [accessToken]);

      return (
        <section>
          <h2 className="section-title">Recently Played</h2>
          <div className="track-grid">
            {recentlyPlayed.map(({ track }, i) => (
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
      )
}

export default RecentlyPlayed;