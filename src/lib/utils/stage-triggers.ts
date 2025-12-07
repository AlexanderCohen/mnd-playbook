import { Stage } from '@/types';
import { ALL_STAGES, getStageById } from '@/lib/constants/stages';

export type AlertLevel = 'info' | 'suggested' | 'recommended' | 'urgent';

export interface StageTrigger {
  stageId: string;
  alertLevel: AlertLevel;
  message: string;
  triggeredBy: string[];
}

interface TriggerRule {
  stageId: string;
  check: (answers: Record<string, number>, prevAnswers?: Record<string, number>) => boolean;
  alertLevel: AlertLevel;
  message: string;
  triggeredBy: string[];
}

const TRIGGER_RULES: TriggerRule[] = [
  // Lower Limb Pathway
  {
    stageId: 'L1',
    check: (a) => a.walking === 3 || a.climbing_stairs === 3,
    alertLevel: 'info',
    message: 'You\'ve noted early walking changes. Learn about what to expect.',
    triggeredBy: ['walking', 'climbing_stairs'],
  },
  {
    stageId: 'L2',
    check: (a) => a.walking === 2 || a.climbing_stairs === 2,
    alertLevel: 'suggested',
    message: 'Walking aids may help maintain independence. View mobility aid options.',
    triggeredBy: ['walking', 'climbing_stairs'],
  },
  {
    stageId: 'L2',
    check: (a) => a.walking <= 3 && a.climbing_stairs <= 3 && (a.walking < 4 || a.climbing_stairs < 4),
    alertLevel: 'recommended',
    message: 'Multiple mobility changes detected. Consider OT assessment.',
    triggeredBy: ['walking', 'climbing_stairs'],
  },
  {
    stageId: 'L3',
    check: (a) => a.climbing_stairs === 1,
    alertLevel: 'recommended',
    message: 'Stairs are now very difficult. Consider stairlift or bedroom relocation.',
    triggeredBy: ['climbing_stairs'],
  },
  {
    stageId: 'L3',
    check: (a) => a.walking <= 2 && a.climbing_stairs <= 2 && a.walking > 0 && a.climbing_stairs > 0,
    alertLevel: 'recommended',
    message: 'Mobility significantly affected. Home modification assessment recommended.',
    triggeredBy: ['walking', 'climbing_stairs'],
  },
  {
    stageId: 'L3',
    check: (a) => a.turning_in_bed <= 2,
    alertLevel: 'suggested',
    message: 'Bed mobility changing. Consider hospital bed or rails.',
    triggeredBy: ['turning_in_bed'],
  },
  {
    stageId: 'L4',
    check: (a) => a.walking <= 1,
    alertLevel: 'recommended',
    message: 'Walking is no longer functional. Wheelchair assessment is timely.',
    triggeredBy: ['walking'],
  },
  {
    stageId: 'L4',
    check: (a) => a.walking === 0,
    alertLevel: 'urgent',
    message: 'You\'ve indicated no walking ability. Powered wheelchair options available.',
    triggeredBy: ['walking'],
  },

  // Bulbar Pathway
  {
    stageId: 'B1',
    check: (a) => a.speech === 3 || a.salivation === 3,
    alertLevel: 'info',
    message: 'Speech or saliva changes noticed. Learn about what to expect.',
    triggeredBy: ['speech', 'salivation'],
  },
  {
    stageId: 'B2',
    check: (a) => a.speech === 2,
    alertLevel: 'urgent',
    message: 'Speech clarity declining. Speech therapy and voice banking recommended NOW.',
    triggeredBy: ['speech'],
  },
  {
    stageId: 'B2',
    check: (a) => a.speech === 3,
    alertLevel: 'recommended',
    message: 'Voice banking works best while speech is still clear. Consider starting now.',
    triggeredBy: ['speech'],
  },
  {
    stageId: 'B3',
    check: (a) => a.speech === 1,
    alertLevel: 'recommended',
    message: 'Speech is significantly affected. AAC device assessment recommended.',
    triggeredBy: ['speech'],
  },
  {
    stageId: 'B3',
    check: (a) => a.speech === 0,
    alertLevel: 'urgent',
    message: 'Speech is no longer functional. AAC and eye-gaze options available.',
    triggeredBy: ['speech'],
  },
  {
    stageId: 'B3',
    check: (a) => a.handwriting <= 1 && a.speech <= 2,
    alertLevel: 'urgent',
    message: 'Both speech and writing affected. High-tech AAC assessment needed.',
    triggeredBy: ['speech', 'handwriting'],
  },
  {
    stageId: 'B4',
    check: (a) => a.swallowing === 3,
    alertLevel: 'info',
    message: 'Early swallowing changes. Dietitian review may help.',
    triggeredBy: ['swallowing'],
  },
  {
    stageId: 'B4',
    check: (a) => a.swallowing === 2,
    alertLevel: 'recommended',
    message: 'Diet modifications needed. View texture-modified food resources.',
    triggeredBy: ['swallowing'],
  },
  {
    stageId: 'B4',
    check: (a) => a.swallowing === 1,
    alertLevel: 'urgent',
    message: 'Significant swallowing difficulty. PEG discussion recommended with care team.',
    triggeredBy: ['swallowing'],
  },

  // Converged Pathway
  {
    stageId: 'C1',
    check: (a) => a.swallowing === 1,
    alertLevel: 'recommended',
    message: 'Swallowing significantly affected. PEG timing discussion important.',
    triggeredBy: ['swallowing'],
  },
  {
    stageId: 'C1',
    check: (a) => a.swallowing === 0,
    alertLevel: 'urgent',
    message: 'Unable to swallow safely. PEG or alternative feeding needed.',
    triggeredBy: ['swallowing'],
  },
  {
    stageId: 'C1',
    check: (a) => a.swallowing <= 2 && a.swallowing > 0 && a.dyspnea <= 2,
    alertLevel: 'urgent',
    message: 'Swallowing and breathing both affected. PEG timing is critical—discuss urgently.',
    triggeredBy: ['swallowing', 'dyspnea'],
  },
  {
    stageId: 'C2',
    check: (a) => a.dyspnea === 3,
    alertLevel: 'info',
    message: 'Breathlessness noticed. Respiratory function monitoring recommended.',
    triggeredBy: ['dyspnea'],
  },
  {
    stageId: 'C2',
    check: (a) => a.orthopnea === 2,
    alertLevel: 'suggested',
    message: 'Sleeping flat is difficult. NIV assessment may help sleep quality.',
    triggeredBy: ['orthopnea'],
  },
  {
    stageId: 'C2',
    check: (a) => a.dyspnea === 1 || a.orthopnea === 1,
    alertLevel: 'recommended',
    message: 'Significant breathing changes. NIV discussion recommended.',
    triggeredBy: ['dyspnea', 'orthopnea'],
  },
  {
    stageId: 'C2',
    check: (a) => a.respiratory_insufficiency <= 3 && a.respiratory_insufficiency > 0,
    alertLevel: 'info',
    message: 'You\'re using ventilation support. View NIV optimisation resources.',
    triggeredBy: ['respiratory_insufficiency'],
  },
  {
    stageId: 'C3',
    check: (a) => a.dressing <= 1,
    alertLevel: 'recommended',
    message: 'Self-care requires significant assistance. Care package review recommended.',
    triggeredBy: ['dressing'],
  },
  {
    stageId: 'C3',
    check: (a) => a.turning_in_bed <= 1,
    alertLevel: 'recommended',
    message: 'Bed mobility requires assistance. Overnight care needs may be increasing.',
    triggeredBy: ['turning_in_bed'],
  },
  {
    stageId: 'C3',
    check: (a) => {
      const total = Object.values(a).reduce((sum, v) => sum + v, 0);
      return total <= 20;
    },
    alertLevel: 'recommended',
    message: 'Overall function significantly affected. Comprehensive care coordination recommended.',
    triggeredBy: ['total_score'],
  },
  {
    stageId: 'C4',
    check: (a) => {
      const total = Object.values(a).reduce((sum, v) => sum + v, 0);
      return total <= 15;
    },
    alertLevel: 'suggested',
    message: 'Function significantly affected. Palliative care team can provide comfort-focused support.',
    triggeredBy: ['total_score'],
  },
  {
    stageId: 'C4',
    check: (a) => a.respiratory_insufficiency === 0,
    alertLevel: 'suggested',
    message: 'Advanced respiratory support in place. Palliative planning ensures your wishes are known.',
    triggeredBy: ['respiratory_insufficiency'],
  },
];

export function analyzeTriggers(
  answers: Record<string, number>,
  previousAnswers?: Record<string, number>
): StageTrigger[] {
  const triggered: StageTrigger[] = [];
  const seenStages = new Set<string>();

  for (const rule of TRIGGER_RULES) {
    if (rule.check(answers, previousAnswers)) {
      // Only add highest priority trigger per stage
      if (!seenStages.has(rule.stageId)) {
        triggered.push({
          stageId: rule.stageId,
          alertLevel: rule.alertLevel,
          message: rule.message,
          triggeredBy: rule.triggeredBy,
        });
        seenStages.add(rule.stageId);
      } else {
        // Update if higher priority
        const existing = triggered.find(t => t.stageId === rule.stageId);
        if (existing && getAlertPriority(rule.alertLevel) > getAlertPriority(existing.alertLevel)) {
          existing.alertLevel = rule.alertLevel;
          existing.message = rule.message;
          existing.triggeredBy = rule.triggeredBy;
        }
      }
    }
  }

  // Sort by priority (urgent first)
  return triggered.sort((a, b) => getAlertPriority(b.alertLevel) - getAlertPriority(a.alertLevel));
}

function getAlertPriority(level: AlertLevel): number {
  switch (level) {
    case 'urgent': return 4;
    case 'recommended': return 3;
    case 'suggested': return 2;
    case 'info': return 1;
    default: return 0;
  }
}

export function getAlertColor(level: AlertLevel): string {
  switch (level) {
    case 'urgent': return '#ef4444';      // Red
    case 'recommended': return '#f97316'; // Orange
    case 'suggested': return '#eab308';   // Yellow
    case 'info': return '#22c55e';        // Green
    default: return '#6b7280';            // Gray
  }
}

export function getAlertBgColor(level: AlertLevel): string {
  switch (level) {
    case 'urgent': return '#fef2f2';      // Red-50
    case 'recommended': return '#fff7ed'; // Orange-50
    case 'suggested': return '#fefce8';   // Yellow-50
    case 'info': return '#f0fdf4';        // Green-50
    default: return '#f9fafb';            // Gray-50
  }
}
