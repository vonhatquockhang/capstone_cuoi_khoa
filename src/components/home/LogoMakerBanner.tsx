// components/LogoMakerBanner.tsx
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LogoMakerBanner() {
  return (
    <section className="bg-[#fff8f4] py-16 px-6 md:px-20 rounded-lg">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Text content */}
        <div>
          <Image
            src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/30344ab7bdf7d02b744c153ed0a11b99-1736241093994/Screenshot%202025-01-07%20at%2010.45.35.png"
            alt="Logo Maker"
            width={160}
            height={32}
          />
          <h2 className="text-3xl font-semibold mt-6 mb-4">
            Create an incredible logo{" "}
            <span className="text-orange-500">in seconds</span>
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Pre designed by top talent. Just add your touch
          </p>
          <Button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800">
            Try Fiverr Logo Maker
          </Button>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/02dabd594e8b658ebe75159fa644a849-1736239165734/Logo%20maker%20image.png"
            alt="Logo Maker Preview"
            width={500}
            height={320}
            className="rounded-md"
          />
        </div>
      </div>
    </section>
  );
}
