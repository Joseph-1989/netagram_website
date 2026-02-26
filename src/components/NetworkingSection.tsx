'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';

export default function NetworkingSection() {
  const language = useLanguage();

  const getImageSrc = () => {
    return language === 'ko'
      ? '/images/NetagramFeatureIntro/use_netagram_body_image_1_ko.png'
      : '/images/NetagramFeatureIntro/use_netagram_body_image_1_en.png';
  };

  const getMobileImageSrc = () => {
    return language === 'ko'
      ? '/images/NetagramFeatureIntro/use_netagram_body_image_1_mobile_ko.png'
      : '/images/NetagramFeatureIntro/use_netagram_body_image_1_mobile_en.png';
  };

  return (
    <section className="py-20 w-full h-auto align-middle">
      <div className="container mx-auto">
        <div className="justify-center max-w-797.872px mx-auto">
          <picture>
            <source media="(max-width: 459px)" srcSet={getMobileImageSrc()} />
            <Image
              src={getImageSrc()}
              alt="Relationship-based Network App Screen"
              width={797.872}
              height={304.255}
              className="mx-auto w-797.872px h-304.255px"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
