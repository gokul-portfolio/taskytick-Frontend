import { NavLink } from 'react-router-dom'
import {
  FaTachometerAlt,
  FaTasks,
  FaLayerGroup,
  FaCalendarAlt,
  FaProjectDiagram,
  FaUsers,
  FaBell,
  FaUserCircle,
  FaCog,
  FaClipboardList,
  FaPlusCircle,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaChartBar,
  FaExclamationTriangle,
  FaFileAlt,
  FaUserShield,
  FaComments
} from "react-icons/fa";

import useLogout from "../../hooks/useLogout"; 
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
    section: 'ANALYTICS',
    items: [{ label: 'Reports', path: '/admin/reports', icon: FaChartBar }]
  },
  // {
  //   section: 'SYSTEM',
  //   items: [
  //     { label: 'Profile', path: '/admin/profile', icon: FaUserCircle }
  //   ]
  // }
]

export const userMenu = [
  {
    section: "MAIN",
    items: [
      {
        label: "Dashboard",
        path: "/user",
        icon: FaTachometerAlt,
        end: true
      }
    ]
  },

  {
    section: "TASKS",
    items: [
      {
        label: "My Tasks",
        path: "/user/tasks",
        icon: FaTasks
      },
      {
        label: "Task Board",
        path: "/user/board",
        icon: FaLayerGroup
      },
      {
        label: "Calendar",
        path: "/user/calendar",
        icon: FaCalendarAlt
      }
    ]
  },

  {
    section: "WORKSPACE",
    items: [
      {
        label: "Projects",
        path: "/user/projects",
        icon: FaProjectDiagram
      },
      {
        label: "Team",
        path: "/user/team",
        icon: FaUsers
      }
    ]
  },

  {
    section: "COMMUNICATION",
    items: [
      {
        label: "Notifications",
        path: "/user/notifications",
        icon: FaBell
      }
    ]
  },

  {
    section: "ACCOUNT",
    items: [
      {
        label: "Profile",
        path: "/user/profile",
        icon: FaUserCircle
      },
      {
        label: "Settings",
        path: "/user/settings",
        icon: FaCog
      }
    ]
  }
];


/* ================= SIDEBAR ================= */

const Sidebar = ({ isOpen, toggleSidebar, role = 'user' }) => {
  const menuItems = role === 'admin' ? adminMenu : userMenu

  const handleLogout = useLogout(); //  reusable logout

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>

      {/* HEADER */}
      <div className='sidebar-header'>
        {isOpen && (
          <h3 className='brand-name'>
            <img src={Logo} className='me-2 sidebar-logo' alt="" />
            Tasktick
          </h3>
        )}
        <button className='collapse-btn' onClick={toggleSidebar}>
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      {/* MENU */}
      <ul className='sidebar-menu'>
        {menuItems.map((section, index) => (
          <div key={index} className='menu-section'>

            {isOpen && <p className='section-title'>{section.section}</p>}

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