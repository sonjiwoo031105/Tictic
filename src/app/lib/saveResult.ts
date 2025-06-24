import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

interface QuizResultPayload {
  score: number;
  category: string;
  difficulty: string;
}

export async function saveQuizResult(payload: QuizResultPayload) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    console.warn('로그인이 필요합니다.');
    return { error: 'Unauthorized' };
  }

  try {
    const res = await fetch('/api/quiz/result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error('저장 실패:', err);
      return { error: err };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    console.error('API 통신 오류:', err);
    return { error: 'API 통신 오류' };
  }
}
