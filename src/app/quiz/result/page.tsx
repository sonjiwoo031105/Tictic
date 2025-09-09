'use client';

import LoginButton from '@/app/components/LoginButton';
import SaveResultButton from '@/app/components/SaveResultButton';
import WrongAnswerList from '@/app/components/WrongAnswerList';
import { useQuizStore } from '@/app/store/quizStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function QuizResultPage() {
  const { score, wrongAnswers, finished, resetQuiz } = useQuizStore();
  const [redirected, setRedirected] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !finished && !redirected) {
      alert('잘못된 접근입니다. 퀴즈를 먼저 풀어주세요.');
      setRedirected(true);
      router.replace('/');
    }
  }, [hydrated, finished, redirected, router]);

  if (!hydrated) {
    return <div className="text-center py-20">점수 불러오는 중...</div>;
  }

  if (!finished) {
    return null;
  }

  const getMessage = () => {
    if (score === 10) return '🎉 완벽해요!';
    if (score >= 7) return '👍 훌륭해요!';
    if (score >= 4) return '😊 괜찮아요!';
    return '😢 더 연습해봐요!';
  };

  const tryAgain = () => {
    setRedirected(true);
    resetQuiz();
    router.push('/quiz');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">퀴즈 결과</h1>
      <p className="text-4xl mb-4">{getMessage()}</p>
      <p className="text-xl text-gray-700 mb-8">
        총 <strong>{score}</strong> / 10 문제 맞혔어요!
      </p>

      <div className="flex gap-2 mb-2">
        <button
          onClick={tryAgain}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-600 transition cursor-pointer"
        >
          다시 풀기
        </button>
        <SaveResultButton score={score} />
      </div>

      <WrongAnswerList wrongAnswers={wrongAnswers} />

      <LoginButton />
    </main>
  );
}
