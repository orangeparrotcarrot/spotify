import sqlite3
con = sqlite3.connect("songs.db")
cur = con.cursor()
try:
    cur.execute("CREATE TABLE recentlyPlayed(" \
    "songID PRIMARY KEY," \
    "played_at)")
except:
    print("Table recentlyPlayed already exists")
try:
    cur.execute("CREATE TABLE songInfo(" \
    "songID PRIMARY KEY, " \
    "name, artist, release_date, album_art)")
except:
    print("Table songInfo already exists")
con.commit()
con.close()
print("Database created with two tables")