import "./RelaxZone.css";
import { useState } from "react";
import { FaCheckSquare, FaClock, FaThLarge, FaMusic } from "react-icons/fa";
import TodoList from "./TodoList";
import PomodoroTimer from "./PomodoroTimer";
import TicTacToe from "./TicTacToe";
import CalmSounds from "./CalmSounds";

const TABS = [
  { key: "todo", label: "To-Do", icon: <FaCheckSquare /> },
  { key: "pomodoro", label: "Pomodoro", icon: <FaClock /> },
  { key: "tictactoe", label: "Tic-Tac-Toe", icon: <FaThLarge /> },
  { key: "sounds", label: "Calm Sounds", icon: <FaMusic /> },
];

export default function RelaxZone() {
  const [activeTab, setActiveTab] = useState("todo");

  return (
    <section className="relax-section" id="relax">
      <div className="relax-header">
        <h1>
          Relax <span>Zone</span>
        </h1>
        <p>Take a healthy break whenever you need one.</p>
      </div>

      <div className="relax-card">
        <div className="relax-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`relax-tab ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relax-content">
          {activeTab === "todo" && <TodoList />}
          {activeTab === "pomodoro" && <PomodoroTimer />}
          {activeTab === "tictactoe" && <TicTacToe />}
          {activeTab === "sounds" && <CalmSounds />}
        </div>
      </div>
    </section>
  );
}