import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AlbumList() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/albums')
      .then(response => {
        console.log(response.data.data); // Verifique a estrutura dos dados
        setAlbums(response.data.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Álbuns</h1>
     <ul>
     {albums.map(({id ,attributes }) =>(
        <li key={id}>{attributes.title}</li>
     ))}
     
      {/*  {albums.data.map(album => (
          <li key={album.id}>
            <Link to={`/albums/${album.id}`}>{album.title}</Link> by {album.artist}
          </li>
        ))}*/}
      </ul>
      <Link to="/add-album">Adicionar Álbum</Link>
    </div>
  );
}

export default AlbumList;
