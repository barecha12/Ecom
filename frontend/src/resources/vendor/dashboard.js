import React, { useState } from "react";
import { Container, Row, Col, Card, ListGroup, Button, Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaEnvelope, FaClock, FaCheckCircle, FaClipboardList, FaShoppingCart, FaStar, FaUser, FaAddressBook, FaSignOutAlt, FaBars, FaCog, FaPlus, FaTag, FaTruck, FaUndo, FaCheck, FaComment, FaBell, FaUserCog } from "react-icons/fa"; // Added FaPlus and FaTag
import './styles.css';

function VendorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [productManagementOpen, setProductManagementOpen] = useState(false);

  const [orderManagementOpen, setOrderManagementOpen] = useState(false);
  const [messageManagementOpen, setMessageManagementOpen] = useState(false);
  const [accountSettingOpen, setAccountSettingOpen] = useState(false);

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
    <div style={{ backgroundColor: '#181818', minHeight: '100vh' }}> 
    <Container fluid >
      
      {/* Top Navbar */}
      <Navbar expand="lg" className="px-3 w-100 fixed-top" style={{backgroundColor: '#252525', color: '#FF0000', minHeight: '80px' ,marginBottom: '56px' }}>
        <Button variant="dark" className="me-3 d-block" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars size={24} />
        </Button>
        <Navbar.Brand > <span className="fw-bold text-white" style={{ fontSize: '24px' }}>WALIYA MARKET      VENDRO</span></Navbar.Brand>
        <Nav className="ms-auto">
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" className="text-white dropdown-toggle-no-arrow">
              <FaUser className="me-2" size={30} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/vendorsettings">
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
          className={`sidebar  text-white p-3 d-lg-block ${sidebarOpen ? 'sidebar-open' : ''}`}
          style={{
            minHeight: "100vh",
            position: 'fixed',
            backgroundColor: '#212121', 
            color: '#FF0000',
            zIndex: 999,
            top: '56px',
            left: sidebarOpen ? 0 : '-250px',
            transition: 'left 0.3s ease',
          }}
        >
          <ListGroup variant="flush">
          <ListGroup.Item action className="text-white border-0 d-flex align-items-center" style={{backgroundColor: '#212121'}} onClick={toggleProductManagement}>

            </ListGroup.Item>

            <ListGroup.Item action className=" text-white border-0 d-flex align-items-center" style={{backgroundColor: '#212121'}}>
              <FaTachometerAlt className="me-2" size={30} color="#737373"  />
              <Link to="/vendor/dashboard" style={{ textDecoration: 'none', color: '#737373' }}><span className="fw-bold" style={{ fontSize: '24px' }}>Dashboard</span></Link>
            </ListGroup.Item>
            {/* Product Management Section with Expandable Content */}
            <ListGroup.Item action className="text-white border-0 d-flex align-items-center" style={{backgroundColor: '#323232'}} onClick={toggleProductManagement}>
              <FaClipboardList className="me-2 " size={30} color="#ffffff"  />
              <span className="fw-bold" style={{ fontSize: '24px' ,color:"#ffffff"}}>Products</span>
              {/* Products Management */}
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
            <ListGroup.Item action className=" text-white border-0 d-flex align-items-center"style={{backgroundColor: '#212121'}} onClick={toggleOrderManagement}>
              <FaShoppingCart className="me-2 " size={30}  color="#737373"/>
              <span className="fw-bold" style={{ fontSize: '27px',color:"#737373" }}>Orders</span>
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
            <ListGroup.Item action className="text-white border-0 d-flex align-items-center" style={{backgroundColor: '#212121'}}onClick={toggleMessageManagement}>
              <FaEnvelope className="me-2 " size={24} color="#737373" />
              <span className="fw-bold" style={{ fontSize: '24px' ,color:"#737373"}}>Messages</span>
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
            <ListGroup.Item action className="text-white border-0 d-flex align-items-center" style={{backgroundColor: '#212121'}} onClick={toggleAccountSetting}>
              <FaAddressBook className="me-2 " size={30} color="#737373" />
              <span className="fw-bold" style={{ fontSize: '24px',color:"#737373" }}>Settings</span>
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
          <h3>User Dashboard</h3>
          <Row className="mt-4"></Row>
          <Row className="mt-4">
            <Col md={3}>
              <Card className="text-center text-white bg-danger">
                <Card.Body className="d-flex flex-column align-items-center">
                  <FaClipboardList size={30} />
                  <Card.Title>Total Orders</Card.Title>
                  <Card.Text>0</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center text-white bg-success">
                <Card.Body className="d-flex flex-column align-items-center">
                  <FaClock size={30} />
                  <Card.Title>Pending Orders</Card.Title>
                  <Card.Text>0</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center text-white bg-primary">
                <Card.Body className="d-flex flex-column align-items-center">
                  <FaCheckCircle size={30} />
                  <Card.Title>Complete Orders</Card.Title>
                  <Card.Text>0</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center text-white bg-info">
                <Card.Body className="d-flex flex-column align-items-center">
                  <FaStar size={30} />
                  <Card.Title>Reviews</Card.Title>
                  <Card.Text>0</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default VendorDashboard;
//hi