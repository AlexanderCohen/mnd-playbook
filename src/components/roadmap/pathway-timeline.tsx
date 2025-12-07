'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { Stage, PathwayType } from '@/types';
import {
  LOWER_LIMB_STAGES,
  BULBAR_STAGES,
  CONVERGED_STAGES,
  PATHWAY_COLORS,
} from '@/lib/constants/stages';
import { StageCard } from './stage-card';
import { cn } from '@/lib/utils/cn';

type PathwayFilter = PathwayType | 'all';

interface PathwayTimelineProps {
  activePathway: PathwayFilter;
  currentStageId: string | null;
  selectedStageId: string | null;
  onStageSelect: (stage: Stage) => void;
}

// Vertical stage list for mobile - better for eye gaze
function VerticalStageList({
  stages,
  currentStageId,
  selectedStageId,
  onStageSelect,
  pathwayLabel,
  pathwayColor,
}: {
  stages: Stage[];
  currentStageId: string | null;
  selectedStageId: string | null;
  onStageSelect: (stage: Stage) => void;
  pathwayLabel?: string;
  pathwayColor?: string;
}) {
  return (
    <div className="space-y-3">
      {pathwayLabel && (
        <div
          className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-bold text-white"
          style={{ backgroundColor: pathwayColor }}
        >
          {pathwayLabel}
        </div>
      )}
      <div className="space-y-3">
        {stages.map((stage, i) => (
          <React.Fragment key={stage.id}>
            <StageCard
              stage={stage}
              isCurrentStage={stage.id === currentStageId}
              onSelect={() => onStageSelect(stage)}
              onExpand={() => onStageSelect(stage)}
              color={stage.color}
            />
            {i < stages.length - 1 && (
              <div className="flex justify-center">
                <div
                  className="h-6 w-1.5 rounded"
                  style={{ backgroundColor: stage.color }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export function PathwayTimeline({
  activePathway,
  currentStageId,
  selectedStageId,
  onStageSelect,
}: PathwayTimelineProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right' | 'up' | 'down') => {
    if (scrollRef.current) {
      const amount = 200;
      if (direction === 'left' || direction === 'right') {
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -amount : amount,
          behavior: 'smooth',
        });
      } else {
        scrollRef.current.scrollBy({
          top: direction === 'up' ? -amount : amount,
          behavior: 'smooth',
        });
      }
    }
  };

  // Get stages based on active pathway
  const getStagesForPathway = () => {
    switch (activePathway) {
      case 'lower-limb':
        return [...LOWER_LIMB_STAGES, ...CONVERGED_STAGES];
      case 'bulbar':
        return [...BULBAR_STAGES, ...CONVERGED_STAGES];
      case 'converged':
        return CONVERGED_STAGES;
      default:
        return [];
    }
  };

  return (
    <div className="relative">
      {/* Mobile: Vertical scroll buttons - large for eye gaze */}
      <div className="md:hidden">
        <button
          onClick={() => scroll('up')}
          className={cn(
            'absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-full bg-white shadow-lg',
            'min-h-[56px] min-w-[56px] flex items-center justify-center',
            'hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300',
            'active:bg-gray-100'
          )}
          aria-label="Scroll up"
        >
          <ChevronUp className="h-8 w-8" />
        </button>
        <button
          onClick={() => scroll('down')}
          className={cn(
            'absolute bottom-0 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white shadow-lg',
            'min-h-[56px] min-w-[56px] flex items-center justify-center',
            'hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300',
            'active:bg-gray-100'
          )}
          aria-label="Scroll down"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>

      {/* Desktop: Horizontal scroll buttons - large for accessibility */}
      <div className="hidden md:block">
        <button
          onClick={() => scroll('left')}
          className={cn(
            'absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow-lg',
            'min-h-[56px] min-w-[56px] flex items-center justify-center',
            'hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300',
            'active:bg-gray-100'
          )}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          onClick={() => scroll('right')}
          className={cn(
            'absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow-lg',
            'min-h-[56px] min-w-[56px] flex items-center justify-center',
            'hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300',
            'active:bg-gray-100'
          )}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>

      {/* Timeline container */}
      <div
        ref={scrollRef}
        className={cn(
          'scrollbar-hide',
          // Mobile: vertical scroll
          'overflow-y-auto overflow-x-hidden px-4 py-16 max-h-[60vh]',
          // Desktop: horizontal scroll
          'md:overflow-x-auto md:overflow-y-hidden md:px-16 md:py-4 md:max-h-none'
        )}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Mobile: Vertical layout */}
        <div className="md:hidden">
          {activePathway === 'all' ? (
            <div className="space-y-8">
              {/* Lower Limb section */}
              <VerticalStageList
                stages={LOWER_LIMB_STAGES}
                currentStageId={currentStageId}
                selectedStageId={selectedStageId}
                onStageSelect={onStageSelect}
                pathwayLabel="LOWER LIMB"
                pathwayColor={PATHWAY_COLORS['lower-limb']}
              />

              {/* Convergence indicator */}
              <div className="flex items-center justify-center py-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-gray-300 bg-white text-sm font-bold text-gray-500">
                  JOIN
                </div>
              </div>

              {/* Bulbar section */}
              <VerticalStageList
                stages={BULBAR_STAGES}
                currentStageId={currentStageId}
                selectedStageId={selectedStageId}
                onStageSelect={onStageSelect}
                pathwayLabel="BULBAR"
                pathwayColor={PATHWAY_COLORS['bulbar']}
              />

              {/* Converged section */}
              <div className="pt-4 border-t-2 border-gray-200">
                <VerticalStageList
                  stages={CONVERGED_STAGES}
                  currentStageId={currentStageId}
                  selectedStageId={selectedStageId}
                  onStageSelect={onStageSelect}
                  pathwayLabel="CONVERGED"
                  pathwayColor={PATHWAY_COLORS['converged']}
                />
              </div>
            </div>
          ) : (
            <VerticalStageList
              stages={getStagesForPathway()}
              currentStageId={currentStageId}
              selectedStageId={selectedStageId}
              onStageSelect={onStageSelect}
            />
          )}
        </div>

        {/* Desktop: Horizontal layout */}
        <div className="hidden md:block min-w-max">
          {/* All pathways view - show dual paths converging */}
          {activePathway === 'all' && (
            <div className="flex flex-col gap-4">
              {/* Lower Limb Row */}
              <div className="flex items-center">
                <div
                  className="mr-4 flex h-10 items-center rounded-lg px-4 text-sm font-bold text-white"
                  style={{ backgroundColor: PATHWAY_COLORS['lower-limb'] }}
                >
                  LOWER LIMB
                </div>
                <div className="flex items-center gap-3">
                  {LOWER_LIMB_STAGES.map((stage, i) => (
                    <React.Fragment key={stage.id}>
                      <StageCard
                        stage={stage}
                        isCurrentStage={stage.id === currentStageId}
                        onSelect={() => onStageSelect(stage)}
                        onExpand={() => onStageSelect(stage)}
                        color={stage.color}
                      />
                      {i < LOWER_LIMB_STAGES.length - 1 && (
                        <div className="h-1.5 w-8 rounded" style={{ backgroundColor: stage.color }} />
                      )}
                    </React.Fragment>
                  ))}
                  {/* Connector line to convergence */}
                  <div className="flex items-center">
                    <div className="h-1.5 w-10 rounded bg-gray-300" />
                    <div className="h-10 w-1.5 rounded bg-gray-300" />
                  </div>
                </div>
              </div>

              {/* Converged Row - centered */}
              <div className="flex items-center justify-end">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-gray-300 bg-white text-sm font-bold text-gray-500">
                    JOIN
                  </div>
                  <div className="h-1.5 w-6 rounded bg-gray-400" />
                  {CONVERGED_STAGES.map((stage, i) => (
                    <React.Fragment key={stage.id}>
                      <StageCard
                        stage={stage}
                        isCurrentStage={stage.id === currentStageId}
                        onSelect={() => onStageSelect(stage)}
                        onExpand={() => onStageSelect(stage)}
                        color={stage.color}
                      />
                      {i < CONVERGED_STAGES.length - 1 && (
                        <div className="h-1.5 w-8 rounded" style={{ backgroundColor: stage.color }} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Bulbar Row */}
              <div className="flex items-center">
                <div
                  className="mr-4 flex h-10 items-center rounded-lg px-4 text-sm font-bold text-white"
                  style={{ backgroundColor: PATHWAY_COLORS['bulbar'] }}
                >
                  BULBAR
                </div>
                <div className="flex items-center gap-3">
                  {BULBAR_STAGES.map((stage, i) => (
                    <React.Fragment key={stage.id}>
                      <StageCard
                        stage={stage}
                        isCurrentStage={stage.id === currentStageId}
                        onSelect={() => onStageSelect(stage)}
                        onExpand={() => onStageSelect(stage)}
                        color={stage.color}
                      />
                      {i < BULBAR_STAGES.length - 1 && (
                        <div className="h-1.5 w-8 rounded" style={{ backgroundColor: stage.color }} />
                      )}
                    </React.Fragment>
                  ))}
                  {/* Connector line to convergence */}
                  <div className="flex items-center">
                    <div className="h-1.5 w-10 rounded bg-gray-300" />
                    <div className="-mt-10 h-10 w-1.5 rounded bg-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Single pathway view - Lower Limb */}
          {activePathway === 'lower-limb' && (
            <div className="flex items-center gap-3">
              {[...LOWER_LIMB_STAGES, ...CONVERGED_STAGES].map((stage, i, arr) => (
                <React.Fragment key={stage.id}>
                  <StageCard
                    stage={stage}
                    isCurrentStage={stage.id === currentStageId}
                    onSelect={() => onStageSelect(stage)}
                    onExpand={() => onStageSelect(stage)}
                    color={stage.color}
                  />
                  {i < arr.length - 1 && (
                    <div
                      className="h-1.5 w-10 rounded"
                      style={{ backgroundColor: i < LOWER_LIMB_STAGES.length - 1 ? PATHWAY_COLORS['lower-limb'] : '#9ca3af' }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Single pathway view - Bulbar */}
          {activePathway === 'bulbar' && (
            <div className="flex items-center gap-3">
              {[...BULBAR_STAGES, ...CONVERGED_STAGES].map((stage, i, arr) => (
                <React.Fragment key={stage.id}>
                  <StageCard
                    stage={stage}
                    isCurrentStage={stage.id === currentStageId}
                    onSelect={() => onStageSelect(stage)}
                    onExpand={() => onStageSelect(stage)}
                    color={stage.color}
                  />
                  {i < arr.length - 1 && (
                    <div
                      className="h-1.5 w-10 rounded"
                      style={{ backgroundColor: i < BULBAR_STAGES.length - 1 ? PATHWAY_COLORS['bulbar'] : '#9ca3af' }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Converged only */}
          {activePathway === 'converged' && (
            <div className="flex items-center gap-3">
              {CONVERGED_STAGES.map((stage, i) => (
                <React.Fragment key={stage.id}>
                  <StageCard
                    stage={stage}
                    isCurrentStage={stage.id === currentStageId}
                    onSelect={() => onStageSelect(stage)}
                    onExpand={() => onStageSelect(stage)}
                    color={stage.color}
                  />
                  {i < CONVERGED_STAGES.length - 1 && (
                    <div className="h-1.5 w-10 rounded bg-gray-400" />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll hint gradients - desktop only */}
      <div className="pointer-events-none absolute inset-y-0 left-14 w-8 bg-gradient-to-r from-gray-50 to-transparent hidden md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-14 w-8 bg-gradient-to-l from-gray-50 to-transparent hidden md:block" />

      {/* Scroll hint gradients - mobile vertical */}
      <div className="pointer-events-none absolute inset-x-0 top-14 h-8 bg-gradient-to-b from-gray-50 to-transparent md:hidden" />
      <div className="pointer-events-none absolute inset-x-0 bottom-14 h-8 bg-gradient-to-t from-gray-50 to-transparent md:hidden" />
    </div>
  );
}
