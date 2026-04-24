import React, { useState } from "react";
import { Container, Table, Badge } from "react-bootstrap";
import { FiEdit, FiEye, FiUsers } from "react-icons/fi";
import SelectInput from "../../components/form/SelectInput";
import Button from "../../components/common/Button";

const ProjectPage = () => {
    const [projects, setProjects] = useState([
        {
            id: 1,
            name: "Website Revamp",
            client: "ABC Pvt Ltd",
            manager: "Ravi Kumar",
            status: "active",
            priority: "high",
            team: [
                { name: "Arun", role: "Team Lead" },
                { name: "Priya", role: "Frontend Dev" },
                { name: "Karthik", role: "Backend Dev" },
            ],
        }
    ]);

    const handleStatusChange = (id, newStatus) => {
        setProjects((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, status: newStatus } : p
            )
        );
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return <Badge bg="success">Active</Badge>;
            case "on-hold":
                return <Badge bg="warning">On Hold</Badge>;
            case "completed":
                return <Badge bg="secondary">Completed</Badge>;
            default:
                return <Badge bg="dark">Unknown</Badge>;
        }
    };

    return (
        <section>
            <div className="inner-project">
                <Container fluid>

                    {/* HEADER */}
                    <div className="mb-4">
                        <h1 className="main-head">Projects</h1><br />
                        <small className="text-muted">
                            View projects, team members & update status
                        </small>
                    </div>

                    {/* PROJECT TABLE */}

                    <div className="project-table-wrapper">

                        <Table className="project-table align-middle">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Project</th>
                                    <th>Client</th>
                                    <th>Manager</th>
                                    <th>Team Members</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Update</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {projects.map((project, index) => (
                                    <tr key={project.id}>
                                        <td>{index + 1}</td>

                                        <td>
                                            <strong>{project.name}</strong>
                                        </td>

                                        <td>{project.client}</td>

                                        <td>{project.manager}</td>

                                        {/* TEAM MEMBERS */}
                                        <td style={{ minWidth: "220px" }}>
                                            <div className="d-flex flex-wrap gap-1">
                                                {project.team.map((member, i) => (
                                                    <Badge
                                                        key={i}
                                                        bg="light"
                                                        text="dark"
                                                        className="d-flex align-items-center gap-1"
                                                    >
                                                        <FiUsers size={12} />
                                                        {member.name}
                                                        <small className="ms-1 text-muted">
                                                            ({member.role})
                                                        </small>
                                                    </Badge>
                                                ))}
                                            </div>
                                        </td>

                                        <td className="text-capitalize">
                                            {project.priority}
                                        </td>

                                        <td>{getStatusBadge(project.status)}</td>

                                        {/* STATUS UPDATE */}
                                        <td style={{ minWidth: "150px" }}>
                                            <SelectInput
                                                value={project.status}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        project.id,
                                                        e.target.value
                                                    )
                                                }
                                                options={[
                                                    { value: "active", label: "Active" },
                                                    { value: "on-hold", label: "On Hold" },
                                                    { value: "completed", label: "Completed" },
                                                ]}
                                            />
                                        </td>

                                        {/* ACTIONS */}
                                        <td>
                                            <div className="d-flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline-primary"
                                                    icon={<FiEye />}
                                                    title="View Project"
                                                />
                                                <Button
                                                    size="sm"
                                                    variant="outline-secondary"
                                                    icon={<FiEdit />}
                                                    title="Edit Project"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </div>

                </Container>
            </div>
        </section>
    );
};

export default ProjectPage;
