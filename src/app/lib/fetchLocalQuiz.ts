import quizData from '../public/data/questions.json';
import { Quiz } from '../types/quiz';
import { shuffleArray } from './shuffle';

export async function fetchLocalQuiz(): Promise<Quiz[]> {
  return shuffleArray(quizData).slice(0, 10);
}
