"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { personalInfo, stats } from "../data/portfolio";

export default function About() {
  return (
    <section
      id="about"
      className="py-32 lg:py-48 bg-[#07070d] relative overflow-hidden"
    >
      <SectionNumber number="01" position="top-8 right-8" />

      <div className="max-w-[1280px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-3"
        >
          <div className="w-8 h-[1px] bg-[#c9a96e]" />
          <span className="text-[0.7rem] tracking-[0.3em] uppercase text-[#c9a96e]">
            Sobre Mí
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-black text-[clamp(2.8rem,7vw,5.5rem)] text-white leading-[1] tracking-[-0.02em] mb-12"
        >
          Quién soy
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AboutPhoto />
          <AboutText />
        </div>
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

function AboutPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="relative flex justify-center"
    >
      <div className="blob-bg absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-80 h-80 bg-[rgba(201,169,110,0.06)] rounded-[60% 40% 30% 70%/60% 30% 70% 40%]"
          animate={{
            borderRadius: [
              "60% 40% 30% 70%/60% 30% 70% 40%",
              "30% 60% 70% 40%/50% 60% 30% 60%",
              "60% 40% 30% 70%/60% 30% 70% 40%",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div
        className="relative z-10 w-[320px] h-[440px] md:w-[280px] md:h-[380px] lg:w-[320px] lg:h-[440px]"
        style={{ y }}
      >
        <div className="about-corner tl" />
        <div className="about-corner br" />

        <img
          src="/nubes.jpg"
          alt="Ambiente"
          className="w-full h-full object-cover transition-all duration-700"
          style={{ clipPath: "inset(0 0 6% 0)" }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.background = "linear-gradient(135deg, #0d0d18, #1a1a2e)";
            (e.target as HTMLImageElement).removeAttribute("src");
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,7,13,0.6)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent" />
      </div>

      <style>{`
        .about-corner { position: absolute; width: 48px; height: 48px; }
        .about-corner.tl { top: -10px; left: -10px; border-top: 2px solid rgba(201,169,110,0.5); border-left: 2px solid rgba(201,169,110,0.5); }
        .about-corner.br { bottom: -10px; right: -10px; border-bottom: 2px solid rgba(201,169,110,0.5); border-right: 2px solid rgba(201,169,110,0.5); }
      `}</style>
    </motion.div>
  );
}

function AboutText() {
  return (
    <div className="flex flex-col gap-8">
      <motion.blockquote
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="border-l-[2px] border-[rgba(201,169,110,0.4)] pl-6 text-[rgba(255,255,255,0.65)] leading-[1.8] text-base"
      >
        Soy {personalInfo.name}, un estudiante apasionado por la tecnología y el desarrollo web. Me encanta transformar ideas en experiencias digitales únicas que combinen funcionalidad con diseño innovador.
      </motion.blockquote>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-[rgba(255,255,255,0.35)] leading-[1.8]"
      >
        Como estudiante de Desarrollo Web, estoy siempre aprendiendo nuevas tecnologías y buscando formas de crear proyectos que marquen la diferencia. Cuando no estoy programando, exploro nuevas tendencias en tecnología.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="grid grid-cols-3 gap-3"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            className="border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)] p-5 transition-all duration-400 hover:border-[rgba(201,169,110,0.3)]"
            whileHover={{ y: -4 }}
          >
            <span className="font-display font-black text-[2.2rem] text-[#c9a96e] block leading-[1]">
              {stat.number}
            </span>
            <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.25)] block mt-1">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex gap-8"
      >
        <motion.a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[0.7rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.3)] transition-colors duration-300 hover:text-[#c9a96e] group"
          whileHover={{ x: 5 }}
        >
          GitLab
          <span className="w-4 h-[1px] bg-current transition-all duration-300 group-hover:w-6" />
        </motion.a>
        <motion.a
          href={`mailto:${personalInfo.email}`}
          className="flex items-center gap-2 text-[0.7rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.3)] transition-colors duration-300 hover:text-[#c9a96e] group"
          whileHover={{ x: 5 }}
        >
          Email
          <span className="w-4 h-[1px] bg-current transition-all duration-300 group-hover:w-6" />
        </motion.a>
      </motion.div>
    </div>
  );
}