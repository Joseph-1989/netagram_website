'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function LaunchingSection() {
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [isBlogHovered, setIsBlogHovered] = useState(false);
  const [isYoutubeHovered, setIsYoutubeHovered] = useState(false);

  const phases = [
    {
      id: 1,
      label: '1차 런칭',
      button: '/images/HomePage/netagram_launching_button_1.png',
      map: '/images/netagram_launching_body_image_1.png',
      color: '#5777FF',
    },
    {
      id: 2,
      label: '2차 런칭',
      button: '/images/HomePage/netagram_launching_button_2.png',
      map: '/images/netagram_launching_body_image_2.png',
      color: '#FFD700',
    },
    {
      id: 3,
      label: '3차 런칭',
      button: '/images/HomePage/netagram_launching_button_3.png',
      map: '/images/netagram_launching_body_image_3.png',
      color: '#FF4B7E',
    },
  ];

  const getCurrentImageSrc = () => {
    if (activePhase === null) {
      return '/images/netagram_launching_body_general_image.png';
    }
    return (
      phases.find(p => p.id === activePhase)?.map ||
      '/images/netagram_launching_body_general_image.png'
    );
  };

  return (
    <section className="py-20 max-[459px]:py-10">
      <div className="flex justify-center items-start mx-auto w-full max-w-[1440px] max-[459px]:max-w-[459px]">
        {/* Left side - Title and Phase Buttons */}
        <div className="flex px-16 flex-col gap-10 max-[459px]:px-4 max-[459px]:flex-col max-[459px]:gap-8 max-[459px]:w-auto">
          {/* Title Section */}
          <div className="max-[459px]:w-[87.5px]">
            <p className="m-0 p-0 text-[50px] max-[459px]:text-[17.975px] max-[459px]:leading-[27px] leading-[150%]">
              <span
                className="block text-[#008384] text-[60px] max-[459px]:text-[17.975px] max-[459px]:leading-[27px] font-normal leading-[150%]"
                style={{ fontFamily: '"Bauhaus 93", sans-serif' }}
              >
                NETAGRAM
              </span>
            </p>
            <p className="m-0 p-0 text-[50px] max-[459px]:text-[30px] leading-[150%]">
              <span
                className="block text-[#000] text-[60px] max-[459px]:text-[17.975px] max-[459px]:leading-[27px] font-normal leading-[150%]"
                style={{ fontFamily: '"Bauhaus 93", sans-serif' }}
              >
                Launching
              </span>
            </p>
          </div>

          {/* Phase Buttons */}
          <div className="flex flex-col gap-6 max-[459px]:w-[87.5px]">
            {phases.map(phase => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  activePhase === phase.id
                    ? 'scale-105'
                    : 'opacity-90 hover:opacity-100'
                }`}
              >
                {/* Map Pin Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 21 32"
                  fill="none"
                  className="transition-colors duration-300 w-[21px] h-[32px] max-[459px]:w-[14.628px] max-[459px]:h-[23.068px]"
                >
                  <path
                    d="M4.6513e-08 10.1484C4.6513e-08 15.7526 10.1471 32 10.1471 32V16.9949C9.24404 17.0011 8.34865 16.8286 7.51253 16.4873C6.67641 16.146 5.91606 15.6426 5.27529 15.0063C4.63451 14.3699 4.12597 13.613 3.77894 12.7793C3.4319 11.9455 3.25324 11.0513 3.25324 10.1482C3.25324 9.24514 3.4319 8.35097 3.77894 7.51722C4.12597 6.68346 4.63451 5.9266 5.27529 5.29022C5.91606 4.65383 6.67641 4.1505 7.51253 3.80921C8.34865 3.46792 9.24404 3.29541 10.1471 3.30162V0C8.81448 4.25239e-05 7.4949 0.262578 6.26373 0.772614C5.03256 1.28265 3.91392 2.0302 2.97167 2.97257C2.02942 3.91495 1.282 5.03369 0.772122 6.26493C0.262243 7.49616 -0.000127544 8.81577 4.6513e-08 10.1484Z"
                    fill={phase.color}
                    fillOpacity="0.6"
                  />
                  <path
                    d="M16.9929 10.1484C16.9929 11.0476 16.8157 11.9381 16.4715 12.7688C16.1273 13.5996 15.6228 14.3544 14.9869 14.9902C14.3509 15.6259 13.596 16.1302 12.7651 16.4742C11.9342 16.8181 11.0438 16.9951 10.1445 16.9949V32C10.1445 32 20.2916 15.7526 20.2916 10.1484C20.2918 8.81577 20.0294 7.49616 19.5195 6.26493C19.0096 5.03369 18.2622 3.91495 17.32 2.97257C16.3777 2.0302 15.2591 1.28265 14.0279 0.772614C12.7967 0.262578 11.4772 4.25239e-05 10.1445 0V3.30324C11.0437 3.30303 11.934 3.47992 12.7648 3.8238C13.5956 4.16769 14.3505 4.67184 14.9864 5.30747C15.6223 5.9431 16.1269 6.69777 16.4711 7.52837C16.8154 8.35898 16.9927 9.24927 16.9929 10.1484Z"
                    fill={phase.color}
                  />
                  <path
                    d="M10.1437 3.30345C8.7895 3.30345 7.46575 3.70501 6.3398 4.45734C5.21385 5.20968 4.33628 6.279 3.81806 7.53008C3.29985 8.78117 3.16425 10.1578 3.42844 11.486C3.69262 12.8141 4.34472 14.0341 5.30226 14.9916C6.2598 15.9492 7.47978 16.6013 8.80793 16.8655C10.1361 17.1296 11.5127 16.9941 12.7638 16.4758C14.0149 15.9576 15.0842 15.08 15.8365 13.9541C16.5889 12.8282 16.9905 11.5044 16.9905 10.1502C16.9905 9.2511 16.8133 8.36077 16.4693 7.53008C16.1252 6.69939 15.6208 5.94461 14.9851 5.30883C14.3493 4.67305 13.5945 4.16872 12.7638 3.82463C11.9331 3.48055 11.0428 3.30345 10.1437 3.30345ZM10.1437 15.2262C9.13973 15.2262 8.15834 14.9285 7.3236 14.3708C6.48886 13.813 5.83825 13.0202 5.45406 12.0927C5.06987 11.1652 4.96936 10.1446 5.16522 9.15996C5.36108 8.17532 5.84451 7.27086 6.5544 6.56097C7.26429 5.85108 8.16874 5.36764 9.15338 5.17178C10.138 4.97593 11.1586 5.07645 12.0862 5.46064C13.0137 5.84483 13.8064 6.49543 14.3642 7.33017C14.9219 8.16491 15.2196 9.1463 15.2196 10.1502C15.2177 11.4957 14.6822 12.7855 13.7307 13.7367C12.7791 14.688 11.4891 15.2231 10.1437 15.2246V15.2262Z"
                    fill={phase.color}
                    fillOpacity="0.8"
                  />
                </svg>
                {/* Phase Label */}
                <span className="text-left font-['Bauhaus_93'] text-[20px] text-black max-[459px]:font-['NEXON_Lv1_Gothic_OTF'] max-[459px]:text-[14.418px] max-[459px]:text-black/50 max-[459px]:leading-[145%] max-[459px]:tracking-[-0.072px] max-[459px]:text-center">
                  {phase.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right side - Map */}
        <div className="flex items-center justify-center w-auto h-auto max-[459px]:w-auto max-[459px]:px-4 box-sizing:border-box">
          <div className="relative flex w-full h-full box-sizing:border-box">
            <picture>
              <source
                srcSet={
                  activePhase === null
                    ? '/images/HomePage/section_3_mobile.png'
                    : getCurrentImageSrc()
                }
                media="(max-width: 459px)"
              />
              <Image
                src={getCurrentImageSrc()}
                alt={
                  activePhase === null
                    ? 'NETAGRAM 런칭 지도'
                    : `${phases.find(p => p.id === activePhase)?.label} 지도`
                }
                width={685}
                height={626}
                className="min-w-[800px] h-[auto] max-[459px]:min-w-0 max-[459px]:h-[174.021px] max-[459px]:w-[190.423px]"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
