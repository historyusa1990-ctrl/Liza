import { StoreConfig, UAEEmirate } from './types';

export const INITIAL_STORE_CONFIG: StoreConfig = {
  brandName: 'BITUINE',
  tagline: 'Smart Products. Better Everyday.',
  currency: 'AED',
  phoneDisplay: '+971 50 123 4567',
  whatsappNumber: '971501234567', // Global configurable WhatsApp number
  announcementText: 'FREE UAE DELIVERY ON ORDERS ABOVE AED 100',
  freeShippingThreshold: 100,
  standardShippingFee: 15,
  expressShippingFee: 25,
  emailContact: 'support@bituine.ae',
  dubaiOfficeLocation: 'Business Bay, Dubai, United Arab Emirates',
  socials: {
    instagram: 'https://instagram.com/bituine.ae',
    tiktok: 'https://tiktok.com/@bituine.ae',
    facebook: 'https://facebook.com/bituine.ae',
    whatsapp: 'https://wa.me/971501234567',
  },
};

export const UAE_EMIRATES: UAEEmirate[] = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain',
];

export const EMIRATE_DELIVERY_NOTES: Record<UAEEmirate, string> = {
  Dubai: 'Same day / Next day delivery available',
  'Abu Dhabi': 'Next day delivery',
  Sharjah: 'Same day / Next day delivery',
  Ajman: 'Next day delivery',
  'Ras Al Khaimah': '1–2 business days',
  Fujairah: '1–2 business days',
  'Umm Al Quwain': '1–2 business days',
};

// Marketing Pixel Events Dispatcher (Meta Pixel / TikTok Pixel / GA4 / GTM)
export type MarketingEvent = 
  | 'PageView'
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'Purchase'
  | 'Lead';

export function trackMarketingEvent(event: MarketingEvent, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    // 1. Meta / Facebook Pixel simulation
    if ((window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('track', event, params);
    }
    // 2. TikTok Pixel simulation
    if ((window as unknown as { ttq?: { track: (...args: unknown[]) => void } }).ttq) {
      (window as unknown as { ttq: { track: (...args: unknown[]) => void } }).ttq.track(event, params);
    }
    // 3. Google Tag / GA4 simulation
    if ((window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', event, params);
    }
    // Developer console log for transparency
    console.info(`[BITUINE Analytics] Event: ${event}`, params || {});
  }
}

// Generate contextual WhatsApp message URL
export function getWhatsAppUrl(
  whatsappNumber: string, 
  context: 'general' | 'product' | 'cart' | 'order', 
  details?: { productName?: string; productPrice?: number; orderId?: string }
): string {
  let text = 'Hello BITUINE, I would like to inquire about your products.';

  if (context === 'product' && details?.productName) {
    text = `Hello BITUINE, I am interested in ${details.productName} (AED ${details.productPrice || ''}). Is it available for delivery in UAE?`;
  } else if (context === 'cart') {
    text = 'Hello BITUINE, I would like help with completing my cart order.';
  } else if (context === 'order' && details?.orderId) {
    text = `Hello BITUINE, I need help with my order #${details.orderId}.`;
  }

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}
