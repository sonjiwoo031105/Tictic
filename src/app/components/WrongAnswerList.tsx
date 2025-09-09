'use client';

import { useState } from 'react';

interface WrongAnswer {
  userAnswer: string;
  correctAnswer: string;
}

export default function WrongAnswerList({ wrongAnswers }: { wrongAnswers: WrongAnswer[] }) {
  const [show, setShow] = useState(false);

  if (!wrongAnswers || wrongAnswers.length === 0) return null;

  return (
    <div className="w-full max-w-xl">
      <button
        onClick={() => setShow(!show)}
        className="px-4 py-2 bg-red-500 text-white rounded-xl"
      >
        {show ? '오답 숨기기' : '오답 확인하기'}
      </button>

      {show && (
        <ul className="mt-4 space-y-4">
          {wrongAnswers.map((w, idx) => (
            <li key={idx} className="border p-3 rounded text-left">
              <p className="text-red-600">
                <strong>내 답:</strong> {w.userAnswer}
              </p>
              <p className="text-green-600">
                <strong>정답:</strong> {w.correctAnswer}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
