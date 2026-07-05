import "./Footer.css";
import {
  FaMoon,
  FaBrain,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

const footerLinks = {
  Product: ["Features", "AI Prediction", "Dashboard", "Wellness Hub"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Documentation", "Help Center", "Community", "FAQ"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <FaMoon />
              <FaBrain className="footer-logo-brain" />
            </div>
            <span className="footer-logo-text">
              Somnia <span>AI</span>
            </span>
          </div>

          <p>
            AI-powered insights to help you understand your mind, improve
            your sleep, and reduce stress.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://github.com/shreyadav14" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/shreya-yadav-b15347295/" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-links">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div className="footer-col" key={section}>
              <h4>{section}</h4>
              <ul>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Somnia AI. All rights reserved.</p>
        <p className="footer-credit">Built with care for better sleep 🌙</p>
      </div>
    </footer>
  );
}