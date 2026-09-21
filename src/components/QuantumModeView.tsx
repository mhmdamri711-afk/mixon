import React, { useState, useEffect, useRef } from 'react';
import { AppLanguage } from '../utils/i18n';
import { Atom, Zap, Sparkles, Orbit, Layers, ChevronRight, Info } from 'lucide-react';
import { labSound } from '../utils/sound';

interface QuantumModeViewProps {
  lang: AppLanguage;
  onGoToLab: () => void;
}

type OrbitalType = 's' | 'px' | 'py' | 'pz' | 'dz2' | 'dxy';

export const QuantumModeView: React.FC<QuantumModeViewProps> = ({
  lang,
  onGoToLab
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedOrbital, setSelectedOrbital] = useState<OrbitalType>('s');
  const [quantumN, setQuantumN] = useState<number>(1);
  const [photonEmitted, setPhotonEmitted] = useState<{ color: string; wavelength: string; energy: string } | null>(null);

  const isAr = lang === 'ar';

  const orbitals: { id: OrbitalType; label: string; l: number; desc: string; descAr: string }[] = [
    { id: 's', label: '1s / 2s Orbital', l: 0, desc: 'Spherical symmetry, zero angular momentum node', descAr: 'تماثل كروي منتظم، لا توجد مستويات عقدية زاوية' },
    { id: 'px', label: '2px Orbital', l: 1, desc: 'Dumbbell-shaped probability density oriented along X-axis', descAr: 'كثافة احتمالية ثنائية الفصوص موجهة على طول محور X' },
    { id: 'py', label: '2py Orbital', l: 1, desc: 'Dumbbell-shaped probability density oriented along Y-axis', descAr: 'كثافة احتمالية ثنائية الفصوص موجهة على طول محور Y' },
    { id: 'pz', label: '2pz Orbital', l: 1, desc: 'Dumbbell-shaped probability density oriented along Z-axis', descAr: 'كثافة احتمالية ثنائية الفصوص موجهة على طول محور Z' },
    { id: 'dz2', label: '3dz² Orbital', l: 2, desc: 'Dual vertical lobes with an equatorial donut torus ring', descAr: 'فصان عموديان محاطان بحلقة طارة حلقية استوائية' },
    { id: 'dxy', label: '3dxy Orbital', l: 2, desc: 'Four cloverleaf probability lobes in the XY plane', descAr: 'أربعة فصوص احتمالية على شكل ورقة البرسيم في مستوى XY' }
  ];

  // Quantum Energy calculation: E_n = -13.6 eV / n^2
  const currentEnergy = (-13.6 / (quantumN * quantumN)).toFixed(2);

  // Trigger quantum transition & photon emission
  const triggerTransition = (fromN: number, toN: number) => {
    labSound.playClick();
    const deltaE = Math.abs(-13.6 / (fromN * fromN) - (-13.6 / (toN * toN)));
    // Wavelength = hc / deltaE = 1240 eV*nm / deltaE
    const wavelength = (1240 / deltaE).toFixed(1);

    let color = '#38bdf8';
    if (fromN === 3 && toN === 2) color = '#ef4444'; // Balmer Alpha Red (656 nm)
    else if (fromN === 4 && toN === 2) color = '#06b6d4'; // Balmer Beta Cyan (486 nm)
    else if (fromN === 5 && toN === 2) color = '#6366f1'; // Balmer Gamma Violet (434 nm)
    else if (toN === 1) color = '#a855f7'; // Lyman UV (121 nm)

    setQuantumN(toN);
    setPhotonEmitted({
      color,
      wavelength: `${wavelength} nm`,
      energy: `${deltaE.toFixed(2)} eV`
    });

    setTimeout(() => {
      setPhotonEmitted(null);
    }, 2500);
  };

  // Render quantum electron cloud probability simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick++;
      const width = (canvas.width = canvas.parentElement?.clientWidth || 500);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 450);

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw Quantum Grid Axis
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, 20);
      ctx.lineTo(cx, height - 20);
      ctx.moveTo(20, cy);
      ctx.lineTo(width - 20, cy);
      ctx.stroke();

      // Electron Cloud Density Probability Sampling
      const sampleCount = 450;
      const tPulse = Math.sin(tick * 0.03) * 0.08 + 1.0;

      for (let i = 0; i < sampleCount; i++) {
        let x = 0;
        let y = 0;
        let alpha = 0.5;

        if (selectedOrbital === 's') {
          // Spherical Gaussian distribution
          const r = (Math.random() + Math.random() + Math.random()) * 38 * quantumN * tPulse;
          const theta = Math.random() * Math.PI * 2;
          x = cx + Math.cos(theta) * r;
          y = cy + Math.sin(theta) * r;
          alpha = Math.max(0.1, 1 - r / (120 * quantumN));
        } else if (selectedOrbital === 'px') {
          // Dumbbell along X
          const lobe = Math.random() > 0.5 ? 1 : -1;
          const dist = 30 + Math.random() * 85 * quantumN;
          const spreadY = (Math.random() - 0.5) * (dist * 0.5);
          x = cx + lobe * dist * tPulse;
          y = cy + spreadY;
          alpha = Math.max(0.1, 1 - dist / (130 * quantumN));
        } else if (selectedOrbital === 'py') {
          // Dumbbell along Y
          const lobe = Math.random() > 0.5 ? 1 : -1;
          const dist = 30 + Math.random() * 85 * quantumN;
          const spreadX = (Math.random() - 0.5) * (dist * 0.5);
          x = cx + spreadX;
          y = cy + lobe * dist * tPulse;
          alpha = Math.max(0.1, 1 - dist / (130 * quantumN));
        } else if (selectedOrbital === 'pz') {
          // Dumbbell angled in perspective
          const angle = Math.PI / 4;
          const lobe = Math.random() > 0.5 ? 1 : -1;
          const dist = 30 + Math.random() * 80 * quantumN;
          x = cx + lobe * Math.cos(angle) * dist * tPulse;
          y = cy + lobe * Math.sin(angle) * dist * tPulse;
          alpha = Math.max(0.1, 1 - dist / (120 * quantumN));
        } else if (selectedOrbital === 'dz2') {
          // Lobes + Torus
          if (Math.random() > 0.35) {
            const lobe = Math.random() > 0.5 ? 1 : -1;
            const dist = 25 + Math.random() * 80 * quantumN;
            x = cx + (Math.random() - 0.5) * (dist * 0.35);
            y = cy + lobe * dist * tPulse;
            alpha = Math.max(0.1, 1 - dist / 110);
          } else {
            // Equatorial ring
            const ringAngle = Math.random() * Math.PI * 2;
            const ringR = 40 + Math.random() * 15;
            x = cx + Math.cos(ringAngle) * ringR * 1.5;
            y = cy + Math.sin(ringAngle) * ringR * 0.4;
            alpha = 0.6;
          }
        } else {
          // dxy Cloverleaf
          const cloverQuadrant = Math.floor(Math.random() * 4);
          const baseAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
          const ang = baseAngles[cloverQuadrant] + (Math.random() - 0.5) * 0.3;
          const dist = 25 + Math.random() * 75 * quantumN;
          x = cx + Math.cos(ang) * dist * tPulse;
          y = cy + Math.sin(ang) * dist * tPulse;
          alpha = Math.max(0.1, 1 - dist / 110);
        }

        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.7})`;
        ctx.fill();
      }

      // Draw Nucleus
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#f87171';
      ctx.shadowColor = '#f87171';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Emitted Photon Wave Packet if active
      if (photonEmitted) {
        const pDist = (tick % 60) * 5;
        ctx.beginPath();
        ctx.arc(cx + pDist, cy - pDist * 0.7, 8, 0, Math.PI * 2);
        ctx.fillStyle = photonEmitted.color;
        ctx.shadowColor = photonEmitted.color;
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [selectedOrbital, quantumN, photonEmitted]);

  return (
    <div 
      className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fadeIn"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Title & Quantum Mission */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sky-900/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 border border-sky-800 text-xs font-mono text-sky-400 uppercase mb-2">
            <Orbit className="w-3.5 h-3.5 text-sky-400" />
            <span>{isAr ? 'النمط الكمومي والمدارات الذرية' : 'Quantum Mechanics Engine'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-wide">
            {isAr ? 'سحابة الاحتمالية وإلكترونات التكافؤ' : 'Atomic Orbitals & Electron Probability Clouds'}
          </h1>
          <p className="text-xs sm:text-sm text-sky-300/80 mt-1">
            {isAr 
              ? 'استكشف دالة الموجة الكمومية (ψ)، ومستويات طاقة بور، وانتقال الفوتونات وفق نموذج شرودنغر الحقيقي.'
              : 'Explore the quantum wave function (ψ), Bohr energy states, and discrete photon transitions via Schrödinger mechanics.'}
          </p>
        </div>

        <button
          onClick={onGoToLab}
          className="px-4 py-2 rounded-xl bg-sky-950 border border-sky-800 hover:border-sky-500 text-sky-300 hover:text-white text-xs font-mono tracking-wider transition self-start md:self-auto cursor-pointer flex items-center gap-1.5"
        >
          <span>{isAr ? 'العودة لمختبر المزيج' : 'Return to MIX LAB'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Quantum Workbench Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Orbital Selector & Energy Controls */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Orbital Geometry Selection */}
          <div className="p-4 rounded-2xl bg-[#020617] border border-sky-900/60 space-y-3">
            <h2 className="text-xs font-mono text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>{isAr ? 'اختر المدار الذري' : 'Select Atomic Orbital'}</span>
            </h2>

            <div className="grid grid-cols-2 gap-2">
              {orbitals.map(orb => (
                <button
                  key={orb.id}
                  onClick={() => {
                    labSound.playClick();
                    setSelectedOrbital(orb.id);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                    selectedOrbital === orb.id
                      ? 'bg-sky-500/20 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)] text-white'
                      : 'bg-sky-950/40 border-sky-900/60 text-sky-300 hover:border-sky-700'
                  }`}
                >
                  <div className="font-mono font-bold text-xs">{orb.label}</div>
                  <div className="text-[10px] text-sky-400/80 mt-1">l = {orb.l}</div>
                </button>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-900/40 text-xs text-sky-200">
              <div className="font-mono text-sky-400 font-bold mb-1">
                {isAr ? 'الوصف الهندسي الكمومي:' : 'Geometric Structure:'}
              </div>
              <p className="leading-relaxed">
                {isAr 
                  ? orbitals.find(o => o.id === selectedOrbital)?.descAr 
                  : orbitals.find(o => o.id === selectedOrbital)?.desc}
              </p>
            </div>
          </div>

          {/* Principal Quantum Level (n = 1, 2, 3, 4) */}
          <div className="p-4 rounded-2xl bg-[#020617] border border-sky-900/60 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono text-sky-400 uppercase tracking-widest">
                {isAr ? 'رقم الكم الرئيسي (n)' : 'Principal Quantum Level (n)'}
              </h2>
              <span className="font-mono text-xs font-bold text-sky-300 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                n = {quantumN}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(nVal => (
                <button
                  key={nVal}
                  onClick={() => {
                    labSound.playClick();
                    setQuantumN(nVal);
                  }}
                  className={`py-2 rounded-xl font-mono font-bold text-xs border transition cursor-pointer ${
                    quantumN === nVal
                      ? 'bg-sky-500 text-black border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                      : 'bg-sky-950/40 border-sky-900/60 text-sky-300 hover:text-white'
                  }`}
                >
                  n = {nVal}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs font-mono pt-1 text-sky-300">
              <span>{isAr ? 'طاقة الربط (Binding Energy):' : 'Bohr Energy Level:'}</span>
              <span className="text-sky-400 font-bold">{currentEnergy} eV</span>
            </div>
          </div>

          {/* Photon Absorption & Emission Simulator */}
          <div className="p-4 rounded-2xl bg-[#020617] border border-sky-900/60 space-y-3">
            <h2 className="text-xs font-mono text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAr ? 'محاكاة انبعاث الفوتونات (سلسلة بالمر)' : 'Balmer Photon Emission Simulator'}</span>
            </h2>

            <div className="space-y-2">
              <button
                onClick={() => triggerTransition(3, 2)}
                className="w-full py-2 px-3 rounded-xl bg-red-950/40 hover:bg-red-900/40 border border-red-800/80 text-red-300 font-mono text-xs flex items-center justify-between transition cursor-pointer"
              >
                <span>H-α (n=3 → n=2)</span>
                <span className="font-bold text-red-400">656.3 nm (Red)</span>
              </button>

              <button
                onClick={() => triggerTransition(4, 2)}
                className="w-full py-2 px-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-800/80 text-cyan-300 font-mono text-xs flex items-center justify-between transition cursor-pointer"
              >
                <span>H-β (n=4 → n=2)</span>
                <span className="font-bold text-cyan-400">486.1 nm (Cyan)</span>
              </button>

              <button
                onClick={() => triggerTransition(2, 1)}
                className="w-full py-2 px-3 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 border border-purple-800/80 text-purple-300 font-mono text-xs flex items-center justify-between transition cursor-pointer"
              >
                <span>Lyman-α (n=2 → n=1)</span>
                <span className="font-bold text-purple-400">121.6 nm (UV)</span>
              </button>
            </div>

            {photonEmitted && (
              <div 
                className="p-2.5 rounded-xl border flex items-center justify-between text-xs font-mono animate-pulse"
                style={{ borderColor: photonEmitted.color, backgroundColor: `${photonEmitted.color}15` }}
              >
                <span style={{ color: photonEmitted.color }}>
                  {isAr ? 'فوتون منبعث!' : 'Photon Emitted!'}
                </span>
                <span className="font-bold" style={{ color: photonEmitted.color }}>
                  λ = {photonEmitted.wavelength} ({photonEmitted.energy})
                </span>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Quantum Viewport Canvas */}
        <div className="lg:col-span-8 flex flex-col space-y-3">
          <div className="relative w-full h-[460px] rounded-2xl bg-[#020617] border border-sky-900/70 overflow-hidden flex items-center justify-center">
            
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Top HUD Telemetry */}
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 pointer-events-none">
              <span className="px-2.5 py-1 rounded bg-sky-950/80 border border-sky-800 text-[10px] font-mono text-sky-300">
                |ψ(r,θ,φ)|² DENSITY
              </span>
              <span className="px-2.5 py-1 rounded bg-sky-950/80 border border-sky-800 text-[10px] font-mono text-sky-300">
                ORBITAL: {selectedOrbital.toUpperCase()}
              </span>
              <span className="px-2.5 py-1 rounded bg-sky-950/80 border border-sky-800 text-[10px] font-mono text-sky-300">
                SHELL: {quantumN === 1 ? 'K' : quantumN === 2 ? 'L' : quantumN === 3 ? 'M' : 'N'}
              </span>
            </div>

            {/* Bottom Legend */}
            <div className="absolute bottom-4 right-4 flex items-center gap-4 bg-sky-950/90 px-3.5 py-1.5 rounded-xl border border-sky-800 text-[10px] font-mono text-sky-300">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span>Nucleus (+Ze)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <span>Electron Probability Cloud</span>
              </div>
            </div>

          </div>

          <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-900/50 flex items-center gap-2 text-xs text-sky-400">
            <Info className="w-4 h-4 flex-shrink-0 text-sky-400" />
            <span>
              {isAr 
                ? 'وفق مبدأ الريبة لهايزنبرغ، لا يمكن تحديد موقع الإلكترون وزخمه بدقة في نفس اللحظة؛ النقاط الزرقاء تمثل كثافة احتمال تواجد الإلكترون.'
                : 'According to Heisenberg uncertainty principle, an electron has no exact orbit; blue density spots represent statistical probability densities |ψ|².'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
