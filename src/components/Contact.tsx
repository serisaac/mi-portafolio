"use client";

import { useState, useEffect, useRef } from "react";
import { personalInfo } from "../data/portfolio";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen py-20 relative overflow-hidden"
      style={{ backgroundColor: "#0F0F1A" }}
      onMouseMove={handleMouseMove}
      aria-label="Contacto"
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.5), transparent)" }} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.08), transparent 40%)`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div
          className="transition-all duration-1000"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            <span className="text-purple-500">#</span> <span className="text-white">Contacto</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div
            className="w-full"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-50px)",
              transition: "all 1s ease-out 0.2s",
            }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Contáctame</h3>
              <p className="text-gray-400 text-lg">
                ¿Tienes un proyecto en mente?{" "}
                <span className="text-purple-400">¡Escríbeme y hablemos!</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group relative">
                  <label
                    htmlFor="name"
                    className="block text-sm mb-2 transition-all duration-300"
                    style={{ color: focusedField === "name" ? "#a78bfa" : "#9ca3af" }}
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-5 py-4 rounded-2xl text-gray-100 placeholder:text-gray-500 transition-all duration-300"
                    style={{
                      backgroundColor: "rgba(15, 15, 26, 0.9)",
                      border: `2px solid ${focusedField === "name" ? "rgba(124, 58, 237, 0.8)" : "rgba(124, 58, 237, 0.2)"}`,
                      boxShadow: focusedField === "name" ? "0 0 30px -10px rgba(124, 58, 237, 0.5)" : "none",
                    }}
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-sm mb-2 transition-all duration-300"
                    style={{ color: focusedField === "email" ? "#a78bfa" : "#9ca3af" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-5 py-4 rounded-2xl text-gray-100 placeholder:text-gray-500 transition-all duration-300"
                    style={{
                      backgroundColor: "rgba(15, 15, 26, 0.9)",
                      border: `2px solid ${focusedField === "email" ? "rgba(124, 58, 237, 0.8)" : "rgba(124, 58, 237, 0.2)"}`,
                      boxShadow: focusedField === "email" ? "0 0 30px -10px rgba(124, 58, 237, 0.5)" : "none",
                    }}
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="message"
                  className="block text-sm mb-2 transition-all duration-300"
                  style={{ color: focusedField === "message" ? "#a78bfa" : "#9ca3af" }}
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  className="w-full px-5 py-4 rounded-2xl text-gray-100 placeholder:text-gray-500 transition-all duration-300 resize-none"
                  style={{
                    backgroundColor: "rgba(15, 15, 26, 0.9)",
                    border: `2px solid ${focusedField === "message" ? "rgba(124, 58, 237, 0.8)" : "rgba(124, 58, 237, 0.2)"}`,
                    boxShadow: focusedField === "message" ? "0 0 30px -10px rgba(124, 58, 237, 0.5)" : "none",
                  }}
                  placeholder="Tu mensaje..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className="group relative w-full px-8 py-5 text-white font-semibold rounded-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                  boxShadow: submitted ? "none" : "0 0 40px -10px rgba(124, 58, 237, 0.6)",
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Enviando...
                    </>
                  ) : submitted ? (
                    <>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      ¡Enviado!
                    </>
                  ) : (
                    "Enviar mensaje"
                  )}
                </span>
              </button>
            </form>
          </div>

          <div
            className="lg:pl-12"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(50px)",
              transition: "all 1s ease-out 0.4s",
            }}
          >
            <div
              className="p-10 rounded-3xl mb-8 transition-all duration-500 hover:scale-[1.02] group"
              style={{
                backgroundColor: "rgba(15, 15, 26, 0.8)",
                border: "1px solid rgba(124, 58, 237, 0.3)",
              }}
            >
              <h4 className="text-xl font-semibold text-white mb-4 transition-colors duration-300 group-hover:text-purple-300">
                Encuéntrame en
              </h4>
              <p className="text-gray-400 mb-6">{personalInfo.email}</p>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitLab"
                className="inline-flex items-center gap-3 text-purple-400 hover:text-purple-300 transition-all duration-300 group/link"
              >
                <svg className="w-8 h-8 transition-all duration-300 group-hover/link:scale-110 group-hover/link:rotate-12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
                </svg>
                <span className="relative text-lg">
                  GitLab
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover/link:w-full" />
                </span>
              </a>
            </div>

            <div
              className="p-8 rounded-2xl transition-all duration-500 hover:scale-[1.02]"
              style={{
                backgroundColor: "rgba(15, 15, 26, 0.8)",
                border: "1px solid rgba(124, 58, 237, 0.2)",
              }}
            >
              <div className="flex items-center gap-5">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-12"
                  style={{
                    background: "linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(6, 182, 212, 0.2))",
                    boxShadow: "0 0 30px -10px rgba(124, 58, 237, 0.4)",
                  }}
                >
                  <span className="text-3xl">💬</span>
                </div>
                <div>
                  <p className="text-white font-medium text-lg">Respuesta rápida</p>
                  <p className="text-gray-400 text-sm">Generalmente en menos de 24h</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4 justify-center">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: ["#7C3AED", "#06B6D4", "#EC4899"][i],
                    boxShadow: `0 0 20px ${["#7C3AED", "#06B6D4", "#EC4899"][i]}`,
                    animation: `pulse ${1.5 + i * 0.3}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 1; }
        }
      `}</style>
    </section>
  );
}