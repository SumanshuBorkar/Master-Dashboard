import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:3001");

function App() {
  const [state, setState] = useState(null);

  useEffect(() => {
    socket.on("state:update", setState);
    return () => socket.off("state:update");
  }, []);

  if (!state) return null;

  const isLocked = section => section.locked || state.lockAll;
  const isVisible = section => (state.hideAll ? false : section.visible);

  return (
    <div className="App">
      <h1>Project 2 - Client view</h1>
      <p className="subtitle">Random Cat Facts Every 3 Seconds!</p>

      <div className="info-banner">
        <p>This view is controlled by Project 1</p>
        <p>
          Master Status:
          {state.lockAll && <span className="badge lock">All Locked</span>}
          {state.hideAll && <span className="badge hide">All Hidden</span>}
          {!state.lockAll && !state.hideAll && (
            <span className="badge normal">✅ Normal</span>
          )}
        </p>
      </div>

      <div className="sections-container">
        {state.sections.map(section => {
          if (!isVisible(section)) return null;

          return (
            <div
              key={section.id}
              className={`section ${isLocked(section) ? "locked" : ""}`}
            >
              {isLocked(section) && (
                <div className="locked-overlay">LOCKED</div>
              )}

              <h3>Section {section.id}</h3>

              <div className="data-display">
                <div className="cat-icon">🐱</div>
                <p className="cat-fact">{section.data}</p>
              </div>

              <div className="status">
                {isLocked(section) ? "Locked" : "🔄 Updating"}
              </div>
            </div>
          );
        })}
      </div>

      {state.hideAll && (
        <div className="all-hidden-message">
          <div className="sad-cat">😿</div>
          <h2>All sections are hidden</h2>
          <p>Use Project 1 to show sections</p>
        </div>
      )}
    </div>
  );
}

export default App;
