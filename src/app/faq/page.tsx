import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';

export const metadata = {
  title: 'Contact - NETAGRAM 문의하기',
  description: 'NETAGRAM에 대한 문의사항이 있으시면 언제든지 연락주세요. FAQ와 문의 폼을 통해 빠른 상담을 받으실 수 있습니다.',
};

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
