import React from 'react';
import { Material } from '../types';
import { AtomViewer3D } from './AtomViewer3D';
import { 
  X, 
  FlaskConical, 
  Thermometer, 
  Zap, 
  Scale, 
  ShieldAlert, 
  Sparkles, 
  Clock, 
  CheckCircle2,
  Share2
} from 'lucide-react';
import { labSound } from '../utils/sound';
import { getMaterialVisualProfile } from '../data/materialVisualProfiles';
import { RarityBadge } from './RarityBadge';
import { getMaterialRarity, RARITY_CONFIG } from '../utils/materialRarity';

interface MaterialProfileModalProps {
  material: Material | null;
  onClose: () => void;
  onLoadToLab: (material: Material, slot: 'A' | 'B') => void;
}

export const MaterialProfileModal: React.FC<MaterialProfileModalProps> = ({
  material,
  onClose,
  onLoadToLab
}) => {
  if (!material) return null;

  const handleClose = () => {
    labSound.playClick();
    onClose();
  };

  const visualProfile = getMaterialVisualProfile(material.id);
  const rarity = getMaterialRarity(material);
  const rarityDetails = RARITY_CONFIG[rarity];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-xl bg-[#020617] border border-sky-900/50 shadow-[0_0_50px_rgba(14,165,233,0.25)] overflow-hidden text-sky-100">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-sky-900/50 bg-[#020617]/95">
          <div className="flex items-center gap-3">
            <div 
              className="flex items-center justify-center w-10 h-10 rounded-lg font-mono font-bold text-xl text-white shadow-lg border border-white/20"
              style={{ backgroundColor: material.colorHex }}
            >
              {material.symbol}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-display font-black text-white tracking-wide">
                  {material.name}
                </h2>
                {material.nameAr && (
                  <span className="text-sm font-sans text-sky-400/80">
                    ({material.nameAr})
                  </span>
                )}
                <RarityBadge rarity={rarity} size="sm" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                <span>{material.category}</span>
                <span>•</span>
                <span>STATE: {material.state.toUpperCase()}</span>
                {material.atomicNumber && (
                  <>
                    <span>•</span>
                    <span>ATOMIC NO: {material.atomicNumber}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className="p-2 rounded-lg text-sky-400 hover:text-white hover:bg-sky-900/50 border border-sky-900/50 transition"
              title="Close Profile"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Safety Warning if hazardous simulation */}
          {material.isHazardousSimulation && (
            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200">
              <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300">SIMULATION ONLY: </span>
                {material.hazardWarning || 'This material is demonstrated through safe educational digital modeling.'}
              </div>
            </div>
          )}

          {/* Top Section: 3D Visualizer & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <AtomViewer3D material={material} />
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              {/* Quick Summary Card */}
              <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-sky-500 tracking-widest uppercase">Visual Profile Identity</div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-900/40 text-sky-300 border border-sky-800">
                    {visualProfile.particleType}
                  </span>
                </div>
                <p className="text-sm text-sky-100 leading-relaxed italic">
                  "{material.appearance}"
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-sky-900/40 text-[11px] font-mono">
                  <div>
                    <span className="text-sky-500 block text-[10px] uppercase">Surface Look</span>
                    <span className="text-sky-200 capitalize">{visualProfile.surfaceAppearance.replace('_', ' ')}</span>
                  </div>
                  <div>
                    <span className="text-sky-500 block text-[10px] uppercase">State Dynamics</span>
                    <span className="text-sky-200 capitalize">{visualProfile.stateBehavior.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>

              {/* Action: Send to Lab Chamber */}
              <div className="p-4 rounded-xl bg-[#020617] border border-sky-900/40 space-y-3">
                <div className="text-xs font-mono text-sky-400 tracking-wider uppercase flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Chamber Quick Slot</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      labSound.playClick();
                      onLoadToLab(material, 'A');
                      onClose();
                    }}
                    className="w-full py-2.5 px-3 rounded-sm bg-sky-500 hover:bg-sky-400 text-black font-display font-black text-xs tracking-widest uppercase transition active:scale-95 shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                  >
                    SLOT A (ALPHA)
                  </button>
                  <button
                    onClick={() => {
                      labSound.playClick();
                      onLoadToLab(material, 'B');
                      onClose();
                    }}
                    className="w-full py-2.5 px-3 rounded-sm bg-sky-950 hover:bg-sky-900 text-sky-300 border border-sky-800 font-display font-bold text-xs tracking-widest uppercase transition active:scale-95"
                  >
                    SLOT B (BETA)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Grid: Physical & Chemical */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Physical Properties */}
            <div className="p-5 rounded-xl bg-sky-950/20 border border-sky-900/40 space-y-4">
              <div className="flex items-center gap-2 text-sky-400 font-display font-bold text-sm tracking-wider uppercase border-b border-sky-900/50 pb-2">
                <Thermometer className="w-4 h-4" />
                <span>Physical Properties</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <div className="text-sky-500">State of Matter</div>
                  <div className="text-white font-semibold text-sm mt-0.5">{material.state}</div>
                </div>
                <div>
                  <div className="text-sky-500">Mass Density</div>
                  <div className="text-white font-semibold text-sm mt-0.5">{material.density}</div>
                </div>
                <div>
                  <div className="text-sky-500">Melting Point</div>
                  <div className="text-white font-semibold text-sm mt-0.5">{material.meltingPoint}</div>
                </div>
                <div>
                  <div className="text-sky-500">Boiling Point</div>
                  <div className="text-white font-semibold text-sm mt-0.5">{material.boilingPoint}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-sky-500">Electrical Conductivity</div>
                  <div className="text-sky-300 font-semibold text-sm mt-0.5 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-sky-400" />
                    <span>{material.conductivity}</span>
                  </div>
                </div>
                <div className="col-span-2 pt-2 border-t border-sky-900/40">
                  <div className="text-sky-500">Specimen Rarity Tier</div>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <RarityBadge rarity={rarity} size="sm" />
                    <span className="text-[11px] text-sky-300/80 font-sans">
                      {rarityDetails.descEn}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chemical Properties */}
            <div className="p-5 rounded-xl bg-sky-950/20 border border-sky-900/40 space-y-4">
              <div className="flex items-center gap-2 text-sky-400 font-display font-bold text-sm tracking-wider uppercase border-b border-sky-900/50 pb-2">
                <Sparkles className="w-4 h-4" />
                <span>Chemical Properties</span>
              </div>
              <div className="space-y-3 text-xs font-mono">
                <div>
                  <div className="text-sky-500">Reactivity Level</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      material.reactivity === 'Very High' ? 'bg-red-950 text-red-300 border border-red-800' :
                      material.reactivity === 'High' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      material.reactivity === 'Moderate' ? 'bg-yellow-950 text-yellow-300 border border-yellow-800' :
                      material.reactivity === 'Low' ? 'bg-sky-950 text-sky-300 border border-sky-800' :
                      'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {material.reactivity}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sky-500">Common Oxidation States</div>
                  <div className="text-white font-semibold text-sm mt-0.5">{material.oxidationStates}</div>
                </div>
                <div>
                  <div className="text-sky-500">General Chemical Behavior</div>
                  <p className="text-sky-200 text-xs font-sans mt-1 leading-relaxed">
                    {material.chemicalBehavior}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Interesting Facts & Timeline */}
          <div className="p-5 rounded-xl bg-sky-950/20 border border-sky-900/40 space-y-4">
            <div className="flex items-center gap-2 text-sky-400 font-display font-bold text-sm tracking-wider uppercase border-b border-sky-900/50 pb-2">
              <Sparkles className="w-4 h-4" />
              <span>Interesting Scientific Facts</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {material.interestingFacts.map((fact, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-sky-950/30 border border-sky-900/50 text-xs text-sky-200 leading-relaxed">
                  <div className="text-sky-400 font-mono font-bold text-[10px] mb-1">FACT #{idx + 1}</div>
                  {fact}
                </div>
              ))}
            </div>

            {/* Timeline Milestones */}
            {material.timeline && material.timeline.length > 0 && (
              <div className="pt-2">
                <div className="flex items-center gap-2 text-xs font-mono text-sky-500 uppercase mb-3">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Historical & Scientific Timeline</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {material.timeline.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-sky-950/40 border border-sky-900/50 text-xs">
                      <div className="text-sky-300 font-display font-bold text-sm">{item.year}</div>
                      <div className="text-sky-200/80 text-[11px] mt-0.5">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer Bar */}
        <div className="px-6 py-3 border-t border-sky-900/50 bg-[#020617]/95 flex items-center justify-between">
          <span className="text-[10px] font-mono text-sky-600">
            SEC-HASH: {material.id.toUpperCase()}-VERIFIED
          </span>
          <button
            onClick={handleClose}
            className="px-5 py-2 rounded bg-sky-950 hover:bg-sky-900 text-sky-300 border border-sky-800 text-xs font-display font-bold uppercase transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
