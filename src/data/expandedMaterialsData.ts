import { Material } from '../types';

export const EXPANDED_MATERIALS: Material[] = [
  // =========================================================================
  // ACIDS & BASES
  // =========================================================================
  {
    id: 'hydrochloric_acid',
    name: 'Hydrochloric Acid',
    nameAr: 'حمض الهيدروكلوريك',
    symbol: 'HCl(aq)',
    category: 'Everyday Materials',
    rarity: 'Common',
    state: 'Liquid',
    colorHex: '#a7f3d0',
    particleColor: '#34d399',
    density: '1.18 g/cm³',
    meltingPoint: '-30 °C',
    boilingPoint: '108.5 °C',
    appearance: 'Clear, colorless, pungent fuming aqueous solution of hydrogen chloride gas.',
    conductivity: 'High',
    reactivity: 'Very High',
    oxidationStates: 'H(+1), Cl(-1)',
    chemicalBehavior: 'Strong monoprotic mineral acid that fully dissociates in water (pKa ≈ -6.3). Dissolves reactive metals releasing H₂ gas and vigorously neutralizes basic metal hydroxides.',
    interestingFacts: [
      'Found naturally in the gastric acid of the human stomach (pH 1.5 to 3.5) for protein digestion.',
      'Historically termed "spirits of salt" or "muriatic acid" by medieval alchemists.',
      'Crucial for the industrial pickling and descaling of steel before galvanization or cold-rolling.'
    ],
    timeline: [
      { year: '800 CE', event: 'Persian alchemist Jabir ibn Hayyan (Geber) discovers hydrochloric acid.' },
      { year: '1810 CE', event: 'Sir Humphry Davy proves hydrochloric acid consists solely of hydrogen and chlorine.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.8,
      meltingPointNum: -30,
      boilingPointNum: 108.5,
      solidBelow: -30,
      gasAbove: 108.5
    },
    pressureBehavior: {
      compressibility: 'low',
      volumeReductionFactor: 0.98,
      collisionFrequencyMultiplier: 1.5
    },
    isHazardousSimulation: true,
    hazardWarning: 'Strong mineral acid - causes severe chemical burns. Handle with virtual lab PPE.'
  },
  {
    id: 'sulfuric_acid',
    name: 'Sulfuric Acid',
    nameAr: 'حمض الكبريتيك',
    symbol: 'H₂SO₄',
    category: 'Everyday Materials',
    rarity: 'Common',
    state: 'Liquid',
    colorHex: '#fef08a',
    particleColor: '#facc15',
    density: '1.83 g/cm³',
    meltingPoint: '10.38 °C',
    boilingPoint: '337 °C',
    appearance: 'Dense, oily, viscous clear liquid with immense dehydrating and acidifying power.',
    conductivity: 'High',
    reactivity: 'Very High',
    oxidationStates: 'H(+1), S(+6), O(-2)',
    chemicalBehavior: 'Diprotic strong mineral acid and powerful dehydrating agent. Exothermically tears water molecules out of organic carbohydrates (dehydrating sugar into porous elemental carbon).',
    interestingFacts: [
      'Dubbed the "King of Chemicals" because global production volume directly reflects a nation’s industrial strength.',
      'Atmospheric clouds on the planet Venus are composed of concentrated droplets of sulfuric acid.',
      'Electrolyte in standard lead-acid vehicle starter batteries.'
    ],
    timeline: [
      { year: '900 CE', event: 'Al-Razi (Rhazes) synthesizes sulfuric acid by dry distillation of green vitriol.' },
      { year: '1831 CE', event: 'Peregrine Phillips patents the industrial Contact Process.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.6,
      meltingPointNum: 10.4,
      boilingPointNum: 337,
      solidBelow: 10,
      gasAbove: 337
    },
    pressureBehavior: {
      compressibility: 'low',
      volumeReductionFactor: 0.97,
      collisionFrequencyMultiplier: 1.4
    },
    isHazardousSimulation: true,
    hazardWarning: 'Highly corrosive dehydrating acid. Contact causes severe exothermic tissue burns.'
  },
  {
    id: 'nitric_acid',
    name: 'Nitric Acid',
    nameAr: 'حمض النيتريك',
    symbol: 'HNO₃',
    category: 'Everyday Materials',
    rarity: 'Rare',
    state: 'Liquid',
    colorHex: '#fed7aa',
    particleColor: '#fb923c',
    density: '1.51 g/cm³',
    meltingPoint: '-42 °C',
    boilingPoint: '83 °C',
    appearance: 'Colorless to yellow-brown fuming liquid with suffocating acrid vapor.',
    conductivity: 'High',
    reactivity: 'Very High',
    oxidationStates: 'H(+1), N(+5), O(-2)',
    chemicalBehavior: 'Strong monoprotic acid and potent oxidizing agent; oxidizes copper and silver while releasing reddish-brown nitrogen dioxide (NO₂) gas.',
    interestingFacts: [
      'Termed "aqua fortis" (strong water) by medieval alchemists.',
      'Mixed with hydrochloric acid in a 1:3 ratio to form Aqua Regia, capable of dissolving noble gold and platinum.',
      'Vital chemical precursor for agricultural ammonium nitrate fertilizers.'
    ],
    timeline: [
      { year: '1300 CE', event: 'Pseudo-Geber describes distillation of nitric acid from saltpeter.' },
      { year: '1902 CE', event: 'Wilhelm Ostwald patents catalytic oxidation of ammonia to industrial nitric acid.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.9,
      meltingPointNum: -42,
      boilingPointNum: 83,
      solidBelow: -42,
      gasAbove: 83
    },
    pressureBehavior: {
      compressibility: 'low',
      volumeReductionFactor: 0.96,
      collisionFrequencyMultiplier: 1.6
    }
  },
  {
    id: 'acetic_acid',
    name: 'Acetic Acid (Vinegar)',
    nameAr: 'حمض الأسيتيك (حمض الخليك)',
    symbol: 'CH₃COOH',
    category: 'Organic',
    rarity: 'Common',
    state: 'Liquid',
    colorHex: '#e2e8f0',
    particleColor: '#94a3b8',
    density: '1.05 g/cm³',
    meltingPoint: '16.6 °C',
    boilingPoint: '118.1 °C',
    appearance: 'Clear, colorless liquid with sharp, pungent vinegar odor; forms ice-like crystals at 16 °C.',
    conductivity: 'Low',
    reactivity: 'Moderate',
    oxidationStates: 'C(0), H(+1), O(-2)',
    chemicalBehavior: 'Weak carboxylic acid (pKa = 4.76). Undergoes effervescent acid-base neutralization with sodium bicarbonate to evolve CO₂ gas.',
    interestingFacts: [
      'Household cooking vinegar is a dilute 4% to 8% aqueous solution of acetic acid.',
      'Anhydrous pure acetic acid is called "glacial acetic acid" because it freezes just below room temperature at 16.6 °C.',
      'Essential building block for vinyl acetate monomer used in PVA glues and paints.'
    ],
    timeline: [
      { year: '1845 CE', event: 'Hermann Kolbe achieves total chemical synthesis of acetic acid from inorganic elements.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.5,
      meltingPointNum: 16.6,
      boilingPointNum: 118.1,
      solidBelow: 16.6,
      gasAbove: 118.1
    },
    pressureBehavior: {
      compressibility: 'low',
      volumeReductionFactor: 0.98,
      collisionFrequencyMultiplier: 1.3
    }
  },
  {
    id: 'sodium_hydroxide',
    name: 'Sodium Hydroxide (Caustic Soda)',
    nameAr: 'هيدروكسيد الصوديوم (الصودا الكاوية)',
    symbol: 'NaOH',
    category: 'Everyday Materials',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#f8fafc',
    particleColor: '#e2e8f0',
    density: '2.13 g/cm³',
    meltingPoint: '323 °C',
    boilingPoint: '1388 °C',
    appearance: 'White crystalline deliquescent pellets that rapidly absorb ambient moisture and atmospheric CO₂.',
    conductivity: 'Non-conductive',
    reactivity: 'Very High',
    oxidationStates: 'Na(+1), O(-2), H(+1)',
    chemicalBehavior: 'Strong caustic alkali base. Fully dissociates in water with massive exothermic heat release. Hydrolyzes triglycerides in fats into soaps (saponification).',
    interestingFacts: [
      'Standard active ingredient in commercial drain cleaners for dissolving accumulated grease blockages.',
      'Used in the Bayer process to extract pure alumina from bauxite ore for aluminum production.',
      'Bavarian pretzels receive their signature golden-brown glossy crust via brief dipping in a 3-4% NaOH bath before baking.'
    ],
    timeline: [
      { year: '1892 CE', event: 'Castner-Kellner chloralkali process commercializes industrial brine electrolysis.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.2,
      meltingPointNum: 323,
      boilingPointNum: 1388,
      solidBelow: 323,
      gasAbove: 1388
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    },
    isHazardousSimulation: true,
    hazardWarning: 'Strong caustic base - causes severe chemical eye and skin tissue liquefaction.'
  },
  {
    id: 'calcium_hydroxide',
    name: 'Calcium Hydroxide (Slaked Lime)',
    nameAr: 'هيدروكسيد الكالسيوم (الجير المطفأ)',
    symbol: 'Ca(OH)₂',
    category: 'Minerals',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#f1f5f9',
    particleColor: '#cbd5e1',
    density: '2.21 g/cm³',
    meltingPoint: '580 °C',
    boilingPoint: 'Decomposes',
    appearance: 'Fine, soft white odorless powder; dilute aqueous solution is termed limewater.',
    conductivity: 'Non-conductive',
    reactivity: 'Moderate',
    oxidationStates: 'Ca(+2), O(-2), H(+1)',
    chemicalBehavior: 'Basic sparingly soluble hydroxide. Turns distinctly milky-cloudy when bubbled with CO₂ due to precipitation of insoluble CaCO₃.',
    interestingFacts: [
      'Standard analytical laboratory reagent for testing the presence of carbon dioxide gas.',
      'Fundamental constituent of historical Roman lime mortar that cured by atmospheric carbonation.',
      'Used in municipal water treatment plants to adjust pH and soften hard water.'
    ],
    timeline: [
      { year: '7000 BCE', event: 'Neolithic builders burn limestone to create lime plaster flooring.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.0,
      meltingPointNum: 580,
      boilingPointNum: 2850,
      solidBelow: 580,
      gasAbove: 2850
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },

  // =========================================================================
  // SALTS, MINERALS & OXIDES
  // =========================================================================
  {
    id: 'calcium_carbonate',
    name: 'Calcium Carbonate (Calcite / Limestone)',
    nameAr: 'كربونات الكالسيوم (الحجر الجيري / الكالسيت)',
    symbol: 'CaCO₃',
    category: 'Minerals',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#e2e8f0',
    particleColor: '#cbd5e1',
    density: '2.71 g/cm³',
    meltingPoint: '1339 °C',
    boilingPoint: 'Decomposes at 840 °C',
    appearance: 'White crystalline mineral rock; forms limestone, marble, chalk, and seashells.',
    conductivity: 'Non-conductive',
    reactivity: 'Low',
    oxidationStates: 'Ca(+2), C(+4), O(-2)',
    chemicalBehavior: 'Insoluble in pure neutral water; decomposes with rapid effervescence in acids to liberate CO₂ gas.',
    interestingFacts: [
      'Constitutes over 4% of Earth’s crust in the form of sedimentary limestone and metamorphic marble.',
      'Creates subterranean karst cave stalactites and stalagmites through dissolution and redeposition over millennia.',
      'Primary structural biomineral in mollusk shells, coral reefs, and avian eggshells.'
    ],
    timeline: [
      { year: '2560 BCE', event: 'Great Pyramid of Giza constructed from over 2 million limestone blocks.' }
    ],
    thermalBehavior: {
      vibrationRate: 0.9,
      meltingPointNum: 840,
      boilingPointNum: 2000,
      solidBelow: 840,
      gasAbove: 2000
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'copper_sulfate',
    name: 'Copper(II) Sulfate Pentahydrate',
    nameAr: 'كبريتات النحاس (الزاج الأزرق)',
    symbol: 'CuSO₄·5H₂O',
    category: 'Minerals',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#2563eb',
    particleColor: '#3b82f6',
    density: '2.28 g/cm³',
    meltingPoint: '110 °C',
    boilingPoint: '650 °C',
    appearance: 'Vivid ultramarine blue triclinic crystals; dehydrates into off-white anhydrous powder upon heating.',
    conductivity: 'Non-conductive',
    reactivity: 'Moderate',
    oxidationStates: 'Cu(+2), S(+6), O(-2)',
    chemicalBehavior: 'Water-soluble copper salt; undergoes single replacement with iron or zinc, precipitating elemental metallic copper.',
    interestingFacts: [
      'Luminous blue hue originates from d-d orbital ligand transitions within the coordinated copper complex.',
      'Bordeaux mixture (copper sulfate + slaked lime) saved 19th-century French vineyards from fungal downy mildew.',
      'Classic electrolyte used in the historical Daniell galvanic cell battery.'
    ],
    timeline: [
      { year: '1556 CE', event: 'Georgius Agricola details blue vitriol production in De Re Metallica.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.1,
      meltingPointNum: 110,
      boilingPointNum: 650,
      solidBelow: 110,
      gasAbove: 650
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'potassium_permanganate',
    name: 'Potassium Permanganate',
    nameAr: 'برمنغنات البوتاسيوم',
    symbol: 'KMnO₄',
    category: 'Minerals',
    rarity: 'Rare',
    state: 'Solid',
    colorHex: '#7e22ce',
    particleColor: '#9333ea',
    density: '2.70 g/cm³',
    meltingPoint: '240 °C',
    boilingPoint: 'Decomposes',
    appearance: 'Dark purple-black orthorhombic lustrous needle crystals; produces intense magenta-violet solutions.',
    conductivity: 'Non-conductive',
    reactivity: 'Very High',
    oxidationStates: 'K(+1), Mn(+7), O(-2)',
    chemicalBehavior: 'Extremely potent chemical oxidizing agent. Thermally decomposes with oxygen release; violently oxidizes glycerol and hydrogen peroxide.',
    interestingFacts: [
      'Intensely colored: a single grain tints thousands of liters of clear water bright violet.',
      'Wilderness survival fire starter: mixing dry KMnO₄ crystals with a few drops of glycerol ignites spontaneously after a brief induction delay.',
      'Extensively utilized in municipal drinking water purification to oxidize dissolved iron and manganese.'
    ],
    timeline: [
      { year: '1659 CE', event: 'Johann Rudolf Glauber first describes the chameleon-like color changes of permanganate.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.3,
      meltingPointNum: 240,
      boilingPointNum: 600,
      solidBelow: 240,
      gasAbove: 600
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'iron_oxide',
    name: 'Iron(III) Oxide (Hematite)',
    nameAr: 'أكسيد الحديديك (الهيماتيت)',
    symbol: 'Fe₂O₃',
    category: 'Minerals',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#b91c1c',
    particleColor: '#dc2626',
    density: '5.24 g/cm³',
    meltingPoint: '1566 °C',
    boilingPoint: 'Decomposes',
    appearance: 'Reddish-brown earthy mineral powder or metallic-luster botryoidal hematite crystal.',
    conductivity: 'Low',
    reactivity: 'Low',
    oxidationStates: 'Fe(+3), O(-2)',
    chemicalBehavior: 'Pure anhydrous crystalline iron(III) oxide (the mineral Hematite). Note: While related to corrosion, actual rust is not pure anhydrous Fe₂O₃, but rather a variable hydrated mixture of iron(III) oxide-hydroxide (Fe₂O₃·nH₂O and FeO(OH)) formed in moist environments. Insoluble basic oxide; reduced to molten metallic iron by carbon monoxide inside industrial blast furnaces.',
    interestingFacts: [
      'Pure anhydrous crystalline Fe₂O₃ is hematite; rust is a variable hydrated oxide-hydroxide (Fe₂O₃·nH₂O / FeO(OH)).',
      'Imparts the iconic rusty orange-red appearance to the entire planet Mars.',
      'Chief commercial ore mined globally for modern industrial steel manufacturing.',
      'Used by Paleolithic humans over 40,000 years ago as red ochre pigment for cave art.'
    ],
    timeline: [
      { year: '1200 BCE', event: 'Dawn of the Iron Age in the ancient Near East via hematite ore smelting.' }
    ],
    thermalBehavior: {
      vibrationRate: 0.8,
      meltingPointNum: 1566,
      boilingPointNum: 3000,
      solidBelow: 1566,
      gasAbove: 3000
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'alumina',
    name: 'Aluminum Oxide (Corundum / Alumina)',
    nameAr: 'أكسيد الألمنيوم (الكوراندوم / الألومينا)',
    symbol: 'Al₂O₃',
    category: 'Minerals',
    rarity: 'Rare',
    state: 'Solid',
    colorHex: '#e0f2fe',
    particleColor: '#bae6fd',
    density: '3.98 g/cm³',
    meltingPoint: '2072 °C',
    boilingPoint: '2977 °C',
    appearance: 'Ultra-hard refractory white or colorless ceramic crystal (pure α-Al₂O₃ corundum).',
    conductivity: 'Non-conductive',
    reactivity: 'Low',
    oxidationStates: 'Al(+3), O(-2)',
    chemicalBehavior: 'Pure α-Al₂O₃ is the mineral corundum (colorless/white). Ruby is a gemstone variety of corundum specifically colored deep red by trace chromium (Cr³⁺) impurities, while sapphire is colored by iron and titanium impurities. Pure alumina itself is white. Amphoteric refractory ceramic oxide with high dielectric strength; forms a spontaneous nanometer protective passivation layer on raw aluminum metal.',
    interestingFacts: [
      'Scores 9 on the Mohs hardness scale, second only to diamond and moissanite among natural minerals.',
      'Ruby is corundum (Al₂O₃) with chromium impurities; sapphire is corundum with iron/titanium impurities.',
      'Single-crystal synthetic sapphire forms scratchproof smartphone camera lenses and luxury watch crystals.',
      'Refractory furnace brick lining material in extreme steelmaking and glass-melting kilns.'
    ],
    timeline: [
      { year: '1902 CE', event: 'Auguste Verneuil invents the flame-fusion process to grow synthetic rubies and sapphires.' }
    ],
    thermalBehavior: {
      vibrationRate: 0.7,
      meltingPointNum: 2072,
      boilingPointNum: 2977,
      solidBelow: 2072,
      gasAbove: 2977
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'calcium_oxide',
    name: 'Calcium Oxide (Quicklime)',
    nameAr: 'أكسيد الكالسيوم (الجير الحي)',
    symbol: 'CaO',
    category: 'Minerals',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#f8fafc',
    particleColor: '#f1f5f9',
    density: '3.34 g/cm³',
    meltingPoint: '2613 °C',
    boilingPoint: '2850 °C',
    appearance: 'White, alkaline, caustic crystalline solid formed by thermal calcination of limestone.',
    conductivity: 'Non-conductive',
    reactivity: 'Very High',
    oxidationStates: 'Ca(+2), O(-2)',
    chemicalBehavior: 'Undergoes violently exothermic hydration with water ("slaking") to form calcium hydroxide with intense steam generation.',
    interestingFacts: [
      'Heated in an oxyhydrogen flame to produce blinding white incandescence, originating the phrase "in the limelight".',
      'Essential basic flux in modern steelmaking to absorb sulfur and silica impurities into slag.',
      'Used inside self-heating military food rations (MREs) to rapidly boil food packets upon water contact.'
    ],
    timeline: [
      { year: '1820 CE', event: 'Thomas Drummond invents limelight illumination for theatrical stages.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.1,
      meltingPointNum: 2613,
      boilingPointNum: 2850,
      solidBelow: 2613,
      gasAbove: 2850
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'titanium_dioxide',
    name: 'Titanium Dioxide (Rutile)',
    nameAr: 'ثاني أكسيد التيتانيوم',
    symbol: 'TiO₂',
    category: 'Minerals',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#f8fafc',
    particleColor: '#ffffff',
    density: '4.23 g/cm³',
    meltingPoint: '1843 °C',
    boilingPoint: '2972 °C',
    appearance: 'Brilliant white crystalline powder with an extraordinarily high refractive index (2.61 to 2.90).',
    conductivity: 'Non-conductive',
    reactivity: 'Inert',
    oxidationStates: 'Ti(+4), O(-2)',
    chemicalBehavior: 'Photocatalytic wide-bandgap semiconductor (3.2 eV); generates hydroxyl radicals under UV light to decompose organic pollutants.',
    interestingFacts: [
      'Highest refractive index of any white pigment known; imparts brightness and opacity to paints, sunscreen, plastics, and paper.',
      'Active mineral UV filter in sunscreens, physically scattering harmful UVA and UVB radiation.',
      'Self-cleaning architectural glass uses nanoscale TiO₂ coatings to degrade organic dirt upon exposure to sunlight.'
    ],
    timeline: [
      { year: '1916 CE', event: 'Titan Company in Norway commercializes titanium dioxide white pigment synthesis.' }
    ],
    thermalBehavior: {
      vibrationRate: 0.8,
      meltingPointNum: 1843,
      boilingPointNum: 2972,
      solidBelow: 1843,
      gasAbove: 2972
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },

  // =========================================================================
  // SEMICONDUCTORS & ADVANCED INORGANIC MATERIALS
  // =========================================================================
  {
    id: 'silicon_carbide',
    name: 'Silicon Carbide (Carborundum)',
    nameAr: 'كربيد السيليكون (كاربورندوم)',
    symbol: 'SiC',
    category: 'Minerals',
    rarity: 'Exotic',
    state: 'Solid',
    colorHex: '#334155',
    particleColor: '#475569',
    density: '3.21 g/cm³',
    meltingPoint: '2730 °C (sublimes)',
    boilingPoint: 'Sublimes',
    appearance: 'Iridescent, black-green ultra-hard synthetic semiconductor crystals with diamond-like luster.',
    conductivity: 'Medium',
    reactivity: 'Inert',
    oxidationStates: 'Si(+4), C(-4)',
    chemicalBehavior: 'Extremely rigid covalent network lattice; completely inert to acids and molten bases at standard temperatures.',
    interestingFacts: [
      'Mohs hardness of 9.5; used in ceramic bulletproof vest armor plates and industrial grinding abrasives.',
      'Next-generation wide-bandgap (3.2 eV) power semiconductor powering high-voltage electric vehicle inverters.',
      'Naturally occurring moissanite was first identified in the Canyon Diablo meteorite in 1893.'
    ],
    timeline: [
      { year: '1891 CE', event: 'Edward Goodrich Acheson invents the industrial Acheson electric furnace synthesis.' }
    ],
    thermalBehavior: {
      vibrationRate: 0.6,
      meltingPointNum: 2730,
      boilingPointNum: 3500,
      solidBelow: 2730,
      gasAbove: 3500
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'gallium_arsenide',
    name: 'Gallium Arsenide',
    nameAr: 'زرنيخيد الغاليوم',
    symbol: 'GaAs',
    category: 'Minerals',
    rarity: 'Exotic',
    state: 'Solid',
    colorHex: '#64748b',
    particleColor: '#94a3b8',
    density: '5.32 g/cm³',
    meltingPoint: '1238 °C',
    boilingPoint: 'N/A',
    appearance: 'Dark gray zincblende crystal with metallic sheen; direct bandgap III-V semiconductor.',
    conductivity: 'Medium',
    reactivity: 'Low',
    oxidationStates: 'Ga(+3), As(-3)',
    chemicalBehavior: 'Direct bandgap semiconductor (1.42 eV) allowing highly efficient photon emission and absorption for lasers and optoelectronics.',
    interestingFacts: [
      'Powers the ultra-high-efficiency triple-junction solar panels on the International Space Station and Mars rovers.',
      'Electrons travel nearly six times faster in GaAs than in silicon, making it indispensable for 5G millimeter-wave RF power chips.',
      'Demonstrated the first practical semiconductor infrared laser diodes in the 1960s.'
    ],
    timeline: [
      { year: '1929 CE', event: 'V. M. Goldschmidt first synthesizes and characterizes Gallium Arsenide.' }
    ],
    thermalBehavior: {
      vibrationRate: 0.9,
      meltingPointNum: 1238,
      boilingPointNum: 2000,
      solidBelow: 1238,
      gasAbove: 2000
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'germanium',
    name: 'Germanium',
    nameAr: 'الجرمانيوم',
    symbol: 'Ge',
    atomicNumber: 32,
    category: 'Elements',
    rarity: 'Rare',
    state: 'Solid',
    colorHex: '#94a3b8',
    particleColor: '#cbd5e1',
    density: '5.32 g/cm³',
    meltingPoint: '938.3 °C',
    boilingPoint: '2833 °C',
    appearance: 'Lustrous, hard, grayish-white metalloid with diamond cubic crystal structure.',
    conductivity: 'Medium',
    reactivity: 'Low',
    oxidationStates: '+4, +2',
    chemicalBehavior: 'Intrinsic semiconductor; highly transparent to infrared radiation wavelengths from 2 to 14 micrometers.',
    interestingFacts: [
      'Predicted by Dmitri Mendeleev in 1871 as "ekasilicon" before its empirical discovery in 1886.',
      'The very first working solid-state transistor created at Bell Labs in 1947 was made of germanium, not silicon.',
      'Widely used in military thermal-imaging night vision lenses and fiber-optic communication cores.'
    ],
    timeline: [
      { year: '1886 CE', event: 'Clemens Winkler isolates germanium from the rare mineral argyrodite in Freiberg.' },
      { year: '1947 CE', event: 'Bardeen, Brattain, and Shockley invent the point-contact transistor using germanium.' }
    ],
    thermalBehavior: {
      vibrationRate: 0.9,
      meltingPointNum: 938.3,
      boilingPointNum: 2833,
      solidBelow: 938.3,
      gasAbove: 2833
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'boron',
    name: 'Boron',
    nameAr: 'البورون',
    symbol: 'B',
    atomicNumber: 5,
    category: 'Elements',
    rarity: 'Rare',
    state: 'Solid',
    colorHex: '#475569',
    particleColor: '#64748b',
    density: '2.34 g/cm³',
    meltingPoint: '2076 °C',
    boilingPoint: '3927 °C',
    appearance: 'Extremely hard, dark brown-black metalloid with complex icosahedral B₁₂ crystal clusters.',
    conductivity: 'Low',
    reactivity: 'Moderate',
    oxidationStates: '+3',
    chemicalBehavior: 'Electron-deficient metalloid forming unusual multicenter 3-center 2-electron covalent bonds in boranes and icosahedral clusters.',
    interestingFacts: [
      'Boron-10 isotope has an enormous thermal neutron capture cross section; used in nuclear reactor safety control rods.',
      'Burns with a brilliant bright green flame, widely used in fireworks and emergency marine flares.',
      'Crucial p-type dopant in the semiconductor fabrication industry.'
    ],
    timeline: [
      { year: '1808 CE', event: 'Joseph Louis Gay-Lussac and Louis Jacques Thénard isolate elemental boron.' }
    ],
    thermalBehavior: {
      vibrationRate: 0.7,
      meltingPointNum: 2076,
      boilingPointNum: 3927,
      solidBelow: 2076,
      gasAbove: 3927
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'phosphorus',
    name: 'Red Phosphorus',
    nameAr: 'الفوسفور الأحمر',
    symbol: 'P (polymeric)',
    atomicNumber: 15,
    category: 'Elements',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#991b1b',
    particleColor: '#b91c1c',
    density: '2.34 g/cm³',
    meltingPoint: '590 °C (sublimes)',
    boilingPoint: 'Sublimes',
    appearance: 'Dark red, odorless, non-toxic polymeric solid network; far more stable than pyrophoric white phosphorus.',
    conductivity: 'Non-conductive',
    reactivity: 'Moderate',
    oxidationStates: '-3, +3, +5',
    chemicalBehavior: 'Extended polymeric chain and tube network of interconnected phosphorus atoms (derived from opened P₄ tetrahedra). Unlike volatile, pyrophoric white phosphorus (discrete P₄ molecules), red phosphorus is polymeric, air-stable, and non-pyrophoric under ambient conditions; ignites on friction contact with strong oxidizers like potassium chlorate.',
    interestingFacts: [
      'Unlike white phosphorus (discrete P₄ molecules), red phosphorus consists of polymeric networks of phosphorus atoms.',
      'Essential active chemical ingredient on the striking strip of household safety matchboxes.',
      'Critical structural constituent of DNA/RNA phosphate backbones and cellular ATP energy currency.',
      'Stable and non-pyrophoric in ambient air, unlike its dangerous white phosphorus allotrope.'
    ],
    timeline: [
      { year: '1669 CE', event: 'Hennig Brand discovers phosphorus in Hamburg while seeking the philosopher’s stone.' },
      { year: '1845 CE', event: 'Anton von Schrötter discovers and synthesizes stable red phosphorus allotrope.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.1,
      meltingPointNum: 590,
      boilingPointNum: 590,
      solidBelow: 590,
      gasAbove: 590
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },

  // =========================================================================
  // METALS
  // =========================================================================
  {
    id: 'platinum',
    name: 'Platinum',
    nameAr: 'البلاتين',
    symbol: 'Pt',
    atomicNumber: 78,
    category: 'Metals',
    rarity: 'Rare',
    state: 'Solid',
    colorHex: '#e2e8f0',
    particleColor: '#f1f5f9',
    density: '21.45 g/cm³',
    meltingPoint: '1768.3 °C',
    boilingPoint: '3825 °C',
    appearance: 'Heavy, lustrous, malleable, silver-white noble metal with exceptional chemical resistance.',
    conductivity: 'High',
    reactivity: 'Inert',
    oxidationStates: '+2, +4',
    chemicalBehavior: 'Extraordinary heterogeneous catalyst; catalyzes conversion of toxic CO and hydrocarbons into CO₂ and H₂O in vehicle catalytic converters.',
    interestingFacts: [
      'One of the densest and rarest elements in Earth’s crust (concentration only ~5 parts per billion).',
      'Core constituent of cisplatin cancer chemotherapy drugs that crosslink cancer cell DNA.',
      'The historical international standard kilogram cylinder was cast from a 90% platinum / 10% iridium alloy.'
    ],
    timeline: [
      { year: '1735 CE', event: 'Antonio de Ulloa records platinum deposits in South American mines.' }
    ],
    thermalBehavior: {
      vibrationRate: 0.7,
      meltingPointNum: 1768.3,
      boilingPointNum: 3825,
      solidBelow: 1768,
      gasAbove: 3825
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.995,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'nickel',
    name: 'Nickel',
    nameAr: 'النيكل',
    symbol: 'Ni',
    atomicNumber: 28,
    category: 'Metals',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#cbd5e1',
    particleColor: '#e2e8f0',
    density: '8.908 g/cm³',
    meltingPoint: '1455 °C',
    boilingPoint: '2730 °C',
    appearance: 'Silvery-white hard lustrous metal with slight golden hue; ferromagnetic at room temperature.',
    conductivity: 'High',
    reactivity: 'Moderate',
    oxidationStates: '+2, +3',
    chemicalBehavior: 'Resists corrosion due to slow passivating oxide formation; forms active Raney nickel catalyst for hydrogenation.',
    interestingFacts: [
      'Key active constituent of high-energy NMC cathode chemistries powering long-range electric vehicles.',
      'Earth’s metallic inner core is composed primarily of iron alloyed with ~20% nickel.',
      'Essential alloying component in stainless steel (typically 8-10% Ni in 304 austenitic steel).'
    ],
    timeline: [
      { year: '1751 CE', event: 'Axel Fredrik Cronstedt isolates metallic nickel from kupfernickel ore in Sweden.' }
    ],
    thermalBehavior: {
      vibrationRate: 0.8,
      meltingPointNum: 1455,
      boilingPointNum: 2730,
      solidBelow: 1455,
      gasAbove: 2730
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'lead',
    name: 'Lead',
    nameAr: 'الرصاص',
    symbol: 'Pb',
    atomicNumber: 82,
    category: 'Metals',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#475569',
    particleColor: '#64748b',
    density: '11.34 g/cm³',
    meltingPoint: '327.5 °C',
    boilingPoint: '1749 °C',
    appearance: 'Heavy, soft, highly malleable, bluish-gray post-transition metal with low tensile strength.',
    conductivity: 'Medium',
    reactivity: 'Low',
    oxidationStates: '+2, +4',
    chemicalBehavior: 'Forms protective insoluble sulfate and carbonate coatings; dense electron cloud absorbs high-energy X-rays and gamma radiation.',
    interestingFacts: [
      'Highest atomic number of any non-radioactive stable element on the periodic table (lead-208).',
      'Used as protective aprons in dental and medical X-ray imaging clinics to shield patients from ionizing radiation.',
      'Ancient Romans lined aqueducts and domestic water distribution networks with lead pipes (fistulae).'
    ],
    timeline: [
      { year: '6000 BCE', event: 'Oldest known lead statuette crafted in ancient Egypt.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.2,
      meltingPointNum: 327.5,
      boilingPointNum: 1749,
      solidBelow: 327.5,
      gasAbove: 1749
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'tin',
    name: 'Tin',
    nameAr: 'القصدير',
    symbol: 'Sn',
    atomicNumber: 50,
    category: 'Metals',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#cbd5e1',
    particleColor: '#e2e8f0',
    density: '7.31 g/cm³',
    meltingPoint: '231.9 °C',
    boilingPoint: '2602 °C',
    appearance: 'Silvery-white, highly malleable post-transition metal; emits a distinct "tin cry" sound when bent.',
    conductivity: 'High',
    reactivity: 'Low',
    oxidationStates: '+2, +4',
    chemicalBehavior: 'Resists corrosion by water and mild acids; alloyed with copper (~12% Sn) to forge bronze.',
    interestingFacts: [
      'Exhibits "tin pest": below 13.2 °C, silvery metallic beta-tin slowly transforms into brittle powdery gray alpha-tin.',
      'Used in food preservation by electroplating an ultra-thin protective coating onto steel food cans.',
      'Primary constituent of modern lead-free electronics solder alloys (SAC).'
    ],
    timeline: [
      { year: '3300 BCE', event: 'Discovery of tin alloying with copper launches the global Bronze Age.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.3,
      meltingPointNum: 231.9,
      boilingPointNum: 2602,
      solidBelow: 231.9,
      gasAbove: 2602
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'tungsten',
    name: 'Tungsten',
    nameAr: 'التنغستن',
    symbol: 'W',
    atomicNumber: 74,
    category: 'Metals',
    rarity: 'Rare',
    state: 'Solid',
    colorHex: '#64748b',
    particleColor: '#94a3b8',
    density: '19.25 g/cm³',
    meltingPoint: '3422 °C',
    boilingPoint: '5930 °C',
    appearance: 'Hard, dense, steel-gray transition metal with extraordinary thermal resilience.',
    conductivity: 'High',
    reactivity: 'Low',
    oxidationStates: '+4, +6',
    chemicalBehavior: 'Highest melting point of all pure metals (3422 °C) and highest tensile strength at temperatures above 1650 °C.',
    interestingFacts: [
      'Used for over a century as the incandescent glowing wire filament inside traditional lightbulbs.',
      'Density (19.25 g/cm³) is virtually identical to pure gold (19.30 g/cm³).',
      'Tungsten carbide (WC) machining cutting tools maintain their razor edge at cherry-red temperatures.'
    ],
    timeline: [
      { year: '1783 CE', event: 'Fausto and Juan José de Elhuyar isolate metallic tungsten by charcoal reduction.' }
    ],
    thermalBehavior: {
      vibrationRate: 0.5,
      meltingPointNum: 3422,
      boilingPointNum: 5930,
      solidBelow: 3422,
      gasAbove: 5930
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.998,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'chromium',
    name: 'Chromium',
    nameAr: 'الكروم',
    symbol: 'Cr',
    atomicNumber: 24,
    category: 'Metals',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#94a3b8',
    particleColor: '#cbd5e1',
    density: '7.19 g/cm³',
    meltingPoint: '1907 °C',
    boilingPoint: '2671 °C',
    appearance: 'Steely-gray, lustrous, exceptionally hard transition metal that takes a brilliant mirror polish.',
    conductivity: 'High',
    reactivity: 'Moderate',
    oxidationStates: '+2, +3, +6',
    chemicalBehavior: 'Spontaneously forms a nanometer-thin transparent passivating chromium(III) oxide (Cr₂O₃) layer in air, stopping corrosion completely.',
    interestingFacts: [
      'Adding 10.5% or more chromium to iron converts ordinary rusting steel into stainless steel.',
      'Chrome plating gives automotive motorcycle trims and faucets their mirror reflection.',
      'Trace chromium(III) ions impart the intense deep green hue to natural emerald gemstones.'
    ],
    timeline: [
      { year: '1797 CE', event: 'Louis Nicolas Vauquelin discovers chromium in Siberian red lead ore.' }
    ],
    thermalBehavior: {
      vibrationRate: 0.8,
      meltingPointNum: 1907,
      boilingPointNum: 2671,
      solidBelow: 1907,
      gasAbove: 2671
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'cobalt',
    name: 'Cobalt',
    nameAr: 'الكوبالت',
    symbol: 'Co',
    atomicNumber: 27,
    category: 'Metals',
    rarity: 'Rare',
    state: 'Solid',
    colorHex: '#475569',
    particleColor: '#64748b',
    density: '8.90 g/cm³',
    meltingPoint: '1495 °C',
    boilingPoint: '2927 °C',
    appearance: 'Hard, lustrous, silver-gray transition metal; ferromagnetic with high Curie point (1115 °C).',
    conductivity: 'High',
    reactivity: 'Moderate',
    oxidationStates: '+2, +3',
    chemicalBehavior: 'Retains magnetic and mechanical strength at elevated temperatures; forms vibrant cobalt aluminate blue pigments.',
    interestingFacts: [
      'Crucial cathode material in lithium cobalt oxide (LiCoO₂) batteries for smartphones and laptops.',
      'Essential trace mineral at the core of Vitamin B12 (cobalamin), required for human nerve function.',
      'Cobalt-based superalloys form turbine blades spinning inside commercial jet engines above 1000 °C.'
    ],
    timeline: [
      { year: '1735 CE', event: 'Georg Brandt discovers that the blue color in smalt glass is caused by a new element, cobalt.' }
    ],
    thermalBehavior: {
      vibrationRate: 0.8,
      meltingPointNum: 1495,
      boilingPointNum: 2927,
      solidBelow: 1495,
      gasAbove: 2927
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'lithium',
    name: 'Lithium',
    nameAr: 'الليثيوم',
    symbol: 'Li',
    atomicNumber: 3,
    category: 'Metals',
    rarity: 'Rare',
    state: 'Solid',
    colorHex: '#cbd5e1',
    particleColor: '#f1f5f9',
    density: '0.534 g/cm³',
    meltingPoint: '180.5 °C',
    boilingPoint: '1342 °C',
    appearance: 'Soft, silvery-white alkali metal; least dense of all solid elements, floating on water and hydrocarbon oil.',
    conductivity: 'High',
    reactivity: 'Very High',
    oxidationStates: '+1',
    chemicalBehavior: 'Lightest solid element with the lowest standard reduction potential (-3.04 V), giving it the highest electrochemical energy density.',
    interestingFacts: [
      'One of only three elements (along with hydrogen and helium) synthesized in the primordial Big Bang.',
      'Drives the global clean energy revolution as the lightweight charge carrier in lithium-ion batteries.',
      'Reacts vigorously with water to produce lithium hydroxide and flammable hydrogen gas.'
    ],
    timeline: [
      { year: '1817 CE', event: 'Johan August Arfwedson discovers lithium while analyzing petalite ore in Sweden.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.6,
      meltingPointNum: 180.5,
      boilingPointNum: 1342,
      solidBelow: 180.5,
      gasAbove: 1342
    },
    pressureBehavior: {
      compressibility: 'medium',
      volumeReductionFactor: 0.94,
      collisionFrequencyMultiplier: 1.2
    }
  },
  {
    id: 'uranium',
    name: 'Uranium',
    nameAr: 'اليورانيوم',
    symbol: 'U',
    atomicNumber: 92,
    category: 'Metals',
    rarity: 'Legendary',
    state: 'Solid',
    colorHex: '#475569',
    particleColor: '#84cc16',
    density: '19.1 g/cm³',
    meltingPoint: '1132.2 °C',
    boilingPoint: '4131 °C',
    appearance: 'Very dense, heavy, silvery-white actinide metal; weakly radioactive with primordial half-life.',
    conductivity: 'Medium',
    reactivity: 'Moderate to High (Pyrophoric when finely divided; tarnishes in air, reacts with boiling water and acids)',
    oxidationStates: '+3, +4, +5, +6',
    chemicalBehavior: 'Chemically an electropositive actinide metal: oxidizes in air to form a dark oxide film (UO₂/U₃O₈), pyrophoric when finely divided, reacts slowly with cold water and rapidly with boiling water/acids to evolve hydrogen gas, with common oxidation states +3 to +6 (uranyl UO₂²⁺ is the most stable in aqueous solution). Separately, its fissile isotope U-235 undergoes nuclear fission upon thermal neutron capture.',
    interestingFacts: [
      'Chemical reactivity (air oxidation, acid dissolution, pyrophoricity as powder) is distinct from its nuclear property of fission.',
      'A single 7-gram uranium fuel pellet produces as much electrical power as burning 1 ton of coal.',
      'Natural radioactive decay of uranium in Earth’s mantle generates the internal geothermal heat driving continental drift.',
      'Historically used in "Vaseline glass" to produce striking green tableware that fluoresces bright green under UV light.'
    ],
    timeline: [
      { year: '1789 CE', event: 'Martin Heinrich Klaproth discovers uranium in pitchblende, naming it after planet Uranus.' },
      { year: '1938 CE', event: 'Otto Hahn, Fritz Strassmann, and Lise Meitner discover nuclear fission in uranium.' }
    ],
    thermalBehavior: {
      vibrationRate: 0.8,
      meltingPointNum: 1132.2,
      boilingPointNum: 4131,
      solidBelow: 1132,
      gasAbove: 4131
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.995,
      collisionFrequencyMultiplier: 1.0
    }
  },

  // =========================================================================
  // NOBLE GASES & HALOGENS
  // =========================================================================
  {
    id: 'argon',
    name: 'Argon',
    nameAr: 'الأرجون',
    symbol: 'Ar',
    atomicNumber: 18,
    category: 'Gases',
    rarity: 'Common',
    state: 'Gas',
    colorHex: '#818cf8',
    particleColor: '#a5b4fc',
    density: '1.784 g/L',
    meltingPoint: '-189.3 °C',
    boilingPoint: '-185.8 °C',
    appearance: 'Colorless, odorless, completely non-flammable noble gas; glows lilac-purple in high-voltage electric discharge.',
    conductivity: 'Non-conductive',
    reactivity: 'Inert',
    oxidationStates: '0',
    chemicalBehavior: 'Completely filled outer valence octet ([Ne] 3s² 3p⁶); forms no stable chemical compounds at room temperature.',
    interestingFacts: [
      'Third-most abundant gas in Earth’s atmosphere (0.934% by volume, over 23 times more abundant than CO₂).',
      'Used as an inert shielding gas in TIG and MIG electric arc welding to prevent molten metals from oxidizing.',
      'Fills double-pane insulated thermal windows to dramatically reduce heat loss.'
    ],
    timeline: [
      { year: '1894 CE', event: 'Lord Rayleigh and William Ramsay discover argon by removing all nitrogen and oxygen from air.' }
    ],
    thermalBehavior: {
      vibrationRate: 2.2,
      meltingPointNum: -189.3,
      boilingPointNum: -185.8,
      solidBelow: -189.3,
      gasAbove: -185.8
    },
    pressureBehavior: {
      compressibility: 'high',
      volumeReductionFactor: 0.2,
      collisionFrequencyMultiplier: 5.0
    }
  },
  {
    id: 'neon',
    name: 'Neon',
    nameAr: 'النيون',
    symbol: 'Ne',
    atomicNumber: 10,
    category: 'Gases',
    rarity: 'Rare',
    state: 'Gas',
    colorHex: '#fb7185',
    particleColor: '#f43f5e',
    density: '0.9002 g/L',
    meltingPoint: '-248.6 °C',
    boilingPoint: '-246.1 °C',
    appearance: 'Colorless noble gas; emits an unmistakable vivid reddish-orange glow in high-voltage discharge tubes.',
    conductivity: 'Non-conductive',
    reactivity: 'Inert',
    oxidationStates: '0',
    chemicalBehavior: 'Chemically the most inert of all elements; no stable neutral chemical compound of neon has ever been detected.',
    interestingFacts: [
      'Fifth most abundant element in the universe by mass, yet rare on Earth because it escaped during planetary formation.',
      'Gives iconic retro advertising neon signs their signature intense orange-red luminescence.',
      'Liquid neon has over 40 times more cryogenic refrigeration capacity per unit volume than liquid helium.'
    ],
    timeline: [
      { year: '1898 CE', event: 'William Ramsay and Morris Travers discover neon through fractional distillation of liquid air.' }
    ],
    thermalBehavior: {
      vibrationRate: 2.3,
      meltingPointNum: -248.6,
      boilingPointNum: -246.1,
      solidBelow: -248.6,
      gasAbove: -246.1
    },
    pressureBehavior: {
      compressibility: 'high',
      volumeReductionFactor: 0.2,
      collisionFrequencyMultiplier: 5.0
    }
  },
  {
    id: 'xenon',
    name: 'Xenon',
    nameAr: 'الزينون',
    symbol: 'Xe',
    atomicNumber: 54,
    category: 'Gases',
    rarity: 'Exotic',
    state: 'Gas',
    colorHex: '#38bdf8',
    particleColor: '#0284c7',
    density: '5.894 g/L',
    meltingPoint: '-111.7 °C',
    boilingPoint: '-108.1 °C',
    appearance: 'Heavy, dense noble gas; glows ethereal sky-blue in electrical discharge.',
    conductivity: 'Non-conductive',
    reactivity: 'Very Low',
    oxidationStates: '0, +2, +4, +6, +8',
    chemicalBehavior: 'Large, polarizable valence electron cloud allows xenon to form genuine, stable chemical compounds with highly electronegative elements under specific conditions (e.g. XeF₂, XeF₄, XeF₆, and explosive XeO₃). Neil Bartlett’s 1962 synthesis of XePtF₆ overthrew the historical dogma that all noble gases are completely inert.',
    interestingFacts: [
      'Xenon is not completely inert: it has Very Low reactivity and forms stable fluorides (XeF₂, XeF₄, XeF₆) and oxides.',
      'Propellant of choice for deep-space Hall-effect ion thrusters on NASA interplanetary probes.',
      'Used in ultra-bright IMAX movie projector strobe lamps and automotive HID headlights.',
      'Acts as an extraordinary neuroprotective non-toxic general anesthetic.'
    ],
    timeline: [
      { year: '1898 CE', event: 'William Ramsay and Morris Travers discover xenon in liquid air residue.' },
      { year: '1962 CE', event: 'Neil Bartlett synthesizes XePtF₆, proving noble gases can form chemical bonds.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.9,
      meltingPointNum: -111.7,
      boilingPointNum: -108.1,
      solidBelow: -111.7,
      gasAbove: -108.1
    },
    pressureBehavior: {
      compressibility: 'high',
      volumeReductionFactor: 0.2,
      collisionFrequencyMultiplier: 4.8
    }
  },
  {
    id: 'bromine',
    name: 'Bromine',
    nameAr: 'البروم',
    symbol: 'Br₂',
    atomicNumber: 35,
    category: 'Liquids',
    rarity: 'Rare',
    state: 'Liquid',
    colorHex: '#7f1d1d',
    particleColor: '#991b1b',
    density: '3.1028 g/cm³',
    meltingPoint: '-7.2 °C',
    boilingPoint: '58.8 °C',
    appearance: 'Dense, dark reddish-brown fuming liquid that evaporates into a suffocating orange-red vapor.',
    conductivity: 'Non-conductive',
    reactivity: 'Very High',
    oxidationStates: '-1, +1, +3, +5',
    chemicalBehavior: 'Strong oxidizing halogen; reacts vigorously with alkali metals and adds across carbon-carbon double bonds (bromine water test).',
    interestingFacts: [
      'Only nonmetallic chemical element that exists as a liquid at standard room temperature and pressure.',
      'Ancient Tyrian purple dye prized by Roman emperors was 6,6’-dibromoindigo extracted from Mediterranean sea snails.',
      'Used in flame retardants and water purification in hot tubs.'
    ],
    timeline: [
      { year: '1826 CE', event: 'Antoine Jérôme Balard isolates elemental bromine from Montpellier salt marsh brine.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.8,
      meltingPointNum: -7.2,
      boilingPointNum: 58.8,
      solidBelow: -7.2,
      gasAbove: 58.8
    },
    pressureBehavior: {
      compressibility: 'low',
      volumeReductionFactor: 0.95,
      collisionFrequencyMultiplier: 1.8
    }
  },
  {
    id: 'iodine',
    name: 'Iodine',
    nameAr: 'اليود',
    symbol: 'I₂',
    atomicNumber: 53,
    category: 'Elements',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#581c87',
    particleColor: '#6b21a8',
    density: '4.933 g/cm³',
    meltingPoint: '113.7 °C',
    boilingPoint: '184.3 °C',
    appearance: 'Dark violet-black lustrous crystals that sublime into radiant violet gas upon gentle warming.',
    conductivity: 'Low',
    reactivity: 'Moderate',
    oxidationStates: '-1, +1, +5, +7',
    chemicalBehavior: 'Mild oxidizing halogen; forms deep blue-black inclusion complexes with starch amylose chains.',
    interestingFacts: [
      'Sublimes directly from solid crystals into radiant violet vapor when gently heated.',
      'Essential trace nutrient for human thyroid hormone synthesis (thyroxine T4 and triiodothyronine T3).',
      'Used as a topical medical antiseptic (povidone-iodine / Betadine) for surgical disinfection.'
    ],
    timeline: [
      { year: '1811 CE', event: 'Bernard Courtois discovers iodine while extracting sodium salts from seaweed ash for gunpowder.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.2,
      meltingPointNum: 113.7,
      boilingPointNum: 184.3,
      solidBelow: 113.7,
      gasAbove: 184.3
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.1
    }
  },
  {
    id: 'fluorine',
    name: 'Fluorine',
    nameAr: 'الفلور',
    symbol: 'F₂',
    atomicNumber: 9,
    category: 'Gases',
    rarity: 'Exotic',
    state: 'Gas',
    colorHex: '#fef08a',
    particleColor: '#facc15',
    density: '1.696 g/L',
    meltingPoint: '-219.67 °C',
    boilingPoint: '-188.11 °C',
    appearance: 'Extremely pale greenish-yellow pungent halogen gas; most electronegative element in existence.',
    conductivity: 'Non-conductive',
    reactivity: 'Very High',
    oxidationStates: '-1',
    chemicalBehavior: 'Most chemically reactive element on the periodic table (electronegativity 3.98); attacks glass, metals, water, and noble gases.',
    interestingFacts: [
      'Forms the strongest single bond in organic chemistry (C-F bond, ~485 kJ/mol), imparting extreme chemical resistance to Teflon.',
      'Added to municipal drinking water and toothpaste as fluoride (F⁻) to convert tooth hydroxyapatite into acid-resistant fluorapatite.',
      'Several 19th-century chemists ("fluorine martyrs") lost their lives trying to isolate this violent halogen.'
    ],
    timeline: [
      { year: '1886 CE', event: 'Henri Moissan isolates fluorine gas via low-temperature electrolysis of anhydrous HF (1906 Nobel Prize).' }
    ],
    thermalBehavior: {
      vibrationRate: 2.4,
      meltingPointNum: -219.7,
      boilingPointNum: -188.1,
      solidBelow: -219.7,
      gasAbove: -188.1
    },
    pressureBehavior: {
      compressibility: 'high',
      volumeReductionFactor: 0.2,
      collisionFrequencyMultiplier: 5.5
    }
  },

  // =========================================================================
  // GASES & SPECIAL INORGANICS
  // =========================================================================
  {
    id: 'hydrogen_peroxide',
    name: 'Hydrogen Peroxide',
    nameAr: 'بيروكسيد الهيدروجين (ماء الأكسجين)',
    symbol: 'H₂O₂',
    category: 'Liquids',
    rarity: 'Common',
    state: 'Liquid',
    colorHex: '#bae6fd',
    particleColor: '#e0f2fe',
    density: '1.45 g/cm³',
    meltingPoint: '-0.43 °C',
    boilingPoint: '150.2 °C',
    appearance: 'Colorless liquid with an unstable single peroxide O-O bond; slightly more viscous than water.',
    conductivity: 'Low',
    reactivity: 'High',
    oxidationStates: 'H(+1), O(-1)',
    chemicalBehavior: 'Strong oxidizer and disinfectant; catalytically decomposes into water and oxygen gas in the presence of catalase or manganese dioxide.',
    interestingFacts: [
      'Decomposition catalyzed by potassium iodide creates the famous "Elephant’s Toothpaste" foam demonstration.',
      'Concentrated (90%+) hydrogen peroxide is used as high-test rocket propellant monopropellant.',
      'Household 3% solution is used for sanitizing wounds and gentle hair lightening.'
    ],
    timeline: [
      { year: '1818 CE', event: 'Louis Jacques Thénard discovers hydrogen peroxide by reacting barium peroxide with nitric acid.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.7,
      meltingPointNum: -0.4,
      boilingPointNum: 150.2,
      solidBelow: -0.4,
      gasAbove: 150.2
    },
    pressureBehavior: {
      compressibility: 'low',
      volumeReductionFactor: 0.97,
      collisionFrequencyMultiplier: 1.5
    }
  },
  {
    id: 'carbon_monoxide',
    name: 'Carbon Monoxide',
    nameAr: 'أول أكسيد الكربون',
    symbol: 'CO',
    category: 'Gases',
    rarity: 'Common',
    state: 'Gas',
    colorHex: '#94a3b8',
    particleColor: '#cbd5e1',
    density: '1.250 g/L',
    meltingPoint: '-205 °C',
    boilingPoint: '-191.5 °C',
    appearance: 'Colorless, odorless, tasteless, toxic flammable gas formed by incomplete combustion of carbon.',
    conductivity: 'Non-conductive',
    reactivity: 'Moderate',
    oxidationStates: 'C(+2), O(-2)',
    chemicalBehavior: 'Strong reducing gas; reduces iron oxides in blast furnaces to molten metallic iron while oxidizing to CO₂.',
    interestingFacts: [
      'Binds to hemoglobin in human blood ~210 times more tightly than oxygen, preventing cellular respiration ("silent killer").',
      'Second most abundant molecule in the interstellar medium after molecular hydrogen (H₂).',
      'Industrial feedstock for Fischer-Tropsch synthesis of synthetic hydrocarbon fuels.'
    ],
    timeline: [
      { year: '1776 CE', event: 'Joseph Priestley discovers carbon monoxide gas.' }
    ],
    thermalBehavior: {
      vibrationRate: 2.1,
      meltingPointNum: -205,
      boilingPointNum: -191.5,
      solidBelow: -205,
      gasAbove: -191.5
    },
    pressureBehavior: {
      compressibility: 'high',
      volumeReductionFactor: 0.2,
      collisionFrequencyMultiplier: 4.9
    }
  },
  {
    id: 'sulfur_dioxide',
    name: 'Sulfur Dioxide',
    nameAr: 'ثاني أكسيد الكبريت',
    symbol: 'SO₂',
    category: 'Gases',
    rarity: 'Common',
    state: 'Gas',
    colorHex: '#facc15',
    particleColor: '#fde047',
    density: '2.628 g/L',
    meltingPoint: '-72 °C',
    boilingPoint: '-10 °C',
    appearance: 'Colorless gas with pungent, choking odor of freshly struck sulfur matches.',
    conductivity: 'Non-conductive',
    reactivity: 'High',
    oxidationStates: 'S(+4), O(-2)',
    chemicalBehavior: 'Acidic reducing gas; dissolves in atmospheric moisture to form sulfurous acid (H₂SO₃), contributing to acid rain.',
    interestingFacts: [
      'Spewed during volcanic eruptions; aerosolizes into stratospheric sulfate clouds that reflect sunlight and cool global temperatures.',
      'Used since ancient Roman winemaking as an antimicrobial preservative to prevent wine from spoiling into vinegar.',
      'Key intermediate in the industrial manufacture of sulfuric acid via the Contact process.'
    ],
    timeline: [
      { year: '1774 CE', event: 'Joseph Priestley isolates sulfur dioxide gas.' }
    ],
    thermalBehavior: {
      vibrationRate: 2.0,
      meltingPointNum: -72,
      boilingPointNum: -10,
      solidBelow: -72,
      gasAbove: -10
    },
    pressureBehavior: {
      compressibility: 'high',
      volumeReductionFactor: 0.2,
      collisionFrequencyMultiplier: 4.7
    }
  },

  // =========================================================================
  // CARBON ALLOTROPES & ORGANIC COMPOUNDS
  // =========================================================================
  {
    id: 'graphene',
    name: 'Graphene (2D Carbon Monolayer)',
    nameAr: 'الغرافين',
    symbol: 'C (2D Monolayer)',
    category: 'Minerals',
    rarity: 'Legendary',
    state: 'Solid',
    colorHex: '#1e293b',
    particleColor: '#38bdf8',
    density: '2.26 g/cm³',
    meltingPoint: '3652 °C (sublimes)',
    boilingPoint: 'Sublimes',
    appearance: 'Single atomic layer of carbon atoms packed in a hexagonal honeycomb lattice; transparent and virtually frictionless.',
    conductivity: 'Superconductor',
    reactivity: 'Low',
    oxidationStates: 'C(0)',
    chemicalBehavior: 'Electrons behave as massless relativistic Dirac fermions, moving at 1/300 the speed of light with extraordinary ballistic conductance.',
    interestingFacts: [
      'Approximately 200 times stronger than structural steel by weight, yet flexible and 97.7% optically transparent.',
      'World’s thinnest material (one single atom thick: 0.335 nanometers).',
      'Conducts heat over twice as efficiently as natural diamond (~5000 W/m·K).'
    ],
    timeline: [
      { year: '2004 CE', event: 'Andre Geim and Konstantin Novoselov isolate single-layer graphene at Manchester University.' },
      { year: '2010 CE', event: 'Nobel Prize in Physics awarded for groundbreaking 2D graphene experiments.' }
    ],
    thermalBehavior: {
      vibrationRate: 0.4,
      meltingPointNum: 3652,
      boilingPointNum: 4000,
      solidBelow: 3652,
      gasAbove: 4000
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.999,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'fullerene',
    name: 'Buckminsterfullerene (Buckyball C₆₀)',
    nameAr: 'الفوليرين (كرة بوكي C60)',
    symbol: 'C₆₀',
    category: 'Minerals',
    rarity: 'Exotic',
    state: 'Solid',
    colorHex: '#475569',
    particleColor: '#9333ea',
    density: '1.65 g/cm³',
    meltingPoint: '600 °C (sublimes)',
    boilingPoint: 'Sublimes',
    appearance: 'Dark brown/black crystalline solid composed of spherical geodesic cages of 60 carbon atoms.',
    conductivity: 'Medium',
    reactivity: 'Moderate',
    oxidationStates: 'C(0)',
    chemicalBehavior: 'Truncated icosahedral hollow cage (12 pentagons and 20 hexagons) resembling a soccer ball; acts as an exceptional electron acceptor.',
    interestingFacts: [
      'Named after architect Richard Buckminster Fuller, renowned for his geodesic dome engineering designs.',
      'Discovered in soot created by laser vaporization of graphite in 1985 (1996 Nobel Prize in Chemistry).',
      'Can trap individual noble gas atoms or metal ions inside its hollow cage (endohedral fullerenes).'
    ],
    timeline: [
      { year: '1985 CE', event: 'Harold Kroto, Robert Curl, and Richard Smalley discover C₆₀ buckminsterfullerene.' }
    ],
    thermalBehavior: {
      vibrationRate: 0.8,
      meltingPointNum: 600,
      boilingPointNum: 800,
      solidBelow: 600,
      gasAbove: 800
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'glucose',
    name: 'D-Glucose',
    nameAr: 'الجلوكوز (سكر العنب)',
    symbol: 'C₆H₁₂O₆',
    category: 'Organic',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#f1f5f9',
    particleColor: '#e2e8f0',
    density: '1.54 g/cm³',
    meltingPoint: '146 °C',
    boilingPoint: 'Decomposes',
    appearance: 'White crystalline sweet aldohexose monosaccharide powder.',
    conductivity: 'Non-conductive',
    reactivity: 'Moderate',
    oxidationStates: 'C(0), H(+1), O(-2)',
    chemicalBehavior: 'Reducing sugar; undergoes cellular respiration (glycolysis and Krebs cycle) generating 30-32 ATP energy equivalents per molecule.',
    interestingFacts: [
      'Most abundant carbohydrate on planet Earth, produced by plants via photosynthetic carbon fixation.',
      'Sole primary metabolic energy fuel utilized by the human brain under normal physiological conditions.',
      'Polymerizes into cellulose (plant cell walls) and starch/glycogen (energy storage).'
    ],
    timeline: [
      { year: '1747 CE', event: 'Andreas Sigismund Marggraf first isolates pure glucose from raisins.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.2,
      meltingPointNum: 146,
      boilingPointNum: 250,
      solidBelow: 146,
      gasAbove: 250
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'sucrose',
    name: 'Sucrose (Table Sugar)',
    nameAr: 'السكروز (سكر المائدة)',
    symbol: 'C₁₂H₂₂O₁₁',
    category: 'Everyday Materials',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#f8fafc',
    particleColor: '#ffffff',
    density: '1.587 g/cm³',
    meltingPoint: '186 °C',
    boilingPoint: 'Decomposes',
    appearance: 'Colorless transparent sweet monoclinic crystals or white granulated culinary sugar.',
    conductivity: 'Non-conductive',
    reactivity: 'Low',
    oxidationStates: 'C(0), H(+1), O(-2)',
    chemicalBehavior: 'Non-reducing disaccharide composed of alpha-D-glucose and beta-D-fructose. Readily caramelizes above 160 °C and dehydrates with sulfuric acid into carbon.',
    interestingFacts: [
      'Extracted globally on an enormous industrial scale from sugarcane and sugar beets.',
      'When heated above 160 °C, undergoes complex thermal caramelization producing rich aromatic toffee flavor compounds.',
      'Water solubility is staggering: ~200 grams of sucrose dissolve in just 100 mL of water at room temperature.'
    ],
    timeline: [
      { year: '500 BCE', event: 'Indian civilizations master crystallization of sugar from boiled sugarcane juice.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.1,
      meltingPointNum: 186,
      boilingPointNum: 260,
      solidBelow: 186,
      gasAbove: 260
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'acetone',
    name: 'Acetone',
    nameAr: 'الأسيتون',
    symbol: 'CH₃COCH₃',
    category: 'Organic',
    rarity: 'Common',
    state: 'Liquid',
    colorHex: '#e0f2fe',
    particleColor: '#38bdf8',
    density: '0.784 g/cm³',
    meltingPoint: '-94.9 °C',
    boilingPoint: '56.05 °C',
    appearance: 'Clear, colorless, highly volatile liquid with a sweet, pungent fruity odor.',
    conductivity: 'Non-conductive',
    reactivity: 'Moderate',
    oxidationStates: 'C(-4/3 avg), H(+1), O(-2)',
    chemicalBehavior: 'Polar aprotic solvent miscible with water, ethanol, and ether in all proportions; dissolves plastics like polystyrene and acrylic.',
    interestingFacts: [
      'Common household nail polish remover and ubiquitous laboratory glassware degreasing solvent.',
      'Produced endogenously in small quantities in the human liver during fasting and ketosis as a ketone body.',
      'Instantaneously dissolves expanded Styrofoam foam cups by plasticizing the polystyrene polymer chains.'
    ],
    timeline: [
      { year: '1595 CE', event: 'Andreas Libavius first isolates acetone by dry distillation of lead acetate.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.9,
      meltingPointNum: -94.9,
      boilingPointNum: 56.1,
      solidBelow: -94.9,
      gasAbove: 56.1
    },
    pressureBehavior: {
      compressibility: 'low',
      volumeReductionFactor: 0.96,
      collisionFrequencyMultiplier: 1.7
    }
  },

  // =========================================================================
  // POLYMERS & SYNTHETIC MATERIALS
  // =========================================================================
  {
    id: 'polyethylene',
    name: 'Polyethylene (LDPE / HDPE)',
    nameAr: 'البولي إيثيلين',
    symbol: '[C₂H₄]ₙ',
    category: 'Everyday Materials',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#e2e8f0',
    particleColor: '#cbd5e1',
    density: '0.94 g/cm³',
    meltingPoint: '125 °C',
    boilingPoint: 'Decomposes above 300 °C',
    appearance: 'Translucent to milky-white, flexible, lightweight thermoplastic polymer with a waxy touch.',
    conductivity: 'Non-conductive',
    reactivity: 'Inert',
    oxidationStates: 'C(-2), H(+1)',
    chemicalBehavior: 'Long saturated alkane hydrocarbon macromolecules formed by addition polymerization of ethylene gas; highly resistant to acids, alkalis, and moisture.',
    interestingFacts: [
      'Most widely produced synthetic plastic in the world, with over 100 million metric tons manufactured annually.',
      'Ultra-High-Molecular-Weight Polyethylene (UHMWPE) has chains with millions of carbons and is used in ballistic body armor and artificial hip joint implants.',
      'Discovered accidentally twice: by Hans von Pechmann in 1898 and by ICI chemists in 1933 during high-pressure experiments.'
    ],
    timeline: [
      { year: '1933 CE', event: 'Reginald Gibson and Eric Fawcett at ICI synthesize high-pressure industrial polyethylene.' },
      { year: '1953 CE', event: 'Karl Ziegler develops coordination catalysts for low-pressure HDPE synthesis (1963 Nobel Prize).' }
    ],
    thermalBehavior: {
      vibrationRate: 1.1,
      meltingPointNum: 125,
      boilingPointNum: 350,
      solidBelow: 125,
      gasAbove: 350
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'polytetrafluoroethylene',
    name: 'Polytetrafluoroethylene (Teflon / PTFE)',
    nameAr: 'بولي رباعي فلورو الإيثيلين (التفلون)',
    symbol: '[C₂F₄]ₙ',
    category: 'Everyday Materials',
    rarity: 'Exotic',
    state: 'Solid',
    colorHex: '#f1f5f9',
    particleColor: '#e2e8f0',
    density: '2.20 g/cm³',
    meltingPoint: '327 °C',
    boilingPoint: 'Decomposes above 350 °C',
    appearance: 'Dense, opaque white, slippery fluoropolymer solid with exceptionally low surface friction.',
    conductivity: 'Non-conductive',
    reactivity: 'Inert',
    oxidationStates: 'C(+1), F(-1)',
    chemicalBehavior: 'Carbon backbone cloaked in tightly bound electronegative fluorine atoms; resistant to virtually all chemical reagents, strong acids, and solvents.',
    interestingFacts: [
      'Has one of the lowest coefficients of friction against polished steel of any solid material (0.05 to 0.10).',
      'Only known surface that a gecko lizard’s foot setae cannot adhere to.',
      'Discovered accidentally by Roy J. Plunkett in 1938 when tetrafluoroethylene refrigerant gas polymerized inside a storage cylinder.'
    ],
    timeline: [
      { year: '1938 CE', event: 'Roy Plunkett accidentally discovers PTFE while working for DuPont.' }
    ],
    thermalBehavior: {
      vibrationRate: 0.9,
      meltingPointNum: 327,
      boilingPointNum: 400,
      solidBelow: 327,
      gasAbove: 400
    },
    pressureBehavior: {
      compressibility: 'negligible',
      volumeReductionFactor: 0.99,
      collisionFrequencyMultiplier: 1.0
    }
  },
  {
    id: 'silicone',
    name: 'Silicone (Polydimethylsiloxane / PDMS)',
    nameAr: 'مطاط السيليكون',
    symbol: '[Si(CH₃)₂O]ₙ',
    category: 'Everyday Materials',
    rarity: 'Common',
    state: 'Solid',
    colorHex: '#cbd5e1',
    particleColor: '#94a3b8',
    density: '1.10 g/cm³',
    meltingPoint: '-60 °C (flexible)',
    boilingPoint: 'Stable up to 300 °C',
    appearance: 'Translucent, rubbery, elastomeric synthetic polymer with high thermal and oxidative stability.',
    conductivity: 'Non-conductive',
    reactivity: 'Inert',
    oxidationStates: 'Si(+4), O(-2), C(-3), H(+1)',
    chemicalBehavior: 'Inorganic-organic hybrid polymer with an alternating silicon-oxygen (Si-O-Si) backbone and methyl side groups; biologically inert and hydrophobic.',
    interestingFacts: [
      'The Apollo 11 lunar astronaut boot prints pressed into the Moon’s regolith in 1969 were made with silicone rubber treads.',
      'Widely used in medical implants, infant pacifiers, and flexible heat-resistant baking molds.',
      'Outstanding electrical insulation and UV resistance make it ubiquitous in aerospace gaskets and weatherproofing seals.'
    ],
    timeline: [
      { year: '1940 CE', event: 'Eugene Rochow at General Electric patents the direct process for organosilicon synthesis.' }
    ],
    thermalBehavior: {
      vibrationRate: 1.0,
      meltingPointNum: 250,
      boilingPointNum: 400,
      solidBelow: 250,
      gasAbove: 400
    },
    pressureBehavior: {
      compressibility: 'low',
      volumeReductionFactor: 0.98,
      collisionFrequencyMultiplier: 1.1
    }
  }
];
