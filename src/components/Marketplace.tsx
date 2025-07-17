import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, MapPin, ShoppingCart, Heart, Truck, Shield, Grid, List, ArrowRight, Award, Timer } from 'lucide-react';
import { products, vendors } from '../data/mockData';

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'products' | 'vendors'>('products');
  const [gridView, setGridView] = useState<'grid' | 'list'>('grid');
  const [isVisible, setIsVisible] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState<string[]>([]);

  const categories = ['all', 'Vegetables', 'Fruits', 'Pantry', 'Bakery', 'Dairy'];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (productId: string) => {
    setFavoriteItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const ProductCard = ({ product, index }: { product: any; index: number }) => (
    <div
      className={`group floating-card bg-gradient-to-br from-white to-gray-50 border-2 border-white/50 overflow-hidden animate-fade-in-up animation-delay-${(index % 6 + 1) * 100}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 space-y-2">
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
              favoriteItems.includes(product.id)
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            <Heart className={`h-4 w-4 ${favoriteItems.includes(product.id) ? 'fill-current' : ''}`} />
          </button>
          {product.organic && (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Award className="h-3 w-3" />
              <span>Organic</span>
            </div>
          )}
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900">
            ${product.price}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors duration-300">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium text-gray-600">{product.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{product.vendor}</span>
          </div>
          <div className="flex items-center space-x-1 text-primary-600 text-sm">
            <Truck className="h-4 w-4" />
            <span>Free delivery</span>
          </div>
        </div>

        <button className="w-full btn-primary group/btn">
          <span className="flex items-center justify-center space-x-2">
            <ShoppingCart className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
            <span>Add to Cart</span>
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </span>
        </button>
      </div>
    </div>
  );

  const VendorCard = ({ vendor, index }: { vendor: any; index: number }) => (
    <div
      className={`group floating-card bg-gradient-to-br from-white to-gray-50 border-2 border-white/50 p-6 animate-fade-in-up animation-delay-${(index % 4 + 1) * 150}`}
    >
      <div className="flex items-start space-x-4 mb-4">
        <img
          src={vendor.avatar}
          alt={vendor.name}
          className="w-16 h-16 rounded-xl object-cover ring-4 ring-primary-100 group-hover:ring-primary-200 transition-all duration-300"
        />
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors duration-300">
            {vendor.name}
          </h3>
          <div className="flex items-center space-x-4 mt-1">
            <div className="flex items-center space-x-1 text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium text-gray-600">{vendor.rating}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500 text-sm">
              <MapPin className="h-4 w-4" />
              <span>{vendor.location}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4">{vendor.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-green-600">{vendor.products}</div>
          <div className="text-xs text-green-700">Products</div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-blue-600">{vendor.orders}</div>
          <div className="text-xs text-blue-700">Orders</div>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        {vendor.certifications.map((cert: string, idx: number) => (
          <span
            key={idx}
            className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium"
          >
            {cert}
          </span>
        ))}
      </div>

      <button className="w-full btn-primary group/btn">
        <span className="flex items-center justify-center space-x-2">
          <span>View Store</span>
          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50/50 via-white to-secondary-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className={`bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 text-white mb-8 relative overflow-hidden animate-fade-in-up ${isVisible ? '' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-secondary-600/90"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">Organic Marketplace</h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Discover fresh, local, and sustainable products from your community. Support local farmers and enjoy the freshest organic produce.
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="card p-6 mb-8 animate-fade-in-up animation-delay-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for organic products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12 text-lg"
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field min-w-[150px]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>

              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('products')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    viewMode === 'products'
                      ? 'bg-white text-primary-600 shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={() => setViewMode('vendors')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    viewMode === 'vendors'
                      ? 'bg-white text-primary-600 shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Vendors
                </button>
              </div>

              {viewMode === 'products' && (
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setGridView('grid')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      gridView === 'grid'
                        ? 'bg-white text-primary-600 shadow-lg'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setGridView('list')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      gridView === 'list'
                        ? 'bg-white text-primary-600 shadow-lg'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6 animate-fade-in-up animation-delay-300">
          <h2 className="text-2xl font-bold text-gray-900">
            {viewMode === 'products' ? 'Fresh Products' : 'Local Vendors'}
            <span className="text-primary-600 ml-2">
              ({viewMode === 'products' ? filteredProducts.length : vendors.length})
            </span>
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Timer className="h-4 w-4" />
            <span>Updated 5 minutes ago</span>
          </div>
        </div>

        {/* Products Grid */}
        {viewMode === 'products' && (
          <div className={`grid gap-6 ${
            gridView === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        {/* Vendors Grid */}
        {viewMode === 'vendors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor, index) => (
              <VendorCard key={vendor.id} vendor={vendor} index={index} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {viewMode === 'products' && filteredProducts.length === 0 && (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No products found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your search terms or browse different categories to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center animate-fade-in-up animation-delay-500">
          <div className="card bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Become a Vendor
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join our marketplace and connect with customers who value fresh, local, and organic products. 
              Start selling your products today!
            </p>
            <button className="btn-primary px-8 py-3">
              <span className="flex items-center space-x-2">
                <span>Apply Now</span>
                <ArrowRight className="h-5 w-5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;