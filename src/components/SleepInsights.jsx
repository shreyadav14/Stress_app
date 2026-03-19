import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function SleepInsights({ metrics }) {
  if (!metrics) {
    return null;
  }

  const data = [
    { metric: "Sleep", value: Number(metrics.Sleep_Hours) || 0 },
    { metric: "Phone", value: Number(metrics.Daily_Phone_Hours) || 0 },
    { metric: "Social", value: Number(metrics.Social_Media_Hours) || 0 },
    { metric: "Weekend", value: Number(metrics.Weekend_Screen_Time_Hours) || 0 }
  ];

  return (
    <div className="card">
      <h2>Sleep Insights</h2>

      <BarChart width={360} height={250} data={data}>
        <XAxis dataKey="metric" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#6c8f4e" />
      </BarChart>
    </div>
  );
}

export default SleepInsights;
