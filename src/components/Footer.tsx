import React from 'react';
import { ArrowUp, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';
import type { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface FooterProps {
  currentLang: Language;
  onOpenAyatKursi: () => void;
  onExploreNames: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onOpenAyatKursi,
  onExploreNames
}) => {
  const t = UI_TRANSLATIONS[currentLang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-gradient-to-b from-[#101410] via-[#0D150F] to-[#080E0A] border-t border-[#D4AF37]/30 pt-16 pb-12 px-4 sm:px-6 lg:px-8 mt-20 select-none">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-[#064E3B]/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Main Footer Header */}
        <div className="flex flex-col items-center text-center pb-12 border-b border-[#D4AF37]/20">
          <div className="w-12 h-12 rounded-full bg-[#064E3B]/60 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] mb-4 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <span className="text-2xl select-none">۞</span>
          </div>

          {/* Three-Language Brand Title */}
          <h2 className="font-arabic text-3xl sm:text-4xl md:text-5xl text-gold-gradient font-bold mb-2">
            {t.siteTitleAr}
          </h2>
          <h3 className="font-title text-lg sm:text-xl md:text-2xl text-[#F8F6EF] font-bold tracking-wider uppercase mb-1">
            {t.siteTitleEn}
          </h3>
          <h4 className="font-tamil text-sm sm:text-base md:text-lg text-[#E8D9A8]/90 mb-4">
            {t.siteTitleTa}
          </h4>
          <p className="max-w-xl text-xs sm:text-sm text-[#D8D4C5]/80 font-light leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Links and Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-b border-[#D4AF37]/15 text-left">
          {/* Col 1: About the Sanctuary */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-title font-bold text-[#D4AF37] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.footerAboutTitle}</span>
            </div>
            <p className="text-xs text-[#D8D4C5]/80 leading-relaxed font-light">
              {t.footerAboutText}
            </p>
            <div className="pt-2 flex flex-col gap-1.5 text-xs">
              <button
                onClick={onOpenAyatKursi}
                className="text-[#D4AF37] hover:underline text-left inline-flex items-center gap-1.5"
              >
                <span>✦ Read Ayat al-Kursi (The Throne Verse)</span>
              </button>
              <button
                onClick={onExploreNames}
                className="text-[#D4AF37] hover:underline text-left inline-flex items-center gap-1.5"
              >
                <span>✦ Explore All 99 Divine Names</span>
              </button>
            </div>
          </div>

          {/* Col 2: Authentic Sources & References */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-title font-bold text-[#D4AF37] uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.footerSourcesTitle}</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#D8D4C5]/80 font-light">
              {t.footerSourcesList.map((source, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#D4AF37] shrink-0">•</span>
                  <span>{source}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Respectful Note & Translation Disclaimer */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-title font-bold text-[#D4AF37] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Respectful Scholarly Disclaimer</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#064E3B]/20 border border-[#D4AF37]/25 text-xs text-[#E8D9A8]/90 leading-relaxed font-light italic">
              {t.footerDisclaimer}
            </div>
            <div className="text-[11px] text-[#D8D4C5]/60 pt-1 font-light">
              Feedback & Inquiries: Dedicated to the Ummah worldwide. Free, non-commercial, and open for spiritual education.
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D8D4C5]/60">
          <div className="flex items-center gap-2">
            <span>Asma ul Husna Digital Library</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted with reverence for Allah’s Divine Names
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#141A14] border border-[#D4AF37]/30 text-[#D4AF37] hover:text-[#F8F6EF] hover:border-[#D4AF37] transition-all font-title text-xs tracking-wider uppercase"
          >
            <span>{t.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
