"use client";

import { useEffect, useState } from "react";
import { personalInfo } from "../data/portfolio";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: "purple" | "cyan";
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 15 + 12,
    delay: Math.random() * 8,
    color: Math.random() > 0.5 ? "purple" : "cyan"
  }));
}

function FloatingParticle({ particle }: { particle: Particle }) {
  return (
    <div
      className={`absolute rounded-full ${
        particle.color === "purple" ? "bg-purple-500/50" : "bg-cyan-500/40"
      }`}
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: particle.size,
        height: particle.size,
        filter: "blur(1px)",
        animation: `float ${particle.duration}s ease-in-out infinite ${particle.delay}s`,
      }}
    />
  );
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay * 100);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      {children}
    </div>
  );
}

export default function Hero() {
  const [particles] = useState<Particle[]>(() => generateParticles(30));
  
  return (
    <section 
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundColor: '#0F0F1A',
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
          linear-gradient(rgba(124, 58, 237, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124, 58, 237, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 60px 60px, 60px 60px',
      }}
      aria-label="Hero section"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-800/10 rounded-full blur-[120px]" />
      </div>
      
      {particles.map((p) => (
        <FloatingParticle key={p.id} particle={p} />
      ))}
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn delay={0}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-purple-400 font-medium mb-4 tracking-widest uppercase text-sm">
                {personalInfo.role}
              </p>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                <span className="text-white">Hola, soy </span>
                <span className="block bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                  {personalInfo.firstName}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
                {personalInfo.tagline}
              </p>
              
              <FadeIn delay={1}>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <a 
                    href="#proyectos"
                    className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-all duration-300"
                    style={{ boxShadow: "0 0 30px -5px rgba(124, 58, 237, 0.5)" }}
                  >
                    Ver Proyectos
                  </a>
                  <a 
                    href="#contact"
                    className="px-8 py-4 border border-purple-500/50 hover:border-purple-400 text-purple-400 hover:text-purple-300 font-semibold rounded-xl transition-all duration-300"
                  >
                    Contactarme
                  </a>
                </div>
              </FadeIn>
            </div>
            
            <FadeIn delay={2}>
              <div className="flex-shrink-0">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full animate-pulse opacity-30 blur-2xl" />
                  <div className="absolute inset-2 bg-purple-900/30 rounded-full overflow-hidden border-4 border-purple-500/30" style={{ boxShadow: "0 0 40px -10px rgba(124, 58, 237, 0.5)" }}>
                    <img 
                      src={personalInfo.photo} 
                      alt="Foto de Sergio Isaac" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </FadeIn>
      </div>
      
      <FadeIn delay={3}>
        <a
          href="#sobre-mi"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-purple-400/60 hover:text-purple-400 transition-colors"
          aria-label="Ir a sobre mí"
        >
          <div className="flex flex-col items-center gap-2" style={{ animation: 'bounce 2s infinite' }}>
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </a>
      </FadeIn>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.1; }
          50% { transform: translateY(-80px) translateX(20px); opacity: 0.6; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
      `}</style>
    </section>
  );
}