import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "./style/register.css";

const RegisterVendor = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passConfirmError, setPassConfirmError] = useState("");
    const navigate = useNavigate();

    const [passReqMet, setPassReqMet] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        special: false,
    });

    useEffect(() => {
        const userInfo = localStorage.getItem('user-info');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            if (user.admin_role_id === "SuperAdmin") {
                navigate("/superadmin/");
            } else if (user.vendor_role_id === "Vendor") {
                navigate("/vendor/")
            } else if (user.admin_role_id === "Admin") {
                navigate("/admin/");
            } else {
                navigate("/");
            }
        }
    }, []);

    const validateEmail = (email) => {
        const allowedDomains = ["@gmail.com", "@hotmail.com", "@outlook.com", "@yahoo.com", "@icloud.com"];
        if (!email.trim()) {
            return "Email is required";
        }
        const isValidDomain = allowedDomains.some(domain => email.endsWith(domain));
        if (!isValidDomain) {
            return "Please use a valid @gmail.com, @hotmail.com, @outlook.com, @yahoo.com, or @icloud.com email address.";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Invalid email format";
        }
        return "";
    };

    const checkPasswordRequirements = (password) => {
        setPassReqMet({
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*]/.test(password),
        });

        if (!password.trim()) {
            return "Password is required";
        } else if (password.length < 8) {
            return "Password must be at least 8 characters long";
        } else if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter";
        } else if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter";
        } else if (!/\d/.test(password)) {
            return "Password must contain at least one number";
        } else if (!/[!@#$%^&*]/.test(password)) {
            return "Password must contain at least one special character";
        }
        return "";
    };

    async function handleSubmit(e) {
        e.preventDefault();
        let isValid = true;

        const emailErrorMessage = validateEmail(email);
        if (emailErrorMessage) {
            setEmailError(emailErrorMessage);
            isValid = false;
        } else {
            setEmailError("");
        }

        const passwordErrorMessage = checkPasswordRequirements(password);
        if (passwordErrorMessage) {
            setPasswordError(passwordErrorMessage);
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (!passConfirm.trim()) {
            setPassConfirmError("Password confirmation is required");
            isValid = false;
        } else if (password !== passConfirm) {
            setPassConfirmError("Passwords do not match");
            isValid = false;
        } else {
            setPassConfirmError("");
        }

        if (!isValid) {
            toast.error("Please correct the highlighted fields.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        let items = { email, password, password_confirmation: passConfirm };

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
            console.warn(result);
            // If success is true, show success alert
            if (result.success) {
                toast.success("Registration Successful!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                setTimeout(() => {
                    navigate("/vendor/login");
                }, 1000); // Delay the navigation for 1 second

            } else {
                toast.error(result.message || "Failed to create account. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }

    };

    return (
        <div className="vendor-signup-wrapper">
            <div className="vendor-signup-container">
                <h2 className="text-center mb-4 vendor-signup-header">Vendor Sign Up</h2>

                <form onSubmit={handleSubmit} className="vendor-signup-form">
                    <div className="form-group mb-3 vendor-form-group">
                        <label htmlFor="email" className="form-label vendor-form-label">
                            <FaEnvelope className="me-2" /> Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={`form-control vendor-form-control ${emailError ? 'is-invalid' : ''}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                        {emailError && <div className="invalid-feedback">{emailError}</div>}
                    </div>

                    <div className="form-group mb-3 vendor-form-group">
                        <label htmlFor="password" className="form-label vendor-form-label">
                            <FaLock className="me-2" /> Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className={`form-control vendor-form-control ${passwordError ? 'is-invalid' : ''}`}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                checkPasswordRequirements(e.target.value);
                            }}
                            placeholder="Enter your password"
                        />
                        {passwordError && <div className="invalid-feedback">{passwordError}</div>}

                        <ul className="password-requirements">
                            <li className={passReqMet.length ? 'met' : ''}>
                                <FaCheckCircle className="me-2" /> At least 8 characters
                            </li>
                            <li className={passReqMet.lowercase ? 'met' : ''}>
                                <FaCheckCircle className="me-2" /> One lowercase letter
                            </li>
                            <li className={passReqMet.uppercase ? 'met' : ''}>
                                <FaCheckCircle className="me-2" /> One uppercase letter
                            </li>
                            <li className={passReqMet.number ? 'met' : ''}>
                                <FaCheckCircle className="me-2" /> One number
                            </li>
                            <li className={passReqMet.special ? 'met' : ''}>
                                <FaCheckCircle className="me-2" /> One special character (!@#$%^&*)
                            </li>
                        </ul>
                    </div>

                    <div className="form-group mb-3 vendor-form-group">
                        <label htmlFor="passConfirm" className="form-label vendor-form-label">
                            <FaCheckCircle className="me-2" /> Confirm Password
                        </label>
                        <input
                            type="password"
                            id="passConfirm"
                            className={`form-control vendor-form-control ${passConfirmError ? 'is-invalid' : ''}`}
                            value={passConfirm}
                            onChange={(e) => setPassConfirm(e.target.value)}
                            placeholder="Confirm your password"
                        />
                        {passConfirmError && <div className="invalid-feedback">{passConfirmError}</div>}
                    </div>

                    <button type="submit" className="btn btn-success vendor-btn-submit w-100">
                        Sign Up
                    </button>
                </form>

                <div className="text-center mt-3">
                    <p className="text-muted">
                        Already have an account? <a href="/vendor/login" className="vendor-login-link">Login here</a>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default RegisterVendor;