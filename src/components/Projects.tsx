"use client";

import { useState, useEffect, useRef } from "react";
import { projects } from "../data/portfolio";

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
}

function MagneticCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 10;
    const y = (e.clientY - rect.top - rect.height / 2) / 10;
    setPosition({ x, y });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPosition({ x: 0, y: 0 });
      }}
      className={className}
      style={{
        transform: `perspective(1000px) translateX(${position.x}px) translateY(${position.y}px) ${hovered ? "scale(1.05)" : "scale(1)"}`,
        transition: "transform 0.15s ease-out",
      }}
    >
      {children}
    </div>
  );
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const icons = ["☕", "🥖", "🎮", "🛒", "💼", "📱"];

  return (
    <MagneticCard className="relative h-full min-h-[350px] rounded-3xl overflow-hidden group cursor-pointer">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative h-full p-8 transition-all duration-500"
        style={{
          backgroundColor: "rgba(15, 15, 26, 0.9)",
          border: "1px solid rgba(124, 58, 237, 0.3)",
        }}
      >
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(124, 58, 237, 0.25), transparent 60%)`,
          }}
        />

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: "linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, transparent 50%, rgba(6, 182, 212, 0.1) 100%)",
          }}
        />

        <div className="relative z-10 h-full flex flex-col">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
              boxShadow: isHovered ? "0 0 50px -10px rgba(124, 58, 237, 0.8)" : "0 10px 25px -5px rgba(0,0,0,0.3)",
            }}
          >
            {icons[index % icons.length]}
          </div>

          <h3
            className="text-2xl font-bold mb-3 transition-all duration-300"
            style={{ color: isHovered ? "#c084fc" : "#fff" }}
          >
            {project.title}
          </h3>

          <p className="text-gray-400 text-base mb-6 flex-1 leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="px-4 py-1.5 text-sm rounded-full transition-all duration-300 hover:scale-105 hover:rotate-2"
                style={{
                  backgroundColor: "rgba(124, 58, 237, 0.15)",
                  color: "#a78bfa",
                  border: "1px solid rgba(124, 58, 237, 0.3)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-6 mt-auto">
            <a
              href={project.gitlab}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-all duration-300 font-medium"
            >
              <svg
                className="w-5 h-5 transition-all duration-300 group-hover/link:rotate-12 group-hover/link:scale-110"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
              </svg>
              <span className="relative">
                GitLab
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover/link:w-full" />
              </span>
            </a>
            <a
              href={project.deploy}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all duration-300 font-medium"
            >
              <svg
                className="w-5 h-5 transition-all duration-300 group-hover/link:-rotate-12 group-hover/link:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="relative">
                Deploy
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover/link:w-full" />
              </span>
            </a>
          </div>
        </div>

        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background: `linear-gradient(${isHovered ? "135deg" : "180deg"}, transparent 0%, rgba(124, 58, 237, 0.05) 100%)`,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.5s",
          }}
        />
      </div>
    </MagneticCard>
  );
}

export default function Projects() {
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
      id="proyectos"
      ref={ref}
      className="min-h-screen py-20 relative"
      style={{ backgroundColor: "#0F0F1A" }}
      aria-label="Proyectos"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-12" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            <span className="text-purple-500">#</span> <span className="text-white">Proyectos</span>
          </h2>
        </div>

        <div
          className={`grid gap-8 ${
            projects.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.9)",
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}