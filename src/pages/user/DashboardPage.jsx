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

            <IconButton
              icon={<FiBell size={18} />}
              title="Notifications"
              onClick={handleNotification}
            />

            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="profile-img rounded-circle"
              width={40}
              height={40}
            />

          </div>
        </div>

        {/* ================= WELCOME + CALENDAR ================= */}
        <Row className="mt-4 align-items-stretch">

          {/* LEFT */}
          <Col lg={8} className="d-flex flex-column">
            <Card className="welcome-card p-4 d-flex flex-row justify-content-between align-items-center">

              <div>
                <h1 className="mb-2">Hi, Lorem 👋</h1>
                <p className="text-muted mb-3">
                  Manage your tasks efficiently today
                </p>

                <div className="welcome-actions d-flex flex-wrap gap-3">

                  <span onClick={() => navigate("/tasks")} className="clickable">
                    <FiCheckSquare className="me-1" />
                    Manage Tasks
                  </span>

                  <span onClick={() => navigate("/projects")} className="clickable">
                    <FiBriefcase className="me-1" />
                    Projects
                  </span>

                  <span onClick={() => navigate("/calendar")} className="clickable">
                    <FiCalendar className="me-1" />
                    Calendar
                  </span>

                  <span onClick={() => navigate("/team")} className="clickable">
                    <FiUsers className="me-1" />
                    Team
                  </span>

                </div>
              </div>

              <img
                src={note}
                alt="task"
                className="welcome-img"
                style={{ maxWidth: "180px" }}
              />

            </Card>
          </Col>

          {/* RIGHT */}
          <Col lg={4} className="d-flex">
            <Card className="side-card w-100 h-100 p-3">
              <h6 className="mb-3">Today</h6>

              <div className="calendar-wrapper">
                <Calendar
                  value={new Date()}
                  onChange={(date) => console.log(date)}
                />
              </div>
            </Card>
          </Col>

        </Row>

        {/* ================= NOTES + STATS ================= */}
        <Row className="mt-4 align-items-stretch">

          {/* NOTES */}
          <Col lg={5} className="d-flex">
            <Card className="important-notes-card p-3 w-100 h-100">

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Important Notes</h5>

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

          {/* STATS */}
          <Col lg={7} className="d-flex">
            <Card className="w-100 h-100 stat-container p-2 border-0 bg-transparent">
              <Row className="h-100">

                <Col md={6} className="mt-3 d-flex">
                  <Card className="stat-box w-100 h-100" onClick={() => navigate("/tasks")}>
                    <FiCheckSquare />
                    <p>Total Tasks</p>
                    <h5>42</h5>
                  </Card>
                </Col>

                <Col md={6} className="mt-3 d-flex">
                  <Card className="stat-box w-100 h-100" onClick={() => navigate("/tasks?status=in-progress")}>
                    <FiBriefcase />
                    <p>In Progress</p>
                    <h5>14</h5>
                  </Card>
                </Col>

                <Col md={6} className="mt-3 d-flex">
                  <Card className="stat-box w-100 h-100" onClick={() => navigate("/tasks?priority=high")}>
                    <FiCheckSquare />
                    <p>High Priority</p>
                    <h5>6</h5>
                  </Card>
                </Col>

                <Col md={6} className="mt-3 d-flex">
                  <Card className="stat-box w-100 h-100" onClick={() => navigate("/calendar")}>
                    <FiCalendar />
                    <p>Due Today</p>
                    <h5>3</h5>
                  </Card>
                </Col>

              </Row>
            </Card>
          </Col>

        </Row>

        {/* ================= HIGH PRIORITY TASKS ================= */}
        <div className="mt-5">
          <h5 className="section-title mb-3">
            🔥 Today – High Priority Tasks
          </h5>

          <Row>
            {highPriorityTasks.map((task, index) => (
              <Col md={6} key={index} className="mb-3">
                <TaskCard {...task} />
              </Col>
            ))}
          </Row>
        </div>

      </Container>
    </section>
  );
};

export default DashboardPage;
