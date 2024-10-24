import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Profile from './components/Profile.jsx';
import WineListScanner from './components/WineListScanner.jsx';
import WineRecommendations from './components/WineRecommendations.jsx';
import './index.css';
import BottomNav from './components/BottomNav.jsx';
import LoginRegisterForm from './components/LoginRegisterForm.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-beige to-wine-red text-gold">
        <Header />
        <Routes>
          <Route path="/login" element={<LoginRegisterForm />} />
          <Route path="/" element={<Profile />} />
          <Route path="/scanner" element={<WineListScanner />} />
          <Route path="/recommendations" element={<WineRecommendations />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;