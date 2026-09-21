import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Material } from '../types';
import { createPhysicalMaterialMesh } from '../utils/materialPhysical3D';
import { Sparkles, Eye } from 'lucide-react';
import { AppLanguage, TRANSLATIONS } from '../utils/i18n';

interface RealMaterialPreviewCardProps {
  material: Material;
  onInspect?: () => void;
  className?: string;
  isInspecting?: boolean;
  lang?: AppLanguage;
}

export const RealMaterialPreviewCard: React.FC<RealMaterialPreviewCardProps> = ({
  material,
  onInspect,
  className = '',
  isInspecting = false,
  lang = 'en'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 140;
    const height = container.clientHeight || 120;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 4.8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Cinematic Laboratory Studio Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // Physical Specimen Mesh
    const { group, update } = createPhysicalMaterialMesh(material.id, 0.72);
    scene.add(group);

    const clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Gentle continuous rotation
      group.rotation.y += delta * 0.75;
      group.rotation.x = Math.sin(elapsed * 0.8) * 0.12;

      if (update) {
        update(delta, elapsed);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      scene.clear();
      if (container) container.innerHTML = '';
    };
  }, [material.id]);

  const displayName = lang === 'ar' ? (material.nameAr || material.name) : material.name;

  return (
    <div
      id={`real-material-preview-${material.id}`}
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-cyan-500/30 bg-slate-950/85 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-cyan-400/60 hover:shadow-cyan-500/20 ${className}`}
    >
      {/* Top Header Badge */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 bg-gradient-to-r from-cyan-950/60 to-slate-900/60 px-2.5 py-1.5">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
          </span>
          <span className="font-mono text-[10px] font-semibold tracking-wider text-cyan-300 uppercase">
            {t.realMaterial}
          </span>
        </div>
        <Sparkles className="h-3 w-3 text-cyan-400/70" />
      </div>

      {/* Mini 3D Viewport */}
      <div className="relative h-24 w-full cursor-pointer bg-radial from-slate-900/80 to-slate-950/90" onClick={onInspect}>
        <div ref={mountRef} className="h-full w-full pointer-events-none" />

        {/* Hover Action Overlay */}
        {onInspect && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100">
            <button
              id={`inspect-btn-${material.id}`}
              type="button"
              className="flex items-center gap-1 rounded-md border border-cyan-400/50 bg-cyan-500/20 px-2 py-1 text-[10px] font-medium text-cyan-200 shadow-sm transition hover:bg-cyan-500/40"
            >
              <Eye className="h-2.5 w-2.5" />
              {isInspecting ? t.inspecting3D : t.inspect3D}
            </button>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between border-t border-slate-800/80 bg-slate-950/90 px-2.5 py-1">
        <span className="truncate text-xs font-semibold text-slate-200" title={displayName}>
          {displayName}
        </span>
        <span className="font-mono text-[11px] font-bold text-cyan-400">
          {material.symbol}
        </span>
      </div>
    </div>
  );
};
