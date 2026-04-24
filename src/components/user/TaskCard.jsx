import React, { useState } from "react";
import {
    FaFlag,
    FaCalendarAlt,
    FaTag,
} from "react-icons/fa";

const TaskCard = ({
    title,
    description,
    tags = [],
    priority = "medium",
    status = "not-started",     // 🔥 default
    dueDate,
    role = "user",              // "user" | "admin"
    onStatusChange,
}) => {

    const [taskStatus, setTaskStatus] = useState(status);

    const handleStatusChange = (e) => {
        const value = e.target.value;
        setTaskStatus(value);
        onStatusChange && onStatusChange(value);
    };

    return (
        <div className={`task-card priority-${priority}`}>

            {/* HEADER */}
            <div className="task-card-header">
                <h4 className="task-title">{title}</h4>

                {/* STATUS DROPDOWN */}
                <select
                    className={`task-status-dropdown status-${taskStatus}`}
                    value={taskStatus}
                    onChange={handleStatusChange}
                >
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="closed">Closed</option>


                    {/* 🔥 ADMIN ONLY */}
                    {role === "admin" && (
                        <option value="closed">Completed</option>
                    )}
                </select>
            </div>

            {/* DESCRIPTION */}
            <p className="task-desc">{description}</p>

            {/* TAGS */}
            {tags.length > 0 && (
                <div className="task-tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="task-tag">
                            <FaTag />
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* FOOTER */}
            <div className="task-card-footer">

                {/* PRIORITY */}
                <div className="task-meta">
                    <FaFlag />
                    <span className={`priority-text ${priority}`}>
                        {priority}
                    </span>
                </div>

                {/* DUE DATE */}
                {dueDate && (
                    <div className="task-meta">
                        <FaCalendarAlt />
                        <span>{dueDate}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
