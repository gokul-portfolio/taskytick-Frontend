import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// ICONS (single import – IMPORTANT)
import {
  FiBell,
  FiCalendar,
  FiUsers,
  FiBriefcase,
  FiCheckSquare,
  FiPlus,
} from "react-icons/fi";



// CALENDAR
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// COMPONENTS
import Button from "../../components/common/Button";
import IconButton from "../../components/common/IconButton";
import TaskCard from "../../components/user/TaskCard";

// ASSETS
import note from "../../assets/images/home/notes.png";

const DashboardPage = () => {
  const navigate = useNavigate();

  // 🔔 Notification click handler
  const handleNotification = () => {
    console.log("Notification clicked");
    // navigate("/notifications"); // optional
  };

  // High priority tasks data
  const highPriorityTasks = [
    {
      title: "Fix login issue",
      description: "OTP validation not working for some users",
      priority: "high",
      dueDate: "Today",
      tags: ["bug", "auth"],
    },
    {
      title: "Client dashboard UI",
      description: "Finish dashboard layout before EOD",
      priority: "high",
      dueDate: "Today",
      tags: ["ui", "urgent"],
    },
  ];

  return (
    <section className="dashboard-section">
      <Container fluid>

        {/* ================= HEADER ================= */}
        <div className="dashboard-top d-flex justify-content-between align-items-center">

          <h4 className="mb-0 fw-semibold">Dashboard</h4>

          <div className="d-flex align-items-center gap-3">

            <Button
              label="Add Task"
              icon={<FiPlus />}
              onClick={() => navigate("/tasks/create")}
            />

          </div>
        </div>

        
        <div className="dashboard-content-wrap">


          <Row className="mt-4 align-items-stretch">

            <Col lg={8} className="d-flex">
              <Card className="welcome-card p-3 d-flex flex-row justify-content-between align-items-center w-100 h-100">

                <div>
                  <h1 className="mb-2">Welcome, Admin 👋</h1>
                  <p className="text-muted mb-3">
                    Monitor system activity and manage platform operations
                  </p>

                  <div className="welcome-actions d-flex flex-wrap gap-3">

                    <span onClick={() => navigate("/admin/users")} className="clickable">
                      <FiUsers className="me-1" />
                      Manage Users
                    </span>

                    <span onClick={() => navigate("/admin/tasks")} className="clickable">
                      <FiCheckSquare className="me-1" />
                      All Tasks
                    </span>

                    <span onClick={() => navigate("/admin/projects")} className="clickable">
                      <FiBriefcase className="me-1" />
                      Projects
                    </span>

                    <span onClick={() => navigate("/admin/alerts")} className="clickable">
                      <FiBell className="me-1" />
                      System Alerts
                    </span>

                  </div>
                </div>

                <img
                  src={note}
                  alt="admin dashboard"
                  className="welcome-img"
                  style={{ maxWidth: "180px" }}
                />

              </Card>
            </Col>

            <Col lg={4} className="d-flex">
              <Card className="side-card w-100 h-100 p-3">
                <h1 className="main-head mb-3">Today</h1>

                <div className="calendar-wrapper">
                  <Calendar
                    value={new Date()}
                    onChange={(date) => console.log(date)}
                  />
                </div>
              </Card>
            </Col>

          </Row>


        </div> 


        
        <div className="dashboard-content-wrap">

          <Row className="mt-4 align-items-stretch">

            <Col lg={4} className="d-flex order-2 order-lg-1">
              <Card className="important-notes-card p-3 w-100 h-100">

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h1 className="main-head mb-3">Important Notes</h1>

                  <span
                    className="view-all-btn"
                    onClick={() => navigate("/notes")}
                  >
                    View All
                  </span>
                </div>

                <div className="notes-list flex-grow-1">

                  <div className="note-item">
                    <div className="note-dot high"></div>
                    <div className="note-content">
                      <h6>Client meeting at 4 PM</h6>
                      <p>Discuss dashboard improvements</p>
                      <span className="note-time">2 min ago</span>
                    </div>
                  </div>

                  <div className="note-item">
                    <div className="note-dot medium"></div>
                    <div className="note-content">
                      <h6>Update login API</h6>
                      <p>Fix token expiration issue</p>
                      <span className="note-time">10 min ago</span>
                    </div>
                  </div>
                  <div className="note-item">
                    <div className="note-dot medium"></div>
                    <div className="note-content">
                      <h6>Update login API</h6>
                      <p>Fix token expiration issue</p>
                      <span className="note-time">10 min ago</span>
                    </div>
                  </div>
                  <div className="note-item">
                    <div className="note-dot medium"></div>
                    <div className="note-content">
                      <h6>Update login API</h6>
                      <p>Fix token expiration issue</p>
                      <span className="note-time">10 min ago</span>
                    </div>
                  </div>

                  <div className="note-item">
                    <div className="note-dot low"></div>
                    <div className="note-content">
                      <h6>Design dashboard UI</h6>
                      <p>Create modern SaaS layout</p>
                      <span className="note-time">30 min ago</span>
                    </div>
                  </div>

                </div>
              </Card>
            </Col>

            <Col lg={8} className="d-flex order-1 order-lg-2 ">
              <Card className="w-100 h-100 stat-container p-2 border-0 bg-transparent">
                <Row className="h-100">

                  <Col md={4} sm={6} xs={6} className="mt-3 d-flex">
                    <Card
                      className="stat-box w-100 h-100"
                      onClick={() => navigate("/admin/users")}
                    >
                      <FiUsers />
                      <p>Total Users</p>
                      <h5>1,284</h5>
                    </Card>
                  </Col>

                  <Col md={4}  sm={6} xs={6} className="mt-3 d-flex">
                    <Card
                      className="stat-box w-100 h-100"
                      onClick={() => navigate("/admin/tasks")}
                    >
                      <FiCheckSquare />
                      <p>Total Tasks</p>
                      <h5>326</h5>
                    </Card>
                  </Col>

                  <Col md={4}  sm={6} xs={6} className="mt-3 d-flex">
                    <Card
                      className="stat-box w-100 h-100"
                      onClick={() => navigate("/admin/tasks?status=pending")}
                    >
                      <FiCheckSquare />
                      <p>Tasks Waiting Approval</p>
                      <h5>18</h5>
                    </Card>
                  </Col>

                  <Col md={4}  sm={6} xs={6} className="mt-3 d-flex">
                    <Card
                      className="stat-box w-100 h-100"
                      onClick={() => navigate("/admin/alerts")}
                    >
                      <FiBell />
                      <p>System Alerts</p>
                      <h5>5</h5>
                    </Card>
                  </Col>

                  <Col md={4}  sm={6} xs={6}  className="mt-3 d-flex">
                    <Card
                      className="stat-box w-100 h-100"
                      onClick={() => navigate("/admin/projects")}
                    >
                      <FiBriefcase />
                      <p>Total Projects</p>
                      <h5>48</h5>
                    </Card>
                  </Col>

                  <Col md={4}  sm={6} xs={6}  className="mt-3 d-flex">
                    <Card
                      className="stat-box w-100 h-100"
                      onClick={() => navigate("/admin/projects?status=pending")}
                    >
                      <FiBriefcase />
                      <p>Projects Waiting Approval</p>
                      <h5>6</h5>
                    </Card>
                  </Col>

                </Row>



              </Card>
            </Col>

          </Row>
        </div> 

        <div className="dashboard-content-wrap">
          <h1 className="mt-4 mb-2 main-head">Task Metrics</h1>

          <Row className="h-100 justify-content-center">

            <Col lg={3} md={4} sm={6} xs={6} className="mt-3 d-flex">
              <Card className="stat-box w-100 h-100">
                <FiCheckSquare />
                <p>Total Tasks</p>
                <h5>326</h5>
              </Card>
            </Col>

            <Col lg={3} md={4} sm={6} xs={6} className="mt-3 d-flex">
              <Card className="stat-box w-100 h-100">
                <FiCheckSquare />
                <p>Completed</p>
                <h5>68%</h5>
              </Card>
            </Col>

            <Col lg={3} md={4} sm={6} xs={6} className="mt-3 d-flex">
              <Card className="stat-box w-100 h-100">
                <FiBell />
                <p>Overdue Tasks</p>
                <h5>24</h5>
              </Card>
            </Col>

            <Col lg={3} md={4} sm={6} xs={6} className="mt-3 d-flex">
              <Card className="stat-box w-100 h-100">
                <FiBell />
                <p>High Priority</p>
                <h5>18</h5>
              </Card>
            </Col>

          </Row>

        </div> 



         <div className="dashboard-content-wrap">

          <h5 className=" mb-2 main-head">Project Metrics</h5>

          <Row className="h-100">

            <Col md={4} sm={6}  className="mt-3 d-flex">
              <Card className="stat-box w-100 h-100">
                <FiBriefcase />
                <p>Active Projects</p>
                <h5>22</h5>
              </Card>
            </Col>

            <Col md={4} sm={6}  className="mt-3 d-flex">
              <Card className="stat-box w-100 h-100">
                <FiBell />
                <p>Projects at Risk</p>
                <h5>5</h5>
              </Card>
            </Col>

            <Col md={4} sm={6}  className="mt-3 d-flex">
              <Card className="stat-box w-100 h-100">
                <FiBriefcase />
                <p>Projects Completed</p>
                <h5>41</h5>
              </Card>
            </Col>

          </Row>

        </div> 


         <div className="dashboard-content-wrap">
          <h1 className="main-head mb-3">
            High Priority – Requires Admin Action
          </h1>

          <Row>
            {highPriorityTasks.length > 0 ? (
              highPriorityTasks.map((task, index) => (
                <Col md={6} key={index} className="mb-3">
                  <TaskCard
                    {...task}
                    adminView
                    showApprovalActions
                  />
                </Col>
              ))
            ) : (
              <Col>
                <p className="text-muted">
                  No high-priority tasks require admin action today.
                </p>
              </Col>
            )}
          </Row>
        </div> 





      </Container>
    </section >
  );
};

export default DashboardPage;
