import React from 'react';
import { UserProgress } from '../types';
import { getRankFromXP } from '../data/challengesData';
import { Trophy, X, Award, Atom, FlaskConical, Sparkles, CheckCircle2 } from 'lucide-react';
import { labSound } from '../utils/sound';
import { AppLanguage } from '../utils/i18n';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProgress: UserProgress;
  totalMaterialsCount: number;
  onOpenCreator?: () => void;
  lang?: AppLanguage;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  userProgress,
  totalMaterialsCount,
  onOpenCreator,
  lang = 'en'
}) => {
  if (!isOpen) return null;

  const rank = getRankFromXP(userProgress.xp);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md rounded-xl bg-[#020617] border border-sky-900/50 shadow-[0_0_50px_rgba(14,165,233,0.25)] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-sky-900/50 bg-[#020617]/95">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-sky-400" />
            <h2 className="font-display font-black text-sm text-white tracking-widest uppercase">
              Scientist Dossier
            </h2>
          </div>
          <button onClick={onClose} className="text-sky-500 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs">
          
          {/* Rank Badge */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-sky-950/20 border border-sky-900/40">
            <div className="w-14 h-14 rounded border border-sky-400 bg-sky-950/60 flex items-center justify-center text-sky-400 font-mono font-bold text-2xl shadow-[0_0_20px_rgba(14,165,233,0.3)]">
              {rank.level}
            </div>
            <div>
              <div className="text-[10px] font-mono text-sky-500 uppercase tracking-widest">Rank Status</div>
              <h3 className="font-display font-black text-xl text-white">
                LEVEL {rank.level} — {rank.title}
              </h3>
              <div className="text-sky-200/80 font-sans mt-0.5">
                {rank.titleAr} • <span className="font-mono text-sky-300">{userProgress.xp} XP Earned</span>
              </div>
            </div>
          </div>

          {/* XP Progress */}
          <div className="space-y-1.5 font-mono">
            <div className="flex justify-between text-sky-500">
              <span>Next Rank Milestone:</span>
              <span className="text-sky-400 font-bold">{rank.nextLevelXP} XP</span>
            </div>
            <div className="w-full h-2 bg-[#020617] rounded-full overflow-hidden border border-sky-900/60">
              <div
                className="h-full bg-sky-500 transition-all duration-500"
                style={{ width: `${rank.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Laboratory Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[#020617] border border-sky-900/40">
              <div className="text-sky-500 font-mono text-[10px] uppercase">Materials Explored</div>
              <div className="font-display font-bold text-lg text-white mt-1">
                {userProgress.discoveredMaterialIds?.length || 0} / {totalMaterialsCount}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#020617] border border-sky-900/40">
              <div className="text-sky-500 font-mono text-[10px] uppercase">Reactions Discovered</div>
              <div className="font-display font-bold text-lg text-sky-300 mt-1">
                {userProgress.discoveredReactionIds?.length || 0}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#020617] border border-sky-900/40 col-span-2 flex items-center justify-between">
              <div>
                <div className="text-sky-500 font-mono text-[10px] uppercase">Completed Challenges</div>
                <div className="font-display font-bold text-base text-emerald-300 mt-0.5">
                  {userProgress.completedChallengeIds?.length || 0} Objectives Cleared
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#020617] border-t border-sky-900/50 flex items-center justify-between">
          {onOpenCreator ? (
            <button
              onClick={() => {
                onClose();
                labSound.playClick();
                onOpenCreator();
              }}
              className="text-[11px] font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'ar' ? 'عن المطور (محمد سلطان العمري)' : 'About Creator (Muhammad Sultan Al-Amri)'}</span>
            </button>
          ) : <div />}

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-sky-950 hover:bg-sky-900 text-sky-300 border border-sky-800 text-xs font-mono uppercase transition cursor-pointer"
          >
            {lang === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
