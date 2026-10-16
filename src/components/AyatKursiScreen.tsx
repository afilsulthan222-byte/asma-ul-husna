import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Globe2, ChevronDown } from 'lucide-react';
import type { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface AyatKursiScreenProps {
  onEnter: () => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const AyatKursiScreen: React.FC<AyatKursiScreenProps> = ({
  onEnter,
  currentLang,
  onLanguageChange
}) => {
  const [showTranslations, setShowTranslations] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const t = UI_TRANSLATIONS[currentLang];
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Verified Ayat al-Kursi audio from a reliable public Quran CDN (Mishary Rashid Alafasy - Surah 2 Ayah 255)
  const audioUrl = "https://cdn.islamic.network/quran/audio/128/ar.alafasy/262.mp3";

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlayingAudio(false);
      audioRef.current.onerror = () => setIsPlayingAudio(false);
    }

    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(() => {
        setIsPlayingAudio(false);
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#101410] bg-islamic-pattern flex flex-col items-center justify-between p-4 sm:p-6 md:p-10 select-none overflow-y-auto">
      {/* Background radial ambient lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#064E3B]/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-3xl h-80 bg-[#D4AF37]/10 blur-[100px] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-between pb-6 border-b border-[#D4AF37]/20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#064E3B]/60 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <span className="text-base select-none">۞</span>
          </div>
          <div>
            <span className="font-arabic text-lg sm:text-xl text-[#F8F6EF] tracking-wide block leading-none">
              أَسْمَاءُ اللَّهِ الْحُسْنَى
            </span>
            <span className="text-[11px] sm:text-xs text-[#D4AF37]/90 uppercase tracking-widest block mt-1 font-title">
              The 99 Beautiful Names of Allah
            </span>
          </div>
        </div>

        {/* Language selector & Audio toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Optional Audio Button */}
          <button
            onClick={toggleAudio}
            aria-label="Toggle Ayat al-Kursi Recitation Audio"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
              isPlayingAudio 
                ? 'bg-[#064E3B] border-[#D4AF37] text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                : 'bg-[#141A14]/80 border-[#D4AF37]/30 text-[#F8F6EF]/80 hover:text-[#D4AF37] hover:border-[#D4AF37]/60'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                <span className="hidden sm:inline">Playing Recitation</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Recitation Audio</span>
              </>
            )}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-[#141A14]/90 border border-[#D4AF37]/30 rounded-full p-0.5 text-xs">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-full transition-all ${
                currentLang === 'en'
                  ? 'bg-[#064E3B] text-[#D4AF37] font-semibold shadow-sm'
                  : 'text-[#F8F6EF]/70 hover:text-[#F8F6EF]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('ta')}
              className={`px-2.5 py-1 rounded-full font-tamil transition-all ${
                currentLang === 'ta'
                  ? 'bg-[#064E3B] text-[#D4AF37] font-semibold shadow-sm'
                  : 'text-[#F8F6EF]/70 hover:text-[#F8F6EF]'
              }`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => onLanguageChange('ar')}
              className={`px-2.5 py-1 rounded-full font-arabic transition-all ${
                currentLang === 'ar'
                  ? 'bg-[#064E3B] text-[#D4AF37] font-semibold shadow-sm'
                  : 'text-[#F8F6EF]/70 hover:text-[#F8F6EF]'
              }`}
            >
              العربية
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-4xl my-auto py-8 sm:py-12 flex flex-col items-center text-center">
        {/* Main Title Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#064E3B]/40 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-title tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ASMA UL HUSNA DIGITAL SANCTUARY</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        {/* Big Arabic Header */}
        <h1 className="font-arabic text-3xl sm:text-5xl md:text-6xl text-gold-gradient font-bold tracking-wide mb-2 drop-shadow-[0_2px_15px_rgba(212,175,55,0.25)]">
          أَسْمَاءُ اللَّهِ الْحُسْنَى
        </h1>

        {/* English Title */}
        <h2 className="font-title text-base sm:text-xl md:text-2xl text-[#F8F6EF] tracking-wider uppercase font-semibold mb-1">
          THE 99 BEAUTIFUL NAMES OF ALLAH
        </h2>

        {/* Tamil Title */}
        <h3 className="font-tamil text-sm sm:text-base md:text-lg text-[#E8D9A8]/90 mb-3">
          அல்லாஹ்வின் 99 அழகிய திருநாமங்கள்
        </h3>

        {/* Subtitle */}
        <p className="max-w-2xl text-xs sm:text-sm text-[#D8D4C5]/80 mb-8 font-light leading-relaxed">
          {t.welcomeSubtitle}
        </p>

        {/* AYAT AL-KURSI LUXURY FRAME */}
        <div className="relative w-full max-w-3xl p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#141A14]/95 via-[#0D150F]/90 to-[#101410]/95 border border-[#D4AF37]/40 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.12)]">
          {/* Ornamental Four Corners */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]" />

          {/* Bismillah Header */}
          <div className="font-arabic text-lg sm:text-2xl text-[#E8D9A8] mb-6 tracking-wide drop-shadow-sm select-text">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>

          {/* Exact Ayat al-Kursi Arabic Text - Preserving full diacritics, word order, and stops */}
          <div
            dir="rtl"
            lang="ar"
            className="font-arabic text-xl sm:text-2xl md:text-3xl text-[#F8F6EF] ayat-calligraphy leading-[2.2] sm:leading-[2.4] text-center select-text"
          >
            اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ
            لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ
            لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ
            مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ
            يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ
            وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ
            وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ
            وَلَا يَئُودُهُ حِفْظُهُمَا ۚ
            وَهُوَ الْعَلِيُّ الْعَظِيمُ
          </div>

          {/* Verse Label & Surah Reference */}
          <div className="mt-6 pt-5 border-t border-[#D4AF37]/20 flex flex-col items-center">
            <span className="font-arabic text-base sm:text-lg text-[#D4AF37] font-semibold">
              آيَةُ الْكُرْسِيِّ
            </span>
            <span className="text-xs sm:text-sm text-[#E8D9A8]/90 font-title tracking-wider mt-0.5">
              Ayat al-Kursi | The Throne Verse
            </span>
            <span className="text-[11px] text-[#D8D4C5]/60 mt-1">
              Surah Al-Baqarah (سُورَةُ الْبَقَرَةِ) 2:255
            </span>

            {/* Toggle Translations Button */}
            <button
              onClick={() => setShowTranslations(!showTranslations)}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#F8F6EF] transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{showTranslations ? 'Hide Translations' : 'Read English & Tamil Translations'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showTranslations ? 'rotate-180' : ''}`} />
            </button>

            {/* Collapsible English & Tamil Meanings */}
            {showTranslations && (
              <div className="mt-5 w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-left p-4 rounded-xl bg-[#101410]/80 border border-[#D4AF37]/20 animate-fadeIn">
                {/* English */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                    <Globe2 className="w-3.5 h-3.5" />
                    <span>English Translation</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F8F6EF]/90 leading-relaxed font-light">
                    “Allah! There is no deity except Him, the Ever-Living, the Sustainer of [all] existence. 
                    Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens 
                    and whatever is on the earth. Who is it that can intercede with Him except by His permission? 
                    He knows what is [presently] before them and what will be after them, and they encompass 
                    not a thing of His knowledge except for what He wills. His Kursi extends over the heavens 
                    and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.”
                  </p>
                </div>

                {/* Tamil */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] font-tamil">
                    <Globe2 className="w-3.5 h-3.5" />
                    <span>தமிழ்க் கருத்து (Surah 2:255)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F8F6EF]/90 leading-relaxed font-tamil font-light">
                    “அல்லாஹ் — அவனைத்தவிர வணக்கத்திற்குரிய இறைவன் வேறு யாருமில்லை; அவன் என்றென்றும் உயிருடன் இருப்பவன்; 
                    அனைத்தையும் நிலைநிறுத்துபவன்; அவனுக்குச் சிறுதூக்கமும் பிடிக்காது; ஆழ்ந்த தூக்கமும் பிடிக்காது; 
                    வானங்களிலுள்ளவையும் பூமியிலுள்ளவையும் அவனுக்கே உரியவை; அவனது அனுமதியின்றி அவனிடம் யார் பரிந்துரைக்க முடியும்? 
                    அவர்களுக்கு முன்னுள்ளவற்றையும் அவர்களுக்குப் பின்னுள்ளவற்றையும் அவன் நன்கறிவான்; 
                    அவன் நாடியதைத் தவிர அவனுடைய ஞானத்திலிருந்து எதையும் அவர்களால் அறிய முடியாது; 
                    அவனுடைய அரியணை (குர்ஸிய்யு) வானங்களையும் பூமியையும் விட விசாலமானது; 
                    அவ்விரண்டையும் பாதுகாப்பது அவனுக்கு எவ்விதச் சிரமத்தையும் தருவதில்லை; 
                    அவன் மிக உயர்ந்தவன், கண்ணியமிக்க மகத்தானவன்.”
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enter CTA Button */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3">
          <button
            onClick={onEnter}
            className="group relative px-8 sm:px-12 py-4 sm:py-5 rounded-full font-title text-sm sm:text-base font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.25)] hover:shadow-[0_0_45px_rgba(212,175,55,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 bg-gradient-to-r from-[#D4AF37] via-[#F5E6B3] to-[#D4AF37] text-[#101410] border border-[#FFF1C5]"
          >
            <span className="relative z-10 flex items-center gap-3">
              <span>{t.enterButton}</span>
              <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
            </span>
          </button>
          <span className="text-[11px] text-[#D8D4C5]/60 tracking-wider">
            Explore with complete transliterations, verified translations & audio
          </span>
        </div>
      </main>

      {/* Subtle Footer Note */}
      <footer className="relative z-10 w-full max-w-5xl pt-4 border-t border-[#D4AF37]/15 text-center text-[11px] text-[#D8D4C5]/50 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>أَسْمَاءُ اللَّهِ الْحُسْنَى • The 99 Beautiful Names of Allah • அல்லாஹ்வின் 99 அழகிய திருநாமங்கள்</span>
        <button
          onClick={onEnter}
          className="text-[#D4AF37] hover:underline"
        >
          Skip Intro →
        </button>
      </footer>
    </div>
  );
};
