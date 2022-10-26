import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "./AssignmentTimer.module.css";

interface Props extends React.PropsWithChildren {
  durationInMinutes: number;
  onTimerEnd?: () => void;
}

const timeFormatter = (totalSeconds: number) => {
  const totalSecondsToHours = Math.floor(totalSeconds / 3600);
  const totalSecondsToMinutes = Math.floor((totalSeconds % 3600) / 60);
  const totalSecondsToSeconds = Math.floor((totalSeconds % 3600) % 60);

  const hours = totalSecondsToHours.toString().padStart(2, "0");
  const minutes = totalSecondsToMinutes.toString().padStart(2, "0");
  const seconds = totalSecondsToSeconds.toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

const AssignmentTimer: React.FC<Props> = ({
  durationInMinutes,
  onTimerEnd,
}) => {
  const timerRef = useRef<NodeJS.Timer>();
  const [timeRemaining, setTimeRemaining] = useState(() => durationInMinutes * 60);

  useEffect(() => {
    setTimeRemaining(durationInMinutes * 60);
  }, [durationInMinutes])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((currentRemaining) => currentRemaining - 1);
    }, 1000);
    timerRef.current = timer;

    return () => clearInterval(timer);
  }, [durationInMinutes]);

  useEffect(() => {
    if (timeRemaining <= 0 && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
      onTimerEnd && onTimerEnd();
    }
  }, [timeRemaining, onTimerEnd]);


  return (
    <div className={`${styles["assignment-timer"]}`}>
      <h2 className={`${styles["assignment-timer_header"]}`}>
        Time remaining:{" "}
        <span className={`${styles["time-remaining"]}`}>
          {timeFormatter(timeRemaining)}
        </span>
      </h2>
    </div>
  );
};

export default AssignmentTimer;
