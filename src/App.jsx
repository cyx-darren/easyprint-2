import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductCategories from './components/ProductCategories';
import HowItWorks from './components/HowItWorks';
import TrustLogos from './components/TrustLogos';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />
      <main className="max-w-[1920px] mx-auto px-8">
        <HeroSection />
        <ProductCategories />
        <HowItWorks />
        <TrustLogos />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App; 