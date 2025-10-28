'use client';

import Image from 'next/image';

export default function HeroSection() {
  const scrollToNext = () => {
    const nextSection = document.getElementById('features');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#1a2332]">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/video/homepage_background_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#1a2332]/80"></div>
      </div>

      {/* Main content - centered */}
      <div className="relative z-10 container mx-auto px-4 text-center flex-1 flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <Image
            src="/images/The_Beginning_of_True_Communication_with_Precious_People_title.png"
            alt="The_Beginning_of_True_Communication_with_Precious_People"
            width={800}
            height={200}
            className="mx-auto mb-8 w-full max-w-2xl"
            priority
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="#"
              className="inline-block transition-transform hover:scale-105"
            >
              <Image
                src="/images/google_play_button.png"
                alt="Download from Google Play"
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </a>
            <a
              href="#"
              className="inline-block transition-transform hover:scale-105"
            >
              <Image
                src="/images/apple_store_button.png"
                alt="Download from App Store"
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll down button - positioned at bottom */}
      <div className="relative z-10 flex justify-center">
        <button
          onClick={scrollToNext}
          className="inline-flex flex-col items-center text-white hover:text-[#00D9B8] transition-colors"
          aria-label="Scroll down"
        >
          <Image
            src="/images/scroll_down_icon.png"
            alt="Scroll down"
            width={150}
            height={150}
            className="animate-bounce h-150px w-150px"
          />
        </button>
      </div>
    </section>
  );
}