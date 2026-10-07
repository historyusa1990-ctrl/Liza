import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WinningProductSpotlight } from './components/WinningProductSpotlight';
import { CategorySection } from './components/CategorySection';
import { BestSellersGrid } from './components/BestSellersGrid';
import { TrustBadges } from './components/TrustBadges';
import { SocialProofReviews } from './components/SocialProofReviews';
import { SocialMediaFeed } from './components/SocialMediaFeed';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { CartDrawer } from './components/CartDrawer';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderConfirmation } from './components/OrderConfirmation';
import { TrackOrderPage } from './components/TrackOrderPage';
import { WishlistPage } from './components/WishlistPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ShopPage } from './components/ShopPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { SearchModal } from './components/SearchModal';
import { QuickConfigModal } from './components/QuickConfigModal';
import { ToastNotification } from './components/ToastNotification';

const AppContent: React.FC = () => {
  const { currentView, currentProduct, storeConfig } = useShop();

  // Inject dynamic JSON-LD structured data for UAE SEO (Requirement 23 & 32)
  useEffect(() => {
    const existingScript = document.getElementById('bituine-schema-ld');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.id = 'bituine-schema-ld';
    script.type = 'application/ld+json';

    const schemaData = currentView === 'product' && currentProduct ? {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": currentProduct.name,
      "image": currentProduct.images,
      "description": currentProduct.shortDescription,
      "sku": currentProduct.sku,
      "brand": {
        "@type": "Brand",
        "name": storeConfig.brandName
      },
      "offers": {
        "@type": "Offer",
        "url": window.location.href,
        "priceCurrency": "AED",
        "price": currentProduct.price,
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": currentProduct.rating,
        "reviewCount": currentProduct.reviewsCount
      }
    } : {
      "@context": "https://schema.org",
      "@type": "OnlineStore",
      "name": storeConfig.brandName,
      "description": storeConfig.tagline,
      "url": "https://bituine.ae",
      "telephone": storeConfig.phoneDisplay,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai",
        "addressRegion": "Dubai",
        "addressCountry": "AE"
      },
      "currenciesAccepted": "AED",
      "paymentAccepted": "Cash, Credit Card, Apple Pay"
    };

    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('bituine-schema-ld');
      if (el) el.remove();
    };
  }, [currentView, currentProduct, storeConfig]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Sticky Global Header */}
      <Header />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroSection />
            <WinningProductSpotlight />
            <CategorySection />
            <BestSellersGrid />
            <TrustBadges />
            <SocialProofReviews />
            <SocialMediaFeed />
            <NewsletterSection />
          </>
        )}

        {currentView === 'shop' && <ShopPage />}
        {currentView === 'product' && <ProductDetailPage />}
        {currentView === 'cart' && <CartPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'order-confirmation' && <OrderConfirmation />}
        {currentView === 'track-order' && <TrackOrderPage />}
        {currentView === 'wishlist' && <WishlistPage />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
      </main>

      {/* Global Multi-Column Footer */}
      <Footer />

      {/* Mobile Bottom Thumb Navigation */}
      <MobileBottomNav />

      {/* Floating WhatsApp Support Button */}
      <WhatsAppFloatingButton />

      {/* Slide-Over Cart Drawer */}
      <CartDrawer />

      {/* Site-wide Search Overlay */}
      <SearchModal />

      {/* Quick Store Config Drawer (Announcement, WhatsApp, Fees) */}
      <QuickConfigModal />

      {/* Toast Feedback Alerts */}
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
