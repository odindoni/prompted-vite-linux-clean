import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import DeckViewer from './components/DeckViewer';
import MobileViewer from './components/MobileViewer';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/session" element={<DeckViewer />} />
        <Route path="/mobile" element={<MobileViewer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

