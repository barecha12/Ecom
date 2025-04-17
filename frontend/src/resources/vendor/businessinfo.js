import React, { useState } from 'react';
import { Form, Button, Container, Card, Modal, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style/style.css'; // Custom CSS for styling

function BusinessInfo() {
    const [formData, setFormData] = useState({
        vendorEmail: 'yasser@admin.com',
        shopName: '',
        shopAddress: '',
        shopCity: '',
        state: '',
        shopMobile: '',
        businessLicenseNumber: '',
        addressProofImage: null,
        otherProofImages: []
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        if (name === "otherProofImages") {
            setFormData({
                ...formData,
                otherProofImages: Array.from(files).slice(0, 5)
            });
        } else {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleClear = () => {
        setFormData({
            ...formData,
            shopName: '',
            shopAddress: '',
            shopCity: '',
            state: '',
            shopMobile: '',
            businessLicenseNumber: '',
            addressProofImage: null,
            otherProofImages: []
        });
    };

    const handlePreview = (image) => {
        setPreviewImage(image);
        setShowModal(true);
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '90vh', paddingTop: '20px', paddingBottom: '20px' }}>
            {/* Stepper Progress UI - Above the form */}
            <Row className="justify-content-center align-items-center mb-4">
                {/* Step 1: Personal Information */}
                <Col xs="auto" className="step-container">
                    <div className="step-circle completed">1</div>
                    <div className="step-label">Personal Information</div>
                </Col>

                {/* Connecting Line */}
                <Col xs="auto" className="connector">
                    <div className="connecting-line"></div>
                </Col>

                {/* Step 2: Business Information */}
                <Col xs="auto" className="step-container">
                    <div className="step-circle completed">2</div>
                    <div className="step-label">Business Information</div>
                </Col>

                {/* Connecting Line */}
                <Col xs="auto" className="connector">
                    <div className="connecting-line"></div>
                </Col>

                {/* Step 3: Bank Information */}
                <Col xs="auto" className="step-container">
                    <div className="step-circle pending">3</div>
                    <div className="step-label">Bank Information</div>
                </Col>
            </Row>

            {/* Business Information Form */}
            <Row className="justify-content-center">
                <Card style={{ width: '500px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Card.Body>
                        <h3 className="text-center mb-4">Vendor Business Information</h3>
                        <Form onSubmit={handleSubmit}>

                            <Form.Group controlId="shopName" className="mb-3 text-start">
                                <Form.Label className="d-block">Shop Name</Form.Label>
                                <Form.Control type="text" name="shopName" value={formData.shopName} onChange={handleChange} placeholder="Enter Shop Name" />
                            </Form.Group>

                            <Form.Group controlId="shopAddress" className="mb-3 text-start">
                                <Form.Label className="d-block">Shop Address</Form.Label>
                                <Form.Control type="text" name="shopAddress" value={formData.shopAddress} onChange={handleChange} placeholder="Enter Shop Address" />
                            </Form.Group>

                            <Form.Group controlId="shopCity" className="mb-3 text-start">
                                <Form.Label className="d-block">Shop City</Form.Label>
                                <Form.Control type="text" name="shopCity" value={formData.shopCity} onChange={handleChange} placeholder="Enter Shop City" />
                            </Form.Group>

                            <Form.Group controlId="state" className="mb-3 text-start">
                                <Form.Label className="d-block">State</Form.Label>
                                <Form.Control type="text" name="state" value={formData.state} onChange={handleChange} placeholder="Enter State" />
                            </Form.Group>

                            <Form.Group controlId="shopMobile" className="mb-3 text-start">
                                <Form.Label className="d-block">Shop Mobile</Form.Label>
                                <Form.Control type="text" name="shopMobile" value={formData.shopMobile} onChange={handleChange} placeholder="Enter Shop Mobile Number" />
                            </Form.Group>

                            <Form.Group controlId="businessLicenseNumber" className="mb-3 text-start">
                                <Form.Label className="d-block">Business License Number</Form.Label>
                                <Form.Control type="text" name="businessLicenseNumber" value={formData.businessLicenseNumber} onChange={handleChange} placeholder="Enter Business License Number" />
                            </Form.Group>

                            <Form.Group controlId="addressProofImage" className="mb-3 text-start">
                                <Form.Label className="d-block">Address Proof Image</Form.Label>
                                <Form.Control type="file" name="addressProofImage" onChange={handleImageChange} />
                                {formData.addressProofImage && <img src={URL.createObjectURL(formData.addressProofImage)} alt="Address Proof" className="img-thumbnail mt-2" width="100" onClick={() => handlePreview(URL.createObjectURL(formData.addressProofImage))} style={{ cursor: 'pointer' }} />}
                            </Form.Group>

                            <Form.Group controlId="otherProofImages" className="mb-4 text-start">
                                <Form.Label className="d-block">Other Proof Images (Max 5)</Form.Label>
                                <Form.Control type="file" name="otherProofImages" multiple onChange={handleImageChange} />
                                <div className="mt-2">
                                    {formData.otherProofImages.map((file, index) => (
                                        <img key={index} src={URL.createObjectURL(file)} alt={`Proof ${index + 1}`} className="img-thumbnail me-2" width="100" onClick={() => handlePreview(URL.createObjectURL(file))} style={{ cursor: 'pointer' }} />
                                    ))}
                                </div>
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
            </Row>

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

export default BusinessInfo;