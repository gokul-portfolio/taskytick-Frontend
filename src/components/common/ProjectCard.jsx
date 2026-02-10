import React from "react";
import {
  FiFolder,
  FiFileText,
  FiPlayCircle,
  FiClock,
  FiUsers,
  FiTag
} from "react-icons/fi";

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">

      {/* HEADER */}
      <div className="project-card-header">
        <h4>
          <FiFolder className="icon title-icon" />
          {project.title}
        </h4>

        <span className={`project-status ${project.statusClass}`}>
          {project.status}
        </span>
      </div>

      {/* BODY */}
      <p className="project-desc">
        <FiFileText className="icon" />
        {project.description}
      </p>

      {/* INFO */}
      <div className="project-info">
        <div>
          <span className="label">
            <FiPlayCircle className="icon" />
            Start Date
          </span>
          <span className="value">{project.startDate}</span>
        </div>

        <div>
          <span className="label">
            <FiClock className="icon" />
            Deadline
          </span>
          <span className="value">{project.deadline}</span>
        </div>
      </div>

      {/* FOOTER */}
      <div className="project-footer">
        <div className="team-members">
          <span className="label">
            <FiUsers className="icon" />
            Working Team
          </span>

          <div className="members">
            {project.members.map((member, i) => (
              <span key={i} className="member-avatar" title={member}>
                {member.charAt(0)}
              </span>
            ))}
          </div>
        </div>

        <span className="team-badge">
          <FiTag className="icon" />
          {project.team}
        </span>
      </div>

    </div>
  );
};

export default ProjectCard;
