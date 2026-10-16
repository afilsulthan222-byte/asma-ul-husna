import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AyatKursiScreen } from './components/AyatKursiScreen';
import { Navbar } from './components/Navbar';
import { FeaturedHero } from './components/FeaturedHero';
import { NamesGrid } from './components/NamesGrid';
import { NameDetailModal } from './components/NameDetailModal';
import { Footer } from './components/Footer';
import { ASMA_NAMES } from './data/namesData';
import type { Language, UserProgress } from './types';

const STORAGE_KEY = 'asmaul-husna-progress-v1';

const DEFAULT_PROGRESS: UserProgress = {
  visitedIds: [],
  favouriteIds: [],
  lastVisitedId: 0,
  learnedIds: [],
};

const loadProgress = (): UserProgress => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_PROGRESS;
};

const saveProgress = (progress: UserProgress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    /* ignore */
  }
};

const LANG_KEY = 'asmaul-husna-lang-v1';

const App: React.FC = () => {
  // ─── Phase ──────────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<'intro' | 'main'>(() => {
    try {
      return localStorage.getItem('asmaul-husna-seen-intro') === '1' ? 'main' : 'intro';
    } catch {
      return 'intro';
    }
  });

  // ─── Language ────────────────────────────────────────────────────────────────
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY) as Language | null;
      return (saved && ['en', 'ta', 'ar'].includes(saved)) ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  // ─── Progress ────────────────────────────────────────────────────────────────
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  // ─── Modal State ─────────────────────────────────────────────────────────────
  const [selectedNameId, setSelectedNameId] = useState<number | null>(null);

  // ─── Filters & View ──────────────────────────────────────────────────────────
  const [showingOnlyFavourites, setShowingOnlyFavourites] = useState(false);
  const [showAyatKursi, setShowAyatKursi] = useState(false);

  // ─── Refs ────────────────────────────────────────────────────────────────────
  const namesGridRef = useRef<HTMLDivElement>(null);

  // Persist progress whenever it changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Persist language
  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, currentLang);
    } catch {
      /* ignore */
    }
  }, [currentLang]);

  // ─── Handlers ────────────────────────────────────────────────────────────────

  const handleEnterMain = useCallback(() => {
    setPhase('main');
    try {
      localStorage.setItem('asmaul-husna-seen-intro', '1');
    } catch { /* ignore */ }
  }, []);

  const handleSelectName = useCallback((id: number) => {
    setSelectedNameId(id);
    // Mark as visited
    setProgress((prev) => {
      const visitedIds = prev.visitedIds.includes(id)
        ? prev.visitedIds
        : [...prev.visitedIds, id];
      return { ...prev, visitedIds, lastVisitedId: id };
    });
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedNameId(null);
  }, []);

  const handleNavigate = useCallback((id: number) => {
    setSelectedNameId(id);
    setProgress((prev) => {
      const visitedIds = prev.visitedIds.includes(id)
        ? prev.visitedIds
        : [...prev.visitedIds, id];
      return { ...prev, visitedIds, lastVisitedId: id };
    });
  }, []);

  const handleToggleFavourite = useCallback((id: number) => {
    setProgress((prev) => {
      const favouriteIds = prev.favouriteIds.includes(id)
        ? prev.favouriteIds.filter((fid) => fid !== id)
        : [...prev.favouriteIds, id];
      return { ...prev, favouriteIds };
    });
  }, []);

  const handleToggleLearned = useCallback((id: number) => {
    setProgress((prev) => {
      const learnedIds = prev.learnedIds.includes(id)
        ? prev.learnedIds.filter((lid) => lid !== id)
        : [...prev.learnedIds, id];
      return { ...prev, learnedIds };
    });
  }, []);

  const handleScrollToNames = useCallback(() => {
    namesGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // ─── Computed ─────────────────────────────────────────────────────────────────

  const selectedName = selectedNameId
    ? ASMA_NAMES.find((n) => n.id === selectedNameId) ?? null
    : null;

  // Featured Name of Day: cycles daily based on date
  const featuredName = (() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000
    );
    return ASMA_NAMES[dayOfYear % 99];
  })();

  // ─── Intro / Ayat al-Kursi Overlay ────────────────────────────────────────────
  if (phase === 'intro' || showAyatKursi) {
    return (
      <AyatKursiScreen
        onEnter={() => {
          setShowAyatKursi(false);
          handleEnterMain();
        }}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
      />
    );
  }

  // ─── Main App ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#101410] bg-islamic-pattern text-[#F8F6EF]">
      {/* Sticky Navigation Bar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        favouriteCount={progress.favouriteIds.length}
        learnedCount={progress.learnedIds.length}
        lastVisitedId={progress.lastVisitedId}
        onOpenName={handleSelectName}
        onOpenAyatKursi={() => setShowAyatKursi(true)}
        onFilterFavourites={() => setShowingOnlyFavourites((v) => !v)}
        showingOnlyFavourites={showingOnlyFavourites}
      />

      {/* Featured Hero Section */}
      <FeaturedHero
        currentLang={currentLang}
        featuredName={featuredName}
        onSelectName={handleSelectName}
        onExploreClick={handleScrollToNames}
        exploredCount={progress.visitedIds.length}
        favouriteCount={progress.favouriteIds.length}
        isFavourite={progress.favouriteIds.includes(featuredName.id)}
        onToggleFavourite={handleToggleFavourite}
      />

      {/* Thin golden divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      </div>

      {/* 99 Names Collection Grid / List */}
      <div ref={namesGridRef}>
        <NamesGrid
          names={ASMA_NAMES}
          currentLang={currentLang}
          favouriteIds={progress.favouriteIds}
          visitedIds={progress.visitedIds}
          onToggleFavourite={handleToggleFavourite}
          onSelectName={handleSelectName}
          showingOnlyFavourites={showingOnlyFavourites}
          onClearFavouritesFilter={() => setShowingOnlyFavourites(false)}
        />
      </div>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onOpenAyatKursi={() => setShowAyatKursi(true)}
        onExploreNames={handleScrollToNames}
      />

      {/* Name Detail Modal (Portal-like full-screen overlay) */}
      {selectedName && (
        <NameDetailModal
          name={selectedName}
          allNames={ASMA_NAMES}
          currentLang={currentLang}
          isFavourite={progress.favouriteIds.includes(selectedName.id)}
          isLearned={progress.learnedIds.includes(selectedName.id)}
          onToggleFavourite={handleToggleFavourite}
          onToggleLearned={handleToggleLearned}
          onClose={handleCloseModal}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
};

export default App;
