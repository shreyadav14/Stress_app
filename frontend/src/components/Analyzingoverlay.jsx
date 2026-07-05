import { useEffect, useState } from "react";
import { FaBrain, FaMoon, FaMobileAlt, FaChartLine, FaMagic } from "react-icons/fa";
import "./AnalyzingOverlay.css";

const steps = [
  { icon: <FaMoon />, label: "Checking sleep patterns..." },
  { icon: <FaMobileAlt />, label: "Analyzing screen time..." },
  { icon: <FaChartLine />, label: "Evaluating productivity..." },
  { icon: <FaMagic />, label: "Generating AI advice..." },
];

export default function AnalyzingOverlay() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // Advances one step every 900ms, then holds on the final step if the
    // real API call takes longer than the animation — it won't loop back
    // and look broken while still waiting on the response.
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 900);
    return () => clearInterval(interval);
  }, []);

  const progressPercent = ((activeStep + 1) / steps.length) * 100;

  return (
    <div className="analyzing-overlay">
      <div className="analyzing-card">
        <div className="analyzing-icon">
          <FaBrain />
        </div>

        <h2>
          Analyzing
          <span className="analyzing-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </h2>

        <div className="analyzing-progress">
          <div
            className="analyzing-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <ul className="analyzing-steps">
          {steps.map((step, i) => {
            const state =
              i < activeStep ? "done" : i === activeStep ? "active" : "pending";
            return (
              <li key={i} className={state}>
                <span className="step-icon">
                  {state === "done" ? "✓" : step.icon}
                </span>
                <span>{step.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}