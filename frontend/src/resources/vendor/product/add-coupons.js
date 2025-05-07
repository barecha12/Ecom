import React, { useState,useEffect } from "react";
import { FaBars, FaChartLine, FaBox, FaShoppingCart, FaComments, FaUser, FaPen, FaTimes, } from "react-icons/fa";
import { Container, Row, Col, Card, ListGroup, Button, Modal, Form, Image, } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import Translation from "../../translations/lang.json";
import "../style/add-coupons.css";

function AddCoupons() {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [showAddCouponModal, setShowAddCouponModal] = useState(false);
    const [productName, setProductName] = useState("");
    const [couponCode, setCouponCode] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [status, setStatus] = useState("active"); // New state for status
    const [productImages, setProductImages] = useState({ selectedproductImages: [] });
    const [entries, setEntries] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const couponCodes = 100; // Example coupon code count
    const totalPages = Math.ceil(couponCodes / entries);
    const [selectedFilesCount, setSelectedFilesCount] = useState(0);
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showEditProductModal, setShowEditProductModal] = useState(false);

  
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
    
  

    const deleteProduct = (productId) => {
        console.warn("FUCK ID:", productId);
    };
    const handleCloseEditProductModal = () => {
        setShowEditProductModal(false);
        setSelectedProduct(null);
    };
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        if (name === "selectedproductImages") {
            const slicedFiles = Array.from(files).slice(0, 5); // Limit to 5 files
            setProductImages({
                ...productImages,
                selectedproductImages: slicedFiles
            });
            setSelectedFilesCount(slicedFiles.length); // Update the count of selected files
        }
    };

    const addCoupon = (e) => {
        e.preventDefault();
        const newProduct = { productName, couponCode, discountPrice, expiryDate, status, productImages };
        console.log("Product Added:", newProduct);
        handleCloseAddCouponModal();
    };
    const products = [
        {
            id: 1,
            name: "Smartphone",
            couponCode: "Bxone",
            price: "$699",
            image: "https://www.beyiddondolo.com/media/5679-84.jpg",
            expiryDate: "2025-05-01",
            status: "active"
        },
        {
            id: 2,
            name: "Laptop",
            couponCode: "Bxone",
            price: "$999",
            image: "https://www.beyiddondolo.com/media/5679-84.jpg",
            expiryDate: "2025-06-15",
            status: "inactive"
        },
        {
            id: 3,
            name: "Headphones",
            couponCode: "Bxone",
            price: "$199",
            image: "https://www.beyiddondolo.com/media/5679-84.jpg",
            expiryDate: "2025-04-25",
            status: "active"
        },
        {
            id: 4,
            name: "Smartwatch",
            couponCode: "Bxone",
            price: "$249",
            image: "https://www.beyiddondolo.com/media/5679-84.jpg",
            expiryDate: "2025-05-10",
            status: "inactive"
        },
        {
            id: 5,
            name: "Men's T-Shirt",
            couponCode: "Bxone",
            price: "$29",
            image: "https://www.beyiddondolo.com/media/5679-84.jpg",
            expiryDate: "2025-04-30",
            status: "active"
        },
        {
            id: 6,
            name: "Women's Dress",
            couponCode: "Bxone",
            price: "$49",
            image: "https://www.beyiddondolo.com/media/5679-84.jpg",
            expiryDate: "2025-07-01",
            status: "inactive"
        },
        {
            id: 7,
            name: "Kids' Backpack",
            couponCode: "Bxone",
            price: "$39",
            image: "https://www.beyiddondolo.com/media/5679-84.jpg",
            expiryDate: "2025-05-20",
            status: "active"
        },
        {
            id: 8,
            name: "Bluetooth Speaker",
            couponCode: "Bxone",
            price: "$89",
            image: "https://www.beyiddondolo.com/media/5679-84.jpg",
            expiryDate: "2025-06-10",
            status: "inactive"
        },
    ];
    const handleCloseAddCouponModal = () => {
        setShowAddCouponModal(false);
        setProductName("");
        setCouponCode("");
        setDiscountPrice("");
        setExpiryDate("");
        setStatus("active"); // Reset status
        setProductImages({ selectedproductImages: [] });
    };

    // Get today's date in YYYY-MM-DD format
    const today = new Date();

    // Adjust the date by ensuring it’s in local time format
    const minDate = today.toLocaleDateString("en-CA");

    const openEditProductModal = (product) => {
        setSelectedProduct(product);
        setProductName(product.name); // Set current product name
        setCouponCode(product.couponCode); // Set current coupon code
        setDiscountPrice(product.price); // Set current discount price
        setExpiryDate(product.expiryDate); // Set current expiry date
        setStatus(product.status); // Set current status
        setShowEditProductModal(true); // Show the modal
    };

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
                    <h1 className="h4 mb-0">Coupon Lists</h1>
                </div>

                {/* Main Content Starts Here */}
                <Container fluid>
                    <Row>
                        <Col lg={12} className="p-4">
                            <Row className="mt-3">
                                <Col lg={12} className=" d-flex justify-content-end">
                                    <Button
                                        variant="primary"
                                        className="add-product-btn"
                                        onClick={() => setShowAddCouponModal(true)}
                                    >
                                        Add Coupon
                                    </Button>
                                </Col>
                            </Row>

                            {/* Product Cards Grid */}
                            <Row className="mt-3">
                                {products.map((product) => (
                                    <Col xs={12} md={6} lg={3} key={product.id}>
                                        <Card className="shadow-sm rounded-4 p-3 product-card-vendor">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fluid
                                                rounded
                                                className="mb-3"
                                                style={{ height: "150px", objectFit: "contain" }} // Updated style
                                            />
                                            <h5 className="fw-bold">{product.name}</h5>
                                            <p>Coupon Code: {product.couponCode}</p>
                                            <p>Discount Price: {product.price}</p>
                                            <p>Expiry Date: {product.expiryDate}</p> {/* Showing expiry date */}
                                            <p>Status: {product.status}</p>
                                            <div className="d-flex justify-content-between mt-3">
                                                <Button variant="warning" size="sm" onClick={() => openEditProductModal(product)}>
                                                    <FaPen />
                                                </Button>
                                                <Button variant="danger" size="sm" onClick={() => deleteProduct(product.id)}><FaTimes /></Button>
                                            </div>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>

                    {/* Add Coupon Modal */}
                    <Modal show={showAddCouponModal} onHide={handleCloseAddCouponModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Coupon</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={addCoupon}>
                                <Form.Group controlId="productName">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Enter product name" />
                                </Form.Group>
                                <Form.Group controlId="couponCode">
                                    <Form.Label>Coupon Code</Form.Label>
                                    <Form.Control type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Enter coupon code" />
                                </Form.Group>
                                <Form.Group controlId="discountPrice">
                                    <Form.Label>Discount Percent</Form.Label>
                                    <Form.Control type="text" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} placeholder="Enter discount price" />
                                </Form.Group>
                                <Form.Group controlId="expiryDate">
                                    <Form.Label>Expiry Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={expiryDate}
                                        onChange={(e) => setExpiryDate(e.target.value)}
                                        min={minDate} // Prevent past dates from being selected
                                        placeholder="Select expiry date"
                                    />
                                </Form.Group>
                                <Form.Group controlId="status">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </Form.Control>
                                </Form.Group>

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseAddCouponModal}>Close</Button>
                            <Button variant="primary" onClick={addCoupon}>Save Coupon</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
                {/* Main Content Ends Here */}
                <Modal show={showEditProductModal} onHide={handleCloseEditProductModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Coupon</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={addCoupon}> {/* Replace addCoupon with editCoupon */}
                            <Form.Group controlId="couponCode">
                                <Form.Label>Coupon Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    placeholder="Enter coupon code"
                                />
                            </Form.Group>
                            <Form.Group controlId="discountPrice">
                                <Form.Label>Discount Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={discountPrice}
                                    onChange={(e) => setDiscountPrice(e.target.value)}
                                    placeholder="Enter discount price"
                                />
                            </Form.Group>
                            <Form.Group controlId="expiryDate">
                                <Form.Label>Expiry Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    min={minDate} // Prevent past dates from being selected
                                    placeholder="Select expiry date"
                                />
                            </Form.Group>
                            <Form.Group controlId="status">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </Form.Control>
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEditProductModal}>Close</Button>
                        <Button variant="primary" onClick={() => addCoupon()}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    );
}

export default AddCoupons;
