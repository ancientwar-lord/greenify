import React, { useState, useEffect } from 'react';
import { Leaf, TrendingUp, Users, Award, ArrowRight, Sparkles, Globe, Heart } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { 
      icon: Users, 
      label: 'Active Members', 
      value: '2,847',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      icon: Leaf, 
      label: 'Trees Planted', 
      value: '15,293',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    { 
      icon: TrendingUp, 
      label: 'CO2 Reduced', 
      value: '42.8 tons',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    { 
      icon: Award, 
      label: 'Green Actions', 
      value: '89,421',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  const features = [
    {
      icon: Leaf,
      title: 'Green Streak Tracking',
      description: 'Log daily eco-friendly actions and build your green streak. Earn points for activities like tree planting, waste reduction, and energy conservation.',
      color: 'from-primary-500 to-green-600',
      action: () => setActiveTab('tracking'),
      actionText: 'Start Tracking',
      bgGradient: 'from-green-50 to-primary-50'
    },
    {
      icon: Globe,
      title: 'Local Organic Market',
      description: 'Connect directly with local organic farmers and vendors. Discover fresh, sustainable products from your community while supporting small businesses.',
      color: 'from-emerald-500 to-teal-600',
      action: () => setActiveTab('marketplace'),
      actionText: 'Explore Markets',
      bgGradient: 'from-emerald-50 to-teal-50'
    },
    {
      icon: Heart,
      title: 'Community & Rewards',
      description: 'Join discussions, share sustainability tips, and compete on leaderboards. Earn Green Bonuses for top contributions and unlock exclusive benefits.',
      color: 'from-pink-500 to-red-600',
      action: () => setActiveTab('community'),
      actionText: 'Join Community',
      bgGradient: 'from-pink-50 to-red-50'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-primary-300/30 to-secondary-300/30 rounded-full filter blur-3xl animate-float"
          style={{
            top: '10%',
            left: '80%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full filter blur-3xl animate-float animation-delay-300"
          style={{
            top: '60%',
            left: '10%',
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-yellow-300/30 to-orange-300/30 rounded-full filter blur-3xl animate-float animation-delay-500"
          style={{
            top: '30%',
            left: '30%',
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        {/* Hero Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500 animate-pulse-slow"></div>
              <div className="relative bg-gradient-to-r from-primary-600 to-secondary-600 p-6 rounded-full shadow-2xl animate-glow">
                <Leaf className="h-16 w-16 text-white animate-float" />
              </div>
              <div className="absolute top-0 right-0 animate-bounce">
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
            <span className="block text-gray-900 animate-fade-in-up animation-delay-200">
              Welcome to
            </span>
            <span className="block text-gradient animate-fade-in-up animation-delay-300">
              Greenify
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 max-w-5xl mx-auto leading-relaxed animate-fade-in-up animation-delay-500">
            Empowering communities to build a sustainable future through 
            <span className="font-semibold text-primary-600"> local organic markets</span> and 
            <span className="font-semibold text-secondary-600"> eco-friendly action tracking</span>. 
            Join thousands making a real environmental impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-700">
            <button
              onClick={() => setActiveTab('tracking')}
              className="group btn-primary text-lg px-10 py-4 text-white shadow-2xl hover:shadow-glow-lg transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
            >
              <span className="flex items-center justify-center space-x-3">
                <Leaf className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Start Tracking Green Actions</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className="group btn-secondary text-lg px-10 py-4 shadow-2xl hover:shadow-glow transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
            >
              <span className="flex items-center justify-center space-x-3">
                <Globe className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Explore Marketplace</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`floating-card card-gradient text-center p-8 animate-bounce-in animation-delay-${(index + 1) * 200}`}
                style={{ animationDelay: `${(index + 1) * 200}ms` }}
              >
                <div className={`${stat.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <Icon className={`h-8 w-8 ${stat.textColor}`} />
                </div>
                <div className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 text-gradient">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group floating-card bg-gradient-to-br ${feature.bgGradient} border-2 border-white/50 p-10 animate-slide-in-left animation-delay-${(index + 1) * 300}`}
                style={{ animationDelay: `${(index + 1) * 300}ms` }}
              >
                <div className="relative mb-8">
                  <div className={`bg-gradient-to-r ${feature.color} w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-500`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="h-3 w-3 text-yellow-600" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-primary-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  {feature.description}
                </p>
                
                <button
                  onClick={feature.action}
                  className={`group/btn w-full bg-gradient-to-r ${feature.color} text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95`}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>{feature.actionText}</span>
                    <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20 animate-fade-in-up animation-delay-700">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-secondary-600/90"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Join the green revolution today and start tracking your environmental impact while connecting with your local community.
              </p>
              <button
                onClick={() => setActiveTab('tracking')}
                className="bg-white text-primary-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;