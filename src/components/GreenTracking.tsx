import React, { useState, useEffect } from 'react';
import { Flame, Plus, TreePine, Recycle, Droplets, Zap, Calendar, Award, UserCheck, TrendingUp, Target, Star, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { currentUser, recentActions } from '../data/mockData';

const GreenTracking: React.FC = () => {
  const { isGuest } = useAuth();
  const [showAddAction, setShowAddAction] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const actionTypes = [
    { 
      id: 'tree_planting', 
      label: 'Tree Planting', 
      icon: TreePine, 
      points: 50, 
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      description: 'Plant trees to improve air quality'
    },
    { 
      id: 'recycling', 
      label: 'Recycling', 
      icon: Recycle, 
      points: 15, 
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      description: 'Properly recycle materials'
    },
    { 
      id: 'water_conservation', 
      label: 'Water Conservation', 
      icon: Droplets, 
      points: 20, 
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-700',
      description: 'Save water resources'
    },
    { 
      id: 'energy_saving', 
      label: 'Energy Saving', 
      icon: Zap, 
      points: 25, 
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      description: 'Reduce energy consumption'
    },
    { 
      id: 'waste_reduction', 
      label: 'Waste Reduction', 
      icon: Award, 
      points: 15, 
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      description: 'Minimize waste generation'
    }
  ];

  const weeklyGoals = [
    { label: 'Actions This Week', current: 12, target: 15, icon: Target },
    { label: 'Points Earned', current: 320, target: 400, icon: Star },
    { label: 'Streak Days', current: 7, target: 10, icon: Flame }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredActions = selectedFilter === 'all' 
    ? recentActions 
    : recentActions.filter(action => action.type === selectedFilter);

  const handleAddAction = () => {
    if (!selectedAction) return;
    // Here you would typically save the action to your backend
    setShowAddAction(false);
    setSelectedAction('');
  };

  const getActionIcon = (type: string) => {
    const actionType = actionTypes.find(at => at.id === type);
    return actionType ? actionType.icon : Award;
  };

  const getActionColor = (type: string) => {
    const actionType = actionTypes.find(at => at.id === type);
    return actionType ? actionType.textColor : 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50/50 via-white to-secondary-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Guest Notice */}
        {isGuest && (
          <div className="card bg-gradient-to-r from-secondary-50 to-primary-50 border-secondary-200 p-6 mb-8 animate-fade-in-down">
            <div className="flex items-center space-x-4">
              <div className="bg-secondary-100 p-3 rounded-xl">
                <UserCheck className="h-6 w-6 text-secondary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary-900">Exploring as Guest</h3>
                <p className="text-secondary-700">
                  You're viewing demo data. Sign up to start tracking your real green actions and earn points!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className={`bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 text-white mb-8 relative overflow-hidden animate-fade-in-up ${isVisible ? '' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-secondary-600/90"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="mb-6 lg:mb-0 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <Flame className="h-8 w-8 text-white" />
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold">Green Action Tracking</h1>
                </div>
                <p className="text-lg text-white/90 max-w-2xl">
                  Track your daily eco-friendly actions and build your green streak. Every action counts towards a sustainable future!
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold mb-2">{currentUser.greenStreak}</div>
                  <div className="text-white/80">Day Streak</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Goals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {weeklyGoals.map((goal, index) => {
            const Icon = goal.icon;
            const progress = (goal.current / goal.target) * 100;
            return (
              <div
                key={index}
                className={`card p-6 animate-bounce-in animation-delay-${(index + 1) * 200}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary-100 p-2 rounded-lg">
                      <Icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <span className="font-medium text-gray-900">{goal.label}</span>
                  </div>
                  <span className="text-2xl font-bold text-primary-600">
                    {goal.current}/{goal.target}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600">
                  {progress >= 100 ? 'Goal achieved! 🎉' : `${Math.round(progress)}% complete`}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Add Action Button */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowAddAction(true)}
            className="btn-primary px-8 py-4 text-lg shadow-2xl hover:shadow-glow-lg animate-scale-in"
          >
            <Plus className="h-6 w-6 mr-2" />
            Add Green Action
          </button>
        </div>

        {/* Action Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {actionTypes.map((actionType, index) => {
            const Icon = actionType.icon;
            return (
              <div
                key={actionType.id}
                className={`floating-card ${actionType.bgColor} border-2 border-white/50 p-6 text-center animate-slide-in-left animation-delay-${(index + 1) * 100}`}
              >
                <div className={`bg-gradient-to-r ${actionType.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{actionType.label}</h3>
                <p className="text-sm text-gray-600 mb-3">{actionType.description}</p>
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-semibold text-gray-700">{actionType.points} pts</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Actions */}
        <div className="card p-8 animate-fade-in-up animation-delay-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Recent Actions</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedFilter === 'all'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {actionTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedFilter(type.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedFilter === type.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredActions.map((action, index) => {
              const Icon = getActionIcon(action.type);
              const colorClass = getActionColor(action.type);
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-slide-in-right animation-delay-${(index + 1) * 100}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`${actionTypes.find(at => at.id === action.type)?.bgColor} p-3 rounded-xl`}>
                        <Icon className={`h-6 w-6 ${colorClass}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{action.action}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {action.date}
                          </span>
                          <span className="text-xs text-primary-600 flex items-center">
                            <Star className="h-3 w-3 mr-1" />
                            +{action.points} points
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredActions.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No actions found</h3>
              <p className="text-gray-600">Start adding green actions to see them here!</p>
            </div>
          )}
        </div>

        {/* Add Action Modal */}
        {showAddAction && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add Green Action</h2>
                <button
                  onClick={() => setShowAddAction(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {actionTypes.map((actionType) => {
                  const Icon = actionType.icon;
                  return (
                    <button
                      key={actionType.id}
                      onClick={() => setSelectedAction(actionType.id)}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                        selectedAction === actionType.id
                          ? 'bg-primary-50 border-2 border-primary-500 shadow-lg'
                          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`${actionType.bgColor} p-2 rounded-lg`}>
                          <Icon className={`h-5 w-5 ${actionType.textColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{actionType.label}</h3>
                          <p className="text-sm text-gray-600">{actionType.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-primary-600">
                            +{actionType.points} pts
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowAddAction(false)}
                  className="btn-ghost flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAction}
                  disabled={!selectedAction}
                  className={`btn-primary flex-1 ${!selectedAction ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Add Action
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GreenTracking;