"use client";

import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaGlobe,
} from "react-icons/fa";

const footerLinks = [
  {
    title: "Categories",
    items: [
      "Graphics & Design",
      "Digital Marketing",
      "Writing & Translation",
      "Video & Animation",
      "Music & Audio",
      "Programming & Tech",
      "Data",
      "Business",
      "Lifestyle",
      "Sitemap",
    ],
  },
  {
    title: "About",
    items: [
      "Careers",
      "Press & News",
      "Partnerships",
      "Privacy Policy",
      "Terms of Service",
      "Intellectual Property Claims",
      "Investor Relations",
    ],
  },
  {
    title: "Support",
    items: [
      "Help & Support",
      "Trust & Safety",
      "Selling on Fiverr",
      "Buying on Fiverr",
    ],
  },
  {
    title: "Community",
    items: [
      "Events",
      "Blog",
      "Forum",
      "Community Standards",
      "Podcast",
      "Affiliates",
      "Invite a Friend",
      "Become a Seller",
      "Fiverr Elevate",
    ],
  },
  {
    title: "More From Fiverr",
    items: [
      "Fiverr Business",
      "Fiverr Pro",
      "Fiverr Studios",
      "Fiverr Logo Maker",
      "Fiverr Guides",
      "Get Inspired",
      "ClearVoice",
      "AND CO",
      "Learn",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16 text-sm text-gray-600">
      <div className="max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {footerLinks.map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold text-gray-800 mb-3">{col.title}</h4>
            <ul className="space-y-1">
              {col.items.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t py-6 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-bold text-gray-800 text-lg text-center">
          fiverr.{" "}
          <span className="text-sm text-gray-500 font-normal">
            © Fiverr International Ltd. {new Date().getFullYear()}
          </span>
        </span>

        <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 text-gray-600 text-lg">
          <FaTwitter className="hover:text-black cursor-pointer" />
          <FaFacebookF className="hover:text-black cursor-pointer" />
          <FaLinkedinIn className="hover:text-black cursor-pointer" />
          <FaPinterestP className="hover:text-black cursor-pointer" />
          <FaGlobe className="hover:text-black cursor-pointer" />
          <span className="text-sm">English</span>
          <span className="text-sm">$USD</span>
          <span className="text-2xl">⚙️</span>
        </div>
      </div>
    </footer>
  );
}
