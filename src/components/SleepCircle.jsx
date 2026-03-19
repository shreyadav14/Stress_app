import React from "react";
import { RadialBarChart, RadialBar } from "recharts";

function SleepCircle({ metrics }) {
  if (!metrics) {
    return null;
  }

  const chartData = [
    { name: "Sleep", value: Number(metrics.Sleep_Hours) || 0, fill: "#7fb069" },
    { name: "Phone", value: Number(metrics.Daily_Phone_Hours) || 0, fill: "#f28c38" }
  ];

  return (
    <div className="card">
      <h2>Sleep Overview</h2>

      <RadialBarChart
        width={250}
        height={250}
        innerRadius="40%"
        outerRadius="100%"
        data={chartData}
      >
        <RadialBar dataKey="value" />
      </RadialBarChart>
    </div>
  );
}

export default SleepCircle;
