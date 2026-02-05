import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UpdateInfoSection from '@/components/UpdateInfoSection';

export const metadata = {
  title: 'Update Info - NETAGRAM',
  description: 'NETAGRAM의 최신 업데이트 소식을 확인하세요.',
};

export default function UpdateInfoPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="w-full h-auto align-middle">
        <UpdateInfoSection />
      </main>
      <Footer />
    </div>
  );
}
