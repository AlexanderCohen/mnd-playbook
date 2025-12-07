'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { ALSFRS_QUESTIONS, calculateDomainScores } from '@/lib/constants/questions';
import { db } from '@/lib/dexie-db';
import { useAppStore } from '@/lib/stores/app-store';
import { Button } from '@/components/ui';
import { Progress } from '@/components/ui/progress';
import { QuestionCard } from './question-card';

export function AssessmentWizard() {
  const router = useRouter();
  const setLatestScore = useAppStore((state) => state.setLatestScore);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const autoAdvanceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = ALSFRS_QUESTIONS[currentIndex];
  const totalQuestions = ALSFRS_QUESTIONS.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const canGoNext = answers[currentQuestion.id] !== undefined;
  const answeredCount = Object.keys(answers).length;

  // Cleanup timer on unmount
  React.useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, []);

  const handleSelect = (value: number) => {
    // Clear any existing timer
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }

    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));

    // Auto-advance to next question after a short delay
    autoAdvanceTimerRef.current = setTimeout(() => {
      if (currentIndex === totalQuestions - 1) {
        handleSubmit();
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 300); // 300ms delay for visual feedback
  };

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleBack = () => {
    // Clear any pending auto-advance timer
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Calculate domain scores
      const domainScores = calculateDomainScores(answers);
      const dateStr = new Date().toISOString();

      // Save to IndexedDB
      await db.assessments.add({
        date: dateStr,
        answers,
        totalScore: domainScores.total.score,
      });

      // Save to app store for roadmap display
      setLatestScore({
        total: domainScores.total.score,
        bulbar: domainScores.bulbar.score,
        motor: domainScores.motor.score,
        respiratory: domainScores.respiratory.score,
        answers,
        date: dateStr,
      });

      router.push('/');
    } catch (error) {
      console.error('Failed to save assessment:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Progress header - responsive text */}
      <div>
        <div className="mb-3 flex items-center justify-between text-sm sm:text-base text-gray-600">
          <span className="font-medium">Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{answeredCount} answered</span>
        </div>
        <Progress value={progress} />
      </div>

      {/* Current question */}
      <QuestionCard
        question={currentQuestion}
        selectedValue={answers[currentQuestion.id]}
        onSelect={handleSelect}
      />

      {/* Navigation buttons - large touch targets for eye gaze */}
      <div className="flex gap-3 sm:gap-4">
        <Button
          variant="secondary"
          size="lg"
          onClick={handleBack}
          disabled={currentIndex === 0}
          className="flex-1 min-h-[64px] text-base sm:text-lg"
        >
          <ChevronLeft className="mr-1.5 h-6 w-6" />
          Back
        </Button>
        <Button
          size="lg"
          onClick={handleNext}
          disabled={!canGoNext || isSubmitting}
          className="flex-1 min-h-[64px] text-base sm:text-lg"
        >
          {isLastQuestion ? (
            <>
              <Check className="mr-1.5 h-6 w-6" />
              {isSubmitting ? 'Saving...' : 'Finish'}
            </>
          ) : (
            <>
              Next
              <ChevronRight className="ml-1.5 h-6 w-6" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
