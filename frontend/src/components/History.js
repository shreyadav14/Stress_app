const STORAGE_KEY = "somnia_prediction_history";

// Your model (model.classes_) only knows two real classes: 'High' and 'Normal'.
// deriveStressLevel() splits each of those into two sub-levels using the
// model's confidence score, giving a friendlier 4-tier display without
// retraining. This is an approximation, not a true 4-class prediction.
const CONFIDENCE_THRESHOLD = 0.85;

export function deriveStressLevel(predictedClass, confidence) {
  if (predictedClass === "Normal") {
    return confidence >= CONFIDENCE_THRESHOLD ? "Low" : "Normal";
  }
  // predictedClass === "High"
  return confidence >= CONFIDENCE_THRESHOLD ? "High" : "Medium";
}

const STRESS_SCORE_MAP = {
  Low: 1,
  Normal: 2,
  Medium: 3,
  High: 4,
};

export function stressToScore(level) {
  return STRESS_SCORE_MAP[level] ?? 2;
}

export function getHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to read prediction history:", err);
    return [];
  }
}

export function addToHistory(entry) {
  try {
    const history = getHistory();
    const newEntry = {
      ...entry,
      date: new Date().toISOString(),
    };
    const updated = [...history, newEntry];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Failed to save prediction history:", err);
    return getHistory();
  }
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}