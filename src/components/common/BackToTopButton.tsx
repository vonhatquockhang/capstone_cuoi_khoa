// components/common/BackToTopButton.tsx
"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-green-600 text-white shadow-md hover:bg-green-700 transition-opacity ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <FaArrowUp />
    </button>
  );
}
