import React from 'react';

const ProductCard = ({ image, name, price, description }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="aspect-square rounded-xl bg-gray-100 mb-4 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-semibold text-lg mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-purple-600 font-medium">{price}</span>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition-shadow">
          View Details
        </button>
      </div>
    </div>
  );
};

const ProductSection = ({ title, description, products }) => {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-3">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

const CorporateGiftsPage = () => {
  // Sample product data with placeholder images
  const latestProducts = [
    {
      image: "https://placehold.co/400x400/e9d5ff/300047?text=New+Product",
      name: "Premium Wireless Earbuds",
      price: "S$89.90",
      description: "High-quality sound, perfect for corporate executives"
    },
    {
      image: "https://placehold.co/400x400/e9d5ff/300047?text=New+Product",
      name: "Eco-Friendly Water Bottle",
      price: "S$29.90",
      description: "Sustainable stainless steel bottle with custom branding"
    },
    {
      image: "https://placehold.co/400x400/e9d5ff/300047?text=New+Product",
      name: "Smart Notebook Set",
      price: "S$45.90",
      description: "Digital-compatible notebook with recycled paper"
    },
    {
      image: "https://placehold.co/400x400/e9d5ff/300047?text=New+Product",
      name: "Wireless Charging Pad",
      price: "S$39.90",
      description: "Fast-charging pad with company logo option"
    }
  ];

  const bestSellers = [
    {
      image: "https://placehold.co/400x400/cffafe/164e63?text=Best+Seller",
      name: "Classic Polo Shirt",
      price: "S$34.90",
      description: "Premium cotton polo with embroidered logo"
    },
    {
      image: "https://placehold.co/400x400/cffafe/164e63?text=Best+Seller",
      name: "Business Card Holder",
      price: "S$24.90",
      description: "Elegant leather card holder with metal accents"
    },
    {
      image: "https://placehold.co/400x400/cffafe/164e63?text=Best+Seller",
      name: "Coffee Tumbler",
      price: "S$19.90",
      description: "Double-wall insulated tumbler for hot/cold drinks"
    },
    {
      image: "https://placehold.co/400x400/cffafe/164e63?text=Best+Seller",
      name: "Power Bank",
      price: "S$49.90",
      description: "10000mAh capacity with dual USB ports"
    }
  ];

  const lifestyleBags = [
    {
      image: "https://placehold.co/400x400/dcfce7/14532d?text=Lifestyle",
      name: "Executive Backpack",
      price: "S$89.90",
      description: "Professional laptop backpack with USB charging port"
    },
    {
      image: "https://placehold.co/400x400/dcfce7/14532d?text=Lifestyle",
      name: "Sports Duffel Bag",
      price: "S$59.90",
      description: "Spacious gym bag with shoe compartment"
    },
    {
      image: "https://placehold.co/400x400/dcfce7/14532d?text=Lifestyle",
      name: "Crossbody Sling Bag",
      price: "S$39.90",
      description: "Compact everyday bag with multiple pockets"
    },
    {
      image: "https://placehold.co/400x400/dcfce7/14532d?text=Lifestyle",
      name: "Tote Bag",
      price: "S$29.90",
      description: "Eco-friendly canvas tote with custom printing"
    }
  ];

  const travelLifestyle = [
    {
      image: "https://placehold.co/400x400/fce7f3/831843?text=Travel",
      name: "Travel Organizer Set",
      price: "S$79.90",
      description: "Complete set of travel pouches and organizers"
    },
    {
      image: "https://placehold.co/400x400/fce7f3/831843?text=Travel",
      name: "Passport Holder",
      price: "S$29.90",
      description: "RFID-blocking passport cover with card slots"
    },
    {
      image: "https://placehold.co/400x400/fce7f3/831843?text=Travel",
      name: "Travel Adapter",
      price: "S$39.90",
      description: "Universal adapter with USB-C and USB-A ports"
    },
    {
      image: "https://placehold.co/400x400/fce7f3/831843?text=Travel",
      name: "Neck Pillow Set",
      price: "S$34.90",
      description: "Memory foam pillow with eye mask and earplugs"
    }
  ];

  return (
    <div className="py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Corporate Gifts Collection</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our extensive range of high-quality corporate gifts perfect for any occasion. 
          From tech accessories to lifestyle products, we have everything you need to make a lasting impression.
        </p>
      </div>

      <ProductSection 
        title="Latest Products" 
        description="Check out our newest additions to the corporate gift collection"
        products={latestProducts}
      />

      <ProductSection 
        title="Best Sellers" 
        description="Our most popular corporate gifts loved by businesses"
        products={bestSellers}
      />

      <ProductSection 
        title="Lifestyle and Sports Bags" 
        description="Premium bags for work, sports, and everyday use"
        products={lifestyleBags}
      />

      <ProductSection 
        title="Travel & Lifestyle" 
        description="Essential accessories for the modern business traveler"
        products={travelLifestyle}
      />
    </div>
  );
};

export default CorporateGiftsPage; 