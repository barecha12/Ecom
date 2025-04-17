import React, { useState } from "react";
import { Container, Row, Col, Image, Modal, ListGroup, Button, Navbar, Nav, Dropdown, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaEnvelope, FaPen, FaTimes, FaClipboardList, FaShoppingCart, FaStar, FaUser, FaAddressBook, FaSignOutAlt, FaBars, FaCog, FaPlus, FaTag, FaTruck, FaUndo, FaCheck, FaComment, FaBell, FaUserCog } from "react-icons/fa";
import './style.css';

function AddCoupons() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [productManagementOpen, setProductManagementOpen] = useState(false);
  const [orderManagementOpen, setOrderManagementOpen] = useState(false);
  const [messageManagementOpen, setMessageManagementOpen] = useState(false);
  const [accountSettingOpen, setAccountSettingOpen] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [amountType, setAmountType] = useState('$');
  const [amount, setAmount] = useState('');

  const [productName, setProductName] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [activeStatus, setActiveStatus] = useState("");

  async function AddCoupon(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("couponCode", couponCode);
    formData.append("discountPercent", discountPercent);
    formData.append("expiryDate", expiryDate);
    formData.append("activeStatus", activeStatus);

    let items = { productName, couponCode, discountPercent, expiryDate, activeStatus };
    console.log(items);
  }
  const handleClear = () => {
    setProductName("");
    setCouponCode("");
    setDiscountPercent("");
    setExpiryDate("");
    setActiveStatus("");
  };
  // Handle the type of amount selection (percentage or dollar)
  const handleAmountTypeChange = (e) => {
    setAmountType(e.target.value);
  };
  // Handle amount input change and validate for percentage
  const handleAmountChange = (e) => {
    const value = e.target.value;

    if (amountType === '%' && value > 100) {
      // Prevent entering values greater than 100 if percentage is selected
      return;
    }

    setAmount(value);
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

  const [entries, setEntries] = useState(10);
  const coupons = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Surveillance & Security Cameras`,
    code: `C${i + 1}01`,
    image: "https://www.beyiddondolo.com/media/5679-84.jpg",
    amount: `$${(i + 1) * 5}`,
    expiryDate: `2025-03-${(i % 31) + 1}`,
    status: i % 2 === 0,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(coupons.length / entries);
  const displayedCoupons = coupons.slice((currentPage - 1) * entries, currentPage * entries);

  return (
    <div style={{ backgroundColor: '#181818', minHeight: '100vh' }}>
      <Container fluid >

        {/* Top Navbar */}
        <Navbar expand="lg" className="px-3 w-100 fixed-top" style={{ backgroundColor: '#252525', color: '#FF0000', minHeight: '80px', marginBottom: '56px' }}>
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
            className={`sidebar bg-dark text-white p-3 d-lg-block ${sidebarOpen ? 'sidebar-open' : ''}`}
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
              <ListGroup.Item action className="bg-dark text-white border-0 d-flex align-items-center">
                <FaTachometerAlt className="me-2" size={24} />
                <Link to="/vendor/dashboard" style={{ textDecoration: 'none', color: 'white' }}><span className="fw-bold" style={{ fontSize: '18px' }}>Dashboard</span></Link>
              </ListGroup.Item>
              {/* Product Management Section with Expandable Content */}
              <ListGroup.Item action className="bg-dark text-white border-0 d-flex align-items-center" onClick={toggleProductManagement}>
                <FaClipboardList className="me-2 " size={24} />
                <span className="fw-bold" style={{ fontSize: '18px' }}>Products</span>
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
              <ListGroup.Item action className="bg-dark text-white border-0 d-flex align-items-center" onClick={toggleOrderManagement}>
                <FaShoppingCart className="me-2 " size={24} />
                <span className="fw-bold" style={{ fontSize: '18px' }}>Orders</span>
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
                <FaEnvelope className="me-2 " size={24} />
                <span className="fw-bold" style={{ fontSize: '18px' }}>Messages</span>
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
                <FaAddressBook className="me-2 " size={24} />
                <span className="fw-bold" style={{ fontSize: '18px' }}>Settings</span>
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
            <h3>Products</h3>
            <Row className="mb-3 d-flex justify-content-end">

            </Row>
            <Row className="mb-3 d-flex justify-content-end">
              <Col xs="auto" className="d-flex justify-content-end mt-3 mt-sm-0">
                <Button
                  variant="primary"
                  className="add-product-btn"
                  onClick={() => setShowAddProductModal(true)}
                >
                  Add Coupons
                </Button>

              </Col>
            </Row>
            <Row className="mb-3 d-flex justify-content-between align-items-center">
              <Col xs="auto" className="d-flex align-items-center">
                <label className="me-2 text-white">Show</label>
                <Form.Select value={entries} onChange={(e) => setEntries(Number(e.target.value))} style={{ width: '100px' }}>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </Form.Select>
                <label className="ms-2  text-white">Entries</label>
              </Col>
              <Col xs="auto" className="d-flex align-items-center mt-3 mt-sm-0">
                <label className="me-2  text-white">Search:</label>
                <Form.Control type="text" placeholder="Search" style={{ width: '150px' }} />
              </Col>
            </Row>

            {/* Product Cards Grid with 5 columns on large screens */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(220px, 1fr))", // Responsive sizing
                gap: "20px",
              }}
              className="custom-grid"
            >
              {displayedCoupons.map((product) => (
                <Card
                  key={product.id}
                  className="shadow-sm rounded-4 p-3 d-flex flex-column justify-content-between"
                >
                  <div>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fluid
                      rounded
                      className="mb-3"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                    <h5 className="fw-bold">{product.name}</h5>
                    <p className="mb-1 text-muted">Coupon Code: {product.code}</p>
                    <p className="mb-1">Discount: {product.amount}</p>
                    <p className="mb-1">Expiry Date: {product.expiryDate}</p>
                    <Form.Check
                      type="switch"
                      label="Active"
                      checked={product.status}
                      readOnly
                      className="mt-2"
                    />
                  </div>

                  {/* Actions */}
                  <div className="d-flex justify-content-between mt-3 flex-column flex-sm-row gap-2">
                    <Button
                      variant="warning"
                      size="sm"
                      className="fixed-button-size"
                    >
                      <FaPen />
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      className="fixed-button-size"
                    >
                      {/* Your icon or text */}
                      <FaTimes />
                    </Button>

                  </div>
                </Card>
              ))}
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





            <Modal
              show={showAddProductModal}
              onHide={() => setShowAddProductModal(false)}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Add New Coupon</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form>
                  {/* Amount Type (percentage or dollar) */}
                  <Form.Group className="mb-3" controlId="amountType">
                    <Form.Label>Product name</Form.Label>
                    <Form.Select
                      value={amountType}
                      onChange={handleAmountTypeChange}
                    >
                      <option value="$">phone </option>
                      <option value="%">pc </option>

                      <option value="$">bord </option>
                      <option value="%">pc bord</option>

                      <option value="$">phone phone </option>
                      <option value="%">pc toshiba </option>
                    </Form.Select>
                  </Form.Group>
                  {/* Coupon Code */}
                  <Form.Group className="mb-3" controlId="couponCode">
                    <Form.Label>Coupon Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={couponCode} onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                    />
                  </Form.Group>

                  {/* Amount */}
                  <Form.Group className="mb-3" controlId="amount">
                    <Form.Label>Discount Percent</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={`Enter amount in ${amountType === '$' ? '$' : '%'}`}
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(e.target.value)}
                      min="0"
                      max={amountType === '%' ? "100" : undefined}  // Restrict max to 100 for percentage
                    />
                  </Form.Group>

                  {/* Expiry Date */}
                  <Form.Group className="mb-3" controlId="expiryDate">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </Form.Group>

                  {/* Status */}
                  <Form.Group className="mb-3" controlId="productStatus">
                    <Form.Check
                      type="checkbox"
                      label="Active Status"
                      value={activeStatus} onChange={(e) => setActiveStatus(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClear}>
                  Clear
                </Button>
                <Button variant="primary" onClick={(e) => {
                  // Handle your submission logic here!
                  setShowAddProductModal(false);
                  AddCoupon(e);
                }}>
                  Save Product
                </Button>
              </Modal.Footer>
            </Modal>



          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddCoupons;
