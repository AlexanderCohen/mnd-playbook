'use client';

import { Stage } from '@/types';
import { PATHWAY_COLORS } from '@/lib/constants/stages';
import { StageCard } from './stage-card';
import { StageDetailModal } from './stage-detail-modal';
import { useState } from 'react';

interface VerticalTimelineProps {
  lowerLimbStages: Stage[];
  bulbarStages: Stage[];
  convergedStages: Stage[];
  currentStageId?: string | null;
  onStageSelect: (stageId: string) => void;
  activePathway: 'all' | 'lower-limb' | 'bulbar' | 'converged';
}

export function VerticalTimeline({
  lowerLimbStages,
  bulbarStages,
  convergedStages,
  currentStageId,
  onStageSelect,
  activePathway,
}: VerticalTimelineProps) {
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);

  // Determine max length and pad shorter pathway
  const maxPathwayLength = Math.max(lowerLimbStages.length, bulbarStages.length);
  const paddedLowerLimb = [
    ...lowerLimbStages,
    ...Array(Math.max(0, bulbarStages.length - lowerLimbStages.length)).fill(null),
  ];
  const paddedBulbar = [
    ...bulbarStages,
    ...Array(Math.max(0, lowerLimbStages.length - bulbarStages.length)).fill(null),
  ];

  const showLower = activePathway === 'all' || activePathway === 'lower-limb';
  const showBulbar = activePathway === 'all' || activePathway === 'bulbar';

  return (
    <div className="w-full h-full flex flex-col">
      {/* Timeline Section */}
      <div className="flex-1">
        <div className="w-full py-8 md:py-12 px-4 md:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Your MND Journey
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Two distinct pathways that converge
            </p>
          </div>

          {/* Dual Pathway Timeline */}
          <div className="relative">
            {/* Center line - continuous vertical spine */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 md:w-1 bg-gray-300 -translate-x-1/2 z-0" />

            {/* Paired stages */}
            <div className="space-y-8 md:space-y-12 lg:space-y-16">
              {paddedLowerLimb.map((lowerStage, index) => {
                const bullarStage = paddedBulbar[index];

                return (
                  <div key={`pair-${index}`} className="relative">
                    <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-8 xl:gap-16 items-center">
                      {/* LEFT: Lower Limb */}
                      <div className="flex justify-end pr-2 md:pr-4 lg:pr-6">
                        {lowerStage && showLower ? (
                          <div className="relative w-full">
                            {/* Timeline dot - positioned absolutely for perfect center alignment */}
                            <div
                              className="absolute -right-[5px] md:-right-[7px] lg:-right-[9px] top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-blue-500 border-2 md:border-4 border-white rounded-full shadow-lg z-20"
                            />

                            {/* Connector line from card to dot */}
                            <div
                              className="absolute -right-2 md:-right-3 lg:-right-4 top-1/2 -translate-y-1/2 w-2 md:w-3 lg:w-4 h-0.5 md:h-1 bg-blue-300 z-10"
                            />

                            {/* Card */}
                            <div className="relative z-5">
                              <StageCard
                                stage={lowerStage}
                                isCurrentStage={lowerStage.id === currentStageId}
                                onSelect={() => onStageSelect(lowerStage.id)}
                                onExpand={() => setSelectedStage(lowerStage)}
                                color={PATHWAY_COLORS['lower-limb']}
                              />
                            </div>
                          </div>
                        ) : showLower ? (
                          <div className="w-full h-20 md:h-24 lg:h-28" />
                        ) : null}
                      </div>

                      {/* RIGHT: Bulbar */}
                      <div className="flex justify-start pl-2 md:pl-4 lg:pl-6">
                        {bullarStage && showBulbar ? (
                          <div className="relative w-full">
                            {/* Timeline dot */}
                            <div
                              className="absolute -left-[5px] md:-left-[7px] lg:-left-[9px] top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-purple-500 border-2 md:border-4 border-white rounded-full shadow-lg z-20"
                            />

                            {/* Connector line */}
                            <div
                              className="absolute -left-2 md:-left-3 lg:-left-4 top-1/2 -translate-y-1/2 w-2 md:w-3 lg:w-4 h-0.5 md:h-1 bg-purple-300 z-10"
                            />

                            {/* Card */}
                            <div className="relative z-5">
                              <StageCard
                                stage={bullarStage}
                                isCurrentStage={bullarStage.id === currentStageId}
                                onSelect={() => onStageSelect(bullarStage.id)}
                                onExpand={() => setSelectedStage(bullarStage)}
                                color={PATHWAY_COLORS['bulbar']}
                              />
                            </div>
                          </div>
                        ) : showBulbar ? (
                          <div className="w-full h-20 md:h-24 lg:h-28" />
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Convergence Point */}
            {convergedStages.length > 0 && (
              <div className="relative mt-12 md:mt-16 lg:mt-20 pt-8 md:pt-12 lg:pt-16">
                {/* Convergence visual */}
                <div className="flex justify-center mb-8 md:mb-12 lg:mb-16">
                  <div className="relative z-20">
                    {/* Converging lines */}
                    <svg
                      className="absolute w-48 md:w-64 lg:w-96 h-12 md:h-16 -top-6 md:-top-8 left-1/2 -translate-x-1/2"
                      viewBox="0 0 400 64"
                      preserveAspectRatio="none"
                    >
                      {/* Left line converging to center */}
                      <path
                        d="M 0 0 Q 100 32 200 32"
                        stroke="rgb(219, 234, 254)"
                        strokeWidth="3"
                        fill="none"
                      />
                      {/* Right line converging to center */}
                      <path
                        d="M 400 0 Q 300 32 200 32"
                        stroke="rgb(243, 232, 255)"
                        strokeWidth="3"
                        fill="none"
                      />
                    </svg>

                    {/* Convergence dot */}
                    <div className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 bg-gray-500 border-2 md:border-4 border-white rounded-full shadow-lg" />
                  </div>
                </div>

                {/* Convergence label */}
                <div className="text-center mb-8 md:mb-12 lg:mb-16">
                  <p className="text-base md:text-lg lg:text-xl font-bold text-gray-900">
                    Pathways Converge
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">
                    Advanced Disease Support Stage
                  </p>
                </div>

                {/* Converged stages - centered, full width on small screens */}
                <div className="space-y-8 md:space-y-12 lg:space-y-16">
                  {convergedStages.map((stage, index) => (
                    <div key={stage.id} className="relative">
                      {/* Continue center line */}
                      {index < convergedStages.length - 1 && (
                        <div className="absolute left-1/2 top-1/2 bottom-0 w-0.5 md:w-1 bg-gray-300 -translate-x-1/2 translate-y-1/2 z-0" />
                      )}

                      <div className="flex justify-center px-0 md:px-8 lg:px-16">
                        <div className="relative w-full md:max-w-md lg:max-w-lg xl:max-w-xl">
                          {/* Timeline dot */}
                          <div className="absolute -top-3 md:-top-4 left-1/2 w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-gray-500 border-2 md:border-4 border-white rounded-full shadow-lg -translate-x-1/2 z-20" />

                          {/* Card */}
                          <div className="relative z-5 pt-2">
                            <StageCard
                              stage={stage}
                              isCurrentStage={stage.id === currentStageId}
                              onSelect={() => onStageSelect(stage.id)}
                              onExpand={() => setSelectedStage(stage)}
                              color={PATHWAY_COLORS['converged']}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Legend - sticky footer */}
      <div className="border-t border-gray-200 px-4 md:px-6 lg:px-8 py-3 md:py-4">
        <div className="w-full">
          <p className="text-xs font-bold text-gray-700 tracking-wide mb-2 md:mb-3">
            PATHWAY LEGEND
          </p>
          <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-blue-500 flex-shrink-0" />
              <span className="text-xs md:text-sm text-gray-700 truncate">Lower Limb</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-purple-500 flex-shrink-0" />
              <span className="text-xs md:text-sm text-gray-700 truncate">Bulbar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gray-500 flex-shrink-0" />
              <span className="text-xs md:text-sm text-gray-700 truncate">Advanced</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedStage && (
        <StageDetailModal
          stage={selectedStage}
          isCurrentStage={selectedStage.id === currentStageId}
          onClose={() => setSelectedStage(null)}
          onSelect={() => onStageSelect(selectedStage.id)}
          color={PATHWAY_COLORS[selectedStage.pathway]}
        />
      )}
    </div>
  );
}
