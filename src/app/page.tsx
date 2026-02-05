import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import LaunchingSection from '@/components/LaunchingSection';
import CompanyProductsSection from '@/components/CompanyProductsSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <LaunchingSection />
        <CompanyProductsSection />
      </main>
      <Footer />
    </div>
  );
}
