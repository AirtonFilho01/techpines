import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function AddTrack() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8000/albums/${id}/tracks`, { title, duration })
      .then(() => navigate(`/albums/${id}`))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Adicionar Faixa</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Duração</label>
          <input type="text" value={duration} onChange={e => setDuration(e.target.value)} required />
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default AddTrack;
