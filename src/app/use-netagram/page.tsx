import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NetworkingSection from '@/components/NetworkingSection';
import PeriodicDeletion from '@/components/PeriodicDeletion';
import BusinessCardSection from '@/components/BusinessCardSection';

export const metadata = {
  title: 'Use NETAGRAM - 관계형 네트워크와 명함 기반 소통',
  description: 'NETAGRAM의 핵심 기능을 알아보세요. 관계형 네트워크, 주기적 삭제, 명함 기반의 네트워킹으로 진정한 소통을 경험하세요.',
};

export default function UseNetagram() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="w-full h-auto align-middle pt-28 bg-[url('/images/use_netagram_body_background_image.png')] bg-cover bg-center bg-no-repeat">
        <NetworkingSection />
        <PeriodicDeletion />
        <BusinessCardSection />
      </main>
      <Footer />
    </div>
  );
}
