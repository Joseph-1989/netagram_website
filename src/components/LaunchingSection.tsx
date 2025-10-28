'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function LaunchingSection() {
    const [activePhase, setActivePhase] = useState<number | null>(null);

  const phases = [
    {
      id: 1,
      label: '1차 런칭',
      button: '/images/netagram_launching_button_1.png',
      map: '/images/netagram_launching_body_image_1.png',
      color: '#00D9B8'
    },
    {
      id: 2,
      label: '2차 런칭',
      button: '/images/netagram_launching_button_2.png',
      map: '/images/netagram_launching_body_image_2.png',
      color: '#FFD700'
    },
    {
      id: 3,
      label: '3차 런칭',
      button: '/images/netagram_launching_button_3.png',
      map: '/images/netagram_launching_body_image_3.png',
      color: '#FF4B7E'
    }
  ];
    
  const getCurrentImageSrc = () => {
    if (activePhase === null) {
      return '/images/netagram_launching_body_general_image.png';
    }
    return phases.find(p => p.id === activePhase)?.map || '/images/netagram_launching_body_general_image.png';
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Image
            src="/images/NETAGRAM_LAUNCHING_title.png"
            alt="NETAGRAM LAUNCHING"
            width={500}
            height={80}
            className="mx-auto"
          />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-24 mb-12">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className={`transition-all duration-300 ${
                  activePhase === phase.id ? 'scale-110' : 'opacity-70 hover:opacity-90'
                }`}
              >
                <Image
                  src={phase.button}
                  alt={phase.label}
                  width={120}
                  height={120}
                  className="h-73px w-70px"
                />
              </button>
            ))}
          </div>

          <div className="relative">
            <Image
              src={getCurrentImageSrc()}
              alt={activePhase === null ? "NETAGRAM 런칭 지도" : `${phases.find(p => p.id === activePhase)?.label} 지도`}
              width={800}
              height={577}
              className="w-full h-auto mx-auto"
              style={{
                aspectRatio: '800/576.573',
                flexShrink: 0
              }}
            />
          </div>

          <div className="flex justify-center gap-24px mt-8">
            <a href="https://blog.naver.com/jejecomms" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[none] text-white rounded-lg hover:bg-[#00C4A8] transition-colors">
              <Image
                src="/images/blog_icon_enabled.png"
                alt="블로그"
                width={74}
                height={74}
              />
            </a>
            <a href="http://www.youtube.com/@jejecomms" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[none] text-white rounded-lg hover:bg-[#E63E6B] transition-colors">
              <Image
                src="/images/youtube_icon_enabled.png"
                alt="유튜브"
                width={74}
                height={74}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
