"use client";

import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-600">
          fiverr<span className="text-black">.</span>
        </Link>

        {/* Desktop Nav */}
      <nav className="hidden md:flex items-center space-x-4 text-sm font-medium text-gray-700">
  <Link
    href="/"
    className="hover:text-green-600 transition px-3 py-2"
  >
    Become a Seller
  </Link>
  <Link
    href="/login"
    className="hover:text-green-600 transition px-3 py-2"
  >
    Sign In
  </Link>
  <Link
    href="/register"
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
  >
    Join
  </Link>
</nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 text-sm font-medium text-gray-700 bg-white border-t">
          <Link href="/" className="block">
            Become a Seller
          </Link>
          <Link href="/login" className="block">
            Sign In
          </Link>
          <Link
            href="/register"
            className="block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-fit"
          >
            Join
          </Link>
        </div>
      )}
    </header>
  );
}
