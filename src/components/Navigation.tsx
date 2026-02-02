"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "DRAW" },
  { href: "/saved", label: "ARCHIVE" },
  { href: "/about", label: "ABOUT" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#f5f1e8]/95 backdrop-blur-sm border-b border-[#d4c8b0]" : ""
      }`}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <span 
                className="text-2xl font-bold text-[#2c2419] tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                DRIFT
              </span>
            </motion.div>
          </Link>

          {/* Nav items */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative px-4 py-2 font-mono text-xs tracking-[0.15em] transition-all duration-200
                    ${isActive ? "text-[#2c2419]" : "text-[#8a7a62] hover:text-[#2c2419]"}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#c75b39]"
                      transition={{ type: "spring", duration: 0.4 }}
                    />
                  )}
                  <span className="relative">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
