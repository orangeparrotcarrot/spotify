import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SpotifyCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      fetch('http://127.0.0.1:5000/get-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })
        .then(res => res.json())
        .then(data => {
          // Store token if needed
          localStorage.setItem('access_token', data.access_token);
          // Redirect to desired page
          navigate('/dashboard'); // Change this to your target route
        })
        .catch(err => {
          console.error('Token exchange failed:', err);
          navigate('/error');
        });
    } else {
      navigate('/error');
    }
  }, [navigate]);

  return <h2>Authenticating with Spotify...</h2>;
}

export default SpotifyCallback;
