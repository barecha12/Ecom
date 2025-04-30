import React, { useState } from "react";
import {
  FaBars,
  FaChartLine,
  FaStore,
  FaUsers,
  FaUser,
} from "react-icons/fa";
import {
  Button,
  Modal,
  Form,
  Table,
} from "react-bootstrap";
import { toast } from "react-toastify";
import "./list-user.css";

function ListUsers() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userStatus, setUserStatus] = useState('Active'); // Default status

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Inactive" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Active" },
    { id: 4, name: "Bob Brown", email: "bob@example.com", role: "Inactive" },
  ];

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleEdit = (userId) => {
    setSelectedUserId(userId);
    setShowEditModal(true);
  };

  const changeUserStatus = async () => {
    const payload = {
      userId: selectedUserId,
      status: userStatus,
    };
  
    try {
      console.warn("Payload:", payload); // Log the payload for debugging
      let response = await fetch("http://localhost:8000/api/userstatuschange", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json',
        },
      });
  
      let result = await response.json();
      if (result.success) {
        toast.success("User status updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setShowEditModal(false); // Close the modal after successful update
      } else {
        toast.error("Failed to update status. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    }
  };

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
              <li><a href="#list-users" className="dropdown-item-admin">List Users</a></li>
              <li><a href="#user-messages" className="dropdown-item-admin">User Messages</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown">
          <div className="admin-custom-link" onClick={() => handleDropdown("vendor")}>
            <FaStore className="me-2" /> Vendor Management
          </div>
          {openDropdown === "vendor" && (
            <ul className="dropdown-menu admin-custom-dropdown-menu">
              <li><a href="#list-vendors" className="dropdown-item-admin">List of Vendors</a></li>
              <li><a href="#manage-products" className="dropdown-item-admin">Manage Products</a></li>
              <li><a href="#manage-orders" className="dropdown-item-admin">Manage Orders</a></li>
              <li><a href="#approve-payout" className="dropdown-item-admin">Approve Payout</a></li>
              <li><a href="#vendor-messages" className="dropdown-item-admin">Vendor Messages</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown">
          <div className="admin-custom-link" onClick={() => handleDropdown("profile")}>
            <FaUser className="me-2" /> Profile
          </div>
          {openDropdown === "profile" && (
            <ul className="dropdown-menu admin-custom-dropdown-menu">
              <li><a href="#update-password" className="dropdown-item-admin">Update Password</a></li>
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleEdit(user.id)}>Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Edit User Status Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="userStatus">
              <Form.Label>Select Status</Form.Label>
              <Form.Control as="select" value={userStatus} onChange={(e) => setUserStatus(e.target.value)}>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={changeUserStatus}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListUsers;