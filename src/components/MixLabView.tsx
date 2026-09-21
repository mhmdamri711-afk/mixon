import React, { useState } from 'react';
import { Material, ReactionResult } from '../types';
import { LabCanvas, ZoomLevel } from './LabCanvas';
import { MixLabChamber3D } from './MixLabChamber3D';
import { InteractiveMoleculeViewer3D } from './InteractiveMoleculeViewer3D';
import { LiveTelemetryGraph } from './LiveTelemetryGraph';
import { getMolecularData } from '../utils/molecularStructures';
import { getReaction } from '../data/reactionsData';
import { AppLanguage, TRANSLATIONS } from '../utils/i18n';
import { CarbonAllotropeType } from '../types/visualProfile';
import { MaterialVisualThumbnail } from '../data/materialVisuals';
import { 
  FlaskConical, 
  RotateCcw, 
  Sparkles, 
  Save, 
  ArrowRightLeft, 
  Check, 
  Sliders, 
  ShieldAlert, 
  Zap, 
  Info,
  Atom,
  Search,
  ExternalLink,
  Eye,
  Bot,
  Layers,
  ZoomIn
} from 'lucide-react';
import { labSound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface MixLabViewProps {
  materials: Material[];
  selectedSlotA: Material | null;
  selectedSlotB: Material | null;
  onSetSlotA: (m: Material | null) => void;
  onSetSlotB: (m: Material | null) => void;
  onSaveExperiment: (matA: Material, matB: Material, result: ReactionResult) => void;
  onInspectMaterial: (m: Material) => void;
  onReactionFinished: (result: ReactionResult, matA: Material, matB: Material) => void;
  lang?: AppLanguage;
  onOpenAiTutor?: (context: any, initialPrompt?: string) => void;
}

export const MixLabView: React.FC<MixLabViewProps> = ({
  materials,
  selectedSlotA,
  selectedSlotB,
  onSetSlotA,
  onSetSlotB,
  onSaveExperiment,
  onInspectMaterial,
  onReactionFinished,
  lang = 'en',
  onOpenAiTutor
}) => {
  const [drawerSearch, setDrawerSearch] = useState('');
  const [activeDrawerCategory, setActiveDrawerCategory] = useState<string>('All');
  
  // Simulation states
  const [chamberMode, setChamberMode] = useState<'3d' | '2d'>('3d');
  const [showProduct3D, setShowProduct3D] = useState<boolean>(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationPhase, setSimulationPhase] = useState<'idle' | 'charging' | 'colliding' | 'bonded' | 'complete'>('idle');
  const [currentResult, setCurrentResult] = useState<ReactionResult | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Environmental chamber parameters (simulated)
  const [temperature, setTemperature] = useState<number>(25); // Celsius
  const [pressure, setPressure] = useState<number>(1.0); // atm

  // Multi-Level Zoom and Allotrope Selection
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('material');
  const [carbonAllotrope, setCarbonAllotrope] = useState<CarbonAllotropeType>('graphite');

  const t = TRANSLATIONS[lang];
  const isCarbonPresent = selectedSlotA?.id === 'carbon' || selectedSlotB?.id === 'carbon';

  // Filter materials for drawer
  const drawerMaterials = materials.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(drawerSearch.toLowerCase()) ||
      m.symbol.toLowerCase().includes(drawerSearch.toLowerCase());
    const matchesCategory = activeDrawerCategory === 'All' || m.category === activeDrawerCategory;
    return matchesSearch && matchesCategory;
  });

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, mat: Material) => {
    e.dataTransfer.setData('text/plain', mat.id);
  };

  const handleDropSlot = (e: React.DragEvent, slot: 'A' | 'B') => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const found = materials.find(m => m.id === id);
    if (found) {
      labSound.playClick();
      if (slot === 'A') onSetSlotA(found);
      else onSetSlotB(found);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Run Simulation Sequence
  const handleCombine = () => {
    if (!selectedSlotA || !selectedSlotB || isSimulating) return;

    labSound.playCombineStart();
    setIsSimulating(true);
    setSimulationPhase('charging');
    setCurrentResult(null);
    setSavedSuccess(false);

    // Sequence stages:
    // 1. charging (0 - 1.2s)
    setTimeout(() => {
      setSimulationPhase('colliding');
    }, 1200);

    // 2. colliding & bonding (1.2s - 2.4s)
    setTimeout(() => {
      setSimulationPhase('bonded');
      const res = getReaction(selectedSlotA, selectedSlotB);
      setCurrentResult(res);
      labSound.playReactionSuccess();

      // Trigger subtle celebratory particle confetti on significant reactions
      if (res.energyValue > 200) {
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#00d2ff', '#38bdf8', '#818cf8', '#ffffff']
          });
        } catch {}
      }
    }, 2400);

    // 3. complete & stabilized (3.0s)
    setTimeout(() => {
      setSimulationPhase('complete');
      setIsSimulating(false);
      const res = getReaction(selectedSlotA, selectedSlotB);
      onReactionFinished(res, selectedSlotA, selectedSlotB);
    }, 3000);
  };

  const handleRunAgain = () => {
    labSound.playClick();
    handleCombine();
  };

  const handleSwap = () => {
    labSound.playClick();
    const temp = selectedSlotA;
    onSetSlotA(selectedSlotB);
    onSetSlotB(temp);
    setCurrentResult(null);
    setSimulationPhase('idle');
  };

  const handleClear = () => {
    labSound.playClick();
    onSetSlotA(null);
    onSetSlotB(null);
    setCurrentResult(null);
    setSimulationPhase('idle');
  };

  const handleSave = () => {
    if (!selectedSlotA || !selectedSlotB || !currentResult) return;
    labSound.playClick();
    onSaveExperiment(selectedSlotA, selectedSlotB, currentResult);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 space-y-4">
      
      {/* Three Column Workbench: LEFT (Drawer), CENTER (Reactor), RIGHT (Telemetry/Results) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* =========================================================================
            LEFT COLUMN: Material Catalog Drawer (Geometric Balance Panel)
           ========================================================================= */}
        <div className="lg:col-span-3 flex flex-col h-[660px] rounded-xl bg-[#020617] border border-sky-900/40 p-4 overflow-hidden shadow-sm">
          
          {/* Drawer Header */}
          <div className="pb-3 border-b border-sky-900/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-xs tracking-widest text-sky-500 uppercase flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 border border-sky-400 rotate-45 flex items-center justify-center">
                  <div className="w-0.5 h-0.5 bg-sky-400" />
                </div>
                <span>{t.matterInjector}</span>
              </h2>
              <span className="text-[10px] font-mono text-sky-600 uppercase">
                {drawerMaterials.length} {t.readyCount}
              </span>
            </div>

            {/* Drawer Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sky-700" />
              <input
                type="text"
                value={drawerSearch}
                onChange={(e) => setDrawerSearch(e.target.value)}
                placeholder={t.filterMatter}
                className="w-full pl-8 pr-2 py-1.5 rounded bg-sky-950/40 border border-sky-900/50 focus:border-sky-500 text-xs text-sky-200 placeholder-sky-700 outline-none transition"
              />
            </div>

            {/* Quick Category Buttons (Geometric Balance Pills) */}
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none text-[10px]">
              {[
                { key: 'All', label: t.categoryAll },
                { key: 'Metals', label: t.categoryMetals },
                { key: 'Gases', label: t.categoryGases },
                { key: 'Minerals', label: t.categoryMinerals },
                { key: 'Space', label: t.categorySpace }
              ].map(cat => (
                <button
                  key={cat.key}
                  onClick={() => {
                    labSound.playClick();
                    setActiveDrawerCategory(cat.key);
                  }}
                  className={`px-3 py-1 rounded-full whitespace-nowrap uppercase font-bold transition duration-150 ${
                    activeDrawerCategory === cat.key
                      ? 'bg-sky-500 text-black shadow-[0_0_12px_rgba(14,165,233,0.4)]'
                      : 'bg-sky-950 text-sky-400 border border-sky-800 hover:border-sky-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Drawer Scrollable List */}
          <div className="flex-1 overflow-y-auto space-y-2 py-3 pr-1">
            {drawerMaterials.map(mat => (
              <div
                key={mat.id}
                draggable
                onDragStart={(e) => handleDragStart(e, mat)}
                className="group flex items-center justify-between p-2.5 rounded-lg bg-sky-950/20 hover:bg-sky-900/40 border border-sky-900/40 hover:border-sky-500/50 transition cursor-grab active:cursor-grabbing"
              >
                <div 
                  className="flex items-center gap-2.5 flex-1 min-w-0"
                  onClick={() => onInspectMaterial(mat)}
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 bg-sky-950/80 border border-sky-800/60 shadow-sm p-0.5">
                    <MaterialVisualThumbnail id={mat.id} size={28} />
                  </div>
                  <div className="truncate text-left">
                    <div className="font-display font-bold text-xs text-white group-hover:text-sky-300 truncate">
                      {mat.name}
                    </div>
                    <div className="text-[9px] font-mono text-sky-600 uppercase">
                      {mat.state} • {mat.category}
                    </div>
                  </div>
                </div>

                {/* Quick Add Buttons */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      labSound.playClick();
                      onSetSlotA(mat);
                    }}
                    className="px-1.5 py-0.5 rounded bg-sky-950 hover:bg-sky-500 hover:text-black border border-sky-800 text-[10px] font-mono text-sky-400 font-bold transition"
                    title="Insert into Chamber A"
                  >
                    +A
                  </button>
                  <button
                    onClick={() => {
                      labSound.playClick();
                      onSetSlotB(mat);
                    }}
                    className="px-1.5 py-0.5 rounded bg-sky-950 hover:bg-sky-500 hover:text-black border border-sky-800 text-[10px] font-mono text-sky-400 font-bold transition"
                    title="Insert into Chamber B"
                  >
                    +B
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Drawer Footer tip */}
          <div className="pt-2 border-t border-sky-900/50 text-[10px] font-mono text-sky-600 text-center">
            Drag to chamber or click +A / +B
          </div>
        </div>

        {/* =========================================================================
            CENTER COLUMN: Experiment Reaction Zone & Particle Simulation Canvas
           ========================================================================= */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          
          {/* Reaction Slots Header Controls */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Slot A Container */}
            <div
              onDrop={(e) => handleDropSlot(e, 'A')}
              onDragOver={handleDragOver}
              className={`relative flex items-center justify-between p-3 rounded-xl border transition-all ${
                selectedSlotA
                  ? 'bg-sky-950/40 border-sky-500/60 shadow-[0_0_20px_rgba(14,165,233,0.2)]'
                  : 'bg-sky-950/20 border-dashed border-sky-900/60 hover:border-sky-500/40'
              }`}
            >
              {selectedSlotA ? (
                <div className="flex items-center gap-3 w-full justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 bg-[#020617] border border-sky-500/50 shadow-[0_0_12px_rgba(14,165,233,0.3)] p-0.5">
                      <MaterialVisualThumbnail id={selectedSlotA.id} size={36} />
                    </div>
                    <div>
                      <div className="text-[9px] font-mono text-sky-400 uppercase tracking-wider">{t.slotAlpha}</div>
                      <div className="font-display font-bold text-sm text-white">{selectedSlotA.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onInspectMaterial(selectedSlotA)}
                      className="p-1 rounded text-sky-400 hover:text-white hover:bg-sky-900/50 transition"
                      title={t.inspectStructure}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onSetSlotA(null)}
                      className="text-xs text-sky-600 hover:text-red-400 p-1 rounded transition"
                      title={t.ejectSlotA}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full text-center py-1.5 text-xs font-mono text-sky-600 flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  <span>{t.dropAHere}</span>
                </div>
              )}
            </div>

            {/* Slot B Container */}
            <div
              onDrop={(e) => handleDropSlot(e, 'B')}
              onDragOver={handleDragOver}
              className={`relative flex items-center justify-between p-3 rounded-xl border transition-all ${
                selectedSlotB
                  ? 'bg-sky-950/40 border-sky-500/60 shadow-[0_0_20px_rgba(14,165,233,0.2)]'
                  : 'bg-sky-950/20 border-dashed border-sky-900/60 hover:border-sky-500/40'
              }`}
            >
              {selectedSlotB ? (
                <div className="flex items-center gap-3 w-full justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 bg-[#020617] border border-indigo-500/50 shadow-[0_0_12px_rgba(99,102,241,0.3)] p-0.5">
                      <MaterialVisualThumbnail id={selectedSlotB.id} size={36} />
                    </div>
                    <div>
                      <div className="text-[9px] font-mono text-sky-400 uppercase tracking-wider">{t.slotBeta}</div>
                      <div className="font-display font-bold text-sm text-white">{selectedSlotB.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onInspectMaterial(selectedSlotB)}
                      className="p-1 rounded text-sky-400 hover:text-white hover:bg-sky-900/50 transition"
                      title={t.inspectStructure}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onSetSlotB(null)}
                      className="text-xs text-sky-600 hover:text-red-400 p-1 rounded transition"
                      title={t.ejectSlotB}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full text-center py-1.5 text-xs font-mono text-sky-600 flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  <span>{t.dropBHere}</span>
                </div>
              )}
            </div>

          </div>

          {/* Chamber Viewport Mode Toggle (3D Molecular vs 2D Particle) */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider font-bold">
                {t.reactorCore}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Multi-Level Zoom Selector */}
              <div className="flex items-center gap-1 bg-[#020617] p-1 rounded-lg border border-sky-900/50 text-[10px] font-mono">
                <span className="text-sky-600 px-1 font-bold hidden sm:inline">{t.zoomLevel}:</span>
                {(['material', 'structure', 'molecule', 'atoms', 'orbitals'] as ZoomLevel[]).map(z => {
                  const labels: Record<ZoomLevel, string> = {
                    material: t.zoomMaterial,
                    structure: t.zoomStructure,
                    molecule: t.zoomMolecule,
                    atoms: t.zoomAtoms,
                    orbitals: t.zoomOrbitals
                  };
                  return (
                    <button
                      key={z}
                      onClick={() => {
                        labSound.playClick();
                        setZoomLevel(z);
                      }}
                      className={`px-1.5 py-0.5 rounded transition uppercase cursor-pointer ${
                        zoomLevel === z
                          ? 'bg-sky-400 text-black font-bold'
                          : 'text-sky-400 hover:text-white'
                      }`}
                    >
                      {labels[z]}
                    </button>
                  );
                })}
              </div>

              {/* Carbon Allotrope Selector if Carbon is loaded */}
              {isCarbonPresent && (
                <div className="flex items-center gap-1 bg-[#020617] p-1 rounded-lg border border-amber-800/60 text-[10px] font-mono">
                  <span className="text-amber-400 font-bold px-1">C:</span>
                  {(['graphite', 'diamond', 'amorphous'] as CarbonAllotropeType[]).map(al => (
                    <button
                      key={al}
                      onClick={() => {
                        labSound.playClick();
                        setCarbonAllotrope(al);
                      }}
                      className={`px-1.5 py-0.5 rounded uppercase cursor-pointer ${
                        carbonAllotrope === al
                          ? 'bg-amber-400 text-black font-bold'
                          : 'text-amber-300 hover:text-white'
                      }`}
                    >
                      {al}
                    </button>
                  ))}
                </div>
              )}

              {/* 2D / 3D Mode */}
              <div className="flex items-center gap-1 bg-[#020617] p-1 rounded-lg border border-sky-900/50 text-[10px] font-mono">
                <button
                  onClick={() => {
                    labSound.playClick();
                    setChamberMode('2d');
                  }}
                  className={`px-2.5 py-1 rounded transition flex items-center gap-1.5 cursor-pointer ${
                    chamberMode === '2d'
                      ? 'bg-sky-500 text-black font-bold shadow-[0_0_12px_rgba(14,165,233,0.4)]'
                      : 'text-sky-400 hover:text-sky-200 hover:bg-sky-950'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{t.twoDChamber}</span>
                </button>
                <button
                  onClick={() => {
                    labSound.playClick();
                    setChamberMode('3d');
                  }}
                  className={`px-2.5 py-1 rounded transition flex items-center gap-1.5 cursor-pointer ${
                    chamberMode === '3d'
                      ? 'bg-sky-500 text-black font-bold shadow-[0_0_12px_rgba(14,165,233,0.4)]'
                      : 'text-sky-400 hover:text-sky-200 hover:bg-sky-950'
                  }`}
                >
                  <Atom className="w-3 h-3" />
                  <span>{t.threeDReactor}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Core Visual Reaction Viewport: 3D WebGL or 2D Particle Canvas */}
          <div className="relative w-full h-[380px] md:h-[440px]">
            {chamberMode === '3d' ? (
              <MixLabChamber3D
                materialA={selectedSlotA}
                materialB={selectedSlotB}
                isSimulating={isSimulating}
                simulationPhase={simulationPhase}
                result={currentResult}
                temperature={temperature}
                pressure={pressure}
                lang={lang}
                onInspectMaterial={onInspectMaterial}
              />
            ) : (
              <LabCanvas
                materialA={selectedSlotA}
                materialB={selectedSlotB}
                isSimulating={isSimulating}
                simulationPhase={simulationPhase}
                result={currentResult}
                temperature={temperature}
                pressure={pressure}
                zoomLevel={zoomLevel}
                carbonAllotrope={carbonAllotrope}
              />
            )}
          </div>

          {/* Central Action Bar: Swap, Clear, Big COMBINE Button */}
          <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#020617] border border-sky-900/40">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSwap}
                disabled={!selectedSlotA || !selectedSlotB || isSimulating}
                className="p-2.5 rounded bg-sky-950/60 hover:bg-sky-900/50 disabled:opacity-40 text-sky-300 hover:text-white border border-sky-900/50 transition"
                title={t.swapInputs}
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleClear}
                disabled={(!selectedSlotA && !selectedSlotB) || isSimulating}
                className="p-2.5 rounded bg-sky-950/60 hover:bg-sky-900/50 disabled:opacity-40 text-sky-300 hover:text-red-400 border border-sky-900/50 transition"
                title={t.clearReactor}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Big COMBINE Button - Geometric Balance Style */}
            <button
              id="combine-button"
              onClick={handleCombine}
              disabled={!selectedSlotA || !selectedSlotB || isSimulating}
              className={`flex-1 flex items-center justify-center gap-3 py-3.5 px-8 rounded-sm font-display font-black text-base tracking-[0.25em] uppercase transition-all duration-300 ${
                !selectedSlotA || !selectedSlotB
                  ? 'bg-sky-950/60 text-sky-700 cursor-not-allowed border border-sky-900/50'
                  : isSimulating
                  ? 'bg-sky-500/30 text-sky-300 border border-sky-400 animate-pulse'
                  : 'bg-sky-500 hover:bg-sky-400 text-black shadow-[0_0_30px_rgba(14,165,233,0.45)] hover:shadow-[0_0_40px_rgba(56,189,248,0.7)] hover:scale-[1.02] active:scale-95'
              }`}
            >
              <Zap className={`w-5 h-5 ${isSimulating ? 'animate-spin' : 'text-black'}`} />
              <span>{isSimulating ? t.simulating : t.combine}</span>
            </button>
          </div>

          {/* Environmental Chamber Controls & Geometric Balance Equalizer Telemetry */}
          <div className="p-3.5 rounded-xl bg-[#020617] border border-sky-900/40 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <div className="flex justify-between text-sky-500 mb-1">
                <span>{t.chamberTemp}</span>
                <span className="text-sky-300 font-bold">{(273.15 + temperature).toFixed(1)} K</span>
              </div>
              <input
                type="range"
                min="0"
                max="1200"
                step="25"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full h-1 bg-sky-950 rounded appearance-none cursor-pointer accent-sky-400"
              />
              <div className="text-[10px] text-sky-600 mt-0.5">{temperature} °C</div>
            </div>

            <div>
              <div className="flex justify-between text-sky-500 mb-1">
                <span>{t.pressure}</span>
                <span className="text-sky-300 font-bold">{(pressure * 101.325).toFixed(1)} kPa</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="5.0"
                step="0.1"
                value={pressure}
                onChange={(e) => setPressure(Number(e.target.value))}
                className="w-full h-1 bg-sky-950 rounded appearance-none cursor-pointer accent-sky-400"
              />
              <div className="text-[10px] text-sky-600 mt-0.5">{pressure.toFixed(1)} atm</div>
            </div>

            {/* Geometric Equalizer / Stability Visualizer */}
            <div className="flex flex-col justify-between">
              <div className="flex justify-between text-sky-500 text-[10px]">
                <span>{t.harmonics}</span>
                <span className="text-sky-400 font-bold">98.4% {t.stable}</span>
              </div>
              <div className="h-6 bg-sky-950/50 border border-sky-900/50 flex items-end gap-1 px-2 pb-1 rounded">
                {[6, 12, 18, 10, 16, 22, 14, 8, 16, 20, 12].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-sky-400 rounded-t-xs opacity-75"
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Live Dynamic Telemetry Graph */}
          <LiveTelemetryGraph
            temperature={temperature}
            pressure={pressure}
            isSimulating={isSimulating}
            simulationPhase={simulationPhase}
            lang={lang}
          />
        </div>

        {/* =========================================================================
            RIGHT COLUMN: Telemetry & Reaction Results Card (Geometric Balance Panel)
           ========================================================================= */}
        <div className="lg:col-span-3 flex flex-col space-y-4">
          
          {/* Reaction Results Panel */}
          {currentResult ? (
            <div className="flex flex-col h-[660px] rounded-xl bg-[#020617] border border-sky-900/40 p-4 shadow-[0_0_30px_rgba(14,165,233,0.15)] animate-fadeIn overflow-y-auto">
              
              {/* Result Header */}
              <div className="pb-3 border-b border-sky-900/50 flex items-start justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-950 border border-sky-800 text-[10px] font-mono text-sky-400 tracking-wider uppercase mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                    <span>{t.simulationComplete}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white tracking-wide">
                    {currentResult.outputName}
                  </h3>
                  <div className="font-mono text-xs text-sky-400 font-semibold mt-0.5">
                    {currentResult.outputFormula}
                  </div>
                </div>

                <div className="w-14 h-14 rounded-xl bg-sky-950/80 border border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.3)] flex items-center justify-center p-1 flex-shrink-0">
                  <MaterialVisualThumbnail id={currentResult.id} size={48} />
                </div>
              </div>

              {/* Observed Change */}
              <div className="py-3 space-y-3 flex-1 text-xs">
                <div>
                  <div className="font-mono text-[10px] text-sky-500 uppercase tracking-widest mb-1">
                    {t.observedChange}
                  </div>
                  <div className="p-3 rounded-lg bg-sky-950/30 border border-sky-900/50 text-sky-100 leading-relaxed italic">
                    "{currentResult.observedChange}"
                  </div>
                </div>

                {/* Properties Key-Values */}
                <div className="grid grid-cols-2 gap-2 font-mono">
                  <div className="p-2 rounded bg-sky-950/30 border border-sky-900/50">
                    <span className="text-sky-600 block text-[9px] uppercase">{t.productState}</span>
                    <span className="text-sky-200 font-bold">{currentResult.outputState}</span>
                  </div>
                  <div className="p-2 rounded bg-sky-950/30 border border-sky-900/50">
                    <span className="text-sky-600 block text-[9px] uppercase">{t.reactionType}</span>
                    <span className="text-sky-300 font-bold truncate block">{currentResult.reactionType}</span>
                  </div>
                </div>

                {/* Simulated Energy Metric */}
                <div className="p-2 rounded bg-sky-950/30 border border-sky-900/50 font-mono">
                  <span className="text-sky-600 block text-[9px] uppercase">{t.energyTransfer}</span>
                  <span className="text-sky-300 font-bold">{currentResult.energyChange}</span>
                </div>

                {/* 3D Product Molecular Inspector */}
                <div className="p-3 rounded-lg bg-sky-950/30 border border-sky-900/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-[10px] text-sky-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                      <Atom className="w-3.5 h-3.5 text-sky-400" />
                      <span>{t.threeDInspector}</span>
                    </div>
                    <button
                      onClick={() => setShowProduct3D(!showProduct3D)}
                      className="text-[10px] font-mono text-sky-400 hover:text-white underline cursor-pointer"
                    >
                      {showProduct3D ? t.collapse : t.expand3D}
                    </button>
                  </div>
                  {showProduct3D && (
                    <div className="w-full h-44 rounded overflow-hidden border border-sky-900/60 shadow-inner">
                      <InteractiveMoleculeViewer3D
                        molecularDataOverride={getMolecularData({
                          id: currentResult.id,
                          name: currentResult.outputName,
                          symbol: currentResult.outputFormula.split('→')[1]?.trim().split(' ')[0] || currentResult.outputName
                        })}
                        height={176}
                        compact={true}
                        showControls={true}
                        showDetailsBar={false}
                      />
                    </div>
                  )}
                </div>

                {/* Molecular Transformation */}
                <div className="bg-sky-500/5 border border-sky-500/20 p-3 rounded-lg">
                  <div className="font-mono text-[10px] font-bold text-sky-400 uppercase mb-1">
                    {t.molecularBonding}
                  </div>
                  <p className="text-sky-200/80 text-[11px] leading-relaxed">
                    {currentResult.molecularTransformation}
                  </p>
                </div>

                {/* Safety Warning if simulation only */}
                {currentResult.isSimulatedOnlyNotice && (
                  <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-[10px] text-amber-300 flex items-start gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>{currentResult.safetyNotice || (lang === 'ar' ? 'محاكاة رقمية فقط. لا تجرب ذلك في الواقع.' : 'Digital simulation only. Do not attempt in reality.')}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons: TEACH ME, RUN AGAIN & SAVE EXPERIMENT */}
              <div className="pt-3 border-t border-sky-900/50 space-y-2">
                {onOpenAiTutor && (
                  <button
                    onClick={() => {
                      labSound.playClick();
                      onOpenAiTutor(
                        {
                          materialA: selectedSlotA,
                          materialB: selectedSlotB,
                          currentResult,
                          temperature,
                          pressure
                        },
                        lang === 'ar'
                          ? `اشرح لي كيف حدث هذا التفاعل (${currentResult.outputName}) وما هي الروابط الكيميائية المتكونة بالتفصيل.`
                          : `Explain how this reaction (${currentResult.outputName}) occurred and what chemical bonds formed in detail.`
                      );
                    }}
                    className="w-full py-2.5 px-3 rounded bg-gradient-to-r from-sky-600/30 to-indigo-600/30 hover:from-sky-500/40 hover:to-indigo-500/40 border border-sky-400/50 text-white font-display font-bold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                  >
                    <Bot className="w-4 h-4 text-sky-400" />
                    <span>{t.teachMe}</span>
                  </button>
                )}

                <button
                  onClick={handleRunAgain}
                  className="w-full py-2.5 px-3 rounded bg-sky-950/60 hover:bg-sky-900/60 border border-sky-800 text-sky-200 font-display font-bold text-xs tracking-wider uppercase transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.runAgain}</span>
                </button>

                <button
                  onClick={handleSave}
                  disabled={savedSuccess}
                  className={`w-full py-2.5 px-3 rounded font-display font-black text-xs tracking-wider uppercase transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    savedSuccess
                      ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40'
                      : 'bg-sky-500 hover:bg-sky-400 text-black shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                  }`}
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t.experimentSaved}</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>{t.saveExperiment}</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          ) : (
            /* Standby Telemetry Panel */
            <div className="flex flex-col h-[660px] rounded-xl bg-[#020617] border border-sky-900/40 p-4 justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-2 pb-2 border-b border-sky-900/50">
                  <Sliders className="w-4 h-4 text-sky-400" />
                  <h3 className="font-display font-bold text-xs tracking-widest text-sky-500 uppercase">
                    {t.reactorTelemetry}
                  </h3>
                </div>

                <div className="mt-4 space-y-3 text-xs font-mono text-sky-300">
                  <div className="p-3 rounded-lg bg-sky-950/30 border border-sky-900/50 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sky-600">{t.magneticInduction}</span>
                      <span className="text-sky-400 font-bold">14.2 Tesla</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sky-600">{t.vacuumChamber}</span>
                      <span className="text-sky-200">10⁻⁷ Torr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sky-600">{t.spectrometer}</span>
                      <span className="text-emerald-400">{t.calibrated}</span>
                    </div>
                  </div>

                  <div className="bg-sky-500/5 border border-sky-500/20 p-3 rounded-lg space-y-1.5">
                    <span className="text-sky-400 text-[10px] block uppercase font-bold tracking-wider">
                      {t.simProtocol}
                    </span>
                    <p className="text-sky-200/70 text-xs leading-relaxed">
                      {t.simProtocolDesc}
                    </p>
                  </div>

                  {onOpenAiTutor && (
                    <button
                      onClick={() => {
                        labSound.playClick();
                        onOpenAiTutor(
                          {
                            materialA: selectedSlotA,
                            materialB: selectedSlotB,
                            temperature,
                            pressure
                          },
                          lang === 'ar'
                            ? 'ما هي أفضل التفاعلات الكيميائية التي يمكنني تجربتها الآن في MIX LAB؟'
                            : 'What are the most interesting chemical reactions I can simulate in MIX LAB right now?'
                        );
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-sky-950/80 hover:bg-sky-900 border border-sky-700/60 text-sky-300 hover:text-white font-mono text-xs flex items-center justify-center gap-2 cursor-pointer transition shadow-sm"
                    >
                      <Bot className="w-4 h-4 text-sky-400" />
                      <span>{t.askAi}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Safety Reminder */}
              <div className="p-3 rounded-lg bg-sky-950/40 border border-sky-900/50 text-[11px] font-mono text-sky-400/90 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>
                  All reactions execute in a zero-hazard digital physics container.
                </span>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
