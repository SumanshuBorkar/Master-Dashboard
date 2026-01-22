
# Cross-Site Real-Time Dashboard (Socket.IO)

A connected multi-project system where one dashboard **controls** another in real time, while both display **independently updating cat facts** every 3 seconds.

Built using **React + Express + Socket.IO**, with the server acting as the **single source of truth**.

Thee are the links to the deployed projects:-
Master Dashboard:- <a href="https://master-dashboard-tfzg.vercel.app/">https://master-dashboard-tfzg.vercel.app/</a>
Client Dashboard:- <a href="https://master-dashboard-three.vercel.app/">https://master-dashboard-three.vercel.app/</a>

---

## Repository Structure

```

cross-site-dashboard/
├── dashboard-backend/   # Express + Socket.IO server
├── project-1/           # Control Panel (Master Dashboard)
├── project-2/           # Display View (Read-only Dashboard)

````

---

### Sequence Diagram :  Voice Interaction

<p align="center">
  <img src="https://uml.planttext.com/plantuml/svg/ZL9DJuD04BsJy1zUUgA7jW5l74nDhQOdDwvwyhA1CLrTTWbCDVNNEo2s3KqJkMnuy_Pz32nRDWtlAXT7RDaH7icu6TkAi3ACErCmzDuNsoPu-stO1ez4X-A3UBvvcCPH7DKYO0jR6y-Og2Qyazn9Ntso2fwRuA2C9pUTmBHGwOX_a8AcvfEQdgL7f4EI6xNf2N9UyCt4zzQsjJDxl5Zw6copBgXACRk6pb44xuMSI7oLdMDnf3jGfJbaEqpvhYxb-8EpCHn7BeGQQuc_nnLQ4gsoZIF8qr-Hk3dkrqzOl4cBtu5Wc0tMKkyuq4EWvrwzK-kMFfSNSq8u3tSSdGKaNuxwLvNnvJ17ukGZO86jBMawj3m9m2VT_x-IfPZslzKF" alt="Logo" width="100%"/>
</p

## How It Works

- The **server**:
  - Fetches cat facts from a public API
  - Maintains global dashboard state (lock, hide, data)
  - Broadcasts updates via Socket.IO

- **Project 1 (Control Panel)**:
  - Locks/unlocks sections
  - Hides/shows sections
  - Receives real-time updates

- **Project 2 (Display View)**:
  - Read-only mirror of server state
  - Updates instantly via WebSockets

✔ No polling  
✔ Optimized API usage  
✔ Each section has its **own cat fact**  

---

## ⚙️ Prerequisites

- Node.js (v14+)
- npm

---

##  How to Run the Project

### 1️⃣ Start the Backend
```bash
cd dashboard-backend
npm install
node server.js
````

Server runs on: **[http://localhost:3001](http://localhost:3001)**

---

### 2️⃣ Start Project 1 (Control Panel)

```bash
cd project-1
npm install
npm run dev
```

---

### 3️⃣ Start Project 2 (Display View)

```bash
cd project-2
npm install
npm run dev
```

---

## 🔗 Tech Stack

* React (Vite)
* Express.js
* Socket.IO
* node-fetch
* Public Cat Facts API

---

##  Notes

* The server is the **single source of truth**
* UI structure is preserved to support existing CSS
* State updates are pushed in real time using WebSockets

---

##  Future Improvements

* Redis-backed Socket.IO scaling
* Docker Compose setup
* Authentication & role-based control
* Analytics / monitoring dashboard

```
