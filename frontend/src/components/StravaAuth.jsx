// src/components/StravaAuth.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const STRAVA_CLIENT_ID = "176472";
const REDIRECT_URI = "http://127.0.0.1:5173/strava/callback";

const StravaAuth = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("strava_access_token");
  const expiresAt = localStorage.getItem("strava_expires_at");

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);

    if (accessToken && expiresAt && now < parseInt(expiresAt)) {
      navigate("/strava/dashboard");
    } else {
      const authUrl = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=force&scope=activity:read_all`;
      window.location.href = authUrl;
    }
  }, [accessToken, expiresAt, navigate]);

  return null;
};

export default StravaAuth;
