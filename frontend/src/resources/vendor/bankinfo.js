import React, { useState } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style/style.css'; // Custom CSS for styling

function BankInfo() {
    const [formData, setFormData] = useState({
        vendorEmail: '',
        accountHolderName: '',
        bankName: '',
        accountNumber: '',
        ifscCode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleClear = () => {
        setFormData({
            ...formData,
            bankName: '',
            accountNumber: '',
            accountHolderName: ''
        });
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
                <Col xs="auto" className="connector" >
                    <div className="connecting-line"></div>
                </Col>

                {/* Step 3: Bank Information */}
                <Col xs="auto" className="step-container" >
                    <div className="step-circle completed">3</div>
                    <div className="step-label">Bank Information</div>
                </Col>
            </Row>

            {/* Bank Information Form */}
            <Row className="justify-content-center">
                <Card style={{ width: '500px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Card.Body>
                        <h3 className="text-center mb-4">Vendor Bank Information</h3>
                        <Form onSubmit={handleSubmit}>

                            <Form.Group controlId="bankName" className="mb-3 text-start">
                                <Form.Label className="d-block">Bank Name</Form.Label>
                                <Form.Control type="text" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Enter Bank Name" />
                            </Form.Group>

                            <Form.Group controlId="accountHolderName" className="mb-3 text-start">
                                <Form.Label className="d-block">Account Name</Form.Label>
                                <Form.Control type="text" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} placeholder="Account Name" />
                            </Form.Group>

                            <Form.Group controlId="accountNumber" className="mb-3 text-start">
                                <Form.Label className="d-block">Account Number</Form.Label>
                                <Form.Control type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Enter Account Number" />
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
        </Container>
    );
}

export default BankInfo;