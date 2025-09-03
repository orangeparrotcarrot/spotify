import React from 'react';

function TrackGrid({ tracks }) {
  return (
    <div className="track-grid">
      {tracks.map((item, i) => {
        const track = item.track || item;
        return (
          <div className="track-card" key={track.id || i}>
            <img src={track.album.images[0]?.url} alt={track.name} />
            <div className="track-info">
              <strong>{track.name}</strong>
              <p>{track.artists.map(a => a.name).join(', ')}</p>
              <span className="album-name">{track.album.name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TrackGrid;
