"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { personalInfo, typewriterTexts } from "../data/portfolio";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen bg-[#07070d] flex items-center relative overflow-hidden"
    >
      <HeroGridBg />
      <HeroGlows />
      <HeroParticles />
      
      <div className="max-w-[1280px] mx-auto px-8 pt-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          <HeroContent />
          <HeroPhoto />
        </div>
      </div>
      
      <ScrollIndicator />
    </section>
  );
}

function HeroGridBg() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }}
    />
  );
}

function HeroGlows() {
  return (
    <>
      <div
        className="absolute top-[30%] left-[20%] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "rgba(201,169,110,0.04)", filter: "blur(100px)" }}
      />
      <div
        className="absolute bottom-[25%] right-[20%] w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: "rgba(67,56,202,0.12)", filter: "blur(90px)" }}
      />
    </>
  );
}

function HeroParticles() {
  const [particles, setParticles] = useState<
    { id: number; left: string; top: string; size: number; duration: number; delay: number; dx: number }[]
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 55 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * -20,
      dx: Math.random() * 20 - 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#c9a96e]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            opacity: [0, 0.55, 0],
            y: [0, -50, -100],
            x: [0, p.dx, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function HeroContent() {
  const [glitching1, setGlitching1] = useState(false);
  const [glitching2, setGlitching2] = useState(false);
  const [typeIndex, setTypeIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitching1(true);
      setTimeout(() => setGlitching2(true), 80);
      setTimeout(() => {
        setGlitching1(false);
        setGlitching2(false);
      }, 200);
    }, 4200);
    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    const currentText = typewriterTexts[typeIndex];
    const timeout = setTimeout(() => {
      if (!deleting && charIndex <= currentText.length) {
        setCharIndex(charIndex + 1);
        if (charIndex === currentText.length) {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else if (deleting && charIndex >= 0) {
        setCharIndex(charIndex - 1);
        if (charIndex === 0) {
          setDeleting(false);
          setTypeIndex((typeIndex + 1) % typewriterTexts.length);
        }
      }
    }, deleting ? 28 : 62);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, typeIndex]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center gap-3 text-[0.68rem] tracking-[0.28em] uppercase text-[#c9a96e] mb-6"
      >
        <span>Disponible para proyectos</span>
        <span className="w-[7px] h-[7px] rounded-full bg-[#34d399] animate-pulse" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="font-display font-black text-[clamp(3.2rem,10vw,8rem)] leading-[1] text-white tracking-[-0.03em] mb-4"
      >
        <GlitchText text="Sergio" glitching={glitching1} />
        <br />
        <span className="text-[rgba(255,255,255,0.22)] italic">Isaac</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="text-[0.78rem] tracking-[0.25em] uppercase text-[rgba(255,255,255,0.35)] h-[1.4em] overflow-hidden mb-4"
      >
        {typewriterTexts[typeIndex].slice(0, charIndex)}
        <span className="text-[#c9a96e] animate-pulse">|</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="text-[rgba(255,255,255,0.42)] leading-[1.7] max-w-[400px] text-sm"
      >
        {personalInfo.tagline}.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="flex flex-wrap gap-4 mt-8"
      >
        <MagneticButton href="#projects">
          <span>Ver Proyectos</span>
        </MagneticButton>
        <motion.a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex items-center gap-2 text-[0.7rem] tracking-[0.25em] uppercase text-[rgba(255,255,255,0.3)] transition-colors duration-300 hover:text-[rgba(255,255,255,0.75)]"
          whileHover={{ x: 5 }}
        >
          Contáctame
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
      </motion.div>
    </div>
  );
}

function GlitchText({ text, glitching }: { text: string; glitching: boolean }) {
  return (
    <span className={`relative inline-block ${glitching ? "glitching" : ""}`}>
      <span>{text}</span>
      {glitching && (
        <>
          <span
            className="absolute inset-0 text-[#c9a96e] opacity-50"
            style={{
              clipPath: "inset(30% 0 40% 0)",
              transform: "translateX(-3px)",
            }}
          >
            {text}
          </span>
          <span
            className="absolute inset-0 text-[#22d3ee] opacity-50"
            style={{
              clipPath: "inset(60% 0 10% 0)",
              transform: "translateX(3px)",
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}

function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center gap-3 px-9 py-[0.9rem] border border-[#c9a96e] text-[#c9a96e] text-[0.7rem] tracking-[0.25em] uppercase overflow-hidden"
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span
        className="absolute inset-0 bg-[#c9a96e]"
        initial={{ y: "100%" }}
        whileHover={{ y: 0 }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      />
      <span className="relative z-10 transition-colors duration-300 hover:text-[#07070d]">
        {children}
      </span>
    </motion.a>
  );
}

function HeroPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="relative flex justify-end"
    >
      <div className="relative w-[320px] h-[440px] md:w-[280px] md:h-[380px] lg:w-[320px] lg:h-[440px]">
        <div className="hero-corner tl" />
        <div className="hero-corner br" />
        
        <motion.div
          className="absolute inset-0 bg-[#c9a96e] z-20"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: "top" }}
        />
        
        <img
          src="/ambiente.jpg"
          alt="Sergio Isaac"
          className="w-full h-full object-cover object-top transition-all duration-700"
          style={{ clipPath: "inset(0 0 8% 0)" }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.background = "linear-gradient(135deg, #0d0d18, #1a1a2e)";
            (e.target as HTMLImageElement).removeAttribute("src");
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,7,13,0.75)] to-transparent" />
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8 }}
          className="absolute right-[-20px] top-[33%] border border-[rgba(201,169,110,0.25)] bg-[rgba(13,13,24,0.85)] backdrop-blur-[12px] px-5 py-3 z-10"
          style={{ y }}
        >
          <span className="font-display font-black text-[1.1rem] text-[#c9a96e]">20+</span>
          <span className="block text-[0.6rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.3)]">
            Certificados
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
          className="absolute left-[-20px] bottom-[28%] border border-[rgba(201,169,110,0.25)] bg-[rgba(13,13,24,0.85)] backdrop-blur-[12px] px-5 py-3 z-10"
          style={{ y }}
        >
          <span className="font-display font-black text-[1.1rem] text-[#c9a96e]">2+</span>
          <span className="block text-[0.6rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.3)]">
            Proyectos
          </span>
        </motion.div>
      </div>

      <style>{`
        .hero-corner { position: absolute; width: 60px; height: 60px; z-index: 3; }
        .hero-corner.tl { top: -12px; left: -12px; border-top: 1px solid rgba(201,169,110,0.6); border-left: 1px solid rgba(201,169,110,0.6); }
        .hero-corner.br { bottom: -12px; right: -12px; border-bottom: 1px solid rgba(201,169,110,0.6); border-right: 1px solid rgba(201,169,110,0.6); }
      `}</style>
    </motion.div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2 }}
      className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[rgba(201,169,110,0.4)]"
      />
      <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[rgba(255,255,255,0.15)]" style={{ writingMode: "vertical-lr" }}>
        Scroll
      </span>
    </motion.div>
  );
}