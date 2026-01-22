const express = require("express");
const cors = require("cors");
const http = require("http");
const fetch = require("node-fetch"); // v2
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const PORT = 3001;

app.use(cors());
app.use(express.json());

const state = {
  lockAll: false,
  hideAll: false,
  sections: [
    { id: 1, locked: false, visible: true, data: "Loading cat facts..." },
    { id: 2, locked: false, visible: true, data: "Loading cat facts..." },
    { id: 3, locked: false, visible: true, data: "Loading cat facts..." },
    { id: 4, locked: false, visible: true, data: "Loading cat facts..." }
  ]
};


async function fetchCatFact() {
  try {
    const res = await fetch("https://catfact.ninja/fact");
    const json = await res.json();
    return json.fact || "Cats are mysterious 🐱";
  } catch (err) {
    console.error("Cat API error:", err.message);
    return "Cats rule the internet 🐱";
  }
}

setInterval(async () => {
  if (state.lockAll) return;

  for (const section of state.sections) {
    if (!section.locked) {
      section.data = await fetchCatFact();
    }
  }

  io.emit("state:update", state);
}, 3000);

io.on("connection", socket => {
  console.log("Client connected:", socket.id);

  socket.emit("state:update", state);

  socket.on("command:update", payload => {
    if (payload.lockAll !== undefined) state.lockAll = payload.lockAll;
    if (payload.hideAll !== undefined) state.hideAll = payload.hideAll;

    if (payload.sections) {
      payload.sections.forEach(update => {
        const section = state.sections.find(s => s.id === update.id);
        if (!section) return;

        if (update.locked !== undefined) section.locked = update.locked;
        if (update.visible !== undefined) section.visible = update.visible;
      });
    }

    io.emit("state:update", state);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
