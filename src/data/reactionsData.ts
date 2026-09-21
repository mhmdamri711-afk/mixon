import { Material, ReactionResult } from '../types';

export const KNOWN_REACTIONS: ReactionResult[] = [
  {
    id: 'cu_o2',
    inputA: 'copper',
    inputB: 'oxygen',
    outputName: 'Copper(II) Oxide',
    outputFormula: '2Cu + O₂ → 2CuO',
    outputState: 'Solid',
    colorHex: '#1e293b',
    reactionType: 'Thermal Oxidation / Synthesis',
    energyChange: 'Exothermic (ΔH = -310 kJ/mol)',
    energyValue: 310,
    observedChange: 'Bright reddish copper surface darkens into a deep black, dense crystalline oxide layer as oxygen molecules adsorb and cleave onto copper lattice sites.',
    molecularTransformation: 'Cu²⁺ cations coordinate with O²⁻ anions in a monoclinic crystal geometry with strong covalent-ionic character.',
    unlockedTrivia: 'Copper oxide thin films are widely researched today for next-generation solar photovoltaic cells and superconductor precursors.'
  },
  {
    id: 'h2_o2',
    inputA: 'hydrogen',
    inputB: 'oxygen',
    outputName: 'Pure Water Vapor & Liquid Water',
    outputFormula: '2H₂ + O₂ → 2H₂O',
    outputState: 'Liquid',
    colorHex: '#38bdf8',
    reactionType: 'Exothermic Synthesis / Phase Change',
    energyChange: 'Highly Exothermic (ΔH = -286 kJ/mol)',
    energyValue: 286,
    observedChange: 'Two colorless gases undergo rapid molecular rearrangement with a brilliant electric-blue flash, condensing into pure liquid water droplets on the cold chamber walls.',
    molecularTransformation: 'Diatomic H-H and O=O covalent bonds break, forming bent polar O-H bonds with a 104.5° angle and dynamic hydrogen-bond networks.',
    unlockedTrivia: 'Liquid hydrogen and liquid oxygen power the RS-25 main engines of NASA’s Space Launch System (SLS) moon rocket.'
  },
  {
    id: 'na_cl2',
    inputA: 'sodium',
    inputB: 'chlorine',
    outputName: 'Sodium Chloride (Halite Crystal)',
    outputFormula: '2Na + Cl₂ → 2NaCl',
    outputState: 'Solid',
    colorHex: '#f8fafc',
    reactionType: 'Ionic Synthesis / Electron Transfer',
    energyChange: 'Extremely Exothermic (ΔH = -411 kJ/mol)',
    energyValue: 411,
    observedChange: 'The soft metal and toxic green gas undergo an energetic ionization burst, producing sparkling white cubic crystals of pure, non-toxic table salt.',
    molecularTransformation: 'A single 3s valence electron from each sodium atom transfers permanently to a chlorine 3p orbital, establishing a stable rock-salt face-centered cubic lattice.',
    isSimulatedOnlyNotice: true,
    safetyNotice: 'This simulation models high-affinity alkali halogen bonding safely in digital space.',
    unlockedTrivia: 'Both raw sodium and raw chlorine are hazardous, but their combined ionic lattice is essential for all mammalian life.'
  },
  {
    id: 'na_h2o',
    inputA: 'sodium',
    inputB: 'water',
    outputName: 'Sodium Hydroxide & Hydrogen Gas',
    outputFormula: '2Na + 2H₂O → 2NaOH + H₂ ↑',
    outputState: 'Liquid',
    colorHex: '#67e8f9',
    reactionType: 'Exothermic Single-Displacement / Alkali Hydrolysis',
    energyChange: 'Highly Exothermic (ΔH = -368 kJ/mol)',
    energyValue: 368,
    observedChange: 'Sodium glides rapidly across the liquid surface, generating a plume of micro-effervescent hydrogen gas bubbles and turning the solution strongly alkaline.',
    molecularTransformation: 'Water molecules undergo proton abstraction by sodium metal, producing solvated Na⁺ cations, hydroxide (OH⁻) ions, and free H₂ gas.',
    isSimulatedOnlyNotice: true,
    safetyNotice: 'Simulated digitally. Real-world alkali metal hydration generates flammable hydrogen and must only be observed via controlled digital demonstrations.',
    unlockedTrivia: 'High-speed camera studies revealed that the initial burst in sodium-water reactions is driven by a Coulomb explosion of positive charges.'
  },
  {
    id: 'fe_o2',
    inputA: 'iron',
    inputB: 'oxygen',
    outputName: 'Iron(III) Oxide (Hematite)',
    outputFormula: '4Fe + 3O₂ → 2Fe₂O₃',
    outputState: 'Solid',
    colorHex: '#991b1b',
    reactionType: 'Oxidation / Redox Corrosion',
    energyChange: 'Exothermic (ΔH = -824 kJ/mol)',
    energyValue: 824,
    observedChange: 'Silvery iron lattice incorporates oxygen atoms, developing a distinctive red-ochre coating with expanded porous volume.',
    molecularTransformation: 'Fe²⁺ oxidized to Fe³⁺, coordinated in a corundum-type hexagonal close-packed oxygen sublattice.',
    unlockedTrivia: 'Mars is known as the "Red Planet" because its surface regolith is rich in iron(III) oxide dust.'
  },
  {
    id: 'c_o2',
    inputA: 'carbon',
    inputB: 'oxygen',
    outputName: 'Carbon Dioxide Gas',
    outputFormula: 'C + O₂ → CO₂',
    outputState: 'Gas',
    colorHex: '#94a3b8',
    reactionType: 'Complete Combustion / Gas Synthesis',
    energyChange: 'Exothermic (ΔH = -393.5 kJ/mol)',
    energyValue: 393,
    observedChange: 'Solid carbon reacts uniformly with diatomic oxygen, dissolving the solid boundary into a completely transparent, dense gas.',
    molecularTransformation: 'Linear O=C=O molecule with two double bonds and zero net dipole moment.',
    unlockedTrivia: 'Solid carbon dioxide is called "dry ice" because it sublimates straight from solid to gas at -78.5 °C without ever becoming a liquid.'
  },
  {
    id: 'ch4_o2',
    inputA: 'methane',
    inputB: 'oxygen',
    outputName: 'Carbon Dioxide & Superheated Steam',
    outputFormula: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
    outputState: 'Gas',
    colorHex: '#00d2ff',
    reactionType: 'Hydrocarbon Combustion / Thermal Release',
    energyChange: 'Highly Exothermic (ΔH = -890 kJ/mol)',
    energyValue: 890,
    observedChange: 'Clean blue flame simulation with high thermal output, completely transforming methane into atmospheric gases.',
    molecularTransformation: 'Tetrahedral methane C-H single bonds broken and reorganized into linear CO₂ and bent H₂O molecules.',
    unlockedTrivia: 'Methane combustion produces the least CO₂ per unit of energy released compared to coal or heavy fuel oils.'
  },
  {
    id: 'au_hg',
    inputA: 'gold',
    inputB: 'mercury',
    outputName: 'Gold-Mercury Amalgam',
    outputFormula: 'Au + Hg → AuHg₂ / Solid Solution',
    outputState: 'Solid',
    colorHex: '#e2e8f0',
    reactionType: 'Intermetallic Dissolution / Wetting',
    energyChange: 'Mild Endothermic / Spontaneous (ΔH = +14 kJ/mol)',
    energyValue: 14,
    observedChange: 'Liquid mercury instantly wets and coats the gold sample, diffusing into gold atomic grain boundaries to form a silvery-white semi-solid amalgam.',
    molecularTransformation: 'Mercury atoms infiltrate the face-centered cubic gold lattice, breaking Au-Au metallic bonds and forming intermetallic Au-Hg clusters.',
    isSimulatedOnlyNotice: true,
    safetyNotice: 'Mercury vapours are neurotoxic. MIXON provides zero-risk virtual simulation of historic metallurgical wetting.',
    unlockedTrivia: 'This reaction was used since Roman times to extract gold dust from crushed ore and rivers.'
  },
  {
    id: 'plasma_he3',
    inputA: 'cosmic_plasma',
    inputB: 'helium_3',
    outputName: 'Aneutronic Stellar Fusion Core',
    outputFormula: '³He + D⁺ / H⁺ → ⁴He (3.6 MeV) + p⁺ (14.7 MeV)',
    outputState: 'Plasma',
    colorHex: '#00ffff',
    reactionType: 'Nuclear Fusion / Aneutronic Synthesis',
    energyChange: 'Cosmic Stellar Surge (Energy Yield: +18.35 MeV)',
    energyValue: 18350,
    observedChange: 'High-temperature plasma confinement reaches ignition threshold. A blinding cyan-white luminescent shockwave expands with zero radioactive neutron emission.',
    molecularTransformation: 'Atomic nuclei overcome the Coulomb repulsion barrier, fusing into an ultra-stable Helium-4 alpha particle and high-energy proton.',
    unlockedTrivia: 'Helium-3 aneutronic fusion is the prime candidate fuel for future interplanetary deep-space ion propulsion drives.'
  },
  {
    id: 'ti_quartz',
    inputA: 'titanium',
    inputB: 'quartz',
    outputName: 'Titanium-Doped Crystalline Glass',
    outputFormula: 'Ti + SiO₂ → Ti:SiO₂ Optoelectronic Substrate',
    outputState: 'Solid',
    colorHex: '#818cf8',
    reactionType: 'Thermal Diffusion / Solid State Doping',
    energyChange: 'Endothermic (ΔH = +95 kJ/mol)',
    energyValue: 95,
    observedChange: 'Quartz crystal structure incorporates interstitial titanium atoms, shifting optical refractive index and generating deep laser-active violet transmission bands.',
    molecularTransformation: 'Ti⁴⁺ ions substitute for Si⁴⁺ in the tetrahedral silica network, introducing tunable electronic bandgap states.',
    unlockedTrivia: 'Titanium-doped sapphire and silica crystals are the heart of ultra-short femtosecond laser physics laboratories.'
  },
  {
    id: 'fe_s',
    inputA: 'iron',
    inputB: 'carbon',
    outputName: 'High-Carbon Martensitic Steel',
    outputFormula: 'Fe + C → Fe₃C (Cementite interstitial phase)',
    outputState: 'Solid',
    colorHex: '#475569',
    reactionType: 'Interstitial Alloying / Metallurgy',
    energyChange: 'Thermal Absorption & Phase Alignment',
    energyValue: 45,
    observedChange: 'Small carbon atoms intersperse within iron crystal slip planes, locking dislocations and multiplying mechanical hardness by over 400%.',
    molecularTransformation: 'Face-centered austenite transforms into body-centered tetragonal martensite needle structures.',
    unlockedTrivia: 'Adding as little as 0.2% to 1.5% carbon transforms soft iron into the steel that built skyscrapers and suspension bridges.'
  },
  {
    id: 'ag_s',
    inputA: 'silver',
    inputB: 'sulfur',
    outputName: 'Silver Sulfide (Acanthite / Patina)',
    outputFormula: '2Ag + S → Ag₂S',
    outputState: 'Solid',
    colorHex: '#1e293b',
    reactionType: 'Surface Tarnishing / Redox Sulfidation',
    energyChange: 'Exothermic (ΔH = -32.6 kJ/mol)',
    energyValue: 33,
    observedChange: 'The lustrous mirror-bright silver surface undergoes sulfidation, developing an iridescent purplish sheen before settling into a deep black, durable acanthite crystalline layer.',
    molecularTransformation: 'Ag⁺ cations migrate through interstitial lattice vacancies to bond with sulfide S²⁻ anions in a monoclinic crystal geometry.',
    unlockedTrivia: 'Antique silverware tarnishes because trace parts-per-billion hydrogen sulfide in air react directly with metallic silver.'
  },
  {
    id: 'al_o2',
    inputA: 'aluminum',
    inputB: 'oxygen',
    outputName: 'Alumina (Sapphire / Corundum Crystal)',
    outputFormula: '4Al + 3O₂ → 2Al₂O₃',
    outputState: 'Solid',
    colorHex: '#e0e7ff',
    reactionType: 'Passivation Oxidation / Ceramic Synthesis',
    energyChange: 'Extremely Exothermic (ΔH = -1675 kJ/mol)',
    energyValue: 1675,
    observedChange: 'Aluminum reacts with atmospheric oxygen to instantaneously generate an atomic 4-nanometer transparent corundum ceramic shield with a hardness of 9 on the Mohs scale.',
    molecularTransformation: 'Al³⁺ cations occupy two-thirds of the octahedral interstitial voids within a hexagonal close-packed array of oxide O²⁻ anions.',
    unlockedTrivia: 'Pure Al₂O₃ is corundum; when trace chromium is naturally present it is Ruby, and with iron/titanium it forms Sapphire.'
  },
  {
    id: 'mg_o2',
    inputA: 'magnesium',
    inputB: 'oxygen',
    outputName: 'Magnesium Oxide (Periclase)',
    outputFormula: '2Mg + O₂ → 2MgO',
    outputState: 'Solid',
    colorHex: '#f8fafc',
    reactionType: 'Thermal Combustion / Ionic Synthesis',
    energyChange: 'Violently Exothermic (ΔH = -601.6 kJ/mol)',
    energyValue: 602,
    observedChange: 'Magnesium metal ignites into a blinding, celestial white thermal reaction arc, producing an ultra-dense white smoke that condenses into pure white cubic periclase crystals.',
    molecularTransformation: 'Two valence electrons from Mg 3s shells transfer to O 2p orbitals, establishing an ultra-refractory rock-salt cubic lattice with a melting point of 2852 °C.',
    unlockedTrivia: 'Magnesium flares burn so intensely that they are used for submarine signaling and night-time aerial reconnaissance illumination.'
  },
  {
    id: 'si_o2',
    inputA: 'silicon',
    inputB: 'oxygen',
    outputName: 'Silicon Dioxide (Fused Quartz)',
    outputFormula: 'Si + O₂ → SiO₂',
    outputState: 'Solid',
    colorHex: '#e0f2fe',
    reactionType: 'Thermal Oxidation / Network Vitrification',
    energyChange: 'Exothermic (ΔH = -910.7 kJ/mol)',
    energyValue: 911,
    observedChange: 'Dark metallic semiconductor silicon incorporates oxygen atoms at high thermal activation, transforming into a brilliantly transparent, glass-like quartz network.',
    molecularTransformation: 'Each silicon atom coordinates tetrahedrally with four oxygen atoms, where each oxygen bridges two silicon centers with a flexible 144° bond angle.',
    unlockedTrivia: 'Thermal oxidation of silicon wafer surfaces to grow sub-nanometer SiO₂ gate dielectric oxide layers is what enabled modern microchips.'
  },
  {
    id: 'k_h2o',
    inputA: 'potassium',
    inputB: 'water',
    outputName: 'Potassium Hydroxide & Hydrogen Gas',
    outputFormula: '2K + 2H₂O → 2KOH + H₂ ↑',
    outputState: 'Liquid',
    colorHex: '#c084fc',
    reactionType: 'Violent Alkali Hydrolysis / Exothermic Chain',
    energyChange: 'Violently Exothermic (ΔH = -391 kJ/mol)',
    energyValue: 391,
    observedChange: 'Potassium metal darts vigorously across the water surface, generating a brilliant lilac/purple hydrogen flame and dissolving into an alkaline hydroxide solution.',
    molecularTransformation: 'Water protons are rapidly abstracted by potassium valence electrons, generating free H₂ gas, hydrated K⁺ ions, and basic OH⁻ counterions.',
    isSimulatedOnlyNotice: true,
    safetyNotice: 'Alkali metal combustion modeled in zero-risk digital laboratory simulation.',
    unlockedTrivia: 'The characteristic lilac flame color arises from optical emission as potassium valence electrons drop from 4p back to 4s orbitals.'
  },
  {
    id: 'ca_co2',
    inputA: 'calcium',
    inputB: 'carbon_dioxide',
    outputName: 'Calcium Carbonate (Calcite / Limestone)',
    outputFormula: 'Ca + CO₂ + ½O₂ → CaCO₃',
    outputState: 'Solid',
    colorHex: '#f1f5f9',
    reactionType: 'Mineral Carbonation / Geological Sequestration',
    energyChange: 'Exothermic (ΔH = -1207 kJ/mol)',
    energyValue: 1207,
    observedChange: 'Reactive calcium binds gaseous carbon dioxide into sparkling, crystalline white rhombic calcite minerals, permanently sequestering carbon into geological stone.',
    molecularTransformation: 'Planar trigonal carbonate anions (CO₃²⁻) coordinate with Ca²⁺ cations in a stable trigonal crystal lattice.',
    unlockedTrivia: 'Mineral carbonation of calcium and magnesium rocks is nature’s long-term mechanism for drawing carbon dioxide out of Earth’s atmosphere.'
  },
  {
    id: 'ethanol_water',
    inputA: 'ethanol',
    inputB: 'water',
    outputName: 'Aqueous Ethanol Solution (Hydrated Matrix)',
    outputFormula: 'C₂H₅OH + H₂O → C₂H₅OH•(H₂O)ₙ (Miscible Mixing)',
    outputState: 'Liquid',
    colorHex: '#bae6fd',
    reactionType: 'Exothermic Physical Mixing / Volume Contraction',
    energyChange: 'Exothermic Dissolution (ΔH = -3.2 kJ/mol)',
    energyValue: 12,
    observedChange: 'Two clear fluids swirl together with visible Schlieren optical turbulence; dynamic hydrogen-bond clusters nestle tightly, resulting in a measurable contraction of total volume.',
    molecularTransformation: 'Hydroxyl groups of ethanol interlock with water dipole networks, forming cage-like clathrate hydration shells around ethyl groups.',
    unlockedTrivia: 'When 50 mL of water is mixed with 50 mL of ethanol, the resulting solution measures only ~96 mL due to tight molecular packing.'
  },
  {
    id: 'sand_ca',
    inputA: 'sand',
    inputB: 'calcium',
    outputName: 'Calcium Silicate Ceramic Slag',
    outputFormula: 'SiO₂ + Ca → CaSiO₃ (Wollastonite phase)',
    outputState: 'Solid',
    colorHex: '#cbd5e1',
    reactionType: 'High-Temperature Silicate Fluxing',
    energyChange: 'Exothermic Solid Phase Synthesis (ΔH = -90 kJ/mol)',
    energyValue: 90,
    observedChange: 'Granular quartz sand fuses with calcium under thermal fluxing, melting individual grains into a tough, vitreous white ceramic wollastonite aggregate.',
    molecularTransformation: 'Infinite single-chain silicate tetrahedra (SiO₃)ₙ are held together by ionic Ca²⁺ linkages.',
    unlockedTrivia: 'Wollastonite ceramics are prized in aerospace thermal tiles and friction brakes because they do not crack under severe thermal shock.'
  },
  {
    id: 'salt_water',
    inputA: 'salt',
    inputB: 'water',
    outputName: 'Aqueous Saline Solution (Hydrated Ions)',
    outputFormula: 'NaCl(s) + H₂O(l) → Na⁺(aq) + Cl⁻(aq)',
    outputState: 'Liquid',
    colorHex: '#38bdf8',
    reactionType: 'Electrolytic Dissolution / Hydration Shells',
    energyChange: 'Mild Endothermic Dissolution (ΔH = +3.88 kJ/mol)',
    energyValue: 18,
    observedChange: 'White cubic salt crystals submerge into pure water, where polar water dipoles attack the ionic crystal facets, dislodging Na⁺ and Cl⁻ ions into a completely transparent, highly conductive electrolyte solution.',
    molecularTransformation: 'Water dipoles orient negative oxygen poles toward Na⁺ cations and positive hydrogen poles toward Cl⁻ anions, establishing structured octahedrally-coordinated hydration shells and dismantling the solid lattice.',
    unlockedTrivia: 'Pure water does not conduct electricity, but adding even a pinch of salt creates an abundance of mobile solvated ions that readily transmit electric currents.'
  },
  {
    id: 'cu_water',
    inputA: 'copper',
    inputB: 'water',
    outputName: 'Zero Galvanic Displacement (Inert Hydro-Metallic Contact)',
    outputFormula: 'Cu(s) + H₂O(l) → Cu(s) + H₂O(l) (Non-reactive Equilibrium)',
    outputState: 'Solid',
    colorHex: '#b87333',
    reactionType: 'Zero Redox Activity / Corrosion Resistance',
    energyChange: 'Thermally Neutral / Inert Contact (ΔH ≈ 0 kJ/mol)',
    energyValue: 0,
    observedChange: 'Water flows over the reddish-orange copper surface without hydrogen evolution or dissolution. Copper’s positive standard reduction potential (+0.34 V) makes it thermodynamically immune to reduction by neutral water.',
    molecularTransformation: 'Water dipoles adsorb weakly onto the outer copper electron sea via transient van der Waals and dipole-image forces without cleaving metallic Cu-Cu bonds.',
    unlockedTrivia: 'Because copper does not react with neutral water, humanity has relied on copper piping for domestic plumbing since the ancient Egyptian civilization over 4,500 years ago.'
  },
  {
    id: 'cu_au',
    inputA: 'copper',
    inputB: 'gold',
    outputName: 'Rose Gold Alloy (Cu-Au Intermetallic Solution)',
    outputFormula: '3Cu + Au → Cu₃Au (Ordered Solid Solution)',
    outputState: 'Solid',
    colorHex: '#e0a899',
    reactionType: 'Continuous Substitutional Alloying',
    energyChange: 'Negative Enthalpy of Mixing (ΔH = -9.8 kJ/mol)',
    energyValue: 10,
    observedChange: 'Copper and gold atoms fuse into a single homogeneous rose-gold solid solution with a rich warm-pink metallic luster, increased Vickers hardness, and uniform microcrystalline grain structure.',
    molecularTransformation: 'Copper and gold atoms arrange in ordered L1₂ (Cu₃Au) superlattices with gold atoms at face-centered cube corners and copper at the face centers.',
    unlockedTrivia: '18-karat rose gold consists of 75% pure gold, ~22.25% copper, and trace silver, yielding its world-renowned warm blush hue.'
  },
  {
    id: 'fe_au',
    inputA: 'iron',
    inputB: 'gold',
    outputName: 'Iron-Gold Intermetallic Alloy (Fe-Au Solid Solution)',
    outputFormula: 'Fe + Au → Fe-Au Solid Solution',
    outputState: 'Solid',
    colorHex: '#d4af37',
    reactionType: 'Intermetallic Solid Solution Sintering',
    energyChange: 'Endothermic Solid Solution (ΔH = +16 kJ/mol)',
    energyValue: 16,
    observedChange: 'Gold and iron atoms diffuse across contacting crystal boundaries under thermal activation to form a single unified metallic alloy specimen with deep golden-champagne luster, altered Curie magnetic temperature, and high density.',
    molecularTransformation: 'Iron atoms occupy substitutional and interstitial lattice sites in the face-centered cubic gold matrix, modulating spin-orbit coupling.',
    unlockedTrivia: 'Iron-gold dilute alloys are used in low-temperature cryogenics and spintronics sensors due to their extreme thermoelectric and giant magnetoresistance properties.'
  },
  {
    id: 'n2_o2',
    inputA: 'nitrogen',
    inputB: 'oxygen',
    outputName: 'Atmospheric Gas Mixture (Simulated Earth Air)',
    outputFormula: '0.78 N₂ + 0.21 O₂ + trace',
    outputState: 'Gas',
    colorHex: '#60a5fa',
    reactionType: 'Homogeneous Molecular Gas Diffusion',
    energyChange: 'Entropy of Mixing (ΔS > 0, ΔH ≈ 0)',
    energyValue: 0,
    observedChange: 'Diatomic nitrogen and oxygen gases co-mingle freely into a single unified atmospheric gas volume, maintaining a constant 4:1 partial pressure ratio according to Dalton’s Law of Partial Pressures.',
    molecularTransformation: 'Non-polar triple-bonded :N≡N: and double-bonded O=O molecules collide and disperse in dynamic thermal equilibrium without chemical bond cleavage.',
    unlockedTrivia: 'Nitrogen and oxygen do not spontaneously combust in our atmosphere because the N≡N triple bond requires extreme activation energy (>945 kJ/mol), which only lightning strikes supply.'
  },
  {
    id: 'hg_h2o',
    inputA: 'mercury',
    inputB: 'water',
    outputName: 'Stratified Hydro-Mercurial Immiscible System',
    outputFormula: 'H₂O(l) // Hg(l) (Phase Stratification)',
    outputState: 'Liquid',
    colorHex: '#94a3b8',
    reactionType: 'Immiscible Phase Boundary & Density Stratification',
    energyChange: 'Interfacial Free Energy (Δγ = 375 mN/m)',
    energyValue: 3,
    observedChange: 'Liquid mercury and water form a unified two-phase liquid volume. Due to its massive density (13.5 g/cm³), mercury settles into the base with a convex meniscus, supporting the crystal-clear water layer directly on top.',
    molecularTransformation: 'Extreme cohesive metallic bonding within mercury prevents hydrogen bonding with water dipoles, maintaining a pristine, unreactive hydrophobic contact interface.',
    unlockedTrivia: 'Mercury’s surface tension against water is so high (over 375 mN/m) that water droplets bead up completely on a mercury pool with near-zero contact angle wetting.'
  }
];

export function getReaction(matA: Material, matB: Material): ReactionResult {
  // Check direct pair or reverse pair
  const found = KNOWN_REACTIONS.find(
    r => (r.inputA === matA.id && r.inputB === matB.id) ||
         (r.inputA === matB.id && r.inputB === matA.id)
  );

  if (found) {
    return found;
  }

  // If one of the materials is an inert noble gas (Helium, Nitrogen, Helium-3):
  if (matA.reactivity === 'Inert' || matB.reactivity === 'Inert') {
    const inertMat = matA.reactivity === 'Inert' ? matA : matB;
    const otherMat = matA.reactivity === 'Inert' ? matB : matA;
    return {
      id: `inert_${matA.id}_${matB.id}`,
      inputA: matA.id,
      inputB: matB.id,
      outputName: `${inertMat.name} Stabilized Dispersion`,
      outputFormula: `${matA.symbol} + ${matB.symbol} (Phase Coexistence)`,
      outputState: otherMat.state,
      colorHex: '#38bdf8',
      reactionType: 'Noble Gas Stabilization / Physical Contact',
      energyChange: 'Thermally Neutral (ΔH ≈ 0 kJ/mol)',
      energyValue: 0,
      observedChange: `Because ${inertMat.name} has a closed electronic valence shell, no chemical bond cleavage occurs. The two substances remain in thermal equilibrium without degradation.`,
      molecularTransformation: `Van der Waals dispersion forces maintain physical separation; electron orbital clouds remain intact without charge transfer.`,
      unlockedTrivia: `${inertMat.name} is chemically unreactive under standard conditions, making it an ideal protective atmosphere for sensitive materials.`
    };
  }

  // Check state combination for dynamic simulation:
  const isSolidSolid = matA.state === 'Solid' && matB.state === 'Solid';
  const isGasGas = matA.state === 'Gas' && matB.state === 'Gas';
  const isLiquidSolid = (matA.state === 'Liquid' && matB.state === 'Solid') || (matB.state === 'Liquid' && matA.state === 'Solid');
  const isLiquidLiquid = matA.state === 'Liquid' && matB.state === 'Liquid';
  const isGasLiquid = (matA.state === 'Gas' && matB.state === 'Liquid') || (matA.state === 'Liquid' && matB.state === 'Gas');
  const isGasSolid = (matA.state === 'Gas' && matB.state === 'Solid') || (matA.state === 'Solid' && matB.state === 'Gas');
  const isPlasma = matA.state === 'Plasma' || matB.state === 'Plasma';

  if (isPlasma) {
    const plasma = matA.state === 'Plasma' ? matA : matB;
    const other = matA.state === 'Plasma' ? matB : matA;
    return {
      id: `plasma_ion_${matA.id}_${matB.id}`,
      inputA: matA.id,
      inputB: matB.id,
      outputName: `${other.name} Plasma Ionization State`,
      outputFormula: `${other.symbol}* in Cosmic Plasma Field (Excited Ions)`,
      outputState: 'Plasma',
      colorHex: '#c084fc',
      reactionType: 'High-Energy Plasma Excitation & Ionization',
      energyChange: 'Thermal Excitation & Optical Emission',
      energyValue: 350,
      observedChange: `High-energy plasma fields strip outer valence electrons from ${other.name}, inducing intense spectral photon emission and magnetic confinement ionization.`,
      molecularTransformation: `Electrons are stripped into free conduction bands, forming an energized soup of ions and relativistic particles.`,
      unlockedTrivia: 'Over 99% of visible matter in the universe exists in the plasma state, found in stars, interstellar nebulae, and auroras.'
    };
  }

  if (isSolidSolid) {
    return {
      id: `alloy_${matA.id}_${matB.id}`,
      inputA: matA.id,
      inputB: matB.id,
      outputName: `${matA.name}-${matB.name} Sintered Composite Matrix`,
      outputFormula: `${matA.symbol} + ${matB.symbol} (Phase Coexistence / Interfacial Boundary)`,
      outputState: 'Solid',
      colorHex: matA.colorHex || '#60a5fa',
      reactionType: 'Thermal Solid-State Sintering & Grain Interlocking',
      energyChange: 'Interfacial Adhesion Energy (ΔH = -38 kJ/mol)',
      energyValue: 38,
      observedChange: `Under simulated contact pressure, crystal boundaries interlock. Boundary atoms diffuse across the interface forming a cohesive hybrid dual-phase matrix without destroying the individual materials.`,
      molecularTransformation: `Atomic lattices weld at contacting grain boundaries, redistributing valence orbital densities into hybrid metallic-crystalline interface bonds.`,
      unlockedTrivia: 'Diffusion bonding is used in aerospace manufacturing to weld refractory metals without liquid melting.'
    };
  }

  if (isLiquidLiquid) {
    return {
      id: `liq_mix_${matA.id}_${matB.id}`,
      inputA: matA.id,
      inputB: matB.id,
      outputName: `${matA.name}-${matB.name} Two-Phase Liquid Dispersion`,
      outputFormula: `${matA.symbol}(l) + ${matB.symbol}(l) (Immiscible / Liquid Phase Contact)`,
      outputState: 'Liquid',
      colorHex: matA.id === 'mercury' || matB.id === 'mercury' ? '#e2e8f0' : '#38bdf8',
      reactionType: 'Interfacial Liquid Mixing / Emulsion',
      energyChange: 'Mild Interfacial Surface Tension Shift',
      energyValue: 8,
      observedChange: `Liquids form a two-phase interface governed by density and surface tension differentials, resisting molecular bond cleavage while co-existing.`,
      molecularTransformation: `Cohesive intermolecular forces prevent chemical reaction; molecules maintain their phase boundaries with distinct liquid meniscus zones.`,
      unlockedTrivia: 'Density stratification causes denser fluids (like mercury at 13.5 g/cm³) to sink beneath lighter fluids without chemical reaction.'
    };
  }

  if (isGasGas) {
    return {
      id: `gas_mix_${matA.id}_${matB.id}`,
      inputA: matA.id,
      inputB: matB.id,
      outputName: `${matA.name}-${matB.name} Gaseous Diffusion Mixture`,
      outputFormula: `${matA.symbol}(g) + ${matB.symbol}(g) (Daltonian Partial Pressure)`,
      outputState: 'Gas',
      colorHex: '#22d3ee',
      reactionType: 'Molecular Diffusion & Collision Dynamics',
      energyChange: 'Mild Entropy Gain (ΔS > 0)',
      energyValue: 25,
      observedChange: `Brownian motion drives rapid intermixing of molecules across the reaction volume, homogenizing temperature and partial pressures.`,
      molecularTransformation: `Gas phase kinetic collisions increase total entropy without breaking primary covalent bonds.`,
      unlockedTrivia: 'Dalton’s Law dictates that total pressure in a gas mixture equals the sum of individual component partial pressures.'
    };
  }

  if (isLiquidSolid) {
    const liquid = matA.state === 'Liquid' ? matA : matB;
    const solid = matA.state === 'Liquid' ? matB : matA;
    return {
      id: `solv_${matA.id}_${matB.id}`,
      inputA: matA.id,
      inputB: matB.id,
      outputName: `${solid.name} Hydrated Suspension in ${liquid.name}`,
      outputFormula: `${solid.symbol}(s) in ${liquid.symbol}(l) (Colloidal Dispersion)`,
      outputState: 'Liquid',
      colorHex: liquid.colorHex || '#38bdf8',
      reactionType: 'Solvation & Surface Wetting Suspension',
      energyChange: 'Enthalpy of Solution (ΔH = -42 kJ/mol)',
      energyValue: 42,
      observedChange: `Liquid molecules form hydration shells around the solid surface, dislodging exterior ions/molecules into colloidal suspension.`,
      molecularTransformation: `Polar solvent dipoles coordinate around surface solute atoms, reducing electrostatic lattice binding energy.`,
      unlockedTrivia: 'Colloidal suspensions can scatter light beams via the Tyndall effect, glowing with a soft blue optical haze.'
    };
  }

  if (isGasLiquid) {
    const gas = matA.state === 'Gas' ? matA : matB;
    const liquid = matA.state === 'Gas' ? matB : matA;
    return {
      id: `gas_solv_${matA.id}_${matB.id}`,
      inputA: matA.id,
      inputB: matB.id,
      outputName: `${gas.name} Dissolved Aeration in ${liquid.name}`,
      outputFormula: `${gas.symbol}(g) in ${liquid.symbol}(l) (Henry's Law Solvation)`,
      outputState: 'Liquid',
      colorHex: liquid.colorHex || '#38bdf8',
      reactionType: 'Gas Dissolution / Henry’s Law Equilibrium',
      energyChange: 'Enthalpy of Gas Dissolution (ΔH ≈ -12 kJ/mol)',
      energyValue: 12,
      observedChange: `Gas molecules diffuse into the liquid matrix, establishing dynamic gas solubility equilibrium with microscopic effervescent bubbles.`,
      molecularTransformation: `Cavitation shells in liquid solvent dynamically capture dispersed gas molecules without covalent bond rearrangement.`,
      unlockedTrivia: 'Henry’s law dictates that the amount of dissolved gas in a liquid is directly proportional to its partial pressure above the liquid.'
    };
  }

  if (isGasSolid) {
    const gas = matA.state === 'Gas' ? matA : matB;
    const solid = matA.state === 'Gas' ? matB : matA;
    return {
      id: `gas_solid_${matA.id}_${matB.id}`,
      inputA: matA.id,
      inputB: matB.id,
      outputName: `${solid.name} in ${gas.name} Protective Atmosphere`,
      outputFormula: `${solid.symbol}(s) + ${gas.symbol}(g) (Surface Adsorption Equilibrium)`,
      outputState: 'Solid',
      colorHex: solid.colorHex || '#94a3b8',
      reactionType: 'Physical Surface Physisorption / Gas Atmosphere',
      energyChange: 'Weak Physisorption (ΔH ≈ -5 kJ/mol)',
      energyValue: 5,
      observedChange: `Gas molecules form a protective physisorption boundary layer over the solid specimen without chemical corrosion or lattice breakdown.`,
      molecularTransformation: `Van der Waals forces adhere gas molecules reversibly to the solid crystal surface lattice sites.`,
      unlockedTrivia: 'Inert or non-reactive gas blankets are used in metallurgy to shield pristine solid surfaces from unwanted reactions.'
    };
  }

  // General fallback
  return {
    id: `synth_${matA.id}_${matB.id}`,
    inputA: matA.id,
    inputB: matB.id,
    outputName: `${matA.name} & ${matB.name} Phase Coexistence`,
    outputFormula: `${matA.symbol} + ${matB.symbol} (Physical Blend)`,
    outputState: matA.state === 'Gas' || matB.state === 'Gas' ? 'Gas' : 'Solid',
    colorHex: '#38bdf8',
    reactionType: 'Physical Contact & Thermal Equilibrium',
    energyChange: 'Thermally Neutral (ΔH ≈ 0 kJ/mol)',
    energyValue: 0,
    observedChange: `Particles from both inputs converge into physical contact, stabilizing into a non-reactive phase mixture preserving both input identities.`,
    molecularTransformation: `Van der Waals forces maintain physical contact without covalent or ionic bond alteration.`,
    unlockedTrivia: 'Physical mixtures allow materials to be separated again using mechanical methods like filtration or distillation.'
  };
}
