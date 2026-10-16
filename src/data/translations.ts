import type { Language } from '../types';

export interface TranslationDictionary {
  siteTitleAr: string;
  siteTitleEn: string;
  siteTitleTa: string;
  subtitle: string;
  welcomeSubtitle: string;
  enterButton: string;
  returnToKursi: string;
  exploreButton: string;
  continueReading: string;
  nameOfTheDay: string;
  nameOfTheDayDesc: string;
  progressTitle: string;
  progressDesc: string;
  searchPlaceholder: string;
  noResultsTitle: string;
  noResultsDesc: string;
  clearSearch: string;
  allCategories: string;
  categoryMercy: string;
  categoryMajesty: string;
  categoryCreation: string;
  categoryKnowledge: string;
  categoryPower: string;
  categoryProvision: string;
  categoryForgiveness: string;
  categoryFavourites: string;
  previousName: string;
  nextName: string;
  backToAllNames: string;
  serialNumber: string;
  arabicName: string;
  transliterationLabel: string;
  englishMeaningLabel: string;
  tamilMeaningLabel: string;
  arabicMeaningLabel: string;
  reflectionLabel: string;
  quranReferenceLabel: string;
  listenPronunciation: string;
  playingAudio: string;
  addToFavourites: string;
  removeFromFavourites: string;
  markAsLearned: string;
  learnedStatus: string;
  jumpToNumber: string;
  gridView: string;
  listView: string;
  totalNames: string;
  favouriteNames: string;
  learnedNames: string;
  completionTitle: string;
  completionSubtitle: string;
  completionDua: string;
  restartFromBeginning: string;
  copyDetails: string;
  copiedNotice: string;
  footerAboutTitle: string;
  footerAboutText: string;
  footerSourcesTitle: string;
  footerSourcesList: string[];
  footerDisclaimer: string;
  backToTop: string;
  throneVerseTitle: string;
  throneVerseSubtitle: string;
}

export const UI_TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    siteTitleAr: "أَسْمَاءُ اللَّهِ الْحُسْنَى",
    siteTitleEn: "The 99 Beautiful Names of Allah",
    siteTitleTa: "அல்லாஹ்வின் 99 அழகிய திருநாமங்கள்",
    subtitle: "Discover the Beautiful Names of Allah and reflect upon their meanings in Arabic, Tamil, and English.",
    welcomeSubtitle: "Discover the Beautiful Names of Allah and reflect upon their meanings in Arabic, Tamil, and English.",
    enterButton: "ENTER THE WORLD OF ASMA UL HUSNA",
    returnToKursi: "Ayat al-Kursi",
    exploreButton: "Explore the 99 Names",
    continueReading: "Continue Where You Left Off",
    nameOfTheDay: "Name of the Day",
    nameOfTheDayDesc: "Contemplate this divine attribute today and bring its essence into your prayers and daily life.",
    progressTitle: "Your Reflection Progress",
    progressDesc: "names explored and contemplated",
    searchPlaceholder: "Search by Arabic, English, Tamil, or serial number (1-99)...",
    noResultsTitle: "No matching names found",
    noResultsDesc: "Try searching with a different spelling, English meaning, Tamil word, or number between 1 and 99.",
    clearSearch: "Clear Search",
    allCategories: "All 99 Names",
    categoryMercy: "Mercy & Grace",
    categoryMajesty: "Majesty & Glory",
    categoryCreation: "Creation & Life",
    categoryKnowledge: "Knowledge & Wisdom",
    categoryPower: "Power & Justice",
    categoryProvision: "Provision & Sustenance",
    categoryForgiveness: "Forgiveness & Clemency",
    categoryFavourites: "Favourites",
    previousName: "PREVIOUS NAME",
    nextName: "NEXT NAME",
    backToAllNames: "BACK TO ALL NAMES",
    serialNumber: "Number",
    arabicName: "Arabic Calligraphy",
    transliterationLabel: "Transliteration",
    englishMeaningLabel: "English Meaning",
    tamilMeaningLabel: "Tamil Meaning (பொருள்)",
    arabicMeaningLabel: "Arabic Explanation (المعنى)",
    reflectionLabel: "Spiritual Reflection & Significance",
    quranReferenceLabel: "Quranic Reference",
    listenPronunciation: "Listen Pronunciation",
    playingAudio: "Pronouncing...",
    addToFavourites: "Add to Favourites",
    removeFromFavourites: "Remove Favourite",
    markAsLearned: "Mark as Reflected",
    learnedStatus: "Contemplated",
    jumpToNumber: "Jump to Name #",
    gridView: "Grid View",
    listView: "List View",
    totalNames: "Total Names",
    favouriteNames: "Saved Favourites",
    learnedNames: "Contemplated",
    completionTitle: "Mabruk! You have explored all 99 Divine Names",
    completionSubtitle: "May Allah illuminate your heart, answer your prayers through His Beautiful Names, and grant you closeness to Him.",
    completionDua: "اللَّهُمَّ إِنِّي أَسْأَلُكَ بِأَنَّ لَكَ الْحَمْدَ، لَا إِلَٰهَ إِلَّا أَنْتَ الْمَنَّانُ، بَدِيعُ السَّمَاوَاتِ وَالْأَرْضِ، يَا ذَا الْجَلَالِ وَالْإِكْرَامِ، يَا حَيُّ يَا قَيُّومُ",
    restartFromBeginning: "Return to Name 1 (Ar-Rahman)",
    copyDetails: "Copy Details",
    copiedNotice: "Copied to clipboard!",
    footerAboutTitle: "About Asma ul Husna",
    footerAboutText: "A dedicated digital sanctuary crafted to honor the 99 Beautiful Names of Allah, enabling Muslims and seekers around the world to study, reflect upon, and remember the Divine Attributes in Arabic, Tamil, and English.",
    footerSourcesTitle: "Authentic Sources & Scholarly References",
    footerSourcesList: [
      "The Holy Quran (Direct Ayat & Revelations)",
      "Sahih al-Bukhari (Hadith 2736, 7392)",
      "Sahih Muslim (Hadith 2677)",
      "Sunan at-Tirmidhi (Hadith 3507)",
      "Al-Maqsad Al-Asna by Imam Abu Hamid Al-Ghazali",
      "Tafsir Ibn Kathir"
    ],
    footerDisclaimer: "Translations and transliterations in English and Tamil are provided solely to aid human reflection and understanding. Human language cannot capture every divine nuance of the Arabic original.",
    backToTop: "Back to Top",
    throneVerseTitle: "آيَةُ الْكُرْسِيِّ",
    throneVerseSubtitle: "Ayat al-Kursi | The Throne Verse (Surah Al-Baqarah 2:255)"
  },
  ta: {
    siteTitleAr: "أَسْمَاءُ اللَّهِ الْحُسْنَى",
    siteTitleEn: "The 99 Beautiful Names of Allah",
    siteTitleTa: "அல்லாஹ்வின் 99 அழகிய திருநாமங்கள்",
    subtitle: "அல்லாஹ்வின் அழகிய திருநாமங்களை அறிந்து, அவற்றின் ஆழமான அர்த்தங்களை அரபு, தமிழ், ஆங்கில மொழிகளில் தியானியுங்கள்.",
    welcomeSubtitle: "அல்லாஹ்வின் அழகிய திருநாமங்களை அறிந்து, அவற்றின் ஆழமான அர்த்தங்களை அரபு, தமிழ், ஆங்கில மொழிகளில் தியானியுங்கள்.",
    enterButton: "அஸ்மாவுல் ஹுஸ்னாவின் உலகிற்குள் நுழையுங்கள்",
    returnToKursi: "ஆயத்துல் குர்ஸிய்யு",
    exploreButton: "99 திருநாமங்களையும் ஆராயுங்கள்",
    continueReading: "முன்பு விட்ட இடத்திலிருந்து தொடருங்கள்",
    nameOfTheDay: "இன்றைய சிறப்பு திருநாமம்",
    nameOfTheDayDesc: "இன்றைய நாளில் இந்த இறைப் பண்பை ஆழ்ந்து சிந்தித்து, உங்கள் பிரார்த்தனைகளிலும் வாழ்க்கையிலும் கடைப்பிடியுங்கள்.",
    progressTitle: "உங்கள் கற்றல் முன்னேற்றம்",
    progressDesc: "திருநாமங்கள் ஆராயப்பட்டு தியானிக்கப்பட்டுள்ளன",
    searchPlaceholder: "அரபு, தமிழ், ஆங்கிலம் அல்லது எண் (1-99) மூலம் தேடுங்கள்...",
    noResultsTitle: "பொருத்தமான திருநாமங்கள் கிடைக்கவில்லை",
    noResultsDesc: "வேறு எழுத்துக்களையோ, தமிழ்ப் பொருளையோ, அல்லது 1 முதல் 99 வரையிலான எண்ணையோ பயன்படுத்தித் தேடுங்கள்.",
    clearSearch: "தேடலை அழி",
    allCategories: "அனைத்து 99 திருநாமங்கள்",
    categoryMercy: "பேரருளும் கருணையும்",
    categoryMajesty: "கண்ணியமும் பெருமையும்",
    categoryCreation: "படைப்பும் உயிர்ப்பும்",
    categoryKnowledge: "ஞானமும் பேரறிவும்",
    categoryPower: "ஆற்றலும் நீதியும்",
    categoryProvision: "உணவும் வாழ்வாதாரமும்",
    categoryForgiveness: "மன்னிப்பும் சகிப்புத்தன்மையும்",
    categoryFavourites: "விருப்பமானவை",
    previousName: "முந்தைய திருநாமம்",
    nextName: "அடுத்த திருநாமம்",
    backToAllNames: "அனைத்து திருநாமங்களுக்கும் திரும்பு",
    serialNumber: "வரிசை எண்",
    arabicName: "அரபு திருநாமம்",
    transliterationLabel: "உச்சரிப்பு",
    englishMeaningLabel: "ஆங்கிலப் பொருள்",
    tamilMeaningLabel: "தமிழ்ப் பொருள்",
    arabicMeaningLabel: "அரபு விளக்கம்",
    reflectionLabel: "ஆன்மீக விளக்கமும் முக்கியத்துவமும்",
    quranReferenceLabel: "திருக்குர்ஆன் ஆதாரம்",
    listenPronunciation: "உச்சரிப்பைக் கேளுங்கள்",
    playingAudio: "உச்சரிக்கப்படுகிறது...",
    addToFavourites: "விருப்பத்தில் சேர்",
    removeFromFavourites: "விருப்பத்திலிருந்து நீக்கு",
    markAsLearned: "தியானித்ததாகக் குறி",
    learnedStatus: "தியானிக்கப்பட்டது",
    jumpToNumber: "எண்ணுக்குச் செல் #",
    gridView: "கட்டம் பார்வை",
    listView: "பட்டியல் பார்வை",
    totalNames: "மொத்த திருநாமங்கள்",
    favouriteNames: "விருப்பப் பட்டியல்",
    learnedNames: "சிந்தித்தவை",
    completionTitle: "மாஷா அல்லாஹ்! நீங்கள் 99 திருநாமங்களையும் அறிந்துவிட்டீர்கள்",
    completionSubtitle: "அல்லாஹ் உங்கள் உள்ளங்களை ஒளிரச் செய்து, அவனது அழகிய திருநாமங்களின் மூலமாக உங்கள் துஆக்களை ஏற்றுக்கொள்வானாக.",
    completionDua: "اللَّهُمَّ إِنِّي أَسْأَلُكَ بِأَنَّ لَكَ الْحَمْدَ، لَا إِلَٰهَ إِلَّا أَنْتَ الْمَنَّانُ، بَدِيعُ السَّمَاوَاتِ وَالْأَرْضِ، يَا ذَا الْجَلَالِ وَالْإِكْرَامِ، يَا حَيُّ يَا قَيُّومُ",
    restartFromBeginning: "முதல் திருநாமத்திற்குத் திரும்பு (அர்-ரஹ்மான்)",
    copyDetails: "விவரங்களை நகலெடு",
    copiedNotice: "நகலெடுக்கப்பட்டது!",
    footerAboutTitle: "அஸ்மாவுல் ஹுஸ்னா பற்றி",
    footerAboutText: "அல்லாஹ்வின் 99 அழகிய திருநாமங்களை முஸ்லிம்களும் ஆர்வலர்களும் அரபு, தமிழ், ஆங்கில மொழிகளில் படித்து, தியானித்து பயன்பெற உருவாக்கப்பட்ட பிரத்யேக ஆன்மீகத் தளம்.",
    footerSourcesTitle: "ஆதாரப்பூர்வ ஹதீஸ்களும் நூல்களும்",
    footerSourcesList: [
      "புனித திருக்குர்ஆன் (நேரடி வசனங்கள்)",
      "ஸஹீஹ் அல்-புகாரி (ஹதீஸ் 2736, 7392)",
      "ஸஹீஹ் முஸ்லிம் (ஹதீஸ் 2677)",
      "ஜpermissionாமிஉத் திர்மிதி (ஹதீஸ் 3507)",
      "இமாம் கஸ்ஸாலியின் அல்-மக்ஸதுல் அஸ்னா",
      "தஃப்சீர் இப்னு கஸீர்"
    ],
    footerDisclaimer: "தமிழ் மற்றும் ஆங்கில மொழியாக்கங்கள் மனித புரிதலுக்காக மட்டுமே வழங்கப்பட்டுள்ளன; அரபு மூலத்தின் ஆழமான அத்தனை இறை நுணுக்கங்களையும் மொழிபெயர்ப்புகளால் முழுமையாக அடக்கிவிட முடியாது.",
    backToTop: "மேலே செல்",
    throneVerseTitle: "آيَةُ الْكُرْسِيِّ",
    throneVerseSubtitle: "ஆயத்துல் குர்ஸிய்யு | அரியணை வசனம் (அல்-பகரா 2:255)"
  },
  ar: {
    siteTitleAr: "أَسْمَاءُ اللَّهِ الْحُسْنَى",
    siteTitleEn: "The 99 Beautiful Names of Allah",
    siteTitleTa: "அல்லாஹ்வின் 99 அழகிய திருநாமங்கள்",
    subtitle: "تَعَرَّفْ عَلَى أَسْمَاءِ اللَّهِ الْحُسْنَى وَتَدَبَّرْ مَعَانِيَهَا بِالْعَرَبِيَّةِ وَالتَّامِيلِيَّةِ وَالْإِنْجِلِيزِيَّةِ.",
    welcomeSubtitle: "تَعَرَّفْ عَلَى أَسْمَاءِ اللَّهِ الْحُسْنَى وَتَدَبَّرْ مَعَانِيَهَا بِالْعَرَبِيَّةِ وَالتَّامِيلِيَّةِ وَالْإِنْجِلِيزِيَّةِ.",
    enterButton: "ادْخُلْ إِلَى عَالَمِ أَسْمَاءِ اللَّهِ الْحُسْنَى",
    returnToKursi: "آيَةُ الْكُرْسِيِّ",
    exploreButton: "اسْتَكْشِفِ الأَسْمَاءَ الـ 99",
    continueReading: "تَابِعْ مِنْ حَيْثُ تَوَقَّفْتَ",
    nameOfTheDay: "اسْمُ الْيَوْمِ",
    nameOfTheDayDesc: "تَدَبَّرْ فِي هَذَا الِاسْمِ الْجَلِيلِ الْيَوْمَ وَتَقَرَّبْ بِهِ إِلَى اللَّهِ فِي دُعَائِكَ وَحَيَاتِكَ.",
    progressTitle: "تَقَدُّمُكَ فِي التَّدَبُّرِ",
    progressDesc: "أَسْمَاءٌ تَمَّ اسْتِكْشَافُهَا وَتَدَبُّرُهَا",
    searchPlaceholder: "ابْحَثْ بِالْعَرَبِيَّةِ، الإِنْجِلِيزِيَّةِ، التَّامِيلِيَّةِ أَوْ بِالرَّقْمِ (1-99)...",
    noResultsTitle: "لَمْ نَعْثُرْ عَلَى نَتَائِجَ مُطَابِقَةٍ",
    noResultsDesc: "جَرِّبِ الْبَحْثَ بِكَلِمَةٍ أُخْرَى أَوْ بِالْمَعْنَى أَوْ بِرَقْمٍ بَيْنَ 1 وَ 99.",
    clearSearch: "مَسْحُ الْبَحْثِ",
    allCategories: "جَمِيعُ الأَسْمَاءِ (99)",
    categoryMercy: "الرَّحْمَةُ وَالْإِحْسَانُ",
    categoryMajesty: "الْجَلَالُ وَالْعَظَمَةُ",
    categoryCreation: "الْخَلْقُ وَالْإِحْيَاءُ",
    categoryKnowledge: "الْعِلْمُ وَالْحِكْمَةُ",
    categoryPower: "الْقُوَّةُ وَالْعَدْلُ",
    categoryProvision: "الرِّزْقُ وَالْعَطَاءُ",
    categoryForgiveness: "الْمَغْفِرَةُ وَالتَّوْبَةُ",
    categoryFavourites: "الْمُفَضَّلَةُ",
    previousName: "الِاسْمُ السَّابِقُ",
    nextName: "الِاسْمُ التَّالِي",
    backToAllNames: "الْعَوْدَةُ لِجَمِيعِ الأَسْمَاءِ",
    serialNumber: "الرَّقْمُ",
    arabicName: "الِاسْمُ بِالرَّسْمِ الْعَرَبِيِّ",
    transliterationLabel: "النُّطْقُ اللَّاتِينِيُّ",
    englishMeaningLabel: "الْمَعْنَى بِالإِنْجِلِيزِيَّةِ",
    tamilMeaningLabel: "الْمَعْنَى بِالتَّامِيلِيَّةِ",
    arabicMeaningLabel: "الشَّرْحُ وَالْمَعْنَى",
    reflectionLabel: "الْأَثَرُ الإِيمَانِيُّ وَالتَّدَبُّرُ",
    quranReferenceLabel: "الشَّاهِدُ مِنَ الْقُرْآنِ الْكَرِيمِ",
    listenPronunciation: "اسْتَمِعْ لِلنُّطْقِ",
    playingAudio: "جَارٍ التَّشْغِيلُ...",
    addToFavourites: "إِضَافَةٌ لِلْمُفَضَّلَةِ",
    removeFromFavourites: "إِزَالَةٌ مِنَ الْمُفَضَّلَةِ",
    markAsLearned: "تَمَّ التَّدَبُّرُ",
    learnedStatus: "مُتَدَبَّرٌ",
    jumpToNumber: "الانْتِقَالُ لِلرَّقْمِ #",
    gridView: "عَرْضُ الشَّبَكَةِ",
    listView: "عَرْضُ الْقَائِمَةِ",
    totalNames: "إِجْمَالِيُّ الأَسْمَاءِ",
    favouriteNames: "الْمُفَضَّلَةُ",
    learnedNames: "مَا تَمَّ تَدَبُّرُهُ",
    completionTitle: "مَبْرُوكٌ! لَقَدْ تَدَبَّرْتَ جَمِيعَ أَسْمَاءِ اللَّهِ الْحُسْنَى",
    completionSubtitle: "نَسْأَلُ اللَّهَ أَنْ يُنَوِّرَ قَلْبَكَ وَأَنْ يَرْزُقَكَ الْجَنَّةَ بِإِحْصَائِهَا وَالْعَمَلِ بِمُقْتَضَاهَا.",
    completionDua: "اللَّهُمَّ إِنِّي أَسْأَلُكَ بِأَنَّ لَكَ الْحَمْدَ، لَا إِلَٰهَ إِلَّا أَنْتَ الْمَنَّانُ، بَدِيعُ السَّمَاوَاتِ وَالْأَرْضِ، يَا ذَا الْجَلَالِ وَالْإِكْرَامِ، يَا حَيُّ يَا قَيُّومُ",
    restartFromBeginning: "الْعَوْدَةُ لِلِاسْمِ الْأَوَّلِ (الرَّحْمَٰنُ)",
    copyDetails: "نَسْخُ الْبَيَانَاتِ",
    copiedNotice: "تَمَّ النَّسْخُ إِلَى الْحَافِظَةِ!",
    footerAboutTitle: "عَنْ مَوْقِعِ أَسْمَاءِ اللَّهِ الْحُسْنَى",
    footerAboutText: "مَوْقِعٌ رَقْمِيٌّ إِسْلَامِيٌّ خَالِصٌ يَهْدِفُ إِلَى إِبْرَازِ جَمَالِ أَسْمَاءِ اللَّهِ الْحُسْنَى وَمَعَانِيهَا بِاللُّغَاتِ الْعَرَبِيَّةِ وَالتَّامِيلِيَّةِ وَالإِنْجِلِيزِيَّةِ لِخِدْمَةِ الْمُسْلِمِينَ حَوْلَ الْعَالَمِ.",
    footerSourcesTitle: "الْمَصَادِرُ وَالْمَرَاجِعُ الْمُعْتَمَدَةُ",
    footerSourcesList: [
      "الْقُرْآنُ الْكَرِيمُ (الْآيَاتُ الْمُبَارَكَةُ)",
      "صَحِيحُ الْبُخَارِيِّ (حَدِيثُ 2736، 7392)",
      "صَحِيحُ مُسْلِمٍ (حَدِيثُ 2677)",
      "سُنَنُ التِّرْمِذِيِّ (حَدِيثُ 3507)",
      "الْمَقْصَدُ الْأَسْنَى لِلْإِمَامِ أَبِي حَامِدٍ الْغَزَالِيِّ",
      "تَفْسِيرُ ابْنِ كَثِيرٍ"
    ],
    footerDisclaimer: "تُرْجِمَتِ الْمَعَانِي لِتَقْرِيبِ الْفَهْمِ وَتَسْهِيلِ التَّدَبُّرِ؛ وَلَا يُمْكِنُ لِلُّغَةِ الْبَشَرِيَّةِ أَنْ تَسْتَوْعِبَ كُلَّ أَبْعَادِ الْإِعْجَازِ فِي اللَّفْظِ الْعَرَبِيِّ الشَّرِيفِ.",
    backToTop: "الْعَوْدَةُ لِلْأَعْلَى",
    throneVerseTitle: "آيَةُ الْكُرْسِيِّ",
    throneVerseSubtitle: "سُورَةُ الْبَقَرَةِ (الْآيَةُ 255)"
  }
};
