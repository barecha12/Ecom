import React, { useState } from "react";
import {
  FaBars,
  FaChartLine,
  FaBox,
  FaShoppingCart,
  FaComments,
  FaUser,
  FaPen,
  FaTimes,
} from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Modal,
  Form,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/add-products.css";

function AddProduct() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [totalProduct, setTotalProduct] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState({ selectedproductImages: [] });
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalProducts = 100; // Example total product count
  const totalPages = Math.ceil(totalProducts / entries);
  const [selectedFilesCount, setSelectedFilesCount] = useState(0);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditProductModal, setShowEditProductModal] = useState(false);

  const openEditProductModal = (product) => {
    setSelectedProduct(product);
    setShowEditProductModal(true);
  };
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

  const addProduct = (e) => {
    e.preventDefault();
    const newProduct = { category, subCategory, productName, totalProduct, productPrice, productDescription, productImages };
    console.log("Product Added:", newProduct);
    handleCloseAddProductModal();
  };
  const products = [
    {
      id: 1,
      name: "Smartphone",
      totalProduct: 50,
      price: "$699",
      category: "Electronics",
      subcategory: "Phone",
      image: "https://www.beyiddondolo.com/media/5679-84.jpg",
    },
  ];
  const handleCloseAddProductModal = () => {
    setShowAddProductModal(false);
    setCategory("");
    setSubCategory("");
    setProductName("");
    setTotalProduct("");
    setProductPrice("");
    setProductDescription("");
    setProductImages({ selectedproductImages: [] });
  };

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
              <li><a href="#logout" className="dropdown-item-vendor">Logout</a></li>
            </ul>
          )}
        </div>
      </div>

      <div className={`main-content ${sidebarVisible ? "with-sidebar" : "full-width"}`}>
        <div className="custom-header text-center">
          <h1 className="h4 mb-0">Product Lists</h1>
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
                    onClick={() => setShowAddProductModal(true)}
                  >
                    Add Product
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
                      <p>Total Product: {product.totalProduct}</p>
                      <p>Product Price: {product.price}</p>
                      <p>Category: {product.category}</p>
                      <p>Subcategory: {product.subcategory}</p>
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

          {/* Add Product Modal */}
          <Modal show={showAddProductModal} onHide={handleCloseAddProductModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={addProduct}>
                <Form.Group controlId="category">
                  <Form.Label>Select Category</Form.Label>
                  <Form.Select onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option value="">Select a Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Cloth">Cloth</option>
                  </Form.Select>
                </Form.Group>

                {/* Subcategory based on Category selection */}
                {category && (
                  <Form.Group controlId="subCategory">
                    <Form.Label>Select Subcategory</Form.Label>
                    <Form.Select onChange={(e) => setSubCategory(e.target.value)} value={subCategory}>
                      <option value="">Select a Subcategory</option>
                      {category === 'Electronics' && (
                        <>
                          <option value="Electronics-Phone">Phone</option>
                          <option value="Electronics-Computer">Computer</option>
                        </>
                      )}
                      {category === 'Cloth' && (
                        <>
                          <option value="Cloth-Men">Men</option>
                          <option value="Cloth-Women">Women</option>
                        </>
                      )}
                    </Form.Select>
                  </Form.Group>
                )}

                <Form.Group controlId="productName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Enter product name" />
                </Form.Group>
                <Form.Group controlId="totalProduct">
                  <Form.Label>Total Product</Form.Label>
                  <Form.Control type="text" value={totalProduct} onChange={(e) => setTotalProduct(e.target.value)} placeholder="Enter total product" />
                </Form.Group>
                <Form.Group controlId="productPrice">
                  <Form.Label>Product Price</Form.Label>
                  <Form.Control type="text" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder="Enter product price" />
                </Form.Group>
                <Form.Group controlId="productDescription">
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control as="textarea" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} rows={3} placeholder="Enter product description" />
                </Form.Group>
                <Form.Group controlId="selectedproductImages">
                  <Form.Label>Product Images (Max 5)</Form.Label>
                  <Form.Control type="file" name="selectedproductImages" multiple onChange={handleImageChange} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddProductModal}>Close</Button>
              <Button variant="primary" onClick={addProduct}>Save Product</Button>
            </Modal.Footer>
          </Modal>
        </Container>
        {/* Main Content Ends Here */}
        <Modal show={showEditProductModal} onHide={() => setShowEditProductModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => {
              e.preventDefault();
              // Handle product update logic here
              handleCloseEditProductModal();
            }}>
              <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProduct?.name || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                  placeholder="Enter product name"
                />
              </Form.Group>
              <Form.Group controlId="totalProduct">
                <Form.Label>Total Product</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProduct?.totalProduct || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, totalProduct: e.target.value })}
                  placeholder="Enter total product"
                />
              </Form.Group>
              <Form.Group controlId="productPrice">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProduct?.price || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                  placeholder="Enter product price"
                />
              </Form.Group>
              <Form.Group controlId="productDescription">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={selectedProduct?.description || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                  rows={3}
                  placeholder="Enter product description"
                />
              </Form.Group>
              {/* Add more fields as necessary */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditProductModal(false)}>Close</Button>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AddProduct;