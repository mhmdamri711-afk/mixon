import { Material } from '../types';

export const INITIAL_MATERIALS: Material[] = [
  // --- METALS & ELEMENTS ---
  {
    id: 'copper',
    name: 'Copper',
    nameAr: 'النحاس',
    symbol: 'Cu',
    atomicNumber: 29,
    category: 'Metals',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#b87333',
    particleColor: '#f59e0b',
    density: '8.96 g/cm³',
    meltingPoint: '1085 °C',
    boilingPoint: '2562 °C',
    appearance: 'Reddish-orange metallic luster, highly malleable and ductile.',
    conductivity: 'High',
    reactivity: 'Low',
    oxidationStates: '+1, +2',
    chemicalBehavior: 'Resists corrosion by forming a protective green patina of copper carbonate when exposed to air and moisture.',
    interestingFacts: [
      'Naturally antibacterial: Copper surfaces destroy 99.9% of harmful microbes through contact killing.',
      'One of the first metals ever worked by humanity over 10,000 years ago.',
      'The Statue of Liberty is covered with more than 80 tonnes of copper.'
    ],
    timeline: [
      { year: '8000 BCE', event: 'First discovered and cold-hammered by Neolithic humans.' },
      { year: '3500 BCE', event: 'Alloyed with tin to initiate the Bronze Age.' },
      { year: '1831 CE', event: 'Faraday uses copper coils to discover electromagnetic induction.' }
    ]
  },
  {
    id: 'gold',
    name: 'Gold',
    nameAr: 'الذهب',
    symbol: 'Au',
    atomicNumber: 79,
    category: 'Metals',
    rarity: 'Rare',
    state: 'Solid',
    colorHex: '#ffd700',
    particleColor: '#fbbf24',
    density: '19.32 g/cm³',
    meltingPoint: '1064 °C',
    boilingPoint: '2970 °C',
    appearance: 'Bright lustrous yellow, extremely dense and the most malleable metal known.',
    conductivity: 'High',
    reactivity: 'Inert',
    oxidationStates: '+1, +3',
    chemicalBehavior: 'Noble metal that does not tarnish or oxidize in air; dissolves only in aqua regia.',
    interestingFacts: [
      'A single ounce of gold can be hammered into a sheet covering 300 square feet.',
      'Used on astronaut helmet visors and the James Webb Space Telescope mirrors to reflect infrared heat.',
      'Nearly all the gold on Earth arrived via meteorite bombardments billions of years ago.'
    ],
    timeline: [
      { year: '4000 BCE', event: 'Early gold jewelry crafted in the Balkans and Nile Delta.' },
      { year: '1911 CE', event: 'Rutherford uses ultra-thin gold foil to discover the atomic nucleus.' },
      { year: '2021 CE', event: 'James Webb Space Telescope launches with beryllium-gold plated hexagonal mirrors.' }
    ]
  },
  {
    id: 'iron',
    name: 'Iron',
    nameAr: 'الحديد',
    symbol: 'Fe',
    atomicNumber: 26,
    category: 'Metals',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#94a3b8',
    particleColor: '#cbd5e1',
    density: '7.87 g/cm³',
    meltingPoint: '1538 °C',
    boilingPoint: '2862 °C',
    appearance: 'Silvery-gray ferromagnetic solid with high mechanical strength.',
    conductivity: 'High',
    reactivity: 'Moderate',
    oxidationStates: '+2, +3',
    chemicalBehavior: 'Oxidizes readily in the presence of moisture and oxygen to form hydrated iron(III) oxide (rust).',
    interestingFacts: [
      'The final element created through stellar nucleosynthesis before a star goes supernova.',
      'Forms the molten convective outer core of Earth, generating our planetary magnetic field.',
      'Carries oxygen in mammalian blood as the central atom of the hemoglobin protein.'
    ],
    timeline: [
      { year: '1200 BCE', event: 'Beginning of the Iron Age in the Near East.' },
      { year: '1856 CE', event: 'Bessemer process patents mass production of structural steel.' },
      { year: '1930 CE', event: 'Hemoglobin molecular structure decoded with iron coordination.' }
    ]
  },
  {
    id: 'titanium',
    name: 'Titanium',
    nameAr: 'التيتانيوم',
    symbol: 'Ti',
    atomicNumber: 22,
    category: 'Metals',
    rarity: 'Rare',
    state: 'Solid',
    colorHex: '#a8b2d1',
    particleColor: '#60a5fa',
    density: '4.51 g/cm³',
    meltingPoint: '1668 °C',
    boilingPoint: '3287 °C',
    appearance: 'Silver-grey metallic element with highest strength-to-density ratio of any metallic element.',
    conductivity: 'Medium',
    reactivity: 'Low',
    oxidationStates: '+4',
    chemicalBehavior: 'Passivates almost instantaneously in air, producing an ultra-tough titanium dioxide barrier.',
    interestingFacts: [
      'Biocompatible: bone tissue can osseointegrate and fuse directly onto titanium implants.',
      'As strong as common steel, but 45% lighter.',
      'Widely used in supersonic aircraft, spacecraft hulls, and deep-sea submersibles.'
    ],
    timeline: [
      { year: '1791 CE', event: 'Discovered by William Gregor in Cornwall, England.' },
      { year: '1940 CE', event: 'Kroll process invented to extract metallic titanium economically.' },
      { year: '1964 CE', event: 'SR-71 Blackbird spy plane built using 93% titanium alloy.' }
    ]
  },
  {
    id: 'sodium',
    name: 'Sodium',
    nameAr: 'الصوديوم',
    symbol: 'Na',
    atomicNumber: 11,
    category: 'Elements',
    rarity: 'Rare',
    state: 'Solid',
    colorHex: '#facc15',
    particleColor: '#fde047',
    density: '0.97 g/cm³',
    meltingPoint: '97.8 °C',
    boilingPoint: '883 °C',
    appearance: 'Soft, silvery-white alkali metal that can be cut with a dull butter knife.',
    conductivity: 'High',
    reactivity: 'Very High',
    oxidationStates: '+1',
    chemicalBehavior: 'Extremely reactive with water, releasing hydrogen gas and producing strong sodium hydroxide solution.',
    interestingFacts: [
      'Less dense than water, meaning it floats while vigorously reacting.',
      'Emits a distinctive bright yellow flame during optical emission tests.',
      'Vital for human neuro-muscular cellular signaling through the sodium-potassium pump.'
    ],
    timeline: [
      { year: '1807 CE', event: 'Humphry Davy isolates elemental sodium via molten electrolysis.' },
      { year: '1932 CE', event: 'Low-pressure sodium vapor street lamps illuminate European highways.' }
    ],
    isHazardousSimulation: true,
    hazardWarning: 'Alkali metal: Reacts violently with moisture. Simulated digitally for safety.'
  },
  {
    id: 'silver',
    name: 'Silver',
    nameAr: 'الفضة',
    symbol: 'Ag',
    atomicNumber: 47,
    category: 'Metals',
    rarity: 'Rare',
    state: 'Solid',
    colorHex: '#e2e8f0',
    particleColor: '#f8fafc',
    density: '10.49 g/cm³',
    meltingPoint: '961.8 °C',
    boilingPoint: '2162 °C',
    appearance: 'Brilliant white lustrous metal, having the highest electrical and thermal conductivity of any metal.',
    conductivity: 'High',
    reactivity: 'Low',
    oxidationStates: '+1',
    chemicalBehavior: 'Resists oxidation in pure air, but tarnishes when exposed to airborne sulfur compounds to form black silver sulfide (Ag₂S).',
    interestingFacts: [
      'Reflects 95% of visible light, making it the most reflective elemental metal known.',
      'Possesses powerful antimicrobial oligodynamic properties used in medical dressings.',
      'Historically used for coinage and mirrors across civilizations for thousands of years.'
    ],
    timeline: [
      { year: '3000 BCE', event: 'Early cupellation methods developed to extract silver from lead ores.' },
      { year: '1839 CE', event: 'Daguerreotype photography leverages light-sensitive silver halides.' }
    ]
  },
  {
    id: 'aluminum',
    name: 'Aluminum',
    nameAr: 'الألومنيوم',
    symbol: 'Al',
    atomicNumber: 13,
    category: 'Metals',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#cbd5e1',
    particleColor: '#94a3b8',
    density: '2.70 g/cm³',
    meltingPoint: '660.3 °C',
    boilingPoint: '2470 °C',
    appearance: 'Silvery-white, lightweight ductile metal with outstanding corrosion resistance.',
    conductivity: 'High',
    reactivity: 'High',
    oxidationStates: '+3',
    chemicalBehavior: 'Passivates instantaneously in atmosphere, forming a microscopic 4-nanometer transparent alumina (Al₂O₃) protective barrier.',
    interestingFacts: [
      'The most abundant metallic element in Earth’s crust (approx 8.1% by mass).',
      'Once more valuable than gold; Napoleon III served his most honored guests on aluminum plates.',
      'Infinitely recyclable: recycling aluminum requires only 5% of the energy needed to extract new metal.'
    ],
    timeline: [
      { year: '1825 CE', event: 'Hans Christian Ørsted produces elemental aluminum.' },
      { year: '1886 CE', event: 'Hall-Héroult molten cryolite electrolysis makes aluminum commercially viable.' }
    ]
  },
  {
    id: 'zinc',
    name: 'Zinc',
    nameAr: 'الزنك',
    symbol: 'Zn',
    atomicNumber: 30,
    category: 'Metals',
    rarity: 'Rare',
    state: 'Solid',
    colorHex: '#94a3b8',
    particleColor: '#64748b',
    density: '7.14 g/cm³',
    meltingPoint: '419.5 °C',
    boilingPoint: '907 °C',
    appearance: 'Bluish-silver lustrous metal with hexagonal crystal structure, brittle at ambient temperature.',
    conductivity: 'Medium',
    reactivity: 'Moderate',
    oxidationStates: '+2',
    chemicalBehavior: 'Acts as a sacrificial anode in galvanization, actively oxidizing to protect underlying iron and steel from rusting.',
    interestingFacts: [
      'Essential trace dietary mineral required for over 300 metabolic enzymes in the human body.',
      'Alloyed with copper since antiquity to produce golden, resonance-rich brass.',
      'Used in alkaline batteries as the zinc anode undergoing oxidation.'
    ],
    timeline: [
      { year: '1000 BCE', event: 'Brass artifacts crafted in the Mediterranean basin.' },
      { year: '1746 CE', event: 'Andreas Sigismund Marggraf isolates pure metallic zinc in Europe.' }
    ]
  },
  {
    id: 'magnesium',
    name: 'Magnesium',
    nameAr: 'المغنيسيوم',
    symbol: 'Mg',
    atomicNumber: 12,
    category: 'Metals',
    rarity: 'Rare',
    state: 'Solid',
    colorHex: '#f1f5f9',
    particleColor: '#cbd5e1',
    density: '1.74 g/cm³',
    meltingPoint: '650 °C',
    boilingPoint: '1090 °C',
    appearance: 'Lightweight silvery-white metal that burns with a blinding, pure white thermal flame.',
    conductivity: 'Medium',
    reactivity: 'High',
    oxidationStates: '+2',
    chemicalBehavior: 'Ignites easily when heated in air, reacting with both oxygen and nitrogen to emit intense ultraviolet and visible white light.',
    interestingFacts: [
      'The central coordination atom in the chlorophyll molecule that powers global photosynthesis.',
      'Lightest structural metal, widely alloyed in high-performance automotive and aerospace frames.',
      'Used in distress flares and underwater fireworks because it can burn in pure nitrogen and carbon dioxide.'
    ],
    timeline: [
      { year: '1755 CE', event: 'Joseph Black discovers magnesia as distinct from lime.' },
      { year: '1808 CE', event: 'Humphry Davy isolates magnesium metal electrochemically.' }
    ]
  },
  {
    id: 'calcium',
    name: 'Calcium',
    nameAr: 'الكالسيوم',
    symbol: 'Ca',
    atomicNumber: 20,
    category: 'Metals',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#e2e8f0',
    particleColor: '#f1f5f9',
    density: '1.55 g/cm³',
    meltingPoint: '842 °C',
    boilingPoint: '1484 °C',
    appearance: 'Soft, dull gray-white alkaline earth metal with yellowish cast upon exposure to air.',
    conductivity: 'High',
    reactivity: 'High',
    oxidationStates: '+2',
    chemicalBehavior: 'Reacts readily with water to release hydrogen gas and form calcium hydroxide; essential in geological carbon mineralization.',
    interestingFacts: [
      'The fifth most abundant element in Earth’s crust and the most abundant metal in the human body.',
      'Forms the mineral foundation of biological bones, teeth, seashell calcium carbonate, and coral reefs.',
      'Key component of Portland cement, which binds concrete infrastructure globally.'
    ],
    timeline: [
      { year: '7000 BCE', event: 'Lime plaster used in prehistoric construction in Ain Ghazal (Jordan).' },
      { year: '1808 CE', event: 'Davy isolates metallic calcium via electrolysis of lime and mercuric oxide.' }
    ]
  },
  {
    id: 'potassium',
    name: 'Potassium',
    nameAr: 'البوتاسيوم',
    symbol: 'K',
    atomicNumber: 19,
    category: 'Metals',
    rarity: 'Rare',
    state: 'Solid',
    colorHex: '#f8fafc',
    particleColor: '#e0e7ff',
    density: '0.86 g/cm³',
    meltingPoint: '63.5 °C',
    boilingPoint: '759 °C',
    appearance: 'Ultra-soft silvery metal that can be easily sliced with a butter knife; tarnishes within seconds in air.',
    conductivity: 'High',
    reactivity: 'Very High',
    oxidationStates: '+1',
    chemicalBehavior: 'Reacts violently with water, generating enough heat to instantly ignite the released hydrogen with a brilliant lilac/purple flame.',
    interestingFacts: [
      'Floats on water while vigorously reacting and skittering across the liquid surface.',
      'Critical for nervous system action potentials, heartbeat pacing, and cellular osmotic regulation.',
      'Potassium-40 isotope provides a natural, mild background radiation source in every banana and living creature.'
    ],
    timeline: [
      { year: '1807 CE', event: 'Davy isolates elemental potassium from caustic potash (KOH).' }
    ],
    isHazardousSimulation: true,
    hazardWarning: 'Alkali metal: Reacts explosively with water. Modeled digitally for safety.'
  },

  // --- GASES ---
  {
    id: 'oxygen',
    name: 'Oxygen',
    nameAr: 'الأكسجين',
    symbol: 'O',
    atomicNumber: 8,
    category: 'Gases',
    rarity: 'Common',
    state: 'Gas',
    colorHex: '#38bdf8',
    particleColor: '#00d2ff',
    density: '1.43 g/L',
    meltingPoint: '-218.8 °C',
    boilingPoint: '-183.0 °C',
    appearance: 'Colorless, odorless diatomic gas (O₂); pale blue in liquid state.',
    conductivity: 'Non-conductive',
    reactivity: 'High',
    oxidationStates: '-2',
    chemicalBehavior: 'Powerful oxidizing agent that readily forms oxides with nearly all elements.',
    interestingFacts: [
      'Liquid oxygen is paramagnetic and can be suspended between strong neodymium magnet poles.',
      'Makes up ~21% of Earth’s atmosphere and ~46% of Earth’s crust by mass.',
      'Produced globally by photosynthetic marine phytoplankton and rainforest canopies.'
    ],
    timeline: [
      { year: '1774 CE', event: 'Joseph Priestley discovers dephlogisticated air (oxygen).' },
      { year: '1777 CE', event: 'Lavoisier names oxygen and disproves the phlogiston theory.' }
    ]
  },
  {
    id: 'hydrogen',
    name: 'Hydrogen',
    nameAr: 'الهيدروجين',
    symbol: 'H',
    atomicNumber: 1,
    category: 'Gases',
    rarity: 'Common',
    state: 'Gas',
    colorHex: '#93c5fd',
    particleColor: '#60a5fa',
    density: '0.089 g/L',
    meltingPoint: '-259.2 °C',
    boilingPoint: '-252.9 °C',
    appearance: 'Colorless, odorless, highly flammable lightest gas in the universe.',
    conductivity: 'Non-conductive',
    reactivity: 'High',
    oxidationStates: '+1, -1',
    chemicalBehavior: 'Combines with oxygen in a rapid exothermic chain to produce clean pure water (H₂O).',
    interestingFacts: [
      'Constitutes roughly 75% of all baryonic elemental mass in the universe.',
      'Powers the nuclear fusion cores of our Sun and every main-sequence star.',
      'Under extreme pressures of millions of atmospheres, hydrogen transitions into a metallic superconductor.'
    ],
    timeline: [
      { year: '1766 CE', event: 'Henry Cavendish identifies flammable air as a discrete element.' },
      { year: '1925 CE', event: 'Cecilia Payne-Gaposchkin proves stars are predominantly hydrogen.' }
    ]
  },
  {
    id: 'nitrogen',
    name: 'Nitrogen',
    nameAr: 'النيتروجين',
    symbol: 'N',
    atomicNumber: 7,
    category: 'Gases',
    rarity: 'Common',
    state: 'Gas',
    colorHex: '#818cf8',
    particleColor: '#6366f1',
    density: '1.25 g/L',
    meltingPoint: '-210.0 °C',
    boilingPoint: '-195.8 °C',
    appearance: 'Colorless, odorless inert atmospheric gas.',
    conductivity: 'Non-conductive',
    reactivity: 'Inert',
    oxidationStates: '-3, +3, +5',
    chemicalBehavior: 'Diatomic N₂ has one of the strongest triple covalent bonds known (945 kJ/mol), making it extremely stable.',
    interestingFacts: [
      'Makes up ~78% of Earth’s atmosphere.',
      'Liquid nitrogen boils at -196°C, making it the primary cryogen for cellular preservation and supercooling.',
      'Essential building block of amino acids, proteins, and DNA nucleobases.'
    ],
    timeline: [
      { year: '1772 CE', event: 'Daniel Rutherford identifies noxious gas in air.' },
      { year: '1909 CE', event: 'Haber-Bosch process synthesized ammonia, feeding billions.' }
    ]
  },
  {
    id: 'chlorine',
    name: 'Chlorine',
    nameAr: 'الكلور',
    symbol: 'Cl',
    atomicNumber: 17,
    category: 'Gases',
    rarity: 'Rare',
    state: 'Gas',
    colorHex: '#84cc16',
    particleColor: '#a3e635',
    density: '3.20 g/L',
    meltingPoint: '-101.5 °C',
    boilingPoint: '-34.0 °C',
    appearance: 'Pale yellow-green dense halogen gas with pungent suffocating odor.',
    conductivity: 'Non-conductive',
    reactivity: 'Very High',
    oxidationStates: '-1',
    chemicalBehavior: 'Extremely hungry for electrons; pulls an electron directly from sodium to form common salt.',
    interestingFacts: [
      'Heavier than air; collects in low-lying trenches if released.',
      'Used worldwide to sanitize municipal drinking water from waterborne pathogens.',
      'One of the first industrial bleaching and disinfecting agents.'
    ],
    timeline: [
      { year: '1774 CE', event: 'Carl Wilhelm Scheele isolates chlorine gas.' },
      { year: '1810 CE', event: 'Sir Humphry Davy proves it is an element and names it after the Greek word for green.' }
    ],
    isHazardousSimulation: true,
    hazardWarning: 'Corrosive halogen: Educational safe digital simulation.'
  },
  {
    id: 'helium',
    name: 'Helium',
    nameAr: 'الهيليوم',
    symbol: 'He',
    atomicNumber: 2,
    category: 'Gases',
    rarity: 'Exotic',
    state: 'Gas',
    colorHex: '#f472b6',
    particleColor: '#fb7185',
    density: '0.178 g/L',
    meltingPoint: '-272.2 °C (at 2.5 MPa)',
    boilingPoint: '-268.9 °C',
    appearance: 'Completely colorless, odorless, non-toxic noble gas.',
    conductivity: 'Non-conductive',
    reactivity: 'Inert',
    oxidationStates: '0',
    chemicalBehavior: 'Possesses a full valence shell (2 electrons); does not naturally react or form stable chemical bonds.',
    interestingFacts: [
      'Becomes a superfluid below 2.17 Kelvin (Lambda point), flowing with zero viscosity and climbing up test tube walls!',
      'First discovered in the Sun’s spectral lines before ever being found on Earth.',
      'The only element that cannot be solidified by cooling alone under standard atmospheric pressure.'
    ],
    timeline: [
      { year: '1868 CE', event: 'Spectroscopic line observed in solar eclipse by Pierre Janssen.' },
      { year: '1908 CE', event: 'Heike Kamerlingh Onnes liquidates helium at Leiden.' }
    ]
  },
  {
    id: 'carbon_dioxide',
    name: 'Carbon Dioxide',
    nameAr: 'ثاني أكسيد الكربون',
    symbol: 'CO₂',
    category: 'Gases',
    rarity: 'Common',
    state: 'Gas',
    colorHex: '#94a3b8',
    particleColor: '#64748b',
    density: '1.98 g/L',
    meltingPoint: '-78.5 °C (sublimates)',
    boilingPoint: '-78.5 °C',
    appearance: 'Colorless, odorless dense greenhouse gas that sublimates directly into white vapor.',
    conductivity: 'Non-conductive',
    reactivity: 'Low',
    oxidationStates: 'Carbon (+4), Oxygen (-2)',
    chemicalBehavior: 'Linear non-polar molecule with two double bonds; dissolves in water to establish carbonic acid equilibrium (H₂CO₃).',
    interestingFacts: [
      'Sublimates directly from solid dry ice to gas at -78.5 °C without passing through a liquid phase at 1 atm.',
      'Essential photosynthetic carbon source for all terrestrial plant life and phytoplankton.',
      'Forms 96.5% of the dense, superheated atmosphere of Venus.'
    ],
    timeline: [
      { year: '1756 CE', event: 'Joseph Black identifies "fixed air" as a distinct chemical substance.' },
      { year: '1835 CE', event: 'Adrien-Jean-Pierre Thilorier produces the first solid dry ice.' }
    ]
  },
  {
    id: 'ammonia',
    name: 'Ammonia',
    nameAr: 'الأمونيا',
    symbol: 'NH₃',
    category: 'Gases',
    rarity: 'Rare',
    state: 'Gas',
    colorHex: '#67e8f9',
    particleColor: '#38bdf8',
    density: '0.73 g/L',
    meltingPoint: '-77.7 °C',
    boilingPoint: '-33.3 °C',
    appearance: 'Colorless gas with a sharp, pungent suffocating odor; lighter than air.',
    conductivity: 'Non-conductive',
    reactivity: 'High',
    oxidationStates: 'Nitrogen (-3), Hydrogen (+1)',
    chemicalBehavior: 'Weak Lewis and Brønsted-Lowry base; reacts vigorously with acids to form ammonium salts.',
    interestingFacts: [
      'The Haber-Bosch synthesis of ammonia enables agricultural fertilizers that sustain nearly half the human population.',
      'High heat of vaporization makes it an efficient zero-GWP industrial refrigerant.',
      'Liquid ammonia acts as an ionizing solvent similar to water, dissolving alkali metals to yield solvated electron solutions.'
    ],
    timeline: [
      { year: '1774 CE', event: 'Joseph Priestley isolates pure alkaline air (ammonia gas).' },
      { year: '1909 CE', event: 'Fritz Haber demonstrates high-pressure ammonia catalytic synthesis.' }
    ],
    isHazardousSimulation: true,
    hazardWarning: 'Pungent base: Toxic if inhaled at concentration. Modeled safely in digital lab.'
  },

  // --- LIQUIDS ---
  {
    id: 'water',
    name: 'Water',
    nameAr: 'الماء',
    symbol: 'H₂O',
    category: 'Liquids',
    rarity: 'Common',
    state: 'Liquid',
    colorHex: '#0ea5e9',
    particleColor: '#38bdf8',
    density: '1.00 g/cm³',
    meltingPoint: '0 °C',
    boilingPoint: '100 °C',
    appearance: 'Transparent, odorless liquid with high surface tension and unique anomalous expansion.',
    conductivity: 'Low',
    reactivity: 'Moderate',
    oxidationStates: 'Neutral compound',
    chemicalBehavior: 'Universal solvent due to its bent polar molecular geometry and hydrogen bonding network.',
    interestingFacts: [
      'Expands upon freezing: ice is less dense than liquid water, allowing aquatic life to survive frozen lakes.',
      'Covers ~71% of Earth’s surface, with over 96% residing in oceans.',
      'Possesses unusually high specific heat capacity, regulating planetary climate.'
    ],
    timeline: [
      { year: '1783 CE', event: 'Antoine Lavoisier demonstrates water is a compound of hydrogen and oxygen.' },
      { year: '1931 CE', event: 'Discovery of heavy water (deuterium oxide).' }
    ]
  },
  {
    id: 'mercury',
    name: 'Mercury',
    nameAr: 'الزئبق',
    symbol: 'Hg',
    atomicNumber: 80,
    category: 'Liquids',
    rarity: 'Rare',
    state: 'Liquid',
    colorHex: '#cbd5e1',
    particleColor: '#e2e8f0',
    density: '13.53 g/cm³',
    meltingPoint: '-38.83 °C',
    boilingPoint: '356.7 °C',
    appearance: 'Dense, heavy, reflective silvery liquid metal at room temperature.',
    conductivity: 'High',
    reactivity: 'Low',
    oxidationStates: '+1, +2',
    chemicalBehavior: 'Dissolves other metals including gold and silver to form amalgams; relativistic electron contractions lower its melting point.',
    interestingFacts: [
      'The only metallic element that is liquid at standard ambient temperature and pressure.',
      'Iron cannonballs float on its surface due to mercury’s extreme density.',
      'Used for centuries in medical thermometers and barometers before electronic sensors.'
    ],
    timeline: [
      { year: '1500 BCE', event: 'Mercury samples discovered in ancient Egyptian tombs.' },
      { year: '1643 CE', event: 'Evangelista Torricelli invents the mercury barometer.' }
    ],
    isHazardousSimulation: true,
    hazardWarning: 'Heavy metal toxicity: Simulated digitally for educational inquiry.'
  },
  {
    id: 'ethanol',
    name: 'Ethanol',
    nameAr: 'الإيثانول',
    symbol: 'C₂H₅OH',
    category: 'Liquids',
    rarity: 'Rare',
    state: 'Liquid',
    colorHex: '#a5f3fc',
    particleColor: '#67e8f9',
    density: '0.789 g/cm³',
    meltingPoint: '-114.1 °C',
    boilingPoint: '78.37 °C',
    appearance: 'Clear, colorless volatile liquid with characteristic pleasant odor; fully miscible with water.',
    conductivity: 'Non-conductive',
    reactivity: 'Moderate',
    oxidationStates: 'Carbon (-2), Hydrogen (+1), Oxygen (-2)',
    chemicalBehavior: 'Undergoes clean combustion with oxygen to produce water vapor and carbon dioxide; forms dynamic hydrogen bonds with water.',
    interestingFacts: [
      'Mixes with water in all proportions with an exothermic release of heat and volume contraction.',
      'Renewable biofuel synthesized at gigaliter scales via yeast fermentation of plant starches.',
      'Universal solvent for organic tinctures, medicines, perfumes, and sanitizers.'
    ],
    timeline: [
      { year: '800 CE', event: 'Al-Kindi and Persian chemists refine wine distillation into pure alcohol.' },
      { year: '1796 CE', event: 'Johann Tobias Lowitz obtains pure anhydrous ethanol using anhydrous alkali.' }
    ]
  },

  // --- MINERALS ---
  {
    id: 'silicon',
    name: 'Silicon',
    nameAr: 'السيليكون',
    symbol: 'Si',
    atomicNumber: 14,
    category: 'Minerals',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#475569',
    particleColor: '#60a5fa',
    density: '2.33 g/cm³',
    meltingPoint: '1414 °C',
    boilingPoint: '3265 °C',
    appearance: 'Dark blue-gray lustrous semiconductor crystal shard with metallic sheen and razor-sharp cleavage.',
    conductivity: 'Medium',
    reactivity: 'Low',
    oxidationStates: '+4, -4',
    chemicalBehavior: 'Forms a diamond cubic crystal lattice; pure monocrystalline ingots undergo controlled atomic doping to create modern microprocessors.',
    interestingFacts: [
      'Second most abundant element in Earth’s crust (approx 28% by mass), primarily as silicates.',
      'The foundational substrate of all modern computing, solar cells, and digital technology.',
      'Under high pressure, transforms into a dense metallic allotrope with superconductive properties.'
    ],
    timeline: [
      { year: '1824 CE', event: 'Jöns Jacob Berzelius isolates pure elemental silicon.' },
      { year: '1954 CE', event: 'Texas Instruments creates the first commercial silicon transistor.' }
    ]
  },
  {
    id: 'sulfur',
    name: 'Sulfur',
    nameAr: 'الكبريت',
    symbol: 'S',
    atomicNumber: 16,
    category: 'Minerals',
    rarity: 'Rare',
    state: 'Solid',
    colorHex: '#facc15',
    particleColor: '#fde047',
    density: '2.07 g/cm³',
    meltingPoint: '115.2 °C',
    boilingPoint: '444.6 °C',
    appearance: 'Bright canary-yellow crystalline solid forming octasulfur (S₈) crown rings.',
    conductivity: 'Non-conductive',
    reactivity: 'Moderate',
    oxidationStates: '-2, +4, +6',
    chemicalBehavior: 'Burns with a quiet royal-blue flame in air, producing choking sulfur dioxide (SO₂) gas; reacts directly with metals to form sulfides.',
    interestingFacts: [
      'Known in biblical times as "brimstone", found in volcanic fumaroles and hydrothermal vents.',
      'Sulfuric acid (H₂SO₄) is the world’s most widely manufactured chemical, used to gauge national industrial output.',
      'Forms the disulfide cross-links in keratin proteins that give hair its curl and mechanical strength.'
    ],
    timeline: [
      { year: '500 BCE', event: 'Used in pyrotechnics and military incendiaries in ancient China.' },
      { year: '1777 CE', event: 'Antoine Lavoisier convinces the scientific community that sulfur is an element.' }
    ]
  },
  {
    id: 'sand',
    name: 'Silica Sand',
    nameAr: 'رمل السيليكا',
    symbol: 'SiO₂',
    category: 'Minerals',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#fde047',
    particleColor: '#eab308',
    density: '1.60 g/cm³ (Bulk)',
    meltingPoint: '1710 °C',
    boilingPoint: '2950 °C',
    appearance: 'Granular collection of microscopic weathered quartz crystal grains with vitreous reflections.',
    conductivity: 'Non-conductive',
    reactivity: 'Inert',
    oxidationStates: 'Silicon (+4), Oxygen (-2)',
    chemicalBehavior: 'Chemical inertness makes it ideal as the raw precursor for glassmaking, hydraulic fracturing, and foundry molds.',
    interestingFacts: [
      'Desert dunes and ocean shorelines consist primarily of quartz crystals weathered over millions of years.',
      'High-purity quartz sand is the starting material from which electronic-grade silicon is refined.',
      'Sand is the second most exploited natural resource on Earth after water.'
    ],
    timeline: [
      { year: '3500 BCE', event: 'Mesopotamian artisans melt silica sand with soda ash to create early glass.' }
    ]
  },
  {
    id: 'glass',
    name: 'Silicate Glass',
    nameAr: 'زجاج السيليكات',
    symbol: 'SiO₂ (amorphous)',
    category: 'Minerals',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#e0f2fe',
    particleColor: '#bae6fd',
    density: '2.52 g/cm³',
    meltingPoint: '1400 °C (Softens)',
    boilingPoint: 'N/A',
    appearance: 'Homogeneous, transparent amorphous solid with high optical clarity and smooth conchoidal fracture.',
    conductivity: 'Non-conductive',
    reactivity: 'Inert',
    oxidationStates: 'Neutral network',
    chemicalBehavior: 'Non-crystalline vitreous supercooled liquid network; dissolves only in concentrated hydrofluoric acid.',
    interestingFacts: [
      'Glass has no discrete melting point; it softens continuously across a glass transition temperature range.',
      'Fiber-optic glass cables carry over 99% of global transoceanic internet data via total internal reflection.',
      'Naturally formed obsidian and fulgurites are natural glass forged by volcanic eruptions and lightning strikes.'
    ],
    timeline: [
      { year: '1500 BCE', event: 'Hollow glass vessels first manufactured in Egypt and Mesopotamia.' },
      { year: '1952 CE', event: 'Alastair Pilkington invents the float glass process for flawless window glass.' }
    ]
  },
  {
    id: 'quartz',
    name: 'Quartz',
    nameAr: 'الكوارتز',
    symbol: 'SiO₂',
    category: 'Minerals',
    rarity: 'Rare',
    state: 'Solid',
    colorHex: '#e0e7ff',
    particleColor: '#c7d2fe',
    density: '2.65 g/cm³',
    meltingPoint: '1713 °C',
    boilingPoint: '2950 °C',
    appearance: 'Hexagonal prism crystal, transparent to vitreous white luster.',
    conductivity: 'Non-conductive',
    reactivity: 'Low',
    oxidationStates: 'Silicon (+4), Oxygen (-2)',
    chemicalBehavior: 'Extremely durable network covalent solid; insoluble in acids except hydrofluoric acid.',
    interestingFacts: [
      'Piezoelectric: generates a precise electrical frequency when compressed, powering quartz wristwatches and microprocessors.',
      'Second most abundant mineral in Earth’s continental crust after feldspar.',
      'Found inside almost every beach sand dune in the world.'
    ],
    timeline: [
      { year: '1880 CE', event: 'Jacques and Pierre Curie discover piezoelectricity in quartz crystals.' },
      { year: '1927 CE', event: 'Warren Marrison builds the first quartz clock at Bell Labs.' }
    ]
  },
  {
    id: 'diamond',
    name: 'Diamond',
    nameAr: 'الماس',
    symbol: 'C',
    atomicNumber: 6,
    category: 'Minerals',
    rarity: 'Exotic',
    state: 'Solid',
    colorHex: '#bae6fd',
    particleColor: '#e0f2fe',
    density: '3.51 g/cm³',
    meltingPoint: '4027 °C',
    boilingPoint: '4830 °C',
    appearance: 'Brilliant optical dispersion, tetrahedral crystalline carbon lattice.',
    conductivity: 'Non-conductive',
    reactivity: 'Inert',
    oxidationStates: '0',
    chemicalBehavior: 'Pure allotrope of carbon arranged in a rigid diamond cubic crystal structure; highest hardness of any natural material (Mohs 10).',
    interestingFacts: [
      'Exceptional thermal conductor: conducts heat 5 times better than copper!',
      'Formed at depths of 150-250 km in Earth’s mantle under pressures above 50,000 atmospheres.',
      'Can burn into pure carbon dioxide gas when heated in pure oxygen above 700 °C.'
    ],
    timeline: [
      { year: '400 BCE', event: 'Diamond trade recognized in Sanskrit texts in ancient India.' },
      { year: '1772 CE', event: 'Lavoisier proves diamond is pure elemental carbon by burning it.' },
      { year: '1954 CE', event: 'General Electric synthesizes first lab-grown industrial diamond.' }
    ]
  },

  // --- ORGANIC & EVERYDAY ---
  {
    id: 'carbon',
    name: 'Carbon',
    nameAr: 'الكربون',
    symbol: 'C',
    atomicNumber: 6,
    category: 'Organic',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#334155',
    particleColor: '#64748b',
    density: '2.26 g/cm³ (Graphite)',
    meltingPoint: '3550 °C',
    boilingPoint: '4827 °C',
    appearance: 'Sub-metallic black/charcoal solid, allotropic backbone of life.',
    conductivity: 'Medium',
    reactivity: 'Moderate',
    oxidationStates: '-4, +2, +4',
    chemicalBehavior: 'Forms catenated carbon-carbon single, double, and triple bonds, giving rise to nearly 10 million known organic compounds.',
    interestingFacts: [
      'The chemical basis for all known terrestrial organic biochemistry.',
      'Graphene, a 1-atom-thick sheet of carbon, is 200 times stronger than steel.',
      'Carbon-14 isotope acts as a radioactive cosmic clock for archaeology.'
    ],
    timeline: [
      { year: 'Antiquity', event: 'Charcoal used for metallurgy and cave paintings.' },
      { year: '1985 CE', event: 'Discovery of Buckminsterfullerene (C60 carbon buckyballs).' },
      { year: '2004 CE', event: 'Isolation of graphene via scotch tape method by Geim & Novoselov.' }
    ]
  },
  {
    id: 'methane',
    name: 'Methane',
    nameAr: 'الميثان',
    symbol: 'CH₄',
    category: 'Organic',
    rarity: 'Common',
    state: 'Gas',
    colorHex: '#34d399',
    particleColor: '#10b981',
    density: '0.657 g/L',
    meltingPoint: '-182.5 °C',
    boilingPoint: '-161.5 °C',
    appearance: 'Colorless, odorless simplest hydrocarbon gas.',
    conductivity: 'Non-conductive',
    reactivity: 'Moderate',
    oxidationStates: 'Carbon (-4), Hydrogen (+1)',
    chemicalBehavior: 'Burns cleanly in oxygen to yield carbon dioxide, water vapor, and exothermic heat energy.',
    interestingFacts: [
      'Main constituent of natural gas (~90%).',
      'Abundant in lakes of liquid hydrocarbon on Saturn’s giant moon Titan.',
      'Potent greenhouse gas with over 28 times the atmospheric warming potential of CO₂ over a century.'
    ],
    timeline: [
      { year: '1776 CE', event: 'Alessandro Volta identifies marsh gas in Lake Maggiore.' },
      { year: '2005 CE', event: 'Huygens probe lands amidst methane dunes on Titan.' }
    ]
  },
  {
    id: 'salt',
    name: 'Sodium Chloride (Salt)',
    nameAr: 'كلوريد الصوديوم (ملح الطعام)',
    symbol: 'NaCl',
    category: 'Everyday Materials',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#f1f5f9',
    particleColor: '#e2e8f0',
    density: '2.16 g/cm³',
    meltingPoint: '801 °C',
    boilingPoint: '1465 °C',
    appearance: 'Transparent to white cubic crystals with pleasant ionic briny flavor.',
    conductivity: 'Non-conductive',
    reactivity: 'Low',
    oxidationStates: 'Na (+1), Cl (-1)',
    chemicalBehavior: 'Classic ionic lattice held together by strong electrostatic attraction; dissolves readily into hydrated ions.',
    interestingFacts: [
      'Solid salt crystals do not conduct electricity, but dissolved in water they form a powerful electrolyte solution.',
      'Historically used as currency: Roman soldiers were paid allowances ("salarium", root of salary) to buy salt.',
      'Maintains cellular osmotic fluid balance in living organisms.'
    ],
    timeline: [
      { year: '6000 BCE', event: 'Neolithic salt extraction at Lake Yuncheng, China.' },
      { year: '1913 CE', event: 'Bragg father-and-son determine NaCl crystal structure using X-ray diffraction.' }
    ]
  },
  {
    id: 'baking_soda',
    name: 'Sodium Bicarbonate',
    nameAr: 'بيكربونات الصوديوم',
    symbol: 'NaHCO₃',
    category: 'Everyday Materials',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#f8fafc',
    particleColor: '#94a3b8',
    density: '2.20 g/cm³',
    meltingPoint: '50 °C (decomposes)',
    boilingPoint: '851 °C',
    appearance: 'Fine white crystalline powder.',
    conductivity: 'Low',
    reactivity: 'Moderate',
    oxidationStates: 'Na (+1), H (+1), C (+4), O (-2)',
    chemicalBehavior: 'Mild amphoteric buffer; reacts with acids to produce rapid effervescence of carbon dioxide bubbles.',
    interestingFacts: [
      'Used in baking to make cakes rise by releasing gaseous CO₂ pockets inside dough.',
      'Acts as a fire extinguisher powder for grease fires by smothering flames in CO₂.',
      'Relieves acid indigestion by neutralizing hydrochloric stomach acid.'
    ],
    timeline: [
      { year: '1791 CE', event: 'Nicolas Leblanc synthesizes sodium carbonate.' },
      { year: '1846 CE', event: 'Church & Dwight establish modern Arm & Hammer baking soda.' }
    ]
  },

  // --- SPACE MATTER ---
  {
    id: 'helium_3',
    name: 'Helium-3',
    nameAr: 'هيليوم-3 الكوني',
    symbol: '³He',
    atomicNumber: 2,
    category: 'Space',
    rarity: 'Exotic',
    state: 'Gas',
    colorHex: '#00d2ff',
    particleColor: '#38bdf8',
    density: '0.134 g/L',
    meltingPoint: '-272.8 °C',
    boilingPoint: '-269.9 °C',
    appearance: 'Invisible cosmic noble gas isotope with 2 protons and 1 neutron.',
    conductivity: 'Non-conductive',
    reactivity: 'Inert',
    oxidationStates: '0',
    chemicalBehavior: 'Inert non-radioactive isotope; theoretical holy grail fuel for aneutronic nuclear fusion.',
    interestingFacts: [
      'Extremely rare on Earth, but trapped in lunar regolith over billions of years by the solar wind.',
      'Fusion with deuterium releases high energy without dangerous radioactive neutron radiation.',
      'A single space shuttle cargo bay of He-3 could theoretically power the United States for an entire year.'
    ],
    timeline: [
      { year: '1939 CE', event: 'Luis Alvarez and Robert Cornog discover Helium-3.' },
      { year: '1986 CE', event: 'Apollo lunar soil analysis reveals high concentrations of Helium-3 on the Moon.' }
    ]
  },
  {
    id: 'cosmic_stardust',
    name: 'Cosmic Silicate Stardust',
    nameAr: 'غبار النجوم الكوني',
    symbol: 'MgFeSiO₄',
    category: 'Space',
    rarity: 'Exotic',
    state: 'Solid',
    colorHex: '#38bdf8',
    particleColor: '#818cf8',
    density: '3.32 g/cm³',
    meltingPoint: '1890 °C',
    boilingPoint: '3200 °C',
    appearance: 'Microscopic olivine-pyroxene chondritic dust grains formed in stellar envelopes.',
    conductivity: 'Low',
    reactivity: 'Low',
    oxidationStates: 'Varies',
    chemicalBehavior: 'Refractory interstellar mineral grain; seeded proto-planetary disks and provided the raw building blocks for terrestrial planets.',
    interestingFacts: [
      'Pre-solar grains found in meteorites are older than our entire Solar System (>4.6 billion years).',
      'Contains isotopic anomalies reflecting supernovae and asymptotic giant branch stellar winds.',
      'Captured directly in comet tails by NASA’s Stardust spacecraft using aerogel collector panels.'
    ],
    timeline: [
      { year: '1969 CE', event: 'Murchison meteorite falls in Australia containing pre-solar grains.' },
      { year: '2006 CE', event: 'NASA Stardust capsule returns microscopic comet dust to Earth.' }
    ]
  },
  {
    id: 'cosmic_plasma',
    name: 'Cosmic Hydrogen Plasma',
    nameAr: 'بلازما الهيدروجين الفضائية',
    symbol: 'H⁺ / e⁻',
    category: 'Space',
    rarity: 'Legendary',
    state: 'Plasma',
    colorHex: '#c084fc',
    particleColor: '#e879f9',
    density: '0.00001 g/m³',
    meltingPoint: 'N/A (Ionized)',
    boilingPoint: 'N/A',
    appearance: 'Luminescent ionized glowing gas emitting intense electromagnetic aurora radiation.',
    conductivity: 'Superconductor',
    reactivity: 'Very High',
    oxidationStates: 'Ionized',
    chemicalBehavior: 'Electrons stripped from protons; highly responsive to magnetic fields and Alfvén plasma waves.',
    interestingFacts: [
      'Plasma comprises over 99% of all visible matter in the observable universe.',
      'Carried across the solar system at speeds up to 800 km/s as the Solar Wind.',
      'Causes polar auroras (Northern & Southern Lights) when colliding with Earth’s upper magnetosphere.'
    ],
    timeline: [
      { year: '1879 CE', event: 'William Crookes identifies radiant matter (fourth state of matter).' },
      { year: '1928 CE', event: 'Irving Langmuir coins the term "plasma" due to its fluid lifelike behavior.' }
    ]
  }
];
