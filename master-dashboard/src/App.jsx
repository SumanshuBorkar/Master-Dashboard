import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("https://master-dashboard-wzaq.onrender.com");

function App() {
  const [state, setState] = useState(null);

  useEffect(() => {
    socket.on("state:update", setState);
    return () => socket.off("state:update");
  }, []);

  if (!state) return null;

  const update = payload => socket.emit("command:update", payload);

  return (
    <div className="App">
      <h1>Project 1 - Master control dashboard</h1>
      <p className="subtitle">Random Cat Facts Every 3 Seconds!</p>

      <div className="master-controls">
        <h2>Master Controls</h2>

        <button
          onClick={() => update({ lockAll: !state.lockAll })}
          className={state.lockAll ? "active" : ""}
        >
          {state.lockAll ? "Unlock All" : "Lock All"}
        </button>

        <button
          onClick={() => update({ hideAll: !state.hideAll })}
          className={state.hideAll ? "active" : ""}
        >
          {state.hideAll ? "Show All" : "Hide All"}
        </button>
      </div>

      <div className="sections-container">
        {state.sections.map(section => (
          <div key={section.id} className="section">
            <h3>Section {section.id}</h3>

            <div className="data-display">
              <div className="cat-icon">🐱</div>
              <p className="cat-fact">{section.data}</p>
            </div>

            <div className="section-controls">
              <button
                onClick={() =>
                  update({
                    sections: [{ id: section.id, locked: !section.locked }]
                  })
                }
                className={section.locked ? "active" : ""}
              >
                {section.locked ? "Unlock" : "Lock"}
              </button>

              <button
                onClick={() =>
                  update({
                    sections: [{ id: section.id, visible: !section.visible }]
                  })
                }
                className={!section.visible ? "active" : ""}
              >
                {section.visible ? "Hide" : "Show"}
              </button>
            </div>

            <div className="status">
              Status: {section.locked ? "🔒 Locked" : "🔄 Updating"} |
              {section.visible ? " Visible" : " Hidden"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
