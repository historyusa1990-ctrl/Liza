import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem, Order, StoreConfig, CheckoutFormData, UAEEmirate } from '../data/types';
import { INITIAL_PRODUCTS } from '../data/products';
import { INITIAL_STORE_CONFIG, trackMarketingEvent } from '../data/storeConfig';

export interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

export interface AppliedCoupon {
  code: string;
  discountPercentage: number;
}

export type ViewType = 
  | 'home' 
  | 'shop' 
  | 'product' 
  | 'cart' 
  | 'checkout' 
  | 'order-confirmation' 
  | 'track-order' 
  | 'wishlist' 
  | 'about'
  | 'contact';

interface ShopContextType {
  products: Product[];
  currentProduct: Product;
  cart: CartItem[];
  wishlist: string[];
  currentView: ViewType;
  selectedProductSlug: string;
  categoryFilter: string | null;
  searchQuery: string;
  isSearchOpen: boolean;
  isCartDrawerOpen: boolean;
  isConfigDrawerOpen: boolean;
  storeConfig: StoreConfig;
  placedOrders: Order[];
  activeOrder: Order | null;
  toasts: ToastItem[];
  appliedCoupon: AppliedCoupon | null;

  // Actions
  navigateTo: (view: ViewType, productSlug?: string, categorySlug?: string) => void;
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant, openDrawer?: boolean) => void;
  buyNow: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setIsSearchOpen: (open: boolean) => void;
  setIsCartDrawerOpen: (open: boolean) => void;
  setIsConfigDrawerOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string | null) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  placeOrder: (formData: CheckoutFormData) => Order;
  updateStoreConfig: (newConfig: Partial<StoreConfig>) => void;
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  
  // Computed values
  cartSubtotal: number;
  cartItemCount: number;
  cartDiscount: number;
  cartShippingFee: number;
  cartTotal: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const DEMO_PRELOADED_ORDERS: Order[] = [
  {
    id: 'BIT-89214',
    date: '2026-10-06 14:20',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedVariant: INITIAL_PRODUCTS[0].variants?.[0],
      },
    ],
    subtotal: 89,
    discount: 0,
    shippingFee: 15,
    total: 104,
    status: 'Out for Delivery',
    customerDetails: {
      fullName: 'Rashid Al Maktoum',
      mobile: '+971 55 987 6543',
      email: 'rashid.m@example.com',
      emirate: 'Dubai',
      city: 'Dubai',
      area: 'Dubai Marina',
      buildingVilla: 'Marina Gate Tower 1',
      apartmentFlat: 'Apt 2402',
      street: 'Al Emreet St',
      notes: 'Call before delivery',
      deliveryMethod: 'standard',
      paymentMethod: 'cod',
      couponCode: '',
    },
    estimatedDelivery: 'Today by 6:00 PM',
  },
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>(INITIAL_PRODUCTS[0].slug);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isConfigDrawerOpen, setIsConfigDrawerOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  
  // Store Config
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(() => {
    try {
      const saved = localStorage.getItem('bituine_config');
      return saved ? { ...INITIAL_STORE_CONFIG, ...JSON.parse(saved) } : INITIAL_STORE_CONFIG;
    } catch {
      return INITIAL_STORE_CONFIG;
    }
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bituine_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bituine_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders State
  const [placedOrders, setPlacedOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('bituine_orders');
      return saved ? JSON.parse(saved) : DEMO_PRELOADED_ORDERS;
    } catch {
      return DEMO_PRELOADED_ORDERS;
    }
  });

  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('bituine_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bituine_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('bituine_orders', JSON.stringify(placedOrders));
  }, [placedOrders]);

  useEffect(() => {
    localStorage.setItem('bituine_config', JSON.stringify(storeConfig));
  }, [storeConfig]);

  // Handle URL hash or direct social ad link on mount
  useEffect(() => {
    const handleUrlRouting = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const productParam = searchParams.get('product');
      const viewParam = searchParams.get('view') as ViewType | null;
      
      if (productParam) {
        const found = products.find(p => p.slug === productParam || p.id === productParam);
        if (found) {
          setSelectedProductSlug(found.slug);
          setCurrentView('product');
          trackMarketingEvent('ViewContent', { content_name: found.name, content_id: found.id, value: found.price, currency: 'AED' });
          return;
        }
      }

      if (viewParam && ['home', 'shop', 'product', 'cart', 'checkout', 'track-order', 'wishlist', 'about', 'contact'].includes(viewParam)) {
        setCurrentView(viewParam);
      }
    };

    handleUrlRouting();
    trackMarketingEvent('PageView', { page: currentView });
  }, []);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateTo = (view: ViewType, productSlug?: string, categorySlug?: string) => {
    if (productSlug) {
      setSelectedProductSlug(productSlug);
      const prod = products.find(p => p.slug === productSlug);
      if (prod) {
        trackMarketingEvent('ViewContent', { content_name: prod.name, content_id: prod.id, value: prod.price, currency: 'AED' });
      }
    }
    if (categorySlug !== undefined) {
      setCategoryFilter(categorySlug);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackMarketingEvent('PageView', { page: view, productSlug, categorySlug });
  };

  const currentProduct = products.find(p => p.slug === selectedProductSlug) || products[0];

  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant, openDrawer = true) => {
    const chosenVariant = variant || (product.variants && product.variants.length > 0 ? product.variants[0] : undefined);
    
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && 
        item.selectedVariant?.id === chosenVariant?.id
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { product, quantity, selectedVariant: chosenVariant }];
      }
    });

    addToast(`✓ Added "${product.name}" to your cart`, 'success');
    trackMarketingEvent('AddToCart', { content_name: product.name, content_id: product.id, value: product.price * quantity, currency: 'AED' });

    if (openDrawer) {
      setIsCartDrawerOpen(true);
    }
  };

  const buyNow = (product: Product, quantity = 1, variant?: ProductVariant) => {
    addToCart(product, quantity, variant, false);
    navigateTo('checkout');
    trackMarketingEvent('InitiateCheckout', { content_name: product.name, value: product.price * quantity, currency: 'AED' });
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart(prev => prev.filter(item => {
      if (item.product.id !== productId) return true;
      if (variantId && item.selectedVariant?.id !== variantId) return true;
      return false;
    }));
    addToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && (!variantId || item.selectedVariant?.id === variantId)) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    const prodName = prod ? prod.name : 'Product';

    if (wishlist.includes(productId)) {
      setWishlist(prev => prev.filter(id => id !== productId));
      addToast(`Removed "${prodName}" from wishlist`, 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      addToast(`♡ Added "${prodName}" to wishlist`, 'success');
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'BITUINE10' || clean === 'DUBAI10' || clean === 'WELCOME10') {
      setAppliedCoupon({ code: clean, discountPercentage: 10 });
      addToast('🎉 10% Discount Coupon applied!', 'success');
      return true;
    } else if (clean === 'VIP20') {
      setAppliedCoupon({ code: clean, discountPercentage: 20 });
      addToast('🎉 VIP 20% Discount Coupon applied!', 'success');
      return true;
    } else {
      addToast('Invalid coupon code. Try BITUINE10 for 10% off', 'warning');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartDiscount = appliedCoupon ? Math.round((cartSubtotal * appliedCoupon.discountPercentage) / 100) : 0;
  
  // Free delivery above threshold
  const isEligibleForFreeShipping = cartSubtotal >= storeConfig.freeShippingThreshold;
  const cartShippingFee = cartSubtotal === 0 ? 0 : (isEligibleForFreeShipping ? 0 : storeConfig.standardShippingFee);
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShippingFee);

  const placeOrder = (formData: CheckoutFormData): Order => {
    const orderNum = `BIT-${Math.floor(10000 + Math.random() * 90000)}`;
    const finalShipping = formData.deliveryMethod === 'express' ? storeConfig.expressShippingFee : cartShippingFee;
    const finalTotal = Math.max(0, cartSubtotal - cartDiscount + finalShipping);
    
    const newOrder: Order = {
      id: orderNum,
      date: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shippingFee: finalShipping,
      total: finalTotal,
      status: 'Received',
      customerDetails: formData,
      estimatedDelivery: formData.emirate === 'Dubai' || formData.emirate === 'Sharjah' 
        ? 'Tomorrow, between 10:00 AM – 4:00 PM' 
        : 'Within 1–2 business days',
    };

    setPlacedOrders(prev => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    setCart([]);
    setAppliedCoupon(null);
    setCurrentView('order-confirmation');

    trackMarketingEvent('Purchase', {
      order_id: orderNum,
      value: finalTotal,
      currency: 'AED',
      items: newOrder.items.map(i => ({ id: i.product.id, name: i.product.name, price: i.product.price, quantity: i.quantity })),
    });

    addToast(`🎉 Order #${orderNum} placed successfully!`, 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return newOrder;
  };

  const updateStoreConfig = (newConfig: Partial<StoreConfig>) => {
    setStoreConfig(prev => ({ ...prev, ...newConfig }));
    addToast('Store configuration updated', 'success');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        currentProduct,
        cart,
        wishlist,
        currentView,
        selectedProductSlug,
        categoryFilter,
        searchQuery,
        isSearchOpen,
        isCartDrawerOpen,
        isConfigDrawerOpen,
        storeConfig,
        placedOrders,
        activeOrder,
        toasts,
        appliedCoupon,
        navigateTo,
        addToCart,
        buyNow,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setIsSearchOpen,
        setIsCartDrawerOpen,
        setIsConfigDrawerOpen,
        setSearchQuery,
        setCategoryFilter,
        applyCoupon,
        removeCoupon,
        placeOrder,
        updateStoreConfig,
        addToast,
        removeToast,
        cartSubtotal,
        cartItemCount,
        cartDiscount,
        cartShippingFee,
        cartTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
