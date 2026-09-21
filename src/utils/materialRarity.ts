import { Material, MaterialRarity } from '../types';

export interface RarityDetails {
  id: MaterialRarity;
  labelEn: string;
  labelAr: string;
  descEn: string;
  descAr: string;
  badgeClass: string;
  pillActiveClass: string;
  borderHoverClass: string;
  cardAccentClass: string;
  textClass: string;
  dotClass: string;
  iconName: 'shield' | 'gem' | 'orbit' | 'crown';
}

export const RARITIES: { id: MaterialRarity; labelEn: string; labelAr: string }[] = [
  { id: 'Common', labelEn: 'Common', labelAr: 'شائع' },
  { id: 'Rare', labelEn: 'Rare', labelAr: 'نادر' },
  { id: 'Exotic', labelEn: 'Exotic', labelAr: 'فريد' },
  { id: 'Legendary', labelEn: 'Legendary', labelAr: 'أسطوري' },
];

export const RARITY_CONFIG: Record<MaterialRarity, RarityDetails> = {
  Common: {
    id: 'Common',
    labelEn: 'Common',
    labelAr: 'شائع',
    descEn: 'Abundant terrestrial matter and foundational natural elements',
    descAr: 'عناصر ومواد وفيرة وطبيعية منتشرة في كوكب الأرض',
    badgeClass: 'bg-slate-900/80 text-slate-300 border border-slate-700/60 shadow-[0_0_8px_rgba(148,163,184,0.15)]',
    pillActiveClass: 'bg-slate-700 text-white font-bold shadow-[0_0_12px_rgba(148,163,184,0.3)]',
    borderHoverClass: 'hover:border-slate-500/60',
    cardAccentClass: 'from-slate-600/20 to-transparent',
    textClass: 'text-slate-300',
    dotClass: 'bg-slate-400',
    iconName: 'shield',
  },
  Rare: {
    id: 'Rare',
    labelEn: 'Rare',
    labelAr: 'نادر',
    descEn: 'Scarce precious elements, noble metals, and specialized reagents',
    descAr: 'عناصر ثمينة ونادرة وفلزات نفيسة وتفاعلية دقيقة',
    badgeClass: 'bg-sky-950/80 text-sky-300 border border-sky-500/60 shadow-[0_0_10px_rgba(14,165,233,0.3)]',
    pillActiveClass: 'bg-sky-500 text-black font-bold shadow-[0_0_14px_rgba(14,165,233,0.5)]',
    borderHoverClass: 'hover:border-sky-400/80',
    cardAccentClass: 'from-sky-500/20 to-transparent',
    textClass: 'text-sky-300',
    dotClass: 'bg-sky-400 shadow-[0_0_6px_rgba(14,165,233,0.8)]',
    iconName: 'gem',
  },
  Exotic: {
    id: 'Exotic',
    labelEn: 'Exotic',
    labelAr: 'فريد',
    descEn: 'Cosmic dust, astrophysical isotopes, and high-energy quantum allotropes',
    descAr: 'نظائر فلكية ومادة بينجمية وحالات كمية عالية الطاقة',
    badgeClass: 'bg-purple-950/85 text-purple-200 border border-purple-500/60 shadow-[0_0_12px_rgba(168,85,247,0.35)]',
    pillActiveClass: 'bg-purple-600 text-white font-bold shadow-[0_0_16px_rgba(168,85,247,0.6)]',
    borderHoverClass: 'hover:border-purple-400/80',
    cardAccentClass: 'from-purple-500/25 to-transparent',
    textClass: 'text-purple-300',
    dotClass: 'bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.9)]',
    iconName: 'orbit',
  },
  Legendary: {
    id: 'Legendary',
    labelEn: 'Legendary',
    labelAr: 'أسطوري',
    descEn: 'Transcendent cosmic plasma, primordial solar fuels, and extreme stellar phenomena',
    descAr: 'بلازما كونية متوهجة ووقود فلكي وطاقات نجمية استثنائية',
    badgeClass: 'bg-amber-950/90 text-amber-200 border border-amber-400/80 shadow-[0_0_16px_rgba(245,158,11,0.45)] ring-1 ring-amber-400/30',
    pillActiveClass: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold shadow-[0_0_18px_rgba(245,158,11,0.7)]',
    borderHoverClass: 'hover:border-amber-400',
    cardAccentClass: 'from-amber-500/30 to-transparent',
    textClass: 'text-amber-300',
    dotClass: 'bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,1)] animate-pulse',
    iconName: 'crown',
  },
};

export function getMaterialRarity(material: Material): MaterialRarity {
  if (material.rarity) {
    return material.rarity;
  }

  // Fallback heuristic for materials created dynamically or without explicit rarity:
  const id = material.id.toLowerCase();
  const category = material.category;

  if (category === 'Space' || id.includes('plasma') || id.includes('antimatter')) {
    if (id.includes('plasma')) return 'Legendary';
    return 'Exotic';
  }

  if (id === 'diamond' || id === 'helium' || id.includes('graphene') || id.includes('quantum')) {
    return 'Exotic';
  }

  if (
    id === 'gold' ||
    id === 'silver' ||
    id === 'titanium' ||
    id === 'mercury' ||
    id === 'quartz' ||
    id === 'sulfur' ||
    id === 'sodium' ||
    id === 'potassium' ||
    id === 'chlorine' ||
    id === 'ammonia' ||
    id === 'ethanol' ||
    id === 'magnesium' ||
    id === 'zinc'
  ) {
    return 'Rare';
  }

  return 'Common';
}
