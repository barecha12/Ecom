import React, { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './styles/reset.css'; // Import custom CSS file

function Reset() {
  const [email, setEmail] = useState("");
  const [otpcode, setOtpCode] = useState("");
  const navigate = useNavigate();

    useEffect(() => {
      if (localStorage.getItem('user-info')) {
        navigate("/");
      }
  
    }, [])

  async function reset(e) {
    e.preventDefault();
    if (!email || !otpcode) {
      toast.error("Email and Otp can't cant be blank", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    let items = { email, otpcode };
    try {
      let response = await fetch("http://localhost:8000/api/reset", {
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
        toast.success("Update Your Password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate("/newpassword");
        }, 1000); // Delay the navigation for 3 seconds

      } else {
        toast.error("Invalid Email Or Otp!", {
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

  async function getcode(e) {
    e.preventDefault();

    if (!email) {
      toast.error("Email can't cant be blank", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    let items = { email };
    console.warn("FUCK", items)
    try {
      let response = await fetch("http://localhost:8000/api/getcode", {
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
        toast.success("Check Your Email!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

      } else {
        toast.error("Invalid Email!", {
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
    <div className="login-container">
      <div className="login-form">
        <h2 className="text-center">Reset Password</h2>
        <form >
          <div className="mb-3">
            <label htmlFor="email" className="custom-form-label text-start d-block">Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="custom-form-control" id="email" placeholder="Enter your email" required />

            <div className="input-group mt-3">
              <input
                type="text"
                value={otpcode} onChange={(e) => setOtpCode(e.target.value)}
                className="custom-form-control"
                placeholder="Search products..."
              />
              <button onClick={getcode} className="btn btn-warning">Get Code</button>
            </div>
          </div>

          <button type="submit" onClick={reset} className="btn btn-warning w-100">Reset Password</button>
        </form>
        <p className="text-center mt-3">
          <a href="/login" className="forgot-password">Back to Login</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Reset;