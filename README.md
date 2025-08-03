# 🧠 SceneSolver

**SceneSolver** is an AI-powered video analysis tool that detects and summarizes potential criminal activity in visual scenes. It combines advanced models like **CLIP**, **YOLOv8**, **BLIP**, and **BART** within a full-stack **MERN + Flask** architecture.

---

## 🚀 Features

- 🔍 **Crime Classification** — Classifies crimes like robbery, shoplifting, fighting, etc. using a fine-tuned CLIP model.
- 🧾 **Evidence Detection** — Uses YOLOv8 to detect visual evidence like weapons, physical fights, or theft.
- 🧠 **Scene Understanding** — Generates captions with BLIP and summaries using BART for scene comprehension.
- 👤 **User Authentication** — Users can register, log in, and access a personalized dashboard.
- 📜 **History Tracking** — Stores all uploaded files and their results per user.
- 🌐 **Full-Stack Architecture** — Flask handles AI services, Node.js manages backend APIs, and React powers the frontend UI.

---

## 📁 Folder Structure

```
SceneSolver2/
├── scenesolver-frontend/       # React.js frontend
├── scenesolver-backend/        # Node.js + Express backend (auth, DB)
├── scenesolver-ai-service/     # Flask AI service (CLIP, YOLO, BLIP, BART)
├── .gitignore
├── README.md
```

---

## 🛠️ Local Development Setup

### 🧠 **1️⃣ AI Service (Flask)**

Set up the Flask-based AI microservice:

```bash
cd scenesolver-ai-service

# Create a virtual environment
python -m venv venv

# ▶ Activate environment:
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the Flask server
python ai_service.py
```

---

### 🧾 **2️⃣ Backend API (Node.js + MongoDB)**

Set up the Node.js backend server:

```bash
cd scenesolver-backend

# Install dependencies
npm install
```

Create a `.env` file in `scenesolver-backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend:

```bash
npm start
```

---

### 🌐 **3️⃣ Frontend (React)**

Set up the React frontend interface:

```bash
cd scenesolver-frontend

# Install dependencies
npm install
```

Create a `.env` file in `scenesolver-frontend/`:

```env
REACT_APP_API_URL=http://localhost:5000
```

Run the frontend:

```bash
npm start
```

---

## 🌍 Deployment Tips

- 🧠 The Flask AI service can be deployed via **Render**, **Railway**, or **EC2**, with `.pt` model files hosted externally (e.g., S3, Hugging Face).
- 🧾 Backend and frontend can be deployed separately via **Render** or **Vercel**.
- 🗃️ Use **MongoDB Atlas** for remote database storage.

---

## 🧪 Sample Workflow

> A user uploads a video showing suspicious activity.  
> ✅ CLIP predicts **robbery**  
> ✅ YOLO detects **gun** and **people fighting**  
> ✅ BLIP captions the scene  
> ✅ BART summarizes it as: _"a man robs a store at gunpoint"_  
> ✅ Results are saved in the user's dashboard.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss your proposal.


---

## 👋 Author

Developed by [Abhishek Singh](https://github.com/Abhishek-251)
