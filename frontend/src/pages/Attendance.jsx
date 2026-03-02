import { useState, useEffect } from "react";
import { Calendar, Plus, X, Check, AlertCircle, AlertTriangle } from "lucide-react";
import { attendanceService, employeeService } from "../services";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Added
  const [attendanceToDelete, setAttendanceToDelete] = useState(null); // Added
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [stats, setStats] = useState({
    present: 0,
    absent: 0,
    leave: 0,
    total: 0,
  });

  const [formData, setFormData] = useState({
    employee_id: "",
    date: new Date().toISOString().split("T")[0],
    check_in: "",
    check_out: "",
    status: "Present",
  });

  // Fetch data on component mount and when date changes
  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch all employees for the dropdown first
      const employeesData = await employeeService.getAllEmployees();
      setEmployees(employeesData);

      // Fetch attendance for selected date
      const attendanceData =
        await attendanceService.getAttendanceByDate(selectedDate);
      setAttendance(attendanceData);

      // Fetch attendance stats
      const statsData =
        await attendanceService.getAttendanceStats(selectedDate);
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openAddModal = () => {
    setFormData({
      employee_id: "",
      date: selectedDate,
      check_in: "",
      check_out: "",
      status: "Present",
    });
    setShowModal(true);
  };

  // Added: Open delete modal
  const openDeleteModal = (record) => {
    setAttendanceToDelete(record);
    setShowDeleteModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await attendanceService.createAttendance(formData);
      await fetchData();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert(error.response?.data?.detail || "Error saving attendance");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await attendanceService.updateAttendance(id, { status: newStatus });
      await fetchData();
    } catch (error) {
      console.error("Error updating attendance:", error);
      alert("Error updating attendance status");
    }
  };

  // Modified: Use the delete modal instead of window.confirm
  const handleDelete = async () => {
    if (!attendanceToDelete) return;
    
    try {
      await attendanceService.deleteAttendance(attendanceToDelete.id);
      await fetchData();
      setShowDeleteModal(false);
      setAttendanceToDelete(null);
    } catch (error) {
      console.error("Error deleting attendance:", error);
      alert("Error deleting attendance record");
    }
  };

  const getEmployeeDetails = (employeeId) => {
    const employee = employees.find((emp) => emp.id === employeeId);
    return employee || { name: "Unknown", department: "N/A" };
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-700";
      case "Absent":
        return "bg-red-100 text-red-700";
      case "Leave":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Present":
        return <Check size={16} className="text-green-600" />;
      case "Absent":
        return <X size={16} className="text-red-600" />;
      case "Leave":
        return <AlertCircle size={16} className="text-yellow-600" />;
      default:
        return null;
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
          <h1 className="text-3xl font-bold text-gray-800">Attendance</h1>
          <p className="text-gray-600 mt-1">Track employee attendance</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <Calendar size={20} className="text-gray-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border-none focus:outline-none text-gray-700"
            />
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} />
            Mark Attendance
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h3 className="text-sm text-gray-600 mb-2">Total Employees</h3>
          <span className="text-3xl font-bold text-indigo-600">
            {stats.total}
          </span>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h3 className="text-sm text-gray-600 mb-2">Present</h3>
          <span className="text-3xl font-bold text-green-600">
            {stats.present}
          </span>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h3 className="text-sm text-gray-600 mb-2">Absent</h3>
          <span className="text-3xl font-bold text-red-600">
            {stats.absent}
          </span>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h3 className="text-sm text-gray-600 mb-2">On Leave</h3>
          <span className="text-3xl font-bold text-yellow-600">
            {stats.leave}
          </span>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Check In
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Check Out
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
              {attendance.length > 0 ? (
                attendance.map((record) => {
                  const employee = getEmployeeDetails(record.employee_id);
                  return (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {record.id}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        {employee.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {employee.department}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {record.check_in || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {record.check_out || "-"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(record.status)}
                          <select
                            value={record.status}
                            onChange={(e) =>
                              handleStatusChange(record.id, e.target.value)
                            }
                            className={`text-xs font-medium rounded-full px-2 py-1 border-none focus:ring-2 focus:ring-indigo-500 ${getStatusBadgeClass(record.status)}`}
                          >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Leave">Leave</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {/* Modified: Use openDeleteModal instead of handleDelete */}
                        <button
                          onClick={() => openDeleteModal(record)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No attendance records found for this date
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Attendance Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div
            className="absolute inset-0 bg-white/30 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                Mark Attendance
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee
                  </label>
                  <select
                    name="employee_id"
                    value={formData.employee_id}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} - {emp.department}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check In Time
                    </label>
                    <input
                      type="time"
                      name="check_in"
                      value={formData.check_in}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check Out Time
                    </label>
                    <input
                      type="time"
                      name="check_out"
                      value={formData.check_out}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

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
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Leave">Leave</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Save Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal - Added exactly as provided */}
      {showDeleteModal && attendanceToDelete && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div
            className="absolute inset-0 bg-white/30 backdrop-blur-md"
            onClick={() => {
              setShowDeleteModal(false);
              setAttendanceToDelete(null);
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
                <span className="font-semibold">
                  {getEmployeeDetails(attendanceToDelete.employee_id).name}
                </span>
                's attendance record?<br />
                This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setAttendanceToDelete(null);
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

export default Attendance;