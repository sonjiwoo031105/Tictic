export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">Tictic</h1>
      <p className="text-lg text-gray-600 mb-10">⏱️ 타이머가 돌아간다 — 당신의 지식을 증명하라!</p>

      <a
        href="/quiz"
        className="bg-blue-500 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-600 transition"
      >
        퀴즈 시작하기
      </a>

      <p className="text-sm text-gray-400 mt-10">또는 로그인 후 점수 저장</p>
    </main>
  );
}
