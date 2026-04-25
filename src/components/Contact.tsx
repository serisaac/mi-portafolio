"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contactItems } from "../data/portfolio";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section
      id="contact"
      className="py-32 bg-[#0a0a12] relative overflow-hidden"
    >
      <SectionNumber number="04" position="top-8 left-8" />

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
            Contacto
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-black text-[clamp(2.8rem,7vw,5.5rem)] text-white leading-[1] tracking-[-0.02em] mb-12"
        >
          Hablemos
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <ContactInfo />
          <ContactForm
            formData={formData}
            setFormData={setFormData}
            status={status}
            handleSubmit={handleSubmit}
          />
        </div>
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

function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex flex-col gap-10"
    >
      <p className="text-[rgba(255,255,255,0.45)] leading-[1.8] max-w-[340px]">
        ¿Tienes un proyecto en mente? Me encantaría escucharte y ver cómo podemos hacer algo increíble juntos.
      </p>

      <div className="flex flex-col gap-6">
        {contactItems.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="flex items-center gap-4 group"
            whileHover={{ x: 5 }}
          >
            <div className="w-12 h-12 border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[rgba(255,255,255,0.25)] transition-all duration-300 group-hover:border-[rgba(201,169,110,0.5)] group-hover:text-[#c9a96e]">
              {item.icon === "email" ? (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px]">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ) : (
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px]">
                  <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
                </svg>
              )}
            </div>
            <div>
              <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.2)] block mb-0.5">
                {item.label}
              </span>
              <span className="text-sm text-[rgba(255,255,255,0.55)] transition-colors duration-300 group-hover:text-[#c9a96e]">
                {item.value}
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-6 border-t border-[rgba(255,255,255,0.05)]">
        <div className="w-[7px] h-[7px] rounded-full bg-[#34d399] animate-pulse flex-shrink-0" />
        <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.2)]">
          Respuesta en menos de 24 horas
        </span>
      </div>
    </motion.div>
  );
}

function ContactForm({
  formData,
  setFormData,
  status,
  handleSubmit,
}: {
  formData: { name: string; email: string; message: string };
  setFormData: React.Dispatch<React.SetStateAction<{ name: string; email: string; message: string }>>;
  status: "idle" | "sending" | "sent";
  handleSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <motion.form
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-10 relative"
      style={{
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-16px",
          right: "-16px",
          width: "48px",
          height: "48px",
          borderTop: "1px solid rgba(201,169,110,0.2)",
          borderRight: "1px solid rgba(201,169,110,0.2)",
        },
      }}
    >
      <div className="relative">
        <input
          type="text"
          id="fname"
          placeholder=" "
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-transparent border-b border-[rgba(255,255,255,0.1)] py-3 text-[rgba(255,255,255,0.8)] text-sm outline-none transition-colors duration-300 focus:border-[#c9a96e]"
        />
        <label
          htmlFor="fname"
          className="absolute left-0 top-3 text-[0.78rem] tracking-[0.18em] uppercase text-[rgba(255,255,255,0.22)] pointer-events-none origin-left transition-all duration-200"
        >
          Nombre
        </label>
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-[#c9a96e]"
          initial={{ width: 0 }}
          animate={{ width: status === "idle" ? 0 : "100%" }}
          style={{ width: 0 }}
        />
      </div>

      <div className="relative">
        <input
          type="email"
          id="femail"
          placeholder=" "
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-transparent border-b border-[rgba(255,255,255,0.1)] py-3 text-[rgba(255,255,255,0.8)] text-sm outline-none transition-colors duration-300 focus:border-[#c9a96e]"
        />
        <label
          htmlFor="femail"
          className="absolute left-0 top-3 text-[0.78rem] tracking-[0.18em] uppercase text-[rgba(255,255,255,0.22)] pointer-events-none origin-left transition-all duration-200"
        >
          Email
        </label>
      </div>

      <div className="relative">
        <textarea
          id="fmsg"
          rows={5}
          placeholder=" "
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-transparent border-b border-[rgba(255,255,255,0.1)] py-3 text-[rgba(255,255,255,0.8)] text-sm outline-none transition-colors duration-300 focus:border-[#c9a96e] resize-none"
        />
        <label
          htmlFor="fmsg"
          className="absolute left-0 top-3 text-[0.78rem] tracking-[0.18em] uppercase text-[rgba(255,255,255,0.22)] pointer-events-none origin-left transition-all duration-200"
        >
          Mensaje
        </label>
      </div>

      <motion.button
        type="submit"
        disabled={status !== "idle"}
        className={`flex items-center justify-center gap-2 px-8 py-4 border text-[0.7rem] tracking-[0.25em] uppercase font-sans transition-all duration-300 ${
          status === "sent"
            ? "border-[rgba(52,211,153,0.4)] text-[#34d399]"
            : "border-[rgba(201,169,110,0.4)] text-[#c9a96e] hover:bg-[rgba(201,169,110,0.15)]"
        }`}
        whileHover={status === "idle" ? { scale: 1.02 } : {}}
        whileTap={status === "idle" ? { scale: 0.98 } : {}}
      >
        <AnimatePresence mode="wait">
          {status === "sending" ? (
            <motion.span
              key="sending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="inline-block w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"
            />
          ) : status === "sent" ? (
            <motion.span key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              ¡Mensaje enviado! ✓
            </motion.span>
          ) : (
            <motion.span key="idle">Enviar Mensaje</motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.form>
  );
}