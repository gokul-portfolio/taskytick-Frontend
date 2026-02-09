import React, { useState } from "react";
import { Container, Table, Badge } from "react-bootstrap";
import IconButton from "../../components/common/IconButton";

const UserPage = () => {
  const [users] = useState([
    {
      id: 1,
      name: "Arun Kumar",
      email: "arun@mail.com",
      role: "Team Lead",
      department: "Technology",
      status: "active",
    }
  ]);

  const getStatusBadge = (status) =>
    status === "active" ? (
      <Badge bg="success">Active</Badge>
    ) : (
      <Badge bg="secondary">Inactive</Badge>
    );

  return (
    <section>
      <div className="inner-view-user">
        <Container fluid>

          {/* USER TABLE */}
          <div className="project-table-wrapper">
            <Table className="project-table align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>

                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span className="user-avatar">
                          <i className="bi bi-person-fill" />
                        </span>
                        <strong>{user.name}</strong>
                      </div>
                    </td>

                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.department}</td>
                    <td>{getStatusBadge(user.status)}</td>

                    {/* ACTIONS */}
                    <td>
                      <div className="d-flex gap-2">
                        <IconButton
                          icon={<i className="bi bi-eye" />}
                          variant="primary"
                          size="sm"
                          title="View User"
                          onClick={() => console.log("View user", user.id)}
                        />

                        <IconButton
                          icon={<i className="bi bi-eye" />}
                          variant="primary"
                          size="sm"
                          title="View User"
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

export default UserPage;
