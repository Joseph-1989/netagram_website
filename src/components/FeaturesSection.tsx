import Image from 'next/image';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Image
            src="/images/NETAGRAM이_만들어가는_세상_title.png"
            alt="NETAGRAM이 만들어가는 세상"
            width={600}
            height={100}
            className="mx-auto mb-4"
          />
          <Image
            src="/images/my_real_NETwork_Around_GRAM_moto.png"
            alt="my real NETwork Around GRAM"
            width={400}
            height={40}
            className="mx-auto"
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <Image
            src="/images/NETAGRAM이_만들어가는_세상_body_image.png"
            alt="NETAGRAM 기능 소개"
            width={800}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
