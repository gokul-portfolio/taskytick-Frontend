import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTasks,
  FaClipboardList,
  FaPlusCircle,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaBell,
  FaUsers,
  FaProjectDiagram,
} from "react-icons/fa";

/* ================= MENU CONFIG ================= */

const adminMenu = [
  { label: "Dashboard", path: "/admin", icon: FaTachometerAlt, end: true },
  { label: "Users", path: "/admin/users", icon: FaUsers },
  { label: "Create User", path: "/admin/users/create", icon: FaPlusCircle },
  { label: "Tasks", path: "/admin/tasks", icon: FaClipboardList },
  { label: "Create Task", path: "/admin/tasks/create", icon: FaPlusCircle },
  { label: "Projects", path: "/admin/projects", icon: FaProjectDiagram },
  { label: "Create Project", path: "/admin/projects/create", icon: FaPlusCircle },
  { label: "Profile", path: "/admin/profile", icon: FaCog },
];

const userMenu = [
  { label: "Dashboard", path: "/user", icon: FaTachometerAlt, end: true },
  { label: "My Tasks", path: "/user/tasks", icon: FaTasks },
  { label: "Notifications", path: "/user/notifications", icon: FaBell },
  { label: "Profile", path: "/user/profile", icon: FaUserCircle },
];

/* ================= SIDEBAR ================= */

const Sidebar = ({ isOpen, toggleSidebar, role = "user" }) => {
  const menuItems = role === "admin" ? adminMenu : userMenu;

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>

      {/* HEADER */}
      <div className="sidebar-header">
        {isOpen && <h3 className="brand-name">Tasktick</h3>}
        <button className="collapse-btn" onClick={toggleSidebar}>
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      {/* MENU */}
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <li key={index}>
              <NavLink
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `menu-parent ${isActive ? "active" : ""}`
                }
              >
                <Icon className="menu-icon" />
                {isOpen && <span>{item.label}</span>}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <FaSignOutAlt />
        {isOpen && <span>Logout</span>}
      </div>

    </aside>
  );
};

export default Sidebar;
