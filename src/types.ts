export type MatterState = 'Solid' | 'Liquid' | 'Gas' | 'Plasma';

export type MaterialRarity = 'Common' | 'Rare' | 'Exotic' | 'Legendary';

export type MaterialCategory = 
  | 'Elements' 
  | 'Metals' 
  | 'Minerals' 
  | 'Gases' 
  | 'Liquids' 
  | 'Organic' 
  | 'Everyday Materials' 
  | 'Space' 
  | 'Custom';

export interface Material {
  id: string;
  name: string;
  nameAr?: string;
  symbol: string;
  atomicNumber?: number;
  category: MaterialCategory;
  rarity?: MaterialRarity;
  state: MatterState;
  colorHex: string;
  particleColor: string;
  density: string; // e.g. "8.96 g/cm³"
  meltingPoint: string; // e.g. "1085 °C"
  boilingPoint: string; // e.g. "2562 °C"
  appearance: string;
  conductivity: 'High' | 'Medium' | 'Low' | 'Non-conductive' | 'Superconductor';
  reactivity: 'Very High' | 'High' | 'Moderate' | 'Low' | 'Inert';
  oxidationStates: string;
  chemicalBehavior: string;
  interestingFacts: string[];
  timeline: { year: string; event: string }[];
  isHazardousSimulation?: boolean;
  hazardWarning?: string;
  custom?: boolean;

  // Scientific data-driven physical simulation properties
  visualProfile?: string;
  particleType?: 'atom' | 'molecule' | 'ion' | 'droplet' | 'crystal_node' | 'gas_pair' | 'lattice_unit';
  movementStyle?: 'vibration' | 'flow' | 'diffusion' | 'lattice' | 'droplet_cluster';
  surfaceAppearance?: string;
  roughnessVal?: number;
  metalnessVal?: number;
  transparencyVal?: number;
  densityVisual?: number;
  thermalExpansion?: string;
  thermalConductivity?: string;
  molecularStructure?: string;
  crystalStructure?: string;
  temperatureResponse?: string;
  temperatureResponseAr?: string;
  thermalBehavior?: {
    vibrationRate: number; // vibration sensitivity (0.1 - 2.5)
    meltingPointNum: number; // Celsius
    boilingPointNum: number; // Celsius
    glowThresholdTemp?: number; // Celsius where incandescence starts
    solidBelow?: number;
    gasAbove?: number;
  };
  pressureBehavior?: {
    compressibility: 'high' | 'medium' | 'low' | 'negligible';
    volumeReductionFactor: number; // volume shrink ratio at max pressure (5 atm)
    collisionFrequencyMultiplier: number;
  };
}

export interface ReactionResult {
  id: string;
  inputA: string;
  inputB: string;
  outputName: string;
  outputFormula: string;
  outputState: MatterState;
  colorHex: string;
  reactionType: string;
  energyChange: string; // e.g. "Exothermic (ΔH = -310 kJ/mol)"
  energyValue: number; // numeric approximation for challenge checks
  observedChange: string;
  molecularTransformation: string;
  safetyNotice?: string;
  isSimulatedOnlyNotice?: boolean;
  unlockedTrivia?: string;
}

export interface ExperimentHistoryItem {
  id: string;
  timestamp: number;
  materialA: Material;
  materialB: Material;
  result: ReactionResult;
}

export interface Challenge {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  targetType: 'discover_material' | 'state_change' | 'same_property' | 'high_energy' | 'oxide' | 'space_matter' | 'multi_combines';
  xpReward: number;
  completed: boolean;
}

export interface UserProgress {
  xp: number;
  level: number;
  levelTitle: string;
  discoveredMaterialIds: string[];
  discoveredReactionIds: string[];
  completedChallengeIds: string[];
}
