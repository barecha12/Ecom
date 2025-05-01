import React, { useState } from "react";
import {
  FaBars,
  FaChartLine,
  FaStore,
  FaUsers,
  FaUser,
} from "react-icons/fa";
import {
  Row,
  Col,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../style/new-vendors.css";

function NewVendors() {
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
  const navigate = useNavigate();

  // User details for the modal (example data)
  const userDetails = {
    personalInfo: {
      name: "John Doe",
      address: "123 Main St",
      city: "Springfield",
      region: "IL",
      mobile: "123-456-7890",
      idNumber: "987654321",
      idPhotos: ["https://cdn.pixabay.com/photo/2017/10/15/16/21/iphone-2854322_960_720.png", "https://cdn.pixabay.com/photo/2017/10/15/16/21/iphone-2854322_960_720.png"],
    },
    businessInfo: {
      shopName: "John's Groceries",
      shopAddress: "456 Market St",
      shopCity: "Springfield",
      state: "IL",
      shopMobile: "123-456-7890",
      businessLicenseNumber: "BL123456",
      addressProof: "https://cdn.pixabay.com/photo/2017/10/15/16/21/iphone-2854322_960_720.png",
      otherProofImages: ["https://cdn.pixabay.com/photo/2017/10/15/16/21/iphone-2854322_960_720.png", "https://cdn.pixabay.com/photo/2017/10/15/16/21/iphone-2854322_960_720.png", "https://cdn.pixabay.com/photo/2017/10/15/16/21/iphone-2854322_960_720.png"],
    },
    bankInfo: {
      bankName: "Bank of Springfield",
      accountHolderName: "John Doe",
      accountNumber: "123456789",
    },
  };


  const slides = [
    {
      title: "Personal Info",
      content: (
        <ul>
          <li>Name: {userDetails.personalInfo.name}</li>
          <li>Address: {userDetails.personalInfo.address}</li>
          <li>City: {userDetails.personalInfo.city}</li>
          <li>Region: {userDetails.personalInfo.region}</li>
          <li>Mobile: {userDetails.personalInfo.mobile}</li>
          <li>ID Number: {userDetails.personalInfo.idNumber}</li>
          <li>
            ID Photo (Front): 
            <img 
              src={userDetails.personalInfo.idPhotos[0]} 
              alt="ID Front" 
              onClick={() => {
                setSelectedImage(userDetails.personalInfo.idPhotos[0]);
                setShowImageModal(true);
              }} 
            />
          </li>
          <li>
            ID Photo (Back): 
            <img 
              src={userDetails.personalInfo.idPhotos[1]} 
              alt="ID Back" 
              onClick={() => {
                setSelectedImage(userDetails.personalInfo.idPhotos[1]);
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
          <li>Shop Name: {userDetails.businessInfo.shopName}</li>
          <li>Shop Address: {userDetails.businessInfo.shopAddress}</li>
          <li>Shop City: {userDetails.businessInfo.shopCity}</li>
          <li>State: {userDetails.businessInfo.state}</li>
          <li>Shop Mobile: {userDetails.businessInfo.shopMobile}</li>
          <li>Business License Number: {userDetails.businessInfo.businessLicenseNumber}</li>
          <li>
            Address Proof: 
            <img 
              src={userDetails.businessInfo.addressProof} 
              alt="Address Proof" 
              onClick={() => {
                setSelectedImage(userDetails.businessInfo.addressProof);
                setShowImageModal(true);
              }} 
            />
          </li>
          <li>
            Other Proof Images: {userDetails.businessInfo.otherProofImages.map((img, index) => (
              <img key={index} 
                src={img} 
                alt={`Proof ${index + 1}`} 
                onClick={() => {
                  setSelectedImage(img);
                  setShowImageModal(true);
                }} 
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
          <li>Bank Name: {userDetails.bankInfo.bankName}</li>
          <li>Account Holder Name: {userDetails.bankInfo.accountHolderName}</li>
          <li>Account Number: {userDetails.bankInfo.accountNumber}</li>
        </ul>
      ),
    },
  ];

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
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Pending" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Pending" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "Pending" },
    { id: 4, name: "Bob Brown", email: "bob@example.com", status: "Pending" },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredUsers.length / entries);
  const indexOfLastUser = currentPage * entries;
  const indexOfFirstUser = indexOfLastUser - entries;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const changeUserStatus = async () => {
    const payload = {
      userId: selectedUserId,
      status: userStatus,
    };

    try {
      console.warn("Payload:", payload);
      let response = await fetch("http://localhost:8000/api/newvendor", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json',
        },
      });

      let result = await response.json();
      if (result.success) {
        toast.success("User status updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setShowEditModal(false);
      } else {
        toast.error("Failed to update status. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
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
          <h2 className="text-center admin-custom-css flex-grow-1 mt-2 ms-4">Admin Dashboard</h2>
        </div>

        <a href="#analytics" className="admin-custom-link">
          <FaChartLine className="me-2" /> Dashboard
        </a>

        <div className="dropdown">
          <div className="admin-custom-link" onClick={() => handleDropdown("products")}>
            <FaUsers className="me-2" /> User Management
          </div>
          {openDropdown === "products" && (
            <ul className="dropdown-menu admin-custom-dropdown-menu">
              <li><a href="/admin/list-users" className="dropdown-item-admin">List Users</a></li>
              <li><a href="/admin/user-messages" className="dropdown-item-admin">User Messages</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown">
          <div className="admin-custom-link" onClick={() => handleDropdown("orders")}>
            <FaStore className="me-2" /> Vendor Management
          </div>
          {openDropdown === "orders" && (
            <ul className="dropdown-menu admin-custom-dropdown-menu">
              <li><a href="/admin/new-vendors" className="dropdown-item-admin">New Vendors</a></li>
              <li><a href="/admin/list-vendors" className="dropdown-item-admin">List of Vendors</a></li>
              <li><a href="/admin/manage-products" className="dropdown-item-admin">Manage Products</a></li>
              <li><a href="/admin/manage-orders" className="dropdown-item-admin">Manage Orders</a></li>
              <li><a href="/admin/approve-payout" className="dropdown-item-admin">Approve Payout</a></li>
              <li><a href="/admin/vendor-messages" className="dropdown-item-admin">Vendor Messages</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown">
          <div className="admin-custom-link" onClick={() => handleDropdown("profile")}>
            <FaUser className="me-2" /> Profile
          </div>
          {openDropdown === "profile" && (
            <ul className="dropdown-menu admin-custom-dropdown-menu">
              <li><a href="/admin/manage-password" className="dropdown-item-admin">Update Password</a></li>
              <li><a onClick={logout} className="dropdown-item-admin">Logout</a></li>
            </ul>
          )}
        </div>
      </div>

      <div className={`main-content ${sidebarVisible ? "with-sidebar" : "full-width"}`}>
        <div className="custom-header text-center">
          <h1 className="h4 mb-0">Vendor List</h1>
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
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <div
                    key={user.id}
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
                      <h5 style={{ margin: 0 }}>{user.name}</h5>
                      <p style={{ margin: 0, color: '#666' }}>{user.email}</p>
                    </div>
                    <div>
                    <span
  className="see-details-button"
  onClick={() => {
    setShowDetailModal(true);
    setCurrentSlide(0); // Reset to first slide
  }}
>
  see details
</span>
                      <Button variant="primary" size="sm" onClick={() => {
                        setSelectedUserId(user.id);
                        setUserStatus(user.status);
                        setShowEditModal(true);
                      }}>Edit</Button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No users found.</p>
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
              <Button variant="secondary" onClick={handlePrevious} disabled={currentPage === 1}>
                Previous
              </Button>
              <div>
                Page {currentPage} of {totalPages}
              </div>
              <Button variant="secondary" onClick={handleNext} disabled={currentPage === totalPages || totalPages === 0}>
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
          <Modal.Title>{slides[currentSlide].title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {slides[currentSlide].content}
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
          <img src={selectedImage} alt="Large View" style={{ width: '100%', height: 'auto' }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NewVendors;