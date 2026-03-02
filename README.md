HRMS - Human Resource Management System
A full-stack HR management system built with React + Vite on the frontend and FastAPI + PostgreSQL on the backend. Manage employees, track attendance, and view real-time dashboard analytics.

🚀 Live Demo
Frontend: https://hrms-self-chi.vercel.app/dashboard

Backend API: https://hrms-8ndw.onrender.com

API Docs: https://hrms-8ndw.onrender.com/docs

🛠️ Tech Stack
Layer	Technology
Frontend	React 18, Vite, Tailwind CSS, React Router, Axios, Lucide Icons
Backend	Python, FastAPI, SQLAlchemy, Pydantic
Database	PostgreSQL
Deployment	Vercel (frontend) + Render (backend)
✨ Features
Employee Management – Add, edit, delete, and search employees

Attendance Tracking – Mark present/absent/leave with edit & delete

Live Dashboard – Real-time employee stats, attendance rate, department breakdown

Time-Based Greeting – Dynamic greeting changes with color-coded UI

Dynamic Theme Colors – Sidebar and buttons change color based on time

New Joinings Section – View recently added employees

Advanced Filtering – Filter attendance by employee or date

Data Validation – Phone and email validation on both ends

Responsive Design – Works on mobile, tablet, and desktop

Professional UI – Modern gradient design with smooth animations

📁 Project Structure
text
hrms/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── start.sh
│   ├── .env.example
│   └── app/
│       ├── api/routes/
│       │   ├── employees.py
│       │   └── attendance.py
│       ├── core/config.py
│       ├── db/database.py
│       ├── models/
│       ├── schemas/
│       └── services/
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── vercel.json
    ├── .env.example
    ├── public/
    └── src/
        ├── pages/
        ├── components/
        ├── services/api.js
        └── hooks/useGreeting.js
🏃 Running Locally
Prerequisites
Node.js 16+ and npm

Python 3.8+

PostgreSQL installed locally

Backend Setup
bash
cd hrms/backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate
# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hrms > .env

# Run server
uvicorn main:app --reload
Backend runs at: http://localhost:8000
Docs: http://localhost:8000/docs

Frontend Setup
bash
cd hrms/frontend

# Install dependencies
npm install

# Create .env file
echo VITE_API_URL=http://localhost:8000 > .env

# Run dev server
npm run dev
Frontend runs at: http://localhost:5173

🌍 Deployment Guide
1. Push to GitHub
bash
git init
git add .
git commit -m "feat: initial HRMS release"
git remote add origin https://github.com/yugalsharmaandtc/HRMS.git
git branch -M main
git push -u origin main
2. Set Up PostgreSQL on Render
Create new PostgreSQL database on Render

Copy the Internal Database URL

3. Deploy Backend on Render
Create new Web Service

Set root directory: backend

Build command: pip install -r requirements.txt

Start command: uvicorn main:app --host 0.0.0.0 --port $PORT

Add environment variable: DATABASE_URL (from step 2)

4. Deploy Frontend on Vercel
Import GitHub repository

Set root directory: frontend

Framework preset: Vite

Add environment variable: VITE_API_URL (your Render backend URL)

5. Update CORS
Add your Vercel URL to backend's FRONTEND_URL environment variable

📡 API Endpoints
Method	Endpoint	Description
GET	/api/employees/	List all employees
POST	/api/employees/	Add new employee
PUT	/api/employees/{id}	Update employee
DELETE	/api/employees/{id}	Delete employee
GET	/api/employees/stats	Get dashboard stats
GET	/api/attendance/	List attendance
POST	/api/attendance/	Mark attendance
PUT	/api/attendance/{id}	Edit attendance
DELETE	/api/attendance/{id}	Delete attendance
🔧 Environment Variables
Frontend (.env)
text
VITE_API_URL=https://hrms-8ndw.onrender.com
Backend (.env)
text
DATABASE_URL=postgresql://user:password@host/dbname
FRONTEND_URL=https://hrms-self-chi.vercel.app
⚠️ Important Notes
No Authentication – Single-admin system, no login required

Attendance Rules – One record per employee per day (editable)

Free Tier – Render may spin down after inactivity (first request may take 30s)

Database – Tables created automatically on first startup

🎯 Features in Action
Dashboard – Live clock, time-based greeting, employee stats, new joinings

Employees – Search, add, edit, delete with validation

Attendance – Mark status, view stats, filter by date/employee

🤝 Contributing
Feel free to fork, contribute, or suggest improvements!

📄 License
Open source and free to use.

👨‍💻 Author
Yugal Sharma
GitHub: @yugalsharmaandtc

Happy HR Management! 🎉

