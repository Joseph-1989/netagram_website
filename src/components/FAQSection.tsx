'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function FAQSection() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: '네타그램이란 무엇인가요?',
      answer: '네타그램이란 진짜 인맥간의 리얼 소통을 위한 글로벌 관계형 SNS 플랫폼입니다.'
    },
    {
      id: 2,
      question: '회원 가입방법은 어떻게 피드 공유범위는 어떻게 선택하나요?',
      answer: '피드 작성하기에서 "모두에게 공유" 버튼을 클릭하면 "모두에게 공유", "원하는 인맥만 공유", "원하는 그룹만 공유"로 원하는 공유범위를 선택 하실 수 있습니다.'
    },
    {
      id: 3,
      question: '명함정보 수정은 어떻게 하나요?',
      answer: '명함 화면에서 우측 상단 옵션에 "명함 편집"버튼 클릭시 정보를 수정하실 수 있습니다.'
    },
    {
      id: 4,
      question: '명함을 여러개 만들 수 있나요?',
      answer: '현재는 1계정당 1개만 생성하실 수 있으며, 향후 추가 생성 기능을 업그레이드할 예정입니다.'
    },
    {
      id: 5,
      question: '명함 전달은 어떻게 하나요?',
      answer: '카카오톡, 라인, 문자로 전달하는 비대면 방식과 QR코드를 스캔해서 전달하는 대면방식이 있습니다.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#00D9B8] text-center mb-12">FAQ</h2>
          
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenItem(openItem === faq.id ? null : faq.id)}
                >
                  <div className="flex items-center">
                    <Image 
                      src="/images/Question_icon.png" 
                      alt="Question" 
                      width={20} 
                      height={20} 
                      className="mr-3"
                    />
                    <span className="font-medium text-gray-900">{faq.question}</span>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openItem === faq.id ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openItem === faq.id && (
                  <div className="px-6 pb-4 bg-gray-50">
                    <div className="flex items-start">
                      <Image 
                        src="/images/Answer_icon.png" 
                        alt="Answer" 
                        width={20} 
                        height={20} 
                        className="mr-3 mt-1 flex-shrink-0"
                      />
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}