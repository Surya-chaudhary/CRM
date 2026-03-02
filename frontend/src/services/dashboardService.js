import API from './api';

const dashboardService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await API.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  // Get recent activity
  getRecentActivity: async () => {
    try {
      const response = await API.get('/dashboard/stats');
      return response.data.recent_activity || [];
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      throw error;
    }
  },

  // Get department distribution
  getDepartmentDistribution: async () => {
    try {
      const response = await API.get('/dashboard/stats');
      return response.data.departments || [];
    } catch (error) {
      console.error('Error fetching department distribution:', error);
      throw error;
    }
  },

  // Get today's attendance summary
  getTodayAttendanceSummary: async () => {
    try {
      const response = await API.get('/dashboard/stats');
      return {
        total: response.data.total_employees,
        present: response.data.present_today,
        absent: response.data.absent_today,
        leave: response.data.on_leave_today
      };
    } catch (error) {
      console.error('Error fetching attendance summary:', error);
      throw error;
    }
  }
};

export default dashboardService;