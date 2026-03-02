import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Phone,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";
import { employeeService } from "../services";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    position: "",
    department: "",
    email: "",
    status: "Active",
  });

  const departments = [
    "Engineering",
    "Product",
    "HR",
    "Sales",
    "Marketing",
    "Design",
    "Finance",
  ];

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    } else if (formData.position.length < 2) {
      newErrors.position = "Position must be at least 2 characters";
    }

    if (!formData.department) {
      newErrors.department = "Please select a department";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!["Active", "On Leave"].includes(formData.status)) {
      newErrors.status = "Please select a valid status";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const openAddModal = () => {
    setEditingEmployee(null);
    setFormData({
      name: "",
      phone: "",
      position: "",
      department: "",
      email: "",
      status: "Active",
    });
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      phone: employee.phone || "",
      position: employee.position,
      department: employee.department,
      email: employee.email,
      status: employee.status,
    });
    setErrors({});
    setShowModal(true);
  };

  const openDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!employeeToDelete) return;

    try {
      await employeeService.deleteEmployee(employeeToDelete.id);
      fetchEmployees();
      setShowDeleteModal(false);
      setEmployeeToDelete(null);
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Error deleting employee");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    try {
      if (editingEmployee) {
        await employeeService.updateEmployee(editingEmployee.id, formData);
      } else {
        await employeeService.createEmployee(formData);
      }
      fetchEmployees();
      setShowModal(false);
      setErrors({});
    } catch (error) {
      console.error("Error saving employee:", error);

      // Handle API errors
      if (error.response?.data?.detail) {
        const apiError = error.response.data.detail;

        // Check if error is about email already exists
        if (apiError.includes("Email already registered")) {
          setErrors({ ...errors, email: "This email is already registered" });
        }
        // Check if error is about phone already exists
        else if (apiError.includes("Phone number already registered")) {
          setErrors({
            ...errors,
            phone: "This phone number is already registered",
          });
        } else {
          alert(apiError);
        }
      } else {
        alert("Error saving employee");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Employees</h1>
          <p className="text-gray-600 mt-1">Manage your team members</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          Add Employee
        </button>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">{emp.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {emp.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {emp.phone || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {emp.position}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {emp.department}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {emp.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        emp.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(emp)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(emp)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Employee Modal with Inline Errors */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div
            className="absolute inset-0 bg-white/30 backdrop-blur-md"
            onClick={() => {
              setShowModal(false);
              setErrors({});
            }}
          ></div>
          <div className="relative bg-white rounded-xl shadow-xl max-w-xl w-full max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingEmployee ? "Edit Employee" : "Add New Employee"}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setErrors({});
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="1234567890"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Position Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.position ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.position && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.position}
                    </p>
                  )}
                </div>

                {/* Department Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.department ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.department}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Status Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setErrors({});
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {editingEmployee ? "Update" : "Add"} Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div
            className="absolute inset-0 bg-white/30 backdrop-blur-md"
            onClick={() => {
              setShowDeleteModal(false);
              setEmployeeToDelete(null);
            }}
          ></div>
          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-red-100 rounded-full p-3">
                  <AlertTriangle size={40} className="text-red-600" />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
                Confirm Deletion
              </h3>

              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{employeeToDelete?.name}</span>?
                <br />
                This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setEmployeeToDelete(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
