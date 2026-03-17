'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';

export default function ContentsSection() {
  const language = useLanguage();
  return (
    <section
      id="features"
      className="relative flex items-center justify-center min-h-[calc(100vh-80px)] bg-[url('/images/Contents/chenspec-science-background.png')] bg-cover bg-center bg-no-repeat w-full overflow-hidden"
    >
      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-6 md:px-20 py-8">
        {/* Text content */}
        <div className="flex flex-col items-start w-full md:w-auto md:max-w-xl">
          <h2 className="text-lg font-bold text-cyan-600 mb-4">CONTENTS</h2>
          <p className="font-bold text-gray-800 leading-relaxed whitespace-pre-line md:text-xl">
            {language === 'ko'
              ? (
                <span className="text-sm">
                  현재 서비스 개선 및 콘텐츠 업데이트를 진행 중입니다.
                  <br />
                  더 나은 서비스를 제공하기 위해 항상 노력하겠습니다.
                </span>
              )
              : (
                <span className="text-[12px] sm:text-[13px]">
                  We are currently improving our services and updating content.
                  <br />
                  We will always strive to provide better services.
                </span>
              )}
          </p>
        </div>

        {/* Illustration image */}
        <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
          <Image
            src="/images/Contents/Social_media_content_creation_and_live_streaming.png"
            alt={
              language === 'ko'
                ? '소셜 미디어 콘텐츠 제작 및 라이브 스트리밍'
                : 'Social media content creation and live streaming'
            }
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
