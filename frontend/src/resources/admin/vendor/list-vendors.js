import React, { useState } from "react";
import {
  FaBars,
  FaChartLine,
  FaStore,
  FaUsers,
  FaUser,
} from "react-icons/fa";
import {
  Row,
  Col,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../style/list-vendors.css";

function ListVendor() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userStatus, setUserStatus] = useState("Active");
  const navigate = useNavigate();


  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const handleDropdown = (menu) => setOpenDropdown(openDropdown === menu ? null : menu);
  const handleEntriesChange = (newEntries) => {
    setEntries(newEntries);
    setCurrentPage(1);
  };
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "Active" },
    { id: 4, name: "Bob Brown", email: "bob@example.com", status: "Inactive" },
    // Add more users as needed
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredUsers.length / entries);
  const indexOfLastUser = currentPage * entries;
  const indexOfFirstUser = indexOfLastUser - entries;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

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
        }, 1000); // Delay the navigation for 3 seconds
      }

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

      <div className={`main-content ${sidebarVisible ? "with-sidebar" : "full-width"}`}>
        <div className="custom-header text-center">
          <h1 className="h4 mb-0">Vendor List</h1>
        </div>

        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <Row className="mb-3 d-flex justify-content-between align-items-center">
            <Col xs="auto" className="d-flex align-items-center">
              <label className="me-2">Show</label>
              <Form.Select
                value={entries}
                onChange={(e) => handleEntriesChange(Number(e.target.value))}
                style={{ width: '100px' }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Form.Select>
              <label className="ms-2">Entries</label>
            </Col>

            <Col xs="auto" className="d-flex align-items-center mt-3 mt-sm-0">
              <label className="me-2">Search:</label>
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                style={{ width: '150px' }}
              />
            </Col>
          </Row>
        </div>

        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          <div style={{ height: '440px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f9f9f9' }}>
            <div style={{ overflowY: 'auto', height: 'calc(100% - 60px)', padding: '1rem' }}>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <div
                    key={user.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1rem',
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                      marginBottom: '10px'
                    }}
                  >
                    <div>
                      <h5 style={{ margin: 0 }}>{user.name}</h5>
                      <p style={{ margin: 0, color: '#666' }}>{user.email}</p>
                    </div>
                    <div>
                      <span
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          backgroundColor: user.status === 'Active' ? '#d4edda' : '#f8d7da',
                          color: user.status === 'Active' ? '#155724' : '#721c24',
                          marginRight: '1rem'
                        }}
                      >
                        {user.status}
                      </span>
                      <Button variant="primary" size="sm" onClick={() => {
                        setSelectedUserId(user.id);
                        setUserStatus(user.status);
                        setShowEditModal(true);
                      }}>Edit</Button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No users found.</p>
              )}
            </div>

            {/* Pagination Controls */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '60px',
                backgroundColor: '#fff',
                borderTop: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 1rem'
              }}
            >
              <Button variant="secondary" onClick={handlePrevious} disabled={currentPage === 1}>
                Previous
              </Button>
              <div>
                Page {currentPage} of {totalPages}
              </div>
              <Button variant="secondary" onClick={handleNext} disabled={currentPage === totalPages || totalPages === 0}>
                Next
              </Button>
            </div>
          </div>
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

export default ListVendor;