'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import FeatureSectionItem, { FeatureSection } from './FeatureSectionItem';

export const FEATURE_SECTIONS: FeatureSection[] = [
  { id: 'feed', num: 1, name: { ko: '피드', en: 'Feed' } },
  { id: 'group', num: 2, name: { ko: '그룹', en: 'Group' } },
  { id: 'connections', num: 3, name: { ko: '인맥', en: 'Connections' } },
  { id: 'intalk', num: 4, name: { ko: 'IN톡', en: 'IN-Talk' } },
  { id: 'schedule', num: 5, name: { ko: '일정', en: 'Schedule' } },
  { id: 'profile', num: 6, name: { ko: '프로필', en: 'Profile' } },
  { id: 'businesscard', num: 7, name: { ko: '명함', en: 'Business Card' } },
  { id: 'greetingcard', num: 8, name: { ko: '안부카드', en: 'Greeting Card' } },
  { id: 'opengroup', num: 9, name: { ko: '오픈형 그룹/피드', en: 'Open Group/Feed' } },
];

export default function IntreFeatureIntroContainer() {
  const language = useLanguage();
  const [activeSection, setActiveSection] = useState<string>(FEATURE_SECTIONS[0].id);

  // Smooth scroll handler
  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      // Find the y offset based on screen width (offsetting sticky mobile dropdown or header)
      const offset = window.innerWidth < 768 ? 160 : 120;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Setup scroll observer to update active sidebar state
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -45% 0px', // Center-focused intersection detection
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    FEATURE_SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {/* Custom Micro-animations style block */}
      <style>{`
        @keyframes slideRight {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 48px;
            opacity: 1;
          }
        }
        .animate-slide-right {
          animation: slideRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Sticky Mobile Dropdown Selection Menu */}
      <div className="block md:hidden sticky top-[72px] z-40 w-full mb-8 px-2">
        <div className="relative">
          <select
            value={activeSection}
            onChange={(e) => handleSectionClick(e.target.value)}
            className="w-full py-4 pl-6 pr-12 bg-[#C3FFD9] text-black font-bold text-lg rounded-xl border border-[#00D9B8]/10 focus:outline-none appearance-none transition-all duration-300"
          >
            {FEATURE_SECTIONS.map((section) => (
              <option key={section.id} value={section.id} className="bg-white text-black font-semibold">
                {language === 'ko' ? section.name.ko : section.name.en}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none text-black">
            <svg
              className="h-6 w-6 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative items-start">
        {/* Left Sticky Sidebar (Desktop only) */}
        <aside className="hidden md:block md:col-span-3 lg:col-span-3 sticky top-32 pl-4 pr-6">
          <div className="flex flex-col space-y-1 border-r border-gray-100/50 pr-4">
            {FEATURE_SECTIONS.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className="flex items-center justify-between w-full py-3.5 text-left group transition-all duration-300"
                >
                  <span
                    className={`text-base transition-all duration-300 ${
                      isActive
                        ? 'text-black font-extrabold translate-x-1.5'
                        : 'text-gray-400 font-semibold hover:text-gray-700 hover:translate-x-0.5'
                    }`}
                  >
                    {language === 'ko' ? section.name.ko : section.name.en}
                  </span>
                  {isActive && (
                    <span className="h-[2px] bg-black w-12 animate-slide-right transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Content Column */}
        <main className="col-span-1 md:col-span-9 lg:col-span-9 flex flex-col space-y-4">
          {FEATURE_SECTIONS.map((section) => (
            <FeatureSectionItem key={section.id} section={section} />
          ))}
        </main>
      </div>
    </div>
  );
}
