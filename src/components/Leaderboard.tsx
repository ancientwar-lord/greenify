import React, { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, Calendar, Gift } from 'lucide-react';
import { leaderboardUsers, currentUser } from '../data/mockData';

const Leaderboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState('month');

  const timeframes = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'year', label: 'This Year' },
    { id: 'all', label: 'All Time' }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    const badges = {
      1: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white',
      2: 'bg-gradient-to-r from-gray-300 to-gray-500 text-white',
      3: 'bg-gradient-to-r from-amber-400 to-amber-600 text-white'
    };
    return badges[rank as keyof typeof badges] || 'bg-white border-2 border-gray-200';
  };

  const bonuses = [
    { id: 1, title: '10% Marketplace Discount', requirement: 'Top 10 this month', icon: Gift, color: 'text-green-600' },
    { id: 2, title: 'Free Local Delivery', requirement: 'Top 5 this month', icon: TrendingUp, color: 'text-blue-600' },
    { id: 3, title: 'Exclusive Products Access', requirement: 'Top 3 this month', icon: Award, color: 'text-purple-600' },
    { id: 4, title: 'Community Ambassador Badge', requirement: '#1 this month', icon: Trophy, color: 'text-yellow-600' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Green Leaderboard</h1>
            <p className="text-yellow-100 text-lg">Compete with the community and earn amazing Green Bonuses!</p>
          </div>
          <Trophy className="h-16 w-16 text-yellow-200" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Leaderboard */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Timeframe Selector */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Rankings</h2>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {timeframes.map((tf) => (
                    <button
                      key={tf.id}
                      onClick={() => setTimeframe(tf.id)}
                      className={`px-3 py-1 rounded-md text-sm transition-colors ${
                        timeframe === tf.id
                          ? 'bg-white shadow-sm text-green-600 font-medium'
                          : 'text-gray-600 hover:text-green-600'
                      }`}
                    >
                      {tf.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Top 3 Podium */}
            <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="flex items-end justify-center space-x-4">
                {/* 2nd Place */}
                <div className="text-center">
                  <div className="relative">
                    <img
                      src={leaderboardUsers[1].avatar}
                      alt={leaderboardUsers[1].name}
                      className="w-16 h-16 rounded-full object-cover mx-auto border-4 border-gray-300"
                    />
                    <div className="absolute -top-2 -right-2 bg-gray-300 rounded-full p-1">
                      <Medal className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="font-bold text-gray-900 text-sm">{leaderboardUsers[1].name}</p>
                    <p className="text-gray-600 text-xs">{leaderboardUsers[1].greenPoints} pts</p>
                  </div>
                  <div className="bg-gray-300 h-16 w-20 rounded-t-lg mt-4"></div>
                </div>

                {/* 1st Place */}
                <div className="text-center">
                  <div className="relative">
                    <img
                      src={leaderboardUsers[0].avatar}
                      alt={leaderboardUsers[0].name}
                      className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-yellow-400"
                    />
                    <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="font-bold text-gray-900">{leaderboardUsers[0].name}</p>
                    <p className="text-gray-600 text-sm">{leaderboardUsers[0].greenPoints} pts</p>
                  </div>
                  <div className="bg-yellow-400 h-24 w-20 rounded-t-lg mt-4"></div>
                </div>

                {/* 3rd Place */}
                <div className="text-center">
                  <div className="relative">
                    <img
                      src={leaderboardUsers[2].avatar}
                      alt={leaderboardUsers[2].name}
                      className="w-16 h-16 rounded-full object-cover mx-auto border-4 border-amber-500"
                    />
                    <div className="absolute -top-2 -right-2 bg-amber-500 rounded-full p-1">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="font-bold text-gray-900 text-sm">{leaderboardUsers[2].name}</p>
                    <p className="text-gray-600 text-xs">{leaderboardUsers[2].greenPoints} pts</p>
                  </div>
                  <div className="bg-amber-500 h-12 w-20 rounded-t-lg mt-4"></div>
                </div>
              </div>
            </div>

            {/* Full Rankings */}
            <div className="divide-y divide-gray-100">
              {leaderboardUsers.map((user, index) => {
                const rank = index + 1;
                const isCurrentUser = user.id === currentUser.id;
                
                return (
                  <div
                    key={user.id}
                    className={`p-4 flex items-center space-x-4 ${
                      isCurrentUser ? 'bg-green-50 border-l-4 border-green-500' : 'hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <div className="flex items-center justify-center w-12">
                      {getRankIcon(rank)}
                    </div>
                    
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className={`font-bold ${isCurrentUser ? 'text-green-700' : 'text-gray-900'}`}>
                          {user.name}
                        </h3>
                        {isCurrentUser && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{user.location}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{user.greenPoints}</div>
                      <div className="text-gray-500 text-sm">points</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-orange-600">{user.currentStreak}</div>
                      <div className="text-gray-500 text-sm">streak</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Your Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Current Rank</span>
                <span className="font-bold text-green-600">#4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Points to Next Rank</span>
                <span className="font-bold text-gray-900">640</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Weekly Progress</span>
                <span className="font-bold text-blue-600">+125</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '66%' }}></div>
              </div>
              <p className="text-sm text-gray-500">You're 66% of the way to rank #3!</p>
            </div>
          </div>

          {/* Green Bonuses */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Gift className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-bold text-gray-900">Green Bonuses</h3>
            </div>
            <div className="space-y-3">
              {bonuses.map((bonus) => {
                const Icon = bonus.icon;
                return (
                  <div key={bonus.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start space-x-3">
                      <Icon className={`h-5 w-5 ${bonus.color} flex-shrink-0 mt-0.5`} />
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{bonus.title}</h4>
                        <p className="text-gray-500 text-xs">{bonus.requirement}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Challenge */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="h-5 w-5" />
              <h3 className="text-lg font-bold">Weekly Challenge</h3>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Plant 10 Trees Challenge</h4>
              <p className="text-green-100 text-sm">Join 247 others in planting trees this week. Double points for tree planting actions!</p>
              <div className="bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <p className="text-green-100 text-xs">4/10 trees planted</p>
              <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-green-50 transition-colors">
                Join Challenge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;