import { useEffect, useState } from "react";

const getTimeLeft = (targetDate) => {
  if (!targetDate) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      formatted: "—",
    };
  }

  const difference = new Date(targetDate).getTime() - Date.now();

  if (difference <= 0) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      formatted: "00d 00h 00m 00s",
    };
  }

  const totalSeconds = Math.floor(difference / 1000);

  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor(
    (totalSeconds % (24 * 60 * 60)) / (60 * 60)
  );
  const minutes = Math.floor(
    (totalSeconds % (60 * 60)) / 60
  );
  const seconds = totalSeconds % 60;

  const formatted = `${String(days).padStart(2, "0")}d ${String(
    hours
  ).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(
    seconds
  ).padStart(2, "0")}s`;

  return {
    total: difference,
    days,
    hours,
    minutes,
    seconds,
    formatted,
  };
};

export const useCountdown = (targetDate) => {
  const [countdown, setCountdown] = useState(() =>
    getTimeLeft(targetDate)
  );

  useEffect(() => {
    setCountdown(getTimeLeft(targetDate));

    if (!targetDate) {
      return undefined;
    }

    const interval = setInterval(() => {
      setCountdown(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
};