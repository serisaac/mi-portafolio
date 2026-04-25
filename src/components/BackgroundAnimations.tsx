"use client";

import { useState, useEffect, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  type: "circle" | "star" | "diamond" | "ring";
}

function generateParticles(count: number): Particle[] {
  const colors = ["#7C3AED", "#06B6D4", "#EC4899", "#F59E0B", "#10B981", "#8B5CF6", "#22D3EE", "#F472B6"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 2,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 8,
    color: colors[Math.floor(Math.random() * colors.length)],
    type: (["circle", "star", "diamond", "ring"] as const)[Math.floor(Math.random() * 4)],
  }));
}

function StarParticle({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size * 4} height={size * 4} viewBox="0 0 24 24" fill={color} className="animate-pulse">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function RingParticle({ size, color }: { size: number; color: string }) {
  return (
    <div
      className="rounded-full border-2 animate-spin"
      style={{
        width: size * 6,
        height: size * 6,
        borderColor: color,
        borderTopColor: "transparent",
        borderRightColor: "transparent",
      }}
    />
  );
}

function BackgroundParticles() {
  const [particles] = useState<Particle[]>(() => generateParticles(60));
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: `translateY(${scrollY * (0.1 + (p.id % 5) * 0.05)}px)`,
            animation: `particleFloat${p.id % 4} ${p.duration}s ease-in-out infinite ${p.delay}s`,
          }}
        >
          {p.type === "circle" && (
            <div
              className="rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: `radial-gradient(circle, ${p.color}, transparent)`,
                filter: "blur(2px)",
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              }}
            />
          )}
          {p.type === "star" && <StarParticle size={p.size} color={p.color} />}
          {p.type === "diamond" && (
            <div
              className="rounded-sm"
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
                transform: "rotate(45deg)",
                filter: "blur(1px)",
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              }}
            />
          )}
          {p.type === "ring" && <RingParticle size={p.size} color={p.color} />}
        </div>
      ))}

      <div
        className="absolute w-[800px] h-[800px] rounded-full transition-all duration-1000 ease-out"
        style={{
          top: `${mousePos.y - 40}%`,
          left: `${mousePos.x - 40}%`,
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.15), transparent 70%)",
          filter: "blur(100px)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full transition-all duration-1500 ease-out"
        style={{
          top: `${mousePos.y - 30}%`,
          left: `${mousePos.x - 30}%`,
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.1), transparent 70%)",
          filter: "blur(80px)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}

function AnimatedGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none">
      <defs>
        <pattern id="animatedGrid" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill="none" stroke="#7C3AED" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#animatedGrid)" />
    </svg>
  );
}

function FloatingShapes() {
  const shapes = [
    { size: 100, x: 10, y: 20, color: "rgba(124, 58, 237, 0.1)", duration: 20 },
    { size: 150, x: 80, y: 60, color: "rgba(6, 182, 212, 0.08)", duration: 25 },
    { size: 80, x: 60, y: 10, color: "rgba(236, 72, 153, 0.1)", duration: 18 },
    { size: 120, x: 20, y: 70, color: "rgba(124, 58, 237, 0.06)", duration: 22 },
  ];

  return (
    <>
      {shapes.map((shape, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            animation: `shapeFloat${i} ${shape.duration}s ease-in-out infinite`,
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: shape.size,
              height: shape.size,
              background: shape.color,
              filter: "blur(60px)",
            }}
          />
        </div>
      ))}
    </>
  );
}

export default function BackgroundAnimations() {
  return (
    <>
      <AnimatedGrid />
      <FloatingShapes />
      <BackgroundParticles />
      <style>{`
        @keyframes particleFloat0 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          25% { transform: translate(100px, -50px) scale(1.5); opacity: 0.8; }
          50% { transform: translate(50px, -100px) scale(2); opacity: 0.5; }
          75% { transform: translate(-50px, -50px) scale(1.5); opacity: 0.7; }
        }
        @keyframes particleFloat1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
          50% { transform: translate(-100px, -80px) rotate(180deg); opacity: 0.9; }
        }
        @keyframes particleFloat2 {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          33% { transform: translate(80px, -60px) scale(1.3); opacity: 1; }
          66% { transform: translate(-60px, -120px) scale(0.8); opacity: 0.4; }
        }
        @keyframes particleFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          50% { transform: translate(120px, -40px) scale(1.8); opacity: 0.6; }
        }
        @keyframes shapeFloat0 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -40px) scale(1.2); }
        }
        @keyframes shapeFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.3); }
        }
        @keyframes shapeFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 50px) scale(1.1); }
        }
        @keyframes shapeFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, -20px) scale(1.4); }
        }
      `}</style>
    </>
  );
}