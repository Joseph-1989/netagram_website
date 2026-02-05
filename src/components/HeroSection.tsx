'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faCircleRight } from '@fortawesome/free-solid-svg-icons';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const SLIDES = [
  {
    id: 1,
    image: '/images/HomePage/Swiper_Banner_1.png', // Using available images
    alt: 'Banner 1',
    link: 'https://shop.coupang.com/jejecomms?source=brandstore_sdp_atf&pid=9217417949&viid=94200982822&platform=p&brandId=0&btcEnableForce=false',
  },
  {
    id: 2,
    image: '/images/HomePage/Swiper_Banner_2.png',
    alt: 'Banner 2',
    link: 'https://shop.coupang.com/jejecomms?source=brandstore_sdp_atf&pid=9217417949&viid=94200982822&platform=p&brandId=0&btcEnableForce=false',
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const totalSlides = SLIDES.length;

  return (
    <section className="relative w-full overflow-hidden bg-[#C3FFD9] pt-[72px]">
      {/* Container echoing .swiper_wrapper and .main_swiper_controls_wrapper */}
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full max-w-[1440px] h-[288px] flex justify-between items-end px-4 xl:px-0 mb-4 z-10 relative">
          {/* Motto Wrapper */}
          <div className="w-[auto] h-[150px] flex flex-col justify-center">
            <p className="m-0 p-0 text-[50px] leading-[150%]">
              <span
                className="block text-[#008384] text-[60px] font-normal leading-[150%]"
                style={{ fontFamily: '"Bauhaus 93", sans-serif' }}
              >
                my real NETwork Around GRAM
              </span>
            </p>
          </div>

          {/* Right Controls Wrapper */}
          <div className="flex flex-col items-end justify-end">
            {/* Car Image - Placeholder path needs check or use CSS module if complex positioning needed */}
            <div className="w-[150px] h-[150px] relative mb-4">
              {/*  NOTE: The car image was referenced as /QR_renewal/imgs/home/section_1/section_1_car_image.png in legacy. 
                      Since it's not found in public/images/HomePage, I will comment it out or use a placeholder 
                      if strictly required, but for now assuming it might be missing. 
                      I'll put a placeholder div or img. 
                 */}
              {/* <Image src="/path/to/car.png" alt="Car" fill className="object-contain" /> */}
            </div>

            {/* Main Swiper Controls */}
            <div className="w-[356px] h-[71px] inline-flex items-center gap-[68px]">
              {/* Swiper Progress */}
              <div className="w-[203px] flex items-center gap-[16px]">
                <div className="text-[16px] font-hanwha font-light text-black">
                  <span className="current">{activeIndex + 1}</span>
                </div>

                {/* Custom Progress Bar */}
                <div className="flex w-[150px] h-[0.75px] bg-[rgba(170,165,165,0.3)]">
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

              {/* Nav Arrows */}
              <div className="flex items-center justify-center gap-[10px]">
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="w-[40px] h-[40px] flex hover:opacity-70 transition-opacity rounded-full justify-center items-center"
                >
                  {/* Left Arrow Icon */}
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
                  {/* Right Arrow Icon */}
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

      {/* Main Visual Swiper */}
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
              <div className="w-full h-full relative aspect-[7680/2320]">
                {slide.link ? (
                  <a
                    href={slide.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                      priority={slide.id === 1}
                    />
                  </a>
                ) : (
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={slide.id === 1}
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
