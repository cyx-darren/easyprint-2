import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import CorporateGiftsSidebar from './CorporateGiftsSidebar';

const ProductCard = ({ id, image, name, description, slug }) => {
  return (
    <Link to={`/product/${slug}`} className="block">
      <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
        <div className="aspect-square rounded-xl bg-gray-100 mb-3 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="flex items-center justify-end">
          <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition-shadow">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

const ProductSection = ({ title, description, products, viewAllLink, loading }) => {
  if (loading) {
    return (
      <section className="mb-16">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="aspect-square rounded-xl bg-gray-200 animate-pulse mb-3"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-3"></div>
              <div className="flex justify-end">
                <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-3xl font-bold">{title}</h2>
          <Link 
            to={viewAllLink} 
            className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1"
          >
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            id={product.id}
            image={product.product_images?.[0]?.url || "https://placehold.co/400x400/e2e8f0/64748b?text=No+Image"}
            name={product.name}
            description={product.description}
            slug={product.slug}
          />
        ))}
      </div>
    </section>
  );
};

const Breadcrumb = () => {
  return (
    <nav className="mb-4">
      <ol className="flex items-center space-x-2 text-gray-600">
        <li>
          <Link to="/" className="hover:text-purple-600">Home</Link>
        </li>
        <li>
          <span className="mx-2">›</span>
        </li>
        <li className="font-medium text-gray-900">Corporate Gifts</li>
      </ol>
    </nav>
  );
};

const CorporateGiftsPage = () => {
  const [loading, setLoading] = useState({
    latest: true,
    bestSellers: true,
    lifestyle: true,
    travel: true
  });
  const [products, setProducts] = useState({
    latest: [],
    bestSellers: [],
    lifestyle: [],
    travel: []
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch latest products
      const { data: latestData, error: latestError } = await supabase
        .from('products')
        .select(`
          id,
          name,
          description,
          slug,
          product_images (
            url,
            display_order
          )
        `)
        .eq('is_enabled', true)
        .order('created_at', { ascending: false })
        .limit(5);

      if (latestError) throw latestError;
      setProducts(prev => ({ ...prev, latest: latestData }));
      setLoading(prev => ({ ...prev, latest: false }));

      // Fetch best sellers (you might want to add a 'featured' or 'best_seller' column to your products table)
      const { data: bestSellersData, error: bestSellersError } = await supabase
        .from('products')
        .select(`
          id,
          name,
          description,
          slug,
          product_images (
            url,
            display_order
          )
        `)
        .eq('is_enabled', true)
        .limit(5);  // For now, just getting some enabled products

      if (bestSellersError) throw bestSellersError;
      setProducts(prev => ({ ...prev, bestSellers: bestSellersData }));
      setLoading(prev => ({ ...prev, bestSellers: false }));

      // Fetch lifestyle products (you might want to add a 'category' or 'type' column)
      const { data: lifestyleData, error: lifestyleError } = await supabase
        .from('products')
        .select(`
          id,
          name,
          description,
          slug,
          product_images (
            url,
            display_order
          )
        `)
        .eq('is_enabled', true)
        .limit(5);  // For now, just getting some enabled products

      if (lifestyleError) throw lifestyleError;
      setProducts(prev => ({ ...prev, lifestyle: lifestyleData }));
      setLoading(prev => ({ ...prev, lifestyle: false }));

      // Fetch travel products
      const { data: travelData, error: travelError } = await supabase
        .from('products')
        .select(`
          id,
          name,
          description,
          slug,
          product_images (
            url,
            display_order
          )
        `)
        .eq('is_enabled', true)
        .limit(5);  // For now, just getting some enabled products

      if (travelError) throw travelError;
      setProducts(prev => ({ ...prev, travel: travelData }));
      setLoading(prev => ({ ...prev, travel: false }));

    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    }
  };

  if (error) {
    return (
      <div className="pt-8">
        <div className="text-center text-red-600 p-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8">
      <Breadcrumb />
      
      {/* Main Content Wrapper */}
      <div className="flex gap-8">
        {/* Sidebar */}
        <CorporateGiftsSidebar />
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Corporate Gifts Collection</h1>
            <p className="text-gray-600 max-w-2xl">
              Discover our extensive range of high-quality corporate gifts perfect for any occasion. 
              From tech accessories to lifestyle products, we have everything you need to make a lasting impression.
            </p>
          </div>

          <ProductSection 
            title="Latest Products" 
            description="Check out our newest additions to the corporate gift collection"
            products={products.latest}
            loading={loading.latest}
            viewAllLink="/corporate-gifts/latest"
          />

          <ProductSection 
            title="Best Sellers" 
            description="Our most popular corporate gifts loved by businesses"
            products={products.bestSellers}
            loading={loading.bestSellers}
            viewAllLink="/corporate-gifts/best-sellers"
          />

          <ProductSection 
            title="Lifestyle and Sports Bags" 
            description="Premium bags for work, sports, and everyday use"
            products={products.lifestyle}
            loading={loading.lifestyle}
            viewAllLink="/corporate-gifts/lifestyle-bags"
          />

          <ProductSection 
            title="Travel & Lifestyle" 
            description="Essential accessories for the modern business traveler"
            products={products.travel}
            loading={loading.travel}
            viewAllLink="/corporate-gifts/travel-lifestyle"
          />
        </div>
      </div>
    </div>
  );
};

export default CorporateGiftsPage; 