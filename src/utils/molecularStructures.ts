export interface Atom3D {
  id: string;
  element: string;
  name: string;
  position: [number, number, number];
  color: string;
  radius: number; // Ball & stick radius
  vdwRadius: number; // Space-filling Van der Waals radius
  atomicNumber: number;
  electronegativity: number;
  valenceElectrons: number;
  charge?: string;
}

export interface Bond3D {
  from: string;
  to: string;
  order: 1 | 2 | 3;
  type: 'covalent' | 'ionic' | 'metallic' | 'hydrogen';
  lengthAngstroms?: number;
}

export interface MolecularData {
  id: string;
  name: string;
  formula: string;
  category: 'element' | 'diatomic' | 'molecule' | 'crystal' | 'ionic';
  description: string;
  geometry: string;
  bondAngle?: string;
  dipoleMoment?: string;
  symmetry?: string;
  atoms: Atom3D[];
  bonds: Bond3D[];
  latticeBounds?: [number, number, number];
}

// Standard CPK Coloring & Physical Radii
export const ELEMENT_SPECS: Record<string, {
  name: string;
  color: string;
  radius: number;
  vdwRadius: number;
  atomicNumber: number;
  electronegativity: number;
  valenceElectrons: number;
}> = {
  H: { name: 'Hydrogen', color: '#f8fafc', radius: 0.45, vdwRadius: 1.1, atomicNumber: 1, electronegativity: 2.20, valenceElectrons: 1 },
  He: { name: 'Helium', color: '#f472b6', radius: 0.48, vdwRadius: 1.4, atomicNumber: 2, electronegativity: 0, valenceElectrons: 2 },
  C: { name: 'Carbon', color: '#475569', radius: 0.72, vdwRadius: 1.7, atomicNumber: 6, electronegativity: 2.55, valenceElectrons: 4 },
  N: { name: 'Nitrogen', color: '#3b82f6', radius: 0.68, vdwRadius: 1.55, atomicNumber: 7, electronegativity: 3.04, valenceElectrons: 5 },
  O: { name: 'Oxygen', color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6 },
  Na: { name: 'Sodium', color: '#8b5cf6', radius: 1.0, vdwRadius: 2.27, atomicNumber: 11, electronegativity: 0.93, valenceElectrons: 1 },
  Si: { name: 'Silicon', color: '#94a3b8', radius: 0.85, vdwRadius: 2.1, atomicNumber: 14, electronegativity: 1.90, valenceElectrons: 4 },
  Cl: { name: 'Chlorine', color: '#22c55e', radius: 0.88, vdwRadius: 1.75, atomicNumber: 17, electronegativity: 3.16, valenceElectrons: 7 },
  Ti: { name: 'Titanium', color: '#38bdf8', radius: 1.05, vdwRadius: 2.0, atomicNumber: 22, electronegativity: 1.54, valenceElectrons: 4 },
  Fe: { name: 'Iron', color: '#ea580c', radius: 1.0, vdwRadius: 2.04, atomicNumber: 26, electronegativity: 1.83, valenceElectrons: 8 },
  Cu: { name: 'Copper', color: '#b87333', radius: 0.98, vdwRadius: 1.96, atomicNumber: 29, electronegativity: 1.90, valenceElectrons: 11 },
  Au: { name: 'Gold', color: '#eab308', radius: 1.15, vdwRadius: 2.14, atomicNumber: 79, electronegativity: 2.54, valenceElectrons: 11 },
  Hg: { name: 'Mercury', color: '#cbd5e1', radius: 1.12, vdwRadius: 2.23, atomicNumber: 80, electronegativity: 2.00, valenceElectrons: 12 },
};

export function getElementSpec(symbol: string) {
  const clean = symbol.trim();
  return ELEMENT_SPECS[clean] || {
    name: clean,
    color: '#0ea5e9',
    radius: 0.8,
    vdwRadius: 1.7,
    atomicNumber: 0,
    electronegativity: 2.0,
    valenceElectrons: 4
  };
}

// Pre-defined Accurate Molecular Geometries
export const PRESET_STRUCTURES: Record<string, MolecularData> = {
  // --- WATER (H2O) ---
  water: {
    id: 'water',
    name: 'Water',
    formula: 'H₂O',
    category: 'molecule',
    description: 'Bent polar molecule with 104.5° H-O-H bond angle and strong permanent dipole moment (1.85 D).',
    geometry: 'Bent (V-shaped)',
    bondAngle: '104.45°',
    dipoleMoment: '1.85 Debye',
    symmetry: 'C2v',
    atoms: [
      { id: 'O1', element: 'O', name: 'Oxygen', position: [0, 0.25, 0], color: '#ef4444', radius: 0.7, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6, charge: 'δ⁻' },
      { id: 'H1', element: 'H', name: 'Hydrogen', position: [-1.45, -0.95, 0], color: '#f8fafc', radius: 0.45, vdwRadius: 1.1, atomicNumber: 1, electronegativity: 2.20, valenceElectrons: 1, charge: 'δ⁺' },
      { id: 'H2', element: 'H', name: 'Hydrogen', position: [1.45, -0.95, 0], color: '#f8fafc', radius: 0.45, vdwRadius: 1.1, atomicNumber: 1, electronegativity: 2.20, valenceElectrons: 1, charge: 'δ⁺' },
    ],
    bonds: [
      { from: 'O1', to: 'H1', order: 1, type: 'covalent', lengthAngstroms: 0.96 },
      { from: 'O1', to: 'H2', order: 1, type: 'covalent', lengthAngstroms: 0.96 }
    ]
  },

  // --- CARBON DIOXIDE (CO2) ---
  carbon_dioxide: {
    id: 'carbon_dioxide',
    name: 'Carbon Dioxide',
    formula: 'CO₂',
    category: 'molecule',
    description: 'Linear centro-symmetric molecule with two polar C=O double bonds that cancel out, resulting in zero net dipole.',
    geometry: 'Linear',
    bondAngle: '180.0°',
    dipoleMoment: '0.00 Debye',
    symmetry: 'D∞h',
    atoms: [
      { id: 'C1', element: 'C', name: 'Carbon', position: [0, 0, 0], color: '#475569', radius: 0.72, vdwRadius: 1.7, atomicNumber: 6, electronegativity: 2.55, valenceElectrons: 4, charge: 'δ⁺' },
      { id: 'O1', element: 'O', name: 'Oxygen', position: [-2.1, 0, 0], color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6, charge: 'δ⁻' },
      { id: 'O2', element: 'O', name: 'Oxygen', position: [2.1, 0, 0], color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6, charge: 'δ⁻' },
    ],
    bonds: [
      { from: 'C1', to: 'O1', order: 2, type: 'covalent', lengthAngstroms: 1.16 },
      { from: 'C1', to: 'O2', order: 2, type: 'covalent', lengthAngstroms: 1.16 }
    ]
  },

  // --- METHANE (CH4) ---
  methane: {
    id: 'methane',
    name: 'Methane',
    formula: 'CH₄',
    category: 'molecule',
    description: 'Ideal tetrahedral geometry with four equivalent C-H sigma bonds at 109.5° angles.',
    geometry: 'Tetrahedral',
    bondAngle: '109.47°',
    dipoleMoment: '0.00 Debye',
    symmetry: 'Td',
    atoms: [
      { id: 'C1', element: 'C', name: 'Carbon', position: [0, 0, 0], color: '#475569', radius: 0.72, vdwRadius: 1.7, atomicNumber: 6, electronegativity: 2.55, valenceElectrons: 4 },
      { id: 'H1', element: 'H', name: 'Hydrogen', position: [0, 1.8, 0], color: '#f8fafc', radius: 0.45, vdwRadius: 1.1, atomicNumber: 1, electronegativity: 2.20, valenceElectrons: 1 },
      { id: 'H2', element: 'H', name: 'Hydrogen', position: [1.7, -0.6, 0], color: '#f8fafc', radius: 0.45, vdwRadius: 1.1, atomicNumber: 1, electronegativity: 2.20, valenceElectrons: 1 },
      { id: 'H3', element: 'H', name: 'Hydrogen', position: [-0.85, -0.6, 1.47], color: '#f8fafc', radius: 0.45, vdwRadius: 1.1, atomicNumber: 1, electronegativity: 2.20, valenceElectrons: 1 },
      { id: 'H4', element: 'H', name: 'Hydrogen', position: [-0.85, -0.6, -1.47], color: '#f8fafc', radius: 0.45, vdwRadius: 1.1, atomicNumber: 1, electronegativity: 2.20, valenceElectrons: 1 },
    ],
    bonds: [
      { from: 'C1', to: 'H1', order: 1, type: 'covalent', lengthAngstroms: 1.09 },
      { from: 'C1', to: 'H2', order: 1, type: 'covalent', lengthAngstroms: 1.09 },
      { from: 'C1', to: 'H3', order: 1, type: 'covalent', lengthAngstroms: 1.09 },
      { from: 'C1', to: 'H4', order: 1, type: 'covalent', lengthAngstroms: 1.09 },
    ]
  },

  // --- SODIUM CHLORIDE (NaCl Rock-Salt Lattice) ---
  salt: {
    id: 'salt',
    name: 'Sodium Chloride',
    formula: 'NaCl',
    category: 'crystal',
    description: 'Face-centered cubic (FCC) rock-salt lattice where each Na⁺ ion is octahedrally coordinated by 6 Cl⁻ ions.',
    geometry: 'Cubic Rock-Salt Lattice (FCC)',
    bondAngle: '90.0°',
    dipoleMoment: 'Ionic Crystal',
    symmetry: 'Fm-3m',
    latticeBounds: [3, 3, 3],
    atoms: generateNaClLattice(),
    bonds: generateNaClBonds()
  },

  // --- OXYGEN GAS (O2) ---
  oxygen: {
    id: 'oxygen',
    name: 'Diatomic Oxygen',
    formula: 'O₂',
    category: 'diatomic',
    description: 'Diatomic homonuclear molecule with a strong covalent double bond (O=O) and paramagnetic electronic ground state.',
    geometry: 'Linear Diatomic',
    bondAngle: '180°',
    dipoleMoment: '0.00 Debye',
    symmetry: 'D∞h',
    atoms: [
      { id: 'O1', element: 'O', name: 'Oxygen', position: [-1.1, 0, 0], color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6 },
      { id: 'O2', element: 'O', name: 'Oxygen', position: [1.1, 0, 0], color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6 },
    ],
    bonds: [
      { from: 'O1', to: 'O2', order: 2, type: 'covalent', lengthAngstroms: 1.21 }
    ]
  },

  // --- HYDROGEN GAS (H2) ---
  hydrogen: {
    id: 'hydrogen',
    name: 'Diatomic Hydrogen',
    formula: 'H₂',
    category: 'diatomic',
    description: 'Simplest diatomic molecule bound by a single covalent sigma bond between two 1s electron orbitals.',
    geometry: 'Linear Diatomic',
    bondAngle: '180°',
    dipoleMoment: '0.00 Debye',
    symmetry: 'D∞h',
    atoms: [
      { id: 'H1', element: 'H', name: 'Hydrogen', position: [-0.74, 0, 0], color: '#f8fafc', radius: 0.45, vdwRadius: 1.1, atomicNumber: 1, electronegativity: 2.20, valenceElectrons: 1 },
      { id: 'H2', element: 'H', name: 'Hydrogen', position: [0.74, 0, 0], color: '#f8fafc', radius: 0.45, vdwRadius: 1.1, atomicNumber: 1, electronegativity: 2.20, valenceElectrons: 1 },
    ],
    bonds: [
      { from: 'H1', to: 'H2', order: 1, type: 'covalent', lengthAngstroms: 0.74 }
    ]
  },

  // --- NITROGEN GAS (N2) ---
  nitrogen: {
    id: 'nitrogen',
    name: 'Diatomic Nitrogen',
    formula: 'N₂',
    category: 'diatomic',
    description: 'Exceptionally stable diatomic gas with one sigma and two pi bonds forming a triple bond (N≡N) with 945 kJ/mol bond energy.',
    geometry: 'Linear Diatomic',
    bondAngle: '180°',
    dipoleMoment: '0.00 Debye',
    symmetry: 'D∞h',
    atoms: [
      { id: 'N1', element: 'N', name: 'Nitrogen', position: [-1.0, 0, 0], color: '#3b82f6', radius: 0.68, vdwRadius: 1.55, atomicNumber: 7, electronegativity: 3.04, valenceElectrons: 5 },
      { id: 'N2', element: 'N', name: 'Nitrogen', position: [1.0, 0, 0], color: '#3b82f6', radius: 0.68, vdwRadius: 1.55, atomicNumber: 7, electronegativity: 3.04, valenceElectrons: 5 },
    ],
    bonds: [
      { from: 'N1', to: 'N2', order: 3, type: 'covalent', lengthAngstroms: 1.10 }
    ]
  },

  // --- CHLORINE GAS (Cl2) ---
  chlorine: {
    id: 'chlorine',
    name: 'Diatomic Chlorine',
    formula: 'Cl₂',
    category: 'diatomic',
    description: 'Halogen diatomic gas held by a single covalent sigma bond with dense valence electron shells.',
    geometry: 'Linear Diatomic',
    bondAngle: '180°',
    dipoleMoment: '0.00 Debye',
    symmetry: 'D∞h',
    atoms: [
      { id: 'Cl1', element: 'Cl', name: 'Chlorine', position: [-1.3, 0, 0], color: '#22c55e', radius: 0.88, vdwRadius: 1.75, atomicNumber: 17, electronegativity: 3.16, valenceElectrons: 7 },
      { id: 'Cl2', element: 'Cl', name: 'Chlorine', position: [1.3, 0, 0], color: '#22c55e', radius: 0.88, vdwRadius: 1.75, atomicNumber: 17, electronegativity: 3.16, valenceElectrons: 7 },
    ],
    bonds: [
      { from: 'Cl1', to: 'Cl2', order: 1, type: 'covalent', lengthAngstroms: 1.99 }
    ]
  },

  // --- QUARTZ (SiO2 Network) ---
  quartz: {
    id: 'quartz',
    name: 'Quartz / Silicon Dioxide',
    formula: 'SiO₂',
    category: 'crystal',
    description: 'Three-dimensional framework of corner-sharing SiO₄ tetrahedra with a 144° Si-O-Si bridging angle.',
    geometry: 'Trigonal Network (Corner-Sharing Tetrahedra)',
    bondAngle: '144.0° (Si-O-Si)',
    dipoleMoment: 'Covalent Network',
    symmetry: 'P3121',
    atoms: [
      { id: 'Si1', element: 'Si', name: 'Silicon', position: [0, 0, 0], color: '#94a3b8', radius: 0.85, vdwRadius: 2.1, atomicNumber: 14, electronegativity: 1.90, valenceElectrons: 4 },
      { id: 'O1', element: 'O', name: 'Oxygen', position: [1.2, 1.2, 0.8], color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6 },
      { id: 'O2', element: 'O', name: 'Oxygen', position: [-1.2, -1.2, 0.8], color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6 },
      { id: 'O3', element: 'O', name: 'Oxygen', position: [1.2, -1.2, -0.8], color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6 },
      { id: 'O4', element: 'O', name: 'Oxygen', position: [-1.2, 1.2, -0.8], color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6 },
      { id: 'Si2', element: 'Si', name: 'Silicon', position: [2.4, 2.4, 1.6], color: '#94a3b8', radius: 0.85, vdwRadius: 2.1, atomicNumber: 14, electronegativity: 1.90, valenceElectrons: 4 },
      { id: 'Si3', element: 'Si', name: 'Silicon', position: [-2.4, -2.4, 1.6], color: '#94a3b8', radius: 0.85, vdwRadius: 2.1, atomicNumber: 14, electronegativity: 1.90, valenceElectrons: 4 },
    ],
    bonds: [
      { from: 'Si1', to: 'O1', order: 1, type: 'covalent', lengthAngstroms: 1.61 },
      { from: 'Si1', to: 'O2', order: 1, type: 'covalent', lengthAngstroms: 1.61 },
      { from: 'Si1', to: 'O3', order: 1, type: 'covalent', lengthAngstroms: 1.61 },
      { from: 'Si1', to: 'O4', order: 1, type: 'covalent', lengthAngstroms: 1.61 },
      { from: 'O1', to: 'Si2', order: 1, type: 'covalent', lengthAngstroms: 1.61 },
      { from: 'O2', to: 'Si3', order: 1, type: 'covalent', lengthAngstroms: 1.61 },
    ]
  },

  // --- DIAMOND (C Crystalline Lattice) ---
  diamond: {
    id: 'diamond',
    name: 'Diamond Cubic Carbon',
    formula: 'C',
    category: 'crystal',
    description: 'Face-centered cubic bravais lattice with a two-atom carbon motif forming tetrahedral sp³ bonds in all 3 dimensions.',
    geometry: 'Diamond Cubic (Fd-3m)',
    bondAngle: '109.5°',
    dipoleMoment: '0.00 Debye',
    symmetry: 'Fd-3m',
    atoms: generateDiamondLattice(),
    bonds: generateDiamondBonds()
  },

  // --- COPPER(II) OXIDE (CuO) ---
  cu_o2: {
    id: 'cu_o2',
    name: 'Copper(II) Oxide',
    formula: 'CuO',
    category: 'crystal',
    description: 'Monoclinic crystal structure where Cu²⁺ cations are coordinated by four oxygen atoms in a square planar configuration.',
    geometry: 'Square Planar Monoclinic',
    bondAngle: '90° / 180°',
    dipoleMoment: 'Ionic/Covalent Mix',
    atoms: [
      { id: 'Cu1', element: 'Cu', name: 'Copper', position: [0, 0, 0], color: '#b87333', radius: 0.98, vdwRadius: 1.96, atomicNumber: 29, electronegativity: 1.90, valenceElectrons: 11, charge: '+2' },
      { id: 'O1', element: 'O', name: 'Oxygen', position: [1.8, 0, 0], color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6, charge: '-2' },
      { id: 'O2', element: 'O', name: 'Oxygen', position: [-1.8, 0, 0], color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6, charge: '-2' },
      { id: 'O3', element: 'O', name: 'Oxygen', position: [0, 1.8, 0], color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6, charge: '-2' },
      { id: 'O4', element: 'O', name: 'Oxygen', position: [0, -1.8, 0], color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6, charge: '-2' },
      { id: 'Cu2', element: 'Cu', name: 'Copper', position: [1.8, 1.8, 0], color: '#b87333', radius: 0.98, vdwRadius: 1.96, atomicNumber: 29, electronegativity: 1.90, valenceElectrons: 11, charge: '+2' },
    ],
    bonds: [
      { from: 'Cu1', to: 'O1', order: 1, type: 'ionic', lengthAngstroms: 1.95 },
      { from: 'Cu1', to: 'O2', order: 1, type: 'ionic', lengthAngstroms: 1.95 },
      { from: 'Cu1', to: 'O3', order: 1, type: 'ionic', lengthAngstroms: 1.95 },
      { from: 'Cu1', to: 'O4', order: 1, type: 'ionic', lengthAngstroms: 1.95 },
      { from: 'O1', to: 'Cu2', order: 1, type: 'ionic', lengthAngstroms: 1.95 },
      { from: 'O3', to: 'Cu2', order: 1, type: 'ionic', lengthAngstroms: 1.95 },
    ]
  },

  // --- IRON(III) OXIDE (Fe2O3 Hematite) ---
  fe_o2: {
    id: 'fe_o2',
    name: 'Iron(III) Oxide',
    formula: 'Fe₂O₃',
    category: 'crystal',
    description: 'Corundum-type rhombohedral structure with edge-sharing and face-sharing FeO₆ octahedra.',
    geometry: 'Trigonal Corundum Octahedra',
    bondAngle: '90° / 120°',
    dipoleMoment: 'Ionic Sublattice',
    atoms: [
      { id: 'Fe1', element: 'Fe', name: 'Iron', position: [0, 1.4, 0], color: '#ea580c', radius: 1.0, vdwRadius: 2.04, atomicNumber: 26, electronegativity: 1.83, valenceElectrons: 8, charge: '+3' },
      { id: 'Fe2', element: 'Fe', name: 'Iron', position: [0, -1.4, 0], color: '#ea580c', radius: 1.0, vdwRadius: 2.04, atomicNumber: 26, electronegativity: 1.83, valenceElectrons: 8, charge: '+3' },
      { id: 'O1', element: 'O', name: 'Oxygen', position: [1.6, 0, 0], color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6, charge: '-2' },
      { id: 'O2', element: 'O', name: 'Oxygen', position: [-0.8, 0, 1.38], color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6, charge: '-2' },
      { id: 'O3', element: 'O', name: 'Oxygen', position: [-0.8, 0, -1.38], color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6, charge: '-2' },
    ],
    bonds: [
      { from: 'Fe1', to: 'O1', order: 1, type: 'ionic', lengthAngstroms: 1.94 },
      { from: 'Fe1', to: 'O2', order: 1, type: 'ionic', lengthAngstroms: 1.94 },
      { from: 'Fe1', to: 'O3', order: 1, type: 'ionic', lengthAngstroms: 1.94 },
      { from: 'Fe2', to: 'O1', order: 1, type: 'ionic', lengthAngstroms: 1.94 },
      { from: 'Fe2', to: 'O2', order: 1, type: 'ionic', lengthAngstroms: 1.94 },
      { from: 'Fe2', to: 'O3', order: 1, type: 'ionic', lengthAngstroms: 1.94 },
    ]
  },

  // --- SODIUM HYDROXIDE (NaOH) ---
  na_h2o: {
    id: 'na_h2o',
    name: 'Sodium Hydroxide',
    formula: 'NaOH',
    category: 'ionic',
    description: 'Ionic salt consisting of sodium cations Na⁺ and hydroxide anions OH⁻ connected via electrostatic attraction.',
    geometry: 'Ionic Linear Pair',
    bondAngle: '180°',
    dipoleMoment: '6.83 Debye',
    atoms: [
      { id: 'Na1', element: 'Na', name: 'Sodium', position: [-1.8, 0, 0], color: '#8b5cf6', radius: 1.0, vdwRadius: 2.27, atomicNumber: 11, electronegativity: 0.93, valenceElectrons: 1, charge: '+1' },
      { id: 'O1', element: 'O', name: 'Oxygen', position: [0.6, 0, 0], color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6, charge: '-1' },
      { id: 'H1', element: 'H', name: 'Hydrogen', position: [1.8, 0, 0], color: '#f8fafc', radius: 0.45, vdwRadius: 1.1, atomicNumber: 1, electronegativity: 2.20, valenceElectrons: 1 },
    ],
    bonds: [
      { from: 'Na1', to: 'O1', order: 1, type: 'ionic', lengthAngstroms: 2.36 },
      { from: 'O1', to: 'H1', order: 1, type: 'covalent', lengthAngstroms: 0.96 },
    ]
  },

  // --- SODIUM BICARBONATE (NaHCO3) ---
  baking_soda: {
    id: 'baking_soda',
    name: 'Sodium Bicarbonate',
    formula: 'NaHCO₃',
    category: 'molecule',
    description: 'Planar bicarbonate anion [HCO₃]⁻ coordinated electrostatically to sodium Na⁺ cation.',
    geometry: 'Trigonal Planar Bicarbonate + Na⁺',
    bondAngle: '120° (O-C-O)',
    dipoleMoment: 'Ionic Salt',
    atoms: [
      { id: 'Na1', element: 'Na', name: 'Sodium', position: [-2.4, 0.8, 0], color: '#8b5cf6', radius: 1.0, vdwRadius: 2.27, atomicNumber: 11, electronegativity: 0.93, valenceElectrons: 1, charge: '+1' },
      { id: 'C1', element: 'C', name: 'Carbon', position: [0.2, 0, 0], color: '#475569', radius: 0.72, vdwRadius: 1.7, atomicNumber: 6, electronegativity: 2.55, valenceElectrons: 4 },
      { id: 'O1', element: 'O', name: 'Oxygen', position: [-0.6, -1.3, 0], color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6, charge: 'δ⁻' },
      { id: 'O2', element: 'O', name: 'Oxygen', position: [-0.6, 1.3, 0], color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6, charge: 'δ⁻' },
      { id: 'O3', element: 'O', name: 'Oxygen', position: [1.7, 0, 0], color: '#ef4444', radius: 0.65, vdwRadius: 1.52, atomicNumber: 8, electronegativity: 3.44, valenceElectrons: 6 },
      { id: 'H1', element: 'H', name: 'Hydrogen', position: [2.4, -0.8, 0], color: '#f8fafc', radius: 0.45, vdwRadius: 1.1, atomicNumber: 1, electronegativity: 2.20, valenceElectrons: 1 },
    ],
    bonds: [
      { from: 'C1', to: 'O1', order: 2, type: 'covalent', lengthAngstroms: 1.25 },
      { from: 'C1', to: 'O2', order: 1, type: 'covalent', lengthAngstroms: 1.30 },
      { from: 'C1', to: 'O3', order: 1, type: 'covalent', lengthAngstroms: 1.35 },
      { from: 'O3', to: 'H1', order: 1, type: 'covalent', lengthAngstroms: 0.98 },
      { from: 'Na1', to: 'O2', order: 1, type: 'ionic', lengthAngstroms: 2.40 },
    ]
  }
};

// Helper: Generate Rock-Salt (NaCl) Cubic Lattice Unit Cell
function generateNaClLattice(): Atom3D[] {
  const atoms: Atom3D[] = [];
  const spacing = 1.6;
  let idCounter = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const isNa = (x + y + z) % 2 === 0;
        idCounter++;
        atoms.push({
          id: `node_${idCounter}`,
          element: isNa ? 'Na' : 'Cl',
          name: isNa ? 'Sodium' : 'Chlorine',
          position: [x * spacing, y * spacing, z * spacing],
          color: isNa ? '#8b5cf6' : '#22c55e',
          radius: isNa ? 0.75 : 0.9,
          vdwRadius: isNa ? 1.4 : 1.75,
          atomicNumber: isNa ? 11 : 17,
          electronegativity: isNa ? 0.93 : 3.16,
          valenceElectrons: isNa ? 1 : 7,
          charge: isNa ? '+1' : '-1'
        });
      }
    }
  }
  return atoms;
}

function generateNaClBonds(): Bond3D[] {
  const bonds: Bond3D[] = [];
  // Connect nearest neighbors along grid lines
  const spacing = 1.6;
  const tolerance = 0.1;
  const atoms = generateNaClLattice();
  for (let i = 0; i < atoms.length; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      const a = atoms[i];
      const b = atoms[j];
      const dist = Math.hypot(a.position[0] - b.position[0], a.position[1] - b.position[1], a.position[2] - b.position[2]);
      if (Math.abs(dist - spacing) < tolerance) {
        bonds.push({
          from: a.id,
          to: b.id,
          order: 1,
          type: 'ionic',
          lengthAngstroms: 2.82
        });
      }
    }
  }
  return bonds;
}

// Helper: Generate Diamond Lattice Unit Cell
function generateDiamondLattice(): Atom3D[] {
  const atoms: Atom3D[] = [];
  const coords: [number, number, number][] = [
    // Corners
    [-2, -2, -2], [2, -2, -2], [-2, 2, -2], [2, 2, -2],
    [-2, -2, 2], [2, -2, 2], [-2, 2, 2], [2, 2, 2],
    // Face Centers
    [0, 0, -2], [0, 0, 2], [0, -2, 0], [0, 2, 0], [-2, 0, 0], [2, 0, 0],
    // Interior Tetrahedral positions
    [-1, -1, -1], [1, 1, -1], [1, -1, 1], [-1, 1, 1]
  ];
  coords.forEach((c, idx) => {
    atoms.push({
      id: `C_diam_${idx}`,
      element: 'C',
      name: 'Carbon',
      position: c,
      color: '#38bdf8',
      radius: 0.6,
      vdwRadius: 1.5,
      atomicNumber: 6,
      electronegativity: 2.55,
      valenceElectrons: 4
    });
  });
  return atoms;
}

function generateDiamondBonds(): Bond3D[] {
  const bonds: Bond3D[] = [];
  // Connect interior tetrahedral carbon nodes to nearest neighbors
  const interior = ['C_diam_14', 'C_diam_15', 'C_diam_16', 'C_diam_17'];
  const atoms = generateDiamondLattice();
  interior.forEach(intId => {
    const intAtom = atoms.find(a => a.id === intId);
    if (!intAtom) return;
    atoms.forEach(other => {
      if (other.id === intId) return;
      const d = Math.hypot(intAtom.position[0] - other.position[0], intAtom.position[1] - other.position[1], intAtom.position[2] - other.position[2]);
      if (d < 1.9) {
        bonds.push({
          from: intId,
          to: other.id,
          order: 1,
          type: 'covalent',
          lengthAngstroms: 1.54
        });
      }
    });
  });
  return bonds;
}

// Generate Metal Lattice (FCC or BCC) for pure metal elements
export function generateMetalLattice(symbol: string, name: string): MolecularData {
  const spec = getElementSpec(symbol);
  const atoms: Atom3D[] = [];
  const coords: [number, number, number][] = [
    // 8 Cube Corners
    [-2, -2, -2], [2, -2, -2], [-2, 2, -2], [2, 2, -2],
    [-2, -2, 2], [2, -2, 2], [-2, 2, 2], [2, 2, 2],
    // 6 Face Centers
    [0, 0, -2], [0, 0, 2], [0, -2, 0], [0, 2, 0], [-2, 0, 0], [2, 0, 0],
  ];

  coords.forEach((c, idx) => {
    atoms.push({
      id: `${symbol}_lat_${idx}`,
      element: symbol,
      name,
      position: c,
      color: spec.color,
      radius: spec.radius * 0.9,
      vdwRadius: spec.vdwRadius,
      atomicNumber: spec.atomicNumber,
      electronegativity: spec.electronegativity,
      valenceElectrons: spec.valenceElectrons,
      charge: '0'
    });
  });

  const bonds: Bond3D[] = [];
  // Connect adjacent edges
  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 8; j++) {
      const a = coords[i];
      const b = coords[j];
      const dist = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
      if (Math.abs(dist - 4) < 0.1) {
        bonds.push({
          from: atoms[i].id,
          to: atoms[j].id,
          order: 1,
          type: 'metallic',
          lengthAngstroms: 2.55
        });
      }
    }
  }

  return {
    id: `${symbol.toLowerCase()}_crystal`,
    name: `${name} Metallic Unit Cell`,
    formula: symbol,
    category: 'crystal',
    description: `Face-centered cubic (FCC) close-packed metallic crystal lattice unit cell of ${name}.`,
    geometry: 'Face-Centered Cubic (FCC)',
    bondAngle: '90° / 60°',
    dipoleMoment: 'Metallic Delocalized',
    symmetry: 'Fm-3m',
    latticeBounds: [4, 4, 4],
    atoms,
    bonds
  };
}

// Universal Resolver: Resolves any material, element, or compound into rich 3D Molecular Data
export function getMolecularData(materialOrId: { id?: string; symbol?: string; name?: string; category?: string; state?: string }): MolecularData {
  const id = (materialOrId.id || '').toLowerCase().trim();
  const symbol = (materialOrId.symbol || '').trim();
  const name = materialOrId.name || symbol || 'Sample';

  // 1. Check direct preset
  if (PRESET_STRUCTURES[id]) {
    return PRESET_STRUCTURES[id];
  }

  // 2. Check by formula/symbol matches
  if (symbol === 'H₂O' || symbol === 'H2O' || id.includes('water')) return PRESET_STRUCTURES.water;
  if (symbol === 'CO₂' || symbol === 'CO2' || id.includes('co2')) return PRESET_STRUCTURES.carbon_dioxide;
  if (symbol === 'CH₄' || symbol === 'CH4' || id.includes('methane')) return PRESET_STRUCTURES.methane;
  if (symbol === 'NaCl' || id.includes('salt')) return PRESET_STRUCTURES.salt;
  if (symbol === 'SiO₂' || symbol === 'SiO2' || id.includes('quartz')) return PRESET_STRUCTURES.quartz;
  if (symbol === 'O₂' || symbol === 'O2' || (symbol === 'O' && materialOrId.state === 'Gas')) return PRESET_STRUCTURES.oxygen;
  if (symbol === 'H₂' || symbol === 'H2' || (symbol === 'H' && materialOrId.state === 'Gas')) return PRESET_STRUCTURES.hydrogen;
  if (symbol === 'N₂' || symbol === 'N2' || (symbol === 'N' && materialOrId.state === 'Gas')) return PRESET_STRUCTURES.nitrogen;
  if (symbol === 'Cl₂' || symbol === 'Cl2' || (symbol === 'Cl' && materialOrId.state === 'Gas')) return PRESET_STRUCTURES.chlorine;
  if (symbol === 'CuO' || id.includes('cu_o2')) return PRESET_STRUCTURES.cu_o2;
  if (symbol === 'Fe₂O₃' || symbol === 'Fe2O3' || id.includes('fe_o2')) return PRESET_STRUCTURES.fe_o2;
  if (symbol === 'NaOH' || id.includes('na_h2o')) return PRESET_STRUCTURES.na_h2o;
  if (symbol === 'NaHCO₃' || symbol === 'NaHCO3' || id.includes('baking_soda')) return PRESET_STRUCTURES.baking_soda;

  // 3. Check for solid metal elements -> Generate unit cell
  const metalSymbols = ['Cu', 'Au', 'Fe', 'Ti', 'Na', 'Hg'];
  if (metalSymbols.includes(symbol) || materialOrId.category === 'Metals') {
    return generateMetalLattice(symbol, name);
  }

  // 4. Default: Single Element / Noble Gas / General Atom
  const spec = getElementSpec(symbol);
  return {
    id: id || symbol.toLowerCase(),
    name,
    formula: symbol,
    category: 'element',
    description: `Atomic model of ${name} (${symbol}) with nucleus, quantum energy shells, and valence electrons.`,
    geometry: 'Spherical Atomic Symmetry',
    bondAngle: 'N/A (Monatomic)',
    dipoleMoment: '0.00 Debye',
    atoms: [
      {
        id: `${symbol}_core`,
        element: symbol,
        name,
        position: [0, 0, 0],
        color: spec.color,
        radius: 1.0,
        vdwRadius: spec.vdwRadius,
        atomicNumber: spec.atomicNumber,
        electronegativity: spec.electronegativity,
        valenceElectrons: spec.valenceElectrons,
        charge: '0'
      }
    ],
    bonds: []
  };
}
