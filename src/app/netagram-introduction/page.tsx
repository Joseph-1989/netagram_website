import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IntroductionSection from '@/components/IntroductionSection';
import KeyValueSection from '@/components/KeyValuesSection';

export const metadata = {
  title: 'Use NETAGRAM - 관계형 네트워크와 명함 기반 소통',
  description: 'NETAGRAM의 핵심 기능을 알아보세요. 관계형 네트워크, 주기적 삭제, 명함 기반의 네트워킹으로 진정한 소통을 경험하세요.',
};

export default function UseNetagram() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="w-full h-auto align-middle">
        <IntroductionSection />
        <KeyValueSection />
      </main>
      <Footer />
    </div>
  );
}
