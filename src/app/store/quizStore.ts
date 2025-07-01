import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type QuizStore = {
  score: number;
  setScore: (score: number) => void;
  resetScore: () => void;
};

export const useQuizStore = create(
  persist<QuizStore>(
    (set) => ({
      score: 0,
      setScore: (score) => set({ score }),
      resetScore: () => set({ score: 0 }),
    }),
    {
      name: 'quiz-storage',
    }
  )
);
