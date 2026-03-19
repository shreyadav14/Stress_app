import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function SleepQuality({ data }) {
  if (!data) {
    return null;
  }

  const confidence = Math.max(0, Math.min(1, Number(data.Confidence) || 0));
  const confidencePercent = Math.round(confidence * 100);
  const remainingPercent = 100 - confidencePercent;

  const chartData = [
    { name: data.Predicted_Stress_Level || "Prediction", value: confidencePercent },
    { name: "Uncertainty", value: remainingPercent }
  ];

  const colors = ["#7fb069", "#d9d9d9"];

  return (
    <div className="card">
      <h2>Sleep Quality</h2>

      <PieChart width={350} height={300}>
        <Pie data={chartData} dataKey="value" outerRadius={120}>
          {chartData.map((entry, index) => (
            <Cell key={entry.name} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default SleepQuality;
