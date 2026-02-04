import { Navbar, Container } from "react-bootstrap";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
  return (
    <Navbar bg="white" className="shadow-sm px-3">
      <Container fluid>
        <FaBars
          className="me-3"
          style={{ cursor: "pointer" }}
          onClick={toggleSidebar}
        />

        <Navbar.Brand className="fw-bold">
          TaskTick
        </Navbar.Brand>

        <div className="ms-auto d-flex gap-3">
          <FaBell size={20} />
          <FaUserCircle size={24} />
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
