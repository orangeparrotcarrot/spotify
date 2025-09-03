import { useState } from 'react';
import "./tracks.css";

function TrackGrid({ tracks }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) return <p>Missing Access Token</p>;

  const onClickTrack = (track) => {
    if (!track) return;
    console.log(track)
    // add duration
    setSelectedTrack(track);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTrack(null);
  };

  return (
    <div className="track-grid">
      {tracks.map((item, i) => {
        const track = item.track || item;
        return (
          <div
            className="track-card"
            key={track.id || i}
            onClick={() => onClickTrack(track)}
            style={{ cursor: 'pointer' }}
          >
            <img src={track.album.images[0]?.url} alt={track.name} />
            <div className="track-info">
              <strong>{track.name}</strong>
              <p>{track.artists.map(a => a.name).join(', ')}</p>
              <span className="album-name">{track.album.name}</span>
            </div>
          </div>
        );
      })}

      {showModal && selectedTrack && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>X</button>
            <img src={selectedTrack.album.images[0]?.url} alt={selectedTrack.name} />
            <h2>{selectedTrack.name}</h2>
            <p><strong>Artists:</strong> {selectedTrack.artists.map(a => a.name).join(', ')}</p>
            <p><strong>Album:</strong> {selectedTrack.album.name}</p>
            <p><strong>Release Date:</strong> {selectedTrack.album.release_date}</p>
            <p><strong>Popularity:</strong> {selectedTrack.popularity}/100</p>
            {selectedTrack.preview_url && (
              <audio controls src={selectedTrack.preview_url} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TrackGrid;
