import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type QuizStore = {
  score: number;
  finished: boolean;
  setScore: (score: number) => void;
  resetScore: () => void;
  setFinished: (finished: boolean) => void;
};

export const useQuizStore = create(
  persist<QuizStore>(
    (set) => ({
      score: 0,
      finished: false,
      setScore: (score) => set({ score }),
      resetScore: () => set({ score: 0, finished: false }),
      setFinished: (finished) => set({ finished }),
    }),
    {
      name: 'quiz-storage',
    }
  )
);
