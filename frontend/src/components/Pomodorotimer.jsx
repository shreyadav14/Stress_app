import { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

const WORK_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

export default function PomodoroTimer() {
  const [mode, setMode] = useState("work"); // "work" | "break"
  const [secondsLeft, setSecondsLeft] = useState(WORK_SECONDS);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            // Switch modes automatically when a session ends.
            setMode((m) => {
              const nextMode = m === "work" ? "break" : "work";
              setSecondsLeft(nextMode === "work" ? WORK_SECONDS : BREAK_SECONDS);
              return nextMode;
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const total = mode === "work" ? WORK_SECONDS : BREAK_SECONDS;
  const progress = ((total - secondsLeft) / total) * 100;

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const reset = () => {
    setRunning(false);
    setMode("work");
    setSecondsLeft(WORK_SECONDS);
  };

  return (
    <div className="relax-panel relax-pomodoro">
      <div className="relax-pomodoro-mode">
        {mode === "work" ? "Focus Session" : "Break Time"}
      </div>

      <div
        className="relax-pomodoro-ring"
        style={{
          background: `conic-gradient(${
            mode === "work" ? "#22d3ee" : "#a855f7"
          } ${progress * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
        }}
      >
        <div className="relax-pomodoro-inner">
          <span>{minutes}:{seconds}</span>
        </div>
      </div>

      <div className="relax-pomodoro-controls">
        <button onClick={() => setRunning((r) => !r)}>
          {running ? <FaPause /> : <FaPlay />}
          {running ? "Pause" : "Start"}
        </button>
        <button className="relax-secondary-btn" onClick={reset}>
          <FaRedo /> Reset
        </button>
      </div>
    </div>
  );
}