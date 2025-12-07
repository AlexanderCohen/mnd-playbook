import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PathwayType } from '@/types';

type PathwayFilter = PathwayType | 'all';

interface StageNotes {
  [stageId: string]: string;
}

interface LatestScore {
  total: number;
  bulbar: number;
  motor: number;
  respiratory: number;
  answers: Record<string, number>;
  date: string;
}

interface AppState {
  // Current position
  currentStageId: string | null;

  // View filter
  activePathway: PathwayFilter;

  // Notes per stage
  stageNotes: StageNotes;

  // Latest assessment score
  latestScore: LatestScore | null;

  // Actions
  setCurrentStage: (stageId: string) => void;
  setActivePathway: (pathway: PathwayFilter) => void;
  setStageNote: (stageId: string, note: string) => void;
  setLatestScore: (score: LatestScore) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentStageId: null,
      activePathway: 'all',
      stageNotes: {},
      latestScore: null,

      setCurrentStage: (stageId) => set({ currentStageId: stageId }),
      setActivePathway: (pathway) => set({ activePathway: pathway }),
      setStageNote: (stageId, note) =>
        set((state) => ({
          stageNotes: { ...state.stageNotes, [stageId]: note }
        })),
      setLatestScore: (score) => set({ latestScore: score }),
    }),
    { name: 'mnd-app-store' }
  )
);
