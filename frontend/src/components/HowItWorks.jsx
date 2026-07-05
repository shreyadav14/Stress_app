import "./HowItWorks.css";
import { FaWpforms, FaBrain, FaChartLine, FaLightbulb } from "react-icons/fa";

const steps = [
  {
    icon: <FaWpforms />,
    number: "01",
    title: "Fill Your Details",
    text: "Provide your sleep habits, phone usage, caffeine intake and daily routine.",
  },
  {
    icon: <FaBrain />,
    number: "02",
    title: "AI Analysis",
    text: "Our machine learning model processes your data to identify stress patterns.",
  },
  {
    icon: <FaChartLine />,
    number: "03",
    title: "View Dashboard",
    text: "Explore interactive charts, confidence scores and wellness insights.",
  },
  {
    icon: <FaLightbulb />,
    number: "04",
    title: "Get Recommendations",
    text: "Receive personalized suggestions to improve sleep and reduce stress.",
  },
];

export default function HowItWorks() {
  return (
    <section className="how-section">

      <h2>How Somnia AI Works</h2>

      <p>
        Four simple steps to understand your wellness with AI.
      </p>

      <div className="steps">

        {steps.map((step, index) => (

          <div className="step-card" key={index}>

            <div className="step-number">
              {step.number}
            </div>

            <div className="step-icon">
              {step.icon}
            </div>

            <h3>{step.title}</h3>

            <p>{step.text}</p>

          </div>

        ))}

      </div>

    </section>
  );
}