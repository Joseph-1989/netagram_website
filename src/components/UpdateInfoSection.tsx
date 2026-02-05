'use client';

import { useLanguage } from '@/hooks/useLanguage';
import Link from 'next/link';

interface UpdateItem {
  id: number;
  title: string;
  date: string;
  highlight?: boolean;
}

const updateData: UpdateItem[] = [
  { id: 55, title: 'QR알리미 업데이트', date: '26. 01. 09' },
  {
    id: 54,
    title: 'QR알리미, 드디어 쿠팡 브랜드관 입점하다.',
    date: '25. 11. 27',
  },
  {
    id: 53,
    title: '2025 G FAIR KOREA(일산 KINTEX) 참가 10/30~11/1 [ I-24 부스 ]',
    date: '25. 11. 06',
  },
  {
    id: 52,
    title: '빅뉴스! 제제컴즈, 명품 배우 박귀순과 전속 모델 계약 체결!',
    date: '25. 11. 06',
    highlight: true,
  },
  {
    id: 51,
    title: '2025 청년인재 취업박람회_성남산업진흥원',
    date: '25. 10. 01',
  },
  { id: 50, title: 'ITRC 인재양성대전 2025 참가.', date: '25. 05. 13' },
  {
    id: 49,
    title: 'QR알리미 3차 와디즈 리워드펀딩 106% 성공 (2024.11월 블랙버드전)',
    date: '25. 05. 12',
  },
  {
    id: 48,
    title: '(주)제제컴즈 성남글로벌융합센터로 이전',
    date: '25. 05. 12',
  },
  {
    id: 47,
    title:
      '(주)제제컴즈 2024도쿄 스마트팩토리 박람회 Smart Factory Expo(SFE) 참가',
    date: '24. 01. 25',
  },
  {
    id: 46,
    title: '2023 사우디아라비아 타이프 투자포럼 참가',
    date: '23. 12. 04',
  },
  {
    id: 45,
    title: 'QR알리미 와디즈 크라우드펀딩 2차펀딩 Start!!!',
    date: '23. 10. 10',
  },
  {
    id: 44,
    title:
      '(주)제제컴즈_사우디아라비아 타이프시티 전용 플랫폼 개발사업 3차 발표 진행',
    date: '23. 09. 15',
  },
  {
    id: 43,
    title:
      '(주)제제컴즈 "QR알리미"로 2023 SWEX(스마트 워크 엑스포 코리아) 참가!!!',
    date: '23. 09. 15',
  },
  {
    id: 42,
    title:
      '(주)제제컴즈_사우디아라비아 타이프주 뉴딜 스마트시티 조성사업 통합플랫폼 기반 구축부분 2차 발표 진행',
    date: '23. 09. 15',
  },
  { id: 41, title: 'SHIFT 서비스 오류 안내', date: '23. 09. 15' },
];

export default function UpdateInfoSection() {
  const language = useLanguage();

  const activePage = 1;
  const totalPages = 10;

  return (
    <section id="features" className="mx-auto px-4 py-40 max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-teal-400 bg-clip-text text-transparent inline-block pb-2 border-b-2 border-teal-500">
          업데이트 정보
        </h2>
      </div>

      <div className="w-full bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[768px]">
            <thead>
              <tr className="border-t-2 border-gray-800 border-b border-gray-300">
                <th className="py-4 text-center font-bold text-gray-800 w-24">
                  No.
                </th>
                <th className="py-4 text-center font-bold text-gray-800">
                  Title
                </th>
                <th className="py-4 text-center font-bold text-gray-800 w-32">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {updateData.map(item => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 text-center text-gray-600">{item.id}</td>
                  <td
                    className={`py-4 px-4 ${item.highlight ? 'text-cyan-500 font-medium' : 'text-gray-700'}`}
                  >
                    <Link href="#" className="hover:underline">
                      {item.title}
                    </Link>
                  </td>
                  <td className="py-4 text-center text-gray-500">
                    {item.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-12 gap-2 text-gray-400 text-sm">
          <button className="flex items-center justify-center w-8 h-8 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
              />
            </svg>
          </button>
          <button className="flex items-center justify-center w-8 h-8 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <div className="flex gap-2 mx-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(page => (
              <button
                key={page}
                className={`w-6 h-6 flex items-center justify-center ${
                  activePage === page
                    ? 'text-teal-500 font-bold'
                    : 'hover:text-gray-600'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button className="flex items-center justify-center w-8 h-8 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
          <button className="flex items-center justify-center w-8 h-8 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
