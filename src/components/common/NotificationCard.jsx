import React from "react";
import {
  FiCheckCircle,
  FiInfo,
  FiAlertTriangle,
  FiTrash2
} from "react-icons/fi";

const NotificationCard = ({
  notification,
  onMarkRead,
  onDelete,
}) => {
  const { id, title, message, type, time, read } = notification;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FiCheckCircle />;
      case "warning":
        return <FiAlertTriangle />;
      default:
        return <FiInfo />;
    }
  };

  return (
    <div className={`notification-card ${read ? "read" : "unread"}`}>

      <div className={`notif-icon ${type}`}>
        {getIcon()}
      </div>

      <div className="notif-content">
        <h6>{title}</h6>
        <p>{message}</p>
        <span className="time">{time}</span>
      </div>

      <div className="notif-actions">
        {!read && (
          <button
            className="mark-btn"
            onClick={() => onMarkRead(id)}
          >
            Mark as read
          </button>
        )}

        <button
          className="delete-btn"
          onClick={() => onDelete(id)}
        >
          <FiTrash2 />
        </button>
      </div>

    </div>
  );
};

export default NotificationCard;
