import API from './api';

const employeeService = {
  // Get all employees
  getAllEmployees: async () => {
    try {
      const response = await API.get('/employees');
      return response.data;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  },

  // Get single employee by ID
  getEmployeeById: async (id) => {
    try {
      const response = await API.get(`/employees/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching employee ${id}:`, error);
      throw error;
    }
  },

  // Create new employee
  createEmployee: async (employeeData) => {
    try {
      const response = await API.post('/employees', employeeData);
      return response.data;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  },

  // Update employee
  updateEmployee: async (id, employeeData) => {
    try {
      const response = await API.put(`/employees/${id}`, employeeData);
      return response.data;
    } catch (error) {
      console.error(`Error updating employee ${id}:`, error);
      throw error;
    }
  },

  // Delete employee
  deleteEmployee: async (id) => {
    try {
      const response = await API.delete(`/employees/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting employee ${id}:`, error);
      throw error;
    }
  },

  // Get employees by department
  getEmployeesByDepartment: async (department) => {
    try {
      const response = await API.get('/employees', {
        params: { department }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching employees from ${department}:`, error);
      throw error;
    }
  }
};

export default employeeService;