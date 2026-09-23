import React from 'react';
import { X, Award } from 'lucide-react';
import { RatingSystem } from './RatingSystem';
import { AppLanguage } from '../utils/i18n';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: AppLanguage;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  lang = 'en'
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="w-full max-w-lg rounded-2xl bg-[#020617] border border-sky-900/60 shadow-[0_0_50px_rgba(14,165,233,0.25)] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-sky-900/50 bg-[#020617]/95">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="font-display font-black text-sm text-white tracking-widest uppercase">
              {lang === 'ar' ? 'تقييم منصة ميكسون' : 'MIXON Platform Review'}
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-sky-500 hover:text-white p-1 rounded-lg hover:bg-white/5 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <RatingSystem lang={lang} />
        </div>
      </div>
    </div>
  );
};
