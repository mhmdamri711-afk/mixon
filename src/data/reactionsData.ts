import { Material, ReactionResult, ReactionStatus, ReactionEnvironmentConditions } from '../types';
import { VERIFIED_REACTIONS } from './verifiedReactionsData';

const BASE_REACTIONS: ReactionResult[] = [
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
    id: 'fe_c',
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
    reactionStatus: 'No reaction',
    reactionStatusAr: 'لا يوجد تفاعل',
    outputName: 'No Chemical Reaction Observed',
    outputNameAr: 'لم يُسجل أي تفاعل كيميائي',
    outputFormula: 'Cu(s) + H₂O(l) (Inert Hydro-Metallic Contact / No Reaction)',
    balancedEquation: 'No reaction under the current simulated conditions.',
    outputState: 'Solid',
    colorHex: '#b87333',
    reactionType: 'Zero Redox Activity / Corrosion Resistance',
    reactionTypeAr: 'نشاط أكسدة واختزال معدوم / مقاومة التآكل',
    energyChange: 'Not Applicable (No Chemical Reaction)',
    energyValue: 0,
    hasOccurred: false,
    observedChange: 'Water flows over the reddish-orange copper surface without hydrogen evolution or dissolution. Copper’s positive standard reduction potential (+0.34 V) makes it thermodynamically immune to reduction by neutral water.',
    observedChangeAr: 'يتدفق الماء فوق سطح النحاس دون أي تصاعد لغاز الهيدروجين أو انحلال للفلز بفضل جهد اختزاله الموجب العالي.',
    molecularTransformation: 'Water dipoles adsorb weakly onto the outer copper electron sea via transient van der Waals and dipole-image forces without cleaving metallic Cu-Cu bonds.',
    molecularTransformationAr: 'تتفاعل ثنائيات قطب الماء بضعف مع إلكترونات التوصيل السطحية دون كسر الروابط الفلزية للنحاس.',
    unlockedTrivia: 'Because copper does not react with neutral water, humanity has relied on copper piping for domestic plumbing since the ancient Egyptian civilization over 4,500 years ago.',
    noReactionReason: 'Copper has a standard reduction potential of +0.34 V (positive relative to the standard hydrogen electrode), making it thermodynamically incapable of displacing hydrogen from neutral water under standard simulated conditions.'
  },
  {
    id: 'cu_au',
    inputA: 'copper',
    inputB: 'gold',
    reactionStatus: 'PHYSICAL_MIXTURE',
    reactionStatusAr: 'مزيج فيزيائي / تلامس (PHYSICAL_MIXTURE)',
    outputName: 'No Chemical Reaction Observed',
    outputNameAr: 'لم يُسجل أي تفاعل كيميائي',
    outputFormula: 'Cu(s) + Au(s) (Physical Contact / Mixture)',
    outputState: 'Solid',
    colorHex: '#d4af37',
    reactionType: 'Physical Mixture / Elemental Metal Contact',
    reactionTypeAr: 'مزيج فيزيائي / تلامس فلزات عنصرية',
    energyChange: 'Not available / Not calculated',
    energyValue: 0,
    hasOccurred: false,
    deltaH: 'N/A',
    deltaG: 'N/A',
    observedChange: 'Solid copper and gold remain in physical contact without spontaneous metallurgical alloying at standard temperature. Intermetallic solid solution or rose gold formation requires high-temperature melting above 1000 °C.',
    observedChangeAr: 'يبقى النحاس والذهب في حالة تلامس فيزيائي دون تشكل سبيكة تلقائية في درجة الحرارة العادية، إذ يتطلب تكوين سبيكة الذهب الوردي صهراً حرارياً فوق 1000 مئوية.',
    molecularTransformation: 'Separate face-centered cubic metallic lattices of Cu and Au remain intact across grain contact boundaries with zero spontaneous interdiffusion.',
    molecularTransformationAr: 'تحافظ الشبكات البلورية الفلزية المكعبة لكل من النحاس والذهب على تماسكها دون انتشار بيني تلقائي.',
    scientificExplanation: 'No verified chemical reaction is modeled under the current simulated conditions. Solid metals do not spontaneously form alloys upon simple physical contact at room temperature.',
    scientificExplanationAr: 'لا يوجد تفاعل كيميائي مثبت في ظروف المحاكاة الحالية؛ تلامس الفلزات الصلبة لا يشكل سبائك تلقائياً دون صهر تعديني.',
    noReactionReason: 'Solid elemental copper and gold do not spontaneously form an alloy upon simple physical contact at standard simulated conditions; metallurgical alloying requires melting temperatures above ~1000 °C.'
  },
  {
    id: 'fe_au',
    inputA: 'iron',
    inputB: 'gold',
    reactionStatus: 'PHYSICAL_MIXTURE',
    reactionStatusAr: 'مزيج فيزيائي / تلامس (PHYSICAL_MIXTURE)',
    outputName: 'No Chemical Reaction Observed',
    outputNameAr: 'لم يُسجل أي تفاعل كيميائي',
    outputFormula: 'Fe(s) + Au(s) (Physical Contact / Mixture)',
    outputState: 'Solid',
    colorHex: '#d4af37',
    reactionType: 'Physical Mixture / Elemental Metal Contact',
    reactionTypeAr: 'مزيج فيزيائي / تلامس فلزات عنصرية',
    energyChange: 'Not available / Not calculated',
    energyValue: 0,
    hasOccurred: false,
    deltaH: 'N/A',
    deltaG: 'N/A',
    observedChange: 'Solid iron and gold remain in physical contact without spontaneous chemical bonding or solid-state interdiffusion at standard simulated conditions.',
    observedChangeAr: 'يبقى كل من فلز الحديد وفلز الذهب في حالة تلامس فيزيائي دون حدوث أي تفاعل أو اندماج سبيكي في الظروف العادية.',
    molecularTransformation: 'Body-centered cubic iron and face-centered cubic gold lattices remain strictly separated without atomic interdiffusion at room temperature.',
    molecularTransformationAr: 'تبقى شبكة الحديد المكعبة متمركزة الجسم وشبكة الذهب المكعبة متمركزة الوجه منفصلتين تماماً دون انتشار ذري.',
    scientificExplanation: 'No verified chemical reaction is modeled under the current simulated conditions. Solid metals do not spontaneously form alloys upon simple physical contact at room temperature.',
    scientificExplanationAr: 'لا يوجد تفاعل كيميائي مثبت في ظروف المحاكاة الحالية؛ تلامس الفلزات الصلبة لا يشكل سبائك تلقائياً دون صهر تعديني.',
    noReactionReason: 'Solid elemental iron and gold do not spontaneously form an alloy or intermetallic compound upon simple physical contact at standard simulated conditions.'
  },
  {
    id: 'n2_o2',
    inputA: 'nitrogen',
    inputB: 'oxygen',
    reactionStatus: 'Physical mixture/contact',
    reactionStatusAr: 'مزيج فيزيائي / تلامس',
    outputName: 'No Chemical Reaction Observed',
    outputNameAr: 'لم يُسجل أي تفاعل كيميائي',
    outputFormula: '0.78 N₂ + 0.21 O₂ (Physical Atmospheric Gas Mixture)',
    balancedEquation: 'No reaction under the current simulated conditions.',
    outputState: 'Gas',
    colorHex: '#60a5fa',
    reactionType: 'Homogeneous Molecular Gas Diffusion',
    reactionTypeAr: 'انتشار جزيئي وتمازج فيزيائي للغازات',
    energyChange: 'Not Applicable (No Chemical Reaction)',
    energyValue: 0,
    hasOccurred: false,
    observedChange: 'Diatomic nitrogen and oxygen gases co-mingle freely into a single unified atmospheric gas volume, maintaining a constant 4:1 partial pressure ratio according to Dalton’s Law of Partial Pressures without spontaneous combustion.',
    observedChangeAr: 'يمتزج غازا النيتروجين والأكسجين فيزيائياً دون حدوث أي تفاعل كيميائي في الظروف المعملية الحالية.',
    molecularTransformation: 'Non-polar triple-bonded :N≡N: and double-bonded O=O molecules collide and disperse in dynamic thermal equilibrium without chemical bond cleavage.',
    molecularTransformationAr: 'تتصادم جزيئات النيتروجين والأكسجين تصادمات مرنة دون كسر الرابطة الثلاثية القوية للنيتروجين.',
    unlockedTrivia: 'Nitrogen and oxygen do not spontaneously combust in our atmosphere because the N≡N triple bond requires extreme activation energy (>945 kJ/mol), which only lightning strikes supply.',
    noReactionReason: 'Diatomic nitrogen (:N≡N:) possesses a tremendous triple-bond dissociation energy of 945 kJ/mol. At standard temperature and pressure, collision energy is far too low to overcome this kinetic barrier, resulting in a non-reactive physical gas mixture.'
  },
  {
    id: 'hg_h2o',
    inputA: 'mercury',
    inputB: 'water',
    reactionStatus: 'Physical mixture/contact',
    reactionStatusAr: 'مزيج فيزيائي / تلامس',
    outputName: 'No Chemical Reaction Observed',
    outputNameAr: 'لم يُسجل أي تفاعل كيميائي',
    outputFormula: 'H₂O(l) // Hg(l) (Immiscible Liquid Contact / Stratification)',
    balancedEquation: 'No reaction under the current simulated conditions.',
    outputState: 'Liquid',
    colorHex: '#94a3b8',
    reactionType: 'Immiscible Phase Boundary & Density Stratification',
    reactionTypeAr: 'حد طوري غير قابل للامتزاج وانفصال كثافي',
    energyChange: 'Not Applicable (No Chemical Reaction)',
    energyValue: 0,
    hasOccurred: false,
    observedChange: 'Liquid mercury and water form a unified two-phase liquid volume. Due to its massive density (13.5 g/cm³), mercury settles into the base with a convex meniscus, supporting the crystal-clear water layer directly on top.',
    observedChangeAr: 'يشكل الزئبق والماء طورين سائلين منفصلين لا يمتزجان، حيث يستقر الزئبق في القاع لكثافته العالية دون أي تفاعل.',
    molecularTransformation: 'Extreme cohesive metallic bonding within mercury prevents hydrogen bonding with water dipoles, maintaining a pristine, unreactive hydrophobic contact interface.',
    molecularTransformationAr: 'تمنع الروابط الفلزية المتماسكة للزئبق تشكل روابط هيدروجينية مع جزيئات الماء، مما يبقي السائلين منفصلين تماماً.',
    unlockedTrivia: 'Mercury’s surface tension against water is so high (over 375 mN/m) that water droplets bead up completely on a mercury pool with near-zero contact angle wetting.',
    noReactionReason: 'Extreme cohesive metallic bonding within liquid mercury and strong hydrogen bonding within water make the two liquids mutually immiscible, coexisting in physical contact without chemical reaction.'
  }
];

export const KNOWN_REACTIONS: ReactionResult[] = [
  ...BASE_REACTIONS.map(r => ({
    ...r,
    balancedEquation: r.hasOccurred === false ? undefined : (r.balancedEquation || (r.outputFormula && r.outputFormula.includes('→') ? r.outputFormula : undefined)),
    reactionStatus: (r.reactionStatus as ReactionStatus) || (r.hasOccurred === false ? 'PHYSICAL_MIXTURE' : 'VERIFIED_REACTION'),
    reactionStatusAr: r.reactionStatusAr || (r.hasOccurred === false ? 'مزيج فيزيائي / تلامس (PHYSICAL_MIXTURE)' : 'تفاعل كيميائي مثبت (VERIFIED_REACTION)'),
    scientificallyVerified: true,
    hasOccurred: r.hasOccurred !== undefined ? r.hasOccurred : true
  })),
  ...VERIFIED_REACTIONS.map(r => ({
    ...r,
    reactionStatus: (r.reactionStatus as ReactionStatus) || 'VERIFIED_REACTION',
    reactionStatusAr: r.reactionStatusAr || 'تفاعل كيميائي مثبت (VERIFIED_REACTION)',
    scientificallyVerified: true,
    hasOccurred: true
  }))
];

/**
 * Parses chemical formula string into elemental constituent counts
 */
export function parseChemicalFormula(formula: string): Record<string, number> {
  const clean = formula.replace(/\((s|l|g|aq|conc)\)/g, '').replace(/[↑↓]/g, '').trim();
  const counts: Record<string, number> = {};
  const subSub: Record<string, number> = { '₀':0,'₁':1,'₂':2,'₃':3,'₄':4,'₅':5,'₆':6,'₇':7,'₈':8,'₉':9 };

  function parseGroup(str: string, mult = 1) {
    const elemRegex = /([A-Z][a-z]?)([\u2080-\u20890-9]*)/g;
    let m: RegExpExecArray | null;
    while ((m = elemRegex.exec(str)) !== null) {
      const el = m[1];
      const numStr = m[2];
      let n = 1;
      if (numStr) {
        let converted = '';
        for (const ch of numStr) {
          converted += subSub[ch] !== undefined ? subSub[ch] : ch;
        }
        n = parseInt(converted, 10) || 1;
      }
      counts[el] = (counts[el] || 0) + n * mult;
    }
  }

  const parenRegex = /\(([^)]+)\)([\u2080-\u20890-9]*)/g;
  let match: RegExpExecArray | null;
  while ((match = parenRegex.exec(clean)) !== null) {
    const inner = match[1];
    const numStr = match[2];
    let mult = 1;
    if (numStr) {
      let converted = '';
      for (const ch of numStr) {
        converted += subSub[ch] !== undefined ? subSub[ch] : ch;
      }
      mult = parseInt(converted, 10) || 1;
    }
    parseGroup(inner, mult);
  }
  const withoutParens = clean.replace(/\(([^)]+)\)([\u2080-\u20890-9]*)/g, '');
  parseGroup(withoutParens, 1);
  return counts;
}

/**
 * Verifies atom conservation across balanced chemical equations
 */
export function verifyChemicalEquation(equation: string): { balanced: boolean; details?: string } {
  if (!equation || (!equation.includes('→') && !equation.includes('⇌'))) {
    return { balanced: false, details: 'Missing reaction arrow' };
  }
  const delim = equation.includes('⇌') ? '⇌' : '→';
  const [lhs, rhs] = equation.split(delim).map(s => s.trim());
  if (!lhs || !rhs) return { balanced: false, details: 'Incomplete equation' };

  function parseSide(sideStr: string): Record<string, number> {
    const parts = sideStr.split('+').map(s => s.trim()).filter(Boolean);
    const total: Record<string, number> = {};
    for (const part of parts) {
      const m = part.match(/^([0-9]+)\s*(.*)$/);
      let coef = 1;
      let form = part;
      if (m) {
        coef = parseInt(m[1], 10);
        form = m[2];
      }
      const counts = parseChemicalFormula(form);
      for (const [el, n] of Object.entries(counts)) {
        total[el] = (total[el] || 0) + n * coef;
      }
    }
    return total;
  }

  const leftCounts = parseSide(lhs);
  const rightCounts = parseSide(rhs);
  const allElements = new Set([...Object.keys(leftCounts), ...Object.keys(rightCounts)]);

  for (const el of allElements) {
    if ((leftCounts[el] || 0) !== (rightCounts[el] || 0)) {
      return { 
        balanced: false, 
        details: `Element ${el} not conserved: Left has ${leftCounts[el] || 0}, Right has ${rightCounts[el] || 0}` 
      };
    }
  }
  return { balanced: true };
}

/**
 * Validates reaction output against strict scientific competition constraints
 */
export function validateReactionResult(res: ReactionResult): ReactionResult {
  // If no reaction occurred, clean up all reaction artifacts
  if (res.hasOccurred === false) {
    return {
      ...res,
      balancedEquation: undefined,
      deltaH: 'N/A',
      deltaG: 'N/A',
      energyChange: 'Not available / Not calculated',
      energyValue: 0,
      reactionStatus: (res.reactionStatus === 'CONDITION_REQUIRED' || res.reactionStatus === 'PHYSICAL_MIXTURE' || res.reactionStatus === 'INSUFFICIENT_DATA')
        ? res.reactionStatus
        : 'NO_VERIFIED_REACTION',
      reactionStatusAr: res.reactionStatus === 'CONDITION_REQUIRED'
        ? 'تفاعل مشروط بتوفر متطلبات (CONDITION_REQUIRED)'
        : res.reactionStatus === 'PHYSICAL_MIXTURE'
        ? 'مزيج فيزيائي / تلامس (PHYSICAL_MIXTURE)'
        : res.reactionStatus === 'INSUFFICIENT_DATA'
        ? 'بيانات غير كافية (INSUFFICIENT_DATA)'
        : 'لا يوجد تفاعل كيميائي مثبت (NO_VERIFIED_REACTION)',
      hasOccurred: false
    };
  }

  // If reaction occurred: verify equation
  if (res.balancedEquation) {
    const eqCheck = verifyChemicalEquation(res.balancedEquation);
    if (!eqCheck.balanced) {
      console.warn(`Reaction ${res.id} equation imbalance:`, eqCheck.details);
      return {
        ...res,
        reactionStatus: 'INSUFFICIENT_DATA',
        reactionStatusAr: 'بيانات غير كافية (INSUFFICIENT_DATA)',
        hasOccurred: false,
        balancedEquation: undefined,
        energyChange: 'Not available / Not calculated',
        deltaH: 'N/A',
        deltaG: 'N/A'
      };
    }
  }

  return {
    ...res,
    reactionStatus: (res.reactionStatus as ReactionStatus) || 'VERIFIED_REACTION',
    reactionStatusAr: res.reactionStatusAr || 'تفاعل كيميائي مثبت (VERIFIED_REACTION)',
    hasOccurred: true
  };
}

export function getReaction(
  matA: Material, 
  matB: Material, 
  conditions?: ReactionEnvironmentConditions
): ReactionResult {
  if (!matA || !matB || !matA.id || !matB.id) {
    return validateReactionResult({
      id: 'invalid_reactants',
      inputA: matA?.id || '',
      inputB: matB?.id || '',
      reactionStatus: 'INSUFFICIENT_DATA',
      reactionStatusAr: 'بيانات غير كافية (INSUFFICIENT_DATA)',
      outputName: 'No Chemical Reaction Observed',
      outputNameAr: 'مواد غير صالحة',
      outputFormula: 'None',
      outputState: 'Solid',
      colorHex: '#64748b',
      observedChange: 'No materials provided for simulation.',
      molecularTransformation: 'No transformation.',
      energyChange: 'Not available / Not calculated',
      energyValue: 0,
      reactionType: 'None',
      hasOccurred: false,
      noReactionReason: 'Invalid materials provided to chamber.'
    });
  }

  const isPair = (id1: string, id2: string) => 
    (matA.id === id1 && matB.id === id2) || (matA.id === id2 && matB.id === id1);

  // 1. CONDITION-DEPENDENT REACTION: Iron + Sulfur (Fe + S)
  // At ordinary conditions: physical mixture / no reaction observed.
  // Heating required (>= 200 °C or hasHeatSource): reaction occurs forming FeS!
  if (isPair('iron', 'sulfur')) {
    const hasSufficientHeat = (conditions?.temperature !== undefined && conditions.temperature >= 200) || conditions?.hasHeatSource;
    if (hasSufficientHeat) {
      const verifiedFeS = VERIFIED_REACTIONS.find(r => r.id === 'fe_s_heating');
      if (verifiedFeS) {
        return validateReactionResult({ ...verifiedFeS });
      }
    } else {
      return validateReactionResult({
        id: 'no_rx_fe_s_room_temp',
        inputA: matA.id,
        inputB: matB.id,
        reactionStatus: 'CONDITION_REQUIRED',
        reactionStatusAr: 'تفاعل مشروط بتوفر متطلبات (CONDITION_REQUIRED)',
        outputName: 'Iron & Sulfur (Physical Mixture / No Reaction)',
        outputNameAr: 'الحديد والكبريت (مزيج فيزيائي / لم يحدث تفاعل)',
        outputFormula: 'Fe(s) + S(s) (Heterogeneous Physical Mixture)',
        outputState: 'Solid',
        colorHex: '#475569',
        reactionType: 'Heterogeneous Physical Mixture',
        reactionTypeAr: 'مزيج فيزيائي غير متجانس',
        energyChange: 'Not available / Not calculated',
        energyValue: 0,
        deltaH: 'N/A',
        deltaG: 'N/A',
        observedChange: 'Elemental iron filings and powdered sulfur coexist as a mechanical physical mixture at room temperature. The gray magnetic filings and yellow sulfur powder retain their individual identities and can be separated with a magnet. Sustained heating above ~200 °C is required to initiate chemical reaction.',
        observedChangeAr: 'يبقى برادة الحديد ومسحوق الكبريت في حالة خليط ميكانيكي غير متفاعل عند درجة حرارة الغرفة ويمكن فصل برادة الحديد بالمغناطيس، ويتطلب بدء التفاعل تسخيناً مستمراً فوق 200 درجة مئوية.',
        molecularTransformation: 'Separate metallic Fe lattice domains and S₈ crown-ring molecular crystals remain adjacent without electron transfer or bond cleavage under standard thermal conditions.',
        molecularTransformationAr: 'تبقى حبيبات الحديد الفلزية وحلقات الكبريت التاجية S₈ منفصلة تماماً دون أي كسر روابط أو انتقال إلكتروني في درجة الحرارة العادية.',
        scientificExplanation: 'No verified chemical reaction is modeled under the current simulated conditions. Overcoming the kinetic activation barrier for FeS synthesis requires sustained heating (≥ 200 °C).',
        scientificExplanationAr: 'لا يحدث تفاعل كيميائي مثبت في ظروف المحاكاة الحالية؛ يتطلب التغلب على حاجز طاقة التنشيط لتكوين كبريتيد الحديد تسخيناً مستمراً (≥ 200 مئوية).',
        hasOccurred: false,
        representationType: 'mixture',
        noReactionReason: 'Elemental iron filings and sulfur powder form a physical mixture at room temperature; chemical combination to form FeS requires sustained heating (≥ 200 °C).'
      });
    }
  }

  // 2. CONDITION-DEPENDENT REACTION: Nitrogen + Hydrogen (Haber-Bosch)
  if (isPair('nitrogen', 'hydrogen')) {
    const hasHaberConditions = 
      ((conditions?.temperature !== undefined && conditions.temperature >= 400) || conditions?.hasHeatSource) &&
      ((conditions?.pressure !== undefined && conditions.pressure >= 150) || conditions?.hasCatalyst);
    if (!hasHaberConditions) {
      return validateReactionResult({
        id: 'no_rx_n2_h2_ambient',
        inputA: matA.id,
        inputB: matB.id,
        reactionStatus: 'CONDITION_REQUIRED',
        reactionStatusAr: 'تفاعل مشروط بتوفر متطلبات (CONDITION_REQUIRED)',
        outputName: 'Nitrogen & Hydrogen (Physical Gas Mixture)',
        outputNameAr: 'النيتروجين والهيدروجين (مزيج غازي غير متفاعل)',
        outputFormula: 'N₂(g) + 3H₂(g) (Inert Physical Gas Mixture)',
        outputState: 'Gas',
        colorHex: '#60a5fa',
        reactionType: 'Physical Gas Mixture',
        reactionTypeAr: 'مزيج غازي فيزيائي',
        energyChange: 'Not available / Not calculated',
        energyValue: 0,
        deltaH: 'N/A',
        deltaG: 'N/A',
        observedChange: 'Colorless nitrogen and hydrogen gases mix physically without reacting under standard conditions. Industrial synthesis of ammonia requires 400-500 °C, 150-250 atm pressure, and an iron catalyst.',
        observedChangeAr: 'يمتزج غازا النيتروجين والهيدروجين فيزيائياً دون تفاعل في الظروف العادية، إذ يتطلب تخليق الأمونيا حرارة 400-500 مئوية وضغطاً يفوق 150 ضغط جوي مع محفز حديدي.',
        molecularTransformation: 'The ultra-stable N≡N triple bond (945 kJ/mol) cannot be cleaved at ambient temperature and pressure without specialized catalytic activation.',
        molecularTransformationAr: 'لا يمكن كسر الرابطة الثلاثية فائقة الاستقرار N≡N في الظروف العادية دون حرارة وضغط عاليين ووجود محفز.',
        scientificExplanation: 'No verified chemical reaction is modeled under the current simulated conditions. Overcoming the kinetic barrier of the N≡N triple bond requires Haber-Bosch catalytic conditions.',
        scientificExplanationAr: 'لا يوجد تفاعل كيميائي مثبت في ظروف المحاكاة الحالية؛ يتطلب كسر الرابطة الثلاثية للنيتروجين توفر ظروف هابر-بوش التحفيزية.',
        hasOccurred: false,
        representationType: 'mixture',
        noReactionReason: 'The Haber-Bosch synthesis of ammonia requires high temperature (400-500 °C), extreme pressure (150-250 atm), and an iron/magnetite catalyst.'
      });
    }
  }

  // 3. DIATOMIC OXYGEN + WATER: Physical dissolution, no chemical reaction
  if (isPair('oxygen', 'water')) {
    return validateReactionResult({
      id: 'no_rx_o2_h2o',
      inputA: matA.id,
      inputB: matB.id,
      reactionStatus: 'NO_VERIFIED_REACTION',
      reactionStatusAr: 'لا يوجد تفاعل كيميائي مثبت (NO_VERIFIED_REACTION)',
      outputName: 'No Chemical Reaction Observed',
      outputNameAr: 'لم يُسجل أي تفاعل كيميائي',
      outputFormula: 'O₂(g) + H₂O(l) (Physical Dissolution / Henry\'s Law)',
      outputState: 'Liquid',
      colorHex: '#38bdf8',
      reactionType: 'Physical Gas Dissolution (Henry\'s Law)',
      reactionTypeAr: 'ذوبان فيزيائي للغازات (قانون هنري)',
      energyChange: 'Not available / Not calculated',
      energyValue: 0,
      deltaH: 'N/A',
      deltaG: 'N/A',
      observedChange: 'Diatomic oxygen gas dissolves physically into liquid water up to equilibrium concentration (~8-9 mg/L at 25 °C) without chemical bonding or hydrolysis.',
      observedChangeAr: 'يذوب غاز الأكسجين فيزيائياً في الماء وفق قانون هنري دون حدوث أي تفاعل كيميائي أو كسر للروابط.',
      molecularTransformation: 'Non-polar O₂ molecules fit into the transient hydrogen-bonding cavities of liquid water without proton transfer or redox reaction.',
      molecularTransformationAr: 'تستقر جزيئات الأكسجين غير القطبية في الفجوات البينية لشبكة الروابط الهيدروجينية للماء دون أي انتقال بروتوني أو تفاعل كيميائي.',
      scientificExplanation: 'No verified chemical reaction is modeled under the current simulated conditions.',
      scientificExplanationAr: 'لا يوجد تفاعل كيميائي مثبت في ظروف المحاكاة الحالية.',
      hasOccurred: false,
      representationType: 'mixture',
      noReactionReason: 'Diatomic oxygen dissolves physically in liquid water according to Henry\'s Law without chemical reaction or hydrolysis.'
    });
  }

  // 4. CHECK VERIFIED REACTIONS FIRST
  const found = KNOWN_REACTIONS.find(
    r => (r.inputA === matA.id && r.inputB === matB.id) ||
         (r.inputA === matB.id && r.inputB === matA.id)
  );

  if (found) {
    return validateReactionResult({
      ...found,
      reactionStatus: (found.reactionStatus as ReactionStatus) || (found.hasOccurred === false ? 'PHYSICAL_MIXTURE' : 'VERIFIED_REACTION'),
      reactionStatusAr: found.reactionStatusAr || (found.hasOccurred === false ? 'مزيج فيزيائي / تلامس (PHYSICAL_MIXTURE)' : 'تفاعل كيميائي مثبت (VERIFIED_REACTION)'),
      hasOccurred: found.hasOccurred !== undefined ? found.hasOccurred : true
    });
  }

  // 5. SPECIFIC METALLIC CONTACT: Iron metal + Copper metal (Fe(s) + Cu(s))
  if (isPair('iron', 'copper')) {
    return validateReactionResult({
      id: 'no_rx_fe_cu',
      inputA: matA.id,
      inputB: matB.id,
      reactionStatus: 'PHYSICAL_MIXTURE',
      reactionStatusAr: 'مزيج فيزيائي / تلامس (PHYSICAL_MIXTURE)',
      outputName: 'No Chemical Reaction Observed',
      outputNameAr: 'لم يُسجل أي تفاعل كيميائي',
      outputFormula: 'Fe(s) + Cu(s) (Physical Contact / Mixture)',
      outputState: 'Solid',
      colorHex: '#64748b',
      reactionType: 'Physical Mixture / Elemental Metal Contact',
      reactionTypeAr: 'مزيج فيزيائي / تلامس فلزات عنصرية',
      energyChange: 'Not available / Not calculated',
      energyValue: 0,
      deltaH: 'N/A',
      deltaG: 'N/A',
      observedChange: 'Iron metal and copper metal remain in physical contact without chemical reaction. No electron transfer, dissolution, or intermetallic phase occurs under standard simulated conditions.',
      observedChangeAr: 'يبقى كل من فلز الحديد وفلز النحاس في حالة تلامس فيزيائي دون حدوث أي تفاعل كيميائي أو انتقال إلكتروني في الظروف الحالية.',
      molecularTransformation: 'Metallic lattices of iron (BCC) and copper (FCC) remain strictly separated at atomic interfaces. No valence electron transfer occurs in the absence of an electrolyte solution.',
      molecularTransformationAr: 'تبقى الشبكات البلورية الفلزية لكل من الحديد والنحاس منفصلة تماماً دون أي كسر أو تكوين روابط جديدة.',
      scientificExplanation: 'No verified chemical reaction is modeled under the current simulated conditions. Solid-state elemental metal contact does not trigger single-displacement reactions, which require an aqueous solution of metal ions.',
      scientificExplanationAr: 'لا يوجد تفاعل كيميائي مثبت في ظروف المحاكاة الحالية؛ تلامس الفلزات الصلبة لا يسبب تفاعلات إزاحة، إذ تتطلب الإزاحة محلولاً مائياً يحتوي أيونات الفلز.',
      hasOccurred: false,
      representationType: 'mixture',
      noReactionReason: 'Iron metal and copper metal do not react by physical contact and cannot spontaneously form a new compound. The activity-series metal-displacement reaction requires an appropriate ionic species in aqueous solution (such as Fe + CuSO₄(aq)), not dry elemental metals.'
    });
  }

  // 6. GENERAL ELEMENTAL METAL CONTACT: Solid Metal + Solid Metal
  if (matA.category === 'Metals' && matB.category === 'Metals' && matA.state === 'Solid' && matB.state === 'Solid') {
    return validateReactionResult({
      id: `no_rx_metal_contact_${matA.id}_${matB.id}`,
      inputA: matA.id,
      inputB: matB.id,
      reactionStatus: 'PHYSICAL_MIXTURE',
      reactionStatusAr: 'مزيج فيزيائي / تلامس (PHYSICAL_MIXTURE)',
      outputName: 'No Chemical Reaction Observed',
      outputNameAr: 'لم يُسجل أي تفاعل كيميائي',
      outputFormula: `${matA.symbol}(s) + ${matB.symbol}(s) (Physical Contact / Mixture)`,
      outputState: 'Solid',
      colorHex: '#64748b',
      reactionType: 'Physical Mixture / Elemental Metal Contact',
      reactionTypeAr: 'مزيج فيزيائي / تلامس فلزات عنصرية',
      energyChange: 'Not available / Not calculated',
      energyValue: 0,
      deltaH: 'N/A',
      deltaG: 'N/A',
      observedChange: `${matA.name} metal and ${matB.name} metal remain in physical contact without chemical reaction. Solid elemental metals do not spontaneously form new compounds upon mere physical contact under standard simulated conditions.`,
      observedChangeAr: `يبقى ${matA.nameAr || matA.name} و ${matB.nameAr || matB.name} في حالة تلامس فيزيائي دون حدوث أي تفاعل كيميائي في الظروف المعملية الحالية.`,
      molecularTransformation: 'Separate metallic crystal lattices remain intact at the contact boundary without electron transfer or lattice restructuring.',
      molecularTransformationAr: 'تحافظ الشبكات البلورية الفلزية المنفصلة على تماسكها وبنيتها دون أي انتقال إلكتروني.',
      scientificExplanation: 'No verified chemical reaction is modeled under the current simulated conditions.',
      scientificExplanationAr: 'لا يوجد تفاعل كيميائي مثبت في ظروف المحاكاة الحالية.',
      hasOccurred: false,
      representationType: 'mixture',
      noReactionReason: `${matA.name} metal and ${matB.name} metal do not react by simple physical contact under current simulated conditions. Compound or alloy formation typically requires melting temperatures, metallurgical fluxes, or ionic solutions.`
    });
  }

  // 7. NOBLE GASES (Group 18): Fundamentally Unreactive
  const isNobleGas = (m: Material) => 
    m.id === 'helium' || m.id === 'neon' || m.id === 'argon' || m.id === 'krypton' || m.id === 'xenon' || m.id === 'helium_3' || (m.category === 'Gases' && m.reactivity === 'Inert');

  if (isNobleGas(matA) || isNobleGas(matB)) {
    const noble = isNobleGas(matA) ? matA : matB;
    const other = isNobleGas(matA) ? matB : matA;
    return validateReactionResult({
      id: `no_rx_inert_${matA.id}_${matB.id}`,
      inputA: matA.id,
      inputB: matB.id,
      reactionStatus: 'NO_VERIFIED_REACTION',
      reactionStatusAr: 'لا يوجد تفاعل كيميائي مثبت (NO_VERIFIED_REACTION)',
      outputName: 'No Chemical Reaction Observed',
      outputNameAr: 'لم يُسجل أي تفاعل كيميائي',
      outputFormula: `${noble.symbol} + ${other.symbol} (Inert Noble Gas Contact)`,
      outputState: other.state,
      colorHex: '#64748b',
      reactionType: 'Noble Gas Chemical Inertness',
      reactionTypeAr: 'خمول كيميائي للغاز النبيل',
      energyChange: 'Not available / Not calculated',
      energyValue: 0,
      deltaH: 'N/A',
      deltaG: 'N/A',
      observedChange: `No chemical reaction occurs between ${noble.name} and ${other.name}. Because ${noble.name} possesses a completely filled valence shell, it does not gain, lose, or share electrons at standard simulated conditions.`,
      observedChangeAr: `لم يُلاحظ أي تفاعل كيميائي بين ${noble.nameAr || noble.name} و ${other.nameAr || other.name}. يمتلك الغاز النبيل غلاف تكافؤ مغلق بالكامل يمنعه من التفاعل.`,
      molecularTransformation: 'Atomic and molecular electron orbitals remain completely intact. Transient collisions occur via London dispersion forces with zero net chemical bond cleavage or restructuring.',
      molecularTransformationAr: 'تبقى السحب الإلكترونية الذرية سليمة تماماً، وتقتصر الاصطدامات على قوى التشتت اللحظية دون كسر أو تشكيل أي روابط كيميائية.',
      scientificExplanation: 'No verified chemical reaction is modeled under the current simulated conditions. Noble gases have complete valence shells and extreme ionization potentials.',
      scientificExplanationAr: 'لا يوجد تفاعل كيميائي مثبت في ظروف المحاكاة الحالية؛ تمتلك الغازات النبيلة أغلفة تكافؤ مكتملة وطاقات تأين مرتفعة للغاية.',
      hasOccurred: false,
      representationType: 'mixture',
      noReactionReason: `${noble.name} has a closed electronic octet (or duet) with very high ionization potential and zero electron affinity, preventing spontaneous chemical bonding.`
    });
  }

  // 8. NOBLE METALS WITH WATER: Thermodynamic Immunity
  const isNobleMetal = (m: Material) => m.id === 'gold' || m.id === 'platinum' || m.id === 'silver';
  if ((isNobleMetal(matA) && matB.id === 'water') || (isNobleMetal(matB) && matA.id === 'water')) {
    const metal = isNobleMetal(matA) ? matA : matB;
    return validateReactionResult({
      id: `no_rx_noble_metal_${matA.id}_${matB.id}`,
      inputA: matA.id,
      inputB: matB.id,
      reactionStatus: 'NO_VERIFIED_REACTION',
      reactionStatusAr: 'لا يوجد تفاعل كيميائي مثبت (NO_VERIFIED_REACTION)',
      outputName: 'No Chemical Reaction Observed',
      outputNameAr: 'لم يُسجل أي تفاعل كيميائي',
      outputFormula: `${metal.symbol}(s) + H₂O(l) (Wetting / No Chemical Reaction)`,
      outputState: 'Solid',
      colorHex: metal.colorHex || '#64748b',
      reactionType: 'Zero Redox Activity / Electrochemical Resistance',
      reactionTypeAr: 'نشاط كيميائي معدوم / مقاومة كهروكيميائية',
      energyChange: 'Not available / Not calculated',
      energyValue: 0,
      deltaH: 'N/A',
      deltaG: 'N/A',
      observedChange: `Water wets the ${metal.name} surface without chemical attack, oxidation, or hydrogen evolution. Its strongly positive standard reduction potential makes it thermodynamically immune to reduction by water protons.`,
      observedChangeAr: `يبلل الماء سطح ${metal.nameAr || metal.name} دون أي تآكل أو تفاعل كيميائي بفضل جهد اختزاله الموجب العالي.`,
      molecularTransformation: 'Water dipoles form weak, reversible electrostatic images on the metallic conduction electron sea without cleaving metallic lattice bonds.',
      molecularTransformationAr: 'تشكل ثنائيات قطب الماء استقطاباً سطحياً عابراً دون المساس بالروابط الفلزية الداخلية للشبكة.',
      scientificExplanation: 'No verified chemical reaction is modeled under the current simulated conditions.',
      scientificExplanationAr: 'لا يوجد تفاعل كيميائي مثبت في ظروف المحاكاة الحالية.',
      hasOccurred: false,
      representationType: 'mixture',
      noReactionReason: `${metal.name} has a high positive standard reduction potential (E° > 0 V) and cannot displace hydrogen from neutral water.`
    });
  }

  // 9. GENERAL UNVERIFIED COMBINATIONS: No Chemical Reaction Observed
  // (NO generic concatenated names, NO fake compounds created)
  return validateReactionResult({
    id: `no_rx_${matA.id}_${matB.id}`,
    inputA: matA.id,
    inputB: matB.id,
    reactionStatus: 'NO_VERIFIED_REACTION',
    reactionStatusAr: 'لا يوجد تفاعل كيميائي مثبت (NO_VERIFIED_REACTION)',
    outputName: 'No Chemical Reaction Observed',
    outputNameAr: 'لم يُسجل أي تفاعل كيميائي',
    outputFormula: `${matA.symbol} + ${matB.symbol} (Physical Coexistence / No Reaction)`,
    outputState: matA.state === matB.state ? matA.state : 'Solid',
    colorHex: '#475569',
    reactionType: 'No Verified Chemical Reaction Under Simulated Conditions',
    reactionTypeAr: 'لا يوجد تفاعل كيميائي مثبت في ظروف المحاكاة',
    energyChange: 'Not available / Not calculated',
    energyValue: 0,
    deltaH: 'N/A',
    deltaG: 'N/A',
    observedChange: `No chemical reaction occurs between ${matA.name} and ${matB.name} under current simulated conditions. The substances coexist without chemical transformation.`,
    observedChangeAr: `لا يحدث أي تفاعل كيميائي بين ${matA.nameAr || matA.name} و ${matB.nameAr || matB.name} في الظروف المعملية الحالية، وتبقى المادتان بحالتهما الأصلية دون تغير.`,
    molecularTransformation: 'Both materials retain their respective electron configurations and molecular structures without electron transfer or bond formation.',
    molecularTransformationAr: 'تحافظ كلتا المادتين على بنيتهما الذرية والجزيئية الأصلية دون أي كسر روابط أو انتقال إلكتروني.',
    scientificExplanation: 'No verified chemical reaction is modeled under the current simulated conditions.',
    scientificExplanationAr: 'لا يوجد تفاعل كيميائي مثبت في ظروف المحاكاة الحالية.',
    hasOccurred: false,
    representationType: 'mixture',
    noReactionReason: `No chemical reaction is verified between ${matA.name} and ${matB.name} under current simulated conditions.`
  });
}
