'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const categories = [
  { id: 9, name: '일반 상식' },
  { id: 11, name: '영화' },
  { id: 12, name: '음악' },
  { id: 17, name: '과학' },
  { id: 18, name: '컴퓨터' },
  { id: 23, name: '역사' },
  { id: 22, name: '지리' },
  { id: 27, name: '동물' },
];

const difficulties = ['easy', 'medium', 'hard'];

export default function QuizStartPage() {
  const router = useRouter();
  const [category, setCategory] = useState(9);
  const [difficulty, setDifficulty] = useState('medium');

  const startQuiz = () => {
    router.push(`/quiz/play?category=${category}&difficulty=${difficulty}`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">퀴즈 설정</h1>

      <div className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">카테고리</label>
          <select
            value={category}
            onChange={(e) => setCategory(Number(e.target.value))}
            className="w-full mt-1 px-3 py-2 border rounded-lg"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">난이도</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg"
          >
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={startQuiz}
          className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 cursor-pointer"
        >
          퀴즈 시작!
        </button>
      </div>
    </main>
  );
}
