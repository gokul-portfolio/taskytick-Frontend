import { useState } from "react";
import {
  Navbar,
  Container,
  Form,
  FormControl,
  Offcanvas,
} from "react-bootstrap";
import {
  FaBars,
  FaBell,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";
import { FaUser } from "react-icons/fa";


import tasktick from "../../assets/images/tasktick.webp";

const Header = () => {
  const [show, setShow] = useState(false);
  const notificationCount = 5;
  const userName = "Gokul";

  return (
    <>
      <Navbar className="nav-header-wrap">
        <Container fluid className="header-inner">
          <div className="header-left">
            <Navbar.Brand className="logo-wrap">
              {/* <img src={tasktick} className="logo-img" alt="Logo" /> */}
            </Navbar.Brand>
          </div>

          <div className="header-right">
            <Form className="header-search d-none d-lg-flex">
              <FaSearch className="search-icon" />
              <FormControl
                type="search"
                placeholder="Search tasks, projects..."
                className="search-input"
              />
            </Form>
            <div className="icon-wrap notification-icon d-none d-lg-flex">
              <FaBell />
              {notificationCount > 0 && (
                <span className="notification-badge">
                  {notificationCount}
                </span>
              )}
            </div>
            <div className="icon-wrap profile-wrap">
              <FaUser />
              <span className="profile-name">{userName}</span>
            </div>
            <div
              className="mobile-menu d-lg-none"
              onClick={() => setShow(true)}
            >
              <FaBars />
            </div>
          </div>
        </Container>
      </Navbar>

      {/* OFFCANVAS (MOBILE) */}
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="end"
        className="custom-offcanvas"
      >
        <Offcanvas.Body className="offcanvas-custom">
          <div className="offcanvas-profile">
            <img src={tasktick} alt="Profile" />
            <h6>{userName}</h6>
            <span>admin@tasktick.com</span>
          </div>
          <ul className="offcanvas-menu">
            <li className="active">Dashboard</li>
            <li>My Tasks</li>
            <li>Notifications</li>
            <li>Settings</li>
            <li className="logout">Logout</li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
