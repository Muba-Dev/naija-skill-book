export interface Artisan {
  id: string;
  name: string;
  profession: string;
  category: string;
  location: string;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  priceRange: { min: number; max: number };
  bio: string;
  verified: boolean;
  available: boolean;
  yearsExperience: number;
  phone: string;
  email: string;
  avatar: string;
  coverImage: string;
  portfolio: string[];
  services: Service[];
  reviews: Review[];
  tags: string[];
  completedJobs: number;
}

export interface Service {
  name: string;
  description: string;
  price: number;
  duration: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  text: string;
}

export interface Booking {
  id: string;
  artisanId: string;
  artisanName: string;
  artisanProfession: string;
  artisanAvatar: string;
  customerName: string;
  date: string;
  time: string;
  description: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  price: number;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'customer' | 'artisan';
  location: string;
  memberSince: string;
}

export interface SearchFilters {
  query: string;
  category: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  availableOnly: boolean;
  sortBy: 'rating' | 'price_low' | 'price_high' | 'experience';
}

export type ViewType =
  | 'landing'
  | 'login'
  | 'register'
  | 'search'
  | 'artisan-detail'
  | 'customer-dashboard'
  | 'artisan-dashboard'
  | 'booking-history'
  | 'profile-settings'
  | 'not-found';

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
}