import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';
import  Header from './header';
import Footer from './footer';
import UserInput from "./components/UserInput";
import SleepCircle from "./components/SleepCircle";
import SleepQuality from "./components/SleepQuality";
import SleepInsights from "./components/SleepInsights";
import AISuggestions from "./components/AISuggestions";
import MoodCalendar from "./components/Moodcalendar";



function App() {
  const [result, setResult] = useState(null);
  const [inputSnapshot, setInputSnapshot] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [activeView, setActiveView] = useState("home");

  const handleAnalyzeSuccess = () => {
    setShowResults(true);
  };

  const handleCheckAgain = () => {
    setResult(null);
    setInputSnapshot(null);
    setShowResults(false);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setActiveView("home");
  };

  const handleMoodCalendarClick = (e) => {
    e.preventDefault();
    setActiveView("calendar");
  };

return (

<div className="dashboard">

<Header onHomeClick={handleHomeClick} onMoodCalendarClick={handleMoodCalendarClick} />

{activeView === "home" && !showResults && (
<UserInput
setResult={setResult}
setInputSnapshot={setInputSnapshot}
onAnalyzeSuccess={handleAnalyzeSuccess}
/>
)}

{activeView === "home" && showResults && result && inputSnapshot && (

<>
<SleepCircle metrics={inputSnapshot}/>

<SleepQuality data={result}/>

<SleepInsights metrics={inputSnapshot}/>

<AISuggestions advice={result.Advice}/>
<button type="button" onClick={handleCheckAgain}>Check Again</button>

</>

)}

{activeView === "calendar" && <MoodCalendar />}

<Footer/>

</div>

);
}
export default App;
