'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';

export default function FeaturesSection() {
  const language = useLanguage();

  const getImageSrc = () => {
    return language === 'ko'
      ? '/images/HomePage/section_4.png'
      : '/images/HomePage/section_4_en.png';
  };


  const getMobileImageSrc = () => {
    return language === 'ko'
      ? '/images/HomePage/section_4_mobile.png'
      : '/images/HomePage/section_4_mobile_en.png';
  };

  const getIntroduceSrc = () => {
    return language === 'ko'
      ? '/docs/company/INTRE_INTRO_KO.pdf'
      : '/docs/company/INTRE_INTRO_EN.pdf';
  };

  const getIntrePlayStoreSrc = () => {
    return language === 'ko'
      ? 'https://play.google.com/store/apps/details?id=com.intre.sns&hl=ko'
      : 'https://play.google.com/store/apps/details?id=com.intre.sns&hl=en';
  };

  const getIntreAppStoreSrc = () => {
    return language === 'ko'
      ? 'https://apps.apple.com/kr/app/intre/id6753970208'
      : 'https://apps.apple.com/en/app/intre/id6753970208';
  };

  return (
    <section id="features" className="bg-white overflow-hidden relative">
      <div className="w-full mx-auto">
        <div className="w-full mx-auto ">
          <picture>
            <source
              media="(max-width: 459px)"
              srcSet={getMobileImageSrc()}
            />
            <Image
              src={getImageSrc()}
              alt="The_World_Created_by_NETAGRAM"
              width={1920}
              height={801}
              className="w-full h-auto"
            />
          </picture>
          <div className="absolute top-[10%] left-0 max-[459px]:top-[40%] max-[459px]:left-[0%] w-full h-full flex items-center justify-center gap-8 max-[459px]:h-auto max-[459px]:flex-col max-[459px]:gap-4 max-[459px]:py-8 ">
            <a
              href={getIntrePlayStoreSrc()}
              target="_blank"
              className="block"
            >
              <picture>
                <source
                  media="(max-width: 459px)"
                  srcSet="/images/HomePage/download_Google_Play_mobile.png"
                />
                <Image
                  src="/images/HomePage/download_QR_googleplay.png"
                  alt="The_World_Created_by_NETAGRAM"
                  width={123}
                  height={150}
                  className="min-w-[123px] h-[auto]"
                />
              </picture>
            </a>
            <a
              href={getIntreAppStoreSrc()}
              target="_blank"
              className="block"
            >
              <picture>
                <source
                  media="(max-width: 459px)"
                  srcSet="/images/HomePage/download_App_Store_mobile.png"
                />
                <Image
                  src="/images/HomePage/download_QR_appstore.png"
                  alt="The_World_Created_by_NETAGRAM"
                  width={123}
                  height={150}
                  className="min-w-[123px] h-[auto]"
                />
              </picture>
            </a>
            <a
              href={getIntroduceSrc()}
              target="_blank"
              className="block"
            >
              <picture>
                <source
                  media="(max-width: 459px)"
                  srcSet="/images/HomePage/download_introduction_mobile.png"
                />
                <Image
                  src="/images/HomePage/download_QR_introduction.png"
                  alt="The_World_Created_by_NETAGRAM"
                  width={123}
                  height={150}
                  className="min-w-[123px] h-[auto]"
                />
              </picture>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
