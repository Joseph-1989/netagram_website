'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';

export default function FAQSection() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const language = useLanguage();

  const faqs = [
    {
      id: 1,
      question: language === 'ko' ? 'INTRE이란 무엇인가요?' : 'What is INTRE?',
      answer:
        language === 'ko'
          ? 'INTRE이란 진짜 인맥간의 리얼 소통을 위한 글로벌 관계형 SNS 플랫폼입니다.'
          : 'INTRE is a global relational SNS platform for real communication between real connections.',
    },
    {
      id: 2,
      question:
        language === 'ko'
          ? '피드 공유범위는 어떻게 선택하나요?'
          : 'How do I select the feed sharing range?',
      answer:
        language === 'ko'
          ? '피드 작성하기에서 ‘모두에게 공유’ 버튼을 클릭하면 ‘모두에게 공유, 원하는 인맥만 공유, 원하는 그룹만 공유’로 공유범위를 선택 하실 수 있습니다.'
          : 'When creating a feed, click the "Share with everyone" button to select your sharing range: "Share with everyone", "Share with selected connections only", or "Share with selected groups only".',
    },
    {
      id: 3,
      question:
        language === 'ko'
          ? '명함정보 수정은 어떻게 하나요?'
          : 'How do I edit my business card information?',
      answer:
        language === 'ko'
          ? '명함 화면에서 우측 상단 옵션에 "명함 편집"버튼 클릭시 정보를 수정하실 수 있습니다.'
          : 'You can edit your information by clicking the "Edit Business Card" button in the options at the top right of the business card screen.',
    },
    {
      id: 4,
      question:
        language === 'ko'
          ? '명함을 여러개 만들 수 있나요?'
          : 'Can I create multiple business cards?',
      answer:
        language === 'ko'
          ? '현재는 1계정당 1개만 생성하실 수 있으며, 향후 추가 생성 기능을 업그레이드할 예정입니다.'
          : 'Currently, you can create only one business card per account, and we plan to upgrade the additional creation function in the future.',
    },
    {
      id: 5,
      question:
        language === 'ko'
          ? '명함 전달은 어떻게 하나요?'
          : 'How do I deliver my business card?',
      answer:
        language === 'ko'
          ? '카카오톡, 라인, 문자로 전달하는 비대면 방식과 QR코드를 스캔해서 전달하는 대면방식이 있습니다.'
          : 'There are non-face-to-face methods such as KakaoTalk, LINE, and text messages, and face-to-face methods such as scanning a QR code.',
    },
    {
      id: 6,
      question:
        language === 'ko'
          ? 'FCM 메시지(앱 PUSH)가 안올때는 어떻게 하나요?'
          : "What should I do if I don't receive FCM messages (app PUSH)?",
      answer:
        language === 'ko'
          ? `1. INTRE 실행후, 우측상단의 "설정 → 알림"이 모두 ON인지 체크해주세요.
               만약 모두 ON으로 되어 있다면, 앱의 알림은 정상입니다.

               2. 휴대폰내 "설정→ 알림→ 앱 알림"으로 가셔서, 앱 리스트중에 'INTRE'을 찾으시고 알림ON 여부를 체크해주세요.
               만약 앱목록에 'INTRE'이 없다면, INTRE 앱을 지우고 다시한번 설치해 주십시오.

               3. 앱 설치후, 피드나 N톡에서 글을 올려보시고, 위의 1, 2번을 다시한번 체크해주시면 됩니다.`
          : `1. After launching INTRE, go to "Settings → Notifications" in the top right corner and check that all notifications are turned ON.
               If they are all ON, the app notifications are working normally.

               2. On your phone, go to "Settings → Notifications → App Notifications", find 'INTRE' in the app list, and check whether notifications are turned ON.
               If 'INTRE' is not in the app list, please delete the INTRE app and reinstall it.

               3. After reinstalling the app, try posting on a feed or N-Talk, and then check steps 1 and 2 again.`,
      image: '/images/FAQ/FCM_answer.png',
    },
    {
      id: 7,
      question:
        language === 'ko' ? '톡은 어떻게 사용하나요?' : 'How do I use IN-Talk?',
      answer:
        language === 'ko'
          ? `친구목록에서 원하는 사람의 ‘in-Talk’ 버튼을 클릭해주시면 해당 인맥과 채팅이 가능합니다.
             채팅창 상단의 ‘닫기’ 버튼 또는 채팅창을 아래로 끌어내리면 대화 내용이 남아 있게 되며,
             채팅창 상단의 ‘종료’ 버튼을 클릭하면 대화 내용이 삭제 됩니다.`
          : `You can chat with a connection by clicking their 'in-Talk' button in the friend list.
             If you click the 'Close' button at the top of the chat window or pull the chat window down, the conversation history will remain.
             If you click the 'End' button at the top of the chat window, the conversation history will be deleted.`,
      image: '/images/FAQ/IN_TALK_USING_METHOD.png',
    },
    {
      id: 8,
      question:
        language === 'ko'
          ? '소통형 그룹과 일방형 그룹의 차이는 무엇인가요?'
          : 'What is the difference between a communication group and a one-way group?',
      answer:
        language === 'ko'
          ? `소통형 그룹은 그룹장과 그룹원 모두 멤버추가가 가능하며, 그룹원 모두 그룹지정 피드작성이 가능해 가족, 친구 등 관계형 소통그룹으로 적합합니다.
             일방형 그룹은 그룹장만 멤버추가가 가능하며, 그룹장만 그룹지정 피드작성이 가능해 정보전달용 피드그룹으로 적합합니다.`
          : `Communication groups allow both the group leader and members to add new members, and all members can create group-specific feeds, making them suitable for relationship-based communication groups such as family and friends.
             One-way groups allow only the group leader to add new members and create group-specific feeds, making them suitable for information-delivery feed groups.`,
    },
    {
      id: 9,
      question:
        language === 'ko'
          ? '일정과 기념일 등록의 차이는 무엇인가요?'
          : 'What is the difference between a schedule and an anniversary?',
      answer:
        language === 'ko'
          ? `일정은 개인일정, 그룹일정, 인맥일정으로 원하는 사람에게 일정을 공유할 수 있으며 하루전과 당일에 총 2번의 알림이 옵니다. 
             기념일은 최대 10개까지 등록 가능하며 기념일 작성자는 3일전, 하루전, 당일에 총 3번의 알림이 가며, 공유대상자는 당일에 한번 알림이 오게됩니다.`
          : `Schedules can be shared with anyone as personal, group, or contact schedules, and you will receive two notifications in total: one the day before and one on the day of the event.
             Anniversaries can be registered up to a maximum of 10. The person who created the anniversary will receive three notifications in total: three days before, one day before, and on the day of the event, while the recipients will receive one notification on the day of the event.`,
    },
    {
      id: 10,
      question:
        language === 'ko'
          ? '원하는 그룹의 피드만 볼 수는 없나요?'
          : 'Can I only view feeds from specific groups?',
      answer:
        language === 'ko'
          ? `피드에서 이름 옆에 태그를 클릭하시면 해당 태그의 인맥 또는 그룹의 피드만 볼 수 있습니다.`
          : `You can view feeds from specific contacts or groups by clicking the tag next to the name in the feed.`,
      image: '/images/FAQ/DISPLAY_ONLY_SPECIFIC_FEED.png',
    },
    {
      id: 11,
      question:
        language === 'ko'
          ? '프로필 사진은 어떻게 바꾸나요?'
          : 'How do I change my profile picture?',
      answer:
        language === 'ko'
          ? `메뉴에서 ‘내프로필’로 이동해서 프로필 상단 우측의 편집 버튼을 눌러 ‘프로필 편집’으로 이동해주세요.
             카메라 아이콘 버튼을 클릭하면 프로필 이미지를 변경하실 수 있습니다.
             (프로필 사진과 명함 사진은 연동되어 있기때문에 한쪽을 변경하면 다른 한쪽도 자동으로 변경됩니다.)`
          : `Go to 'My Profile' from the menu, click the edit button in the top right corner of the profile, and then go to 'Edit Profile'.
             You can change your profile image by clicking the camera icon button.
             (Profile pictures and business card pictures are linked, so if you change one, the other will automatically change.)`,
      image: '/images/FAQ/PROFILE_IMAGE_UPDATE.png',
    },
    {
      id: 12,
      question:
        language === 'ko'
          ? '그룹에 친구를 추가하려면 어떻게 해야하나요?'
          : 'How do I add a friend to a group?',
      answer:
        language === 'ko'
          ? `해당 그룹 화면 하단에 멤버 추가 버튼이 있으며, INTRE를 이용하고 있는 사람은 ‘멤버 추가’버튼을 선택하고, 
             INTRE를 이용하지 않는 사람의 경우 ‘외부 멤버 추가’ 버튼을 선택해 그룹 멤버를 추가해주세요.`
          : `There is a member addition button at the bottom of the group screen. Select the 'Add Member' button if the person is using INTRE, 
             and select the 'Add External Member' button if the person is not using INTRE to add group members.`,
      image: '/images/FAQ/ADD_FRIEND_TO_GROUP.png',
    },
  ];

  return (
    <section id="faq" className="py-20 h-[100%] pt-40 bg-white mb-40">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#00D9B8] text-center mb-12">
            FAQ
          </h2>

          <div className="space-y-4">
            {faqs.map(faq => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() =>
                    setOpenItem(openItem === faq.id ? null : faq.id)
                  }
                >
                  <div className="flex items-center">
                    <Image
                      src="/images/Question_icon.png"
                      alt="Question"
                      width={20}
                      height={20}
                      className="mr-3"
                    />
                    <span className="font-medium text-gray-900">
                      {faq.question}
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openItem === faq.id ? 'rotate-180' : ''
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
                      <div className="flex-1">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </p>
                        {/* @ts-ignore */}
                        {faq.image && (
                          <div className="mt-4">
                            <Image
                              /* @ts-ignore */
                              src={faq.image}
                              alt="Answer illustration"
                              width={500}
                              height={300}
                              className="rounded-lg border border-gray-100 w-full h-auto"
                            />
                          </div>
                        )}
                      </div>
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
