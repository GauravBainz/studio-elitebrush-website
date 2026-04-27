"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type NavLink = { label: string; href: string };

const HOME_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#services" },
  { label: "Painting", href: "/paintings" },
  { label: "Epoxy", href: "/epoxy" },
  { label: "Contact", href: "#contact" },
];

const SUBPAGE_LINKS: NavLink[] = [
  { label: "Painting", href: "/paintings" },
  { label: "Epoxy", href: "/epoxy" },
  { label: "Contact", href: "/#contact" },
  { label: "About", href: "/#about" },
];

interface NavigationProps {
  variant?: "home" | "subpage";
}

export default function Navigation({ variant = "home" }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const links = variant === "home" ? HOME_LINKS : SUBPAGE_LINKS;
  const useScrollHide = variant === "home";

  useEffect(() => {
    if (!useScrollHide) return;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, useScrollHide]);

  const wrapperClass = useScrollHide
    ? `fixed top-0 w-full z-20 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`
    : "fixed top-0 left-0 right-0 z-50 bg-transparent";

  return (
    <header className={wrapperClass}>
      <div className="container mx-auto px-10 py-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/images/elitebrushlogo.png"
                alt="Elite Brush Coatings Logo"
                width={80}
                height={22}
                className="object-contain"
              />
            </Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium uppercase tracking-[0.2em] text-white/90 hover:text-red-500 transition-colors duration-300"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className="md:hidden text-white p-2 bg-black/60 backdrop-blur-sm rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/70 backdrop-blur-md mx-10 mt-2 rounded-md border border-white/10">
          <ul className="flex flex-col space-y-5 px-6 py-5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-sm font-medium uppercase tracking-[0.2em] text-white/90 hover:text-red-500 transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
