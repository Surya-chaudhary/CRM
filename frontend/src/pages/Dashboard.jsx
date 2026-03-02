import { useState, useEffect } from 'react';
import { Users, UserCheck, UserX, Building2 } from 'lucide-react';
import { dashboardService } from '../services';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_employees: 0,
    present_today: 0,
    absent_today: 0,
    on_leave_today: 0,
    departments: [],
    recent_activity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Employees', value: stats.total_employees, icon: <Users size={24} />, color: 'bg-blue-500' },
    { title: 'Present Today', value: stats.present_today, icon: <UserCheck size={24} />, color: 'bg-green-500' },
    { title: 'Absent Today', value: stats.absent_today, icon: <UserX size={24} />, color: 'bg-red-500' },
    { title: 'On Leave', value: stats.on_leave_today, icon: <Building2 size={24} />, color: 'bg-yellow-500' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 flex items-center">
            <div className={`${stat.color} w-14 h-14 rounded-lg flex items-center justify-center text-white mr-4`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts/Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity - Scrollable */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="max-h-85 overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-3">
              {stats.recent_activity && stats.recent_activity.length > 0 ? (
                stats.recent_activity.map((activity, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-500 w-20">{activity.time}</span>
                    <span className="text-gray-700">{activity.desc}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent activity</p>
              )}
            </div>
          </div>
        </div>

        {/* Department Distribution - Scrollable */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Department Distribution</h3>
          <div className="max-h-80 overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-3">
              {stats.departments && stats.departments.length > 0 ? (
                stats.departments.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{dept.name}</span>
                    <span className="font-semibold text-indigo-600">{dept.count}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No departments found</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;