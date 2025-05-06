import React, { useState } from "react";
import { FaBars, FaChartLine, FaBox, FaShoppingCart, FaComments, FaUser, FaUserCircle, } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Card, ListGroup, Button, Modal } from "react-bootstrap";
import Translation from "../../translations/lang.json";
import "../style/review-messages.css";

function ReviewMessages() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleShow = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const products = [
    {
      id: 1,
      name: "Product A",
      reviews: [
        { reviewer: "John Doe", comment: "Great product!", rating: 5, time: "10:30 AM" },
        { reviewer: "Jane Smith", comment: "Good value for money.", rating: 4, time: "11:15 AM" },
      ],
    },
    {
      id: 2,
      name: "Product B",
      reviews: [
        { reviewer: "Alice Johnson", comment: "Highly recommend it!", rating: 5, time: "9:00 AM" },
        { reviewer: "Bob Brown", comment: "Not what I expected.", rating: 2, time: "10:00 AM" },
      ],
    },
    {
      id: 3,
      name: "Product C",
      reviews: [
        { reviewer: "Charlie Green", comment: "Fantastic quality!", rating: 5, time: "2:00 PM" },
      ],
    },
    {
      id: 4,
      name: "Product D",
      reviews: [
        { reviewer: "Diana Prince", comment: "Will buy again!", rating: 4, time: "3:30 PM" },
        { reviewer: "Eve Adams", comment: "Satisfactory.", rating: 3, time: "4:15 PM" },
      ],
    },
  ];

  function logout() {
    localStorage.clear();
    toast.success("Logout Successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setTimeout(() => {
      navigate("/vendor/login");
    }, 1000); // Delay the navigation for 3 seconds
  }



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
              <li><a href="/vendor/add-coupons" className="dropdown-item-vendor">Add Coupons</a></li>
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
              <li><a onClick={logout} className="dropdown-item-vendor">Logout</a></li>
            </ul>
          )}
        </div>
      </div>

      <div className={`main-content ${sidebarVisible ? "with-sidebar" : "full-width"}`}>
        <div className="custom-header text-center">
          <h1 className="h4 mb-0">Product Review Messages</h1>
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
                  <h4 className="text-center">Product Reviews</h4>
                </Card.Header>
                <Card.Body>
                  <ListGroup>
                    {products.map(product => (
                      <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{product.name}</strong>
                        </div>
                        <Button variant="outline-primary" size="sm" onClick={() => handleShow(product)}>
                          View Reviews
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Modal for Viewing Reviews */}
          <Modal show={showModal} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct ? selectedProduct.name : ''} Reviews</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ListGroup>
                {selectedProduct && selectedProduct.reviews.map((review, index) => (
                  <ListGroup.Item key={index} className="d-flex align-items-center">
                    <FaUserCircle className="me-2" size={30} />
                    <div>
                      <strong>{review.reviewer}</strong>: {review.comment}
                      <br />
                      <small className="text-muted">{review.time} | Rating: {Array(review.rating).fill('⭐')}</small>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </div>
  );
}

export default ReviewMessages;