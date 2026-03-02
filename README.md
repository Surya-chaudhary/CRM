# HRMS - Human Resource Management System

A full-stack HR management system built with **React + Vite** (frontend) and **FastAPI + PostgreSQL** (backend). Manage employees, track attendance, and view real-time dashboard analytics with a modern, responsive UI.

##  Live Demo

- **Frontend:** [https://hrms-self-chi.vercel.app/dashboard](https://hrms-self-chi.vercel.app/dashboard)
- **Backend API:** [https://hrms-8ndw.onrender.com](https://hrms-8ndw.onrender.com)
- **API Docs:** [https://hrms-8ndw.onrender.com/docs](https://hrms-8ndw.onrender.com/docs)

## 📸 Screenshots

| Dashboard | Employees | Attendance |
|-----------|-----------|------------|
| *Coming soon* | *Coming soon* | *Coming soon* |

##  Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite, Tailwind CSS, React Router, Axios, Lucide Icons |
| **Backend** | Python, FastAPI, SQLAlchemy, Pydantic |
| **Database** | PostgreSQL |
| **Deployment** | Vercel (frontend) + Render (backend) |

##  Features

###  Employee Management
- Add, edit, delete employees
- Search employees by name, ID, or department
- Phone and email validation
- Status tracking (Active/On Leave)

###  Attendance Tracking
- Mark attendance (Present/Absent/Leave)
- Edit or delete attendance records
- Filter by date or employee
- Real-time attendance statistics

###  Live Dashboard
- Total employees count
- Today's attendance breakdown
- Department-wise distribution
- Recent activity feed
- Time-based greeting with dynamic UI colors

###  UI/UX Highlights
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Dynamic theme colors based on time of day
- Custom confirmation modals
- Inline form validation
  
##  Project Structure

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

            
##  Running Locally

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
## ** Step 1: Push to GitHub **
```
git init
git add .
git commit -m "feat: initial HRMS release"
git remote add origin https://github.com/yugalsharmaandtc/HRMS.git
git branch -M main
git push -u origin main
```
## **Step 2: Set Up PostgreSQL on Render**
1. **Go to** https://render.com → **Sign up / Log in**

2. Click **"New +"** → Select **"PostgreSQL"**

3. **Configure the database:**

   - **Name:** `hrms-db`  
   - **Database:** `hrms`  
   - **User:** `hrms_user` *(auto-generated)*  
   - **Region:** Choose the closest region to you  
   - **Plan:** Free  

4. Click **"Create Database"** (wait 1–2 minutes).

5. After creation, go to the **Connections** section.

6. Copy the **Internal Database URL**.

7. It will look like this:

   ```
   postgresql://hrms_user:PASSWORD@dpg-xxxx.internal:5432/hrms
   ```
##  **Step 3: Deploy Backend on Render**
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
##  **Step 4: Deploy Frontend on Vercel**
1. Click **"New +"** → Select **"Web Service"**

2. Connect your **GitHub account** and select your **HRMS repository**

3. **Configure the service:**

   - **Name:** `hrms-api`
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Region:** Same as your database
   - **Branch:** `main`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan:** Free

4. **Add Environment Variables:**

   - **DATABASE_URL:** Paste the Internal Database URL from Step 2  
   - **FRONTEND_URL:** `https://hrms-self-chi.vercel.app` *(Update after frontend deployment)*  
   - **ENVIRONMENT:** `production`

5. Click **"Create Web Service"**

6. Wait for deployment (5–10 minutes).

7. After deployment, note your backend URL. It will look like:

   ```
   https://hrms-8ndw.onrender.com
   ```
##  **Step 5: Update CORS**
##  **Step 5: Update CORS Configuration**

1. Go back to your **Render Dashboard**.

2. Open your **`hrms-api`** service.

3. Click on the **"Environment"** tab.

4. Update the **`FRONTEND_URL`** environment variable.

5. Change its value to your deployed Vercel frontend URL.

   Example:
   ```
   https://hrms-self-chi.vercel.app
   ```

6. Click **"Save Changes"**.

7. Render will automatically redeploy the service (takes ~2 minutes).


##  API Endpoints

| Method | Endpoint | Description |
|--------|----------|------------|
| **GET** | `/api/employees/` | List all employees |
| **POST** | `/api/employees/` | Add new employee |
| **PUT** | `/api/employees/{id}` | Update employee |
| **DELETE** | `/api/employees/{id}` | Delete employee |
| **GET** | `/api/employees/stats` | Get dashboard statistics |
| **GET** | `/api/attendance/` | List all attendance records |
| **POST** | `/api/attendance/` | Mark attendance |
| **PUT** | `/api/attendance/{id}` | Edit attendance record |
| **DELETE** | `/api/attendance/{id}` | Delete attendance record |

Full interactive docs: https://hrms-8ndw.onrender.com/docs

## Environment Variables

### Frontend (.env)

```env
VITE_API_URL=https://hrms-8ndw.onrender.com
```

### Backend (.env)

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
FRONTEND_URL=https://hrms-self-chi.vercel.app
```
## Important Notes

- **No Authentication:** This is a single-admin system. No login functionality is implemented.

- **Attendance Rule:** Only one attendance record per employee per day is allowed (records can be edited).

- **Free Tier Limitation:** Render’s free tier may spin down after inactivity. The first request may take around 30 seconds (cold start).

- **Database Setup:** Database tables are automatically created on the first application startup.

## Contributing

Contributions are welcome! If you'd like to improve this project, please follow these steps:

1. **Fork** the repository

2. Create your feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. Commit your changes:
   ```bash
   git commit -m "Add AmazingFeature"
   ```

4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```

5. Open a **Pull Request**

---

## License

This project is open-source and free to use.

---

## Author

**Pinki Chaudhary**  
GitHub: https://github.com/Surya-chaudhary
