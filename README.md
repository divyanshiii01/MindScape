<h1 align="center">
🧠 MindScape
</h1>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Poppins&size=26&pause=1000&color=7C3AED&center=true&vCenter=true&width=700&lines=AI-Powered+Learning+Assistant;Turn+Your+Notes+Into+a+Learning+World;Understand+%E2%80%A2+Explore+%E2%80%A2+Revise+%E2%80%A2+Recall" />
</p>

<p align="center">
Turn your notes into an interactive learning experience.
</p>
<p align="center">

<img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" />

<img src="https://img.shields.io/badge/Vite-8-purple?style=for-the-badge&logo=vite" />

<img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js" />

<img src="https://img.shields.io/badge/MongoDB-7-brightgreen?style=for-the-badge&logo=mongodb" />

<img src="https://img.shields.io/badge/Google%20Gemini-AI-4285F4?style=for-the-badge&logo=google" />

</p>

---
# 📖 Overview

**MindScape** is an AI-powered learning assistant that transforms study notes into an interactive learning world.

Students can upload a PDF, have its content analyzed with **Google Gemini**, and explore the generated learning material through summaries, concepts, challenges, and revision activities.

### 🎯 Key Highlights

- 📄 PDF note upload with a 10 MB limit
- 🤖 Gemini-powered study material analysis
- 📝 AI-generated summaries and key concepts
- 📖 Definitions and revision points
- ❓ Five challenge questions with answers
- ⏱️ 2-minute learning challenge
- 🌍 Interactive learning world
- 🗄️ Temporary study sessions with MongoDB
- ⏳ Automatic session expiration
 ---
# 🔄 How It Works

```text
📄 Upload PDF
      ↓
🔍 Extract Notes
      ↓
🤖 Gemini AI Analysis
      ↓
🌍 Enter MindScape
      ↓
🏰 Learn • ⛲ Explore • 🚗 Challenge • 🌱 Revise
```
---
# 🌍 The Learning World

MindScape organizes learning into four interactive locations:

- 🏰 **Knowledge House** — study the generated summary and revision points.
- ⛲ **Knowledge Fountain** — explore key concepts and important definitions.
- 🚗 **Challenge Garage** — answer a randomly selected question with a 2-minute thinking timer.
- 🌱 **Revision Garden** — revisit questions and use quick-recall prompts.
---
# 🏗️ Architecture

```text
|                    👨‍🎓 STUDENT
|                         │
|                         ▼
|              ┌─────────────────────┐
|              │   React + Vite      │
|              │      Frontend       │
|              └──────────┬──────────┘
|                        │
|                  REST API Requests
|                         │
|                         ▼
|              ┌─────────────────────┐
|              │   Node.js + Express │
|              │       Backend       │
|              └──────┬────────┬─────┘
|                     │        │
|          Upload PDF │        │ Store / Retrieve
|                     │        │ Session Data
|                     ▼        ▼
|             ┌───────────┐  ┌─────────────┐
|             │ PDF Text  │  │  MongoDB    │
|             │ Extraction│  │  Sessions   │
|             └─────┬─────┘  └─────────────┘
|                   │
|                   │ Extracted Study Notes
|                   ▼
|             ┌─────────────────┐
|             │   Google Gemini │
|             │       AI        │
|             └────────┬────────┘
|                      │
|              Structured Analysis
|                      │
|                      ▼
|             ┌─────────────────┐
|             │ MindScape World │
|             │                 │
|             │ 🏰 Summary      │
|             │ ⛲ Concepts     │
|             │ 🚗 Challenge    │
|             │ 🌱 Revision     │
|             └─────────────────┘
```
---
# 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Backend | Node.js + Express 5 |
| AI | Google Gemini via `@google/genai` |
| Database | MongoDB |
| PDF Processing | `pdf-parse` |
| File Uploads | Multer |
| Deployment | Render |
---
# ⚙️ Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd MindScape
```
### 2. Start the backend

```bash
cd server
npm install
node server.js
```

### 3. Start the frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

### 4. Environment Variables

**Server** `.env`

```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

**Client** `.env`

```env
VITE_API_URL=http://localhost:5000
```
---
# 🔮 Future Development

- 🌐 **3D Learning World** - evolve the current estate into an immersive 3D learning environment.
- 📝 **More Ways to Add Notes** - support additional ways for students to bring their study material into WindScape.
- 🧘‍♂️ **Mind Relaxation Space** - add a separate space with simple relaxation and calming games for moments of stress or anxiety.
- ❓ **Richer Question Practice** - introduce more question types and interactive ways to test understanding.
---
# 📊 Current Status
MindScape is currently a working full-stack application with PDF note processing, Gemini-powered analysis, MongoDB-backed study sessions, and an interactive learning world.

The project is actively being developed, with the next major goal being a more immersive 3D learning experience.
---
<div align="center">
  Learn deeply. Remember longer.

**MindScape**
</div>
