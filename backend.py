from flask import Flask, jsonify, request
import requests
import base64
from flask_cors import CORS
import os
from spotipy.oauth2 import SpotifyOAuth
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5173"])
app.secret_key = os.urandom(24)

load_dotenv()
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")
SCOPE = os.getenv("SCOPE")

@app.route('/get-token', methods=['POST'])
def get_token():
    code = request.json.get('code')
    sp_oauth = SpotifyOAuth(client_id=CLIENT_ID,
                            client_secret=CLIENT_SECRET,
                            redirect_uri=REDIRECT_URI,
                            scope=SCOPE)
    token_info = sp_oauth.get_access_token(code)
    return jsonify(token_info)
    
@app.route('/refresh_token', methods=['POST'])
def refresh_token():
    refresh_token = request.json.get('refresh_token')
    
    response = requests.post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
    }, headers={
        'Authorization': f'Basic {base64.b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode()}',
        'Content-Type': 'application/x-www-form-urlencoded'
    })

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Failed to refresh token'}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)