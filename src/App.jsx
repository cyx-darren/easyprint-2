import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import CorporateGiftsPage from './components/CorporateGiftsPage';
import BusinessStationeryPage from './components/BusinessStationeryPage';
import LargeFormatPrintPage from './components/LargeFormatPrintPage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <Header />
        <main className="max-w-[1920px] mx-auto px-16 sm:px-8 md:px-12 lg:px-16 xl:px-24">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/corporate-gifts" element={<CorporateGiftsPage />} />
            <Route path="/business-stationery" element={<BusinessStationeryPage />} />
            <Route path="/large-format-print" element={<LargeFormatPrintPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 