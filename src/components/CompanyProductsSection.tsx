'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';

export default function FeaturesSection() {
  const language = useLanguage();

  const getImageSrc = () => {
    return language === 'ko'
      ? '/images/HomePage/section_4.png'
      : '/images/HomePage/section_4.png';
  };

  return (
    <section id="features" className="bg-white">
      <div className="w-full mx-auto relative">
        <div className="w-full mx-auto">
          <Image
            src={getImageSrc()}
            alt="The_World_Created_by_NETAGRAM"
            width={1920}
            height={801}
            className="w-full h-auto"
          />
          <div className="absolute top-[10%] left-0 w-full h-full flex items-center justify-center gap-8">
            <a
              href="https://play.google.com/store/apps/details?id=com.jejecomms.qrparking&hl=ko"
              target="_blank"
              className="block"
            >
              <Image
                src="/images/HomePage/download_QR_googleplay.png"
                alt="The_World_Created_by_NETAGRAM"
                width={123}
                height={150}
                className="min-w-[123px] h-[auto]"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.jejecomms.qrparking&hl=ko"
              target="_blank"
              className="block"
            >
              <Image
                src="/images/HomePage/download_QR_appstore.png"
                alt="The_World_Created_by_NETAGRAM"
                width={123}
                height={150}
                className="min-w-[123px] h-[auto]"
              />
            </a>
            <a
              href="/docs/company/NETAGRAM_회사소개_251023.pdf"
              target="_blank"
              className="block"
            >
              <Image
                src="/images/HomePage/download_QR_소개서.png"
                alt="The_World_Created_by_NETAGRAM"
                width={123}
                height={150}
                className="min-w-[123px] h-[auto]"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
