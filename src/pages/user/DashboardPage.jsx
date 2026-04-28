import React, { useEffect, useMemo } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

import {
  FiCalendar,
  FiUsers,
  FiBriefcase,
  FiCheckSquare,
  FiPlus,
} from "react-icons/fi";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import Button from "../../components/common/Button";
import TaskCard from "../../components/user/TaskCard";
import note from "../../assets/images/home/notes.png";

const DashboardPage = () => {
  const navigate = useNavigate();

  const {
    tasks,
    fetchTasks,
    currentUser,
    dataLoading,
  } = useUser();

  useEffect(() => {
    fetchTasks();
  }, []);

  //  USER TASK FILTER
  const myTasks = useMemo(() => {
    return tasks?.filter((t) => {
      const assignedId =
        typeof t.assignedTo === "object"
          ? t.assignedTo?._id
          : t.assignedTo;

      return (
        assignedId === currentUser?._id ||
        t.userId === currentUser?._id
      );
    });
  }, [tasks, currentUser]);

  //  STATS
  const stats = useMemo(() => {
    return {
      total: myTasks.length,
      inProgress: myTasks.filter(t => t.status === "in-progress").length,
      high: myTasks.filter(t => t.priority === "high").length,
      today: myTasks.filter(t =>
        t.dueDate &&
        new Date(t.dueDate).toDateString() === new Date().toDateString()
      ).length
    };
  }, [myTasks]);

  const highPriorityTasks = myTasks.filter(
    t => t.priority === "high"
  ).slice(0, 2);

  if (dataLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <section className="dashboard-section">
      <Container fluid>

        {/* HEADER */}
        <div className="dashboard-top d-flex justify-content-between align-items-center">
          <h4>Dashboard</h4>

          <Button
            label="Add Notes"
            icon={<FiPlus />}
            onClick={() => navigate("/user/tasks/create")}
          />
        </div>

        {/* WELCOME + CALENDAR */}
        <Row className="mt-4 align-items-stretch">

          {/* LEFT */}
          <Col lg={8}>
            <Card className="welcome-card p-4 d-flex flex-row justify-content-between align-items-center">

              <div>
                <h1>Hi, {currentUser?.name || "User"} 👋</h1>

                <p className="text-muted">
                  You have {stats.total} tasks today
                </p>

                <div className="welcome-actions d-flex gap-3 flex-wrap">

                  <span onClick={() => navigate("/user/tasks")} className="clickable">
                    <FiCheckSquare /> Tasks
                  </span>

                  <span onClick={() => navigate("/user/projects")} className="clickable">
                    <FiBriefcase /> Projects
                  </span>

                  <span onClick={() => navigate("/user/calendar")} className="clickable">
                    <FiCalendar /> Calendar
                  </span>

                  <span onClick={() => navigate("/user/team")} className="clickable">
                    <FiUsers /> Team
                  </span>

                </div>
              </div>

              <img src={note} alt="task" style={{ maxWidth: "160px" }} />
            </Card>
          </Col>

          {/* RIGHT */}
          <Col lg={4}>
            <Card className="side-card p-3">
              <h5>Today</h5>
              <Calendar value={new Date()} />
            </Card>
          </Col>

        </Row>

        {/* NOTES + STATS */}
        <Row className="mt-4">

          {/* NOTES */}
          <Col lg={5}>
            <Card className="important-notes-card p-3">
              <h5>Important Notes</h5>

              {myTasks.slice(0, 4).map(task => (
                <div key={task._id} className="note-item">
                  <h6>{task.title}</h6>
                  <p>{task.description}</p>
                </div>
              ))}

            </Card>
          </Col>

          {/* STATS */}
          <Col lg={7}>
            <Row>

              <Col md={6} className="mb-4">
                <Card className="stat-box">
                  <p>Total Tasks</p>
                  <h5>{stats.total}</h5>
                </Card>
              </Col>

              <Col md={6} className="mb-4">
                <Card className="stat-box">
                  <p>In Progress</p>
                  <h5>{stats.inProgress}</h5>
                </Card>
              </Col>

              <Col md={6} className="mb-4">
                <Card className="stat-box">
                  <p>High Priority</p>
                  <h5>{stats.high}</h5>
                </Card>
              </Col>

              <Col md={6} className="mb-4">
                <Card className="stat-box">
                  <p>Due Today</p>
                  <h5>{stats.today}</h5>
                </Card>
              </Col>

            </Row>
          </Col>

        </Row>

        {/* HIGH PRIORITY */}
        <div className="mt-5">
          <h5>Today – High Priority Tasks</h5>

          <Row>
            {highPriorityTasks.length > 0 ? (
              highPriorityTasks.map(task => (
                <Col md={6} key={task._id}>
                  <TaskCard
                    id={task._id}
                    title={task.title}
                    description={task.description}
                    priority={task.priority}
                    status={task.status}
                    dueDate={task.dueDate}
                    assignedTo={task.assignedTo?.name}
                    role="user"
                  />
                </Col>
              ))
            ) : (
              <p>No high priority tasks</p>
            )}
          </Row>
        </div>

      </Container>
    </section>
  );
};

export default DashboardPage;