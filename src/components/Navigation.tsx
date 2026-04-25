"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems, personalInfo } from "../data/portfolio";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(7,7,13,0.88)] backdrop-blur-[20px] border-b border-[rgba(201,169,110,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#hero");
            }}
            className="font-mono text-[#c9a96e] text-xs tracking-[0.2em] transition-all duration-300 hover:tracking-[0.35em]"
          >
            &lt;SERGIO/&gt;
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href);
                  }}
                  className={`text-[0.7rem] tracking-[0.18em] uppercase transition-all duration-300 relative ${
                    isActive ? "text-[#c9a96e]" : "text-[rgba(255,255,255,0.35)]"
                  }`}
                  style={{ position: "relative" }}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <motion.span
                    className="absolute bottom-[-4px] left-0 h-[1px] bg-[#c9a96e]"
                    initial={{ width: isActive ? "100%" : "0" }}
                    animate={{ width: isActive ? "100%" : "0" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              );
            })}
          </div>

          <motion.a
            href={`mailto:${personalInfo.email}`}
            className="hidden md:flex text-[0.7rem] tracking-[0.2em] uppercase border border-[rgba(201,169,110,0.35)] text-[#c9a96e] px-5 py-2 transition-all duration-300 hover:bg-[rgba(201,169,110,0.15)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Contáctame
          </motion.a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] cursor-pointer p-2"
            aria-label="Menú"
          >
            <motion.span
              animate={{
                rotate: menuOpen ? 45 : 0,
                y: menuOpen ? 6 : 0,
              }}
              className="w-6 h-[1px] bg-[#c9a96e] block"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="w-6 h-[1px] bg-[#c9a96e] block"
            />
            <motion.span
              animate={{
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? -6 : 0,
              }}
              className="w-6 h-[1px] bg-[#c9a96e] block"
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#07070d] z-[850] flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.href);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.07 }}
                className="text-[1.8rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.45)] transition-colors duration-300 hover:text-[#c9a96e]"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}