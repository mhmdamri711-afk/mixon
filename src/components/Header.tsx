import React from 'react';
import { 
  Atom, 
  Search, 
  FlaskConical, 
  Compass, 
  History, 
  Trophy, 
  Sparkles, 
  BookOpen, 
  Menu, 
  X,
  ShieldAlert,
  Languages,
  Bot,
  MessageSquare
} from 'lucide-react';
import { UserProgress } from '../types';
import { getRankFromXP } from '../data/challengesData';
import { labSound } from '../utils/sound';
import { AppLanguage } from '../utils/i18n';

export type NavTab = 'lab' | 'materials' | 'experiments' | 'discover' | 'challenges' | 'history' | 'creator';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  userProgress: UserProgress;
  onOpenSearch: () => void;
  onOpenSafetyNotice: () => void;
  onOpenProfile: () => void;
  onReturnHome: () => void;
  lang?: AppLanguage;
  onToggleLang?: () => void;
  onOpenAiTutor?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  userProgress,
  onOpenSearch,
  onOpenSafetyNotice,
  onOpenProfile,
  onReturnHome,
  lang = 'en',
  onToggleLang,
  onOpenAiTutor
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const rank = getRankFromXP(userProgress.xp);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; isAccent?: boolean }[] = [
    { id: 'lab', label: lang === 'ar' ? 'المختبر' : 'LAB', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'materials', label: lang === 'ar' ? 'المواد' : 'MATERIALS', icon: <Atom className="w-4 h-4" /> },
    { id: 'discover', label: lang === 'ar' ? 'استكشاف' : 'DISCOVER', icon: <Compass className="w-4 h-4" /> },
    { id: 'challenges', label: lang === 'ar' ? 'تحديات' : 'CHALLENGES', icon: <Trophy className="w-4 h-4" /> },
    { id: 'history', label: lang === 'ar' ? 'السجل' : 'HISTORY', icon: <History className="w-4 h-4" /> },
    { id: 'creator', label: lang === 'ar' ? 'المطور' : 'CREATOR', icon: <Sparkles className="w-4 h-4 text-amber-400" />, isAccent: true }
  ];

  const handleTabClick = (tab: NavTab) => {
    labSound.playClick();
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-sky-900/50 bg-[#020617]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6 sm:gap-8">
          <button
            onClick={() => {
              labSound.playClick();
              onReturnHome();
            }}
            className="group flex items-center gap-3 focus:outline-none"
            title="MIXON Home"
          >
            {/* Geometric diamond logo */}
            <div className="relative flex items-center justify-center w-7 h-7 border-2 border-sky-400 rotate-45 group-hover:rotate-90 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.6)] transition-all duration-300">
              <div className="w-2 h-2 bg-sky-400" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-xl sm:text-2xl tracking-[0.2em] text-white">
                MIX<span className="text-sky-400">ON</span>
              </span>
              <span className="text-[8px] font-tech text-sky-400/80 -mt-1 tracking-widest uppercase">
                Digital Lab
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium tracking-widest uppercase text-sky-300/60">
            {navItems.map(item => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-1.5 py-1 transition-all duration-200 cursor-pointer ${
                    active
                      ? item.isAccent
                        ? 'text-amber-400 border-b-2 border-amber-400 font-bold drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                        : 'text-sky-400 border-b-2 border-sky-400 font-bold drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]'
                      : item.isAccent
                      ? 'text-amber-400/80 hover:text-amber-300'
                      : 'hover:text-sky-300 hover:opacity-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Language Switcher */}
          {onToggleLang && (
            <button
              onClick={() => {
                labSound.playClick();
                onToggleLang();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-sky-950/40 hover:bg-sky-900/40 border border-sky-900/60 hover:border-sky-500/50 text-[11px] font-mono text-sky-300 font-bold transition cursor-pointer"
              title={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Languages className="w-3.5 h-3.5 text-sky-400" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>
          )}

          {/* Quick Search Button */}
          <button
            onClick={() => {
              labSound.playClick();
              onOpenSearch();
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/40 hover:bg-sky-900/30 border border-sky-900/50 hover:border-sky-500/60 text-sky-300 text-xs transition duration-150 font-tech"
            title="Quick Search (Ctrl + K)"
          >
            <Search className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline-block text-[9px] font-code bg-sky-900/40 px-1.5 py-0.5 rounded text-sky-400/80 border border-sky-800/60">
              /
            </kbd>
          </button>

          {/* MIXON AI Tutor Chat Button */}
          {onOpenAiTutor && (
            <button
              id="mixon-ai-tutor-header-btn"
              onClick={() => {
                labSound.playClick();
                onOpenAiTutor();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-600/30 to-blue-600/30 hover:from-sky-500/40 hover:to-blue-500/40 border border-sky-400/60 hover:border-sky-400 text-sky-200 hover:text-white text-xs font-display font-bold tracking-wider transition shadow-[0_0_15px_rgba(56,189,248,0.25)] cursor-pointer"
              title={lang === 'ar' ? 'معلم ميكسون الذكي (محادثة نصية)' : 'MIXON AI Tutor (Text Chat)'}
            >
              <Bot className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">
                {lang === 'ar' ? 'المعلم الذكي' : 'AI TUTOR'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse hidden sm:inline-block" />
            </button>
          )}

          {/* Safety Protocol Indicator */}
          <button
            onClick={onOpenSafetyNotice}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-sky-950/40 border border-sky-900/50 hover:border-amber-500/40 text-[11px] font-tech text-amber-400/90 transition"
            title="Digital Simulation Safety Protocol"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xl:inline">Simulation Only</span>
          </button>

          {/* XP & Level Badge */}
          <button
            onClick={() => {
              labSound.playClick();
              onOpenProfile();
            }}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-lg bg-sky-950/40 border border-sky-900/50 hover:border-sky-500/60 transition"
            title="Scientist Profile & XP"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded bg-gradient-to-br from-sky-500 to-blue-700 text-black font-display font-black text-xs shadow-[0_0_10px_rgba(56,189,248,0.4)]">
              {rank.level}
            </div>
            <div className="hidden sm:flex flex-col text-left font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-sky-300 tracking-wider">
                  LVL {rank.level}
                </span>
                <span className="text-[9px] text-sky-500 tracking-tighter uppercase">
                  • {rank.title}
                </span>
              </div>
              <div className="w-20 h-1 bg-sky-950 rounded-full overflow-hidden mt-0.5 border border-sky-900/40">
                <div 
                  className="h-full bg-sky-400 transition-all duration-500" 
                  style={{ width: `${rank.progressPercent}%` }} 
                />
              </div>
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="lg:hidden p-2 text-sky-300 hover:text-white rounded-lg bg-sky-950/40 border border-sky-900/50"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-sky-900/50 bg-[#020617] px-4 py-3 space-y-1">
          {navItems.map(item => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-display font-bold tracking-wider uppercase transition cursor-pointer ${
                  active
                    ? item.isAccent
                      ? 'bg-amber-950/50 text-amber-300 border border-amber-500/60 shadow-[0_0_15px_rgba(251,191,36,0.25)]'
                      : 'bg-sky-950/60 text-sky-400 border border-sky-500/50'
                    : item.isAccent
                    ? 'text-amber-400/90 hover:bg-amber-950/30'
                    : 'text-sky-300/70 hover:bg-sky-950/30'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}

          {onOpenAiTutor && (
            <button
              onClick={() => {
                labSound.playClick();
                setMobileMenuOpen(false);
                onOpenAiTutor();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 mt-2 rounded-lg text-sm font-display font-bold tracking-wider uppercase bg-gradient-to-r from-sky-600/20 to-blue-600/20 text-sky-300 border border-sky-400/50 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-sky-400" />
              <span>{lang === 'ar' ? 'معلم ميكسون الذكي (AI TUTOR)' : 'MIXON AI TUTOR (CHAT)'}</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
