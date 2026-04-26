import { NavLink } from 'react-router-dom'
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
  FaCalendarAlt,
  FaChartBar,
  FaExclamationTriangle,
  FaFileAlt,
  FaLayerGroup,
  FaUserShield,
  FaComments
} from 'react-icons/fa'

import Logo from '../../assets/images/tasktick.webp'
/* ================= MENU CONFIG ================= */
export const adminMenu = [
  {
    section: 'MAIN',
    items: [
      { label: 'Dashboard', path: '/admin', icon: FaTachometerAlt, end: true }
    ]
  },
  {
    section: 'USER MANAGEMENT',
    items: [
      { label: 'Users', path: '/admin/users', icon: FaUsers },
      { label: 'Create User', path: '/admin/users/create', icon: FaPlusCircle },
      { label: 'Roles & Permissions', path: '/admin/user/roles-permissions', icon: FaUserShield }
    ]
  },
  {
    section: 'TASK MANAGEMENT',
    items: [
      { label: 'All Tasks', path: '/admin/tasks', icon: FaClipboardList },
      { label: 'Create Task', path: '/admin/tasks/create', icon: FaPlusCircle },
      { label: 'Task Board', path: '/admin/tasks/board', icon: FaLayerGroup }
    ]
  },
  {
    section: 'PROJECT MANAGEMENT',
    items: [
      { label: 'Projects', path: '/admin/projects', icon: FaProjectDiagram },
      { label: 'Create Project', path: '/admin/projects/create', icon: FaPlusCircle }
    ]
  },
  {
    section: 'WORKFLOW',
    items: [
      { label: 'Calendar', path: '/admin/calendar', icon: FaCalendarAlt },
      { label: 'Activity Logs', path: '/admin/activity', icon: FaFileAlt },
      { label: 'Notifications', path: '/admin/notifications', icon: FaBell }
    ]
  },
  {
    section: 'ANALYTICS',
    items: [{ label: 'Reports', path: '/admin/reports', icon: FaChartBar }]
  },
  {
    section: 'SYSTEM',
    items: [
      { label: 'Alerts', path: '/admin/alerts', icon: FaExclamationTriangle },
      { label: 'Settings', path: '/admin/settings', icon: FaCog },
      { label: 'Profile', path: '/admin/profile', icon: FaUserCircle }
    ]
  }
]

export const userMenu = [
  {
    section: 'MAIN',
    items: [
      { label: 'Dashboard', path: '/user', icon: FaTachometerAlt, end: true }
    ]
  },
  {
    section: 'TASKS',
    items: [
      { label: 'My Tasks', path: '/user/tasks', icon: FaTasks },
      { label: 'Task Board', path: '/user/tasks/board', icon: FaLayerGroup },
      { label: 'Calendar', path: '/user/calendar', icon: FaCalendarAlt }
    ]
  },
  {
    section: 'COMMUNICATION',
    items: [
      { label: 'Notifications', path: '/user/notifications', icon: FaBell },
      { label: 'Messages', path: '/user/messages', icon: FaComments }
    ]
  },
  {
    section: 'ACCOUNT',
    items: [
      { label: 'Profile', path: '/user/profile', icon: FaUserCircle },
      { label: 'Settings', path: '/user/settings', icon: FaCog }
    ]
  }
]

/* ================= SIDEBAR ================= */

const Sidebar = ({ isOpen, toggleSidebar, role = 'user' }) => {
  const menuItems = role === 'admin' ? adminMenu : userMenu

  const handleLogout = () => {
    // clear token / session
    localStorage.removeItem('token')
    window.location.href = 'login'
  }

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      
      {/* HEADER */}
      <div className='sidebar-header'>
        {isOpen && <h3 className='brand-name'> 
          <img src={Logo} className='me-2 sidebar-logo' alt="" />
           Tasktick</h3>}
        <button className='collapse-btn' onClick={toggleSidebar}>
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      {/* MENU */}
      <ul className='sidebar-menu'>
        {menuItems.map((section, index) => (
          <div key={index} className='menu-section'>

            {/* SECTION TITLE */}
            {isOpen && (
              <p className='section-title'>{section.section}</p>
            )}

            {/* ITEMS */}
            {section.items.map((item, i) => {
              const Icon = item.icon

              return (
                <li key={i}>
                  <NavLink
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      `menu-item ${isActive ? 'active' : ''}`
                    }
                  >
                    <Icon className='menu-icon' />
                    {isOpen && <span>{item.label}</span>}
                  </NavLink>
                </li>
              )
            })}
          </div>
        ))}
      </ul>

      {/* FOOTER */}
      <div className='sidebar-footer' onClick={handleLogout}>
        <FaSignOutAlt />
        {isOpen && <span>Logout</span>}
      </div>
    </aside>
  )
}

export default Sidebar