import React, { useState, useEffect } from 'react';
import { Material, ReactionResult, ExperimentHistoryItem, UserProgress, Challenge } from './types';
import { INITIAL_MATERIALS } from './data/materialsData';
import { INITIAL_CHALLENGES } from './data/challengesData';
import { 
  loadUserProgress, 
  saveUserProgress, 
  loadExperimentHistory, 
  saveExperimentHistory, 
  clearExperimentHistory 
} from './utils/storage';
import { Header, NavTab } from './components/Header';
import { HeroWelcome } from './components/HeroWelcome';
import { MixLabView } from './components/MixLabView';
import { MaterialExplorerView } from './components/MaterialExplorerView';
import { MaterialProfileModal } from './components/MaterialProfileModal';
import { DiscoverView } from './components/DiscoverView';
import { ChallengesView } from './components/ChallengesView';
import { HistoryView } from './components/HistoryView';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { SafetyModal } from './components/SafetyModal';
import { CustomMaterialModal } from './components/CustomMaterialModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AboutCreatorView } from './components/AboutCreatorView';
import { MixonAITutorModal, MixonAITutorContext } from './components/MixonAITutorModal';
import { DiscoveryModal } from './components/DiscoveryModal';
import { RatingModal } from './components/RatingModal';
import { AppLanguage, getInitialLanguage, saveLanguagePreference } from './utils/i18n';
import { Sparkles, Bot, Trophy, X, Star } from 'lucide-react';
import { labSound } from './utils/sound';
import confetti from 'canvas-confetti';

export default function App() {
  // App Language State
  const [lang, setLang] = useState<AppLanguage>(getInitialLanguage);

  const handleToggleLang = () => {
    const nextLang: AppLanguage = lang === 'en' ? 'ar' : 'en';
    setLang(nextLang);
    saveLanguagePreference(nextLang);
  };

  // App View Mode: 'welcome' hero screen or 'lab' dashboard
  const [appMode, setAppMode] = useState<'welcome' | 'lab'>('welcome');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Active Lab Navigation Tab
  const [activeTab, setActiveTab] = useState<NavTab>('lab');

  // Materials & Custom Materials
  const [materials, setMaterials] = useState<Material[]>(() => {
    try {
      const storedCustom = localStorage.getItem('mixon_custom_materials');
      if (storedCustom) {
        return [...INITIAL_MATERIALS, ...JSON.parse(storedCustom)];
      }
    } catch {}
    return INITIAL_MATERIALS;
  });

  // Selected Slots in Mix Lab
  const [slotA, setSlotA] = useState<Material | null>(null);
  const [slotB, setSlotB] = useState<Material | null>(null);

  // Modals
  const [inspectingMaterial, setInspectingMaterial] = useState<Material | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [aiTutorContext, setAiTutorContext] = useState<MixonAITutorContext>({});
  const [aiTutorPrompt, setAiTutorPrompt] = useState<string | undefined>(undefined);
  const [discoveryResult, setDiscoveryResult] = useState<ReactionResult | null>(null);
  const [unlockedToast, setUnlockedToast] = useState<{ id: string; title: string; titleAr: string; xpReward: number } | null>(null);

  const triggerAchievementToast = (ch: { id: string; title: string; titleAr: string; xpReward: number }) => {
    labSound.playReactionSuccess();
    try {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.35 },
        colors: ['#00d2ff', '#10b981', '#f59e0b', '#ffffff']
      });
    } catch {}
    setUnlockedToast(ch);
    setTimeout(() => {
      setUnlockedToast(prev => (prev?.id === ch.id ? null : prev));
    }, 4500);
  };

  const handleOpenAiTutor = (ctx?: MixonAITutorContext | any, prompt?: string) => {
    const safeContext: MixonAITutorContext = ctx
      ? (ctx.outputFormula ? { currentResult: ctx } : ctx)
      : {};
    setAiTutorContext(safeContext);
    setAiTutorPrompt(prompt);
    setIsAiTutorOpen(true);
  };

  // Persistent User Progress & Experiment History
  const [userProgress, setUserProgress] = useState<UserProgress>(loadUserProgress);
  const [history, setHistory] = useState<ExperimentHistoryItem[]>(loadExperimentHistory);
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const loaded = loadUserProgress();
    return INITIAL_CHALLENGES.map(c => ({
      ...c,
      completed: loaded.completedChallengeIds.includes(c.id)
    }));
  });

  // Inspected inert materials tracker for challenge
  const [inspectedInertIds, setInspectedInertIds] = useState<string[]>([]);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) && !isSearchOpen) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Transition into the Lab with futuristic effect
  const handleEnterLab = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setAppMode('lab');
      setIsTransitioning(false);
    }, 700);
  };

  // Add XP helper
  const addXP = (amount: number, reason?: string) => {
    setUserProgress(prev => {
      const newXP = prev.xp + amount;
      const updated: UserProgress = {
        ...prev,
        xp: newXP
      };
      saveUserProgress(updated);
      return updated;
    });
  };

  // Check and update challenges
  const checkChallengesOnReaction = (result: ReactionResult, matA: Material, matB: Material) => {
    let xpGained = 0;
    const completedNow: string[] = [];

    setChallenges(prevChallenges => {
      return prevChallenges.map(ch => {
        if (ch.completed) return ch;

        let shouldComplete = false;

        // Challenge 1: State Change
        if (ch.targetType === 'state_change') {
          if (result.hasOccurred !== false && (result.outputState !== matA.state || result.outputState !== matB.state)) {
            shouldComplete = true;
          }
        }

        // Challenge 3: Thermal Surge (energy >= 300)
        if (ch.targetType === 'high_energy') {
          if (result.hasOccurred !== false && result.energyValue >= 300) {
            shouldComplete = true;
          }
        }

        // Challenge 4: Oxide synthesis
        if (ch.targetType === 'oxide') {
          if (result.hasOccurred !== false && (matA.id === 'oxygen' || matB.id === 'oxygen')) {
            shouldComplete = true;
          }
        }

        // Challenge 5: Space matter
        if (ch.targetType === 'space_matter') {
          if (matA.category === 'Space' || matB.category === 'Space') {
            shouldComplete = true;
          }
        }

        // Challenge 6: Multi combines
        if (ch.targetType === 'multi_combines') {
          if (history.length + 1 >= 3) {
            shouldComplete = true;
          }
        }

        if (shouldComplete) {
          xpGained += ch.xpReward;
          completedNow.push(ch.id);
          return { ...ch, completed: true };
        }

        return ch;
      });
    });

    if (completedNow.length > 0) {
      const firstCh = INITIAL_CHALLENGES.find(c => c.id === completedNow[0]);
      if (firstCh) {
        triggerAchievementToast(firstCh);
      }

      setUserProgress(prev => {
        const updated: UserProgress = {
          ...prev,
          xp: prev.xp + xpGained,
          completedChallengeIds: Array.from(new Set([...prev.completedChallengeIds, ...completedNow]))
        };
        saveUserProgress(updated);
        return updated;
      });
    }
  };

  // Inspect material action (awards XP for discovery)
  const handleInspectMaterial = (material: Material) => {
    setInspectingMaterial(material);

    // Track for Noble Guardians challenge
    if (material.reactivity === 'Inert' && !inspectedInertIds.includes(material.id)) {
      const nextInerts = [...inspectedInertIds, material.id];
      setInspectedInertIds(nextInerts);

      if (nextInerts.length >= 3) {
        setChallenges(prev => prev.map(c => {
          if (c.targetType === 'same_property' && !c.completed) {
            addXP(c.xpReward);
            triggerAchievementToast(c);
            return { ...c, completed: true };
          }
          return c;
        }));
        setUserProgress(prev => {
          const updated = {
            ...prev,
            completedChallengeIds: Array.from(new Set([...prev.completedChallengeIds, 'ch_inert_three']))
          };
          saveUserProgress(updated);
          return updated;
        });
      }
    }

    // Mark as discovered & trigger "Discover New Material" challenge
    if (!userProgress.discoveredMaterialIds.includes(material.id)) {
      const newlyCompleted: string[] = [];
      let extraXP = 15;

      const isDiscoverMaterialCompleted = userProgress.completedChallengeIds.includes('ch_discover_material');
      if (!isDiscoverMaterialCompleted) {
        newlyCompleted.push('ch_discover_material');
        const ch = INITIAL_CHALLENGES.find(c => c.id === 'ch_discover_material');
        const chReward = ch ? ch.xpReward : 100;
        extraXP += chReward;

        setChallenges(prev => prev.map(c => 
          c.id === 'ch_discover_material' ? { ...c, completed: true } : c
        ));

        triggerAchievementToast({
          id: 'ch_discover_material',
          title: ch?.title || 'Discover New Material',
          titleAr: ch?.titleAr || 'استكشاف مادة جديدة',
          xpReward: chReward
        });
      }

      setUserProgress(prev => {
        const updated: UserProgress = {
          ...prev,
          xp: prev.xp + extraXP,
          discoveredMaterialIds: [...prev.discoveredMaterialIds, material.id],
          completedChallengeIds: Array.from(new Set([...prev.completedChallengeIds, ...newlyCompleted]))
        };
        saveUserProgress(updated);
        return updated;
      });
    }
  };

  // Load into lab chamber slot A or B
  const handleLoadToLab = (material: Material, slot: 'A' | 'B') => {
    if (slot === 'A') setSlotA(material);
    else setSlotB(material);
    setActiveTab('lab');
  };

  // Stage combination from Discover / Surprise Me
  const handleStageCombination = (matA: Material, matB: Material) => {
    setSlotA(matA);
    setSlotB(matB);
    setActiveTab('lab');
  };

  // Save experiment to history
  const handleSaveExperiment = (matA: Material, matB: Material, result: ReactionResult) => {
    const newItem: ExperimentHistoryItem = {
      id: `exp_${Date.now()}`,
      timestamp: Date.now(),
      materialA: matA,
      materialB: matB,
      result
    };
    const newHistory = [newItem, ...history];
    setHistory(newHistory);
    saveExperimentHistory(newHistory);
    addXP(10, 'Experiment Saved');
  };

  // Clear history
  const handleClearHistory = () => {
    clearExperimentHistory();
    setHistory([]);
  };

  // Add custom synthesized material
  const handleAddCustomMaterial = (newMat: Material) => {
    const updated = [newMat, ...materials];
    setMaterials(updated);
    try {
      const customsOnly = updated.filter(m => m.custom);
      localStorage.setItem('mixon_custom_materials', JSON.stringify(customsOnly));
    } catch {}
    addXP(50, 'Custom Matter Synthesized');
    handleInspectMaterial(newMat);
  };

  // Simulation finished event
  const handleReactionFinished = (result: ReactionResult, matA: Material, matB: Material) => {
    // Record reaction discovery only if a verified chemical reaction actually occurred
    if (result.hasOccurred !== false) {
      if (!userProgress.discoveredReactionIds.includes(result.id)) {
        setUserProgress(prev => {
          const updated: UserProgress = {
            ...prev,
            xp: prev.xp + 30,
            discoveredReactionIds: [...prev.discoveredReactionIds, result.id]
          };
          saveUserProgress(updated);
          return updated;
        });

        // Launch DiscoveryModal for newly synthesized reaction outcome!
        setDiscoveryResult(result);
      } else {
        addXP(10, 'Simulation Executed');
      }
    } else {
      // Inactive contact or no reaction tested: award 5 XP for scientific investigation
      addXP(5, 'Tested Non-Reactive Combination');
    }

    // Evaluate challenges
    checkChallengesOnReaction(result, matA, matB);
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] text-[#E0F2FE] flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200 overflow-x-hidden relative">
      
      {/* Subtle Geometric Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#1e40af_0%,transparent_70%)]" />

      {/* Iris Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 bg-[#020617] flex flex-col items-center justify-center animate-pulse">
          <div className="w-8 h-8 border-2 border-sky-400 rotate-45 flex items-center justify-center mb-4">
            <div className="w-2 h-2 bg-sky-400" />
          </div>
          <div className="font-display font-black text-2xl text-sky-400 tracking-[0.25em] uppercase">
            CALIBRATING MIXON LAB...
          </div>
          <div className="w-48 h-1 bg-sky-950 rounded-full overflow-hidden mt-4 border border-sky-900/40">
            <div className="h-full bg-sky-400 animate-pulse w-full" />
          </div>
        </div>
      )}

      {/* View Switching: Welcome Hero vs Lab Dashboard */}
      {appMode === 'welcome' ? (
        <HeroWelcome 
          onEnterLab={handleEnterLab}
          onOpenCreator={() => {
            setAppMode('lab');
            setActiveTab('creator');
          }}
          lang={lang}
        />
      ) : (
        <div className="flex flex-col min-h-screen relative z-10">
          
          {/* Top Sci-Fi Navigation Header */}
          <Header
            activeTab={activeTab}
            onSelectTab={(tab) => setActiveTab(tab)}
            userProgress={userProgress}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenSafetyNotice={() => setIsSafetyOpen(true)}
            onOpenProfile={() => setIsProfileOpen(true)}
            onReturnHome={() => setAppMode('welcome')}
            lang={lang}
            onToggleLang={handleToggleLang}
            onOpenAiTutor={() => handleOpenAiTutor({
              materialA: slotA,
              materialB: slotB,
              discoveryCount: (userProgress?.discoveredReactionIds?.length || 0) + (userProgress?.discoveredMaterialIds?.length || 0)
            })}
          />

          {/* Main Content Area */}
          <main className="flex-1 pb-12">
            {activeTab === 'lab' && (
              <MixLabView
                materials={materials}
                selectedSlotA={slotA}
                selectedSlotB={slotB}
                onSetSlotA={setSlotA}
                onSetSlotB={setSlotB}
                onSaveExperiment={handleSaveExperiment}
                onInspectMaterial={handleInspectMaterial}
                onReactionFinished={handleReactionFinished}
                lang={lang}
                onOpenAiTutor={handleOpenAiTutor}
              />
            )}

            {activeTab === 'materials' && (
              <MaterialExplorerView
                materials={materials}
                onSelectMaterial={handleInspectMaterial}
                onLoadToLab={handleLoadToLab}
                onOpenCustomCreator={() => setIsCustomOpen(true)}
                lang={lang}
              />
            )}

            {activeTab === 'discover' && (
              <DiscoverView
                materials={materials}
                onInspectMaterial={handleInspectMaterial}
                onStageCombination={handleStageCombination}
                lang={lang}
              />
            )}

            {activeTab === 'challenges' && (
              <ChallengesView
                challenges={challenges}
                userProgress={userProgress}
                onGoToLab={() => setActiveTab('lab')}
                lang={lang}
              />
            )}

            {activeTab === 'history' && (
              <HistoryView
                history={history}
                onReplayExperiment={(matA, matB) => {
                  setSlotA(matA);
                  setSlotB(matB);
                  setActiveTab('lab');
                }}
                onClearHistory={handleClearHistory}
                onGoToLab={() => setActiveTab('lab')}
                lang={lang}
              />
            )}

            {activeTab === 'creator' && (
              <AboutCreatorView
                lang={lang}
                onOpenLab={() => setActiveTab('lab')}
              />
            )}
          </main>

          {/* Geometric Balance Telemetry Footer */}
          <footer className="w-full h-11 border-t border-sky-900/50 bg-[#020617]/95 px-4 sm:px-8 flex items-center justify-between text-[10px] font-mono z-10 text-sky-400/80">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sky-300">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                <span className="font-bold text-emerald-400">SYSTEM ONLINE</span>
              </div>
              <span className="text-sky-900 hidden md:inline">|</span>
              <span className="text-sky-600 hidden md:inline">CORE: 24.1.0-SIM</span>
              <span className="text-sky-900 hidden lg:inline">|</span>
              <span className="text-sky-600 hidden lg:inline">UI-LATENCY: 4ms</span>
            </div>

            {/* EXP Progress Meter */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sky-600">EXP:</span>
                <span className="text-sky-300 font-bold">{userProgress.xp.toLocaleString()} XP</span>
                <div className="w-24 sm:w-32 h-1.5 bg-sky-950 rounded-full overflow-hidden border border-sky-900/50">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-600 to-sky-400 transition-all duration-500" 
                    style={{ width: `${Math.min(100, (userProgress.xp % 1000) / 10)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 text-sky-400">
                <button
                  onClick={() => {
                    labSound.playClick();
                    setActiveTab('creator');
                  }}
                  className={`hover:text-amber-300 font-bold transition flex items-center gap-1 cursor-pointer ${
                    activeTab === 'creator' ? 'text-amber-300 underline' : 'text-amber-400'
                  }`}
                  title="About the Creator"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{lang === 'ar' ? 'عن المطور' : 'About Creator'}</span>
                </button>
                <span>•</span>
                <button 
                  onClick={() => {
                    labSound.playClick();
                    setIsRatingOpen(true);
                  }}
                  className="hover:text-amber-300 transition cursor-pointer flex items-center gap-1 text-amber-400"
                  title="MIXON Rating"
                >
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>{lang === 'ar' ? 'تقييم المنصة' : 'Rate Lab'}</span>
                </button>
                <span>•</span>
                <button onClick={() => setIsSafetyOpen(true)} className="hover:text-sky-200 transition cursor-pointer">
                  {lang === 'ar' ? 'إرشادات السلامة' : 'Safety Protocol'}
                </button>
                <span>•</span>
                <button onClick={() => setAppMode('welcome')} className="hover:text-sky-200 transition cursor-pointer">
                  {lang === 'ar' ? 'بوابة الترحيب' : 'Home Portal'}
                </button>
              </div>
            </div>
          </footer>

          {/* Floating MIXON AI Tutor Chat Button */}
          <button
            id="mixon-ai-floating-chat-btn"
            onClick={() => {
              labSound.playClick();
              handleOpenAiTutor({
                materialA: slotA,
                materialB: slotB,
                discoveryCount: (userProgress?.discoveredReactionIds?.length || 0) + (userProgress?.discoveredMaterialIds?.length || 0)
              });
            }}
            className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-black font-display font-black text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(14,165,233,0.5)] border border-sky-300 transition-all transform hover:scale-105 cursor-pointer"
            title={lang === 'ar' ? 'معلم ميكسون الذكي (محادثة نصية)' : 'Chat with MIXON AI Tutor'}
          >
            <Bot className="w-5 h-5" />
            <span className="font-bold">{lang === 'ar' ? 'معلم ميكسون (AI)' : 'MIXON AI'}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>
      )}

      {/* Global Modals */}
      <MaterialProfileModal
        material={inspectingMaterial}
        onClose={() => setInspectingMaterial(null)}
        onLoadToLab={handleLoadToLab}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        materials={materials}
        onClose={() => setIsSearchOpen(false)}
        onSelectMaterial={handleInspectMaterial}
        onLoadToLab={handleLoadToLab}
      />

      <SafetyModal
        isOpen={isSafetyOpen}
        onClose={() => setIsSafetyOpen(false)}
      />

      <CustomMaterialModal
        isOpen={isCustomOpen}
        onClose={() => setIsCustomOpen(false)}
        onAddCustomMaterial={handleAddCustomMaterial}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userProgress={userProgress}
        totalMaterialsCount={materials.length}
        onOpenCreator={() => {
          setActiveTab('creator');
        }}
        lang={lang}
      />

      <RatingModal
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
        lang={lang}
      />

      <MixonAITutorModal
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        context={aiTutorContext}
        lang={lang}
        initialPrompt={aiTutorPrompt}
      />

      {/* Discovery Modal for Synthesized Compounds */}
      <DiscoveryModal
        isOpen={Boolean(discoveryResult)}
        result={discoveryResult}
        lang={lang}
        onClose={() => setDiscoveryResult(null)}
        onOpenAiTutor={(result) => {
          handleOpenAiTutor(result, `Explain the scientific properties of ${result.outputName} (${result.outputFormula})`);
        }}
      />

      {/* Realtime Achievement Unlocked Toast Notification */}
      {unlockedToast && (
        <div 
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-auto transition-all animate-bounce"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          <div className="flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-[#020617]/95 border border-amber-400/80 backdrop-blur-xl shadow-[0_0_40px_rgba(245,158,11,0.35)] text-white">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-[0_0_15px_rgba(245,158,11,0.7)] shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-start pr-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase font-black">
                  {lang === 'ar' ? 'تم إنجاز التحدي!' : 'ACHIEVEMENT UNLOCKED!'}
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  +{unlockedToast.xpReward} XP
                </span>
              </div>
              <span className="text-sm font-bold text-white tracking-wide">
                {lang === 'ar' ? unlockedToast.titleAr : unlockedToast.title}
              </span>
            </div>
            <button 
              onClick={() => setUnlockedToast(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
