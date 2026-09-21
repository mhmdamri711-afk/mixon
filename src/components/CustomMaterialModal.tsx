import React, { useState } from 'react';
import { Material, MatterState, MaterialRarity } from '../types';
import { Sparkles, X, Plus, Atom } from 'lucide-react';
import { labSound } from '../utils/sound';
import { RARITIES } from '../utils/materialRarity';

interface CustomMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomMaterial: (material: Material) => void;
}

export const CustomMaterialModal: React.FC<CustomMaterialModalProps> = ({
  isOpen,
  onClose,
  onAddCustomMaterial
}) => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [rarity, setRarity] = useState<MaterialRarity>('Exotic');
  const [state, setState] = useState<MatterState>('Solid');
  const [colorHex, setColorHex] = useState('#00d2ff');
  const [density, setDensity] = useState('5.4 g/cm³');
  const [conductivity, setConductivity] = useState<'High' | 'Medium' | 'Low' | 'Non-conductive' | 'Superconductor'>('High');
  const [reactivity, setReactivity] = useState<'Very High' | 'High' | 'Moderate' | 'Low' | 'Inert'>('Moderate');
  const [appearance, setAppearance] = useState('Luminescent exotic isotope with crystalline lattice resonance.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !symbol.trim()) return;

    labSound.playReactionSuccess();

    const newMat: Material = {
      id: `custom_${Date.now()}`,
      name: name.trim(),
      symbol: symbol.trim().slice(0, 4),
      category: 'Custom',
      rarity,
      state,
      colorHex,
      particleColor: colorHex,
      density,
      meltingPoint: '1450 °C',
      boilingPoint: '3100 °C',
      appearance,
      conductivity,
      reactivity,
      oxidationStates: '+2, +4 (Theoretical)',
      chemicalBehavior: 'Synthesized theoretical allotrope modeled in MIXON quantum simulation chamber.',
      interestingFacts: [
        'A custom synthesized theoretical matter sample crafted in MIXON lab.',
        'Exhibits non-standard quantum energy states and anomalous lattice spacing.'
      ],
      timeline: [
        { year: 'Present Day', event: 'Synthesized inside MIXON virtual particle collider.' }
      ],
      custom: true
    };

    onAddCustomMaterial(newMat);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg rounded-xl bg-[#020617] border border-sky-900/50 shadow-[0_0_50px_rgba(14,165,233,0.25)] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-sky-900/50 bg-[#020617]/95">
          <div className="flex items-center gap-2.5">
            <Atom className="w-5 h-5 text-sky-400" />
            <h2 className="font-display font-black text-lg text-white tracking-widest uppercase">
              SYNTHESIZE CUSTOM MATTER
            </h2>
          </div>
          <button onClick={onClose} className="text-sky-500 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-sans">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sky-500 font-mono text-[10px] uppercase tracking-widest block mb-1">Element Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Chronium"
                className="w-full px-3 py-2 rounded-sm bg-[#020617] border border-sky-900 text-white focus:border-sky-400 outline-none text-xs font-mono"
              />
            </div>
            <div>
              <label className="text-sky-500 font-mono text-[10px] uppercase tracking-widest block mb-1">Atomic Symbol (1-4 chars)</label>
              <input
                type="text"
                required
                maxLength={4}
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="e.g. Ch"
                className="w-full px-3 py-2 rounded-sm bg-[#020617] border border-sky-900 text-white focus:border-sky-400 outline-none text-xs uppercase font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sky-500 font-mono text-[10px] uppercase tracking-widest block mb-1">State of Matter</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value as MatterState)}
                className="w-full px-3 py-2 rounded-sm bg-[#020617] border border-sky-900 text-white focus:border-sky-400 outline-none text-xs font-mono"
              >
                <option value="Solid">Solid</option>
                <option value="Liquid">Liquid</option>
                <option value="Gas">Gas</option>
                <option value="Plasma">Plasma</option>
              </select>
            </div>
            <div>
              <label className="text-sky-500 font-mono text-[10px] uppercase tracking-widest block mb-1">Specimen Rarity Tier</label>
              <select
                value={rarity}
                onChange={(e) => setRarity(e.target.value as MaterialRarity)}
                className="w-full px-3 py-2 rounded-sm bg-[#020617] border border-sky-900 text-white focus:border-sky-400 outline-none text-xs font-mono"
              >
                {RARITIES.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.labelEn} ({r.labelAr})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sky-500 font-mono text-[10px] uppercase tracking-widest block mb-1">Luminescent Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colorHex}
                  onChange={(e) => setColorHex(e.target.value)}
                  className="w-10 h-8 rounded bg-transparent border-0 cursor-pointer"
                />
                <span className="font-mono text-sky-300 uppercase">{colorHex}</span>
              </div>
            </div>
            <div>
              <label className="text-sky-500 font-mono text-[10px] uppercase tracking-widest block mb-1">Density Specification</label>
              <input
                type="text"
                value={density}
                onChange={(e) => setDensity(e.target.value)}
                placeholder="e.g. 5.4 g/cm³"
                className="w-full px-3 py-2 rounded-sm bg-[#020617] border border-sky-900 text-white focus:border-sky-400 outline-none text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sky-500 font-mono text-[10px] uppercase tracking-widest block mb-1">Conductivity</label>
              <select
                value={conductivity}
                onChange={(e) => setConductivity(e.target.value as any)}
                className="w-full px-3 py-2 rounded-sm bg-[#020617] border border-sky-900 text-white focus:border-sky-400 outline-none text-xs font-mono"
              >
                <option value="Superconductor">Superconductor</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                <option value="Non-conductive">Non-conductive</option>
              </select>
            </div>
            <div>
              <label className="text-sky-500 font-mono text-[10px] uppercase tracking-widest block mb-1">Reactivity</label>
              <select
                value={reactivity}
                onChange={(e) => setReactivity(e.target.value as any)}
                className="w-full px-3 py-2 rounded-sm bg-[#020617] border border-sky-900 text-white focus:border-sky-400 outline-none text-xs font-mono"
              >
                <option value="Very High">Very High</option>
                <option value="High">High</option>
                <option value="Moderate">Moderate</option>
                <option value="Low">Low</option>
                <option value="Inert">Inert</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sky-500 font-mono text-[10px] uppercase tracking-widest block mb-1">Visual Description</label>
            <textarea
              rows={2}
              value={appearance}
              onChange={(e) => setAppearance(e.target.value)}
              className="w-full px-3 py-2 rounded-sm bg-[#020617] border border-sky-900 text-white focus:border-sky-400 outline-none text-xs font-sans"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded text-sky-500 hover:text-white font-mono text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-sm bg-sky-500 hover:bg-sky-400 text-black font-display font-black text-xs tracking-widest uppercase transition shadow-[0_0_15px_rgba(14,165,233,0.3)]"
            >
              Synthesize Element
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
