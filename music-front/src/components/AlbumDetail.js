import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function AlbumDetail() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/albums/${id}`)
      .then(response => {
        setAlbum(response.data.album);
        setTracks(response.data.tracks.data);
      })
      .catch(error => console.error(error));
  }, [id]);

  const deleteTrack = (trackId) => {
    axios.delete(`http://localhost:8000/tracks/${trackId}`)
      .then(() => setTracks(tracks.filter(track => track.id !== trackId)))
      .catch(error => console.error(error));
  };

  return (
    <div>
      {album && (
        <div>
          <h1>{album.title}</h1>
          <p>by {album.artist}</p>
          <Link to={`/albums/${id}/add-track`}>Adicionar Faixa</Link>
          <h2>Faixas</h2>
          <ul>
            {tracks.map(track => (
              <li key={track.id}>
                {track.title} - {track.duration}
                <button onClick={() => deleteTrack(track.id)}>Excluir</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AlbumDetail;
