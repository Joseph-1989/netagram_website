'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';

export default function FeaturesSection() {
  const language = useLanguage();

  const getImageSrc = () => {
    return language === 'ko'
      ? '/images/HomePage/section_2.png'
      : '/images/HomePage/section_2_en.png';
  };

  const getMobileImageSrc = () => {
    return language === 'ko'
      ? '/images/HomePage/section_2_mobile.png'
      : '/images/HomePage/section_2_mobile_en.png';
  };

  return (
    <section id="features" className="bg-white">
      <div className="w-full mx-auto">
        <div className="w-full mx-auto">
          <picture className="w-full flex">
            <source
              srcSet={getMobileImageSrc()}
              media="(max-width: 459px)"
            />
             <Image
            src={getImageSrc()}
            alt="The_World_Created_by_NETAGRAM"
            width={1920}
            height={3780}
            className="w-full h-auto block"
          />
          </picture>
        </div>
      </div>
    </section>
  );
}
