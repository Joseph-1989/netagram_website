'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';

export default function PeriodicDeletion() {
  const language = useLanguage();

  const getImageSrc = () => {
    return language === 'ko'
      ? '/images/use_netagram/use_netagram_body_image_2_kor.png'
      : '/images/use_netagram/use_netagram_body_image_2_eng.png';
  };

  return (
    <section className="py-20 w-full h-auto align-middle">
      <div className="container mx-auto">
        <div className="justify-center max-w-797.872px mx-auto">
          <picture>
            <source
              media="(max-width: 459px)"
              srcSet="/images/NetagramFeatureIntro/use_netagram_body_image_2_mobile_kor.png"
            />
            <Image
              src={getImageSrc()}
              alt="Periodic Deletion App Screen"
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
