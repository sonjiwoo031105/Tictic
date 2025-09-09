import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WrongAnswer {
  userAnswer: string;
  correctAnswer: string;
} 

type QuizStore = {
  score: number;
  wrongAnswers: WrongAnswer[];
  finished: boolean;
  setScore: (score: number) => void;
  setWrongAnswer: (wrong: WrongAnswer) => void;
  resetQuiz: () => void;
  setFinished: (finished: boolean) => void;
};

export const useQuizStore = create(
  persist<QuizStore>(
    (set) => ({
      score: 0,
      wrongAnswers: [],
      finished: false,
      setScore: (score) => set({ score }),
      setWrongAnswer: (wrong) => 
        set((state) => ({
          wrongAnswers: [...state.wrongAnswers, wrong] 
        })),
      resetQuiz: () => set({ score: 0, wrongAnswers: [], finished: false }),
      setFinished: (finished) => set({ finished }),
    }),
    {
      name: 'quiz-storage',
    }
  )
);
