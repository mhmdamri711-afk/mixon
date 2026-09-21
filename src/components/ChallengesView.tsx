import React from 'react';
import { Challenge, UserProgress } from '../types';
import { getRankFromXP } from '../data/challengesData';
import { 
  Trophy, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Flame, 
  ShieldCheck, 
  Lock
} from 'lucide-react';
import { labSound } from '../utils/sound';
import { AppLanguage } from '../utils/i18n';

interface ChallengesViewProps {
  challenges: Challenge[];
  userProgress: UserProgress;
  onGoToLab: () => void;
  lang?: AppLanguage;
}

const SCIENTIST_TIERS = [
  { level: 1, title: 'Explorer', titleAr: 'مستكشف', xp: '0 - 150 XP', desc: 'Acquaint yourself with the atomic catalog and initiate your first simulations.', descAr: 'استكشف فهرس العناصر وأطلق أولى محاكياتك للمادة.' },
  { level: 2, title: 'Observer', titleAr: 'ملاحظ علمي', xp: '150 - 350 XP', desc: 'Notice phase changes, molecular bonding geometries, and thermal dynamics.', descAr: 'لاحظ تغيرات حالات المادة، وهندسة الروابط الجزيئية، والديناميكا الحرارية.' },
  { level: 3, title: 'Researcher', titleAr: 'باحث مخبري', xp: '350 - 650 XP', desc: 'Synthesize complex compounds, solve challenges, and isolate reactive pairs.', descAr: 'خلّق مركبات معقدة، وأنجز التحديات، واعزل الأزواج التفاعلية.' },
  { level: 4, title: 'Scientist', titleAr: 'عالم تجريبي', xp: '650 - 1000 XP', desc: 'Master intermetallic transformations, space matter, and aneutronic fusion.', descAr: 'أتقن التحولات الفلزية المعقدة، وفيزياء الفضاء، والاندماج النووي الرقمي.' },
  { level: 5, title: 'Master of Matter', titleAr: 'سيد المادة', xp: '1000+ XP', desc: 'Supreme mastery of digital chemical synthesis and quantum molecular modeling.', descAr: 'السيادة التامة على التخليق الكيميائي والنمذجة الجزيئية الكمومية.' }
];

export const ChallengesView: React.FC<ChallengesViewProps> = ({
  challenges,
  userProgress,
  onGoToLab,
  lang = 'en'
}) => {
  const currentRank = getRankFromXP(userProgress.xp);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Page Header */}
      <div className="border-b border-sky-900/50 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-4 h-4 border border-sky-400 rotate-45 flex items-center justify-center">
            <div className="w-1 h-1 bg-sky-400" />
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-widest uppercase">
            {lang === 'ar' ? (
              <>تحديات <span className="text-sky-400">التجارب العلمية</span></>
            ) : (
              <>EXPERIMENT <span className="text-sky-400">CHALLENGES</span></>
            )}
          </h1>
        </div>
        <p className="text-sm text-sky-200/80 mt-1">
          {lang === 'ar'
            ? 'أكمل مهام المحاكاة الرقمية لكسب نقاط الخبرة XP والارتقاء برتبتك العلمية في مختبر MIXON.'
            : 'Complete digital simulation objectives to earn XP and level up your scientific rank.'}
        </p>
      </div>

      {/* Scientist Tier Progression Card */}
      <div className="p-6 rounded-xl bg-[#020617] border border-sky-900/40 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Current Rank Badge */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded border border-sky-400 bg-sky-950/60 flex items-center justify-center text-sky-400 font-mono font-bold text-3xl shadow-[0_0_20px_rgba(14,165,233,0.3)]">
              {currentRank.level}
            </div>
            <div>
              <div className="text-xs font-mono text-sky-500 uppercase tracking-widest">
                {lang === 'ar' ? 'الرتبة العلمية الحالية' : 'Current Scientific Rank'}
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                {lang === 'ar' ? `المستوى ${currentRank.level} — ${currentRank.titleAr}` : `LEVEL ${currentRank.level} — ${currentRank.title.toUpperCase()}`}
              </h2>
              <div className="text-xs text-sky-200/80 font-sans mt-0.5">
                {lang === 'ar' ? `إجمالي نقاط الخبرة: ` : `Total XP: `}
                <strong className="text-sky-300 font-mono">{userProgress.xp} XP</strong>
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="w-full md:w-72 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-sky-500">
                {lang === 'ar' ? 'التقدم للمستوى القادم' : 'Progress to Next Tier'}
              </span>
              <span className="text-sky-400 font-bold">{currentRank.progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-[#020617] rounded-full overflow-hidden border border-sky-900/60">
              <div
                className="h-full bg-sky-500 transition-all duration-700 shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                style={{ width: `${currentRank.progressPercent}%` }}
              />
            </div>
            <div className="text-right text-[10px] font-mono text-sky-600">
              {lang === 'ar' ? `الهدف: ${currentRank.nextLevelXP} XP` : `Target: ${currentRank.nextLevelXP} XP`}
            </div>
          </div>

        </div>

        {/* Tiers Visual Roadmap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-6 pt-6 border-t border-sky-900/50">
          {SCIENTIST_TIERS.map(tier => {
            const isReached = currentRank.level >= tier.level;
            const isCurrent = currentRank.level === tier.level;

            return (
              <div
                key={tier.level}
                className={`p-3 rounded-xl border text-xs transition ${
                  isCurrent
                    ? 'bg-sky-950/40 border-sky-400 text-sky-200 shadow-[0_0_15px_rgba(14,165,233,0.2)]'
                    : isReached
                    ? 'bg-[#020617] border-sky-800 text-sky-200'
                    : 'bg-[#020617] border-sky-950 text-sky-700 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between font-mono font-bold uppercase mb-1">
                  <span>{lang === 'ar' ? `المستوى ${tier.level}` : `LVL 0${tier.level}`}</span>
                  {isReached ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-sky-800" />
                  )}
                </div>
                <div className="font-display font-bold text-sm text-white truncate">
                  {lang === 'ar' ? tier.titleAr : tier.title}
                </div>
                <div className="text-[10px] text-sky-500 font-mono mt-0.5">{tier.xp}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Challenges List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-black text-xl text-white tracking-widest uppercase">
            {lang === 'ar' ? 'التحديات المتاحة' : 'AVAILABLE CHALLENGES'}
          </h2>
          <span className="text-xs font-mono text-sky-400">
            {challenges.filter(c => c.completed).length} / {challenges.length} {lang === 'ar' ? 'مكتمل' : 'COMPLETED'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((ch, idx) => {
            return (
              <div
                key={ch.id}
                className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                  ch.completed
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-[#020617] hover:bg-sky-950/20 border-sky-900/40 hover:border-sky-500/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-sky-500 font-bold uppercase tracking-wider">
                      {lang === 'ar' ? `تحدي 0${idx + 1}` : `CHALLENGE 0${idx + 1}`}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-xs font-mono text-sky-300 font-bold">
                      +{ch.xpReward} XP
                    </span>
                  </div>

                  <h3 className="font-display font-black text-lg text-white mt-2">
                    {lang === 'ar' ? (ch.titleAr || ch.title) : ch.title}
                  </h3>
                  {lang !== 'ar' && ch.titleAr && (
                    <span className="text-xs text-sky-400/80 block font-sans">
                      {ch.titleAr}
                    </span>
                  )}

                  <p className="text-xs text-sky-200/80 mt-2 leading-relaxed font-sans">
                    {ch.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-sky-900/50 flex items-center justify-between">
                  {ch.completed ? (
                    <div className="flex items-center gap-1.5 text-xs font-display font-bold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'تم إنجاز الهدف' : 'OBJECTIVE COMPLETED'}</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        labSound.playClick();
                        onGoToLab();
                      }}
                      className="flex items-center gap-1 text-xs font-mono text-sky-400 hover:text-sky-300 uppercase tracking-wider hover:underline cursor-pointer"
                    >
                      <span>{lang === 'ar' ? 'فتح في مختبر التفاعلات' : 'Open in Mix Lab'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
