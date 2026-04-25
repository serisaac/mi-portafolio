"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { projects } from "../data/portfolio";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-32 bg-[#0a0a12] relative overflow-hidden"
    >
      <SectionNumber number="02" position="top-8 left-8" />

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
            Proyectos
          </span>
        </motion.div>

        <div className="flex flex-wrap items-end justify-between gap-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black text-[clamp(2.8rem,7vw,5.5rem)] text-white leading-[1] tracking-[-0.02em]"
          >
            Mi trabajo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[rgba(255,255,255,0.25)] text-sm max-w-[260px] leading-[1.7] text-right"
          >
            Cada proyecto es una oportunidad de aprender y crear algo memorable.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mt-16"
        >
          <div className="w-16 h-[1px] bg-[rgba(255,255,255,0.08)]" />
          <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[rgba(255,255,255,0.18)]">
            Más proyectos en camino
          </span>
          <div className="w-16 h-[1px] bg-[rgba(255,255,255,0.08)]" />
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

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: -y * 16, y: x * 16 });
    setGlarePosition({
      x: (x + 0.5) * 100,
      y: (y + 0.5) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#0d0d18] border border-[rgba(255,255,255,0.04)] overflow-hidden cursor-pointer relative transition-colors duration-400 hover:border-[rgba(201,169,110,0.25)]"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
    >
      <div
        className="h-[2px] bg-gradient-to-r from-transparent via-current to-transparent"
        style={{ borderColor: project.color }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(201,169,110,0.12), transparent 60%)`,
        }}
      />

      <div className="absolute top-4 right-6 font-display font-black text-[4.5rem] text-[rgba(255,255,255,0.03)] leading-[1] select-none">
        {project.index}
      </div>

      <div className="p-10">
        <div className="flex items-start gap-4 mb-6">
          <span className="text-[2.2rem] leading-[1]">{project.emoji}</span>
          <div>
            <span className="font-display font-bold text-[1.5rem] text-white block mb-1 transition-colors duration-300 hover:text-[#c9a96e]">
              {project.title}
            </span>
            <div className="w-8 h-[1px] bg-[rgba(201,169,110,0.45)] transition-all duration-400" />
          </div>
        </div>

        <p className="text-[rgba(255,255,255,0.35)] text-sm leading-[1.75] mb-8">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-[0.62rem] tracking-[0.2em] uppercase border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.3)] px-3 py-1 transition-all duration-300 hover:border-[rgba(201,169,110,0.4)] hover:text-[#c9a96e]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6 pt-6 border-t border-[rgba(255,255,255,0.04)]">
          <motion.a
            href={project.gitlab}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[0.68rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.25)] transition-colors duration-300 hover:text-[#c9a96e]"
            whileHover={{ x: 5 }}
          >
            <svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
            </svg>
            GitLab
          </motion.a>
          <motion.a
            href={project.deploy}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[0.68rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.25)] transition-colors duration-300 hover:text-[#c9a96e]"
            whileHover={{ x: 5 }}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-[14px] h-[14px]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Demo Live
          </motion.a>
          <motion.span
            className="ml-auto text-[#c9a96e]"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 0.3 }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}