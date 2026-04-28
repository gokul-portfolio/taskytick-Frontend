import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useUser } from "../../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";

import TextInput from "../../components/form/TextInput";
import TextArea from "../../components/form/TextArea";
import SelectInput from "../../components/form/SelectInput";
import CheckboxInput from "../../components/form/CheckboxInput";

import {
  FiFolder,
  FiFileText,
  FiUsers,
  FiCalendar,
  FiFlag,
  FiCheckCircle,
  FiRefreshCcw,
} from "react-icons/fi";

import Button from "../../components/common/Button";

const EditProjectPage = () => {
  const { id } = useParams(); //  GET ID
  const navigate = useNavigate();

  const {
    updateProject,
    getProjectById,
    users,
    fetchUsers,
  } = useUser();

  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    clientName: "",
    projectManager: "",
    priority: "Medium",
    startDate: "",
    endDate: "",
    status: "Active",
    billable: true,
  });

  //  Load users + project data
  useEffect(() => {
    fetchUsers();

    const fetchProject = async () => {
      const data = await getProjectById(id);

      setProjectData({
        name: data.name || "",
        description: data.description || "",
        clientName: data.clientName || "",
        projectManager: data.projectManager?._id || "",
        priority: data.priority || "Medium",
        startDate: data.startDate?.slice(0, 10) || "",
        endDate: data.endDate?.slice(0, 10) || "",
        status: data.status || "Active",
        billable: data.billable ?? true,
      });
    };

    fetchProject();
  }, [id]);

  //  Managers filter
  const managers = users
    .filter((user) => user.role === "admin" || user.role === "manager")
    .map((user) => ({
      value: user._id,
      label: user.name,
    }));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProjectData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "priority"
          ? value.charAt(0).toUpperCase() + value.slice(1)
          : name === "status"
          ? value === "on-hold"
            ? "Inactive"
            : value.charAt(0).toUpperCase() + value.slice(1)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProject(id, projectData);

      alert(" Project Updated Successfully");

      navigate("/admin/projects"); //  redirect
    } catch (err) {
      console.error(err);
      alert("❌ Error updating project");
    }
  };

  return (
    <section>
      <Container fluid>

        <div className="mb-4">
          <h4 className="main-head">Edit Project</h4>
          <small className="text-muted">
            Update project details
          </small>
        </div>

        <Form onSubmit={handleSubmit} className="main-parent-form">
          <Row>

            <Col lg={8}>
              <TextInput
                label="Project Name"
                name="name"
                value={projectData.name}
                onChange={handleChange}
                required
                icon={<FiFolder />}
              />

              <TextArea
                label="Project Description"
                name="description"
                value={projectData.description}
                onChange={handleChange}
                rows={6}
                icon={<FiFileText />}
              />

              <TextInput
                label="Client Name"
                name="clientName"
                value={projectData.clientName}
                onChange={handleChange}
                icon={<FiUsers />}
              />
            </Col>

            <Col lg={4}>
              <SelectInput
                label="Project Manager"
                name="projectManager"
                value={projectData.projectManager}
                onChange={handleChange}
                options={managers}
              />

              <SelectInput
                label="Priority"
                name="priority"
                value={projectData.priority.toLowerCase()}
                onChange={handleChange}
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
                value={projectData.status.toLowerCase()}
                onChange={handleChange}
                options={[
                  { value: "active", label: "Active" },
                  { value: "on-hold", label: "On Hold" },
                  { value: "completed", label: "Completed" },
                ]}
              />

              <CheckboxInput
                label="Billable Project"
                name="billable"
                checked={projectData.billable}
                onChange={handleChange}
              />
            </Col>

          </Row>

          <div className="d-flex justify-content-center gap-2">
            <Button
              type="submit"
              label="Update Project"
              icon={<FiCheckCircle />}
            />

            <Button
              type="button"
              label="Cancel"
              variant="secondary"
              icon={<FiRefreshCcw />}
              onClick={() => navigate("/projects")}
            />
          </div>

        </Form>

      </Container>
    </section>
  );
};

export default EditProjectPage;