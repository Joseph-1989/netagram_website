'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';

export default function FeaturesSection() {
  const language = useLanguage();

  const getImageSrc = () => {
    return language === 'ko'
      ? '/images/NetagramIntroduction/section_1.png'
      : '/images/NetagramIntroduction/section_1.png';
  };

  return (
    <section id="features" className="mt-10 bg-white">
      <div className="w-full">
        <picture>
          <source
            media="(max-width: 459px)"
            srcSet="/images/NetagramIntroduction/section_1_mobile.png"
          />
          <Image
            src={getImageSrc()}
            width={7680}
            height={2840}
            alt="The_World_Created_by_NETAGRAM"
            className="w-full h-auto"
          />
        </picture>
      </div>
    </section>
  );
}
