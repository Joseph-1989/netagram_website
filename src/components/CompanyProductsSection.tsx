'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';

export default function FeaturesSection() {
  const language = useLanguage();

  const getImageSrc = () => {
    return language === 'ko'
      ? '/images/HomePage/section_4.png'
      : '/images/HomePage/section_4.png';
  };

  const getIntroduceSrc = () => {
    return language === 'ko'
      ? '/docs/company/INTRE_INTRO_KO.pdf'
      : '/docs/company/INTRE_INTRO_EN.pdf';
  };

  return (
    <section id="features" className="bg-white overflow-hidden relative">
      <div className="w-full mx-auto">
        <div className="w-full mx-auto ">
          <picture>
            <source
              media="(max-width: 459px)"
              srcSet="/images/HomePage/section_4_mobile.png"
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
              href="https://play.google.com/store/apps/details?id=com.jejecomms.netagram&hl=ko"
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
              href="https://apps.apple.com/kr/app/netagram/id6753970208"
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
