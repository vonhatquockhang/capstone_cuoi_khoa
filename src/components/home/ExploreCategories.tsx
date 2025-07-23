"use client";

import { exploreCategories } from "@/lib/data";
import {
  FaCode,
  FaPencilAlt,
  FaMicrophone,
  FaPaintBrush,
  FaChartLine,
  FaCamera,
  FaMusic,
  FaBusinessTime,
  FaHeartbeat,
  FaDatabase,
} from "react-icons/fa";

const icons = [
  FaPaintBrush,
  FaChartLine,
  FaPencilAlt,
  FaMicrophone,
  FaCamera,
  FaCode,
  FaMusic,
  FaBusinessTime,
  FaHeartbeat,
  FaDatabase,
];

export default function ExploreCategories() {
  return (
    <section className="py-16 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-12">Explore the marketplace</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {exploreCategories.map((cat, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={cat}
                className="group flex flex-col items-center p-4 hover:bg-white shadow-sm hover:shadow-md rounded transition"
              >
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl group-hover:bg-green-600 group-hover:text-white transition">
                  <Icon />
                </div>
                <span className="text-sm font-medium text-gray-700 mt-3 group-hover:text-green-700 transition">
                  {cat}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
