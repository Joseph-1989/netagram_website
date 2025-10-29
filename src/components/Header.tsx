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
  const [currentLanguage, setCurrentLanguage] = useState<'ko' | 'en'>('ko');

  const navItems = [
    { href: '/', label: 'NETAGRAM Is' },
    { href: '/use-netagram/', label: 'Use NETAGRAM' },
    { href: '/contact/', label: 'Contact' },
  ];

  const languages = [
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ];

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('netagram-language-preference');
    if (savedLanguage && (savedLanguage === 'ko' || savedLanguage === 'en')) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/netagram_header_logo.png"
              alt="NETAGRAM"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-[#00D9B8] ${
                    pathname === item.href
                      ? 'text-[#00D9B8] border-b-2 border-[#00D9B8] pb-1'
                      : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#00D9B8] transition-colors border border-gray-300 rounded-md hover:border-[#00D9B8]"
                aria-label="Select language"
              >
                <span className="text-lg">
                  {languages.find(lang => lang.code === currentLanguage)?.flag}
                </span>
                <span className="hidden sm:block">
                  {languages.find(lang => lang.code === currentLanguage)?.label}
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
                      <span className="text-lg">{language.flag}</span>
                      <span>{language.label}</span>
                      {currentLanguage === language.code && (
                        <svg
                          className="w-4 h-4 ml-auto"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span
                  className={`block h-0.5 w-6 bg-gray-700 transition-transform ${
                    isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-gray-700 transition-opacity ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-gray-700 transition-transform ${
                    isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-[#00D9B8] ${
                    pathname === item.href ? 'text-[#00D9B8]' : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  {languages.map(language => (
                    <button
                      key={language.code}
                      onClick={() =>
                        handleLanguageChange(language.code as 'ko' | 'en')
                      }
                      className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-colors ${
                        currentLanguage === language.code
                          ? 'text-[#00D9B8] bg-[#00D9B8]/10 border border-[#00D9B8]'
                          : 'text-gray-700 border border-gray-300'
                      }`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span>{language.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
