import React, { useState } from 'react';
import { Form, Button, Container, Card, Modal, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import './style/style.css'; // Custom CSS for styling

function PersonalInfo() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [mobile, setMobile] = useState(""); // Fixed typo here
    const [idnumber, setIdnumber] = useState("");
    
    const [idPhotoFront, setIdPhotoFront] = useState(null);
    const [idPhotoBack, setIdPhotoBack] = useState(null);

    const [previewImage, setPreviewImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch(name) {
            case "name": setName(value); break;
            case "address": setAddress(value); break;
            case "city": setCity(value); break;
            case "region": setRegion(value); break;
            case "mobile": setMobile(value); break;
            case "idnumber": setIdnumber(value); break;
            default: break;
        }
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        if (name === "idPhotoFront") {
            setIdPhotoFront(files[0]);
        } else if (name === "idPhotoBack") {
            setIdPhotoBack(files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create FormData object
        const formData = new FormData();
        formData.append("name", name);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("region", region);
        formData.append("mobile", mobile);
        formData.append("idnumber", idnumber);

        // Append image files if they exist
        if (idPhotoFront) {
            formData.append("idPhotoFront", idPhotoFront);
        }
        if (idPhotoBack) {
            formData.append("idPhotoBack", idPhotoBack);
        }
        console.warn(formData);
        try {
            let response = await fetch("http://localhost:8000/api/vendor/personalinfo", {
                method: 'POST',
                body: formData,
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            });
           
            let result = await response.json();
    
            // If success is true, show success alert
            if (result.success) {
                setAlert({ type: 'success', message: result.message });
    
                console.warn("API Response:", result.storeData);
                localStorage.setItem("user-info", JSON.stringify(result.storeData));
    
                navigate("/vendor/personalinfo"); // Redirects to /vendor/personalinfo
            } else {
                setAlert({ type: 'danger', message: result.message || 'Failed to update personal information. Please try again.' });
            }
        } catch (error) {
            console.error('Error:', error);
            setAlert({ type: 'danger', message: 'An error occurred. Please try again later.' });
        }
    };
    

    const handleClear = () => {
        setName("");
        setAddress("");
        setCity("");
        setRegion("");
        setMobile("");
        setIdnumber("");
        setIdPhotoFront(null);
        setIdPhotoBack(null);
    };

    const handlePreview = (image) => {
        setPreviewImage(image);
        setShowModal(true);
    };

    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    return (
        <Container className="mt-4">
            {/* Stepper Progress UI */}
            <Row className="justify-content-center align-items-center mb-4 progress-steps">
                <Col xs="auto" className="step-container">
                    <div className="step-circle completed">1</div>
                    <div className="step-label">Personal Information</div>
                </Col>
                <Col xs="auto" className="connector">
                    <div className="connecting-line"></div>
                </Col>
                <Col xs="auto" className="step-container">
                    <div className="step-circle in-progress">2</div>
                    <div className="step-label">Business Information</div>
                </Col>
                <Col xs="auto" className="connector">
                    <div className="connecting-line"></div>
                </Col>
                <Col xs="auto" className="step-container">
                    <div className="step-circle pending">3</div>
                    <div className="step-label">Bank Information</div>
                </Col>
            </Row>

            {/* Personal Information Form */}
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', paddingTop: '20px' }}>
                <Card style={{ width: '100%', maxWidth: '500px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Card.Body>
                        <h3 className="text-center mb-4">Vendor Personal Information</h3>
                        <Form onSubmit={handleSubmit}>
                            {alert && (
                                <div className={`alert alert-${alert.type}`} role="alert">
                                    {alert.message}
                                </div>
                            )}

                            <Form.Group controlId="name" className="mb-3 text-start">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" value={name} onChange={handleChange} placeholder="Enter Name" />
                            </Form.Group>

                            <Form.Group controlId="address" className="mb-3 text-start">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address" value={address} onChange={handleChange} placeholder="Enter Address" />
                            </Form.Group>

                            <Form.Group controlId="city" className="mb-3 text-start">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" name="city" value={city} onChange={handleChange} placeholder="Enter City" />
                            </Form.Group>

                            <Form.Group controlId="region" className="mb-3 text-start">
                                <Form.Label>Region</Form.Label>
                                <Form.Control type="text" name="region" value={region} onChange={handleChange} placeholder="Enter Region" />
                            </Form.Group>

                            <Form.Group controlId="mobile" className="mb-3 text-start">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control type="text" name="mobile" value={mobile} onChange={handleChange} placeholder="Enter Mobile Number" />
                            </Form.Group>

                            <Form.Group controlId="idnumber" className="mb-3 text-start">
                                <Form.Label>ID Number</Form.Label>
                                <Form.Control type="text" name="idnumber" value={idnumber} onChange={handleChange} placeholder="Enter ID Number" />
                            </Form.Group>

                            <Form.Group controlId="idPhotoFront" className="mb-3 text-start">
                                <Form.Label>ID Photo (Front)</Form.Label>
                                <Form.Control type="file" name="idPhotoFront" onChange={handleImageChange} />
                                {idPhotoFront && (
                                    <img
                                        src={URL.createObjectURL(idPhotoFront)}
                                        alt="ID Front"
                                        className="img-thumbnail mt-2"
                                        width="100"
                                        onClick={() => handlePreview(URL.createObjectURL(idPhotoFront))}
                                        style={{ cursor: 'pointer' }}
                                    />
                                )}
                            </Form.Group>

                            <Form.Group controlId="idPhotoBack" className="mb-4 text-start">
                                <Form.Label>ID Photo (Back)</Form.Label>
                                <Form.Control type="file" name="idPhotoBack" onChange={handleImageChange} />
                                {idPhotoBack && (
                                    <img
                                        src={URL.createObjectURL(idPhotoBack)}
                                        alt="ID Back"
                                        className="img-thumbnail mt-2"
                                        width="100"
                                        onClick={() => handlePreview(URL.createObjectURL(idPhotoBack))}
                                        style={{ cursor: 'pointer' }}
                                    />
                                )}
                            </Form.Group>

                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit" size="lg">
                                    Submit
                                </Button>
                                <Button variant="secondary" type="button" size="lg" onClick={handleClear}>Clear</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>

            {/* Image Preview Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Body className="text-center">
                    {previewImage && <img src={previewImage} alt="Preview" className="img-fluid" />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default PersonalInfo;
