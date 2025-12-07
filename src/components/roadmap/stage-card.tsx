'use client';

import { Stage } from '@/types';
import { ChevronRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface StageCardProps {
  stage: Stage;
  isCurrentStage: boolean;
  onSelect: () => void;
  onExpand: () => void;
  color: string;
}

export function StageCard({ stage, isCurrentStage, onExpand, color }: StageCardProps) {
  return (
    <button
      onClick={onExpand}
      className={cn(
        'w-full text-left transition-all rounded-xl border-2 p-3 md:p-4 hover:shadow-lg hover:scale-[1.02] group',
        isCurrentStage
          ? 'ring-2 ring-offset-2 bg-gradient-to-br from-blue-50 to-white shadow-md'
          : 'bg-white hover:bg-gray-50',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[100px] md:min-h-[110px]'
      )}
      style={{
        borderColor: isCurrentStage ? color : '#e5e7eb',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Code and Name */}
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <div
              className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm md:text-base shadow-md flex-shrink-0 transition-transform group-hover:scale-110"
              style={{ backgroundColor: color }}
            >
              {stage.code}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-sm md:text-base lg:text-lg truncate">
                {stage.name}
              </h3>
              {isCurrentStage && (
                <span className="inline-block mt-1 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-semibold">
                  Current
                </span>
              )}
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3 line-clamp-2">
            {stage.subtitle}
          </p>

          {/* Quick Info */}
          <div className="flex flex-wrap gap-2 md:gap-3 text-xs text-gray-500">
            {stage.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {stage.duration}
              </span>
            )}
            {stage.resources.length > 0 && (
              <span className="text-gray-400">•</span>
            )}
            {stage.resources.length > 0 && (
              <span>{stage.resources.length} resources</span>
            )}
          </div>
        </div>

        {/* Expand Indicator */}
        <ChevronRight
          className="w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-transform group-hover:translate-x-1 flex-shrink-0 mt-1"
        />
      </div>
    </button>
  );
}
