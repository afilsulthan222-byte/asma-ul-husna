export type Language = 'en' | 'ta' | 'ar';

export type Category = 
  | 'all'
  | 'mercy'
  | 'majesty'
  | 'creation'
  | 'knowledge'
  | 'power'
  | 'provision'
  | 'forgiveness';

export interface LocalizedText {
  en: string;
  ta: string;
  ar: string;
}

export interface AsmaName {
  id: number;
  arabic: string;
  transliteration: string;
  englishTransliteration: string;
  tamilTransliteration: string;
  meaningArabic: string;
  meaningEnglish: string;
  meaningTamil: string;
  description: LocalizedText;
  quranReference: string;
  quranAyahSnippet?: string;
  category: Category;
}

export interface UserProgress {
  visitedIds: number[];
  favouriteIds: number[];
  lastVisitedId: number;
  learnedIds: number[];
}
