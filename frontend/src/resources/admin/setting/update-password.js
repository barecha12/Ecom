import React, { useState } from "react";
import { Container, Row ,Col, Modal, Card, Form, ListGroup, Button, Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link,useNavigate  } from "react-router-dom";
import { FaTachometerAlt, FaEnvelope, FaClipboardList, FaShoppingCart, FaStar, FaUser, FaAddressBook, FaSignOutAlt, FaBars, FaCog, FaPlus, FaTag, FaTruck, FaUndo, FaCheck, FaComment, FaBell, FaUserCog } from "react-icons/fa"; // Added FaPlus and FaTag
import './styles.css';

function UpdatePassword() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [productManagementOpen, setProductManagementOpen] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(true);

  const [orderManagementOpen, setOrderManagementOpen] = useState(false);
  const [messageManagementOpen, setMessageManagementOpen] = useState(false);
  const [accountSettingOpen, setAccountSettingOpen] = useState(false);
  const navigate = useNavigate();  // Hook to navigate programmatically

  const handleClose = () => {
    // Navigate to /vendor/dashboard when the close button is clicked
    navigate('/admin/dashboard');
  };

  
  const toggleProductManagement = () => {
    setProductManagementOpen(!productManagementOpen);
  };

  const toggleOrderManagement = () => {
    setOrderManagementOpen(!orderManagementOpen);
  };
  const toggleMessageManagement = () => {
    setMessageManagementOpen(!messageManagementOpen);
  };
  const toggleAccountSetting = () => {
    setAccountSettingOpen(!accountSettingOpen);
  };
  return (
    <Container fluid>
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3 w-100 fixed-top" style={{ marginBottom: '56px' }}>
        <Button variant="dark" className="me-3 d-block" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars />
        </Button>
        <Navbar.Brand>WALIYA MARKET      VENDRO manageprofile</Navbar.Brand>
        <Nav className="ms-auto">
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" className="text-white dropdown-toggle-no-arrow">
              <FaUser className="me-2" size={30} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/vendor/manage-profile">
                <FaCog className="me-2" /> Settings
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/vendorlogout">
                <FaSignOutAlt className="me-2" /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar>

      <Row>
        {/* Sidebar */}
        <Col
          lg={2}
          className={`sidebar bg-dark text-white p-3 d-lg-block ${sidebarOpen ? 'sidebar-open' : ''}`}
          style={{
            minHeight: "100vh",
            position: 'fixed',
            zIndex: 999,
            top: '56px',
            left: sidebarOpen ? 0 : '-250px',
            transition: 'left 0.3s ease',
          }}
        >
          <ListGroup variant="flush">
            <ListGroup.Item action className="bg-dark text-white border-0 d-flex align-items-center">
              <FaTachometerAlt className="me-2" />
              <Link to="/vendor/dashboard" style={{ textDecoration: 'none', color: 'white' }}>Dashboard</Link>
            </ListGroup.Item>
            {/* Product Management Section with Expandable Content */}
            <ListGroup.Item action className="bg-dark text-white border-0 d-flex align-items-center" onClick={toggleProductManagement}>
              <FaClipboardList className="me-2" />
              Product Management
            </ListGroup.Item>

            {/* Expanded content for Product Management */}
            <div className={`product-management-dropdown ${productManagementOpen ? 'open' : ''}`}>
              <ListGroup.Item action className="bg-dark text-white border-0 d-flex align-items-center">
                <FaPlus className="me-2" />
                <Link to="/vendor/add-product" style={{ textDecoration: 'none', color: 'white' }}>Add Product</Link>
              </ListGroup.Item>
              <ListGroup.Item action className="bg-dark text-white border-0 d-flex align-items-center">
                <FaTag className="me-2" />
                <Link to="/vendor/coupons" style={{ textDecoration: 'none', color: 'white' }}>Coupons</Link>
              </ListGroup.Item>
            </div>

            {/* Order Management Section with Expandable Content */}
            <ListGroup.Item action className="bg-dark text-white border-0 d-flex align-items-center" onClick={toggleOrderManagement}>
              <FaShoppingCart className="me-2" />
              Order Management
            </ListGroup.Item>
            <div className={`product-management-dropdown ${orderManagementOpen ? 'open' : ''}`}>
              <ListGroup.Item action className="bg-dark text-white border-0 d-flex align-items-center">
                <FaShoppingCart className="me-2" />
                <Link to="/vendor/orders" style={{ textDecoration: 'none', color: 'white' }}>Orders</Link>
              </ListGroup.Item>
              <ListGroup.Item action className="bg-dark text-white border-0 d-flex align-items-center">
                <FaTruck className="me-2" />
                <Link to="/vendor/shipped" style={{ textDecoration: 'none', color: 'white' }}>Shipped</Link>
              </ListGroup.Item>
              <ListGroup.Item action className="bg-dark text-white border-0 d-flex align-items-center">
                <FaUndo className="me-2" />
                <Link to="/vendor/refunds" style={{ textDecoration: 'none', color: 'white' }}>Refunds</Link>
              </ListGroup.Item>
              <ListGroup.Item action className="bg-dark text-white border-0 d-flex align-items-center">
                <FaCheck className="me-2" />
                <Link to="/vendor/completed" style={{ textDecoration: 'none', color: 'white' }}>Completed Orders</Link>
              </ListGroup.Item>
            </div>

            {/* Message Management Section with Expandable Content */}
            <ListGroup.Item action className="bg-dark text-white border-0 d-flex align-items-center" onClick={toggleMessageManagement}>
              <FaEnvelope className="me-2" />
              Message Management
            </ListGroup.Item>
            <div className={`product-management-dropdown ${messageManagementOpen ? 'open' : ''}`}>
              <ListGroup.Item action className="bg-dark text-white border-0 d-flex align-items-center">
                <FaComment className="me-2" />
                <Link to="/vendor/user-messages" style={{ textDecoration: 'none', color: 'white' }}>User Messages</Link>
              </ListGroup.Item>
              <ListGroup.Item action className="bg-dark text-white border-0 d-flex align-items-center">
                <FaUser className="me-2" />
                <Link to="/vendor/admin-messages" style={{ textDecoration: 'none', color: 'white' }}>Admin Messages</Link>
              </ListGroup.Item>
              <ListGroup.Item action className="bg-dark text-white border-0 d-flex align-items-center">
                <FaStar className="me-2" />
                <Link to="/vendor/review-messages" style={{ textDecoration: 'none', color: 'white' }}>Review Messages</Link>
              </ListGroup.Item>
              <ListGroup.Item action className="bg-dark text-white border-0 d-flex align-items-center">
                <FaBell className="me-2" />
                <Link to="/vendor/notifications" style={{ textDecoration: 'none', color: 'white' }}>Notifications</Link>
              </ListGroup.Item>
            </div>

            {/* Account Management Section with Expandable Content */}
            <ListGroup.Item action className="bg-dark text-white border-0 d-flex align-items-center" onClick={toggleAccountSetting}>
              <FaAddressBook className="me-2" />
              Account Settings
            </ListGroup.Item>
            <div className={`product-management-dropdown ${accountSettingOpen ? 'open' : ''}`}>
              <ListGroup.Item action className="bg-dark text-white border-0 d-flex align-items-center">
                <FaUserCog className="me-2" />
                <Link to="/vendor/manage-profile" style={{ textDecoration: 'none', color: 'white' }}>Manage Profile</Link>
              </ListGroup.Item>
            </div>
          </ListGroup>
        </Col>

        {/* Main Content */}
        <Col
          lg={sidebarOpen ? 10 : 12}
          className="p-4"
          style={{
            marginLeft: sidebarOpen ? '250px' : '0',
            transition: 'margin-left 0.3s ease',
            paddingTop: '56px'
          }}
        >

<Modal
  show={showChangePasswordModal}
  onHide={() => setShowChangePasswordModal(false)}
  centered
  backdrop="static"  // This disables closing the modal when clicking outside
  keyboard={false}   // This disables closing when pressing the Escape key
>
<Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>

  <Modal.Body>
    <Form>
      <Form.Group className="mb-3" controlId="currentPassword">
        <Form.Label>Current Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter current password"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="newPassword">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter new password"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirmNewPassword">
        <Form.Label>Confirm New Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm new password"
        />
      </Form.Group>
    </Form>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowChangePasswordModal(false)}>
      Clear
    </Button>
    <Button
      variant="primary"
      onClick={() => {
        // Password change logic goes here!
        setShowChangePasswordModal(false);
        alert("Password updated successfully!");
      }}
    >
      Update Password
    </Button>
  </Modal.Footer>
</Modal>



        </Col>
      </Row>
    </Container>
  );
}

export default UpdatePassword;
//hi