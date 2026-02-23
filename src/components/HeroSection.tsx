'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const SLIDES = [
  {
    id: 1,
    image: '/images/HomePage/Swiper_Banner_1.png',
    mobileImage: '/images/HomePage/Swiper_Banner_1_mobile.png', // Mobile version
    alt: 'Banner 1',
    link: 'https://shop.coupang.com/jejecomms?source=brandstore_sdp_atf&pid=9217417949&viid=94200982822&platform=p&brandId=0&btcEnableForce=false',
  },
  {
    id: 2,
    image: '/images/HomePage/Swiper_Banner_2.png',
    mobileImage: '/images/HomePage/Swiper_Banner_2_mobile.png', // Mobile version
    alt: 'Banner 2',
    link: 'http://jejecomms.com/index.html?menuP=55',
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [popupImage, setPopupImage] = useState<string | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const totalSlides = SLIDES.length;

  return (
    <section className="relative w-full overflow-hidden bg-[#C3FFD9] pt-[72px] max-[459px]:pt-[115px] max-[459px]:max-w-[459px]">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full max-w-[1440px] h-[288px] max-[459px]:h-auto flex max-[459px]:flex-col justify-between items-end max-[459px]:items-start px-4 xl:px-0 mb-4 z-10 relative">
          <div className="w-[auto] h-[150px] max-[459px]:h-auto flex flex-col justify-center max-[459px]:mb-6">
            <p className="m-0 p-0 text-[50px] max-[459px]:text-[22px] leading-[150%]">
              <span
                className="block text-[#008384] text-[60px] max-[459px]:text-[22px] font-normal leading-[150%]"
                style={{ fontFamily: '"Bauhaus 93", sans-serif' }}
              >
                beyond gram into the Real
              </span>
            </p>
          </div>

          <div className="flex flex-col items-end justify-end max-[459px]:w-full max-[459px]:items-center">
            <div className="w-[150px] h-[150px] relative mb-4 max-[459px]:hidden"></div>
            <div className="w-[356px] max-[459px]:w-full h-[71px] inline-flex items-center gap-[68px] max-[459px]:gap-0 max-[459px]:justify-between">
              <div className="w-[203px] max-[459px]:flex-1 flex items-center gap-[16px]">
                <div className="text-[16px] font-hanwha font-light text-black">
                  <span className="current">{activeIndex + 1}</span>
                </div>

                <div className="flex w-[150px] max-[459px]:w-full h-[0.75px] bg-[rgba(170,165,165,0.3)]">
                  {SLIDES.map((_, index) => (
                    <div
                      key={index}
                      className={`flex-1 transition-colors duration-300 ${
                        index === activeIndex
                          ? 'bg-black'
                          : 'bg-[rgba(177,173,173,0.3)]'
                      }`}
                    />
                  ))}
                </div>

                <div className="text-[16px] font-hanwha font-light text-black">
                  <span className="total">{totalSlides}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-[10px] max-[459px]:ml-4">
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="w-[40px] h-[40px] flex hover:opacity-70 transition-opacity rounded-full justify-center items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="w-[40px] h-[40px] flex hover:opacity-70 transition-opacity justify-center items-center rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-[580px]">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onBeforeInit={swiper => {
            swiperRef.current = swiper;
          }}
          onSlideChange={swiper => {
            setActiveIndex(swiper.realIndex);
          }}
          className="w-full h-full"
        >
          {SLIDES.map(slide => (
            <SwiperSlide key={slide.id}>
              <div className="w-full h-full relative aspect-[7680/2320] max-[459px]:aspect-[1440/2080] overflow-hidden box-sizing-border-box">
                {slide.id === 1 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setPopupImage(
                        '/images/HomePage/popup_image/sollal_popup_image.png',
                      )
                    }
                    className="block w-full h-full p-0 border-0 bg-transparent cursor-pointer"
                  >
                    <picture>
                      <source
                        srcSet={slide.mobileImage}
                        media="(max-width: 459px)"
                      />
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        className="object-cover"
                        priority={slide.id === 1}
                      />
                    </picture>
                  </button>
                ) : slide.link ? (
                  <a
                    href={slide.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full "
                  >
                    <picture>
                      <source
                        srcSet={slide.mobileImage}
                        media="(max-width: 459px)"
                      />
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        className="object-cover"
                        priority={slide.id === 1}
                      />
                    </picture>
                  </a>
                ) : (
                  <>
                    <picture>
                      <source
                        srcSet={slide.mobileImage}
                        media="(max-width: 459px)"
                      />
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        className="object-cover"
                        priority={slide.id === 2}
                      />
                    </picture>
                  </>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {popupImage && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
          onClick={() => setPopupImage(null)}
        >
          <div
            className="relative w-[min(92vw,960px)] h-[min(90vh,760px)]"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPopupImage(null)}
              aria-label="Close popup"
              className="absolute top-2 right-2 z-10 h-9 w-9 rounded-full bg-black/60 text-white text-2xl leading-none flex items-center justify-center"
            >
              ×
            </button>
            <Image
              src={popupImage}
              alt="Sollal popup image"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 92vw, 960px"
            />
          </div>
        </div>
      )}
    </section>
  );
}
