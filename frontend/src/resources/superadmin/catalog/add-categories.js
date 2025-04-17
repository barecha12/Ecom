import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './category.css'; // Import your custom CSS here

const CategoryForm = () => {
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarHidden(!isSidebarHidden);
    };

    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f3f5f9' }}>
            <button className="hamburger btn btn-dark" onClick={toggleSidebar}>
                <i className="fas fa-bars"></i>
            </button>

            <div className={`sidebar ${isSidebarHidden ? 'hidden' : ''}`}>
                <h2 className="text-center">Vendor Dashboard</h2>
                <a href="#analytics"><i className="fas fa-chart-line"></i>Analytics</a>
                <div className="dropdown">
                    <a href="#products" className="dropdown-toggle"><i className="fas fa-box"></i>Manage Products</a>
                    <div className="dropdown-content">
                        <a href="#add-products">Add Products</a>
                        <a href="#add-coupons">Add Coupons</a>
                    </div>
                </div>
                <div className="dropdown">
                    <a href="#orders" className="dropdown-toggle"><i className="fas fa-shopping-cart"></i>Manage Orders</a>
                    <div className="dropdown-content">
                        <a href="#new-order">New Order</a>
                        <a href="#shipped">Shipped</a>
                        <a href="#refund">Refund</a>
                        <a href="#completed">Completed</a>
                    </div>
                </div>
                <div className="dropdown">
                    <a href="#messages" className="dropdown-toggle"><i className="fas fa-comments"></i>Manage Messages</a>
                    <div className="dropdown-content">
                        <a href="#user-message">User Message</a>
                        <a href="#admin-message">Admin Message</a>
                        <a href="#review-message">Review Message</a>
                        <a href="#notification">Notification</a>
                    </div>
                </div>
                <div className="dropdown">
                    <a href="#profile" className="dropdown-toggle"><i className="fas fa-user"></i>Profile</a>
                    <div className="dropdown-content">
                        <a href="#updated-password">Updated Password</a>
                        <a href="#logout">Logout</a>
                    </div>
                </div>
            </div>

            <div className={`content-wrapper ${isSidebarHidden ? 'ml-0' : 'ml-280'}`}>
                <div className="header bg-success text-white p-3 text-center">
                    <h1>Welcome to the Vendor Dashboard</h1>
                </div>
                <div className="main-content p-3">
                    <h2>Dashboard Overview</h2>
                    <p>This is where you can manage your products, view orders, and analyze your sales.</p>
                    <button className="btn btn-primary">View Products</button>
                </div>
            </div>
        </div>
    );
};

export default CategoryForm;