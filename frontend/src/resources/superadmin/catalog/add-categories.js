import React, { useState } from "react";
import {
  FaBars,
  FaChartLine,
  FaStore,
  FaThList,
  FaUsers,
  FaUser,
  FaUserShield,
  FaTools,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import {
  Button,
  Modal,
  Form,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/add-category.css";

function AddCategory() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState(["Electronics", "Furniture", "Clothing", "Books", "Toys"]);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleAddCategory = () => {
    if (categoryName) {
      setCategories([...categories, categoryName]);
      setCategoryName("");
      handleCloseAddCategoryModal();
    }
  };
  const handleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleDeleteCategory = () => {
    setCategories(categories.filter((_, index) => index !== categoryToDelete));
    setCategoryToDelete(null);
    handleCloseConfirmDeleteModal();
  };

  const handleEditCategory = () => {
    if (categoryToEdit !== null && categoryName) {
      const updatedCategories = categories.map((cat, index) =>
        index === categoryToEdit ? categoryName : cat
      );
      setCategories(updatedCategories);
      setCategoryName("");
      setCategoryToEdit(null);
      handleCloseEditCategoryModal();
    }
  };

  const handleCloseAddCategoryModal = () => {
    setShowAddCategoryModal(false);
    setCategoryName("");
  };

  const handleCloseConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false);
    setCategoryToDelete(null);
  };

  const handleCloseEditCategoryModal = () => {
    setShowEditCategoryModal(false);
    setCategoryName("");
    setCategoryToEdit(null);
  };

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
              <li><a href="/superadmin/list-users" className="dropdown-item-admin">List of Vendors</a></li>
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
              <li><a href="/superadmin/login" className="dropdown-item-admin">Logout</a></li>
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
            onClick={() => setShowAddCategoryModal(true)}
            style={{ float: 'right' }}
          >
            Add Category
          </Button>

          <Modal show={showAddCategoryModal} onHide={handleCloseAddCategoryModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formCategoryName">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddCategoryModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleAddCategory}>
                Add Category
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showEditCategoryModal} onHide={handleCloseEditCategoryModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formEditCategoryName">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Edit category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditCategoryModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleEditCategory}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showConfirmDeleteModal} onHide={handleCloseConfirmDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to delete this category?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseConfirmDeleteModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteCategory}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>


          <div className="category-list mt-4">
            <h3>Added Categories</h3>
            <ListGroup>
              {categories.map((category, index) => (
                <ListGroup.Item key={index}>
                  <span>{category}</span>
                  <div className="action-buttons">
                    <Button
                      variant="link"
                      onClick={() => {
                        setCategoryToEdit(index);
                        setCategoryName(category);
                        setShowEditCategoryModal(true);
                      }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => {
                        setCategoryToDelete(index);
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
    </div>
  );
}

export default AddCategory;