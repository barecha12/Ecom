import React, { useState, useEffect, useRef } from 'react';
import Translation from "../translations/lang.json";
import { useNavigate } from "react-router-dom";
import './styles/chat.css'; // Custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

function ChatVendor() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatBoxRef = useRef(null);
    const navigate = useNavigate();

  
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
    
  
  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      addMessage(inputValue, 'sent');
      setInputValue('');

      // Simulate receiving a response
      setTimeout(() => {
        addMessage('This is a response from the chat bot.', 'received');
      }, 1000);
    }
  };

  const addMessage = (text, type) => {
    setMessages(prevMessages => [...prevMessages, { text, type }]);
    setTimeout(() => {
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; // Scroll to the bottom
      }
    }, 10);
  };



  return (
    <div>
      <div className="header">
        <button className="back-button" onClick={() => window.history.back()}>Back</button>
        <h1>Chat Vendor</h1>
        <div></div> {/* Empty div to maintain layout */}
      </div>

      <div className="chat-container">
        <div className="chat-box" ref={chatBoxRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatVendor;