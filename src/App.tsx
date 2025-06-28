import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import GreenTracking from './components/GreenTracking';
import Marketplace from './components/Marketplace';
import Community from './components/Community';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'tracking':
        return <GreenTracking />;
      case 'marketplace':
        return <Marketplace />;
      case 'community':
        return <Community />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile />;
      default:
        return <Hero setActiveTab={setActiveTab} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderContent()}
      </div>
    </AuthProvider>
  );
}

export default App;