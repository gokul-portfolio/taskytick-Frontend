import { Navbar, Container, Form, FormControl, Dropdown } from 'react-bootstrap'

import useLogout from '../../hooks/useLogout'
import { FaBell, FaSearch, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext' //  IMPORTANT

import tasktick from '../../assets/images/tasktick.webp'

const Header = () => {
  const navigate = useNavigate()
  const handleLogout = useLogout()

  const { currentUser } = useUser() //  USE CONTEXT

  const notificationCount = 5

  return (
    <Navbar className='nav-header-wrap'>
      <Container fluid className='header-inner'>
        {/* LEFT */}
        <div className='header-left'>
          <Navbar.Brand className='logo-wrap'>
            <img src={tasktick} className='logo-img' alt='Logo' />
          </Navbar.Brand>
        </div>

        {/* RIGHT */}
        <div className='header-right'>
          {/* SEARCH */}
          <Form className='header-search d-none d-lg-flex'>
            <FaSearch className='search-icon' />
            <FormControl
              type='search'
              placeholder='Search tasks, projects...'
              className='search-input'
            />
          </Form>

          {/* NOTIFICATION */}
          <div className='icon-wrap notification-icon d-none d-lg-flex'>
            <FaBell />
            {notificationCount > 0 && (
              <span className='notification-badge'>{notificationCount}</span>
            )}
          </div>

          {/* PROFILE DROPDOWN */}
          <Dropdown align='end'>
            <Dropdown.Toggle
              variant='light'
              id='dropdown-user'
              className='d-flex align-items-center gap-2 profile-btn'
            >
              <FaUser />
              <span>{currentUser?.name || 'User'}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Header>
                {currentUser?.email || 'user@mail.com'}
              </Dropdown.Header>

              <Dropdown.Item onClick={() => navigate('/profile')}>
                My Profile
              </Dropdown.Item>

              <Dropdown.Item onClick={() => navigate('/settings')}>
                Settings
              </Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  )
}

export default Header
