import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import polyline from "@mapbox/polyline";
import "./tracks.css"
import './Dashboard.css'

const StravaDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [finishTime, setFinishTime] = useState(0)
  const [activeTab, setActiveTab] = useState("stats");

  const accessToken = localStorage.getItem("strava_access_token");
  useEffect(() => {
    if (!selectedActivity || !selectedActivity.map?.summary_polyline) return;

    const decoded = polyline.decode(selectedActivity.map.summary_polyline);
    const latLngs = decoded.map(([lat, lng]) => L.latLng(lat, lng));

    const map = L.map("activity-map").setView(latLngs[0], 13);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {attribution: '&copy; <a href="https://carto.com/">CARTO</a>',}).addTo(map);

    L.polyline(latLngs, { color: "orange", weight: 4 }).addTo(map);

    return () => {
      map.remove();
    };
  }, [selectedActivity]);

  const onClickActivity = (track) => {
    if (!track) return;
    setSelectedActivity(track);
    const initialStartTime = track.start_date_local;
    let time = initialStartTime.split("T")[1].slice(0,-1)
    const elapsed_mins = Math.round(track.elapsed_time / 60);
    const elapsed_secs = track.elapsed_time % 60
    const split_time = time.split(":")
    let finish_hours = parseInt(split_time[0])
    let finish_minutes = elapsed_mins + parseInt(split_time[1])
    let finish_secs = elapsed_secs + parseInt(split_time[2])
    if (finish_secs > 59) {
      finish_minutes +=1
      finish_secs -= 60
    } 
    if (finish_minutes > 59) {
      finish_hours +=1;
      finish_minutes -= 60;
    }
    if (finish_secs < 10){
      finish_secs = "0" + finish_secs
    }
    if (finish_minutes < 10) {
      finish_minutes = "0" + finish_minutes
    }
    if (finish_hours < 10) {
      finish_hours = "0" + finish_hours
    }
    setStartTime(time);
    setFinishTime(finish_hours+":"+finish_minutes+":"+finish_secs);
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
            </div>
            <div className="track-grid">
              {activities.map(artist => (
                <div className="track-card" key={artist.id} onClick={() => onClickActivity(artist)} style={{ cursor: 'pointer' }}>
                  <img src={"https://static.thenounproject.com/png/104062-200.png"} alt="Activity" />
                  <div className="track-info">
                    <strong>{artist.name}</strong>
                    <p>{(artist.distance / 1000).toFixed(2)} km · {Math.round(artist.moving_time / 60)} min</p>
                    <span className="album-name">{Math.floor((1000/artist.average_speed) / 60)}:{(Math.round(1000/artist.average_speed) % 60)} min/km</span>
                  </div>
                </div>
              ))}

              {showModal && selectedActivity && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <button className="close-btn" onClick={closeModal}>X</button>
                    <h2>{selectedActivity.name}</h2>
                    <div className="tab-buttons">
                      <button 
                        className={activeTab === "stats" ? "active" : ""} 
                        onClick={() => setActiveTab("stats")}
                      >
                        Stats
                      </button>
                      <button 
                        className={activeTab === "music" ? "active" : ""} 
                        onClick={() => setActiveTab("music")}
                      >
                        Music
                      </button>
                    </div>
                    {activeTab === "stats" && (
                      <><p><strong>Distance: </strong>{(selectedActivity.distance / 1000).toFixed(2)} km</p>
                        <p><strong>Moving time: </strong>{Math.round(selectedActivity.moving_time / 60)} min</p>
                        {selectedActivity.type === "Run" && (
                          <p><strong>Pace: </strong> {Math.floor((1000/selectedActivity.average_speed) / 60)}:{(Math.round(1000/selectedActivity.average_speed) % 60)} min/km</p>
                        )}
                        <p><strong>Start time:</strong> {startTime}</p>
                        <p><strong>Finish time: </strong>{finishTime}</p>
                      </>
                    )}
                    {activeTab === "music" && (
                      <div className="music-tab">
                        <p><strong>Tracks you listened to:</strong></p>
                        <p>No information yet</p>
                      </div>
                    )}
                    {selectedActivity.type === "Run" && (
                      <div
                        id="activity-map"
                        style={{
                          height: "300px",
                          width: "100%",
                          marginTop: "1rem",
                          display: activeTab === "stats" ? "block" : "none"
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>      
    </div>
  )
};

export default StravaDashboard;
