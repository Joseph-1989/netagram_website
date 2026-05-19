'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';

export default function FeaturesSection() {
  const language = useLanguage();

  const getImageSrc = () => {
    return language === 'ko'
      ? '/images/NetagramIntroduction/section_3_ko.png'
      : '/images/NetagramIntroduction/section_3_en.png';
  };

  const getMobileImageSrc = () => {
    return language === 'ko'
      ? '/images/NetagramIntroduction/section_3_mobile_ko.png'
      : '/images/NetagramIntroduction/section_3_mobile_en.png';
  };

  const getPlayStoreUrl = () => {
    return language === 'ko'
      ? 'https://play.google.com/store/apps/details?id=com.intre.sns&hl=ko'
      : 'https://play.google.com/store/apps/details?id=com.intre.sns&hl=en';
  };

  const getAppStoreUrl = () => {
    return language === 'ko'
      ? 'https://apps.apple.com/kr/app/intre/id6753970208'
      : 'https://apps.apple.com/en/app/intre/id6753970208';
  };

  return (
    <section id="features" className="bg-white">
      <div className="w-full px-10">
        {/* Wrapper keeps image + link overlays in sync */}
        <div className="relative w-full">
          <picture>
            <source media="(max-width: 459px)" srcSet={getMobileImageSrc()} />
            <Image
              src={getImageSrc()}
              alt="The_World_Created_by_NETAGRAM"
              width={1920}
              height={1080}
              className="w-full h-auto"
            />
          </picture>

          {/* ── Desktop overlay buttons (≥460px) ── */}
          {/* Google Play button — adjust top/left/width/height % to match your image layout */}
          <a
            href={getPlayStoreUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download on Google Play"
            className="absolute max-[459px]:hidden block"
            style={{
              top: '62%',
              left: '3%',
              width: '14%',
              height: '12%',
            }}
          />
          {/* App Store button */}
          <a
            href={getAppStoreUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download on the App Store"
            className="absolute max-[459px]:hidden block"
            style={{
              top: '62%',
              left: '18%',
              width: '14%',
              height: '12%',
            }}
          />

          {/* ── Mobile overlay buttons (≤459px) ── */}
          <a
            href={getPlayStoreUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download on Google Play"
            className="absolute min-[460px]:hidden block"
            style={{
              top: '35%',
              left: '19%',
              width: '30%',
              height: '5%',
            }}
          />
          <a
            href={getAppStoreUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download on the App Store"
            className="absolute min-[460px]:hidden block"
            style={{
              top: '35%',
              left: '51%',
              width: '30%',
              height: '5%',
            }}
          />
        </div>
      </div>
    </section>
  );
}
