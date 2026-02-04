import {
  FaHome,
  FaUser,
  FaTasks,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        {isOpen && <h2>TaskTick</h2>}
        <FaBars className="toggle-btn" onClick={toggleSidebar} />
      </div>

      <ul className="sidebar-menu">
        <li className="active"><FaHome />{isOpen && <span>Dashboard</span>}</li>
        <li><FaUser />{isOpen && <span>Profile</span>}</li>
        <li><FaTasks />{isOpen && <span>Tasks</span>}</li>
        <li><FaCog />{isOpen && <span>Settings</span>}</li>
      </ul>

      <div className="sidebar-footer">
        <FaSignOutAlt />
        {isOpen && <span> Logout</span>}
      </div>
    </aside>
  );
};

export default Sidebar;
