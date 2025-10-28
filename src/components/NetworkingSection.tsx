import Image from 'next/image';

export default function NetworkingSection() {
  return (
    <section className="py-20 w-full h-auto align-middle">
      <div className="container mx-auto">
        <div className="justify-center max-w-797.872px mx-auto">
            <Image
              src="/images/use_netagram_body_image_1.png"
              alt="관계형 네트워크 앱 화면"
              width={797.872}
              height={304.255}
              className="mx-auto w-797.872px h-304.255px"
            />
        </div>
      </div>
    </section>
  );
}
