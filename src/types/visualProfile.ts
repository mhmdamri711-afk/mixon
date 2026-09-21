export type ParticleGeometryType = 
  | 'metallic_fcc' 
  | 'metallic_bcc'
  | 'bent_triatomic' // H2O
  | 'diatomic_gas' // O2, H2, N2, Cl2
  | 'monatomic_gas' // He, Ne, Ar
  | 'ionic_matrix' // NaCl
  | 'carbon_allotrope' // Graphite, Diamond, Fullerene
  | 'covalent_network' // SiO2
  | 'heavy_liquid' // Hg, Br2
  | 'custom_cluster';

export type MovementStyle = 
  | 'lattice_vibrate' // Solid metallic/ionic vibration in place
  | 'fluid_flow' // Viscous liquid drift with shear
  | 'free_diffusion' // High-velocity gas collisions
  | 'light_zippy' // Ultra-fast light gas (H2, He)
  | 'cluster_settle' // Dense heavy particles
  | 'layered_slip'; // Graphite planes sliding

export type CarbonAllotropeType = 'graphite' | 'diamond' | 'nanotube' | 'amorphous';

export interface MaterialVisualProfile {
  id: string;
  particleType: ParticleGeometryType;
  particleColor: string;
  particleSize: number; // base rendering size in pixels / units
  molecularFormula: string;
  molecularStructure: string; // e.g. "Bent (104.5°)", "Diatomic (121 pm)", "FCC (361 pm)", "Ionic Cubic"
  bondingType: 'Metallic' | 'Covalent Polar' | 'Covalent Non-Polar' | 'Ionic' | 'Van der Waals' | 'Network Covalent';
  movementStyle: MovementStyle;
  stateBehavior: 'rigid_lattice' | 'dynamic_fluid' | 'dispersed_gas' | 'viscous_flow';
  crystalStructure: string; // e.g. "FCC", "BCC", "Hexagonal P63/mmc", "Rock Salt Fm-3m"
  densityVisual: number; // 0.1 (rarefied gas) to 1.0 (dense precious metal)
  reactionVisual: 'surface_oxidation' | 'dissolution' | 'spark_combustion' | 'acid_attack' | 'passivation' | 'inert';
  glowLevel: number; // 0 to 1 specular / energetic luminescence
  surfaceAppearance: 'metallic_specular' | 'fluid_meniscus' | 'crystal_facets' | 'hazy_gas' | 'dull_graphite';
  temperatureResponse: {
    vibrationFactor: number; // How much thermal excitation increases velocity/jitter
    expansionRate: number; // Thermal expansion tendency
    phaseChangeThreshold: number; // Celsius where behavior shifts
  };
  // Specific extras
  allotropes?: CarbonAllotropeType[];
  ionicCharges?: { cation: string; anion: string; ratio: string };
  intermolecularForces?: string; // e.g. "Hydrogen Bonding", "London Dispersion"

  // Unique visual shape & 3D rendering identity
  shapeModel?: string;
  roughnessVal?: number;
  metalnessVal?: number;
  transmissionVal?: number;
  iorVal?: number;
  clearcoatVal?: number;
  specularHighlight?: string;
  visualDescriptionEn?: string;
  visualDescriptionAr?: string;
}
