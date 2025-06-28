import React from 'react';
import { User, MapPin, Calendar, Award, TrendingUp, Settings, Edit } from 'lucide-react';
import { currentUser, recentActions } from '../data/mockData';

const Profile: React.FC = () => {
  const achievements = [
    { id: 1, title: 'Tree Planter', description: 'Planted 25+ trees', icon: '🌳', earned: true },
    { id: 2, title: 'Waste Warrior', description: 'Completed zero waste challenge', icon: '♻️', earned: true },
    { id: 3, title: 'Green Streak', description: '30 day streak', icon: '🔥', earned: false },
    { id: 4, title: 'Community Helper', description: '50+ forum replies', icon: '💬', earned: true },
    { id: 5, title: 'Eco Champion', description: 'Top 10 leaderboard', icon: '🏆', earned: false },
    { id: 6, title: 'Solar Supporter', description: 'Used solar energy', icon: '☀️', earned: true }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-32"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-16">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{currentUser.name}</h1>
                  <div className="flex items-center space-x-4 text-gray-600 mt-2">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{currentUser.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {new Date(currentUser.joinedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mt-4 sm:mt-0">
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Overview */}
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{currentUser.greenPoints}</div>
              <div className="text-gray-600">Green Points</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{currentUser.currentStreak}</div>
              <div className="text-gray-600">Current Streak</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{currentUser.longestStreak}</div>
              <div className="text-gray-600">Longest Streak</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActions.map((action) => (
                <div key={action.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{action.description}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {new Date(action.date).toLocaleDateString()} • +{action.points} points
                    </div>
                  </div>
                  <div className="text-green-600 font-medium">+{action.points}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    achievement.earned
                      ? 'bg-green-50 border-green-200 shadow-md'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h3 className={`font-bold ${achievement.earned ? 'text-green-700' : 'text-gray-500'}`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${achievement.earned ? 'text-green-600' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  {achievement.earned && (
                    <div className="mt-2 text-xs font-medium text-green-600">✓ Earned</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Impact Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Trees Planted</span>
                <span className="font-bold text-green-600">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">CO2 Reduced</span>
                <span className="font-bold text-green-600">847 kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Water Saved</span>
                <span className="font-bold text-blue-600">2.3k L</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Items Recycled</span>
                <span className="font-bold text-purple-600">156</span>
              </div>
            </div>
          </div>

          {/* Rank Progress */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Rank Progress</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">#4</div>
                <div className="text-gray-600">Current Rank</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: '66%' }}></div>
              </div>
              <div className="text-center text-sm text-gray-600">
                640 points to reach #3
              </div>
            </div>
          </div>

          {/* Green Bonuses Earned */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Active Benefits</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="text-green-600">🎁</div>
                <div>
                  <div className="font-medium text-green-700">10% Marketplace Discount</div>
                  <div className="text-xs text-green-600">Expires in 23 days</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="text-blue-600">🚚</div>
                <div>
                  <div className="font-medium text-blue-700">Free Local Delivery</div>
                  <div className="text-xs text-blue-600">3 uses remaining</div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Account</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3">
                <Settings className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">Settings</span>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3">
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">Privacy</span>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3">
                <TrendingUp className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;