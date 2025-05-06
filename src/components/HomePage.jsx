import React from 'react';
import HeroSection from './HeroSection';
import ProductCategories from './ProductCategories';
import HowItWorks from './HowItWorks';
import TrustLogos from './TrustLogos';
import Testimonials from './Testimonials';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ProductCategories />
      <HowItWorks />
      <TrustLogos />
      <Testimonials />
    </>
  );
};

export default HomePage; 