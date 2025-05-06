import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import Translation from "../translations/lang.json";
import { useNavigate } from "react-router-dom";
import "./style/register.css";  // Make sure this points to your custom CSS file

const RegisterVendor = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const navigate = useNavigate();

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
  
  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password || !passConfirm) {
      toast.error("Please fill out all fields.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    } else if (password !== passConfirm) {
      toast.error("Passwords do not match. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

let items = {email, password, password_confirmation: passConfirm };

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
        }, 1000); // Delay the navigation for 3 seconds

      } else {
        toast.error("Failed to create account. Please try again.", {
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

          <div className="form-group mb-3 vendor-form-group">
            <label htmlFor="passConfirm" className="form-label vendor-form-label">
              <FaCheckCircle className="me-2" /> Confirm Password
            </label>
            <input
              type="password"
              id="passConfirm"
              className="form-control vendor-form-control"
              value={passConfirm}
              onChange={(e) => setPassConfirm(e.target.value)}
              placeholder="Confirm your password"
            />
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
