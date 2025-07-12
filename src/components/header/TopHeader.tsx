"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export default function TopHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all ${
          scrolled ? "bg-white/80 shadow backdrop-blur-md" : "bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex flex-shrink-0 items-center">
              <span className="text-primary text-xl font-bold">MyLogo</span>
            </div>
            {/* Desktop Nav */}
            <nav className="hidden items-center space-x-6 md:flex">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`font-medium transition ${
                      isActive
                        ? "border-primary text-primary border-b-2 pb-1"
                        : "hover:text-primary text-gray-700"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="mx-4 h-6 border-l border-gray-300" />
              <button className="border-primary text-primary rounded border px-4 py-1 font-medium transition hover:bg-blue-50">
                Login
              </button>
              <Button variant={"ghost"}>Start Selling</Button>
            </nav>
            {/* Mobile Hamburger */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700 focus:outline-none"
                aria-label="Open menu"
              >
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-gray-200" />
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="bg-white/95 px-4 py-4 shadow backdrop-blur-md md:hidden">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`font-medium transition ${
                      isActive
                        ? "text-primary rounded-md bg-blue-50 px-3 py-2"
                        : "hover:text-primary px-3 py-2 text-gray-700"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="my-2 border-t border-gray-200" />
              <button className="border-primary text-primary mb-2 w-full rounded border px-4 py-2 font-medium transition hover:bg-blue-50">
                Login
              </button>
              <Button>Start Selling</Button>
            </nav>
          </div>
        )}
      </header>
      {/* Spacer for fixed header */}
      <div className="h-20 md:h-20" />
    </>
  );
}
