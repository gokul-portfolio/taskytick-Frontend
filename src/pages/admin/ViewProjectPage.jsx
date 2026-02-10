import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "../../components/common/ProjectCard";

const ViewProjectPage = () => {

 const projectsByTeam = {
  Designer: [
    {
      id: 1,
      title: "Website UI Redesign",
      description: "Landing page, dashboard & mobile UI",
      startDate: "01 Feb 2026",
      deadline: "20 Feb 2026",
      status: "In Progress",
      statusClass: "in-progress",
      team: "Designer",
      members: ["Arun", "Priya", "Karthik"],
    },
    {
      id: 2,
      title: "Mobile App UI",
      description: "iOS & Android app UI/UX design",
      startDate: "05 Feb 2026",
      deadline: "25 Feb 2026",
      status: "Pending",
      statusClass: "pending",
      team: "Designer",
      members: ["Priya", "Naveen"],
    },
    {
      id: 3,
      title: "Brand Design System",
      description: "Color, typography & component system",
      startDate: "10 Jan 2026",
      deadline: "05 Feb 2026",
      status: "Completed",
      statusClass: "completed",
      team: "Designer",
      members: ["Arun", "Karthik"],
    },
  ],

  Developer: [
    {
      id: 4,
      title: "E-commerce Backend",
      description: "API, auth & payment integration",
      startDate: "15 Jan 2026",
      deadline: "10 Feb 2026",
      status: "Completed",
      statusClass: "completed",
      team: "Developer",
      members: ["Ravi", "Suresh", "Ajith"],
    },
    {
      id: 5,
      title: "Admin Dashboard",
      description: "Role-based dashboard & reports",
      startDate: "01 Feb 2026",
      deadline: "28 Feb 2026",
      status: "In Progress",
      statusClass: "in-progress",
      team: "Developer",
      members: ["Ajith", "Suresh"],
    },
    {
      id: 6,
      title: "API Optimization",
      description: "Performance & security improvements",
      startDate: "12 Feb 2026",
      deadline: "05 Mar 2026",
      status: "Pending",
      statusClass: "pending",
      team: "Developer",
      members: ["Ravi"],
    },
  ],

  SEO: [
    {
      id: 7,
      title: "SEO Optimization",
      description: "On-page SEO & keyword tracking",
      startDate: "05 Feb 2026",
      deadline: "28 Feb 2026",
      status: "Pending",
      statusClass: "pending",
      team: "SEO",
      members: ["Divya", "Meena"],
    },
    {
      id: 8,
      title: "Content Strategy",
      description: "Blog planning & content calendar",
      startDate: "01 Feb 2026",
      deadline: "20 Feb 2026",
      status: "In Progress",
      statusClass: "in-progress",
      team: "SEO",
      members: ["Meena"],
    },
    {
      id: 9,
      title: "Google Analytics Setup",
      description: "GA4 & Search Console integration",
      startDate: "20 Jan 2026",
      deadline: "05 Feb 2026",
      status: "Completed",
      statusClass: "completed",
      team: "SEO",
      members: ["Divya"],
    },
  ],
};


  return (
    <section className="view-project-page">
      <Container fluid>

        {Object.entries(projectsByTeam).map(([team, projects]) => (
          <div key={team} className="team-section">

            <h3 className="main-head mt-5 mb-3">{team} Team</h3>

            <Row className="g-4">
              {projects.map((project) => (
                <Col key={project.id} xl={4} lg={4} md={6} sm={12}>
                  <ProjectCard project={project} />
                </Col>
              ))}
            </Row>

          </div>
        ))}

      </Container>
    </section>
  );
};

export default ViewProjectPage;
