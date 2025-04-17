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
import { Link } from "react-router-dom";
import "../style/new-orders.css";

function ControlOrder() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalProducts = 100; // Example total product count
  const totalPages = Math.ceil(totalProducts / entries);

  const products = Array.from({ length: totalProducts }, (_, i) => ({
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

  const displayedProducts = products.slice((currentPage - 1) * entries, currentPage * entries);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
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
          <h1 className="h4 mb-0">Order Items</h1>
        </div>

        <div className="filters">
          <div className="show-entries">
            <label className="me-2">Show</label>
            <select value={entries} onChange={(e) => setEntries(Number(e.target.value))} className="entries-select">
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <label className="ms-2">Entries</label>
          </div>

          <div className="search-bar">
            <label className="me-2">Search:</label>
            <input type="text" placeholder="Search" className="search-input" />
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
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
                    <img src={product.image} alt={product.name} className="product-image" />
                  </td>
                  <td>{product.category}</td>
                  <td>{product.section}</td>
                  <td>{product.addedBy}</td>
                  <td>
                    <input type="checkbox" checked={product.status} readOnly />
                  </td>
                  <td>
                    <div className="actions">
                      <button className="edit-button">
                        <FaPen />
                      </button>
                      <button className="delete-button">
                        <FaTimes />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default ControlOrder;