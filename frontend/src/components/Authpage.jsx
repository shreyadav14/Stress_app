import "./Login.css";
import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaUser,
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
import { useAuth } from "./AuthContext";

export default function AuthPage({ onSuccess }) {
  const [mode, setMode] = useState("login"); // "login" | "signup"

  return (
    <div className="login-page">
      <div className="login-shell">
        <VisualPanel />
        {mode === "login" ? (
          <LoginForm onSwitch={() => setMode("signup")} onSuccess={onSuccess} />
        ) : (
          <SignupForm onSwitch={() => setMode("login")} onSuccess={onSuccess} />
        )}
      </div>
    </div>
  );
}

function VisualPanel() {
  return (
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
          AI-powered insights to help you understand your mind, improve your
          habits, and reduce stress.
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
  );
}

function LoginForm({ onSwitch, onSuccess }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await login(email, password);
      onSuccess?.(user);
    } catch (err) {
      setError(
        err.message.includes("Failed to fetch")
          ? "Couldn't reach the server. Is the backend running?"
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
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

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="login-submit-btn" disabled={loading}>
          {loading ? "Logging in..." : "Log In"} <FaArrowRight />
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
          <button type="button" className="login-link login-link-btn" onClick={onSwitch}>
            Sign Up <FaArrowRight size={12} />
          </button>
        </div>
      </form>
    </div>
  );
}

function SignupForm({ onSwitch, onSuccess }) {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const user = await signup(name, email, password);
      onSuccess?.(user);
    } catch (err) {
      setError(
        err.message.includes("Failed to fetch")
          ? "Couldn't reach the server. Is the backend running?"
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-panel">
      <div className="login-form-header">
        <h2>
          Create <span>Account</span>
        </h2>
        <p>Start your wellness journey with Somnia AI</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-input-group">
          <FaUser className="login-input-icon" />
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        <div className="login-input-group">
          <FaLock className="login-input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="login-submit-btn" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"} <FaArrowRight />
        </button>

        <div className="login-signup-box">
          <span>Already have an account? </span>
          <button type="button" className="login-link login-link-btn" onClick={onSwitch}>
            Log In <FaArrowRight size={12} />
          </button>
        </div>
      </form>
    </div>
  );
}