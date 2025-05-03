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
import "./testone.css";

function TestOne() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showAddSubcategoryModal, setShowAddSubcategoryModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showEditSubcategoryModal, setShowEditSubcategoryModal] = useState(false);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategoryToEdit, setSubcategoryToEdit] = useState(null);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState(null);

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

  return (
    <div className="admin-dashboard-wrapper">
      <button className="admin-hamburger-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <div className={`admin-custom-sidebar ${sidebarVisible ? "show" : "hide"}`}>
        {/* Sidebar content remains unchanged */}
        <h2 className="text-center admin-custom-css mt-2 mb-4">Admin Dashboard</h2>
        {/* Example dropdowns omitted for brevity */}
      </div>

      <div className={`admin-main-content ${sidebarVisible ? "with-sidebar" : "full-width"}`}>
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
    </div>
  );
}

export default TestOne;
