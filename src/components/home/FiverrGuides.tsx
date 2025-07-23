// components/FiverrGuides.tsx
"use client";

import Image from "next/image";


const guides = [
  {
    title: "Start an online business and work from home",
    desc: "A complete guide to starting a small business online",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/8ca1dc6a682dc674aeb4fed1c178bb25-1736258028675/image%20497.png",
  },
  {
    title: "Digital marketing made easy",
    desc: "A practical guide to understand what is digital marketing",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/8ca1dc6a682dc674aeb4fed1c178bb25-1736258028673/image%20498.png",
  },
  {
    title: "Create a logo for your business",
    desc: "The perfect guide for creating a memorable business logo",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/8ca1dc6a682dc674aeb4fed1c178bb25-1736258028674/image%20499.png",
  },
];

export default function FiverrGuides() {
  return (
    <section className="py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Fiverr guides</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {guides.map((guide, index) => (
            <div key={index} className="group">
              <Image
                src={guide.image}
                alt={guide.title}
                width={400}
                height={260}
                className="rounded-md w-full object-cover"
              />
              <h3 className="mt-4 font-semibold text-lg group-hover:underline">
                {guide.title}
              </h3>
              <p className="text-gray-600">{guide.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}