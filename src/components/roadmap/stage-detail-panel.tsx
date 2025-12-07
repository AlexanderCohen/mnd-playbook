'use client';

import * as React from 'react';
import { X, MapPin, ExternalLink, FileText, BookOpen } from 'lucide-react';
import { Stage } from '@/types';
import { Button, ScrollControls } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

interface StageDetailPanelProps {
  stage: Stage;
  isCurrentStage: boolean;
  note: string;
  onClose: () => void;
  onSetAsCurrent: () => void;
  onNoteChange: (note: string) => void;
}

export function StageDetailPanel({
  stage,
  isCurrentStage,
  note,
  onClose,
  onSetAsCurrent,
  onNoteChange,
}: StageDetailPanelProps) {
  const [localNote, setLocalNote] = React.useState(note);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Save note on blur
  const handleNoteBlur = () => {
    if (localNote !== note) {
      onNoteChange(localNote);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 animate-in slide-in-from-bottom duration-300">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />

      {/* Panel - responsive max width and height */}
      <div ref={scrollContainerRef} className="relative mx-auto max-w-2xl rounded-t-3xl bg-white shadow-2xl max-h-[85vh] overflow-y-auto">
        {/* Scroll Controls */}
        <ScrollControls containerRef={scrollContainerRef} position="right" />
        {/* Close button - large target for eye gaze (56x56px) */}
        <button
          onClick={onClose}
          className={cn(
            'absolute right-4 top-4 z-10',
            'flex h-14 w-14 items-center justify-center rounded-full',
            'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300',
            'focus:outline-none focus:ring-4 focus:ring-blue-300'
          )}
          aria-label="Close panel"
        >
          <X className="h-7 w-7" />
        </button>

        {/* Header */}
        <div className="border-b border-gray-100 p-5 pr-20 sm:p-6">
          {/* Drag handle */}
          <div className="absolute left-1/2 top-2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-gray-300" />

          <div className="mt-3 flex items-center gap-4">
            {/* Stage code badge - larger for visibility */}
            <div
              className="flex h-16 w-16 items-center justify-center rounded-xl text-2xl font-bold text-white flex-shrink-0"
              style={{ backgroundColor: stage.color }}
            >
              {stage.code}
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{stage.name}</h2>
              <p className="text-gray-500 text-sm sm:text-base">{stage.subtitle}</p>
            </div>
          </div>

          {/* Description - larger text */}
          <p className="mt-4 text-gray-600 text-base leading-relaxed">{stage.description}</p>
        </div>

        {/* Resources section */}
        <div className="border-b border-gray-100 p-5 sm:p-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
            <BookOpen className="h-5 w-5" />
            Resources
          </h3>
          {/* Stack on mobile, grid on larger screens */}
          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-3">
            {stage.resources.map((resource) => (
              <button
                key={resource.id}
                className={cn(
                  // Large touch targets for eye gaze - 80px min height
                  'flex min-h-[80px] items-center gap-4 rounded-xl border-2 border-gray-200 p-4 text-left transition-all',
                  'hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100',
                  'focus:outline-none focus:ring-4 focus:ring-blue-300'
                )}
              >
                <ExternalLink className="h-6 w-6 flex-shrink-0 text-gray-400" />
                <div className="min-w-0">
                  <div className="font-semibold text-gray-900 text-base">{resource.title}</div>
                  <div className="text-sm text-gray-500 line-clamp-2">{resource.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Notes section */}
        <div className="border-b border-gray-100 p-5 sm:p-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
            <FileText className="h-5 w-5" />
            My Notes
          </h3>
          <textarea
            ref={textareaRef}
            value={localNote}
            onChange={(e) => setLocalNote(e.target.value)}
            onBlur={handleNoteBlur}
            placeholder="Tap to add your personal notes for this stage..."
            className={cn(
              'min-h-[100px] w-full resize-none rounded-xl border-2 border-gray-200 p-4',
              'text-base text-gray-700 leading-relaxed',
              'placeholder:text-gray-400',
              'focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100'
            )}
          />
        </div>

        {/* Action buttons - stack on mobile, row on larger screens */}
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:p-6 safe-area-bottom">
          <Button
            variant="secondary"
            size="lg"
            className="min-h-[60px] flex-1 text-base"
            onClick={() => {/* View resources action */}}
          >
            <BookOpen className="mr-2 h-6 w-6" />
            View Resources
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="min-h-[60px] flex-1 text-base"
            onClick={() => textareaRef.current?.focus()}
          >
            <FileText className="mr-2 h-6 w-6" />
            Add Note
          </Button>

          <Button
            size="lg"
            className={cn(
              'min-h-[60px] flex-1 text-base',
              isCurrentStage && 'bg-yellow-500 hover:bg-yellow-600'
            )}
            onClick={onSetAsCurrent}
            disabled={isCurrentStage}
          >
            <MapPin className="mr-2 h-6 w-6" />
            {isCurrentStage ? "You're Here" : 'Mark as Current'}
          </Button>
        </div>
      </div>
    </div>
  );
}
