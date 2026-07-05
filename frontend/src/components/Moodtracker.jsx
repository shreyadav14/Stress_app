import "./Moodtracker.css";
import { useState, useMemo, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MOODS, getMoodInfo, dateKey } from "./moodHistory";
import { fetchMoodEntries, setMoodEntry } from "./historyApi";
import { useAuth } from "./AuthContext";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function MoodTracker() {
  const { token } = useAuth();
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [moods, setMoods] = useState({}); // { "2026-07-01": "great", ... }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  useEffect(() => {
    if (!token) return;
    fetchMoodEntries(token)
      .then((entries) => {
        const map = {};
        entries.forEach((e) => {
          map[e.entry_date] = e.mood;
        });
        setMoods(map);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  const { days, leadingBlanks } = useMemo(() => {
    const firstOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const leading = firstOfMonth.getDay(); // 0 = Sunday
    return {
      days: Array.from({ length: daysInMonth }, (_, i) => i + 1),
      leadingBlanks: Array.from({ length: leading }),
    };
  }, [year, month]);

  const monthSummary = useMemo(() => {
    const entries = Object.entries(moods).filter(([dateStr]) =>
      dateStr.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)
    );
    if (entries.length === 0) return null;

    const avgScore =
      entries.reduce((sum, [, key]) => sum + (getMoodInfo(key)?.score || 0), 0) /
      entries.length;

    const counts = {};
    entries.forEach(([, key]) => {
      counts[key] = (counts[key] || 0) + 1;
    });
    const mostCommonKey = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];

    return {
      loggedDays: entries.length,
      avgScore: avgScore.toFixed(1),
      mostCommon: getMoodInfo(mostCommonKey),
    };
  }, [moods, year, month]);

  const changeMonth = (delta) => {
    setViewDate(new Date(year, month + delta, 1));
    setSelectedDay(null);
  };

  const handlePickMood = async (day, moodKey) => {
    const date = new Date(year, month, day);
    const key = dateKey(date);

    // Optimistic update so the UI feels instant.
    setMoods((prev) => ({ ...prev, [key]: moodKey }));
    setSelectedDay(null);

    try {
      await setMoodEntry(token, key, moodKey);
    } catch (err) {
      setError(err.message);
    }
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  if (loading) {
    return (
      <section className="mood-section" id="mood">
        <div className="mood-header">
          <h1>
            Mood <span>Calendar</span>
          </h1>
          <p>Loading your mood history...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mood-section" id="mood">
      <div className="mood-header">
        <h1>
          Mood <span>Calendar</span>
        </h1>
        <p>Track your daily emotions and discover patterns over time.</p>
        {error && <p style={{ color: "#f87171", fontSize: 14 }}>{error}</p>}
      </div>

      {monthSummary && (
        <div className="mood-summary">
          <div className="mood-summary-item">
            <span className="mood-summary-value">{monthSummary.loggedDays}</span>
            <span className="mood-summary-label">Days logged</span>
          </div>
          <div className="mood-summary-item">
            <span className="mood-summary-value">
              {monthSummary.mostCommon.emoji}
            </span>
            <span className="mood-summary-label">
              Most common: {monthSummary.mostCommon.label}
            </span>
          </div>
          <div className="mood-summary-item">
            <span className="mood-summary-value">{monthSummary.avgScore}/5</span>
            <span className="mood-summary-label">Average mood</span>
          </div>
        </div>
      )}

      <div className="mood-calendar-card">
        <div className="mood-calendar-nav">
          <button onClick={() => changeMonth(-1)} aria-label="Previous month">
            <FaChevronLeft />
          </button>
          <h3>
            {monthNames[month]} {year}
          </h3>
          <button onClick={() => changeMonth(1)} aria-label="Next month">
            <FaChevronRight />
          </button>
        </div>

        <div className="mood-weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        <div className="mood-grid">
          {leadingBlanks.map((_, i) => (
            <div className="mood-cell mood-cell-blank" key={`blank-${i}`} />
          ))}

          {days.map((day) => {
            const key = dateKey(new Date(year, month, day));
            const moodKey = moods[key];
            const mood = moodKey ? getMoodInfo(moodKey) : null;
            const isOpen = selectedDay === day;

            return (
              <div
                className={`mood-cell ${isToday(day) ? "mood-cell-today" : ""}`}
                key={day}
              >
                <button
                  className="mood-cell-btn"
                  onClick={() => setSelectedDay(isOpen ? null : day)}
                >
                  <span className="mood-cell-date">{day}</span>
                  {mood && <span className="mood-cell-emoji">{mood.emoji}</span>}
                </button>

                {isOpen && (
                  <div className="mood-picker">
                    {MOODS.map((m) => (
                      <button
                        key={m.key}
                        className="mood-picker-option"
                        onClick={() => handlePickMood(day, m.key)}
                        title={m.label}
                      >
                        {m.emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}