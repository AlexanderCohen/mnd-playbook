'use client';

import { Stage } from '@/types';
import { X, AlertCircle, Clock, Activity } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { ScrollControls } from '@/components/ui';
import { useEffect, useRef } from 'react';

interface StageDetailModalProps {
  stage: Stage;
  isCurrentStage: boolean;
  onClose: () => void;
  onSelect: () => void;
  color: string;
}

function SeverityIndicator({ severity }: { severity: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((level) => (
        <div
          key={level}
          className={cn(
            'w-3 h-3 md:w-3.5 md:h-3.5 rounded-full transition-all',
            level <= severity ? 'bg-gray-700 scale-110' : 'bg-gray-300'
          )}
        />
      ))}
    </div>
  );
}

function CareLevelBadge({ careLevel }: { careLevel: 'self-sufficient' | 'assisted' | '24/7 support' }) {
  const colors: Record<typeof careLevel, string> = {
    'self-sufficient': 'bg-green-100 text-green-800 border-green-200',
    'assisted': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    '24/7 support': 'bg-red-100 text-red-800 border-red-200',
  };

  const labels: Record<typeof careLevel, string> = {
    'self-sufficient': 'Self-sufficient',
    'assisted': 'Assisted',
    '24/7 support': '24/7 Support',
  };

  return (
    <span className={cn('text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full border', colors[careLevel])}>
      {labels[careLevel]}
    </span>
  );
}

export function StageDetailModal({ stage, isCurrentStage, onClose, onSelect, color }: StageDetailModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal content */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scroll Controls for modal content */}
        <ScrollControls containerRef={scrollContainerRef} position="right" />
        {/* Header */}
        <div
          className="relative px-6 md:px-8 py-6 md:py-8 border-b border-gray-200"
          style={{
            background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/50 rounded-lg transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
          </button>

          <div className="flex items-start gap-4 md:gap-6 pr-12">
            <div
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-lg flex-shrink-0"
              style={{ backgroundColor: color }}
            >
              {stage.code}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {stage.name}
              </h2>
              <p className="text-base md:text-lg text-gray-700 font-medium">
                {stage.subtitle}
              </p>
              {isCurrentStage && (
                <div className="mt-3 inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full font-semibold text-sm">
                  <Activity className="w-4 h-4" />
                  Your current stage
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div ref={scrollContainerRef} className="overflow-y-auto max-h-[calc(90vh-280px)] md:max-h-[calc(90vh-300px)]">
          <div className="px-6 md:px-8 py-6 md:py-8 space-y-6 md:space-y-8">
            {/* Stage Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Duration</p>
                </div>
                <p className="text-base md:text-lg font-semibold text-gray-900">{stage.duration || 'Variable'}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Severity Level</p>
                <SeverityIndicator severity={stage.severity} />
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Care Level</p>
                <CareLevelBadge careLevel={stage.careLevel} />
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                About This Stage
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {stage.description}
              </p>
            </div>

            {/* Common Symptoms */}
            {stage.commonSymptoms && stage.commonSymptoms.length > 0 && (
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                  Common Symptoms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stage.commonSymptoms.map((symptom, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm md:text-base font-medium border border-blue-200"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Next Stage Warnings */}
            {stage.nextStageWarnings && stage.nextStageWarnings.length > 0 && (
              <div className="p-5 md:p-6 bg-amber-50 rounded-xl border-2 border-amber-200">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-bold text-amber-900 mb-3">
                      What to Watch For
                    </h3>
                    <ul className="space-y-2">
                      {stage.nextStageWarnings.map((warning, idx) => (
                        <li key={idx} className="flex gap-2 text-sm md:text-base text-amber-800">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Resources & Support */}
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                Resources & Support
              </h3>
              <div className="space-y-3">
                {stage.resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="p-4 md:p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-base md:text-lg text-gray-900 mb-1">
                          {resource.title}
                        </h4>
                        <p className="text-sm md:text-base text-gray-600 mb-2">
                          {resource.description}
                        </p>
                        {resource.category && (
                          <span className="inline-block text-xs font-medium text-gray-500 uppercase tracking-wide bg-white px-2.5 py-1 rounded-full border border-gray-200">
                            {resource.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 md:px-8 py-4 md:py-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onSelect();
                onClose();
              }}
              className={cn(
                'flex-1 py-3 md:py-4 px-6 rounded-xl font-semibold text-base md:text-lg transition-all shadow-sm',
                isCurrentStage
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'text-white hover:shadow-lg transform hover:scale-[1.02]'
              )}
              style={!isCurrentStage ? { backgroundColor: color } : undefined}
            >
              {isCurrentStage ? 'Current Stage' : 'Mark as Current Stage'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none py-3 md:py-4 px-8 rounded-xl font-semibold text-base md:text-lg bg-white text-gray-700 hover:bg-gray-100 transition-colors border-2 border-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
