import React from 'react';
import type { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  index: number;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart, index }) => {
  return (
    <div
      className="bg-[#0D1B2A]/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden flex flex-col transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-500/30"
    >
      <div className="relative w-full h-56 shimmer-bg">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-playfair font-bold text-[#F7E7CE]">
          {item.name}
        </h3>
        <p className="mt-2 text-sm text-slate-400 flex-grow">
          {item.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-sans font-bold text-[#D4AF37]">
            ₹{item.price}
          </p>
          <button
            onClick={() => onAddToCart(item)}
            className="transform transition-all duration-300 flex items-center justify-center gap-2 text-slate-900 font-bold px-5 py-2.5 rounded-lg hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0D1B2A] focus:ring-amber-500 bg-gradient-to-br from-[#F7E7CE] to-[#D4AF37] border border-amber-600/50 shadow-md shadow-amber-900/10"
            aria-label={`Add ${item.name} to cart`}
          >
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;