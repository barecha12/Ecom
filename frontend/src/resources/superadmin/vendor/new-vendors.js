import React, { useState, useEffect } from "react";
import { FaBars, FaChartLine, FaStore, FaThList, FaUsers, FaUser, FaUserShield, FaTools, FaEdit, FaTrash, } from "react-icons/fa";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Translation from "../../translations/lang.json";
import "../style/new-vendors.css";

function SAdminNewVendors() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userStatus, setUserStatus] = useState("Pending");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [vendors, setVendors] = useState([]); // State for vendors
  const [vendorDetails, setVendorDetails] = useState(null); // State for vendor details
  const navigate = useNavigate();

  const defaultFontSize = 'medium';
  const defaultFontColor = '#000000';
  const defaultLanguage = 'english'; // Default language

  const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontSize') || defaultFontSize);
  const [fontColor, setFontColor] = useState(() => localStorage.getItem('fontColor') || defaultFontColor);
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || defaultLanguage);
  const [content, setContent] = useState(Translation[language]);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-size', fontSize);
    document.documentElement.style.setProperty('--font-color', fontColor);
    
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('fontColor', fontColor);
    localStorage.setItem('language', language);

    // Update content based on selected language
    setContent(Translation[language]);
  }, [fontSize, fontColor, language]);
  


  async function fetchVendors() {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/listnewvendors`, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        }
      });

      const result = await response.json();
      if (result.success) {
        setVendors(result.data); // Set fetched vendors
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }


  useEffect(() => {
    fetchVendors();
  }, []);

  async function handleSeeDetails(userId) {
    try {
      const response = await fetch('http://localhost:8000/api/admin/newvendorrequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ vendor_id: userId }),
      });

      const result = await response.json();
      setVendorDetails(result); // Store the result in the state
      setShowDetailModal(true); // Show the modal after fetching details
      setCurrentSlide(0); // Reset to first slide
    } catch (error) {
      console.error('Error fetching vendor details:', error);
    }
  }

  const slides = vendorDetails ? [
    {
      title: "Personal Info",
      content: (
        <ul>
          <li>Name: {vendorDetails["Personal Info"].personal_name}</li>
          <li>Address: {vendorDetails["Personal Info"].personal_address}</li>
          <li>City: {vendorDetails["Personal Info"].personal_city}</li>
          <li>State: {vendorDetails["Personal Info"].personal_state}</li>
          <li>Phone: {vendorDetails["Personal Info"].personal_phone}</li>
          <li>ID: {vendorDetails["Personal Info"].personal_unique_id}</li>
          <li>
            ID Photo (Front):
            <img
              src={"http://localhost:8000/storage/" + vendorDetails["Personal Info"].id_front_side}
              alt="ID Front"
              onClick={() => {
                setSelectedImage(vendorDetails["Personal Info"].id_front_side);
                setShowImageModal(true);
              }}

            />
          </li>
          <li>
            ID Photo (Back):
            <img
              src={"http://localhost:8000/storage/" + vendorDetails["Personal Info"].id_back_side}
              alt="ID Back"
              onClick={() => {
                setSelectedImage(vendorDetails["Personal Info"].id_back_side);
                setShowImageModal(true);
              }}
            />
          </li>
        </ul>
      ),
    },
    {
      title: "Business Information",
      content: (
        <ul>
          <li>Business Name: {vendorDetails["Business Information"].business_name}</li>
          <li>Address: {vendorDetails["Business Information"].business_address}</li>
          <li>City: {vendorDetails["Business Information"].business_city}</li>
          <li>State: {vendorDetails["Business Information"].business_state}</li>
          <li>Phone: {vendorDetails["Business Information"].business_phone}</li>
          <li>License Number: {vendorDetails["Business Information"].blicense_number}</li>
          <li>
            Address Proof:
            <img
              src={"http://localhost:8000/storage/" + vendorDetails["Business Information"].address_proof_img}
              alt="Address Proof"
              onClick={() => {
                setSelectedImage(vendorDetails["Business Information"].address_proof_img);
                setShowImageModal(true);
              }}
            />
          </li>
          <li>
            Other Proof Images:
            {vendorDetails["Business Information"].other_proof_images.map((img, index) => (
              <img
                key={index}
                src={"http://localhost:8000/storage/" + img}
                alt={`Proof ${index + 1}`}
                onClick={() => {
                  setSelectedImage(img);
                  setShowImageModal(true);
                }}
                style={{ margin: '5px', cursor: 'pointer', width: '50px', height: 'auto' }} // Add styling as needed
              />
            ))}
          </li>
        </ul>
      ),
    },
    {
      title: "Bank Info",
      content: (
        <ul>
          <li>Bank Name: {vendorDetails["Bank Info"].bank_name}</li>
          <li>Account Holder Name: {vendorDetails["Bank Info"].account_name}</li>
          <li>Account Number: {vendorDetails["Bank Info"].account_number}</li>
        </ul>
      ),
    },
  ] : []; // Safeguard against undefined slides

  const handleNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const handleDropdown = (menu) => setOpenDropdown(openDropdown === menu ? null : menu);
  const handleEntriesChange = (newEntries) => {
    setEntries(newEntries);
    setCurrentPage(1);
  };

  const filteredVendors = vendors.filter(vendor =>
    vendor.personal_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVendors.length / entries);
  const indexOfLastVendor = currentPage * entries;
  const indexOfFirstVendor = indexOfLastVendor - entries;
  const currentVendors = filteredVendors.slice(indexOfFirstVendor, indexOfLastVendor);

  const changeUserStatus = async () => {
    const payload = {
      vendor_id: selectedUserId,
      status: userStatus,
    };

    try {
      console.warn("Payload:", payload); // Debugging line
      const response = await fetch("http://localhost:8000/api/admin/changevendorstatus", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json',
        },
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Vendor status updated successfully!");
        setShowEditModal(false);
        fetchVendors()
      } else {
        toast.error("Failed to update status.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
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
    <div className="dashboard-wrapper">
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
              <li><a onClick={logout} className="dropdown-item-admin">Logout</a></li>
            </ul>
          )}
        </div>
      </div>

      <div className={`main-content ${sidebarVisible ? "with-sidebar" : "full-width"}`}>
        <div className="custom-header text-center">
          <h1 className="h4 mb-0">New Vendor Requested</h1>
        </div>

        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <Row className="mb-3 d-flex justify-content-between align-items-center">
            <Col xs="auto" className="d-flex align-items-center">
              <label className="me-2">Show</label>
              <Form.Select
                value={entries}
                onChange={(e) => handleEntriesChange(Number(e.target.value))}
                style={{ width: '100px' }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Form.Select>
              <label className="ms-2">Entries</label>
            </Col>

            <Col xs="auto" className="d-flex align-items-center mt-3 mt-sm-0">
              <label className="me-2">Search:</label>
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                style={{ width: '150px' }}
              />
            </Col>
          </Row>
        </div>

        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          <div style={{ height: '440px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f9f9f9' }}>
            <div style={{ overflowY: 'auto', height: 'calc(100% - 60px)', padding: '1rem' }}>
              {currentVendors.length > 0 ? (
                currentVendors.map((vendor) => (
                  <div
                    key={vendor.vendor_id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1rem',
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                      marginBottom: '10px'
                    }}
                  >
                    <div>
                      <h5 style={{ margin: 0 }}>{vendor.personal_name}</h5>
                      <p style={{ margin: 0, color: '#666' }}>{vendor.email}</p>
                    </div>
                    <div>
                      <span
                        className="see-details-button"
                        onClick={() => {
                          handleSeeDetails(vendor.vendor_id);
                        }}
                      >
                        see details
                      </span>
                      <Button variant="primary" size="sm" onClick={() => {
                        setSelectedUserId(vendor.vendor_id);
                        setUserStatus("Pending"); // Default status
                        setShowEditModal(true);
                      }}>Edit</Button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No vendors found.</p>
              )}
            </div>

            {/* Pagination Controls */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '60px',
                backgroundColor: '#fff',
                borderTop: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 1rem'
              }}
            >
              <Button variant="secondary" onClick={() => {
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }} disabled={currentPage === 1}>
                Previous
              </Button>
              <div>
                Page {currentPage} of {totalPages}
              </div>
              <Button variant="secondary" onClick={() => {
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }} disabled={currentPage === totalPages || totalPages === 0}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit User Status Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="userStatus">
              <Form.Label>Select Status</Form.Label>
              <Form.Control as="select" value={userStatus} onChange={(e) => setUserStatus(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="Verified">Verified</option>
                <option value="Rejected">Rejected</option>
                <option value="Suspended">Suspended</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={changeUserStatus}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Detail Modal */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{slides.length > 0 ? slides[currentSlide].title : "Vendor Details"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {slides.length > 0 ? slides[currentSlide].content : <p>No details available.</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePreviousSlide} disabled={currentSlide === 0}>
            Previous
          </Button>
          <Button variant="secondary" onClick={handleNextSlide} disabled={currentSlide === slides.length - 1}>
            Next
          </Button>
          <Button variant="primary" onClick={() => setShowDetailModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Image Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={"http://localhost:8000/storage/" + selectedImage} alt="Large View" style={{ width: '100%', height: 'auto' }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default SAdminNewVendors;