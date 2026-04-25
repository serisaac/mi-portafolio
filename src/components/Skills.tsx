"use client";

import { useEffect, useState } from "react";
import { skills } from "../data/portfolio";

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
    "Prompt Engineering": "🤖"
  };
  return icons[name] || "💡";
}

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  return (
    <section id="skills" className="min-h-screen py-20 relative" style={{ backgroundColor: '#0F0F1A' }} aria-label="Habilidades">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            <span className="text-purple-500">#</span> <span className="text-white">Skills</span>
          </h2>
        </FadeIn>
        
        <FadeIn delay={1}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <FadeIn key={skill.name} delay={1 + index * 0.1}>
                <div
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="px-5 py-3 rounded-xl transition-all duration-300 cursor-default"
                  style={{
                    backgroundColor: hoveredSkill === skill.name ? 'rgba(124, 58, 237, 0.2)' : 'rgba(21, 21, 32, 0.6)',
                    border: `1px solid ${hoveredSkill === skill.name ? 'rgba(124, 58, 237, 0.5)' : 'rgba(42, 42, 58, 0.5)'}`,
                    boxShadow: hoveredSkill === skill.name ? '0 0 25px -8px rgba(124, 58, 237, 0.5)' : 'none',
                    transform: hoveredSkill === skill.name ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getSkillIcon(skill.name)}</span>
                    <span className={`text-sm font-medium ${hoveredSkill === skill.name ? 'text-purple-300' : 'text-gray-300'}`}>
                      {skill.name}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        
        <FadeIn delay={3}>
          <div className="mt-12 p-6 rounded-2xl" style={{ 
            backgroundColor: 'rgba(21, 21, 32, 0.6)',
            border: '1px solid rgba(124, 58, 237, 0.2)'
          }}>
            <p className="text-center text-gray-400">
              Y constantemente aprendiendo nuevas tecnologías...
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}