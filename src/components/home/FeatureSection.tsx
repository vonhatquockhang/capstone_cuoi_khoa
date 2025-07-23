"use client";

import { FaThLarge, FaSyncAlt, FaBolt, FaSmile } from "react-icons/fa";

export default function FeatureSection() {
  const features = [
    {
      icon: <FaThLarge className="text-3xl mb-3" />,
      title: "Access a pool of top talent across 700 categories",
    },
    {
      icon: <FaSyncAlt className="text-3xl mb-3" />,
      title: "Enjoy a simple, easy-to-use matching experience",
    },
    {
      icon: <FaBolt className="text-3xl mb-3" />,
      title: "Get quality work done quickly and within budget",
    },
    {
      icon: <FaSmile className="text-3xl mb-3" />,
      title: "Only pay when you’re happy",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">
          Make it all happen with freelancers
        </h2>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10 text-gray-700">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="text-green-600">{feature.icon}</div>
              <p className="text-sm mt-2 max-w-[200px]">{feature.title}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <button className="bg-black text-white px-6 py-3 rounded font-semibold hover:bg-gray-800 transition">
          Join now
        </button>
      </div>
    </section>
  );
}
