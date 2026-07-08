import { useEffect, useState } from "react";

export const useCountdown = (initial = 0) => {
  const [countdown, setCountdown] = useState(initial);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const start = (seconds = 60) => {
    setCountdown(seconds);
  };

  const reset = () => {
    setCountdown(0);
  };

  return {
    countdown,
    isRunning: countdown > 0,
    start,
    reset,
  };
};