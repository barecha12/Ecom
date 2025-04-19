
import React, { useState } from "react";
import {
  FaBars,
  FaChartLine,
  FaBox,
  FaShoppingCart,
  FaComments,
  FaUser,
} from "react-icons/fa";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "../style/manage-profile.css";

function ManageProfile() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // Sample product data (you can replace this with dynamic data later)
  const products = [
    { id: 1, name: "Product A", code: "A123", color: "Red", category: "Electronics", section: "New Arrivals", addedBy: "Admin", status: "Active" },
    { id: 2, name: "Product B", code: "B456", color: "Blue", category: "Fashion", section: "Sale", addedBy: "Admin", status: "Inactive" },
    { id: 3, name: "Product C", code: "C789", color: "Green", category: "Home", section: "Featured", addedBy: "Vendor 1", status: "Active" },
    // Add more products here
  ];

  return (
    <div className="dashboard-wrapper">
      {/* Hamburger Button */}
      <button className="hamburger-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Sidebar */}
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

      {/* Main Content */}
      <div className={`main-content ${sidebarVisible ? "with-sidebar" : "full-width"}`}>
        <div className="custom-header text-center">
          <h1 className="h4 mb-0">Update Your Password</h1>
        </div>

        <div className="p-0">
          <h2 className="mb-3">Change Password</h2>
          <p>Please enter your current password and choose a new one.</p>

          <form className="update-password-form mt-4">
            <div className="form-group mb-3 text-start">
              <label htmlFor="currentPassword" className="form-label">Current Password</label>
              <input type="password" id="currentPassword" className="form-control" placeholder="Enter current password" />
            </div>

            <div className="form-group mb-3 text-start">
              <label htmlFor="newPassword" className="form-label">New Password</label>
              <input type="password" id="newPassword" className="form-control" placeholder="Enter new password" />
            </div>

            <div className="form-group mb-4 text-start">
              <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
              <input type="password" id="confirmPassword" className="form-control" placeholder="Confirm new password" />
            </div>

            <button type="submit" className="btn btn-primary">Update Password</button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default ManageProfile;