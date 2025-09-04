import React, { useState, useEffect, useRef } from 'react';
import type { Category, CategoryID } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: CategoryID;
  onSelectCategory: (id: CategoryID) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, activeCategory, onSelectCategory }) => {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [underlineStyle, setUnderlineStyle] = useState({});

  useEffect(() => {
    const activeTabIndex = categories.findIndex(c => c.id === activeCategory);
    const activeTab = tabsRef.current[activeTabIndex];

    if (activeTab) {
      setUnderlineStyle({
        width: activeTab.offsetWidth,
        left: activeTab.offsetLeft,
      });
      activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeCategory, categories]);

  return (
    <div className="flex justify-center mb-8">
      <nav className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg">
        <div className="relative flex items-center gap-4 sm:gap-8 px-4" role="tablist" aria-label="Food categories">
          {categories.map((category, index) => (
            <button
              key={category.id}
              ref={el => { tabsRef.current[index] = el; }}
              onClick={() => onSelectCategory(category.id)}
              role="tab"
              aria-selected={activeCategory === category.id}
              className={`relative py-4 px-2 text-sm sm:text-base font-semibold focus:outline-none ease-in-out whitespace-nowrap ${
                activeCategory === category.id
                  ? 'text-[#D4AF37]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {category.name}
            </button>
          ))}
          <div
            className="absolute bottom-0 h-1 bg-[#D4AF37] rounded-full ease-in-out"
            style={{...underlineStyle, boxShadow: '0 0 8px rgba(212, 175, 55, 0.7)' }}
          />
        </div>
      </nav>
    </div>
  );
};

export default CategoryTabs;