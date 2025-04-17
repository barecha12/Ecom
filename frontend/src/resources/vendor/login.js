import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./style/login.css";  // You may rename the CSS file accordingly

const LoginVendro= () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
    } else {
      setError("");
      // Add authentication logic here (e.g., call API)
      console.log("Logging in with", { email, password });
    }
  };

  return (
    <div className="vendor-login-wrapper">
      <div className="vendor-login-container">
        <h2 className="text-center mb-4 vendor-login-header">Vendor Login</h2>

        {error && <div className="alert alert-danger vendor-error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="vendor-login-form">
          <div className="form-group mb-3 vendor-form-group">
            <label htmlFor="email" className="form-label vendor-form-label">
              <FaUser className="me-2" /> Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control vendor-form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group mb-3 vendor-form-group">
            <label htmlFor="password" className="form-label vendor-form-label">
              <FaLock className="me-2" /> Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control vendor-form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-success vendor-btn-submit w-100">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <a href="/vendor/reset" className="text-muted vendor-forgot-link">
            Forgot Password?
          </a>
          <p className="text-muted">
          Don't have an account? Register? <a href="/vendor/register" className="vendor-login-link">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginVendro;
