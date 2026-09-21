import * as THREE from 'three';
import { INITIAL_MATERIALS } from '../data/materialsData';
import { getMaterialVisualProfile } from '../data/materialVisualProfiles';
import { Material, ReactionResult } from '../types';
import { KNOWN_REACTIONS } from '../data/reactionsData';

export interface PhysicalMeshResult {
  group: THREE.Group;
  update?: (delta: number, elapsed: number, env?: { temperature: number; pressure: number }) => void;
  setOxidationProgress?: (progress: number) => void;
}

/**
 * Creates an authentic 3D metal ingot / bar with chamfered edges,
 * beveled trapezoidal bullion geometry, and stamped hallmark relief.
 */
function createMetalIngotMesh(
  metalId: string,
  color: number,
  metalness: number,
  roughness: number,
  specularColor?: number,
  scale = 1.0
): { group: THREE.Group; material: THREE.MeshStandardMaterial } {
  const ingotGroup = new THREE.Group();

  const l = 2.5 * scale;
  const w = 1.35 * scale;
  const h = 0.65 * scale;

  // Bullion shape with rounded trapezoid profile
  const shape = new THREE.Shape();
  const halfL = l / 2;
  const halfW = w / 2;
  shape.moveTo(-halfL, -halfW);
  shape.lineTo(halfL, -halfW);
  shape.lineTo(halfL, halfW);
  shape.lineTo(-halfL, halfW);
  shape.closePath();

  const extrudeSettings = {
    depth: h,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.09 * scale,
    bevelThickness: 0.09 * scale
  };
  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geo.center();

  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness,
    roughness,
    ...(specularColor ? { emissive: new THREE.Color(color), emissiveIntensity: 0.06 } : {})
  });

  const ingotMesh = new THREE.Mesh(geo, mat);
  ingotGroup.add(ingotMesh);

  // Stamped hallmark indentation on top surface
  const stampGeo = new THREE.BoxGeometry(1.3 * scale, 0.03 * scale, 0.6 * scale);
  const stampMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color).clone().offsetHSL(0, 0, -0.15),
    metalness: Math.min(1.0, metalness + 0.05),
    roughness: Math.min(1.0, roughness + 0.15)
  });
  const stampMesh = new THREE.Mesh(stampGeo, stampMat);
  stampMesh.position.y = (h / 2) + 0.09 * scale;
  ingotGroup.add(stampMesh);

  // Precision edge highlight lines
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geo, 30),
    new THREE.LineBasicMaterial({
      color: specularColor ?? 0xffffff,
      transparent: true,
      opacity: 0.45
    })
  );
  ingotMesh.add(edges);

  return { group: ingotGroup, material: mat };
}

/**
 * Creates an authentic 3D powder pile (conical Gaussian mound with micro-particles).
 */
function createPowderPileMesh(color: number, scale = 1.0): THREE.Group {
  const powderGroup = new THREE.Group();

  const moundGeo = new THREE.ConeGeometry(1.8 * scale, 1.1 * scale, 32);
  const pos = moundGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const r = Math.sqrt(x * x + z * z);
    const naturalY = Math.exp(-(r * r) / (1.3 * scale * scale)) * 1.25 * scale - 0.4 * scale;
    pos.setY(i, (y + naturalY) * 0.5);
  }
  moundGeo.computeVertexNormals();

  const moundMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.94,
    metalness: 0.02
  });
  const mound = new THREE.Mesh(moundGeo, moundMat);
  powderGroup.add(mound);

  // Loose surface micro-particles
  const pCount = 110;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    const ang = Math.random() * Math.PI * 2;
    const rad = Math.pow(Math.random(), 0.65) * 1.65 * scale;
    const h = Math.exp(-(rad * rad) / (1.3 * scale * scale)) * 1.25 * scale - 0.35 * scale + (Math.random() * 0.08 * scale);
    pPos[i * 3] = Math.cos(ang) * rad;
    pPos[i * 3 + 1] = h;
    pPos[i * 3 + 2] = Math.sin(ang) * rad;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({
    color: new THREE.Color(color).clone().offsetHSL(0, 0, 0.09),
    size: 0.08 * scale,
    transparent: true,
    opacity: 0.85
  });
  const particles = new THREE.Points(pGeo, pMat);
  powderGroup.add(particles);

  return powderGroup;
}

/**
 * Creates an authentic 3D granular pile with individual multi-faceted grains.
 */
function createGranularPileMesh(scale = 1.0, isStardust = false): THREE.Group {
  const gGroup = new THREE.Group();
  const colors = isStardust
    ? [0xf472b6, 0xc084fc, 0xe879f9, 0x38bdf8, 0xffffff]
    : [0xfde047, 0xeab308, 0xfef08a, 0xd97706, 0xfef9c3, 0xb45309];

  // Base mound
  const baseGeo = new THREE.ConeGeometry(1.6 * scale, 0.75 * scale, 24);
  const baseMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(colors[1]),
    roughness: 0.75,
    metalness: isStardust ? 0.4 : 0.05
  });
  const baseMound = new THREE.Mesh(baseGeo, baseMat);
  baseMound.position.y = -0.2 * scale;
  gGroup.add(baseMound);

  // Clustered faceted grains
  const grainCount = 36;
  for (let i = 0; i < grainCount; i++) {
    const r = (0.16 + Math.random() * 0.26) * scale;
    const grainGeo = new THREE.DodecahedronGeometry(r, 0);
    const col = colors[i % colors.length];
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(col),
      roughness: 0.35,
      transmission: isStardust ? 0.6 : 0.3,
      transparent: true,
      opacity: 0.95
    });
    const grain = new THREE.Mesh(grainGeo, mat);
    const dist = Math.pow(Math.random(), 0.5) * 1.45 * scale;
    const theta = Math.random() * Math.PI * 2;
    const y = Math.max(0, (1.1 * scale - dist * 0.65)) + (Math.random() - 0.5) * 0.2 * scale;
    grain.position.set(dist * Math.cos(theta), y - 0.25 * scale, dist * Math.sin(theta));
    grain.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    gGroup.add(grain);
  }

  return gGroup;
}

/**
 * Creates an authentic 3D fluid liquid volume / droplet.
 */
function createLiquidDropletMesh(color: number, scale = 1.0, isMercury = false) {
  const liquidGroup = new THREE.Group();

  const sphereGeo = new THREE.SphereGeometry(1.8 * scale, 36, 36);
  const pos = sphereGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const x = pos.getX(i);
    const z = pos.getZ(i);

    if (y > 0) {
      const factor = 1 - (y / (1.8 * scale)) * 0.35;
      pos.setX(i, x * factor);
      pos.setZ(i, z * factor);
      pos.setY(i, y * 1.25);
    } else {
      pos.setY(i, y * 0.85);
      pos.setX(i, x * 1.12);
      pos.setZ(i, z * 1.12);
    }
  }
  sphereGeo.computeVertexNormals();

  let liquidMat: THREE.Material;
  if (isMercury) {
    liquidMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 1.0,
      roughness: 0.04,
      emissive: new THREE.Color(0x334155),
      emissiveIntensity: 0.1
    });
  } else {
    liquidMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      transmission: 0.95,
      opacity: 1,
      transparent: true,
      roughness: 0.03,
      ior: 1.333,
      thickness: 2.2,
      specularIntensity: 1.0,
      clearcoat: 1.0
    });
  }

  const dropMesh = new THREE.Mesh(sphereGeo, liquidMat);
  liquidGroup.add(dropMesh);

  // Satellite micro droplet
  const satGeo = new THREE.SphereGeometry(0.42 * scale, 20, 20);
  const satMesh = new THREE.Mesh(satGeo, liquidMat);
  satMesh.position.set(2.0 * scale, -0.8 * scale, 0.6 * scale);
  liquidGroup.add(satMesh);

  const update = (_delta: number, elapsed: number) => {
    const fluid = Math.sin(elapsed * 2.8) * 0.03;
    dropMesh.scale.set(1.0 + fluid, 1.0 - fluid, 1.0 + fluid);
  };

  return { group: liquidGroup, update };
}

/**
 * Creates an authentic 3D volumetric gas cloud with floating molecules.
 */
function createGasCloudMesh(color: number, scale = 1.0, moleculeType: 'diatomic' | 'monatomic' | 'triatomic' = 'diatomic') {
  const gasGroup = new THREE.Group();

  const glowMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.18
  });
  const glowSphere = new THREE.Mesh(new THREE.SphereGeometry(2.3 * scale, 24, 24), glowMat);
  gasGroup.add(glowSphere);

  const molecules: { group: THREE.Group; vel: THREE.Vector3; rotVel: THREE.Vector3 }[] = [];
  const atomMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.5,
    roughness: 0.2
  });

  const count = moleculeType === 'monatomic' ? 14 : 9;
  for (let i = 0; i < count; i++) {
    const mol = new THREE.Group();

    if (moleculeType === 'monatomic') {
      const atom = new THREE.Mesh(new THREE.SphereGeometry(0.32 * scale, 16, 16), atomMat);
      mol.add(atom);
    } else if (moleculeType === 'triatomic') {
      const center = new THREE.Mesh(new THREE.SphereGeometry(0.24 * scale, 14, 14), atomMat);
      const left = new THREE.Mesh(new THREE.SphereGeometry(0.2 * scale, 14, 14), atomMat);
      const right = new THREE.Mesh(new THREE.SphereGeometry(0.2 * scale, 14, 14), atomMat);
      left.position.x = -0.28 * scale;
      right.position.x = 0.28 * scale;
      mol.add(center, left, right);
    } else {
      // Diatomic pair
      const a1 = new THREE.Mesh(new THREE.SphereGeometry(0.25 * scale, 14, 14), atomMat);
      const a2 = new THREE.Mesh(new THREE.SphereGeometry(0.25 * scale, 14, 14), atomMat);
      a1.position.x = -0.2 * scale;
      a2.position.x = 0.2 * scale;
      const bond = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05 * scale, 0.05 * scale, 0.4 * scale, 6),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      bond.rotation.z = Math.PI / 2;
      mol.add(a1, a2, bond);
    }

    mol.position.set(
      (Math.random() - 0.5) * 2.6 * scale,
      (Math.random() - 0.5) * 2.6 * scale,
      (Math.random() - 0.5) * 2.6 * scale
    );
    gasGroup.add(mol);

    molecules.push({
      group: mol,
      vel: new THREE.Vector3((Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.9),
      rotVel: new THREE.Vector3((Math.random() - 0.5) * 2.0, (Math.random() - 0.5) * 2.0, 0)
    });
  }

  const update = (delta: number, elapsed: number, env?: { temperature: number; pressure: number }) => {
    const tempK = (env?.temperature ?? 25) + 273.15;
    const pressAtm = env?.pressure ?? 1.0;
    const speedScale = Math.sqrt(tempK / 298.15);
    const containmentRadius = (2.0 * scale) * Math.max(0.65, Math.min(1.4, Math.pow(1.0 / pressAtm, 0.2)));

    molecules.forEach(m => {
      m.group.position.addScaledVector(m.vel, delta * speedScale);
      m.group.rotation.x += m.rotVel.x * delta * speedScale;
      m.group.rotation.y += m.rotVel.y * delta * speedScale;
      if (m.group.position.length() > containmentRadius) {
        m.vel.reflect(m.group.position.clone().normalize().negate());
      }
    });
    const breathe = 1 + Math.sin(elapsed * (1.5 * speedScale)) * 0.05;
    glowSphere.scale.set(breathe, breathe, breathe);
  };

  return { group: gasGroup, update };
}

/**
 * Creates an authentic physical 3D specimen for any material in MIXON.
 * Accurately routes to:
 * - Metals: Machined Ingot / Bullion Bar
 * - Powders: Fine conical powder mound
 * - Granular: Clustered faceted granular pile
 * - Crystals: Faceted hexagonal/cubic/octahedral formations
 * - Liquids: Refractive fluid droplet with surface tension
 * - Gases: Volumetric cloud with animated floating molecules
 * - Solids: Polished optical glass or graphite block
 */
export function createPhysicalMaterialMesh(materialId: string, scale = 1.0): PhysicalMeshResult {
  const group = new THREE.Group();
  group.name = `physical_${materialId}`;
  const key = materialId.toLowerCase().trim();
  const profile = getMaterialVisualProfile(key);

  switch (key) {
    // =========================================================================
    // 1. METALS & SEMICONDUCTORS (Each metal has its distinct authentic shape)
    // =========================================================================
    case 'iron': {
      // Forged industrial steel billet with brushed grain, magnetic lattice lines and Fe mark
      const geo = new THREE.BoxGeometry(2.4 * scale, 0.95 * scale, 1.35 * scale);
      const ironMat = new THREE.MeshStandardMaterial({
        color: 0x475569,
        metalness: 0.88,
        roughness: 0.42,
        emissive: 0x0f172a,
        emissiveIntensity: 0.05
      });
      const mesh = new THREE.Mesh(geo, ironMat);
      group.add(mesh);

      // Magnetic lattice directional lines on top face
      const linePts: number[] = [];
      for (let x = -0.95 * scale; x <= 0.95 * scale; x += 0.32 * scale) {
        linePts.push(x, 0.49 * scale, -0.5 * scale, x, 0.49 * scale, 0.5 * scale);
      }
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePts, 3));
      const lineMat = new THREE.LineBasicMaterial({ color: 0x94a3b8, opacity: 0.55, transparent: true });
      group.add(new THREE.LineSegments(lineGeo, lineMat));

      // Precision chamfer edges
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0x94a3b8, opacity: 0.4, transparent: true }));
      group.add(edges);

      const setOxidationProgress = (prog: number) => {
        const rustColor = new THREE.Color(0x991b1b);
        ironMat.color.lerp(rustColor, prog);
        ironMat.metalness = THREE.MathUtils.lerp(0.88, 0.15, prog);
        ironMat.roughness = THREE.MathUtils.lerp(0.42, 0.88, prog);
      };

      const update = (_delta: number, _elapsed: number, env?: { temperature: number }) => {
        const temp = env?.temperature ?? 25;
        if (temp > 550) {
          const heat = Math.min(1.0, (temp - 550) / 450);
          ironMat.emissive.setRGB(0.9 * heat, 0.15 * heat, 0.02 * heat);
          ironMat.emissiveIntensity = heat * 2.2;
        } else {
          ironMat.emissive.setHex(0x0f172a);
          ironMat.emissiveIntensity = 0.05;
        }
      };

      return { group, update, setOxidationProgress };
    }

    case 'copper': {
      // Warm burnished bullion bar with stepped bevels and subtle patina oxide edge
      const baseGeo = new THREE.BoxGeometry(2.4 * scale, 0.65 * scale, 1.35 * scale);
      const topGeo = new THREE.BoxGeometry(2.0 * scale, 0.25 * scale, 1.05 * scale);
      const copperMat = new THREE.MeshStandardMaterial({
        color: 0xc2410c,
        metalness: 0.94,
        roughness: 0.22,
        emissive: 0xc2410c,
        emissiveIntensity: 0.06
      });
      const baseMesh = new THREE.Mesh(baseGeo, copperMat);
      const topMesh = new THREE.Mesh(topGeo, copperMat);
      topMesh.position.y = 0.45 * scale;
      group.add(baseMesh, topMesh);

      // Subtle green patina accent ring (CuCO3)
      const patinaMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.75, metalness: 0.1 });
      const patinaRim = new THREE.Mesh(new THREE.TorusGeometry(0.35 * scale, 0.04 * scale, 8, 24), patinaMat);
      patinaRim.rotation.x = Math.PI / 2;
      patinaRim.position.set(0, 0.58 * scale, 0);
      group.add(patinaRim);

      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(baseGeo), new THREE.LineBasicMaterial({ color: 0xfdba74, opacity: 0.5, transparent: true }));
      group.add(edges);

      const setOxidationProgress = (prog: number) => {
        const targetColor = new THREE.Color(0x1e293b);
        copperMat.color.lerp(targetColor, prog);
        copperMat.metalness = THREE.MathUtils.lerp(0.94, 0.2, prog);
        copperMat.roughness = THREE.MathUtils.lerp(0.22, 0.82, prog);
      };

      const update = (_delta: number, _elapsed: number, env?: { temperature: number }) => {
        const temp = env?.temperature ?? 25;
        if (temp > 650) {
          const heat = Math.min(1.0, (temp - 650) / 450);
          copperMat.emissive.setRGB(0.95 * heat, 0.22 * heat * heat, 0.03 * heat * heat);
          copperMat.emissiveIntensity = 0.1 + heat * 2.0;
        } else {
          copperMat.emissive.setHex(0xc2410c);
          copperMat.emissiveIntensity = 0.06;
        }
      };

      return { group, update, setOxidationProgress };
    }

    case 'gold': {
      // 24K mirror-beveled bullion bar stamped Au 999.9
      const { group: ingot } = createMetalIngotMesh('gold', 0xf59e0b, 0.98, 0.12, 0xfef08a, scale);
      group.add(ingot);
      return { group };
    }

    case 'silver': {
      // Ultra-radiant cast bar with stepped rim stamped 999 Fine Ag and icy white specular reflection
      const { group: ingot } = createMetalIngotMesh('silver', 0xe2e8f0, 0.98, 0.12, 0xffffff, scale);
      group.add(ingot);
      return { group };
    }

    case 'titanium': {
      // Machined cylindrical aerospace billet with milled cooling rings and iridescent sheen
      const cylGeo = new THREE.CylinderGeometry(0.95 * scale, 0.95 * scale, 2.3 * scale, 32);
      const tiMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.92,
        roughness: 0.26,
        emissive: 0x0284c7,
        emissiveIntensity: 0.05
      });
      const cyl = new THREE.Mesh(cylGeo, tiMat);
      cyl.rotation.z = Math.PI / 2;
      group.add(cyl);

      // Milled cooling rings
      const ringGeo = new THREE.TorusGeometry(0.98 * scale, 0.035 * scale, 8, 32);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.95, roughness: 0.15 });
      for (const pos of [-0.6 * scale, 0, 0.6 * scale]) {
        const r = new THREE.Mesh(ringGeo, ringMat);
        r.rotation.y = Math.PI / 2;
        r.position.x = pos;
        group.add(r);
      }

      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(cylGeo, 30), new THREE.LineBasicMaterial({ color: 0x38bdf8, opacity: 0.6, transparent: true }));
      group.add(edges);
      return { group };
    }

    case 'aluminum': {
      // Hexagonal extruded profile bar with satin matte anodized oxide surface
      const hexGeo = new THREE.CylinderGeometry(1.05 * scale, 1.05 * scale, 2.4 * scale, 6);
      const alMat = new THREE.MeshStandardMaterial({
        color: 0xcbd5e1,
        metalness: 0.86,
        roughness: 0.32
      });
      const hex = new THREE.Mesh(hexGeo, alMat);
      hex.rotation.z = Math.PI / 2;
      group.add(hex);

      // Central core bore
      const coreGeo = new THREE.CylinderGeometry(0.4 * scale, 0.4 * scale, 2.42 * scale, 6);
      const coreMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.7, metalness: 0.3 });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.rotation.z = Math.PI / 2;
      group.add(core);

      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(hexGeo), new THREE.LineBasicMaterial({ color: 0xf1f5f9, opacity: 0.65, transparent: true }));
      group.add(edges);
      return { group };
    }

    case 'zinc': {
      // Spangled plate with hexagonal dendritic crystal grain boundaries
      const plateGeo = new THREE.CylinderGeometry(1.5 * scale, 1.5 * scale, 0.28 * scale, 8);
      const znMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.86,
        roughness: 0.36
      });
      const plate = new THREE.Mesh(plateGeo, znMat);
      group.add(plate);

      const wireGeo = new THREE.WireframeGeometry(new THREE.CylinderGeometry(1.48 * scale, 1.48 * scale, 0.3 * scale, 6));
      const wire = new THREE.LineSegments(wireGeo, new THREE.LineBasicMaterial({ color: 0xe2e8f0, opacity: 0.6, transparent: true }));
      group.add(wire);
      return { group };
    }

    case 'magnesium': {
      // Ribbed cylindrical extruded rod with lathe rings and brilliant silvery-white sheen
      const rodGeo = new THREE.CylinderGeometry(0.85 * scale, 0.85 * scale, 2.4 * scale, 24);
      const mgMat = new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        metalness: 0.84,
        roughness: 0.28,
        emissive: 0xffffff,
        emissiveIntensity: 0.05
      });
      const rod = new THREE.Mesh(rodGeo, mgMat);
      rod.rotation.z = Math.PI / 2;
      group.add(rod);

      for (let x = -0.9 * scale; x <= 0.9 * scale; x += 0.3 * scale) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.88 * scale, 0.02 * scale, 6, 24),
          new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.1 })
        );
        ring.rotation.y = Math.PI / 2;
        ring.position.x = x;
        group.add(ring);
      }
      return { group };
    }

    case 'sodium': {
      // Soft alkali metal cube with fresh knife-cut diagonal slice exposing lustrous core
      const cubeGeo = new THREE.BoxGeometry(1.6 * scale, 1.6 * scale, 1.6 * scale);
      const rindMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, roughness: 0.65, metalness: 0.5 });
      const cube = new THREE.Mesh(cubeGeo, rindMat);
      group.add(cube);

      const cutGeo = new THREE.CylinderGeometry(0.85 * scale, 0.85 * scale, 0.05 * scale, 12);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        metalness: 0.92,
        roughness: 0.15,
        emissive: 0xffffff,
        emissiveIntensity: 0.08
      });
      const cut = new THREE.Mesh(cutGeo, coreMat);
      cut.position.set(0.6 * scale, 0.6 * scale, 0.6 * scale);
      cut.rotation.set(Math.PI / 4, Math.PI / 4, 0);
      group.add(cut);
      return { group };
    }

    case 'potassium': {
      // Soft alkali cube with delicate lilac-lavender metallic sheen and beveled facets
      const cubeGeo = new THREE.BoxGeometry(1.5 * scale, 1.5 * scale, 1.5 * scale);
      const kMat = new THREE.MeshStandardMaterial({
        color: 0xe0e7ff,
        metalness: 0.75,
        roughness: 0.45,
        emissive: 0xc4b5fd,
        emissiveIntensity: 0.08
      });
      const cube = new THREE.Mesh(cubeGeo, kMat);
      group.add(cube);

      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(cubeGeo), new THREE.LineBasicMaterial({ color: 0xddd6fe, opacity: 0.6, transparent: true }));
      group.add(edges);
      return { group };
    }

    case 'calcium': {
      // Nodular granular aggregate of interlocking metallic spheres with warm yellowish cast
      const caMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.80, roughness: 0.35 });
      const nodules = [
        [0, 0, 0, 0.85],
        [0.65, 0.3, 0.2, 0.6],
        [-0.55, -0.2, 0.3, 0.58],
        [0.2, -0.5, -0.4, 0.52],
        [-0.3, 0.45, -0.3, 0.48]
      ];
      for (const [x, y, z, r] of nodules) {
        const nodule = new THREE.Mesh(new THREE.DodecahedronGeometry(r * scale, 1), caMat);
        nodule.position.set(x * scale, y * scale, z * scale);
        group.add(nodule);
      }
      return { group };
    }

    case 'silicon': {
      // Polished semiconductor wafer disc with etched microchip grid pattern and mirror reflectivity
      const waferGeo = new THREE.CylinderGeometry(1.6 * scale, 1.6 * scale, 0.12 * scale, 8);
      const siMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.75,
        roughness: 0.15,
        emissive: 0x0f172a,
        emissiveIntensity: 0.05
      });
      const wafer = new THREE.Mesh(waferGeo, siMat);
      group.add(wafer);

      const gridPts: number[] = [];
      for (let i = -1.1 * scale; i <= 1.1 * scale; i += 0.38 * scale) {
        gridPts.push(i, 0.07 * scale, -1.1 * scale, i, 0.07 * scale, 1.1 * scale);
        gridPts.push(-1.1 * scale, 0.07 * scale, i, 1.1 * scale, 0.07 * scale, i);
      }
      const gridGeo = new THREE.BufferGeometry();
      gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(gridPts, 3));
      const gridMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, opacity: 0.7, transparent: true });
      group.add(new THREE.LineSegments(gridGeo, gridMat));

      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(waferGeo), new THREE.LineBasicMaterial({ color: 0x60a5fa, opacity: 0.75, transparent: true }));
      group.add(edges);
      return { group };
    }

    // =========================================================================
    // 2. CRYSTALS & MINERALS (Distinct crystal systems)
    // =========================================================================
    case 'sulfur': {
      // Vivid canary-yellow cluster of interlocking orthorhombic dipyramidal crystals
      const sMat = new THREE.MeshStandardMaterial({
        color: 0xfacc15,
        roughness: 0.4,
        metalness: 0.05,
        emissive: 0xca8a04,
        emissiveIntensity: 0.08
      });
      const crystals = [
        { s: 1.15, pos: [0, 0, 0], rot: [0.2, 0.3, 0] },
        { s: 0.8, pos: [0.75, 0.3, 0.2], rot: [0.6, -0.4, 0.3] },
        { s: 0.7, pos: [-0.65, 0.2, -0.3], rot: [-0.3, 0.7, -0.2] },
        { s: 0.55, pos: [0.1, -0.65, 0.4], rot: [0.8, 0.2, 0.5] }
      ];
      for (const c of crystals) {
        const geo = new THREE.OctahedronGeometry(c.s * scale, 0);
        const m = new THREE.Mesh(geo, sMat);
        m.position.set(c.pos[0] * scale, c.pos[1] * scale, c.pos[2] * scale);
        m.rotation.set(c.rot[0], c.rot[1], c.rot[2]);
        group.add(m);

        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0xfef08a, opacity: 0.65, transparent: true }));
        m.add(edges);
      }
      return { group };
    }

    case 'quartz': {
      // Hexagonal prism terminated with 6-sided pyramid cap and optical internal striations
      const qtzMat = new THREE.MeshPhysicalMaterial({
        color: 0xe0e7ff,
        transmission: 0.92,
        transparent: true,
        opacity: 0.95,
        roughness: 0.04,
        ior: 1.54,
        thickness: 2.2,
        clearcoat: 1.0
      });
      const prismGeo = new THREE.CylinderGeometry(1.15 * scale, 1.15 * scale, 2.5 * scale, 6);
      const prism = new THREE.Mesh(prismGeo, qtzMat);
      group.add(prism);

      const capGeo = new THREE.ConeGeometry(1.15 * scale, 1.25 * scale, 6);
      const cap = new THREE.Mesh(capGeo, qtzMat);
      cap.position.y = 1.88 * scale;
      group.add(cap);

      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(prismGeo), new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.7, transparent: true }));
      prism.add(edges);
      return { group };
    }

    case 'diamond': {
      // Brilliant octahedral crystal with ultra-high refraction (ior 2.42) and dispersion flashes
      const diaMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.98,
        transparent: true,
        opacity: 1.0,
        roughness: 0.01,
        ior: 2.42,
        clearcoat: 1.0,
        specularColor: new THREE.Color(0x38bdf8)
      });
      const geo = new THREE.OctahedronGeometry(1.8 * scale, 0);
      const mesh = new THREE.Mesh(geo, diaMat);
      group.add(mesh);

      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.85 }));
      mesh.add(edges);

      const update = (_delta: number, elapsed: number) => {
        group.rotation.y = elapsed * 0.5;
      };
      return { group, update };
    }

    case 'salt': {
      // Interlocking cluster of translucent cubic halite crystals (distinct 90° angles)
      const saltMat = new THREE.MeshPhysicalMaterial({
        color: 0xf8fafc,
        transmission: 0.75,
        transparent: true,
        opacity: 0.95,
        roughness: 0.12,
        ior: 1.54
      });
      const cubes = [
        { s: [1.6, 1.6, 1.6], pos: [0, 0, 0] },
        { s: [1.1, 1.1, 1.1], pos: [0.85, 0.45, 0.45] },
        { s: [0.85, 0.85, 0.85], pos: [-0.7, -0.3, 0.5] }
      ];
      for (const c of cubes) {
        const cGeo = new THREE.BoxGeometry(c.s[0] * scale, c.s[1] * scale, c.s[2] * scale);
        const m = new THREE.Mesh(cGeo, saltMat);
        m.position.set(c.pos[0] * scale, c.pos[1] * scale, c.pos[2] * scale);
        group.add(m);

        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(cGeo), new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.6, transparent: true }));
        m.add(edges);
      }
      return { group };
    }

    // =========================================================================
    // 3. CARBON ALLOTROPES, GLASS & POWDERS
    // =========================================================================
    case 'carbon': {
      // Stacked hexagonal graphene / graphite planar sheets with dark charcoal texture
      const cMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.75,
        metalness: 0.25
      });
      for (let i = 0; i < 3; i++) {
        const sheet = new THREE.Mesh(new THREE.CylinderGeometry(1.5 * scale, 1.5 * scale, 0.22 * scale, 6), cMat);
        sheet.position.y = (i - 1) * 0.48 * scale;
        group.add(sheet);
      }
      return { group };
    }

    case 'glass': {
      // Beveled optical glass rectangular block with internal refraction
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xe0f2fe,
        transmission: 0.95,
        transparent: true,
        opacity: 1.0,
        roughness: 0.03,
        ior: 1.52,
        clearcoat: 1.0
      });
      const geo = new THREE.BoxGeometry(2.4 * scale, 1.4 * scale, 1.4 * scale);
      const mesh = new THREE.Mesh(geo, glassMat);
      group.add(mesh);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 }));
      mesh.add(edges);
      return { group };
    }

    case 'sand': {
      // Natural dune mound of varied translucent quartz grains with individual sparkle
      const sand = createGranularPileMesh(scale, false);
      group.add(sand);
      return { group };
    }

    case 'baking_soda': {
      // Fine white powdery Gaussian mound with micro-particles
      const powder = createPowderPileMesh(0xf8fafc, scale);
      group.add(powder);
      return { group };
    }

    case 'cosmic_stardust': {
      // Shimmering nebular cluster of multi-colored pre-solar mineral crystals and diamond dust
      const stardust = createGranularPileMesh(scale, true);
      group.add(stardust);
      return { group };
    }

    // =========================================================================
    // 4. LIQUIDS (Different surface tensions, viscosities, and refractions)
    // =========================================================================
    case 'water': {
      // Polar fluid droplet with dynamic meniscus waves and caustic highlights
      const res = createLiquidDropletMesh(0x38bdf8, scale, false);
      group.add(res.group);
      return { group, update: res.update };
    }

    case 'mercury': {
      // Quicksilver liquid metal droplet with near-spherical surface tension and pure mirror reflection
      const res = createLiquidDropletMesh(0xe2e8f0, scale, true);
      group.add(res.group);
      return { group, update: res.update };
    }

    case 'ethanol': {
      // Clear fluid droplet with low contact angle and delicate capillary shimmer
      const res = createLiquidDropletMesh(0x93c5fd, scale, false);
      group.add(res.group);
      return { group, update: res.update };
    }

    // =========================================================================
    // 5. GASES (Distinct colors, molecular bonds and diffusion speeds)
    // =========================================================================
    case 'oxygen': {
      // Cyan atmospheric cloud with floating diatomic O=O molecules
      const res = createGasCloudMesh(0x0ea5e9, scale, 'diatomic');
      group.add(res.group);
      return { group, update: res.update };
    }

    case 'hydrogen': {
      // Luminous electric-blue cloud of ultra-light fast vibrating H-H pairs
      const res = createGasCloudMesh(0x60a5fa, scale, 'diatomic');
      group.add(res.group);
      return { group, update: res.update };
    }

    case 'nitrogen': {
      // Deep atmospheric indigo cloud of tightly bound N≡N triple-bonded molecules
      const res = createGasCloudMesh(0x6366f1, scale, 'diatomic');
      group.add(res.group);
      return { group, update: res.update };
    }

    case 'chlorine': {
      // Distinctive chartreuse yellow-green dense halogen gas fog with heavy particulate drift
      const res = createGasCloudMesh(0xa3e635, scale, 'diatomic');
      group.add(res.group);
      return { group, update: res.update };
    }

    case 'helium': {
      // Gentle warm peach-amber glowing cloud with buoyant monatomic spheres
      const res = createGasCloudMesh(0xfb923c, scale, 'monatomic');
      group.add(res.group);
      return { group, update: res.update };
    }

    case 'helium_3': {
      // Pulsating magenta-violet quantum corona with orbiting luminous ion rings
      const res = createGasCloudMesh(0xe879f9, scale, 'monatomic');
      group.add(res.group);
      return { group, update: res.update };
    }

    case 'carbon_dioxide': {
      // Cool smoky white-gray vapor cloud with linear triatomic O=C=O units
      const res = createGasCloudMesh(0x94a3b8, scale, 'triatomic');
      group.add(res.group);
      return { group, update: res.update };
    }

    case 'ammonia': {
      // Pale icy-cyan mist with trigonal pyramidal NH3 clusters
      const res = createGasCloudMesh(0x38bdf8, scale, 'triatomic');
      group.add(res.group);
      return { group, update: res.update };
    }

    case 'methane': {
      // Translucent emerald-tinted diffusion haze with tetrahedral CH4 nodes
      const res = createGasCloudMesh(0x34d399, scale, 'triatomic');
      group.add(res.group);
      return { group, update: res.update };
    }

    // =========================================================================
    // 6. HIGH-ENERGY & COSMIC PLASMAS
    // =========================================================================
    case 'cosmic_plasma': {
      // High-energy glowing plasma sphere with fluctuating coronal loops and magnetic flare filaments
      const coreMat = new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.85 });
      const core = new THREE.Mesh(new THREE.SphereGeometry(1.5 * scale, 32, 32), coreMat);
      group.add(core);

      const coronaMat = new THREE.MeshBasicMaterial({ color: 0xf472b6, transparent: true, opacity: 0.35, wireframe: true });
      const corona = new THREE.Mesh(new THREE.IcosahedronGeometry(2.1 * scale, 2), coronaMat);
      group.add(corona);

      const loopMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5 });
      const loop = new THREE.Mesh(new THREE.TorusGeometry(2.3 * scale, 0.04 * scale, 8, 32), loopMat);
      loop.rotation.x = Math.PI / 3;
      group.add(loop);

      const update = (_delta: number, elapsed: number) => {
        corona.rotation.y = elapsed * 0.8;
        corona.rotation.z = elapsed * 0.4;
        loop.rotation.y = elapsed * 1.2;
        const pulse = 1 + Math.sin(elapsed * 4) * 0.08;
        core.scale.set(pulse, pulse, pulse);
      };

      return { group, update };
    }

    // =========================================================================
    // DYNAMIC MATERIAL PROFILE FALLBACK: NEVER FORCES GENERIC ROCK/LIQUID/GAS
    // =========================================================================
    default: {
      const hexColor = parseInt(profile.particleColor.replace('#', ''), 16) || 0x38bdf8;

      if (profile.particleType === 'metallic_fcc' || profile.particleType === 'metallic_bcc') {
        const { group: ingot } = createMetalIngotMesh(key, hexColor, profile.metalnessVal ?? 0.88, profile.roughnessVal ?? 0.28, undefined, scale);
        group.add(ingot);
        return { group };
      }

      if (profile.particleType === 'heavy_liquid' || profile.stateBehavior === 'dynamic_fluid') {
        const res = createLiquidDropletMesh(hexColor, scale, profile.surfaceAppearance === 'metallic_specular');
        group.add(res.group);
        return { group, update: res.update };
      }

      if (profile.particleType === 'diatomic_gas' || profile.particleType === 'monatomic_gas' || profile.stateBehavior === 'dispersed_gas') {
        const molType = profile.particleType === 'monatomic_gas' ? 'monatomic' : profile.molecularStructure.includes('Triatomic') ? 'triatomic' : 'diatomic';
        const res = createGasCloudMesh(hexColor, scale, molType);
        group.add(res.group);
        return { group, update: res.update };
      }

      if (profile.particleType === 'covalent_network' || profile.particleType === 'ionic_matrix') {
        const crystalGroup = new THREE.Group();
        const mat = new THREE.MeshPhysicalMaterial({
          color: hexColor,
          roughness: profile.roughnessVal ?? 0.1,
          metalness: profile.metalnessVal ?? 0.05,
          transmission: profile.transmissionVal ?? 0.75,
          ior: profile.iorVal ?? 1.54,
          transparent: true,
          opacity: 0.95
        });
        const mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(1.5 * scale, 0), mat);
        crystalGroup.add(mesh);
        group.add(crystalGroup);
        return { group };
      }

      // Custom polyhedral cluster tailored by color and appearance
      const customMat = new THREE.MeshStandardMaterial({
        color: hexColor,
        roughness: profile.roughnessVal ?? 0.4,
        metalness: profile.metalnessVal ?? 0.5
      });
      const customMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5 * scale, 1), customMat);
      group.add(customMesh);
      return { group };
    }
  }
}

/**
 * Creates an authentic 3D Hematite (Fe2O3) kidney-ore mineral nodule.
 * Single coherent geological specimen with botryoidal lobes, sub-metallic dark red/black luster,
 * and natural crystalline cleavage.
 */
function createHematiteMineralMesh(scale = 1.0): PhysicalMeshResult {
  const group = new THREE.Group();
  const geo = new THREE.IcosahedronGeometry(1.45 * scale, 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const lobe1 = Math.sin(x * 2.8) * Math.cos(z * 2.8) * 0.22;
    const lobe2 = Math.cos(y * 3.5 + x * 2.0) * 0.14;
    const rMod = 1.0 + lobe1 + lobe2;
    pos.setXYZ(i, x * rMod, y * (0.85 + lobe1 * 0.4), z * rMod);
  }
  geo.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    color: 0x581c1c, // deep earthy hematite reddish-black
    roughness: 0.76,
    metalness: 0.38, // sub-metallic natural hematite luster
    emissive: 0x220707,
    emissiveIntensity: 0.08
  });
  const mesh = new THREE.Mesh(geo, mat);
  group.add(mesh);

  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geo, 22),
    new THREE.LineBasicMaterial({ color: 0x991b1b, transparent: true, opacity: 0.35 })
  );
  mesh.add(edges);

  return { group };
}

/**
 * Creates an authentic 3D Copper(II) Oxide (CuO) mineral rock specimen.
 * Single dense black monoclinic crystalline specimen with micro-facets.
 */
function createCopperOxideMesh(scale = 1.0): PhysicalMeshResult {
  const group = new THREE.Group();
  const geo = new THREE.DodecahedronGeometry(1.45 * scale, 1);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const deform = Math.sin(x * 3.2) * Math.cos(z * 3.2) * 0.14;
    pos.setXYZ(i, x * (1 + deform), y * 0.88, z * (1 + deform));
  }
  geo.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    color: 0x0f172a, // dense black monoclinic copper oxide
    roughness: 0.84,
    metalness: 0.25,
    emissive: 0x020617,
    emissiveIntensity: 0.05
  });
  const mesh = new THREE.Mesh(geo, mat);
  group.add(mesh);

  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geo, 22),
    new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.45 })
  );
  mesh.add(edges);

  return { group };
}

/**
 * Creates an authentic 3D Saline Solution (NaCl in H2O).
 * Single coherent liquid volume with solvated Na+ and Cl- ions diffusing internally.
 * Never renders a solid salt cube inside water.
 */
function createSalineSolutionMesh(scale = 1.0): PhysicalMeshResult {
  const group = new THREE.Group();
  const res = createLiquidDropletMesh(0x38bdf8, scale, false);
  group.add(res.group);

  // Dissolved solvated ions uniformly distributed strictly INSIDE the liquid volume
  const ionGroup = new THREE.Group();
  const naIonMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b }); // Na+ cation
  const clIonMat = new THREE.MeshBasicMaterial({ color: 0x10b981 }); // Cl- anion

  const ionMeshes: { mesh: THREE.Mesh; seed: number; radius: number; speed: number }[] = [];
  for (let i = 0; i < 14; i++) {
    const isNa = i % 2 === 0;
    const r = isNa ? 0.065 * scale : 0.085 * scale;
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 10), isNa ? naIonMat : clIonMat);
    const dist = (0.3 + Math.random() * 0.75) * scale;
    const ang1 = Math.random() * Math.PI * 2;
    const ang2 = (Math.random() - 0.5) * Math.PI * 0.8;
    mesh.position.set(
      Math.cos(ang1) * Math.cos(ang2) * dist,
      Math.sin(ang2) * dist,
      Math.sin(ang1) * Math.cos(ang2) * dist
    );
    ionGroup.add(mesh);
    ionMeshes.push({ mesh, seed: Math.random() * 10, radius: dist, speed: 0.4 + Math.random() * 0.6 });
  }
  group.add(ionGroup);

  const update = (delta: number, elapsed: number) => {
    res.update?.(delta, elapsed);
    // Subtle Brownian thermal drift of solvated ions inside fluid
    ionMeshes.forEach((item) => {
      const t = elapsed * item.speed + item.seed;
      item.mesh.position.y += Math.sin(t * 2.5) * 0.002 * scale;
      item.mesh.position.x += Math.cos(t * 1.8) * 0.002 * scale;
      item.mesh.position.z += Math.sin(t * 1.5) * 0.002 * scale;
    });
    ionGroup.rotation.y = elapsed * 0.25;
  };
  return { group, update };
}

/**
 * Creates an authentic 3D Aqueous Ethanol Solution (C2H5OH + H2O).
 * Single homogeneous liquid volume showing internal Schlieren optical refraction rings.
 */
function createAqueousEthanolMesh(scale = 1.0): PhysicalMeshResult {
  const group = new THREE.Group();
  const res = createLiquidDropletMesh(0xbae6fd, scale, false);
  group.add(res.group);

  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x93c5fd,
    transparent: true,
    opacity: 0.4,
    wireframe: true
  });
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.85 * scale, 0.04 * scale, 8, 32), ringMat);
  ring1.rotation.x = Math.PI / 4;
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.6 * scale, 0.03 * scale, 8, 32), ringMat);
  ring2.rotation.y = Math.PI / 3;
  group.add(ring1, ring2);

  const update = (delta: number, elapsed: number) => {
    res.update?.(delta, elapsed);
    ring1.rotation.z = elapsed * 0.5;
    ring2.rotation.x = elapsed * -0.4;
  };

  return { group, update };
}

/**
 * Creates an authentic 3D Atmospheric Gas Mixture (N2 + O2).
 * Single unified gas cloud envelope containing intermingled N2 and O2 molecules in thermal equilibrium.
 */
function createAtmosphericGasMesh(scale = 1.0): PhysicalMeshResult {
  const gasGroup = new THREE.Group();

  // ONE unified atmospheric gas volume envelope
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x60a5fa,
    transparent: true,
    opacity: 0.15
  });
  const glowSphere = new THREE.Mesh(new THREE.SphereGeometry(2.3 * scale, 24, 24), glowMat);
  gasGroup.add(glowSphere);

  const n2Mat = new THREE.MeshStandardMaterial({ color: 0x6366f1, emissive: 0x4338ca, emissiveIntensity: 0.4, roughness: 0.2 }); // Nitrogen (N2)
  const o2Mat = new THREE.MeshStandardMaterial({ color: 0x00d2ff, emissive: 0x0284c7, emissiveIntensity: 0.4, roughness: 0.2 }); // Oxygen (O2)
  const bondMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const molecules: { group: THREE.Group; vel: THREE.Vector3; rotVel: THREE.Vector3 }[] = [];

  // Realistic ~4:1 ratio (8 N2 molecules, 3 O2 molecules) in ONE unified gas volume
  for (let i = 0; i < 11; i++) {
    const isN2 = i < 8;
    const mol = new THREE.Group();
    const atomMat = isN2 ? n2Mat : o2Mat;

    const a1 = new THREE.Mesh(new THREE.SphereGeometry(0.24 * scale, 14, 14), atomMat);
    const a2 = new THREE.Mesh(new THREE.SphereGeometry(0.24 * scale, 14, 14), atomMat);
    a1.position.x = -0.2 * scale;
    a2.position.x = 0.2 * scale;
    const bond = new THREE.Mesh(new THREE.CylinderGeometry(0.04 * scale, 0.04 * scale, 0.4 * scale, 6), bondMat);
    bond.rotation.z = Math.PI / 2;
    mol.add(a1, a2, bond);

    mol.position.set(
      (Math.random() - 0.5) * 2.5 * scale,
      (Math.random() - 0.5) * 2.5 * scale,
      (Math.random() - 0.5) * 2.5 * scale
    );
    mol.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    gasGroup.add(mol);

    molecules.push({
      group: mol,
      vel: new THREE.Vector3((Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.9),
      rotVel: new THREE.Vector3((Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5)
    });
  }

  const update = (delta: number, elapsed: number) => {
    glowSphere.rotation.y = elapsed * 0.12;
    molecules.forEach((m) => {
      m.group.position.addScaledVector(m.vel, delta * scale);
      m.group.rotation.x += m.rotVel.x * delta;
      m.group.rotation.y += m.rotVel.y * delta;

      const boundary = 1.6 * scale;
      if (Math.abs(m.group.position.x) > boundary) m.vel.x *= -1;
      if (Math.abs(m.group.position.y) > boundary) m.vel.y *= -1;
      if (Math.abs(m.group.position.z) > boundary) m.vel.z *= -1;
    });
  };

  return { group: gasGroup, update };
}

/**
 * Creates an authentic 3D Stratified Hydro-Mercurial System (Hg + H2O).
 * Unified two-phase liquid droplet: lower hemisphere is dense mercury, upper hemisphere is water,
 * sharing a single fluid droplet silhouette and meniscus boundary.
 */
function createStratifiedHydroMercurialMesh(scale = 1.0): PhysicalMeshResult {
  const group = new THREE.Group();

  const mercuryGeo = new THREE.SphereGeometry(1.8 * scale, 36, 18, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
  mercuryGeo.scale(1.15, 0.85, 1.15);
  const mercuryMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 1.0,
    roughness: 0.04,
    emissive: 0x334155,
    emissiveIntensity: 0.12
  });
  const mercuryMesh = new THREE.Mesh(mercuryGeo, mercuryMat);
  group.add(mercuryMesh);

  const meniscusGeo = new THREE.CircleGeometry(1.8 * 1.15 * scale, 36);
  meniscusGeo.rotateX(-Math.PI / 2);
  const meniscus = new THREE.Mesh(meniscusGeo, mercuryMat);
  group.add(meniscus);

  const waterGeo = new THREE.SphereGeometry(1.8 * scale, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2);
  waterGeo.scale(1.15, 1.1, 1.15);
  const waterMat = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    transmission: 0.95,
    opacity: 1,
    transparent: true,
    roughness: 0.03,
    ior: 1.333,
    thickness: 2.2,
    clearcoat: 1.0
  });
  const waterMesh = new THREE.Mesh(waterGeo, waterMat);
  group.add(waterMesh);

  const update = (_delta: number, elapsed: number) => {
    const fluid = Math.sin(elapsed * 2.5) * 0.025;
    group.scale.set(1.0 + fluid, 1.0 - fluid * 0.5, 1.0 + fluid);
  };

  return { group, update };
}

/**
 * Creates an authentic 3D Copper + Water specimen.
 * Single copper ingot with beaded hydrophobic liquid water droplets resting on its surface.
 */
function createCuWaterMesh(scale = 1.0): PhysicalMeshResult {
  const group = new THREE.Group();
  const { group: cuIngot } = createMetalIngotMesh('copper', 0xb87333, 0.94, 0.14, 0xffedd5, scale);
  group.add(cuIngot);

  const waterBeadMat = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    transmission: 0.92,
    transparent: true,
    opacity: 0.85,
    roughness: 0.02,
    ior: 1.333,
    clearcoat: 1.0
  });

  const bead1 = new THREE.Mesh(new THREE.SphereGeometry(0.24 * scale, 16, 16), waterBeadMat);
  bead1.scale.set(1.2, 0.45, 1.2);
  bead1.position.set(0.45 * scale, 0.46 * scale, 0.2 * scale);

  const bead2 = new THREE.Mesh(new THREE.SphereGeometry(0.18 * scale, 16, 16), waterBeadMat);
  bead2.scale.set(1.1, 0.4, 1.1);
  bead2.position.set(-0.5 * scale, 0.46 * scale, -0.15 * scale);

  group.add(bead1, bead2);
  return { group };
}

/**
 * Creates an authentic 3D Iron-Gold Intermetallic Alloy (Fe-Au Solid Solution) specimen.
 * Renders ONE coherent macroscopic metallic specimen with subtle internal gold/iron
 * microstructural composition visible through the material surface.
 * NEVER renders iron and gold as two separate objects.
 */
function createFeAuAlloyMesh(scale = 1.0): PhysicalMeshResult {
  const group = new THREE.Group();

  // Unified metallurgical specimen geometry: faceted hexagonal-billet alloy specimen
  const length = 2.4 * scale;
  const radius = 0.85 * scale;
  const alloyGeo = new THREE.CylinderGeometry(radius, radius, length, 6, 1);
  alloyGeo.rotateZ(Math.PI / 2);

  // Custom vertex deformation for forged metallurgical authenticity
  const pos = alloyGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const wave = Math.sin(x * 3.5) * Math.cos(z * 3.5) * 0.04 * scale;
    pos.setXYZ(i, x, y * (1 + wave), z * (1 + wave));
  }
  alloyGeo.computeVertexNormals();

  // Dense champagne-gold metallic alloy matrix
  const alloyMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37, // Rich champagne gold
    metalness: 0.94,
    roughness: 0.22,
    emissive: 0x3d3005,
    emissiveIntensity: 0.08
  });
  const alloyMesh = new THREE.Mesh(alloyGeo, alloyMat);
  group.add(alloyMesh);

  // Subtle internal iron crystallographic grain lamellae flush with the unified surface
  // Showing both constituents (Fe and Au) atomically integrated into ONE specimen
  const feGrainMat = new THREE.MeshStandardMaterial({
    color: 0x475569, // Forged dark iron martensite
    metalness: 0.88,
    roughness: 0.38
  });
  const auGrainMat = new THREE.MeshStandardMaterial({
    color: 0xfbbf24, // Radiant gold crystallite
    metalness: 0.96,
    roughness: 0.14,
    emissive: 0x78350f,
    emissiveIntensity: 0.15
  });

  const grainGroup = new THREE.Group();
  // 14 micro-domain lamellae flush with the outer faces
  for (let i = 0; i < 14; i++) {
    const isFe = i % 2 === 0;
    const gGeo = new THREE.BoxGeometry(0.28 * scale, 0.02 * scale, 0.22 * scale);
    const gMesh = new THREE.Mesh(gGeo, isFe ? feGrainMat : auGrainMat);

    const x = ((i - 6.5) / 7) * 0.95 * scale;
    const angle = Math.floor(i / 2) * (Math.PI / 3);
    const r = radius * 0.99;
    gMesh.position.set(x, r * Math.sin(angle), r * Math.cos(angle));
    gMesh.rotation.x = angle;
    gMesh.rotation.y = (Math.random() - 0.5) * 0.2;
    grainGroup.add(gMesh);
  }
  alloyMesh.add(grainGroup);

  // Precision metallurgical edge highlights
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(alloyGeo, 25),
    new THREE.LineBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.55 })
  );
  alloyMesh.add(edges);

  return { group };
}

/**
 * Creates an authentic 3D Rose Gold Alloy (Cu-Au Intermetallic Solution) specimen.
 * Renders ONE coherent macroscopic Cu3Au superlattice alloy specimen with warm rose-gold luster
 * and subtle copper-gold atomic grain boundaries.
 * NEVER renders copper and gold as two separate objects.
 */
function createRoseGoldAlloyMesh(scale = 1.0): PhysicalMeshResult {
  const group = new THREE.Group();

  // Unified jewelry-grade beveled billet geometry
  const l = 2.4 * scale;
  const w = 1.3 * scale;
  const h = 0.7 * scale;

  const shape = new THREE.Shape();
  const halfL = l / 2;
  const halfW = w / 2;
  shape.moveTo(-halfL, -halfW);
  shape.lineTo(halfL, -halfW);
  shape.lineTo(halfL, halfW);
  shape.lineTo(-halfL, halfW);
  shape.closePath();

  const extrudeSettings = {
    depth: h,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.12 * scale,
    bevelThickness: 0.12 * scale
  };
  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geo.center();

  // Rich warm rose gold metallic luster (75% Au, 22.25% Cu)
  const roseMat = new THREE.MeshStandardMaterial({
    color: 0xe0a899,
    metalness: 0.96,
    roughness: 0.15,
    emissive: 0x4a1810,
    emissiveIntensity: 0.08
  });
  const roseMesh = new THREE.Mesh(geo, roseMat);
  group.add(roseMesh);

  // Subtle ordered Cu3Au superlattice crystallite grain facets
  const cuFacetMat = new THREE.MeshStandardMaterial({
    color: 0xc2410c, // Copper-rich facet
    metalness: 0.94,
    roughness: 0.2
  });
  const auFacetMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15, // Gold-rich facet
    metalness: 0.96,
    roughness: 0.14
  });

  const superlatticeGroup = new THREE.Group();
  for (let i = 0; i < 10; i++) {
    const isCu = i % 2 === 0;
    const fGeo = new THREE.BoxGeometry(0.24 * scale, 0.015 * scale, 0.2 * scale);
    const fMesh = new THREE.Mesh(fGeo, isCu ? cuFacetMat : auFacetMat);
    const x = ((i - 4.5) / 5) * 0.9 * scale;
    const z = Math.sin(i * 1.5) * 0.4 * scale;
    fMesh.position.set(x, h / 2 + 0.125 * scale, z);
    fMesh.rotation.y = (i * Math.PI) / 6;
    superlatticeGroup.add(fMesh);
  }
  roseMesh.add(superlatticeGroup);

  // Polished rose gold chamfer lines
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geo, 30),
    new THREE.LineBasicMaterial({ color: 0xffe4e6, transparent: true, opacity: 0.6 })
  );
  roseMesh.add(edges);

  return { group };
}

/**
 * Creates ONE unified macroscopic specimen representing a sintered solid-solution alloy or composite.
 * Never places two separate meshes side-by-side.
 */
function createUnifiedAlloyMesh(matA: Material, matB: Material, scale = 1.0): PhysicalMeshResult {
  const group = new THREE.Group();

  const colA = new THREE.Color(matA.colorHex || '#94a3b8');
  const colB = new THREE.Color(matB.colorHex || '#ffd700');
  const alloyColor = colA.clone().lerp(colB, 0.5);

  const profileA = getMaterialVisualProfile(matA.id);
  const profileB = getMaterialVisualProfile(matB.id);

  const isMetalA = profileA.particleType.includes('metallic') || matA.category === 'Metals';
  const isMetalB = profileB.particleType.includes('metallic') || matB.category === 'Metals';

  // If both are metals: unified sintered metallurgical billet
  if (isMetalA && isMetalB) {
    const metalness = ((profileA.metalnessVal ?? 0.85) + (profileB.metalnessVal ?? 0.85)) * 0.5;
    const roughness = ((profileA.roughnessVal ?? 0.22) + (profileB.roughnessVal ?? 0.22)) * 0.5;

    const { group: ingot } = createMetalIngotMesh(
      `alloy_${matA.id}_${matB.id}`,
      alloyColor.getHex(),
      metalness,
      roughness,
      alloyColor.clone().offsetHSL(0, 0, 0.1).getHex(),
      scale
    );
    group.add(ingot);

    // Subtle metallographic crystalline grain boundary inclusions on the unified surface
    const grainCount = 14;
    const grainGeo = new THREE.BoxGeometry(0.18 * scale, 0.02 * scale, 0.18 * scale);
    const grainMatA = new THREE.MeshStandardMaterial({
      color: colA.getHex(),
      metalness,
      roughness: Math.max(0.1, roughness - 0.05)
    });
    const grainMatB = new THREE.MeshStandardMaterial({
      color: colB.getHex(),
      metalness,
      roughness: Math.max(0.1, roughness - 0.05)
    });

    const grainGroup = new THREE.Group();
    for (let i = 0; i < grainCount; i++) {
      const isA = i % 2 === 0;
      const gMesh = new THREE.Mesh(grainGeo, isA ? grainMatA : grainMatB);
      const x = (Math.random() - 0.5) * 1.8 * scale;
      const z = (Math.random() - 0.5) * 0.9 * scale;
      gMesh.position.set(x, (0.65 * 0.5 + 0.09) * scale + 0.005 * scale, z);
      gMesh.rotation.y = Math.random() * Math.PI;
      grainGroup.add(gMesh);
    }
    ingot.add(grainGroup);

    return { group };
  }

  // If one or both are crystals/minerals/non-metals: unified sintered mineral/crystal aggregate matrix
  const matrixGeo = new THREE.DodecahedronGeometry(1.5 * scale, 1);
  const pos = matrixGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const deform = Math.sin(x * 2.5) * Math.cos(z * 2.5) * 0.12;
    pos.setXYZ(i, x * (1 + deform), y * (1 - deform * 0.5), z * (1 + deform));
  }
  matrixGeo.computeVertexNormals();

  const matrixMat = new THREE.MeshStandardMaterial({
    color: alloyColor.getHex(),
    roughness: 0.45,
    metalness: (isMetalA || isMetalB) ? 0.45 : 0.15
  });
  const matrixMesh = new THREE.Mesh(matrixGeo, matrixMat);
  group.add(matrixMesh);

  // Surface crystalline inclusions from both components
  const incGeo = new THREE.OctahedronGeometry(0.22 * scale, 0);
  const incMatA = new THREE.MeshStandardMaterial({ color: colA.getHex(), roughness: 0.3 });
  const incMatB = new THREE.MeshStandardMaterial({ color: colB.getHex(), roughness: 0.3 });
  for (let i = 0; i < 10; i++) {
    const isA = i % 2 === 0;
    const inc = new THREE.Mesh(incGeo, isA ? incMatA : incMatB);
    const theta = (i / 10) * Math.PI * 2;
    const r = 1.35 * scale;
    inc.position.set(Math.cos(theta) * r, Math.sin(i * 2) * 0.35 * scale, Math.sin(theta) * r);
    matrixMesh.add(inc);
  }

  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(matrixGeo, 20),
    new THREE.LineBasicMaterial({
      color: alloyColor.clone().offsetHSL(0, 0, 0.15).getHex(),
      transparent: true,
      opacity: 0.5
    })
  );
  matrixMesh.add(edges);

  return { group };
}

/**
 * Creates ONE unified colloidal liquid volume representing a solid-liquid dispersion / suspension.
 * Never places a solid block inside water; renders a unified fluid with microscopic suspended particles.
 */
function createColloidalSuspensionMesh(liquidMat: Material, solidMat: Material, scale = 1.0): PhysicalMeshResult {
  const group = new THREE.Group();

  const liqCol = parseInt((liquidMat.colorHex || '#38bdf8').replace('#', ''), 16) || 0x38bdf8;
  const isMercury = liquidMat.id === 'mercury';
  const res = createLiquidDropletMesh(liqCol, scale, isMercury);
  group.add(res.group);

  // Microscopic colloidal suspension particles floating strictly inside the fluid droplet
  const solidCol = parseInt((solidMat.colorHex || '#cbd5e1').replace('#', ''), 16) || 0xcbd5e1;
  const particleCount = 45;
  const pGeo = new THREE.BufferGeometry();
  const pPositions = new Float32Array(particleCount * 3);
  const pVelocities: { x: number; y: number; z: number }[] = [];

  for (let i = 0; i < particleCount; i++) {
    const r = (0.2 + Math.random() * 0.9) * scale;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI * 0.8;
    pPositions[i * 3] = r * Math.cos(theta) * Math.cos(phi);
    pPositions[i * 3 + 1] = r * Math.sin(phi);
    pPositions[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi);
    pVelocities.push({
      x: (Math.random() - 0.5) * 0.05 * scale,
      y: (Math.random() - 0.5) * 0.05 * scale,
      z: (Math.random() - 0.5) * 0.05 * scale
    });
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

  const pMat = new THREE.PointsMaterial({
    color: new THREE.Color(solidCol),
    size: 0.09 * scale,
    transparent: true,
    opacity: 0.9
  });
  const particles = new THREE.Points(pGeo, pMat);
  group.add(particles);

  const update = (delta: number, elapsed: number) => {
    res.update?.(delta, elapsed);
    const pos = pGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < particleCount; i++) {
      let x = pos.getX(i) + pVelocities[i].x * delta;
      let y = pos.getY(i) + pVelocities[i].y * delta;
      let z = pos.getZ(i) + pVelocities[i].z * delta;
      const d = Math.sqrt(x * x + y * y + z * z);
      if (d > 1.2 * scale) {
        x *= 0.95;
        y *= 0.95;
        z *= 0.95;
        pVelocities[i].x *= -1;
        pVelocities[i].y *= -1;
        pVelocities[i].z *= -1;
      }
      pos.setXYZ(i, x, y, z);
    }
    pos.needsUpdate = true;
    particles.rotation.y = elapsed * 0.15;
  };

  return { group, update };
}

/**
 * Creates ONE unified gas cloud volume containing both gas molecules together.
 * Never places two separate gas clouds side-by-side.
 */
function createUnifiedGasMixtureMesh(matA: Material, matB: Material, scale = 1.0): PhysicalMeshResult {
  const gasGroup = new THREE.Group();

  const colA = new THREE.Color(matA.colorHex || '#38bdf8');
  const colB = new THREE.Color(matB.colorHex || '#818cf8');
  const blendCol = colA.clone().lerp(colB, 0.5);

  const glowMat = new THREE.MeshBasicMaterial({
    color: blendCol,
    transparent: true,
    opacity: 0.16
  });
  const glowSphere = new THREE.Mesh(new THREE.SphereGeometry(2.3 * scale, 24, 24), glowMat);
  gasGroup.add(glowSphere);

  const atomMatA = new THREE.MeshStandardMaterial({ color: colA, emissive: colA, emissiveIntensity: 0.45, roughness: 0.2 });
  const atomMatB = new THREE.MeshStandardMaterial({ color: colB, emissive: colB, emissiveIntensity: 0.45, roughness: 0.2 });
  const bondMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const profileA = getMaterialVisualProfile(matA.id);
  const profileB = getMaterialVisualProfile(matB.id);
  const isMonoA = profileA.particleType === 'monatomic_gas';
  const isMonoB = profileB.particleType === 'monatomic_gas';

  const molecules: { group: THREE.Group; vel: THREE.Vector3; rotVel: THREE.Vector3 }[] = [];

  for (let i = 0; i < 12; i++) {
    const isA = i % 2 === 0;
    const mol = new THREE.Group();
    const isMono = isA ? isMonoA : isMonoB;
    const mat = isA ? atomMatA : atomMatB;

    if (isMono) {
      const atom = new THREE.Mesh(new THREE.SphereGeometry(0.3 * scale, 14, 14), mat);
      mol.add(atom);
    } else {
      const a1 = new THREE.Mesh(new THREE.SphereGeometry(0.23 * scale, 14, 14), mat);
      const a2 = new THREE.Mesh(new THREE.SphereGeometry(0.23 * scale, 14, 14), mat);
      a1.position.x = -0.18 * scale;
      a2.position.x = 0.18 * scale;
      const bond = new THREE.Mesh(new THREE.CylinderGeometry(0.04 * scale, 0.04 * scale, 0.36 * scale, 6), bondMat);
      bond.rotation.z = Math.PI / 2;
      mol.add(a1, a2, bond);
    }

    mol.position.set(
      (Math.random() - 0.5) * 2.5 * scale,
      (Math.random() - 0.5) * 2.5 * scale,
      (Math.random() - 0.5) * 2.5 * scale
    );
    mol.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    gasGroup.add(mol);

    molecules.push({
      group: mol,
      vel: new THREE.Vector3((Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.9),
      rotVel: new THREE.Vector3((Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5)
    });
  }

  const update = (delta: number, elapsed: number) => {
    glowSphere.rotation.y = elapsed * 0.1;
    molecules.forEach((m) => {
      m.group.position.addScaledVector(m.vel, delta * scale);
      m.group.rotation.x += m.rotVel.x * delta;
      m.group.rotation.y += m.rotVel.y * delta;
      const b = 1.6 * scale;
      if (Math.abs(m.group.position.x) > b) m.vel.x *= -1;
      if (Math.abs(m.group.position.y) > b) m.vel.y *= -1;
      if (Math.abs(m.group.position.z) > b) m.vel.z *= -1;
    });
  };

  return { group: gasGroup, update };
}

/**
 * Creates ONE unified liquid volume for two liquids.
 * If one is mercury, creates a stratified two-phase droplet (mercury bottom, liquid top).
 * If both are miscible, creates a single droplet with blended optical refraction.
 */
function createUnifiedLiquidMixtureMesh(matA: Material, matB: Material, scale = 1.0): PhysicalMeshResult {
  const isMercuryA = matA.id === 'mercury';
  const isMercuryB = matB.id === 'mercury';

  if (isMercuryA || isMercuryB) {
    const otherMat = isMercuryA ? matB : matA;
    const group = new THREE.Group();

    const mercuryGeo = new THREE.SphereGeometry(1.8 * scale, 36, 18, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    mercuryGeo.scale(1.15, 0.85, 1.15);
    const mercuryMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 1.0,
      roughness: 0.04,
      emissive: 0x334155,
      emissiveIntensity: 0.12
    });
    const mercuryMesh = new THREE.Mesh(mercuryGeo, mercuryMat);
    group.add(mercuryMesh);

    const meniscusGeo = new THREE.CircleGeometry(1.8 * 1.15 * scale, 36);
    meniscusGeo.rotateX(-Math.PI / 2);
    const meniscus = new THREE.Mesh(meniscusGeo, mercuryMat);
    group.add(meniscus);

    const otherCol = parseInt((otherMat.colorHex || '#38bdf8').replace('#', ''), 16) || 0x38bdf8;
    const otherGeo = new THREE.SphereGeometry(1.8 * scale, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2);
    otherGeo.scale(1.15, 1.1, 1.15);
    const otherLiquidMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(otherCol),
      transmission: 0.94,
      opacity: 1,
      transparent: true,
      roughness: 0.03,
      ior: 1.34,
      thickness: 2.2,
      clearcoat: 1.0
    });
    const otherMesh = new THREE.Mesh(otherGeo, otherLiquidMat);
    group.add(otherMesh);

    const update = (_delta: number, elapsed: number) => {
      const fluid = Math.sin(elapsed * 2.5) * 0.025;
      group.scale.set(1.0 + fluid, 1.0 - fluid * 0.5, 1.0 + fluid);
    };

    return { group, update };
  }

  // Miscible liquid + liquid: ONE unified liquid droplet with blended hue
  const colA = new THREE.Color(matA.colorHex || '#38bdf8');
  const colB = new THREE.Color(matB.colorHex || '#bae6fd');
  const blendCol = colA.clone().lerp(colB, 0.5);

  return createLiquidDropletMesh(blendCol.getHex(), scale, false);
}

/**
 * Creates ONE unified solid specimen with an adsorbed gas molecular monolayer.
 * The solid sits at center (0,0,0) and microscopic gas molecules cling directly to its surface facets.
 */
function createPhysisorbedSolidMesh(denseMat: Material, gasMat: Material, scale = 1.0): PhysicalMeshResult {
  const group = new THREE.Group();

  const spec = createPhysicalMaterialMesh(denseMat.id, scale * 0.85);
  group.add(spec.group);

  const gasProfile = getMaterialVisualProfile(gasMat.id);
  const gasCol = parseInt((gasProfile.particleColor || '#38bdf8').replace('#', ''), 16) || 0x38bdf8;
  const gasMatObj = new THREE.MeshStandardMaterial({
    color: gasCol,
    emissive: gasCol,
    emissiveIntensity: 0.45,
    roughness: 0.2
  });

  const adCount = 18;
  const adGroup = new THREE.Group();
  for (let i = 0; i < adCount; i++) {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.08 * scale, 8, 8), gasMatObj);
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;
    const r = 1.35 * scale;
    dot.position.set(r * Math.cos(theta) * Math.cos(phi), r * Math.sin(phi), r * Math.sin(theta) * Math.cos(phi));
    adGroup.add(dot);
  }
  group.add(adGroup);

  const update = (delta: number, elapsed: number, env?: any) => {
    spec.update?.(delta, elapsed, env);
    adGroup.rotation.y = elapsed * 0.2;
  };

  return { group, update };
}

/**
 * Creates ONE unified excited plasma core for plasma mixtures.
 */
function createUnifiedPlasmaMixtureMesh(plasmaMat: Material, otherMat: Material, scale = 1.0): PhysicalMeshResult {
  const group = new THREE.Group();

  const coreMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.95 });
  const core = new THREE.Mesh(new THREE.SphereGeometry(1.3 * scale, 32, 32), coreMat);
  group.add(core);

  const otherCol = parseInt((otherMat.colorHex || '#c084fc').replace('#', ''), 16) || 0xc084fc;
  const coronaMat = new THREE.MeshBasicMaterial({ color: otherCol, transparent: true, opacity: 0.45, wireframe: true });
  const corona = new THREE.Mesh(new THREE.IcosahedronGeometry(1.9 * scale, 2), coronaMat);
  group.add(corona);

  const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(2.1 * scale, 0.04 * scale, 8, 48), ringMat);
  ring.rotation.x = Math.PI / 3;
  group.add(ring);

  const update = (_delta: number, elapsed: number) => {
    corona.rotation.y = elapsed * 1.2;
    ring.rotation.z = elapsed * 1.6;
    const pulse = 1 + Math.sin(elapsed * 6) * 0.08;
    core.scale.set(pulse, pulse, pulse);
  };

  return { group, update };
}

/**
 * Creates 3D representation for Reaction Output Products and Physical Mixtures.
 * Always renders real physical matter specimens (ingots, crystals, liquids, gases, powders, and mixtures)
 * without any generic blue alloys, generic water droplets, or generic gas clouds.
 */
export function createPhysicalReactionProductMesh(
  resultOrId: ReactionResult | string,
  outputState?: string,
  scale = 1.0
): PhysicalMeshResult {
  const group = new THREE.Group();

  let resultId = '';
  let inA: string | undefined = undefined;
  let inB: string | undefined = undefined;
  let state = outputState || 'Solid';
  let colorHexStr = '#38bdf8';

  if (typeof resultOrId === 'string') {
    resultId = resultOrId;
    const known = KNOWN_REACTIONS.find(r => r.id === resultId);
    if (known) {
      inA = known.inputA;
      inB = known.inputB;
      state = known.outputState;
      colorHexStr = known.colorHex;
    } else {
      const matIds = INITIAL_MATERIALS.map(m => m.id);
      for (const prefix of ['alloy_', 'solv_', 'gas_mix_', 'gas_solv_', 'gas_solid_', 'liq_mix_', 'inert_', 'plasma_ion_', 'synth_']) {
        if (resultId.startsWith(prefix)) {
          const rest = resultId.slice(prefix.length);
          for (const mId of matIds) {
            if (rest.startsWith(mId + '_')) {
              inA = mId;
              inB = rest.slice(mId.length + 1);
              break;
            }
          }
          break;
        }
      }
    }
  } else if (resultOrId) {
    resultId = resultOrId.id;
    inA = resultOrId.inputA;
    inB = resultOrId.inputB;
    state = resultOrId.outputState;
    colorHexStr = resultOrId.colorHex || '#38bdf8';
  }

  group.name = `product_${resultId}`;

  // =========================================================================
  // 1. SPECIFIC AUTHENTIC CHEMICAL REACTION PRODUCTS (21 Known Reactions)
  // =========================================================================

  // Copper(II) Oxide (CuO): Single dense black monoclinic oxide mineral specimen
  if (resultId === 'cu_o2') {
    return createCopperOxideMesh(scale);
  }

  // Pure Water (H2O): Crystal-clear polar fluid droplet with dynamic meniscus oscillations
  if (resultId === 'h2_o2') {
    return createPhysicalMaterialMesh('water', scale);
  }

  // Sodium Chloride (Halite Crystal): Sparkling white cubic rock-salt crystals
  if (resultId === 'na_cl2') {
    return createPhysicalMaterialMesh('salt', scale);
  }

  // Sodium Hydroxide Solution & Hydrogen Gas (NaOH + H2):
  // Alkaline cyan fluid droplet with buoyant micro-bubbles of H2 gas continuously evolving!
  if (resultId === 'na_h2o') {
    const res = createLiquidDropletMesh(0x67e8f9, scale, false);
    group.add(res.group);
    const bubbleGeo = new THREE.SphereGeometry(0.07 * scale, 8, 8);
    const bubbleMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 });
    const bubbles: THREE.Mesh[] = [];
    for (let i = 0; i < 10; i++) {
      const b = new THREE.Mesh(bubbleGeo, bubbleMat);
      b.position.set((Math.random() - 0.5) * 1.3 * scale, (Math.random() * 1.6 - 0.5) * scale, (Math.random() - 0.5) * 1.3 * scale);
      group.add(b);
      bubbles.push(b);
    }
    const update = (delta: number, elapsed: number) => {
      res.update?.(delta, elapsed);
      bubbles.forEach((b, idx) => {
        b.position.y += delta * (0.9 + (idx % 3) * 0.35);
        if (b.position.y > 1.9 * scale) {
          b.position.y = -0.4 * scale;
          b.position.x = (Math.random() - 0.5) * 1.2 * scale;
          b.position.z = (Math.random() - 0.5) * 1.2 * scale;
        }
      });
    };
    return { group, update };
  }

  // Hematite (Fe2O3): Single authentic botryoidal kidney-ore mineral nodule
  if (resultId === 'fe_o2') {
    return createHematiteMineralMesh(scale);
  }

  // Carbon Dioxide Gas (CO2): Dense cool smoky white-gray vapor cloud with linear O=C=O molecules
  if (resultId === 'c_o2') {
    const res = createGasCloudMesh(0x94a3b8, scale, 'triatomic');
    group.add(res.group);
    return { group, update: res.update };
  }

  // Carbon Dioxide & Superheated Steam (CH4 + 2O2): Energetic cyan-electric combustion vapor cloud
  if (resultId === 'ch4_o2') {
    const res = createGasCloudMesh(0x00d2ff, scale, 'triatomic');
    group.add(res.group);
    return { group, update: res.update };
  }

  // Gold-Mercury Amalgam (AuHg2): Silvery-white intermetallic amalgam nodule with liquid-metal wetting sheen
  if (resultId === 'au_hg') {
    const amalgamGeo = new THREE.SphereGeometry(1.45 * scale, 32, 32);
    const pos = amalgamGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const deform = Math.sin(x * 3) * 0.12 * Math.cos(z * 3);
      pos.setXYZ(i, x * (1 + deform), y * 0.78, z * (1 + deform));
    }
    amalgamGeo.computeVertexNormals();
    const amalgamMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.98,
      roughness: 0.08,
      emissive: 0xfef08a,
      emissiveIntensity: 0.04
    });
    const amalgam = new THREE.Mesh(amalgamGeo, amalgamMat);
    group.add(amalgam);
    return { group };
  }

  // Aneutronic Stellar Fusion Core (³He + D⁺): Pulsing cyan-white luminous fusion core with magnetic toroid rings
  if (resultId === 'plasma_he3') {
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.95 });
    const core = new THREE.Mesh(new THREE.SphereGeometry(1.4 * scale, 32, 32), coreMat);
    group.add(core);

    const coronaMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45, wireframe: true });
    const corona = new THREE.Mesh(new THREE.IcosahedronGeometry(2.0 * scale, 2), coronaMat);
    group.add(corona);

    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.65 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.3 * scale, 0.05 * scale, 8, 48), ringMat);
    ring.rotation.x = Math.PI / 3;
    group.add(ring);

    const update = (_delta: number, elapsed: number) => {
      corona.rotation.y = elapsed * 1.1;
      ring.rotation.z = elapsed * 1.5;
      const pulse = 1 + Math.sin(elapsed * 6) * 0.09;
      core.scale.set(pulse, pulse, pulse);
    };
    return { group, update };
  }

  // Titanium-Doped Crystalline Glass (Ti:SiO2): Laser-active optical prism with dichroic violet/indigo dispersion
  if (resultId === 'ti_quartz') {
    const prismGeo = new THREE.CylinderGeometry(1.2 * scale, 1.2 * scale, 2.2 * scale, 6);
    const prismMat = new THREE.MeshPhysicalMaterial({
      color: 0x818cf8,
      transmission: 0.92,
      transparent: true,
      opacity: 1.0,
      roughness: 0.05,
      ior: 1.62,
      clearcoat: 1.0,
      emissive: 0x6366f1,
      emissiveIntensity: 0.12
    });
    const prism = new THREE.Mesh(prismGeo, prismMat);
    prism.rotation.z = Math.PI / 2;
    group.add(prism);
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(prismGeo), new THREE.LineBasicMaterial({ color: 0xc7d2fe, transparent: true, opacity: 0.8 }));
    prism.add(edges);
    return { group };
  }

  // High-Carbon Martensitic Steel (Fe3C Cementite phase): Tempered gunmetal steel bar with acid-etched needle texture
  if (resultId === 'fe_s') {
    const { group: ingot } = createMetalIngotMesh('steel', 0x475569, 0.94, 0.28, undefined, scale);
    group.add(ingot);
    return { group };
  }

  // Silver Sulfide (Ag2S Acanthite / Patina): Dark purplish-black acanthite mineral crust with subtle iridescent metallic sheen
  if (resultId === 'ag_s') {
    const crustGeo = new THREE.IcosahedronGeometry(1.5 * scale, 1);
    const crustMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.65,
      roughness: 0.45,
      emissive: 0x581c87,
      emissiveIntensity: 0.08
    });
    const crust = new THREE.Mesh(crustGeo, crustMat);
    group.add(crust);
    return { group };
  }

  // Alumina (Al2O3 Sapphire / Corundum Crystal): Brilliant trigonal corundum crystal with sapphire-blue flashes
  if (resultId === 'al_o2') {
    const corundumGeo = new THREE.OctahedronGeometry(1.6 * scale, 0);
    const corundumMat = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      transmission: 0.88,
      transparent: true,
      opacity: 0.96,
      roughness: 0.04,
      ior: 1.76,
      clearcoat: 1.0,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.08
    });
    const corundum = new THREE.Mesh(corundumGeo, corundumMat);
    group.add(corundum);
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(corundumGeo), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 }));
    corundum.add(edges);
    return { group };
  }

  // Magnesium Oxide (MgO Periclase): Ultra-refractory bright white periclase cubic crystal cluster
  if (resultId === 'mg_o2') {
    const clusterGroup = new THREE.Group();
    const cubeGeo = new THREE.BoxGeometry(1.2 * scale, 1.2 * scale, 1.2 * scale);
    const mgoMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.65,
      metalness: 0.1,
      emissive: 0xffffff,
      emissiveIntensity: 0.06
    });
    const c1 = new THREE.Mesh(cubeGeo, mgoMat);
    clusterGroup.add(c1);
    const c2 = new THREE.Mesh(new THREE.BoxGeometry(0.85 * scale, 0.85 * scale, 0.85 * scale), mgoMat);
    c2.position.set(0.6 * scale, 0.4 * scale, 0.4 * scale);
    c2.rotation.set(0.2, 0.4, 0.1);
    clusterGroup.add(c2);
    group.add(clusterGroup);
    return { group };
  }

  // Silicon Dioxide (SiO2 Fused Quartz): Vitreous transparent tetrahedral silica network specimen
  if (resultId === 'si_o2') {
    const quartzGeo = new THREE.IcosahedronGeometry(1.5 * scale, 0);
    const quartzMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      transmission: 0.94,
      transparent: true,
      opacity: 1.0,
      roughness: 0.04,
      ior: 1.46,
      clearcoat: 1.0
    });
    const quartz = new THREE.Mesh(quartzGeo, quartzMat);
    group.add(quartz);
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(quartzGeo), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 }));
    quartz.add(edges);
    return { group };
  }

  // Potassium Hydroxide & Hydrogen Gas (KOH + H2): Effervescent lilac-tinted alkaline fluid droplet
  if (resultId === 'k_h2o') {
    const res = createLiquidDropletMesh(0xc084fc, scale, false);
    group.add(res.group);
    const bubbleGeo = new THREE.SphereGeometry(0.08 * scale, 8, 8);
    const bubbleMat = new THREE.MeshBasicMaterial({ color: 0xf3e8ff, transparent: true, opacity: 0.8 });
    const bubbles: THREE.Mesh[] = [];
    for (let i = 0; i < 10; i++) {
      const b = new THREE.Mesh(bubbleGeo, bubbleMat);
      b.position.set((Math.random() - 0.5) * 1.2 * scale, (Math.random() * 1.6 - 0.5) * scale, (Math.random() - 0.5) * 1.2 * scale);
      group.add(b);
      bubbles.push(b);
    }
    const update = (delta: number, elapsed: number) => {
      res.update?.(delta, elapsed);
      bubbles.forEach((b, idx) => {
        b.position.y += delta * (1.1 + (idx % 3) * 0.4);
        if (b.position.y > 1.9 * scale) {
          b.position.y = -0.4 * scale;
          b.position.x = (Math.random() - 0.5) * 1.2 * scale;
          b.position.z = (Math.random() - 0.5) * 1.2 * scale;
        }
      });
    };
    return { group, update };
  }

  // Calcium Carbonate (CaCO3 Calcite / Limestone): Rhombohedral crystalline calcite stone block
  if (resultId === 'ca_co2') {
    const calciteGeo = new THREE.BoxGeometry(1.6 * scale, 1.3 * scale, 1.4 * scale);
    const pos = calciteGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      pos.setX(i, x + (y / (1.3 * scale)) * 0.45 * scale);
    }
    calciteGeo.computeVertexNormals();
    const calciteMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.55,
      metalness: 0.05
    });
    const calcite = new THREE.Mesh(calciteGeo, calciteMat);
    group.add(calcite);
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(calciteGeo), new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.6 }));
    calcite.add(edges);
    return { group };
  }

  // Aqueous Ethanol Solution (C2H5OH + H2O): Single miscible fluid droplet showing dynamic Schlieren refraction
  if (resultId === 'ethanol_water') {
    return createAqueousEthanolMesh(scale);
  }

  // Calcium Silicate Ceramic Slag (CaSiO3 Wollastonite): Vitreous white fibrous wollastonite ceramic aggregate
  if (resultId === 'sand_ca') {
    const ceramicGeo = new THREE.DodecahedronGeometry(1.5 * scale, 1);
    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      roughness: 0.72,
      metalness: 0.12
    });
    const ceramic = new THREE.Mesh(ceramicGeo, ceramicMat);
    group.add(ceramic);
    return { group };
  }

  // Aqueous Saline Solution (NaCl in H2O): Single coherent saline fluid droplet with solvated Na+ and Cl- ions
  if (resultId === 'salt_water') {
    return createSalineSolutionMesh(scale);
  }

  // Zero Galvanic Displacement (Copper + Water): Copper ingot with beaded hydrophobic liquid water droplets
  if (resultId === 'cu_water') {
    return createCuWaterMesh(scale);
  }

  // Rose Gold Alloy (Cu + Au): Dedicated unified Rose Gold specimen
  if (resultId === 'cu_au') {
    return createRoseGoldAlloyMesh(scale);
  }

  // Iron-Gold Intermetallic Alloy (Fe + Au): Dedicated unified Fe-Au specimen with visible internal iron/gold composition
  if (resultId === 'fe_au') {
    return createFeAuAlloyMesh(scale);
  }

  // Atmospheric Gas Mixture (N2 + O2): Unified atmospheric gas volume with co-mingled molecules
  if (resultId === 'n2_o2') {
    return createAtmosphericGasMesh(scale);
  }

  // Stratified Hydro-Mercurial Immiscible System (Hg + H2O): Unified two-phase fluid droplet
  if (resultId === 'hg_h2o') {
    return createStratifiedHydroMercurialMesh(scale);
  }

  // =========================================================================
  // 2. SCIENTIFIC MIXTURES: UNIFIED COHERENT PHYSICAL MATERIAL SYSTEMS
  // Always renders ONE coherent physical specimen representing the blended system.
  // Never places two separate meshes side-by-side.
  // =========================================================================

  if (inA && inB) {
    const matA = INITIAL_MATERIALS.find(m => m.id === inA);
    const matB = INITIAL_MATERIALS.find(m => m.id === inB);

    if (matA && matB) {
      // A. SOLID + SOLID: Sintered solid-solution / intermetallic alloy specimen
      if (matA.state === 'Solid' && matB.state === 'Solid') {
        return createUnifiedAlloyMesh(matA, matB, scale);
      }

      // B. SOLID + LIQUID: Single colloidal suspension / dispersion liquid volume
      if ((matA.state === 'Solid' && matB.state === 'Liquid') || (matB.state === 'Solid' && matA.state === 'Liquid')) {
        const solidMat = matA.state === 'Solid' ? matA : matB;
        const liquidMat = matA.state === 'Liquid' ? matA : matB;
        return createColloidalSuspensionMesh(liquidMat, solidMat, scale);
      }

      // C. GAS + GAS: Single unified gas cloud volume containing both molecules
      if (matA.state === 'Gas' && matB.state === 'Gas') {
        return createUnifiedGasMixtureMesh(matA, matB, scale);
      }

      // D. LIQUID + LIQUID: Single unified liquid droplet (stratified if mercury, miscible otherwise)
      if (matA.state === 'Liquid' && matB.state === 'Liquid') {
        return createUnifiedLiquidMixtureMesh(matA, matB, scale);
      }

      // E. GAS + SOLID OR GAS + LIQUID: Single dense specimen with adsorbed molecular monolayer
      if (matA.state === 'Gas' || matB.state === 'Gas') {
        const gasMat = matA.state === 'Gas' ? matA : matB;
        const denseMat = matA.state === 'Gas' ? matB : matA;
        return createPhysisorbedSolidMesh(denseMat, gasMat, scale);
      }

      // F. COSMIC PLASMA MIXTURE: Single unified excited plasma core
      if (matA.state === 'Plasma' || matB.state === 'Plasma') {
        const plasmaMat = matA.state === 'Plasma' ? matA : matB;
        const otherMat = matA.state === 'Plasma' ? matB : matA;
        return createUnifiedPlasmaMixtureMesh(plasmaMat, otherMat, scale);
      }
    }
  }

  // =========================================================================
  // 3. SCIENTIFIC FALLBACK: TAILORED DYNAMIC COLOR & STATE
  // Never uses hardcoded blue alloy, generic droplet, or generic cloud.
  // =========================================================================
  const hexColor = parseInt(colorHexStr.replace('#', ''), 16) || 0x38bdf8;

  if (state === 'Liquid') {
    const res = createLiquidDropletMesh(hexColor, scale, false);
    group.add(res.group);
    return { group, update: res.update };
  }

  if (state === 'Gas') {
    const res = createGasCloudMesh(hexColor, scale, 'diatomic');
    group.add(res.group);
    return { group, update: res.update };
  }

  // Solid: Sintered crystalline specimen matching exact colorHex
  const solidGeo = new THREE.DodecahedronGeometry(1.5 * scale, 1);
  const solidMat = new THREE.MeshStandardMaterial({
    color: hexColor,
    roughness: 0.35,
    metalness: 0.65
  });
  const solidMesh = new THREE.Mesh(solidGeo, solidMat);
  group.add(solidMesh);
  return { group };
}
