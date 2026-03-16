"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Prebuilt", href: "#prebuilt" },
  { name: "Customized", href: "#customized" },
];

const RIGHT_LINKS = [
  { name: "About Us", href: "#about-us" },
  { name: "Contact Us", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1000px]"
      >
        <div
          className={cn(
            "flex items-center justify-between px-6 md:px-12 py-3 rounded-full transition-all duration-500",
            isScrolled
              ? "bg-black backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10"
              : "bg-black/90 backdrop-blur-md border border-white/10 shadow-sm",
          )}
        >
          {/* Left Links */}
          <div className="hidden md:flex items-center gap-10 flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-white/80 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Logo Center */}
          <Link
            href="/"
            className="flex items-center justify-center group flex-shrink-0"
          >
            <Image
              src="/logo.svg"
              alt="Devndez Logo"
              width={180}
              height={40}
              quality={100}
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Right Links & Desktop CTA */}
          <div className="hidden md:flex items-center justify-end gap-10 flex-1">
            {RIGHT_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-white/80 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-28 z-40 p-6 bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {[...NAV_LINKS, ...RIGHT_LINKS].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-bold text-white/90 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
