import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './styles/login.css'; // Import custom CSS file


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate("/");
    }

  }, [])
  async function login(e) {
    e.preventDefault();

    let items = { email, password };

    try {
      let response = await fetch("http://localhost:8000/api/login", {
        method: 'POST',
        body: JSON.stringify(items),
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        }
      });

      let result = await response.json();

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
        setTimeout(() => {
          navigate("/");
        }, 1000); // Delay the navigation for 3 seconds
      } else {
        toast.error("Login Failed. Please check your credentials.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  }


  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="text-center">Login</h2>
        <form >
          <div className="mb-3">
            <label htmlFor="email" className="custom-form-label text-start d-block">Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="custom-form-control" id="email" placeholder="Enter your email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="custom-form-label text-start d-block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="custom-form-control" id="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" onClick={login} className="btn btn-warning w-100">Login</button>
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