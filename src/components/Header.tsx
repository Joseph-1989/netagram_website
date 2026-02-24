'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { dispatchLanguageChange } from '@/hooks/useLanguage';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'ko' | 'en' | null>(
    null,
  );
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  // Mobile accordion state
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);

  const navItems = [
    {
      label: 'INTRE is',
      href: '/intre-introduction',
      subItems: [
        { label: 'INTRE 소개', href: '/intre-introduction' },
        { label: 'INTRE 기능', href: '/intre-feature-intro' },
      ],
    },
    {
      label: 'CONTENTS',
      href: '/contents',
      subItems: [{ label: '신규컨텐츠 개발', href: '/contents' }],
    },
    {
      label: 'COMMUNITY',
      href: '/community',
      subItems: [
        { label: 'FAQ', href: '/faq' },
        { label: '업데이트 정보', href: '/update-info' },
      ],
    },
  ];

  const languages = [
    { code: 'ko', label: '한국어' },
    { code: 'en', label: 'English' },
  ];

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('netagram-language-preference');
    if (savedLanguage && (savedLanguage === 'ko' || savedLanguage === 'en')) {
      setCurrentLanguage(savedLanguage as 'ko' | 'en');
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Save language preference to localStorage when changed
  const handleLanguageChange = (languageCode: 'ko' | 'en') => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('netagram-language-preference', languageCode);
    setIsLanguageOpen(false);

    // Dispatch custom event to notify other components
    dispatchLanguageChange(languageCode);

    // Update document language
    if (typeof window !== 'undefined') {
      document.documentElement.lang = languageCode;
    }
  };

  const toggleMobileSubmenu = (label: string) => {
    setActiveMobileMenu(activeMobileMenu === label ? null : label);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isMenuOpen ? 'bg-white' : 'bg-[#C3FFD9]'}`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 xl:px-0">
        <div className="flex items-center justify-between h-16 md:justify-start md:gap-4">
          <Link href="/" className="flex items-center space-x-2 md:mr-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="112"
              height="30"
              viewBox="0 0 112 30"
              fill="none"
            >
              <path
                d="M23.332 7.3339C23.332 5.15049 25.0995 3.90283 26.0353 3.90283C26.8671 3.90283 27.4909 5.15049 27.3869 5.67035C27.283 6.19021 26.1393 7.95773 25.7234 8.58155C25.3075 9.20538 23.332 9.5173 23.332 7.3339Z"
                fill="#FF0000"
              />
              <path
                d="M59.8244 0.0561628C62.4237 -0.67162 60.9681 5.87855 59.8244 7.85401C62.6313 7.88867 68.494 7.89543 69.4934 7.64601C70.7411 7.33409 72.0936 6.39802 72.4055 6.60597C72.7171 6.81443 72.5085 8.16589 70.7414 8.78956C69.3274 9.28861 68.5578 9.27489 68.3498 9.20558C68.4538 9.72545 68.5159 11.0142 67.9338 12.0122C67.206 13.2599 67.5188 13.2608 67.7268 13.3648C67.9362 13.469 69.0794 13.7801 70.7414 13.6763C72.4049 13.5723 73.6521 14.9236 72.6125 17.1069C71.5728 19.2903 69.1823 23.8657 68.8703 25.4253C68.5585 26.9845 68.5581 28.1281 69.4934 28.1284C70.4291 28.1284 71.2617 27.8161 73.549 25.1128C75.8363 22.4097 77.4998 19.7064 77.6037 19.2905C77.7081 18.8736 79.0601 14.7157 82.9065 12.3247C86.7531 9.93371 89.9754 11.8045 89.9758 13.7798C89.9758 15.7553 89.1441 20.5381 80.6184 21.9937C80.1332 23.6225 80.0157 26.8804 83.426 26.8804C87.6888 26.8804 90.3923 22.7217 93.6155 19.7066C96.8385 16.6915 99.9574 15.9634 103.284 15.9634C108.651 15.9634 111.19 18.0747 111.789 19.1304C111.1 19.7064 111.148 20.2272 110.102 19.9995C108.691 19.6925 104.571 17.4194 103.284 17.4194C97.1553 17.4195 94.763 20.2222 91.1291 24.479L91.1203 24.4898C87.4813 28.7526 78.2274 31.5589 76.9797 23.1372C75.6628 25.4245 72.239 29.9991 69.0783 29.9995C65.1274 29.9995 65.4393 25.5288 65.9592 23.9692C66.4792 22.4093 68.6625 17.3152 69.0783 16.5874C69.4941 15.8598 69.8056 15.6513 68.8703 15.5474C67.9346 15.4434 67.102 15.3398 66.3742 15.0278C65.2305 17.3153 61.9244 22.8046 57.8489 26.4644C52.7542 31.0391 49.5311 27.7121 49.843 21.9937C48.8726 23.2759 46.4746 26.0902 44.6448 27.0884C42.3574 28.336 39.3424 28.1283 38.8225 24.5933C38.3026 21.0582 42.0451 16.3795 42.0451 15.0278C42.0451 13.6763 41.4218 13.6766 40.5901 14.3003C39.7583 14.9241 35.1836 18.9792 29.8811 27.4009C29.3613 28.0246 27.9058 26.9849 27.6975 26.0493C27.5311 25.3007 27.9056 23.4495 28.1135 22.6177C26.9698 23.9693 24.183 26.8806 22.1867 27.7124C19.6914 28.7521 17.0925 28.2322 16.9885 24.3853C16.9053 21.3079 18.4784 17.8357 19.2756 16.4839C18.305 17.2811 14.9916 18.8329 9.50217 18.6665C3.36963 17.702 -0.694962 15.5564 0.0988538 14.6118C1.87481 12.4997 2.51969 15.6248 6.26975 16.7153C7.76284 17.1289 9.28565 17.3986 10.7502 17.315C14.389 17.107 18.0277 16.0676 20.0032 14.0923C21.9786 12.1168 21.8748 11.4927 22.1867 11.4927C22.4987 11.4927 22.811 11.3884 23.6428 12.0122C24.4745 12.636 24.8899 12.9485 23.9543 14.6118C23.0186 16.2754 21.4585 19.3952 20.7307 21.3706C20.0029 23.346 18.8599 26.8798 20.7307 26.6724C22.6022 26.4644 25.7221 23.1378 27.9055 20.3306C30.0888 17.5235 30.816 15.7557 31.6477 13.8843C32.4795 12.0128 32.5839 11.3893 33.3117 11.8052C34.0397 12.2211 35.9109 12.9487 34.8713 15.0278C33.8316 17.1073 30.5049 21.9939 31.4407 22.8257C32.8963 20.6075 36.6178 15.5475 39.8615 13.0523C43.9163 9.93324 45.6845 12.9482 45.2688 14.6118C44.8529 16.2753 42.0453 22.2014 41.8371 23.7612C41.6292 25.3208 41.6295 26.4643 42.6692 26.2564C43.7089 26.0484 45.4766 25.1128 50.675 17.939C50.8137 16.7952 51.528 13.5512 53.2746 9.72511C51.8538 9.6558 48.866 9.70424 48.2834 10.4526C47.5556 11.3884 46.8282 10.2453 47.7639 9.20558C48.6996 8.16586 50.5712 7.95799 54.2102 7.85401C54.9726 5.63597 57.2252 0.784019 59.8244 0.0561628ZM58.6809 9.62159C58.3689 10.4535 57.537 12.5327 55.7698 14.8198C54.0023 17.1072 53.4815 16.6913 52.8576 21.0581C52.2338 25.4249 52.7541 26.5689 54.1057 26.5689C55.4573 26.5689 57.1208 25.1131 59.928 21.8901C62.1737 19.3117 64.1914 15.8248 64.9192 14.4038C63.2557 12.6572 64.4336 10.4881 65.2307 9.62159H58.6809ZM87.5852 16.6909C89.5602 14.8193 88.6244 11.2852 84.9856 14.0923C81.3467 16.8995 81.2427 20.1228 80.7229 20.7466C84.2578 19.7069 85.6097 18.5624 87.5852 16.6909ZM56.6008 9.5171C56.0809 10.2449 55.2497 13.6763 55.1457 13.8843C55.9775 13.1356 57.0858 10.6608 57.5364 9.5171H56.6008ZM59.928 3.07081C59.6154 2.86478 57.5362 7.33372 57.3283 7.74952H58.5764C59.6161 5.25427 60.2399 3.27875 59.928 3.07081Z"
                fill="url(#paint0_linear_1620_15441)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1620_15441"
                  x1="82.8359"
                  y1="38.3394"
                  x2="78.6123"
                  y2="-12.468"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.011" stopColor="#007E7F" />
                  <stop offset="0.507" stopColor="#67CDCC" />
                  <stop offset="1" stopColor="#10DC8E" />
                </linearGradient>
              </defs>
            </svg>
          </Link>

          <div className="flex md:w-[100%] items-center md:justify-between md:space-x-4">
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link transition-colors hover:text-[#00D9B8] ${
                    pathname === item.href
                      ? 'text-[#00D9B8] border-b-2 border-[#00D9B8] pb-1'
                      : 'text-[#000]'
                  }`}
                  onClick={e => {
                    // Toggle submenu for all nav items with subItems
                    if (item.subItems && item.subItems.length > 0) {
                      e.preventDefault();
                      setHoveredMenu(
                        hoveredMenu === item.label ? null : item.label,
                      );
                    }
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#00D9B8] transition-colors"
                aria-label="Select language"
              >
                <span className="text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 21C10.7615 21 9.59483 20.7632 8.5 20.2895C7.40517 19.8157 6.45167 19.1727 5.6395 18.3605C4.82733 17.5483 4.18433 16.5948 3.7105 15.5C3.23683 14.4052 3 13.2385 3 12C3 10.7577 3.23683 9.59 3.7105 8.497C4.18433 7.40417 4.82733 6.45167 5.6395 5.6395C6.45167 4.82733 7.40517 4.18433 8.5 3.7105C9.59483 3.23683 10.7615 3 12 3C13.2423 3 14.41 3.23683 15.503 3.7105C16.5958 4.18433 17.5483 4.82733 18.3605 5.6395C19.1727 6.45167 19.8157 7.40417 20.2895 8.497C20.7632 9.59 21 10.7577 21 12C21 13.2385 20.7632 14.4052 20.2895 15.5C19.8157 16.5948 19.1727 17.5483 18.3605 18.3605C17.5483 19.1727 16.5958 19.8157 15.503 20.2895C14.41 20.7632 13.2423 21 12 21ZM12 20.0077C12.5872 19.2539 13.0712 18.5135 13.452 17.7865C13.8327 17.0597 14.1423 16.2463 14.3807 15.3463H9.61925C9.88342 16.2974 10.1994 17.1365 10.5673 17.8635C10.9353 18.5903 11.4128 19.3051 12 20.0077ZM10.727 19.8577C10.2603 19.3078 9.83433 18.6279 9.449 17.8182C9.06383 17.0086 8.777 16.1846 8.5885 15.3463H4.75375C5.32692 16.5898 6.13942 17.6096 7.19125 18.4057C8.24325 19.2019 9.42183 19.6859 10.727 19.8577ZM13.273 19.8577C14.5782 19.6859 15.7567 19.2019 16.8087 18.4057C17.8606 17.6096 18.6731 16.5898 19.2463 15.3463H15.4115C15.159 16.1974 14.8401 17.0278 14.4548 17.8375C14.0696 18.6472 13.6757 19.3206 13.273 19.8577ZM4.34625 14.3463H8.38075C8.30508 13.9359 8.25158 13.5362 8.22025 13.147C8.18875 12.758 8.173 12.3757 8.173 12C8.173 11.6243 8.18875 11.242 8.22025 10.853C8.25158 10.4638 8.30508 10.0641 8.38075 9.65375H4.34625C4.23725 9.99992 4.15225 10.3772 4.09125 10.7855C4.03042 11.1938 4 11.5987 4 12C4 12.4013 4.03042 12.8062 4.09125 13.2145C4.15225 13.6228 4.23725 14.0001 4.34625 14.3463ZM9.38075 14.3463H14.6193C14.6949 13.9359 14.7484 13.5426 14.7797 13.1663C14.8113 12.7901 14.827 12.4013 14.827 12C14.827 11.5987 14.8113 11.2099 14.7797 10.8337C14.7484 10.4574 14.6949 10.0641 14.6193 9.65375H9.38075C9.30508 10.0641 9.25158 10.4574 9.22025 10.8337C9.18875 11.2099 9.173 11.5987 9.173 12C9.173 12.4013 9.18875 12.7901 9.22025 13.1663C9.25158 13.5426 9.30508 13.9359 9.38075 14.3463ZM15.6193 14.3463H19.6538C19.7628 14.0001 19.8477 13.6228 19.9088 13.2145C19.9696 12.8062 20 12.4013 20 12C20 11.5987 19.9696 11.1938 19.9088 10.7855C19.8477 10.3772 19.7628 9.99992 19.6538 9.65375H15.6193C15.6949 10.0641 15.7484 10.4638 15.7797 10.853C15.8113 11.242 15.827 11.6243 15.827 12C15.827 12.3757 15.8113 12.758 15.7797 13.147C15.7484 13.5362 15.6949 13.9359 15.6193 14.3463ZM15.4115 8.65375H19.2463C18.6602 7.38458 17.8573 6.36475 16.8375 5.59425C15.8177 4.82375 14.6295 4.33333 13.273 4.123C13.7397 4.73717 14.1593 5.43942 14.5318 6.22975C14.9043 7.02025 15.1975 7.82825 15.4115 8.65375ZM9.61925 8.65375H14.3807C14.1166 7.71542 13.7909 6.86675 13.4038 6.10775C13.0166 5.34875 12.5487 4.64358 12 3.99225C11.4513 4.64358 10.9834 5.34875 10.5963 6.10775C10.2091 6.86675 9.88342 7.71542 9.61925 8.65375ZM4.75375 8.65375H8.5885C8.8025 7.82825 9.09575 7.02025 9.46825 6.22975C9.84075 5.43942 10.2603 4.73717 10.727 4.123C9.35767 4.33333 8.16633 4.82692 7.153 5.60375C6.1395 6.38075 5.33975 7.39742 4.75375 8.65375Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <span className="hidden sm:block">
                  {languages.find(lang => lang.code === currentLanguage)
                    ?.label || '언어선택'}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isLanguageOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  {languages.map(language => (
                    <button
                      key={language.code}
                      onClick={() =>
                        handleLanguageChange(language.code as 'ko' | 'en')
                      }
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                        currentLanguage === language.code
                          ? 'text-[#00D9B8] bg-[#00D9B8]/10'
                          : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 21C10.7615 21 9.59483 20.7632 8.5 20.2895C7.40517 19.8157 6.45167 19.1727 5.6395 18.3605C4.82733 17.5483 4.18433 16.5948 3.7105 15.5C3.23683 14.4052 3 13.2385 3 12C3 10.7577 3.23683 9.59 3.7105 8.497C4.18433 7.40417 4.82733 6.45167 5.6395 5.6395C6.45167 4.82733 7.40517 4.18433 8.5 3.7105C9.59483 3.23683 10.7615 3 12 3C13.2423 3 14.41 3.23683 15.503 3.7105C16.5958 4.18433 17.5483 4.82733 18.3605 5.6395C19.1727 6.45167 19.8157 7.40417 20.2895 8.497C20.7632 9.59 21 10.7577 21 12C21 13.2385 20.7632 14.4052 20.2895 15.5C19.8157 16.5948 19.1727 17.5483 18.3605 18.3605C17.5483 19.1727 16.5958 19.8157 15.503 20.2895C14.41 20.7632 13.2423 21 12 21ZM12 20.0077C12.5872 19.2539 13.0712 18.5135 13.452 17.7865C13.8327 17.0597 14.1423 16.2463 14.3807 15.3463H9.61925C9.88342 16.2974 10.1994 17.1365 10.5673 17.8635C10.9353 18.5903 11.4128 19.3051 12 20.0077ZM10.727 19.8577C10.2603 19.3078 9.83433 18.6279 9.449 17.8182C9.06383 17.0086 8.777 16.1846 8.5885 15.3463H4.75375C5.32692 16.5898 6.13942 17.6096 7.19125 18.4057C8.24325 19.2019 9.42183 19.6859 10.727 19.8577ZM13.273 19.8577C14.5782 19.6859 15.7567 19.2019 16.8087 18.4057C17.8606 17.6096 18.6731 16.5898 19.2463 15.3463H15.4115C15.159 16.1974 14.8401 17.0278 14.4548 17.8375C14.0696 18.6472 13.6757 19.3206 13.273 19.8577ZM4.34625 14.3463H8.38075C8.30508 13.9359 8.25158 13.5362 8.22025 13.147C8.18875 12.758 8.173 12.3757 8.173 12C8.173 11.6243 8.18875 11.242 8.22025 10.853C8.25158 10.4638 8.30508 10.0641 8.38075 9.65375H4.34625C4.23725 9.99992 4.15225 10.3772 4.09125 10.7855C4.03042 11.1938 4 11.5987 4 12C4 12.4013 4.03042 12.8062 4.09125 13.2145C4.15225 13.6228 4.23725 14.0001 4.34625 14.3463ZM9.38075 14.3463H14.6193C14.6949 13.9359 14.7484 13.5426 14.7797 13.1663C14.8113 12.7901 14.827 12.4013 14.827 12C14.827 11.5987 14.8113 11.2099 14.7797 10.8337C14.7484 10.4574 14.6949 10.0641 14.6193 9.65375H9.38075C9.30508 10.0641 9.25158 10.4574 9.22025 10.8337C9.18875 11.2099 9.173 11.5987 9.173 12C9.173 12.4013 9.18875 12.7901 9.22025 13.1663C9.25158 13.5426 9.30508 13.9359 9.38075 14.3463ZM15.6193 14.3463H19.6538C19.7628 14.0001 19.8477 13.6228 19.9088 13.2145C19.9696 12.8062 20 12.4013 20 12C20 11.5987 19.9696 11.1938 19.9088 10.7855C19.8477 10.3772 19.7628 9.99992 19.6538 9.65375H15.6193C15.6949 10.0641 15.7484 10.4638 15.7797 10.853C15.8113 11.242 15.827 11.6243 15.827 12C15.827 12.3757 15.8113 12.758 15.7797 13.147C15.7484 13.5362 15.6949 13.9359 15.6193 14.3463ZM15.4115 8.65375H19.2463C18.6602 7.38458 17.8573 6.36475 16.8375 5.59425C15.8177 4.82375 14.6295 4.33333 13.273 4.123C13.7397 4.73717 14.1593 5.43942 14.5318 6.22975C14.9043 7.02025 15.1975 7.82825 15.4115 8.65375ZM9.61925 8.65375H14.3807C14.1166 7.71542 13.7909 6.86675 13.4038 6.10775C13.0166 5.34875 12.5487 4.64358 12 3.99225C11.4513 4.64358 10.9834 5.34875 10.5963 6.10775C10.2091 6.86675 9.88342 7.71542 9.61925 8.65375ZM4.75375 8.65375H8.5885C8.8025 7.82825 9.09575 7.02025 9.46825 6.22975C9.84075 5.43942 10.2603 4.73717 10.727 4.123C9.35767 4.33333 8.16633 4.82692 7.153 5.60375C6.1395 6.38075 5.33975 7.39742 4.75375 8.65375Z"
                            fill="black"
                          />
                        </svg>
                      </span>
                      <span>{language.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger Button - to the right of language selector, visible only on mobile */}
            <button
              className="md:hidden p-2"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                if (isMenuOpen) {
                  setActiveMobileMenu(null);
                }
              }}
              aria-label="Toggle menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu - slides down below header */}
      <div
        className={`md:hidden bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'max-h-[calc(100vh-64px)] opacity-100'
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-64px)]">
          {navItems.map(item => (
            <div key={item.label} className="flex flex-col">
              <button
                onClick={() => toggleMobileSubmenu(item.label)}
                className="flex items-center justify-between w-full py-4 text-left border-b border-gray-100"
              >
                <span
                  className={`text-lg font-bold ${activeMobileMenu === item.label ? 'text-[#00D9B8]' : 'text-black'}`}
                >
                  {item.label}
                </span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${activeMobileMenu === item.label ? 'rotate-180 text-[#00D9B8]' : 'text-gray-400'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Submenu */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out
                  ${activeMobileMenu === item.label ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="pl-4 py-3 space-y-3">
                  {item.subItems?.map(sub => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block text-base text-gray-600 hover:text-[#00D9B8] py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Submenu */}
      {hoveredMenu && (
        <div className="hidden md:block absolute left-0 right-0 top-16 bg-[#C3FFD9] h-16 border-t border-[#00D9B8]/20">
          <div className="w-full max-w-[1440px] mx-auto px-4 xl:px-0">
            <div className="flex items-center h-16 gap-8 md:pl-[152px]">
              {navItems
                .find(item => item.label === hoveredMenu)
                ?.subItems?.map(sub => (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    className={`submenu-link hover:text-[#00D9B8] transition-colors font-medium ${
                      pathname === sub.href ? 'text-[#00D9B8]' : 'text-gray-600'
                    }`}
                  >
                    {sub.label}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
