import React from 'react';
import { ShieldCheck, ShieldAlert, X, AlertTriangle, CheckCircle } from 'lucide-react';
import { labSound } from '../utils/sound';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyModal: React.FC<SafetyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl rounded-xl bg-[#020617] border border-sky-900/50 shadow-[0_0_50px_rgba(14,165,233,0.25)] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-sky-900/50 bg-[#020617]/95">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded border border-amber-500/40 bg-amber-950/40 text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-black text-lg text-white tracking-wide">
                SAFETY SYSTEM PROTOCOL
              </h2>
              <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                SIMULATION ONLY ENVIRONMENT
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              labSound.playClick();
              onClose();
            }}
            className="p-1.5 rounded text-sky-500 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs sm:text-sm text-sky-200/80 leading-relaxed font-sans">
          <div className="p-4 rounded-xl bg-sky-950/20 border border-amber-500/40 text-amber-200">
            <h4 className="font-display font-black text-sm tracking-wider text-amber-300 mb-1">
              SIMULATION ONLY
            </h4>
            <p className="text-xs sm:text-sm">
              This experiment is available as a digital simulation and should not be attempted in real life.
            </p>
            <p className="text-xs text-amber-300/80 font-sans mt-2">
              هذا الموقع عبارة عن محاكاة تعليمية رقمية قائمة على مبادئ الفيزياء والكيمياء النظرية، ولا يقدم أي وصفات أو تعليمات لتنفيذ تفاعلات في الواقع.
            </p>
          </div>

          <div className="space-y-2 text-sky-300/80 text-xs">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
              <span>Zero-risk educational modeling of molecular transformations, phase transitions, and energy exchanges.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
              <span>Chemical kinetics and quantities are abstracted to focus on scientific concepts and atomic behaviors.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
              <span>All toxic or volatile substances (e.g., sodium, mercury, chlorine) are confined strictly to simulated sandbox algorithms.</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#020617] border-t border-sky-900/50 flex justify-end">
          <button
            onClick={() => {
              labSound.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-sm bg-sky-500 hover:bg-sky-400 text-black font-display font-black text-xs tracking-widest uppercase transition shadow-[0_0_15px_rgba(14,165,233,0.3)]"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
};
