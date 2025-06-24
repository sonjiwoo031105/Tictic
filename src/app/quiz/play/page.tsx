'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchQuiz } from '@/app/lib/fetchQuiz';
import { useQuery } from '@tanstack/react-query';

export default function QuizPlayPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const category = searchParams.get('category') || '9';
	const difficulty = searchParams.get('difficulty') || 'medium';

	const { data: questions, isLoading, isError } = useQuery({
		queryKey: ['quiz', category, difficulty],
		queryFn: () => fetchQuiz(category, difficulty),
		staleTime: 1000 * 60,
	});

	const [current, setCurrent] = useState(0);
	const [selected, setSelected] = useState<string | null>(null);
	const [score, setScore] = useState(0);
	const [showAnswer, setShowAnswer] = useState(false);

	const handleAnswer = (answer: string) => {
		setSelected(answer);
		setShowAnswer(true);

		if (answer === questions[current].correct_answer) {
			setScore((prev) => prev + 1);
		}

		setTimeout(() => {
			if (current + 1 < questions.length) {
				setCurrent((prev) => prev + 1);
				setSelected(null);
				setShowAnswer(false);
			} else {
				router.push(`/quiz/result?score=${score + (answer === questions[current].correct_answer ? 1 : 0)}&category=${category}&difficulty=${difficulty}`);
			}
		}, 1500);
	};

	if (isLoading) return <div className="text-center py-20">문제를 불러오는 중...</div>;
	if (isError || !questions) return <div className="text-center py-20">문제를 불러올 수 없습니다.</div>;

	const question = questions[current];
	const shuffledAnswers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);

	return (
		<main className="max-w-xl mx-auto p-4">
			<h2 className="text-xl font-semibold mb-4">
				문제 {current + 1} / {questions.length}
			</h2>
			<div
				className="text-lg font-medium mb-6"
				dangerouslySetInnerHTML={{ __html: question.question }}
			/>
			<div className="space-y-3">
				{shuffledAnswers.map((ans) => (
					<button
						key={ans}
						disabled={!!selected}
						onClick={() => handleAnswer(ans)}
						className={`w-full px-4 py-3 rounded-lg text-left border cursor-pointer ${showAnswer
							? ans === question.correct_answer
								? 'bg-green-100 border-green-500'
								: ans === selected
									? 'bg-red-100 border-red-500'
									: 'opacity-50'
							: 'hover:bg-blue-100'
							}`}
						dangerouslySetInnerHTML={{ __html: ans }}
					/>
				))}
			</div>
		</main>
	);
}
