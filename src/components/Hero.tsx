import React from 'react';
import { Leaf, TrendingUp, Users, Award } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  const stats = [
    { icon: Users, label: 'Active Members', value: '2,847' },
    { icon: Leaf, label: 'Trees Planted', value: '15,293' },
    { icon: TrendingUp, label: 'CO2 Reduced', value: '42.8 tons' },
    { icon: Award, label: 'Green Actions', value: '89,421' }
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-green-600 p-4 rounded-full shadow-lg">
              <Leaf className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-green-600">Greenify</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Empowering communities to build a sustainable future through local organic markets and 
            eco-friendly action tracking. Join thousands making a real environmental impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveTab('tracking')}
              className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Tracking Green Actions
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-green-600 hover:bg-green-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Marketplace
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 text-center border border-green-100"
              >
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-green-100">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Green Streak Tracking</h3>
            <p className="text-gray-600 mb-6">
              Log daily eco-friendly actions and build your green streak. Earn points for activities like 
              tree planting, waste reduction, and energy conservation.
            </p>
            <button
              onClick={() => setActiveTab('tracking')}
              className="text-green-600 font-semibold hover:text-green-700 transition-colors"
            >
              Learn More →
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-green-100">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <TrendingUp className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Local Organic Market</h3>
            <p className="text-gray-600 mb-6">
              Connect directly with local organic farmers and vendors. Discover fresh, sustainable products 
              from your community while supporting small businesses.
            </p>
            <button
              onClick={() => setActiveTab('marketplace')}
              className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
            >
              Explore Market →
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-green-100">
            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Community & Rewards</h3>
            <p className="text-gray-600 mb-6">
              Join discussions, share sustainability tips, and compete on leaderboards. 
              Earn Green Bonuses for top contributions and unlock exclusive benefits.
            </p>
            <button
              onClick={() => setActiveTab('community')}
              className="text-teal-600 font-semibold hover:text-teal-700 transition-colors"
            >
              Join Community →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;