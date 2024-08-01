import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ albums: [], tracks: [] });

  const handleSearch = () => {
    axios.get(`http://localhost:8000/search?q=${query}`)
      .then(response => setResults(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Pesquisar</h1>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Pesquisar</button>
      <div>
        <h2>Álbuns</h2>
        <ul>
          {results.albums.map(album => (
            <li key={album.id}>
              {album.title} by {album.artist}
            </li>
          ))}
        </ul>
        <h2>Faixas</h2>
        <ul>
          {results.tracks.map(track => (
            <li key={track.id}>
              {track.title} - {track.duration}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;
