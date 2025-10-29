'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    privacy: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', message: '', privacy: false });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
  <h2 className="text-3xl font-bold text-[#00D9B8] text-center mb-12">문의하기</h2>
</div>
          <div className="text-center mb-12 flex flex-col items-center">
            <Image
              src="/images/munyehagi_image.png"
              alt="Contact_Form_iPhone_Screen"
              width={434.424}
              height={285.36}
              className="mx-auto mb-8 w-[434.424] h-[285.36]"
              style={{ aspectRatio: '434.424/285.36' }}
            />
            <Image
              src="/images/Quick_Consultation_We_Can_Assist_You_title.png"
              alt="Quick_Consultation_We_Can_Assist_You"
              width={400}
              height={60}
              className="mx-auto mb-6 w-400px h-60px"
            />
          </div>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 bg-[#EEF0F4] p-10 rounded-lg z-index-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                이름
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="회사명 또는 담당자 이름을 입력해주세요."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D9B8] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                연락처
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="회사 또는 담당자 연락처를 번호만 입력해주세요."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D9B8] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                문의 내용
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="문의하실 내용을 자세히 입력해주세요."
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D9B8] focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                checked={formData.privacy}
                onChange={handleChange}
                className="mt-1 mr-3 h-4 w-4 text-[#00D9B8] focus:ring-[#00D9B8] border-gray-300 rounded"
                required
              />
              <label htmlFor="privacy" className="text-sm text-gray-700">
                <Image
                  src="/images/Privacy_Collection_and_Use_Agreement_text_agreement.png"
                  alt="Privacy_Collection_and_Use_Agreement_text_agreement"
                  width={300}
                  height={20}
                  className="inline"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={!formData.privacy || isSubmitting}
              className="w-full h-45px py-3 px-6 block bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? '전송 중...' : '문의하기'}
            </button>

            {submitStatus === 'success' && (
              <div className="text-center text-green-600 font-medium">
                문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="text-center text-red-600 font-medium">
                문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
