import type { Metadata } from 'next';
import './globals.css';
import FloatingMenu from '@/components/FloatingMenu';

export const metadata: Metadata = {
  title: 'NETAGRAM - 소중한 사람들과 진짜 커뮤니케이션의 시작',
  description:
    'NETAGRAM은 진짜 인맥을 위한 소셜 네트워킹 앱입니다. 명함 기반의 네트워킹과 주기적 삭제 기능으로 진정한 소통을 시작하세요.',
  keywords: 'NETAGRAM, 네타그램, 소셜네트워킹, 명함, 인맥관리, 커뮤니케이션',
  authors: [{ name: 'NETAGRAM Team' }],
  openGraph: {
    title: 'NETAGRAM - 소중한 사람들과 진짜 커뮤니케이션의 시작',
    description: '진짜 인맥을 위한 소셜 네트워킹 앱',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
        <FloatingMenu />
      </body>
    </html>
  );
}
