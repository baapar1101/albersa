import { useState, useEffect } from 'react';
import { Loader } from './components/Loader';
import { CustomCursor, CursorMode } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Hero3D } from './components/Hero3D';
import { Manifesto } from './components/Manifesto';
import { AtelierShowcase } from './components/AtelierShowcase';
import { Collection } from './components/Collection';
import { InteractiveProductViewer } from './components/InteractiveProductViewer';
import { Lookbook } from './components/Lookbook';
import { MaterialStudy } from './components/MaterialStudy';
import { BrandStatement } from './components/BrandStatement';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { PRODUCTS } from './data/fashionData';
import { Product, CartItem } from './types';
import { atelierAudio } from './utils/audioAmbience';
import { Language, TRANSLATIONS } from './data/translations';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('albersa_lang');
      return saved === 'fa' || saved === 'en' ? saved : 'fa'; // Default to Persian as requested by user
    } catch {
      return 'fa';
    }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('albersa_bag');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const t = TRANSLATIONS[lang];

  // Synchronize document direction, lang attribute, and title
  useEffect(() => {
    try {
      localStorage.setItem('albersa_lang', lang);
    } catch {
      // LocalStorage disabled or full
    }

    const html = document.documentElement;
    if (lang === 'fa') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'fa');
      document.title = 'آلبرسا — خانه مد آوانگارد و لوکس';
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', 'en');
      document.title = 'ALBERSA — Avant-Garde Luxury Fashion House';
    }
  }, [lang]);

  // Synchronize cart items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('albersa_bag', JSON.stringify(cartItems));
    } catch {
      // Storage unavailable
    }
  }, [cartItems]);

  const handleAddToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += 1;
        return copy;
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    setCartItems((prev) => {
      const copy = [...prev];
      copy[index].quantity = quantity;
      return copy;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleAudio = () => {
    const newState = atelierAudio.toggle();
    setIsAudioPlaying(newState);
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'fa' ? 'en' : 'fa'));
  };

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div
      dir={lang === 'fa' ? 'rtl' : 'ltr'}
      className={`relative min-h-screen bg-[#0A0A0A] text-[#F1EFE9] selection:bg-[#F1EFE9] selection:text-[#0A0A0A] ${
        lang === 'fa' ? 'font-sans' : ''
      }`}
    >
      {/* Luxury Film Grain Overlay */}
      <div className="noise-overlay" />

      {/* Interactive Cursor (Desktop) */}
      <CustomCursor mode={cursorMode} />

      {/* Cinematic Minimal Loading Screen */}
      {isLoading && (
        <Loader onComplete={() => setIsLoading(false)} lang={lang} />
      )}

      {/* Top Navigation Bar with Official Logo and Language Switcher */}
      <Navigation
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        onSetCursorMode={setCursorMode}
        lang={lang}
        onToggleLang={handleToggleLang}
        t={t}
      />

      {/* 1. Immersive 3D Hero */}
      <Hero3D
        onSetCursorMode={setCursorMode}
        onExploreClick={scrollToCollection}
        lang={lang}
        t={t}
      />

      {/* 2. Manifesto Section */}
      <Manifesto onSetCursorMode={setCursorMode} lang={lang} t={t} />

      {/* 2.5 Creative Director & Atelier Haute Couture Archive */}
      <AtelierShowcase onSetCursorMode={setCursorMode} lang={lang} t={t} />

      {/* 3. Featured Collection 026 */}
      <Collection
        onSelectProduct={(p) => setSelectedProduct(p)}
        onSetCursorMode={setCursorMode}
        onQuickAdd={handleAddToCart}
        lang={lang}
        t={t}
      />

      {/* 4. Interactive 3D Product Visualizer */}
      <InteractiveProductViewer
        product={PRODUCTS[3]} // Monolith Jacket
        onAddToCart={handleAddToCart}
        onSetCursorMode={setCursorMode}
        lang={lang}
        t={t}
      />

      {/* 5. Editorial Lookbook Spread */}
      <Lookbook onSetCursorMode={setCursorMode} lang={lang} t={t} />

      {/* 6. Material / Detail Laboratory */}
      <MaterialStudy onSetCursorMode={setCursorMode} lang={lang} t={t} />

      {/* 7. Inverted Warm Ivory Brand Statement */}
      <BrandStatement onSetCursorMode={setCursorMode} lang={lang} t={t} />

      {/* 8. Newsletter Private Access */}
      <Newsletter onSetCursorMode={setCursorMode} lang={lang} t={t} />

      {/* 9. Grand Monumental Footer with Vector Logo */}
      <Footer
        onSetCursorMode={setCursorMode}
        lang={lang}
        onToggleLang={handleToggleLang}
        t={t}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onSetCursorMode={setCursorMode}
        lang={lang}
        t={t}
      />

      {/* Slide-over Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onSetCursorMode={setCursorMode}
        lang={lang}
        t={t}
      />
    </div>
  );
}
