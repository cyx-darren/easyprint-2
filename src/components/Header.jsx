import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-[1920px] mx-auto px-16 sm:px-8 md:px-12 lg:px-16 xl:px-24 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Easyprint 2.0
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            <Link to="/corporate-gifts" className="text-gray-600 hover:text-gray-900">Corporate Gifts</Link>
            <Link to="/business-stationery" className="text-gray-600 hover:text-gray-900">Business Stationery</Link>
            <Link to="/large-format-print" className="text-gray-600 hover:text-gray-900">Large Format Print</Link>
            <Link to="/trending-gifts-2025" className="text-gray-600 hover:text-gray-900">Trending Gifts 2025</Link>
            <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
          </div>
          <Link 
            to="/signup" 
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg transition-shadow"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 