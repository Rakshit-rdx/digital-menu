import React from 'react';
import type { CartItem } from '../types';
import { XMarkIcon, TrashIcon } from './icons';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: number, newQuantity: number) => void;
  onRemoveItem: (itemId: number) => void;
  onProceedToPay: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onProceedToPay }) => {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 z-30 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Cart Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white/10 backdrop-blur-lg border-l border-white/20 shadow-2xl z-40 transform transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
      >
        {/* Header */}
        <header className="flex items-center justify-between p-6 border-b border-white/20">
          <h2 id="cart-heading" className="text-2xl font-playfair font-bold text-gray-100">
            Your Order
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-amber-400/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            aria-label="Close cart"
          >
            <XMarkIcon className="w-7 h-7" />
          </button>
        </header>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-400 mt-20">
              <p className="text-lg">Your cart is empty.</p>
              <p className="text-sm mt-2">Add some delicious items from the menu!</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {cartItems.map(item => (
                <li key={item.id} className="flex gap-4">
                  <img src={item.imageUrl} alt={item.name} className="w-24 h-24 rounded-lg object-cover border border-white/10" />
                  <div className="flex-grow flex flex-col">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-lg text-gray-100">{item.name}</h3>
                      <p className="font-semibold text-lg text-[#D4AF37]">₹{item.price * item.quantity}</p>
                    </div>
                    <p className="text-sm text-gray-400">Unit Price: ₹{item.price}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-white/20 rounded-full px-2 py-1">
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-2 text-lg text-gray-400 hover:text-white">-</button>
                        <span className="w-8 text-center font-semibold text-gray-100">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2 text-lg text-gray-400 hover:text-white">+</button>
                      </div>
                      <button onClick={() => onRemoveItem(item.id)} className="text-gray-400 hover:text-[#D4AF37] transition-colors p-1" aria-label={`Remove ${item.name}`}>
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <footer className="p-6 border-t border-white/20 space-y-4">
            <div className="flex justify-between text-xl font-bold">
              <span className="text-gray-100">Subtotal</span>
              <span className="text-[#D4AF37]">₹{subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={onProceedToPay}
              className="w-full bg-[#D4AF37] text-slate-900 font-bold text-lg py-3.5 rounded-lg hover:bg-amber-500 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-amber-500/50 shadow-lg shadow-amber-500/20"
            >
              Proceed to Pay
            </button>
          </footer>
        )}
      </aside>
    </>
  );
};

export default Cart;