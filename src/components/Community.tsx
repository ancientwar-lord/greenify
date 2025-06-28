import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, Tag, Calendar, Plus, Filter, TrendingUp } from 'lucide-react';
import { discussions } from '../data/mockData';

const Community: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewPost, setShowNewPost] = useState(false);

  const categories = [
    { id: 'all', label: 'All Posts', color: 'gray' },
    { id: 'challenges', label: 'Challenges', color: 'red' },
    { id: 'solutions', label: 'Solutions', color: 'green' },
    { id: 'tips', label: 'Tips', color: 'blue' },
    { id: 'news', label: 'News', color: 'purple' }
  ];

  const getCategoryColor = (category: string) => {
    const categoryData = categories.find(c => c.id === category);
    const colors = {
      red: 'bg-red-100 text-red-700 border-red-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      gray: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[categoryData?.color as keyof typeof colors] || colors.gray;
  };

  const filteredDiscussions = selectedCategory === 'all' 
    ? discussions 
    : discussions.filter(d => d.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-green-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">Community Discussions</h1>
        <p className="text-teal-100 text-lg">Share knowledge, solve challenges, and build a sustainable future together</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Categories */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? getCategoryColor(category.id)
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Community Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Active Members</span>
                <span className="font-bold text-gray-900">2,847</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Discussions</span>
                <span className="font-bold text-gray-900">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Solutions Shared</span>
                <span className="font-bold text-green-600">892</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">This Week</span>
                <span className="font-bold text-blue-600">+47</span>
              </div>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['sustainability', 'zero-waste', 'composting', 'solar-energy', 'local-food', 'recycling'].map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-green-100 hover:text-green-700 cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* New Post Button */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Discussions</h2>
              <button
                onClick={() => setShowNewPost(!showNewPost)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>New Post</span>
              </button>
            </div>

            {showNewPost && (
              <div className="mt-6 p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <h3 className="font-semibold text-gray-900 mb-4">Start a New Discussion</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Discussion title..."
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <select className="w-full p-3 border border-gray-300 rounded-lg">
                    <option value="">Select category</option>
                    {categories.slice(1).map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                  <textarea
                    placeholder="Share your thoughts, challenges, or solutions..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                    rows={4}
                  />
                  <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <div className="flex space-x-3">
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Post Discussion
                    </button>
                    <button
                      onClick={() => setShowNewPost(false)}
                      className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Discussion List */}
          <div className="space-y-4">
            {filteredDiscussions.map((discussion) => (
              <div key={discussion.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
                <div className="flex items-start space-x-4">
                  <img
                    src={discussion.authorAvatar}
                    alt={discussion.author}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 hover:text-green-600 cursor-pointer">
                          {discussion.title}
                        </h3>
                        <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                          <span className="font-medium text-gray-700">{discussion.author}</span>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(discussion.category)}`}>
                        {categories.find(c => c.id === discussion.category)?.label}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{discussion.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 text-gray-500">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{discussion.replies} replies</span>
                        </div>
                        
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-sm">{discussion.likes}</span>
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {discussion.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs flex items-center space-x-1"
                          >
                            <Tag className="h-3 w-3" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Load More Discussions
            </button>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Trending This Week</h2>
          <TrendingUp className="h-6 w-6 text-green-600" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-gray-900 mb-2">🌱 Urban Composting Guide</h3>
            <p className="text-gray-600 text-sm mb-3">Complete guide to composting in small spaces with amazing results.</p>
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <span>124 replies</span>
              <span>•</span>
              <span>89 likes</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-gray-900 mb-2">☀️ Community Solar Project</h3>
            <p className="text-gray-600 text-sm mb-3">Join our neighborhood solar initiative and reduce energy costs.</p>
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <span>67 replies</span>
              <span>•</span>
              <span>145 likes</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-gray-900 mb-2">♻️ Zero Waste Challenge</h3>
            <p className="text-gray-600 text-sm mb-3">30-day challenge to eliminate household waste completely.</p>
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <span>203 replies</span>
              <span>•</span>
              <span>267 likes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;