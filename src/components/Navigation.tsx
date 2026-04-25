"use client";

import { useEffect, useState, useRef } from "react";

const navItems = [
  { href: "#hero", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre Mí" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contacto" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  if (!mounted) return null;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: isScrolled ? "rgba(15, 15, 26, 0.95)" : "transparent",
          borderBottom: isScrolled ? "1px solid rgba(124, 58, 237, 0.3)" : "none",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          boxShadow: isScrolled ? "0 0 40px -10px rgba(124, 58, 237, 0.2)" : "none",
        }}
      >
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a
            href="#hero"
            className="text-xl font-bold text-white group relative"
            aria-label="Ir al inicio"
          >
            <span className="relative z-10">
              <span className="text-purple-500 transition-all duration-300 group-hover:text-purple-400">&lt;</span>
              Sergio
              <span className="text-purple-500 transition-all duration-300 group-hover:text-purple-400">/&gt;</span>
            </span>
            <span className="absolute -inset-2 rounded-lg bg-purple-500/20 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="relative text-gray-400 hover:text-purple-400 transition-all duration-300 text-sm font-medium py-2 group"
                style={{
                  animation: `fadeSlideIn 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                <span className="absolute -inset-2 rounded-lg bg-purple-500/10 scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
              </a>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 relative z-50 group"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`w-7 h-0.5 bg-white rounded-full transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-7 h-0.5 bg-white rounded-full transition-all duration-300 ${
                mobileMenuOpen ? "scale-0 opacity-0" : ""
              }`}
            />
            <span
              className={`w-7 h-0.5 bg-white rounded-full transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden pt-24"
          style={{
            backgroundColor: "#0F0F1A",
            animation: "slideIn 0.3s ease-out",
          }}
        >
          <div className="flex flex-col items-center gap-10 p-8">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="text-3xl text-white hover:text-purple-400 transition-all duration-300 hover:scale-110"
                style={{
                  animation: `fadeSlideIn 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}