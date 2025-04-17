import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css'; // Ensure this file contains responsive styles
import { Link,useNavigate  } from "react-router-dom"
function LoginAdmin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(null);  // State for alert visibility
    const navigate = useNavigate();
    async function login(e) {
        e.preventDefault(); // Prevent form submission from refreshing the page

        let items = {email,password,};

        try {
            let response = await fetch("http://localhost:8000/api/login", {
                method: 'POST',
                body: JSON.stringify(items),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            });

            let result = await response.json(); // Log the API response to see the structure

            // If success is true, show success alert
            if (result.success) {
                setAlert({ type: 'success', message: result.message });
                
            console.warn("API Response:", result.storeData); 
               localStorage.setItem("user-info",JSON.stringify(result.storeData))
              
                navigate("/dashboard"); // Redirects to /abc
            
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
                width: '100%', // Full width on small screens
                maxWidth: '400px', // Fixed maximum width for larger screens
                padding: '20px'
            }}>
                <div className="card-body">
                    <h2 className="card-title text-center" style={{ color: 'white', fontWeight: 'bold' }}>ADMIN LOGIN</h2>
                    <p className="text-center" style={{ color: 'white' }}>Please enter your login and password!</p>
                    {/* Show the alert if available */}
                    {alert && (
                        <div className={`alert alert-${alert.type}`} role="alert">
                            {alert.message}
                        </div>
                    )}

                    <form>
                        <div className="mb-3 text-center">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                style={{
                                    width: '80%', // Full width within the card
                                    margin: '0 auto',
                                    backgroundColor: '#444',
                                    color: 'white',
                                    border: '1px solid white',
                                    borderRadius: '5px',
                                    padding: '10px'
                                }}
                            />
                        </div>
                        <div className="mb-3 text-center">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                style={{
                                    width: '80%', // Full width within the card
                                    margin: '0 auto',
                                    backgroundColor: '#444',
                                    color: 'white',
                                    border: '1px solid white',
                                    borderRadius: '5px',
                                    padding: '10px'
                                }}
                            />
                        </div>
                        <div className="d-grid text-center">
                            <button
                                type="submit"
                                onClick={login}
                                className="btn"
                                style={{
                                    width: '50%', // Full width within the card
                                    margin: '0 auto',
                                    backgroundColor: '#332d2d',
                                    color: 'white',
                                    border: '1px solid white',
                                    borderRadius: '5px',
                                    padding: '10px'
                                }}
                            >
                                Login
                            </button>
                        </div>
                        <div className="text-center mt-3">
                            {/* <Link to="/reset" style={{color:'white' }}>
                            Forgot password?
                            </Link> */}
                        </div>
                       
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginAdmin;