import React, { useEffect, useRef } from 'react';
import { Material, ReactionResult } from '../types';
import { getMaterialVisualProfile } from '../data/materialVisualProfiles';
import { MaterialVisualProfile, CarbonAllotropeType } from '../types/visualProfile';

export type ZoomLevel = 'material' | 'structure' | 'molecule' | 'atoms' | 'orbitals';

interface LabCanvasProps {
  materialA: Material | null;
  materialB: Material | null;
  isSimulating: boolean;
  simulationPhase: 'idle' | 'charging' | 'colliding' | 'bonded' | 'complete';
  result: ReactionResult | null;
  temperature?: number; // Celsius
  pressure?: number; // atm
  zoomLevel?: ZoomLevel;
  carbonAllotrope?: CarbonAllotropeType;
}

interface AtomNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  source: 'A' | 'B' | 'product';
  angle: number;
  vAngle: number;
  type: string;
  isOxidized?: boolean;
  bonds?: number[]; // indices of bonded neighbors
  hBondTarget?: { x: number; y: number } | null;
}

export const LabCanvas: React.FC<LabCanvasProps> = ({
  materialA,
  materialB,
  isSimulating,
  simulationPhase,
  result,
  temperature = 25,
  pressure = 1.0,
  zoomLevel = 'molecule',
  carbonAllotrope = 'graphite'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const nodesRef = useRef<AtomNode[]>([]);
  const shockwavesRef = useRef<{ radius: number; maxRadius: number; alpha: number; color: string }[]>([]);
  const bubblesRef = useRef<{ x: number; y: number; r: number; vy: number; alpha: number }[]>([]);

  const profileA = materialA ? getMaterialVisualProfile(materialA.id, materialA.particleColor) : null;
  const profileB = materialB ? getMaterialVisualProfile(materialB.id, materialB.particleColor) : null;

  // Determine reaction classification
  const reactionType = React.useMemo<'combination' | 'oxidation' | 'precipitation' | 'gas_formation' | 'decomposition' | 'state_change'>(() => {
    if (!result) return 'combination';
    const text = (result.reactionType + ' ' + result.observedChange).toLowerCase();
    if (text.includes('oxid') || text.includes('combust') || (materialB?.id === 'oxygen' || materialA?.id === 'oxygen')) return 'oxidation';
    if (text.includes('precip') || text.includes('insoluble') || text.includes('sediment')) return 'precipitation';
    if (text.includes('gas') || text.includes('bubble') || text.includes('effervesc')) return 'gas_formation';
    if (text.includes('decomp') || text.includes('break') || text.includes('split')) return 'decomposition';
    if (text.includes('state') || text.includes('melt') || text.includes('boil')) return 'state_change';
    return 'combination';
  }, [result, materialA?.id, materialB?.id]);

  const drawPhysicalMatter = (
    ctx: CanvasRenderingContext2D,
    id: string,
    x: number,
    y: number,
    scale: number,
    oxidationProg: number = 0,
    tick: number = 0,
    label?: string
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    switch (id) {
      case 'water': {
        const wGrad = ctx.createRadialGradient(-10, -12, 4, 0, 0, 42);
        wGrad.addColorStop(0, '#e0f2fe');
        wGrad.addColorStop(0.3, '#38bdf8');
        wGrad.addColorStop(0.75, '#0284c7');
        wGrad.addColorStop(1, '#0369a1');

        const wave = Math.sin(tick * 0.09) * 2;
        ctx.fillStyle = wGrad;
        ctx.beginPath();
        ctx.moveTo(0, -36 + wave);
        ctx.bezierCurveTo(26, -6, 36, 14, 28, 34);
        ctx.bezierCurveTo(20, 46, -20, 46, -28, 34);
        ctx.bezierCurveTo(-36, 14, -26, -6, 0, -36 + wave);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.beginPath();
        ctx.ellipse(-10, -12, 8, 4, -0.6, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      case 'copper': {
        const isOx = oxidationProg > 0;
        const copGrad = ctx.createLinearGradient(-40, -22, 40, 22);
        if (isOx) {
          copGrad.addColorStop(0, '#1e293b');
          copGrad.addColorStop(0.5, '#334155');
          copGrad.addColorStop(1, '#0f172a');
        } else {
          copGrad.addColorStop(0, '#b45309');
          copGrad.addColorStop(0.35, '#f59e0b');
          copGrad.addColorStop(0.65, '#d97706');
          copGrad.addColorStop(1, '#78350f');
        }
        ctx.fillStyle = copGrad;
        ctx.beginPath();
        ctx.roundRect(-42, -22, 84, 44, 6);
        ctx.fill();
        ctx.strokeStyle = isOx ? '#475569' : '#fef08a';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.strokeStyle = isOx ? 'rgba(255,255,255,0.1)' : 'rgba(255, 255, 255, 0.35)';
        ctx.strokeRect(-36, -16, 72, 32);

        ctx.fillStyle = isOx ? '#94a3b8' : '#451a03';
        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(isOx && oxidationProg > 0.7 ? 'CuO' : 'Cu • 29', 0, 4);
        break;
      }

      case 'gold': {
        const goldGrad = ctx.createLinearGradient(-42, -22, 42, 22);
        goldGrad.addColorStop(0, '#ca8a04');
        goldGrad.addColorStop(0.3, '#fde047');
        goldGrad.addColorStop(0.65, '#eab308');
        goldGrad.addColorStop(1, '#854d0e');

        ctx.fillStyle = goldGrad;
        ctx.beginPath();
        ctx.roundRect(-42, -22, 84, 44, 6);
        ctx.fill();
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.strokeRect(-36, -16, 72, 32);

        ctx.fillStyle = '#713f12';
        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Au 999.9', 0, 4);
        break;
      }

      case 'iron': {
        const isOx = oxidationProg > 0;
        const ironGrad = ctx.createLinearGradient(-40, -22, 40, 22);
        if (isOx) {
          ironGrad.addColorStop(0, '#7c2d12');
          ironGrad.addColorStop(0.5, '#9a3412');
          ironGrad.addColorStop(1, '#431407');
        } else {
          ironGrad.addColorStop(0, '#334155');
          ironGrad.addColorStop(0.5, '#64748b');
          ironGrad.addColorStop(1, '#1e293b');
        }
        ctx.fillStyle = ironGrad;
        ctx.beginPath();
        ctx.roundRect(-40, -22, 80, 44, 5);
        ctx.fill();
        ctx.strokeStyle = isOx ? '#ea580c' : '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(isOx && oxidationProg > 0.7 ? 'Fe₂O₃' : 'Fe • 26', 0, 4);
        break;
      }

      case 'salt': {
        ctx.fillStyle = 'rgba(224, 242, 254, 0.85)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-24, -22, 32, 32);
        ctx.fillRect(-24, -22, 32, 32);

        ctx.fillStyle = 'rgba(240, 249, 255, 0.9)';
        ctx.strokeRect(-8, -6, 28, 28);
        ctx.fillRect(-8, -6, 28, 28);

        ctx.fillStyle = '#0284c7';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('NaCl', 6, 12);
        break;
      }

      case 'oxygen':
      case 'hydrogen': {
        const isO2 = id === 'oxygen';
        const gColor = isO2 ? '#38bdf8' : '#e0e7ff';
        const radGrad = ctx.createRadialGradient(0, 0, 8, 0, 0, 45);
        radGrad.addColorStop(0, isO2 ? 'rgba(56, 189, 248, 0.5)' : 'rgba(224, 231, 255, 0.45)');
        radGrad.addColorStop(0.6, isO2 ? 'rgba(2, 132, 199, 0.2)' : 'rgba(129, 140, 248, 0.15)');
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 46, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = gColor;
        ctx.beginPath();
        ctx.arc(-11, 0, 7, 0, Math.PI * 2);
        ctx.arc(11, 0, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-11, 0);
        ctx.lineTo(11, 0);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(isO2 ? 'O₂' : 'H₂', 0, 20);
        break;
      }

      case 'silver': {
        const agGrad = ctx.createLinearGradient(-42, -22, 42, 22);
        agGrad.addColorStop(0, '#cbd5e1');
        agGrad.addColorStop(0.3, '#ffffff');
        agGrad.addColorStop(0.7, '#e2e8f0');
        agGrad.addColorStop(1, '#94a3b8');
        ctx.fillStyle = agGrad;
        ctx.beginPath();
        ctx.roundRect(-42, -22, 84, 44, 6);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Ag • 47', 0, 4);
        break;
      }

      case 'titanium': {
        const tiGrad = ctx.createLinearGradient(-40, -20, 40, 20);
        tiGrad.addColorStop(0, '#64748b');
        tiGrad.addColorStop(0.5, '#94a3b8');
        tiGrad.addColorStop(1, '#475569');
        ctx.fillStyle = tiGrad;
        ctx.beginPath();
        ctx.roundRect(-40, -22, 80, 44, 12);
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // Cooling rings
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-18, -20); ctx.lineTo(-18, 20);
        ctx.moveTo(0, -20); ctx.lineTo(0, 20);
        ctx.moveTo(18, -20); ctx.lineTo(18, 20);
        ctx.stroke();
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Ti • 22', 0, 4);
        break;
      }

      case 'aluminum': {
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.roundRect(-38, -22, 76, 44, 4);
        ctx.fill();
        ctx.strokeStyle = '#f1f5f9';
        ctx.lineWidth = 2;
        ctx.stroke();
        // Central bore hole
        ctx.fillStyle = '#64748b';
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Al • 13', 0, 32);
        break;
      }

      case 'zinc': {
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.roundRect(-36, -20, 72, 40, 4);
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // Dendritic spangle lines
        ctx.strokeStyle = 'rgba(241, 245, 249, 0.6)';
        ctx.beginPath();
        ctx.moveTo(-20, -10); ctx.lineTo(0, 10); ctx.lineTo(20, -10);
        ctx.moveTo(-10, 15); ctx.lineTo(10, -15);
        ctx.stroke();
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Zn • 30', 0, 4);
        break;
      }

      case 'magnesium': {
        ctx.fillStyle = '#f1f5f9';
        ctx.beginPath();
        ctx.roundRect(-38, -18, 76, 36, 18);
        ctx.fill();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = '#334155';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Mg • 12', 0, 4);
        break;
      }

      case 'sodium': {
        // Soft alkali block with slice facet
        ctx.fillStyle = '#d1d5db';
        ctx.fillRect(-26, -26, 52, 52);
        ctx.strokeStyle = '#9ca3af';
        ctx.strokeRect(-26, -26, 52, 52);
        // Shiny slice
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(-26, -26); ctx.lineTo(26, -26); ctx.lineTo(-26, 26);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Na • 11', 0, 4);
        break;
      }

      case 'potassium': {
        ctx.fillStyle = '#e0e7ff';
        ctx.beginPath();
        ctx.roundRect(-25, -25, 50, 50, 6);
        ctx.fill();
        ctx.strokeStyle = '#c4b5fd';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#4338ca';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('K • 19', 0, 4);
        break;
      }

      case 'calcium': {
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.arc(-12, -8, 16, 0, Math.PI * 2);
        ctx.arc(12, -4, 15, 0, Math.PI * 2);
        ctx.arc(0, 12, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = '#334155';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Ca • 20', 0, 4);
        break;
      }

      case 'silicon': {
        // Octagonal semiconductor wafer
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        const r = 28;
        for (let i = 0; i < 8; i++) {
          const a = (i * Math.PI) / 4;
          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.stroke();
        // Chip grid
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.strokeRect(-12, -12, 24, 24);
        ctx.fillStyle = '#60a5fa';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Si • 14', 0, 4);
        break;
      }

      case 'sulfur': {
        // Canary yellow crystal cluster
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.moveTo(0, -32); ctx.lineTo(22, 0); ctx.lineTo(0, 32); ctx.lineTo(-22, 0);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#ca8a04';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = '#713f12';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('S • 16', 0, 4);
        break;
      }

      case 'quartz': {
        ctx.fillStyle = 'rgba(224, 231, 255, 0.75)';
        ctx.beginPath();
        ctx.moveTo(-16, 26); ctx.lineTo(16, 26); ctx.lineTo(16, -10); ctx.lineTo(0, -32); ctx.lineTo(-16, -10);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#3730a3';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('SiO₂', 0, 8);
        break;
      }

      case 'diamond': {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.moveTo(0, -28); ctx.lineTo(24, 0); ctx.lineTo(0, 28); ctx.lineTo(-24, 0);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#0284c7';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Diamond', 0, 4);
        break;
      }

      case 'carbon': {
        // Stacked hexagonal sheets
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.roundRect(-30, -16, 60, 10, 2);
        ctx.roundRect(-30, -2, 60, 10, 2);
        ctx.roundRect(-30, 12, 60, 10, 2);
        ctx.fill();
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Graphite', 0, 32);
        break;
      }

      case 'sand': {
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.moveTo(-35, 20); ctx.quadraticCurveTo(0, -25, 35, 20);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#ca8a04';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = '#854d0e';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Sand', 0, 12);
        break;
      }

      case 'baking_soda': {
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.moveTo(-32, 18); ctx.quadraticCurveTo(0, -20, 32, 18);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = '#334155';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('NaHCO₃', 0, 12);
        break;
      }

      case 'glass': {
        ctx.fillStyle = 'rgba(224, 242, 254, 0.7)';
        ctx.fillRect(-32, -18, 64, 36);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(-32, -18, 64, 36);
        ctx.fillStyle = '#0284c7';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Glass', 0, 4);
        break;
      }

      case 'mercury': {
        const hgGrad = ctx.createRadialGradient(-8, -8, 2, 0, 0, 26);
        hgGrad.addColorStop(0, '#ffffff');
        hgGrad.addColorStop(0.4, '#e2e8f0');
        hgGrad.addColorStop(0.8, '#94a3b8');
        hgGrad.addColorStop(1, '#475569');
        ctx.fillStyle = hgGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 26, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Hg • 80', 0, 4);
        break;
      }

      case 'ethanol': {
        const etGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, 28);
        etGrad.addColorStop(0, '#e0f2fe');
        etGrad.addColorStop(0.7, 'rgba(147, 197, 253, 0.6)');
        etGrad.addColorStop(1, 'rgba(59, 130, 246, 0.4)');
        ctx.fillStyle = etGrad;
        ctx.beginPath();
        ctx.ellipse(0, 0, 32, 22, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = '#1e3a8a';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Ethanol', 0, 4);
        break;
      }

      case 'nitrogen': {
        const nGrad = ctx.createRadialGradient(0, 0, 6, 0, 0, 42);
        nGrad.addColorStop(0, 'rgba(99, 102, 241, 0.6)');
        nGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = nGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 44, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#818cf8';
        ctx.beginPath();
        ctx.arc(-11, 0, 7, 0, Math.PI * 2);
        ctx.arc(11, 0, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-11, 0); ctx.lineTo(11, 0);
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('N₂', 0, 20);
        break;
      }

      case 'chlorine': {
        const clGrad = ctx.createRadialGradient(0, 0, 6, 0, 0, 42);
        clGrad.addColorStop(0, 'rgba(163, 230, 53, 0.6)');
        clGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = clGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 44, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#bef264';
        ctx.beginPath();
        ctx.arc(-12, 0, 8, 0, Math.PI * 2);
        ctx.arc(12, 0, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-12, 0); ctx.lineTo(12, 0);
        ctx.stroke();
        ctx.fillStyle = '#14532d';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Cl₂', 0, 20);
        break;
      }

      case 'helium':
      case 'helium_3': {
        const isHe3 = id === 'helium_3';
        const col = isHe3 ? 'rgba(232, 121, 249, 0.6)' : 'rgba(251, 146, 60, 0.6)';
        const hGrad = ctx.createRadialGradient(0, 0, 6, 0, 0, 40);
        hGrad.addColorStop(0, col);
        hGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = hGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 42, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(isHe3 ? '³He' : 'He', 0, 22);
        break;
      }

      case 'carbon_dioxide': {
        ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.beginPath();
        ctx.arc(0, 0, 42, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#475569';
        ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.arc(-14, 0, 6, 0, Math.PI * 2);
        ctx.arc(14, 0, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CO₂', 0, 22);
        break;
      }

      case 'ammonia': {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.beginPath();
        ctx.arc(0, 0, 42, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath(); ctx.arc(0, -4, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('NH₃', 0, 22);
        break;
      }

      case 'methane': {
        ctx.fillStyle = 'rgba(52, 211, 153, 0.4)';
        ctx.beginPath();
        ctx.arc(0, 0, 42, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#10b981';
        ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CH₄', 0, 22);
        break;
      }

      case 'cosmic_stardust': {
        const starGrad = ctx.createRadialGradient(0, 0, 6, 0, 0, 45);
        starGrad.addColorStop(0, 'rgba(232, 121, 249, 0.7)');
        starGrad.addColorStop(0.5, 'rgba(192, 132, 252, 0.4)');
        starGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = starGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 45, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Stardust', 0, 4);
        break;
      }

      case 'cosmic_plasma': {
        const pGrad = ctx.createRadialGradient(0, 0, 6, 0, 0, 42);
        pGrad.addColorStop(0, '#f472b6');
        pGrad.addColorStop(0.5, '#c084fc');
        pGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 42, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(0, 0, 36, 12, Math.PI / 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Plasma', 0, 4);
        break;
      }

      default: {
        const prof = getMaterialVisualProfile(id);
        const col = prof.particleColor || '#38bdf8';
        ctx.fillStyle = col;
        ctx.beginPath();
        if (prof.particleType.includes('metallic')) {
          ctx.roundRect(-35, -20, 70, 40, 5);
        } else if (prof.particleType.includes('gas')) {
          ctx.arc(0, 0, 36, 0, Math.PI * 2);
        } else {
          ctx.roundRect(-25, -25, 50, 50, 6);
        }
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(label || id.toUpperCase(), 0, 4);
        break;
      }
    }

    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    // Initialize nodes based on visual profile
    const initNodes = () => {
      const nodes: AtomNode[] = [];
      const cx = width * 0.5;
      const cy = height * 0.5;
      const leftCx = width * 0.28;
      const rightCx = width * 0.72;

      // Thermal speed factor
      const thermalFactor = Math.sqrt(Math.max(0.1, (temperature + 273.15) / 298.15));

      // 1. MATERIAL A NODES
      if (profileA) {
        if (profileA.particleType === 'metallic_fcc' || profileA.particleType === 'metallic_bcc') {
          // Ordered 2D lattice grid for metals (Copper, Iron, Gold)
          const cols = 5;
          const rows = 5;
          const spacing = 22;
          const startX = leftCx - ((cols - 1) * spacing) / 2;
          const startY = cy - ((rows - 1) * spacing) / 2;

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              nodes.push({
                x: startX + c * spacing,
                y: startY + r * spacing,
                vx: (Math.random() - 0.5) * 0.4 * thermalFactor,
                vy: (Math.random() - 0.5) * 0.4 * thermalFactor,
                radius: profileA.particleSize,
                color: profileA.particleColor,
                source: 'A',
                angle: 0,
                vAngle: 0,
                type: profileA.particleType
              });
            }
          }
        } else if (profileA.particleType === 'ionic_matrix') {
          // Alternating Salt crystal lattice (Na+ / Cl-)
          const cols = 5;
          const rows = 5;
          const spacing = 22;
          const startX = leftCx - ((cols - 1) * spacing) / 2;
          const startY = cy - ((rows - 1) * spacing) / 2;

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const isCation = (r + c) % 2 === 0;
              nodes.push({
                x: startX + c * spacing,
                y: startY + r * spacing,
                vx: (Math.random() - 0.5) * 0.3 * thermalFactor,
                vy: (Math.random() - 0.5) * 0.3 * thermalFactor,
                radius: isCation ? 6 : 9, // Na+ smaller, Cl- larger
                color: isCation ? '#818cf8' : '#34d399',
                source: 'A',
                angle: 0,
                vAngle: 0,
                type: 'ionic_pair'
              });
            }
          }
        } else if (profileA.particleType === 'carbon_allotrope') {
          // Hexagonal graphite sheets or diamond lattice
          const count = 24;
          for (let i = 0; i < count; i++) {
            const row = Math.floor(i / 6);
            const col = i % 6;
            const offsetX = (row % 2) * 10;
            nodes.push({
              x: leftCx - 40 + col * 16 + offsetX,
              y: cy - 35 + row * 18,
              vx: (Math.random() - 0.5) * 0.3 * thermalFactor,
              vy: (Math.random() - 0.5) * 0.3 * thermalFactor,
              radius: 6,
              color: '#94a3b8',
              source: 'A',
              angle: 0,
              vAngle: 0,
              type: 'carbon_node'
            });
          }
        } else if (profileA.particleType === 'bent_triatomic') {
          // Discrete H2O molecules
          const molCount = 12;
          for (let i = 0; i < molCount; i++) {
            const ang = Math.random() * Math.PI * 2;
            const dist = 15 + Math.random() * 50;
            nodes.push({
              x: leftCx + Math.cos(ang) * dist,
              y: cy + Math.sin(ang) * dist,
              vx: (Math.random() - 0.5) * 1.5 * thermalFactor,
              vy: (Math.random() - 0.5) * 1.5 * thermalFactor,
              radius: 7,
              color: profileA.particleColor,
              source: 'A',
              angle: Math.random() * Math.PI * 2,
              vAngle: (Math.random() - 0.5) * 0.05,
              type: 'bent_water'
            });
          }
        } else {
          // Gas / free diffusion (Oxygen, Hydrogen, Helium)
          const isLight = profileA.movementStyle === 'light_zippy';
          const gasSpeed = (isLight ? 3.5 : 2.0) * thermalFactor;
          const count = isLight ? 20 : 16;
          for (let i = 0; i < count; i++) {
            const ang = Math.random() * Math.PI * 2;
            const dist = 10 + Math.random() * 55;
            nodes.push({
              x: leftCx + Math.cos(ang) * dist,
              y: cy + Math.sin(ang) * dist,
              vx: Math.cos(ang) * gasSpeed,
              vy: Math.sin(ang) * gasSpeed,
              radius: profileA.particleSize,
              color: profileA.particleColor,
              source: 'A',
              angle: Math.random() * Math.PI * 2,
              vAngle: (Math.random() - 0.5) * 0.1,
              type: profileA.particleType
            });
          }
        }
      }

      // 2. MATERIAL B NODES
      if (profileB) {
        if (profileB.particleType === 'metallic_fcc' || profileB.particleType === 'metallic_bcc') {
          const cols = 5;
          const rows = 5;
          const spacing = 22;
          const startX = rightCx - ((cols - 1) * spacing) / 2;
          const startY = cy - ((rows - 1) * spacing) / 2;

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              nodes.push({
                x: startX + c * spacing,
                y: startY + r * spacing,
                vx: (Math.random() - 0.5) * 0.4 * thermalFactor,
                vy: (Math.random() - 0.5) * 0.4 * thermalFactor,
                radius: profileB.particleSize,
                color: profileB.particleColor,
                source: 'B',
                angle: 0,
                vAngle: 0,
                type: profileB.particleType
              });
            }
          }
        } else if (profileB.particleType === 'bent_triatomic') {
          const molCount = 12;
          for (let i = 0; i < molCount; i++) {
            const ang = Math.random() * Math.PI * 2;
            const dist = 15 + Math.random() * 50;
            nodes.push({
              x: rightCx + Math.cos(ang) * dist,
              y: cy + Math.sin(ang) * dist,
              vx: (Math.random() - 0.5) * 1.5 * thermalFactor,
              vy: (Math.random() - 0.5) * 1.5 * thermalFactor,
              radius: 7,
              color: profileB.particleColor,
              source: 'B',
              angle: Math.random() * Math.PI * 2,
              vAngle: (Math.random() - 0.5) * 0.05,
              type: 'bent_water'
            });
          }
        } else {
          const isLight = profileB.movementStyle === 'light_zippy';
          const gasSpeed = (isLight ? 3.5 : 2.0) * thermalFactor;
          const count = isLight ? 20 : 16;
          for (let i = 0; i < count; i++) {
            const ang = Math.random() * Math.PI * 2;
            const dist = 10 + Math.random() * 55;
            nodes.push({
              x: rightCx + Math.cos(ang) * dist,
              y: cy + Math.sin(ang) * dist,
              vx: Math.cos(ang) * gasSpeed,
              vy: Math.sin(ang) * gasSpeed,
              radius: profileB.particleSize,
              color: profileB.particleColor,
              source: 'B',
              angle: Math.random() * Math.PI * 2,
              vAngle: (Math.random() - 0.5) * 0.1,
              type: profileB.particleType
            });
          }
        }
      }

      nodesRef.current = nodes;
    };

    initNodes();

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const leftCx = width * 0.28;
      const rightCx = width * 0.72;

      // 1. Draw Reactor Chamber Containment Geometry
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.12)';
      ctx.lineWidth = 1;

      // Chamber Floor & Ring Grids
      ctx.beginPath();
      ctx.arc(leftCx, cy, 75, 0, Math.PI * 2);
      ctx.arc(rightCx, cy, 75, 0, Math.PI * 2);
      ctx.stroke();

      // Central Confinement Nexus
      ctx.beginPath();
      ctx.arc(cx, cy, 95, 0, Math.PI * 2);
      ctx.strokeStyle = simulationPhase === 'colliding' || simulationPhase === 'bonded' 
        ? 'rgba(56, 189, 248, 0.45)' 
        : 'rgba(14, 165, 233, 0.15)';
      ctx.stroke();

      // Laser confinement vectors
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(leftCx, cy);
      ctx.lineTo(rightCx, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Step-by-Step Simulation Progression Physics
      nodesRef.current.forEach((n, idx) => {
        n.angle += n.vAngle;

        if (simulationPhase === 'charging') {
          // Acceleration toward central collision nexus
          const targetX = n.source === 'A' ? cx - 35 : cx + 35;
          n.vx += (targetX - n.x) * 0.04;
          n.vy += (cy - n.y) * 0.04;
          n.vx *= 0.88;
          n.vy *= 0.88;
        } else if (simulationPhase === 'colliding') {
          // High-velocity impact at nexus
          n.vx += (cx - n.x) * 0.08 + (Math.random() - 0.5) * 3;
          n.vy += (cy - n.y) * 0.08 + (Math.random() - 0.5) * 3;

          // Spawn collision shockwaves periodically
          if (tick % 15 === 0 && shockwavesRef.current.length < 5) {
            shockwavesRef.current.push({
              radius: 5,
              maxRadius: 110,
              alpha: 0.9,
              color: result?.colorHex || '#38bdf8'
            });
          }

          // In oxidation reactions: gas molecules bombard metal lattice and oxidize nodes
          if (reactionType === 'oxidation') {
            if (n.source === 'B' || n.source === 'A') {
              n.isOxidized = true;
            }
          }
        } else if (simulationPhase === 'bonded' || simulationPhase === 'complete') {
          // Specific Reaction Visual Behaviors:
          if (reactionType === 'precipitation') {
            // Clump together and sink down
            n.vx += (cx - n.x) * 0.03;
            n.vy += (cy + 40 - n.y) * 0.03; // sinks toward chamber bottom
            n.vx *= 0.85;
            n.vy *= 0.85;
          } else if (reactionType === 'gas_formation') {
            // Effervescent bubble nucleation rising up
            n.vx += (Math.random() - 0.5) * 1.5;
            n.vy -= 0.8; // Buoyant upward flow
            if (n.y < cy - 90) n.y = cy + 40; // recycle bubble
          } else if (reactionType === 'oxidation') {
            // Stabilized oxidized lattice with darkened crust
            n.vx += (cx - n.x) * 0.04;
            n.vy += (cy - n.y) * 0.04;
            n.vx *= 0.85;
            n.vy *= 0.85;
          } else {
            // Standard compound stabilization
            n.vx += (cx - n.x) * 0.03;
            n.vy += (cy - n.y) * 0.03;
            n.vx *= 0.85;
            n.vy *= 0.85;
          }
        } else {
          // Idle state containment boundary physics
          const homeCx = n.source === 'A' ? leftCx : rightCx;
          const dx = n.x - homeCx;
          const dy = n.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 70) {
            n.vx -= dx * 0.03;
            n.vy -= dy * 0.03;
          }

          // Viscous drag
          n.vx *= 0.98;
          n.vy *= 0.98;
        }

        n.x += n.vx;
        n.y += n.vy;

        // 3. Render Node Based On Geometry & Zoom Level
        const baseColor = n.isOxidized ? '#475569' : n.color;

        // A. Bent Water Molecule Rendering
        if (n.type === 'bent_water') {
          // Central Oxygen
          ctx.beginPath();
          ctx.arc(n.x, n.y, 6.5, 0, Math.PI * 2);
          ctx.fillStyle = '#0284c7';
          ctx.fill();

          // Two Hydrogens at 104.5 degrees
          const hDist = 10;
          const hAngle1 = n.angle - 0.91; // ~52 degrees
          const hAngle2 = n.angle + 0.91;

          const h1x = n.x + Math.cos(hAngle1) * hDist;
          const h1y = n.y + Math.sin(hAngle1) * hDist;
          const h2x = n.x + Math.cos(hAngle2) * hDist;
          const h2y = n.y + Math.sin(hAngle2) * hDist;

          // Covalent single bonds
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(h1x, h1y);
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(h2x, h2y);
          ctx.stroke();

          // H1 and H2
          ctx.fillStyle = '#e0f2fe';
          ctx.beginPath();
          ctx.arc(h1x, h1y, 3.5, 0, Math.PI * 2);
          ctx.arc(h2x, h2y, 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Transient Hydrogen Bonds with nearby water molecules
          if (idx % 2 === 0) {
            const neighbor = nodesRef.current[(idx + 1) % nodesRef.current.length];
            if (neighbor && neighbor.type === 'bent_water') {
              const dNeigh = Math.hypot(neighbor.x - n.x, neighbor.y - n.y);
              if (dNeigh < 35 && dNeigh > 15) {
                ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
                ctx.setLineDash([2, 3]);
                ctx.beginPath();
                ctx.moveTo(h1x, h1y);
                ctx.lineTo(neighbor.x, neighbor.y);
                ctx.stroke();
                ctx.setLineDash([]);
              }
            }
          }
        } 
        // B. Diatomic Gas Molecule (O2, H2)
        else if (n.type === 'diatomic_gas') {
          const dOffset = n.radius * 0.9;
          const p1x = n.x + Math.cos(n.angle) * dOffset;
          const p1y = n.y + Math.sin(n.angle) * dOffset;
          const p2x = n.x - Math.cos(n.angle) * dOffset;
          const p2y = n.y - Math.sin(n.angle) * dOffset;

          // Double bond
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(p1x, p1y);
          ctx.lineTo(p2x, p2y);
          ctx.stroke();

          // Dumbbell spheres
          ctx.fillStyle = baseColor;
          ctx.beginPath();
          ctx.arc(p1x, p1y, n.radius * 0.75, 0, Math.PI * 2);
          ctx.arc(p2x, p2y, n.radius * 0.75, 0, Math.PI * 2);
          ctx.fill();
        } 
        // C. Metallic Lattice & Ionic Crystal Nodes (Copper, Gold, Iron, Salt)
        else {
          // Lattice bonds to nearest neighbor
          if (idx > 0 && idx % 5 !== 0) {
            const prev = nodesRef.current[idx - 1];
            if (prev && prev.source === n.source) {
              ctx.strokeStyle = n.isOxidized ? 'rgba(71, 85, 105, 0.4)' : 'rgba(56, 189, 248, 0.25)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(prev.x, prev.y);
              ctx.stroke();
            }
          }

          // Metallic Sphere with Specular Highlight
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = baseColor;
          ctx.shadowColor = baseColor;
          ctx.shadowBlur = simulationPhase === 'bonded' ? 12 : 4;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Specular luster highlight
          ctx.beginPath();
          ctx.arc(n.x - n.radius * 0.3, n.y - n.radius * 0.3, n.radius * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.fill();

          // If Zoom level is 'orbitals' or 'atoms', draw electron shell rings
          if (zoomLevel === 'orbitals' || zoomLevel === 'atoms') {
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.radius * 2.2, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      });

      // 3.5. Render Macroscopic Physical Matter (when in Material Zoom mode)
      if (zoomLevel === 'material') {
        let posX_A = leftCx;
        let posY_A = cy;
        let posX_B = rightCx;
        let posY_B = cy;

        if (simulationPhase === 'charging') {
          posX_A += (Math.random() - 0.5) * 5;
          posY_A += (Math.random() - 0.5) * 5;
          posX_B += (Math.random() - 0.5) * 5;
          posY_B += (Math.random() - 0.5) * 5;
        } else if (simulationPhase === 'colliding') {
          const tCol = Math.min(1, (tick % 90) / 75);
          posX_A = leftCx + (cx - 35 - leftCx) * tCol;
          posX_B = rightCx + (cx + 35 - rightCx) * tCol;

          // Reaction interface sparks
          ctx.fillStyle = '#fef08a';
          for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.arc(cx + (Math.random() - 0.5) * 40, cy + (Math.random() - 0.5) * 40, Math.random() * 2.5 + 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        if (simulationPhase === 'bonded' || simulationPhase === 'complete') {
          // Render reaction product sample at center
          if (result) {
            drawPhysicalMatter(ctx, result.id, cx, cy, 1.3, 0, tick, result.outputName);
          } else if (materialA) {
            drawPhysicalMatter(ctx, materialA.id, cx, cy, 1.2, 0, tick, materialA.name);
          }
        } else {
          // Render Material A and Material B physical bodies
          if (materialA) {
            const oxA = reactionType === 'oxidation' && simulationPhase === 'colliding' ? 0.6 : 0;
            drawPhysicalMatter(ctx, materialA.id, posX_A, posY_A, 1.15, oxA, tick, materialA.name);
          }
          if (materialB) {
            const oxB = reactionType === 'oxidation' && simulationPhase === 'colliding' ? 0.6 : 0;
            drawPhysicalMatter(ctx, materialB.id, posX_B, posY_B, 1.15, oxB, tick, materialB.name);
          }
        }
      }

      // 4. Render Active Collision Shockwaves
      shockwavesRef.current.forEach((sw, i) => {
        sw.radius += 3.5;
        sw.alpha *= 0.94;

        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = sw.alpha;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(cx, cy, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      });
      shockwavesRef.current = shockwavesRef.current.filter(sw => sw.alpha > 0.05);

      // 5. Draw Chamber HUD Overlays
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';

      // Material A label
      if (materialA) {
        ctx.fillText(`CHAMBER A: ${materialA.name.toUpperCase()} [${profileA?.crystalStructure || ''}]`, leftCx - 65, cy - 85);
      }
      // Material B label
      if (materialB) {
        ctx.fillText(`CHAMBER B: ${materialB.name.toUpperCase()} [${profileB?.crystalStructure || ''}]`, rightCx - 65, cy - 85);
      }

      // Step-by-Step State Banner
      ctx.font = '11px "Rajdhani", sans-serif';
      let stateLabel = '1. INPUT MATTER LOADED';
      if (simulationPhase === 'charging') stateLabel = '2. PARTICLE INTERACTION & ACCELERATION';
      else if (simulationPhase === 'colliding') stateLabel = '3. COLLISION & STRUCTURAL REORGANIZATION';
      else if (simulationPhase === 'bonded') stateLabel = `4. ${reactionType.toUpperCase()} MATRIX STABILIZATION`;
      else if (simulationPhase === 'complete') stateLabel = `5. SYNTHESIS COMPLETE → ${result?.outputName || 'PRODUCT'}`;

      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'center';
      ctx.fillText(stateLabel, cx, height - 18);
      ctx.textAlign = 'left';

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [
    materialA?.id,
    materialB?.id,
    simulationPhase,
    result?.id,
    temperature,
    pressure,
    zoomLevel,
    carbonAllotrope,
    reactionType
  ]);

  return (
    <div className="relative w-full h-full min-h-[380px] bg-[#020617] rounded-xl overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
