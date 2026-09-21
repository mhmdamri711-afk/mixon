import React, { useState, useMemo } from 'react';
import { Material, MaterialCategory, MaterialRarity } from '../types';
import { 
  Search, 
  Filter, 
  FlaskConical, 
  Sparkles, 
  PlusCircle, 
  Layers, 
  Info,
  ChevronRight,
  Flame,
  Shield,
  Gem,
  Orbit,
  Crown
} from 'lucide-react';
import { labSound } from '../utils/sound';
import { AppLanguage } from '../utils/i18n';
import { RarityBadge } from './RarityBadge';
import { RARITIES, RARITY_CONFIG, getMaterialRarity } from '../utils/materialRarity';

interface MaterialExplorerViewProps {
  materials: Material[];
  onSelectMaterial: (material: Material) => void;
  onLoadToLab: (material: Material, slot: 'A' | 'B') => void;
  onOpenCustomCreator: () => void;
  lang?: AppLanguage;
}

const CATEGORIES: { en: MaterialCategory | 'All'; ar: string }[] = [
  { en: 'All', ar: 'الكل' },
  { en: 'Elements', ar: 'عناصر أولية' },
  { en: 'Metals', ar: 'فلزات ومعادن' },
  { en: 'Minerals', ar: 'معادن وأحجار' },
  { en: 'Gases', ar: 'غازات' },
  { en: 'Liquids', ar: 'سوائل' },
  { en: 'Organic', ar: 'مركبات عضوية' },
  { en: 'Everyday Materials', ar: 'مواد يومية' },
  { en: 'Space', ar: 'مواد فضائية' },
  { en: 'Custom', ar: 'عناصر مخصصة' }
];

const STATES: { en: 'All' | 'Solid' | 'Liquid' | 'Gas' | 'Plasma'; ar: string }[] = [
  { en: 'All', ar: 'الكل' },
  { en: 'Solid', ar: 'صلب' },
  { en: 'Liquid', ar: 'سائل' },
  { en: 'Gas', ar: 'غاز' },
  { en: 'Plasma', ar: 'بلازما' }
];

export const MaterialExplorerView: React.FC<MaterialExplorerViewProps> = ({
  materials,
  onSelectMaterial,
  onLoadToLab,
  onOpenCustomCreator,
  lang = 'en'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory | 'All'>('All');
  const [selectedRarity, setSelectedRarity] = useState<MaterialRarity | 'All'>('All');
  const [filterState, setFilterState] = useState<'All' | 'Solid' | 'Liquid' | 'Gas' | 'Plasma'>('All');

  const rarityCounts = useMemo(() => {
    const counts: Record<MaterialRarity | 'All', number> = {
      All: materials.length,
      Common: 0,
      Rare: 0,
      Exotic: 0,
      Legendary: 0
    };
    materials.forEach(m => {
      const r = getMaterialRarity(m);
      counts[r] = (counts[r] || 0) + 1;
    });
    return counts;
  }, [materials]);

  const filteredMaterials = useMemo(() => {
    return materials.filter(item => {
      const itemRarity = getMaterialRarity(item);
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.nameAr && item.nameAr.includes(searchQuery)) ||
        item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        itemRarity.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesRarity = selectedRarity === 'All' || itemRarity === selectedRarity;
      const matchesState = filterState === 'All' || item.state === filterState;

      return matchesSearch && matchesCategory && matchesRarity && matchesState;
    });
  }, [materials, searchQuery, selectedCategory, selectedRarity, filterState]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sky-900/50 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 border border-sky-400 rotate-45 flex items-center justify-center">
              <div className="w-1 h-1 bg-sky-400" />
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-widest uppercase">
              {lang === 'ar' ? (
                <>مستكشف <span className="text-sky-400">المواد والعناصر</span></>
              ) : (
                <>MATERIAL <span className="text-sky-400">EXPLORER</span></>
              )}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-sky-950 border border-sky-800 text-[10px] font-mono text-sky-400">
              {filteredMaterials.length} / {materials.length} {lang === 'ar' ? 'عينة' : 'SAMPLES'}
            </span>
          </div>
          <p className="text-sm text-sky-200/80 mt-1">
            {lang === 'ar'
              ? 'تصفح فهرس العناصر والمركبات والمعادن والمادة الفضائية مصنفة بحسب مستويات الندرة (شائع، نادر، فريد، أسطوري). اضغط على أي عينة لفحص خواصها.'
              : 'Browse the catalog of elements, compounds, minerals, and cosmic matter categorized across rarity tiers (Common, Rare, Exotic, Legendary). Click any sample to inspect.'}
          </p>
        </div>

        <button
          onClick={() => {
            labSound.playClick();
            onOpenCustomCreator();
          }}
          className="self-start md:self-auto flex items-center gap-2 px-5 py-2.5 rounded-sm bg-sky-500 hover:bg-sky-400 text-black font-display font-bold text-xs tracking-widest uppercase transition active:scale-95 shadow-[0_0_20px_rgba(14,165,233,0.35)] cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-black" />
          <span>{lang === 'ar' ? 'تخليق عنصر مخصص' : 'Synthesize Custom Element'}</span>
        </button>
      </div>

      {/* Search & Category & Rarity Filter Section */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative w-full">
          <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-4 h-4 text-sky-500`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'ar' ? 'ابحث عن أي مادة أو عنصر أو ندرة... (مثل: نحاس، ذهب، Cu، ماء، أسطوري، نادر، Exotic)' : 'Search any material or rarity tier... (e.g. Copper, Cu, Gold, H₂O, Exotic, Legendary)'}
            className={`w-full ${lang === 'ar' ? 'pr-11 pl-4' : 'pl-11 pr-4'} py-3 rounded-lg bg-sky-950/30 border border-sky-900/50 focus:border-sky-500 text-sky-100 placeholder-sky-700 font-sans text-sm transition outline-none`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={`absolute ${lang === 'ar' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-xs font-mono text-sky-500 hover:text-white cursor-pointer`}
            >
              {lang === 'ar' ? 'مسح' : 'CLEAR'}
            </button>
          )}
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map(cat => {
            const active = selectedCategory === cat.en;
            return (
              <button
                key={cat.en}
                onClick={() => {
                  labSound.playClick();
                  setSelectedCategory(cat.en);
                }}
                className={`px-3.5 py-1 rounded-full text-xs font-bold tracking-wider whitespace-nowrap uppercase transition-all duration-150 cursor-pointer ${
                  active
                    ? 'bg-sky-500 text-black shadow-[0_0_12px_rgba(14,165,233,0.4)]'
                    : 'bg-sky-950 text-sky-400 hover:text-sky-200 border border-sky-800'
                }`}
              >
                {lang === 'ar' ? cat.ar : cat.en}
              </button>
            );
          })}
        </div>

        {/* Two-tier Filters: Rarity Tiers & State Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3 rounded-xl bg-sky-950/20 border border-sky-900/40">
          
          {/* Rarity Filter Selector */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-sky-400">
            <span className="text-[11px] font-bold text-sky-300 uppercase flex items-center gap-1 mr-1">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>{lang === 'ar' ? 'الندرة:' : 'RARITY:'}</span>
            </span>

            {/* All Rarities button */}
            <button
              onClick={() => {
                labSound.playClick();
                setSelectedRarity('All');
              }}
              className={`px-2.5 py-1 rounded-md text-xs transition cursor-pointer flex items-center gap-1.5 ${
                selectedRarity === 'All'
                  ? 'bg-sky-500 text-black font-bold shadow-[0_0_10px_rgba(14,165,233,0.4)]'
                  : 'text-sky-400 hover:text-sky-200 bg-sky-950/60 border border-sky-900/60'
              }`}
            >
              <span>{lang === 'ar' ? 'جميع الرتب' : 'ALL TIERS'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-semibold">
                {rarityCounts.All}
              </span>
            </button>

            {/* Individual Rarity buttons */}
            {RARITIES.map(r => {
              const active = selectedRarity === r.id;
              const config = RARITY_CONFIG[r.id];
              const count = rarityCounts[r.id] || 0;

              return (
                <button
                  key={r.id}
                  onClick={() => {
                    labSound.playClick();
                    setSelectedRarity(r.id);
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs transition cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? config.pillActiveClass
                      : `bg-sky-950/50 ${config.textClass} hover:text-white border border-sky-900/60`
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
                  <span>{lang === 'ar' ? r.labelAr : r.labelEn}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 font-semibold">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* State Filter Selector */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-sky-500 border-t lg:border-t-0 lg:border-l border-sky-900/40 pt-2 lg:pt-0 lg:pl-3">
            <span className="text-[11px] font-bold text-sky-400 uppercase mr-1">
              {lang === 'ar' ? 'الحالة:' : 'STATE:'}
            </span>
            {STATES.map(st => (
              <button
                key={st.en}
                onClick={() => {
                  labSound.playClick();
                  setFilterState(st.en);
                }}
                className={`px-2 py-0.5 rounded text-xs transition cursor-pointer ${
                  filterState === st.en
                    ? 'bg-sky-500 text-black font-bold'
                    : 'text-sky-400 hover:text-sky-200 bg-sky-950/40 border border-sky-900/40'
                }`}
              >
                {lang === 'ar' ? st.ar : st.en}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Material Cards Grid */}
      {filteredMaterials.length === 0 ? (
        <div className="text-center py-16 bg-[#020617] rounded-xl border border-sky-900/40">
          <Info className="w-10 h-10 text-sky-600 mx-auto mb-3" />
          <h3 className="font-display font-bold text-lg text-sky-300">
            {lang === 'ar' ? 'لم يتم العثور على مواد مطابقة' : 'No Materials Found'}
          </h3>
          <p className="text-xs text-sky-500 max-w-sm mx-auto mt-1">
            {lang === 'ar'
              ? `لا توجد عينة مادة تطابق معايير البحث والندرة الحالية. جرب تغيير فئة الندرة أو مسح عبارة البحث.`
              : `No matter sample matched your current search and rarity tier filters. Try selecting All Tiers or clearing your search.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMaterials.map(mat => {
            const rarity = getMaterialRarity(mat);
            const rarityConfig = RARITY_CONFIG[rarity];

            return (
              <div
                key={mat.id}
                className={`group relative flex flex-col justify-between p-4 rounded-xl bg-[#020617] hover:bg-sky-950/30 border border-sky-900/40 ${rarityConfig.borderHoverClass} hover:shadow-[0_0_25px_rgba(14,165,233,0.15)] transition-all duration-200 cursor-pointer overflow-hidden`}
                onClick={() => {
                  labSound.playClick();
                  onSelectMaterial(mat);
                }}
              >
                {/* Subtle top rarity glow bar */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${rarityConfig.cardAccentClass}`}
                />

                {/* Top Row: Symbol, Category & Rarity Badge */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div 
                        className="flex items-center justify-center w-11 h-11 rounded-lg font-mono font-bold text-xl text-white shadow-md border border-white/20 transition-transform group-hover:scale-105"
                        style={{ backgroundColor: mat.colorHex }}
                      >
                        {mat.symbol}
                      </div>
                      
                      {/* Prominent Rarity Tier Badge */}
                      <div>
                        <RarityBadge rarity={rarity} lang={lang} size="xs" />
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono text-sky-400 uppercase block">
                        {mat.category}
                      </span>
                      {mat.atomicNumber && (
                        <span className="text-xs font-mono text-sky-600 block font-semibold">
                          Z={mat.atomicNumber}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="mt-3">
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-sky-300 transition">
                      {lang === 'ar' ? (mat.nameAr || mat.name) : mat.name}
                    </h3>
                    {lang !== 'ar' && mat.nameAr && (
                      <span className="text-xs text-sky-400/80 font-sans block">
                        {mat.nameAr}
                      </span>
                    )}
                  </div>

                  {/* Quick Attributes */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] font-mono text-sky-400 pt-2 border-t border-sky-900/50">
                    <div>
                      <span className="text-sky-600 block">{lang === 'ar' ? 'الحالة:' : 'State:'}</span>
                      <span className="text-sky-200 font-semibold">{mat.state}</span>
                    </div>
                    <div>
                      <span className="text-sky-600 block">{lang === 'ar' ? 'النشاط:' : 'Reactivity:'}</span>
                      <span className="text-sky-300 font-semibold">{mat.reactivity}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="mt-4 pt-3 border-t border-sky-900/50 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-sky-400 group-hover:underline flex items-center gap-1">
                    {lang === 'ar' ? 'فحص الخصائص' : 'Inspect'} <ChevronRight className="w-3 h-3" />
                  </span>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        labSound.playClick();
                        onLoadToLab(mat, 'A');
                      }}
                      className="px-2 py-1 rounded bg-sky-950 hover:bg-sky-500 hover:text-black border border-sky-800 text-[10px] font-mono font-bold text-sky-400 transition cursor-pointer"
                      title={lang === 'ar' ? 'تحميل في الغرفة أ' : 'Load into Reactor Slot A'}
                    >
                      {lang === 'ar' ? '+غرفة أ' : '+Slot A'}
                    </button>
                    <button
                      onClick={() => {
                        labSound.playClick();
                        onLoadToLab(mat, 'B');
                      }}
                      className="px-2 py-1 rounded bg-sky-950 hover:bg-sky-500 hover:text-black border border-sky-800 text-[10px] font-mono font-bold text-sky-400 transition cursor-pointer"
                      title={lang === 'ar' ? 'تحميل في الغرفة ب' : 'Load into Reactor Slot B'}
                    >
                      {lang === 'ar' ? '+غرفة ب' : '+Slot B'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
