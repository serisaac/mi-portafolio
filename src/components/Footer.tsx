"use client";

import { personalInfo } from "../data/portfolio";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t border-[#2A2A3A]/50" style={{ backgroundColor: '#0F0F1A' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#7C3AED] font-bold">
              <span className="text-[#7C3AED]">&lt;</span>Sergio<span className="text-[#06B6D4]">/&gt;</span>
            </span>
            <span className="text-gray-500 text-sm">
              {currentYear} - Sergio Isaac
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#7C3AED] transition-colors text-sm"
              aria-label="GitLab"
            >
              GitLab
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}