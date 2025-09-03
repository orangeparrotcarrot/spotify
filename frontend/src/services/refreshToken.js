async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refresh_token');
  const response = await fetch('http://127.0.0.1:5000/refresh_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken })
  });

  const data = await response.json();
  if (data.access_token) {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('expires_in', Date.now() + data.expires_in * 1000);
  } else {
    console.error('Failed to refresh token');
  }
}

export default refreshAccessToken;