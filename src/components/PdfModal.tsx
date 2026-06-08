"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PdfModalProps {
  pdfUrl: string | null;
  title: string;
  onClose: () => void;
}

export default function PdfModal({ pdfUrl, title, onClose }: PdfModalProps) {
  useEffect(() => {
    if (!pdfUrl) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [pdfUrl]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.ctrlKey && (e.key === "s" || e.key === "S" || e.key === "p" || e.key === "P")) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {pdfUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ backgroundColor: "rgba(0,0,0,0.88)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[#c9a96e]">
                {title}
              </span>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.4)] hover:text-white hover:border-[rgba(201,169,110,0.5)] transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" />
                </svg>
              </button>
            </div>

            <div className="relative flex-1 min-h-0 bg-[#0d0d18] border border-[rgba(255,255,255,0.06)]">
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0`}
                className="w-full h-[80vh] border-0"
                title={title}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
