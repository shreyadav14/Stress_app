import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Moodcalendar.css";

const moodColors = {
  happy: "lightgreen",
  sad: "lightblue",
  angry: "lightcoral",
  neutral: "lightgray"
};

function MoodCalendar() {
  const [date, setDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState("");
  const [moodData, setMoodData] = useState({});

  const handleSaveMood = () => {
    const dateKey = date.toDateString();
    setMoodData({
      ...moodData,
      [dateKey]: selectedMood
    });
  };

  return (
    <div className="mood-calendar-card">
      <h2>Mood Calendar</h2>

      <Calendar
        className="mood-calendar"
        onChange={setDate}
        value={date}
        tileStyle={({ date }) => {
          const mood = moodData[date.toDateString()];
          if (mood) {
            return { backgroundColor: moodColors[mood] };
          }
        }}
      />

      <div className="mood-controls">
        <select onChange={(e) => setSelectedMood(e.target.value)}>
          <option value="">Select Mood</option>
          <option value="happy">😊 Happy</option>
          <option value="sad">😢 Sad</option>
          <option value="angry">😡 Angry</option>
          <option value="neutral">😐 Neutral</option>
        </select>

        <button type="button" onClick={handleSaveMood}>
          Save Mood
        </button>
      </div>
    </div>
  );
}

export default MoodCalendar;
