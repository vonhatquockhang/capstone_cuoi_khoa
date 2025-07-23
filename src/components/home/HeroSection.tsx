"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSection() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (searchText.trim()) {
      router.push(
        `/cong-viec?keyword=${encodeURIComponent(searchText.trim())}`
      );
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-green-50 via-white to-white py-20 px-6 md:px-20 overflow-hidden">
      {/* Background circle blur effect */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50 z-0"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-40 z-0"></div>

      <div className="relative z-10 max-w-screen-xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6 animate-fade-in">
          Find the perfect{" "}
          <span className="italic text-green-600">freelance</span>
          <br className="hidden sm:block" />
          services for your business
        </h1>

        {/* Search box */}
        <div className="flex justify-center items-center max-w-xl mx-auto shadow-md rounded-lg overflow-hidden animate-slide-in-up">
          <input
            type="text"
            placeholder="e.g. building mobile app"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 px-5 py-3 text-base outline-none bg-white"
          />
          <Button
            onClick={handleSearch}
            className="bg-green-600 hover:bg-green-700 rounded-none px-6 text-base h-full"
          >
            Search
          </Button>
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center text-sm text-gray-700 animate-fade-in-slow">
          {["Website Design", "WordPress", "Logo Design", "Dropshipping"].map(
            (tag) => (
              <button
                key={tag}
                onClick={() =>
                  router.push(`/cong-viec?keyword=${encodeURIComponent(tag)}`)
                }
                className="px-4 py-1.5 border border-gray-300 rounded-full bg-white hover:bg-gray-100 transition"
              >
                {tag}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}
  