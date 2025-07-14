# 🧠 SceneSolver

SceneSolver is an AI-powered video analysis tool designed to detect and summarize potential criminal activity from visual scenes. It uses cutting-edge models like CLIP, YOLO, BLIP2, and BART, all integrated within a full-stack MERN application.

---

## 📦 Features

- 🔍 **Crime Classification** — Detects crime types like robbery, shoplifting, fighting, etc. using a fine-tuned CLIP classifier.
- 🧾 **Evidence Detection** — Identifies relevant objects or activities (e.g., weapons, fights) using YOLOv8.
- 🧠 **Scene Understanding** — Captions and summarizes frames using BLIP2 (Salesforce) and BART.
- 👤 **User Authentication** — Users can register, log in, and manage their analysis history.
- 📜 **History Tracking** — All uploaded files and results are saved per user.
- 🌐 **MERN + Flask Architecture** — Scalable and modular backend/frontend system.

---

## 📁 Folder Structure

SceneSolver2/
├── scenesolver-frontend/ # React.js frontend
├── scenesolver-backend/ # Node.js + Express API (auth, DB)
├── scenesolver-ai-service/ # Flask-based AI service (CLIP, YOLO, BLIP, etc.)
├── .gitignore
├── README.md


---

## 🛠️ Local Development Setup

### 🔧 Backend 1: AI Service (Flask)

```bash
cd scenesolver-ai-service
python -m venv venv
# Activate environment:
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

pip install -r requirements.txt
python ai_service.py

Backend : Node.js API
cd scenesolver-backend
npm install

Create a .env file:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000

Then start the backend:
npm start

Frontend (React):
cd scenesolver-frontend
npm install

Create a .env file:
REACT_APP_API_URL=http://localhost:5000

Start the frontend:
npm start


