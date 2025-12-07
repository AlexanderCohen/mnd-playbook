// Assessment represents a monthly ALSFRS-R questionnaire submission
export interface Assessment {
  id?: number;
  date: string; // ISO date
  answers: Record<string, number>; // questionId -> score (0-4)
  totalScore: number; // 0-48
  notes?: string;
}

// Pathway types
export type PathwayType = 'lower-limb' | 'bulbar' | 'converged';

// Resource link
export interface Resource {
  id: string;
  title: string;
  description: string;
  category?: 'medical' | 'equipment' | 'support' | 'lifestyle';
  url?: string;
}

// Stage represents a disease progression stage
export interface Stage {
  id: string; // e.g., 'L1', 'B2', 'C3'
  code: string; // Display code e.g., 'L1', 'B2'
  name: string;
  subtitle: string;
  description: string;
  pathway: PathwayType;
  order: number;
  color: string;
  resources: Resource[];

  // New fields for progression visualization
  duration?: string; // e.g., "Usually 1-2 years"
  severity: 1 | 2 | 3 | 4 | 5; // Severity scale (1=mild, 5=severe)
  careLevel: 'self-sufficient' | 'assisted' | '24/7 support';
  commonSymptoms?: string[];
  nextStageWarnings?: string[];
}

// User's position in their journey (can be on multiple pathways)
export interface UserPosition {
  currentStageId: string;
  pathway: PathwayType;
  updatedAt: string;
}

// Note for a specific stage
export interface StageNote {
  id?: number;
  stageId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// Question for ALSFRS-R assessment
export interface Question {
  id: string;
  category: string;
  text: string;
  options: { value: number; label: string }[];
  domain?: string;
  domainColor?: string;
  appQuestion?: string;
  whatItMeasures?: string;
  guidanceNotes?: string[];
  linkedStages?: string[];
  timeWarning?: string;
}
