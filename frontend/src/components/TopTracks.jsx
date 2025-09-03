import { useEffect, useState } from "react";
import './Dashboard.css'

const TopTracks = () => {
    const [topTracks, setTopTracks] = useState([]);
    const [time, setTime] = useState("long_term");
    const [itemNumber, setItemNumber] = useState(15);
    const accessToken = localStorage.getItem('access_token');

    useEffect(() => {
        if (!accessToken || !time || !itemNumber) return;
        fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${time}&limit=${itemNumber}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
          .then(res => res.json())
          .then(data => setTopTracks(data.items || []))
          .catch(err => console.error('Error fetching top tracks:', err));
      }, [accessToken, time, itemNumber]);

      return (
        <section>
          <div className="tracksHeader">
            <h2 className="section-title">Top Tracks</h2>
            <label>
              Time frame:
              <select defaultValue={time} onChange={e => setTime(e.target.value)}>
            <option value="short_term">Last month</option>
            <option value="medium_term">Last 6 months</option>
            <option value="long_term">Last 12 months</option>
          </select>
            </label>
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