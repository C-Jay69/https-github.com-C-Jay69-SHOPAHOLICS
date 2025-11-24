export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number; // stored in pennies/cents usually, but using float for frontend simple demo
  category: string;
  image: string;
  description: string;
  isDupeCandidate: boolean;
  rating: number;
  reviews: number;
  specs?: Record<string, string>;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  impulseEnabled: boolean;
  savedMoney: number;
}

export interface DupeSuggestion {
  originalId: string;
  dupeProduct: Product;
  savings: number;
  reason: string;
}

export interface AnalyticsData {
  name: string;
  value: number;
}
