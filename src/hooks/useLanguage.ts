'use client';

import { useState, useEffect } from 'react';

export type Language = 'ko' | 'en';

const LANGUAGE_STORAGE_KEY = 'netagram-language-preference';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('ko');

  useEffect(() => {
    // Read from localStorage on mount
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage && (savedLanguage === 'ko' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }

    // Listen for language change events
    const handleLanguageChange = (
      event: CustomEvent<{ language: Language }>,
    ) => {
      setLanguage(event.detail.language);
    };

    window.addEventListener(
      'language-changed',
      handleLanguageChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        'language-changed',
        handleLanguageChange as EventListener,
      );
    };
  }, []);

  return language;
}

export function dispatchLanguageChange(language: Language) {
  const event = new CustomEvent('language-changed', {
    detail: { language },
  });
  window.dispatchEvent(event);
}
