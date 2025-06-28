import { User, EcoAction, Product, Vendor, Discussion } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Sarah Green',
  email: 'sarah@example.com',
  greenPoints: 1250,
  currentStreak: 15,
  longestStreak: 23,
  avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  location: 'Portland, OR',
  joinedDate: '2024-01-15'
};

export const leaderboardUsers: User[] = [
  {
    id: '2',
    name: 'Alex Chen',
    email: 'alex@example.com',
    greenPoints: 2150,
    currentStreak: 28,
    longestStreak: 35,
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    location: 'San Francisco, CA',
    joinedDate: '2023-11-20'
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    email: 'maria@example.com',
    greenPoints: 1890,
    currentStreak: 22,
    longestStreak: 28,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    location: 'Austin, TX',
    joinedDate: '2023-12-01'
  },
  currentUser,
  {
    id: '4',
    name: 'David Kim',
    email: 'david@example.com',
    greenPoints: 1100,
    currentStreak: 12,
    longestStreak: 18,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    location: 'Seattle, WA',
    joinedDate: '2024-02-10'
  }
];

export const recentActions: EcoAction[] = [
  {
    id: '1',
    userId: '1',
    type: 'tree_planting',
    description: 'Planted 3 native oak trees in community garden',
    points: 50,
    date: '2024-03-15',
    verified: true
  },
  {
    id: '2',
    userId: '1',
    type: 'waste_reduction',
    description: 'Used reusable bags for grocery shopping',
    points: 15,
    date: '2024-03-14',
    verified: true
  },
  {
    id: '3',
    userId: '1',
    type: 'composting',
    description: 'Started composting kitchen scraps',
    points: 25,
    date: '2024-03-13',
    verified: true
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Heirloom Tomatoes',
    description: 'Fresh, vine-ripened heirloom tomatoes grown without pesticides',
    price: 6.99,
    category: 'Vegetables',
    vendorId: '1',
    vendorName: 'Green Valley Farm',
    location: 'Portland, OR',
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    organic: true,
    inStock: true,
    rating: 4.8,
    reviews: 24
  },
  {
    id: '2',
    name: 'Raw Wildflower Honey',
    description: 'Pure, unfiltered honey from local wildflower meadows',
    price: 12.50,
    category: 'Pantry',
    vendorId: '2',
    vendorName: 'Meadow Bee Farm',
    location: 'Salem, OR',
    image: 'https://images.pexels.com/photos/1488527/pexels-photo-1488527.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    organic: true,
    inStock: true,
    rating: 4.9,
    reviews: 18
  },
  {
    id: '3',
    name: 'Organic Mixed Greens',
    description: 'Fresh salad mix with arugula, spinach, and lettuce',
    price: 4.25,
    category: 'Vegetables',
    vendorId: '1',
    vendorName: 'Green Valley Farm',
    location: 'Portland, OR',
    image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    organic: true,
    inStock: true,
    rating: 4.7,
    reviews: 31
  },
  {
    id: '4',
    name: 'Heritage Wheat Bread',
    description: 'Artisan sourdough made with ancient grains',
    price: 8.00,
    category: 'Bakery',
    vendorId: '3',
    vendorName: 'Rustic Grains Bakery',
    location: 'Eugene, OR',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    organic: true,
    inStock: false,
    rating: 4.6,
    reviews: 12
  }
];

export const vendors: Vendor[] = [
  {
    id: '1',
    name: 'Green Valley Farm',
    description: 'Family-owned organic farm specializing in seasonal vegetables and herbs',
    location: 'Portland, OR',
    avatar: 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    rating: 4.8,
    products: 25,
    greenScore: 95,
    certifications: ['USDA Organic', 'Carbon Neutral']
  },
  {
    id: '2',
    name: 'Meadow Bee Farm',
    description: 'Sustainable beekeeping and honey production with focus on pollinator conservation',
    location: 'Salem, OR',
    avatar: 'https://images.pexels.com/photos/821718/pexels-photo-821718.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    rating: 4.9,
    products: 8,
    greenScore: 92,
    certifications: ['Pollinator Safe', 'Raw & Unfiltered']
  },
  {
    id: '3',
    name: 'Rustic Grains Bakery',
    description: 'Traditional bakery using heritage grains and sustainable practices',
    location: 'Eugene, OR',
    avatar: 'https://images.pexels.com/photos/1776308/pexels-photo-1776308.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    rating: 4.6,
    products: 15,
    greenScore: 88,
    certifications: ['Organic Grain', 'Zero Waste']
  }
];

export const discussions: Discussion[] = [
  {
    id: '1',
    title: 'How to reduce plastic waste in grocery shopping?',
    content: 'Looking for practical tips to minimize plastic packaging when buying groceries. What strategies work best for you?',
    author: 'EcoWarrior23',
    authorAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    category: 'challenges',
    replies: 12,
    likes: 24,
    createdAt: '2024-03-14',
    tags: ['plastic-free', 'grocery', 'waste-reduction']
  },
  {
    id: '2',
    title: 'Community Garden Success Story',
    content: 'Our neighborhood started a community garden last year and its been amazing! Here are the lessons we learned...',
    author: 'GreenThumb',
    authorAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    category: 'solutions',
    replies: 8,
    likes: 35,
    createdAt: '2024-03-13',
    tags: ['community', 'gardening', 'local-food']
  },
  {
    id: '3',
    title: 'Best composting methods for apartment living?',
    content: 'Living in a small apartment but want to start composting. What are the most effective methods for limited space?',
    author: 'CityFarmer',
    authorAvatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    category: 'tips',
    replies: 15,
    likes: 28,
    createdAt: '2024-03-12',
    tags: ['composting', 'apartment', 'urban-farming']
  }
];