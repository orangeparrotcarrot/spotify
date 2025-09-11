import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";

const StravaDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const accessToken = localStorage.getItem("strava_access_token");

  const onClickActivity = (track) => {
    if (!track) return;
    // add duration
    setSelectedActivity(track);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedActivity(null);
  };

  useEffect(() => {
    if (!accessToken) {
      console.error("No access token found");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const profileRes = await fetch("https://www.strava.com/api/v3/athlete", {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        const profileData = await profileRes.json();

        const activitiesRes = await fetch("https://www.strava.com/api/v3/athlete/activities?per_page=15", {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        const activitiesData = await activitiesRes.json();

        setProfile(profileData);
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        console.log(activitiesData)
      } catch (error) {
        console.error("Error fetching Strava data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="spinner" />
        <p style={{ textAlign: "center", marginTop: "1rem" }}>Loading Strava dashboard...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="dashboard">
        <p className="empty-message">Unable to load profile. Please log in again.</p>
      </div>
    );
  }


  return (
    <div className="dashboard">
      <SideBar />

      <main className="main-content">
        <header className="profile-header">
          <h1>Your recent activities</h1>
        </header>

        <div className="tracks">
          <section>
            <div className="tracksHeader">
              <h2 className="section-title">Recent Activities</h2>
              <div className="track-grid">
                {activities.map((item, i) => {
                  const track = item.track || item;
                  return (
                    <div
                      className="track-card"
                      key={track.id || i}
                      onClick={() => onClickActivity(track)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img src={"https://static.thenounproject.com/png/104062-200.png"} alt="Activity" />
                      <div className="track-info">
                        <strong>{track.name}</strong>
                        <p>{(track.distance / 1000).toFixed(2)} km · {Math.round(track.moving_time / 60)} min</p>
                        <span className="album-name">{Math.floor((1000/track.average_speed) / 60)}:{(Math.round(1000/track.average_speed) % 60)} min/km</span>
                      </div>
                    </div>
                  );
                })}

                {showModal && selectedActivity && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <button className="close-btn" onClick={closeModal}>X</button>
                      <h2>{selectedActivity.name}</h2>
                      <p><strong>Distance:</strong>{(selectedActivity.distance / 1000).toFixed(2)} km</p>
                      <p><strong>Time:</strong>{Math.round(selectedActivity.moving_time / 60)} min</p>
                      <p><strong>Pace:</strong> {Math.floor((1000/selectedActivity.average_speed) / 60)}:{(Math.round(1000/selectedActivity.average_speed) % 60)} min/km</p>
                      <p><strong>Start time:</strong> {selectedActivity.start_dae_local}</p>
                      <p><strong>Finish time:</strong>{selectedActivity.elapsed_time}</p>
                      {selectedActivity.preview_url && (
                        <audio controls src={selectedActivity.preview_url} />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default StravaDashboard;
