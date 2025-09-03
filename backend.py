from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from spotipy.oauth2 import SpotifyOAuth

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5173"])
app.secret_key = os.urandom(24)

CLIENT_ID="ae39e7ed24bb4d69b3adac06305c8e6a"
CLIENT_SECRET="b20c30bdc9ca42fe9be637041677d481"
REDIRECT_URI="http://127.0.0.1:5173/callback"
SCOPE = (
    "user-read-playback-state"
    "user-modify-playback-state"
    "user-read-recently-played"
    "user-library-read"
    "user-read-currently-playing"
)


@app.route('/get-token', methods=['POST'])
def get_token():
    code = request.json.get('code')
    sp_oauth = SpotifyOAuth(client_id=CLIENT_ID,
                            client_secret=CLIENT_SECRET,
                            redirect_uri=REDIRECT_URI,
                            scope=SCOPE)
    token_info = sp_oauth.get_access_token(code)
    return jsonify(token_info)
    


if __name__ == '__main__':
    app.run(debug=True)