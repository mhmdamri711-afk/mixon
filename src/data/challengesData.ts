import { Challenge } from '../types';

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'ch_discover_material',
    title: 'Discover New Material',
    titleAr: 'استكشاف مادة جديدة',
    description: 'Inspect and explore any newly discovered material in the laboratory.',
    descriptionAr: 'قم بفحص واستكشاف مادة جديدة في المختبر للتعرف على خصائصها الذرية والكيميائية.',
    targetType: 'discover_material',
    xpReward: 100,
    completed: false
  },
  {
    id: 'ch_state_change',
    title: 'Phase Alchemist',
    titleAr: 'مغيّر الحالة الفيزيائية',
    description: 'Find a combination that changes state (e.g., Gas + Gas → Liquid, or Solid + Gas → Solid).',
    descriptionAr: 'اكتشف تفاعلاً يؤدي إلى تغيير في الحالة الفيزيائية للمادة.',
    targetType: 'state_change',
    xpReward: 120,
    completed: false
  },
  {
    id: 'ch_inert_three',
    title: 'Noble Guardians',
    titleAr: 'حراس الاستقرار الخامل',
    description: 'Inspect 3 different materials with Inert chemical reactivity in the Explorer.',
    descriptionAr: 'استكشف 3 مواد مختلفة تتميز بخمول كيميائي تام.',
    targetType: 'same_property',
    xpReward: 100,
    completed: false
  },
  {
    id: 'ch_thermal_surge',
    title: 'Thermal Surge',
    titleAr: 'طفرة الطاقة الحرارية',
    description: 'Trigger an exothermic reaction releasing over 300 kJ/mol of simulated energy.',
    descriptionAr: 'قم بإجراء تفاعل طارد للحرارة يحرر طاقة محاكاة تتجاوز 300 كيلوجول/مول.',
    targetType: 'high_energy',
    xpReward: 150,
    completed: false
  },
  {
    id: 'ch_oxide_craft',
    title: 'Oxidation Alchemist',
    titleAr: 'كيمياء الأكسدة',
    description: 'Synthesize an oxide compound by combining any metal or element with Oxygen.',
    descriptionAr: 'قم بتركيب مركب أكسيد عبر دمج أي معدن أو عنصر مع الأكسجين.',
    targetType: 'oxide',
    xpReward: 110,
    completed: false
  },
  {
    id: 'ch_space_matter',
    title: 'Cosmic Frontiers',
    titleAr: 'آفاق المادة الفضائية',
    description: 'Introduce and simulate a reaction involving Space-category matter in the Mix Lab.',
    descriptionAr: 'قم بإدخال مادة من تصنيف الفضاء ومحاكاتها داخل غرفة التفاعل.',
    targetType: 'space_matter',
    xpReward: 140,
    completed: false
  },
  {
    id: 'ch_tri_state',
    title: 'Chain of Transformations',
    titleAr: 'سلسلة التحولات',
    description: 'Run at least 3 distinct simulations in the Mix Lab.',
    descriptionAr: 'قم بإجراء 3 محاكاة تفاعلية مختلفة على الأقل في المختبر.',
    targetType: 'multi_combines',
    xpReward: 130,
    completed: false
  }
];

export function getRankFromXP(xp: number): { level: number; title: string; titleAr: string; nextLevelXP: number; progressPercent: number } {
  const levels = [
    { level: 1, title: 'Explorer', titleAr: 'مستكشف', minXP: 0, maxXP: 150 },
    { level: 2, title: 'Observer', titleAr: 'ملاحظ علمي', minXP: 150, maxXP: 350 },
    { level: 3, title: 'Researcher', titleAr: 'باحث مخبري', minXP: 350, maxXP: 650 },
    { level: 4, title: 'Scientist', titleAr: 'عالم تجريبي', minXP: 650, maxXP: 1000 },
    { level: 5, title: 'Master of Matter', titleAr: 'سيد المادة', minXP: 1000, maxXP: 1500 }
  ];

  for (let i = 0; i < levels.length; i++) {
    const l = levels[i];
    if (xp < l.maxXP || i === levels.length - 1) {
      const range = l.maxXP - l.minXP;
      const progress = Math.min(100, Math.max(0, Math.round(((xp - l.minXP) / range) * 100)));
      return {
        level: l.level,
        title: l.title,
        titleAr: l.titleAr,
        nextLevelXP: l.maxXP,
        progressPercent: progress
      };
    }
  }

  return {
    level: 5,
    title: 'Master of Matter',
    titleAr: 'سيد المادة',
    nextLevelXP: 1500,
    progressPercent: 100
  };
}
