export async function fetchQuiz(category: string, difficulty: string) {
  const res = await fetch(`/api/quiz?category=${category}&difficulty=${difficulty}`);
  const data = await res.json();

  if (data.response_code !== 0 || !data.results) {
    throw new Error('퀴즈를 불러올 수 없습니다.');
  }

  return data.results;
}
