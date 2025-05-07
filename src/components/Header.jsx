import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSimulateLogin = () => {
    setIsLoggedIn(true);
  };

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
            {/* Common links for both logged in and logged out states */}
            <Link to="/corporate-gifts" className="text-gray-600 hover:text-gray-900">Corporate Gifts</Link>
            <Link to="/business-stationery" className="text-gray-600 hover:text-gray-900">Business Stationery</Link>
            <Link to="/large-format-print" className="text-gray-600 hover:text-gray-900">Large Format Print</Link>
            <Link to="/trending-gifts-2025" className="text-gray-600 hover:text-gray-900">Trending Gifts 2025</Link>
            
            {/* Conditional rendering based on login state */}
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                <button 
                  onClick={handleLogout}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg transition-shadow"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
                <Link 
                  to="/signup" 
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg transition-shadow"
                >
                  Sign Up
                </Link>
                {/* Temporary button for testing */}
                <button 
                  onClick={handleSimulateLogin}
                  className="px-4 py-2 rounded-full border border-purple-600 text-purple-600 hover:bg-purple-50 transition-colors text-sm"
                >
                  Simulate Login
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 