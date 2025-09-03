import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import TopTracks from './TopTracks';
// import RecentlyPlayed from './RecentlyPlayed';
import './Dashboard.css';

// useEffect(() => {
//   const interval = setInterval(() => {
//     const expiresAt = parseInt(localStorage.getItem('expires_in'), 10);
//     if (Date.now() > expiresAt - 300000) { // 5 minutes before expiry
//       refreshAccessToken();
//     }
//   }, 60000); // check every minute

//   return () => clearInterval(interval);
// }, []);

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const accessToken = localStorage.getItem('access_token');

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
        
      </main>
    </div>
  );
};

export default Dashboard;
