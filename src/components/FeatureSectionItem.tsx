'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';

export interface FeatureSection {
  id: string;
  num: number;
  name: {
    ko: string;
    en: string;
  };
}

interface FeatureSectionItemProps {
  section: FeatureSection;
}

export default function FeatureSectionItem({ section }: FeatureSectionItemProps) {
  const language = useLanguage();

  const getImageSrc = () => {
    return language === 'ko'
      ? `/images/NetagramFeatureIntro/use_netagram_body_image_${section.num}_ko.png`
      : `/images/NetagramFeatureIntro/use_netagram_body_image_${section.num}_en.png`;
  };

  const getMobileImageSrc = () => {
    return language === 'ko'
      ? `/images/NetagramFeatureIntro/use_netagram_body_image_${section.num}_mobile_ko.png`
      : `/images/NetagramFeatureIntro/use_netagram_body_image_${section.num}_mobile_en.png`;
  };

  const sectionTitle = language === 'ko' ? section.name.ko : section.name.en;

  return (
    <section
      id={section.id}
      className="py-12 md:py-16 w-full h-auto flex items-center justify-center scroll-mt-24 md:scroll-mt-32"
    >
      <div className="container mx-auto px-4">
        <div className="justify-center max-w-[797.872px] mx-auto">
          <picture>
            <source media="(max-width: 459px)" srcSet={getMobileImageSrc()} />
            <Image
              src={getImageSrc()}
              alt={sectionTitle}
              width={798}
              height={304}
              className="mx-auto w-full h-auto max-w-[797.872px]"
              priority={section.num === 1}
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
