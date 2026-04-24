import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserCard from "../../components/common/UserCard";

const ViewUserPage = () => {

  const usersByDesignation = {
    Designer: [
      {
        id: 1,
        name: "Arun Kumar",
        email: "arun@company.com",
        designation: "UI/UX Designer",
        joinedDate: "12 Jan 2025",
        status: "Active",
        statusClass: "active",
        team: "Designer",
      },
      {
        id: 2,
        name: "Priya S",
        email: "priya@company.com",
        designation: "Visual Designer",
        joinedDate: "20 Feb 2025",
        status: "Active",
        statusClass: "active",
        team: "Designer",
      },
      {
        id: 3,
        name: "Karthik R",
        email: "karthik@company.com",
        designation: "Product Designer",
        joinedDate: "05 Dec 2024",
        status: "Inactive",
        statusClass: "inactive",
        team: "Designer",
      },
    ],

    Developer: [
      {
        id: 4,
        name: "Ravi Shankar",
        email: "ravi@company.com",
        designation: "Full Stack Developer",
        joinedDate: "05 Mar 2024",
        status: "Active",
        statusClass: "active",
        team: "Developer",
      },
      {
        id: 5,
        name: "Ajith Kumar",
        email: "ajith@company.com",
        designation: "Backend Developer",
        joinedDate: "18 Jun 2024",
        status: "Active",
        statusClass: "active",
        team: "Developer",
      },
      {
        id: 6,
        name: "Suresh M",
        email: "suresh@company.com",
        designation: "Frontend Developer",
        joinedDate: "10 Nov 2024",
        status: "Inactive",
        statusClass: "inactive",
        team: "Developer",
      },
    ],

    SEO: [
      {
        id: 7,
        name: "Divya S",
        email: "divya@company.com",
        designation: "SEO Specialist",
        joinedDate: "18 Aug 2024",
        status: "Active",
        statusClass: "active",
        team: "SEO",
      },
      {
        id: 8,
        name: "Meena R",
        email: "meena@company.com",
        designation: "Content Strategist",
        joinedDate: "01 Dec 2024",
        status: "Active",
        statusClass: "active",
        team: "SEO",
      },
      {
        id: 9,
        name: "Prakash V",
        email: "prakash@company.com",
        designation: "SEO Analyst",
        joinedDate: "22 Jan 2025",
        status: "Inactive",
        statusClass: "inactive",
        team: "SEO",
      },
    ],
  };

  return (
    <section>
      <div className="inner-user">

        <Container fluid>

          {Object.entries(usersByDesignation).map(
            ([designation, users]) =>
              Array.isArray(users) && users.length > 0 && (
                <div key={designation} className="team-section">

                  <h3 className="main-head mt-5 mb-3">
                    {designation} Team
                  </h3>

                  <Row className="g-4">
                    {users.map((user) =>
                      user ? (
                        <Col key={user.id} xl={4} lg={4} md={6} sm={12}>
                          <UserCard user={user} />
                        </Col>
                      ) : null
                    )}
                  </Row>

                </div>
              )
          )}

        </Container>
      </div>

    </section>
  );
};

export default ViewUserPage;
