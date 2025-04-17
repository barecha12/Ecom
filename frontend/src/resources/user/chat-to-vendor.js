import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './styles/chat.css'; // Custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

function ChatVendor() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatBoxRef = useRef(null);
    const navigate = useNavigate();

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