import React, { useState } from 'react';
import { Material } from '../types';
import { 
  Compass, 
  Sparkles, 
  Dice5, 
  Lightbulb, 
  Atom, 
  ArrowRight, 
  FlaskConical, 
  HelpCircle,
  CheckCircle,
  Flame,
  Globe2
} from 'lucide-react';
import { labSound } from '../utils/sound';
import { AppLanguage } from '../utils/i18n';

interface DiscoverViewProps {
  materials: Material[];
  onInspectMaterial: (m: Material) => void;
  onStageCombination: (matA: Material, matB: Material) => void;
  lang?: AppLanguage;
}

const DID_YOU_KNOW_FACTS = [
  {
    topic: 'Superfluid Helium',
    topicAr: 'الهيليوم فائق السيولة',
    fact: 'When cooled below 2.17 Kelvin, liquid Helium-4 loses all viscosity, flowing with zero friction and spontaneously creeping up the walls of containers against gravity.',
    factAr: 'عند تبريد الهيليوم-4 إلى ما دون 2.17 كلفن، يفقد لزوجته تماماً ويتدفق بدون أي احتكاك ويزحف تلقائياً على جدران الأوعية ضد الجاذبية الأرضية.',
    icon: '❄️'
  },
  {
    topic: 'Cosmic Origin of Gold',
    topicAr: 'الأصل الكوني للذهب',
    fact: 'Almost all the gold on Earth and in our jewelry was forged in the apocalyptic collisions of neutron stars (kilonovae) and scattered across the galaxy billions of years ago.',
    factAr: 'تقريباً كل الذهب الموجود على كوكب الأرض تشكّل نتيجة تصادمات مروعة بين النجوم النيوترونية (الكيلونوفا) وتناثر عبر المجرة قبل مليارات السنين.',
    icon: '✨'
  },
  {
    topic: 'Titanium Biocompatibility',
    topicAr: 'التوافق الحيوي للتيتانيوم',
    fact: 'Titanium is one of the few materials on Earth that living human bone cells will naturally fuse with (osseointegration) without triggering an immune rejection response.',
    factAr: 'التيتانيوم هو أحد العناصر النادرة التي تلتحم بها خلايا العظام البشرية الحية طبيعياً (الاندماج العظمي) دون أن يثير أي استجابة رفض مناعية.',
    icon: '🦴'
  },
  {
    topic: 'The Red Planet’s Rust',
    topicAr: 'صدأ الكوكب الأحمر (المريخ)',
    fact: 'Mars appears vivid orange-red because billions of years of cosmic ultraviolet radiation oxidized surface iron compounds into fine particles of Iron(III) oxide (hematite rust).',
    factAr: 'يظهر المريخ بلون برتقالي محمر لأن مليارات السنين من الإشعاع فوق البنفسجي الكوني أكسدت مركبات الحديد السطحية إلى صدأ أكسيد الحديديك الدقيق (الهيماتيت).',
    icon: '🪐'
  },
  {
    topic: 'Diamond Thermal Conductivity',
    topicAr: 'الموصلية الحرارية للألماس',
    fact: 'Even though diamond is an electrical insulator, its tightly packed tetrahedral covalent carbon lattice conducts heat five times faster than pure copper!',
    factAr: 'على الرغم من أن الألماس عازل تماماً للكهرباء، إلا أن شبكته البلورية التساهمية رباعية الأوجه تنقل الحرارة أسرع بخمس مرات من النحاس النقي!',
    icon: '💎'
  },
  {
    topic: 'Helium-3 Lunar Clean Energy',
    topicAr: 'هيليوم-3 والطاقة القمرية النظيفة',
    fact: 'The solar wind has impregnated the Moon’s regolith with millions of tons of Helium-3. A single space shuttle cargo load could theoretically power humanity for a year with zero radioactive nuclear waste.',
    factAr: 'تشبعت تربة القمر بملايين الأطنان من نظير الهيليوم-3 القادم من الرياح الشمسية. حمولة مكوك فضائي واحدة منه قادرة نظرياً على إمداد البشرية بالطاقة لعام كامل دون نفايات إشعاعية.',
    icon: '🌕'
  }
];

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  materials,
  onInspectMaterial,
  onStageCombination,
  lang = 'en'
}) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [randomSample, setRandomSample] = useState<Material>(() => {
    return materials[Math.floor(Math.random() * materials.length)];
  });

  const handleNextFact = () => {
    labSound.playClick();
    setCurrentFactIndex((prev) => (prev + 1) % DID_YOU_KNOW_FACTS.length);
  };

  const handleRandomMaterial = () => {
    labSound.playClick();
    const randomIndex = Math.floor(Math.random() * materials.length);
    setRandomSample(materials[randomIndex]);
  };

  const handleSurpriseMe = () => {
    labSound.playSurprise();
    // Pick two random materials with high synergy
    const pairs = [
      ['copper', 'oxygen'],
      ['hydrogen', 'oxygen'],
      ['sodium', 'chlorine'],
      ['sodium', 'water'],
      ['methane', 'oxygen'],
      ['gold', 'mercury'],
      ['cosmic_plasma', 'helium_3'],
      ['iron', 'oxygen']
    ];
    const pick = pairs[Math.floor(Math.random() * pairs.length)];
    const matA = materials.find(m => m.id === pick[0]) || materials[0];
    const matB = materials.find(m => m.id === pick[1]) || materials[1];
    onStageCombination(matA, matB);
  };

  const currentFact = DID_YOU_KNOW_FACTS[currentFactIndex];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <div className="border-b border-sky-900/50 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-4 h-4 border border-sky-400 rotate-45 flex items-center justify-center">
            <div className="w-1 h-1 bg-sky-400" />
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-widest uppercase">
            {lang === 'ar' ? (
              <>طور <span className="text-sky-400">الاستكشاف والمعرفة</span></>
            ) : (
              <>DISCOVER <span className="text-sky-400">MODE</span></>
            )}
          </h1>
        </div>
        <p className="text-sm text-sky-200/80 mt-1">
          {lang === 'ar'
            ? 'استكشف الظواهر الكونية والحقائق الفيزيائية والتوافقات الكيميائية الفريدة بين المواد.'
            : 'Explore curated cosmic anomalies, scientific phenomena, and serendipitous chemical combinations.'}
        </p>
      </div>

      {/* Main Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

        {/* 1. DID YOU KNOW? */}
        <div className="lg:col-span-6 flex flex-col justify-between p-6 rounded-xl bg-[#020617] border border-sky-900/40 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sky-400 font-display font-bold text-xs tracking-wider uppercase">
                <Lightbulb className="w-4 h-4" />
                <span>{lang === 'ar' ? 'هل تعلم؟' : 'Did you know?'}</span>
              </div>
              <span className="text-2xl">{currentFact.icon}</span>
            </div>

            <h3 className="font-display font-black text-xl text-white mt-4">
              {lang === 'ar' ? currentFact.topicAr : currentFact.topic}
            </h3>

            <p className="text-sky-200/80 text-sm mt-3 leading-relaxed font-sans">
              {lang === 'ar' ? currentFact.factAr : currentFact.fact}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-sky-900/50 flex items-center justify-between">
            <span className="text-xs font-mono text-sky-600">
              {lang === 'ar'
                ? `المعلومة ${currentFactIndex + 1} من ${DID_YOU_KNOW_FACTS.length}`
                : `FACT ${currentFactIndex + 1} OF ${DID_YOU_KNOW_FACTS.length}`}
            </span>
            <button
              onClick={handleNextFact}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-sky-950 hover:bg-sky-900 border border-sky-800 text-xs font-mono font-bold text-sky-300 transition cursor-pointer"
            >
              <span>{lang === 'ar' ? 'المعلومة التالية' : 'NEXT FACT'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. RANDOM MATERIAL GENERATOR */}
        <div className="lg:col-span-6 flex flex-col justify-between p-6 rounded-xl bg-[#020617] border border-sky-900/40 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sky-400 font-display font-bold text-xs tracking-wider uppercase">
                <Dice5 className="w-4 h-4" />
                <span>{lang === 'ar' ? 'عينة مادة عشوائية' : 'Random Material'}</span>
              </div>
              <button
                onClick={handleRandomMaterial}
                className="px-2.5 py-1 rounded bg-sky-950 hover:bg-sky-900 border border-sky-800 text-xs font-mono text-sky-300 transition cursor-pointer"
                title="Roll New Sample"
              >
                {lang === 'ar' ? 'عينة أخرى' : 'REROLL'}
              </button>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-lg flex items-center justify-center font-mono font-bold text-2xl text-white shadow-lg border border-white/20"
                style={{ backgroundColor: randomSample.colorHex }}
              >
                {randomSample.symbol}
              </div>
              <div>
                <h3 className="font-display font-black text-2xl text-white">
                  {lang === 'ar' ? (randomSample.nameAr || randomSample.name) : randomSample.name}
                </h3>
                <div className="text-xs font-mono text-sky-400 uppercase mt-0.5">
                  {randomSample.state} • {randomSample.category}
                </div>
              </div>
            </div>

            <p className="text-sky-200/80 text-xs mt-3 leading-relaxed line-clamp-2">
              {randomSample.appearance}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-sky-900/50 flex items-center justify-between">
            <span className="text-xs font-mono text-sky-600">
              {lang === 'ar' ? `الكثافة: ${randomSample.density}` : `DENSITY: ${randomSample.density}`}
            </span>
            <button
              onClick={() => onInspectMaterial(randomSample)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-sky-950 hover:bg-sky-900 border border-sky-800 text-xs font-mono font-bold text-sky-300 transition cursor-pointer"
            >
              <span>{lang === 'ar' ? 'فحص الملف الذري' : 'INSPECT PROFILE'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3. SURPRISE ME — LAB QUICK STAGING */}
        <div className="lg:col-span-12 p-6 rounded-xl bg-[#020617] border border-sky-900/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_35px_rgba(14,165,233,0.1)]">
          <div className="flex items-center gap-4 text-start">
            <div className="w-12 h-12 rounded border border-sky-400 bg-sky-950/60 flex items-center justify-center text-sky-400 shadow flex-shrink-0">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-white">
                {lang === 'ar' ? 'مولّد التوليفات المفاجئة' : 'SURPRISE COMBINATION GENERATOR'}
              </h3>
              <p className="text-xs sm:text-sm text-sky-200/80 mt-1 max-w-xl">
                {lang === 'ar'
                  ? 'دع خوارزمية المختبر تختار مادتين متوافقتين ومثيرتين وتجهزهما تلقائياً في الغرفة A و B لتخليق فوري!'
                  : 'Let the algorithmic lab selector stage two fascinating compatible materials into Chamber Alpha and Beta, ready to synthesize instantly!'}
              </p>
            </div>
          </div>

          <button
            id="surprise-me-button"
            onClick={handleSurpriseMe}
            className="flex-shrink-0 flex items-center gap-2.5 px-8 py-3.5 rounded-sm bg-sky-500 hover:bg-sky-400 text-black font-display font-black text-sm tracking-widest uppercase shadow-[0_0_25px_rgba(14,165,233,0.45)] transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>{lang === 'ar' ? 'فاجئني بتجربة' : 'SURPRISE ME'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
