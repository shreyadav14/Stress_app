const API_BASE = import.meta.env.VITE_API_URL;

async function handleResponse(res) {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Request failed.");
  }
  return res.json();
}

function authHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function savePredictionToHistory(token, entry) {
  const res = await fetch(`${API_BASE}/history/predictions`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(entry),
  });
  return handleResponse(res);
}

export async function fetchPredictionHistory(token) {
  const res = await fetch(`${API_BASE}/history/predictions`, {
    headers: authHeaders(token),
  });
  return handleResponse(res);
}

export async function setMoodEntry(token, entryDate, mood) {
  const res = await fetch(`${API_BASE}/history/mood`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify({ entry_date: entryDate, mood }),
  });
  return handleResponse(res);
}

export async function fetchMoodEntries(token) {
  const res = await fetch(`${API_BASE}/history/mood`, {
    headers: authHeaders(token),
  });
  return handleResponse(res);
}