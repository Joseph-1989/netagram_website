'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';

export default function NetworkingSection() {
  const language = useLanguage();

  const getImageSrc = () => {
    return language === 'ko'
      ? '/images/use_netagram/use_netagram_body_image_1_kor.png'
      : '/images/use_netagram/use_netagram_body_image_1_eng.png';
  };

  return (
    <section className="py-20 w-full h-auto align-middle">
      <div className="container mx-auto">
        <div className="justify-center max-w-797.872px mx-auto">
          <Image
            src={getImageSrc()}
            alt="Relationship-based Network App Screen"
            width={797.872}
            height={304.255}
            className="mx-auto w-797.872px h-304.255px"
          />
        </div>
      </div>
    </section>
  );
}
