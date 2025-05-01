import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './styles/login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('user-info');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      if (user.admin_role_id === "SuperAdmin") {
        navigate("/superadmin/");
      } else if (user.vendor_role_id === "Vendor") {
        navigate("/vendor/");
      } else if (user.admin_role_id === "Admin") {
        navigate("/admin/");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        }
      });

      const result = await response.json();
      
      if (!response.ok) {
        // Handle Laravel validation errors
        if (result.errors) {
          const backendErrors = {};
          Object.keys(result.errors).forEach(key => {
            backendErrors[key] = result.errors[key][0];
          });
          setErrors(backendErrors);
          return;
        }
        
        throw new Error(result.message || "Login failed");
      }

      if (result.success) {
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        localStorage.setItem("user-info", JSON.stringify(result.storeData));
        
        // Redirect based on user role
        setTimeout(() => {
          if (result.storeData.admin_role_id === "SuperAdmin") {
            navigate("/superadmin/");
          } else if (result.storeData.vendor_role_id === "Vendor") {
            navigate("/vendor/");
          } else if (result.storeData.admin_role_id === "Admin") {
            navigate("/admin/");
          } else {
            navigate("/");
          }
        }, 1000);
      } else {
        toast.error(result.message || "Login Failed. Please check your credentials.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again later.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="text-center">Login</h2>
        <form onSubmit={login}>
          <div className="mb-3">
            <label htmlFor="email" className="custom-form-label text-start d-block">Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`custom-form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              placeholder="Enter your email"
            />
            {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="custom-form-label text-start d-block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`custom-form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              placeholder="Enter your password"
            />
            {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
          </div>
          <button
            type="submit"
            className="btn btn-warning w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-3">
          <a href="/reset" className="forgot-password">Forgot Password?</a>
        </p>
        <p className="text-center mt-2">
          Don't have an account? <a href="/signup">Register</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;