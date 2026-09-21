import React, { useState, useEffect, useRef } from 'react';
import { Material } from '../types';
import { Search, X, Atom, ArrowRight, Sparkles } from 'lucide-react';
import { labSound } from '../utils/sound';

interface GlobalSearchModalProps {
  isOpen: boolean;
  materials: Material[];
  onClose: () => void;
  onSelectMaterial: (material: Material) => void;
  onLoadToLab: (material: Material, slot: 'A' | 'B') => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  materials,
  onClose,
  onSelectMaterial,
  onLoadToLab
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // Toggle
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? materials.filter(m => 
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        (m.nameAr && m.nameAr.includes(query)) ||
        m.symbol.toLowerCase().includes(query.toLowerCase()) ||
        m.category.toLowerCase().includes(query.toLowerCase())
      )
    : materials.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl rounded-xl bg-[#020617] border border-sky-900/50 shadow-[0_0_50px_rgba(14,165,233,0.25)] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-sky-900/50 bg-[#020617]/95">
          <Search className="w-5 h-5 text-sky-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search material or symbol... (e.g. Gold, Au, Water, H₂O, Oxygen, Cu)"
            className="flex-1 bg-transparent border-none outline-none text-sky-100 placeholder-sky-700 font-sans text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-mono text-sky-500 hover:text-sky-300 mr-2"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded text-sky-500 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          <div className="px-2 py-1 text-[10px] font-mono text-sky-500 tracking-widest uppercase">
            {query.trim() ? `Search Results (${results.length})` : 'Recommended Samples'}
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-sky-600">
              <Atom className="w-8 h-8 mx-auto text-sky-700 mb-2" />
              <p className="text-sm font-display font-bold text-sky-300">No scientific samples found for "{query}"</p>
              <p className="text-xs text-sky-600 mt-0.5 font-mono">Try searching by element symbol (e.g. Fe, Au, Na, He)</p>
            </div>
          ) : (
            results.map(mat => (
              <div
                key={mat.id}
                className="group flex items-center justify-between p-2.5 rounded-lg bg-[#020617] hover:bg-sky-950/30 border border-sky-900/40 hover:border-sky-500/40 transition cursor-pointer"
                onClick={() => {
                  labSound.playClick();
                  onSelectMaterial(mat);
                  onClose();
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-lg text-white shadow-sm flex-shrink-0"
                    style={{ backgroundColor: mat.colorHex }}
                  >
                    {mat.symbol}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-base text-white group-hover:text-sky-300 transition">
                        {mat.name}
                      </span>
                      <span className="text-xs font-mono text-sky-400 font-bold">
                        — {mat.symbol}
                      </span>
                      {mat.nameAr && (
                        <span className="text-xs text-sky-500">
                          ({mat.nameAr})
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] font-mono text-sky-500 uppercase">
                      {mat.category} • State: {mat.state} {mat.atomicNumber && `• Z=${mat.atomicNumber}`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => {
                      labSound.playClick();
                      onLoadToLab(mat, 'A');
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded bg-sky-950 hover:bg-sky-900 border border-sky-800 text-[10px] font-mono text-sky-300 font-bold"
                  >
                    +Slot A
                  </button>
                  <button
                    onClick={() => {
                      labSound.playClick();
                      onLoadToLab(mat, 'B');
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded bg-sky-950 hover:bg-sky-900 border border-sky-800 text-[10px] font-mono text-sky-300 font-bold"
                  >
                    +Slot B
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#020617] border-t border-sky-900/50 flex items-center justify-between text-xs font-mono text-sky-600">
          <span>Press ESC to exit</span>
          <span className="text-sky-400 font-bold">MIXON QUANTUM INDEX</span>
        </div>
      </div>
    </div>
  );
};
