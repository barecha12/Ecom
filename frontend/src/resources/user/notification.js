import React, { useState,useEffect } from 'react';
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

  useEffect(() => {
    document.documentElement.style.setProperty('--font-size', fontSize);
    document.documentElement.style.setProperty('--font-color', fontColor);
    
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('fontColor', fontColor);
    localStorage.setItem('language', language);

    // Update content based on selected language
    setContent(Translation[language]);
  }, [fontSize, fontColor, language]);
  

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