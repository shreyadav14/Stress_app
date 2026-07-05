import { motion } from "framer-motion";
import { FaMoon, FaBrain } from "react-icons/fa";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero" id="home">

      <motion.div
        className="hero-left"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >

        <span className="badge">
          <FaMoon /> AI Powered Wellness
        </span>

        <h1>
          Improve Your
          <span> Sleep</span>
          <br />
          Understand Your
          <span> Stress</span>
        </h1>

        <p>
          Somnia AI predicts stress levels using Machine Learning,
          analyzes your sleep habits, and provides personalized
          wellness recommendations.
        </p>

        <div className="hero-buttons">
  <button
    className="primary-btn"
    onClick={() => document.getElementById("analysis").scrollIntoView({ behavior: "smooth" })}
  >
    Start Analysis
  </button>

  <button
    className="secondary-btn"
    onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}
  >
    Learn More
  </button>
</div>

      </motion.div>

      <motion.div
        className="hero-right"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >

        <div className="glass-card">

          <FaMoon className="moon-icon"/>

          <h2>Sleep Score</h2>

          <h1>92%</h1>

          <p>Excellent Sleep Quality</p>

        </div>

      </motion.div>

    </section>
  );
};

export default Hero;