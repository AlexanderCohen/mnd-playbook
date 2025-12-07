'use client';

import * as React from 'react';
import { HelpCircle, MapPin } from 'lucide-react';
import { useAppStore } from '@/lib/stores/app-store';
import { getStageById, getStagesGroupedByPathway } from '@/lib/constants/stages';
import { PathwaySelector } from './pathway-selector';
import { VerticalTimeline } from './vertical-timeline';
import { ScoreSummary } from './score-summary';
import { StageAlerts } from './stage-alerts';
import { analyzeTriggers } from '@/lib/utils/stage-triggers';
import { ScrollControls } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

export function RoadmapView() {
  const {
    currentStageId,
    activePathway,
    latestScore,
    setCurrentStage,
    setActivePathway,
  } = useAppStore();

  const [showHelp, setShowHelp] = React.useState(false);
  const timelineScrollRef = React.useRef<HTMLDivElement>(null);
  const currentStage = currentStageId ? getStageById(currentStageId) : null;

  // Get grouped stages
  const stagesByPathway = getStagesGroupedByPathway(activePathway);

  return (
    <div ref={timelineScrollRef} className="h-screen flex flex-col relative overflow-auto">
      {/* Scroll Controls for the entire roadmap */}
      <ScrollControls containerRef={timelineScrollRef} position="right" autoHide={false} />
      {/* Header - Compact and clean */}
      <div className="border-b border-gray-200 px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 flex-shrink-0">
        <div className="w-full">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                MND Disease Progression
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-2">
                Understand your journey through different disease stages
              </p>

              {/* Current stage indicator */}
              {currentStage && (
                <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-200">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm font-medium">
                    <strong>Current:</strong> {currentStage.code} - {currentStage.name}
                  </span>
                </div>
              )}
            </div>

            {/* Help button */}
            <button
              onClick={() => setShowHelp(!showHelp)}
              className={cn(
                'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                showHelp
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
              aria-label="Toggle help"
              title="Show help"
            >
              <HelpCircle className="h-6 w-6" />
            </button>
          </div>

          {/* Help section - collapsible */}
          {showHelp && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2 text-sm">
                How to use this timeline:
              </h3>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• <strong>Left side:</strong> Lower Limb Onset progression (stages L1-L4)</li>
                <li>• <strong>Right side:</strong> Bulbar Onset progression (stages B1-B4)</li>
                <li>• <strong>Center:</strong> Both pathways converge at Advanced Disease Support (stages C1-C4)</li>
                <li>• <strong>Click any stage:</strong> Expand to view details, resources, and symptoms</li>
                <li>• <strong>Mark stages:</strong> Track your current position in the disease progression</li>
              </ul>
            </div>
          )}

          {/* Controls row */}
          <div className="mt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-gray-700 tracking-wide mb-2">
                FILTER PATHWAYS
              </p>
              <PathwaySelector
                activePathway={activePathway}
                onSelect={setActivePathway}
              />
            </div>

            {/* Score summary - inline when available */}
            {latestScore && (
              <div className="flex-1 min-w-0">
                <ScoreSummary
                  total={latestScore.total}
                  bulbar={latestScore.bulbar}
                  motor={latestScore.motor}
                  respiratory={latestScore.respiratory}
                  date={latestScore.date}
                />
              </div>
            )}
          </div>

          {/* Stage alerts */}
          {latestScore && (
            <div className="mt-4">
              <StageAlerts
                triggers={analyzeTriggers(latestScore.answers)}
                onStageClick={() => {}}
              />
            </div>
          )}
        </div>
      </div>

      {/* Main timeline - takes all available space */}
      <div className="flex-1 min-h-0">
        <VerticalTimeline
          lowerLimbStages={stagesByPathway.lowerLimb}
          bulbarStages={stagesByPathway.bulbar}
          convergedStages={stagesByPathway.converged}
          currentStageId={currentStageId}
          onStageSelect={setCurrentStage}
          activePathway={activePathway}
        />
      </div>
    </div>
  );
}
