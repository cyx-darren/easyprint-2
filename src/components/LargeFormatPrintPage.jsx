import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ image, name, description }) => {
  return (
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
        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition-shadow">
          View Details
        </button>
      </div>
    </div>
  );
};

const ProductSection = ({ title, description, products, viewAllLink }) => {
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
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
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
        <li className="font-medium text-gray-900">Large Format Print</li>
      </ol>
    </nav>
  );
};

const LargeFormatPrintPage = () => {
  const backdrops = [
    {
      image: "https://placehold.co/400x400/e9d5ff/300047?text=Backdrop",
      name: "Event Backdrop",
      description: "Custom designed event backdrops with premium printing"
    },
    {
      image: "https://placehold.co/400x400/e9d5ff/300047?text=Backdrop",
      name: "Exhibition Backdrop",
      description: "Large format exhibition display backdrops"
    },
    {
      image: "https://placehold.co/400x400/e9d5ff/300047?text=Backdrop",
      name: "Step & Repeat Backdrop",
      description: "Professional photo-op and media wall backdrops"
    },
    {
      image: "https://placehold.co/400x400/e9d5ff/300047?text=Backdrop",
      name: "Fabric Backdrop",
      description: "Wrinkle-free fabric printing for elegant displays"
    },
    {
      image: "https://placehold.co/400x400/e9d5ff/300047?text=Backdrop",
      name: "Portable Backdrop",
      description: "Easy-to-setup portable backdrop systems"
    }
  ];

  const rollupBanners = [
    {
      image: "https://placehold.co/400x400/cffafe/164e63?text=Rollup",
      name: "Standard Roll-up",
      description: "Classic roll-up banner with aluminum base"
    },
    {
      image: "https://placehold.co/400x400/cffafe/164e63?text=Rollup",
      name: "Premium Roll-up",
      description: "Luxury finish roll-up with broad base"
    },
    {
      image: "https://placehold.co/400x400/cffafe/164e63?text=Rollup",
      name: "Double-sided Roll-up",
      description: "Two-sided display for maximum visibility"
    },
    {
      image: "https://placehold.co/400x400/cffafe/164e63?text=Rollup",
      name: "Mini Roll-up",
      description: "Compact table-top roll-up banner"
    },
    {
      image: "https://placehold.co/400x400/cffafe/164e63?text=Rollup",
      name: "Wide Roll-up",
      description: "Extra-wide format for greater impact"
    }
  ];

  const posters = [
    {
      image: "https://placehold.co/400x400/dcfce7/14532d?text=Poster",
      name: "A1 Poster",
      description: "Large format high-quality poster printing"
    },
    {
      image: "https://placehold.co/400x400/dcfce7/14532d?text=Poster",
      name: "A2 Poster",
      description: "Medium format poster with vibrant colors"
    },
    {
      image: "https://placehold.co/400x400/dcfce7/14532d?text=Poster",
      name: "B1 Poster",
      description: "Extra large format for maximum impact"
    },
    {
      image: "https://placehold.co/400x400/dcfce7/14532d?text=Poster",
      name: "Custom Size Poster",
      description: "Bespoke sizes for specific requirements"
    },
    {
      image: "https://placehold.co/400x400/dcfce7/14532d?text=Poster",
      name: "Photo Paper Poster",
      description: "High-resolution photo quality prints"
    }
  ];

  const banners = [
    {
      image: "https://placehold.co/400x400/fce7f3/831843?text=Banner",
      name: "Vinyl Banner",
      description: "Durable outdoor vinyl banners"
    },
    {
      image: "https://placehold.co/400x400/fce7f3/831843?text=Banner",
      name: "Mesh Banner",
      description: "Wind-resistant mesh banners for outdoors"
    },
    {
      image: "https://placehold.co/400x400/fce7f3/831843?text=Banner",
      name: "Fabric Banner",
      description: "Elegant fabric banners for indoor use"
    },
    {
      image: "https://placehold.co/400x400/fce7f3/831843?text=Banner",
      name: "Street Banner",
      description: "Double-sided street pole banners"
    },
    {
      image: "https://placehold.co/400x400/fce7f3/831843?text=Banner",
      name: "Exhibition Banner",
      description: "Professional exhibition display banners"
    }
  ];

  return (
    <div className="py-12">
      <Breadcrumb />
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-center">Large Format Print</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-center">
          Professional large format printing services for all your display needs. 
          From custom backdrops to banners, we deliver high-quality prints that make a big impact.
        </p>
      </div>

      <ProductSection 
        title="Custom Backdrop Printing & Design in Singapore" 
        description="Professional backdrop printing services for events, exhibitions, and photo opportunities"
        products={backdrops}
        viewAllLink="/large-format-print/backdrops"
      />

      <ProductSection 
        title="Roll-up Banners" 
        description="Portable and professional roll-up banner solutions"
        products={rollupBanners}
        viewAllLink="/large-format-print/roll-up-banners"
      />

      <ProductSection 
        title="Posters" 
        description="High-quality poster printing in various sizes"
        products={posters}
        viewAllLink="/large-format-print/posters"
      />

      <ProductSection 
        title="Banners" 
        description="Custom banner printing for indoor and outdoor use"
        products={banners}
        viewAllLink="/large-format-print/banners"
      />
    </div>
  );
};

export default LargeFormatPrintPage; 