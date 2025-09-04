import React, { useState, useEffect, useMemo, useRef } from 'react';

// Component Imports
import WelcomeScreen from './components/WelcomeScreen';
import CategoryTabs from './components/categorytabs';
import MenuGrid from './components/menugrid';
import CartIcon from './components/cartIcon';
import ParticleBackground from './components/ParticleBackground';
import Cart from './components/Cart';
import PaymentScreen from './components/PaymentScreen';

// Data and Type Imports
import { CATEGORIES, MENU_ITEMS } from './constants';
import type { MenuItem, CategoryID, CartItem } from './types';

const App: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryID>(CATEGORIES[0].id);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentScreenOpen, setIsPaymentScreenOpen] = useState(false);

  const cartIconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMenu(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Spotlight effect
  useEffect(() => {
    const spotlight = document.getElementById('spotlight');
    if (!spotlight || !showMenu) return;

    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
          spotlight.style.left = `${e.clientX}px`;
          spotlight.style.top = `${e.clientY}px`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showMenu]);


  // Handler for adding items to cart
  const handleAddToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const handleRemoveItem = (itemId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };
  
  const handleProceedToPay = () => {
    setIsCartOpen(false);
    setIsPaymentScreenOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentScreenOpen(false);
    setCart([]);
  };

  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter(item => item.categoryId === activeCategory);
  }, [activeCategory]);
  
  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);
  
  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const MainMenuScreen = () => (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      <header className="flex items-center justify-between mb-8">
        {/* Logo on the left */}
        <div className="w-16 h-16 shrink-0">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldGradientHeader" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#F7E7CE' }} />
                <stop offset="50%" style={{ stopColor: '#D4AF37' }} />
                <stop offset="100%" style={{ stopColor: '#B8860B' }} />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="48" stroke="url(#goldGradientHeader)" strokeWidth="3" fill="none" />
            <text x="50" y="52" fontFamily="Playfair Display, serif" fontSize="36" fontWeight="600" fill="url(#goldGradientHeader)" textAnchor="middle" dominantBaseline="central">
              E&amp;A
            </text>
          </svg>
        </div>
        
        {/* Centered Title */}
        <h1 className="font-playfair text-4xl md:text-5xl bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#F7E7CE] text-transparent bg-clip-text text-soft-glow absolute left-1/2 -translate-x-1/2">
          Ember & Ash
        </h1>

        {/* Cart Icon on the right */}
        <div className="z-30">
          <CartIcon
            ref={cartIconRef}
            itemCount={cartItemCount}
            onClick={() => setIsCartOpen(true)}
          />
        </div>
      </header>

      <main>
        <CategoryTabs
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        <div className="mt-10">
          <MenuGrid
            items={filteredMenuItems}
            onAddToCart={handleAddToCart}
          />
        </div>
      </main>
    </div>
  );

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      {showMenu && <ParticleBackground />}

      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          showMenu ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-hidden={showMenu}
      >
        <WelcomeScreen />
      </div>
      
      {showMenu && (
        <div className="animate-slide-in-from-bottom">
           <MainMenuScreen />
        </div>
      )}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToPay={handleProceedToPay}
      />

      <PaymentScreen
        isOpen={isPaymentScreenOpen}
        onClose={() => setIsPaymentScreenOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        amount={subtotal}
      />
      
    </main>
  );
};

export default App;