import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="text-[#1a5a5a] py-12 mx-16 mb-10 rounded-[30px] bg-[#C3FFD9] max-[459px]:mx-4 max-[459px]:mb-6 max-[459px]:px-6 max-[459px]:py-8">
      {/* Desktop View */}
      <div className="w-full px-12 xl:px-16 hidden min-[460px]:block">
        {/* Top Section - Logo Only */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/netagram_header_logo.png"
              alt="NETAGRAM"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Horizontal Line */}
        <div className="border-t border-gray-300 mb-6"></div>

        {/* Company Details */}
        <div className="text-sm mb-12 space-y-2">
          <p>
            (주)제제컴즈 <span className="text-[#1a5a5a] mx-3">|</span> 대표자 :
            김준강 <span className="text-[#1a5a5a] mx-3">|</span> 사업자등록번호
            : 641-88-00828 <span className="text-[#1a5a5a] mx-3">|</span>{' '}
            통신판매업신고 : 제2021-성남수정-1335호
          </p>
          <p>
            13449 경기 성남시 수정구 달래내로 46, 성남글로벌융합센터 A동 405호
          </p>
          <p>
            T. 070-4252-5571 <span className="text-[#1a5a5a] mx-3">|</span> E.
            jejecomms@gmail.com <span className="text-[#1a5a5a] mx-3">|</span>{' '}
            F. 0508-910-5575
          </p>
        </div>

        {/* Bottom Section - Copyright and Navigation */}
        <div className="flex justify-between items-center text-sm">
          <div className="text-[#1a5a5a]">
            COPYRIGHT© 2026 JEJECOMMs. ALL RIGHTS RESERVED.
          </div>
          <nav className="flex gap-4">
            <Link
              href="http://www.jejecomms.com"
              target="_blank"
              className="hover:text-[#00D9B8] transition-colors"
            >
              회사소개
            </Link>
            <Link
              href="/docs/terms/NETAGRAM_서비스이용약관_251023.pdf"
              className="hover:text-[#00D9B8] transition-colors"
            >
              이용약관
            </Link>
            <Link
              href="/docs/privacy/NETAGRAM_개인정보처리방침_251023.pdf"
              className="hover:text-[#00D9B8] transition-colors"
            >
              개인정보처리방침
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block min-[460px]:hidden text-sm">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/netagram_header_logo.png"
            alt="NETAGRAM"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </div>

        {/* Company Info */}
        <div className="space-y-1 mb-6">
          <p>(주)제제컴즈</p>
          <p>대표자 : 김준강</p>
          <p>사업자등록번호 : 641-88-00828</p>
          <p>통신판매업신고 : 제2021-성남수정-1335호</p>
          <p className="leading-relaxed mt-2">
            13449 경기 성남시 수정구 달래내로 46, 성남글로벌융합센터 A동 405호
          </p>
        </div>

        {/* Contact */}
        <div className="space-y-1 mb-8">
          <p>T. 070-4252-5571</p>
          <p>E. jejecomms@gmail.com</p>
          <p>F. 0508-910-5575</p>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1a5a5a]/20 mb-6"></div>

        {/* Links */}
        <div className="flex gap-6 mb-8 font-bold">
          <Link href="http://www.jejecomms.com" target="_blank">
            회사소개
          </Link>
          <Link href="/docs/terms/NETAGRAM_서비스이용약관_251023.pdf">
            이용약관
          </Link>
          <Link href="/docs/privacy/NETAGRAM_개인정보처리방침_251023.pdf">
            개인정보처리방침
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-[10px] text-[#1a5a5a]/80">
          COPYRIGHT© 2025 JEJECOMMs. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
