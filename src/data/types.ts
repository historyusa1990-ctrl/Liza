export type UAEEmirate = 
  | 'Dubai'
  | 'Abu Dhabi'
  | 'Sharjah'
  | 'Ajman'
  | 'Ras Al Khaimah'
  | 'Fujairah'
  | 'Umm Al Quwain';

export interface ProductVariant {
  id: string;
  name: string;
  colorHex?: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice: number;
  discount: string;
  images: string[];
  video?: {
    poster: string;
    url?: string;
    caption?: string;
  };
  category: string;
  subcategory: string;
  sku: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  features: string[];
  specifications: Record<string, string>;
  howToUse?: string[];
  variants?: ProductVariant[];
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTrendingWinning?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  iconName: string;
  imageUrl?: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  author: string;
  location: string; // e.g. "Dubai Marina, Dubai"
  rating: number;
  date: string;
  title: string;
  content: string;
  verifiedPurchase: boolean;
  avatarUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface StoreConfig {
  brandName: string;
  tagline: string;
  currency: string;
  phoneDisplay: string;
  whatsappNumber: string; // international format e.g. "971501234567"
  announcementText: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  expressShippingFee: number;
  emailContact: string;
  dubaiOfficeLocation: string;
  socials: {
    instagram: string;
    tiktok: string;
    facebook: string;
    whatsapp: string;
  };
}

export interface CheckoutFormData {
  fullName: string;
  mobile: string;
  email: string;
  emirate: UAEEmirate;
  city: string;
  area: string;
  buildingVilla: string;
  apartmentFlat: string;
  street: string;
  notes: string;
  deliveryMethod: 'standard' | 'express';
  paymentMethod: 'cod' | 'card' | 'apple_pay';
  couponCode: string;
  cardDetails?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
  };
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  status: 'Received' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered';
  customerDetails: CheckoutFormData;
  estimatedDelivery: string;
}
