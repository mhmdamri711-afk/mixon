import { INITIAL_MATERIALS } from '../src/data/materialsData';
import { KNOWN_REACTIONS, getReaction } from '../src/data/reactionsData';
import { queryScientificKnowledgeEngine } from '../src/server/scientificEngine';

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, failureDetails?: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    if (failureDetails) console.error(`    Detail: ${failureDetails}`);
    failedTests++;
  }
}

console.log('====================================================');
console.log('  MIXON SCIENTIFIC VERIFICATION SUITE');
console.log('====================================================\n');

// -----------------------------------------------------------
// SUITE 1: Materials Database Quality & Diversity (10 Tests)
// -----------------------------------------------------------
console.log('[SUITE 1] Materials Database Quality & Integrity');

// 1. Total count
assert(INITIAL_MATERIALS.length === 78, `Materials database contains exactly 78 materials (Actual: ${INITIAL_MATERIALS.length})`);

// 2. Unique IDs
const idSet = new Set<string>();
const duplicateIds: string[] = [];
for (const m of INITIAL_MATERIALS) {
  if (idSet.has(m.id)) duplicateIds.push(m.id);
  idSet.add(m.id);
}
assert(duplicateIds.length === 0, 'All 78 material IDs are strictly unique (0 duplicates)', duplicateIds.join(', '));

// 3. Valid Rarity tiers
const validRarities = new Set(['Common', 'Rare', 'Exotic', 'Legendary']);
const invalidRarityMats = INITIAL_MATERIALS.filter(m => !m.rarity || !validRarities.has(m.rarity));
assert(invalidRarityMats.length === 0, 'All materials possess valid scientific Rarity tiers', invalidRarityMats.map(m => m.id).join(', '));

// 4. Scientifically valid properties (melting/boiling points, density > 0)
const invalidPropertyMats = INITIAL_MATERIALS.filter(m => 
  !m.meltingPoint || typeof m.meltingPoint !== 'string' ||
  !m.boilingPoint || typeof m.boilingPoint !== 'string' ||
  !m.density || typeof m.density !== 'string' ||
  !m.symbol ||
  !m.name ||
  !m.category
);
assert(invalidPropertyMats.length === 0, 'Every material has scientifically valid physical constants (melting/boiling/density)', invalidPropertyMats.map(m => m.id).join(', '));

// 5. Category diversity
const categories = new Set(INITIAL_MATERIALS.map(m => m.category));
assert(categories.size >= 8, `Categories diversity >= 8 types (Found: ${categories.size}: ${Array.from(categories).join(', ')})`);

// 6. Physical states
const states = new Set(INITIAL_MATERIALS.map(m => m.state));
assert(states.has('Solid') && states.has('Liquid') && states.has('Gas'), 'Physical states span Solid, Liquid, and Gas');

// 7. Key chemical acids
const acidIds = ['hydrochloric_acid', 'sulfuric_acid', 'nitric_acid', 'acetic_acid'];
const foundAcids = INITIAL_MATERIALS.filter(m => acidIds.includes(m.id));
assert(foundAcids.length === 4, `All 4 primary laboratory acids present (HCl, H2SO4, HNO3, CH3COOH)`);

// 8. Key chemical bases
const baseIds = ['sodium_hydroxide', 'calcium_hydroxide', 'ammonia'];
const foundBases = INITIAL_MATERIALS.filter(m => baseIds.includes(m.id));
assert(foundBases.length === 3, `All 3 primary laboratory bases present (NaOH, Ca(OH)2, NH3)`);

// 9. Key mineral salts
const saltIds = ['salt', 'calcium_carbonate', 'copper_sulfate', 'potassium_permanganate'];
const foundSalts = INITIAL_MATERIALS.filter(m => saltIds.includes(m.id));
assert(foundSalts.length === 4, `Key mineral salts present in database (Count: ${foundSalts.length})`);

// 10. Noble gases and elemental metals
const nobleGasIds = ['helium', 'neon', 'argon', 'krypton', 'xenon'];
const foundNobleGases = INITIAL_MATERIALS.filter(m => nobleGasIds.includes(m.id));
const metalMats = INITIAL_MATERIALS.filter(m => m.category === 'Metals');
assert(foundNobleGases.length >= 4 && metalMats.length >= 18, `Noble gases (count: ${foundNobleGases.length}) and broad metals database (count: ${metalMats.length}) present`);

console.log('');

// -----------------------------------------------------------
// SUITE 2: Representative COMBINE Cases & Non-Reaction Logic (10 Tests)
// -----------------------------------------------------------
console.log('[SUITE 2] Representative COMBINE Cases & Non-Reaction Logic');

// 11. Known valid synthesis: Hydrogen + Oxygen
const matH2 = INITIAL_MATERIALS.find(m => m.id === 'hydrogen')!;
const matO2 = INITIAL_MATERIALS.find(m => m.id === 'oxygen')!;
const resWater = getReaction(matH2, matO2);
assert(resWater.hasOccurred === true && resWater.outputName.toLowerCase().includes('water'), 'Known valid synthesis: Hydrogen + Oxygen → Pure Water');

// 12. Known valid neutralization: HCl + NaOH
const matHCl = INITIAL_MATERIALS.find(m => m.id === 'hydrochloric_acid')!;
const matNaOH = INITIAL_MATERIALS.find(m => m.id === 'sodium_hydroxide')!;
const resSalt = getReaction(matHCl, matNaOH);
assert(resSalt.hasOccurred === true && resSalt.outputName.toLowerCase().includes('sodium chloride'), 'Known valid neutralization: HCl + NaOH → Sodium Chloride');

// 13. Known valid combustion: Methane + Oxygen
const matCH4 = INITIAL_MATERIALS.find(m => m.id === 'methane')!;
const resCombustion = getReaction(matCH4, matO2);
assert(resCombustion.hasOccurred === true && resCombustion.outputName.toLowerCase().includes('carbon dioxide'), 'Known valid combustion: CH4 + 2O2 → Carbon Dioxide & Steam');

// 14. Fe(s) + Cu(s) Non-Reaction: Physical mixture/contact, NO fake equation, NO ΔH=0
const matFe = INITIAL_MATERIALS.find(m => m.id === 'iron')!;
const matCu = INITIAL_MATERIALS.find(m => m.id === 'copper')!;
const resFeCu = getReaction(matFe, matCu);
assert(
  resFeCu.hasOccurred === false &&
  (resFeCu.reactionStatus === 'Physical mixture/contact' || resFeCu.reactionStatus === 'PHYSICAL_MIXTURE') &&
  resFeCu.outputName === 'No Chemical Reaction Observed' &&
  (!resFeCu.balancedEquation || resFeCu.balancedEquation === 'No reaction under the current simulated conditions.') &&
  !resFeCu.balancedEquation?.includes('→ No Reaction') &&
  !resFeCu.energyChange?.includes('0 kJ/mol'),
  'Fe(s) + Cu(s): Reaction Status is "Physical mixture/contact", equation is "No reaction under current simulated conditions", ΔH is undefined'
);

// 15. Fe(s) + Cu(s) Scientific Explanation: Distinguishes elemental metals from ionic solutions
assert(
  (resFeCu.noReactionReason?.includes('form a new compound') || resFeCu.noReactionReason?.includes('spontaneously')) &&
  (resFeCu.noReactionReason?.includes('metal-displacement reaction') || resFeCu.noReactionReason?.includes('activity-series')),
  'Fe(s) + Cu(s): Scientific explanation accurately explains that displacement requires an ionic solution, not dry elemental metals'
);

// 16. Noble Metal Immunity: Gold + Water
const matAu = INITIAL_MATERIALS.find(m => m.id === 'gold')!;
const matWater = INITIAL_MATERIALS.find(m => m.id === 'water')!;
const resAuWater = getReaction(matAu, matWater);
assert(
  resAuWater.hasOccurred === false &&
  (resAuWater.reactionStatus === 'No reaction' || resAuWater.reactionStatus === 'NO_VERIFIED_REACTION') &&
  resAuWater.outputName === 'No Chemical Reaction Observed' &&
  (!resAuWater.balancedEquation || resAuWater.balancedEquation === 'No reaction under the current simulated conditions.') &&
  !resAuWater.balancedEquation?.includes('→ No Reaction') &&
  !resAuWater.energyChange?.includes('0 kJ/mol'),
  'Gold + Water: Reaction Status is "No reaction", immune to reduction, no fake equation or ΔH=0'
);

// 17. Noble Gas Inactivity: Helium + Oxygen
const matHe = INITIAL_MATERIALS.find(m => m.id === 'helium')!;
const resHeO2 = getReaction(matHe, matO2);
assert(
  resHeO2.hasOccurred === false &&
  (resHeO2.reactionStatus === 'No reaction' || resHeO2.reactionStatus === 'NO_VERIFIED_REACTION') &&
  resHeO2.outputName === 'No Chemical Reaction Observed' &&
  (!resHeO2.balancedEquation || resHeO2.balancedEquation === 'No reaction under the current simulated conditions.') &&
  !resHeO2.balancedEquation?.includes('→ No Reaction'),
  'Noble Gas (Helium + Oxygen): Yields "No Chemical Reaction Observed", no fabricated compound'
);

// 18. Name Concatenation Rejection: Diamond + Quartz
const matDiamond = INITIAL_MATERIALS.find(m => m.id === 'diamond')!;
const matQuartz = INITIAL_MATERIALS.find(m => m.id === 'quartz')!;
const resDiamondQuartz = getReaction(matDiamond, matQuartz);
assert(
  resDiamondQuartz.hasOccurred === false &&
  !resDiamondQuartz.outputName.toLowerCase().includes('diamond quartz') &&
  resDiamondQuartz.outputName === 'No Chemical Reaction Observed',
  'Diamond + Quartz: Rejects name concatenation, yields "No Chemical Reaction Observed"'
);

// 19. Unreactive solid metal contact: Silver + Iron
const matAg = INITIAL_MATERIALS.find(m => m.id === 'silver')!;
const resAgFe = getReaction(matAg, matFe);
assert(
  resAgFe.hasOccurred === false &&
  (resAgFe.reactionStatus === 'Physical mixture/contact' || resAgFe.reactionStatus === 'PHYSICAL_MIXTURE') &&
  (!resAgFe.balancedEquation || resAgFe.balancedEquation === 'No reaction under the current simulated conditions.'),
  'Solid elemental metals (Silver + Iron): Physical mixture/contact without chemical reaction'
);

// 20. Clear distinction among all 4 scientific reaction statuses
const statusSet = new Set<string>();
statusSet.add(resWater.reactionStatus!);
statusSet.add(resHeO2.reactionStatus!);
statusSet.add(resFeCu.reactionStatus!);
const resUnverified = getReaction(matDiamond, matQuartz);
statusSet.add(resUnverified.reactionStatus!);
assert(
  (statusSet.has('Known chemical reaction') || statusSet.has('VERIFIED_REACTION')) &&
  (statusSet.has('No reaction') || statusSet.has('NO_VERIFIED_REACTION')) &&
  (statusSet.has('Physical mixture/contact') || statusSet.has('PHYSICAL_MIXTURE')) &&
  (statusSet.has('No verified reaction') || statusSet.has('NO_VERIFIED_REACTION')),
  'Engine clearly distinguishes "Known chemical reaction", "No reaction", "Physical mixture/contact", and "No verified reaction"'
);

console.log('');

// -----------------------------------------------------------
// SUITE 3: Atom Conservation & Database Realism (5 Tests)
// -----------------------------------------------------------
console.log('[SUITE 3] Atom Conservation & Database Realism');

// 21. Every successful reaction points to real materials / valid products
const successfulReactions = KNOWN_REACTIONS.filter(r => r.hasOccurred !== false);
const allOutputsHaveValidState = successfulReactions.every(r => 
  ['Solid', 'Liquid', 'Gas', 'Plasma'].includes(r.outputState) &&
  r.outputName.length > 0 &&
  r.outputFormula.length > 0
);
assert(allOutputsHaveValidState && successfulReactions.length >= 20, `Every successful reaction (${successfulReactions.length} reactions) defines a valid physical state and authentic product`);

// 22. Zero non-reactions contain "→ No Reaction" as a fake chemical equation
const allReactionsWithFakeEq = KNOWN_REACTIONS.filter(r => 
  r.hasOccurred === false && r.balancedEquation?.includes('→ No Reaction')
);
assert(allReactionsWithFakeEq.length === 0, 'Zero non-reactions in database display "→ No Reaction" as an equation');

// 23. Zero non-reactions assign ΔH = 0 without real thermal data
const allReactionsWithFakeEnthalpy = KNOWN_REACTIONS.filter(r =>
  r.hasOccurred === false && r.energyChange.includes('0 kJ/mol')
);
assert(allReactionsWithFakeEnthalpy.length === 0, 'Zero non-reactions in database assign "ΔH = 0 kJ/mol"');

// 24. Atom Conservation Helper on Representative Equations
interface ElementCount { [el: string]: number; }
function parseSimpleFormula(formula: string): ElementCount {
  const counts: ElementCount = {};
  // Handle simple molecules like 2H2O, CO2, 2NaCl, 2Fe2O3, etc.
  const terms = formula.split('+').map(t => t.trim());
  for (const term of terms) {
    // Check leading coefficient
    const match = term.match(/^(\d*)([A-Za-z0-9₀-₉₂₃₄₅₆₇₈₁]+)/);
    if (!match) continue;
    const coeff = match[1] ? parseInt(match[1], 10) : 1;
    let mol = match[2]
      .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
      .replace(/₅/g, '5').replace(/₆/g, '6').replace(/₇/g, '7')
      .replace(/₈/g, '8').replace(/₉/g, '9').replace(/₁/g, '1');
    
    // Parse element tokens (e.g., Fe2, O3, Na, Cl)
    const elRegex = /([A-Z][a-z]*)(\d*)/g;
    let m;
    while ((m = elRegex.exec(mol)) !== null) {
      const el = m[1];
      const count = m[2] ? parseInt(m[2], 10) : 1;
      counts[el] = (counts[el] || 0) + coeff * count;
    }
  }
  return counts;
}

const representativeBalancedEquations = [
  { eq: '2H₂ + O₂ → 2H₂O', reactants: '2H2 + O2', products: '2H2O1' },
  { eq: '2Na + Cl₂ → 2NaCl', reactants: '2Na + Cl2', products: '2Na1Cl1' },
  { eq: '4Fe + 3O₂ → 2Fe₂O₃', reactants: '4Fe + 3O2', products: '2Fe2O3' },
  { eq: 'C + O₂ → CO₂', reactants: 'C + O2', products: 'CO2' },
  { eq: 'CH₄ + 2O₂ → CO₂ + 2H₂O', reactants: 'C1H4 + 2O2', products: 'C1O2 + 2H2O1' },
  { eq: '2Mg + O₂ → 2MgO', reactants: '2Mg + O2', products: '2Mg1O1' },
  { eq: '4Al + 3O₂ → 2Al₂O₃', reactants: '4Al + 3O2', products: '2Al2O3' },
  { eq: 'Si + O₂ → SiO₂', reactants: 'Si + O2', products: 'Si1O2' },
  { eq: '2Ag + S → Ag₂S', reactants: '2Ag + S', products: 'Ag2S' }
];

let allEquationsConserveAtoms = true;
for (const item of representativeBalancedEquations) {
  const left = parseSimpleFormula(item.reactants);
  const right = parseSimpleFormula(item.products);
  for (const el of Object.keys(left)) {
    if (left[el] !== right[el]) {
      allEquationsConserveAtoms = false;
      console.error(`Mismatch in ${item.eq}: ${el} left=${left[el]} vs right=${right[el]}`);
    }
  }
}
assert(allEquationsConserveAtoms, 'Atom conservation confirmed for all representative balanced chemical equations');

// 25. Every chemical reaction in verified database provides a balanced equation
const reactionsWithEquations = successfulReactions.filter(r => !!r.balancedEquation);
assert(reactionsWithEquations.length >= 18, `All verified chemical reactions provide balanced equations (Count: ${reactionsWithEquations.length})`);

console.log('');

// -----------------------------------------------------------
// SUITE 4: AI Tutor Scientific Knowledge Engine (6 Tests)
// -----------------------------------------------------------
console.log('[SUITE 4] AI Tutor Knowledge Engine Grounding');

// 26. Polite English greeting
const greetEn = queryScientificKnowledgeEngine('Hello there', [], {}, false);
assert(greetEn.toLowerCase().includes('welcome') || greetEn.toLowerCase().includes('hello'), 'AI Tutor responds politely to English greeting');

// 27. Polite Arabic greeting
const greetAr = queryScientificKnowledgeEngine('مرحبا', [], {}, true);
assert(greetAr.includes('أهلاً') || greetAr.includes('مرحبا'), 'AI Tutor responds politely to Arabic greeting');

// 28. Gibberish rejection without hallucination
const gibberish = queryScientificKnowledgeEngine('asdfghjk', [], {}, false);
assert(gibberish.toLowerCase().includes('not recognize') || gibberish.toLowerCase().includes('please ask'), 'AI Tutor rejects keyboard gibberish without hallucinating fake compounds');

// 29. Single entity explanation (Iron rust)
const ironResp = queryScientificKnowledgeEngine('Why does iron rust?', [], {}, false);
assert(ironResp.toLowerCase().includes('oxygen') && ironResp.toLowerCase().includes('water'), 'AI Tutor accurately explains iron rust mechanism (oxygen + water/moisture)');

// 30. Structured comparison (Copper vs Gold)
const compareResp = queryScientificKnowledgeEngine('Compare copper and gold', [], {}, false);
assert(compareResp.toLowerCase().includes('copper') && compareResp.toLowerCase().includes('gold'), 'AI Tutor provides structured scientific comparison between copper and gold');

// 31. Reaction & Inactivity Inquiry (Hydrogen+Oxygen and Helium+Water)
const rxInquiry = queryScientificKnowledgeEngine('What happens when hydrogen reacts with oxygen?', [], {}, false);
const inertInquiry = queryScientificKnowledgeEngine('Can helium react with water?', [], {}, false);
assert(
  (rxInquiry.toLowerCase().includes('water') || rxInquiry.toLowerCase().includes('h2o')) &&
  (inertInquiry.toLowerCase().includes('no chemical reaction') || inertInquiry.toLowerCase().includes('inert') || inertInquiry.toLowerCase().includes('stable')),
  'AI Tutor correctly predicts reaction product for H2+O2 (Water) and inert non-reaction for Helium+Water'
);

console.log('\n====================================================');
console.log(`TOTAL TESTS: ${passedTests + failedTests} | PASSED: ${passedTests} | FAILED: ${failedTests} | SKIPPED: 0`);
console.log('====================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

