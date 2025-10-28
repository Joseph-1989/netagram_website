'use client';

import Image from 'next/image';

export default function MapSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#00D9B8] text-center mb-12">찾아오는길</h2>
          
          <div className="mb-8">
            <div className="w-full rounded-lg border border-gray-200 overflow-hidden">
              <div className="desktop-map-container" style={{
                font: 'normal normal 400 12px/normal dotum, sans-serif',
                width: '100%',
                height: '475px',
                color: '#333',
                position: 'relative'
              }}>
                <div style={{ height: '443px' }}>
                  <a 
                    href="https://map.kakao.com/?urlX=520990.9999999993&urlY=1086029.0000000002&name=경기 성남시 수정구 달래내로 46&map_type=TYPE_MAP&from=roughmap"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img 
                      className="map w-full h-full object-cover"
                      src="http://t1.daumcdn.net/roughmap/imgmap/20f089a5e9d4eee1411f0aca71658d53215b2052205c638c3dfe616e6c791404"
                      alt="NETAGRAM 사무실 위치"
                      style={{ border: '1px solid #ccc' }}
                    />
                  </a>
                </div>
                <div style={{
                  overflow: 'hidden',
                  padding: '7px 11px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '0px 0px 2px 2px',
                  backgroundColor: 'rgb(249, 249, 249)'
                }}>
                  <a href="https://map.kakao.com" target="_blank" rel="noopener noreferrer" style={{ float: 'left' }}>
                    <img 
                      src="//t1.daumcdn.net/localimg/localimages/07/2018/pc/common/logo_kakaomap.png"
                      width="72" 
                      height="16" 
                      alt="카카오맵" 
                      style={{ display: 'block', width: '72px', height: '16px' }}
                    />
                  </a>
                  <div style={{ float: 'right', position: 'relative', top: '1px', fontSize: '11px' }}>
                    <a 
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://map.kakao.com/?from=roughmap&eName=경기 성남시 수정구 달래내로 46&eX=520990.9999999993&eY=1086029.0000000002"
                      style={{
                        float: 'left',
                        height: '15px',
                        paddingTop: '1px',
                        lineHeight: '15px',
                        color: '#000',
                        textDecoration: 'none'
                      }}
                    >
                      길찾기
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="flex items-center justify-left">
              <svg className="w-5 h-5 text-[#00D9B8] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
             <span className="text-gray-700"><b>주소: </b>경기 성남시 수정구 달래내로 46, 성남글로벌융합센터 A동 405호</span>
            </div>
            
            <div className="flex items-center justify-left">
              <svg className="w-5 h-5 text-[#00D9B8] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-gray-700"><b>전화: </b>070-4252-5571</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}