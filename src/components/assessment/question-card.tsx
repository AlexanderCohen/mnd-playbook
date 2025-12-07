'use client';

import * as React from 'react';
import { HelpCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface QuestionOption {
  value: number;
  label: string;
}

interface QuestionCardProps {
  question: {
    id: string;
    text: string;
    appQuestion?: string;
    category: string;
    domain?: string;
    domainColor?: string;
    whatItMeasures?: string;
    guidanceNotes?: string[];
    timeWarning?: string;
    options: QuestionOption[];
  };
  selectedValue: number | undefined;
  onSelect: (value: number) => void;
}

export function QuestionCard({ question, selectedValue, onSelect }: QuestionCardProps) {
  const [showHelp, setShowHelp] = React.useState(false);

  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-white overflow-hidden">
      {/* Header with domain color */}
      <div
        className="px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between"
        style={{ backgroundColor: question.domainColor ? `${question.domainColor}15` : '#f3f4f6' }}
      >
        <div className="flex items-center gap-2">
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: question.domainColor || '#6b7280' }}
          />
          <span className="text-sm font-semibold uppercase tracking-wide text-gray-600">
            {question.category}
          </span>
        </div>
        {/* Help button - larger for eye gaze (48x48px) */}
        <button
          onClick={() => setShowHelp(!showHelp)}
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full transition-colors',
            'focus:outline-none focus:ring-4 focus:ring-blue-300',
            showHelp
              ? 'bg-blue-100 text-blue-600'
              : 'text-gray-500 hover:bg-gray-100 active:bg-gray-200'
          )}
          aria-label={showHelp ? 'Hide help' : 'Show help'}
          aria-expanded={showHelp}
        >
          <HelpCircle className="h-6 w-6" />
        </button>
      </div>

      <div className="p-4 sm:p-5">
        {/* Question text - larger for readability */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
          {question.appQuestion || question.text}
        </h3>

        {question.whatItMeasures && (
          <p className="text-sm sm:text-base text-gray-500 mb-4">{question.whatItMeasures}</p>
        )}

        {/* Time warning */}
        {question.timeWarning && (
          <div className="mb-4 flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-base text-amber-800">
            <AlertTriangle className="h-6 w-6 flex-shrink-0 text-amber-500" />
            <span>{question.timeWarning}</span>
          </div>
        )}

        {/* Help panel */}
        {showHelp && question.guidanceNotes && question.guidanceNotes.length > 0 && (
          <div className="mb-4 rounded-xl bg-blue-50 p-4">
            <div className="flex items-center gap-2 text-base font-semibold text-blue-800 mb-3">
              <Info className="h-5 w-5" />
              Guidance Notes
            </div>
            <ul className="space-y-2 text-base text-blue-700">
              {question.guidanceNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Options - larger touch targets for eye gaze */}
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={cn(
                'w-full rounded-xl border-2 p-4 text-left transition-all',
                // Large touch targets for eye gaze - min 70px height
                'min-h-[70px] flex items-center gap-4',
                'focus:outline-none focus:ring-4 focus:ring-blue-300',
                'active:scale-[0.98]',
                selectedValue === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100'
              )}
              aria-pressed={selectedValue === option.value}
            >
              {/* Larger number badge */}
              <span
                className={cn(
                  'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold',
                  selectedValue === option.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                )}
              >
                {option.value}
              </span>
              <span className={cn(
                'text-base leading-snug',
                selectedValue === option.value ? 'text-blue-900 font-medium' : 'text-gray-700'
              )}>
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
