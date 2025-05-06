import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/settings.css'; // Import custom CSS

function Settings() {
  const [showPopup, setShowPopup] = useState(false);

  const handleClose = () => setShowPopup(false);
  const handleShow = () => setShowPopup(true);

  const defaultFontSize = 'medium';
  const defaultFontColor = '#000000';
  // Initialize state with values from local storage or default values
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontSize') || 'medium');
  const [fontColor, setFontColor] = useState(() => localStorage.getItem('fontColor') || '#000000');
  useEffect(() => {
    // Update CSS variables
    document.documentElement.style.setProperty('--font-size', fontSize);
    document.documentElement.style.setProperty('--font-color', fontColor);

    // Store in local storage
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('fontColor', fontColor);
  }, [fontSize, fontColor]);

  const resetToDefault = () => {
    setFontSize(defaultFontSize);
    setFontColor(defaultFontColor);
    localStorage.removeItem('fontSize');
    localStorage.removeItem('fontColor');
    toast.success("Settings reset to default.");
  };
  const saveAddress = async () => {
    // Retrieve user info from local storage
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    const userId = userInfo ? userInfo.user_id : null; // Get user_id

    const formData = {
      user_id: userId, // Add user_id to formData
      full_name: document.getElementById("buyername").value,
      phone: document.getElementById("phone").value,
      country: document.getElementById("country").value,
      state: document.getElementById("state").value,
      city: document.getElementById("city").value,
      post: document.getElementById("zipcode").value,
    };

    try {
      console.warn("Form Data:", formData); // Log form data for debugging
      const response = await fetch("http://localhost:8000/api/addadress", {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json',
        },
      });

      const data = await response.json(); // Parse JSON response

      if (!response.ok) {
        throw new Error(data.message || 'Network response was not ok.');
      }

      // Show success toast
      toast.success(data.message);
      handleClose();
    } catch (error) {
      console.error("Error saving address:", error);
      // Show error toast with a message from the error object
      toast.error(error.message || "Failed to save address.");
    }
  };

  return (
    <Container className="settings-container mt-3">


      <Form>
        <h2 className="text-start" style={{  color: 'var(--font-color)' }} >Settings</h2>


        <div className="form-group">
          <Button id="add-address-btn" className='custom-button' style={{ fontSize: 'var(--font-size)', color: 'var(--font-color)' }} onClick={handleShow}>
            Add Address
          </Button>
        </div>

        <Form.Group controlId="language">
          <Form.Label>Language:</Form.Label>
          <Form.Control as="select">
            <option value="english">English</option>
            <option value="spanish">አማርኛ</option>
            <option value="french">Afaan Oromoo</option>
            <option value="german">Soomaali</option>
            <option value="chinese">ትግሪኛ</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="currency">
          <Form.Label>Currency:</Form.Label>
          <Form.Control as="select">
            <option value="usd">USD</option>
            <option value="etb">ETB</option>
            <option value="eur">EUR</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="font-size">
          <Form.Label>Font Size:</Form.Label>
          <Form.Control as="select" value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
            <option value="small" style={{ fontSize: 'var(--font-size)', color: 'var(--font-color)' }} >Small</option>
            <option value="medium" style={{ fontSize: 'var(--font-size)', color: 'var(--font-color)' }} >Medium</option>
            <option value="large" style={{ fontSize: 'var(--font-size)', color: 'var(--font-color)' }} >Large</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="font-color">
          <Form.Label>Font Color:</Form.Label>
          <Form.Control type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} />
        </Form.Group>

        <Button variant="outline-secondary" style={{ color: 'var(--font-color)' }} className="custom-button mt-3" onClick={() => window.history.back()}>
          Back
        </Button>
        <Button variant="primary" type="button" className="custom-button-save mt-3 " style={{ color: 'var(--font-color)' }} >Save Settings</Button>
        <Button variant="secondary" style={{ fontSize: 'var(--font-size)', color: 'var(--font-color)' }}className="custom-button mt-3" onClick={resetToDefault}>
          Set to Default
        </Button>
      </Form>

      {/* Popup for Adding Address */}
      <Modal show={showPopup} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="custom-form-control" id="buyername" required />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="text" className="custom-form-control" id="phone" required />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">Country</label>
              <input type="text" className="custom-form-control" id="country" required />
            </div>
            <div className="mb-3">
              <label htmlFor="state" className="form-label">State</label>
              <input type="text" className="custom-form-control" id="state" required />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input type="text" className="custom-form-control" id="city" required />
            </div>
            <div className="mb-3">
              <label htmlFor="zipcode" className="form-label">Postal Code</label>
              <input type="text" className="custom-form-control" id="zipcode" required />
            </div>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="custom-button">
            Close
          </Button>
          <Button variant="primary" onClick={saveAddress} className="custom-button">
            Save Address
          </Button>
          
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </Container>

  );
}

export default Settings;