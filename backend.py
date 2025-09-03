from flask import Flask, jsonify, request
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
    


if __name__ == '__main__':
    app.run(debug=True)