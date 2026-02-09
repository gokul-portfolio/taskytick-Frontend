import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

// Reusable inputs
import TextInput from "../../components/form/TextInput";
import TextArea from "../../components/form/TextArea";
import SelectInput from "../../components/form/SelectInput";
import CheckboxInput from "../../components/form/CheckboxInput";
import { FiCheckCircle, FiRefreshCcw } from "react-icons/fi";


import {
  FiEdit,
  FiFileText,
  FiUsers,
  FiBriefcase,
  FiFlag,
  FiCalendar,
  FiShield,
} from "react-icons/fi";


// Button
import Button from "../../components/common/Button";

const CreateTaskPage = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    role: "",
    assignedTo: "",
    project: "",
    priority: "medium",
    dueDate: "",
    requiresApproval: true,
  });

  /* ===== Mock Data (API later) ===== */
  const teamMembers = {
    developer: [
      { id: "1", name: "John Doe" },
      { id: "2", name: "Arun Kumar" },
    ],
    designer: [{ id: "3", name: "Priya Sharma" }],
    manager: [{ id: "4", name: "Ravi Kumar" }],
  };

  const projects = [
    { value: "p1", label: "Website Revamp" },
    { value: "p2", label: "Mobile App" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin Task Payload:", taskData);
  };

  return (
    <section>
      <Container fluid>

        {/* HEADER */}
        <div className="mb-4">
          <h4 className="main-head">Create Task</h4> <br />
          <small className="text-muted">
            Admin creates and assigns tasks to team members
          </small>
        </div>

        <Form onSubmit={handleSubmit} className="main-parent-form">
          <Row>

            <Col lg={8}>

              <TextInput
                label="Task Title"
                name="title"
                value={taskData.title}
                onChange={handleChange}
                placeholder="Enter task title"
                required
                icon={<FiEdit />}
              />

              <TextArea
                label="Description"
                name="description"
                value={taskData.description}
                onChange={handleChange}
                rows={6}
                placeholder="Describe the task clearly"
                required
                icon={<FiFileText />}
              />

            </Col>

            <Col lg={4}>


              <SelectInput
                label="Designation / Role"
                name="role"
                value={taskData.role}
                onChange={(e) =>
                  setTaskData({
                    ...taskData,
                    role: e.target.value,
                    assignedTo: "",
                  })
                }
                required
                icon={<FiUsers />}
                options={[
                  { value: "developer", label: "Developer" },
                  { value: "designer", label: "Designer" },
                  { value: "manager", label: "Manager" },
                ]}
              />

              <SelectInput
                label="Assign To"
                name="assignedTo"
                value={taskData.assignedTo}
                onChange={handleChange}
                disabled={!taskData.role}
                icon={<FiUsers />}
                options={
                  taskData.role
                    ? teamMembers[taskData.role].map((u) => ({
                      value: u.id,
                      label: u.name,
                    }))
                    : []
                }
              />

              <SelectInput
                label="Project"
                name="project"
                value={taskData.project}
                onChange={handleChange}
                icon={<FiBriefcase />}
                options={projects}
              />

              <SelectInput
                label="Priority"
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                icon={<FiFlag />}
                options={[
                  { value: "low", label: "Low" },
                  { value: "medium", label: "Medium" },
                  { value: "high", label: "High" },
                ]}
              />
              <TextInput
                label="Due Date"
                name="dueDate"
                type="date"
                value={taskData.dueDate}
                onChange={handleChange}
                icon={<FiCalendar />}
              />

              <CheckboxInput
                label="Requires Admin Approval"
                name="requiresApproval"
                checked={taskData.requiresApproval}
                onChange={handleChange}
                icon={<FiShield />}
              />

            </Col>

          </Row>

          <div className="d-flex justify-content-center align-items-center gap-2">
            <Button
              type="submit"
              label="Create Task"
              icon={<FiCheckCircle />}
            />

            <Button
              type="reset"
              label="Reset Form"
              variant="secondary"
              icon={<FiRefreshCcw />}
            />
          </div>
        </Form>

      </Container>
    </section>
  );
};

export default CreateTaskPage;
