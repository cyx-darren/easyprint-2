import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OrderProgressBar from './OrderProgressBar';

// Icons (using heroicons style)
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
  </svg>
);

const OrderStatusCard = () => (
  <div className="bg-white rounded-2xl p-6 shadow-lg">
    <h3 className="text-lg font-semibold mb-4">Recent Order Status</h3>
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-medium">Order #EP2024001</p>
            <p className="text-sm text-gray-600">Corporate Gifts - 500 Custom Tumblers</p>
          </div>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">In Production</span>
        </div>
        <OrderProgressBar currentStage="production" />
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-medium">Order #EP2024002</p>
            <p className="text-sm text-gray-600">Business Cards - 1000pcs</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Completed</span>
        </div>
        <OrderProgressBar currentStage="delivered" />
      </div>
    </div>
  </div>
);

const ApprovalTrailCard = () => (
  <div className="bg-white rounded-2xl p-6 shadow-lg">
    <h3 className="text-lg font-semibold mb-4">Approval Trail</h3>
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <div>
          <p className="font-medium">Design Approved</p>
          <p className="text-sm text-gray-600">Corporate Gifts Campaign 2024</p>
          <p className="text-xs text-gray-500">Approved by John Doe - Mar 15, 2024</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
        <div>
          <p className="font-medium">Pending Approval</p>
          <p className="text-sm text-gray-600">Q2 Marketing Materials</p>
          <p className="text-xs text-gray-500">Submitted on Mar 14, 2024</p>
        </div>
      </div>
    </div>
  </div>
);

const PurchaseHistoryCard = () => {
  const [filter, setFilter] = useState('2024');
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Purchase History & Spend</h3>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
        >
          <option value="2024">Year 2024</option>
          <option value="marketing">Marketing Dept</option>
          <option value="q1campaign">Q1 Campaign</option>
        </select>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Total Spend</p>
            <p className="text-2xl font-bold text-purple-600">$12,450</p>
          </div>
          <div>
            <p className="font-medium">Orders</p>
            <p className="text-2xl font-bold text-pink-600">24</p>
          </div>
        </div>
        {/* Add a simple bar chart here */}
        <div className="h-40 flex items-end gap-2">
          <div className="flex-1 bg-purple-200 rounded-t-lg" style={{ height: '60%' }}></div>
          <div className="flex-1 bg-purple-300 rounded-t-lg" style={{ height: '80%' }}></div>
          <div className="flex-1 bg-purple-400 rounded-t-lg" style={{ height: '40%' }}></div>
          <div className="flex-1 bg-purple-500 rounded-t-lg" style={{ height: '90%' }}></div>
          <div className="flex-1 bg-purple-600 rounded-t-lg" style={{ height: '70%' }}></div>
        </div>
      </div>
    </div>
  );
};

const MockupPreviewCard = () => (
  <div className="bg-white rounded-2xl p-6 shadow-lg">
    <h3 className="text-lg font-semibold mb-4">Latest Mockup Preview</h3>
    <div className="aspect-video bg-gray-100 rounded-xl mb-4 overflow-hidden">
      <img 
        src="https://placehold.co/800x400/e9d5ff/300047?text=AI+Generated+Mockup" 
        alt="Mockup Preview"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex justify-between items-center">
      <div>
        <p className="font-medium">Corporate Gift Set 2024</p>
        <p className="text-sm text-gray-600">Generated on Mar 15, 2024</p>
      </div>
      <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition-shadow">
        Download
      </button>
    </div>
  </div>
);

const QuotationsCard = () => (
  <div className="bg-white rounded-2xl p-6 shadow-lg">
    <h3 className="text-lg font-semibold mb-4">Past Quotations</h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Q-2024-001</p>
          <p className="text-sm text-gray-600">Corporate Gifts Bundle</p>
          <p className="text-xs text-gray-500">Valid until Apr 15, 2024</p>
        </div>
        <button className="px-3 py-1 border border-purple-600 text-purple-600 rounded-full text-sm hover:bg-purple-50 transition-colors">
          View
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Q-2024-002</p>
          <p className="text-sm text-gray-600">Business Stationery Pack</p>
          <p className="text-xs text-gray-500">Valid until Apr 30, 2024</p>
        </div>
        <button className="px-3 py-1 border border-purple-600 text-purple-600 rounded-full text-sm hover:bg-purple-50 transition-colors">
          View
        </button>
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const sidebarLinks = [
    { name: 'Dashboard', id: 'dashboard', icon: DashboardIcon },
    { name: 'My Orders', id: 'orders', icon: DashboardIcon },
    { name: 'My Designs', id: 'designs', icon: DashboardIcon },
    { name: 'Projects', id: 'projects', icon: DashboardIcon },
    { name: 'Settings', id: 'settings', icon: DashboardIcon },
    { name: 'Support', id: 'support', icon: DashboardIcon },
  ];

  return (
    <div className="min-h-[calc(100vh-5rem)] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 p-6">
        <nav className="space-y-2">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveSection(link.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-left transition-colors ${
                activeSection === link.id
                  ? 'bg-purple-50 text-purple-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <link.icon />
              {link.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OrderStatusCard />
            <ApprovalTrailCard />
            <PurchaseHistoryCard />
            <MockupPreviewCard />
            <QuotationsCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage; 