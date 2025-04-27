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
} from "react-icons/fa";
import "./testone.css";

function TestOne() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddSubCategoryModal, setShowAddSubCategoryModal] = useState(false);
  
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const categories = ["Electronics", "Furniture", "Clothing"]; // Sample categories

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (categoryName === "" || description === "") {
      setError("Please fill in all fields.");
    } else {
      const newCategory = { categoryName, description };
      console.log("Category Added:", newCategory);
      handleCloseAddCategoryModal();
    }
  };

  const handleAddSubCategory = (e) => {
    e.preventDefault();
    if (subCategoryName === "" || description === "" || categoryName === "") {
      setError("Please fill in all fields.");
    } else {
      const newSubCategory = { categoryName, subCategoryName, description };
      console.log("Sub Category Added:", newSubCategory);
      handleCloseAddSubCategoryModal();
    }
  };

  const handleCloseAddCategoryModal = () => {
    setShowAddCategoryModal(false);
    setCategoryName("");
    setDescription("");
    setError("");
  };

  const handleCloseAddSubCategoryModal = () => {
    setShowAddSubCategoryModal(false);
    setSubCategoryName("");
    setDescription("");
    setError("");
    setCategoryName(""); // Reset selected category
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
          <div className="admin-custom-link" onClick={() => handleDropdown("catalog management")}>
            <FaThList className="me-2" /> Catalog Management
          </div>
          {openDropdown === "catalog management" && (
            <ul className="dropdown-menu admin-custom-dropdown-menu">
              <li>
                <a href="#" className="dropdown-item-admin" onClick={() => setShowAddCategoryModal(true)}>
                  Add Categories
                </a>
              </li>
              <li>
                <a href="#" className="dropdown-item-admin" onClick={() => setShowAddSubCategoryModal(true)}>
                  Add Sub Categories
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className={`admin-main-content ${sidebarVisible ? "with-sidebar" : "full-width"}`}>
        <div className="admin-custom-header text-center">
          <h1 className="h4 mb-0">Welcome to Super Admin Dashboard</h1>
        </div>

        {/* Add Category Modal */}
        {showAddCategoryModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">Add Category</h2>
                <span className="modal-close" onClick={handleCloseAddCategoryModal}>&times;</span>
              </div>
              {error && <div className="alert-superadmin">{error}</div>}
              <form onSubmit={handleAddCategory} className="category-form">
                <div className="form-group">
                  <label>Category Name</label>
                  <input
                    type="text"
                    className="form-control-superadmin"
                    placeholder="Enter category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>

                <button className="btn-superadmin" type="submit">
                  Add Category
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Add Sub Category Modal */}
        {showAddSubCategoryModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">Add Sub Category</h2>
                <span className="modal-close" onClick={handleCloseAddSubCategoryModal}>&times;</span>
              </div>
              {error && <div className="alert-superadmin">{error}</div>}
              <form onSubmit={handleAddSubCategory} className="category-form">
                <div className="form-group">
                  <label>Select Category</label>
                  <select
                    className="form-control-superadmin"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  >
                    <option value="">-- Select a Category --</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Sub Category Name</label>
                  <input
                    type="text"
                    className="form-control-superadmin"
                    placeholder="Enter sub category name"
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                  />
                </div>



                <button className="btn-superadmin" type="submit">
                  Add Sub Category
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestOne;