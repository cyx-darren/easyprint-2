const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-[1920px] mx-auto px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Easyprint 2.0
        </a>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="/products" className="text-gray-600 hover:text-gray-900">Products</a>
            <a href="/login" className="text-gray-600 hover:text-gray-900">Login</a>
          </div>
          <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg transition-shadow">
            Sign Up
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header; 