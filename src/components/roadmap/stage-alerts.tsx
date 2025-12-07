'use client';

import * as React from 'react';
import { AlertCircle, Info, AlertTriangle, XCircle, ChevronRight } from 'lucide-react';
import { StageTrigger, getAlertColor, getAlertBgColor } from '@/lib/utils/stage-triggers';
import { getStageById } from '@/lib/constants/stages';
import { cn } from '@/lib/utils/cn';

interface StageAlertsProps {
  triggers: StageTrigger[];
  onStageClick: (stageId: string) => void;
}

const alertIcons = {
  urgent: XCircle,
  recommended: AlertTriangle,
  suggested: AlertCircle,
  info: Info,
};

export function StageAlerts({ triggers, onStageClick }: StageAlertsProps) {
  if (triggers.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm sm:text-base font-semibold uppercase tracking-wide text-gray-500">
        Suggested Stages Based on Your Score
      </h3>
      {triggers.slice(0, 4).map((trigger, i) => {
        const stage = getStageById(trigger.stageId);
        const Icon = alertIcons[trigger.alertLevel];
        const color = getAlertColor(trigger.alertLevel);
        const bgColor = getAlertBgColor(trigger.alertLevel);

        return (
          <button
            key={`${trigger.stageId}-${i}`}
            onClick={() => onStageClick(trigger.stageId)}
            className={cn(
              'w-full rounded-xl p-4 text-left transition-all',
              // Large touch targets for eye gaze - min 70px height
              'min-h-[70px] flex items-start gap-4',
              'hover:opacity-90 active:opacity-80',
              'focus:outline-none focus:ring-4 focus:ring-blue-300'
            )}
            style={{ backgroundColor: bgColor }}
            aria-label={`View ${stage?.name} stage: ${trigger.message}`}
          >
            <Icon className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color }} />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="font-bold text-sm sm:text-base px-2.5 py-1 rounded"
                  style={{ backgroundColor: stage?.color, color: 'white' }}
                >
                  {trigger.stageId}
                </span>
                <span className="font-medium text-gray-900 text-base">{stage?.name}</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mt-1.5 leading-relaxed">{trigger.message}</p>
            </div>
            <ChevronRight className="h-6 w-6 flex-shrink-0 text-gray-400" />
          </button>
        );
      })}
    </div>
  );
}
