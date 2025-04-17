import React, { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './styles/register.css'; // Import custom CSS file


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const navigate = useNavigate();
  let role_id = "User";

    useEffect(() => {
      if (localStorage.getItem('user-info')) {
        navigate("/");
      }
  
    }, [])
  async function signUp(e) {
    e.preventDefault(); // Prevent form submission from refreshing the page

    // Check if the passwords match
    if (password !== passConfirm) {
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

    let items = { name, email, password, password_confirmation: passConfirm, role_id };
    console.warn("FUCK", items)
    try {
      let response = await fetch("http://localhost:8000/api/register", {
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
        toast.success("Registration Successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        localStorage.setItem("user-info", JSON.stringify(result.storeData));
        setTimeout(() => {
          navigate("/login");
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
  }

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="text-center">Sign Up</h2>
        <form >
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-start d-block">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="custom-input" id="name" placeholder="Enter your name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-start d-block">Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="custom-input" id="email" placeholder="Enter your email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-start d-block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="custom-input" id="password" placeholder="Enter your password" required />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm-password" className="form-label text-start d-block">Confirm Password</label>
            <input type="password" value={passConfirm} onChange={(e) => setPassConfirm(e.target.value)} className="custom-input" id="confirm-password" placeholder="Confirm your password" required />
          </div>
          <button type="submit" onClick={signUp} className="btn btn-warning w-100">Sign Up</button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;