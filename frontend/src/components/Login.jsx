import "./Login.css";
import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaGoogle,
  FaApple,
  FaMicrosoft,
  FaMoon,
  FaBrain,
  FaChartBar,
  FaSpa,
} from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to your auth backend once that's built.
    console.log("Login attempt:", { email, rememberMe });
  };

  return (
    <div className="login-page">
      <div className="login-shell">
        {/* LEFT VISUAL PANEL */}
        <div className="login-visual">
          <div className="login-moon" />
          <div className="login-stars" />

          <div className="login-visual-content">
            <div className="login-logo">
              <div className="login-logo-icon">
                <FaMoon />
                <FaBrain className="login-logo-brain" />
              </div>
              <span className="login-logo-text">
                Somnia <span>AI</span>
              </span>
            </div>

            <h1>Sleep Better. Live Better.</h1>
            <p>
              AI-powered insights to help you understand your mind, improve
              your habits, and reduce stress.
            </p>

            <div className="login-feature-row">
              <div className="login-feature">
                <div className="login-feature-icon purple">
                  <FaBrain />
                </div>
                <span>AI Predictions</span>
              </div>

              <div className="login-feature">
                <div className="login-feature-icon blue">
                  <FaChartBar />
                </div>
                <span>Wellness Analytics</span>
              </div>

              <div className="login-feature">
                <div className="login-feature-icon cyan">
                  <FaSpa />
                </div>
                <span>Personalized Wellness</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="login-form-panel">
          <div className="login-form-header">
            <h2>
              Welcome <span>Back</span>
            </h2>
            <p>Log in to continue your wellness journey</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-input-group">
              <FaEnvelope className="login-input-icon" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-input-group">
              <FaLock className="login-input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="login-eye-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="login-row-between">
              <label className="login-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>

              <a href="#forgot-password" className="login-link">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login-submit-btn">
              Log In <FaArrowRight />
            </button>

            <div className="login-divider">
              <span>or continue with</span>
            </div>

            <div className="login-social-row">
              <button type="button" className="login-social-btn">
                <FaGoogle />
              </button>
              <button type="button" className="login-social-btn">
                <FaApple />
              </button>
              <button type="button" className="login-social-btn">
                <FaMicrosoft />
              </button>
            </div>

            <div className="login-signup-box">
              <span>Don't have an account? </span>
              <a href="#signup" className="login-link">
                Sign Up <FaArrowRight size={12} />
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}