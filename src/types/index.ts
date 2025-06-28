export interface User {
  id: string;
  name: string;
  email: string;
  greenPoints: number;
  currentStreak: number;
  longestStreak: number;
  avatar: string;
  location: string;
  joinedDate: string;
}

export interface EcoAction {
  id: string;
  userId: string;
  type: 'tree_planting' | 'waste_reduction' | 'composting' | 'recycling' | 'energy_saving' | 'water_conservation';
  description: string;
  points: number;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  vendorId: string;
  vendorName: string;
  location: string;
  image: string;
  organic: boolean;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  location: string;
  avatar: string;
  rating: number;
  products: number;
  greenScore: number;
  certifications: string[];
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: 'challenges' | 'solutions' | 'tips' | 'news';
  replies: number;
  likes: number;
  createdAt: string;
  tags: string[];
}