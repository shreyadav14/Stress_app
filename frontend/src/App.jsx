import { useState } from "react";

import Navbar from "./Layout/Navbar";
import Hero from "./components/Hero";
import PredictionForm from "./components/PredictionForm";
import AdviceCard from "./components/AdviceCard";
import { Footer } from "./Layout/Footer";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Aurora from "./components/Aurora/Aurora";
import Dashboard from "./components/Dashboard";
import AuthPage from "./components/AuthPage";
import MoodTracker from "./components/MoodTracker";
import RelaxZone from "./components/RelaxZone";
import ProfilePage from "./components/ProfilepPage";
import { useAuth } from "./components/AuthContext";

function App() {
  const [result, setResult] = useState(null);
  const { user, loading } = useAuth();

  // Still checking localStorage for a saved token — avoid flashing the
  // login page before we know if the user is already logged in.
  if (loading) {
    return null; // or a small spinner/splash screen if you'd like one
  }

  // Not logged in — show only the auth page, no navbar, no app content.
  if (!user) {
    return <AuthPage onSuccess={() => {}} />;
  }

  return (
    <>
      <Aurora />

      <Navbar />

      <Hero />

      <div className="section-divider"></div>

      <ProfilePage />

      <div className="section-divider"></div>

      <Features />

      <div className="section-divider"></div>

      <HowItWorks />

      <div className="section-divider"></div>

      <PredictionForm onResult={setResult} />

      <div className="section-divider"></div>

      <Dashboard result={result} />

      <div className="section-divider"></div>

      <MoodTracker />

      <div className="section-divider"></div>

      <RelaxZone />

     

      <Footer />
    </>
  );
}

export default App;