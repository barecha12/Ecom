import React, { useState, useEffect } from "react";
import { FaBars, FaChartLine, FaStore, FaThList, FaUsers, FaUser, FaUserShield, FaTools, FaEdit, FaTrash } from "react-icons/fa";
import { Button, Modal, Form, ListGroup } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../style/add-category.css";

function AddCategory() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [adminId, setAdminId] = useState(null);
  const navigate = useNavigate();
  const handleDropdown = (menu) => setOpenDropdown(openDropdown === menu ? null : menu);
  useEffect(() => {
    // Fetch admin_id from localStorage on component mount
    const fetchAdminId = () => {
      try {
        const adminInfo = localStorage.getItem("admin-info");
        if (adminInfo) {
          const parsed = JSON.parse(adminInfo);
          setAdminId(parsed.admin_id);
        }
      } catch (error) {
        console.error("Failed to parse admin-info from localStorage", error);
      }
    };

    fetchAdminId();
  }, []);

  useEffect(() => {
    if (adminId) {
      fetchCategories(); // Fetch categories when admin_id is available
    }
  }, [adminId]); // Trigger fetchCategories when adminId is set or changes

  const fetchCategories = async () => {
    if (!adminId) return;

    try {
      const response = await fetch("http://localhost:8000/api/get-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_id: adminId }),
      });

      const data = await response.json();
      if (data) {
        setCategories(data); // Set categories state if data is returned
      }
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };


  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };



  const handleAddCategory = async () => {
    if (!categoryName) return;

    try {
      const response = await fetch("http://localhost:8000/api/add-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admin_id: adminId,
          category_name: categoryName,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Category added successfully!");
        fetchCategories(); // Reload categories
        handleCloseAddCategoryModal();
      } else {
        toast.error("Failed to add category");
      }
    } catch (err) {
      toast.error("Failed to add category");
    }
  };

  const handleEditCategory = async () => {
    if (categoryToEdit === null || !categoryName) return;

    const categoryId = categories[categoryToEdit]?.category_id;

    if (!categoryId) {
      toast.error("Invalid category selected.");
      return;
    }

    try {
      // Send the update to the backend first
      const response = await fetch("http://localhost:8000/api/edit-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admin_id: adminId,
          category_id: categoryId,
          category_name: categoryName,
        }),
      });

      const data = await response.json();

      if (data) {
        toast.success("Category updated successfully!");

        // Only update UI after successful backend update
        const updatedCategory = categories.map((cat, index) =>
          index === categoryToEdit ? { ...cat, category_name: categoryName } : cat
        );
        setCategories(updatedCategory);

        fetchCategories(); // Refresh all categories (optional but better)
        handleCloseEditCategoryModal();
      } else {
        toast.error("Failed to update category");
      }
    } catch (err) {
      toast.error("Failed to update category");
      console.error(err);
    }
  };


  const handleDeleteCategory = async () => {
    if (categoryToDelete === null) return;

    try {
      // Send request to delete category
      const response = await fetch("http://localhost:8000/api/delete-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admin_id: adminId,
          category_id: categories[categoryToDelete].category_id,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Category deleted successfully!");
        fetchCategories(); // Reload categories
        handleCloseConfirmDeleteModal();
      } else {
        toast.error("Failed to delete category");
      }
    } catch (err) {
      toast.error("Failed to delete category");
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

  const logout = () => {
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
  };

  return (
    <div className="admin-dashboard-wrapper">
      <button className="admin-hamburger-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <div className={`admin-custom-sidebar ${sidebarVisible ? "show" : "hide"}`}>
        <div className="d-flex align-items-center mb-3">
          <h2 className="text-center admin-custom-css flex-grow-1 mt-2 ms-4">SAdmin Dashboard</h2>
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

          {/* Add Category Modal */}
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

          {/* Edit Category Modal */}
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

          {/* Confirm Delete Category Modal */}
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

          {/* Category List */}
          <div className="category-list mt-4">
            <h3>Added Categories</h3>
            <ListGroup>
              {categories.map((category, index) => (
                <ListGroup.Item key={index}>
                  <span>{category.category_name}</span>
                  <div className="action-buttons">
                    <Button
                      variant="link"
                      onClick={() => {
                        setCategoryToEdit(index);
                        setCategoryName(category.category_name);
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
        <ToastContainer />
      </div>
    </div>
  );
}

export default AddCategory;
