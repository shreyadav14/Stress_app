import "./PredictionForm.css";
import { useState } from "react";

import {
  FaUser,
  FaMoon,
  FaMobileAlt,
  FaCoffee,
  FaChartLine,
} from "react-icons/fa";

import { deriveStressLevel } from "./History";
import { savePredictionToHistory } from "./historyApi";
import AnalyzingOverlay from "./AnalyzingOverlay";
import { useAuth } from "./AuthContext";

// Reads from .env locally (VITE_API_URL=http://localhost:8000) and from
// your hosting provider's environment variables once deployed.
const API_URL = `${import.meta.env.VITE_API_URL}/predict`;

export default function PredictionForm({ onResult }) {
  const { token } = useAuth();

  // Personal info
  const [age, setAge] = useState(22);
  const [gender, setGender] = useState("Male");
  const [occupation, setOccupation] = useState("Student");
  const [deviceType, setDeviceType] = useState("Android");

  // Lifestyle sliders
  const [sleep, setSleep] = useState(7);
  const [phone, setPhone] = useState(5);
  const [social, setSocial] = useState(2);
  const [productivity, setProductivity] = useState(8);
  const [caffeine, setCaffeine] = useState(2);
  const [appUsage, setAppUsage] = useState(20);
  const [weekendScreen, setWeekendScreen] = useState(6);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    const payload = {
      Age: Number(age),
      Gender: gender,
      Occupation: occupation,
      Device_Type: deviceType,
      Daily_Phone_Hours: Number(phone),
      Social_Media_Hours: Number(social),
      Work_Productivity_Score: Number(productivity),
      Sleep_Hours: Number(sleep),
      App_Usage_Count: Number(appUsage),
      Caffeine_Intake_Cups: Number(caffeine),
      Weekend_Screen_Time_Hours: Number(weekendScreen),
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server error (${res.status}): ${errText}`);
      }

      const data = await res.json();

      if (data.Predicted_Stress_Level === "Error") {
        throw new Error(data.Advice?.[0] || "Prediction failed.");
      }

      // Derive a friendlier 4-tier level (Low/Normal/Medium/High) from the
      // model's raw 2-class output + confidence score. See History.js.
      const derivedLevel = deriveStressLevel(
        data.Predicted_Stress_Level,
        data.Confidence
      );

      // Save this prediction + the lifestyle inputs behind it to the
      // database, tied to the logged-in user, so charts have real data to
      // plot trends from and it follows them across devices.
      await savePredictionToHistory(token, {
        Predicted_Stress_Level: derivedLevel,
        Raw_Stress_Level: data.Predicted_Stress_Level,
        Confidence: data.Confidence,
        Sleep_Hours: Number(sleep),
        Daily_Phone_Hours: Number(phone),
        Social_Media_Hours: Number(social),
        Work_Productivity_Score: Number(productivity),
        Caffeine_Intake_Cups: Number(caffeine),
      });

      // Pass the derived level along to the Dashboard too, so the summary
      // card matches what's plotted in the charts.
      onResult({ ...data, Predicted_Stress_Level: derivedLevel });
    } catch (err) {
      console.error("Prediction request failed:", err);
      setError(
        err.message.includes("Failed to fetch")
          ? "Couldn't reach the server. Is the FastAPI backend running?"
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="prediction-section" id="analysis">
      {loading && <AnalyzingOverlay />}

      <div className="prediction-header">
        <span className="prediction-badge">Powered by Somnia AI</span>

        <h1>
          AI Wellness <span>Analysis</span>
        </h1>

        <p>
          Understand how your digital lifestyle affects your stress,
          productivity and sleep quality.
        </p>
      </div>

      <div className="analysis-container">
        <div className="analysis-grid">
          {/* LEFT */}
          <div>
            <h2 className="column-title">
              <FaUser />
              Personal Information
            </h2>

            <div className="input-group">
              <label>Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min={10}
                max={100}
              />
            </div>

            <div className="input-group">
              <label>Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label>Occupation</label>
              <select
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              >
                <option value="Student">Student</option>
                <option value="Working Professional">
                  Working Professional
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label>Device</label>
              <select
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
              >
                <option value="Android">Android</option>
                <option value="iPhone">iPhone</option>
              </select>
            </div>

            <div className="input-group">
              <label>Daily App Opens</label>
              <input
                type="number"
                value={appUsage}
                onChange={(e) => setAppUsage(e.target.value)}
                min={0}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h2 className="column-title">
              <FaMoon />
              Lifestyle Habits
            </h2>

            <Slider
              title="Sleep Hours"
              value={sleep}
              setValue={setSleep}
              min={0}
              max={12}
              icon={<FaMoon />}
              unit="hrs"
            />

            <Slider
              title="Phone Usage"
              value={phone}
              setValue={setPhone}
              min={0}
              max={12}
              icon={<FaMobileAlt />}
              unit="hrs"
            />

            <Slider
              title="Social Media"
              value={social}
              setValue={setSocial}
              min={0}
              max={12}
              icon={<FaMobileAlt />}
              unit="hrs"
            />

            <Slider
              title="Productivity"
              value={productivity}
              setValue={setProductivity}
              min={0}
              max={10}
              icon={<FaChartLine />}
              unit="/10"
            />

            <Slider
              title="Caffeine"
              value={caffeine}
              setValue={setCaffeine}
              min={0}
              max={8}
              icon={<FaCoffee />}
              unit="cups"
            />

            <Slider
              title="Weekend Screen Time"
              value={weekendScreen}
              setValue={setWeekendScreen}
              min={0}
              max={16}
              icon={<FaMobileAlt />}
              unit="hrs"
            />
          </div>
        </div>

        {error && <p className="prediction-error">{error}</p>}

        <div className="analyze-wrapper">
          <button
            className="analyze-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze with Somnia AI →"}
          </button>
        </div>
      </div>
    </section>
  );
}

function Slider({ title, value, setValue, min, max, unit, icon }) {
  return (
    <div className="slider-item">
      <div className="slider-top">
        <div className="slider-title">
          {icon}
          {title}
        </div>
        <span>
          {value} {unit}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}