"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#hero", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre Mí" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contacto" }
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay * 100);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
    >
      {children}
    </div>
  );
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
        style={{ 
          backgroundColor: isScrolled ? 'rgba(15, 15, 26, 0.95)' : 'transparent',
          borderBottom: isScrolled ? '1px solid rgba(124, 58, 237, 0.2)' : 'none',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none'
        }}
      >
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <FadeIn>
            <a href="#hero" className="text-xl font-bold text-white" aria-label="Ir al inicio">
              <span className="text-purple-500">&lt;</span>Sergio<span className="text-purple-500">/&gt;</span>
            </a>
          </FadeIn>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <FadeIn key={item.href} delay={index * 0.1 + 0.2}>
                <a
                  href={item.href}
                  onClick={handleNavClick}
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm font-medium"
                >
                  {item.label}
                </a>
              </FadeIn>
            ))}
          </div>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            <span className={`w-6 h-0.5 bg-white transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </nav>
      </header>
      
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden pt-20" style={{ backgroundColor: '#0F0F1A' }}>
          <div className="flex flex-col items-center gap-8 p-8">
            {navItems.map((item, index) => (
              <FadeIn key={item.href} delay={index * 0.1}>
                <a
                  href={item.href}
                  onClick={handleNavClick}
                  className="text-2xl text-white hover:text-purple-400 transition-colors"
                >
                  {item.label}
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      )}
    </>
  );
}