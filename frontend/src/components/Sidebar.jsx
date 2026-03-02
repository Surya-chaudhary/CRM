import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/employee', name: 'Employee', icon: <Users size={20} /> },
    { path: '/attendance', name: 'Attendance', icon: <CalendarCheck size={20} /> },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-indigo-700">
        <h2 className="text-2xl font-bold">HR Admin</h2>
        <p className="text-sm text-indigo-200 mt-1">Management System</p>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all
              ${isActive 
                ? 'bg-indigo-700 text-white shadow-lg' 
                : 'text-indigo-100 hover:bg-indigo-700/50'
              }
            `}
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-full p-4 border-t border-indigo-700">
        <div className="flex items-center gap-3 px-4 py-3 text-indigo-100 hover:bg-red-600/20 rounded-lg cursor-pointer transition-colors">
          {/* <LogOut size={20} />
          <span className="font-medium">Logout</span> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;