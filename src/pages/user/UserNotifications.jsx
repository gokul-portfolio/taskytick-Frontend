import React, { useState } from "react";
import { FiBell } from "react-icons/fi";
import NotificationCard from "../../components/common/NotificationCard";

const UserNotifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Task Assigned",
            message: "You have been assigned a new task: UI Dashboard",
            type: "info",
            time: "5 mins ago",
            read: false,
        },
        {
            id: 2,
            title: "Project Updated",
            message: "Project Website Revamp status changed to In Progress",
            type: "success",
            time: "1 hour ago",
            read: false,
        },
        {
            id: 3,
            title: "Deadline Reminder",
            message: "SEO Optimization task is due tomorrow",
            type: "warning",
            time: "Yesterday",
            read: true,
        },
    ]);

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((n) =>
                n.id === id ? { ...n, read: true } : n
            )
        );
    };

    const deleteNotification = (id) => {
        setNotifications((prev) =>
            prev.filter((n) => n.id !== id)
        );
    };

    return (
        <section className="notifications-page">

            <div className="notifications-header">
                <h3>
                    <FiBell className="icon" />
                    Notifications
                </h3>

                <span className="count">
                    {notifications.filter((n) => !n.read).length} Unread
                </span>

            </div>

            {/* LIST */}
            <div className="notifications-list">
                
                {notifications.length === 0 && (
                    <p className="empty-text">No notifications available</p>
                )}

                {notifications.map((item) => (
                    
                    <NotificationCard
                        key={item.id}
                        notification={item}
                        onMarkRead={markAsRead}
                        onDelete={deleteNotification}
                    />

                ))}

            </div>

        </section>
    );
};

export default UserNotifications;
