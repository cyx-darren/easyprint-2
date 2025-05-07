import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = () => (
  <nav className="mb-8">
    <ol className="flex items-center space-x-2 text-gray-600">
      <li>
        <Link to="/" className="hover:text-purple-600">Home</Link>
      </li>
      <li>
        <span className="mx-2">›</span>
      </li>
      <li>
        <Link to="/corporate-gifts" className="hover:text-purple-600">Corporate Gifts</Link>
      </li>
      <li>
        <span className="mx-2">›</span>
      </li>
      <li className="font-medium text-gray-900">Premium Bluetooth Speaker</li>
    </ol>
  </nav>
);

const OptionCard = ({ title, selected, onClick, children }) => (
  <button
    onClick={onClick}
    className={`w-full p-4 rounded-xl border-2 transition-all ${
      selected 
        ? 'border-purple-600 bg-purple-50' 
        : 'border-gray-200 hover:border-purple-300'
    }`}
  >
    <h4 className="font-medium mb-1">{title}</h4>
    {children}
  </button>
);

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 font-medium transition-colors ${
      active 
        ? 'text-purple-600 border-b-2 border-purple-600' 
        : 'text-gray-600 hover:text-purple-600'
    }`}
  >
    {children}
  </button>
);

const ProductTemplate = () => {
  const [quantity, setQuantity] = useState(100);
  const [selectedLeadTime, setSelectedLeadTime] = useState('standard');
  const [selectedPrintOption, setSelectedPrintOption] = useState('1color');
  const [activeTab, setActiveTab] = useState('description');

  const relatedProducts = [
    {
      id: 1,
      name: 'Wireless Charger',
      image: 'https://placehold.co/300x300/e2e8f0/64748b?text=Related+Product',
      price: '$24.99'
    },
    {
      id: 2,
      name: 'Power Bank',
      image: 'https://placehold.co/300x300/e2e8f0/64748b?text=Related+Product',
      price: '$39.99'
    },
    {
      id: 3,
      name: 'USB Hub',
      image: 'https://placehold.co/300x300/e2e8f0/64748b?text=Related+Product',
      price: '$19.99'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Breadcrumb />
      
      {/* Product Overview Section */}
      <div className="flex flex-col lg:flex-row gap-8 mb-16">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <div className="aspect-square rounded-2xl bg-gray-100 overflow-hidden">
            <img
              src="https://placehold.co/800x800/e2e8f0/64748b?text=Product+Image"
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-4">Premium Bluetooth Speaker</h1>
          <p className="text-gray-600 mb-6">
            High-quality portable speaker with custom branding options. Perfect for corporate gifts and events.
          </p>
          <div className="text-2xl font-bold text-purple-600 mb-8">$49.99</div>

          {/* Quantity Selector */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity: {quantity}
            </label>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>100</span>
              <span>1000</span>
            </div>
          </div>

          {/* Lead Time Options */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Lead Time</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <OptionCard
                title="Standard Production"
                selected={selectedLeadTime === 'standard'}
                onClick={() => setSelectedLeadTime('standard')}
              >
                <p className="text-sm text-gray-600">20-35 working days</p>
              </OptionCard>
              <OptionCard
                title="Express Production"
                selected={selectedLeadTime === 'express'}
                onClick={() => setSelectedLeadTime('express')}
              >
                <p className="text-sm text-gray-600">5-10 working days</p>
              </OptionCard>
            </div>
          </div>

          {/* Print Options */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Print Options</h3>
            <div className="grid grid-cols-1 gap-4">
              <OptionCard
                title="1 Colour Logo Print"
                selected={selectedPrintOption === '1color'}
                onClick={() => setSelectedPrintOption('1color')}
              >
                <p className="text-sm text-gray-600">Simple, elegant branding</p>
              </OptionCard>
              <OptionCard
                title="2 Colour Logo Print"
                selected={selectedPrintOption === '2color'}
                onClick={() => setSelectedPrintOption('2color')}
              >
                <p className="text-sm text-gray-600">Enhanced brand visibility</p>
              </OptionCard>
              <OptionCard
                title="A4 Heat Transfer Print"
                selected={selectedPrintOption === 'heat'}
                onClick={() => setSelectedPrintOption('heat')}
              >
                <p className="text-sm text-gray-600">Full-color, detailed designs</p>
              </OptionCard>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transition-shadow">
              Customize Now
            </button>
            <button className="flex-1 px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-colors">
              Add to Project
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-16">
        <div className="border-b border-gray-200 mb-8">
          <div className="flex overflow-x-auto">
            <TabButton
              active={activeTab === 'description'}
              onClick={() => setActiveTab('description')}
            >
              Description
            </TabButton>
            <TabButton
              active={activeTab === 'customization'}
              onClick={() => setActiveTab('customization')}
            >
              Customization Details
            </TabButton>
            <TabButton
              active={activeTab === 'delivery'}
              onClick={() => setActiveTab('delivery')}
            >
              Delivery Info
            </TabButton>
            <TabButton
              active={activeTab === 'reviews'}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </TabButton>
          </div>
        </div>

        <div className="prose max-w-none">
          {activeTab === 'description' && (
            <div>
              <h3>Product Description</h3>
              <p>
                This premium Bluetooth speaker delivers exceptional sound quality and features elegant 
                branding options. Perfect for corporate gifts, it combines functionality with style.
              </p>
              <ul>
                <li>High-quality audio output</li>
                <li>10-hour battery life</li>
                <li>Bluetooth 5.0 connectivity</li>
                <li>Custom branding area: 50mm x 25mm</li>
              </ul>
            </div>
          )}
          {/* Add content for other tabs as needed */}
        </div>
      </div>

      {/* Frequently Bought With */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Frequently Bought With</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="aspect-square rounded-xl bg-gray-100 mb-4 overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium mb-2">{product.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-purple-600 font-medium">{product.price}</span>
                <button className="text-sm text-purple-600 hover:text-purple-800">
                  Add to Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductTemplate; 