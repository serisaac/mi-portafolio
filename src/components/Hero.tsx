"use client";

import { useEffect, useRef, useState } from "react";
import { personalInfo } from "../data/portfolio";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: "purple" | "cyan" | "pink";
  type: "circle" | "star" | "diamond";
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
    color: (["purple", "cyan", "pink"] as const)[Math.floor(Math.random() * 3)],
    type: (["circle", "star", "diamond"] as const)[Math.floor(Math.random() * 3)],
  }));
}

function GlitchText({ text }: { text: string }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1
      className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6"
      style={{ fontFamily: '"Space Grotesk", sans-serif' }}
    >
      <span className="text-white">Hola, soy </span>
      <span
        className={`relative block bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent ${
          glitch ? "animate-glitch" : ""
        }`}
        style={{
          textShadow: glitch
            ? "0.05em 0 0 rgba(255,0,0,0.75), -0.025em -0.05em 0 rgba(0,255,0,0.75), 0.025em 0.05em 0 rgba(0,0,255,0.75)"
            : "none",
        }}
      >
        {text}
        {glitch && (
          <>
            <span
              className="absolute top-0 left-0 bg-purple-600 opacity-50"
              style={{
                clipPath: "polygon(0 20%, 100% 20%, 100% 40%, 0 40%)",
                transform: "translateX(-2px)",
                animation: "glitch1 0.2s infinite",
              }}
            >
              {text}
            </span>
            <span
              className="absolute top-0 left-0 bg-cyan-600 opacity-50"
              style={{
                clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
                transform: "translateX(2px)",
                animation: "glitch2 0.2s infinite",
              }}
            >
              {text}
            </span>
          </>
        )}
      </span>
    </h1>
  );
}

function OrbitingImage() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let angle = 0;
    const animate = () => {
      angle += 0.5;
      setRotation(angle);
      requestAnimationFrame(animate);
    };
    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, transparent, rgba(124, 58, 237, 0.3), transparent, rgba(6, 182, 212, 0.3), transparent)",
          animation: "spin 4s linear infinite",
          filter: "blur(2px)",
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 180deg, transparent, rgba(236, 72, 153, 0.3), transparent, rgba(124, 58, 237, 0.3), transparent)",
          animation: "spin 6s linear infinite reverse",
          filter: "blur(4px)",
        }}
      />
      <div
        className="absolute inset-4 rounded-full overflow-hidden border-4 border-purple-500/50"
        style={{
          boxShadow: "0 0 60px -10px rgba(124, 58, 237, 0.8), inset 0 0 60px -10px rgba(124, 58, 237, 0.3)",
          transform: `perspective(500px) rotateY(${rotation * 0.1}deg) rotateX(${Math.sin(rotation * 0.02) * 10}deg)`,
        }}
      >
        <img
          src={personalInfo.photo}
          alt="Foto de Sergio Isaac"
          className="w-full h-full object-cover"
          style={{ filter: "saturate(1.2) contrast(1.1)" }}
        />
      </div>
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transform: `rotate(${deg + rotation}deg) translateX(140px) translateY(-50%)`,
            background: ["#7C3AED", "#06B6D4", "#EC4899"][i % 3],
            boxShadow: `0 0 20px ${["#7C3AED", "#06B6D4", "#EC4899"][i % 3]}`,
          }}
        />
      ))}
    </div>
  );
}

function RippleButton({ href, children, primary = true }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newRipple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="relative px-8 py-4 font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
      style={{
        backgroundColor: primary ? "#7C3AED" : "transparent",
        border: primary ? "none" : "2px solid rgba(124, 58, 237, 0.5)",
        boxShadow: primary ? "0 0 40px -5px rgba(124, 58, 237, 0.6)" : "none",
        color: primary ? "white" : "#a78bfa",
      }}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </a>
  );
}

export default function Hero() {
  const [particles] = useState<Particle[]>(() => generateParticles(40));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#0F0F1A" }}
      aria-label="Hero section"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
            linear-gradient(rgba(124, 58, 237, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 58, 237, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 60px 60px, 60px 60px",
        }}
      />

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `float${p.id % 3} ${p.duration}s ease-in-out infinite ${p.delay}s`,
          }}
        >
          {p.type === "circle" && (
            <div
              className="rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: `radial-gradient(circle, ${p.color === "purple" ? "rgba(124, 58, 237, 0.8)" : p.color === "cyan" ? "rgba(6, 182, 212, 0.8)" : "rgba(236, 72, 153, 0.8)"}, transparent)`,
                filter: "blur(2px)",
                boxShadow: `0 0 ${p.size * 4}px ${p.color === "purple" ? "rgba(124, 58, 237, 0.5)" : p.color === "cyan" ? "rgba(6, 182, 212, 0.5)" : "rgba(236, 72, 153, 0.5)"}`,
              }}
            />
          )}
          {p.type === "star" && (
            <svg width={p.size * 3} height={p.size * 3} viewBox="0 0 24 24" fill={p.color === "purple" ? "#7C3AED" : p.color === "cyan" ? "#06B6D4" : "#EC4899"}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )}
          {p.type === "diamond" && (
            <div
              style={{
                width: p.size,
                height: p.size,
                background: p.color === "purple" ? "#7C3AED" : p.color === "cyan" ? "#06B6D4" : "#EC4899",
                transform: "rotate(45deg)",
                filter: "blur(1px)",
              }}
            />
          )}
        </div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <p className="text-purple-400 font-medium mb-4 tracking-widest uppercase text-sm animate-pulse">
              {personalInfo.role}
            </p>

            <GlitchText text={personalInfo.firstName} />

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl animate-fade-in-up">
              {personalInfo.tagline}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <RippleButton href="#proyectos" primary>
                Ver Proyectos
              </RippleButton>
              <RippleButton href="#contact" primary={false}>
                Contactarme
              </RippleButton>
            </div>
          </div>

          <OrbitingImage />
        </div>
      </div>

      <a
        href="#sobre-mi"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-purple-400/60 hover:text-purple-400 transition-all duration-300 hover:scale-110"
        aria-label="Ir a sobre mí"
      >
        <div className="flex flex-col items-center gap-2" style={{ animation: "bounce 2s infinite" }}>
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </a>

      <style>{`
        @keyframes float0 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          25% { transform: translate(50px, -30px) scale(1.5); opacity: 0.8; }
          50% { transform: translate(100px, -60px) scale(2); opacity: 0.6; }
          75% { transform: translate(50px, -90px) scale(1.5); opacity: 0.4; }
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.4; }
          50% { transform: translate(-80px, -50px) rotate(180deg); opacity: 0.8; }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          33% { transform: translate(30px, -40px) scale(1.2); opacity: 0.9; }
          66% { transform: translate(-30px, -80px) scale(0.8); opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(15px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes glitch {
          0%, 100% { text-shadow: none; }
          20% { text-shadow: 0.05em 0 0 rgba(255,0,0,0.75), -0.025em -0.05em 0 rgba(0,255,0,0.75), 0.025em 0.05em 0 rgba(0,0,255,0.75); }
          40% { text-shadow: -0.05em 0 0 rgba(255,0,0,0.75), 0.025em 0.05em 0 rgba(0,255,0,0.75), -0.025em -0.05em 0 rgba(0,0,255,0.75); }
          60% { text-shadow: 0.025em 0 0 rgba(255,0,0,0.75), -0.025em -0.05em 0 rgba(0,255,0,0.75), 0.025em 0.05em 0 rgba(0,0,255,0.75); }
          80% { text-shadow: -0.025em 0 0 rgba(255,0,0,0.75), 0.025em -0.05em 0 rgba(0,255,0,0.75), -0.025em 0.05em 0 rgba(0,0,255,0.75); }
        }
        @keyframes glitch1 {
          0%, 100% { transform: translateX(-2px); }
          50% { transform: translateX(2px); }
        }
        @keyframes glitch2 {
          0%, 100% { transform: translateX(2px); }
          50% { transform: translateX(-2px); }
        }
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(20); opacity: 0; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.5s both;
        }
        .animate-ripple {
          animation: ripple 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}