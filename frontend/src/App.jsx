import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee";
import Attendance from "./pages/Attendance";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/attendance" element={<Attendance />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;