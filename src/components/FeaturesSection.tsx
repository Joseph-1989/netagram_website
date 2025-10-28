import Image from 'next/image';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Image
            src="/images/The_World_Created_by_NETAGRAM_title.png"
            alt="The_World_Created_by_NETAGRAM"
            width={600}
            height={100}
            className="mx-auto mb-4"
          />
          <Image
            src="/images/my_real_NETwork_Around_GRAM_moto.png"
            alt="MyRealNETworkAroundGRAM_moto"
            width={400}
            height={40}
            className="mx-auto"
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <Image
            src="/images/The_World_Created_by_NETAGRAM_body_image.png"
            alt="The_World_Created_by_NETAGRAM"
            width={800}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
