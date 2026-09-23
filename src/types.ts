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
  conductivity: 'High' | 'Medium' | 'Low' | 'Non-conductive' | 'Superconductor' | (string & {});
  reactivity: 'Very High' | 'High' | 'Moderate' | 'Low' | 'Very Low' | 'Inert' | (string & {});
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

export type ReactionStatus = 
  | 'VERIFIED_REACTION'
  | 'CONDITION_REQUIRED'
  | 'PHYSICAL_MIXTURE'
  | 'NO_VERIFIED_REACTION'
  | 'INSUFFICIENT_DATA'
  | 'Chemical Reaction'
  | 'Known chemical reaction'
  | 'No Reaction / Physical Mixture'
  | 'No reaction'
  | 'Physical mixture/contact'
  | 'Condition-Dependent Reaction'
  | 'Not a Defined Chemical Substance / State Simulation';

export type RepresentationType = 
  | 'molecular'
  | 'ionic_lattice'
  | 'metallic_lattice'
  | 'network_solid'
  | 'polymer'
  | 'plasma'
  | 'hydrated_ions'
  | 'mixture';

export interface ReactionParticipant {
  id: string;
  name: string;
  nameAr?: string;
  formula: string;
  state: MatterState;
}

export interface ReactionEnvironmentConditions {
  temperature?: number; // Celsius
  pressure?: number; // atm
  hasHeatSource?: boolean;
  heatingRequired?: boolean;
  solvent?: 'none' | 'water' | 'aqueous' | string;
  catalyst?: string;
  hasCatalyst?: boolean;
  oxygenAvailable?: boolean;
  concentration?: string;
  description?: string;
  descriptionAr?: string;
  minTemperature?: number;
  maxTemperature?: number;
  minPressure?: number;
  requiredCatalyst?: string;
}

export interface ReactionResult {
  id: string;
  inputA: string;
  inputB: string;
  reactants?: ReactionParticipant[];
  outputName: string;
  outputNameAr?: string;
  outputFormula: string;
  outputState: MatterState;
  products?: ReactionParticipant[];
  colorHex: string;
  reactionType: string;
  reactionTypeAr?: string;
  reactionStatus?: ReactionStatus;
  reactionStatusAr?: string;
  energyChange: string; // e.g. "Exothermic (ΔH = -57.3 kJ/mol)" or "Not available / Not calculated" or "N/A"
  energyValue: number; // numeric approximation for challenge checks
  deltaH?: number | 'N/A';
  deltaG?: number | 'N/A';
  observedChange: string;
  observedChangeAr?: string;
  molecularTransformation: string;
  molecularTransformationAr?: string;
  scientificExplanation?: string;
  scientificExplanationAr?: string;
  representationType?: RepresentationType;
  safetyNotice?: string;
  isSimulatedOnlyNotice?: boolean;
  unlockedTrivia?: string;
  unlockedTriviaAr?: string;
  scientificallyVerified?: boolean;
  hasOccurred?: boolean; // false when no verified chemical reaction occurs
  noReactionReason?: string;
  balancedEquation?: string;
  conditions?: ReactionEnvironmentConditions;
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
