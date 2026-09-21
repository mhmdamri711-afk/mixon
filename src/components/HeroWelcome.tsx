import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ShieldCheck, Atom } from 'lucide-react';
import { labSound } from '../utils/sound';
import { AppLanguage } from '../utils/i18n';

interface HeroWelcomeProps {
  onEnterLab: () => void;
  onOpenCreator?: () => void;
  lang?: AppLanguage;
}

export const HeroWelcome: React.FC<HeroWelcomeProps> = ({ 
  onEnterLab,
  onOpenCreator,
  lang = 'en'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes connected by subtle blue scientific lines
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    const nodes: Node[] = [];
    const count = Math.min(60, Math.floor((width * height) / 22000));

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: 1.5 + Math.random() * 2
      });
    }

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.18;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleEnter = () => {
    labSound.playEnterLab();
    onEnterLab();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#020617] lab-grid text-sky-100 px-4 select-none">
      {/* Background Interactive Scientific Grid Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Subtle radial ambient lighting from Geometric Balance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-900/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-sky-600/15 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Top subtle badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-950/50 border border-sky-900/50 backdrop-blur-md text-xs font-mono tracking-widest text-sky-400"
      >
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
        <span>MIXON SYSTEM PROTOCOL v3.4 // ACTIVE</span>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl text-center flex flex-col items-center">
        {/* Geometric Diamond Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="w-12 h-12 border-2 border-sky-400 rotate-45 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(56,189,248,0.5)]"
        >
          <div className="w-4 h-4 bg-sky-400" />
        </motion.div>

        {/* Main Logo Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative"
        >
          <h1 className="font-display font-extrabold tracking-[0.2em] text-7xl sm:text-8xl md:text-9xl text-white drop-shadow-[0_0_35px_rgba(14,165,233,0.4)]">
            MIX<span className="text-sky-400">ON</span>
          </h1>
          <div className="absolute -inset-x-8 -bottom-1 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 font-display font-semibold tracking-[0.25em] text-xl sm:text-2xl md:text-3xl text-sky-300 uppercase"
        >
          Explore. Combine. Discover.
        </motion.p>

        {/* Short Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-4 text-base sm:text-lg text-sky-200/80 max-w-xl leading-relaxed font-sans"
        >
          A digital laboratory for exploring matter, properties and reactions.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-1 text-sm text-sky-400/70 max-w-md font-sans"
        >
          مختبر علمي رقمي تفاعلي لمحاكاة تفاعلات المواد واكتشاف أسرار الكون بأمان رقمي تام.
        </motion.p>

        {/* Big ENTER LAB Button & ABOUT CREATOR Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <button
            id="enter-lab-button"
            onClick={handleEnter}
            className="group relative inline-flex items-center gap-4 px-10 py-4 sm:px-12 sm:py-5 rounded-sm bg-sky-500 hover:bg-sky-400 text-black font-display font-black text-lg sm:text-xl tracking-[0.3em] uppercase transition-all duration-300 hover:scale-105 shadow-[0_0_35px_rgba(14,165,233,0.5)] hover:shadow-[0_0_50px_rgba(56,189,248,0.7)] active:scale-95 cursor-pointer"
          >
            <div className="w-3 h-3 border border-black rotate-45 flex items-center justify-center">
              <div className="w-1 h-1 bg-black" />
            </div>
            <span>{lang === 'ar' ? 'دخول المختبر' : 'ENTER LAB'}</span>
            <ArrowRight className="w-5 h-5 text-black transition-transform group-hover:translate-x-1" />
          </button>

          {onOpenCreator && (
            <button
              id="about-creator-hero-btn"
              onClick={() => {
                labSound.playClick();
                onOpenCreator();
              }}
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-sm bg-sky-950/70 hover:bg-sky-900/80 border border-amber-400/50 hover:border-amber-400 text-amber-300 font-display font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-200 shadow-[0_0_15px_rgba(251,191,36,0.15)] cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{lang === 'ar' ? 'عن المطور' : 'ABOUT CREATOR'}</span>
            </button>
          )}
        </motion.div>

        {/* Creator Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-3 text-xs font-mono text-sky-400/80"
        >
          {lang === 'ar' ? (
            <span>ابتكار وبرمجة <button onClick={onOpenCreator} className="text-amber-300 hover:underline font-bold cursor-pointer">محمد سلطان العمري</button></span>
          ) : (
            <span>Created by <button onClick={onOpenCreator} className="text-amber-300 hover:underline font-bold cursor-pointer">Muhammad Sultan Al-Amri</button></span>
          )}
        </motion.div>

        {/* Safety & Educational Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 flex items-center gap-2 text-xs text-sky-400/80 bg-sky-950/40 px-4 py-2 rounded-lg border border-sky-900/50"
        >
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>Zero-Hazard Digital Physics & Chemistry Simulation Environment</span>
        </motion.div>
      </div>

      {/* Decorative Sci-Fi Border Coordinates */}
      <div className="absolute bottom-4 left-6 hidden sm:block font-code text-xs text-sky-600/70">
        LAT: 24.7136° N // LON: 46.6753° E // SECTOR-09
      </div>
      <div className="absolute bottom-4 right-6 hidden sm:block font-code text-xs text-sky-600/70">
        SPECTRAL HARMONICS: STABLE (99.8%)
      </div>
    </div>
  );
};
