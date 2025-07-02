'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchLocalQuiz } from '@/app/lib/fetchLocalQuiz';
import { Quiz } from '@/app/types/quiz';
import QuizHeader from '../components/QuizHeader';
import QuizQuestion from '../components/QuizQuestion';
import { useQuizStore } from '../store/quizStore';

export default function QuizPlayPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const router = useRouter();

  const { data: questions, isLoading, isError } = useQuery<Quiz[]>({
    queryKey: ['local-quiz'],
    queryFn: fetchLocalQuiz,
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    if (!questions || !questions[current]) return;
    const q = questions[current];
    const shuffled = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
    setAnswers(shuffled);
  }, [current, questions]);

  const handleTimeout = useCallback(() => {
    if (!questions || !questions[current]) return;

    setShowAnswer(true);
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
        setSelected(null);
        setShowAnswer(false);
      } else {
        handleFinish(score);
      }
    }, 1500);
  }, [current, questions]);

  const handleAnswer = (answer: string) => {
    setSelected(answer);
    setShowAnswer(true);
    const correct = answer === questions![current].correct_answer;
    if (correct) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (current + 1 < questions!.length) {
        setCurrent((prev) => prev + 1);
        setSelected(null);
        setShowAnswer(false);
      } else {
        handleFinish(correct ? score + 1 : score);
      }
    }, 1500);
  };

  const handleFinish = (score: number) => {
    useQuizStore.getState().setScore(score);
    useQuizStore.getState().setFinished(true);
    router.push('/quiz/result');
  }

  if (isLoading) return <div className="text-center py-20">문제 불러오는 중...</div>;
  if (isError || !questions) return <div className="text-center py-20">문제를 불러올 수 없습니다.</div>;

  const question = questions[current];

  return (
    <main className="max-w-xl mx-auto p-4">
      <QuizHeader
        current={current}
        total={questions.length}
        selected={selected}
        onTimeout={handleTimeout}
      />

      <QuizQuestion
        answers={answers}
        question={question}
        selected={selected}
        showAnswer={showAnswer}
        onSelect={handleAnswer}
      />

      <button
        onClick={() => handleFinish(score)}
        className="float-right mt-16 bg-red-400 text-white rounded-lg px-4 py-2 hover:bg-red-500 cursor-pointer"
      >
        그만하기
      </button>
    </main>
  );
}
