'use client';

import * as React from 'react';
import { Footprints, MessageCircle, Layers } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { PathwayType } from '@/types';
import { PATHWAY_COLORS } from '@/lib/constants/stages';

type PathwayFilter = PathwayType | 'all';

interface PathwaySelectorProps {
  activePathway: PathwayFilter;
  onSelect: (pathway: PathwayFilter) => void;
}

const pathways: { id: PathwayFilter; label: string; shortLabel: string; color: string }[] = [
  {
    id: 'lower-limb',
    label: 'LOWER LIMB',
    shortLabel: 'LIMB',
    color: PATHWAY_COLORS['lower-limb'],
  },
  {
    id: 'bulbar',
    label: 'BULBAR',
    shortLabel: 'BULBAR',
    color: PATHWAY_COLORS['bulbar'],
  },
  {
    id: 'all',
    label: 'ALL PATHWAYS',
    shortLabel: 'ALL',
    color: '#374151',
  },
];

export function PathwaySelector({ activePathway, onSelect }: PathwaySelectorProps) {
  return (
    <div className="flex gap-2 sm:gap-3">
      {pathways.map((pathway) => {
        const isActive = activePathway === pathway.id;
        const IconComponent = pathway.id === 'lower-limb' ? Footprints :
                             pathway.id === 'bulbar' ? MessageCircle : Layers;
        return (
          <button
            key={pathway.id}
            onClick={() => onSelect(pathway.id)}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1.5 rounded-xl px-2 py-3 font-semibold transition-all',
              // Large touch targets for eye gaze - 80px min height
              'min-h-[80px] sm:min-h-[90px]',
              // Larger text for readability
              'text-sm sm:text-base',
              // Strong focus states for accessibility
              'focus:outline-none focus:ring-4 focus:ring-offset-2',
              'active:scale-95',
              isActive
                ? 'text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
            )}
            style={{
              backgroundColor: isActive ? pathway.color : undefined,
            }}
            aria-pressed={isActive}
          >
            {/* Larger icons - 28px on mobile, 32px on larger screens */}
            <IconComponent className="h-7 w-7 sm:h-8 sm:w-8" />
            {/* Responsive labels */}
            <span className="whitespace-nowrap sm:hidden">{pathway.shortLabel}</span>
            <span className="hidden whitespace-nowrap sm:inline">{pathway.label}</span>
          </button>
        );
      })}
    </div>
  );
}
