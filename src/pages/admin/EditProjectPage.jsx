import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

/* Reusable Inputs */
import TextInput from "../../components/form/TextInput";
import TextArea from "../../components/form/TextArea";
import SelectInput from "../../components/form/SelectInput";
import CheckboxInput from "../../components/form/CheckboxInput";

/* Icons */
import {
  FiFolder,
  FiFileText,
  FiUsers,
  FiCalendar,
  FiFlag,
  FiCheckCircle,
  FiRefreshCcw,
  FiInfo,
} from "react-icons/fi";

/* Button */
import Button from "../../components/common/Button";

const EditProjectPage = () => {
  const [projectData, setProjectData] = useState({
    projectName: "",
    description: "",
    clientName: "",
    projectManager: "",
    priority: "medium",
    startDate: "",
    endDate: "",
    status: "active",
    isBillable: true,
  });

  const managers = [
    { value: "1", label: "Ravi Kumar" },
    { value: "2", label: "Arun Kumar" },
  ];

  /* =========================
     LOAD EXISTING PROJECT
     (Mock data – replace with API)
  ========================== */
  useEffect(() => {
    const existingProject = {
      projectName: "Website Revamp",
      description: "Full redesign and performance optimization",
      clientName: "ABC Pvt Ltd",
      projectManager: "1",
      priority: "high",
      startDate: "2026-01-10",
      endDate: "2026-03-15",
      status: "active",
      isBillable: true,
    };

    setProjectData(existingProject);
  }, []);

  /* HANDLE INPUT CHANGE */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* SUBMIT */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Update Project Payload:", projectData);
  };

  return (
    <section>
      <Container fluid>

        {/* HEADER */}
        <div className="mb-4">
          <h4 className="main-head">Edit Project</h4><br />
          <small className="text-muted">
            Update project details and settings
          </small>
        </div>

        <Form onSubmit={handleSubmit} className="main-parent-form">
          <Row>

            {/* LEFT SIDE */}
            <Col lg={8}>
              <TextInput
                label="Project Name"
                name="projectName"
                value={projectData.projectName}
                onChange={handleChange}
                placeholder="Enter project name"
                required
                icon={<FiFolder />}
              />

              <TextArea
                label="Project Description"
                name="description"
                value={projectData.description}
                onChange={handleChange}
                rows={6}
                placeholder="Describe project scope"
                icon={<FiFileText />}
              />

              <TextInput
                label="Client Name"
                name="clientName"
                value={projectData.clientName}
                onChange={handleChange}
                placeholder="Enter client name"
                icon={<FiUsers />}
              />
            </Col>

            {/* RIGHT SIDE */}
            <Col lg={4}>
              <SelectInput
                label="Project Manager"
                name="projectManager"
                value={projectData.projectManager}
                onChange={handleChange}
                icon={<FiUsers />}
                options={managers}
              />

              <SelectInput
                label="Priority"
                name="priority"
                value={projectData.priority}
                onChange={handleChange}
                icon={<FiFlag />}
                options={[
                  { value: "low", label: "Low" },
                  { value: "medium", label: "Medium" },
                  { value: "high", label: "High" },
                ]}
              />

              <TextInput
                label="Start Date"
                name="startDate"
                type="date"
                value={projectData.startDate}
                onChange={handleChange}
                icon={<FiCalendar />}
              />

              <TextInput
                label="End Date"
                name="endDate"
                type="date"
                value={projectData.endDate}
                onChange={handleChange}
                icon={<FiCalendar />}
              />

              <SelectInput
                label="Status"
                name="status"
                value={projectData.status}
                onChange={handleChange}
                options={[
                  { value: "active", label: "Active" },
                  { value: "on-hold", label: "On Hold" },
                  { value: "completed", label: "Completed" },
                ]}
              />

              <CheckboxInput
                label="Billable Project"
                name="isBillable"
                checked={projectData.isBillable}
                onChange={handleChange}
              />
            </Col>

          </Row>

          {/* ACTION BUTTONS */}
          <div className="d-flex justify-content-center align-items-center gap-2">
            <Button
              type="submit"
              label="Update Project"
              icon={<FiCheckCircle />}
            />

            <Button
              type="reset"
              label="Reset Changes"
              variant="secondary"
              icon={<FiRefreshCcw />}
            />
          </div>
        </Form>

        {/* NOTES */}
        <div className="highlight-notes mt-3">
          <div className="highlight-notes-box">
            <span className="highlight-icon">
              <FiInfo />
            </span>

            <h6 className="highlight-title">Important Notes</h6>

            <p className="highlight-text">
              Changing project status or dates may affect timelines and billing.
            </p>
          </div>
        </div>

      </Container>
    </section>
  );
};

export default EditProjectPage;
