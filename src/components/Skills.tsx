"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "../data/portfolio";

const categories = ["All", "Frontend", "Backend", "AI"];

export default function Skills() {
  const [view, setView] = useState<"grid" | "orbit">("grid");
  const [filter, setFilter] = useState("All");

  const filteredSkills =
    filter === "All" ? skills : skills.filter((s) => s.category === filter);

  return (
    <section
      id="skills"
      className="py-32 bg-[#07070d] relative overflow-hidden"
    >
      <SectionNumber number="03" position="top-8 right-8" />

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
            Habilidades
          </span>
        </motion.div>

        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black text-[clamp(2.8rem,7vw,5.5rem)] text-white leading-[1] tracking-[-0.02em]"
          >
            Mi arsenal
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex border border-[rgba(255,255,255,0.08)] overflow-hidden"
          >
            <button
              onClick={() => setView("grid")}
              className={`px-5 py-2 text-[0.68rem] tracking-[0.2em] uppercase transition-all duration-300 ${
                view === "grid"
                  ? "bg-[#c9a96e] text-[#07070d]"
                  : "text-[rgba(255,255,255,0.3)]"
              }`}
            >
              Lista
            </button>
            <button
              onClick={() => setView("orbit")}
              className={`px-5 py-2 text-[0.68rem] tracking-[0.2em] uppercase transition-all duration-300 ${
                view === "orbit"
                  ? "bg-[#c9a96e] text-[#07070d]"
                  : "text-[rgba(255,255,255,0.3)]"
              }`}
            >
              Órbita
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-[0.65rem] tracking-[0.2em] uppercase px-4 py-1.5 border transition-all duration-300 ${
                filter === cat
                  ? "border-[rgba(201,169,110,0.45)] text-[#c9a96e] bg-[rgba(201,169,110,0.07)]"
                  : "border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.3)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {view === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
            >
              {filteredSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-3 border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)] p-3.5 transition-all duration-[0.35s] hover:border-[rgba(201,169,110,0.4)]"
                >
                  <span className="text-[1.3rem]">{skill.icon}</span>
                  <div>
                    <span className="text-sm text-[rgba(255,255,255,0.7)] transition-colors duration-300 block hover:text-[#c9a96e]">
                      {skill.name}
                    </span>
                    <span className="text-[0.58rem] tracking-[0.18em] uppercase text-[rgba(255,255,255,0.2)]">
                      {skill.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="orbit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-[500px] flex items-center justify-center overflow-hidden"
            >
              <div className="absolute border border-[rgba(255,255,255,0.04)] rounded-full w-[260px] h-[260px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute border border-[rgba(201,169,110,0.08)] rounded-full w-[440px] h-[440px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute z-10 w-[72px] h-[72px] border border-[rgba(201,169,110,0.4)] flex items-center justify-center bg-[#07070d] font-mono text-[#c9a96e] text-xs tracking-wider">
                &lt;S/&gt;
              </div>

              <OrbitGroup skills={skills.slice(0, 5)} duration={22} radius={110} />
              <OrbitGroup skills={skills.slice(5)} duration={36} radius={195} ccw />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mt-16"
        >
          <div className="w-16 h-[1px] bg-[rgba(201,169,110,0.25)]" />
          <span className="text-[0.65rem] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.18)] italic">
            Siempre en constante evolución...
          </span>
        </motion.div>
      </div>
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

function OrbitGroup({
  skills,
  duration,
  radius,
  ccw = false,
}: {
  skills: (typeof import("../data/portfolio").skills)[0][];
  duration: number;
  radius: number;
  ccw?: boolean;
}) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        animation: `rotate${ccw ? "CCW" : "CW"} ${duration}s linear infinite`,
      }}
    >
      {skills.map((skill, i) => {
        const angle = (i / skills.length) * 360;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <div
            key={skill.name}
            className="absolute"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            <div
              className="flex flex-col items-center gap-1"
              style={{
                animation: `rotate${ccw ? "CCW" : "CW"} ${duration}s linear infinite`,
              }}
            >
              <div className="w-9 h-9 border border-[rgba(255,255,255,0.08)] bg-[#0d0d18] flex items-center justify-center text-base transition-colors duration-300 hover:border-[rgba(201,169,110,0.5)]">
                {skill.icon}
              </div>
              <span className="text-[0.55rem] tracking-[0.15em] uppercase text-[rgba(255,255,255,0.22)] whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes rotateCW { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        @keyframes rotateCCW { from { transform: rotate(0); } to { transform: rotate(-360deg); } }
      `}</style>
    </div>
  );
}