import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Material, ReactionResult } from '../types';
import { AppLanguage } from '../utils/i18n';
import { getMolecularData, MolecularData, Atom3D, Bond3D } from '../utils/molecularStructures';
import { getMaterialVisualProfile } from '../data/materialVisualProfiles';
import { createPhysicalMaterialMesh, createPhysicalReactionProductMesh, PhysicalMeshResult } from '../utils/materialPhysical3D';
import { RotateCw, ZoomIn, ZoomOut, RotateCcw, Layers, Compass, Eye, Sparkles, Box, Atom, Flame } from 'lucide-react';
import { labSound } from '../utils/sound';
import { RealMaterialPreviewCard } from './RealMaterialPreviewCard';

interface MixLabChamber3DProps {
  materialA: Material | null;
  materialB: Material | null;
  isSimulating: boolean;
  simulationPhase: 'idle' | 'charging' | 'colliding' | 'bonded' | 'complete';
  result: ReactionResult | null;
  temperature?: number;
  pressure?: number;
  lang?: AppLanguage;
  onInspectMaterial?: (m: Material) => void;
  defaultChamberView?: 'material' | 'scientific';
}

export const MixLabChamber3D: React.FC<MixLabChamber3DProps> = ({
  materialA,
  materialB,
  isSimulating,
  simulationPhase,
  result,
  temperature = 25,
  pressure = 1.0,
  lang = 'en',
  defaultChamberView = 'material'
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [chamberView, setChamberView] = useState<'material' | 'scientific'>(defaultChamberView);
  const [scientificMode, setScientificMode] = useState<'ball_stick' | 'space_filling' | 'orbitals'>('ball_stick');
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [hoveredAtom, setHoveredAtom] = useState<Atom3D | null>(null);
  const [hoveredPos, setHoveredPos] = useState<{ x: number; y: number } | null>(null);

  const tempRef = useRef(temperature);
  const pressRef = useRef(pressure);
  useEffect(() => {
    tempRef.current = temperature;
    pressRef.current = pressure;
  }, [temperature, pressure]);

  const controlsRef = useRef<{ zoomIn: () => void; zoomOut: () => void; reset: () => void } | null>(null);

  // Resolved Molecular Structures for Scientific View
  const molA = React.useMemo(() => materialA ? getMolecularData(materialA) : null, [materialA]);
  const molB = React.useMemo(() => materialB ? getMolecularData(materialB) : null, [materialB]);
  const molResult = React.useMemo(() => result ? getMolecularData({
    id: result.id,
    name: result.outputName,
    symbol: result.outputFormula.split('→')[1]?.trim().split(' ')[0] || result.outputName
  }) : null, [result]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.8);
    mainLight.position.set(6, 14, 12);
    scene.add(mainLight);

    const leftSlotLight = new THREE.PointLight(0x0ea5e9, 2.5, 30);
    leftSlotLight.position.set(-4.5, 0, 5);
    scene.add(leftSlotLight);

    const rightSlotLight = new THREE.PointLight(0x818cf8, 2.5, 30);
    rightSlotLight.position.set(4.5, 0, 5);
    scene.add(rightSlotLight);

    const centerReactionLight = new THREE.PointLight(0x38bdf8, 0, 45);
    centerReactionLight.position.set(0, 0, 4);
    scene.add(centerReactionLight);

    // Thermal Reaction Spark Light
    const sparkLight = new THREE.PointLight(0xf97316, 0, 30);
    sparkLight.position.set(0, 0, 2);
    scene.add(sparkLight);

    // 3. Reactor Platform & Containment System
    const chamberGroup = new THREE.Group();
    scene.add(chamberGroup);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(18, 18, 0x0ea5e9, 0x0369a1);
    gridHelper.position.y = -4.5;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.35;
    chamberGroup.add(gridHelper);

    // Holographic Magnetic Containment Rings
    const ringGeo = new THREE.TorusGeometry(3.2, 0.03, 16, 80);
    const ringMatA = new THREE.MeshBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.4 });
    const ringMatB = new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.4 });

    const containmentRingA = new THREE.Mesh(ringGeo, ringMatA);
    containmentRingA.position.set(-4.5, 0, 0);
    containmentRingA.rotation.x = Math.PI / 2;
    chamberGroup.add(containmentRingA);

    const containmentRingB = new THREE.Mesh(ringGeo, ringMatB);
    containmentRingB.position.set(4.5, 0, 0);
    containmentRingB.rotation.x = Math.PI / 2;
    chamberGroup.add(containmentRingB);

    // Center Reaction Crucible Ring
    const centerRingGeo = new THREE.TorusGeometry(3.6, 0.04, 16, 80);
    const centerRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.3 });
    const centerRing = new THREE.Mesh(centerRingGeo, centerRingMat);
    centerRing.rotation.x = Math.PI / 2;
    chamberGroup.add(centerRing);

    // Ambient floating dust particles
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const particleCoords = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particleCoords[i] = (Math.random() - 0.5) * 16;
      particleCoords[i + 1] = (Math.random() - 0.5) * 8;
      particleCoords[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particleCoords, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.45
    });
    const dustParticles = new THREE.Points(particleGeo, particleMat);
    chamberGroup.add(dustParticles);

    // Contact Interface Reaction Sparks System
    const sparkCount = 40;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkCoords = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount * 3; i += 3) {
      sparkCoords[i] = (Math.random() - 0.5) * 1.5;
      sparkCoords[i + 1] = (Math.random() - 0.5) * 1.5;
      sparkCoords[i + 2] = (Math.random() - 0.5) * 1.5;
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkCoords, 3));
    const sparkPointsMat = new THREE.PointsMaterial({
      color: 0xfdba74,
      size: 0.15,
      transparent: true,
      opacity: 0
    });
    const reactionSparks = new THREE.Points(sparkGeo, sparkPointsMat);
    reactionSparks.position.set(0, 0, 0);
    chamberGroup.add(reactionSparks);

    // Raycast structures for interactive atom inspection
    const atomMeshMap = new Map<THREE.Mesh, Atom3D>();
    const atomMeshes: THREE.Mesh[] = [];

    // 4. CHANNELS: MATERIAL VIEW vs SCIENTIFIC VIEW GROUPS
    const materialChannelGroup = new THREE.Group();
    const scientificChannelGroup = new THREE.Group();
    chamberGroup.add(materialChannelGroup);
    chamberGroup.add(scientificChannelGroup);

    // -------------------------------------------------------------
    // A. PHYSICAL MATERIAL VIEW SETUP
    // -------------------------------------------------------------
    const physGroupA = new THREE.Group();
    const physGroupB = new THREE.Group();
    const physGroupProduct = new THREE.Group();
    materialChannelGroup.add(physGroupA, physGroupB, physGroupProduct);

    let physA: PhysicalMeshResult | null = null;
    let physB: PhysicalMeshResult | null = null;
    let physProd: PhysicalMeshResult | null = null;

    if (materialA) {
      physA = createPhysicalMaterialMesh(materialA.id, 0.95);
      physGroupA.add(physA.group);
      physGroupA.position.set(-4.5, 0, 0);
    }
    if (materialB) {
      physB = createPhysicalMaterialMesh(materialB.id, 0.95);
      physGroupB.add(physB.group);
      physGroupB.position.set(4.5, 0, 0);
    }
    if (result) {
      physProd = createPhysicalReactionProductMesh(result, result.outputState, 1.15);
      physGroupProduct.add(physProd.group);
      physGroupProduct.position.set(0, 0, 0);
    }

    // -------------------------------------------------------------
    // B. SCIENTIFIC VIEW SETUP (Molecular Balls, Bonds, Orbitals)
    // -------------------------------------------------------------
    const sciGroupA = new THREE.Group();
    const sciGroupB = new THREE.Group();
    const sciGroupProduct = new THREE.Group();
    scientificChannelGroup.add(sciGroupA, sciGroupB, sciGroupProduct);

    const buildMoleculeMeshes = (data: MolecularData, parent: THREE.Group, scale = 1.0, materialId?: string) => {
      parent.clear();
      const profile = materialId ? getMaterialVisualProfile(materialId) : null;
      const atomMap = new Map<string, Atom3D>();
      data.atoms.forEach(a => atomMap.set(a.id, a));

      const isMetallic = profile?.particleType.includes('metallic') || profile?.movementStyle.includes('metallic');

      // Atoms
      data.atoms.forEach(atom => {
        const atomColor = new THREE.Color(atom.color);
        const radius = scientificMode === 'space_filling' ? atom.vdwRadius * 0.85 : atom.radius;
        const geo = new THREE.SphereGeometry(radius * scale, 24, 24);
        const mat = new THREE.MeshStandardMaterial({
          color: atomColor,
          roughness: isMetallic ? 0.18 : 0.35,
          metalness: isMetallic ? 0.85 : 0.2,
          emissive: atomColor,
          emissiveIntensity: isMetallic ? 0.15 : 0.25
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(atom.position[0] * scale, atom.position[1] * scale, atom.position[2] * scale);
        parent.add(mesh);

        atomMeshMap.set(mesh, atom);
        atomMeshes.push(mesh);
      });

      // Bonds (when not in space-filling mode)
      if (scientificMode !== 'space_filling') {
        data.bonds.forEach(bond => {
          const a1 = atomMap.get(bond.from);
          const a2 = atomMap.get(bond.to);
          if (!a1 || !a2) return;

          const p1 = new THREE.Vector3(a1.position[0] * scale, a1.position[1] * scale, a1.position[2] * scale);
          const p2 = new THREE.Vector3(a2.position[0] * scale, a2.position[1] * scale, a2.position[2] * scale);
          const dist = p1.distanceTo(p2);
          const dir = new THREE.Vector3().subVectors(p2, p1).normalize();
          const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

          const bondMat = new THREE.MeshStandardMaterial({
            color: 0xd1d5db,
            metalness: 0.4,
            roughness: 0.3
          });
          const bondGeo = new THREE.CylinderGeometry(0.09 * scale, 0.09 * scale, dist, 12);
          const bondMesh = new THREE.Mesh(bondGeo, bondMat);
          bondMesh.position.copy(mid);
          bondMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
          parent.add(bondMesh);
        });
      }

      // If Bohr mode: add orbital rings around central atom
      if (scientificMode === 'orbitals' && data.atoms.length > 0) {
        const ringTorus = new THREE.TorusGeometry(2.0 * scale, 0.02, 16, 80);
        const ringM = new THREE.MeshBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.5 });
        const r1 = new THREE.Mesh(ringTorus, ringM);
        r1.rotation.x = Math.PI / 3;
        parent.add(r1);
      }
    };

    if (molA) {
      buildMoleculeMeshes(molA, sciGroupA, 0.9, materialA?.id);
      sciGroupA.position.set(-4.5, 0, 0);
    }
    if (molB) {
      buildMoleculeMeshes(molB, sciGroupB, 0.9, materialB?.id);
      sciGroupB.position.set(4.5, 0, 0);
    }
    if (molResult) {
      buildMoleculeMeshes(molResult, sciGroupProduct, 1.1);
      sciGroupProduct.position.set(0, 0, 0);
    }

    // Toggle active channel visibility
    materialChannelGroup.visible = chamberView === 'material';
    scientificChannelGroup.visible = chamberView === 'scientific';

    // 5. INTERACTIVE MOUSE / TOUCH EVENTS
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouse.x = (x / width) * 2 - 1;
      mouse.y = -(y / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(atomMeshes);
      if (hits.length > 0 && chamberView === 'scientific') {
        const atom = atomMeshMap.get(hits[0].object as THREE.Mesh);
        if (atom) {
          setHoveredAtom(atom);
          setHoveredPos({ x, y });
        }
      } else {
        setHoveredAtom(null);
      }

      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        chamberGroup.rotation.y += dx * 0.007;
        chamberGroup.rotation.x += dy * 0.007;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = Math.max(7, Math.min(28, camera.position.z + e.deltaY * 0.015));
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('wheel', handleWheel, { passive: false });

    // Touch handlers
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      isDragging = true;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const dx = e.touches[0].clientX - prevMouse.x;
      const dy = e.touches[0].clientY - prevMouse.y;
      chamberGroup.rotation.y += dx * 0.007;
      chamberGroup.rotation.x += dy * 0.007;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Controls exposure
    controlsRef.current = {
      zoomIn: () => {
        camera.position.z = Math.max(7, camera.position.z - 2.0);
      },
      zoomOut: () => {
        camera.position.z = Math.min(28, camera.position.z + 2.0);
      },
      reset: () => {
        camera.position.set(0, 0, 16);
        chamberGroup.rotation.set(0, 0, 0);
      }
    };

    // 6. ANIMATION LOOP WITH AUTHENTIC PHYSICAL MATTER INTERACTIONS
    let animId: number;
    const clock = new THREE.Clock();
    let collisionProgress = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Ambient chamber rotation
      if (isRotating && !isDragging && simulationPhase !== 'colliding') {
        chamberGroup.rotation.y += delta * 0.25;
      }

      // Containment rings hover oscillation
      containmentRingA.position.y = Math.sin(elapsed * 2) * 0.15;
      containmentRingB.position.y = Math.sin(elapsed * 2 + 1) * 0.15;
      containmentRingA.rotation.z += 0.005;
      containmentRingB.rotation.z -= 0.005;
      centerRing.rotation.z += 0.003;

      // Dust particle floating drift
      dustParticles.rotation.y += 0.001;

      // Update physical procedural animations (liquid ripples, gold starbursts, gas diffusion, thermal incandescence)
      if (chamberView === 'material') {
        physA?.update?.(delta, elapsed, { temperature: tempRef.current, pressure: pressRef.current });
        physB?.update?.(delta, elapsed, { temperature: tempRef.current, pressure: pressRef.current });
        physProd?.update?.(delta, elapsed, { temperature: tempRef.current, pressure: pressRef.current });
      }

      // High temperature thermal radiation in chamber
      if (tempRef.current > 350 && simulationPhase !== 'colliding' && simulationPhase !== 'charging') {
        const heatNorm = Math.min(1.0, (tempRef.current - 350) / 750);
        sparkLight.intensity = Math.max(sparkLight.intensity, heatNorm * 1.8);
        sparkLight.color.setRGB(1.0, 0.35 + (1 - heatNorm) * 0.45, 0.08);
      }

      // Subtle rotation of slots
      sciGroupA.rotation.y += delta * 0.5;
      sciGroupB.rotation.y -= delta * 0.5;

      // =======================================================================
      // SIMULATION PHASE TIMELINE & REACTION-SPECIFIC BEHAVIORS
      // =======================================================================
      if (simulationPhase === 'idle') {
        // Reset positions to containment zones
        physGroupA.position.set(-4.5, 0, 0);
        physGroupB.position.set(4.5, 0, 0);
        sciGroupA.position.set(-4.5, 0, 0);
        sciGroupB.position.set(4.5, 0, 0);

        physGroupA.visible = !!materialA;
        physGroupB.visible = !!materialB;
        sciGroupA.visible = !!molA;
        sciGroupB.visible = !!molB;

        physGroupProduct.visible = false;
        sciGroupProduct.visible = false;
        centerReactionLight.intensity = 0;
        sparkLight.intensity = 0;
        sparkPointsMat.opacity = 0;
        collisionProgress = 0;

        // Reset oxidation status if applicable
        physA?.setOxidationProgress?.(0);
        physB?.setOxidationProgress?.(0);
      } 
      else if (simulationPhase === 'charging') {
        // High-frequency magnetic containment excitation jitter
        const jitter = Math.sin(elapsed * 45) * 0.08;
        physGroupA.position.set(-4.5 + jitter, jitter, 0);
        physGroupB.position.set(4.5 - jitter, -jitter, 0);
        sciGroupA.position.set(-4.5 + jitter, jitter, 0);
        sciGroupB.position.set(4.5 - jitter, -jitter, 0);

        physGroupProduct.visible = false;
        sciGroupProduct.visible = false;

        // Pre-reaction field glow
        centerReactionLight.intensity = Math.abs(Math.sin(elapsed * 8)) * 3.5;
        sparkLight.intensity = 0.5;
      } 
      else if (simulationPhase === 'colliding') {
        // Natural curved non-linear trajectory with gravitational acceleration!
        collisionProgress = Math.min(1, collisionProgress + delta * 0.72);

        // Non-linear acceleration: smooth power curve as materials draw together
        const t = Math.pow(collisionProgress, 1.45);

        // Curved arc path: Slot A approaches with natural vertical and depth crest
        const arcY_A = Math.sin(collisionProgress * Math.PI) * 0.7;
        const arcZ_A = Math.sin(collisionProgress * Math.PI) * 0.85;
        const currentXA = THREE.MathUtils.lerp(-4.5, 0, t);
        const currentYA = arcY_A + Math.sin(elapsed * 3) * 0.06;
        const currentZA = arcZ_A;

        // Slot B approaches with reciprocal counter-arc
        const arcY_B = -Math.sin(collisionProgress * Math.PI) * 0.6;
        const arcZ_B = -Math.sin(collisionProgress * Math.PI) * 0.75;
        const currentXB = THREE.MathUtils.lerp(4.5, 0, t);
        const currentYB = arcY_B + Math.cos(elapsed * 3) * 0.06;
        const currentZB = arcZ_B;

        physGroupA.position.set(currentXA, currentYA, currentZA);
        physGroupB.position.set(currentXB, currentYB, currentZB);
        sciGroupA.position.set(currentXA, currentYA, currentZA);
        sciGroupB.position.set(currentXB, currentYB, currentZB);

        // State-specific physical dynamics:
        // Solids tumble/rotate into atomic alignment
        if (materialA?.state === 'Solid') {
          physGroupA.rotation.y += delta * (1.2 + collisionProgress * 3.5);
          physGroupA.rotation.z = Math.sin(collisionProgress * Math.PI) * 0.35;
        } else if (materialA?.state === 'Liquid') {
          // Meniscus stretch toward partner
          const stretch = 1.0 + collisionProgress * 0.4;
          physGroupA.scale.set(stretch, 1 / Math.sqrt(stretch), 1 / Math.sqrt(stretch));
        } else if (materialA?.state === 'Gas') {
          // Gases diffuse and swirl
          physGroupA.rotation.y += delta * 3.5;
        }

        if (materialB?.state === 'Solid') {
          physGroupB.rotation.y -= delta * (1.2 + collisionProgress * 3.5);
          physGroupB.rotation.z = -Math.sin(collisionProgress * Math.PI) * 0.35;
        } else if (materialB?.state === 'Liquid') {
          const stretch = 1.0 + collisionProgress * 0.4;
          physGroupB.scale.set(stretch, 1 / Math.sqrt(stretch), 1 / Math.sqrt(stretch));
        } else if (materialB?.state === 'Gas') {
          physGroupB.rotation.y -= delta * 3.5;
        }

        // Check reaction specificity: Metal + Oxygen oxidation or Sulfur tarnishing
        const isOxidationReaction = (materialA?.id === 'oxygen' && (materialB?.id === 'copper' || materialB?.id === 'iron' || materialB?.id === 'silver')) ||
                                    (materialB?.id === 'oxygen' && (materialA?.id === 'copper' || materialA?.id === 'iron' || materialA?.id === 'silver'));

        if (isOxidationReaction && collisionProgress > 0.35) {
          const oxProg = (collisionProgress - 0.35) / 0.65;
          physA?.setOxidationProgress?.(oxProg);
          physB?.setOxidationProgress?.(oxProg);
          sparkLight.intensity = oxProg * 7.5;
          sparkPointsMat.opacity = oxProg * 0.9;
          reactionSparks.rotation.y += delta * 5;
        } else {
          centerReactionLight.intensity = Math.pow(collisionProgress, 2) * 11;
        }

        // Near complete contact (interface transition)
        const isCloseToContact = collisionProgress > 0.85;
        if (isCloseToContact) {
          centerReactionLight.intensity = 14.0;
          sparkPointsMat.opacity = 0.95;
        }
      } 
      else if (simulationPhase === 'bonded' || simulationPhase === 'complete') {
        // Hide inputs and emerge synthesized product
        physGroupA.visible = false;
        physGroupB.visible = false;
        sciGroupA.visible = false;
        sciGroupB.visible = false;

        physGroupProduct.visible = !!result;
        sciGroupProduct.visible = !!molResult;

        physGroupProduct.rotation.y += delta * 0.6;
        sciGroupProduct.rotation.y += delta * 0.6;

        // Gentle stabilized product energy luminescence
        centerReactionLight.intensity = 3.2 + Math.sin(elapsed * 3) * 1.2;
        sparkLight.intensity = 0;
        sparkPointsMat.opacity = 0;
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

      renderer.dispose();
      scene.clear();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [materialA, materialB, result, isSimulating, simulationPhase, chamberView, scientificMode, isRotating, molA, molB, molResult]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#020617] border border-sky-900/50 shadow-inner group select-none">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left: 3D Reactor Status HUD */}
      <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
        <div className="flex items-center gap-2 bg-[#020617]/90 backdrop-blur-md px-3 py-1.5 rounded border border-sky-900/60 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="font-mono text-xs text-sky-200 font-bold tracking-wider uppercase">
            3D MATTER REACTOR
          </span>
          <span className="text-[10px] font-mono text-sky-400 uppercase font-bold">
            [{simulationPhase.toUpperCase()}]
          </span>
        </div>

        {/* Slot labels in 3D scene */}
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <div className="bg-[#020617]/80 px-2 py-0.5 rounded border border-sky-500/40 text-sky-300">
            SLOT A: {materialA ? `${materialA.name} (${materialA.symbol})` : 'EMPTY'}
          </div>
          <div className="bg-[#020617]/80 px-2 py-0.5 rounded border border-indigo-500/40 text-indigo-300">
            SLOT B: {materialB ? `${materialB.name} (${materialB.symbol})` : 'EMPTY'}
          </div>
        </div>
      </div>

      {/* Top Center: View Mode Toggle: [MATERIAL VIEW] vs [SCIENTIFIC VIEW] */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#020617]/95 backdrop-blur-md p-1 rounded-lg border border-sky-800/80 shadow-2xl z-10 text-[11px] font-mono">
        <button
          onClick={() => {
            labSound.playClick();
            setChamberView('material');
          }}
          className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 cursor-pointer ${
            chamberView === 'material'
              ? 'bg-amber-400 text-black font-bold shadow-[0_0_14px_rgba(251,191,36,0.5)]'
              : 'text-amber-400/90 hover:text-white hover:bg-amber-950/40'
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'عرض المادة' : 'MATERIAL VIEW'}</span>
        </button>

        <button
          onClick={() => {
            labSound.playClick();
            setChamberView('scientific');
          }}
          className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 cursor-pointer ${
            chamberView === 'scientific'
              ? 'bg-sky-500 text-black font-bold shadow-[0_0_14px_rgba(14,165,233,0.5)]'
              : 'text-sky-400 hover:text-white hover:bg-sky-950/40'
          }`}
        >
          <Atom className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'عرض علمي' : 'SCIENTIFIC VIEW'}</span>
        </button>
      </div>

      {/* Top Right: Interactive Camera & Spin Controls */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#020617]/90 backdrop-blur-md p-1 rounded border border-sky-900/60 shadow-lg">
        <button
          onClick={() => {
            labSound.playClick();
            controlsRef.current?.zoomIn();
          }}
          className="p-1.5 text-sky-400 hover:text-white hover:bg-sky-950 rounded transition cursor-pointer"
          title={lang === 'ar' ? 'تكبير' : 'Zoom In'}
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            labSound.playClick();
            controlsRef.current?.zoomOut();
          }}
          className="p-1.5 text-sky-400 hover:text-white hover:bg-sky-950 rounded transition cursor-pointer"
          title={lang === 'ar' ? 'تصغير' : 'Zoom Out'}
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            labSound.playClick();
            setIsRotating(prev => !prev);
          }}
          className={`p-1.5 rounded transition cursor-pointer ${isRotating ? 'text-black bg-sky-400' : 'text-sky-400 hover:text-white hover:bg-sky-950'}`}
          title={lang === 'ar' ? 'تبديل التدوير التلقائي' : 'Toggle Auto-Rotation'}
        >
          <RotateCw className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            labSound.playClick();
            controlsRef.current?.reset();
          }}
          className="p-1.5 text-sky-400 hover:text-white hover:bg-sky-950 rounded transition cursor-pointer"
          title={lang === 'ar' ? 'إعادة ضبط الكاميرا' : 'Reset Camera View'}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Top Right: Real Material Specimen Preview HUD */}
      <div className="absolute top-14 right-3 z-10 flex flex-col items-end gap-2 pointer-events-auto">
        {result ? (
          <div className="flex flex-col items-end">
            <span className="mb-1 text-[9px] font-mono font-semibold tracking-wider text-emerald-400 uppercase">
              {lang === 'ar' ? 'المركب الناتج' : 'Synthesized Product'}
            </span>
            <RealMaterialPreviewCard
              material={{
                id: result.id,
                name: result.outputName,
                symbol: result.outputFormula.split('→')[1]?.trim().split(' ')[0] || result.outputName,
                state: (result.outputState as any) || 'Solid'
              } as Material}
              className="w-36 shadow-2xl border-emerald-500/40"
              onInspect={() => setChamberView('material')}
              isInspecting={chamberView === 'material'}
              lang={lang}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-1.5 items-end">
            {materialA && (
              <RealMaterialPreviewCard
                material={materialA}
                className="w-32 shadow-xl"
                onInspect={() => setChamberView('material')}
                isInspecting={chamberView === 'material'}
                lang={lang}
              />
            )}
            {materialB && (
              <RealMaterialPreviewCard
                material={materialB}
                className="w-32 shadow-xl"
                onInspect={() => setChamberView('material')}
                isInspecting={chamberView === 'material'}
                lang={lang}
              />
            )}
          </div>
        )}
      </div>

      {/* Bottom Left: Scientific Sub-Modes (Ball & Stick, Space Filling, Bohr Shells) */}
      {chamberView === 'scientific' && (
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-[#020617]/90 backdrop-blur-md p-1 rounded border border-sky-900/60 text-[10px] font-mono">
          <button
            onClick={() => {
              labSound.playClick();
              setScientificMode('ball_stick');
            }}
            className={`px-2 py-1 rounded transition cursor-pointer ${
              scientificMode === 'ball_stick' ? 'bg-sky-500 text-black font-bold' : 'text-sky-400 hover:bg-sky-950'
            }`}
          >
            {lang === 'ar' ? 'كرات وعصي' : 'Ball & Stick'}
          </button>
          <button
            onClick={() => {
              labSound.playClick();
              setScientificMode('space_filling');
            }}
            className={`px-2 py-1 rounded transition cursor-pointer ${
              scientificMode === 'space_filling' ? 'bg-sky-500 text-black font-bold' : 'text-sky-400 hover:bg-sky-950'
            }`}
          >
            {lang === 'ar' ? 'فان دير فالس' : 'Van der Waals'}
          </button>
          <button
            onClick={() => {
              labSound.playClick();
              setScientificMode('orbitals');
            }}
            className={`px-2 py-1 rounded transition cursor-pointer ${
              scientificMode === 'orbitals' ? 'bg-sky-500 text-black font-bold' : 'text-sky-400 hover:bg-sky-950'
            }`}
          >
            {lang === 'ar' ? 'مدارات بور' : 'Bohr Orbitals'}
          </button>
        </div>
      )}

      {/* Bottom Left (in Material View): Physical Specimen Info Legend */}
      {chamberView === 'material' && (
        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-[#020617]/90 backdrop-blur-md px-2.5 py-1.5 rounded border border-amber-900/60 text-[10px] font-mono text-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{lang === 'ar' ? 'محاكاة للمادة الفيزيائية الحقيقية: الحجم الماكروسكوبي، البريق، والتوتر السطحي' : 'Real physical matter rendering: macroscopic volume, luster & surface tension'}</span>
        </div>
      )}

      {/* Bottom Right: Synthesized Product HUD if available */}
      {result && (simulationPhase === 'bonded' || simulationPhase === 'complete') && (
        <div className="absolute bottom-3 right-3 bg-[#020617]/95 backdrop-blur-md px-3.5 py-2 rounded-lg border border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)] text-right font-mono">
          <div className="text-[9px] text-amber-400 uppercase tracking-wider font-bold">{lang === 'ar' ? 'المادة المصنعة:' : 'Synthesized Matter:'}</div>
          <div className="text-sm text-white font-bold">{result.outputName}</div>
          <div className="text-[10px] text-sky-400">{result.outputFormula.split('→')[1]?.trim() || ''}</div>
        </div>
      )}

      {/* Hover Atom Popover HUD */}
      {hoveredAtom && hoveredPos && chamberView === 'scientific' && (
        <div
          className="absolute z-20 pointer-events-none bg-[#020617]/95 border border-sky-400 rounded-lg p-2.5 shadow-[0_0_25px_rgba(14,165,233,0.4)] text-xs font-mono backdrop-blur-md animate-fadeIn"
          style={{
            left: Math.min(hoveredPos.x + 10, (mountRef.current?.clientWidth || 300) - 170),
            top: Math.max(hoveredPos.y - 75, 10)
          }}
        >
          <div className="flex items-center gap-2 pb-1 border-b border-sky-900/60">
            <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: hoveredAtom.color }} />
            <span className="font-bold text-white text-xs">{hoveredAtom.name} ({hoveredAtom.element})</span>
          </div>
          <div className="grid grid-cols-2 gap-x-2 text-[10px] text-sky-300 mt-1">
            <div>Z: <span className="text-white font-bold">{hoveredAtom.atomicNumber || 'N/A'}</span></div>
            <div>Valence: <span className="text-sky-400 font-bold">{hoveredAtom.valenceElectrons}</span></div>
            <div>Electroneg: <span className="text-sky-200">{hoveredAtom.electronegativity}</span></div>
            <div>Charge: <span className="text-amber-300">{hoveredAtom.charge || '0'}</span></div>
          </div>
        </div>
      )}
    </div>
  );
};
