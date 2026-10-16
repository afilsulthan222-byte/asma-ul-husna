import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Heart, 
  CheckCircle, 
  Volume2, 
  Grid3X3, 
  List
} from 'lucide-react';
import type { AsmaName, Category, Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface NamesGridProps {
  names: AsmaName[];
  currentLang: Language;
  favouriteIds: number[];
  visitedIds: number[];
  onToggleFavourite: (id: number) => void;
  onSelectName: (id: number) => void;
  showingOnlyFavourites: boolean;
  onClearFavouritesFilter: () => void;
}

export const NamesGrid: React.FC<NamesGridProps> = ({
  names,
  currentLang,
  favouriteIds,
  visitedIds,
  onToggleFavourite,
  onSelectName,
  showingOnlyFavourites,
  onClearFavouritesFilter
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [jumpNumber, setJumpNumber] = useState<string>('');

  const t = UI_TRANSLATIONS[currentLang];

  // Filter names based on search query, category, and favourites filter
  const filteredNames = useMemo(() => {
    return names.filter((name) => {
      // 1. Favourites only filter
      if (showingOnlyFavourites && !favouriteIds.includes(name.id)) {
        return false;
      }

      // 2. Category filter
      if (selectedCategory !== 'all' && name.category !== selectedCategory) {
        return false;
      }

      // 3. Search query filter
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();

      // Check serial ID
      if (String(name.id) === q || `#${name.id}` === q) return true;

      // Check Arabic
      if (name.arabic.includes(q)) return true;

      // Check English transliteration & meaning
      if (name.englishTransliteration.toLowerCase().includes(q)) return true;
      if (name.meaningEnglish.toLowerCase().includes(q)) return true;
      if (name.transliteration.toLowerCase().includes(q)) return true;

      // Check Tamil transliteration & meaning
      if (name.tamilTransliteration.toLowerCase().includes(q)) return true;
      if (name.meaningTamil.toLowerCase().includes(q)) return true;

      // Check Quran reference
      if (name.quranReference.toLowerCase().includes(q)) return true;

      return false;
    });
  }, [names, searchQuery, selectedCategory, showingOnlyFavourites, favouriteIds]);

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: t.allCategories },
    { key: 'mercy', label: t.categoryMercy },
    { key: 'majesty', label: t.categoryMajesty },
    { key: 'creation', label: t.categoryCreation },
    { key: 'knowledge', label: t.categoryKnowledge },
    { key: 'power', label: t.categoryPower },
    { key: 'provision', label: t.categoryProvision },
    { key: 'forgiveness', label: t.categoryForgiveness },
  ];

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpNumber, 10);
    if (!isNaN(num) && num >= 1 && num <= 99) {
      onSelectName(num);
      setJumpNumber('');
    }
  };

  const speakArabic = (e: React.MouseEvent, arabic: string) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(arabic);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section id="names-collection" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#D4AF37]/25 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-title font-bold text-[#D4AF37] uppercase tracking-widest">
              COLLECTION OF 99 DIVINE NAMES
            </span>
            <span className="text-xs text-[#D8D4C5]/50">•</span>
            <span className="text-xs text-[#34D399] font-medium">
              {visitedIds.length} / 99 Explored
            </span>
          </div>
          <h2 className="font-title text-2xl sm:text-3xl md:text-4xl font-bold text-[#F8F6EF]">
            {showingOnlyFavourites ? t.categoryFavourites : t.siteTitleEn}
          </h2>
          <p className="font-tamil text-sm sm:text-base text-[#E8D9A8]/90 mt-1">
            {showingOnlyFavourites 
              ? `நீங்கள் விரும்பிய ${favouriteIds.length} திருநாமங்கள்` 
              : 'அரபு, தமிழ், ஆங்கில மொழிகளில் 99 அழகிய திருநாமங்களை ஆராயுங்கள்'}
          </p>
        </div>

        {/* View Mode & Jump to Number */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Jump to Number Input */}
          <form onSubmit={handleJumpSubmit} className="flex items-center bg-[#141A14] border border-[#D4AF37]/30 rounded-full pl-3 pr-1 py-1">
            <span className="text-xs text-[#D4AF37] font-title mr-1.5 font-semibold">#</span>
            <input
              type="number"
              min="1"
              max="99"
              value={jumpNumber}
              onChange={(e) => setJumpNumber(e.target.value)}
              placeholder="1-99"
              className="w-14 bg-transparent text-xs text-[#F8F6EF] outline-none placeholder-[#D8D4C5]/40"
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded-full bg-[#064E3B] text-[10px] font-title font-bold text-[#D4AF37] hover:bg-[#0B3D2E] transition-all"
            >
              Jump
            </button>
          </form>

          {/* Grid / List View Toggle */}
          <div className="flex items-center bg-[#141A14] border border-[#D4AF37]/30 rounded-full p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              aria-label={t.gridView}
              title={t.gridView}
              className={`p-2 rounded-full transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#064E3B] text-[#D4AF37] shadow-sm'
                  : 'text-[#D8D4C5]/60 hover:text-[#F8F6EF]'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              aria-label={t.listView}
              title={t.listView}
              className={`p-2 rounded-full transition-all ${
                viewMode === 'list'
                  ? 'bg-[#064E3B] text-[#D4AF37] shadow-sm'
                  : 'text-[#D8D4C5]/60 hover:text-[#F8F6EF]'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH BAR & FILTER ROW */}
      <div className="space-y-4 mb-8">
        {/* Real-time Search Input */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#D4AF37]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-[#141A14]/90 border border-[#D4AF37]/30 text-sm text-[#F8F6EF] placeholder-[#D8D4C5]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#D8D4C5]/60 hover:text-[#F8F6EF]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        {!showingOnlyFavourites && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-title tracking-wider whitespace-nowrap transition-all border ${
                  selectedCategory === cat.key
                    ? 'bg-[#064E3B] border-[#D4AF37] text-[#D4AF37] font-semibold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                    : 'bg-[#141A14]/80 border-[#D4AF37]/20 text-[#D8D4C5]/70 hover:text-[#F8F6EF] hover:border-[#D4AF37]/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Favourites Active Banner */}
        {showingOnlyFavourites && (
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs text-rose-300">
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4 fill-current text-rose-400" />
              <span>Showing {favouriteIds.length} saved favourite names</span>
            </span>
            <button
              onClick={onClearFavouritesFilter}
              className="underline text-[#D4AF37] font-title font-semibold hover:text-[#F8F6EF]"
            >
              Show All 99 Names
            </button>
          </div>
        )}
      </div>

      {/* RESULTS COUNT SUMMARY */}
      <div className="flex items-center justify-between text-xs text-[#D8D4C5]/60 mb-6">
        <span>
          Showing {filteredNames.length} of {names.length} Names
        </span>
        {searchQuery && (
          <span>
            Search query: &quot;{searchQuery}&quot;
          </span>
        )}
      </div>

      {/* EMPTY STATE IF NO RESULTS */}
      {filteredNames.length === 0 && (
        <div className="py-16 px-6 text-center rounded-3xl bg-[#141A14]/60 border border-[#D4AF37]/20 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-full bg-[#064E3B]/40 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mx-auto mb-4">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-title text-lg font-bold text-[#F8F6EF] mb-2">
            {t.noResultsTitle}
          </h3>
          <p className="text-xs text-[#D8D4C5]/80 leading-relaxed mb-6">
            {t.noResultsDesc}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              if (showingOnlyFavourites) onClearFavouritesFilter();
            }}
            className="px-6 py-2.5 rounded-full bg-[#064E3B] border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-title font-bold tracking-wider hover:bg-[#0B3D2E] transition-all"
          >
            {t.clearSearch}
          </button>
        </div>
      )}

      {/* VIEW MODE 1: GRID CARDS */}
      {viewMode === 'grid' && filteredNames.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredNames.map((name) => {
            const isFav = favouriteIds.includes(name.id);
            const isVisited = visitedIds.includes(name.id);

            return (
              <div
                key={name.id}
                onClick={() => onSelectName(name.id)}
                className="group relative p-5 rounded-2xl bg-gradient-to-br from-[#141A14] to-[#0E150F] border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.15)] hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                {/* Top Card Info Bar */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-title text-xs font-bold text-[#D4AF37] px-2 py-0.5 rounded-md bg-[#064E3B]/40 border border-[#D4AF37]/20">
                    #{String(name.id).padStart(2, '0')}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* Visited indicator */}
                    {isVisited && (
                      <span title="Explored">
                        <CheckCircle className="w-3.5 h-3.5 text-[#34D399]" />
                      </span>
                    )}

                    {/* Quick Pronunciation */}
                    <button
                      onClick={(e) => speakArabic(e, name.arabic)}
                      aria-label="Listen Pronunciation"
                      title="Pronounce"
                      className="p-1 rounded-full text-[#D8D4C5]/60 hover:text-[#D4AF37] transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Favourite button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavourite(name.id);
                      }}
                      aria-label="Toggle favourite"
                      className={`p-1 rounded-full transition-colors ${
                        isFav ? 'text-rose-400' : 'text-[#D8D4C5]/50 hover:text-rose-400'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Arabic Name Calligraphy (Prominent Element) */}
                <div 
                  dir="rtl" 
                  lang="ar" 
                  className="font-arabic text-3xl sm:text-4xl text-gold-gradient font-bold my-2 text-center select-text group-hover:scale-105 transition-transform duration-300"
                >
                  {name.arabic}
                </div>

                {/* English Transliteration */}
                <div className="text-center mt-1">
                  <h3 className="font-title text-sm sm:text-base font-bold text-[#F8F6EF] tracking-wider uppercase">
                    {name.englishTransliteration}
                  </h3>
                  {/* Tamil Transliteration */}
                  <div className="font-tamil text-xs text-[#E8D9A8] mt-0.5 font-medium">
                    {name.tamilTransliteration}
                  </div>
                </div>

                {/* Meanings */}
                <div className="mt-4 pt-3 border-t border-[#D4AF37]/15 space-y-1">
                  <p className="text-xs text-[#D8D4C5] font-medium line-clamp-1">
                    {name.meaningEnglish}
                  </p>
                  <p className="font-tamil text-xs text-[#D4AF37]/90 font-light line-clamp-1">
                    {name.meaningTamil}
                  </p>
                </div>

                {/* Bottom subtle indicator */}
                <div className="mt-3 flex items-center justify-between text-[10px] text-[#D8D4C5]/50">
                  <span className="capitalize">{name.category}</span>
                  <span className="text-[#D4AF37] group-hover:underline">View details →</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW MODE 2: COMPACT LIST VIEW */}
      {viewMode === 'list' && filteredNames.length > 0 && (
        <div className="flex flex-col gap-2.5">
          {filteredNames.map((name) => {
            const isFav = favouriteIds.includes(name.id);
            const isVisited = visitedIds.includes(name.id);

            return (
              <div
                key={name.id}
                onClick={() => onSelectName(name.id)}
                className="group p-4 rounded-xl bg-[#141A14] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
              >
                <div className="flex items-center gap-3">
                  <span className="font-title text-xs font-bold text-[#D4AF37] px-2 py-1 rounded bg-[#064E3B]/40 border border-[#D4AF37]/20 shrink-0">
                    #{String(name.id).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-title text-sm sm:text-base font-bold text-[#F8F6EF] tracking-wider uppercase">
                        {name.englishTransliteration}
                      </h3>
                      <span className="font-tamil text-xs text-[#E8D9A8]">
                        {name.tamilTransliteration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#D8D4C5]/80 mt-0.5">
                      <span>{name.meaningEnglish}</span>
                      <span>•</span>
                      <span className="font-tamil text-[#D4AF37]">{name.meaningTamil}</span>
                    </div>
                  </div>
                </div>

                {/* Right side: Arabic name & Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                  <div dir="rtl" lang="ar" className="font-arabic text-2xl sm:text-3xl text-gold-gradient font-bold">
                    {name.arabic}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isVisited && (
                      <span title="Explored">
                        <CheckCircle className="w-3.5 h-3.5 text-[#34D399]" />
                      </span>
                    )}
                    <button
                      onClick={(e) => speakArabic(e, name.arabic)}
                      aria-label="Listen Pronunciation"
                      title="Pronounce"
                      className="p-1.5 rounded-full text-[#D8D4C5]/60 hover:text-[#D4AF37] transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavourite(name.id);
                      }}
                      aria-label="Toggle favourite"
                      className={`p-1.5 rounded-full transition-colors ${
                        isFav ? 'text-rose-400' : 'text-[#D8D4C5]/50 hover:text-rose-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
