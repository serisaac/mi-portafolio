"use client";

import { motion } from "framer-motion";
import { personalInfo } from "../data/portfolio";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#07070d] py-12 relative">
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.35)] to-transparent"
      />

      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-mono text-[#c9a96e] text-xs tracking-[0.2em] transition-all duration-300 hover:tracking-[0.35em]"
            whileHover={{ scale: 1.02 }}
          >
            &lt;Sergio/&gt;
          </motion.a>

          <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.12)]">
            © 2026 — Sergio Isaac Moreno Alvarez
          </span>

          <div className="flex items-center gap-6">
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.65rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.22)] transition-colors duration-300 hover:text-[#c9a96e]"
              whileHover={{ y: -2 }}
            >
              GitLab
            </motion.a>
            <div className="w-[1px] h-4 bg-[rgba(255,255,255,0.08)]" />
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="text-[0.65rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.22)] transition-colors duration-300 hover:text-[#c9a96e]"
              whileHover={{ y: -2 }}
            >
              Email
            </motion.a>
          </div>

          <motion.button
            onClick={scrollToTop}
            className="bg-transparent border border-[rgba(255,255,255,0.14)] rounded-full w-9 h-9 flex items-center justify-center text-[rgba(255,255,255,0.35)] text-sm"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Volver arriba"
          >
            ↑
          </motion.button>
        </div>
      </div>
    </footer>
  );
}