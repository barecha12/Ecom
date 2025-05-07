import React, { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa"; // Import FaTrash
import Translation from "../translations/lang.json";
import "./styles/notification.css"; // Your custom CSS

const Notification = () => {
    const defaultFontSize = 'medium';
    const defaultFontColor = '#000000';
    const defaultLanguage = 'english'; // Default language

    const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontSize') || defaultFontSize);
    const [fontColor, setFontColor] = useState(() => localStorage.getItem('fontColor') || defaultFontColor);
    const [language, setLanguage] = useState(() => localStorage.getItem('language') || defaultLanguage);
    const [content, setContent] = useState(Translation[language]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        document.documentElement.style.setProperty('--font-size', fontSize);
        document.documentElement.style.setProperty('--font-color', fontColor);
        
        localStorage.setItem('fontSize', fontSize);
        localStorage.setItem('fontColor', fontColor);
        localStorage.setItem('language', language);

        // Update content based on selected language
        setContent(Translation[language]);
    }, [fontSize, fontColor, language]);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user-info'));
        const userId = userInfo?.user_id;

        if (userId) {
            fetchNotifications(userId);
        }
    }, []);

    const fetchNotifications = async (userId) => {
        try {
            const response = await fetch('http://localhost:8000/api/getnotifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userId }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setNotifications(data.notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toISOString().slice(0, 19).replace("T", " ");
    };

    const handleDelete = async (notificationId, index) => {
        const userInfo = JSON.parse(localStorage.getItem('user-info'));
        const userId = userInfo?.user_id;

        if (userId) {
            try {
                const response = await fetch('http://localhost:8000/api/deletenotification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id: userId, notification_id: notificationId }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Remove the notification from the state
                setNotifications(prev => {
                    const newNotifications = [...prev];
                    newNotifications.splice(index, 1);
                    return newNotifications;
                });
                
                alert("This message has been deleted");
            } catch (error) {
                console.error('Error deleting notification:', error);
            }
        }
    };

    return (
        <div className="notification-container">
            <h1 className="notification-title" style={{ textAlign: 'center' }}>Notifications</h1>
            {notifications.length === 0 ? (
                <p className="no-notifications" style={{ textAlign: 'center' }}>No notifications available.</p>
            ) : (
                notifications.map((notif, index) => (
                    <div className="notification-item" key={notif.notification_id}>
                        <button 
                            className="delete-button" 
                            onClick={() => handleDelete(notif.notification_id, index)}
                        >
                            <FaTrash />
                        </button>
                        <p className="notification-message">{notif.notification_text}</p>
                        <span className="notification-time">{formatDate(notif.created_at)}</span>
                    </div>
                ))
            )}
        </div>
    );
};

export default Notification;