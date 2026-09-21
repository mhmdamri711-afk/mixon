export type AppLanguage = 'en' | 'ar';

export interface Translations {
  // Navigation
  lab: string;
  materials: string;
  discover: string;
  quantum: string;
  space: string;
  challenges: string;
  history: string;
  creator: string;
  search: string;
  safety: string;
  simulationOnly: string;
  level: string;
  exp: string;
  profile: string;

  // Lab Workbench
  matterInjector: string;
  filterMatter: string;
  reactorCore: string;
  dropAHere: string;
  dropBHere: string;
  slotAlpha: string;
  slotBeta: string;
  combine: string;
  simulating: string;
  chamberTemp: string;
  pressure: string;
  harmonics: string;
  stable: string;
  threeDReactor: string;
  twoDChamber: string;
  zoomLevel: string;
  zoomMaterial: string;
  zoomStructure: string;
  zoomMolecule: string;
  zoomAtoms: string;
  zoomOrbitals: string;

  // Telemetry & Results
  scientificTelemetry: string;
  telemetryEnergy: string;
  telemetryVelocity: string;
  telemetryProgress: string;
  telemetryCurrent: string;
  swapInputs: string;
  clearReactor: string;
  inspect3D: string;
  inspecting3D: string;
  realMaterial: string;
  chamberViewPhysical: string;
  chamberViewScientific: string;
  turntableToggle: string;
  categoryAll: string;
  categoryMetals: string;
  categoryGases: string;
  categoryMinerals: string;
  categorySpace: string;
  readyCount: string;
  reactorTelemetry: string;
  magneticInduction: string;
  vacuumChamber: string;
  spectrometer: string;
  calibrated: string;
  simProtocol: string;
  simProtocolDesc: string;
  inspectStructure: string;
  ejectSlotA: string;
  ejectSlotB: string;
  collapse: string;
  expand3D: string;
  simulationComplete: string;
  observedChange: string;
  productState: string;
  reactionType: string;
  energyTransfer: string;
  molecularBonding: string;
  runAgain: string;
  saveExperiment: string;
  experimentSaved: string;
  threeDInspector: string;
  teachMe: string;
  askAi: string;

  // Discovery & Voice
  newDiscovery: string;
  discoveryAnnouncement: string;
  rareDiscovery: string;
  voiceAssistant: string;
  voiceOn: string;
  voiceOff: string;
  listening: string;
  thinking: string;
  speaking: string;

  // AI Tutor
  aiTutorTitle: string;
  aiTutorSubtitle: string;
  askPlaceholder: string;
  send: string;
  clearChat: string;
  suggestedQuestions: string[];

  // About Creator
  aboutTitle: string;
  aboutCreatorName: string;
  aboutRole: string;
  aboutAge: string;
  aboutBio: string;
  aboutMission: string;
  aboutTimeline: { title: string; desc: string }[];
  aboutSignature: string;
}

export const TRANSLATIONS: Record<AppLanguage, Translations> = {
  en: {
    lab: 'MIX LAB',
    materials: 'MATTER',
    discover: 'DISCOVER',
    quantum: 'QUANTUM',
    space: 'SPACE',
    challenges: 'CHALLENGES',
    history: 'HISTORY',
    creator: 'CREATOR',
    search: 'Search Matter...',
    safety: 'Safety Protocol',
    simulationOnly: 'Simulation Only',
    level: 'LVL',
    exp: 'EXP',
    profile: 'Scientist Profile',

    matterInjector: 'Matter Injector',
    filterMatter: 'Filter matter or formula...',
    reactorCore: 'Reactor Core Viewport',
    dropAHere: 'Drop Material A Here',
    dropBHere: 'Drop Material B Here',
    slotAlpha: 'Chamber Slot Alpha',
    slotBeta: 'Chamber Slot Beta',
    combine: 'COMBINE',
    simulating: 'SIMULATION IN PROGRESS...',
    chamberTemp: 'CHAMBER TEMP:',
    pressure: 'PRESSURE:',
    harmonics: 'HARMONICS:',
    stable: 'STABLE',
    threeDReactor: '3D Molecular Reactor',
    twoDChamber: '2D Particle Chamber',
    zoomLevel: 'VIEW HIERARCHY',
    zoomMaterial: 'Material',
    zoomStructure: 'Structure',
    zoomMolecule: 'Molecule',
    zoomAtoms: 'Atoms',
    zoomOrbitals: 'Orbitals',

    scientificTelemetry: 'Live Scientific Telemetry',
    telemetryEnergy: 'Energy (kJ)',
    telemetryVelocity: 'Velocity (v)',
    telemetryProgress: 'Progress (%)',
    telemetryCurrent: 'CURRENT:',
    swapInputs: 'Swap Inputs A ⇋ B',
    clearReactor: 'Clear Reactor',
    inspect3D: 'Inspect 3D',
    inspecting3D: 'Viewing',
    realMaterial: 'Real Material',
    chamberViewPhysical: 'Material View',
    chamberViewScientific: 'Scientific Structure',
    turntableToggle: 'Turntable 360°',
    categoryAll: 'All',
    categoryMetals: 'Metals',
    categoryGases: 'Gases',
    categoryMinerals: 'Minerals',
    categorySpace: 'Space',
    readyCount: 'READY',
    reactorTelemetry: 'Reactor Telemetry',
    magneticInduction: 'Magnetic Induction:',
    vacuumChamber: 'Vacuum Chamber:',
    spectrometer: 'Spectrometer:',
    calibrated: 'Calibrated',
    simProtocol: 'Simulation Protocol',
    simProtocolDesc: 'Select or drag any two materials into Chamber Slot A and Slot B, then trigger the COMBINE protocol to model reaction bonding.',
    inspectStructure: 'Inspect Molecular Structure',
    ejectSlotA: 'Eject Slot A',
    ejectSlotB: 'Eject Slot B',
    collapse: 'Collapse',
    expand3D: 'Expand 3D',

    simulationComplete: 'SIMULATION COMPLETE',
    observedChange: 'Observed Physical Change',
    productState: 'Product State:',
    reactionType: 'Reaction Type:',
    energyTransfer: 'Simulated Energy Transfer:',
    molecularBonding: 'Molecular Bonding Matrix',
    runAgain: 'RUN AGAIN',
    saveExperiment: 'SAVE EXPERIMENT',
    experimentSaved: 'EXPERIMENT SAVED!',
    threeDInspector: '3D Molecular Inspector',
    teachMe: 'TEACH ME',
    askAi: 'Ask MIXON AI',

    newDiscovery: 'NEW DISCOVERY',
    discoveryAnnouncement: 'New discovery! You synthesized a new material: ',
    rareDiscovery: 'Rare Synthesis',
    voiceAssistant: 'Voice Assistant',
    voiceOn: 'Voice ON',
    voiceOff: 'Voice OFF',
    listening: 'LISTENING...',
    thinking: 'THINKING...',
    speaking: 'SPEAKING...',

    aiTutorTitle: 'MIXON AI TUTOR',
    aiTutorSubtitle: 'Digital Science Mentor • Connected to Active Simulation',
    askPlaceholder: 'Ask any scientific question about this material or reaction...',
    send: 'Ask',
    clearChat: 'Clear',
    suggestedQuestions: [
      'Why did this reaction happen?',
      'Explain this result in simple words',
      'What is the crystal structure of this material?',
      'Why do these particles move differently?',
      'How does temperature affect this bonding?',
      'What are the valence electrons involved?'
    ],

    aboutTitle: 'ABOUT THE CREATOR',
    aboutCreatorName: 'Muhammad Sultan Al-Amri',
    aboutRole: 'Creator & Developer of MIXON',
    aboutAge: 'Created at age 14',
    aboutBio: 'MIXON was created by Muhammad Sultan Al-Amri at the age of 14, combining programming, science, interactive design, and curiosity to create a new way to explore matter.',
    aboutMission: 'Make science feel interactive.',
    aboutTimeline: [
      { title: 'IDEA', desc: 'The spark to turn abstract chemical equations into a tactile, living universe.' },
      { title: 'DESIGN', desc: 'Crafting the Geometric Balance dark laboratory visual identity and UI ergonomics.' },
      { title: 'DEVELOPMENT', desc: 'Building physics engines, WebGL molecular visualizers, and intelligent AI tutoring.' },
      { title: 'MIXON', desc: 'A real digital matter laboratory empowering learners worldwide to explore, combine, and discover.' }
    ],
    aboutSignature: 'Built by Muhammad Sultan Al-Amri • MIXON — Explore. Combine. Discover.'
  },

  ar: {
    lab: 'مختبر المزيج',
    materials: 'المواد والعناصر',
    discover: 'الاستكشاف',
    quantum: 'النمط الكمومي',
    space: 'مادة الفضاء',
    challenges: 'التحديات',
    history: 'السجل',
    creator: 'المطور',
    search: 'ابحث عن مادة أو رمز...',
    safety: 'بروتوكول السلامة',
    simulationOnly: 'محاكاة فقط',
    level: 'المستوى',
    exp: 'نقاط الخبرة',
    profile: 'ملف الباحث',

    matterInjector: 'حاقن المواد',
    filterMatter: 'تصفية المواد أو الرموز...',
    reactorCore: 'منصة قلب المفاعل',
    dropAHere: 'أسقط المادة الأولى هنا',
    dropBHere: 'أسقط المادة الثانية هنا',
    slotAlpha: 'حجرة ألفا',
    slotBeta: 'حجرة بيتا',
    combine: 'دمج المواد',
    simulating: 'جاري محاكاة التفاعل...',
    chamberTemp: 'حرارة الحجرة:',
    pressure: 'الضغط:',
    harmonics: 'التوافقية:',
    stable: 'مستقر',
    threeDReactor: 'مفاعل جزيئي ثلاثي الأبعاد',
    twoDChamber: 'حجرة الجسيمات ثنائية الأبعاد',
    zoomLevel: 'مستوى التكبير',
    zoomMaterial: 'المادة',
    zoomStructure: 'البنية',
    zoomMolecule: 'الجزيء',
    zoomAtoms: 'الذرات',
    zoomOrbitals: 'المدارات',

    scientificTelemetry: 'القياسات العلمية الحية',
    telemetryEnergy: 'الطاقة (kJ)',
    telemetryVelocity: 'السرعة (v)',
    telemetryProgress: 'التقدم (%)',
    telemetryCurrent: 'الحالي:',
    swapInputs: 'تبديل المدخلات أ ⇋ ب',
    clearReactor: 'تفريغ المفاعل',
    inspect3D: 'فحص ثلاثي الأبعاد',
    inspecting3D: 'قيد العرض',
    realMaterial: 'مادة حقيقية',
    chamberViewPhysical: 'المظهر الفيزيائي للمادة',
    chamberViewScientific: 'البنية الجزيئية العلمية',
    turntableToggle: 'دوران الفحص 360°',
    categoryAll: 'الكل',
    categoryMetals: 'فلزات',
    categoryGases: 'غازات',
    categoryMinerals: 'معادن',
    categorySpace: 'الفضاء',
    readyCount: 'متاح',
    reactorTelemetry: 'قياسات المفاعل',
    magneticInduction: 'الحث المغناطيسي:',
    vacuumChamber: 'حجرة الفراغ:',
    spectrometer: 'مطياف الكتلة:',
    calibrated: 'معاير',
    simProtocol: 'بروتوكول المحاكاة',
    simProtocolDesc: 'اختر أو اسحب مادتين إلى حجرة التفاعل (أ) و (ب)، ثم اضغط على زر دمج (COMBINE) لمحاكاة التفاعل الكيميائي والترابط.',
    inspectStructure: 'فحص البنية الجزيئية',
    ejectSlotA: 'إخراج المادة أ',
    ejectSlotB: 'إخراج المادة ب',
    collapse: 'طي',
    expand3D: 'توسيع 3D',

    simulationComplete: 'اكتملت المحاكاة',
    observedChange: 'التغير الفيزيائي الملاحظ',
    productState: 'حالة الناتج:',
    reactionType: 'نوع التفاعل:',
    energyTransfer: 'انتقال الطاقة المحاكى:',
    molecularBonding: 'مصفوفة الترابط الجزيئي',
    runAgain: 'إعادة التجربة',
    saveExperiment: 'حفظ التجربة',
    experimentSaved: 'تم حفظ التجربة!',
    threeDInspector: 'الفاحص الجزيئي 3D',
    teachMe: 'اشرح لي علميًا',
    askAi: 'اسأل الذكاء الاصطناعي',

    newDiscovery: 'اكتشاف جديد',
    discoveryAnnouncement: 'اكتشاف جديد! لقد صنعت مادة جديدة: ',
    rareDiscovery: 'اكتشاف نادر',
    voiceAssistant: 'المساعد الصوتي',
    voiceOn: 'الصوت مفعل',
    voiceOff: 'الصوت معطل',
    listening: 'جاري الاستماع...',
    thinking: 'جاري التفكير...',
    speaking: 'جاري التحدث...',

    aiTutorTitle: 'معلم ميكسون الذكي (AI TUTOR)',
    aiTutorSubtitle: 'مرشد علمي رقمي • متصل بسياق المحاكاة النشطة',
    askPlaceholder: 'اطرح أي سؤال علمي حول هذه المادة أو التفاعل...',
    send: 'إرسال',
    clearChat: 'مسح',
    suggestedQuestions: [
      'لماذا حدث هذا التفاعل؟',
      'اشرح لي النتيجة بكلمات بسيطة',
      'ما هي البنية البلورية لهذه المادة؟',
      'لماذا تتحرك هذه الجسيمات بشكل مختلف؟',
      'كيف تؤثر الحرارة على هذا الترابط؟',
      'ما هي إلكترونات التكافؤ المشاركة؟'
    ],

    aboutTitle: 'عن المطور',
    aboutCreatorName: 'محمد سلطان العمري',
    aboutRole: 'صانع ومطور مشروع MIXON',
    aboutAge: 'تم الإنشاء في سن 14 عامًا',
    aboutBio: 'تم ابتكار وتطوير مشروع MIXON بواسطة محمد سلطان العمري في سن 14 عامًا، وهو مختبر رقمي تفاعلي يجمع بين البرمجة والعلوم والتصميم التفاعلي والفضول لتقديم طريقة استثنائية لاستكشاف المادة والخصائص والتفاعلات.',
    aboutMission: 'جعل العلوم تجربة تفاعلية حقيقية وملموسة.',
    aboutTimeline: [
      { title: 'الفكرة', desc: 'الشرارة الأولى لتحويل المعادلات الكيميائية الجافة إلى عالم رقمي تفاعلي ينبض بالحياة.' },
      { title: 'التصميم', desc: 'بناء الهوية البصرية العلمية المستقبلية وهندسة التوازن الهندسي لسهولة الاستخدام.' },
      { title: 'التطوير البرمجي', desc: 'برمجة محركات الفيزياء، والمجسمات الجزيئية ثلاثية الأبعاد، والذكاء الاصطناعي التعليمي.' },
      { title: 'MIXON', desc: 'مختبر رقمي حقيقي يمكن الطلاب والباحثين حول العالم من الاستكشاف والدمج والتعلم.' }
    ],
    aboutSignature: 'صُنِع بواسطة محمد سلطان العمري • MIXON — Explore. Combine. Discover.'
  }
};

const LANG_STORAGE_KEY = 'mixon_active_language';

export function getInitialLanguage(): AppLanguage {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY) as AppLanguage;
    if (saved === 'en' || saved === 'ar') return saved;
  } catch {}
  return 'en';
}

export function saveLanguagePreference(lang: AppLanguage) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  } catch {}
}
