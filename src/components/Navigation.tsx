import React, { useState, useEffect } from 'react';
import { Leaf, ShoppingBag, MessageCircle, Trophy, User, LogOut, UserCheck, Menu, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'tracking', label: 'Green Tracking', icon: Leaf, shortLabel: 'Track' },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, shortLabel: 'Shop' },
    { id: 'community', label: 'Community', icon: MessageCircle, shortLabel: 'Community' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, shortLabel: 'Leaders' },
    { id: 'profile', label: 'Profile', icon: User, shortLabel: 'Profile' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleSignOut = async () => {
    await signOut();
    setActiveTab('home');
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glassmorphism shadow-lg backdrop-blur-xl bg-white/80' 
            : 'bg-gradient-to-r from-primary-50/80 via-white/60 to-secondary-50/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <Leaf className="h-8 w-8 text-primary-600 group-hover:text-primary-700 transition-colors duration-300" />
                <div className="absolute -inset-1 bg-primary-200 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <span className="text-2xl font-bold text-gradient hidden sm:block">Greenify</span>
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`nav-item group relative ${isActive ? 'active' : ''} animation-delay-${index * 100}`}
                  >
                    <Icon className={`h-5 w-5 transition-all duration-300 ${
                      isActive ? 'scale-110' : 'group-hover:scale-110'
                    }`} />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-bounce-in"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  {isGuest ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAuthClick('signup')}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        Sign Up
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="btn-ghost text-red-600 hover:bg-red-50 text-sm px-3 py-2"
                      >
                        <LogOut className="h-4 w-4 mr-1" />
                        Exit
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleSignOut}
                      className="btn-ghost text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Sign Out
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleAuthClick('signin')}
                    className="btn-ghost"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="btn-primary"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-primary-50 transition-all duration-300 hover:scale-110"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-primary-600" />
              ) : (
                <Menu className="h-6 w-6 text-primary-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-40 animate-fade-in">
            <div className="bg-white/95 backdrop-blur-xl border-t border-primary-100 shadow-xl animate-slide-in-left">
              <div className="p-6 space-y-4">
                {/* Mobile Navigation Items */}
                <div className="space-y-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabClick(item.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 animation-delay-${index * 100} ${
                          isActive
                            ? 'bg-primary-600 text-white shadow-lg'
                            : 'hover:bg-primary-50 text-gray-700'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Mobile Auth Section */}
                <div className="pt-4 border-t border-gray-200">
                  {user ? (
                    <div className="space-y-2">
                      {isGuest ? (
                        <>
                          <button
                            onClick={() => handleAuthClick('signup')}
                            className="w-full btn-primary"
                          >
                            Sign Up for Full Access
                          </button>
                          <button
                            onClick={handleSignOut}
                            className="w-full btn-ghost text-red-600 hover:bg-red-50"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Exit Guest Mode
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={handleSignOut}
                          className="w-full btn-ghost text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-5 w-5 mr-2" />
                          Sign Out
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => handleAuthClick('signin')}
                        className="w-full btn-ghost"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => handleAuthClick('signup')}
                        className="w-full btn-primary"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-primary-100 shadow-xl z-50">
          <div className="grid grid-cols-5 gap-1 p-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all duration-300 animation-delay-${index * 50} ${
                    isActive
                      ? 'bg-primary-600 text-white scale-105 shadow-lg'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <Icon className={`h-5 w-5 transition-transform duration-300 ${
                    isActive ? 'scale-110' : ''
                  }`} />
                  <span className="text-xs mt-1 font-medium">{item.shortLabel}</span>
                  {isActive && (
                    <div className="absolute -top-1 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="h-16"></div>
      <div className="lg:hidden h-20"></div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Navigation;