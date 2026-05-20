import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IntreUtilizationContainer from '@/components/IntreUtilizationContainer';

export const metadata = {
  title: 'INTRE 활용하기 - INTRE',
  description: 'INTRE의 다양한 활용 사례와 가이드를 확인해보세요. 가족, 친구, 소상공인, 인플루언서 등 누구나 쉽게 사용할 수 있는 소통 커뮤니티입니다.',
};

export default function IntreUtilization() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="w-full h-auto bg-white pt-28 md:pt-32 pb-16 md:pb-32">
        <IntreUtilizationContainer />
      </main>
      <Footer />
    </div>
  );
}
