import "./Charts.css";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { stressToScore } from "./History";
import { fetchPredictionHistory } from "./historyApi";
import { useAuth } from "./AuthContext";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

export default function Charts() {
  const { token } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    fetchPredictionHistory(token)
      .then((data) => setHistory(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="charts-empty dash-glass">
        <p>Loading your trends...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="charts-empty dash-glass">
        <p>Couldn't load trend data: {error}</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="charts-empty dash-glass">
        <p>No trend data yet — run an analysis to start tracking your wellness over time.</p>
      </div>
    );
  }

  const chartData = history.map((entry, i) => ({
    session: `#${i + 1}`,
    date: formatDate(entry.created_at),
    sleep: entry.Sleep_Hours,
    stress: stressToScore(entry.Predicted_Stress_Level),
    stressLabel: entry.Predicted_Stress_Level,
    phone: entry.Daily_Phone_Hours,
    social: entry.Social_Media_Hours,
    productivity: entry.Work_Productivity_Score,
  }));

  return (
    <div className="charts-grid">
      <ChartCard title="Sleep Trend" subtitle="Hours of sleep per session">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={12} />
            <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} domain={[0, 12]} />
            <Tooltip content={<DarkTooltip unit="hrs" />} />
            <Line
              type="monotone"
              dataKey="sleep"
              stroke="#22d3ee"
              strokeWidth={2}
              dot={{ fill: "#22d3ee", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Stress Trend" subtitle="Low / Normal / Medium / High per session">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={12} />
            <YAxis
              stroke="rgba(255,255,255,0.4)"
              fontSize={12}
              domain={[0, 5]}
              ticks={[1, 2, 3, 4]}
              tickFormatter={(v) =>
                ["", "Low", "Normal", "Medium", "High"][v] || v
              }
            />
            <Tooltip content={<DarkTooltip labelKey="stressLabel" />} />
            <Line
              type="stepAfter"
              dataKey="stress"
              stroke="#a855f7"
              strokeWidth={2}
              dot={{ fill: "#a855f7", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Screen Time" subtitle="Phone vs. social media hours">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={12} />
            <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
            <Tooltip content={<DarkTooltip unit="hrs" />} />
            <Legend wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }} />
            <Bar dataKey="phone" name="Phone" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            <Bar dataKey="social" name="Social Media" fill="#22d3ee" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Productivity Trend" subtitle="Self-rated score per session">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={12} />
            <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} domain={[0, 10]} />
            <Tooltip content={<DarkTooltip unit="/10" />} />
            <Line
              type="monotone"
              dataKey="productivity"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ fill: "#22c55e", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="chart-card dash-glass">
      <h3>{title}</h3>
      <p>{subtitle}</p>
      {children}
    </div>
  );
}

function DarkTooltip({ active, payload, label, unit, labelKey }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name || p.dataKey}:{" "}
          {labelKey ? p.payload[labelKey] : `${p.value}${unit || ""}`}
        </p>
      ))}
    </div>
  );
}