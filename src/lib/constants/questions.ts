import { Question } from '@/types';

export type QuestionDomain = 'bulbar' | 'motor' | 'respiratory';

export interface DetailedQuestion extends Question {
  domain: QuestionDomain;
  domainColor: string;
  appQuestion: string;
  whatItMeasures: string;
  guidanceNotes: string[];
  linkedStages: string[];
  timeWarning?: string;
}

export const DOMAIN_COLORS: Record<QuestionDomain, string> = {
  bulbar: '#8b5cf6',     // Purple
  motor: '#3b82f6',      // Blue
  respiratory: '#14b8a6', // Teal
};

export const ALSFRS_QUESTIONS: DetailedQuestion[] = [
  // Domain 1: Bulbar Function (Q1-3)
  {
    id: 'speech',
    domain: 'bulbar',
    domainColor: DOMAIN_COLORS.bulbar,
    category: 'Bulbar Function',
    text: 'Speech',
    appQuestion: 'How is your speech?',
    whatItMeasures: 'Clarity and intelligibility of spoken communication. Tracks bulbar muscle function affecting tongue, lips, and vocal cords.',
    options: [
      { value: 4, label: 'Normal - Speech completely normal, understood easily in all situations' },
      { value: 3, label: 'Slight difficulty - Changes noticed but always understood without repeating' },
      { value: 2, label: 'Need to repeat - Still intelligible but frequently need to repeat words' },
      { value: 1, label: 'Speech + other methods - Use combination of speech with writing/gestures/apps' },
      { value: 0, label: 'Unable to speak - No useful speech, rely on AAC/eye-gaze/writing' },
    ],
    guidanceNotes: [
      'Rate speech in typical daily situations, not best or worst moments',
      'Consider how easily unfamiliar people understand you',
      'Phone/video calls are a good benchmark—harder than face-to-face',
    ],
    linkedStages: ['B1', 'B2', 'B3'],
    timeWarning: 'Voice banking is most effective at scores 3-4. Don\'t wait until speech is significantly affected.',
  },
  {
    id: 'salivation',
    domain: 'bulbar',
    domainColor: DOMAIN_COLORS.bulbar,
    category: 'Bulbar Function',
    text: 'Salivation',
    appQuestion: 'How is your saliva control?',
    whatItMeasures: 'Ability to manage saliva, including swallowing naturally and preventing drooling.',
    options: [
      { value: 4, label: 'Normal - Normal saliva control, no pooling or drooling' },
      { value: 3, label: 'Slight excess - Mild increase, may swallow more consciously, no drooling' },
      { value: 2, label: 'Moderately excessive - Occasional minimal drooling when concentrating' },
      { value: 1, label: 'Marked excess - Regular drooling requiring frequent tissues' },
      { value: 0, label: 'Constant drooling - Continuous drooling requiring constant management' },
    ],
    guidanceNotes: [
      'Saliva production doesn\'t increase—the issue is reduced swallowing frequency',
      'Medications can help manage excess saliva',
      'Positioning affects saliva control',
    ],
    linkedStages: ['B1', 'B4'],
  },
  {
    id: 'swallowing',
    domain: 'bulbar',
    domainColor: DOMAIN_COLORS.bulbar,
    category: 'Bulbar Function',
    text: 'Swallowing',
    appQuestion: 'How is your swallowing?',
    whatItMeasures: 'Safety and ease of eating and drinking. Tracks choking risk and need for dietary modifications.',
    options: [
      { value: 4, label: 'Normal - No difficulty with any food textures or liquids' },
      { value: 3, label: 'Early problems - Occasional choking, may avoid certain foods, meals take longer' },
      { value: 2, label: 'Diet changes needed - Requires texture-modified foods and/or thickened liquids' },
      { value: 1, label: 'Supplemental feeding - Cannot meet needs by mouth alone, uses PEG to supplement' },
      { value: 0, label: 'Unable to swallow - Nothing by mouth, all nutrition via feeding tube' },
    ],
    guidanceNotes: [
      'Coughing during/after meals suggests swallowing difficulty',
      'Weight loss may indicate problems before you notice difficulty',
      'Speech pathologist can do formal swallow assessment',
    ],
    linkedStages: ['B4', 'C1'],
    timeWarning: 'PEG insertion is safer while respiratory function is good. Discuss timing if both swallowing AND breathing are declining.',
  },
  // Domain 2: Motor Function (Q4-9)
  {
    id: 'handwriting',
    domain: 'motor',
    domainColor: DOMAIN_COLORS.motor,
    category: 'Motor Function',
    text: 'Handwriting',
    appQuestion: 'How is your handwriting?',
    whatItMeasures: 'Fine motor control of dominant hand, grip strength, and coordination.',
    options: [
      { value: 4, label: 'Normal - Same as before MND, write at normal speed' },
      { value: 3, label: 'Slow or sloppy - Slower but all words still legible' },
      { value: 2, label: 'Some words illegible - Some words cannot be read by others' },
      { value: 1, label: 'Can grip pen only - Can hold pen but cannot write legible words' },
      { value: 0, label: 'Unable to grip pen - Cannot grip or hold a pen' },
    ],
    guidanceNotes: [
      'Compare to your own previous handwriting',
      'Consider signing your name as a benchmark',
      'Typing ability is separate from handwriting',
    ],
    linkedStages: ['B3'],
  },
  {
    id: 'cutting_food',
    domain: 'motor',
    domainColor: DOMAIN_COLORS.motor,
    category: 'Motor Function',
    text: 'Cutting Food',
    appQuestion: 'How do you manage cutting food and using utensils?',
    whatItMeasures: 'Upper limb function for feeding, grip strength, coordination during meals.',
    options: [
      { value: 4, label: 'Normal - Cut all foods without difficulty, use utensils normally' },
      { value: 3, label: 'Slow but independent - Somewhat slow/clumsy but manage all foods' },
      { value: 2, label: 'Some help needed - Need help with tough items, may use adaptive utensils' },
      { value: 1, label: 'Food pre-cut - Food must be cut by someone else before eating' },
      { value: 0, label: 'Must be fed - Unable to feed self, require another person' },
    ],
    guidanceNotes: [
      'Consider typical meals, not just easy foods',
      'Adaptive utensils are available',
      'This is about hand/arm function, separate from swallowing',
    ],
    linkedStages: ['C3'],
  },
  {
    id: 'dressing',
    domain: 'motor',
    domainColor: DOMAIN_COLORS.motor,
    category: 'Motor Function',
    text: 'Dressing & Hygiene',
    appQuestion: 'How do you manage dressing and personal hygiene?',
    whatItMeasures: 'Independence in self-care including dressing, bathing, grooming, toileting.',
    options: [
      { value: 4, label: 'Normal - Completely independent, manage buttons/zips/laces' },
      { value: 3, label: 'Slower but independent - Takes longer but manage everything without help' },
      { value: 2, label: 'Some assistance - Need help with specific tasks like buttons or washing' },
      { value: 1, label: 'Significant assistance - Need help with most dressing/hygiene tasks' },
      { value: 0, label: 'Total dependence - Require full assistance for all self-care' },
    ],
    guidanceNotes: [
      'Include all personal care: dressing, showering, hair, teeth, toileting',
      'Adaptive equipment can help maintain independence',
      'Consider both upper and lower body dressing',
    ],
    linkedStages: ['L3', 'C3'],
  },
  {
    id: 'turning_in_bed',
    domain: 'motor',
    domainColor: DOMAIN_COLORS.motor,
    category: 'Motor Function',
    text: 'Turning in Bed',
    appQuestion: 'How do you manage turning in bed and adjusting covers?',
    whatItMeasures: 'Ability to reposition in bed, roll over, adjust position for comfort.',
    options: [
      { value: 4, label: 'Normal - Turn and adjust position freely, manage covers independently' },
      { value: 3, label: 'Slower but independent - Takes effort, plan movements more deliberately' },
      { value: 2, label: 'Can turn with difficulty - Significant effort, may use rails or slide sheets' },
      { value: 1, label: 'Can initiate turn - Can start but cannot complete turn independently' },
      { value: 0, label: 'Unable - Cannot turn without complete assistance' },
    ],
    guidanceNotes: [
      'Affects sleep quality and pressure sore risk',
      'Hospital beds with rails can extend independence',
      'Satin/silk sheets reduce friction',
    ],
    linkedStages: ['L3', 'C3'],
  },
  {
    id: 'walking',
    domain: 'motor',
    domainColor: DOMAIN_COLORS.motor,
    category: 'Motor Function',
    text: 'Walking',
    appQuestion: 'How is your walking?',
    whatItMeasures: 'Ability to walk, balance, lower limb strength, and endurance.',
    options: [
      { value: 4, label: 'Normal - Walking unchanged, no difficulty with any surfaces or distances' },
      { value: 3, label: 'Early difficulty - Noticeable changes (slower, foot drop, tripping)' },
      { value: 2, label: 'Walking with aids - Need AFO, stick, or walker to walk safely' },
      { value: 1, label: 'Non-functional walking - Can transfer but cannot walk for daily activities' },
      { value: 0, label: 'Unable to walk - Fully dependent on wheelchair' },
    ],
    guidanceNotes: [
      '"Functional walking" means walking that serves a purpose in daily life',
      'Consider both indoor and outdoor walking',
      'Falls and near-falls are important safety indicators',
    ],
    linkedStages: ['L1', 'L2', 'L4'],
  },
  {
    id: 'climbing_stairs',
    domain: 'motor',
    domainColor: DOMAIN_COLORS.motor,
    category: 'Motor Function',
    text: 'Climbing Stairs',
    appQuestion: 'How do you manage climbing stairs?',
    whatItMeasures: 'Lower limb strength, endurance, and balance for stair navigation.',
    options: [
      { value: 4, label: 'Normal - Climb without difficulty, don\'t need handrail' },
      { value: 3, label: 'Slow - Noticeably slower, may prefer handrail for confidence' },
      { value: 2, label: 'Unsteady / need rail - Require handrail for safety, may need rest breaks' },
      { value: 1, label: 'Need assistance - Cannot climb without physical help from another person' },
      { value: 0, label: 'Unable - Cannot climb stairs, use stairlift or live on single level' },
    ],
    guidanceNotes: [
      'Consider your most frequently used stairs',
      'Going down is often harder than going up',
      'Stairlifts and bedroom relocation are common adaptations',
    ],
    linkedStages: ['L1', 'L2', 'L3'],
  },
  // Domain 3: Respiratory Function (Q10-12)
  {
    id: 'dyspnea',
    domain: 'respiratory',
    domainColor: DOMAIN_COLORS.respiratory,
    category: 'Respiratory Function',
    text: 'Breathlessness',
    appQuestion: 'Do you experience shortness of breath?',
    whatItMeasures: 'Breathing comfort during various activity levels.',
    options: [
      { value: 4, label: 'None - No shortness of breath, normal breathing at rest and with activity' },
      { value: 3, label: 'With walking - Breathless when walking or climbing, comfortable at rest' },
      { value: 2, label: 'With eating/bathing - Breathless during light activities' },
      { value: 1, label: 'At rest - Short of breath even when sitting or lying still' },
      { value: 0, label: 'Significant difficulty - Severe breathing difficulty, may need ventilation' },
    ],
    guidanceNotes: [
      'Breathing difficulties often develop gradually',
      'Morning headaches and poor sleep can indicate nighttime breathing issues',
      'Respiratory function tests give objective measures',
    ],
    linkedStages: ['C2'],
  },
  {
    id: 'orthopnea',
    domain: 'respiratory',
    domainColor: DOMAIN_COLORS.respiratory,
    category: 'Respiratory Function',
    text: 'Breathing Lying Flat',
    appQuestion: 'How is your breathing when lying flat?',
    whatItMeasures: 'Respiratory muscle function when gravity doesn\'t assist breathing.',
    options: [
      { value: 4, label: 'Normal - Can lie flat without breathing discomfort' },
      { value: 3, label: 'Some difficulty sleeping - Occasional awareness of breathing at night' },
      { value: 2, label: 'Need 2+ pillows - Must sleep propped up, lying flat causes discomfort' },
      { value: 1, label: 'Can only sleep sitting - Cannot lie flat, must sleep in recliner/elevated' },
      { value: 0, label: 'Unable to sleep - Cannot sleep without NIV/BiPAP support' },
    ],
    guidanceNotes: [
      'Often the first noticeable respiratory symptom',
      'Waking with headaches suggests nocturnal breathing problems',
      'NIV dramatically improves sleep quality and symptoms',
    ],
    linkedStages: ['C2'],
  },
  {
    id: 'respiratory_insufficiency',
    domain: 'respiratory',
    domainColor: DOMAIN_COLORS.respiratory,
    category: 'Respiratory Function',
    text: 'Ventilation Support',
    appQuestion: 'Do you use breathing/ventilation support?',
    whatItMeasures: 'Current use of mechanical breathing assistance.',
    options: [
      { value: 4, label: 'None needed - Breathing independently all day and night' },
      { value: 3, label: 'Intermittent use - Use NIV occasionally, not every night' },
      { value: 2, label: 'Continuous at night - Use NIV every night, independent during day' },
      { value: 1, label: 'Continuous day & night - Need NIV for significant portions of day and all night' },
      { value: 0, label: 'Invasive ventilation - Require tracheostomy or 22+ hours NIV daily' },
    ],
    guidanceNotes: [
      'CPAP for sleep apnoea is NOT the same as NIV for MND',
      'NIV typically means BiPAP with inhale and exhale pressure support',
      'This tracks dependence, not just equipment availability',
    ],
    linkedStages: ['C2', 'C4'],
  },
];

// Calculate domain scores from answers
export function calculateDomainScores(answers: Record<string, number>) {
  const bulbarQuestions = ['speech', 'salivation', 'swallowing'];
  const motorQuestions = ['handwriting', 'cutting_food', 'dressing', 'turning_in_bed', 'walking', 'climbing_stairs'];
  const respiratoryQuestions = ['dyspnea', 'orthopnea', 'respiratory_insufficiency'];

  const sumDomain = (questions: string[]) =>
    questions.reduce((sum, q) => sum + (answers[q] ?? 0), 0);

  return {
    bulbar: { score: sumDomain(bulbarQuestions), max: 12 },
    motor: { score: sumDomain(motorQuestions), max: 24 },
    respiratory: { score: sumDomain(respiratoryQuestions), max: 12 },
    total: { score: sumDomain([...bulbarQuestions, ...motorQuestions, ...respiratoryQuestions]), max: 48 },
  };
}
