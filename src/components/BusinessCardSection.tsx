'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

export default function BusinessCardSection() {
  const [activeImage, setActiveImage] = useState<'profile' | 'business'>(
    'profile',
  );
  const language = useLanguage();

  const getImageSrc = (type: 'profile' | 'business') => {
    if (type === 'profile') {
      return language === 'ko'
        ? '/images/use_netagram/use_netagram_body_image_3_kor.png'
        : '/images/use_netagram/use_netagram_body_image_3_eng.png';
    } else {
      return language === 'ko'
        ? '/images/use_netagram/use_netagram_body_image_4_kor.png'
        : '/images/use_netagram/use_netagram_body_image_4_eng.png';
    }
  };

  const getButtonLabel = (type: 'profile' | 'business') => {
    if (language === 'en') {
      return type === 'profile' ? '프로필' : '명함';
    } else {
      return type === 'profile' ? '프로필' : '명함';
    }
  };

  const getAltText = (type: 'profile' | 'business') => {
    if (language === 'en') {
      return type === 'profile' ? '프로필 이미지' : '명함 이미지';
    } else {
      return type === 'profile' ? '프로필 이미지' : '명함 이미지';
    }
  };

  return (
    <section className="py-20 w-full h-auto align-middle">
      <div className="container mx-auto">
        <div className="justify-center max-w-797.872px mx-auto">
          {/* Image Display with Overlay Buttons */}
          <div className="relative mb-8">
            <Image
              src={getImageSrc(activeImage)}
              alt={getAltText(activeImage)}
              width={797.872}
              height={304.255}
              className="mx-auto w-797.872px h-304.255px"
            />

            {/* Overlay Buttons positioned over the image buttons */}
            <div className="absolute top-[100%] left-1/5 transform -translate-x-1/2 flex gap-2 bg-[#EEF0F4] px-2 py-2 rounded-lg">
              <button
                onClick={() => setActiveImage('business')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeImage === 'business'
                    ? 'bg-[#5777FF] text-[#FFFFFF]'
                    : 'bg-[#EEF0F4] text-[rgba(0, 0, 0, 0.50)] hover:bg-[#EEF0F4]'
                }`}
              >
                {getButtonLabel('profile')}
              </button>
              <button
                onClick={() => setActiveImage('profile')}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeImage === 'profile'
                    ? 'bg-[#5777FF] text-[#FFFFFF]'
                    : 'bg-[#EEF0F4] text-[rgba(0, 0, 0, 0.50)] hover:bg-[#EEF0F4]'
                }`}
              >
                {getButtonLabel('business')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
