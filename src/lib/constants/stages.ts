import { Stage, PathwayType } from '@/types';

// Pathway colors
export const PATHWAY_COLORS: Record<PathwayType, string> = {
  'lower-limb': '#3b82f6', // Blue
  'bulbar': '#8b5cf6',     // Purple
  'converged': '#6b7280',  // Grey
};

// Lower Limb Pathway (Blue) - L1 to L4
export const LOWER_LIMB_STAGES: Stage[] = [
  {
    id: 'L1',
    code: 'L1',
    name: 'Early Signs',
    subtitle: 'Foot drop, tripping, leg weakness',
    description: 'Initial lower limb symptoms appear. You may notice foot drop, tripping, or weakness in legs. This is the time to establish baseline assessments and begin building your support team.',
    pathway: 'lower-limb',
    order: 1,
    color: PATHWAY_COLORS['lower-limb'],
    duration: 'Usually 1-2 years',
    severity: 1,
    careLevel: 'self-sufficient',
    commonSymptoms: ['Foot drop', 'Tripping', 'Leg weakness', 'Difficulty climbing stairs'],
    nextStageWarnings: ['Increased mobility challenges', 'Need for assistive devices'],
    resources: [
      { id: 'l1-r1', title: 'Understanding Limb Onset', description: 'Learn about lower limb onset MND', category: 'support' },
      { id: 'l1-r2', title: 'Early Physio Assessment', description: 'Physiotherapy evaluation and exercises', category: 'medical' },
      { id: 'l1-r3', title: 'Fall Prevention', description: 'Tips to reduce fall risk at home', category: 'lifestyle' },
    ],
  },
  {
    id: 'L2',
    code: 'L2',
    name: 'Mobility Aids',
    subtitle: 'AFOs, walking sticks, walkers',
    description: 'Mobility support becomes helpful. Ankle-foot orthoses (AFOs) can help with foot drop, and walking aids provide stability and confidence.',
    pathway: 'lower-limb',
    order: 2,
    color: PATHWAY_COLORS['lower-limb'],
    duration: 'Usually 1-3 years',
    severity: 2,
    careLevel: 'self-sufficient',
    commonSymptoms: ['Reduced walking distance', 'Need for support devices', 'Fatigue with mobility'],
    nextStageWarnings: ['Progression to home modifications', 'Decreased independence'],
    resources: [
      { id: 'l2-r1', title: 'OT Assessment', description: 'Occupational therapy mobility assessment', category: 'medical' },
      { id: 'l2-r2', title: 'NDIS Funding', description: 'Funding for mobility equipment', category: 'support' },
      { id: 'l2-r3', title: 'AFO Suppliers', description: 'Local AFO providers and fitting', category: 'equipment' },
    ],
  },
  {
    id: 'L3',
    code: 'L3',
    name: 'Home Modifications',
    subtitle: 'Rails, ramps, stairlifts',
    description: 'Home environment adaptations become important. Grab rails, ramps, and stairlifts help maintain independence and safety at home.',
    pathway: 'lower-limb',
    order: 3,
    color: PATHWAY_COLORS['lower-limb'],
    duration: 'Usually 1-2 years',
    severity: 3,
    careLevel: 'assisted',
    commonSymptoms: ['Inability to use stairs', 'Limited bathroom access', 'Need for accessibility'],
    nextStageWarnings: ['Wheelchair transition becoming imminent', 'May need care assistance'],
    resources: [
      { id: 'l3-r1', title: 'Home Assessment', description: 'OT home modification assessment', category: 'medical' },
      { id: 'l3-r2', title: 'Modification Grants', description: 'Funding for home modifications', category: 'support' },
      { id: 'l3-r3', title: 'Stairlift Options', description: 'Stairlift providers and installation', category: 'equipment' },
    ],
  },
  {
    id: 'L4',
    code: 'L4',
    name: 'Wheelchair Transition',
    subtitle: 'Manual and powered options',
    description: 'Wheelchair use begins. Manual wheelchairs offer flexibility for short distances, while powered wheelchairs provide independence for longer use.',
    pathway: 'lower-limb',
    order: 4,
    color: PATHWAY_COLORS['lower-limb'],
    duration: 'Variable',
    severity: 4,
    careLevel: 'assisted',
    commonSymptoms: ['Unable to walk independently', 'Dependent on mobility equipment', 'May need transport assistance'],
    nextStageWarnings: ['Progression to converged pathway', 'Increasing care needs'],
    resources: [
      { id: 'l4-r1', title: 'Wheelchair Assessment', description: 'Seating and mobility assessment', category: 'medical' },
      { id: 'l4-r2', title: 'Powered Wheelchair Guide', description: 'Choosing the right powered chair', category: 'equipment' },
      { id: 'l4-r3', title: 'Vehicle Modifications', description: 'Wheelchair accessible vehicles', category: 'equipment' },
    ],
  },
];

// Bulbar Pathway (Purple) - B1 to B4
export const BULBAR_STAGES: Stage[] = [
  {
    id: 'B1',
    code: 'B1',
    name: 'Early Signs',
    subtitle: 'Slurred speech, voice changes',
    description: 'Initial bulbar symptoms appear. Speech may become slurred and voice quality may change. Early intervention with speech therapy can help maintain communication.',
    pathway: 'bulbar',
    order: 1,
    color: PATHWAY_COLORS['bulbar'],
    duration: 'Usually 1-2 years',
    severity: 1,
    careLevel: 'self-sufficient',
    commonSymptoms: ['Slurred speech', 'Voice changes', 'Mild swallowing difficulty'],
    nextStageWarnings: ['Speech clarity will decline', 'Consider voice banking'],
    resources: [
      { id: 'b1-r1', title: 'Understanding Bulbar Onset', description: 'Learn about bulbar onset MND', category: 'support' },
      { id: 'b1-r2', title: 'Speech Therapy', description: 'Early speech and language therapy', category: 'medical' },
      { id: 'b1-r3', title: 'Voice Recording', description: 'Recording your voice for future use', category: 'support' },
    ],
  },
  {
    id: 'B2',
    code: 'B2',
    name: 'Speech Support',
    subtitle: 'Therapy, voice banking',
    description: 'Speech support becomes essential. Voice banking preserves your voice for future communication devices. Continue speech therapy to maintain clarity.',
    pathway: 'bulbar',
    order: 2,
    color: PATHWAY_COLORS['bulbar'],
    duration: 'Usually 6-18 months',
    severity: 2,
    careLevel: 'self-sufficient',
    commonSymptoms: ['Significant speech clarity loss', 'Difficulty being understood', 'Slower speech rate'],
    nextStageWarnings: ['AAC devices will soon be needed', 'Communication changes ahead'],
    resources: [
      { id: 'b2-r1', title: 'Voice Banking', description: 'Create a synthetic voice from your recordings', category: 'equipment' },
      { id: 'b2-r2', title: 'Speech Exercises', description: 'Exercises to maintain speech clarity', category: 'medical' },
      { id: 'b2-r3', title: 'Low-Tech AAC', description: 'Simple communication boards and tools', category: 'equipment' },
    ],
  },
  {
    id: 'B3',
    code: 'B3',
    name: 'AAC Devices',
    subtitle: 'Communication aids, eye-gaze',
    description: 'Augmentative and Alternative Communication (AAC) devices become primary communication method. Eye-gaze technology enables continued independence.',
    pathway: 'bulbar',
    order: 3,
    color: PATHWAY_COLORS['bulbar'],
    duration: 'Variable',
    severity: 3,
    careLevel: 'assisted',
    commonSymptoms: ['Speech no longer understandable', 'Dependent on AAC devices', 'May need eye-tracking'],
    nextStageWarnings: ['Swallowing difficulties emerging', 'May progress to feeding tube stage'],
    resources: [
      { id: 'b3-r1', title: 'AAC Assessment', description: 'Assessment for communication devices', category: 'medical' },
      { id: 'b3-r2', title: 'Eye-Gaze Systems', description: 'Eye-tracking communication technology', category: 'equipment' },
      { id: 'b3-r3', title: 'Device Funding', description: 'NDIS funding for AAC devices', category: 'support' },
    ],
  },
  {
    id: 'B4',
    code: 'B4',
    name: 'Swallowing Changes',
    subtitle: 'Modified diet, thickened fluids',
    description: 'Swallowing becomes more difficult. Modified food textures and thickened fluids help maintain safe eating. Dietitian support ensures adequate nutrition.',
    pathway: 'bulbar',
    order: 4,
    color: PATHWAY_COLORS['bulbar'],
    duration: 'Usually 6-12 months',
    severity: 4,
    careLevel: 'assisted',
    commonSymptoms: ['Difficult swallowing', 'Choking risk', 'Reduced food intake'],
    nextStageWarnings: ['PEG feeding tube may be needed', 'Nutrition support essential'],
    resources: [
      { id: 'b4-r1', title: 'Swallow Assessment', description: 'Speech pathology swallowing assessment', category: 'medical' },
      { id: 'b4-r2', title: 'Modified Diet Guide', description: 'Texture-modified food and fluids', category: 'lifestyle' },
      { id: 'b4-r3', title: 'Nutrition Support', description: 'Dietitian support for MND', category: 'medical' },
    ],
  },
];

// Converged Pathway (Grey) - C1 to C4
export const CONVERGED_STAGES: Stage[] = [
  {
    id: 'C1',
    code: 'C1',
    name: 'PEG / Feeding Tube',
    subtitle: 'Nutrition support decisions',
    description: 'Decisions about feeding tube placement. A PEG (Percutaneous Endoscopic Gastrostomy) can ensure adequate nutrition and hydration when swallowing becomes unsafe.',
    pathway: 'converged',
    order: 5,
    color: PATHWAY_COLORS['converged'],
    duration: 'Long-term management',
    severity: 4,
    careLevel: 'assisted',
    commonSymptoms: ['Cannot eat safely', 'Nutrition and hydration challenges', 'May have PEG tube'],
    nextStageWarnings: ['Respiratory support will likely be needed', 'Care needs increasing'],
    resources: [
      { id: 'c1-r1', title: 'PEG Information', description: 'Understanding feeding tube options', category: 'medical' },
      { id: 'c1-r2', title: 'Decision Support', description: 'Making informed choices about PEG', category: 'support' },
      { id: 'c1-r3', title: 'Living with PEG', description: 'Day-to-day PEG management', category: 'lifestyle' },
    ],
  },
  {
    id: 'C2',
    code: 'C2',
    name: 'Respiratory Support',
    subtitle: 'NIV, cough assist devices',
    description: 'Breathing support becomes necessary. Non-invasive ventilation (NIV) and cough assist devices help maintain respiratory function and comfort.',
    pathway: 'converged',
    order: 6,
    color: PATHWAY_COLORS['converged'],
    duration: 'Long-term management',
    severity: 4,
    careLevel: '24/7 support',
    commonSymptoms: ['Shortness of breath', 'Weak cough', 'Sleep apnea', 'Breathing difficulties'],
    nextStageWarnings: ['High level of care support needed', 'Complex medical management'],
    resources: [
      { id: 'c2-r1', title: 'NIV Introduction', description: 'Understanding non-invasive ventilation', category: 'medical' },
      { id: 'c2-r2', title: 'Cough Assist', description: 'Cough assist device information', category: 'equipment' },
      { id: 'c2-r3', title: 'Respiratory Clinic', description: 'Specialist respiratory support', category: 'medical' },
    ],
  },
  {
    id: 'C3',
    code: 'C3',
    name: 'Full-time Care',
    subtitle: 'Care packages, coordination',
    description: 'Around-the-clock care becomes essential. Care coordination ensures all your needs are met with a comprehensive support team.',
    pathway: 'converged',
    order: 7,
    color: PATHWAY_COLORS['converged'],
    duration: 'Long-term',
    severity: 5,
    careLevel: '24/7 support',
    commonSymptoms: ['Severe mobility loss', 'Dependent on carers', 'Complex medical needs', 'Multiple equipment needs'],
    nextStageWarnings: ['Palliative planning important', 'Quality of life focus'],
    resources: [
      { id: 'c3-r1', title: 'Care Package Planning', description: 'Planning full-time care needs', category: 'support' },
      { id: 'c3-r2', title: 'Carer Support', description: 'Support services for carers', category: 'support' },
      { id: 'c3-r3', title: 'Respite Options', description: 'Respite care for families', category: 'support' },
    ],
  },
  {
    id: 'C4',
    code: 'C4',
    name: 'Palliative Planning',
    subtitle: 'End-of-life preferences',
    description: 'Planning for comfort and dignity. Palliative care focuses on quality of life and ensuring your wishes are respected.',
    pathway: 'converged',
    order: 8,
    color: PATHWAY_COLORS['converged'],
    duration: 'Variable',
    severity: 5,
    careLevel: '24/7 support',
    commonSymptoms: ['Approaching end of life', 'Focus on comfort and dignity', 'Advanced care planning'],
    nextStageWarnings: [],
    resources: [
      { id: 'c4-r1', title: 'Advance Care Planning', description: 'Documenting your care preferences', category: 'support' },
      { id: 'c4-r2', title: 'Palliative Care', description: 'Specialist palliative care services', category: 'medical' },
      { id: 'c4-r3', title: 'Family Support', description: 'Support for family and loved ones', category: 'support' },
    ],
  },
];

// All stages combined
export const ALL_STAGES: Stage[] = [
  ...LOWER_LIMB_STAGES,
  ...BULBAR_STAGES,
  ...CONVERGED_STAGES,
];

// Helper to get stages by pathway
export function getStagesByPathway(pathway: PathwayType | 'all'): Stage[] {
  if (pathway === 'all') return ALL_STAGES;
  if (pathway === 'lower-limb') return [...LOWER_LIMB_STAGES, ...CONVERGED_STAGES];
  if (pathway === 'bulbar') return [...BULBAR_STAGES, ...CONVERGED_STAGES];
  return CONVERGED_STAGES;
}

// Helper to get a single stage by ID
export function getStageById(id: string): Stage | undefined {
  return ALL_STAGES.find(s => s.id === id);
}

// Helper to get stages grouped by pathway
export function getStagesGroupedByPathway(pathwayFilter: PathwayType | 'all') {
  return {
    lowerLimb: pathwayFilter === 'all' || pathwayFilter === 'lower-limb' ? LOWER_LIMB_STAGES : [],
    bulbar: pathwayFilter === 'all' || pathwayFilter === 'bulbar' ? BULBAR_STAGES : [],
    converged: CONVERGED_STAGES,
  };
}
