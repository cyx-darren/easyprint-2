import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryItem = ({ category, isOpen, onToggle, children }) => {
  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-purple-50 rounded-lg transition-colors"
      >
        <span className="font-medium">{category}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="ml-4 mt-2 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

const CorporateGiftsSidebar = () => {
  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (category) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const SubCategory = ({ name, link }) => (
    <Link
      to={link}
      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
    >
      {name}
    </Link>
  );

  return (
    <aside className="hidden lg:block w-64 sticky top-8 h-fit">
      <div className="bg-white rounded-2xl shadow-lg min-h-[400px] max-h-fit">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 px-4">Categories</h2>
          
          <nav className="space-y-2">
            <Link
              to="/corporate-gifts/latest"
              className="block px-4 py-2 font-medium hover:bg-purple-50 rounded-lg transition-colors"
            >
              Latest Products
            </Link>

            <Link
              to="/corporate-gifts/best-sellers"
              className="block px-4 py-2 font-medium hover:bg-purple-50 rounded-lg transition-colors"
            >
              Best Sellers
            </Link>

            <CategoryItem
              category="Lifestyle and Sports Bags"
              isOpen={openCategories['lifestyle']}
              onToggle={() => toggleCategory('lifestyle')}
            >
              <SubCategory name="Backpack" link="/corporate-gifts/lifestyle-bags/backpack" />
              <SubCategory name="Dry Bags" link="/corporate-gifts/lifestyle-bags/dry-bags" />
              <SubCategory name="Shoe Bag" link="/corporate-gifts/lifestyle-bags/shoe-bag" />
              <SubCategory name="File / Document & Laptop Bags" link="/corporate-gifts/lifestyle-bags/document-bags" />
              <SubCategory name="Outdoor / Sports Bags and Pouches" link="/corporate-gifts/lifestyle-bags/sports-bags" />
            </CategoryItem>

            <CategoryItem
              category="Travel & Lifestyle"
              isOpen={openCategories['travel']}
              onToggle={() => toggleCategory('travel')}
            >
              <SubCategory name="Luggage" link="/corporate-gifts/travel/luggage" />
              <SubCategory name="Travel Accessories" link="/corporate-gifts/travel/accessories" />
            </CategoryItem>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default CorporateGiftsSidebar; 