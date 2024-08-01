import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AlbumList from './components/AlbumList';
import AlbumDetail from './components/AlbumDetail';
import AddAlbum from './components/AddAlbum';
import AddTrack from './components/AddTrack';
import Search from './components/Search';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AlbumList />} />
          <Route path="/albums/:id" element={<AlbumDetail />} />
          <Route path="/add-album" element={<AddAlbum />} />
          <Route path="/albums/:id/add-track" element={<AddTrack />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
