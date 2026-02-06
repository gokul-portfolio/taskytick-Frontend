import React from "react";
import { Container, Form } from "react-bootstrap";
import { FaEllipsisV, FaTools } from "react-icons/fa";
import CustomDropdownButton from "../../components/common/CustomDropdownButton";
import TaskCard from "../../components/user/TaskCard";

import { Row, Col } from "react-bootstrap";

const MyTasksPage = () => {
  return (
    <section>

      <Container fluid>

         <div className="top-bar d-flex justify-content-between align-items-center flex-wrap gap-3">

          <div className="top-bar-left">
            <h1>My Tasks</h1>
            <span>
              Manage and track your tasks
            </span>
          </div>

          <div className="top-bar-right d-flex gap-2 flex-wrap">

            <div className="filter-wrapper">
              <CustomDropdownButton
                label="Actions"
                icon={FaEllipsisV}   
                options={[
                  { label: "Clear Filters" },
                  { label: "Add Task" },
                  { label: "Export Tasks" },
                ]}
                onSelect={(item) => console.log(item.label)}
              />
            </div>

            <div className="filter-wrapper">
              <CustomDropdownButton
                label="Tools"
                icon={FaTools}       // 🛠 task tools
                options={[
                  { label: "Bulk Update" },
                  { label: "Archive Tasks" },
                  { label: "Download Report" },
                ]}
                onSelect={(item) => console.log(item.label)}
              />
            </div>

          </div>


        </div> 
        <div className="task-wrap mt-3">
          <Row className="g-3">

            <Col xs={12} sm={6} lg={6} xl={4} className="d-flex">
              <TaskCard
                title="Design Admin Dashboard"
                description="Create a clean and responsive admin dashboard UI with charts, task summaries, and quick actions for better workflow management."
                priority="high"
                status="not-started"
                role="user"
                dueDate="15 Oct 2026"
                onStatusChange={(s) => console.log("Task 1 status:", s)}
              />
            </Col>

            <Col xs={12} sm={6} lg={6}  xl={4} className="d-flex">
              <TaskCard
                title="Integrate Task API"
                description="Connect frontend task pages with backend APIs, handle loading states, error cases, and ensure smooth data flow."
                priority="medium"
                status="in-progress"
                role="user"
                dueDate="18 Oct 2026"
                onStatusChange={(s) => console.log("Task 2 status:", s)}
              />
            </Col>

            <Col xs={12} sm={6} lg={6}  xl={4} className="d-flex">
              <TaskCard
                title="Testing & Bug Fixes"
                description="Perform thorough testing across user flows, fix reported bugs, and improve overall stability before final deployment."
                priority="low"
                status="not-started"
                role="user"
                dueDate="22 Oct 2026"
                onStatusChange={(s) => console.log("Task 3 status:", s)}
              />
            </Col>

          </Row>
        </div>
      </Container>

    </section>
  );
};

export default MyTasksPage;
