import React from 'react';

function Home() {
  const handleLogin = () => {
    const clientId = 'ae39e7ed24bb4d69b3adac06305c8e6a';
    const redirectUri = 'http://127.0.0.1:5173/callback'; // Match your frontend port
    const scopes = [
  'user-read-recently-played',
  'user-read-private',
  'playlist-read-private',
  'user-top-read'
];
    const authEndpoint = 'https://accounts.spotify.com/authorize';

    const authUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scopes.join('%20')}`;

    window.location.href = authUrl;
  };

  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>Welcome to Your Spotify Companion</h1>
      <p>Log in to explore your music profile, top tracks, and more.</p>
      <button
        onClick={handleLogin}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          backgroundColor: '#1DB954',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          marginTop: '2rem'
        }}
      >
        Log in with Spotify
      </button>
    </div>
  );
}

export default Home;
