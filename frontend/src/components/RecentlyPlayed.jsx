import { useEffect, useState } from "react";
import './Dashboard.css'
import SideBar from "./SideBar";
import TrackGrid from "./TrackGrid";

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [itemNumber, setItemNumber] = useState(15);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (!accessToken || !itemNumber) return;

    const fetchData = async () => {
      try {
        const trackReq = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=${itemNumber}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const trackData = await trackReq.json()
        setRecentlyPlayed(trackData.items || [])
      } catch (error) {
        console.error("Error fetching recent tracks:", error)
      }
    }
    fetchData()
  }, [accessToken, itemNumber]);

  return (
    <div className="dashboard">
      <SideBar />

      <main className="main-content">
        <header className="profile-header">
          <h1>Your recently played tracks</h1>
        </header>
        <div className="tracks">
          <section>
            <div className="tracksHeader">
              <h2 className="section-title">Recently Played</h2>

              <label>
                Items displayed:
                <select defaultValue={itemNumber} onChange={e => setItemNumber(e.target.value)}>
                  <option value="9">9</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                </select>
              </label>
            </div>

            <TrackGrid tracks={recentlyPlayed} />
          </section>
        </div>
      </main>
          
    </div>
  )
}

export default RecentlyPlayed;