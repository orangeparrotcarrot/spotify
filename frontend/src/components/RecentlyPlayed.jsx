import { useEffect, useState } from "react";
import './Dashboard.css'

const RecentlyPlayed = () => {
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [itemNumber, setItemNumber] = useState(15);
    const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (!accessToken || !itemNumber) return;
    fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=${itemNumber}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(res => res.json())
      .then(data => setRecentlyPlayed(data.items || []))
      .catch(err => console.error('Error fetching recent tracks:', err));
  }, [accessToken, itemNumber]);

      return (
        <section>
          <div className="tracksHeader">
            <h2 className="section-title">Recently Played</h2>

            <label>
            Items displayed:
          <select defaultValue={itemNumber} onChange={e => setItemNumber(e.target.value)}>
            <option value="6">6</option>
            <option value="15">15</option>
            <option value="24">24</option>
            <option value="30">30</option>
          </select>
          </label>
          </div>

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