import { Quiz } from "../types/quiz";

type QuizQuestionProps = {
  answers: string[];
  question: Quiz;
  selected: string | null;
  showAnswer: boolean;
  onSelect: (answer: string) => void;
};

export default function QuizQuestion({
  answers,
  question,
  selected,
  showAnswer,
  onSelect,
}: QuizQuestionProps) {
  return (
    <div className="space-y-3">
      {answers.map((ans, i) => (
        <button
          key={i}
          disabled={!!selected}
          onClick={() => onSelect(ans)}
          className={`w-full px-4 py-3 rounded-lg text-left border cursor-pointer ${
            showAnswer
              ? ans === question.correct_answer
                ? 'bg-green-100 border-green-500'
                : ans === selected
                ? 'bg-red-100 border-red-500'
                : 'opacity-50'
              : 'hover:bg-blue-100'
          }`}
        >
          {ans}
        </button>
      ))}
    </div>
  );
}
