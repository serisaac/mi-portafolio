"use client";

import { useEffect, useState, useRef } from "react";
import { projects } from "../data/portfolio";

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay * 100);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {children}
    </div>
  );
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <FadeIn delay={2 + index * 0.5}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative h-full min-h-[320px] p-6 rounded-3xl transition-all duration-500"
        style={{ 
          backgroundColor: isHovered ? 'rgba(21, 21, 32, 0.9)' : 'rgba(21, 21, 32, 0.6)',
          border: `1px solid ${isHovered ? 'rgba(124, 58, 237, 0.5)' : 'rgba(42, 42, 58, 0.5)'}`,
          transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
          boxShadow: isHovered ? '0 0 40px -15px rgba(124, 58, 237, 0.5)' : 'none'
        }}
      >
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
            style={{ background: `radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.15), transparent 70%)` }} 
          />
        </div>
        
        <div className="relative z-10 h-full flex flex-col">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-3xl mb-6 shadow-lg">
            {index === 0 ? "☕" : "🥖"}
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2" style={{ color: isHovered ? '#a78bfa' : '#fff' }}>
            {project.title}
          </h3>
          
          <p className="text-gray-400 text-sm mb-4 flex-1">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, i) => (
              <span key={i} className="px-3 py-1 text-xs rounded-full" 
                style={{ backgroundColor: 'rgba(124, 58, 237, 0.15)', color: '#a78bfa', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex gap-4 mt-auto">
            <a
              href={project.gitlab}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
            >
              GitLab
            </a>
            <a
              href={project.deploy}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
            >
              Deploy
            </a>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function Projects() {
  return (
    <section id="proyectos" className="min-h-screen py-20 relative" style={{ backgroundColor: '#0F0F1A' }} aria-label="Proyectos">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            <span className="text-purple-500">#</span> <span className="text-white">Proyectos</span>
          </h2>
        </FadeIn>
        
        <div className={`grid gap-6 ${
          projects.length === 2 
            ? 'grid-cols-1 md:grid-cols-2' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}