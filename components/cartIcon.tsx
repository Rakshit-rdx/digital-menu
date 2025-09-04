import React, { forwardRef } from 'react';
import { ShoppingCartIcon } from './icons';

interface CartIconProps {
  itemCount: number;
  onClick: () => void;
}

const CartIcon = forwardRef<HTMLButtonElement, CartIconProps>(({ itemCount, onClick }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#F7E7CE] to-[#D4AF37] text-slate-900 transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-amber-500
        ${itemCount > 0 ? 'cart-glow' : ''}
      `}
      aria-label={`Open cart with ${itemCount} items`}
    >
      <ShoppingCartIcon className="w-7 h-7" />
      {itemCount > 0 && (
        <span
          className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 bg-amber-500 text-slate-900 text-xs font-bold rounded-full border-2 border-[#0D1B2A]"
          aria-live="polite"
        >
          {itemCount}
        </span>
      )}
    </button>
  );
});

export default CartIcon;