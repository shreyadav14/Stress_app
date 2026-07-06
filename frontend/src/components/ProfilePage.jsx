import "./ProfilePage.css";
import { useState, useEffect, useMemo } from "react";
import { FaSignOutAlt, FaFire, FaChartLine, FaMoon } from "react-icons/fa";
import { useAuth } from "./AuthContext";
import { fetchPredictionHistory, fetchMoodEntries } from "./historyApi";
import { dateKey } from "./moodHistory";

const ACHIEVEMENTS = [
  {
    key: "first_analysis",
    emoji: "🌱",
    label: "Getting Started",
    desc: "Complete your first analysis",
    unlocked: (stats) => stats.totalPredictions >= 1,
  },
  {
    key: "data_enthusiast",
    emoji: "📊",
    label: "Data Enthusiast",
    desc: "Complete 10 analyses",
    unlocked: (stats) => stats.totalPredictions >= 10,
  },
  {
    key: "week_streak",
    emoji: "🔥",
    label: "7-Day Streak",
    desc: "Log activity 7 days in a row",
    unlocked: (stats) => stats.streak >= 7,
  },
  {
    key: "mood_tracker",
    emoji: "😊",
    label: "Mood Tracker",
    desc: "Log 5 moods",
    unlocked: (stats) => stats.totalMoods >= 5,
  },
  {
    key: "wellness_pro",
    emoji: "🏆",
    label: "Wellness Pro",
    desc: "20 analyses + a 7-day streak",
    unlocked: (stats) => stats.totalPredictions >= 20 && stats.streak >= 7,
  },
];

function calculateStreak(activeDateStrings) {
  const daySet = new Set(activeDateStrings);
  let streak = 0;
  let cursor = new Date();

  while (true) {
    const key = dateKey(cursor);
    if (daySet.has(key)) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export default function ProfilePage() {
  const { user, logout, token } = useAuth();
  const [predictions, setPredictions] = useState([]);
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    Promise.all([fetchPredictionHistory(token), fetchMoodEntries(token)])
      .then(([predictionData, moodData]) => {
        setPredictions(predictionData);
        setMoods(moodData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  const stats = useMemo(() => {
    const totalPredictions = predictions.length;

    const sleepValues = predictions
      .map((p) => p.Sleep_Hours)
      .filter((v) => typeof v === "number");
    const avgSleep =
      sleepValues.length > 0
        ? (sleepValues.reduce((a, b) => a + b, 0) / sleepValues.length).toFixed(1)
        : null;

    const predictionDays = predictions.map((p) => p.created_at.slice(0, 10));
    const moodDays = moods.map((m) => m.entry_date);
    const streak = calculateStreak([...predictionDays, ...moodDays]);

    return {
      totalPredictions,
      avgSleep,
      streak,
      totalMoods: moods.length,
    };
  }, [predictions, moods]);

  if (loading) {
    return (
      <section className="profile-section" id="profile">
        <p className="profile-loading">Loading your profile...</p>
      </section>
    );
  }

  return (
    <section className="profile-section" id="profile">
      <div className="profile-card">
        <div className="profile-avatar">
          {user?.name?.[0]?.toUpperCase() || "?"}
        </div>
        <h1>{user?.name}</h1>
        <p className="profile-email">{user?.email}</p>

        <button className="profile-logout-btn" onClick={logout}>
          <FaSignOutAlt /> Log Out
        </button>
      </div>

      {error && <p className="profile-error">{error}</p>}

      <div className="profile-stats-grid">
        <div className="profile-stat-card">
          <div className="profile-stat-icon blue">
            <FaMoon />
          </div>
          <span className="profile-stat-value">
            {stats.avgSleep !== null ? `${stats.avgSleep} hrs` : "—"}
          </span>
          <span className="profile-stat-label">Average Sleep</span>
        </div>

        <div className="profile-stat-card">
          <div className="profile-stat-icon purple">
            <FaChartLine />
          </div>
          <span className="profile-stat-value">{stats.totalPredictions}</span>
          <span className="profile-stat-label">Predictions</span>
        </div>

        <div className="profile-stat-card">
          <div className="profile-stat-icon cyan">
            <FaFire />
          </div>
          <span className="profile-stat-value">{stats.streak} days</span>
          <span className="profile-stat-label">Current Streak</span>
        </div>
      </div>

      <h2 className="profile-achievements-title">Achievements</h2>
      <div className="profile-achievements-grid">
        {ACHIEVEMENTS.map((a) => {
          const unlocked = a.unlocked(stats);
          return (
            <div
              key={a.key}
              className={`profile-achievement ${unlocked ? "unlocked" : "locked"}`}
            >
              <span className="profile-achievement-emoji">{a.emoji}</span>
              <span className="profile-achievement-label">{a.label}</span>
              <span className="profile-achievement-desc">{a.desc}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}