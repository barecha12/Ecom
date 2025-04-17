import React, { useState } from "react";
import {
  FaBars,
  FaChartLine,
  FaBox,
  FaShoppingCart,
  FaComments,
  FaUser,
} from "react-icons/fa";
import { Container, Row, Col, Card, ListGroup, Button, Navbar, Nav, Dropdown, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/user-messages.css";

function UserMessages() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleShow = (user) => {
    setSelectedUser(user);
    setShowModal(true);
    setMessages([
      { text: "How can I track my order?", sender: "user", time: formatTime(new Date()) },
      { text: "Please provide your order ID.", sender: "me", time: formatTime(new Date()) },
    ]);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedUser(null);
    setMessage('');
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages(prevMessages => [...prevMessages, { text: message, sender: 'me', time: formatTime(new Date()) }]);
      setMessage('');
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", lastMessage: "How can I track my order?" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", lastMessage: "Can I cancel my order?" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", lastMessage: "When will my product ship?" },
    { id: 4, name: "Bob Brown", email: "bob@example.com", lastMessage: "I need a refund." },
  ];

  return (
    <div className="dashboard-wrapper">
      <button className="hamburger-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <div className={`custom-sidebar ${sidebarVisible ? "show" : "hide"}`}>
        <div className="d-flex align-items-center mb-3">
          <h2 className="text-center custom-css flex-grow-1 mt-2 ms-4">Vendor Dashboard</h2>
        </div>

        <a href="/vendor" className="custom-link">
          <FaChartLine className="me-2" /> Analytics
        </a>

        <div className="dropdown">
          <div className="custom-link" onClick={() => handleDropdown("products")}>
            <FaBox className="me-2" /> Manage Products
          </div>
          {openDropdown === "products" && (
            <ul className="dropdown-menu custom-dropdown-menu">
              <li><a href="/vendor/add-products" className="dropdown-item-vendor">Add Products</a></li>
              <li><a href="/vendor/coupons" className="dropdown-item-vendor">Add Coupons</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown">
          <div className="custom-link" onClick={() => handleDropdown("orders")}>
            <FaShoppingCart className="me-2" /> Manage Orders
          </div>
          {openDropdown === "orders" && (
            <ul className="dropdown-menu custom-dropdown-menu">
              <li><a href="/vendor/new-orders" className="dropdown-item-vendor">New Order</a></li>
              <li><a href="/vendor/shipped" className="dropdown-item-vendor">Shipped</a></li>
              <li><a href="/vendor/refunds" className="dropdown-item-vendor">Refund</a></li>
              <li><a href="/vendor/completed" className="dropdown-item-vendor">Completed</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown">
          <div className="custom-link" onClick={() => handleDropdown("messages")}>
            <FaComments className="me-2" /> Manage Messages
          </div>
          {openDropdown === "messages" && (
            <ul className="dropdown-menu custom-dropdown-menu">
              <li><a href="/vendor/user-messages" className="dropdown-item-vendor">User Message</a></li>
              <li><a href="/vendor/admin-messages" className="dropdown-item-vendor">Admin Message</a></li>
              <li><a href="/vendor/review-messages " className="dropdown-item-vendor">Review Message</a></li>
              <li><a href="/vendor/notifications" className="dropdown-item-vendor">Notification</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown">
          <div className="custom-link" onClick={() => handleDropdown("profile")}>
            <FaUser className="me-2" /> Profile
          </div>
          {openDropdown === "profile" && (
            <ul className="dropdown-menu custom-dropdown-menu">
              <li><a href="/vendor/manage-profile" className="dropdown-item-vendor">Updated Password</a></li>
              <li><a href="#logout" className="dropdown-item-vendor">Logout</a></li>
            </ul>
          )}
        </div>
      </div>

      <div className={`main-content ${sidebarVisible ? "with-sidebar" : "full-width"}`}>
        <div className="custom-header text-center">
          <h1 className="h4 mb-0">User Messages</h1>
        </div>

        <Container fluid>
          <Row>
            <Col
              lg={10}
              className="p-4 d-flex justify-content-center align-items-center"
              style={{
                width: '100%',
              }}
            >
              <Card style={{ width: '80%', maxWidth: '1200px' }}>
                <Card.Header>
                  <h4 className="text-center">User Messages</h4>
                </Card.Header>
                <Card.Body>
                  <ListGroup>
                    {users.map(user => (
                      <ListGroup.Item key={user.id} className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{user.name}</strong><br />
                          <small>{user.email}</small>
                        </div>
                        <div className="text-muted">
                          <small>{user.lastMessage}</small>
                        </div>
                        <Button variant="outline-primary" size="sm" onClick={() => handleShow(user)}>
                          View Messages
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Modal for Viewing Messages */}
          <Modal show={showModal} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{selectedUser ? selectedUser.name : ''}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ height: '350px', overflowY: 'scroll', marginBottom: '20px' }}>
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender === 'me' ? 'my-message' : 'user-message'}`} style={{ display: 'flex', justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start' }}>
                    <span>{msg.text}</span>
                    <span style={{ fontSize: 'small', marginLeft: '10px', marginTop: '5px', alignSelf: 'flex-end' }}>{msg.time}</span>
                  </div>
                ))}
              </div>
              <Form>
                <Form.Group controlId="messageInput">
                  <Form.Control
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSendMessage}>
                Send
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </div>
  );
}

export default UserMessages;