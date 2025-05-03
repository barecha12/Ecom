import React, { useState } from "react";
import {
  FaBars,
  FaChartLine,
  FaStore,
  FaUsers,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../style/update-password.css";

function UpdatePassword() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const userInfo = JSON.parse(localStorage.getItem("admin-info"));
    const admin_id = userInfo?.admin_id;

    const payload = {
      admin_id: admin_id,
      current_password: currentPassword,
      new_password: newPassword,
      password_confirmation: confirmPassword, // Laravel expects this key
    };

    try {
      console.log("Payload:", payload); // Debug line

      const response = await fetch("http://localhost:8000/api/admin/updatepassword", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json',
        },
      });

      const result = await response.json();
      console.log("Response:", result); // Debug line
      if (result.success) {
        toast.success("Password updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate("/admin/");
        }, 1000);
      } else {
        toast.error(result.message || "Failed to update password. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }

    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("An error occurred. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
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
      navigate("/admin/login");
    }, 1000);
  }

  return (
    <div className="admin-dashboard-wrapper">
      <button className="admin-hamburger-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <div className={`admin-custom-sidebar ${sidebarVisible ? "show" : "hide"}`}>
        <div className="d-flex align-items-center mb-3">
          <h2 className="text-center admin-custom-css flex-grow-1 mt-2 ms-4">Admin Dashboard</h2>
        </div>

        <a href="/admin/" className="admin-custom-link">
          <FaChartLine className="me-2" /> Dashboard
        </a>

        <div className="dropdown">
          <div className="admin-custom-link" onClick={() => handleDropdown("products")}>
            <FaUsers className="me-2" /> User Management
          </div>
          {openDropdown === "products" && (
            <ul className="dropdown-menu admin-custom-dropdown-menu">
              <li><a href="/admin/list-users" className="dropdown-item-admin">List Users</a></li>
              <li><a href="/admin/user-messages" className="dropdown-item-admin">User Messages</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown">
          <div className="admin-custom-link" onClick={() => handleDropdown("orders")}>
            <FaStore className="me-2" /> Vendor Management
          </div>
          {openDropdown === "orders" && (
            <ul className="dropdown-menu admin-custom-dropdown-menu">
              <li><a href="/admin/new-vendors" className="dropdown-item-admin">New Vendors</a></li>
              <li><a href="/admin/list-vendors" className="dropdown-item-admin">List of Vendors</a></li>
              <li><a href="/admin/manage-products" className="dropdown-item-admin">Manage Products</a></li>
              <li><a href="/admin/manage-orders" className="dropdown-item-admin">Manage Orders</a></li>
              <li><a href="/admin/approve-payout" className="dropdown-item-admin">Approve Payout</a></li>
              <li><a href="/admin/vendor-messages" className="dropdown-item-admin">Vendor Messages</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown">
          <div className="admin-custom-link" onClick={() => handleDropdown("profile")}>
            <FaUser className="me-2" /> Profile
          </div>
          {openDropdown === "profile" && (
            <ul className="dropdown-menu admin-custom-dropdown-menu">
              <li><a href="/admin/manage-password" className="dropdown-item-admin">Update Password</a></li>
              <li><a onClick={logout} className="dropdown-item-admin">Logout</a></li>
            </ul>
          )}
        </div>
      </div>

      <div className={`admin-main-content ${sidebarVisible ? "with-sidebar" : "full-width"}`}>
        <div className="admin-custom-header text-center">
          <h1 className="h4 mb-0">Update Password</h1>
        </div>

        <div className="outer-container" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="update-password-container" style={{ width: '1000px' }}>
            <h2>Update Password</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit">Update Password</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UpdatePassword;
