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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { data: questions, isLoading, isError } = useQuery<Quiz[]>({
    queryKey: ['local-quiz'],
    queryFn: fetchLocalQuiz,
    staleTime: 1000 * 60,
  });

  const shuffleAnswers = (q: Quiz) => {
    return [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (!questions || !questions[current]) return;
    setAnswers(shuffleAnswers(questions[current]));
  }, [current, questions]);

  const handleFinish = useCallback(async (score: number) => {
    setLoading(true);
    try {
      useQuizStore.getState().setScore(score);
      useQuizStore.getState().setFinished(true);
      router.push('/quiz/result');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleNextQuestion = (nextScore = score) => {
    if (current + 1 < questions!.length) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      handleFinish(nextScore);
    }
  };

  const handleTimeout = useCallback(() => {
    if (!questions || !questions[current]) return;

    setShowAnswer(true);
    setTimeout(() => handleNextQuestion(), 1500);
  }, [current, questions, handleFinish]);

  const setWrongAnswer = useQuizStore((s) => s.setWrongAnswer);

  const handleAnswer = (answer: string) => {
    setSelected(answer);
    setShowAnswer(true);
    
    const correctAnswer = questions![current].correct_answer
    const correct = answer === correctAnswer;
    const updatedScore = correct ? score + 1 : score;

    if (correct) {
      setScore(updatedScore);
    } else {
      setWrongAnswer({
        userAnswer: answer,
        correctAnswer,
      });
    }

    setTimeout(() => handleNextQuestion(updatedScore), 1500);
  };

  const handleExit = () => {
    if (confirm('정말로 그만하시겠어요?')) {
      handleFinish(score);
    }
  };

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
        onClick={handleExit}
        disabled={loading}
        className={`float-right mt-16 rounded-lg px-4 py-2 flex items-center justify-center gap-2 cursor-pointer
        ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-400 hover:bg-red-500 text-white'}`}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            이동 중...
          </>
        ) : (
          '그만하기'
        )}
      </button>
    </main>
  );
}
