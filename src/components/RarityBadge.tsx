import React from 'react';
import { MaterialRarity } from '../types';
import { RARITY_CONFIG } from '../utils/materialRarity';
import { Shield, Gem, Orbit, Crown, Sparkles } from 'lucide-react';
import { AppLanguage } from '../utils/i18n';

interface RarityBadgeProps {
  rarity: MaterialRarity;
  lang?: AppLanguage;
  size?: 'xs' | 'sm' | 'md';
  showIcon?: boolean;
  className?: string;
}

export const RarityBadge: React.FC<RarityBadgeProps> = ({
  rarity,
  lang = 'en',
  size = 'xs',
  showIcon = true,
  className = '',
}) => {
  const config = RARITY_CONFIG[rarity] || RARITY_CONFIG.Common;

  const renderIcon = () => {
    if (!showIcon) return null;
    const iconSizeClass = size === 'md' ? 'w-3.5 h-3.5' : size === 'sm' ? 'w-3 h-3' : 'w-2.5 h-2.5';

    switch (config.iconName) {
      case 'crown':
        return <Crown className={`${iconSizeClass} text-amber-300 flex-shrink-0`} />;
      case 'orbit':
        return <Orbit className={`${iconSizeClass} text-purple-300 flex-shrink-0`} />;
      case 'gem':
        return <Gem className={`${iconSizeClass} text-sky-300 flex-shrink-0`} />;
      case 'shield':
      default:
        return <Shield className={`${iconSizeClass} text-slate-300 flex-shrink-0`} />;
    }
  };

  const sizeClasses = {
    xs: 'px-2 py-0.5 text-[9px] gap-1',
    sm: 'px-2.5 py-1 text-[10px] gap-1.5',
    md: 'px-3 py-1 text-xs gap-2',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-mono uppercase tracking-wider font-semibold transition-all duration-150 select-none ${
        config.badgeClass
      } ${sizeClasses[size]} ${className}`}
      title={`${config.labelEn}: ${config.descEn}`}
    >
      {renderIcon()}
      <span>{lang === 'ar' ? config.labelAr : config.labelEn}</span>
    </span>
  );
};
