'use client';

import { Stage } from '@/types';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { StageCard } from './stage-card';

interface StageSectionProps {
  pathway: 'lower-limb' | 'bulbar' | 'converged';
  pathwayLabel: string;
  color: string;
  stages: Stage[];
  currentStageId?: string | null;
  onStageSelect: (stageId: string) => void;
}

export function StageSection({
  pathway,
  pathwayLabel,
  color,
  stages,
  currentStageId,
  onStageSelect,
}: StageSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (stages.length === 0) return null;

  return (
    <div className="mb-8">
      {/* Pathway Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-3 mb-4 group"
      >
        <div
          className="w-1 h-8 rounded-full transition-all group-hover:h-10"
          style={{ backgroundColor: color }}
        />
        <h2 className="text-lg font-semibold text-gray-900 flex-1 text-left">
          {pathwayLabel}
        </h2>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
        <span className="text-sm text-gray-500">{stages.length} stages</span>
      </button>

      {/* Stages List */}
      {isExpanded && (
        <div className="space-y-3">
          {stages.map((stage, index) => (
            <div key={stage.id}>
              <StageCard
                stage={stage}
                isCurrentStage={stage.id === currentStageId}
                onSelect={() => onStageSelect(stage.id)}
                onExpand={() => onStageSelect(stage.id)}
                color={color}
              />
              {/* Connector between stages */}
              {index < stages.length - 1 && (
                <div className="flex justify-center py-1">
                  <div
                    className="w-1 h-6 rounded-full"
                    style={{ backgroundColor: color, opacity: 0.3 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
