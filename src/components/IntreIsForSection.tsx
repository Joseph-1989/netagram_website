'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';

export default function FeaturesSection() {
  const language = useLanguage();

  const getImageSrc = () => {
    return language === 'ko'
      ? '/images/NetagramIntroduction/section_5_ko.png'
      : '/images/NetagramIntroduction/section_5_en.png';
  };

  const getMobileImageSrc = () => {
    return language === 'ko'
      ? '/images/NetagramIntroduction/section_5_mobile_ko.png'
      : '/images/NetagramIntroduction/section_5_mobile_en.png';
  };

  return (
    <section id="features" className="bg-white">
      <div className="w-full">
        <picture>
          <source media="(max-width: 459px)" srcSet={getMobileImageSrc()} />
          <Image
            src={getImageSrc()}
            alt="The_World_Created_by_NETAGRAM"
            width={1}
            height={1}
            className="w-full h-auto"
          />
        </picture>
      </div>
    </section>
  );
}
