import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import CorporateGiftsPage from './components/CorporateGiftsPage';
import BusinessStationeryPage from './components/BusinessStationeryPage';
import LargeFormatPrintPage from './components/LargeFormatPrintPage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import ProductTemplate from './components/ProductTemplate';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminLoginPage from './components/admin/AdminLoginPage';
import Dashboard from './components/admin/Dashboard';

// Wrapper component to conditionally render header/footer
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className={isAdminRoute ? '' : 'min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50'}>
      {!isAdminRoute && <Header />}
      <main className={isAdminRoute ? '' : 'max-w-[1920px] mx-auto px-16 sm:px-8 md:px-12 lg:px-16 xl:px-24'}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/corporate-gifts" element={<CorporateGiftsPage />} />
          <Route path="/business-stationery" element={<BusinessStationeryPage />} />
          <Route path="/large-format-print" element={<LargeFormatPrintPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/product-template" element={<ProductTemplate />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<div>Products Management</div>} />
            <Route path="categories" element={<div>Categories Management</div>} />
            <Route path="pricing" element={<div>Pricing Management</div>} />
            <Route path="media" element={<div>Media Management</div>} />
          </Route>
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App; 