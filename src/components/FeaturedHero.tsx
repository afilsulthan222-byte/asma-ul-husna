import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Volume2, Heart, Award } from 'lucide-react';
import type { AsmaName, Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface FeaturedHeroProps {
  currentLang: Language;
  featuredName: AsmaName;
  onSelectName: (id: number) => void;
  onExploreClick: () => void;
  exploredCount: number;
  favouriteCount: number;
  isFavourite: boolean;
  onToggleFavourite: (id: number) => void;
}

export const FeaturedHero: React.FC<FeaturedHeroProps> = ({
  currentLang,
  featuredName,
  onSelectName,
  onExploreClick,
  exploredCount,
  favouriteCount,
  isFavourite,
  onToggleFavourite,
}) => {
  const t = UI_TRANSLATIONS[currentLang];
  const progressPercent = Math.round((exploredCount / 99) * 100);

  const speakArabic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(featuredName.arabic);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="relative w-full pt-8 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative radial glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#064E3B]/20 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-72 h-72 bg-[#D4AF37]/10 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Sacred Bismillah */}
        <div className="font-arabic text-2xl sm:text-3xl text-[#E8D9A8] mb-4 drop-shadow select-text">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>

        {/* Small Golden Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#064E3B]/40 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-title tracking-widest uppercase mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AUTHENTIC ISLAMIC HERITAGE</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        {/* Big Main Title in Arabic */}
        <h1 className="font-arabic text-4xl sm:text-6xl md:text-7xl font-bold text-gold-gradient tracking-wide mb-3 drop-shadow-[0_4px_25px_rgba(212,175,55,0.3)] select-text">
          أَسْمَاءُ اللَّهِ الْحُسْنَى
        </h1>

        {/* English Title */}
        <h2 className="font-title text-xl sm:text-3xl md:text-4xl text-[#F8F6EF] font-bold tracking-wider uppercase mb-2">
          THE 99 BEAUTIFUL NAMES OF ALLAH
        </h2>

        {/* Tamil Title */}
        <h3 className="font-tamil text-base sm:text-xl md:text-2xl text-[#E8D9A8] font-medium mb-6">
          அல்லாஹ்வின் 99 அழகிய திருநாமங்கள்
        </h3>

        {/* Quranic Ayah Quote on Asma ul Husna */}
        <div className="max-w-3xl p-4 sm:p-5 rounded-2xl bg-[#141A14]/80 border border-[#D4AF37]/30 mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div dir="rtl" lang="ar" className="font-arabic text-lg sm:text-2xl text-[#F8F6EF] leading-relaxed mb-2">
            وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا ۖ
          </div>
          <p className="text-xs sm:text-sm text-[#D8D4C5] font-light italic">
            “And to Allah belong the best names, so invoke Him by them.” — Surah Al-A'raf 7:180
          </p>
          <p className="font-tamil text-xs sm:text-sm text-[#E8D9A8]/90 font-light mt-1">
            “அல்லாஹ்வுக்கு மிக அழகிய திருநாமங்கள் இருக்கின்றன; எனவே, அவற்றைக் கொண்டே அவனிடம் பிரார்த்தியுங்கள்.” — அத்தியாயம் 7:180
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={onExploreClick}
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5E6B3] to-[#D4AF37] text-[#101410] font-title font-bold text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{t.exploreButton}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* FEATURED NAME OF THE DAY & PROGRESS SUMMARY GRID */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Card 1 & 2: Featured Name Spotlight (Col span 2) */}
          <div 
            onClick={() => onSelectName(featuredName.id)}
            className="md:col-span-2 group relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#141A14] via-[#0E1710] to-[#101410] border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.2)] cursor-pointer overflow-hidden"
          >
            {/* Corner Ornaments */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]" />

            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                <span className="font-title text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  {t.nameOfTheDay}
                </span>
                <span className="text-xs text-[#D8D4C5]/40">•</span>
                <span className="text-xs text-[#D8D4C5]/70 font-title font-semibold">
                  #{String(featuredName.id).padStart(2, '0')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={speakArabic}
                  aria-label="Listen Arabic pronunciation"
                  title="Pronounce Name"
                  className="p-2 rounded-full bg-[#101410] border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#064E3B] transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavourite(featuredName.id);
                  }}
                  aria-label="Toggle Favourite"
                  className={`p-2 rounded-full border transition-all ${
                    isFavourite 
                      ? 'bg-rose-950/50 border-rose-500 text-rose-400' 
                      : 'bg-[#101410] border-[#D4AF37]/30 text-[#D8D4C5]/60 hover:text-rose-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavourite ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Content row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2 max-w-md">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-title text-2xl sm:text-3xl text-[#F8F6EF] font-bold tracking-wider">
                    {featuredName.englishTransliteration}
                  </h3>
                  <span className="font-tamil text-base sm:text-lg text-[#E8D9A8]">
                    {featuredName.tamilTransliteration}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-sm sm:text-base text-[#D4AF37] font-semibold">
                    {featuredName.meaningEnglish}
                  </p>
                  <p className="font-tamil text-xs sm:text-sm text-[#F8F6EF]/90">
                    {featuredName.meaningTamil}
                  </p>
                </div>

                <p className="text-xs text-[#D8D4C5]/80 font-light leading-relaxed line-clamp-2 pt-1">
                  {featuredName.description.en}
                </p>
              </div>

              {/* Arabic Calligraphy Right Side */}
              <div 
                dir="rtl" 
                lang="ar" 
                className="font-arabic text-5xl sm:text-6xl text-gold-gradient font-bold drop-shadow-[0_2px_15px_rgba(212,175,55,0.3)] shrink-0 self-center sm:self-auto py-2"
              >
                {featuredName.arabic}
              </div>
            </div>

            {/* Bottom prompt */}
            <div className="mt-5 pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs text-[#D4AF37]">
              <span className="font-title tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Click to reflect on this divine attribute</span>
              </span>
              <span className="font-title font-bold text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Reflect Now <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 3: Learning Progress & Summary Stats */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#141A14]/90 border border-[#D4AF37]/30 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-title text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  {t.progressTitle}
                </span>
                <Award className="w-4 h-4 text-[#D4AF37]" />
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-title text-3xl sm:text-4xl font-extrabold text-[#F8F6EF]">
                  {exploredCount}
                </span>
                <span className="font-title text-lg text-[#D4AF37]">/ 99</span>
                <span className="text-xs text-[#D8D4C5]/70 ml-auto font-semibold">
                  {progressPercent}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-[#101410] rounded-full overflow-hidden border border-[#D4AF37]/20 mb-4">
                <div 
                  className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F5E6B3] to-[#34D399] transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <p className="text-xs text-[#D8D4C5]/80 leading-relaxed font-light mb-4">
                {t.progressDesc}. Keep reflecting daily to memorize and live by all 99 names.
              </p>
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs">
              <span className="text-[#D8D4C5]/70">
                ⭐ {favouriteCount} {t.favouriteNames}
              </span>
              <button
                onClick={onExploreClick}
                className="text-[#D4AF37] font-title font-semibold hover:underline"
              >
                Browse All →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
