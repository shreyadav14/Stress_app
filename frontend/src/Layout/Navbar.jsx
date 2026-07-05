import { FaMoon, FaSun, FaBrain } from "react-icons/fa";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <nav className="navbar">

      <div className="logo">

    <div className="logo-icon">
        <FaMoon className="moon"/>
    </div>

    <span>
        Somnia <strong>AI</strong>
        <span className="gradient-text"></span>
    </span>

</div>

      <ul className="nav-links">
<li>
  <a href="#profile">Profile</a>
</li>
  <li>
    <a href="#home">Home</a>
  </li>

  <li>
    <a href="#features">Features</a>
  </li>

  <li>
    <a href="#analysis">Analysis</a>
  </li>

  <li>
    <a href="#dashboard">Dashboard</a>
  </li>

 <li>
  <a href="#relax">Relax Zone</a>
</li>
</ul>

      <div className="nav-right">

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

       <button
         className="start-btn"
          onClick={() => document.getElementById("analysis").scrollIntoView({ behavior: "smooth" })}
          >
          Start Analysis
        </button>

      </div>

    </nav>
  );
};

export default Navbar;