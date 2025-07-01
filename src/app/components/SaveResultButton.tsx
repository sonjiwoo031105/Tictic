'use client';

import { useSession } from "next-auth/react";

interface Props {
  score: number;
  category: string;
  difficulty: string;
}

export default function SaveResultButton({ score, category, difficulty }: Props) {
  const { data: session } = useSession();

  if (!session?.user?.email) return;

  const saveResult = async () => {
    try {
      const res = await fetch('/api/quiz/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score, category, difficulty }),
      });

       if (res.ok) {
        alert("저장이 완료되었습니다.");
      } else if (res.status === 409) {
        alert("동일한 점수는 한 번만 저장 가능해요.");
      } else {
        const data = await res.json();
        alert(`저장 실패: ${data.message}`);
      }
    } catch (err) {
      console.error('저장 실패:', err);
    }
  };

  return (
    <button
      onClick={() => saveResult()}
      className="bg-green-500 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-green-600 transition cursor-pointer"
    >
      점수 저장
    </button>
  )
}
