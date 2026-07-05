import "./Features.css";
import {
  FaBrain,
  FaChartLine,
  FaSmile,
  FaGamepad,
  FaArrowRight,
  FaRobot,
} from "react-icons/fa";

const cards = [
  {
    icon: <FaBrain />,
    tag: "SMART AI",
    title: "AI Prediction",
    text: "Predict stress levels using Machine Learning and personalized analysis tailored just for you.",
    color: "blue",
  },
  {
    icon: <FaChartLine />,
    tag: "DATA INSIGHTS",
    title: "Analytics",
    text: "Interactive charts and powerful insights help visualize your wellness trends over time.",
    color: "cyan",
  },
  {
    icon: <FaSmile />,
    tag: "EMOTIONAL HEALTH",
    title: "Mood Calendar",
    text: "Track your daily emotions and discover patterns to build healthier habits.",
    color: "green",
  },
  {
    icon: <FaGamepad />,
    tag: "RELAX ZONE",
    title: "Games & Tasks",
    text: "Play Tic-Tac-Toe, manage your To-Do List and take healthy breaks whenever you need.",
    color: "purple",
  },
];

export default function Features() {
  return (
    <section className="features-section" id="features">

      <div className="ai-badge">
        <FaRobot />
        <span>Powered by AI</span>
      </div>

      <h1>
        Everything You Need
        <br />
        <span>For Better Wellness</span>
      </h1>

      <p className="subtitle">
        Advanced AI technology meets beautiful design to help you
        understand your mind, improve your sleep and reduce stress.
      </p>

      <div className="divider"></div>

      <div className="features-grid">
        {cards.map((card, index) => (
          <div className={`feature-card ${card.color}`} key={index}>

            <div className="feature-icon">
              {card.icon}
            </div>

            <div className="feature-content">

              <small>{card.tag}</small>

              <h2>{card.title}</h2>

              <p>{card.text}</p>

            </div>

            <button>
              <FaArrowRight />
            </button>

          </div>
        ))}
      </div>

    </section>
  );
}