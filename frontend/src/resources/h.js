import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown, Dropdown, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Translation from "./translations/lang.json";
import './styles.css'
function Home() {
    const [language, setLanguage] = useState("amharic");
    const [content, setContent] = useState(Translation.english);

    useEffect(() => {
        if (Translation[language]) {
            setContent(Translation[language]);
        }
    }, [language]);

    return (
        <div>
            {/* Navbar Component */}
            <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
                <Container>
                    <Navbar.Brand href="#home">MyBrand</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Form className="d-flex mx-auto" style={{ width: '100%' }}>
                        <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" style={{ flex: 1 }} />
                        <Button variant="outline-light">{content?.search || "Search"}</Button>
                    </Form>
                    <Nav className="ms-auto text-center">
                        <Nav.Link href="#cart">Cart</Nav.Link>
                        <NavDropdown title="Login" id="login-dropdown">
                            <NavDropdown.Item as="div">
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    User
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item as="div">
                                <Link to="/vendor/login" style={{ textDecoration: 'none' }}>
                                    Vendor
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-light" id="language-dropdown">
                                Language
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="text-center" style={{ minWidth: "200px", padding: "10px" }}>
                                <label style={{ fontSize: "14px", fontWeight: "bold" }}>Language Select</label>
                                <Dropdown.Item onClick={() => setLanguage("amharic")}>Amharic</Dropdown.Item>
                                <Dropdown.Item onClick={() => setLanguage("english")}>English</Dropdown.Item>
                                <Dropdown.Item onClick={() => setLanguage("arabic")}>Arabic</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Container>
            </Navbar>

            {/* Content */}
            <h1>{content?.title || "Default Title"}</h1>
            <h3>{content?.describe || "Default Description"}</h3>

            {/* Slideshow Component */}
            <Carousel interval={3000}>
                <Carousel.Item>
                    <img className="d-block w-100" src="/img/1.jpg" alt="First slide" style={{ height: '500px', objectFit: 'cover' }} />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="/img/2.jpg" alt="Second slide" style={{ height: '500px', objectFit: 'cover' }} />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="/img/3.jpg" alt="Third slide" style={{ height: '500px', objectFit: 'cover' }} />
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Home;
