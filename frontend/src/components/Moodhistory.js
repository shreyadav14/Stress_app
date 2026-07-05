export const MOODS = [
  { key: "great", emoji: "😄", label: "Great", score: 5 },
  { key: "good", emoji: "🙂", label: "Good", score: 4 },
  { key: "okay", emoji: "😐", label: "Okay", score: 3 },
  { key: "bad", emoji: "🙁", label: "Bad", score: 2 },
  { key: "awful", emoji: "😢", label: "Awful", score: 1 },
];

export function getMoodInfo(key) {
  return MOODS.find((m) => m.key === key);
}

// Local YYYY-MM-DD, avoids UTC offset shifting the day — used as the
// entry_date sent to the backend.
export function dateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}