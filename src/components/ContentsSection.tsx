'use client';

import { useLanguage } from '@/hooks/useLanguage';

export default function ContentsSection() {
  const language = useLanguage();
  return (
    <section id="features" className="flex mt-10 bg-white h-[calc(100vh-80px)]">
      <div className="w-full flex justify-center items-center">
        <p className="text-2xl font-bold">
          {language === 'ko'
            ? 'CONTENTS 페이지는 현재 개발 중입니다.'
            : 'CONTENTS page is currently under development.'}
        </p>
      </div>
    </section>
  );
}
