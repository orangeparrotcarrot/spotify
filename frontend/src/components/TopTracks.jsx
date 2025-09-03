import { useEffect, useState } from "react";
import './Dashboard.css'

const TopTracks = () => {
    const [topTracks, setTopTracks] = useState([]);
    const accessToken = localStorage.getItem('access_token');

    useEffect(() => {
        if (!accessToken) return;
        fetch('https://api.spotify.com/v1/me/top/tracks?limit=15', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
          .then(res => res.json())
          .then(data => setTopTracks(data.items || []))
          .catch(err => console.error('Error fetching top tracks:', err));
      }, [accessToken]);

      return (
        <section>
          <h2 className="section-title">Top Tracks</h2>
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
      )
}

export default TopTracks;