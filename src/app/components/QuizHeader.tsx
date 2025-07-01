import Countdown from './Countdown';

type QuizHeaderProps = {
  current: number;
  total: number;
  selected: string | null;
  onTimeout: () => void;
};

export default function QuizHeader({
  current,
  total,
  selected,
  onTimeout,
}: QuizHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-xl font-semibold">문제 {current + 1} / {total}</h2>
        <div className="text-lg font-medium">다음 중 맞는 표현은?</div>
      </div>
      <Countdown current={current} selected={selected} onTimeout={onTimeout} />
    </div>
  );
}
