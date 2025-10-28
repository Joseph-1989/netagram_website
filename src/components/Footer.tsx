import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer-gradient text-[#1a5a5a] py-12">
      <div className="container mx-auto px-4">
        {/* Top Section - Company Name and Navigation */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">(주)제제컴즈</h3>
          <nav className="flex gap-4 text-sm">
            <Link href="/docs/company/NETAGRAM_회사소개_251023.pdf" className="hover:text-[#00D9B8] transition-colors">
              회사소개
            </Link>
            <span className="text-gray-400">·</span>
            <Link href="/docs/terms/NETAGRAM_서비스이용약관_251023.pdf" className="hover:text-[#00D9B8] transition-colors">
              이용약관
            </Link>
            <span className="text-gray-400">·</span>
            <Link href="/docs/privacy/NETAGRAM_개인정보처리방침_251023.pdf" className="hover:text-[#00D9B8] transition-colors">
              개인정보처리방침
            </Link>
          </nav>
        </div>
        
        {/* Horizontal Line */}
        <div className="border-t border-gray-300 mb-6"></div>
        
        {/* Company Details Row */}
        <div className="text-sm mb-6">
          <p>대표자 : 김준강 <span className="text-gray-400 mx-3">·</span> 사업자등록번호: 641-88-00828 <span className="text-gray-400 mx-3">·</span> 통신판매업신고 : 제2021-성남수정-1335호 <span className="text-gray-400 mx-3">·</span> 주소 : 13449 경기 성남시 수정구 달래내로 46, 성남글로벌융합센터 A동 405호</p>
        </div>
        
        {/* Horizontal Line */}
        <div className="border-t border-gray-300 mb-6"></div>
        
        {/* Contact Information Row */}
        <div className="text-sm">
          <p>T. 070-4252-5571 <span className="text-gray-400 mx-3">·</span> E. jejecomms@gmail.com <span className="text-gray-400 mx-3">·</span> F. 0508-910-5575</p>
        </div>
      </div>
    </footer>
  );
}