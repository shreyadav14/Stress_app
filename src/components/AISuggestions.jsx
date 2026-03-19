import React from "react";

function AISuggestions({ advice }) {
  const adviceItems = Array.isArray(advice) ? advice : [];

  return (
    <div className="card">
      <h2>AI Suggestions</h2>

      {adviceItems.length > 0 ? (
        <ul>
          {adviceItems.map((item, index) => (
            <li key={`${item}-${index}`}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No suggestions returned by the API.</p>
      )}
    </div>
  );
}

export default AISuggestions;
