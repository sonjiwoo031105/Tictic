'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchLocalQuiz } from '@/app/lib/fetchLocalQuiz';
import { Quiz } from '@/app/types/quiz';

export default function QuizPlayPage() {
  const router = useRouter();
  const { data: questions, isLoading, isError } = useQuery<Quiz[]>({
    queryKey: ['local-quiz'],
    queryFn: fetchLocalQuiz,
    staleTime: 1000 * 60,
  });

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (!questions || !questions[current]) return;

    const q = questions[current];
    const shuffled = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
    setAnswers(shuffled);
  }, [current, questions]);

  if (isLoading) return <div className="text-center py-20">문제를 불러오는 중...</div>;
  if (isError || !questions) return <div className="text-center py-20">문제를 불러올 수 없습니다.</div>;

  const question = questions[current];

  const handleAnswer = (answer: string) => {
    setSelected(answer);
    setShowAnswer(true);

    const correct = answer === question.correct_answer;
    if (correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
        setSelected(null);
        setShowAnswer(false);
      } else {
        router.push(`/quiz/result?score=${correct ? score + 1 : score}`);
      }
    }, 1500);
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">
        문제 {current + 1} / {questions.length}
      </h2>
      <div className="text-lg font-medium mb-6">다음 중 맞는 표현은?</div>
      <div className="space-y-3">
        {answers.map((ans, i) => (
          <button
            key={i}
            disabled={!!selected}
            onClick={() => handleAnswer(ans)}
            className={`w-full px-4 py-3 rounded-lg text-left border cursor-pointer ${showAnswer
                ? ans === question.correct_answer
                  ? 'bg-green-100 border-green-500'
                  : ans === selected
                    ? 'bg-red-100 border-red-500'
                    : 'opacity-50'
                : 'hover:bg-blue-100'
              }`}
          >
            {ans}
          </button>
        ))}
      </div>
    </main>
  );
}
