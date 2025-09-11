import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const StravaCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");

    if (!code) {
      console.error("No code found in URL");
      setLoading(false);
      return;
    }

    fetch("http://127.0.0.1:5000/strava/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        if (data.access_token) {
          localStorage.setItem("strava_access_token", data.access_token);
          localStorage.setItem("strava_expires_at", data.expires_at);
          console.log("Token stored:", data.access_token);
          navigate("/strava/dashboard");
        } else {
          throw new Error("access_token missing in response");
        }
      })
      .catch((error) => {
        console.error("Error during token exchange:", error);
        setLoading(false);
      });
  }, [location, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {loading ? (
        <div>
          <div className="spinner" />
          <p>Authenticating with Strava...</p>
        </div>
      ) : (
        <p>Something went wrong. Please try again.</p>
      )}
    </div>
  );
};

export default StravaCallback;
