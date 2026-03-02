import API from "./api";

const attendanceService = {
  // Get all attendance records
  getAllAttendance: async () => {
    try {
      const response = await API.get("/attendance");
      return response.data;
    } catch (error) {
      console.error("Error fetching attendance:", error);
      throw error;
    }
  },

  // Get attendance by date
  getAttendanceByDate: async (date) => {
    try {
      const response = await API.get(`/attendance/date/${date}`);
      console.log("Attendance API response:", response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error(`Error fetching attendance for date ${date}:`, error);
      throw error;
    }
  },
  // Get attendance statistics for a date
  getAttendanceStats: async (date) => {
    try {
      const response = await API.get(`/attendance/date/${date}/stats`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching attendance stats for ${date}:`, error);
      throw error;
    }
  },

  // Get attendance for specific employee
  getEmployeeAttendance: async (employeeId, skip = 0, limit = 30) => {
    try {
      const response = await API.get(`/attendance/employee/${employeeId}`, {
        params: { skip, limit },
      });
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching attendance for employee ${employeeId}:`,
        error,
      );
      throw error;
    }
  },

  // Create attendance record
  createAttendance: async (attendanceData) => {
    try {
      const response = await API.post("/attendance", attendanceData);
      return response.data;
    } catch (error) {
      console.error("Error creating attendance:", error);
      throw error;
    }
  },

  // Update attendance record
  updateAttendance: async (id, attendanceData) => {
    try {
      const response = await API.put(`/attendance/${id}`, attendanceData);
      return response.data;
    } catch (error) {
      console.error(`Error updating attendance ${id}:`, error);
      throw error;
    }
  },

  // Delete attendance record
  deleteAttendance: async (id) => {
    try {
      const response = await API.delete(`/attendance/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting attendance ${id}:`, error);
      throw error;
    }
  },

  // Mark attendance for multiple employees (bulk)
  markBulkAttendance: async (attendanceList) => {
    try {
      // You might need a bulk endpoint - this is a workaround
      const promises = attendanceList.map((att) =>
        API.post("/attendance", att),
      );
      const responses = await Promise.all(promises);
      return responses.map((r) => r.data);
    } catch (error) {
      console.error("Error marking bulk attendance:", error);
      throw error;
    }
  },
};

export default attendanceService;
