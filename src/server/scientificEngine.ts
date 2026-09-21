import { INITIAL_MATERIALS } from '../data/materialsData';
import { KNOWN_REACTIONS } from '../data/reactionsData';
import { Material, ReactionResult } from '../types';

export interface ChatHistoryItem {
  role: 'user' | 'model' | 'assistant';
  text: string;
}

export interface LabContext {
  materialA?: Material | null;
  materialB?: Material | null;
  currentResult?: ReactionResult | null;
  temperature?: number;
  pressure?: number;
  simulationPhase?: string;
  discoveryCount?: number;
}

export interface ElementKnowledge {
  id: string;
  nameEn: string;
  nameAr: string;
  symbol: string;
  atomicNumber: number;
  categoryEn: string;
  categoryAr: string;
  stateEn: string;
  stateAr: string;
  density: string;
  meltingPoint: string;
  boilingPoint?: string;
  electronicConfig?: string;
  magneticPropertyEn: string;
  magneticPropertyAr: string;
  conductivityEn: string;
  conductivityAr: string;
  reactivityEn: string;
  reactivityAr: string;
  colorEn: string;
  colorAr: string;
  chemicalBehaviorEn: string;
  chemicalBehaviorAr: string;
  rustingBehaviorEn?: string;
  rustingBehaviorAr?: string;
  usesEn: string[];
  usesAr: string[];
  interestingFactsEn: string[];
  interestingFactsAr: string[];
}

// Broad scientific dictionary of elements & key laboratory substances
export const SCIENTIFIC_KNOWLEDGE_BASE: Record<string, ElementKnowledge> = {
  iron: {
    id: 'iron',
    nameEn: 'Iron',
    nameAr: 'الحديد',
    symbol: 'Fe',
    atomicNumber: 26,
    categoryEn: 'Transition Metal (Group 8)',
    categoryAr: 'فلز انتقالي (المجموعة 8)',
    stateEn: 'Solid',
    stateAr: 'صلب',
    density: '7.87 g/cm³',
    meltingPoint: '1538 °C',
    boilingPoint: '2862 °C',
    electronicConfig: '[Ar] 3d⁶ 4s²',
    magneticPropertyEn: 'Ferromagnetic at room temperature (curie point: 770 °C)',
    magneticPropertyAr: 'فيرومغناطيسي قوي في درجة حرارة الغرفة (نقطة كوري: 770 مئوية)',
    conductivityEn: 'High thermal and electrical conductivity (approx. 10 MS/m)',
    conductivityAr: 'موصل جيد للحرارة والكهرباء (قرابة 10 ميجا سيمنز/متر)',
    reactivityEn: 'Moderate; oxidizes readily with oxygen and water',
    reactivityAr: 'متوسط؛ يتأكسد بسهولة عند تعرضه للأكسجين والرطوبة',
    colorEn: 'Silvery-gray lustrous metallic',
    colorAr: 'رمادي فضي ذو بريق معدني',
    chemicalBehaviorEn: 'Readily oxidizes in the presence of air and moisture to form hydrated iron(III) oxide (rust, Fe₂O₃·nH₂O). Dissolves in non-oxidizing acids releasing hydrogen gas.',
    chemicalBehaviorAr: 'يتأكسد بسهولة في وجود الهواء والرطوبة ليكوّن أكسيد الحديد المائي (الصدأ، Fe₂O₃·nH₂O). يذوب في الأحماض المخففة محرراً غاز الهيدروجين.',
    rustingBehaviorEn: 'Rusts through an electrochemical process when exposed to oxygen and water. Unlike copper or aluminum, iron rust is porous and flakes off, exposing fresh metal to continuous corrosion.',
    rustingBehaviorAr: 'يحدث الصدأ عبر تفاعل كهركيميائي عند اجتماع الأكسجين والماء. بخلاف النحاس أو الألمنيوم، فإن صدأ الحديد هش ومسامي يتقشر باستمرار كاشفاً طبقات المعدن الداخلية للتآكل المستمر.',
    usesEn: [
      'Primary structural base for steel alloys (construction, bridges, skyscrapers)',
      'Automotive frames, heavy industrial machinery, and railway tracks',
      'Central coordinating atom in biological hemoglobin for carrying oxygen in blood',
      'Electromagnetic cores, transformers, and electrical inductors'
    ],
    usesAr: [
      'المكون الأساسي لسبائك الفولاذ المستخدمة في البناء وناطحات السحاب والجسور',
      'صناعة هياكل السيارات، السكك الحديدية، والمعدات الصناعية الثقيلة',
      'الذرة المركزية في بروتين الهيموجلوبين لنقل الأكسجين في دماء الكائنات الحية',
      'صناعة نوى المحولات الكهرومغناطيسية والمولدات الكهربائية'
    ],
    interestingFactsEn: [
      'It is the final element forged by nuclear fusion in high-mass stars before a supernova explosion.',
      'Earth’s molten outer core is composed mostly of iron and nickel, generating the planetary magnetic shield.'
    ],
    interestingFactsAr: [
      'هو آخر عنصر يتم تصنيعه عبر الاندماج النووي داخل النجوم الضخمة قبل انفجار السوبرنوفا.',
      'يُشكّل اللب الخارجي المنصهر للأرض لحماية كوكبنا عبر توليد المجال المغناطيسي الأرضي.'
    ]
  },

  copper: {
    id: 'copper',
    nameEn: 'Copper',
    nameAr: 'النحاس',
    symbol: 'Cu',
    atomicNumber: 29,
    categoryEn: 'Transition Metal (Coinage Metal, Group 11)',
    categoryAr: 'فلز انتقالي (المجموعة 11)',
    stateEn: 'Solid',
    stateAr: 'صلب',
    density: '8.96 g/cm³',
    meltingPoint: '1085 °C',
    boilingPoint: '2562 °C',
    electronicConfig: '[Ar] 3d¹⁰ 4s¹',
    magneticPropertyEn: 'Diamagnetic (weakly repelled by magnetic fields)',
    magneticPropertyAr: 'ديامغناطيسي (يتنافر بشكل ضعيف جداً مع الحقول المغناطيسية)',
    conductivityEn: 'Extremely high electrical (59.6 MS/m) and thermal conductivity (second only to silver)',
    conductivityAr: 'فائق التوصيل للكهرباء (59.6 ميجا سيمنز/متر) والحرارة (يأتي مباشرة بعد الفضة)',
    reactivityEn: 'Low; resistant to atmospheric corrosion due to passivating patina',
    reactivityAr: 'منخفض؛ يقاوم التآكل الجوي بفضل تكوين طبقة زنجار واقية',
    colorEn: 'Distinctive reddish-orange metallic luster',
    colorAr: 'أحمر برتقالي مائل للبني ذو بريق معدني فريد',
    chemicalBehaviorEn: 'Does not react with water, but reacts slowly with atmospheric oxygen to form copper oxide (CuO), and subsequently forms a protective green patina of basic copper carbonate. Dissolves in concentrated nitric and sulfuric acids.',
    chemicalBehaviorAr: 'لا يتفاعل مع الماء النقي، ولكنه يتفاعل ببطء مع أكسجين الجو ليكوّن أكسيد النحاس الأسود (CuO)، ثم يكتسب لاحقاً طبقة زنجار خضراء واقية (كربونات النحاس القاعدية). يذوب في حمض النيتريك المركز.',
    rustingBehaviorEn: 'Copper does not rust (rust applies strictly to iron). Instead, it forms a thin, dense protective green surface film (patina/verdigris) that halts further degradation.',
    rustingBehaviorAr: 'النحاس لا يصدأ (فالصدأ خاص بالحديد)، بل يكوّن طبقة أكسيد وزنجار خضراء رقيقة وملتصقة تحمي المعدن الداخلي وتمنع تآكله لقرون.',
    usesEn: [
      'Electrical power transmission, home wiring, and printed circuit boards (PCBs)',
      'High-performance heat sinks, industrial heat exchangers, and premium cookware',
      'Plumbing pipes, architectural roofing, and decorative cladding',
      'Antimicrobial contact surfaces in medical centers (destroys pathogens on contact)'
    ],
    usesAr: [
      'شبكات نقل الطاقة الكهربائية، الأسلاك المنزلية، واللوحات الإلكترونية المطبوعة (PCBs)',
      'المبادلات الحرارية عالية الكفاءة، مشتتات حرارة المعالجات، وأواني الطهي المتطورة',
      'أنابيب السباكة المائية والصفائح المعمارية المقاومة للعوامل الجوية',
      'الأسطح المضادة للبكتيريا والميكروبات في المنشآت الطبية لخصائصه المعقمة ذاتياً'
    ],
    interestingFactsEn: [
      'One of the only two non-silvery colored metals on the periodic table (along with gold), due to relativistic quantum d-d band transitions.',
      'The Statue of Liberty contains over 80 tonnes of copper, turned green by environmental weathering.'
    ],
    interestingFactsAr: [
      'هو أحد معدنين ملونين فقط في الجدول الدوري (بجانب الذهب) وليس رمادياً، بسبب انتقالات إلكترونية كمومية في مدارات d.',
      'تمثال الحرية مغطى بأكثر من 80 طناً من النحاس تحول لونها للأخضر بفعل تفاعلات الغلاف الجوي.'
    ]
  },

  gold: {
    id: 'gold',
    nameEn: 'Gold',
    nameAr: 'الذهب',
    symbol: 'Au',
    atomicNumber: 79,
    categoryEn: 'Noble Metal / Transition Metal (Group 11)',
    categoryAr: 'فلز نبيل / فلز انتقالي (المجموعة 11)',
    stateEn: 'Solid',
    stateAr: 'صلب',
    density: '19.32 g/cm³',
    meltingPoint: '1064 °C',
    boilingPoint: '2970 °C',
    electronicConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹',
    magneticPropertyEn: 'Diamagnetic',
    magneticPropertyAr: 'ديامغناطيسي',
    conductivityEn: 'Very high electrical (45.2 MS/m) and thermal conductivity with total corrosion immunity',
    conductivityAr: 'عالي التوصيل للكهرباء والحرارة مع مناعة مطلقة ضد الأكسدة والتآكل',
    reactivityEn: 'Inert / Noble; does not react with oxygen, water, or standard single acids',
    reactivityAr: 'خامل كيميائياً؛ لا يتفاعل مع الأكسجين أو الماء أو معظم الأحماض الفردية',
    colorEn: 'Bright lustrous golden yellow',
    colorAr: 'أصفر ذهبي ساطع عالي اللمعان',
    chemicalBehaviorEn: 'Completely unreactive to oxygen and water. Only dissolves in aqua regia (a mixture of nitric acid and hydrochloric acid) or cyanide solutions.',
    chemicalBehaviorAr: 'معدن نبيل غير نشط إطلاقاً مع الأكسجين والماء. يذوب فقط في الماء الملكي (مزيج حمض النيتريك وحمض الهيدروكلوريك) أو محاليل السيانيد.',
    rustingBehaviorEn: 'Gold never rusts, tarnishes, or corrodes under any natural planetary atmosphere.',
    rustingBehaviorAr: 'الذهب لا يصدأ ولا يفقد بريقه إطلاقاً تحت أي ظرف جوي طبيعي.',
    usesEn: [
      'Corrosion-free electrical connectors in microprocessors, smartphones, and aerospace avionics',
      'Infrared heat shields on satellite visors and the James Webb Space Telescope mirrors',
      'Monetary reserves, jewelry, and dental biocompatible prosthetics'
    ],
    usesAr: [
      'الوصلات الكهربائية الحساسة ومنافذ المعالجات والهواتف لمنع أدنى تآكل',
      'عواكس الأشعة تحت الحمراء في دروع الفضاء ومرايا تلسكوب جيمس ويب الفضائي',
      'الاحتياطي النقدي العالمي، المجوهرات، وزراعات الأسنان الطبية الحيوية'
    ],
    interestingFactsEn: [
      'A single gram of gold can be beaten into a translucent sheet 1 square meter wide.',
      'Gold is so dense that a standard liter bottle filled with gold would weigh over 19 kilograms.'
    ],
    interestingFactsAr: [
      'يمكن بسط غرام واحد من الذهب إلى رقاقة تغطي متراً مربعاً كاملاً بسمك ذرات قليلة.',
      'الذهب شديد الكثافة؛ فلتر واحد من الذهب يزن أكثر من 19 كيلوغراماً.'
    ]
  },

  sodium: {
    id: 'sodium',
    nameEn: 'Sodium',
    nameAr: 'الصوديوم',
    symbol: 'Na',
    atomicNumber: 11,
    categoryEn: 'Alkali Metal (Group 1)',
    categoryAr: 'فلز قلوي (المجموعة 1)',
    stateEn: 'Solid (soft metal, cuttable with knife)',
    stateAr: 'صلب (فلز لين جداً يُقطع بالسكين)',
    density: '0.97 g/cm³ (floats on water)',
    meltingPoint: '97.8 °C',
    boilingPoint: '883 °C',
    electronicConfig: '[Ne] 3s¹',
    magneticPropertyEn: 'Paramagnetic',
    magneticPropertyAr: 'بارامغناطيسي',
    conductivityEn: 'High electrical and thermal conductivity',
    conductivityAr: 'موصل جيد للحرارة والكهرباء',
    reactivityEn: 'Extremely high; vigorously reacts with water and air',
    reactivityAr: 'شديد النشاط الكيميائي؛ يتفاعل بعنف فوري مع الماء والهواء',
    colorEn: 'Silvery-white when freshly cut; tarnishes in seconds',
    colorAr: 'فضي أبيض ناصع عند قطعه حديثاً؛ يتأكسد ويفقد بريقه في ثوانٍ',
    chemicalBehaviorEn: 'Has a single valence electron (3s¹) that it readily loses. Reacts violently and exothermically with water to form sodium hydroxide (NaOH) and hydrogen gas (H₂), often igniting with a yellow flame.',
    chemicalBehaviorAr: 'يمتلك إلكترون تكافؤ وحيداً (3s¹) يتخلى عنه فوراً. يتفاعل بعنف شديد وطارد للحرارة مع الماء مكوّناً هيدروكسيد الصوديوم وغاز الهيدروجين الذي يشتعل بلهب أصفر.',
    usesEn: [
      'Precursor for table salt (NaCl), baking soda, and sodium hydroxide (lye)',
      'Liquid metal coolant in fast-neutron nuclear reactors',
      'Biological neurotransmission via sodium-potassium ionic pumps in neurons'
    ],
    usesAr: [
      'تكوين ملح الطعام (NaCl) ومركبات الصودا وهيدروكسيد الصوديوم الصناعي',
      'سائل تبريد فائق الكفاءة للمفاعلات النووية ذات النيوترونات السريعة',
      'التوصيل العصبي وانقباض العضلات عبر مضخة الصوديوم-البوتاسيوم الحيوية'
    ],
    interestingFactsEn: [
      'It is less dense than water, meaning it floats while reacting violently!',
      'Stored under mineral oil or kerosene to prevent moisture from triggering combustion.'
    ],
    interestingFactsAr: [
      'كثافته أقل من الماء، لذلك يطفو فوق سطح الماء أثناء اشتعاله وتفاعله العنيف!',
      'يُحفظ مغموراً تحت زيت البارافين أو الكيروسين لعزله عن رطوبة الهواء.'
    ]
  },

  oxygen: {
    id: 'oxygen',
    nameEn: 'Oxygen',
    nameAr: 'الأكسجين',
    symbol: 'O',
    atomicNumber: 8,
    categoryEn: 'Reactive Nonmetal / Chalcogen (Group 16)',
    categoryAr: 'لافلز نشط / كالكوجين (المجموعة 16)',
    stateEn: 'Gas (diatomic, O₂)',
    stateAr: 'غاز (ثنائي الذرة، O₂)',
    density: '1.43 g/L at STP',
    meltingPoint: '-218.8 °C',
    boilingPoint: '-183.0 °C',
    electronicConfig: '[He] 2s² 2p⁴',
    magneticPropertyEn: 'Liquid oxygen is paramagnetic due to unpaired electrons in antibonding orbitals',
    magneticPropertyAr: 'الأكسجين السائل بارامغناطيسي بسبب وجود إلكترونات منفردة في المدارات الجزيئية',
    conductivityEn: 'Electrical insulator',
    conductivityAr: 'عازل للكهرباء',
    reactivityEn: 'High; strong oxidizing agent',
    reactivityAr: 'عالي النشاط؛ عامل مؤكسد قوي لمعظم العناصر',
    colorEn: 'Colorless gas; pale sky-blue in liquid and solid states',
    colorAr: 'غاز عديم اللون؛ أزرق سماوي شاحب في الحالتين السائلة والصلبة',
    chemicalBehaviorEn: 'Supports combustion and forms oxides with virtually all elements except noble gases. Forms water with hydrogen and causes oxidation/corrosion on metals.',
    chemicalBehaviorAr: 'يغذي الاحتراق ويكوّن أكاسيد مع جميع العناصر تقريباً باستثناء الغازات الخاملة. يتحد مع الهيدروجين مكوّناً الماء، ويسبب أكسدة المعادن.',
    usesEn: [
      'Cellular respiration for aerobic life on Earth',
      'Medical life support, oxygen therapy, and hyperbaric medicine',
      'Liquid rocket oxidizer (LOX) for space propulsion',
      'Oxy-acetylene welding and industrial steel refining'
    ],
    usesAr: [
      'التنفس الخلوي لجميع الكائنات الحية الهوائية على الأرض',
      'العلاج الطبي والتنفس الصناعي في المستشفيات وغرف العناية المركزة',
      'مؤكسد أساسي لوقود الصواريخ الفضائية (LOX)',
      'أفران صهر وتكرير الفولاذ ولحام الأكسي-أسيتيلين عالي الحرارة'
    ],
    interestingFactsEn: [
      'Makes up ~21% of Earth’s atmosphere by volume and ~46% of Earth’s crust by mass (mostly bound in silicates).',
      'Liquid oxygen can be suspended between the poles of a strong neodymium magnet.'
    ],
    interestingFactsAr: [
      'يُشكّل حوالي 21% من حجم الغلاف الجوي و46% من كتلة القشرة الأرضية (مرتبطاً بالمعادن).',
      'يمكن تعليق قطرات الأكسجين السائل في الهواء بين قطبي مغناطيس نيوديميوم قوي لخاصيته البارامغناطيسية.'
    ]
  },

  hydrogen: {
    id: 'hydrogen',
    nameEn: 'Hydrogen',
    nameAr: 'الهيدروجين',
    symbol: 'H',
    atomicNumber: 1,
    categoryEn: 'Reactive Nonmetal (Group 1)',
    categoryAr: 'لافلز نشط (المجموعة 1)',
    stateEn: 'Gas (diatomic, H₂)',
    stateAr: 'غاز (ثنائي الذرة، H₂)',
    density: '0.089 g/L at STP (lightest gas)',
    meltingPoint: '-259.2 °C',
    boilingPoint: '-252.9 °C',
    electronicConfig: '1s¹',
    magneticPropertyEn: 'Diamagnetic',
    magneticPropertyAr: 'ديامغناطيسي',
    conductivityEn: 'Insulator (transforms into metallic superconductor under mega-bar pressures)',
    conductivityAr: 'عازل (يتحول إلى موصل فائق معدني تحت ضغوط تفوق ملايين الضغوط الجوية)',
    reactivityEn: 'High with oxidizers; explosive when mixed with oxygen and sparked',
    reactivityAr: 'عالي النشاط مع المؤكسدات؛ ينفجر عند خلطه بالأكسجين ووجود شرارة',
    colorEn: 'Colorless, odorless, tasteless',
    colorAr: 'عديم اللون والرائحة والطعم',
    chemicalBehaviorEn: 'Combines with oxygen in a rapid exothermic reaction producing water (2H₂ + O₂ → 2H₂O). Acts as a reducing agent.',
    chemicalBehaviorAr: 'يتحد مع الأكسجين في تفاعل طارد للحرارة مكوّناً الماء النقي (2H₂ + O₂ → 2H₂O). يعمل كعامل مختزل قوي.',
    usesEn: [
      'Clean zero-emission fuel cell energy carrier (water vapor is the only emission)',
      'Haber-Bosch industrial ammonia synthesis for world fertilizers',
      'Rocket fuel for NASA and ESA orbital launchers',
      'Hydrocracking and sulfur removal in petroleum refining'
    ],
    usesAr: [
      'ناقل طاقة نظيف لخلايا الوقود بدون انبعاثات كربونية (الماء هو الناتج الوحيد)',
      'تخليق الأمونيا صناعياً (طريقة هابر-بوش) لإنتاج الأسمدة الزراعية العالمية',
      'وقود دفع لصواريخ الفضاء الكبرى',
      'عمليات التكسير الهيدروجيني وإزالة الكبريت في مصافي البترول'
    ],
    interestingFactsEn: [
      'Accounts for approximately 75% of all baryonic elemental mass in the universe.',
      'Powers the thermonuclear fusion reactions inside the Sun and all stars.'
    ],
    interestingFactsAr: [
      'يُمثل قرابة 75% من الكتلة الباريونية الكلية للكون المنظور.',
      'هو الوقود الأساسي للاندماج النووي الحراري داخل الشمس وكافة النجوم.'
    ]
  },

  carbon: {
    id: 'carbon',
    nameEn: 'Carbon',
    nameAr: 'الكربون',
    symbol: 'C',
    atomicNumber: 6,
    categoryEn: 'Nonmetal (Group 14)',
    categoryAr: 'لافلز (المجموعة 14)',
    stateEn: 'Solid (allotropes include graphite, diamond, fullerenes, graphene)',
    stateAr: 'صلب (له تآصلات متعددة كالجرافيت والماس والفوليرين والجرافين)',
    density: '2.26 g/cm³ (Graphite), 3.51 g/cm³ (Diamond)',
    meltingPoint: '3550 °C (sublimes at ~3900 °C)',
    boilingPoint: '4827 °C',
    electronicConfig: '[He] 2s² 2p²',
    magneticPropertyEn: 'Diamagnetic',
    magneticPropertyAr: 'ديامغناطيسي',
    conductivityEn: 'Graphite conducts electricity well due to delocalized pi electrons; Diamond is an electrical insulator but superior thermal conductor',
    conductivityAr: 'الجرافيت موصل كهربائي جيد لوجود إلكترونات باي الحرة؛ بينما الماس عازل للكهرباء وموصل فائق للحرارة',
    reactivityEn: 'Moderate at standard temps; reacts with oxygen at elevated temperatures to form CO and CO₂',
    reactivityAr: 'متوسط في درجات الحرارة العادية؛ يحترق في الأكسجين عند التسخين مكوّناً CO₂ وCO',
    colorEn: 'Black/charcoal in graphite; transparent/sparkling in diamond',
    colorAr: 'أسود فحمي في الجرافيت؛ شفاف ساطع متلألئ في الماس',
    chemicalBehaviorEn: 'Capable of forming 4 covalent bonds (catenation), creating stable chains, rings, and complex branched polymers forming the bedrock of organic chemistry.',
    chemicalBehaviorAr: 'قادر على تكوين 4 روابط تساهمية قوية مع نفسه ومع عناصر أخرى، مكوّناً سلاسل وحلقات مستقرة هي أساس الكيمياء العضوية والحياة.',
    usesEn: [
      'Basis of all organic biochemistry, DNA, proteins, and carbohydrates',
      'Structural carbon fiber composites for aerospace, Formula 1, and sports gear',
      'Steel alloying (iron + carbon)',
      'Lithium-ion battery anodes (graphite) and supermaterials (graphene)'
    ],
    usesAr: [
      'أساس الكيمياء الحيوية العضوية والحمض النووي (DNA) والبروتينات في الكائنات الحية',
      'ألياف الكربون فائقة القوة وخفيفة الوزن في طائرات المستقبل وسيارات الفورمولا 1',
      'تصنيع الفولاذ عن طريق دمجه بنسب دقيقة مع الحديد',
      'مصاعد بطاريات الليثيوم-أيون (جرافيت) وأبحاث النانو تكنولوجي (جرافين)'
    ],
    interestingFactsEn: [
      'Diamond and graphite are made of the exact same element (carbon), yet diamond is the hardest natural mineral while graphite is soft enough to write on paper.',
      'Graphene is a one-atom-thick sheet of carbon that is 200 times stronger than structural steel.'
    ],
    interestingFactsAr: [
      'الماس والجرافيت كلاهما كربون نقي 100%؛ لكن الماس أصلب مادة طبيعية والجرافيت هش يُكتب به قلم الرصاص!',
      'الجرافين شريحة كربونية بسمك ذرة واحدة فقط، لكنها أقوى من الفولاذ بـ 200 مرة.'
    ]
  },

  titanium: {
    id: 'titanium',
    nameEn: 'Titanium',
    nameAr: 'التيتانيوم',
    symbol: 'Ti',
    atomicNumber: 22,
    categoryEn: 'Transition Metal (Group 4)',
    categoryAr: 'فلز انتقالي (المجموعة 4)',
    stateEn: 'Solid',
    stateAr: 'صلب',
    density: '4.51 g/cm³ (45% lighter than steel)',
    meltingPoint: '1668 °C',
    boilingPoint: '3287 °C',
    electronicConfig: '[Ar] 3d² 4s²',
    magneticPropertyEn: 'Paramagnetic',
    magneticPropertyAr: 'بارامغناطيسي',
    conductivityEn: 'Moderate electrical and thermal conductor',
    conductivityAr: 'موصل متوسط للكهرباء والحرارة',
    reactivityEn: 'Low at room temperature due to an impervious titanium dioxide (TiO₂) oxide barrier',
    reactivityAr: 'منخفض في حرارة الغرفة لتكون طبقة أكسيد تيتانيوم (TiO₂) واقية وفائقة الصلابة',
    colorEn: 'Lustrous silvery-grey',
    colorAr: 'رمادي فضي لامع',
    chemicalBehaviorEn: 'Highly resistant to corrosion by seawater, aqua regia, and chlorine. Osseointegrates biocompatibly with human bone tissue.',
    chemicalBehaviorAr: 'شديد المقاومة للتآكل في مياه البحر والأحماض والكلور. يلتحم حيوياً بشكل مباشر مع خلايا العظام البشرية دون رفض مناعي.',
    usesEn: [
      'Aerospace jet engines, military airframes, and spacecraft structures',
      'Orthopedic bone implants, prosthetic joints, and dental screws',
      'Titanium dioxide (TiO₂) white pigment in paints, sunscreens, and food coatings'
    ],
    usesAr: [
      'محركات الطائرات النفاثة وهياكل المركبات الفضائية لصلابته وخفة وزنه',
      'المفاصل الصناعية والمسامير العظمية وزراعات الأسنان الحيوية',
      'صناعة أكسيد التيتانيوم كصبغة بيضاء فائقة في الدهانات وواقيات الشمس'
    ],
    interestingFactsEn: [
      'It has the highest strength-to-density ratio of any metallic element.',
      'The SR-71 Blackbird spy plane was constructed predominantly from titanium to withstand skin friction temperatures exceeding 300 °C.'
    ],
    interestingFactsAr: [
      'يمتلك أعلى نسبة قوة إلى وزن بين كافة الفلزات في الجدول الدوري.',
      'صُنعت طائرة التجسس الأسطورية SR-71 Blackbird بنسبة 93% من التيتانيوم لتحمل درجات حرارة الاحتكاك الجوي الفائقة.'
    ]
  },

  water: {
    id: 'water',
    nameEn: 'Water',
    nameAr: 'الماء',
    symbol: 'H₂O',
    atomicNumber: 0,
    categoryEn: 'Polar Inorganic Compound',
    categoryAr: 'مركب غير عضوي قطبي',
    stateEn: 'Liquid',
    stateAr: 'سائل',
    density: '1.00 g/cm³ at 4 °C',
    meltingPoint: '0 °C',
    boilingPoint: '100 °C',
    magneticPropertyEn: 'Diamagnetic',
    magneticPropertyAr: 'ديامغناطيسي',
    conductivityEn: 'Pure water is a poor conductor; conducts when ions are dissolved',
    conductivityAr: 'الماء النقي ضعيف التوصيل؛ لكنه يوصل الكهرباء بكفاءة عند إذابة الأملاح',
    reactivityEn: 'Moderate; universal solvent that participates in hydrolysis and acid-base reactions',
    reactivityAr: 'متوسط؛ مذيب عام يشارك في تفاعلات التحلل المائي والأكسدة والاختزال',
    colorEn: 'Transparent; subtle pale cyan-blue in large volumes',
    colorAr: 'شفاف؛ ويميل للأزرق السماوي عند التراكم بأحجام كبيرة',
    chemicalBehaviorEn: 'Bent polar molecule with a 104.5° bond angle and dynamic hydrogen bonds. Exhibits high surface tension, high specific heat capacity, and anomalous expansion (ice is less dense than water).',
    chemicalBehaviorAr: 'جزيء منحنٍ قطبي بزاوية 104.5 درجة وشبكة روابط هيدروجينية ديناميكية. يتميز بسعة حرارية نوعية عالية وتمدد شاذ (الجليد أقل كثافة من الماء السائل فيطفو).',
    usesEn: [
      'Universal biological solvent essential for all cellular processes',
      'Industrial coolant, power generation via steam turbines, and agriculture',
      'Chemical medium for countless synthesis and biochemical pathways'
    ],
    usesAr: [
      'المذيب الحيوي الأساسي لجميع العمليات الخلوية في الكائنات الحية',
      'وسيط تبريد وتوليد طاقة في التوربينات البخارية والري الزراعي',
      'الوسط الأساسي لأغلب التفاعلات الكيميائية والمحاليل'
    ],
    interestingFactsEn: [
      'Water is one of the few natural substances that expands when it freezes, allowing aquatic life to survive under frozen lake sheets.',
      'Possesses the highest specific heat capacity of any common liquid, buffering global planetary climate.'
    ],
    interestingFactsAr: [
      'من المواد النادرة التي تتمدد عند تجمدها، مما يجعل الجليد يطفو ويحمي الكائنات البحرية تحته من التجمد.',
      'يمتلك أعلى سعة حرارية نوعية لسائل طبيعي، وهو ما ينظم مناخ كوكب الأرض.'
    ]
  },

  salt: {
    id: 'salt',
    nameEn: 'Sodium Chloride (Table Salt)',
    nameAr: 'كلوريد الصوديوم (ملح الطعام)',
    symbol: 'NaCl',
    atomicNumber: 0,
    categoryEn: 'Ionic Salt / Halite Mineral',
    categoryAr: 'مركب أيوني / معدن الهاليت',
    stateEn: 'Solid (cubic crystalline)',
    stateAr: 'صلب (بلورات مكعبة)',
    density: '2.16 g/cm³',
    meltingPoint: '801 °C',
    boilingPoint: '1465 °C',
    magneticPropertyEn: 'Diamagnetic',
    magneticPropertyAr: 'ديامغناطيسي',
    conductivityEn: 'Solid crystal is an insulator; conducts electricity excellently when molten or dissolved in water (electrolytes)',
    conductivityAr: 'البلورة الصلبة عازلة؛ لكنها فائقة التوصيل للكهرباء عند صهرها أو إذابتها في الماء لوجود الأيونات الحرة',
    reactivityEn: 'Stable; undergoes precipitation with silver nitrate forming insoluble AgCl',
    reactivityAr: 'مستقر كيميائياً؛ يترسب عند خلطه مع نترات الفضة مكوّناً AgCl أبيض',
    colorEn: 'White / transparent crystalline',
    colorAr: 'أبيض / بلوري شفاف',
    chemicalBehaviorEn: 'Formed by the complete ionic transfer of a 3s electron from sodium to chlorine, creating Na⁺ and Cl⁻ ions arranged in a face-centered cubic lattice.',
    chemicalBehaviorAr: 'يتكون عبر انتقال أيوني كامل لإلكترون من الصوديوم إلى الكلور، مشكلاً أيونات Na⁺ وCl⁻ مرتبة في شبكة مكعبة مركزية الوجه.',
    usesEn: [
      'Human diet electrolyte balance and food preservation',
      'Chemical feed for the chlor-alkali industry (producing chlorine and NaOH)',
      'Road de-icing via freezing point depression'
    ],
    usesAr: [
      'التوازن الأيوني في جسم الإنسان وحفظ الأغذية',
      'المادة الخام لصناعة الكلور وهيدروكسيد الصوديوم عالمياً',
      'إذابة الجليد عن الطرق عبر خفض نقطة تجمد الماء'
    ],
    interestingFactsEn: [
      'Sodium is a violent metal that catches fire in water, and chlorine is a toxic suffocating gas, yet their compound is essential for human life!',
      'Roman soldiers were historically paid a salt allowance called a "salarium", the root of the word "salary".'
    ],
    interestingFactsAr: [
      'الصوديوم معدن يشتعل في الماء، والكلور غاز سام خانق، لكن اتحادهما يُنتج ملحاً آمناً لا غنى عنه للحياة!',
      'كان الجنود الرومان يتقاضون قديماً بدلاً من الملح يُسمى "salarium"، ومنها اشتُقت كلمة راتب (Salary).'
    ]
  },

  silver: {
    id: 'silver',
    nameEn: 'Silver',
    nameAr: 'الفضة',
    symbol: 'Ag',
    atomicNumber: 47,
    categoryEn: 'Precious Transition Metal (Group 11)',
    categoryAr: 'فلز انتقالي ثمين (المجموعة 11)',
    stateEn: 'Solid',
    stateAr: 'صلب',
    density: '10.49 g/cm³',
    meltingPoint: '961.8 °C',
    boilingPoint: '2162 °C',
    electronicConfig: '[Kr] 4d¹⁰ 5s¹',
    magneticPropertyEn: 'Diamagnetic',
    magneticPropertyAr: 'ديامغناطيسي',
    conductivityEn: 'Highest electrical conductivity (63 MS/m) and thermal conductivity of any known element on Earth',
    conductivityAr: 'صاحب أعلى موصلية كهربائية (63 ميجا سيمنز/متر) وحرارية بين جميع العناصر على وجه الأرض',
    reactivityEn: 'Low; unreactive with pure oxygen or water, but tarnishes with airborne sulfur compounds (H₂S) forming black Ag₂S',
    reactivityAr: 'منخفض؛ لا يتأكسد مع الأكسجين النقي، لكنه يتفاعل مع كبريتيد الهيدروجين الجوي مكوّناً طبقة كبريتيد الفضة السوداء',
    colorEn: 'Brilliant mirror-reflective silvery-white luster',
    colorAr: 'أبيض فضي فائق اللمعان يعكس الضوء بنسبة 95%',
    chemicalBehaviorEn: 'Resistant to oxidation at room temperature. Tarnishes when exposed to sulfur compounds in air. Dissolves readily in nitric acid (forming AgNO₃). Exhibits potent oligodynamic antibacterial properties.',
    chemicalBehaviorAr: 'يقاوم الأكسدة العادية، لكنه يسود بفعل مركبات الكبريت. يذوب بسهولة في حمض النيتريك مشكلاً نترات الفضة. يمتلك تأثيراً قاتلاً للبكتيريا والميكروبات عبر إطلاق أيونات الفضة.',
    rustingBehaviorEn: 'Silver does not rust. It tarnishes over time through reaction with trace atmospheric hydrogen sulfide (H₂S), creating a superficial black patina of silver sulfide (Ag₂S).',
    rustingBehaviorAr: 'الفضة لا تصدأ. تفقد بريقها ببطء (تسوّد) بتفاعلها مع شوائب كبريتيد الهيدروجين في الهواء لتكوّن طبقة رقيقة سوداء من كبريتيد الفضة (Ag₂S).',
    usesEn: [
      'High-end electronic contact points, photovoltaic solar cell conductive pastes',
      'Optical mirrors with 95% visible light reflectivity',
      'Antimicrobial wound dressings and medical water purification catheters',
      'Jewelry, fine silverware, and bullion currency'
    ],
    usesAr: [
      'الوصلات الإلكترونية الفائقة ومعجون التوصيل لخلايا الطاقة الشمسية الكهروضوئية',
      'طلاء المرايا التلسكوبية لعكس الضوء المرئي بأعلى كفاءة',
      'ضمادات الجروح المعقمة وأجهزة تنقية المياه لخصائص الفضة المضادة للبكتيريا',
      'صناعة الحلي والمجوهرات والعملات الاستثمارية'
    ],
    interestingFactsEn: [
      'Silver has the highest electrical conductivity of any metal, even surpassing copper and gold.',
      'Silver ions rupture bacterial cell membranes on direct contact, making it a natural non-toxic disinfectant used since ancient civilizations.'
    ],
    interestingFactsAr: [
      'الفضة هي المعدن الأكثر توصيلاً للكهرباء في الكون المعروف، وتتفوق حتى على النحاس والذهب.',
      'تدمر أيونات الفضة جدران الخلايا البكتيرية عند ملامستها، لذا استخدمها الرومان والإغريق لحفظ المياه والحليب من الفساد.'
    ]
  },

  aluminum: {
    id: 'aluminum',
    nameEn: 'Aluminum',
    nameAr: 'الألمنيوم',
    symbol: 'Al',
    atomicNumber: 13,
    categoryEn: 'Post-transition Metal (Group 13)',
    categoryAr: 'فلز بعد انتقالي (المجموعة 13)',
    stateEn: 'Solid',
    stateAr: 'صلب',
    density: '2.70 g/cm³ (lightweight)',
    meltingPoint: '660.3 °C',
    boilingPoint: '2470 °C',
    electronicConfig: '[Ne] 3s² 3p¹',
    magneticPropertyEn: 'Paramagnetic',
    magneticPropertyAr: 'بارامغناطيسي',
    conductivityEn: 'High electrical (37.7 MS/m) and thermal conductivity with low mass',
    conductivityAr: 'موصل ممتاز للكهرباء والحرارة مع كثافة منخفضة وخفة وزن استثنائية',
    reactivityEn: 'High; however, instantaneous formation of a nanoscale passivation layer of Al₂O₃ prevents bulk oxidation',
    reactivityAr: 'عالي النشاط كيميائياً؛ لكنه يكوّن فوراً طبقة أكسيد واقية مجهرية (Al₂O₃) تمنع التآكل الداخلي تماماً',
    colorEn: 'Silvery-white metallic with a matte passivated sheen',
    colorAr: 'فضي أبيض خفيف غير لامع بسبب طبقة الأكسيد الواقية',
    chemicalBehaviorEn: 'Amphoteric metal: reacts with both strong acids (releasing H₂) and strong bases (forming aluminates). Passivates instantaneously in air to form a 4nm impenetrable Al₂O₃ skin.',
    chemicalBehaviorAr: 'فلز متردد (أمفوتيري): يتفاعل مع الأحماض القوية محرراً الهيدروجين، ويتفاعل أيضاً مع القواعد القوية مكوّناً الألومينات. يكوّن في أجزاء من الثانية طبقة أكسيد نانوية عازلة تحميه.',
    rustingBehaviorEn: 'Aluminum does not rust. Its oxide film (Al₂O₃) self-heals instantaneously when scratched, giving it outstanding weather resistance.',
    rustingBehaviorAr: 'الألمنيوم لا يصدأ. تلتئم طبقة أكسيده (Al₂O₃) تلقائياً وفورياً في الهواء إذا خُدش السطح، مما يمنحه مقاومة هائلة للرطوبة والأمطار.',
    usesEn: [
      'Commercial aircraft airframes, spacecraft fuselages, and automotive body panels',
      'High-voltage overhead electrical power transmission lines',
      'Beverage cans, food-grade foil, and architectural window mullions'
    ],
    usesAr: [
      'هياكل الطائرات التجارية والمركبات الفضائية لصلابته وخفة وزنه',
      'خطوط نقل الكهرباء ذات الجهد العالي عبر الأبراج المعلقة لخفة وزنه مقارنة بالنحاس',
      'علب المشروبات ولفائف حفظ الأغذية والواجهات المعمارية'
    ],
    interestingFactsEn: [
      'Most abundant metal in Earth’s crust (approx. 8.2% of total crustal mass).',
      'In the 1850s, aluminum was rarer and more expensive than gold until the Hall-Héroult electrolytic refining process was invented.'
    ],
    interestingFactsAr: [
      'أكثر الفلزات وفرة في القشرة الأرضية (يُشكل قرابة 8.2% من كتلتها).',
      'في القرن التاسع عشر كان الألمنيوم أندر وأغلى من الذهب، وكان الإمبراطور نابليون الثالث يحتفظ بأدوات مائدة من الألمنيوم لضيوف الشرف بينما يقدم الذهب للآخرين!'
    ]
  },

  zinc: {
    id: 'zinc',
    nameEn: 'Zinc',
    nameAr: 'الزنك (الخارصين)',
    symbol: 'Zn',
    atomicNumber: 30,
    categoryEn: 'Transition Metal (Group 12)',
    categoryAr: 'فلز انتقالي (المجموعة 12)',
    stateEn: 'Solid',
    stateAr: 'صلب',
    density: '7.14 g/cm³',
    meltingPoint: '419.5 °C',
    boilingPoint: '907 °C',
    electronicConfig: '[Ar] 3d¹⁰ 4s²',
    magneticPropertyEn: 'Diamagnetic',
    magneticPropertyAr: 'ديامغناطيسي',
    conductivityEn: 'Moderate electrical (16.6 MS/m) and thermal conductor',
    conductivityAr: 'موصل متوسط للكهرباء والحرارة',
    reactivityEn: 'Moderate; acts as a sacrificial anode to protect iron against corrosion',
    reactivityAr: 'متوسط؛ يعمل كمصعد مضحي لحماية الحديد من الصدأ عبر الجلفنة',
    colorEn: 'Bluish-white lustrous crystalline metal',
    colorAr: 'أبيض مائل للزرقة ذو بلورات واضحة المظهر',
    chemicalBehaviorEn: 'Reactivity is higher than iron. In air, forms basic zinc carbonate which shields the metal. Dissolves in non-oxidizing acids releasing hydrogen gas.',
    chemicalBehaviorAr: 'أنشط كيميائياً من الحديد. يتفاعل مع الأكسجين والرطوبة مكوّناً كربونات الزنك القاعدية الواقية. يذوب في الأحماض محرراً غاز الهيدروجين.',
    usesEn: [
      'Galvanization coating to prevent steel from rusting (sacrificial anode)',
      'Brass alloy synthesis (Copper + Zinc)',
      'Die-casting of precision automotive components',
      'Biological immune enzymes (Carbonic anhydrase, DNA polymerases)'
    ],
    usesAr: [
      'جلفنة الفولاذ والحديد لحمايتهما من التآكل (قطب مضحي)',
      'صناعة سبيكة النحاس الأصفر (البرونز/البراس: نحاس + زنك)',
      'المسبوكات الدقيقة في هياكل محركات السيارات',
      'عنصر حيوي أساسي لوظائف الإنزيمات والمناعة وتصنيع البروتين في جسم الإنسان'
    ],
    interestingFactsEn: [
      'More than 50% of the world’s zinc production is used specifically to protect iron from rusting through hot-dip galvanizing.',
      'Zinc is essential for the sense of smell and taste in human biology.'
    ],
    interestingFactsAr: [
      'أكثر من 50% من إنتاج الزنك العالمي يُستخدم خصيصاً لجلفنة الحديد لمنعه من الصدأ.',
      'نقص الزنك في جسم الإنسان يؤدي لفقدان حاستي الشم والتذوق وضعف جهاز المناعة.'
    ]
  },

  magnesium: {
    id: 'magnesium',
    nameEn: 'Magnesium',
    nameAr: 'المغنيسيوم',
    symbol: 'Mg',
    atomicNumber: 12,
    categoryEn: 'Alkaline Earth Metal (Group 2)',
    categoryAr: 'فلز قلوي ترابي (المجموعة 2)',
    stateEn: 'Solid',
    stateAr: 'صلب',
    density: '1.74 g/cm³ (ultralight metal)',
    meltingPoint: '650 °C',
    boilingPoint: '1091 °C',
    electronicConfig: '[Ne] 3s²',
    magneticPropertyEn: 'Paramagnetic',
    magneticPropertyAr: 'بارامغناطيسي',
    conductivityEn: 'High electrical and thermal conductivity',
    conductivityAr: 'موصل جيد للحرارة والكهرباء مع خفة وزن تفوق الألمنيوم',
    reactivityEn: 'High; burns with a blinding brilliant white flame to produce MgO',
    reactivityAr: 'عالي النشاط؛ يشتعل في الهواء بلهب أبيض متوهج يعمي البصر لينتج أكسيد المغنيسيوم',
    colorEn: 'Silvery-white shiny metal',
    colorAr: 'فضي أبيض لامع وخفيف الوزن جداً',
    chemicalBehaviorEn: 'Readily oxidizes. Burns vigorously in air releasing intense UV radiation and heat (2Mg + O₂ → 2MgO). Reacts slowly with cold water and rapidly with boiling water/acids releasing H₂.',
    chemicalBehaviorAr: 'يتأكسد بسهولة. يشتعل في الهواء مسبباً وميضاً أبيض شديد السطوع مع أشعة فوق بنفسجية. يتفاعل مع بخار الماء والأحماض ليحرر غاز الهيدروجين.',
    usesEn: [
      'Ultralight structural alloys for motorsport wheels, camera bodies, and laptops',
      'Pyrotechnic flares, fireworks, and emergency incendiary torches',
      'Central coordinating cation in plant chlorophyll for photosynthesis',
      'Desulfurizing molten pig iron in steel manufacturing'
    ],
    usesAr: [
      'سبائك خفيفة جداً لإطارات سيارات السباق، وهياكل الحواسيب المحمولة والكاميرات',
      'المشاعل الضوئية التحذيرية، الألعاب النارية، والمقذوفات الفوسفورية المضيئة',
      'الأيون المركزي في جزيء الكلوروفيل الأخضر المسؤول عن البناء الضوئي في النباتات',
      'إزالة الكبريت من الحديد المصهور في أفران إنتاج الفولاذ'
    ],
    interestingFactsEn: [
      'Magnesium fires cannot be extinguished with water! Adding water causes an explosive reaction producing flammable hydrogen gas.',
      'Chlorophyll in plants is structurally identical to human hemoglobin, except magnesium sits at its center instead of iron.'
    ],
    interestingFactsAr: [
      'لا يمكن إطفاء حرائق المغنيسيوم بالماء! لأن الماء يتفكك حرارياً ليولد غاز الهيدروجين ويزيد الانفجار اشتعالاً.',
      'جزيء الكلوروفيل في النبات يشبه تماماً هيموجلوبين الدم في الإنسان، لكن مع استبدال ذرة الحديد بذرة مغنيسيوم في المركز!'
    ]
  },

  sulfur: {
    id: 'sulfur',
    nameEn: 'Sulfur',
    nameAr: 'الكبريت',
    symbol: 'S',
    atomicNumber: 16,
    categoryEn: 'Reactive Nonmetal / Chalcogen (Group 16)',
    categoryAr: 'لافلز نشط / كالكوجين (المجموعة 16)',
    stateEn: 'Solid (crystalline octasulfur rings, S₈)',
    stateAr: 'صلب (بلورات حلقية ثمانية، S₈)',
    density: '2.07 g/cm³',
    meltingPoint: '115.2 °C',
    boilingPoint: '444.6 °C',
    electronicConfig: '[Ne] 3s² 3p⁴',
    magneticPropertyEn: 'Diamagnetic',
    magneticPropertyAr: 'ديامغناطيسي',
    conductivityEn: 'Electrical and thermal insulator',
    conductivityAr: 'عازل تماماً للكهرباء والحرارة',
    reactivityEn: 'High; burns with a pale blue flame to form toxic choking SO₂ gas',
    reactivityAr: 'عالي النشاط؛ يحترق بلهب أزرق باهت منتجاً غاز ثاني أكسيد الكبريت الخانق (SO₂)',
    colorEn: 'Bright lemon-yellow crystalline powder or crystals',
    colorAr: 'أصفر ليموني ساطع فاقع',
    chemicalBehaviorEn: 'Forms sulfides with almost all metals (reacts violently with iron powder when heated: Fe + S → FeS). Burns in air: S + O₂ → SO₂. Forms sulfuric acid (H₂SO₄), the world’s most produced chemical.',
    chemicalBehaviorAr: 'يتحد مع معظم المعادن ليكوّن الكبريتيدات (يتفاعل بشدة مع برادة الحديد عند التسخين: Fe + S → FeS). يحترق بالأكسجين منتجاً SO₂، ويُصنع منه حمض الكبريتيك أهم الأحماض الصناعية.',
    usesEn: [
      'Industrial synthesis of sulfuric acid (H₂SO₄) for phosphate fertilizer production',
      'Vulcanization of natural rubber for automotive tires',
      'Gunpowder / Black powder propellant',
      'Dermatological ointments and antifungal agricultural treatments'
    ],
    usesAr: [
      'إنتاج حمض الكبريتيك المركز المستخدم في صناعة الأسمدة الزراعية الفوسفاتية',
      'فلكنة المطاط الطبيعي لإكساب إطارات السيارات صلابتها ومرونتها ومقاومة الحرارة',
      'صناعة البارود الأسود والألعاب النارية',
      'المراهم الطبية ومبيدات الفطريات الزراعية'
    ],
    interestingFactsEn: [
      'Jupiter’s volcanic moon Io is covered in yellow and red sulfur lakes, colored by volcanic eruptions.',
      'Pure solid sulfur is completely odorless; the notorious "rotten egg" smell comes from hydrogen sulfide gas (H₂S).'
    ],
    interestingFactsAr: [
      'قمر المشتري "آيو" تغطيه براكين وبحيرات شاسعة من الكبريت السائل المنصهر.',
      'الكبريت الصلب النقي لا رائحة له إطلاقاً؛ بينما رائحة البيض الفاسد الشهيرة تصدر من غاز كبريتيد الهيدروجين (H₂S).'
    ]
  },

  calcium: {
    id: 'calcium',
    nameEn: 'Calcium',
    nameAr: 'الكالسيوم',
    symbol: 'Ca',
    atomicNumber: 20,
    categoryEn: 'Alkaline Earth Metal (Group 2)',
    categoryAr: 'فلز قلوي ترابي (المجموعة 2)',
    stateEn: 'Solid',
    stateAr: 'صلب',
    density: '1.54 g/cm³',
    meltingPoint: '842 °C',
    boilingPoint: '1484 °C',
    electronicConfig: '[Ar] 4s²',
    magneticPropertyEn: 'Diamagnetic',
    magneticPropertyAr: 'ديامغناطيسي',
    conductivityEn: 'Good electrical and thermal conductor',
    conductivityAr: 'موصل جيد للحرارة والكهرباء',
    reactivityEn: 'High; reacts steadily with water releasing hydrogen gas and forming Ca(OH)₂',
    reactivityAr: 'عالي النشاط؛ يتفاعل بانتظام مع الماء محرراً غاز الهيدروجين ومكوّناً هيدروكسيد الكالسيوم',
    colorEn: 'Dull silvery-gray with a yellowish tarnish',
    colorAr: 'رمادي فضي باهت يتأكسد سريعاً في الهواء',
    chemicalBehaviorEn: 'Loses two valence electrons to form Ca²⁺ ions. Reacts with water: Ca + 2H₂O → Ca(OH)₂ + H₂. Forms limestone and marble (CaCO₃), gypsum (CaSO₄), and bone mineral hydroxyapatite.',
    chemicalBehaviorAr: 'يفقد إلكتروني تكافؤ ليتحول إلى أيون Ca²⁺. يتفاعل مع الماء محرراً الهيدروجين. يُشكل صخور الحجر الجيري والرخام (CaCO₃)، والجبس، ومعدن الهيدروكسي أباتيت المكون لعظام الإنسان.',
    usesEn: [
      'Structural foundation of human skeleton, teeth, and cellular signaling',
      'Portland cement and concrete construction industry',
      'Reducing agent in the extraction of uranium and thorium metals'
    ],
    usesAr: [
      'المكون المعدني الأساسي للهيكل العظمي والأسنان ونقل الإشارات العصبية العضلية',
      'صناعة الإسمنت والخرسانة المسلحة وحجر البناء',
      'عامل اختزال لصهر وتنقية معادن اليورانيوم والثوريوم'
    ],
    interestingFactsEn: [
      'Fifth most abundant element by mass in the Earth’s crust and in the human body.',
      'The white chalk used on blackboards is made of calcium carbonate (CaCO₃).'
    ],
    interestingFactsAr: [
      'خامس أكثر العناصر وفرة في القشرة الأرضية وفي جسم الإنسان.',
      'الطباشير الأبيض وأصداف الكائنات البحرية وحجر الرخام الفاخر كلها تتكون من نفس المركب: كربونات الكالسيوم (CaCO₃).'
    ]
  },

  potassium: {
    id: 'potassium',
    nameEn: 'Potassium',
    nameAr: 'البوتاسيوم',
    symbol: 'K',
    atomicNumber: 19,
    categoryEn: 'Alkali Metal (Group 1)',
    categoryAr: 'فلز قلوي (المجموعة 1)',
    stateEn: 'Solid (very soft, cuts like butter)',
    stateAr: 'صلب (شديد الليونة يُقطع كقطعة الزبدة)',
    density: '0.86 g/cm³ (floats on water)',
    meltingPoint: '63.5 °C',
    boilingPoint: '759 °C',
    electronicConfig: '[Ar] 4s¹',
    magneticPropertyEn: 'Paramagnetic',
    magneticPropertyAr: 'بارامغناطيسي',
    conductivityEn: 'High electrical and thermal conductor',
    conductivityAr: 'موصل جيد للحرارة والكهرباء',
    reactivityEn: 'Extremely high; reacts explosively with water producing lilac/violet flames',
    reactivityAr: 'فائق النشاط الكيميائي؛ يتفاعل بعنف وانفجار مع الماء ويشتعل بلهب بنفسجي خلاب',
    colorEn: 'Silvery-white, tarnishes to gray in seconds',
    colorAr: 'فضي أبيض يبهت إلى الرمادي فور تعرضه للهواء',
    chemicalBehaviorEn: 'Has a single 4s¹ valence electron with very low ionization energy. Reacts violently with water: 2K + 2H₂O → 2KOH + H₂ ↑, generating enough heat to ignite the hydrogen with a lilac-purple flame.',
    chemicalBehaviorAr: 'يمتلك إلكترون تكافؤ وحيداً في المدار 4s بطاقة تأين منخفضة جداً. يتفاعل بعنف مفرط مع الماء ليعطي هيدروكسيد البوتاسيوم ويطلق غاز الهيدروجين الذي يشتعل بلهب بنفسجي مميز.',
    usesEn: [
      'Agricultural NPK fertilizers (potash) indispensable for crop yields worldwide',
      'Biological cardiac pulse regulation and nerve action potentials',
      'Potassium superoxide (KO₂) used in submarine and spacecraft rebreathers to generate oxygen'
    ],
    usesAr: [
      'الأسمدة الزراعية العالمية (البوتاس) لتعزيز نمو المحاصيل وإنتاج الغذاء',
      'تنظيم ضربات القلب وضغط الدم والنبضات العصبية في الكائنات الحية',
      'فوق أكسيد البوتاسيوم (KO₂) لتوليد الأكسجين وامتصاص CO₂ في الغواصات ومركبات الفضاء'
    ],
    interestingFactsEn: [
      'A small fraction of natural potassium is radioactive (Potassium-40), making everyday bananas slightly radioactive!',
      'Less dense than water, meaning it floats while combusting into lilac-colored flames.'
    ],
    interestingFactsAr: [
      'نسبة ضئيلة من البوتاسيوم الطبيعي هي نظير مشع (بوتاسيوم-40)، لذا فإن الموز الطبيعي يمتلك نشاطاً إشعاعياً طفيفاً قابلاً للقياس!',
      'أخف من الماء، لذا يطفو فوق السطح أثناء اشتعاله بلهبه البنفسجي الشهير.'
    ]
  },

  carbon_dioxide: {
    id: 'carbon_dioxide',
    nameEn: 'Carbon Dioxide',
    nameAr: 'ثاني أكسيد الكربون',
    symbol: 'CO₂',
    atomicNumber: 0,
    categoryEn: 'Linear Covalent Gas Molecule',
    categoryAr: 'مركب تساهمي غازي خطي',
    stateEn: 'Gas',
    stateAr: 'غاز',
    density: '1.98 g/L at STP (1.5x heavier than air)',
    meltingPoint: '-78.5 °C (sublimes into Dry Ice)',
    boilingPoint: '-56.6 °C at 5.1 atm',
    magneticPropertyEn: 'Diamagnetic',
    magneticPropertyAr: 'ديامغناطيسي',
    conductivityEn: 'Electrical insulator',
    conductivityAr: 'عازل للكهرباء',
    reactivityEn: 'Low to moderate; greenhouse gas, combines with water to form carbonic acid (H₂CO₃)',
    reactivityAr: 'منخفض إلى معتدل؛ يذوب في الماء مكوّناً حمض الكربونيك الضعيف (H₂CO₃)',
    colorEn: 'Colorless and odorless',
    colorAr: 'غاز عديم اللون والرائحة',
    chemicalBehaviorEn: 'Linear nonpolar molecule with polar double bonds (O=C=O). Sublimes directly from solid (dry ice) to gas at -78.5 °C without passing through a liquid phase at atmospheric pressure.',
    chemicalBehaviorAr: 'جزيء خطي غير قطبي بروابط ثنائية متماثلة (O=C=O). يتسامى مباشرة من الحالة الصلبة (الجليد الجاف) إلى الغاز عند -78.5 مئوية دون المرور بالحالة السائلة تحت الضغط الجوي العادي.',
    usesEn: [
      'Photosynthesis carbon feedstock for all plant life on Earth',
      'Beverage carbonation (soda fizz) and dry ice cryogenic cooling',
      'Fire extinguishers for electrical fires (displaces oxygen)',
      'Supercritical CO₂ decaffeination of coffee beans and green extraction'
    ],
    usesAr: [
      'المادة الخام لعملية البناء الضوئي في النباتات والغابات لإنتاج الأكسجين والكتلة الحيوية',
      'فوران المشروبات الغازية والتبريد الفائق عبر الجليد الجاف',
      'طفايات الحرائق الكهربائية لأنه أثقل من الهواء ويخنق النيران بحجب الأكسجين',
      'استخلاص الكافيين من القهوة كـ مائع فوق حرج صديق للبيئة'
    ],
    interestingFactsEn: [
      'Dry ice does not melt into a liquid under normal atmospheric conditions—it sublimates directly into cold dense gas fog.',
      'Venus’s dense atmosphere is 96.5% CO₂, driving a runaway greenhouse effect that heats the surface to 464 °C.'
    ],
    interestingFactsAr: [
      'الجليد الجاف لا يذوب إلى سائل، بل يتحول فوراً من الصلب إلى الغاز في ظاهرة التسامي مكوّناً سحابة بيضاء باردة.',
      'يشكل CO₂ نحو 96.5% من غلاف كوكب الزهرة، ما يجعله أسخن كوكب في المجموعة الشمسية بحرارة تتجاوز 460 مئوية!'
    ]
  },

  ammonia: {
    id: 'ammonia',
    nameEn: 'Ammonia',
    nameAr: 'الأمونيا (النشادر)',
    symbol: 'NH₃',
    atomicNumber: 0,
    categoryEn: 'Inorganic Hydride / Weak Base',
    categoryAr: 'مركب غير عضوي هيدريدي / قاعدة ضعيفة',
    stateEn: 'Gas (trigonal pyramidal)',
    stateAr: 'غاز (هرمي ثلاثي القاعدة)',
    density: '0.73 g/L (lighter than air)',
    meltingPoint: '-77.7 °C',
    boilingPoint: '-33.3 °C',
    magneticPropertyEn: 'Diamagnetic',
    magneticPropertyAr: 'ديامغناطيسي',
    conductivityEn: 'Insulator as gas; liquid ammonia conducts electrolytes well',
    conductivityAr: 'عازل في حالته الغازية؛ والأمونيا السائلة مذيب ممتاز للأيونات',
    reactivityEn: 'Moderate; basic gas that reacts with acids to form ammonium salts',
    reactivityAr: 'معتدل؛ غاز قلوي يتفاعل مع الأحماض مكوّناً أملاح الأمونيوم',
    colorEn: 'Colorless with a pungent, suffocating odor',
    colorAr: 'غاز عديم اللون ذو رائحة نفاذة حادة جداً وخانقة',
    chemicalBehaviorEn: 'Polar molecule with a lone pair on the nitrogen atom giving it Lewis base characteristics. Readily dissolves in water to form ammonium hydroxide: NH₃ + H₂O ⇌ NH₄⁺ + OH⁻.',
    chemicalBehaviorAr: 'جزيء قطبي يمتلك زوج إلكترونات غير رابط على ذرة النيتروجين يمنحه صفات القاعدة القوية. يذوب بغزارة في الماء مشكلاً هيدروكسيد الأمونيوم القاعدي.',
    usesEn: [
      'Precursor to over 85% of all synthetic nitrogen fertilizers in agriculture',
      'Industrial refrigeration systems in food processing facilities',
      'Household glass and surface cleaners'
    ],
    usesAr: [
      'تصنيع أكثر من 85% من الأسمدة النيتروجينية عالمياً لتغذية المحاصيل',
      'سوائل التبريد في المصانع الكبرى والمستودعات الغذائية لارتفاع حرارة تبخره',
      'منظفات الزجاج والأسطح المنزلية لإذابة الدهون'
    ],
    interestingFactsEn: [
      'The industrial Haber-Bosch process synthesizing ammonia from air and natural gas sustains over half the current global human population’s food supply.',
      'Ammonia is extremely soluble in water: one liter of water can dissolve over 1000 liters of ammonia gas at 0 °C!'
    ],
    interestingFactsAr: [
      'طريقة هابر-بوش الصناعية لتصنيع الأمونيا من النيتروجين والهيدروجين توفر الأسمدة التي تُطعم أكثر من نصف سكان الأرض اليوم.',
      'الأمونيا فائقة الذوبان في الماء؛ فلتر واحد من الماء البارد يمكنه إذابة أكثر من 1000 لتر من غاز الأمونيا!'
    ]
  },

  ethanol: {
    id: 'ethanol',
    nameEn: 'Ethanol (Ethyl Alcohol)',
    nameAr: 'الإيثانول (الكحول الإيثيلي)',
    symbol: 'C₂H₅OH',
    atomicNumber: 0,
    categoryEn: 'Organic Compound / Primary Alcohol',
    categoryAr: 'مركب عضوي / كحول أولي',
    stateEn: 'Liquid',
    stateAr: 'سائل',
    density: '0.789 g/cm³',
    meltingPoint: '-114.1 °C',
    boilingPoint: '78.37 °C',
    magneticPropertyEn: 'Diamagnetic',
    magneticPropertyAr: 'ديامغناطيسي',
    conductivityEn: 'Electrical insulator',
    conductivityAr: 'عازل للكهرباء',
    reactivityEn: 'Flammable liquid; burns cleanly with a clear blue flame into CO₂ and H₂O',
    reactivityAr: 'سائل سريع الاشتعال؛ يحترق بلهب أزرق نقي معطياً CO₂ وبخار الماء',
    colorEn: 'Colorless, transparent volatile liquid with characteristic odor',
    colorAr: 'سائل شفاف متطاير عديم اللون ذو رائحة مميزة',
    chemicalBehaviorEn: 'Miscible in all proportions with water due to hydrogen bonding. Undergoes combustion: C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O. Dehydrates into ethylene gas or oxidizes into acetic acid (vinegar).',
    chemicalBehaviorAr: 'يمتزج بجميع النسب مع الماء بفضل روابطه الهيدروجينية. يحترق معطياً ثاني أكسيد الكربون والماء. يتأكسد ببطء ليعطي حمض الأسيتيك (الخل).',
    usesEn: [
      'Biofuel renewable additive for motor gasoline (E10, E85)',
      'Universal pharmaceutical solvent and antiseptic hand sanitizer (kills 99.9% of microbes)',
      'Cosmetics, perfumes, and chemical synthesis intermediary'
    ],
    usesAr: [
      'وقود حيوي متجدد يُخلط مع بنزين السيارات لتقليل الانبعاثات الكربونية',
      'معقم طبي ومطهر لليدين يقضي على 99.9% من الفيروسات والبكتيريا',
      'مذيب عضوي لصناعة العطور والأدوية ومستحضرات التجميل'
    ],
    interestingFactsEn: [
      'Ethanol has a freezing point of -114.1 °C, allowing it to be used in thermometers for Arctic and Antarctic research.',
      'One of the oldest synthesized organic chemicals in human history, discovered through natural fruit fermentation.'
    ],
    interestingFactsAr: [
      'درجة تجمده منخفضة جداً (-114 مئوية)، لذا يُستخدم في موازين الحرارة في القطبين المتجمدين حيث يتجمد الزئبق.',
      'من أقدم المركبات العضوية التي اكتشفها الإنسان عبر التخمر الطبيعي للسكريات.'
    ]
  },

  sand: {
    id: 'sand',
    nameEn: 'Sand (Silica / Quartz)',
    nameAr: 'الرمل (السيليكا / الكوارتز)',
    symbol: 'SiO₂',
    atomicNumber: 0,
    categoryEn: 'Covalent Network Solid / Mineral',
    categoryAr: 'معدن تساهمي شبكي صلب',
    stateEn: 'Solid (granular crystalline)',
    stateAr: 'صلب (حبيبي بلوري)',
    density: '2.65 g/cm³',
    meltingPoint: '1713 °C',
    boilingPoint: '2950 °C',
    magneticPropertyEn: 'Diamagnetic',
    magneticPropertyAr: 'ديامغناطيسي',
    conductivityEn: 'Electrical and thermal insulator; piezoelectric when cut as quartz',
    conductivityAr: 'عازل للكهرباء والحرارة؛ ويتميز بظاهرة الكهرضغطية (توليد كهرباء بالضغط) في بلورات الكوارتز',
    reactivityEn: 'Extremely inert; unaffected by water and almost all acids except hydrofluoric acid (HF)',
    reactivityAr: 'خامل جداً؛ لا يتأثر بالماء ومعظم الأحماض باستثناء حمض الهيدروفلوريك (HF)',
    colorEn: 'Translucent tan, golden, or white grains',
    colorAr: 'حبيبات بلورية ذهبية أو بيضاء أو بيج نصف شفافة',
    chemicalBehaviorEn: 'Continuous giant 3D covalent network of silicon atoms bonded tetrahedrally to 4 oxygen atoms. When melted with soda ash (Na₂CO₃) and limestone (CaCO₃) and rapidly cooled, it forms non-crystalline amorphous glass.',
    chemicalBehaviorAr: 'شبكة تساهمية ثلاثية الأبعاد عملاقة ترتبط فيها كل ذرة سيليكون بأربع ذرات أكسجين. عند صهره بدرجات حرارة عالية مع كربونات الصوديوم وتبريده بسرعة، يتحول إلى زجاج غير متبلور.',
    usesEn: [
      'Raw precursor for glass manufacturing and vitreous ceramics',
      'Construction aggregate for all civil concrete, asphalt, and mortar',
      'Pure silicon extraction feedstock for microchips, transistors, and solar wafers',
      'Hydraulic fracturing and water filtration substrate'
    ],
    usesAr: [
      'المادة الخام الأساسية لصناعة جميع أنواع الزجاج والأواني والسيراميك',
      'الركام الأساسي للخرسانة المسلحة والمباني والطرقات والجسور',
      'استخلاص السيليكون فائق النقاء لصناعة الرقائق الإلكترونية والمعالجات وخلايا الطاقة الشمسية',
      'تنقية وترشيح مياه الشرب في محطات المعالجة'
    ],
    interestingFactsEn: [
      'Every single modern computer CPU, smartphone processor, and solar panel begins its journey as plain quartz sand (SiO₂)!',
      'Quartz crystals oscillate at an exact frequency of 32,768 Hz when voltage is applied, keeping time in wristwatches.'
    ],
    interestingFactsAr: [
      'كل معالج حاسوب ورقاقة هاتف ذكي وخلايا شمسية في العالم بدأت رحلتها كحبات رمل كوارتز عادية!',
      'تهتز بلورات الكوارتز بتردد دقيق للغاية (32768 هرتز) عند مرور تيار كهربائي، وهو ما يحافظ على دقة ساعات اليد في العالم.'
    ]
  },

  glass: {
    id: 'glass',
    nameEn: 'Glass (Fused Silica / Silicate Glass)',
    nameAr: 'الزجاج',
    symbol: 'SiO₂·Na₂O·CaO',
    atomicNumber: 0,
    categoryEn: 'Amorphous Inorganic Solid',
    categoryAr: 'مادة صلبة غير متبلورة لا بلورية',
    stateEn: 'Solid (amorphous supercooled network)',
    stateAr: 'صلب (شبكة لابلورية مفرطة التبريد)',
    density: '2.50 g/cm³',
    meltingPoint: '1400 - 1600 °C (softens smoothly)',
    magneticPropertyEn: 'Diamagnetic',
    magneticPropertyAr: 'ديامغناطيسي',
    conductivityEn: 'Superior electrical and thermal insulator',
    conductivityAr: 'عازل فائق وممتاز للكهرباء والحرارة',
    reactivityEn: 'Chemically inert; resistant to water, weather, and nearly all industrial acids except HF',
    reactivityAr: 'خامل كيميائياً؛ يقاوم الماء والأحماض والظروف الجوية لآلاف السنين',
    colorEn: 'Transparent, clear or custom tinted',
    colorAr: 'شفاف فائق النقاء أو ملون بإضافة أكاسيد المعادن',
    chemicalBehaviorEn: 'Lacks long-range periodic crystalline order. Made by fusing quartz sand with soda ash (flux) and lime (stabilizer). Highly transparent to visible light but blocks ultraviolet wavelengths.',
    chemicalBehaviorAr: 'يتميز بغياب الترتيب البلوري الدوري المنظم. يُصنع بصهر رمل الكوارتز مع الصودا والحجر الجيري. ينفذ الضوء المرئي بنقاء عالي لكنه يحجب معظم الأشعة فوق البنفسجية.',
    usesEn: [
      'Architectural high-rise windows, double-glazed insulating facades',
      'Laboratory beakers, test tubes, flasks (borosilicate thermal glass)',
      'Fiber-optic ultra-high-speed internet telecommunication cables',
      'Smartphone screen covers (chemically strengthened aluminosilicate)'
    ],
    usesAr: [
      'النوافذ والواجهات المعمارية العازلة للصوت والحرارة في الأبراج',
      'أواني المختبرات الكيميائية (زجاج البوروسيليكات المقاوم للصدمات الحرارية)',
      'كابلات الألياف الضوئية لنقل بيانات الإنترنت فائق السرعة عبر نبضات الضوء',
      'شاشات الهواتف الذكية المقواة كيميائياً (زجاج غوريلا)'
    ],
    interestingFactsEn: [
      'Glass takes over 1 million years to naturally degrade in the environment, yet it is 100% infinitely recyclable without loss of purity or quality.',
      'Under high-speed fiber-optic cables, laser light travels through ultra-pure glass filaments thin as human hair across entire ocean floors.'
    ],
    interestingFactsAr: [
      'يستغرق الزجاج أكثر من مليون عام ليتحلل في الطبيعة، ومع ذلك فهو قابل لإعادة التدوير بنسبة 100% لعدد لا نهائي من المرات دون أن يفقد نقاءه!',
      'تنتقل نبضات الليزر الحاملة لبيانات الإنترنت عبر أسلاك زجاجية فائقة النقاء بسمك شعرة الرأس في قاع المحيطات.'
    ]
  }
};

// Aliases and synonym mapping (both English and Arabic)
export const ELEMENT_SYNONYMS: Record<string, string> = {
  // Iron
  iron: 'iron',
  fe: 'iron',
  ferrum: 'iron',
  'الحديد': 'iron',
  'حديد': 'iron',
  'الصلب': 'iron',

  // Copper
  copper: 'copper',
  cu: 'copper',
  cuprum: 'copper',
  'النحاس': 'copper',
  'نحاس': 'copper',

  // Gold
  gold: 'gold',
  au: 'gold',
  aurum: 'gold',
  'الذهب': 'gold',
  'ذهب': 'gold',

  // Sodium
  sodium: 'sodium',
  na: 'sodium',
  natrium: 'sodium',
  'الصوديوم': 'sodium',
  'صوديوم': 'sodium',

  // Oxygen
  oxygen: 'oxygen',
  o: 'oxygen',
  o2: 'oxygen',
  'الأكسجين': 'oxygen',
  'أكسجين': 'oxygen',
  'اكسجين': 'oxygen',

  // Hydrogen
  hydrogen: 'hydrogen',
  h: 'hydrogen',
  h2: 'hydrogen',
  'الهيدروجين': 'hydrogen',
  'هيدروجين': 'hydrogen',

  // Carbon
  carbon: 'carbon',
  c: 'carbon',
  'الكربون': 'carbon',
  'كربون': 'carbon',
  diamond: 'carbon',
  'الماس': 'carbon',
  graphite: 'carbon',
  'جرافيت': 'carbon',

  // Titanium
  titanium: 'titanium',
  ti: 'titanium',
  'التيتانيوم': 'titanium',
  'تيتانيوم': 'titanium',

  // Silver
  silver: 'silver',
  ag: 'silver',
  'الفضة': 'silver',
  'فضة': 'silver',
  'فضه': 'silver',
  'الفضه': 'silver',

  // Aluminum
  aluminum: 'aluminum',
  aluminium: 'aluminum',
  al: 'aluminum',
  'الألمنيوم': 'aluminum',
  'ألمنيوم': 'aluminum',
  'المنيوم': 'aluminum',
  'الالمنيوم': 'aluminum',

  // Zinc
  zinc: 'zinc',
  zn: 'zinc',
  'الزنك': 'zinc',
  'زنك': 'zinc',
  'الخارصين': 'zinc',
  'خارصين': 'zinc',

  // Magnesium
  magnesium: 'magnesium',
  mg: 'magnesium',
  'المغنيسيوم': 'magnesium',
  'مغنيسيوم': 'magnesium',
  'ماغنسيوم': 'magnesium',

  // Sulfur
  sulfur: 'sulfur',
  sulphur: 'sulfur',
  s: 'sulfur',
  'الكبريت': 'sulfur',
  'كبريت': 'sulfur',

  // Calcium
  calcium: 'calcium',
  ca: 'calcium',
  'الكالسيوم': 'calcium',
  'كالسيوم': 'calcium',

  // Potassium
  potassium: 'potassium',
  k: 'potassium',
  kalium: 'potassium',
  'البوتاسيوم': 'potassium',
  'بوتاسيوم': 'potassium',

  // Carbon Dioxide
  co2: 'carbon_dioxide',
  'ثاني اكسيد الكربون': 'carbon_dioxide',
  'ثاني أكسيد الكربون': 'carbon_dioxide',
  'carbon dioxide': 'carbon_dioxide',

  // Ammonia
  ammonia: 'ammonia',
  nh3: 'ammonia',
  'الأمونيا': 'ammonia',
  'أمونيا': 'ammonia',
  'امونيا': 'ammonia',
  'النشادر': 'ammonia',
  'نشادر': 'ammonia',

  // Ethanol
  ethanol: 'ethanol',
  alcohol: 'ethanol',
  c2h5oh: 'ethanol',
  'الإيثانول': 'ethanol',
  'إيثانول': 'ethanol',
  'ايثانول': 'ethanol',
  'الكحول': 'ethanol',
  'كحول': 'ethanol',

  // Sand / Silica
  sand: 'sand',
  silica: 'sand',
  quartz: 'sand',
  sio2: 'sand',
  'الرمل': 'sand',
  'رمل': 'sand',
  'السيليكا': 'sand',
  'سيليكا': 'sand',
  'الكوارتز': 'sand',
  'كوارتز': 'sand',

  // Glass
  glass: 'glass',
  'الزجاج': 'glass',
  'زجاج': 'glass',

  // Water
  water: 'water',
  h2o: 'water',
  'الماء': 'water',
  'ماء': 'water',
  'موية': 'water',
  'الموية': 'water',

  // Salt
  salt: 'salt',
  nacl: 'salt',
  'الملح': 'salt',
  'ملح': 'salt',
  'ملح الطعام': 'salt',
  halite: 'salt',

  // Rust / Iron Oxide
  rust: 'iron',
  fe2o3: 'iron',
  'الصدأ': 'iron',
  'صدأ': 'iron'
};

// Quick helper to normalize Arabic/English strings for matching
export function normalizeQueryText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, '') // strip tashkeel
    .replace(/[؟?!\.,،:;""''`~@#$%^&*()_+=\-\[\]{}<>\/\\|]/g, ' ') // strip punctuation including Arabic question mark and comma
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .trim();
}

// Helper to strip common Arabic conjunction prefixes (like "و", "ف", "ك")
function getArabicTokenVariants(token: string): string[] {
  const variants = [token];
  // If starts with "و" (and) and length > 3 (e.g. والحديد -> الحديد, ونحاس -> نحاس)
  if (token.startsWith('و') && token.length >= 3) {
    variants.push(token.slice(1));
  }
  // If starts with "ف" (so)
  if (token.startsWith('ف') && token.length >= 3) {
    variants.push(token.slice(1));
  }
  // If starts with "ال" (the), also add base word (e.g. الحديد -> حديد)
  if (token.startsWith('ال') && token.length >= 4) {
    variants.push(token.slice(2));
  }
  // If does not start with "ال", also add "ال" (e.g. حديد -> الحديد)
  if (!token.startsWith('ال')) {
    variants.push('ال' + token);
  }
  return variants;
}

// Helper to check if a query contains pronoun / contextual follow-up references
export function isContextualPronounQuery(norm: string): boolean {
  if (!norm || norm.length < 2) return false;

  // English pronoun/reference markers
  const enPatterns = [
    /\b(it|its|this|that|these|those)\b/,
    /\b(the element|the metal|the substance|the material|the compound)\b/,
    /\b(about it|with it|in it|into it|to it|from it|of it|on it)\b/,
    /\b(why does it|how does it|what does it|where does it|can it|does it|is it|will it)\b/,
    /\b(what is its|what are its|tell me more|more details|explain more|more about)\b/,
    /\b(its symbol|its formula|its density|its melting point|its boiling point|its color)\b/,
    /\b(its properties|its uses|how it reacts|why it rusts|does it rust)\b/
  ];

  if (enPatterns.some(rx => rx.test(norm))) {
    return true;
  }

  // Arabic tokens and contextual references (matched against normalized words)
  const words = norm.split(/\s+/).filter(Boolean);
  const arTokens = new Set([
    'هو', 'هي', 'هذا', 'هذه', 'ذلك', 'تلك',
    'الماده', 'المعدن', 'العنصر', 'المركب',
    'عنه', 'عنها', 'فيه', 'فيها', 'معه', 'معها', 'به', 'بها', 'له', 'لها', 'منه', 'منها',
    'خواصه', 'خصائصه', 'رمزه', 'صيغته', 'كثافته', 'انصهاره', 'تفاعله', 'تفاعلها', 'استخداماته', 'لونه',
    'يصدي', 'يصدا', 'تصدا', 'يتاكل', 'تتاكل',
    'ليش', 'لماذا', 'كيف'
  ]);

  if (words.some(w => arTokens.has(w))) {
    return true;
  }

  // Arabic contextual phrases
  const arPhrases = [
    'وش يصير لو', 'ايش يصير لو', 'ماذا يحدث لو', 'ماذا لو',
    'لو حطيت', 'لو وضعنا', 'لو اضفنا', 'لو تفاعل',
    'احكيلي اكثر', 'تفاصيل اكثر', 'زدني', 'وضح اكثر', 'اكمل', 'معلومات اكثر'
  ];

  return arPhrases.some(phrase => norm.includes(phrase));
}

// Helper to detect pure greetings
export function isGreetingQuery(norm: string): boolean {
  const clean = norm.trim().toLowerCase();
  const greetings = [
    'hello', 'hi', 'hey', 'greetings', 'good morning', 'good evening', 'good afternoon', 'howdy',
    'مرحبا', 'مرحباً', 'اهلين', 'أهلين', 'اهلا', 'أهلاً', 'السلام عليكم', 'سلام',
    'صباح الخير', 'مساء الخير', 'هلا', 'يا هلا', 'حي الله', 'كيفك', 'شخبارك', 'وش اخبارك', 'ازيك'
  ];
  return greetings.some(g => clean === g || clean.startsWith(g + ' ') || clean.endsWith(' ' + g));
}

// Helper to detect gibberish, single letters, or unrecognizable non-words
export function isGibberishOrSingleChar(query: string, norm: string): boolean {
  const trimmed = query.trim();
  if (trimmed.length <= 1) return true;
  // Common nonsense spam like "asdf", "qwerty", "zxcv", "hjkl"
  const spamList = ['asdf', 'fdsa', 'qwer', 'qwerty', 'zxcv', 'hjkl', 'jkl', 'test', 'aaa', 'bbb', 'xyz', 'foo', 'bar'];
  if (spamList.includes(trimmed.toLowerCase())) return true;
  // If short alphabetical string with no vowels and not an element symbol
  if (/^[a-z]{2,5}$/i.test(trimmed)) {
    const validSymbols = ['fe', 'cu', 'au', 'na', 'h2o', 'co2', 'o2', 'nh3', 'ti', 'ag', 'al', 'zn', 'mg', 'ca', 'k'];
    if (!validSymbols.includes(trimmed.toLowerCase()) && !/[aeiouy]/i.test(trimmed)) {
      return true;
    }
  }
  return false;
}

// Extract scientific entities directly from text WITHOUT inspecting conversation history
export function extractDirectEntities(text: string): string[] {
  const norm = normalizeQueryText(text);
  const words = norm.split(/\s+/).filter(Boolean);
  const found: string[] = [];
  const foundSet = new Set<string>();

  const addEntity = (entity: string) => {
    if (!foundSet.has(entity)) {
      foundSet.add(entity);
      found.push(entity);
    }
  };

  // 1. Direct tokens and Arabic variants
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const variants = getArabicTokenVariants(w);
    for (const v of variants) {
      if (ELEMENT_SYNONYMS[v]) {
        addEntity(ELEMENT_SYNONYMS[v]);
      }
    }

    // 2-word combinations (e.g. "ملح الطعام", "iron oxide", "heavy water")
    if (i < words.length - 1) {
      const pair = `${words[i]} ${words[i + 1]}`;
      if (ELEMENT_SYNONYMS[pair]) {
        addEntity(ELEMENT_SYNONYMS[pair]);
      }
      const pairNorm = `${words[i].replace(/^[وف]/, '')} ${words[i + 1]}`;
      if (ELEMENT_SYNONYMS[pairNorm]) {
        addEntity(ELEMENT_SYNONYMS[pairNorm]);
      }
    }
  }

  // 2. Check raw chemical symbols (e.g. Fe, Cu, Au, Na, O2, H2O, CO2, NaCl)
  const rawTokens = text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  for (const token of rawTokens) {
    if (ELEMENT_SYNONYMS[token]) {
      addEntity(ELEMENT_SYNONYMS[token]);
    }
  }

  return found;
}

// Extract recognized scientific entities from query, with strict contextual resolution
export function extractEntities(query: string, history?: ChatHistoryItem[]): string[] {
  const norm = normalizeQueryText(query);
  const found = extractDirectEntities(query);

  // If query explicitly mentions contextual pronouns or follow-up references ("it", "its", "فيه", "عنه", "يصدأ", etc.)
  if (isContextualPronounQuery(norm) && history && history.length > 0) {
    // Look back through history - prioritize user queries to find the intended subject
    for (let i = history.length - 1; i >= 0; i--) {
      const item = history[i];
      if (item.role === 'user') {
        const userEntities = extractDirectEntities(item.text);
        if (userEntities.length > 0) {
          for (const ent of userEntities) {
            if (!found.includes(ent)) {
              found.push(ent);
            }
          }
          break;
        }
      }
    }
  }

  return found;
}

// Resolve knowledge for an entity from custom dictionary or INITIAL_MATERIALS
export function resolveElementKnowledge(entityId: string): ElementKnowledge | null {
  if (SCIENTIFIC_KNOWLEDGE_BASE[entityId]) {
    return SCIENTIFIC_KNOWLEDGE_BASE[entityId];
  }

  // Search INITIAL_MATERIALS fallback
  const mat = INITIAL_MATERIALS.find(m => m.id === entityId || m.name.toLowerCase() === entityId.toLowerCase());
  if (mat) {
    return {
      id: mat.id,
      nameEn: mat.name,
      nameAr: mat.nameAr || mat.name,
      symbol: mat.symbol,
      atomicNumber: mat.atomicNumber || 0,
      categoryEn: mat.category,
      categoryAr: mat.category,
      stateEn: mat.state,
      stateAr: mat.state,
      density: mat.density,
      meltingPoint: mat.meltingPoint,
      boilingPoint: mat.boilingPoint,
      magneticPropertyEn: 'Refer to electronic structure',
      magneticPropertyAr: 'راجع البنية الإلكترونية',
      conductivityEn: mat.conductivity,
      conductivityAr: mat.conductivity,
      reactivityEn: mat.reactivity,
      reactivityAr: mat.reactivity,
      colorEn: mat.appearance,
      colorAr: mat.appearance,
      chemicalBehaviorEn: mat.chemicalBehavior,
      chemicalBehaviorAr: mat.chemicalBehavior,
      usesEn: mat.interestingFacts || [],
      usesAr: mat.interestingFacts || [],
      interestingFactsEn: mat.interestingFacts || [],
      interestingFactsAr: mat.interestingFacts || []
    };
  }

  return null;
}

// Check if query is asking for a comparison
export function isComparisonQuery(normQuery: string): boolean {
  return (
    normQuery.includes('compare') ||
    normQuery.includes('difference') ||
    normQuery.includes('versus') ||
    normQuery.includes(' vs ') ||
    normQuery.includes('between') ||
    normQuery.includes('قارن') ||
    normQuery.includes('مقارنه') ||
    normQuery.includes('الفرق بين') ||
    normQuery.includes('فرق بين') ||
    normQuery.includes('وش الفرق') ||
    normQuery.includes('ايش الفرق')
  );
}

// Generate an intelligent scientific comparison
export function generateComparison(
  e1: ElementKnowledge,
  e2: ElementKnowledge,
  isArabic: boolean
): string {
  if (isArabic) {
    return `### مقارنة علمية دقيقة بين ${e1.nameAr} (${e1.symbol}) و ${e2.nameAr} (${e2.symbol}):

1. **الرمز والعدد الذري والتصنيف:**
   - **${e1.nameAr}:** رمزه الكيميائي **${e1.symbol}**، وعدده الذري **${e1.atomicNumber || 'مركب'}** (${e1.categoryAr}).
   - **${e2.nameAr}:** رمزه الكيميائي **${e2.symbol}**، وعدده الذري **${e2.atomicNumber || 'مركب'}** (${e2.categoryAr}).

2. **الخواص الفيزيائية والكثافة:**
   - **${e1.nameAr}:** الكثافة **${e1.density}**، درجة الانصهار **${e1.meltingPoint}**، والمظهر: ${e1.colorAr}.
   - **${e2.nameAr}:** الكثافة **${e2.density}**، درجة الانصهار **${e2.meltingPoint}**، والمظهر: ${e2.colorAr}.

3. **التوصيل الكهربائي والحراري:**
   - **${e1.nameAr}:** ${e1.conductivityAr}.
   - **${e2.nameAr}:** ${e2.conductivityAr}.

4. **الخصائص المغناطيسية:**
   - **${e1.nameAr}:** ${e1.magneticPropertyAr}.
   - **${e2.nameAr}:** ${e2.magneticPropertyAr}.

5. **السلوك الكيميائي والتآكل:**
   - **${e1.nameAr}:** ${e1.rustingBehaviorAr || e1.chemicalBehaviorAr}
   - **${e2.nameAr}:** ${e2.rustingBehaviorAr || e2.chemicalBehaviorAr}

6. **أبرز الاستخدامات الصناعية:**
   - **${e1.nameAr}:** ${e1.usesAr.slice(0, 2).join('، ')}.
   - **${e2.nameAr}:** ${e2.usesAr.slice(0, 2).join('، ')}.

هل ترغب في تجربة دمج هذين العنصرين في غرفة التفاعل بمختبر MIXON لمشاهدة توافقهما الكيميائي؟`;
  } else {
    return `### Scientific Comparison: ${e1.nameEn} (${e1.symbol}) vs ${e2.nameEn} (${e2.symbol})

1. **Atomic Identity & Classification:**
   - **${e1.nameEn}:** Symbol **${e1.symbol}**, Atomic Number **${e1.atomicNumber || 'Compound'}** (${e1.categoryEn}).
   - **${e2.nameEn}:** Symbol **${e2.symbol}**, Atomic Number **${e2.atomicNumber || 'Compound'}** (${e2.categoryEn}).

2. **Physical Properties & Density:**
   - **${e1.nameEn}:** Density **${e1.density}**, Melting Point **${e1.meltingPoint}**, Appearance: ${e1.colorEn}.
   - **${e2.nameEn}:** Density **${e2.density}**, Melting Point **${e2.meltingPoint}**, Appearance: ${e2.colorEn}.

3. **Electrical & Thermal Transport:**
   - **${e1.nameEn}:** ${e1.conductivityEn}.
   - **${e2.nameEn}:** ${e2.conductivityEn}.

4. **Magnetic Response:**
   - **${e1.nameEn}:** ${e1.magneticPropertyEn}.
   - **${e2.nameEn}:** ${e2.magneticPropertyEn}.

5. **Chemical Behavior & Corrosion:**
   - **${e1.nameEn}:** ${e1.rustingBehaviorEn || e1.chemicalBehaviorEn}
   - **${e2.nameEn}:** ${e2.rustingBehaviorEn || e2.chemicalBehaviorEn}

6. **Key Industrial Applications:**
   - **${e1.nameEn}:** ${e1.usesEn.slice(0, 2).join('; ')}.
   - **${e2.nameEn}:** ${e2.usesEn.slice(0, 2).join('; ')}.

Would you like to test these two materials inside the MIXON simulation chamber to observe their reaction kinetics?`;
  }
}

// Generate single element scientific answer
export function generateElementAnswer(
  el: ElementKnowledge,
  query: string,
  isArabic: boolean
): string {
  const norm = normalizeQueryText(query);

  // 1. Symbol Query ("what is the symbol of iron?")
  if (
    norm.includes('رمز') || 
    norm.includes('صيغه') || 
    norm.includes('symbol') || 
    norm.includes('formula') ||
    norm.includes('letters')
  ) {
    if (isArabic) {
      return `الرمز الكيميائي لـ **${el.nameAr}** هو **${el.symbol}**${el.atomicNumber ? ` (العدد الذري: ${el.atomicNumber})` : ''}.${el.id === 'iron' ? ' والرمز Fe مشتق من الكلمة اللاتينية *Ferrum*.' : ''}${el.id === 'copper' ? ' والرمز Cu مشتق من اللاتينية *Cuprum* (نسبة لجزيرة قبرص).' : ''}${el.id === 'gold' ? ' والرمز Au مشتق من اللاتينية *Aurum* (بمعنى الوميض الساطع).' : ''}${el.id === 'sodium' ? ' والرمز Na مشتق من الكلمة اللاتينية *Natrium*.' : ''}`;
    } else {
      return `The chemical symbol for **${el.nameEn}** is **${el.symbol}**${el.atomicNumber ? ` (Atomic Number: ${el.atomicNumber})` : ''}.${el.id === 'iron' ? ' The symbol Fe derives from the Latin word *Ferrum*.' : ''}${el.id === 'copper' ? ' The symbol Cu derives from the Latin *Cuprum* (Cyprus ore).' : ''}${el.id === 'gold' ? ' The symbol Au derives from the Latin *Aurum* (meaning shining dawn).' : ''}${el.id === 'sodium' ? ' The symbol Na derives from the Latin *Natrium*.' : ''}`;
    }
  }

  // 2. Rusting / Corrosion Query ("why does iron rust?")
  if (
    norm.includes('صدأ') || 
    norm.includes('صدا') || 
    norm.includes('يصدي') || 
    norm.includes('يصدا') || 
    norm.includes('تآكل') || 
    norm.includes('تاكل') || 
    norm.includes('rust') || 
    norm.includes('corrod') ||
    norm.includes('tarnish')
  ) {
    if (isArabic) {
      if (el.rustingBehaviorAr) {
        return `**سبب صدأ وتآكل ${el.nameAr} (${el.symbol}):**\n\n${el.rustingBehaviorAr}\n\n- **المعادلة الكيميائية للأكسدة:** 4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃ → 2Fe₂O₃·3H₂O\n- **طرق الحماية:** طلاء السطح، أو الجلفنة (تغطية الحديد بطبقة من الزنك)، أو تصنيع سبائك الفولاذ المقاوم للصدأ (Stainless Steel) عبر إضافة الكروم والنيكل.`;
      }
      return `${el.nameAr} (${el.symbol}): ${el.chemicalBehaviorAr}`;
    } else {
      if (el.rustingBehaviorEn) {
        return `**Why ${el.nameEn} (${el.symbol}) rusts:**\n\n${el.rustingBehaviorEn}\n\n- **Chemical Equation:** 4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃ → 2Fe₂O₃·3H₂O (hydrated iron(III) oxide).\n- **Prevention Methods:** Surface painting, galvanization (zinc sacrificial coating), or alloying into stainless steel with chromium and nickel.`;
      }
      return `${el.nameEn} (${el.symbol}): ${el.chemicalBehaviorEn}`;
    }
  }

  // 3. Color / Appearance Query ("why is copper a different color?")
  if (norm.includes('لون') || norm.includes('الوان') || norm.includes('color') || norm.includes('colour') || norm.includes('appearance')) {
    if (isArabic) {
      if (el.id === 'copper') {
        return `**سبب اللون المميز للنحاس (الأحمر البرتقالي):**\n\nمعظم المعادن تظهر باللون الفضي الرمادي لأنها تعكس كافة أطوال موجات الضوء المرئي بالتساوي. أما النحاس، فبسبب تأثيرات ميكانيكا الكم والنسبية الخاصة، تمتص إلكترونات مداراته (من الحزمة 3d إلى 4s) فوتونات الضوء الأزرق والأخضر، وتعكس أطياف الضوء الأحمر والبرتقالي والأصفر، مما يمنحه لمعانه النحاسي الفريد.`;
      }
      if (el.id === 'gold') {
        return `**سبب اللون الأصفر الذهبي للذهب:**\n\nيمتلك الذهب 79 بروتوناً في نواته، مما يجعل الإلكترونات القريبة من النواة تدور بسرعات نسبية تقارب نصف سرعة الضوء. يؤدي هذا الانكماش النسبي إلى تقارب مدارات 5d و 6s، مما يجعله يمتص الضوء الأزرق ويعكس درجات الأصفر والذهبي الساطع.`;
      }
      return `مظهر **${el.nameAr}** (${el.symbol}): ${el.colorAr}. الكثافة: ${el.density}، ودرجة الانصهار: ${el.meltingPoint}.`;
    } else {
      if (el.id === 'copper') {
        return `**Why Copper has its distinct reddish-orange color:**\n\nMost metals appear silvery-gray because they reflect all visible light wavelengths equally. In copper, relativistic quantum mechanical effects alter the energy gap between the filled 3d electron subshell and the half-filled 4s orbital. This configuration absorbs blue and violet light, reflecting predominantly red, orange, and yellow wavelengths, giving copper its iconic reddish luster.`;
      }
      if (el.id === 'gold') {
        return `**Why Gold is distinctly yellow:**\n\nWith 79 protons in its nucleus, gold's inner electrons travel at relativistic speeds (~58% the speed of light). This causes relativistic orbital contraction, shrinking the 6s orbital and expanding the 5d orbitals. The resulting energy gap absorbs blue photons and reflects yellow-gold light.`;
      }
      return `Appearance of **${el.nameEn}** (${el.symbol}): ${el.colorEn}. Density: ${el.density}, Melting point: ${el.meltingPoint}.`;
    }
  }

  // 4. Water / Reaction with Water ("What happens if I put iron in water?")
  if (
    (norm.includes('ماء') || norm.includes('مويه') || norm.includes('water')) &&
    (norm.includes('حطيت') || norm.includes('وضعت') || norm.includes('تفاعل') || norm.includes('put') || norm.includes('react') || norm.includes('drop'))
  ) {
    if (isArabic) {
      if (el.id === 'iron') {
        return `**ماذا يحدث عند وضع الحديد في الماء؟**\n\n- **في الماء العادي المحتوي على أكسجين ذائب:** يبدأ الحديد تفاعلاً كهركيميائياً بطيئاً ليتأكسد مكوّناً صدأ الحديد (Fe₂O₃·nH₂O). التفاعل يستغرق أياماً إلى أسابيع.\n- **في ماء مغلي خالٍ تماماً من الأكسجين:** لا يصدأ الحديد لأن الأكسجين ضروري لإتمام دورة الأكسدة.\n- **مع بخار الماء شديد السخونة (أعلى من 500 °C):** يتفاعل الحديد مع البخار منتجاً أكسيد الحديد المغناطيسي (Fe₃O₄) وغاز الهيدروجين (3Fe + 4H₂O → Fe₃O₄ + 4H₂).`;
      }
      if (el.id === 'sodium') {
        return `**ماذا يحدث عند وضع الصوديوم في الماء؟**\n\nيحدث تفاعل عنيف وطارد للحرارة فوراً:\n2Na + 2H₂O → 2NaOH + H₂ ↑\nيطفو الصوديوم فوق سطح الماء ويذوب إلى كرة فضية متحركة بسرعة، ويشتعل غاز الهيدروجين المنطلق بلهب أصفر ساطع، وقد يحدث انفجار صغير إذا كانت قطعة الصوديوم كبيرة!`;
      }
      if (el.id === 'gold' || el.id === 'copper') {
        return `**عند وضع ${el.nameAr} في الماء:** لا يحدث أي تفاعل كيميائي سريع لأن ${el.nameAr} معدن ذو نشاط كيميائي منخفض جداً، وهو غير قابل للذوبان في الماء ويبقى مستقراً تماماً.`;
      }
    } else {
      if (el.id === 'iron') {
        return `**What happens when iron is placed in water:**\n\n- **In aerated water (with dissolved oxygen):** Iron slowly undergoes electrochemical oxidation to form hydrated iron(III) oxide (rust). This process takes days to weeks.\n- **In pure deoxygenated water:** Iron will not rust, as oxygen is an essential electron acceptor for the reaction.\n- **With high-temperature steam (>500 °C):** Iron reacts to produce black magnetic iron oxide and flammable hydrogen gas: 3Fe + 4H₂O → Fe₃O₄ + 4H₂.`;
      }
      if (el.id === 'sodium') {
        return `**What happens when sodium is placed in water:**\n\nAn extremely vigorous, exothermic reaction occurs immediately:\n2Na + 2H₂O → 2NaOH + H₂ ↑\nThe sodium metal skitters across the surface of the water, melts into a spherical bead from the heat, and the escaping hydrogen gas often catches fire with a brilliant yellow flame!`;
      }
      if (el.id === 'gold' || el.id === 'copper') {
        return `**When ${el.nameEn} is placed in water:** No immediate chemical reaction occurs. ${el.nameEn} has low chemical reactivity and remains insoluble and stable in water.`;
      }
    }
  }

  // 5. General Definition / "What is iron?"
  // Find matching reactions in MIXON Laboratory
  const labReactions = KNOWN_REACTIONS.filter(
    r => r.inputA === el.id || r.inputB === el.id
  );

  let labSectionAr = '';
  let labSectionEn = '';

  if (labReactions.length > 0) {
    const rxItemsAr = labReactions.slice(0, 3).map(rx => {
      const partnerId = rx.inputA === el.id ? rx.inputB : rx.inputA;
      const partnerMat = INITIAL_MATERIALS.find(m => m.id === partnerId);
      const partnerName = partnerMat?.nameAr || partnerMat?.name || partnerId;
      return `- مع **${partnerName}**: يُخلّق **${rx.outputName}** (\`${rx.outputFormula}\`) عبر تفاعل ${rx.reactionType} (${rx.observedChange}).`;
    }).join('\n');

    labSectionAr = `\n\n### 🧪 تجارب وتفاعلات في مختبر MIXON:\n${rxItemsAr}\n\n💡 *جرب وضع **${el.nameAr}** في Slot A والشريك في Slot B واضغط **COMBINE** لتشاهد التفاعل والتحول الذري في غرفة المحاكاة!*`;

    const rxItemsEn = labReactions.slice(0, 3).map(rx => {
      const partnerId = rx.inputA === el.id ? rx.inputB : rx.inputA;
      const partnerMat = INITIAL_MATERIALS.find(m => m.id === partnerId);
      const partnerName = partnerMat?.name || partnerId;
      return `- With **${partnerName}**: Synthesizes **${rx.outputName}** (\`${rx.outputFormula}\`) via ${rx.reactionType} (${rx.observedChange}).`;
    }).join('\n');

    labSectionEn = `\n\n### 🧪 Laboratory Experiments in MIXON:\n${rxItemsEn}\n\n💡 *Try loading **${el.nameEn}** into Slot A and its partner into Slot B, then trigger **COMBINE** to observe the reaction live in the simulation chamber!*`;
  } else {
    labSectionAr = `\n\n### 🧪 التفاعل في المختبر:\nيمكنك فحص البنية البلورية ومستويات الطاقة الكمومية لـ **${el.nameAr}**، أو اختبار تفاعله مع الأكسجين أو الأحماض في أوضاع المحاكاة المختلفة!`;
    labSectionEn = `\n\n### 🧪 Laboratory Integration:\nYou can examine the crystal lattice, valence shells, and quantum states of **${el.nameEn}**, or test its interaction with oxidizers and acids in the simulation chamber!`;
  }

  if (isArabic) {
    return `**${el.nameAr}** (${el.symbol}): هو عنصر كيميائي ذو عدد ذري **${el.atomicNumber || 'مركب'}**، ويُصنف كـ **${el.categoryAr}**.

- **الحالة الفيزيائية:** ${el.stateAr} (الكثافة: ${el.density})
- **درجة الانصهار:** ${el.meltingPoint}${el.boilingPoint ? ` (الغليان: ${el.boilingPoint})` : ''}
- **الموصلية والخواص الكهربائية:** ${el.conductivityAr}
- **الخواص المغناطيسية:** ${el.magneticPropertyAr}
- **السلوك الكيميائي والنشاط:** ${el.chemicalBehaviorAr}
- **أبرز الاستخدامات:** ${el.usesAr.join('، ')}.
${el.interestingFactsAr.length > 0 ? `\n> 🔬 **معلومة علمية:** ${el.interestingFactsAr[0]}` : ''}${labSectionAr}`;
  } else {
    return `**${el.nameEn}** (${el.symbol}) is a chemical substance with atomic number **${el.atomicNumber || 'Compound'}**, classified as a **${el.categoryEn}**.

- **Physical State:** ${el.stateEn} (Density: ${el.density})
- **Melting Point:** ${el.meltingPoint}${el.boilingPoint ? ` (Boiling: ${el.boilingPoint})` : ''}
- **Conductivity & Transport:** ${el.conductivityEn}
- **Magnetic Profile:** ${el.magneticPropertyEn}
- **Chemical Behavior & Reactivity:** ${el.chemicalBehaviorEn}
- **Primary Uses:** ${el.usesEn.join(', ')}.
${el.interestingFactsEn.length > 0 ? `\n> 🔬 **Scientific Fact:** ${el.interestingFactsEn[0]}` : ''}${labSectionEn}`;
  }
}

// Check for reaction question (e.g. "What happens when iron reacts with oxygen?" or "Can these two substances react?")
export function handleReactionQuery(
  query: string,
  entities: string[],
  context: LabContext,
  isArabic: boolean
): string | null {
  const norm = normalizeQueryText(query);
  const isReactionQuery =
    norm.includes('react') ||
    norm.includes('combine') ||
    norm.includes('mix') ||
    norm.includes('happen') ||
    norm.includes('تفاعل') ||
    norm.includes('يتفاعل') ||
    norm.includes('تتفاعل') ||
    norm.includes('دمج') ||
    norm.includes('وش يصير') ||
    norm.includes('ايش يصير');

  if (!isReactionQuery && !norm.includes('can these two react') && !norm.includes('هل تتفاعل')) {
    return null;
  }

  // Identify the two reactants
  let idA = entities[0];
  let idB = entities[1];

  if (!idA && context.materialA) idA = context.materialA.id;
  if (!idB && context.materialB) idB = context.materialB.id;

  // Specific check: Iron + Oxygen
  if ((idA === 'iron' && idB === 'oxygen') || (idA === 'oxygen' && idB === 'iron') || (norm.includes('iron') && norm.includes('oxygen')) || (norm.includes('حديد') && (norm.includes('اكسجين') || norm.includes('أكسجين')))) {
    if (isArabic) {
      return `### تفاعل الحديد مع الأكسجين (أكسدة وتكوين الصدأ):

عند تفاعل الحديد (Fe) مع الأكسجين (O₂)، يحدث تفاعل أكسدة-اختزال حيث تفقد ذرات الحديد إلكترونات لتتحول إلى أيونات حديد، بينما تكتسب ذرات الأكسجين الإلكترونات:

1. **في وجود الحرارة العالية (أكسدة حرارية):**
   - **المعادلة:** 3Fe + 2O₂ → Fe₃O₄ (أكسيد الحديد الأسود المغناطيسي) أو 4Fe + 3O₂ → 2Fe₂O₃ (أكسيد الحديد الثلاثي).
   - التفاعل طارد للحرارة ويترافق مع توهج أحمر ساطع للحديد.

2. **في درجة حرارة الغرفة بوجود رطوبة (تكوين الصدأ):**
   - **المعادلة الكلية:** 4Fe + 3O₂ + 6H₂O → 2Fe₂O₃·3H₂O
   - ينتج مركب هش أحمر-بني (الصدأ) يتفتت تدريجياً ويؤدي لتآكل المعدن.

يمكنك محاكاة هذا التفاعل في MIX LAB بوضع **الحديد** في Slot A و**الأكسجين** في Slot B وضغط زر **COMBINE** لملاحظة التحول الذري!`;
    } else {
      return `### Reaction: Iron and Oxygen (Oxidation & Rust Synthesis):

When Iron (Fe) reacts with Oxygen (O₂), a redox reaction takes place where iron loses electrons (is oxidized) and oxygen gains electrons (is reduced):

1. **Under High Thermal Energy (Combustion/Oxidation):**
   - **Equation:** 4Fe + 3O₂ → 2Fe₂O₃ (Iron(III) oxide) or 3Fe + 2O₂ → Fe₃O₄ (Magnetite).
   - This process is highly exothermic, producing brilliant orange-red incandescence and oxide crusts.

2. **At Ambient Temperature with Moisture (Rusting):**
   - **Overall Reaction:** 4Fe + 3O₂ + 6H₂O → 2Fe₂O₃·3H₂O (hydrated iron(III) oxide).
   - Unlike protective patinas, rust is mechanically porous and flakes away, exposing deeper metal to ongoing corrosion.

You can simulate this reaction directly inside MIX LAB by placing **Iron** in Slot A and **Oxygen** in Slot B and executing the **COMBINE** protocol!`;
    }
  }

  // Check known reactions in data
  if (idA && idB) {
    const rx = KNOWN_REACTIONS.find(
      r => (r.inputA === idA && r.inputB === idB) || (r.inputA === idB && r.inputB === idA)
    );

    if (rx) {
      if (isArabic) {
        return `### ناتج تفاعل ${idA.toUpperCase()} مع ${idB.toUpperCase()}:

- **اسم المركب الناتج:** **${rx.outputName}**
- **المعادلة الكيميائية:** \`${rx.outputFormula}\`
- **نوع التفاعل:** ${rx.reactionType}
- **تغير الطاقة:** ${rx.energyChange}
- **التغير البصري الملاحظ:** ${rx.observedChange}
- **مصفوفة الروابط الجزيئية:** ${rx.molecularTransformation}

يمكنك تشغيل هذا التفاعل مباشرة في غرفة محاكاة MIX LAB بمجرد اختيار المادتين والضغط على زر **COMBINE**!`;
      } else {
        return `### Reaction: ${idA.toUpperCase()} + ${idB.toUpperCase()}

- **Synthesized Product:** **${rx.outputName}**
- **Chemical Formula / Equation:** \`${rx.outputFormula}\`
- **Reaction Classification:** ${rx.reactionType}
- **Thermodynamic Energy Change:** ${rx.energyChange}
- **Observed Physical Transformation:** ${rx.observedChange}
- **Molecular Bonding Matrix:** ${rx.molecularTransformation}

You can execute this reaction inside the MIX LAB chamber right now by loading both materials and clicking **COMBINE**!`;
      }
    }
  }

  return null;
}

// Master General Scientific Knowledge Engine
export function queryScientificKnowledgeEngine(
  question: string,
  history: ChatHistoryItem[] = [],
  context: LabContext = {},
  isArabic: boolean = false
): string {
  const norm = normalizeQueryText(question);

  // 1. Explicit check for greetings (e.g. "hello", "hi", "مرحبا", "السلام عليكم")
  if (isGreetingQuery(norm)) {
    if (isArabic) {
      return `أهلاً بك في مختبر MIXON الرقمي! أنا معلمك العلمي الذكي. يمكنك سؤالي عن أي عنصر كيميائي، أو الاستفسار عن سبب تفاعل وصدأ المواد، أو مقارنة مادتين، أو توقع نواتج التفاعل في غرفة المحاكاة.`;
    } else {
      return `Hello! Welcome to the MIXON Digital Matter Laboratory. I am your scientific AI tutor. You can ask me about any chemical element, compare different materials, investigate corrosion or reactions, or explore experiments in the simulation chamber!`;
    }
  }

  // 2. Explicit check for gibberish, single characters, or keyboard mash (e.g. "a", "asdf", "qwerty")
  if (isGibberishOrSingleChar(question, norm)) {
    if (isArabic) {
      return `لم أتمكن من فهم استفسارك بدقة. يرجى كتابة سؤال علمي محدد، مثل: "ما هو الماء؟"، "قارن بين النحاس والذهب"، أو "ماذا يحدث عند تفاعل الصوديوم مع الماء؟".`;
    } else {
      return `I did not recognize that query. Please ask a specific scientific question, such as: "What is water?", "Compare copper and gold", or "What happens when sodium reacts with water?".`;
    }
  }

  // 3. Identity query ("who are you?", "من أنت؟")
  if (
    norm.includes('who are you') ||
    norm.includes('what are you') ||
    norm.includes('من انت') ||
    norm.includes('مين انت') ||
    norm.includes('عرف بنفسك')
  ) {
    if (isArabic) {
      return `أنا معلم ميكسون العلمي الذكي (MIXON AI Tutor)، مرشدك الرقمي المتخصص في استكشاف علوم المواد والكيمياء والفيزياء الذرية. يمكنك سؤالي عن أي عنصر، أو مقارنة الخصائص، أو محاكاة تفاعلات الاندماج والارتباط الكيميائي!`;
    } else {
      return `I am your MIXON AI Science Tutor, your interactive guide to materials science, chemistry, and atomic physics. You can ask me about any chemical element, compare material properties, or simulate bonding reactions in our digital laboratory!`;
    }
  }

  const entities = extractEntities(question, history);

  // 4. Check for specific reaction question
  const rxAnswer = handleReactionQuery(question, entities, context, isArabic);
  if (rxAnswer) {
    return rxAnswer;
  }

  // 5. Check for comparison query ("Compare iron and copper")
  if (isComparisonQuery(norm) && entities.length >= 2) {
    const e1 = resolveElementKnowledge(entities[0]);
    const e2 = resolveElementKnowledge(entities[1]);
    if (e1 && e2) {
      return generateComparison(e1, e2, isArabic);
    }
  }

  // 6. Check for single entity query (Iron, Copper, Gold, Sodium, etc.)
  if (entities.length >= 1) {
    const el = resolveElementKnowledge(entities[0]);
    if (el) {
      return generateElementAnswer(el, question, isArabic);
    }
  }

  // 7. Check if question is about current experiment / chamber in MIXON
  if (
    context.currentResult &&
    (norm.includes('تفاعل') || norm.includes('نتيجه') || norm.includes('reaction') || norm.includes('result') || norm.includes('experiment'))
  ) {
    const r = context.currentResult;
    if (isArabic) {
      return `في التجربة الحالية بمختبر MIXON، قمت بمحاكاة تفاعل **${r.outputName}** (${r.outputFormula}).\n\n- **نوع التفاعل:** ${r.reactionType}\n- **انتقال الطاقة:** ${r.energyChange}\n- **التحول الفيزيائي:** ${r.observedChange}\n- **إعادة تشكيل الروابط:** ${r.molecularTransformation}`;
    } else {
      return `In your current MIXON laboratory simulation, you synthesized **${r.outputName}** (${r.outputFormula}).\n\n- **Reaction Type:** ${r.reactionType}\n- **Energy Transfer:** ${r.energyChange}\n- **Observed Change:** ${r.observedChange}\n- **Bond Restructuring:** ${r.molecularTransformation}`;
    }
  }

  // 8. Open-ended general science queries
  if (norm.includes('atom') || norm.includes('ذره') || norm.includes('ذرة')) {
    if (isArabic) {
      return `**الذرة (Atom):** هي الوحدة الأساسية البنائية لجميع المواد في الكون. تتكون الذرة من نواة مركزية كثيفة تحتوي على بروتونات موجبة الشحنة ونيوترونات متعادلة، وتحيط بها سحابة إلكترونية من الإلكترونات سالبة الشحنة تدور في مستويات طاقة كمومية محددة. يحدد عدد البروتونات (العدد الذري) هوية العنصر الكيميائي وسلوكه في التفاعلات.`;
    } else {
      return `**An Atom** is the fundamental constituent unit of ordinary matter. It consists of a dense central nucleus containing positively charged protons and electrically neutral neutrons, surrounded by a cloud of negatively charged electrons orbiting in quantized energy levels. The number of protons (atomic number) defines the chemical element and dictates its bonding behavior.`;
    }
  }

  if (norm.includes('bond') || norm.includes('روابط') || norm.includes('رابطه') || norm.includes('رابطة')) {
    if (isArabic) {
      return `**الروابط الكيميائية (Chemical Bonds):** هي قوى التجاذب الكهرومغناطيسية التي تربط الذرات معاً لتكوين الجزيئات والمركبات:\n\n1. **الرابطة الأيونية (Ionic):** انتقال كامل للإلكترونات من فلز إلى لافلز (مثل NaCl).\n2. **الرابطة التساهمية (Covalent):** تشارك الذرات لزوج أو أكثر من الإلكترونات (مثل H₂O و CH₄).\n3. **الرابطة الفلزية (Metallic):** بحر من الإلكترونات غير الموضعية يحيط بأيونات الفلز، مما يمنحه التوصيل الكهربائي والمرونة (مثل Fe و Cu).`;
    } else {
      return `**Chemical Bonds** are electrostatic forces that hold atoms together to form stable molecules and crystalline lattices:\n\n1. **Ionic Bonding:** Complete transfer of valence electrons from a metal to a nonmetal (e.g., NaCl).\n2. **Covalent Bonding:** Sharing of electron pairs between nonmetal atoms (e.g., H₂O, CH₄).\n3. **Metallic Bonding:** Delocalized sea of valence electrons surrounding positive metal cations, giving metals high electrical conductivity and ductility (e.g., Fe, Cu).`;
    }
  }

  // Default clean scientific fallback (no hardcoded element names that could poison future history parsing)
  if (isArabic) {
    return `لم أتمكن من العثور على إجابة علمية دقيقة لهذا الاستفسار. يمكنك سؤالي عن خصائص أي عنصر، أو كتابة "قارن بين النحاس والذهب"، أو الاستفسار عن سبب صدأ وتآكل المعادن، أو تجربة التفاعلات داخل مختبر MIXON.`;
  } else {
    return `I could not find a specific scientific match for that inquiry. You can ask about any chemical element, request a comparison like "Compare copper and gold", ask why metals corrode, or explore reactions inside the MIXON laboratory.`;
  }
}
