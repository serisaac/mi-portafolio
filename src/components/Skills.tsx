"use client";

import { useState, useEffect, useRef } from "react";
import { skills } from "../data/portfolio";

function getSkillIcon(name: string): string {
  const icons: Record<string, string> = {
    HTML: "🔶",
    CSS: "🎨",
    JavaScript: "📜",
    Astro: "🚀",
    TypeScript: "🔷",
    MariaDB: "🐬",
    Java: "☕",
    Python: "🐍",
    "Web Scraping": "🕸️",
    Frontend: "💻",
    Backend: "⚙️",
    "Prompt Engineering": "🤖",
  };
  return icons[name] || "💡";
}

function SkillCard({ name, delay }: { name: string; delay: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        className="px-6 py-4 rounded-2xl relative overflow-hidden group cursor-default"
        style={{
          backgroundColor: isHovered ? "rgba(124, 58, 237, 0.25)" : "rgba(15, 15, 26, 0.8)",
          border: `1px solid ${isHovered ? "rgba(124, 58, 237, 0.6)" : "rgba(124, 58, 237, 0.2)"}`,
          boxShadow: isHovered
            ? "0 0 40px -5px rgba(124, 58, 237, 0.6), inset 0 0 30px -10px rgba(124, 58, 237, 0.3)"
            : "none",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, rgba(124, 58, 237, 0.15), transparent, rgba(6, 182, 212, 0.1))",
          }}
        />

        <div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full transition-all duration-700"
          style={{
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.4), transparent)",
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "scale(1)" : "scale(0)",
          }}
        />

        <div className="relative z-10 flex items-center gap-3">
          <span
            className="text-2xl transition-all duration-500"
            style={{
              transform: isHovered ? "scale(1.3) rotate(10deg)" : "scale(1)",
              filter: isHovered ? "drop-shadow(0 0 10px rgba(124, 58, 237, 0.8))" : "none",
            }}
          >
            {getSkillIcon(name)}
          </span>
          <span
            className="text-base font-medium transition-all duration-300"
            style={{
              color: isHovered ? "#e9d5ff" : "#d1d5db",
              textShadow: isHovered ? "0 0 20px rgba(124, 58, 237, 0.5)" : "none",
            }}
          >
            {name}
          </span>
        </div>

        <div
          className="absolute bottom-0 left-0 h-1 transition-all duration-500"
          style={{
            width: isHovered ? "100%" : "0%",
            background: "linear-gradient(90deg, #7C3AED, #06B6D4)",
            boxShadow: "0 0 20px rgba(124, 58, 237, 0.5)",
          }}
        />
      </div>
    </div>
  );
}

function SkillOrb() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let frame: number;
    const animate = () => {
      setRotation((r) => r + 0.2);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative w-64 h-64 mx-auto mb-12">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, #7C3AED, #06B6D4, #EC4899, #7C3AED)",
          animation: "spin 8s linear infinite",
          filter: "blur(3px)",
        }}
      />
      <div
        className="absolute inset-2 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "#0F0F1A" }}
      >
        <span className="text-6xl animate-pulse">⚡</span>
      </div>
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transform: `rotate(${deg + rotation}deg) translateX(100px) translateY(-50%)`,
            background: ["#7C3AED", "#06B6D4", "#EC4899", "#F59E0B", "#10B981"][i],
            boxShadow: `0 0 25px ${["#7C3AED", "#06B6D4", "#EC4899", "#F59E0B", "#10B981"][i]}`,
          }}
        />
      ))}
    </div>
  );
}

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={ref}
      className="min-h-screen py-20 relative"
      style={{ backgroundColor: "#0F0F1A" }}
      aria-label="Habilidades"
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.5), transparent)" }} />

      <div className="container mx-auto px-4">
        <div
          className="transition-all duration-1000"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            <span className="text-purple-500">#</span> <span className="text-white">Skills</span>
          </h2>
        </div>

        <SkillOrb />

        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease-out 0.3s",
          }}
        >
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} name={skill.name} delay={index * 50} />
          ))}
        </div>

        <div
          className="mt-16 p-8 rounded-3xl text-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            background: "linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(6, 182, 212, 0.05))",
            border: "1px solid rgba(124, 58, 237, 0.2)",
            transitionDelay: "0.6s",
          }}
        >
          <p className="text-xl text-gray-300">
            Siempre en constante{" "}
            <span className="text-purple-400 font-bold animate-pulse">evolución</span>...
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}