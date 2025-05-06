import React, { useState } from 'react';
import Translation from "../translations/lang.json";
import './styles/checkout.css'; // Custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';

function CheckOut() {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('123 Example St, Cityville, ST 12345');

  const addresses = [
    '456 Another St, Townsville, ST 54321',
    '789 Sample Rd, Villageville, ST 67890',
    '101 Sample Ave, Citytown, ST 11112',
  ];

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
    setShowAddressModal(false);
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    // Handle payment submission logic here
    setShowPaymentModal(false);
  };

  return (
    <div>
      {/* Navigation Bar */}


      {/* Checkout Form Container */}
      <div className="container mt-5">
        <div className="form-section">
          <h2>Shipping Information</h2>
          <div className="saved-info">
            <p><strong>John Doe</strong></p>
            <p>{selectedAddress}</p>
            <div className="change-address">
              <button className="btn btn-link text-warning" onClick={() => setShowAddressModal(true)}>Change Address</button>
            </div>
          </div>

          <h2>Payment Information</h2>
          <div className="saved-info">
            <p><strong>Saved Card:</strong> **** **** **** 1234</p>
            <p><strong>Expiry:</strong> 12/25</p>
            <div className="change-address">
              <button className="btn btn-link text-warning" onClick={() => setShowPaymentModal(true)}>Add Payment Information</button>
            </div>
          </div>

          <h2>Processing Products</h2>
          <div className="product-list">
            <div className="product-item">
              <img src="https://www.pcworld.com/wp-content/uploads/2024/03/alienware-gaming-laptop.jpg?resize=1024%2C576&quality=50&strip=all" alt="Product 1" />
              <p><strong>Product 1:</strong> Example Product 1 - $20.00</p>
            </div>
            <div className="product-item">
              <img src="https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-240909_inline.jpg.large.jpg" alt="Product 2" />
              <p><strong>Product 2:</strong> Example Product 2 - $30.00</p>
            </div>
          </div>

          <button type="button" className="mt-5 checkout-button btn btn-warning">Complete Purchase</button>
        </div>

        <div className="summary-section">
          <h2>Order Summary</h2>
          <p><strong>Product Name:</strong> Example Product</p>
          <p><strong>Quantity:</strong> 1</p>
          <p><strong>Price:</strong> $49.99</p>
          <p><strong>Shipping:</strong> $5.00</p>
          <p><strong>Total:</strong> $54.99</p>
        </div>
      </div>

      {/* Address Change Modal */}
      <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select an Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group">
            {addresses.map((address, index) => (
              <li key={index} className="list-group-item" onClick={() => handleAddressChange(address)}>
                {address}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

      {/* Payment Information Modal */}
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Payment Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handlePaymentSubmit}>
            <div className="mb-3">
              <label htmlFor="cardNumber" className="form-label">Card Number</label>
              <input type="text" className="custom-form-control" id="cardNumber" required />
            </div>
            <div className="mb-3">
              <label htmlFor="expiry" className="form-label">Expiry Date (MM/YY)</label>
              <input type="text" className="custom-form-control" id="expiry" required />
            </div>
            <div className="mb-3">
              <label htmlFor="cvc" className="form-label">CVC</label>
              <input type="text" className="custom-form-control" id="cvc" required />
            </div>
            <button type="submit" className="checkout-button btn btn-warning">Save Payment Information</button>
          </form>
        </Modal.Body>
       
      </Modal>
    </div>
  );
}

export default CheckOut;