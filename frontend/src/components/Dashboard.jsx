import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import TopTracks from './TopTracks';
import RecentlyPlayed from './RecentlyPlayed';
import './Dashboard.css';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
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


  return (
    <div className="dashboard">
      <SideBar />

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

      <div className="tracks">
        <RecentlyPlayed />
        <TopTracks />
      </div>
      
        
      </main>
    </div>
  );
};

export default Dashboard;
