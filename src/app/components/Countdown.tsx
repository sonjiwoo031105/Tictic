import { useEffect, useRef, useState } from "react";

type CountdownProps = {
  current: number;
  onTimeout: () => void;
};

export default function Countdown({ current, onTimeout }: CountdownProps) {
  const timeLimit = 10;
  const [time, setTime] = useState(timeLimit);
  const calledRef = useRef(false);

  useEffect(() => {
    setTime(timeLimit);
    calledRef.current = false;
  }, [current]);

  useEffect(() => {
    if (time <= 0) return;

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);

          if (!calledRef.current) {
            calledRef.current = true;
            setTimeout(() => {
              onTimeout();
            }, 1000);
          }

          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [time, onTimeout]);

  return <p>⏱️{time}</p>;
}
