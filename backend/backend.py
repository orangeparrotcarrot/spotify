from flask import Flask, jsonify, request, redirect
import requests
from flask_cors import CORS
import os
from spotipy.oauth2 import SpotifyOAuth
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5173"])
app.secret_key = os.urandom(24)

load_dotenv()
SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
SPOTIFY_REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")
SPOTIFY_SCOPE = os.getenv("SPOTIFY_SCOPE")

STRAVA_CLIENT_ID = os.getenv("STRAVA_CLIENT_ID")
STRAVA_CLIENT_SECRET = os.getenv("STRAVA_CLIENT_SECRET")
STRAVA_REDIRECT_URI = os.getenv("STRAVA_REDIRECT_URI")

@app.route('/get-token', methods=['POST'])
def get_token():
    code = request.json.get('code')
    sp_oauth = SpotifyOAuth(client_id=SPOTIFY_CLIENT_ID,
                            client_secret=SPOTIFY_CLIENT_SECRET,
                            redirect_uri=SPOTIFY_REDIRECT_URI,
                            scope=SPOTIFY_SCOPE)
    token_info = sp_oauth.get_access_token(code)
    return jsonify(token_info)
    
# @app.route('/refresh_token', methods=['POST'])
# def refresh_token():
#     refresh_token = request.json.get('refresh_token')
    
#     response = requests.post('https://accounts.spotify.com/api/token', data={
#         'grant_type': 'refresh_token',
#         'refresh_token': refresh_token,
#     }, headers={
#         'Authorization': f'Basic {base64.b64encode(f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}".encode()).decode()}',
#         'Content-Type': 'application/x-www-form-urlencoded'
#     })

#     if response.status_code == 200:
#         return jsonify(response.json())
#     else:
#         return jsonify({'error': 'Failed to refresh token'}), response.status_code
    
@app.route("/strava/authorize", methods=["GET"])
def strava_authorize():
    url = (
        f"https://www.strava.com/oauth/authorize?client_id={STRAVA_CLIENT_ID}"
        f"&response_type=code&redirect_uri={STRAVA_REDIRECT_URI}"
        f"&approval_prompt=force&scope=activity:read_all"
    )
    return redirect(url)

# Strava: Handle callback and exchange code
@app.route("/strava/callback", methods=["GET", "POST"])
def strava_callback():
    if request.method == "POST":
        code = request.json.get("code")
    else:
        code = request.args.get("code")

    token_response = requests.post("https://www.strava.com/oauth/token", data={
        "client_id": STRAVA_CLIENT_ID,
        "client_secret": STRAVA_CLIENT_SECRET,
        "code": code,
        "grant_type": "authorization_code"
    })
    print(token_response.json())
    return jsonify(token_response.json())

if __name__ == '__main__':
    app.run(debug=True)