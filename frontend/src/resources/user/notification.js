import React, { useState } from 'react';
import Translation from "../translations/lang.json";
import "./styles/notification.css"; // Your custom CSS

const Notification = () => {
    const [notifications, setNotifications] = useState([
        { message: "You have a new message!", time: "10:30 AM" },
        { message: "Your order has been shipped!", time: "11:00 AM" },
        { message: "Don't forget to check our latest updates!", time: "11:15 AM" }
    ]);

    const handleDelete = (index) => {
        setNotifications(prev => {
            const newNotifications = [...prev];
            newNotifications.splice(index, 1);
            return newNotifications;
        });
        alert("This is message deleted");
    };

    return (
        <div className="notification-container">
            <h1 className="notification-title">Notifications</h1>
            {notifications.map((notif, index) => (
                <div className="notification-item" key={index}>
                    <button 
                        className="delete-button" 
                        onClick={() => handleDelete(index)}
                    >
                        X
                    </button>
                    <p className="notification-message">{notif.message}</p>
                    <span className="notification-time">{notif.time}</span>
                </div>
            ))}
        </div>
    );
};

export default Notification;