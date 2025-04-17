import React, { useState } from "react";
import { Container, Row, Col, Card, ListGroup, Button, Navbar, Nav, Dropdown, Form, Table, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaEnvelope, FaPen, FaTimes, FaClipboardList, FaShoppingCart, FaStar, FaUser, FaAddressBook, FaSignOutAlt, FaBars, FaCog, FaPlus, FaTag, FaTruck, FaUndo, FaCheck, FaComment, FaBell, FaUserCog } from "react-icons/fa";
import './style.css';

function ControlOrder() {
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

  const [entries, setEntries] = useState(10);
  const products = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    code: `P${i + 1}01`,
    color: "Blue",
    image: "https://www.beyiddondolo.com/media/5679-84.jpg",
    category: "T-Shirts",
    section: "Clothing",
    addedBy: "Vendor",
    status: i % 2 === 0,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / entries);
  const displayedProducts = products.slice((currentPage - 1) * entries, currentPage * entries);

  return (
    <Container fluid>
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3 w-100 fixed-top" style={{ marginBottom: '56px' }}>
        <Button variant="dark" className="me-3 d-block" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars />
        </Button>
        <Navbar.Brand>WALIYA MARKET</Navbar.Brand>
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
            padding: '20px 15px'
          }}
        >
          <Row className="mb-5 d-flex justify-content-end">
          </Row>
          <Row className="mb-2 d-flex justify-content-end">
            <h1>Order Items</h1>
          </Row>
          <Row className="mb-3 d-flex justify-content-between align-items-center">
            <Col xs="auto" className="d-flex align-items-center">
              <label className="me-2">Show</label>
              <Form.Select value={entries} onChange={(e) => setEntries(Number(e.target.value))} style={{ width: '100px' }}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Form.Select>
              <label className="ms-2">Entries</label>
            </Col>
            <Col xs="auto" className="d-flex align-items-center mt-3 mt-sm-0">
              <label className="me-2">Search:</label>
              <Form.Control type="text" placeholder="Search" style={{ width: '150px' }} />
            </Col>
          </Row>

          {/* Scrollable Table Container */}
          <div className="table-responsive" style={{ maxHeight: "370px", overflowY: "auto" }}>
            <Table striped bordered hover className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Product Code</th>
                  <th>Product Color</th>
                  <th>Product Image</th>
                  <th>Category</th>
                  <th>Section</th>
                  <th>Added by</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.code}</td>
                    <td>{product.color}</td>
                    <td>
                      <Image src={product.image} rounded width={50} height={50} />
                    </td>
                    <td>{product.category}</td>
                    <td>{product.section}</td>
                    <td>{product.addedBy}</td>
                    <td>
                      <Form.Check type="checkbox" checked={product.status} readOnly />
                    </td>
                    <td>
                      <div className="d-flex justify-content-start">
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-3"
                          style={{ height: '40px', width: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                          <FaPen size={15} />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          style={{ height: '40px', width: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                          <FaTimes size={15} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          <Row className="d-flex justify-content-between mt-3">
            <Col xs="auto">
              <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
            </Col>
            <Col xs="auto">
              Page {currentPage} of {totalPages}
            </Col>
            <Col xs="auto">
              <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ControlOrder;
