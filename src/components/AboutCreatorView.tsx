import React from 'react';
import { AppLanguage, TRANSLATIONS } from '../utils/i18n';
import { Sparkles, Code2, Compass, Award, Rocket, CheckCircle2, ChevronRight, Terminal, Heart } from 'lucide-react';
import { labSound } from '../utils/sound';

interface AboutCreatorViewProps {
  lang: AppLanguage;
  onOpenLab: () => void;
}

export const AboutCreatorView: React.FC<AboutCreatorViewProps> = ({
  lang,
  onOpenLab
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div 
      className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-10 animate-fadeIn"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Hero Badge & Introduction */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/60 border border-sky-800/80 text-[11px] font-mono tracking-widest text-sky-400 uppercase">
          <Terminal className="w-3.5 h-3.5 text-sky-400" />
          <span>{t.aboutTitle}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight">
          {t.aboutCreatorName}
        </h1>

        <div className="flex items-center justify-center text-xs font-mono text-sky-400">
          <span className="px-2.5 py-1 rounded bg-sky-950 border border-sky-800">
            {t.aboutRole}
          </span>
        </div>

        <p className="text-sm sm:text-base text-sky-200/90 leading-relaxed font-sans pt-2">
          {t.aboutBio}
        </p>

        {/* Guiding Mission Statement */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/80 to-blue-950/80 border border-sky-500/40 text-sky-200">
          <span className="text-[11px] font-mono text-sky-400 uppercase tracking-widest block mb-1">
            {lang === 'ar' ? 'الرسالة والرؤية' : 'CORE MISSION'}
          </span>
          <div className="text-lg sm:text-xl font-display font-bold text-white tracking-wide">
            "{t.aboutMission}"
          </div>
        </div>
      </div>

      {/* Interactive Project Milestones Timeline: Idea -> Design -> Development -> MIXON */}
      <div className="space-y-4">
        <h2 className="text-sm font-mono tracking-widest uppercase text-sky-400 flex items-center gap-2">
          <Rocket className="w-4 h-4 text-sky-400" />
          <span>{lang === 'ar' ? 'مراحل بناء وتطور المشروع' : 'Evolution Milestones'}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.aboutTimeline.map((item, idx) => {
            const icons = [
              <Sparkles className="w-5 h-5 text-amber-400" />,
              <Compass className="w-5 h-5 text-sky-400" />,
              <Code2 className="w-5 h-5 text-indigo-400" />,
              <Award className="w-5 h-5 text-emerald-400" />
            ];

            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-sky-950/30 border border-sky-900/60 hover:border-sky-500/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-900/40 border border-sky-800 flex items-center justify-center">
                      {icons[idx]}
                    </div>
                    <span className="text-xs font-mono text-sky-600 font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-sky-400 transition">
                    {item.title}
                  </h3>

                  <p className="text-xs text-sky-300/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-sky-900/40 flex items-center gap-1.5 text-[10px] font-mono text-sky-500">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{lang === 'ar' ? 'مكتمل ومدمج' : 'Engine Implemented'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Laboratory Signature Card */}
      <div className="p-6 rounded-2xl bg-[#020617] border border-sky-900/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <div className="font-display font-bold text-base sm:text-lg text-white">
            MIXON — A Real Digital Matter Laboratory
          </div>
          <div className="text-xs font-mono text-sky-400/90">
            {t.aboutSignature}
          </div>
        </div>

        <button
          onClick={() => {
            labSound.playClick();
            onOpenLab();
          }}
          className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-display font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-[0_0_20px_rgba(14,165,233,0.3)] cursor-pointer"
        >
          <span>{lang === 'ar' ? 'العودة للمختبر' : 'Enter MIX LAB'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
