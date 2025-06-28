import React, { useState } from 'react';
import { Leaf, ShoppingBag, MessageCircle, Trophy, User, LogOut, UserCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './Auth/AuthModal';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { user, signOut, isGuest } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const navItems = [
    { id: 'tracking', label: 'Green Tracking', icon: Leaf },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'community', label: 'Community', icon: MessageCircle },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleSignOut = async () => {
    await signOut();
    setActiveTab('home');
  };

  return (
    <>
      <nav className="bg-white shadow-lg border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">Greenify</span>
            </button>
            
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-green-100 text-green-700 font-medium'
                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="hidden md:flex items-center space-x-3">
                    <img
                      src={user.user_metadata?.avatar || 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                      alt={user.user_metadata?.name || 'User'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700 font-medium">
                        {user.user_metadata?.name || 'User'}
                      </span>
                      {isGuest && (
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                          <UserCheck className="h-3 w-3" />
                          <span>Guest</span>
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {isGuest ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAuthClick('signup')}
                        className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Sign Up
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors text-sm"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="hidden md:inline">Exit</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="hidden md:inline">Sign Out</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleAuthClick('signin')}
                    className="text-gray-600 hover:text-green-600 font-medium transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden bg-white border-t border-green-100">
          <div className="grid grid-cols-5 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center py-3 px-2 transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs mt-1">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Navigation;