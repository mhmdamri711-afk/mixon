import React, { useState } from 'react';
import { AppLanguage } from '../utils/i18n';
import { Sparkles, Compass, Rocket, Orbit, ChevronRight, Layers } from 'lucide-react';
import { labSound } from '../utils/sound';

interface SpaceModeViewProps {
  lang: AppLanguage;
  onGoToLab: () => void;
  onInspectMaterial?: (id: string) => void;
}

interface CosmicStage {
  id: string;
  title: string;
  titleAr: string;
  epoch: string;
  temp: string;
  description: string;
  descriptionAr: string;
  elementsCreated: string[];
  elementsCreatedAr: string[];
  color: string;
}

export const SpaceModeView: React.FC<SpaceModeViewProps> = ({
  lang,
  onGoToLab
}) => {
  const [selectedStageId, setSelectedStageId] = useState<string>('supernova');
  const isAr = lang === 'ar';

  const cosmicStages: CosmicStage[] = [
    {
      id: 'big_bang',
      title: 'Big Bang Nucleosynthesis',
      titleAr: 'تخليق الانفجار العظيم',
      epoch: 't + 3 to 20 minutes',
      temp: '10⁹ K (1 Billion °C)',
      description: 'The universe cooled sufficiently for quarks to form protons and neutrons, fusing primordial isotopes before expansion diluted matter density.',
      descriptionAr: 'برد الكون الأولي بما يكفي لتندمج الكواركات مشكلة البروتونات والنيوترونات، واندمجت أولى الأنوية البسيطة قبل أن يباعد التمدد الكوني بين الجسيمات.',
      elementsCreated: ['Hydrogen (¹H, ²H)', 'Helium (⁴He, ³He)', 'Trace Lithium (⁷Li)'],
      elementsCreatedAr: ['الهيدروجين (¹H, ²H)', 'الهيليوم (⁴He, ³He)', 'آثار الليثيوم (⁷Li)'],
      color: '#38bdf8'
    },
    {
      id: 'stellar_fusion',
      title: 'Main-Sequence Stellar Fusion',
      titleAr: 'الاندماج النووي في قلب النجوم',
      epoch: 'Millions to Billions of Years',
      temp: '1.5 × 10⁷ K',
      description: 'Gravitational pressure inside stellar cores ignites proton-proton chains and CNO cycles, fusing hydrogen into helium over eons.',
      descriptionAr: 'الضغط الجاذبي الهائل في مراكز النجوم يشعل سلاسل اندماج بروتون-بروتون ودورة الكربون-نيتروجين-أكسجين، محولاً الهيدروجين إلى هيليوم.',
      elementsCreated: ['Helium Core', 'Carbon byproduct', 'Nitrogen', 'Oxygen trace'],
      elementsCreatedAr: ['لب الهيليوم', 'الكربون', 'النيتروجين', 'الأكسجين'],
      color: '#facc15'
    },
    {
      id: 'triple_alpha',
      title: 'Red Giant Triple-Alpha Process',
      titleAr: 'عمالقة الفضاء وحرق الهيليوم',
      epoch: 'Late Stellar Evolution',
      temp: '10⁸ K (100 Million °C)',
      description: 'As hydrogen is exhausted, the core collapses and heats up until three helium-4 nuclei fuse simultaneously through the Hoyle resonance into carbon-12.',
      descriptionAr: 'بعد نفاد وقود الهيدروجين، ينهار قلب النجم وترتفع حرارته لتندمج ثلاث أنوية هيليوم في وقت متزامن عبر رنين هويل، مشكّلة ذرات الكربون الأساسية للحياة.',
      elementsCreated: ['Carbon (¹²C)', 'Oxygen (¹⁶O)', 'Neon (²⁰Ne)'],
      elementsCreatedAr: ['الكربون (¹²C)', 'الأكسجين (¹⁶O)', 'النيون (²⁰Ne)'],
      color: '#fb923c'
    },
    {
      id: 'supernova',
      title: 'Core-Collapse Supernova & r-Process',
      titleAr: 'المستعرات العظمى (سوبرنوفا)',
      epoch: 'Seconds of Cataclysmic Explosion',
      temp: '10¹⁰ K (10 Billion °C)',
      description: 'Massive star cores collapse into neutron stars or black holes, driving shockwaves that forge the iron peak and explosive neutron-capture metals.',
      descriptionAr: 'ينهار قلب النجوم الضخمة مولداً موجة صدمية كارثية تطلق نيوترونات هائلة في أجزاء من الثانية، صانعة عناصر قمة الحديد والنحاس والنيكل والزنك.',
      elementsCreated: ['Iron (Fe)', 'Copper (Cu)', 'Nickel (Ni)', 'Zinc (Zn)', 'Cobalt (Co)'],
      elementsCreatedAr: ['الحديد (Fe)', 'النحاس (Cu)', 'النيكل (Ni)', 'الزنك (Zn)', 'الكوبالت (Co)'],
      color: '#ef4444'
    },
    {
      id: 'kilonova',
      title: 'Kilonova Neutron Star Mergers',
      titleAr: 'اندماج النجوم النيوترونية (كيلونوفا)',
      epoch: 'Binary Inspiral & Collision',
      temp: 'Extreme Relativistic Density',
      description: 'The collision of ultra-dense neutron stars produces extreme neutron flux, synthesizing heavy precious metals and actinides like Gold and Platinum.',
      descriptionAr: 'اصطدام نجمين نيوترونيين فائقين الكثافة يولد تدفق نيوتروني غير مسبوق يصنع أثقل المعادن الثمينة في الكون مثل الذهب والبلاتين واليورانيوم.',
      elementsCreated: ['Gold (Au)', 'Platinum (Pt)', 'Silver (Ag)', 'Uranium (U)'],
      elementsCreatedAr: ['الذهب (Au)', 'البلاتين (Pt)', 'الفضة (Ag)', 'اليورانيوم (U)'],
      color: '#eab308'
    }
  ];

  const currentStage = cosmicStages.find(s => s.id === selectedStageId) || cosmicStages[3];

  return (
    <div 
      className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fadeIn"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sky-900/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 border border-sky-800 text-xs font-mono text-sky-400 uppercase mb-2">
            <Rocket className="w-3.5 h-3.5 text-sky-400" />
            <span>{isAr ? 'مادة الفضاء والتخليق النجمي' : 'Stellar Nucleosynthesis & Cosmic Origins'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-wide">
            {isAr ? 'أصل العناصر في أفران النجوم الكونية' : 'Cosmic Origin of Chemical Elements'}
          </h1>
          <p className="text-xs sm:text-sm text-sky-300/80 mt-1">
            {isAr 
              ? 'كل ذرة في جسدك وفي المختبر صُنعت في قلب نجم منفجر أو في اللحظات الأولى للانفجار العظيم.'
              : 'Every atom in your body and laboratory was forged inside collapsing stellar furnaces or primordial cosmological expansions.'}
          </p>
        </div>

        <button
          onClick={onGoToLab}
          className="px-4 py-2 rounded-xl bg-sky-950 border border-sky-800 hover:border-sky-500 text-sky-300 hover:text-white text-xs font-mono tracking-wider transition self-start md:self-auto cursor-pointer flex items-center gap-1.5"
        >
          <span>{isAr ? 'العودة لمختبر المزيج' : 'Return to MIX LAB'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Cosmic Epoch Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {cosmicStages.map(stage => {
          const isSelected = stage.id === selectedStageId;
          return (
            <button
              key={stage.id}
              onClick={() => {
                labSound.playClick();
                setSelectedStageId(stage.id);
              }}
              className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-sky-500/20 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)] text-white'
                  : 'bg-sky-950/30 border-sky-900/60 text-sky-300 hover:border-sky-700'
              }`}
            >
              <div>
                <div className="text-[10px] font-mono text-sky-400/80 mb-1">{stage.epoch}</div>
                <div className="font-display font-bold text-sm leading-snug">
                  {isAr ? stage.titleAr : stage.title}
                </div>
              </div>
              <div 
                className="w-full h-1 rounded-full mt-3"
                style={{ backgroundColor: stage.color }}
              />
            </button>
          );
        })}
      </div>

      {/* Detailed Stage Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Detail Panel */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#020617] border border-sky-900/70 space-y-5">
          <div className="flex items-center justify-between">
            <span 
              className="text-xs font-mono uppercase px-3 py-1 rounded-full border font-bold"
              style={{ borderColor: currentStage.color, color: currentStage.color }}
            >
              {currentStage.epoch}
            </span>
            <span className="text-xs font-mono text-sky-400">
              {currentStage.temp}
            </span>
          </div>

          <h2 className="text-2xl font-display font-black text-white">
            {isAr ? currentStage.titleAr : currentStage.title}
          </h2>

          <p className="text-sm text-sky-200/90 leading-relaxed font-sans">
            {isAr ? currentStage.descriptionAr : currentStage.description}
          </p>

          <div className="pt-4 border-t border-sky-900/50">
            <h3 className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-3">
              {isAr ? 'العناصر والمركبات الناتجة عن هذه المرحلة:' : 'Elements Synthesized During This Process:'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(isAr ? currentStage.elementsCreatedAr : currentStage.elementsCreated).map((el, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-sky-950/80 border border-sky-800 text-xs font-mono text-sky-200 font-bold"
                >
                  {el}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Cosmic Crucible Quick Finder */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-sky-950/30 border border-sky-900/60 space-y-4">
          <h3 className="text-sm font-mono text-sky-400 uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'أين صُنعت مواد مختبر MIXON؟' : 'Where Was MIXON Matter Forged?'}</span>
          </h3>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-sky-950/50 border border-sky-900/70 flex items-center justify-between">
              <span className="text-white font-bold">{isAr ? 'الذهب (Au)' : 'Gold (Au)'}</span>
              <span className="text-amber-400">{isAr ? 'اندماج النجوم النيوترونية (Kilonova)' : 'Neutron Star Merger'}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-sky-950/50 border border-sky-900/70 flex items-center justify-between">
              <span className="text-white font-bold">{isAr ? 'الحديد (Fe)' : 'Iron (Fe)'}</span>
              <span className="text-red-400">{isAr ? 'انفجار المستعرات العظمى (Supernova)' : 'Supernova Collapse'}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-sky-950/50 border border-sky-900/70 flex items-center justify-between">
              <span className="text-white font-bold">{isAr ? 'الكربون (C)' : 'Carbon (C)'}</span>
              <span className="text-orange-400">{isAr ? 'عمالقة الفضاء الحمراء (Red Giant)' : 'Dying Red Giants'}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-sky-950/50 border border-sky-900/70 flex items-center justify-between">
              <span className="text-white font-bold">{isAr ? 'النحاس (Cu)' : 'Copper (Cu)'}</span>
              <span className="text-amber-600">{isAr ? 'المستعرات النجمية المتفجرة' : 'Exploding Massive Stars'}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-sky-950/50 border border-sky-900/70 flex items-center justify-between">
              <span className="text-white font-bold">{isAr ? 'الهيدروجين (H)' : 'Hydrogen (H)'}</span>
              <span className="text-sky-400">{isAr ? 'الانفجار العظيم (Big Bang)' : 'Primordial Big Bang'}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-sky-950/50 border border-sky-900/70 flex items-center justify-between">
              <span className="text-white font-bold">{isAr ? 'الماء (H₂O)' : 'Water (H₂O)'}</span>
              <span className="text-cyan-400">{isAr ? 'سحب الغبار بين النجوم' : 'Interstellar Nebulae'}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
