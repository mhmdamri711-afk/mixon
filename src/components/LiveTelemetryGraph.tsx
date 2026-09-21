import React, { useEffect, useRef, useState } from 'react';
import { Activity, Flame, Zap, Gauge } from 'lucide-react';
import { AppLanguage, TRANSLATIONS } from '../utils/i18n';

interface LiveTelemetryGraphProps {
  temperature: number; // Celsius
  pressure: number; // atm
  isSimulating: boolean;
  simulationPhase: 'idle' | 'charging' | 'colliding' | 'bonded' | 'complete';
  lang?: AppLanguage;
}

export const LiveTelemetryGraph: React.FC<LiveTelemetryGraphProps> = ({
  temperature,
  pressure,
  isSimulating,
  simulationPhase,
  lang = 'en'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [metricMode, setMetricMode] = useState<'energy' | 'motion' | 'progress'>('energy');
  const t = TRANSLATIONS[lang];

  const historyRef = useRef<number[]>(Array(50).fill(25));
  const tickRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      tickRef.current++;
      const width = (canvas.width = canvas.parentElement?.clientWidth || 320);
      const height = (canvas.height = 110);

      // Compute instant target metric
      let instantValue = 0;
      const thermalEnergy = (temperature + 273.15) * 0.4;

      if (metricMode === 'energy') {
        const surge = simulationPhase === 'charging' ? 120 : simulationPhase === 'colliding' ? 240 : simulationPhase === 'bonded' ? 180 : 0;
        instantValue = thermalEnergy + surge + Math.sin(tickRef.current * 0.1) * 8;
      } else if (metricMode === 'motion') {
        const velBase = Math.sqrt(Math.max(1, temperature + 273.15)) * 6;
        const collisionShock = simulationPhase === 'colliding' ? 150 : 0;
        instantValue = velBase + collisionShock + (Math.random() - 0.5) * 12;
      } else {
        // progress
        if (simulationPhase === 'idle') instantValue = 5;
        else if (simulationPhase === 'charging') instantValue = 35;
        else if (simulationPhase === 'colliding') instantValue = 70;
        else if (simulationPhase === 'bonded') instantValue = 92;
        else instantValue = 100;
      }

      // Push into rolling history
      historyRef.current.push(instantValue);
      if (historyRef.current.length > 50) {
        historyRef.current.shift();
      }

      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.12)';
      ctx.lineWidth = 1;

      for (let y = 15; y < height; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      for (let x = 20; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Find min and max for scaling
      const maxVal = Math.max(...historyRef.current, 100);
      const minVal = Math.min(...historyRef.current, 0);
      const range = Math.max(10, maxVal - minVal);

      // Draw Area Gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
      gradient.addColorStop(1, 'rgba(2, 6, 23, 0)');

      ctx.beginPath();
      const step = width / (historyRef.current.length - 1);
      historyRef.current.forEach((val, i) => {
        const normY = height - 10 - ((val - minVal) / range) * (height - 25);
        const curX = i * step;
        if (i === 0) ctx.moveTo(curX, normY);
        else ctx.lineTo(curX, normY);
      });

      // Close polygon for gradient fill
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw Line
      ctx.beginPath();
      historyRef.current.forEach((val, i) => {
        const normY = height - 10 - ((val - minVal) / range) * (height - 25);
        const curX = i * step;
        if (i === 0) ctx.moveTo(curX, normY);
        else ctx.lineTo(curX, normY);
      });
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw live pulsing point at newest data
      const lastVal = historyRef.current[historyRef.current.length - 1];
      const lastY = height - 10 - ((lastVal - minVal) / range) * (height - 25);
      ctx.beginPath();
      ctx.arc(width - 2, lastY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [metricMode, temperature, pressure, simulationPhase]);

  const currentVal = Math.round(historyRef.current[historyRef.current.length - 1] || 0);

  return (
    <div className="p-3 rounded-xl bg-[#020617] border border-sky-900/40 space-y-2">
      {/* Graph Header & Mode Toggles */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-sky-400 uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          <span>{t.scientificTelemetry}</span>
        </div>

        <div className="flex items-center gap-1 bg-sky-950/60 p-0.5 rounded border border-sky-900/60 text-[9px] font-mono">
          <button
            onClick={() => setMetricMode('energy')}
            className={`px-2 py-0.5 rounded transition ${
              metricMode === 'energy' ? 'bg-sky-500 text-black font-bold' : 'text-sky-400 hover:text-white'
            }`}
          >
            {t.telemetryEnergy}
          </button>
          <button
            onClick={() => setMetricMode('motion')}
            className={`px-2 py-0.5 rounded transition ${
              metricMode === 'motion' ? 'bg-sky-500 text-black font-bold' : 'text-sky-400 hover:text-white'
            }`}
          >
            {t.telemetryVelocity}
          </button>
          <button
            onClick={() => setMetricMode('progress')}
            className={`px-2 py-0.5 rounded transition ${
              metricMode === 'progress' ? 'bg-sky-500 text-black font-bold' : 'text-sky-400 hover:text-white'
            }`}
          >
            {t.telemetryProgress}
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative w-full h-[110px] rounded-lg overflow-hidden bg-sky-950/20 border border-sky-900/30">
        <canvas ref={canvasRef} className="w-full h-full block" />
        
        {/* Instant Value Badge */}
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#020617]/80 border border-sky-900/60 text-[10px] font-mono text-sky-300">
          <span className="text-sky-600 mr-1">{t.telemetryCurrent}</span>
          <span className="font-bold text-sky-200">
            {currentVal} {metricMode === 'energy' ? 'kJ/mol' : metricMode === 'motion' ? 'm/s' : '%'}
          </span>
        </div>
      </div>
    </div>
  );
};
