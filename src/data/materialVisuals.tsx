import React from 'react';

interface MaterialVisualProps {
  id: string;
  className?: string;
  size?: number;
}

export const MaterialVisualThumbnail: React.FC<MaterialVisualProps> = ({ id, className = '', size = 56 }) => {
  const s = size;
  const key = id.toLowerCase().trim();

  if (key.startsWith('no_rx')) {
    return (
      <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="36" cy="50" r="22" fill="#64748b" fillOpacity="0.4" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="64" cy="50" r="22" fill="#475569" fillOpacity="0.4" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="50" y1="26" x2="50" y2="74" stroke="#e2e8f0" strokeWidth="1.5" strokeOpacity="0.7" strokeDasharray="2 2" />
        <circle cx="50" cy="50" r="5" fill="#f59e0b" fillOpacity="0.8" />
      </svg>
    );
  }

  switch (key) {
    // =========================================================================
    // 1. LIQUIDS
    // =========================================================================
    case 'water':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="waterGrad" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#0284c7" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.95" />
            </radialGradient>
            <radialGradient id="waterHighlight" cx="30%" cy="25%" r="35%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#e0f2fe" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0" />
            </radialGradient>
            <filter id="waterGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <ellipse cx="50" cy="84" rx="34" ry="8" fill="#0284c7" fillOpacity="0.25" />
          <ellipse cx="50" cy="84" rx="24" ry="5" fill="#38bdf8" fillOpacity="0.35" />
          <path
            d="M50 14 C50 14 22 48 22 68 C22 83.4 34.5 92 50 92 C65.5 92 78 83.4 78 68 C78 48 50 14 50 14 Z"
            fill="url(#waterGrad)"
            stroke="#e0f2fe"
            strokeWidth="1.2"
            filter="url(#waterGlow)"
          />
          <path
            d="M50 24 C50 24 28 52 28 69 C28 81 37.8 87 50 87 C62.2 87 72 81 72 69 C72 52 50 24 50 24 Z"
            fill="#0ea5e9"
            fillOpacity="0.35"
          />
          <ellipse cx="40" cy="46" rx="9" ry="16" transform="rotate(-22 40 46)" fill="url(#waterHighlight)" />
          <ellipse cx="60" cy="74" rx="6" ry="3" fill="#ffffff" fillOpacity="0.6" />
        </svg>
      );

    case 'mercury':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="hgGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#e2e8f0" />
              <stop offset="55%" stopColor="#94a3b8" />
              <stop offset="85%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </radialGradient>
            <filter id="hgShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.6" />
            </filter>
          </defs>
          <ellipse cx="50" cy="82" rx="36" ry="10" fill="#0f172a" fillOpacity="0.5" />
          <path
            d="M50 22 C30 22 18 42 18 64 C18 78 32 86 50 86 C68 86 82 78 82 64 C82 42 70 22 50 22 Z"
            fill="url(#hgGrad)"
            stroke="#f8fafc"
            strokeWidth="1.2"
            filter="url(#hgShadow)"
          />
          <ellipse cx="38" cy="42" rx="14" ry="7" transform="rotate(-25 38 42)" fill="#ffffff" fillOpacity="0.85" />
          <ellipse cx="66" cy="68" rx="8" ry="4" fill="#ffffff" fillOpacity="0.4" />
        </svg>
      );

    case 'ethanol':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="ethGrad" cx="40%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#f0f9ff" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#bae6fd" stopOpacity="0.75" />
              <stop offset="80%" stopColor="#7dd3fc" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.7" />
            </radialGradient>
          </defs>
          <ellipse cx="50" cy="84" rx="32" ry="7" fill="#0369a1" fillOpacity="0.2" />
          <path
            d="M50 16 C50 16 25 46 25 66 C25 80 36 88 50 88 C64 88 75 80 75 66 C75 46 50 16 50 16 Z"
            fill="url(#ethGrad)"
            stroke="#bae6fd"
            strokeWidth="1.2"
          />
          <ellipse cx="42" cy="48" rx="7" ry="14" transform="rotate(-20 42 48)" fill="#ffffff" fillOpacity="0.7" />
          <circle cx="58" cy="65" r="3" fill="#ffffff" fillOpacity="0.5" />
          <circle cx="46" cy="74" r="2" fill="#ffffff" fillOpacity="0.4" />
        </svg>
      );

    // =========================================================================
    // 2. METALS & ALLOYS (Ingot / Bar Style)
    // =========================================================================
    case 'copper':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cuFront" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="25%" stopColor="#c2410c" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="85%" stopColor="#9a3412" />
              <stop offset="100%" stopColor="#7c2d12" />
            </linearGradient>
            <linearGradient id="cuTop" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="50%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <linearGradient id="cuSide" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9a3412" />
              <stop offset="100%" stopColor="#431407" />
            </linearGradient>
            <filter id="cuShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#ea580c" floodOpacity="0.4" />
            </filter>
          </defs>
          <g filter="url(#cuShadow)">
            <polygon points="26,38 74,38 84,24 36,24" fill="url(#cuTop)" />
            <polygon points="74,38 84,24 84,62 74,76" fill="url(#cuSide)" />
            <polygon points="26,38 74,38 74,76 26,76" fill="url(#cuFront)" stroke="#fdba74" strokeWidth="0.8" />
            <rect x="34" y="48" width="32" height="18" rx="2" fill="#431407" fillOpacity="0.45" stroke="#fb923c" strokeWidth="0.6" />
            <text x="50" y="58" textAnchor="middle" fill="#fed7aa" fontSize="8" fontFamily="monospace" fontWeight="bold">Cu • 29</text>
            <text x="50" y="64" textAnchor="middle" fill="#fdba74" fontSize="5" fontFamily="sans-serif">COPPER 99.9%</text>
            <line x1="30" y1="40" x2="48" y2="74" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.5" />
            <line x1="52" y1="40" x2="70" y2="74" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
          </g>
        </svg>
      );

    case 'gold':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="auFront" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="20%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="85%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="auTop" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#facc15" />
            </linearGradient>
            <linearGradient id="auSide" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <filter id="auGlow" x="-15%" y="-15%" width="130%" height="135%">
              <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#f59e0b" floodOpacity="0.5" />
            </filter>
          </defs>
          <g filter="url(#auGlow)">
            <polygon points="26,38 74,38 84,24 36,24" fill="url(#auTop)" />
            <polygon points="74,38 84,24 84,62 74,76" fill="url(#auSide)" />
            <polygon points="26,38 74,38 74,76 26,76" fill="url(#auFront)" stroke="#fef08a" strokeWidth="0.8" />
            <rect x="34" y="48" width="32" height="18" rx="2" fill="#78350f" fillOpacity="0.45" stroke="#fef08a" strokeWidth="0.6" />
            <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">Au • 79</text>
            <text x="50" y="64" textAnchor="middle" fill="#fef08a" fontSize="5" fontFamily="sans-serif">999.9 FINE GOLD</text>
            <line x1="32" y1="40" x2="52" y2="74" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.75" />
            <line x1="56" y1="40" x2="72" y2="74" stroke="#ffffff" strokeWidth="1.0" strokeOpacity="0.5" />
          </g>
        </svg>
      );

    case 'iron':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="feFront" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="30%" stopColor="#64748b" />
              <stop offset="70%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="feTop" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="50%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="feSide" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <filter id="feShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#334155" floodOpacity="0.5" />
            </filter>
          </defs>
          <g filter="url(#feShadow)">
            <polygon points="26,38 74,38 84,24 36,24" fill="url(#feTop)" />
            <polygon points="74,38 84,24 84,62 74,76" fill="url(#feSide)" />
            <polygon points="26,38 74,38 74,76 26,76" fill="url(#feFront)" stroke="#cbd5e1" strokeWidth="0.8" />
            <rect x="34" y="48" width="32" height="18" rx="2" fill="#0f172a" fillOpacity="0.45" stroke="#94a3b8" strokeWidth="0.6" />
            <text x="50" y="58" textAnchor="middle" fill="#f8fafc" fontSize="8" fontFamily="monospace" fontWeight="bold">Fe • 26</text>
            <text x="50" y="64" textAnchor="middle" fill="#cbd5e1" fontSize="5" fontFamily="sans-serif">FERRUM CAST</text>
            <line x1="30" y1="40" x2="48" y2="74" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.4" />
          </g>
        </svg>
      );

    case 'titanium':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tiFront" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="35%" stopColor="#94a3b8" />
              <stop offset="70%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="tiTop" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id="tiSide" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <filter id="tiGlow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#38bdf8" floodOpacity="0.3" />
            </filter>
          </defs>
          <g filter="url(#tiGlow)">
            <polygon points="26,38 74,38 84,24 36,24" fill="url(#tiTop)" />
            <polygon points="74,38 84,24 84,62 74,76" fill="url(#tiSide)" />
            <polygon points="26,38 74,38 74,76 26,76" fill="url(#tiFront)" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="34" y="48" width="32" height="18" rx="2" fill="#1e293b" fillOpacity="0.5" stroke="#94a3b8" strokeWidth="0.6" />
            <text x="50" y="58" textAnchor="middle" fill="#f8fafc" fontSize="8" fontFamily="monospace" fontWeight="bold">Ti • 22</text>
            <text x="50" y="64" textAnchor="middle" fill="#93c5fd" fontSize="4.5" fontFamily="sans-serif">AEROSPACE Ti</text>
            <line x1="30" y1="40" x2="50" y2="74" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.6" />
          </g>
        </svg>
      );

    case 'silver':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="agFront" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#e2e8f0" />
              <stop offset="60%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="agTop" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="agSide" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <filter id="agGlow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#cbd5e1" floodOpacity="0.4" />
            </filter>
          </defs>
          <g filter="url(#agGlow)">
            <polygon points="26,38 74,38 84,24 36,24" fill="url(#agTop)" />
            <polygon points="74,38 84,24 84,62 74,76" fill="url(#agSide)" />
            <polygon points="26,38 74,38 74,76 26,76" fill="url(#agFront)" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="34" y="48" width="32" height="18" rx="2" fill="#334155" fillOpacity="0.35" stroke="#cbd5e1" strokeWidth="0.6" />
            <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">Ag • 47</text>
            <text x="50" y="64" textAnchor="middle" fill="#f1f5f9" fontSize="5" fontFamily="sans-serif">FINE SILVER</text>
            <line x1="32" y1="40" x2="52" y2="74" stroke="#ffffff" strokeWidth="2.0" strokeOpacity="0.9" />
          </g>
        </svg>
      );

    case 'aluminum':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="alFront" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="40%" stopColor="#cbd5e1" />
              <stop offset="80%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
            <linearGradient id="alTop" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id="alSide" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          <polygon points="26,38 74,38 84,24 36,24" fill="url(#alTop)" />
          <polygon points="74,38 84,24 84,62 74,76" fill="url(#alSide)" />
          <polygon points="26,38 74,38 74,76 26,76" fill="url(#alFront)" stroke="#f1f5f9" strokeWidth="0.8" />
          <rect x="34" y="48" width="32" height="18" rx="2" fill="#1e293b" fillOpacity="0.4" stroke="#cbd5e1" strokeWidth="0.6" />
          <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">Al • 13</text>
          <text x="50" y="64" textAnchor="middle" fill="#e2e8f0" fontSize="5" fontFamily="sans-serif">ALUMINUM</text>
          <line x1="30" y1="40" x2="48" y2="74" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
        </svg>
      );

    case 'zinc':
    case 'magnesium':
    case 'calcium':
    case 'potassium':
    case 'sodium': {
      const symbols: Record<string, { sym: string; num: number; name: string; col: string }> = {
        zinc: { sym: 'Zn', num: 30, name: 'ZINC INGOT', col: '#94a3b8' },
        magnesium: { sym: 'Mg', num: 12, name: 'MAGNESIUM', col: '#f1f5f9' },
        calcium: { sym: 'Ca', num: 20, name: 'CALCIUM', col: '#e2e8f0' },
        potassium: { sym: 'K', num: 19, name: 'POTASSIUM', col: '#cbd5e1' },
        sodium: { sym: 'Na', num: 11, name: 'SODIUM METAL', col: '#e2e8f0' }
      };
      const metal = symbols[key] || { sym: 'M', num: 0, name: 'METAL', col: '#cbd5e1' };

      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="26,38 74,38 84,24 36,24" fill="#f8fafc" />
          <polygon points="74,38 84,24 84,62 74,76" fill="#475569" />
          <polygon points="26,38 74,38 74,76 26,76" fill={metal.col} stroke="#ffffff" strokeWidth="0.8" />
          <rect x="34" y="48" width="32" height="18" rx="2" fill="#0f172a" fillOpacity="0.4" stroke="#94a3b8" strokeWidth="0.6" />
          <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">{metal.sym} • {metal.num}</text>
          <text x="50" y="64" textAnchor="middle" fill="#cbd5e1" fontSize="4.5" fontFamily="sans-serif">{metal.name}</text>
          <line x1="30" y1="40" x2="48" y2="74" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
        </svg>
      );
    }

    // =========================================================================
    // 3. POWDERS & GRANULES (Fine Powders vs Granular Sand)
    // =========================================================================
    case 'baking_soda':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sodaGrad" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#f8fafc" />
              <stop offset="80%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </radialGradient>
            <filter id="sodaShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#94a3b8" floodOpacity="0.3" />
            </filter>
          </defs>
          <g filter="url(#sodaShadow)">
            {/* Smooth conical powder mound */}
            <ellipse cx="50" cy="82" rx="38" ry="10" fill="#94a3b8" fillOpacity="0.4" />
            <path
              d="M14 82 C16 72 32 46 50 36 C68 46 84 72 86 82 C72 87 28 87 14 82 Z"
              fill="url(#sodaGrad)"
              stroke="#ffffff"
              strokeWidth="0.8"
            />
            {/* Fine loose powder particles */}
            <circle cx="48" cy="38" r="1.5" fill="#ffffff" />
            <circle cx="53" cy="42" r="1.2" fill="#ffffff" />
            <circle cx="42" cy="48" r="1.5" fill="#ffffff" />
            <circle cx="58" cy="52" r="1.2" fill="#f1f5f9" />
            <circle cx="36" cy="62" r="1.5" fill="#ffffff" />
            <circle cx="64" cy="65" r="1.2" fill="#f8fafc" />
            <circle cx="50" cy="68" r="1.5" fill="#ffffff" />
            <circle cx="28" cy="76" r="1.2" fill="#ffffff" />
            <circle cx="72" cy="78" r="1.5" fill="#ffffff" />
            <circle cx="50" cy="80" r="1.2" fill="#f1f5f9" />
          </g>
        </svg>
      );

    case 'sulfur':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sulfurGrad" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="35%" stopColor="#facc15" />
              <stop offset="75%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </radialGradient>
            <filter id="sulfurShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#854d0e" floodOpacity="0.4" />
            </filter>
          </defs>
          <g filter="url(#sulfurShadow)">
            <ellipse cx="50" cy="82" rx="38" ry="10" fill="#713f12" fillOpacity="0.4" />
            <path
              d="M14 82 C16 72 32 46 50 36 C68 46 84 72 86 82 C72 87 28 87 14 82 Z"
              fill="url(#sulfurGrad)"
              stroke="#fef08a"
              strokeWidth="0.8"
            />
            {/* Sulfur micro-crystals and powder grains */}
            <circle cx="49" cy="40" r="1.5" fill="#fef9c3" />
            <circle cx="54" cy="44" r="1.2" fill="#ffffff" />
            <circle cx="43" cy="50" r="1.8" fill="#fef08a" />
            <circle cx="59" cy="54" r="1.4" fill="#ffffff" />
            <circle cx="35" cy="64" r="1.8" fill="#fef9c3" />
            <circle cx="66" cy="66" r="1.4" fill="#fde047" />
            <circle cx="50" cy="70" r="1.6" fill="#fef08a" />
            <circle cx="26" cy="77" r="1.4" fill="#fef9c3" />
            <circle cx="74" cy="79" r="1.6" fill="#fde047" />
          </g>
        </svg>
      );

    case 'sand':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sandGrad" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="40%" stopColor="#eab308" />
              <stop offset="75%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#a16207" />
            </radialGradient>
          </defs>
          <ellipse cx="50" cy="82" rx="38" ry="10" fill="#713f12" fillOpacity="0.45" />
          <path
            d="M16 82 C20 70 34 48 50 40 C66 48 80 70 84 82 C70 86 30 86 16 82 Z"
            fill="url(#sandGrad)"
          />
          {/* Individual clustered multi-faceted sand grains */}
          <rect x="47" y="42" width="4" height="4" rx="1" transform="rotate(25 47 42)" fill="#fef08a" />
          <rect x="54" y="47" width="4.5" height="4.5" rx="1" transform="rotate(45 54 47)" fill="#ffffff" />
          <rect x="40" y="52" width="4" height="4" rx="1" transform="rotate(15 40 52)" fill="#d97706" />
          <rect x="58" y="56" width="5" height="5" rx="1" transform="rotate(30 58 56)" fill="#fde047" />
          <rect x="32" y="66" width="4.5" height="4.5" rx="1" transform="rotate(60 32 66)" fill="#fef08a" />
          <rect x="46" y="68" width="5" height="5" rx="1" transform="rotate(20 46 68)" fill="#b45309" />
          <rect x="65" y="68" width="4" height="4" rx="1" transform="rotate(40 65 68)" fill="#fef9c3" />
          <rect x="24" y="78" width="4" height="4" rx="1" transform="rotate(10 24 78)" fill="#d97706" />
          <rect x="74" y="78" width="4.5" height="4.5" rx="1" transform="rotate(50 74 78)" fill="#fde047" />
          <rect x="50" y="78" width="4" height="4" rx="1" transform="rotate(35 50 78)" fill="#ffffff" />
        </svg>
      );

    // =========================================================================
    // 4. CRYSTALS (Quartz, Salt, Diamond, Silicon)
    // =========================================================================
    case 'quartz':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,14 68,36 50,42" fill="#ffffff" fillOpacity="0.9" />
          <polygon points="50,14 32,36 50,42" fill="#bae6fd" fillOpacity="0.75" />
          <polygon points="32,36 50,42 50,86 32,78" fill="#7dd3fc" fillOpacity="0.8" stroke="#ffffff" strokeWidth="0.8" />
          <polygon points="50,42 68,36 68,78 50,86" fill="#c7d2fe" fillOpacity="0.6" stroke="#ffffff" strokeWidth="0.8" />
          <line x1="42" y1="44" x2="42" y2="76" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="2 3" />
        </svg>
      );

    case 'salt':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="saltShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#38bdf8" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#saltShadow)">
            {/* Primary cubic halite crystal */}
            <polygon points="45,28 72,28 84,18 57,18" fill="#ffffff" fillOpacity="0.9" />
            <polygon points="72,28 84,18 84,48 72,58" fill="#cbd5e1" fillOpacity="0.75" />
            <polygon points="45,28 72,28 72,58 45,58" fill="#f8fafc" fillOpacity="0.85" stroke="#ffffff" strokeWidth="0.8" />
            {/* Secondary interpenetrating cubic crystal */}
            <polygon points="22,46 52,46 64,36 34,36" fill="#ffffff" fillOpacity="0.95" />
            <polygon points="52,46 64,36 64,74 52,84" fill="#94a3b8" fillOpacity="0.7" />
            <polygon points="22,46 52,46 52,84 22,84" fill="#f1f5f9" fillOpacity="0.85" stroke="#ffffff" strokeWidth="0.8" />
          </g>
        </svg>
      );

    case 'diamond':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="diaTop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>
            <filter id="diaGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38bdf8" floodOpacity="0.7" />
            </filter>
          </defs>
          <g filter="url(#diaGlow)">
            <polygon points="32,28 68,28 84,48 50,86 16,48" fill="#0284c7" fillOpacity="0.4" />
            <polygon points="32,28 68,28 50,48" fill="url(#diaTop)" stroke="#ffffff" strokeWidth="0.8" />
            <polygon points="16,48 32,28 50,48" fill="#bae6fd" fillOpacity="0.85" stroke="#ffffff" strokeWidth="0.8" />
            <polygon points="68,28 84,48 50,48" fill="#7dd3fc" fillOpacity="0.8" stroke="#ffffff" strokeWidth="0.8" />
            <polygon points="16,48 50,48 50,86" fill="#38bdf8" fillOpacity="0.9" stroke="#ffffff" strokeWidth="0.8" />
            <polygon points="50,48 84,48 50,86" fill="#0284c7" fillOpacity="0.85" stroke="#ffffff" strokeWidth="0.8" />
            <polygon points="40,32 60,32 50,44" fill="#ffffff" fillOpacity="0.9" />
          </g>
        </svg>
      );

    case 'silicon':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="siGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="40%" stopColor="#475569" />
              <stop offset="80%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
          {/* Hexagonal crystal semiconductor wafer facet */}
          <polygon points="50,18 78,34 78,66 50,82 22,66 22,34" fill="url(#siGrad)" stroke="#38bdf8" strokeWidth="1.2" />
          <polygon points="50,28 70,40 70,60 50,72 30,60 30,40" fill="#1e293b" stroke="#94a3b8" strokeWidth="0.8" />
          <line x1="22" y1="34" x2="78" y2="66" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.6" />
          <line x1="78" y1="34" x2="22" y2="66" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.6" />
        </svg>
      );

    // =========================================================================
    // 5. GASES (Volumetric Glowing Gas Clouds)
    // =========================================================================
    case 'oxygen':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="o2Grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.5" />
              <stop offset="85%" stopColor="#0369a1" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0" />
            </radialGradient>
            <filter id="o2Blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="42" fill="url(#o2Grad)" filter="url(#o2Blur)" />
          {/* Diatomic O=O molecules */}
          <g transform="translate(36, 44)">
            <circle cx="0" cy="0" r="8" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="16" cy="0" r="8" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="0" y1="-2" x2="16" y2="-2" stroke="#ffffff" strokeWidth="1.2" />
            <line x1="0" y1="2" x2="16" y2="2" stroke="#ffffff" strokeWidth="1.2" />
          </g>
          <g transform="translate(62, 28) scale(0.65)">
            <circle cx="0" cy="0" r="8" fill="#38bdf8" />
            <circle cx="14" cy="0" r="8" fill="#38bdf8" />
          </g>
          <g transform="translate(24, 68) scale(0.6)">
            <circle cx="0" cy="0" r="8" fill="#38bdf8" />
            <circle cx="14" cy="0" r="8" fill="#38bdf8" />
          </g>
        </svg>
      );

    case 'hydrogen':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="h2Grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1e40af" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="44" fill="url(#h2Grad)" />
          {/* Lightweight H-H molecules */}
          <g transform="translate(38, 46)">
            <circle cx="0" cy="0" r="6" fill="#bfdbfe" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="12" cy="0" r="6" fill="#bfdbfe" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="12" y2="0" stroke="#ffffff" strokeWidth="1" />
          </g>
          <g transform="translate(64, 32) scale(0.7)">
            <circle cx="0" cy="0" r="6" fill="#bfdbfe" />
            <circle cx="12" cy="0" r="6" fill="#bfdbfe" />
          </g>
        </svg>
      );

    case 'nitrogen':
    case 'chlorine':
    case 'helium':
    case 'helium_3':
    case 'carbon_dioxide':
    case 'ammonia':
    case 'methane': {
      const gasTheme: Record<string, { col: string; glow: string; text: string }> = {
        nitrogen: { col: '#818cf8', glow: '#4338ca', text: 'N₂' },
        chlorine: { col: '#a3e635', glow: '#4d7c0f', text: 'Cl₂' },
        helium: { col: '#c084fc', glow: '#7e22ce', text: 'He' },
        helium_3: { col: '#e879f9', glow: '#a21caf', text: '³He' },
        carbon_dioxide: { col: '#94a3b8', glow: '#334155', text: 'CO₂' },
        ammonia: { col: '#38bdf8', glow: '#0369a1', text: 'NH₃' },
        methane: { col: '#4ade80', glow: '#15803d', text: 'CH₄' }
      };
      const theme = gasTheme[key] || { col: '#38bdf8', glow: '#0369a1', text: 'Gas' };

      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="42" fill={theme.col} fillOpacity="0.25" />
          <circle cx="50" cy="50" r="32" fill={theme.glow} fillOpacity="0.4" />
          <circle cx="50" cy="50" r="22" stroke={theme.col} strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="50" y="55" textAnchor="middle" fill="#ffffff" fontSize="13" fontFamily="monospace" fontWeight="bold">
            {theme.text}
          </text>
        </svg>
      );
    }

    // =========================================================================
    // 6. SOLIDS & COSMIC (Carbon, Glass, Plasma, Stardust)
    // =========================================================================
    case 'carbon':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hexagonal graphite stacked sheets */}
          <polygon points="50,22 76,34 76,46 50,58 24,46 24,34" fill="#64748b" stroke="#94a3b8" strokeWidth="0.8" />
          <polygon points="50,38 76,50 76,62 50,74 24,62 24,50" fill="#475569" stroke="#64748b" strokeWidth="0.8" />
          <polygon points="50,54 76,66 76,78 50,90 24,78 24,66" fill="#334155" stroke="#475569" strokeWidth="0.8" />
          <text x="50" y="44" textAnchor="middle" fill="#f8fafc" fontSize="10" fontFamily="monospace" fontWeight="bold">C</text>
        </svg>
      );

    case 'glass':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Beveled optical glass prism */}
          <polygon points="30,25 70,25 82,45 82,75 70,75 30,75 18,55 18,45" fill="#e0f2fe" fillOpacity="0.4" stroke="#ffffff" strokeWidth="1.2" />
          <line x1="30" y1="25" x2="30" y2="75" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.6" />
          <line x1="70" y1="25" x2="70" y2="75" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.6" />
          <line x1="24" y1="30" x2="76" y2="70" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.7" />
        </svg>
      );

    case 'cosmic_plasma':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="plasmaCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#f0abfc" />
              <stop offset="60%" stopColor="#c084fc" />
              <stop offset="85%" stopColor="#9333ea" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#581c87" stopOpacity="0" />
            </radialGradient>
            <filter id="plasmaGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="42" fill="url(#plasmaCore)" filter="url(#plasmaGlow)" />
          <circle cx="50" cy="50" r="26" fill="url(#plasmaCore)" />
          <path d="M50 15 Q56 30 50 50 Q44 70 50 85" stroke="#f472b6" strokeWidth="1.5" fill="none" strokeOpacity="0.7" />
          <path d="M15 50 Q30 56 50 50 Q70 44 85 50" stroke="#c084fc" strokeWidth="1.5" fill="none" strokeOpacity="0.7" />
          <ellipse cx="50" cy="50" rx="34" ry="12" transform="rotate(35 50 50)" stroke="#e879f9" strokeWidth="1" strokeDasharray="4 2" />
        </svg>
      );

    case 'cosmic_stardust':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="42" fill="#c084fc" fillOpacity="0.2" />
          <polygon points="50,22 53,42 73,45 53,48 50,68 47,48 27,45 47,42" fill="#f472b6" />
          <polygon points="30,30 32,40 42,42 32,44 30,54 28,44 18,42 28,40" fill="#ffffff" />
          <polygon points="70,60 71,67 78,68 71,69 70,76 69,69 62,68 69,67" fill="#e879f9" />
          <circle cx="68" cy="32" r="2.5" fill="#facc15" />
          <circle cx="34" cy="70" r="2" fill="#38bdf8" />
        </svg>
      );

    default:
      // Intelligent fallback based on ID patterns or synthesized reaction products
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="defGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
          <rect x="25" y="25" width="50" height="50" rx="8" fill="url(#defGrad)" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="8" fill="#ffffff" fillOpacity="0.4" />
        </svg>
      );
  }
};

export const renderMaterialThumbnail = (id: string, size = 48, className = '') => (
  <MaterialVisualThumbnail id={id} size={size} className={className} />
);
