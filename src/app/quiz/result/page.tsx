'use client';

import LoginButton from '@/app/components/LoginButton';
import SaveResultButton from '@/app/components/SaveResultButton';
import { useSearchParams, useRouter } from 'next/navigation';

export default function QuizResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const score = parseInt(searchParams.get('score') || '0', 10);
  const category = searchParams.get('category') || '9';
  const difficulty = searchParams.get('difficulty') || 'medium';

  const getMessage = () => {
    if (score === 10) return '🎉 완벽해요!';
    if (score >= 7) return '👍 훌륭해요!';
    if (score >= 4) return '😊 괜찮아요!';
    return '😢 더 연습해봐요!';
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">퀴즈 결과</h1>
      <p className="text-4xl mb-4">{getMessage()}</p>
      <p className="text-xl text-gray-700 mb-8">
        총 <strong>{score}</strong> / 10 문제 맞혔어요!
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => router.push('/quiz')}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-600 transition cursor-pointer"
        >
          다시 풀기
        </button>
        <SaveResultButton score={score} category={category} difficulty={difficulty} />
      </div>

      <LoginButton />
    </main>
  );
}
