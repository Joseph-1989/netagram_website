'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function FloatingMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFooterInViewMobile, setIsFooterInViewMobile] = useState(false);
  const pathname = usePathname();
  const isAlwaysVisiblePage = /(^|\/)(faq|update-info)(\/|$)/.test(
    pathname || '',
  );

  useEffect(() => {
    if (isAlwaysVisiblePage) {
      return;
    }

    const handleScroll = () => {
      // Show button when page is scrolled down
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAlwaysVisiblePage]);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const watchFooter = () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }

      if (!window.matchMedia('(max-width: 459px)').matches) {
        setIsFooterInViewMobile(false);
        return;
      }

      const footer = document.getElementById('site-footer');
      if (!footer) {
        setIsFooterInViewMobile(false);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          setIsFooterInViewMobile(entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0,
          rootMargin: '0px 0px 220px 0px',
        },
      );

      observer.observe(footer);
    };

    watchFooter();
    window.addEventListener('resize', watchFooter);

    return () => {
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener('resize', watchFooter);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const shouldShowFloatingMenu = isAlwaysVisiblePage || isVisible;

  if (!shouldShowFloatingMenu) return null;

  return (
    <div
      className={`fixed right-8 bottom-32 z-50 flex flex-col items-end gap-4 transition-all duration-300 ${
        isFooterInViewMobile ? 'max-[459px]:bottom-40' : 'max-[459px]:bottom-5'
      }`}
    >
      {/* Main Menu Container */}
      <div
        className={`w-[200px] overflow-hidden rounded-[20px] bg-[#666666] text-white shadow-xl transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        } md:max-h-[800px] md:opacity-100`}
      >
        {/* Family Site Section */}
        <div className="p-5 pb-2">
          <h3 className="mb-4 text-right text-[20px] font-normal text-[#99E1CD]">
            FAMILY SITE
          </h3>
          <ul className="space-y-3 text-white text-right text-[16px] font-normal font-['NEXON Lv1 Gothic'] leading-normal">
            {[
              {
                name: 'Landing Page',
                url: 'http://jejecomms.com/landing.html',
              },
              { name: 'JEJECOMMMS', url: 'http://jejecomms.com/index.html' },
              { name: 'SHIFT', url: 'http://shiftapp.net' },
              { name: 'QR알리미', url: 'http://shiftapp.net/QR' },
              { name: 'INTRE', url: 'http://intresns.com' },
            ].map(site => (
              <li
                key={site.name}
                className="flex text-[18px] items-center justify-end gap-2"
              >
                <Link
                  href={site.url}
                  className="text-[20px] font-light text-white hover:text-[#99E1CD] transition-colors flex items-center gap-2"
                  target="_blank"
                >
                  {site.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5.6155 20C5.15517 20 4.77083 19.8458 4.4625 19.5375C4.15417 19.2292 4 18.8448 4 18.3845V5.6155C4 5.15517 4.15417 4.77083 4.4625 4.4625C4.77083 4.15417 5.15517 4 5.6155 4H11.2308V5H5.6155C5.4615 5 5.32042 5.06408 5.19225 5.19225C5.06408 5.32042 5 5.4615 5 5.6155V18.3845C5 18.5385 5.06408 18.6796 5.19225 18.8077C5.32042 18.9359 5.4615 19 5.6155 19H18.3845C18.5385 19 18.6796 18.9359 18.8077 18.8077C18.9359 18.6796 19 18.5385 19 18.3845V12.7692H20V18.3845C20 18.8448 19.8458 19.2292 19.5375 19.5375C19.2292 19.8458 18.8448 20 18.3845 20H5.6155ZM9.7385 14.9692L9.03075 14.2615L18.2923 5H14V4H20V10H19V5.70775L9.7385 14.9692Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="mx-4 border-t border-gray-500/50"></div>

        {/* SNS Section */}
        <div className="p-5 pt-3">
          <h3 className="mb-4 text-right text-[20px] font-normal text-[#99E1CD]">
            SNS
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center justify-end gap-3">
              <span className="text-[20px] font-light">유튜브</span>
              <Link
                href="https://www.youtube.com/@jejecomms"
                target="_blank"
                className="hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center">
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.4489 1.98222C15.2678 1.30667 14.7378 0.775556 14.0622 0.595556C12.8378 0.266667 7.94222 0.266667 7.94222 0.266667C7.94222 0.266667 3.04889 0.266667 1.82222 0.595556C1.14889 0.775556 0.617778 1.30667 0.435556 1.98222C0.106667 3.20889 0.106667 5.76667 0.106667 5.76667C0.106667 5.76667 0.106667 8.32444 0.435556 9.55111C0.617778 10.2267 1.14889 10.7578 1.82222 10.9378C3.04889 11.2667 7.94222 11.2667 7.94222 11.2667C7.94222 11.2667 12.8378 11.2667 14.0622 10.9378C14.7378 10.7578 15.2678 10.2267 15.4489 9.55111C15.7778 8.32444 15.7778 5.76667 15.7778 5.76667C15.7778 5.76667 15.7778 3.20889 15.4489 1.98222ZM6.37333 8.12444V3.40889L10.5156 5.76667L6.37333 8.12444Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </Link>
            </li>
            <li className="flex items-center justify-end gap-3">
              <span className="text-[20px] font-light">인스타그램</span>
              <Link
                href="https://www.instagram.com/jejecomms_jjang/"
                target="_blank"
                className="hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FFD600] via-[#FF0100] to-[#D800B9] flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
              </Link>
            </li>
            <li className="flex items-center justify-end gap-3">
              <span className="text-[20px] font-light">페이스북</span>
              <Link
                href="https://www.facebook.com/JeJeComms/"
                target="_blank"
                className="hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.098 4.388 23.095 10.125 23.999V15.56H7.078V12.073H10.125V9.43C10.125 6.427 11.916 4.77 14.656 4.77C15.968 4.77 17.344 4.996 17.344 4.996V7.946H15.83C14.34 7.946 13.875 8.871 13.875 9.82V12.073H17.203L16.67 15.56H13.875V23.999C19.612 23.095 24 18.098 24 12.073Z" />
                  </svg>
                </div>
              </Link>
            </li>
            <li className="flex items-center justify-end gap-3">
              <span className="text-[20px] font-light">블로그</span>
              <Link
                href="https://blog.naver.com/jejecomms"
                target="_blank"
                className="hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-[#00C73C] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">b</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <button
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className="flex md:hidden h-[60px] w-[60px] flex-col items-center justify-center rounded-full bg-[#1A1A1A] text-white shadow-lg transition-transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className={`transition-transform duration-300 ${
            isMenuOpen ? 'rotate-45' : ''
          }`}
        >
          <path
            d="M12 3.5V20.5M20.5 12H3.5"
            stroke="#C3FFD9"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <Link
        href="http://jejecomms.com/landing.html#contact_section"
        className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#1A1A1A] text-white shadow-lg transition-transform hover:scale-110"
      >
        <span className="text-3xl font-bold">?</span>
      </Link>

      <button
        onClick={scrollToTop}
        className="flex h-[60px] w-[60px] flex-col items-center justify-center rounded-full bg-[#1A1A1A] text-white shadow-lg transition-transform hover:scale-110"
      >
        <span className="mb-[-5px] text-xl">▲</span>
        <span className="text-xs">TOP</span>
      </button>
    </div>
  );
}
