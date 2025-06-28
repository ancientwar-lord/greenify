import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, ShoppingCart, Heart, Truck, Shield } from 'lucide-react';
import { products, vendors } from '../data/mockData';

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'products' | 'vendors'>('products');

  const categories = ['all', 'Vegetables', 'Fruits', 'Pantry', 'Bakery', 'Dairy'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">Organic Marketplace</h1>
        <p className="text-emerald-100 text-lg">Discover fresh, local, and sustainable products from your community</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for organic products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('products')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'products' ? 'bg-white shadow-sm text-green-600' : 'text-gray-600'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setViewMode('vendors')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'vendors' ? 'bg-white shadow-sm text-green-600' : 'text-gray-600'
                }`}
              >
                Vendors
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products View */}
      {viewMode === 'products' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200 group">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  {product.organic && (
                    <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Organic
                    </span>
                  )}
                </div>
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{product.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-green-600">${product.price}</span>
                    <span className="text-gray-500 text-sm ml-1">/ lb</span>
                  </div>
                  <button
                    disabled={!product.inStock}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add</span>
                  </button>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    From <span className="font-medium text-green-600">{product.vendorName}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vendors View */}
      {viewMode === 'vendors' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={vendor.avatar}
                  alt={vendor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{vendor.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{vendor.location}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{vendor.description}</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{vendor.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Products</span>
                  <span className="font-medium">{vendor.products}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Green Score</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${vendor.greenScore}%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-green-600">{vendor.greenScore}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {vendor.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1"
                    >
                      <Shield className="h-3 w-3" />
                      <span>{cert}</span>
                    </span>
                  ))}
                </div>
              </div>
              
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                <span>View Products</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Trust Indicators */}
      <div className="mt-12 bg-green-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Why Shop with Greenify?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Verified Organic</h3>
            <p className="text-gray-600">All products are certified organic and sustainably sourced from local farms.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Local Delivery</h3>
            <p className="text-gray-600">Fast, eco-friendly delivery from your local community vendors.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Support Local</h3>
            <p className="text-gray-600">Every purchase directly supports small-scale organic farmers and vendors.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;