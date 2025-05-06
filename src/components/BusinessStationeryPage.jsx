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
        <li className="font-medium text-gray-900">Business Stationery</li>
      </ol>
    </nav>
  );
};

const BusinessStationeryPage = () => {
  const latestProducts = [
    {
      image: "https://placehold.co/400x400/e9d5ff/300047?text=New",
      name: "Premium Business Cards",
      description: "Luxury finish with spot UV and gold foil options"
    },
    {
      image: "https://placehold.co/400x400/e9d5ff/300047?text=New",
      name: "Letterhead Design",
      description: "Professional letterhead with custom watermark"
    },
    {
      image: "https://placehold.co/400x400/e9d5ff/300047?text=New",
      name: "Custom Notepads",
      description: "Branded notepads with company logo and design"
    },
    {
      image: "https://placehold.co/400x400/e9d5ff/300047?text=New",
      name: "Presentation Folders",
      description: "High-quality folders with pocket designs"
    },
    {
      image: "https://placehold.co/400x400/e9d5ff/300047?text=New",
      name: "Desk Calendars",
      description: "Custom desk calendars with company branding"
    }
  ];

  const bestSellers = [
    {
      image: "https://placehold.co/400x400/cffafe/164e63?text=Best",
      name: "Name Cards",
      description: "Premium paper with matte or glossy finish"
    },
    {
      image: "https://placehold.co/400x400/cffafe/164e63?text=Best",
      name: "Company Envelopes",
      description: "Custom printed envelopes in various sizes"
    },
    {
      image: "https://placehold.co/400x400/cffafe/164e63?text=Best",
      name: "Memo Pads",
      description: "Customized memo pads with company details"
    },
    {
      image: "https://placehold.co/400x400/cffafe/164e63?text=Best",
      name: "Rubber Stamps",
      description: "Self-inking stamps with custom designs"
    },
    {
      image: "https://placehold.co/400x400/cffafe/164e63?text=Best",
      name: "Document Folders",
      description: "Professional folders for business documents"
    }
  ];

  const printedCards = [
    {
      image: "https://placehold.co/400x400/dcfce7/14532d?text=Cards",
      name: "Luxury Business Cards",
      description: "Premium cardstock with special finishes"
    },
    {
      image: "https://placehold.co/400x400/dcfce7/14532d?text=Cards",
      name: "Greeting Cards",
      description: "Custom corporate greeting cards"
    },
    {
      image: "https://placehold.co/400x400/dcfce7/14532d?text=Cards",
      name: "Thank You Cards",
      description: "Personalized appreciation cards"
    },
    {
      image: "https://placehold.co/400x400/dcfce7/14532d?text=Cards",
      name: "Invitation Cards",
      description: "Event and corporate invitation cards"
    },
    {
      image: "https://placehold.co/400x400/dcfce7/14532d?text=Cards",
      name: "Postcards",
      description: "Marketing and promotional postcards"
    }
  ];

  const customNameCards = [
    {
      image: "https://placehold.co/400x400/fce7f3/831843?text=Custom",
      name: "Premium Name Cards",
      description: "High-end name cards with metallic finish"
    },
    {
      image: "https://placehold.co/400x400/fce7f3/831843?text=Custom",
      name: "Standard Name Cards",
      description: "Professional name cards with clean design"
    },
    {
      image: "https://placehold.co/400x400/fce7f3/831843?text=Custom",
      name: "Executive Cards",
      description: "Luxury cards with embossed details"
    },
    {
      image: "https://placehold.co/400x400/fce7f3/831843?text=Custom",
      name: "Quick Print Cards",
      description: "Same-day printing service available"
    },
    {
      image: "https://placehold.co/400x400/fce7f3/831843?text=Custom",
      name: "Designer Cards",
      description: "Unique designs with creative finishes"
    }
  ];

  const flyers = [
    {
      image: "https://placehold.co/400x400/f3e8ff/581c87?text=Flyer",
      name: "A4 Flyers",
      description: "Standard size promotional flyers"
    },
    {
      image: "https://placehold.co/400x400/f3e8ff/581c87?text=Flyer",
      name: "A5 Flyers",
      description: "Compact size marketing flyers"
    },
    {
      image: "https://placehold.co/400x400/f3e8ff/581c87?text=Flyer",
      name: "DL Flyers",
      description: "Long format promotional flyers"
    },
    {
      image: "https://placehold.co/400x400/f3e8ff/581c87?text=Flyer",
      name: "Folded Flyers",
      description: "Bi-fold and tri-fold options"
    },
    {
      image: "https://placehold.co/400x400/f3e8ff/581c87?text=Flyer",
      name: "Premium Flyers",
      description: "High-quality paper with special finishes"
    }
  ];

  const envelopes = [
    {
      image: "https://placehold.co/400x400/faf5ff/3b0764?text=Envelope",
      name: "C4 Envelopes",
      description: "Large format document envelopes"
    },
    {
      image: "https://placehold.co/400x400/faf5ff/3b0764?text=Envelope",
      name: "DL Envelopes",
      description: "Standard business envelopes"
    },
    {
      image: "https://placehold.co/400x400/faf5ff/3b0764?text=Envelope",
      name: "Window Envelopes",
      description: "Address window envelopes"
    },
    {
      image: "https://placehold.co/400x400/faf5ff/3b0764?text=Envelope",
      name: "Square Envelopes",
      description: "Modern design envelopes"
    },
    {
      image: "https://placehold.co/400x400/faf5ff/3b0764?text=Envelope",
      name: "Custom Envelopes",
      description: "Branded envelopes with special sizes"
    }
  ];

  return (
    <div className="py-12">
      <Breadcrumb />
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-center">Business Stationery</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-center">
          Professional printing services for all your business stationery needs. 
          From business cards to custom envelopes, we deliver quality prints with quick turnaround times.
        </p>
      </div>

      <ProductSection 
        title="Latest Products" 
        description="Check out our newest additions to our business stationery collection"
        products={latestProducts}
        viewAllLink="/business-stationery/latest"
      />

      <ProductSection 
        title="Best Sellers" 
        description="Our most popular business stationery products"
        products={bestSellers}
        viewAllLink="/business-stationery/best-sellers"
      />

      <ProductSection 
        title="Printed Cards" 
        description="High-quality printed cards for every business need"
        products={printedCards}
        viewAllLink="/business-stationery/printed-cards"
      />

      <ProductSection 
        title="Custom Name and Business Card Printing" 
        description="Professional name card printing services in Singapore"
        products={customNameCards}
        viewAllLink="/business-stationery/name-cards"
      />

      <ProductSection 
        title="Flyers" 
        description="Promotional flyers and marketing materials"
        products={flyers}
        viewAllLink="/business-stationery/flyers"
      />

      <ProductSection 
        title="Envelopes" 
        description="Custom printed envelopes for business correspondence"
        products={envelopes}
        viewAllLink="/business-stationery/envelopes"
      />
    </div>
  );
};

export default BusinessStationeryPage; 