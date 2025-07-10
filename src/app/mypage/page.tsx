import Link from 'next/link';
import { getUserQuizResults } from '../lib/getUserResults';

export default async function MyPage() {
  const results = await getUserQuizResults();

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">마이페이지</h1>

      <ul className="space-y-3 mb-12">
        {results.map((res) => (
          <li key={res._id?.toString()} className="border p-4 rounded shadow-sm">
            <p><strong>점수:</strong> {res.score}점</p>
            <p><strong>날짜:</strong> {new Date(res.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>

      <div className="flex justify-center">
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          🏠 홈으로 가기
        </Link>
      </div>
    </main>
  );
}
