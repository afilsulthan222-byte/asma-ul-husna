import React, { useEffect, useState, useCallback } from 'react';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Heart, 
  Volume2, 
  CheckCircle, 
  Share2, 
  RotateCcw,
  Sparkles,
  BookOpen,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { AsmaName, Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface NameDetailModalProps {
  name: AsmaName | null;
  allNames: AsmaName[];
  currentLang: Language;
  isFavourite: boolean;
  isLearned: boolean;
  onToggleFavourite: (id: number) => void;
  onToggleLearned: (id: number) => void;
  onClose: () => void;
  onNavigate: (id: number) => void;
}

export const NameDetailModal: React.FC<NameDetailModalProps> = ({
  name,
  allNames,
  currentLang,
  isFavourite,
  isLearned,
  onToggleFavourite,
  onToggleLearned,
  onClose,
  onNavigate,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const t = UI_TRANSLATIONS[currentLang];

  const handleNext = useCallback(() => {
    if (!name) return;
    if (name.id === 99) {
      setShowCompletion(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#064E3B', '#F8F6EF', '#E8D9A8']
      });
    } else {
      onNavigate(name.id + 1);
    }
  }, [name, onNavigate]);

  const handlePrevious = useCallback(() => {
    if (!name) return;
    if (name.id > 1) {
      onNavigate(name.id - 1);
    }
  }, [name, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrevious, onClose]);

  // Reset completion screen when name changes
  useEffect(() => {
    setShowCompletion(false);
  }, [name?.id]);

  if (!name) return null;

  // Speak Arabic Name using Web Speech API
  const speakArabicName = () => {
    if (!('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(name.arabic);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85; // Reverent, clear pacing

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = () => {
    const textToCopy = `${name.id}. ${name.arabic} (${name.englishTransliteration} / ${name.tamilTransliteration})\nEnglish: ${name.meaningEnglish}\nTamil: ${name.meaningTamil}\nArabic: ${name.meaningArabic}\nQuran: ${name.quranReference}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const prevName = name.id > 1 ? allNames[name.id - 2] : null;
  const nextName = name.id < 99 ? allNames[name.id] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-[#101410]/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Background Ambient Glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#064E3B]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Modal Card */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-4xl bg-gradient-to-b from-[#141A14] via-[#0E150F] to-[#101410] border border-[#D4AF37]/40 rounded-3xl p-5 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(212,175,55,0.15)] my-auto select-none"
      >
        {/* Four Corner Accents */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37]" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#D4AF37]" />

        {/* Top Action Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#D4AF37]/20">
          {/* Back to all names button */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-title tracking-wider text-[#D4AF37] hover:text-[#F8F6EF] bg-[#064E3B]/30 hover:bg-[#064E3B]/60 border border-[#D4AF37]/30 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.backToAllNames}</span>
          </button>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2">
            <span className="font-title text-xs text-[#D4AF37] font-semibold">
              {String(name.id).padStart(2, '0')} / 99
            </span>
            <div className="w-20 sm:w-28 h-1.5 bg-[#101410] rounded-full overflow-hidden border border-[#D4AF37]/20">
              <div 
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F5E6B3] transition-all duration-300"
                style={{ width: `${(name.id / 99) * 100}%` }}
              />
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            {/* Mark as Learned */}
            <button
              onClick={() => onToggleLearned(name.id)}
              aria-label={t.markAsLearned}
              title={isLearned ? t.learnedStatus : t.markAsLearned}
              className={`p-2 rounded-full border transition-all ${
                isLearned 
                  ? 'bg-[#064E3B] border-[#34D399] text-[#34D399]' 
                  : 'bg-[#141A14] border-[#D4AF37]/20 text-[#D8D4C5]/60 hover:text-[#F8F6EF]'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
            </button>

            {/* Favourite button */}
            <button
              onClick={() => onToggleFavourite(name.id)}
              aria-label={isFavourite ? t.removeFromFavourites : t.addToFavourites}
              title={isFavourite ? t.removeFromFavourites : t.addToFavourites}
              className={`p-2 rounded-full border transition-all ${
                isFavourite
                  ? 'bg-rose-950/40 border-rose-500/50 text-rose-400'
                  : 'bg-[#141A14] border-[#D4AF37]/20 text-[#D8D4C5]/60 hover:text-rose-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavourite ? 'fill-current' : ''}`} />
            </button>

            {/* Share / Copy button */}
            <button
              onClick={handleCopy}
              aria-label={t.copyDetails}
              title={t.copyDetails}
              className="p-2 rounded-full bg-[#141A14] border border-[#D4AF37]/20 text-[#D8D4C5]/60 hover:text-[#D4AF37] transition-all"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-full bg-[#141A14] border border-[#D4AF37]/20 text-[#D8D4C5]/60 hover:text-[#F8F6EF] transition-all ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copy toast */}
        {copied && (
          <div className="absolute top-16 right-8 bg-[#064E3B] border border-[#D4AF37] text-[#F8F6EF] px-4 py-1.5 rounded-full text-xs font-medium shadow-lg animate-fadeIn z-20">
            {t.copiedNotice}
          </div>
        )}

        {/* COMPLETION MODAL OVERLAY (when reaching #99) */}
        {showCompletion ? (
          <div className="py-8 sm:py-12 flex flex-col items-center text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#064E3B]/80 border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.4)]">
              <Award className="w-8 h-8 text-[#D4AF37]" />
            </div>

            <h3 className="font-title text-xl sm:text-2xl md:text-3xl font-bold text-gold-gradient">
              {t.completionTitle}
            </h3>

            <p className="max-w-xl text-xs sm:text-sm text-[#D8D4C5]/90 leading-relaxed font-light">
              {t.completionSubtitle}
            </p>

            {/* Completion Hadith snippet */}
            <div className="max-w-xl p-4 rounded-xl bg-[#064E3B]/20 border border-[#D4AF37]/30 text-xs text-[#E8D9A8] leading-relaxed italic">
              «إِنَّ لِلَّهِ تِسْعَةً وَتِسْعِينَ اسْمًا، مِائَةً إِلَّا وَاحِدًا، مَنْ أَحْصَاهَا دَخَلَ الْجَنَّةَ»
              <br />
              <span className="text-[11px] text-[#D8D4C5]/70 not-italic block mt-1">
                “Indeed, Allah has ninety-nine names, one hundred minus one; whoever preserves them will enter Paradise.”
                (Sahih al-Bukhari & Muslim)
              </span>
            </div>

            {/* Completion Dua */}
            <div 
              dir="rtl"
              lang="ar"
              className="max-w-xl p-4 rounded-xl bg-[#101410] border border-[#D4AF37]/40 font-arabic text-base sm:text-lg text-[#F8F6EF] leading-loose shadow-inner"
            >
              {t.completionDua}
            </div>

            {/* Return to Name 1 button */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  setShowCompletion(false);
                  onNavigate(1);
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5E6B3] to-[#D4AF37] text-[#101410] font-title font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.restartFromBeginning}</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-[#141A14] border border-[#D4AF37]/40 text-[#D4AF37] hover:text-[#F8F6EF] font-title text-xs uppercase tracking-wider transition-all"
              >
                {t.backToAllNames}
              </button>
            </div>
          </div>
        ) : (
          /* STANDARD NAME DETAIL VIEW */
          <div className="flex flex-col items-center">
            {/* Serial Number in Small Gold Lettering */}
            <div className="flex items-center gap-2 mb-2">
              <span className="font-title text-xs sm:text-sm font-bold text-[#D4AF37] tracking-widest uppercase">
                {t.serialNumber} {String(name.id).padStart(2, '0')}
              </span>
              <span className="text-xs text-[#D4AF37]/50">•</span>
              <span className="text-xs text-[#D8D4C5]/70 uppercase font-title tracking-wider">
                {name.category}
              </span>
            </div>

            {/* SUBTLE GOLD FRAME AROUND MAIN NAME */}
            <div className="relative w-full max-w-md py-6 sm:py-8 px-6 my-2 rounded-2xl bg-gradient-to-b from-[#064E3B]/25 via-[#101410]/80 to-[#0B3D2E]/20 border border-[#D4AF37]/40 flex flex-col items-center text-center shadow-[0_0_30px_rgba(212,175,55,0.08)]">
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]" />

              {/* GIANT ARABIC NAME (LARGEST ELEMENT) */}
              <h1 
                id="modal-title"
                dir="rtl"
                lang="ar"
                className="font-arabic text-5xl sm:text-7xl md:text-8xl text-gold-gradient font-bold tracking-normal leading-tight my-2 drop-shadow-[0_4px_20px_rgba(212,175,55,0.3)] select-text"
              >
                {name.arabic}
              </h1>

              {/* English Transliteration below Arabic */}
              <h2 className="font-title text-lg sm:text-2xl text-[#F8F6EF] font-bold tracking-widest uppercase mt-2">
                {name.englishTransliteration}
              </h2>

              {/* Tamil Transliteration */}
              <h3 className="font-tamil text-sm sm:text-base text-[#E8D9A8] mt-1 font-medium">
                {name.tamilTransliteration}
              </h3>

              {/* Scholarly Arabic Transliteration */}
              <span className="text-xs text-[#D8D4C5]/60 italic mt-0.5 font-light">
                {name.transliteration}
              </span>

              {/* Audio Pronunciation Button */}
              <button
                onClick={speakArabicName}
                aria-label={t.listenPronunciation}
                className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                  isPlayingAudio
                    ? 'bg-[#064E3B] border-[#D4AF37] text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                    : 'bg-[#101410] border-[#D4AF37]/30 text-[#D8D4C5] hover:text-[#D4AF37] hover:border-[#D4AF37]'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <Volume2 className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                    <span>{t.playingAudio}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>{t.listenPronunciation}</span>
                  </>
                )}
              </button>
            </div>

            {/* THREE-LANGUAGE MEANINGS SECTIONS */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 my-5">
              {/* 1. English Meaning */}
              <div className="p-4 rounded-xl bg-[#141A14]/90 border border-[#D4AF37]/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-title font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>{t.englishMeaningLabel}</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#F8F6EF] font-medium leading-snug">
                    {name.meaningEnglish}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-[#D4AF37]/10 text-xs text-[#D8D4C5]/80 font-light leading-relaxed">
                  {name.description.en}
                </div>
              </div>

              {/* 2. Tamil Meaning */}
              <div className="p-4 rounded-xl bg-[#141A14]/90 border border-[#D4AF37]/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#D4AF37] font-tamil mb-2">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>{t.tamilMeaningLabel}</span>
                  </div>
                  <p className="font-tamil text-sm sm:text-base text-[#F8F6EF] font-medium leading-snug">
                    {name.meaningTamil}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-[#D4AF37]/10 font-tamil text-xs text-[#D8D4C5]/80 font-light leading-relaxed">
                  {name.description.ta}
                </div>
              </div>

              {/* 3. Arabic Explanation with proper RTL layout */}
              <div 
                dir="rtl"
                lang="ar"
                className="p-4 rounded-xl bg-[#141A14]/90 border border-[#D4AF37]/20 flex flex-col justify-between text-right"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#D4AF37] font-arabic mb-2">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>{t.arabicMeaningLabel}</span>
                  </div>
                  <p className="font-arabic text-base sm:text-lg text-[#F8F6EF] font-medium leading-relaxed">
                    {name.meaningArabic}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-[#D4AF37]/10 font-arabic text-xs sm:text-sm text-[#D8D4C5]/80 font-light leading-relaxed">
                  {name.description.ar}
                </div>
              </div>
            </div>

            {/* QURANIC REFERENCE SECTION */}
            <div className="w-full p-4 rounded-xl bg-[#064E3B]/20 border border-[#D4AF37]/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#064E3B]/50 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-title text-[#D4AF37] uppercase tracking-wider block">
                    {t.quranReferenceLabel}
                  </span>
                  <span className="text-xs sm:text-sm text-[#F8F6EF] font-medium">
                    {name.quranReference}
                  </span>
                </div>
              </div>

              {name.quranAyahSnippet && (
                <div 
                  dir="rtl" 
                  lang="ar" 
                  className="font-arabic text-sm sm:text-base text-[#E8D9A8] shrink-0 max-w-xs sm:max-w-md px-3 py-1 rounded bg-[#101410]/70 border border-[#D4AF37]/20"
                >
                  «{name.quranAyahSnippet}»
                </div>
              )}
            </div>

            {/* NAVIGATION BAR: PREVIOUS & NEXT NAME */}
            <div className="w-full flex items-center justify-between gap-2 pt-4 border-t border-[#D4AF37]/20">
              {/* Previous Name Button */}
              {prevName ? (
                <button
                  onClick={handlePrevious}
                  className="group flex items-center gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#141A14] border border-[#D4AF37]/30 text-[#D8D4C5] hover:text-[#F8F6EF] hover:border-[#D4AF37] transition-all text-xs font-title font-semibold tracking-wider"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#D4AF37]" />
                  <div className="text-left hidden sm:block">
                    <span className="text-[9px] text-[#D4AF37] block leading-none">{t.previousName}</span>
                    <span className="text-xs">{prevName.englishTransliteration}</span>
                  </div>
                  <span className="sm:hidden">{t.previousName}</span>
                </button>
              ) : (
                <div className="w-24 sm:w-36" />
              )}

              {/* Center Quick Jump / Serial */}
              <div className="text-center">
                <span className="text-[11px] text-[#D8D4C5]/60 font-title tracking-wider block">
                  Use ← and → arrow keys to browse
                </span>
              </div>

              {/* Prominent Next Name Button */}
              <button
                onClick={handleNext}
                className="group flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5E6B3] to-[#D4AF37] text-[#101410] font-title font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="text-right hidden sm:block">
                  <span className="text-[9px] text-[#064E3B] font-bold block leading-none">{t.nextName}</span>
                  <span className="text-xs text-[#101410] font-extrabold">
                    {nextName ? nextName.englishTransliteration : 'Completion'}
                  </span>
                </div>
                <span className="sm:hidden">{t.nextName}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
