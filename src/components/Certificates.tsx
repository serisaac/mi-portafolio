"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certificates } from "../data/portfolio";
import PdfModal from "./PdfModal";

const platforms = ["All", "Platzi", "Big School", "Daxus Latam"];

export default function Certificates() {
  const [filter, setFilter] = useState("All");
  const [viewPdf, setViewPdf] = useState<string | null>(null);
  const [viewTitle, setViewTitle] = useState("");

  const filtered =
    filter === "All"
      ? certificates
      : certificates.filter((c) => c.platform === filter);

  const openPdf = (cert: (typeof certificates)[0]) => {
    if (cert.pdf) {
      setViewPdf(cert.pdf);
      setViewTitle(cert.title);
    }
  };

  return (
    <section
      id="certificates"
      className="py-32 bg-[#0a0a12] relative overflow-hidden"
    >
      <SectionNumber number="04" position="top-8 left-8" />

      <div className="max-w-[1280px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-3"
        >
          <div className="w-8 h-[1px] bg-[#c9a96e]" />
          <span className="text-[0.7rem] tracking-[0.3em] uppercase text-[#c9a96e]">
            Certificados
          </span>
        </motion.div>

        <div className="flex flex-wrap items-end justify-between gap-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black text-[clamp(2.8rem,7vw,5.5rem)] text-white leading-[1] tracking-[-0.02em]"
          >
            Mis certificaciones
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[rgba(255,255,255,0.25)] text-sm max-w-[260px] leading-[1.7] text-right"
          >
            Haz clic en cualquier certificado para verlo.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`text-[0.65rem] tracking-[0.2em] uppercase px-4 py-1.5 border transition-all duration-300 ${
                filter === p
                  ? "border-[rgba(201,169,110,0.45)] text-[#c9a96e] bg-[rgba(201,169,110,0.07)]"
                  : "border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.3)]"
              }`}
            >
              {p}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {filtered.map((cert, i) => (
              <motion.div
                key={cert.title + cert.platform}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                onClick={() => openPdf(cert)}
                className="group border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)] p-4 transition-all duration-[0.35s] hover:border-[rgba(201,169,110,0.4)] cursor-pointer"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-[1.5rem] leading-[1]">{cert.emoji}</span>
                  <div className="min-w-0">
                    <span className="text-sm text-[rgba(255,255,255,0.7)] transition-colors duration-300 block group-hover:text-[#c9a96e] leading-snug">
                      {cert.title}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[0.58rem] tracking-[0.18em] uppercase text-[rgba(255,255,255,0.2)]">
                    {cert.platform}
                  </span>
                  <span className="text-[0.58rem] text-[rgba(201,169,110,0.5)] font-mono">
                    {cert.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mt-16"
        >
          <div className="w-16 h-[1px] bg-[rgba(255,255,255,0.08)]" />
          <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[rgba(255,255,255,0.18)]">
            Siempre aprendiendo
          </span>
          <div className="w-16 h-[1px] bg-[rgba(255,255,255,0.08)]" />
        </motion.div>
      </div>

      <PdfModal
        pdfUrl={viewPdf}
        title={viewTitle}
        onClose={() => setViewPdf(null)}
      />
    </section>
  );
}

function SectionNumber({ number, position }: { number: string; position: string }) {
  return (
    <div
      className={`absolute ${position} font-display font-black text-[min(14vw,160px)] text-[rgba(255,255,255,0.025)] leading-[1] pointer-events-none select-none`}
    >
      {number}
    </div>
  );
}
