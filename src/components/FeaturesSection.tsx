'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';

export default function FeaturesSection() {
  const language = useLanguage();

  const getImageSrc = () => {
    return language === 'ko'
      ? '/images/HomePage/section_2.png'
      : '/images/HomePage/section_2.png';
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="w-full mx-auto">
        <div className="w-full mx-auto">
          <Image
            src={getImageSrc()}
            alt="The_World_Created_by_NETAGRAM"
            width={1920}
            height={3780}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
