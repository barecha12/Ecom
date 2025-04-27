import React, { useState, useEffect } from "react";
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
import { ToastContainer, toast } from 'react-toastify';
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const totalProducts = 100; // Example total product count
  const totalPages = Math.ceil(totalProducts / entries);
  const [selectedFilesCount, setSelectedFilesCount] = useState(0);
  const [productlist, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditProductModal, setShowEditProductModal] = useState(false);


  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [productData, setProductData] = useState({
    product_name: "",
    total_product: "",
    product_price: "",
    product_desc: "",
    product_img1: null,
    product_img2: null,
    product_img3: null,
    product_img4: null,
    product_img5: null,
  });

  // Load categories
  useEffect(() => {
    fetch("http://localhost:8000/api/get-categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  const [selectedImages, setSelectedImages] = useState([]);
  // Load subcategories when a category selected
  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:8000/api/get-subcategories-by-category/${selectedCategory}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => setSubcategories(data))
        .catch((err) => console.error("Error loading subcategories:", err));
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProductData((prev) => ({ ...prev, [name]: files[0] }));
  };
  
  const handleFileChangeEdit = (e) => {
    const { name, files } = e.target;
    const file = files[0]; // Get the first file
  
    setSelectedImages((prev) => {
      const newImages = [...prev];
      if (name === 'product_img1') newImages[0] = file;
      if (name === 'product_img2') newImages[1] = file;
      if (name === 'product_img3') newImages[2] = file;
      if (name === 'product_img4') newImages[3] = file;
      if (name === 'product_img5') newImages[4] = file;
      return newImages;
    });
  
  
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const vendorInfo = JSON.parse(localStorage.getItem("user-info")); //  get vendor info
    const vendor_id = vendorInfo?.vendor_id;

    if (!vendor_id) {
      alert("Vendor ID not found. Please login again.");
      return;
    }

    const formData = new FormData();
    formData.append("product_name", productData.product_name);
    formData.append("total_product", productData.total_product);
    formData.append("product_price", productData.product_price);
    formData.append("product_desc", productData.product_desc);
    formData.append("vendor_id", vendor_id); // important
    formData.append("category_id", selectedCategory);
    formData.append("sub_category_id", selectedSubCategory);
    formData.append("product_img1", productData.product_img1);

    // Optional images (can be null)
    if (productData.product_img2) formData.append("product_img2", productData.product_img2);
    if (productData.product_img3) formData.append("product_img3", productData.product_img3);
    if (productData.product_img4) formData.append("product_img4", productData.product_img4);
    if (productData.product_img5) formData.append("product_img5", productData.product_img5);

    try {
      console.log("Submitting product data:", productData);
      console.log("Submitting formData:", formData);

      const res = await fetch("http://localhost:8000/api/vendor/addproduct", {
        method: "POST",
        body: formData,
      });
      console.log("Response status:");
      const result = await res.json();
      console.log("Response from server:", result);



      if (result.status === "success") {
        toast.success("Product added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        setProductData({
          product_name: "",
          total_product: "",
          product_price: "",
          product_desc: "",
          product_img1: null,
          product_img2: null,
          product_img3: null,
          product_img4: null,
          product_img5: null,
        });
        setSelectedCategory("");
        setSelectedSubCategory("");
      } else {
        toast.error("Failed to add product!");
      }
    } catch (err) {
      toast.error("An error occurred. Try again.");
    }
  };


  const openEditProductModal = (product) => {
    setSelectedProduct({
      id: product.product_id,
      name: product.product_name,
      totalProduct: product.total_product,
      price: product.product_price,
      description: product.product_desc,
    });
    setSelectedCategory(product.category_id); // Set the selected category
    setSelectedSubCategory(product.sub_category_id); // Set the selected subcategory
    setShowEditProductModal(true);
  
    // Optionally fetch subcategories if needed
    fetchSubcategories(product.category_id);
  };

  const handleDeleteClick = (productId) => {
    setProductToDelete(productId); // Set the product ID to be deleted
    setShowDeleteModal(true); // Show the confirmation modal
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
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


  const addProduct = (e) => {
    e.preventDefault();
    const newProduct = { category, subCategory, productName, totalProduct, productPrice, productDescription, productImages };
    console.log("Product Added:", newProduct);
    handleCloseAddProductModal();
  };


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

  useEffect(() => {
    async function listProductDetail() {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user-info"));
        const vendorId = storedUser?.vendor_id;

        let response = await fetch(`http://localhost:8000/api/vendor/productlist`, {
          method: 'POST',
          body: JSON.stringify({
            vendor_id: vendorId
          }),
          headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
          }
        });

        let result = await response.json();
        setProductList(result);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    listProductDetail();
  }, []);

  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/vendor/delete-product`, {
        method: 'DELETE',
        body: JSON.stringify({
          product_id: productToDelete,
        }),
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        }
      });

      if (response.ok) {
        toast.success("Product deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        // Update state to remove the deleted product from the list
        setProductList(productlist.filter(product => product.product_id !== productToDelete));
        handleCloseDeleteModal(); // Close the modal

      } else {
        toast.error("Failed to delete the product.");

      }
    } catch (error) {
      toast.error("Error while deleting product:", error);
    }
  };


 
  
  
  const handleEditProduct = async (e) => {
    e.preventDefault();
  
    const vendorInfo = JSON.parse(localStorage.getItem("user-info"));
    const vendor_id = vendorInfo?.vendor_id;
  
    if (!vendor_id) {
      alert("Vendor ID not found. Please login again.");
      return;
    }
  
    const formData = new FormData();
    formData.append("product_id", selectedProduct.id);
    formData.append("product_name", selectedProduct.name);
    formData.append("total_product", selectedProduct.totalProduct);
    formData.append("product_price", selectedProduct.price);
    formData.append("product_desc", selectedProduct.description);
    formData.append("vendor_id", vendor_id);
    formData.append("category_id", selectedCategory);
    formData.append("sub_category_id", selectedSubCategory);
  
    // Log the selected images
    selectedImages.forEach((image, index) => {
      if (image) {
        console.log(`Image ${index + 1}:`, image.name);
        formData.append(`product_img${index + 1}`, image);
      }
    });
  
    // Log FormData contents for debugging
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {
      const res = await fetch("http://localhost:8000/api/vendor/editproduct", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
  
      if (result.status === "success") {
        toast.success("Product updated successfully!");
  
        // Update local product list
        setProductList((prev) =>
          prev.map((product) =>
            product.product_id === selectedProduct.id ? { ...product, ...selectedProduct } : product
          )
        );
  
        handleCloseEditProductModal();
      } else {
        toast.error("Failed to update product.");
      }
    } catch (err) {
      console.error("Error while updating product:", err);
      toast.error("An error occurred. Please try again.");
    }
  };




  const fetchSubcategories = (categoryId) => {
    if (categoryId) {
      fetch(`http://localhost:8000/api/get-subcategories-by-category/${categoryId}`, {
        method: "POST",
      })
      .then((res) => res.json())
      .then((data) => setSubcategories(data))
      .catch((err) => console.error("Error loading subcategories:", err));
    } else {
      setSubcategories([]);
    }
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
                {productlist.map((product) => (


                  <Col xs={12} md={6} lg={3} key={product.product_id}>
                    <Card className="shadow-sm rounded-4 p-3 product-card-vendor">
                      <Image
                        src={`http://localhost:8000/storage/${product.product_img1}`}
                        alt={product.product_name}
                        fluid
                        rounded
                        className="mb-3"
                        style={{ height: "150px", objectFit: "contain" }} // Updated style
                      />

                      <h5 className="fw-bold">{product.product_name}</h5>
                      <p>Total Product: {product.total_product}</p>
                      <p>Product Price: {product.product_price}</p>
                      <p>Category: {product.category_name}</p>
                      <p>Subcategory: {product.sub_category_name}</p>
                      <div className="d-flex justify-content-between mt-3">
                        <Button variant="warning" size="sm" onClick={() => openEditProductModal(product)}>
                          <FaPen />
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDeleteClick(product.product_id)}>
                          <FaTimes />
                        </Button>

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
                  <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
                    <option value="">Select a Category</option>
                    {categories.map((cat) => (
                      <option key={cat.category_id} value={cat.category_id}>
                        {cat.category_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Subcategory based on Category selection */}
                <Form.Group controlId="subCategory">
                  <Form.Label>Select Subcategory</Form.Label>
                  <Form.Select value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.target.value)} required>
                    <option value="">Select a Subcategory</option>
                    {subcategories.map((sub) => (
                      <option key={sub.sub_category_id} value={sub.sub_category_id}>
                        {sub.sub_category_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>


                <Form.Group controlId="productName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control type="text"
                    name="product_name"
                    value={productData.product_name}
                    onChange={handleInputChange}
                    required placeholder="Enter product name" />
                </Form.Group>


                <Form.Group controlId="totalProduct">
                  <Form.Label>Total Product</Form.Label>
                  <Form.Control type="number"
                    name="total_product"
                    value={productData.total_product}
                    onChange={handleInputChange}
                    required placeholder="Enter total product" />
                </Form.Group>





                <Form.Group controlId="productPrice">
                  <Form.Label>Product Price</Form.Label>
                  <Form.Control type="number"
                    name="product_price"
                    value={productData.product_price}
                    onChange={handleInputChange}
                    required placeholder="Enter product price" />
                </Form.Group>


                <Form.Group controlId="productDescription">
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control as="textarea" name="product_desc"
                    value={productData.product_desc}
                    onChange={handleInputChange}
                    required rows={3} placeholder="Enter product description" />
                </Form.Group>


                <Form.Group controlId="selectedproductImages">
                  <Form.Label>Product Images (Max 5)</Form.Label>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <input
                      key={i}
                      type="file"
                      name={`product_img${i}`}
                      onChange={handleFileChange}
                      accept="image/*"
                      required={i === 1}
                    />
                  ))}
                </Form.Group>
              </Form>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddProductModal}>Close</Button>
              <Button variant="primary" onClick={handleSubmit}>Save Product</Button>
            </Modal.Footer>
          </Modal>
        </Container>






        <Modal show={showEditProductModal} onHide={handleCloseEditProductModal} centered>
  <Modal.Header closeButton>
    <Modal.Title>Edit Product</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form >
      <Form.Group controlId="category">
        <Form.Label>Select Category</Form.Label>
        <Form.Select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            // Optional: Fetch subcategories based on the selected category
          }}
          required
        >
          <option value="">Select a Category</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.category_name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="subCategory">
        <Form.Label>Select Subcategory</Form.Label>
        <Form.Select
          value={selectedSubCategory}
          onChange={(e) => setSelectedSubCategory(e.target.value)}
          required
        >
          <option value="">Select a Subcategory</option>
          {subcategories.map((sub) => (
            <option key={sub.sub_category_id} value={sub.sub_category_id}>
              {sub.sub_category_name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="productName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          value={selectedProduct?.name || ""}
          onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
          placeholder="Enter product name"
          required
        />
      </Form.Group>

      <Form.Group controlId="totalProduct">
        <Form.Label>Total Product</Form.Label>
        <Form.Control
          type="number"
          value={selectedProduct?.totalProduct || ""}
          onChange={(e) => setSelectedProduct({ ...selectedProduct, totalProduct: e.target.value })}
          placeholder="Enter total product"
          required
        />
      </Form.Group>

      <Form.Group controlId="productPrice">
        <Form.Label>Product Price</Form.Label>
        <Form.Control
          type="number"
          value={selectedProduct?.price || ""}
          onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
          placeholder="Enter product price"
          required
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
          required
        />
      </Form.Group>

      {/* Optionally add file upload fields for images */}
      <Form.Group controlId="selectedproductImages">
  <Form.Label>Product Images (Max 5)</Form.Label>
  {[1, 2, 3, 4, 5].map((i) => (
    <input
      key={i}
      type="file"
      name={`product_img${i}`}
      onChange={handleFileChangeEdit} // Use the edit handler
      accept="image/*"
      // You can make these optional or required based on your needs
    />
  ))}
</Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseEditProductModal}>Close</Button>
    <Button variant="primary" onClick={handleEditProduct} >Save Changes</Button>
  </Modal.Footer>
</Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this product?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>No</Button>
            <Button variant="danger" onClick={handleDeleteProduct}>Yes, Delete</Button>
          </Modal.Footer>
        </Modal>

        <ToastContainer />
      </div>
    </div>
  );
}

export default AddProduct;


