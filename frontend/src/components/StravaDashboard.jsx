import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";

const StravaDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem("strava_access_token");

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

        const activitiesRes = await fetch("https://www.strava.com/api/v3/athlete/activities?per_page=5", {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        const activitiesData = await activitiesRes.json();
        console.log(activities)

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

      <div className="dashboard-header">
        <img src={profile.profile} alt="Profile" />
        <h1>{profile.firstname} {profile.lastname}</h1>
      </div>

      <section>
        <h2>Recent Activities</h2>
        {activities.length === 0 ? (
          <p className="empty-message">No recent activities found.</p>
        ) : (
          <div className="track-grid">
            {activities.map((activity) => (
              <div className="track-card" key={activity.id}>
                <img
                  src="https://static.thenounproject.com/png/104062-200.png"
                  alt="Activity"
                />
                <div className="track-info">
                  <strong>{activity.name}</strong>
                  <div className="album-name">
                    {Math.round(activity.distance / 1000)} km · {Math.round(activity.moving_time / 60)} min
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default StravaDashboard;
