import React, { useState } from 'react';
import { Flame, Plus, TreePine, Recycle, Droplets, Zap, Calendar, Award, UserCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { currentUser, recentActions } from '../data/mockData';

const GreenTracking: React.FC = () => {
  const { isGuest } = useAuth();
  const [showAddAction, setShowAddAction] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');

  const actionTypes = [
    { id: 'tree_planting', label: 'Tree Planting', icon: TreePine, points: 50, color: 'green' },
    { id: 'recycling', label: 'Recycling', icon: Recycle, points: 15, color: 'blue' },
    { id: 'water_conservation', label: 'Water Conservation', icon: Droplets, points: 20, color: 'cyan' },
    { id: 'energy_saving', label: 'Energy Saving', icon: Zap, points: 25, color: 'yellow' },
    { id: 'waste_reduction', label: 'Waste Reduction', icon: Award, points: 15, color: 'purple' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-100 text-green-700 border-green-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200'
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Guest Notice */}
      {isGuest && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <div className="flex items-center space-x-3">
            <UserCheck className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Exploring as Guest</h3>
              <p className="text-blue-700">
                You're viewing demo data. Sign up to start tracking your real green actions and earn points!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl font-bold mb-2">Green Streak Tracking</h1>
            <p className="text-green-100 text-lg">Keep your eco-momentum going with daily green actions!</p>
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Flame className="h-8 w-8 text-orange-300" />
                <span className="text-4xl font-bold">{currentUser.currentStreak}</span>
              </div>
              <p className="text-green-100">Current Streak</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{currentUser.greenPoints}</div>
              <p className="text-green-100">Green Points</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              <button
                onClick={() => setShowAddAction(!showAddAction)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  isGuest 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
                disabled={isGuest}
              >
                <Plus className="h-4 w-4" />
                <span>{isGuest ? 'Demo Mode' : 'Add Action'}</span>
              </button>
            </div>

            {showAddAction && !isGuest && (
              <div className="mb-6 p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <h3 className="font-semibold text-gray-900 mb-4">Log a Green Action</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {actionTypes.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.id}
                        onClick={() => setSelectedAction(action.id)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          selectedAction === action.id
                            ? getColorClasses(action.color)
                            : 'bg-white border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-6 w-6" />
                          <div className="text-left">
                            <div className="font-medium">{action.label}</div>
                            <div className="text-sm text-gray-500">+{action.points} points</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                {selectedAction && (
                  <div className="mt-4 space-y-3">
                    <textarea
                      placeholder="Describe your green action..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                      rows={3}
                    />
                    <div className="flex space-x-3">
                      <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Log Action
                      </button>
                      <button
                        onClick={() => setShowAddAction(false)}
                        className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {actionTypes.map((action) => {
                const Icon = action.icon;
                return (
                  <div
                    key={action.id}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getColorClasses(action.color)}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{action.label}</div>
                        <div className="text-sm text-gray-500">+{action.points} points</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Actions</h2>
            <div className="space-y-4">
              {recentActions.map((action) => {
                const actionType = actionTypes.find(t => t.id === action.type);
                const Icon = actionType?.icon || Award;
                const color = actionType?.color || 'green';
                
                return (
                  <div key={action.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className={`p-2 rounded-lg ${getColorClasses(color)} flex-shrink-0`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{action.description}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {new Date(action.date).toLocaleDateString()} • +{action.points} points
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <Award className="h-4 w-4" />
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Stats */}
        <div className="space-y-6">
          {/* Streak Info */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Streak Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Current Streak</span>
                <div className="flex items-center space-x-2 text-orange-600">
                  <Flame className="h-5 w-5" />
                  <span className="font-bold">{currentUser.currentStreak} days</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Longest Streak</span>
                <span className="font-bold text-gray-900">{currentUser.longestStreak} days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Points</span>
                <span className="font-bold text-green-600">{currentUser.greenPoints}</span>
              </div>
            </div>
          </div>

          {/* Weekly Goal */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Goal</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Progress</span>
                <span className="font-bold text-gray-900">5/7 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: '71%' }}></div>
              </div>
              <p className="text-sm text-gray-500">Great job! 2 more days to complete your weekly goal.</p>
            </div>
          </div>

          {/* Impact Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Impact</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TreePine className="h-4 w-4 text-green-600" />
                  <span className="text-gray-600 text-sm">Trees Planted</span>
                </div>
                <span className="font-bold text-gray-900">23</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Recycle className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-600 text-sm">Items Recycled</span>
                </div>
                <span className="font-bold text-gray-900">156</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-cyan-600" />
                  <span className="text-gray-600 text-sm">Water Saved</span>
                </div>
                <span className="font-bold text-gray-900">2.3k L</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  <span className="text-gray-600 text-sm">CO2 Reduced</span>
                </div>
                <span className="font-bold text-gray-900">847 kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenTracking;