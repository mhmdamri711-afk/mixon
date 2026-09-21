import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Material } from '../types';
import { 
  getMolecularData, 
  MolecularData, 
  Atom3D, 
  Bond3D 
} from '../utils/molecularStructures';
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Tag, 
  Eye, 
  Maximize2, 
  Layers, 
  Atom, 
  Sparkles,
  Compass,
  Box
} from 'lucide-react';
import { labSound } from '../utils/sound';
import { createPhysicalMaterialMesh, PhysicalMeshResult } from '../utils/materialPhysical3D';
import { RealMaterialPreviewCard } from './RealMaterialPreviewCard';

export type VisualMode3D = 'material' | 'ball_stick' | 'space_filling' | 'orbitals' | 'lattice';

interface InteractiveMoleculeViewer3DProps {
  material?: Material | null;
  molecularDataOverride?: MolecularData | null;
  height?: string | number;
  initialMode?: VisualMode3D;
  showControls?: boolean;
  showDetailsBar?: boolean;
  autoRotateSpeed?: number;
  interactive?: boolean;
  compact?: boolean;
}

export const InteractiveMoleculeViewer3D: React.FC<InteractiveMoleculeViewer3DProps> = ({
  material,
  molecularDataOverride,
  height = 360,
  initialMode = 'ball_stick',
  showControls = true,
  showDetailsBar = true,
  autoRotateSpeed = 0.5,
  interactive = true,
  compact = false
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [viewMode, setViewMode] = useState<VisualMode3D>(initialMode);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showMeasurements, setShowMeasurements] = useState<boolean>(false);
  const [hoveredAtom, setHoveredAtom] = useState<Atom3D | null>(null);
  const [hoveredPos, setHoveredPos] = useState<{ x: number; y: number } | null>(null);

  // Resolved Molecular Data
  const moleculeData: MolecularData = React.useMemo(() => {
    if (molecularDataOverride) return molecularDataOverride;
    if (material) return getMolecularData(material);
    return getMolecularData({ symbol: 'Sample', name: 'Sample' });
  }, [material, molecularDataOverride]);

  // Adjust default viewMode if molecule is a pure single element with no bonds
  useEffect(() => {
    if (moleculeData.category === 'element' && initialMode === 'ball_stick') {
      setViewMode('orbitals');
    } else {
      setViewMode(initialMode);
    }
  }, [moleculeData.category, initialMode]);

  // Three.js internal references for controls
  const controlsRef = useRef<{
    zoomIn: () => void;
    zoomOut: () => void;
    reset: () => void;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const heightVal = container.clientHeight || (typeof height === 'number' ? height : 360);

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / heightVal, 0.1, 1000);
    camera.position.z = moleculeData.category === 'crystal' ? 14 : 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, heightVal);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.6);
    mainLight.position.set(10, 15, 12);
    scene.add(mainLight);

    const cyanRim = new THREE.PointLight(0x0ea5e9, 2.5, 40);
    cyanRim.position.set(-10, -8, -6);
    scene.add(cyanRim);

    const violetGlow = new THREE.PointLight(0x818cf8, 1.8, 35);
    violetGlow.position.set(8, -10, 8);
    scene.add(violetGlow);

    // Root Molecule Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Interactive Mesh Maps for Raycasting
    const atomMeshMap = new Map<THREE.Mesh, Atom3D>();
    const atomMeshes: THREE.Mesh[] = [];

    // --- 0. Physical Material Sample Group (Macro View) ---
    const materialPhysicalGroup = new THREE.Group();
    let physicalResult: PhysicalMeshResult | null = null;
    if (material?.id) {
      physicalResult = createPhysicalMaterialMesh(material.id, 1.2);
      materialPhysicalGroup.add(physicalResult.group);
    }
    rootGroup.add(materialPhysicalGroup);

    // -------------------------------------------------------------
    // BUILD VISUAL MODES
    // -------------------------------------------------------------

    // --- A. Ball & Stick Mode / Space-Filling Mode ---
    const molecularGroup = new THREE.Group();
    const spaceFillingGroup = new THREE.Group();
    const bondsGroup = new THREE.Group();

    // Atoms
    moleculeData.atoms.forEach(atom => {
      const atomColor = new THREE.Color(atom.color);

      // Ball & Stick Material
      const ballMat = new THREE.MeshStandardMaterial({
        color: atomColor,
        metalness: 0.25,
        roughness: 0.25,
        emissive: atomColor,
        emissiveIntensity: 0.15
      });
      const ballGeo = new THREE.SphereGeometry(atom.radius, 28, 28);
      const ballMesh = new THREE.Mesh(ballGeo, ballMat);
      ballMesh.position.set(...atom.position);
      ballMesh.castShadow = true;
      ballMesh.receiveShadow = true;
      molecularGroup.add(ballMesh);

      // Map for raycasting
      atomMeshMap.set(ballMesh, atom);
      atomMeshes.push(ballMesh);

      // Space Filling Material (Van der Waals)
      const vdwMat = new THREE.MeshStandardMaterial({
        color: atomColor,
        metalness: 0.15,
        roughness: 0.35,
        emissive: atomColor,
        emissiveIntensity: 0.1
      });
      const vdwGeo = new THREE.SphereGeometry(atom.vdwRadius * 0.9, 28, 28);
      const vdwMesh = new THREE.Mesh(vdwGeo, vdwMat);
      vdwMesh.position.set(...atom.position);
      spaceFillingGroup.add(vdwMesh);
      atomMeshMap.set(vdwMesh, atom);
      atomMeshes.push(vdwMesh);
    });

    // Bonds (Cylinders)
    const atomMapById = new Map<string, Atom3D>();
    moleculeData.atoms.forEach(a => atomMapById.set(a.id, a));

    moleculeData.bonds.forEach(bond => {
      const a1 = atomMapById.get(bond.from);
      const a2 = atomMapById.get(bond.to);
      if (!a1 || !a2) return;

      const p1 = new THREE.Vector3(...a1.position);
      const p2 = new THREE.Vector3(...a2.position);
      const distance = p1.distanceTo(p2);
      const direction = new THREE.Vector3().subVectors(p2, p1).normalize();
      const midpoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

      const bondMat = new THREE.MeshStandardMaterial({
        color: bond.type === 'ionic' ? 0x94a3b8 : bond.type === 'metallic' ? 0x38bdf8 : 0xd1d5db,
        metalness: 0.4,
        roughness: 0.3,
        transparent: bond.type === 'ionic',
        opacity: bond.type === 'ionic' ? 0.75 : 0.95
      });

      // Handle single, double, triple bonds
      const order = bond.order || 1;
      const radius = bond.type === 'ionic' ? 0.06 : 0.1;

      if (order === 1) {
        const bondGeo = new THREE.CylinderGeometry(radius, radius, distance, 12);
        const bondMesh = new THREE.Mesh(bondGeo, bondMat);
        bondMesh.position.copy(midpoint);
        bondMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
        bondsGroup.add(bondMesh);
      } else if (order === 2) {
        // Double bond (2 parallel cylinders)
        const offsetAxis = new THREE.Vector3(0, 0, 1);
        if (Math.abs(direction.z) > 0.9) offsetAxis.set(1, 0, 0);
        const perp = new THREE.Vector3().crossVectors(direction, offsetAxis).normalize().multiplyScalar(0.14);

        [-1, 1].forEach(sign => {
          const bondGeo = new THREE.CylinderGeometry(radius * 0.85, radius * 0.85, distance, 12);
          const bondMesh = new THREE.Mesh(bondGeo, bondMat);
          bondMesh.position.copy(midpoint).addScaledVector(perp, sign);
          bondMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
          bondsGroup.add(bondMesh);
        });
      } else if (order === 3) {
        // Triple bond (3 parallel cylinders)
        const perp1 = new THREE.Vector3(0, 0.16, 0);
        const perp2 = new THREE.Vector3(0.14, -0.08, 0);
        const perp3 = new THREE.Vector3(-0.14, -0.08, 0);

        [perp1, perp2, perp3].forEach(perp => {
          const bondGeo = new THREE.CylinderGeometry(radius * 0.75, radius * 0.75, distance, 12);
          const bondMesh = new THREE.Mesh(bondGeo, bondMat);
          bondMesh.position.copy(midpoint).add(perp);
          bondMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
          bondsGroup.add(bondMesh);
        });
      }
    });

    molecularGroup.add(bondsGroup);
    rootGroup.add(molecularGroup);
    rootGroup.add(spaceFillingGroup);

    // --- B. Bohr Orbitals / Quantum Shells Mode ---
    const orbitalsGroup = new THREE.Group();

    // Central Nucleus Cluster
    const nucleusGroup = new THREE.Group();
    const primaryColor = new THREE.Color(moleculeData.atoms[0]?.color || '#38bdf8');
    const pMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      roughness: 0.2,
      metalness: 0.8,
      emissive: primaryColor,
      emissiveIntensity: 0.4
    });
    const nMat = new THREE.MeshStandardMaterial({
      color: 0x00d2ff,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x0088cc,
      emissiveIntensity: 0.3
    });

    const subSphereCount = Math.min(16, Math.max(6, (moleculeData.atoms[0]?.atomicNumber || 8)));
    const nucleusGeo = new THREE.SphereGeometry(0.38, 16, 16);
    for (let i = 0; i < subSphereCount; i++) {
      const mesh = new THREE.Mesh(nucleusGeo, i % 2 === 0 ? pMat : nMat);
      const angle = (i / subSphereCount) * Math.PI * 2;
      const r = 0.55;
      mesh.position.set(
        Math.cos(angle) * r + (Math.sin(i * 3) * 0.15),
        Math.sin(angle) * r + (Math.cos(i * 2) * 0.15),
        ((i % 3) - 1) * 0.35
      );
      nucleusGroup.add(mesh);
    }
    orbitalsGroup.add(nucleusGroup);

    // Dynamic Orbital Shells & Electrons
    const electronMeshes: {
      mesh: THREE.Mesh;
      orbitRadius: number;
      speed: number;
      angle: number;
      euler: THREE.Euler;
    }[] = [];

    const shellRadii = [2.2, 3.8, 5.4, 7.0];
    const shellRotations = [
      new THREE.Euler(Math.PI / 4, 0, 0),
      new THREE.Euler(-Math.PI / 4, Math.PI / 3, 0),
      new THREE.Euler(0, -Math.PI / 3, Math.PI / 6),
      new THREE.Euler(Math.PI / 6, Math.PI / 4, -Math.PI / 4)
    ];

    const electronGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const electronMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x00ffff,
      emissiveIntensity: 1.2
    });

    const activeShellCount = Math.min(4, Math.max(2, Math.ceil((moleculeData.atoms[0]?.atomicNumber || 6) / 4)));

    for (let s = 0; s < activeShellCount; s++) {
      const radius = shellRadii[s];
      const torusGeo = new THREE.TorusGeometry(radius, 0.025, 16, 120);
      const torusMat = new THREE.MeshBasicMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.4
      });
      const ring = new THREE.Mesh(torusGeo, torusMat);
      ring.rotation.copy(shellRotations[s]);
      orbitalsGroup.add(ring);

      // Add orbiting electrons
      const eCount = s === 0 ? 2 : Math.min(8, 2 * s + 2);
      for (let e = 0; e < eCount; e++) {
        const eMesh = new THREE.Mesh(electronGeo, electronMat);
        orbitalsGroup.add(eMesh);
        electronMeshes.push({
          mesh: eMesh,
          orbitRadius: radius,
          speed: 0.025 + s * 0.008,
          angle: (e / eCount) * Math.PI * 2,
          euler: shellRotations[s]
        });
      }
    }
    rootGroup.add(orbitalsGroup);

    // --- C. Crystal Lattice Wireframe Mode ---
    const latticeGroup = new THREE.Group();
    const boxDim = moleculeData.latticeBounds ? moleculeData.latticeBounds[0] * 1.5 : 5.5;
    const boxGeo = new THREE.BoxGeometry(boxDim, boxDim, boxDim);
    const edges = new THREE.EdgesGeometry(boxGeo);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5
    });
    const wireframeBox = new THREE.LineSegments(edges, lineMat);
    latticeGroup.add(wireframeBox);

    // Diagonal axis guides
    const axisMat = new THREE.LineDashedMaterial({
      color: 0x0284c7,
      dashSize: 0.2,
      gapSize: 0.1,
      transparent: true,
      opacity: 0.35
    });
    const axisGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-boxDim / 2, 0, 0), new THREE.Vector3(boxDim / 2, 0, 0),
      new THREE.Vector3(0, -boxDim / 2, 0), new THREE.Vector3(0, boxDim / 2, 0),
      new THREE.Vector3(0, 0, -boxDim / 2), new THREE.Vector3(0, 0, boxDim / 2),
    ]);
    const axisLines = new THREE.LineSegments(axisGeo, axisMat);
    axisLines.computeLineDistances();
    latticeGroup.add(axisLines);

    rootGroup.add(latticeGroup);

    // Function to apply visibility based on current viewMode
    const applyVisibility = (mode: VisualMode3D) => {
      materialPhysicalGroup.visible = mode === 'material';
      molecularGroup.visible = mode === 'ball_stick' || mode === 'lattice';
      spaceFillingGroup.visible = mode === 'space_filling';
      orbitalsGroup.visible = mode === 'orbitals';
      latticeGroup.visible = mode === 'lattice';
    };

    applyVisibility(viewMode);

    // -------------------------------------------------------------
    // INTERACTIVITY: DRAG ROTATION, WHEEL ZOOM, RAYCASTING
    // -------------------------------------------------------------
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const mousePos = new THREE.Vector2();

    const handleMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update raycaster
      mousePos.x = (x / width) * 2 - 1;
      mousePos.y = -(y / heightVal) * 2 + 1;

      raycaster.setFromCamera(mousePos, camera);
      const intersects = raycaster.intersectObjects(atomMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const atomInfo = atomMeshMap.get(hit);
        if (atomInfo) {
          setHoveredAtom(atomInfo);
          setHoveredPos({ x, y });
        }
      } else {
        setHoveredAtom(null);
      }

      if (isDragging && interactive) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        rootGroup.rotation.y += dx * 0.008;
        rootGroup.rotation.x += dy * 0.008;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!interactive) return;
      e.preventDefault();
      camera.position.z = Math.max(5, Math.min(30, camera.position.z + e.deltaY * 0.015));
    };

    // Touch Support
    const handleTouchStart = (e: TouchEvent) => {
      if (!interactive || e.touches.length === 0) return;
      isDragging = true;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!interactive || !isDragging || e.touches.length === 0) return;
      const dx = e.touches[0].clientX - prevMouse.x;
      const dy = e.touches[0].clientY - prevMouse.y;
      rootGroup.rotation.y += dx * 0.008;
      rootGroup.rotation.x += dy * 0.008;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Controls Exposure
    controlsRef.current = {
      zoomIn: () => {
        camera.position.z = Math.max(5, camera.position.z - 2.0);
      },
      zoomOut: () => {
        camera.position.z = Math.min(30, camera.position.z + 2.0);
      },
      reset: () => {
        camera.position.z = moleculeData.category === 'crystal' ? 14 : 10;
        rootGroup.rotation.set(0, 0, 0);
      }
    };

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isRotating && !isDragging) {
        rootGroup.rotation.y += delta * autoRotateSpeed;
      }

      // Update physical material sample dynamics if active
      if (materialPhysicalGroup.visible && physicalResult?.update) {
        physicalResult.update(delta, clock.getElapsedTime());
      }

      // Update orbiting electrons in Bohr mode
      if (orbitalsGroup.visible) {
        electronMeshes.forEach(el => {
          el.angle += el.speed;
          const lx = Math.cos(el.angle) * el.orbitRadius;
          const ly = Math.sin(el.angle) * el.orbitRadius;
          const vec = new THREE.Vector3(lx, ly, 0).applyEuler(el.euler);
          el.mesh.position.copy(vec);
        });
        nucleusGroup.rotation.y += 0.015;
        nucleusGroup.rotation.x += 0.008;
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
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      // Clean disposal
      renderer.dispose();
      scene.clear();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [moleculeData, viewMode, isRotating, autoRotateSpeed, interactive, height]);

  return (
    <div 
      className="relative w-full rounded-xl overflow-hidden bg-[#020617] border border-sky-900/50 shadow-inner group"
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      {/* 3D WebGL Canvas Viewport */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      />

      {/* Top Left: Molecule Identity Tag */}
      <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
        <div className="flex items-center gap-2 bg-[#020617]/90 backdrop-blur-md px-3 py-1.5 rounded border border-sky-900/60 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="font-mono text-xs text-sky-200 font-bold tracking-wide">
            {moleculeData.formula}
          </span>
          <span className="text-[10px] font-mono text-sky-500 uppercase">
            [{moleculeData.geometry}]
          </span>
        </div>
      </div>

      {/* Top Right: Interactive Controls + Small Real Material Preview */}
      <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-2">
        {showControls && (
          <div className="flex items-center gap-1.5 bg-[#020617]/90 backdrop-blur-md p-1 rounded border border-sky-900/60 shadow-lg">
            <button
              onClick={() => {
                labSound.playClick();
                controlsRef.current?.zoomIn();
              }}
              className="p-1.5 text-sky-400 hover:text-white hover:bg-sky-950 rounded transition"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                labSound.playClick();
                controlsRef.current?.zoomOut();
              }}
              className="p-1.5 text-sky-400 hover:text-white hover:bg-sky-950 rounded transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                labSound.playClick();
                setIsRotating(prev => !prev);
              }}
              className={`p-1.5 rounded transition ${isRotating ? 'text-black bg-sky-400' : 'text-sky-400 hover:text-white hover:bg-sky-950'}`}
              title="Toggle Auto-Rotation"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                labSound.playClick();
                controlsRef.current?.reset();
              }}
              className="p-1.5 text-sky-400 hover:text-white hover:bg-sky-950 rounded transition"
              title="Recenter Camera"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Integrated Upper-Right Real Material Preview HUD */}
        {material && !compact && viewMode !== 'material' && (
          <RealMaterialPreviewCard
            material={material}
            className="w-36 shadow-xl"
            onInspect={() => {
              labSound.playClick();
              setViewMode('material');
            }}
            isInspecting={false}
          />
        )}
      </div>

      {/* Bottom Mode Switcher Tabs */}
      {showControls && !compact && (
        <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-1 bg-[#020617]/90 backdrop-blur-md p-1 rounded-lg border border-sky-900/60 text-[10px] font-mono shadow-xl">
          {material?.id && (
            <button
              onClick={() => {
                labSound.playClick();
                setViewMode('material');
              }}
              className={`px-2.5 py-1 rounded transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'material' 
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold shadow-[0_0_12px_rgba(251,191,36,0.4)]' 
                  : 'text-amber-300 hover:bg-amber-950/60 hover:text-amber-100'
              }`}
            >
              <Box className="w-3 h-3" />
              <span>1. Real Material</span>
            </button>
          )}
          <button
            onClick={() => {
              labSound.playClick();
              setViewMode('ball_stick');
            }}
            className={`px-2.5 py-1 rounded transition cursor-pointer ${
              viewMode === 'ball_stick' 
                ? 'bg-sky-500 text-black font-bold shadow-[0_0_10px_rgba(14,165,233,0.3)]' 
                : 'text-sky-400 hover:bg-sky-950/60 hover:text-sky-200'
            }`}
          >
            2. Molecular (Bonds)
          </button>
          <button
            onClick={() => {
              labSound.playClick();
              setViewMode('space_filling');
            }}
            className={`px-2.5 py-1 rounded transition ${
              viewMode === 'space_filling' 
                ? 'bg-sky-500 text-black font-bold shadow-[0_0_10px_rgba(14,165,233,0.3)]' 
                : 'text-sky-400 hover:bg-sky-950/60 hover:text-sky-200'
            }`}
          >
            Van der Waals
          </button>
          <button
            onClick={() => {
              labSound.playClick();
              setViewMode('orbitals');
            }}
            className={`px-2.5 py-1 rounded transition ${
              viewMode === 'orbitals' 
                ? 'bg-sky-500 text-black font-bold shadow-[0_0_10px_rgba(14,165,233,0.3)]' 
                : 'text-sky-400 hover:bg-sky-950/60 hover:text-sky-200'
            }`}
          >
            3. Atomic (Shells)
          </button>
          <button
            onClick={() => {
              labSound.playClick();
              setViewMode('lattice');
            }}
            className={`px-2.5 py-1 rounded transition ${
              viewMode === 'lattice' 
                ? 'bg-sky-500 text-black font-bold shadow-[0_0_10px_rgba(14,165,233,0.3)]' 
                : 'text-sky-400 hover:bg-sky-950/60 hover:text-sky-200'
            }`}
          >
            4. Crystal Lattice
          </button>
        </div>
      )}

      {/* Bottom Right: Quick Telemetry Indicator */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2 pointer-events-none">
        {moleculeData.bondAngle && (
          <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-sky-400 bg-[#020617]/90 px-2 py-1 rounded border border-sky-900/60">
            <Compass className="w-3 h-3 text-sky-400" />
            <span>Angle: {moleculeData.bondAngle}</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-[10px] font-mono text-sky-400 bg-[#020617]/90 px-2 py-1 rounded border border-sky-900/60">
          <Layers className="w-3 h-3 text-sky-400" />
          <span>Atoms: {moleculeData.atoms.length}</span>
        </div>
      </div>

      {/* Interactive Raycast Atom Inspection HUD Popover */}
      {hoveredAtom && hoveredPos && (
        <div 
          className="absolute z-20 pointer-events-none bg-[#020617]/95 border border-sky-400/80 rounded-lg p-2.5 shadow-[0_0_25px_rgba(14,165,233,0.4)] text-xs font-mono backdrop-blur-md animate-fadeIn"
          style={{
            left: Math.min(hoveredPos.x + 12, (mountRef.current?.clientWidth || 300) - 180),
            top: Math.max(hoveredPos.y - 80, 10)
          }}
        >
          <div className="flex items-center gap-2 pb-1.5 border-b border-sky-900/60">
            <div 
              className="w-4 h-4 rounded-full border border-white/50" 
              style={{ backgroundColor: hoveredAtom.color }} 
            />
            <span className="font-bold text-white text-sm">{hoveredAtom.name} ({hoveredAtom.element})</span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1.5 text-[10px] text-sky-300">
            <div>
              <span className="text-sky-600 block">Z Number:</span>
              <span className="font-bold text-white">{hoveredAtom.atomicNumber || 'N/A'}</span>
            </div>
            <div>
              <span className="text-sky-600 block">Electronegativity:</span>
              <span className="font-bold text-sky-200">{hoveredAtom.electronegativity || '0'}</span>
            </div>
            <div>
              <span className="text-sky-600 block">Valence e⁻:</span>
              <span className="font-bold text-sky-400">{hoveredAtom.valenceElectrons}</span>
            </div>
            <div>
              <span className="text-sky-600 block">Charge State:</span>
              <span className="font-bold text-amber-300">{hoveredAtom.charge || 'Neutral'}</span>
            </div>
          </div>
          <div className="mt-1 text-[9px] text-sky-500 pt-1 border-t border-sky-900/50">
            Pos: [{hoveredAtom.position.map(n => n.toFixed(1)).join(', ')}]
          </div>
        </div>
      )}

      {/* Subtle Bottom Helper prompt */}
      <div className="absolute bottom-11 left-3 text-[9px] font-mono text-sky-600/80 pointer-events-none hidden md:block">
        Hover atom to inspect • Drag to rotate 360° • Scroll to zoom
      </div>
    </div>
  );
};
