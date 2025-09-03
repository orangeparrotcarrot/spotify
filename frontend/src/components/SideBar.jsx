const SideBar = () => {
  return (
    <aside className="sidebar">
      <h2>Spotify Stats</h2>
      <nav>
        <a href="/dashboard">Dashboard</a>
        <a href = "/topTracks">Top Tracks</a>
        <a href="/recentlyPlayed">Recently Played</a>
        <a href="/topArtists">Top Artists</a>
        <a href="/todo">To Do List</a>
      </nav>
    </aside>
  )
}

export default SideBar