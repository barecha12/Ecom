import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify';
import Translation from "../translations/lang.json";
import 'react-toastify/dist/ReactToastify.css';
import './styles/itemstyle.css'; // Custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css';


function OrderedItems() {
  const [isNavOpen, setNavOpen] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate
  const [orderditems, setOrderdItems] = useState([]);
  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };


  const fetchOrderdItems = async () => {
    const storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      let items = { user_id: parsedUser.user_id };

      try {
        let response = await fetch("http://localhost:8000/api/orderditems", {
          method: 'POST',
          body: JSON.stringify(items),
          headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
          }
        });

        let result = await response.json();
        console.warn("Fuck Order:", result);
        setOrderdItems(result.orderd_items || []);

      } catch (error) {
        toast.error('An error occurred. Please try again later.');
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchOrderdItems();
  }, []);





  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand text-warning" href="/">
            Dashboard
          </a>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNav}
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`${isNavOpen ? 'show' : 'collapse'} navbar-collapse`} id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <div className="search-bar d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search products..."
                  />
                  <button className="btn btn-warning ms-2">Search</button>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/cart">Cart</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/shippeditems">Shipped</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/refunditems">Refunded</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/completeditems">Completed</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="toppush container-fluid mt-5">
        <div className="bg-warning text-center p-4 rounded mb-4">
          <h1 className="text-dark">Your Ordered Items</h1>
        </div>

        {/* Ordered Items List */}
        <ul className="ordered-list list-unstyled">
          {
            orderditems.map((listorderitems) => (

              <li key={listorderitems.order_id} className="d-flex justify-content-between align-items-center mb-3">
                <div className="product-info d-flex align-items-center">
                  <img src={`http://localhost:8000/storage/${listorderitems.product_img1}`} alt={listorderitems.product_name} />
                  <span className="product-name">{listorderitems.product_name}</span>
                </div>
                <div className="details text-end">
                  <p>Price: {listorderitems.total_paid}</p>
                  <p>Quantity: {listorderitems.orderd_quantity}</p>
                  <p>Subtotal: {listorderitems.total_paid}</p>
                  <a href="#" className="view-details btn btn-warning">View Details</a>
                </div>
              </li>


            ))
          }

          {orderditems.length < 0 && (
            <div className="empty-cart-message mt-5 text-center">
            <h3 className="no-products-text">There are no Ordered products!</h3>
          </div>
          )}

        </ul>

      </div>
    </div>
  );
}

export default OrderedItems;