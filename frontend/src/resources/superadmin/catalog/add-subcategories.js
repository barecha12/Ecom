import React, { useState } from "react";
import { FaBars, FaChartLine, FaStore, FaThList, FaUsers, FaUser, FaUserShield, FaTools, FaEdit, FaTrash, } from "react-icons/fa";
import { Button, Modal, Form, ListGroup, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../style/add-subcategory.css";

function AddSubCategory() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showAddSubcategoryModal, setShowAddSubcategoryModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showEditSubcategoryModal, setShowEditSubcategoryModal] = useState(false);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategoryToEdit, setSubcategoryToEdit] = useState(null);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState(null);
  const navigate = useNavigate();

  const categories = ["Electronics", "Furniture", "Clothing"];
  const [subcategories, setSubcategories] = useState([]);

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const handleDropdown = (menu) => setOpenDropdown(openDropdown === menu ? null : menu);

  const handleAddSubcategory = () => {
    if (subcategoryName.trim() && selectedCategory) {
      setSubcategories([...subcategories, { name: subcategoryName.trim(), category: selectedCategory }]);
      setSubcategoryName("");
      setSelectedCategory("");
      setShowAddSubcategoryModal(false);
    }
  };

  const handleDeleteSubcategory = () => {
    setSubcategories(subcategories.filter((_, i) => i !== subcategoryToDelete));
    setShowConfirmDeleteModal(false);
    setSubcategoryToDelete(null);
  };

  const handleEditSubcategory = () => {
    if (subcategoryToEdit !== null && subcategoryName.trim() && selectedCategory) {
      const updated = [...subcategories];
      updated[subcategoryToEdit] = { name: subcategoryName.trim(), category: selectedCategory };
      setSubcategories(updated);
      setShowEditSubcategoryModal(false);
      setSubcategoryName("");
      setSelectedCategory("");
      setSubcategoryToEdit(null);
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

        <a href="/superadmin/dashboard" className="admin-custom-link">
          <FaChartLine className="me-2" /> Dashboard
        </a>

        <div className="dropdown">
          <div className="admin-custom-link" onClick={() => handleDropdown("products")}>
            <FaUsers className="me-2" /> User Management
          </div>
          {openDropdown === "products" && (
            <ul className="dropdown-menu admin-custom-dropdown-menu">
              <li><a href="/superadmin/list-users" className="dropdown-item-admin">List Users</a></li>
              <li><a href="/superadmin/user-messages" className="dropdown-item-admin">User Messages</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown">
          <div className="admin-custom-link" onClick={() => handleDropdown("orders")}>
            <FaStore className="me-2" /> Vendor Management
          </div>
          {openDropdown === "orders" && (
            <ul className="dropdown-menu admin-custom-dropdown-menu">
              <li><a href="/superadmin/new-Vendors" className="dropdown-item-admin">New Vendors</a></li>
              <li><a href="/superadmin/list-vendors" className="dropdown-item-admin">List of Vendors</a></li>
              <li><a href="/superadmin/manage-products" className="dropdown-item-admin">Manage Products</a></li>
              <li><a href="/superadmin/manage-orders" className="dropdown-item-admin">Manage Orders</a></li>
              <li><a href="/superadmin/approve-payout" className="dropdown-item-admin">Approve Payout</a></li>
              <li><a href="/superadmin/vendor-messages" className="dropdown-item-admin">Vendor Messages</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown">
          <div className="admin-custom-link" onClick={() => handleDropdown("admin management")}>
            <FaUserShield className="me-2" /> Admin Management
          </div>
          {openDropdown === "admin management" && (
            <ul className="dropdown-menu admin-custom-dropdown-menu">
              <li><a href="/superadmin/list-admins" className="dropdown-item-admin">List of Admins</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown">
          <div className="admin-custom-link" onClick={() => handleDropdown("catalog management")}>
            <FaThList className="me-2" /> Catalog Management
          </div>
          {openDropdown === "catalog management" && (
            <ul className="dropdown-menu admin-custom-dropdown-menu">
              <li><a href="/superadmin/add-category" className="dropdown-item-admin">Add Categories</a></li>
              <li><a href="/superadmin/add-subcategory" className="dropdown-item-admin">Sub Categories</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown">
          <div className="admin-custom-link" onClick={() => handleDropdown("platform management")}>
            <FaTools className="me-2" /> Platform Management
          </div>
          {openDropdown === "platform management" && (
            <ul className="dropdown-menu admin-custom-dropdown-menu">
              <li><a href="/superadmin/add-banner" className="dropdown-item-admin">List Banner</a></li>
              <li><a href="/superadmin/add-payment" className="dropdown-item-admin">Payment Method</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown">
          <div className="admin-custom-link" onClick={() => handleDropdown("profile")}>
            <FaUser className="me-2" /> Profile
          </div>
          {openDropdown === "profile" && (
            <ul className="dropdown-menu admin-custom-dropdown-menu">
              <li><a href="/superadmin/manage-profile" className="dropdown-item-admin">Manage Profile</a></li>
              <li><a onClick={logout} className="dropdown-item-admin">Logout</a></li>
            </ul>
          )}
        </div>
      </div>

      <div className={`admin-main-content ${sidebarVisible ? "with-sidebar" : "full-width"}`}>
        <div className="admin-custom-header text-center">
          <h1 className="h4 mb-0">Welcome to Super Admin Dashboard</h1>
        </div>

        <div className="admin-category-container">
          <Button
            variant="primary"
            className="my-3"
            onClick={() => setShowAddSubcategoryModal(true)}
            style={{ float: "right" }}
          >
            Add Subcategory
          </Button>

          {/* Add Subcategory Modal */}
          <Modal show={showAddSubcategoryModal} onHide={() => setShowAddSubcategoryModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add Subcategory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Select Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat, i) => (
                      <option key={i} value={cat}>{cat}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Subcategory Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={subcategoryName}
                    onChange={(e) => setSubcategoryName(e.target.value)}
                    placeholder="Enter subcategory name"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowAddSubcategoryModal(false)}>Close</Button>
              <Button variant="primary" onClick={handleAddSubcategory}>Add Subcategory</Button>
            </Modal.Footer>
          </Modal>

          {/* Edit Subcategory Modal */}
          <Modal show={showEditSubcategoryModal} onHide={() => setShowEditSubcategoryModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Subcategory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Select Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat, i) => (
                      <option key={i} value={cat}>{cat}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Subcategory Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={subcategoryName}
                    onChange={(e) => setSubcategoryName(e.target.value)}
                    placeholder="Edit subcategory name"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditSubcategoryModal(false)}>Close</Button>
              <Button variant="primary" onClick={handleEditSubcategory}>Save Changes</Button>
            </Modal.Footer>
          </Modal>

          {/* Confirm Delete Modal */}
          <Modal show={showConfirmDeleteModal} onHide={() => setShowConfirmDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Subcategory</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this subcategory?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowConfirmDeleteModal(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleDeleteSubcategory}>Delete</Button>
            </Modal.Footer>
          </Modal>

          {/* Subcategory List */}
          <div className="category-list mt-4">
            <h3>Subcategories</h3>
            <ListGroup>
              {subcategories.map((sub, i) => (
                <ListGroup.Item key={i}>
                  <div>
                    <strong>{sub.name}</strong> <small className="text-muted">({sub.category})</small>
                  </div>
                  <div className="action-buttons">
                    <Button
                      variant="link"
                      onClick={() => {
                        setSubcategoryToEdit(i);
                        setSubcategoryName(sub.name);
                        setSelectedCategory(sub.category);
                        setShowEditSubcategoryModal(true);
                      }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSubcategoryToDelete(i);
                        setShowConfirmDeleteModal(true);
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddSubCategory;
