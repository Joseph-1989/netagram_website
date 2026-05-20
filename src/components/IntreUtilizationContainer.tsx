'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';

/* ─── Data ─────────────────────────────────────────────────── */

type ScenarioId =
  | 'family'
  | 'contacts'
  | 'surprise'
  | 'shopopen'
  | 'product'
  | 'influencer'
  | 'lightning'
  | 'fandom'
  | 'localchannel'
  | 'regionevent'
  | 'govcomm';

interface Scenario {
  id: ScenarioId;
  category: { ko: string; en: string };
  title: { ko: string; en: string };
  hashtag: { ko: string; en: string };
  subtitle: { ko: string; en: string };
  featureTags: { ko: string[]; en: string[] };
  cardBg: string; // /images/IntreUtilization/...
  /** teal solid overlay card (깜짝 이벤트 uses #008384) */
  useSolidTeal?: boolean;
  detailMockup: { ko: string; en: string };
}

const CATEGORIES: Array<{ key: string; ko: string; en: string }> = [
  { key: 'overview', ko: '개요', en: 'Overview' },
  { key: 'smallbiz', ko: '소상공인', en: 'Small Business' },
  { key: 'onlinesales', ko: '온라인 판매', en: 'Online Sales' },
  { key: 'info', ko: '정보', en: 'Information' },
  { key: 'gathering', ko: '모임', en: 'Gatherings' },
  { key: 'event', ko: '행사', en: 'Events' },
  { key: 'commstorage', ko: '소통창고', en: 'Comm. Storage' },
];

const SCENARIOS: Scenario[] = [
  {
    id: 'family',
    category: { ko: '개요', en: 'Overview' },
    title: { ko: '가족, 친구들간의 소통 커뮤니티', en: 'Family & Friends Community' },
    hashtag: { ko: '# 유학편', en: '# Studying Abroad' },
    subtitle: {
      ko: '멀리 떨어져 있는 가족에게 안부를 묻는 방법',
      en: 'How to check on family living far away',
    },
    featureTags: {
      ko: ['Intre 기능 - 관계형 그룹', '안부카드'],
      en: ['Intre Feature - Relational Group', 'Greeting Card'],
    },
    cardBg: '/images/IntreUtilization/family_ko.png',
    detailMockup: {
      ko: '/images/IntreUtilization/1_detail_family_ko.png',
      en: '/images/IntreUtilization/1_detail_family_en.png',
    },
  },
  {
    id: 'contacts',
    category: { ko: '개요', en: 'Overview' },
    title: { ko: '종이 명함 대신, 살아있는 인맥 관리', en: 'Live Networking – No Paper Cards' },
    hashtag: { ko: '# 모바일명함편', en: '# Mobile Business Card' },
    subtitle: {
      ko: '모르는 사람없이 찐인맥으로 인맥 재적립하는 방법',
      en: 'How to rebuild your network with real connections',
    },
    featureTags: {
      ko: ['Intre 기능 - 명함 전달'],
      en: ['Intre Feature - Card Exchange'],
    },
    cardBg: '/images/IntreUtilization/contacts_ko.png',
    detailMockup: {
      ko: '/images/IntreUtilization/2_detail_contacts_ko.png',
      en: '/images/IntreUtilization/2_detail_contacts_en.png',
    },
  },
  {
    id: 'surprise',
    category: { ko: '소상공인', en: 'Small Business' },
    title: { ko: '깜짝 이벤트', en: 'Surprise Event' },
    hashtag: { ko: '# 카페 홍보편', en: '# Café Promotion' },
    subtitle: {
      ko: '카페에서 이벤트 홍보하고자 할때 이용방법',
      en: 'How to promote a café event',
    },
    featureTags: {
      ko: ['Intre 기능 - 오픈형그룹', '소통형'],
      en: ['Intre Feature - Open Group', 'Communication Type'],
    },
    cardBg: '/images/IntreUtilization/surprise_ko.png',
    detailMockup: {
      ko: '/images/IntreUtilization/3_detail_surprise_ko.png',
      en: '/images/IntreUtilization/3_detail_surprise_en.png',
    },
  },
  {
    id: 'shopopen',
    category: { ko: '소상공인', en: 'Small Business' },
    title: { ko: '가게 오픈 홍보', en: 'Shop Grand Opening PR' },
    hashtag: { ko: '# 가게 오픈편', en: '# Grand Opening' },
    subtitle: {
      ko: '새로 오픈한 가게를 홍보하는 방법',
      en: 'How to promote a newly opened shop',
    },
    featureTags: {
      ko: ['Intre 기능 - 오픈형그룹', '소통형'],
      en: ['Intre Feature - Open Group', 'Communication Type'],
    },
    cardBg: '/images/IntreUtilization/shopopen_ko.png',
    detailMockup: {
      ko: '/images/IntreUtilization/4_detail_shopopen_ko.png',
      en: '/images/IntreUtilization/4_detail_shopopen_en.png',
    },
  },
  {
    id: 'product',
    category: { ko: '온라인 판매', en: 'Online Sales' },
    title: { ko: '상품 홍보/판매', en: 'Product PR & Sales' },
    hashtag: { ko: '# 수제간식 홍보마케팅편', en: '# Artisan Snack Marketing' },
    subtitle: {
      ko: '내 상품을 홍보하는 방법',
      en: 'How to market your products',
    },
    featureTags: {
      ko: ['Intre 기능 - 오픈형그룹', '일방형'],
      en: ['Intre Feature - Open Group', 'One-Way Type'],
    },
    cardBg: '/images/IntreUtilization/product_ko.png',
    detailMockup: {
      ko: '/images/IntreUtilization/5_detail_product_ko.png',
      en: '/images/IntreUtilization/5_detail_product_en.png',
    },
  },
  {
    id: 'influencer',
    category: { ko: '정보', en: 'Information' },
    title: { ko: '인플루언서', en: 'Influencer Content' },
    hashtag: { ko: '# 인플루언서 콘텐츠편', en: '# Influencer Content' },
    subtitle: {
      ko: '콘텐츠를 많은 사람과 공유하는 방법',
      en: 'How to share your content with many people',
    },
    featureTags: {
      ko: ['Intre 기능 - 오픈형그룹', '일방형'],
      en: ['Intre Feature - Open Group', 'One-Way Type'],
    },
    cardBg: '/images/IntreUtilization/influencer_ko.png',
    detailMockup: {
      ko: '/images/IntreUtilization/6_detail_influencer_ko.png',
      en: '/images/IntreUtilization/6_detail_influencer_en.png',
    },
  },
  {
    id: 'lightning',
    category: { ko: '모임', en: 'Gatherings' },
    title: { ko: '모임내 번개', en: 'Group Lightning Meet-up' },
    hashtag: { ko: '# 러닝크루 번개편', en: '# Running Crew Flash Meet' },
    subtitle: {
      ko: '갑작스러운 일정을 공유할때 이용방법',
      en: 'How to share a sudden schedule change',
    },
    featureTags: {
      ko: ['Intre 기능 - 관계형그룹', '일정공유'],
      en: ['Intre Feature - Relational Group', 'Schedule Sharing'],
    },
    cardBg: '/images/IntreUtilization/lightning_ko.png',
    detailMockup: {
      ko: '/images/IntreUtilization/7_detail_lightning_ko.png',
      en: '/images/IntreUtilization/7_detail_lightning_en.png',
    },
  },
  {
    id: 'fandom',
    category: { ko: '모임', en: 'Gatherings' },
    title: { ko: '깔끔한 팬덤 문화', en: 'Clean Fandom Culture' },
    hashtag: { ko: '# 콘서트편', en: '# Concert' },
    subtitle: {
      ko: '좋아하는 스타의 소식을 공유할때 이용방법',
      en: "How to share news about your favourite star",
    },
    featureTags: {
      ko: ['Intre 기능 - 오픈형그룹', '소통형'],
      en: ['Intre Feature - Open Group', 'Communication Type'],
    },
    cardBg: '/images/IntreUtilization/fandom_ko.png',
    detailMockup: {
      ko: '/images/IntreUtilization/8_detail_fandom_ko.png',
      en: '/images/IntreUtilization/8_detail_fandom_en.png',
    },
  },
  {
    id: 'localchannel',
    category: { ko: '모임', en: 'Gatherings' },
    title: { ko: '지역기반 소통채널', en: 'Local Community Channel' },
    hashtag: { ko: '# 지역 정보 공유편', en: '# Local Info Sharing' },
    subtitle: {
      ko: '지역 정보를 공유하는 방법',
      en: 'How to share local information',
    },
    featureTags: {
      ko: ['Intre 기능 - 오픈형그룹', '소통형'],
      en: ['Intre Feature - Open Group', 'Communication Type'],
    },
    cardBg: '/images/IntreUtilization/localchannel_ko.png',
    detailMockup: {
      ko: '/images/IntreUtilization/9_detail_localchannel_ko.png',
      en: '/images/IntreUtilization/9_detail_localchannel_en.png',
    },
  },
  {
    id: 'regionevent',
    category: { ko: '행사', en: 'Events' },
    title: { ko: '지역 행사', en: 'Regional Event' },
    hashtag: { ko: '# 갯벌 체험 행사편', en: '# Mudflat Experience Event' },
    subtitle: {
      ko: '외부에 지역 행사를 홍보하는 방법',
      en: 'How to promote a regional event externally',
    },
    featureTags: {
      ko: ['Intre 기능 - 오픈형그룹', '일방형'],
      en: ['Intre Feature - Open Group', 'One-Way Type'],
    },
    cardBg: '/images/IntreUtilization/regionevent_ko.png',
    detailMockup: {
      ko: '/images/IntreUtilization/10_detail_regionevent_ko.png',
      en: '/images/IntreUtilization/10_detail_regionevent_en.png',
    },
  },
  {
    id: 'govcomm',
    category: { ko: '소통창고', en: 'Comm. Storage' },
    title: { ko: '지자체 소통방', en: 'Local Gov. Communication Room' },
    hashtag: { ko: '# 공원 민원편', en: '# Park Civil Affairs' },
    subtitle: {
      ko: '시민과 지자체가 소통하는 방법',
      en: 'How citizens communicate with local government',
    },
    featureTags: {
      ko: ['Intre 기능 - 오픈형그룹', '소통형'],
      en: ['Intre Feature - Open Group', 'Communication Type'],
    },
    cardBg: '/images/IntreUtilization/govcomm_ko.png',
    detailMockup: {
      ko: '/images/IntreUtilization/11_detail_govcomm_ko.png',
      en: '/images/IntreUtilization/11_detail_govcomm_en.png',
    },
  },
];

/* ─── Sub-components ────────────────────────────────────────── */

function ScenarioCard({
  scenario,
  onSelect,
}: {
  scenario: Scenario;
  onSelect: (id: ScenarioId) => void;
}) {
  const language = useLanguage();
  const title = language === 'ko' ? scenario.title.ko : scenario.title.en;

  return (
    <button
      onClick={() => onSelect(scenario.id)}
      className="group relative w-full rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008384] focus-visible:ring-offset-2"
      aria-label={title}
    >
      {/* Background image */}
      <div className="relative w-full h-[120px] md:h-[150px]">
        <Image
          src={scenario.cardBg}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 740px"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 transition-colors duration-300 bg-black/74 group-hover:bg-[#008384] opacity-100 group-hover:opacity-95"
        />
        {/* Title */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <p className="text-white font-bold text-xl md:text-2xl text-center leading-relaxed drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
            {title}
          </p>
        </div>
        {/* Arrow hint on hover */}
        <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <span className="text-white/80 text-sm font-medium">
            {language === 'ko' ? '자세히 보기 →' : 'See details →'}
          </span>
        </div>
      </div>
    </button>
  );
}

function DetailView({
  scenario,
  onBack,
}: {
  scenario: Scenario;
  onBack: () => void;
}) {
  const language = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay to trigger entrance animation after mount
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  const title = language === 'ko' ? scenario.title.ko : scenario.title.en;
  const hashtag = language === 'ko' ? scenario.hashtag.ko : scenario.hashtag.en;
  const subtitle = language === 'ko' ? scenario.subtitle.ko : scenario.subtitle.en;
  const featureTags = language === 'ko' ? scenario.featureTags.ko : scenario.featureTags.en;
  const mockupSrc = language === 'ko' ? scenario.detailMockup.ko : scenario.detailMockup.en;

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Title block */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-gray-900 font-extrabold text-2xl md:text-3xl mb-3 leading-snug">
          【 {title} 】
        </h2>
        <p className="text-gray-600 text-base md:text-lg font-semibold mb-2">{hashtag}</p>
        <p className="text-gray-800 text-sm md:text-base leading-relaxed">{subtitle}</p>
        {/* Feature tags */}
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {featureTags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-100 text-gray-700 border border-gray-200 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Mockup image */}
      <div className="relative mx-auto max-w-[480px] md:max-w-[600px] w-full mb-10 md:mb-14">
        <div
          className={`transition-all duration-700 delay-150 ease-out ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <Image
            src={mockupSrc}
            alt={title}
            width={600}
            height={900}
            className="w-full h-auto rounded-2xl shadow-2xl"
            priority
          />
        </div>
      </div>

      {/* Back button (Same width as image) */}
      <div className="relative mx-auto max-w-[480px] md:max-w-[600px] w-full">
        <button
          onClick={onBack}
          className="group flex items-center justify-center w-full gap-3 border border-gray-400 text-gray-700 font-semibold text-base px-8 py-3.5 rounded-xl hover:bg-gray-50 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          {language === 'ko' ? '목록' : 'Back to List'}
        </button>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */

export default function IntreUtilizationContainer() {
  const language = useLanguage();
  const [selectedId, setSelectedId] = useState<ScenarioId | null>(null);
  const [listVisible, setListVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setListVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = useCallback((id: ScenarioId) => {
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = useCallback(() => {
    setSelectedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const selectedScenario = selectedId
    ? SCENARIOS.find((s) => s.id === selectedId) ?? null
    : null;

  // Group scenarios by category key
  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    scenarios: SCENARIOS.filter(
      (s) =>
        (language === 'ko' ? s.category.ko : s.category.en) ===
        (language === 'ko' ? cat.ko : cat.en),
    ),
  })).filter((g) => g.scenarios.length > 0);

  return (
    <div className="container mx-auto px-4 pt-24 pb-24 max-w-[860px]">
      {/* Micro-animation keyframes */}
      <style>{`
        @keyframes iu-fadeup {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .iu-card-enter {
          animation: iu-fadeup 0.45s cubic-bezier(0.16,1,0.3,1) both;
        }
      `}</style>

      {selectedScenario ? (
        <DetailView scenario={selectedScenario} onBack={handleBack} />
      ) : (
        <div
          className={`transition-all duration-500 ${
            listVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {grouped.map((group, gi) => (
            <section
              key={group.key}
              className="mb-24"
              style={{ animationDelay: `${gi * 60}ms` }}
            >
              {/* Category heading */}
              <h2 className="text-[#008384] font-bold text-lg md:text-xl mb-5 md:mb-6 border-b border-[#C3FFD9] pb-2">
                {language === 'ko' ? group.ko : group.en}
              </h2>

              {/* Cards: single column on mobile, 1 col (full-width) on desktop too matching Figma */}
              <div className="flex flex-col gap-8">
                {group.scenarios.map((scenario, si) => (
                  <div
                    key={scenario.id}
                    className="iu-card-enter"
                    style={{ animationDelay: `${gi * 60 + si * 80}ms` }}
                  >
                    <ScenarioCard scenario={scenario} onSelect={handleSelect} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
