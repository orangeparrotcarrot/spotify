import sqlite3
import os
from spotipy.oauth2 import SpotifyOAuth
import spotipy
from dotenv import load_dotenv
load_dotenv()
SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
SPOTIFY_REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")
SPOTIFY_SCOPE = os.getenv("SPOTIFY_SCOPE")


con = sqlite3.connect("songs.db")
cur = con.cursor()

def createTables():
    try:
        # cur.execute("DROP TABLE IF EXISTS recentlyPlayed")
        cur.execute("CREATE TABLE recentlyPlayed(" \
                    "id INTEGER PRIMARY KEY AUTOINCREMENT," \
                    "songID TEXT," \
                    "played_at TEXT)")
        print("Table recentlyPlayed created")
    except Exception as e:
        print(f"Error creating recentlyPlayed: {e}")

    try:
        # cur.execute("DROP TABLE IF EXISTS songInfo")
        cur.execute("CREATE TABLE IF NOT EXISTS songInfo(" \
                    "songID TEXT PRIMARY KEY, " \
                    "name TEXT, artist TEXT, release_date TEXT, album_art TEXT)")
        print("Table songInfo created")
    except Exception as e:
        print(f"Error creating songInfo: {e}")

    con.commit()


def populateTables():
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
        client_id=SPOTIFY_CLIENT_ID,
        client_secret=SPOTIFY_CLIENT_SECRET,
        redirect_uri=SPOTIFY_REDIRECT_URI,
        scope=SPOTIFY_SCOPE
    ))

    results = sp.current_user_recently_played(limit=50)
    total_inserted = 0

    for item in results.get('items', []):
        track = item['track']
        song_id = track['id']
        played_at = item['played_at']

        cur.execute("SELECT 1 FROM recentlyPlayed WHERE songID = ? AND played_at = ?", (song_id, played_at))
        if cur.fetchone():
            continue

        name = track['name']
        artist = ', '.join([a['name'] for a in track['artists']])
        release_date = track['album']['release_date']
        album_art = track['album']['images'][0]['url'] if track['album']['images'] else None
       
        cur.execute("INSERT INTO recentlyPlayed (songID, played_at) VALUES (?, ?)", (song_id, played_at))

        cur.execute("SELECT 1 FROM songInfo WHERE songID = ?", (song_id,))
        if not cur.fetchone():
            cur.execute("INSERT INTO songInfo (songID, name, artist, release_date, album_art) VALUES (?, ?, ?, ?, ?)",
                        (song_id, name, artist, release_date, album_art))

        total_inserted += 1

    con.commit()
    print(f"Finished. Total new sessions inserted: {total_inserted}")

def showTableContents():
    print("\n--- recentlyPlayed ---")
    cur.execute("SELECT * FROM recentlyPlayed")
    rows = cur.fetchall()
    for row in rows:
        print(row)
    print("COUNT: ", len(rows))

    print("\n--- songInfo ---")
    cur.execute("SELECT * FROM songInfo")
    rows = cur.fetchall()
    for row in rows:
        print(row)
    print("COUNT:", len(rows))


# createTables()
populateTables()
showTableContents()

con.close()