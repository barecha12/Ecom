import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css'; // Ensure this file contains responsive styles
import { Link,useNavigate } from "react-router-dom";

function RegisterVendor() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    const [alert, setAlert] = useState(null);  // State for alert visibility
    const navigate = useNavigate();
    async function signUp(e) {
        e.preventDefault(); // Prevent form submission from refreshing the page

        if (password !== passConfirm) {
            setAlert({ type: 'danger', message: 'Passwords do not match. Please try again.' });
            return;
        }

        let items = {email,password,password_confirmation: passConfirm};

        try {
            let response = await fetch("http://localhost:8000/api/vendor/register", {
                method: 'POST',
                body: JSON.stringify(items),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            });

            let result = await response.json();
            console.warn("API Response:", result);  // Log the API response to see the structure

            // If success is true, show success alert
            if (result.success) {
                setAlert({ type: 'success', message: result.message });
                navigate("../login");
            } else {
                setAlert({ type: 'danger', message: result.message || 'Failed to create account. Please try again.' });
            }
        } catch (error) {
            console.error('Error:', error);
            setAlert({ type: 'danger', message: 'An error occurred. Please try again later.' });
        }
    }

    return (
        <div
            style={{
                background: 'linear-gradient(to right, #6912cc, #2772fb)',
                minHeight: '100vh',
                padding: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div className="card" style={{
                backgroundColor: '#332d2d',
                border: 'none',
                width: '100%',
                maxWidth: '400px',
                padding: '20px'
            }}>
                <div className="card-body">
                    <h2 className="card-title text-center" style={{ color: 'white', fontWeight: 'bold' }}>SIGN UP VENDOR</h2>
                    <p className="text-center" style={{ color: 'white' }}>Please fill in the details to create an account!</p>

                    {/* Show the alert if available */}
                    {alert && (
                        <div className={`alert alert-${alert.type}`} role="alert">
                            {alert.message}
                        </div>
                    )}

                    <form>
                        

                        {/* Email Field */}
                        <div className="mb-3 text-center">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                placeholder="Enter your email"
                                style={{
                                    backgroundColor: '#444',
                                    color: 'white'
                                }}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="mb-3 text-center">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                placeholder="Enter your password"
                                style={{
                                    backgroundColor: '#444',
                                    color: 'white'
                                }}
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div className="mb-3 text-center">
                            <input
                                type="password"
                                value={passConfirm}
                                onChange={(e) => setPassConfirm(e.target.value)}
                                className="form-control"
                                placeholder="Confirm your password"
                                style={{
                                    backgroundColor: '#444',
                                    color: 'white'
                                }}
                            />
                        </div>

                        {/* Sign Up Button */}
                        <div className="d-grid text-center">
                            <button
                                type="submit"
                                onClick={signUp}
                                className="btn btn-primary"
                                style={{
                                    backgroundColor: '#332d2d'
                                }}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Login Link */}
                        <div className="text-center mt-3">
                            <p style={{ color: 'white' }}>Already have an account? <Link to="/vendor/login" style={{ textDecoration: 'none' }}>
                                Login
                            </Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterVendor;
