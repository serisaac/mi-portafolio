"use client";

import { useEffect, useState } from "react";
import { personalInfo } from "../data/portfolio";

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

export default function About() {
  return (
    <section id="sobre-mi" className="min-h-screen py-20 relative" style={{ backgroundColor: '#0F0F1A' }} aria-label="Sobre mí">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            <span className="text-purple-500">#</span> <span className="text-white">Sobre Mí</span>
          </h2>
        </FadeIn>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn delay={1}>
            <div className="relative order-2 lg:order-1">
              <div className="p-8 rounded-3xl" style={{ 
                backgroundColor: 'rgba(21, 21, 32, 0.8)',
                border: '1px solid rgba(124, 58, 237, 0.2)',
                backdropFilter: 'blur(10px)'
              }}>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Soy <span className="text-purple-400 font-semibold">Sergio Isaac Moreno Alvarez</span>, 
                  un estudiante apasionado por la tecnología y el desarrollo web. 
                  Me encanta transformar ideas en experiencias digitales únicas que 
                  combinen <span className="text-purple-400 font-semibold">funcionalidad</span> con 
                  <span className="text-purple-400 font-semibold"> diseño innovador</span>.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Como estudiante de Desarrollo Web, estoy siempre aprendiendo 
                  nuevas tecnologías y buscando formas de crear proyectos que marquen 
                  la diferencia.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Cuando no estoy programando, me gusta explorar nuevas tendencias 
                  en tecnología y compartir conocimientos.
                </p>
              </div>
              
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-600/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-700/10 rounded-full blur-xl" />
            </div>
          </FadeIn>
          
          <FadeIn delay={2}>
            <div className="flex justify-center order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl opacity-30 blur-2xl" />
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-purple-500/30" style={{ boxShadow: "0 0 40px -10px rgba(124, 58, 237, 0.5)" }}>
                  <img 
                    src={personalInfo.photoAlt || personalInfo.photo} 
                    alt="Foto de Sergio Isaac" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}