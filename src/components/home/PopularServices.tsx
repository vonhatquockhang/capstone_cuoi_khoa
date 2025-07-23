"use client";

import { popularServices } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function PopularServices() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-12 text-center">
          Popular professional services
        </h2>

        {/* Scroll container */}
        <div className="relative">
          {/* Scroll buttons */}
          <button
            onClick={() => scroll(-300)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md hover:bg-gray-100 p-2 rounded-full z-10"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>
          <button
            onClick={() => scroll(300)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md hover:bg-gray-100 p-2 rounded-full z-10"
          >
            <FaChevronRight className="text-gray-600" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-6"
          >
            {popularServices.map((service) => (
              <Link
                href={`/cong-viec/${encodeURIComponent(service.title)}`}
                key={service.title}
                className="min-w-[200px] max-w-[200px] flex-shrink-0 group rounded-lg overflow-hidden bg-white shadow hover:shadow-xl transition duration-300"
              >
                <div className="relative w-full h-36">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 text-center font-medium text-gray-800 group-hover:text-green-600 transition">
                  {service.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
