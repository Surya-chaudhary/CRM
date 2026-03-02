# HRMS - Human Resource Management System

A full-stack HR management system built with **React + Vite** (frontend) and **FastAPI + PostgreSQL** (backend). Manage employees, track attendance, and view real-time dashboard analytics with a modern, responsive UI.

## 🚀 Live Demo

- **Frontend:** [https://hrms-self-chi.vercel.app/dashboard](https://hrms-self-chi.vercel.app/dashboard)
- **Backend API:** [https://hrms-8ndw.onrender.com](https://hrms-8ndw.onrender.com)
- **API Docs:** [https://hrms-8ndw.onrender.com/docs](https://hrms-8ndw.onrender.com/docs)

## 📸 Screenshots

| Dashboard | Employees | Attendance |
|-----------|-----------|------------|
| *Coming soon* | *Coming soon* | *Coming soon* |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite, Tailwind CSS, React Router, Axios, Lucide Icons |
| **Backend** | Python, FastAPI, SQLAlchemy, Pydantic |
| **Database** | PostgreSQL |
| **Deployment** | Vercel (frontend) + Render (backend) |

## ✨ Features

### 👥 Employee Management
- Add, edit, delete employees
- Search employees by name, ID, or department
- Phone and email validation
- Status tracking (Active/On Leave)

### 📅 Attendance Tracking
- Mark attendance (Present/Absent/Leave)
- Edit or delete attendance records
- Filter by date or employee
- Real-time attendance statistics

### 📊 Live Dashboard
- Total employees count
- Today's attendance breakdown
- Department-wise distribution
- Recent activity feed
- Time-based greeting with dynamic UI colors

### 🎨 UI/UX Highlights
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Dynamic theme colors based on time of day
- Custom confirmation modals
- Inline form validation
  
## 📁 Project Structure

```
hrms/
  ├── backend/
  │   ├── main.py
  │   ├── requirements.txt
  │   ├── start.sh
  │   ├── .env.example
  │   └── app/
  │       ├── api/
  │       │   └── routes/
  │       │       ├── employees.py
  │       │       └── attendance.py
  │       ├── core/
  │       │   └── config.py
  │       ├── db/
  │       │   └── database.py
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
      │   └── logo.jpg
      └── src/
          ├── App.jsx
          ├── main.jsx
          ├── pages/
          │   ├── Dashboard.jsx
          │   ├── Employee.jsx
          │   └── Attendance.jsx
          ├── components/
          │   └── Sidebar.jsx
          └── services/
              ├── index.js
              ├── api.js
              ├── employeeService.js
              ├── attendanceService.js
              └── dashboardService.js
```

            
## 🏃 Running Locally

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- PostgreSQL installed locally

### Backend Setup

```bash
cd hrms/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hrms > .env

# Run the server
uvicorn main:app --reload
```
Backend runs at: http://localhost:8000
API documentation: http://localhost:8000/docs
### Backend Setup
```
cd hrms/frontend

# Install dependencies
npm install

# Create .env file
echo VITE_API_URL=http://localhost:8000 > .env

# Run development server
npm run dev
```
Frontend runs at: http://localhost:5173

### Deployment Guide
##Step 1: Push to GitHub
```
git init
git add .
git commit -m "feat: initial HRMS release"
git remote add origin https://github.com/yugalsharmaandtc/HRMS.git
git branch -M main
git push -u origin main
```
Step 2: Set up PostgreSQL on Render
Go to render.com → Sign up/Log in

Click "New +" → "PostgreSQL"

Configure the database:

Name: hrms-db

Database: hrms

User: hrms_user (auto-generated)

Region: Choose closest to you

Plan: Free

Click "Create Database" (wait 1-2 minutes)

Copy the Internal Database URL from the Connections section

Format: postgresql://hrms_user:PASSWORD@dpg-xxxx.internal:5432/hrms

Step 3: Deploy Backend on Render
Click "New +" → "Web Service"

Connect GitHub and select your HRMS repository

Configure the service:

Name: hrms-api

Root Directory: backend

Environment: Python 3

Region: Same as your database

Branch: main

Build Command: pip install -r requirements.txt

Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT

Plan: Free

Add Environment Variables:

Key	Value
DATABASE_URL	Paste the Internal Database URL from Step 2
FRONTEND_URL	https://hrms-self-chi.vercel.app (update after frontend deploy)
ENVIRONMENT	production
Click "Create Web Service"

Wait for deployment (5-10 minutes). Note your backend URL:

text
https://hrms-8ndw.onrender.com
Step 4: Deploy Frontend on Vercel
Go to vercel.com → Sign up with GitHub

Click "Add New Project" → Select your HRMS repository

Configure the project:

Root Directory: frontend

Framework Preset: Vite

Build Command: npm run build

Output Directory: dist

Add Environment Variable:

Key	Value
VITE_API_URL	https://hrms-8ndw.onrender.com (your Render backend URL)
Click "Deploy"

Wait for deployment (2-3 minutes). Note your frontend URL:

text
https://hrms-self-chi.vercel.app
Step 5: Update CORS (Final Step)
Go back to Render Dashboard → hrms-api service

Click "Environment" tab

Update the FRONTEND_URL variable:

Change it to your Vercel frontend URL

Example: https://hrms-self-chi.vercel.app

Click "Save Changes"

Render will auto-redeploy (~2 minutes)

Configure:

Name: hrms-api

Root Directory: backend

Environment: Python 3

Build Command: pip install -r requirements.txt

Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT

Plan: Free

Add Environment Variables:

DATABASE_URL: (paste from Step 2)

FRONTEND_URL: (leave blank for now)

Click Deploy

Step 4: Deploy Frontend on Vercel
Go to vercel.com → Add New Project

Import your GitHub repo

Configure:

Root Directory: frontend

Framework Preset: Vite

Build Command: npm run build

Output Directory: dist

Add Environment Variable:

VITE_API_URL: Your Render backend URL

Click Deploy

Step 5: Update CORS
Go to Render dashboard → hrms-api → Environment

Update FRONTEND_URL with your Vercel URL

Save → Auto-redeploy

📡 API Endpoints
Method	Endpoint	Description
GET	/api/employees/	List all employees
POST	/api/employees/	Add new employee
PUT	/api/employees/{id}	Update employee
DELETE	/api/employees/{id}	Delete employee
GET	/api/employees/stats	Get dashboard statistics
GET	/api/attendance/	List all attendance records
POST	/api/attendance/	Mark attendance
PUT	/api/attendance/{id}	Edit attendance record
DELETE	/api/attendance/{id}	Delete attendance record

Full interactive docs: https://hrms-8ndw.onrender.com/docs

# Environment Variables
Frontend (.env)
text
VITE_API_URL=https://hrms-8ndw.onrender.com
Backend (.env)
text
DATABASE_URL=postgresql://user:password@host/dbname
FRONTEND_URL=https://hrms-self-chi.vercel.app
# Important Notes
No Authentication: Single-admin system, no login required

Attendance Rules: One record per employee per day (editable)

Free Tier: Render may spin down after inactivity (first request ~30s)

Database: Tables created automatically on first startup

# Contributing
Feel free to fork, contribute, or suggest improvements!

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit changes (git commit -m 'Add AmazingFeature')

Push to branch (git push origin feature/AmazingFeature)

Open a Pull Request

# License
This project is open source and free to use.

👨‍💻 Author
Pinki Chaudhary
GitHub: 
