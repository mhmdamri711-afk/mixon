import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { RatingState } from '../types/rating';
import { loadCachedRatingState, fetchLiveRatingStats, submitLiveRating } from '../utils/ratingStorage';
import { labSound } from '../utils/sound';
import { AppLanguage } from '../utils/i18n';

interface RatingSystemProps {
  lang?: AppLanguage;
  compact?: boolean;
  onRatingChanged?: (state: RatingState) => void;
}

export const RatingSystem: React.FC<RatingSystemProps> = ({
  lang = 'en',
  compact = false,
  onRatingChanged
}) => {
  const [stats, setStats] = useState<RatingState>(loadCachedRatingState);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Sync initial state on mount
  useEffect(() => {
    let mounted = true;
    fetchLiveRatingStats().then(latest => {
      if (mounted) {
        setStats(latest);
        if (onRatingChanged) onRatingChanged(latest);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const effectiveRating = hoverRating !== null ? hoverRating : (stats.userRating || 0);

  const handleSelectStar = async (starValue: number) => {
    if (isSubmitting) return;

    try {
      labSound.playClick();
    } catch {}

    setIsSubmitting(true);
    const result = await submitLiveRating(starValue);
    setIsSubmitting(false);

    if (result.success) {
      setStats(result.state);
      if (onRatingChanged) onRatingChanged(result.state);

      const msg = lang === 'ar'
        ? (stats.userRating ? `تم تحديث تقييمك إلى ${starValue} من 5` : `شكراً لتقييمك (${starValue} من 5)`)
        : (stats.userRating ? `Rating updated to ${starValue} out of 5` : `Thank you for rating (${starValue} / 5)`);
      setFeedbackMessage(msg);
      setTimeout(() => setFeedbackMessage(null), 3000);
    }
  };

  return (
    <div 
      className={`rounded-2xl bg-[#020617] border border-sky-900/60 transition-all ${
        compact ? 'p-4' : 'p-6 sm:p-7'
      } text-start`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="font-display font-bold text-sm sm:text-base text-white tracking-wide flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            <span>{lang === 'ar' ? 'تقييم منصة MIXON العلمية' : 'MIXON Platform Scientific Rating'}</span>
          </h3>
          <p className="text-[11px] font-mono text-sky-400/80 mt-0.5">
            {lang === 'ar' 
              ? 'تقييم تجربة المحاكاة الرقمية ودقة المحتوى العلمي'
              : 'Digital simulation fidelity & scientific experience review'}
          </p>
        </div>

        {stats.userRating !== null && (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30 shrink-0">
            {lang === 'ar' ? `تقييمك: ${stats.userRating}★` : `Your Rating: ${stats.userRating}★`}
          </span>
        )}
      </div>

      {/* 5-Star Interactive Rating Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-y border-sky-950/80">
        <div 
          className="flex items-center gap-1.5"
          role="radiogroup"
          aria-label={lang === 'ar' ? 'تقييم المنصة من 1 إلى 5 نجوم' : 'Platform rating from 1 to 5 stars'}
          onMouseLeave={() => setHoverRating(null)}
        >
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= effectiveRating;
            return (
              <button
                key={star}
                type="button"
                role="radio"
                aria-checked={stats.userRating === star}
                aria-label={lang === 'ar' ? `تقييم ${star} من 5` : `Rate ${star} out of 5`}
                onClick={() => handleSelectStar(star)}
                onMouseEnter={() => setHoverRating(star)}
                onFocus={() => setHoverRating(star)}
                onBlur={() => setHoverRating(null)}
                className="group relative p-1.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-all duration-150 cursor-pointer"
              >
                <Star
                  className={`w-6 h-6 sm:w-7 sm:h-7 transition-all duration-200 ${
                    isFilled
                      ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] transform scale-105'
                      : 'text-slate-600 hover:text-amber-400/60 fill-transparent'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {feedbackMessage && (
          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 animate-fadeIn">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{feedbackMessage}</span>
          </div>
        )}
      </div>

      {/* Dynamic Real-Time Statistics */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 pt-1">
        {/* Average Rating */}
        <div className="p-3 rounded-xl bg-sky-950/20 border border-sky-900/40">
          <div className="text-[10px] font-mono uppercase tracking-widest text-sky-400/90">
            {lang === 'ar' ? 'متوسط التقييم' : 'Average Rating'}
          </div>
          <div className="font-display font-black text-lg sm:text-2xl text-white mt-1 flex items-baseline gap-1">
            <span className="text-amber-300">
              {stats.totalRatings > 0 ? stats.averageRating.toFixed(1) : '0.0'}
            </span>
            <span className="text-xs font-mono text-sky-500 font-normal">/ 5</span>
          </div>
        </div>

        {/* Number of Ratings */}
        <div className="p-3 rounded-xl bg-sky-950/20 border border-sky-900/40">
          <div className="text-[10px] font-mono uppercase tracking-widest text-sky-400/90">
            {lang === 'ar' ? 'عدد التقييمات' : 'Number of Ratings'}
          </div>
          <div className="font-display font-black text-lg sm:text-2xl text-sky-200 mt-1">
            {stats.totalRatings.toLocaleString()}
            <span className="text-xs font-mono text-sky-500 font-normal ml-1">
              {lang === 'ar' ? 'تقييم' : 'ratings'}
            </span>
          </div>
        </div>

        {/* Total Rating Points */}
        <div className="p-3 rounded-xl bg-sky-950/20 border border-sky-900/40">
          <div className="text-[10px] font-mono uppercase tracking-widest text-sky-400/90">
            {lang === 'ar' ? 'مجموع النقاط' : 'Total Rating Points'}
          </div>
          <div className="font-display font-black text-lg sm:text-2xl text-sky-200 mt-1">
            {stats.totalPoints.toLocaleString()}
            <span className="text-xs font-mono text-sky-500 font-normal ml-1">
              {lang === 'ar' ? 'نقطة' : 'pts'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
