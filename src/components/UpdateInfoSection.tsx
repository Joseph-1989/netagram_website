'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import Link from 'next/link';

interface UpdateItem {
  id: number;
  title: string;
  date: string;
  content?: string;
  highlight?: boolean;
}

function getUpdateData(language: string): UpdateItem[] {
  return [
    {
      id: 1,
      title: language === 'ko' ? 'INTRE 업데이트' : 'INTRE Update',
      date: '26. 02. 25',
      content: language === 'ko'
        ? `"당신의 소셜 라이프를 다시 정의합니다. Beyond Gram, Into the Real."

구독자수에, 팔로우수에 집착하는 보여주기식 SNS를 쫓아오셨나요?
기록이 짐이 되고, 관계가 부담이 되는 시대. 인트레(intre)는 당신의 일상을 가볍고 안전하게, 그리고 무엇보다 '진짜'답게 되찾아 드립니다.

🛡️ Intre만의 4가지 핵심 차별점
1. [인맥의 재정립] 숫자가 아닌, '진짜 마음'이 닿는 연결
수천 명의 팔로워, 의미 없는 연락처 목록에 피로하셨나요?
인트레(Intre)는 내 연락처 중 내가 직접 디지털 명함을 전달하고, 상대방이 수락한 '진짜 인맥'과만 연결됩니다. 오직 서로가 원하는 사람들끼리만 모인 견고하고 깊이 있는 인맥풀과 그 안에서 이루어지는 의미있는소통을 경험하세요.

2. [30일 피드 자동 삭제] 남지 않기에 더 솔직할 수 있는 기록
평생 남을까 봐 망설였던 기록들, 이제 마음껏 표현하세요.
인트레(intre)의 모든 피드는 30일 주기로 자동 삭제됩니다. 과거의 나에 얽매이지 않고, 지금 이 순간의 '나'를 가장 솔직하게 기록하고 공유할 수 있는 휘발성 소통의 즐거움을 드립니다.

3. [즉시 삭제 N-Talk] 흔적 없이 사라지는 1:1 대화
대화가 끝난 뒤 서버에 남는 기록이 걱정되시나요?
인트레(intre)의 N-Talk은 대화 종료와 동시에 기록이 즉시 삭제됩니다. 캡처나 유출 걱정 없이, 오직 대화의 본질에만 집중할 수 있는 가장 안전한 메신저 환경을 제공합니다.

4. [Grouping 기반 소통] 우리만의 목적 있는 공간 생성
취미/관심사, 관계형 그룹 생성과 초대를 통해, 형성된 그룹원들과 소통하세요.   가족만이 공유할 내용, 친구, 회사등의 그룹을 만들어서, 각 그룹에 맞는 성향으로 소통하세요.

4. [강력한 보안 시스템] 오직 당신만을 위한 철통 방어
소중한 일상이 외부에 노출되지 않도록 최첨단 보안 기술을 적용했습니다.
허가되지 않은 접근을 차단하고 개인정보를 철저히 보호하여, 가장 프라이빗하고 안심할 수 있는 디지털 안식처를 보장합니다.

💡 인트레(Intre)는 이런 분들께 제안합니다
"연락처에 사람은 많지만, 정작 소통할 사람은 없다고 느껴지시는 분"
"옛날 게시물이 박제되는 게 싫어 SNS 활동이 꺼리시는 분"
"누군가 내 대화 기록을 볼까 봐 늘 불안한 분"
"보여주기 식이 아닌, 진짜 내 사람들과만 소통하고 싶은 분"

[브랜드 키워드]
#Intre #인트레 #인맥재정립 #휘발성SNS #프라이빗메신저 #보안특화 #NTalk #30일피드 #디지털명함 #진짜소통`
        : `"Redefining your social life. Beyond Gram, Into the Real."

Are you tired of chasing vanity-driven social media obsessed with subscriber counts and follower numbers?
In an era where records become burdens and relationships become obligations, Intre helps you reclaim your daily life — lightly, safely, and most importantly, authentically.

🛡️ 4 Key Differentiators Unique to Intre
1. [Redefining Connections] Connections Rooted in Real Heart, Not Numbers
Tired of thousands of followers and meaningless contact lists?
Intre connects you only with "real connections" — people you've personally sent your digital business card to and who have accepted it. Experience meaningful communication within a solid, deep network of people who truly want to connect with each other.

2. [Automatic 30-Day Feed Deletion] Records You Can Be More Honest About Because They Don't Last
Express yourself freely without worrying about records lasting forever.
All feeds on Intre are automatically deleted on a 30-day cycle. Enjoy the pleasure of ephemeral communication where you can honestly record and share the "you" of this moment, without being tied to your past.

3. [Instant-Delete N-Talk] 1:1 Conversations That Vanish Without a Trace
Worried about conversation records remaining on servers after your chat ends?
Intre's N-Talk instantly deletes all records the moment a conversation ends. It provides the safest messaging environment where you can focus purely on the essence of conversation, without worrying about screenshots or leaks.

4. [Group-Based Communication] Creating Purpose-Driven Spaces
Communicate with group members formed through hobby/interest and relational group creation and invitations. Create groups for family-only content, friends, work, and more — and communicate in a style that fits each group.

5. [Robust Security System] Ironclad Protection Just for You
We've applied cutting-edge security technology to ensure your precious daily life isn't exposed to the outside world.
We block unauthorized access and thoroughly protect personal information, guaranteeing the most private and secure digital sanctuary.

💡 Intre is for people who:
"Have many contacts but feel like there's no one to actually communicate with"
"Avoid social media because they hate old posts being permanently archived"
"Are always anxious that someone might see their conversation history"
"Want to communicate only with their real people, not for show"

[Brand Keywords]
#Intre #RedefiningConnections #EphemeralSNS #PrivateMessenger #SecurityFirst #NTalk #30DayFeed #DigitalBusinessCard #RealCommunication`,
    },
  ];
}

export default function UpdateInfoSection() {
  const language = useLanguage();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const updateData = getUpdateData(language);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const activePage = 1;
  const totalPages = 10;

  return (
    <section
      id="features"
      className="mx-auto w-full px-4 py-40 max-w-7xl max-[459px]:py-20 max-[459px]:px-2"
    >
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-teal-400 bg-clip-text text-transparent inline-block pb-2 border-b-2 border-teal-500">
          {language === 'ko' ? '업데이트 정보' : 'Update Info'}
        </h2>
      </div>

      <div className="w-full bg-white">
        <div className="overflow-x-auto min-h-[600px] max-[459px]:overflow-x-hidden max-[459px]:min-h-[500px]">
          <table className="w-full min-w-[768px] max-[459px]:min-w-0 max-[459px]:table-fixed">
            <thead>
              <tr className="border-t-2 border-gray-800 border-b border-gray-300">
                <th className="py-4 text-center font-bold text-gray-800 w-24 max-[459px]:w-10 max-[459px]:py-3 max-[459px]:text-sm">
                  No.
                </th>
                <th className="py-4 text-center font-bold text-gray-800 max-[459px]:py-3 max-[459px]:text-sm max-[459px]:text-left">
                  Title
                </th>
                <th className="py-4 text-center font-bold text-gray-800 w-32 max-[459px]:w-[72px] max-[459px]:py-3 max-[459px]:text-sm">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {updateData.map(item => (
                <React.Fragment key={item.id}>
                  <tr
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => toggleExpand(item.id)}
                  >
                    <td className="py-4 text-center text-gray-600 max-[459px]:py-3 max-[459px]:text-sm">
                      {item.id}
                    </td>
                    <td
                      className={`py-4 px-4 max-[459px]:py-3 max-[459px]:px-2 max-[459px]:text-sm max-[459px]:overflow-hidden max-[459px]:text-ellipsis max-[459px]:whitespace-nowrap max-[459px]:max-w-0 ${item.highlight ? 'text-cyan-500 font-medium' : 'text-gray-700'}`}
                    >
                      <span className="hover:underline text-left">
                        {item.title}
                      </span>
                    </td>
                    <td className="py-4 text-center text-gray-500 max-[459px]:py-3 max-[459px]:text-xs max-[459px]:whitespace-nowrap">
                      {item.date}
                    </td>
                  </tr>
                  {expandedId === item.id && item.content && (
                    <tr className="bg-gray-50/50">
                      <td
                        colSpan={3}
                        className="py-8 px-8 max-[459px]:px-4 max-[459px]:py-6 text-gray-700 whitespace-pre-line text-sm leading-relaxed border-b border-gray-200"
                      >
                        {item.content}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-12 gap-2 text-gray-400 text-sm max-[459px]:mt-8 max-[459px]:gap-1">
          <button className="flex items-center justify-center w-8 h-8 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
              />
            </svg>
          </button>
          <button className="flex items-center justify-center w-8 h-8 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <div className="flex gap-2 mx-2 max-[459px]:gap-1 max-[459px]:mx-1">
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  className={`w-6 h-6 flex items-center justify-center max-[459px]:text-xs ${
                    activePage === page
                      ? 'text-teal-500 font-bold'
                      : 'hover:text-gray-600'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button className="flex items-center justify-center w-8 h-8 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
          <button className="flex items-center justify-center w-8 h-8 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
