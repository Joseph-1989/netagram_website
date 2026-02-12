'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';

export default function FeaturesSection() {
  const language = useLanguage();

  const getImageSrc = () => {
    return language === 'ko'
      ? '/images/NetagramIntroduction/section_2.png'
      : '/images/NetagramIntroduction/section_2.png';
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="w-full">
        <picture>
          <source
            media="(max-width: 459px)"
            srcSet="/images/NetagramIntroduction/section_2_mobile.png"
          />
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
