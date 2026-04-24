import React from "react";
import {
  FiUser,
  FiMail,
  FiBriefcase,
  FiCalendar,
  FiUsers,
  FiCheckCircle
} from "react-icons/fi";

const UserCard = ({ user }) => {
  return (
    <div className="user-card">

      {/* HEADER */}
      <div className="user-card-header">
        <h4 className="user-name">
          <FiUser className="icon title-icon" />
          {user.name}
        </h4>

        <span className={`user-status ${user.statusClass}`}>
          <FiCheckCircle className="icon" />
          {user.status}
        </span>
      </div>

      {/* BODY */}
      <p className="user-email">
        <FiMail className="icon" />
        {user.email}
      </p>

      {/* INFO */}
      <div className="user-info">
        <div>
          <span className="label">
            <FiBriefcase className="icon" />
            Designation
          </span>
          <span className="value">{user.designation}</span>
        </div>

        <div>
          <span className="label">
            <FiCalendar className="icon" />
            Joined Date
          </span>
          <span className="value">{user.joinedDate}</span>
        </div>
      </div>

      {/* FOOTER */}
      <div className="user-card-footer">
        <div className="user-team">
          <span className="label">
            <FiUsers className="icon" />
            Team
          </span>
        </div>

        <span className="user-team-badge">{user.team}</span>
      </div>

    </div>
  );
};

export default UserCard;
