"use client";

import { useState, useEffect, useRef } from "react";
import { personalInfo } from "../data/portfolio";

function MorphingBlob() {
  const [morph, setMorph] = useState(0);

  useEffect(() => {
    let frame: number;
    const animate = () => {
      setMorph((m) => m + 1);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            conic-gradient(from ${morph * 0.5}deg, 
              rgba(124, 58, 237, 0.4), 
              rgba(236, 72, 153, 0.4), 
              rgba(6, 182, 212, 0.4), 
              rgba(124, 58, 237, 0.4)
            )
          `,
          animation: "blobMorph 8s ease-in-out infinite",
          filter: "blur(20px)",
          transform: `scale(${1 + Math.sin(morph * 0.02) * 0.2})`,
        }}
      />
      <div
        className="absolute inset-4 rounded-full overflow-hidden border-4 border-purple-500/50 transition-transform duration-700 hover:scale-105"
        style={{
          boxShadow: "0 0 60px -10px rgba(124, 58, 237, 0.6), inset 0 0 40px -10px rgba(124, 58, 237, 0.3)",
          animation: "imageFloat 6s ease-in-out infinite",
        }}
      >
        <img
          src={personalInfo.photoAlt || personalInfo.photo}
          alt="Foto de Sergio Isaac"
          className="w-full h-full object-cover"
          style={{
            filter: "saturate(1.3) contrast(1.1)",
            animation: "imageZoom 10s ease-in-out infinite alternate",
          }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="sobre-mi"
      ref={ref}
      className="min-h-screen py-20 relative overflow-hidden"
      style={{ backgroundColor: "#0F0F1A" }}
      onMouseMove={handleMouseMove}
      aria-label="Sobre mí"
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.5), transparent)" }} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.1), transparent 40%)`,
          transition: "background 0.3s ease",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div
          className="transition-all duration-1000"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.9)",
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            <span className="text-purple-500">#</span> <span className="text-white">Sobre Mí</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className="relative order-2 lg:order-1"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-50px)",
              transition: "all 1s ease-out 0.2s",
            }}
          >
            <div
              className="p-10 rounded-3xl relative overflow-hidden group"
              onMouseMove={handleMouseMove}
              style={{
                backgroundColor: "rgba(15, 15, 26, 0.9)",
                border: "1px solid rgba(124, 58, 237, 0.3)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.15), transparent 50%)`,
                }}
              />

              <p className="text-gray-300 text-lg leading-relaxed mb-6 relative z-10">
                Soy <span className="text-purple-400 font-bold">Sergio Isaac Moreno Alvarez</span>,
                un estudiante apasionado por la tecnología y el desarrollo web.
                Me encanta transformar ideas en experiencias digitales únicas que
                combinen <span className="text-purple-400 font-semibold">funcionalidad</span> con
                <span className="text-purple-400 font-semibold"> diseño innovador</span>.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 relative z-10">
                Como estudiante de Desarrollo Web, estoy siempre aprendiendo
                nuevas tecnologías y buscando formas de crear proyectos que marquen
                la diferencia.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed relative z-10">
                Cuando no estoy programando, me gusta explorar nuevas tendencias
                en tecnología y compartir conocimientos.
              </p>

              <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:-top-24 group-hover:-right-24" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cyan-600/20 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:-bottom-24 group-hover:-left-24" />
            </div>
          </div>

          <div
            className="flex justify-center order-1 lg:order-2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(50px)",
              transition: "all 1s ease-out 0.4s",
            }}
          >
            <MorphingBlob />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blobMorph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 50% 60% 30% 60% / 30% 40% 70% 60%; }
          75% { border-radius: 60% 40% 60% 30% / 70% 50% 40% 60%; }
        }
        @keyframes imageFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes imageZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
}