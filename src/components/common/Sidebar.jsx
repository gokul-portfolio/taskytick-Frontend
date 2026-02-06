import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaTasks,
  FaClipboardList,
  FaPlusCircle,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaStickyNote,
  FaRegStickyNote,
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar, role = "user" }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* HEADER */}
      <div className="sidebar-header">
        {isOpen && <h3 className="brand-name">Tasktick</h3>}
        <button className="collapse-btn" onClick={toggleSidebar}>
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      <ul className="sidebar-menu">

        {/* ================= ADMIN ================= */}
        {role === "admin" && (
          <>
            <li className="menu-parent">
              <FaTachometerAlt className="menu-icon" />
              {isOpen && <span>Dashboard</span>}
            </li>

            <li className="menu-parent">
              <FaClipboardList className="menu-icon" />
              {isOpen && <span>All Tasks</span>}
            </li>

            <li className="menu-parent">
              <FaPlusCircle className="menu-icon" />
              {isOpen && <span>Create Task</span>}
            </li>

            <li className="menu-parent">
              <FaCalendarAlt className="menu-icon" />
              {isOpen && <span>Schedule</span>}
            </li>

            <li className="menu-parent">
              <FaCog className="menu-icon" />
              {isOpen && <span>Settings</span>}
            </li>
          </>
        )}

        {/* ================= USER ================= */}
        {role === "user" && (
          <>
            <li className="menu-parent">
              <FaTachometerAlt className="menu-icon" />
              {isOpen && <span>Dashboard</span>}
            </li>

            <li className="menu-parent">
              <FaTasks className="menu-icon" />
              {isOpen && <span>My Tasks</span>}
            </li>

            <li className="menu-parent">
              <FaCalendarAlt className="menu-icon" />
              {isOpen && <span>Calendar</span>}
            </li>

            {/* NOTES */}
            <li className="menu-parent">
              <FaStickyNote className="menu-icon" />
              {isOpen && <span>Create Note</span>}
            </li>

            <li className="menu-parent">
              <FaRegStickyNote className="menu-icon" />
              {isOpen && <span>My Notes</span>}
            </li>
          </>
        )}

        {/* ================= COMMON ================= */}
        <li className="menu-parent">
          <FaUserCircle className="menu-icon" />
          {isOpen && <span>Profile</span>}
        </li>
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
