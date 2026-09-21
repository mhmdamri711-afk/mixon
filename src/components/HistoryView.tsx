import React, { useState } from 'react';
import { ExperimentHistoryItem, Material } from '../types';
import { 
  History, 
  RotateCcw, 
  Trash2, 
  FlaskConical, 
  ArrowRight, 
  Clock, 
  AlertTriangle,
  X,
  Check
} from 'lucide-react';
import { labSound } from '../utils/sound';
import { AppLanguage } from '../utils/i18n';

interface HistoryViewProps {
  history: ExperimentHistoryItem[];
  onReplayExperiment: (matA: Material, matB: Material) => void;
  onClearHistory: () => void;
  onGoToLab: () => void;
  lang?: AppLanguage;
}

function formatRelativeTime(timestamp: number, lang: string = 'en'): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / (1000 * 60));
  if (lang === 'ar') {
    if (minutes < 1) return 'الآن';
    if (minutes === 1) return 'منذ دقيقة';
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return 'منذ ساعة';
    if (hours < 24) return `منذ ${hours} ساعة`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'أمس';
    return `منذ ${days} أيام`;
  }
  if (minutes < 1) return 'Just now';
  if (minutes === 1) return '1 minute ago';
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return '1 hour ago';
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onReplayExperiment,
  onClearHistory,
  onGoToLab,
  lang = 'en'
}) => {
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-900/50 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 border border-sky-400 rotate-45 flex items-center justify-center">
              <div className="w-1 h-1 bg-sky-400" />
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-widest uppercase">
              {lang === 'ar' ? (
                <>سجل <span className="text-sky-400">التجارب والمحاكاة</span></>
              ) : (
                <>EXPERIMENT <span className="text-sky-400">HISTORY</span></>
              )}
            </h1>
          </div>
          <p className="text-sm text-sky-200/80 mt-1">
            {lang === 'ar'
              ? 'مراجعة وإعادة تشغيل جميع التفاعلات والتحولات الجزيئية المحاكية السابقة.'
              : 'Replay and review all past simulated reactions and molecular syntheses.'}
          </p>
        </div>

        {history.length > 0 && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {confirmClearOpen ? (
              <div className="flex items-center gap-1.5 p-1 rounded bg-red-950/80 border border-red-500/60">
                <span className="text-[11px] font-mono text-red-200 px-2">
                  {lang === 'ar' ? 'تأكيد المسح؟' : 'Confirm clear?'}
                </span>
                <button
                  onClick={() => {
                    labSound.playClick();
                    onClearHistory();
                    setConfirmClearOpen(false);
                  }}
                  className="p-1 rounded bg-red-600 hover:bg-red-500 text-white transition cursor-pointer"
                  title={lang === 'ar' ? 'تأكيد' : 'Confirm'}
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setConfirmClearOpen(false)}
                  className="p-1 rounded bg-sky-950 hover:bg-sky-900 text-sky-300 transition cursor-pointer"
                  title={lang === 'ar' ? 'إلغاء' : 'Cancel'}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  labSound.playClick();
                  setConfirmClearOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-sky-950 hover:bg-red-950/40 text-sky-400 hover:text-red-300 border border-sky-800 hover:border-red-500/30 text-xs font-mono transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'مسح السجل' : 'CLEAR LOGS'}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* History Items */}
      {history.length === 0 ? (
        <div className="text-center py-20 bg-[#020617] rounded-xl border border-sky-900/40 p-6 space-y-4">
          <FlaskConical className="w-12 h-12 text-sky-700 mx-auto" />
          <h3 className="font-display font-black text-xl text-white">
            {lang === 'ar' ? 'لا توجد محاكاة مسجلة بعد' : 'No Simulations Recorded Yet'}
          </h3>
          <p className="text-sm text-sky-400/80 max-w-md mx-auto font-sans">
            {lang === 'ar'
              ? 'سجل المختبر فارغ حالياً. ادخل إلى مختبر التفاعلات، ضع مادتين، واضغط على زر التفاعل COMBINE لتسجيل أول محاكاة رقمية!'
              : 'Your laboratory log is empty. Visit the Mix Lab, slot two materials, and hit COMBINE to log your first simulated synthesis!'}
          </p>
          <button
            onClick={() => {
              labSound.playClick();
              onGoToLab();
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-sky-500 hover:bg-sky-400 text-black font-display font-black text-xs tracking-widest uppercase transition shadow-[0_0_15px_rgba(14,165,233,0.3)] cursor-pointer"
          >
            <span>{lang === 'ar' ? 'الدخول لمختبر التفاعلات' : 'Launch Mix Lab'}</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map(item => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-xl bg-[#020617] hover:bg-sky-950/20 border border-sky-900/40 hover:border-sky-500/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Inputs Badge */}
                  <div className="flex items-center gap-1 text-sm font-mono font-bold text-white">
                    <span 
                      className="px-2 py-0.5 rounded text-xs text-white"
                      style={{ backgroundColor: item.materialA.colorHex }}
                    >
                      {item.materialA.symbol}
                    </span>
                    <span className="text-sky-600">+</span>
                    <span 
                      className="px-2 py-0.5 rounded text-xs text-white"
                      style={{ backgroundColor: item.materialB.colorHex }}
                    >
                      {item.materialB.symbol}
                    </span>
                    <span className="text-sky-300 ml-1">
                      ({lang === 'ar' ? (item.materialA.nameAr || item.materialA.name) : item.materialA.name} + {lang === 'ar' ? (item.materialB.nameAr || item.materialB.name) : item.materialB.name})
                    </span>
                  </div>

                  <span className="text-xs font-mono text-sky-600 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-sky-600" />
                    <span>{formatRelativeTime(item.timestamp, lang)}</span>
                  </span>
                </div>

                {/* Simulated Result Formula */}
                <div className="text-base font-display font-black text-white">
                  {item.result.outputName}
                </div>

                <div className="text-xs font-mono text-sky-400">
                  {item.result.outputFormula} • <span className="text-sky-300/80">{item.result.reactionType}</span>
                </div>

                <p className="text-xs text-sky-200/80 italic line-clamp-1 font-sans">
                  "{item.result.observedChange}"
                </p>
              </div>

              {/* Action: Re-run in Lab */}
              <button
                onClick={() => {
                  labSound.playClick();
                  onReplayExperiment(item.materialA, item.materialB);
                }}
                className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded bg-sky-950 hover:bg-sky-900 border border-sky-800 text-xs font-mono font-bold tracking-wider text-sky-300 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'إعادة في المختبر' : 'RE-RUN IN LAB'}</span>
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
