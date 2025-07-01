import { useEffect, useRef, useState } from "react";

type CountdownProps = {
  current: number;
  selected: string | null;
  onTimeout: () => void;
};

const TIME_LIMIT = 10;

export default function Countdown({ current, selected, onTimeout }: CountdownProps) {
  const [time, setTime] = useState(TIME_LIMIT);
  const [warn, setWarn] = useState(false);
  const calledRef = useRef(false);

  useEffect(() => {
    setTime(TIME_LIMIT);
    calledRef.current = false;
  }, [current]);

  useEffect(() => {
    if (time < 0 || !!selected) return;

    setWarn(time <= 5);

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);

          if (!calledRef.current) {
            calledRef.current = true;
            setTimeout(() => {
              onTimeout();
            }, 0);
          }

          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [time, onTimeout, selected]);

  return (
    <h2
      className={`text-2xl font-semibold ${warn ? 'text-red-500' : 'text-black'}`}
    >
      ⏱️{time}
    </h2>
  );

}
