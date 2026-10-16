import React, { useState } from 'react';
import { Sparkles, Heart, BookMarked, Globe, Menu, X, ArrowRight } from 'lucide-react';
import type { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  favouriteCount: number;
  learnedCount: number;
  lastVisitedId: number;
  onOpenName: (id: number) => void;
  onOpenAyatKursi: () => void;
  onFilterFavourites: () => void;
  showingOnlyFavourites: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  favouriteCount,
  lastVisitedId,
  onOpenName,
  onOpenAyatKursi,
  onFilterFavourites,
  showingOnlyFavourites
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = UI_TRANSLATIONS[currentLang];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#101410]/95 backdrop-blur-md border-b border-[#D4AF37]/25 shadow-[0_4px_25px_rgba(0,0,0,0.7)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Main Title Branding */}
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#064E3B] to-[#042A20] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]">
              <span className="text-xl select-none">۞</span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-arabic text-xl sm:text-2xl text-gold-gradient font-bold leading-none select-text">
                  أَسْمَاءُ اللَّهِ الْحُسْنَى
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-[11px] sm:text-xs text-[#F8F6EF]/80 font-title tracking-wider mt-0.5">
                <span className="font-semibold text-[#D4AF37]">The 99 Beautiful Names of Allah</span>
                <span className="hidden sm:inline text-[#D4AF37]/40">•</span>
                <span className="font-tamil text-[#E8D9A8]/90 font-medium">அல்லாஹ்வின் 99 அழகிய திருநாமங்கள்</span>
              </div>
            </div>
          </div>

          {/* Desktop Right Side Navigation */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Reopen Ayat al-Kursi */}
            <button
              onClick={onOpenAyatKursi}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-title tracking-wider text-[#D4AF37] bg-[#064E3B]/30 hover:bg-[#064E3B]/60 border border-[#D4AF37]/30 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.returnToKursi}</span>
            </button>

            {/* Continue Where You Left Off Button */}
            {lastVisitedId > 0 && (
              <button
                onClick={() => onOpenName(lastVisitedId)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-title tracking-wider text-[#F8F6EF] bg-[#141A14] hover:bg-[#18221A] border border-[#D4AF37]/30 transition-all group"
                title={`${t.continueReading} (#${lastVisitedId})`}
              >
                <BookMarked className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Resume #{lastVisitedId}</span>
                <ArrowRight className="w-3 h-3 text-[#D4AF37] transition-transform group-hover:translate-x-0.5" />
              </button>
            )}

            {/* Favourites Filter Button */}
            <button
              onClick={onFilterFavourites}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-title tracking-wider border transition-all ${
                showingOnlyFavourites
                  ? 'bg-rose-950/60 border-rose-500 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                  : 'bg-[#141A14] border-[#D4AF37]/30 text-[#D8D4C5] hover:text-[#F8F6EF]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showingOnlyFavourites ? 'fill-current text-rose-400' : 'text-rose-400'}`} />
              <span>{t.favouriteNames}</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-[#064E3B] text-[#D4AF37] font-bold">
                {favouriteCount}
              </span>
            </button>

            {/* Three-Language Switcher */}
            <div className="flex items-center bg-[#141A14] border border-[#D4AF37]/30 rounded-full p-0.5 text-xs shadow-inner ml-1">
              <Globe className="w-3.5 h-3.5 text-[#D4AF37] ml-2 mr-1" />
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-full transition-all text-xs font-medium ${
                  currentLang === 'en'
                    ? 'bg-[#064E3B] text-[#D4AF37] font-bold shadow-sm'
                    : 'text-[#D8D4C5]/70 hover:text-[#F8F6EF]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('ta')}
                className={`px-2.5 py-1 rounded-full font-tamil transition-all text-xs font-medium ${
                  currentLang === 'ta'
                    ? 'bg-[#064E3B] text-[#D4AF37] font-bold shadow-sm'
                    : 'text-[#D8D4C5]/70 hover:text-[#F8F6EF]'
                }`}
              >
                தமிழ்
              </button>
              <button
                onClick={() => onLanguageChange('ar')}
                className={`px-2.5 py-1 rounded-full font-arabic transition-all text-xs font-medium ${
                  currentLang === 'ar'
                    ? 'bg-[#064E3B] text-[#D4AF37] font-bold shadow-sm'
                    : 'text-[#D8D4C5]/70 hover:text-[#F8F6EF]'
                }`}
              >
                العربية
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Quick Language Toggle */}
            <div className="flex items-center bg-[#141A14] border border-[#D4AF37]/30 rounded-full p-0.5 text-xs">
              <button
                onClick={() => onLanguageChange(currentLang === 'en' ? 'ta' : currentLang === 'ta' ? 'ar' : 'en')}
                className="px-2.5 py-1 rounded-full text-[11px] font-bold text-[#D4AF37] uppercase bg-[#064E3B]"
              >
                {currentLang.toUpperCase()}
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#141A14] border border-[#D4AF37]/30 text-[#D4AF37]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 px-2 border-t border-[#D4AF37]/20 flex flex-col gap-2.5 bg-[#101410] animate-fadeIn">
            {/* Ayat al-Kursi */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAyatKursi();
              }}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#064E3B]/25 border border-[#D4AF37]/30 text-xs font-title text-[#D4AF37]"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>{t.returnToKursi} (Opening Verse)</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Resume reading */}
            {lastVisitedId > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenName(lastVisitedId);
                }}
                className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#141A14] border border-[#D4AF37]/30 text-xs font-title text-[#F8F6EF]"
              >
                <span className="flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-[#D4AF37]" />
                  <span>Resume at Name #{lastVisitedId}</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Favourites Filter */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onFilterFavourites();
              }}
              className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl border text-xs font-title ${
                showingOnlyFavourites
                  ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                  : 'bg-[#141A14] border-[#D4AF37]/30 text-[#D8D4C5]'
              }`}
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>{t.favouriteNames} ({favouriteCount})</span>
              </span>
              <span className="text-[10px] text-[#D4AF37]">
                {showingOnlyFavourites ? 'Show All' : 'Filter'}
              </span>
            </button>

            {/* Language Switcher in Mobile */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#141A14] border border-[#D4AF37]/20 mt-1">
              <span className="text-xs text-[#D8D4C5]">Select Language:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`px-3 py-1 rounded-full text-xs ${
                    currentLang === 'en' ? 'bg-[#064E3B] text-[#D4AF37] font-bold' : 'text-[#D8D4C5]'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => onLanguageChange('ta')}
                  className={`px-3 py-1 rounded-full text-xs font-tamil ${
                    currentLang === 'ta' ? 'bg-[#064E3B] text-[#D4AF37] font-bold' : 'text-[#D8D4C5]'
                  }`}
                >
                  தமிழ்
                </button>
                <button
                  onClick={() => onLanguageChange('ar')}
                  className={`px-3 py-1 rounded-full text-xs font-arabic ${
                    currentLang === 'ar' ? 'bg-[#064E3B] text-[#D4AF37] font-bold' : 'text-[#D8D4C5]'
                  }`}
                >
                  العربية
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
