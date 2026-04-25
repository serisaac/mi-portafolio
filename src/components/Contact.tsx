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

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });
    
    setTimeout(() => setSubmitted(false), 3000);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  return (
    <section id="contact" className="min-h-screen py-20 relative" style={{ backgroundColor: '#0F0F1A' }} aria-label="Contacto">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            <span className="text-purple-500">#</span> <span className="text-white">Contacto</span>
          </h2>
        </FadeIn>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <FadeIn delay={1}>
            <div className="w-full">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Contáctame
                </h3>
                <p className="text-gray-400 text-lg">
                  ¿Tienes un proyecto en mente? ¡Escríbeme y hablemos sobre tu idea!
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-400 text-sm mb-2">Nombre</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl text-gray-100 placeholder:text-gray-500 transition-all"
                      style={{ 
                        backgroundColor: 'rgba(21, 21, 32, 0.8)',
                        border: '1px solid rgba(42, 42, 58, 0.5)'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(124, 58, 237, 0.8)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(42, 42, 58, 0.5)'}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-400 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl text-gray-100 placeholder:text-gray-500 transition-all"
                      style={{ 
                        backgroundColor: 'rgba(21, 21, 32, 0.8)',
                        border: '1px solid rgba(42, 42, 58, 0.5)'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(124, 58, 237, 0.8)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(42, 42, 58, 0.5)'}
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-400 text-sm mb-2">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl text-gray-100 placeholder:text-gray-500 transition-all resize-none"
                    style={{ 
                      backgroundColor: 'rgba(21, 21, 32, 0.8)',
                      border: '1px solid rgba(42, 42, 58, 0.5)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(124, 58, 237, 0.8)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(42, 42, 58, 0.5)'}
                    placeholder="Tu mensaje..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className="w-full px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    backgroundColor: '#7C3AED',
                    boxShadow: submitted ? 'none' : '0 0 25px -5px rgba(124, 58, 237, 0.5)'
                  }}
                >
                  {isSubmitting ? "Enviando..." : submitted ? "¡Enviado!" : "Enviar mensaje"}
                </button>
              </form>
            </div>
          </FadeIn>
          
          <FadeIn delay={2}>
            <div className="lg:pl-12">
              <div className="p-8 rounded-3xl mb-8" style={{ 
                backgroundColor: 'rgba(21, 21, 32, 0.6)',
                border: '1px solid rgba(124, 58, 237, 0.2)'
              }}>
                <h4 className="text-xl font-semibold text-white mb-4">Encuéntrame en</h4>
                <p className="text-gray-400 mb-6">{personalInfo.email}</p>
                
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitLab"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
                  </svg>
                  GitLab
                </a>
              </div>
              
              <div className="p-6 rounded-2xl" style={{ 
                backgroundColor: 'rgba(21, 21, 32, 0.6)',
                border: '1px solid rgba(124, 58, 237, 0.2)'
              }}>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(124, 58, 237, 0.2)' }}>
                    <span>💬</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Respuesta rápida</p>
                    <p className="text-sm">Generalmente en menos de 24h</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}