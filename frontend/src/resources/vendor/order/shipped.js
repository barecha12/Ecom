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

function ShippedItems() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const totalProducts = 100; // Example total product count
  const totalPages = Math.ceil(totalProducts / entries);

  const products = Array.from({ length: totalProducts }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    paymentMethod: `Chappa`,
    orderTime: "2025-04-18 14:32:10",
    image: "https://www.beyiddondolo.com/media/5679-84.jpg",
    status: "Shipped",
    address: "123 Vendor St, City, Country",
    phone:"0923746149",
    totalPaid: `$${(i + 1) * 10}`,
    orderedQuantity: i + 1,
  }));

  const displayedProducts = products.slice((currentPage - 1) * entries, currentPage * entries);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleDetailClick = (product) => {
    setSelectedProduct(product);
    setPopupVisible(true);
  };

  const handlePrint = () => {
    const printContent = `
      <h1>Order Details</h1>
      <p><strong>Address:</strong> ${selectedProduct.address}</p>
      <p><strong>Phone:</strong> ${selectedProduct.phone}</p>
      <p><strong>Total Paid:</strong> ${selectedProduct.totalPaid}</p>
      <p><strong>Ordered Quantity:</strong> ${selectedProduct.orderedQuantity}</p>
    `;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
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

      <div className={`main-content ${sidebarVisible ? "with-sidebar" : "full-width"}`}>
        <div className="custom-header text-center">
          <h1 className="h4 mb-0">Shipped Items</h1>
        </div>

        <div className="custom-table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Payment Method</th>
                <th>Order Time</th>
                <th>Status</th>
                <th>Buyer Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>
                    <img src={product.image} alt={product.name} className="product-image" />
                  </td>
                  <td>{product.paymentMethod}</td>
                  <td>{product.orderTime}</td>
                  <td>{product.status}</td>
                  <td>
                    <button className="see-detail" onClick={() => handleDetailClick(product)}>
                      See Detail
                    </button>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="edit-button">
                        <FaPen />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {popupVisible && selectedProduct && (
          <div className="popup">
            <div className="popup-content">
              <h2>Order Details</h2>
              <p><strong>Address:</strong> {selectedProduct.address}</p>
              <p><strong>Phone:</strong> {selectedProduct.phone}</p>
              <p><strong>Total Paid:</strong> {selectedProduct.totalPaid}</p>
              <p><strong>Ordered Quantity:</strong> {selectedProduct.orderedQuantity}</p>
              <button onClick={handlePrint}>Print as PDF</button>
              <button onClick={() => setPopupVisible(false)}>Close</button>
            </div>
          </div>
        )}

{totalPages > 1 && (
  <div className="pagination">
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(currentPage - 1)}
    >
      Previous
    </button>
    <span>Page {currentPage} of {totalPages}</span>
    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(currentPage + 1)}
    >
      Next
    </button>
  </div>
)}

      </div>
    </div>
  );
}

export default ShippedItems;