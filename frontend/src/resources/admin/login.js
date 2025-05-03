import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "./style/login.css"; // Import the custom CSS

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Please fill in all fields.");
    } else {
      const payload = { email, password }; // Prepare the payload
      try {
        console.warn("Payload:", payload); // Log the payload for debugging
        let response = await fetch("http://localhost:8000/api/admin/login", {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json',
          },
        });

        let result = await response.json();

        if (result.success) {
          toast.success("Login successful!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          localStorage.clear();
          localStorage.setItem("admin-info", JSON.stringify(result.admin));
          setTimeout(() => {
            navigate("/admin/");
          }, 1000);
        } else {
          toast.error("Login failed. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <div className="alert-superadmin">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input
              className="form-control-superadmin"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control-superadmin"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn-superadmin" type="submit">
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginAdmin;