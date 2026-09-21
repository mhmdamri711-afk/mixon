import React, { useEffect } from 'react';
import { ReactionResult } from '../types';
import { AppLanguage, TRANSLATIONS } from '../utils/i18n';
import { Sparkles, Bot, ArrowRight, CheckCircle2, FlaskConical } from 'lucide-react';
import confetti from 'canvas-confetti';
import { labSound } from '../utils/sound';

interface DiscoveryModalProps {
  isOpen: boolean;
  result: ReactionResult | null;
  lang: AppLanguage;
  onClose: () => void;
  onOpenAiTutor: (result: ReactionResult) => void;
}

export const DiscoveryModal: React.FC<DiscoveryModalProps> = ({
  isOpen,
  result,
  lang,
  onClose,
  onOpenAiTutor
}) => {
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (isOpen && result) {
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.45 },
          colors: ['#38bdf8', '#818cf8', '#facc15', '#ffffff']
        });
      } catch {}

      labSound.playReactionSuccess();
    }
  }, [isOpen, result?.id, lang]);

  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md rounded-2xl bg-[#020617] border border-sky-400/60 p-6 shadow-[0_0_60px_rgba(56,189,248,0.3)] text-center text-sky-100 flex flex-col items-center"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        
        {/* Glowing Discovery Badge */}
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-black font-black shadow-[0_0_25px_rgba(56,189,248,0.6)] animate-pulse">
            <FlaskConical className="w-8 h-8 text-black" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-xs shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-sky-950 border border-sky-800 text-[11px] font-mono tracking-widest text-sky-400 uppercase mb-2">
          {t.newDiscovery}
        </div>

        {/* Output Name & Formula */}
        <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-wide mb-1">
          {result.outputName}
        </h2>
        <div className="font-mono text-sm text-sky-400 bg-sky-950/80 px-3 py-1 rounded border border-sky-900/80 mb-4">
          {result.outputFormula}
        </div>

        {/* Observation text */}
        <p className="text-xs sm:text-sm text-sky-200/90 leading-relaxed mb-6 px-2">
          {result.observedChange}
        </p>

        {/* Action Buttons */}
        <div className="w-full space-y-2.5">
          {/* Ask AI Tutor directly */}
          <button
            onClick={() => {
              labSound.playClick();
              onOpenAiTutor(result);
              onClose();
            }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-black font-display font-bold text-sm tracking-wider uppercase transition flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(14,165,233,0.4)] cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            <span>{lang === 'ar' ? 'اشرح لي ما حدث علميًا (AI TUTOR)' : 'Teach Me What Happened (AI TUTOR)'}</span>
          </button>

          {/* Continue Exploring */}
          <button
            onClick={() => {
              labSound.playClick();
              onClose();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-sky-950/60 hover:bg-sky-900/60 border border-sky-800 text-sky-300 hover:text-white text-xs font-mono tracking-wider transition cursor-pointer"
          >
            {lang === 'ar' ? 'متابعة الاستكشاف في المختبر' : 'Continue Laboratory Exploration'}
          </button>
        </div>

      </div>
    </div>
  );
};
