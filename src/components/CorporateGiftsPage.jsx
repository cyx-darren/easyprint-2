import React from 'react';
import { Link } from 'react-router-dom';
import CorporateGiftsSidebar from './CorporateGiftsSidebar';

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
        <li className="font-medium text-gray-900">Corporate Gifts</li>
      </ol>
    </nav>
  );
};

const CorporateGiftsPage = () => {
  // Sample product data with placeholder images
  const latestProducts = [
    {
      image: "https://www.easyprintsg.com/media/amasty/webp/catalog/product/cache/30309880b384d6d7e64c6ec1a7c33af9/h/o/holder_final_1_png.webp",
      name: "Foldable Mobile Holder",
      description: "High-quality sound, perfect for corporate executives"
    },
    {
      image: "https://www.easyprintsg.com/media/amasty/webp/catalog/product/cache/30309880b384d6d7e64c6ec1a7c33af9/1/7/1737631034c718404d64a834f18314a3b8c3be6e9e_png.webp",
      name: "Retro Multifunction Bluetooth Speaker",
      description: "Sustainable stainless steel bottle with custom branding"
    },
    {
      image: "https://www.easyprintsg.com/media/amasty/webp/catalog/product/cache/30309880b384d6d7e64c6ec1a7c33af9/c/a/card_holder_final_1_png.webp",
      name: "Leather Mobile Card Holder",
      description: "Digital-compatible notebook with recycled paper"
    },
    {
      image: "https://www.easyprintsg.com/media/amasty/webp/catalog/product/cache/30309880b384d6d7e64c6ec1a7c33af9/w/e/weigh_final_1_png.webp",
      name: "Portable Weighing Scale",
      description: "Fast-charging pad with company logo option"
    },
    {
      image: "https://www.easyprintsg.com/media/amasty/webp/catalog/product/cache/30309880b384d6d7e64c6ec1a7c33af9/i/m/image-2000x2000.jpg_3__png.webp",
      name: "Table Cloth",
      description: "Large desk mat with wireless charging built-in"
    }
  ];

  const bestSellers = [
    {
      image: "https://placehold.co/400x400/cffafe/164e63?text=Best+Seller",
      name: "Classic Polo Shirt",
      description: "Premium cotton polo with embroidered logo"
    },
    {
      image: "https://placehold.co/400x400/cffafe/164e63?text=Best+Seller",
      name: "Business Card Holder",
      description: "Elegant leather card holder with metal accents"
    },
    {
      image: "https://placehold.co/400x400/cffafe/164e63?text=Best+Seller",
      name: "Coffee Tumbler",
      description: "Double-wall insulated tumbler for hot/cold drinks"
    },
    {
      image: "https://placehold.co/400x400/cffafe/164e63?text=Best+Seller",
      name: "Power Bank",
      description: "10000mAh capacity with dual USB ports"
    },
    {
      image: "https://placehold.co/400x400/cffafe/164e63?text=Best+Seller",
      name: "Wireless Mouse",
      description: "Ergonomic design with customizable logo placement"
    }
  ];

  const lifestyleBags = [
    {
      image: "https://placehold.co/400x400/dcfce7/14532d?text=Lifestyle",
      name: "Executive Backpack",
      description: "Professional laptop backpack with USB charging port"
    },
    {
      image: "https://placehold.co/400x400/dcfce7/14532d?text=Lifestyle",
      name: "Sports Duffel Bag",
      description: "Spacious gym bag with shoe compartment"
    },
    {
      image: "https://placehold.co/400x400/dcfce7/14532d?text=Lifestyle",
      name: "Crossbody Sling Bag",
      description: "Compact everyday bag with multiple pockets"
    },
    {
      image: "https://placehold.co/400x400/dcfce7/14532d?text=Lifestyle",
      name: "Tote Bag",
      description: "Eco-friendly canvas tote with custom printing"
    },
    {
      image: "https://placehold.co/400x400/dcfce7/14532d?text=Lifestyle",
      name: "Laptop Sleeve",
      description: "Protective sleeve with custom embroidery option"
    }
  ];

  const travelLifestyle = [
    {
      image: "https://placehold.co/400x400/fce7f3/831843?text=Travel",
      name: "Travel Organizer Set",
      description: "Complete set of travel pouches and organizers"
    },
    {
      image: "https://placehold.co/400x400/fce7f3/831843?text=Travel",
      name: "Passport Holder",
      description: "RFID-blocking passport cover with card slots"
    },
    {
      image: "https://placehold.co/400x400/fce7f3/831843?text=Travel",
      name: "Travel Adapter",
      description: "Universal adapter with USB-C and USB-A ports"
    },
    {
      image: "https://placehold.co/400x400/fce7f3/831843?text=Travel",
      name: "Neck Pillow Set",
      description: "Memory foam pillow with eye mask and earplugs"
    },
    {
      image: "https://placehold.co/400x400/fce7f3/831843?text=Travel",
      name: "Luggage Tag Set",
      description: "Premium leather tags with custom engraving"
    }
  ];

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
            products={latestProducts}
            viewAllLink="/corporate-gifts/latest"
          />

          <ProductSection 
            title="Best Sellers" 
            description="Our most popular corporate gifts loved by businesses"
            products={bestSellers}
            viewAllLink="/corporate-gifts/best-sellers"
          />

          <ProductSection 
            title="Lifestyle and Sports Bags" 
            description="Premium bags for work, sports, and everyday use"
            products={lifestyleBags}
            viewAllLink="/corporate-gifts/lifestyle-bags"
          />

          <ProductSection 
            title="Travel & Lifestyle" 
            description="Essential accessories for the modern business traveler"
            products={travelLifestyle}
            viewAllLink="/corporate-gifts/travel-lifestyle"
          />
        </div>
      </div>
    </div>
  );
};

export default CorporateGiftsPage; 