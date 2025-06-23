'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function QuizResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const score = parseInt(searchParams.get('score') || '0', 10);

  const getMessage = () => {
    if (score === 10) return '🎉 완벽해요!';
    if (score >= 7) return '👍 훌륭해요!';
    if (score >= 4) return '😊 괜찮아요!';
    return '😢 더 연습해봐요!';
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">퀴즈 결과</h1>
      <p className="text-6xl mb-4">{getMessage()}</p>
      <p className="text-xl text-gray-700 mb-8">
        총 <strong>{score}</strong> / 10 문제 맞혔어요!
      </p>

      <button
        onClick={() => router.push('/quiz')}
        className="bg-blue-500 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-600 transition cursor-pointer"
      >
        다시 풀기
      </button>

      <p className="text-sm text-gray-400 mt-6">
        로그인하면 점수가 저장돼요 📝
      </p>
    </main>
  );
}
