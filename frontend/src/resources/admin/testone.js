import React, { useState } from "react";
import {
  FaBars,
  FaChartLine,
  FaStore,
  FaShoppingCart,
  FaUsers,
  FaUser,
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
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./testone.css";

function TestOne() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [totalProduct, setTotalProduct] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState({ selectedproductImages: [] });
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalProducts = 100; // Example total product count
  const totalPages = Math.ceil(totalProducts / entries);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === "selectedproductImages") {
      setProductImages({
        ...productImages,
        selectedproductImages: Array.from(files).slice(0, 5)
      });
    }
  };

  const addProduct = (e) => {
    e.preventDefault();
    const newProduct = { category, productName, totalProduct, productPrice, productDescription, productImages };
    console.log("Product Added:", newProduct);
    handleCloseAddProductModal();
  };

  const handleCloseAddProductModal = () => {
    setShowAddProductModal(false);
    setCategory("");
    setProductName("");
    setTotalProduct("");
    setProductPrice("");
    setProductDescription("");
    setProductImages({ selectedproductImages: [] });
  };

  const handleEdit = (userId) => {
    console.log("Edit user with ID:", userId);
    // Implement edit logic here
  };

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Inactive" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Active" },
    { id: 4, name: "Bob Brown", email: "bob@example.com", role: "Inactive" },
  ];

  return (
    <div className="dashboard-wrapper">
       <button className="admin-hamburger-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <div className={`admin-custom-sidebar ${sidebarVisible ? "show" : "hide"}`}>
        <div className="d-flex align-items-center mb-3">
          <h2 className="text-center admin-custom-css flex-grow-1 mt-2 ms-4">Admin Dashboard</h2>
        </div>

        <a href="#analytics" className="admin-custom-link">
          <FaChartLine className="me-2" /> Dashboard
        </a>

        <div className="dropdown">
          <div className="admin-custom-link" onClick={() => handleDropdown("products")}>
            <FaUsers className="me-2" /> User Management
          </div>
          {openDropdown === "products" && (
            <ul className="dropdown-menu admin-custom-dropdown-menu">
              <li><a href="#add-products" className="dropdown-item-admin">List Users</a></li>
              <li><a href="#add-coupons" className="dropdown-item-admin">User Messages</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown">
          <div className="admin-custom-link" onClick={() => handleDropdown("orders")}>
            <FaStore className="me-2" /> Vendor Management
          </div>
          {openDropdown === "orders" && (
            <ul className="dropdown-menu admin-custom-dropdown-menu">
              <li><a href="#new-order" className="dropdown-item-admin">List of Vendors</a></li>
              <li><a href="#shipped" className="dropdown-item-admin">Manage Products</a></li>
              <li><a href="#refund" className="dropdown-item-admin">Manage Orders</a></li>
              <li><a href="#completed" className="dropdown-item-admin">Approve Payout</a></li>
              <li><a href="#completed" className="dropdown-item-admin">Vendor Messages</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown">
          <div className="admin-custom-link" onClick={() => handleDropdown("profile")}>
            <FaUser className="me-2" /> Profile
          </div>
          {openDropdown === "profile" && (
            <ul className="dropdown-menu admin-custom-dropdown-menu">
              <li><a href="#updated-password" className="dropdown-item-admin">Updated Password</a></li>
              <li><a href="#logout" className="dropdown-item-admin">Logout</a></li>
            </ul>
          )}
        </div>
      </div>

      <div className={`main-content ${sidebarVisible ? "with-sidebar" : "full-width"}`}>
        <div className="custom-header text-center">
          <h1 className="h4 mb-0">User List</h1>
        </div>

        {/* User List Table */}
        <div className="user-list">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <button className="search-button">Search</button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th> {/* Changed from Role to Status */}
                <th>Actions</th> {/* Added Actions column for Edit button */}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td> {/* This can be renamed to user.status if you have a status field */}
                  <td>
                    <Button variant="primary" onClick={() => handleEdit(user.id)}>Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default TestOne;