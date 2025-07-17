import React, { useState, useEffect } from 'react';
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
    }, 150);
  };

  useEffect(() => {
    // Add initial page load animation
    document.body.classList.add('overflow-hidden');
    setTimeout(() => {
      document.body.classList.remove('overflow-hidden');
    }, 100);
  }, []);

  const renderContent = () => {
    const contentClass = `page-transition ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} transition-all duration-300 ease-out`;
    
    switch (activeTab) {
      case 'tracking':
        return (
          <div className={contentClass}>
            <GreenTracking />
          </div>
        );
      case 'marketplace':
        return (
          <div className={contentClass}>
            <Marketplace />
          </div>
        );
      case 'community':
        return (
          <div className={contentClass}>
            <Community />
          </div>
        );
      case 'leaderboard':
        return (
          <div className={contentClass}>
            <Leaderboard />
          </div>
        );
      case 'profile':
        return (
          <div className={contentClass}>
            <Profile />
          </div>
        );
      default:
        return (
          <div className={contentClass}>
            <Hero setActiveTab={handleTabChange} />
          </div>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50/30 to-secondary-50/20 relative overflow-x-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float animation-delay-300"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float animation-delay-500"></div>
        </div>

        <Navigation activeTab={activeTab} setActiveTab={handleTabChange} />
        
        <main className="relative z-10">
          {renderContent()}
        </main>

        {/* Loading overlay for transitions */}
        {isTransitioning && (
          <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;