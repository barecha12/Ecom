import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Translation from "../translations/lang.json";
import "react-toastify/dist/ReactToastify.css";
import "./style/login.css";

const LoginVendro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  
  const defaultFontSize = 'medium';
  const defaultFontColor = '#000000';
  const defaultLanguage = 'english'; // Default language

  const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontSize') || defaultFontSize);
  const [fontColor, setFontColor] = useState(() => localStorage.getItem('fontColor') || defaultFontColor);
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || defaultLanguage);
  const [content, setContent] = useState(Translation[language]);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-size', fontSize);
    document.documentElement.style.setProperty('--font-color', fontColor);
    
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('fontColor', fontColor);
    localStorage.setItem('language', language);

    // Update content based on selected language
    setContent(Translation[language]);
  }, [fontSize, fontColor, language]);
  

  const navigate = useNavigate();

  useEffect(() => {
    const vendorInfo = localStorage.getItem("vendor-info");
    const userInfo = localStorage.getItem("user-info");
    const adminInfo = localStorage.getItem("admin-info");
    if (vendorInfo) {
      const vendor = JSON.parse(vendorInfo);
      //status check
      if (vendor.status === "Pending") {
        navigate("/underreview/");
      } else if (vendor.status === "Rejected") {
        navigate("/vendor-info/");
      } else if (vendor.status === "UnVerified") {
        navigate("/vendor-info/");
      } else if (vendor.status === "Suspended") {
        navigate("/suspend/");
      } else {
        navigate("/vendor/");
      }

    }

    if (userInfo) {
      navigate("/");
    }
    if (adminInfo) {
      navigate("/admin/");
    }





  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {

      toast.error("Please enter both email and password.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const items = { email, password };
    try {
      let response = await fetch("http://localhost:8000/api/vendor/login", {
        method: "POST",
        body: JSON.stringify(items),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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
        localStorage.clear();
        localStorage.setItem("vendor-info", JSON.stringify(result.storeData));

        setTimeout(() => {
          if (result.storeData.status === "Pending") {
            navigate("/vendor/underreview/");
          } else if (result.storeData.status === "Verified") {
            navigate("/vendor/");
          } else if (result.storeData.status === "Rejected") {
            navigate("/vendor/vendor-info/");
          } else if (result.storeData.status === "Suspended") {
            navigate("/vendor/suspend/");
          } else if (result.storeData.status === "UnVerified") {
            navigate("/vendor/vendor-info/");
          }
        }, 1000);
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
    } catch (err) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="vendor-login-wrapper">
      <div className="vendor-login-container">
        <h2 className="text-center mb-4 vendor-login-header">Vendor Login</h2>

        <form onSubmit={login} className="vendor-login-form">
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
            <label
              htmlFor="password"
              className="form-label vendor-form-label"
            >
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

          <button
            type="submit"
            className="btn btn-success vendor-btn-submit w-100"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <a href="/vendor/reset" className="text-muted vendor-forgot-link">
            Forgot Password?
          </a>
          <p className="text-muted">
            Don't have an account?{" "}
            <a href="/vendor/register" className="vendor-login-link">
              Register here
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginVendro;
