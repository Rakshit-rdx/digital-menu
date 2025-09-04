import React from 'react';
import type { MenuItem } from '../types';
import MenuItemCard from './MenuItemCard';

interface MenuGridProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

const MenuGrid: React.FC<MenuGridProps> = ({ items, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {items.map((item, index) => (
        <MenuItemCard
          key={item.id}
          item={item}
          onAddToCart={onAddToCart}
          index={index}
        />
      ))}
    </div>
  );
};

export default MenuGrid;
