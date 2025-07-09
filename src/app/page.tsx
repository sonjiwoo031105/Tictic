import LoginButton from "./components/LoginButton";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">Tictic</h1>
      <p className="text-lg text-gray-600 mb-10">⏱️ 타이머가 돌아간다 — 당신의 맞춤법 실력은?</p>

      <a
        href="/quiz"
        className="bg-blue-500 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-600 transition"
      >
        퀴즈 시작하기
      </a>

      <LoginButton />
    </main>
  );
}
