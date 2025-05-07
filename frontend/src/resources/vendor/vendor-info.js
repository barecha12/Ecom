import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
=======
import { toast, ToastContainer } from 'react-toastify';
import Translation from "../translations/lang.json";
import 'react-toastify/dist/ReactToastify.css';
>>>>>>> bbc1b58bb257d523ac9e14cfa967f6891aba95ff
import "./style/vendor-info.css";

const VendorInfo = () => {
  const [activeForm, setActiveForm] = useState("personal");
  const [vendorId, setVendorId] = useState(null);
  const navigate = useNavigate();
  const [personalData, setPersonalData] = useState({
    personal_name: "",
    personal_address: "",
    personal_city: "",
    personal_state: "",
    personal_phone: "",
    personal_unique_id: "",
    idPhotoFront: null,
    idPhotoBack: null,
  });
  const [personalErrors, setPersonalErrors] = useState({});

  const handlePersonalFileChange = (e) => {
    const { name, files } = e.target;
    setPersonalData({ ...personalData, [name]: files[0] });
    setPersonalErrors({ ...personalErrors, [name]: "" }); // Clear error on change
  };

  const [businessData, setBusinessData] = useState({
    business_name: "",
    business_address: "",
    business_city: "",
    business_state: "",
    business_phone: "",
    blicense_number: "",
    addressProofImage: null,
    otherProofImages: [],
  });
  const [businessErrors, setBusinessErrors] = useState({});

  const handleBusinessFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "otherProofImages") {
      const selectedFiles = Array.from(files).slice(0, 5);
      setBusinessData({ ...businessData, [name]: selectedFiles });
      setBusinessErrors({ ...businessErrors, [name]: "" }); // Clear error on change
    } else {
      setBusinessData({ ...businessData, [name]: files[0] });
      setBusinessErrors({ ...businessErrors, [name]: "" }); // Clear error on change
    }
  };

  const [bankData, setBankData] = useState({
    bank_name: "",
    account_name: "",
    account_number: "",
  });
  const [bankErrors, setBankErrors] = useState({});

  useEffect(() => {
    const vendorInfo = JSON.parse(localStorage.getItem("vendor-info"));
    if (vendorInfo) {
      setVendorId(vendorInfo.vendor_id);
    }
  }, []);

  const validatePersonal = () => {
    let errors = {};
    if (!personalData.personal_name.trim())
      errors.personal_name = "Name is required";
    if (!personalData.personal_address.trim())
      errors.personal_address = "Address is required";
    if (!personalData.personal_city.trim())
      errors.personal_city = "City is required";
    if (!personalData.personal_state.trim())
      errors.personal_state = "State is required";
    if (!personalData.personal_phone.trim()) {
      errors.personal_phone = "Mobile number is required";
    } else if (!/^\d+$/.test(personalData.personal_phone)) {
      errors.personal_phone = "Invalid mobile number";
    }
    if (!personalData.personal_unique_id.trim())
      errors.personal_unique_id = "Unique ID is required";
    if (!personalData.idPhotoFront)
      errors.idPhotoFront = "ID Photo (Front) is required";
    if (!personalData.idPhotoBack)
      errors.idPhotoBack = "ID Photo (Back) is required";
    setPersonalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateBusiness = () => {
    let errors = {};
    if (!businessData.business_name.trim())
      errors.business_name = "Business Name is required";
    if (!businessData.business_address.trim())
      errors.business_address = "Business Address is required";
    if (!businessData.business_city.trim())
      errors.business_city = "Business City is required";
    if (!businessData.business_state.trim())
      errors.business_state = "Business State is required";
    if (!businessData.business_phone.trim()) {
      errors.business_phone = "Business Mobile is required";
    } else if (!/^\d+$/.test(businessData.business_phone)) {
      errors.business_phone = "Invalid business mobile number";
    }
    if (!businessData.blicense_number.trim())
      errors.blicense_number = "Business License Number is required";
    if (!businessData.addressProofImage)
      errors.addressProofImage = "Address Proof Image is required";
    if (businessData.otherProofImages.length > 5)
      errors.otherProofImages = "Maximum 5 other proof images are allowed";
    setBusinessErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateBank = () => {
    let errors = {};
    if (!bankData.bank_name.trim()) errors.bank_name = "Bank Name is required";
    if (!bankData.account_name.trim())
      errors.account_name = "Account Holder Name is required";
    if (!bankData.account_number.trim())
      errors.account_number = "Account Number is required";
    setBankErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isPersonalComplete = () =>
    Object.keys(personalErrors).length === 0 &&
    Object.entries(personalData).every(([key, val]) => {
      if (typeof val === "string") return val.trim() !== "";
      if (val instanceof File) return val !== null;
      return true;
    });

<<<<<<< HEAD
  const isBusinessComplete = () =>
    Object.keys(businessErrors).length === 0 &&
    businessData.business_name.trim() !== "" &&
    businessData.business_address.trim() !== "" &&
    businessData.business_city.trim() !== "" &&
    businessData.business_state.trim() !== "" &&
    businessData.business_phone.trim() !== "" &&
    businessData.blicense_number.trim() !== "" &&
    businessData.addressProofImage !== null;
=======
  
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
    
  
    const handlePersonalFileChange = (e) => {
        const { name, files } = e.target;
        setPersonalData({ ...personalData, [name]: files[0] });
    };
>>>>>>> bbc1b58bb257d523ac9e14cfa967f6891aba95ff

  const handlePersonalChange = (e) => {
    setPersonalData({ ...personalData, [e.target.name]: e.target.value });
    setPersonalErrors({ ...personalErrors, [e.target.name]: "" }); // Clear error on change
  };

  const handleBusinessChange = (e) => {
    setBusinessData({ ...businessData, [e.target.name]: e.target.value });
    setBusinessErrors({ ...businessErrors, [e.target.name]: "" }); // Clear error on change
  };

  const handleBankChange = (e) => {
    setBankData({ ...bankData, [e.target.name]: e.target.value });
    setBankErrors({ ...bankErrors, [e.target.name]: "" }); // Clear error on change
  };

  const handleVendorSubmit = async (e) => {
    e.preventDefault();
    const isPersonalValid = validatePersonal();
    const isBusinessValid = validateBusiness();
    const isBankValid = validateBank();

    if (!isPersonalValid || !isBusinessValid || !isBankValid) {
      toast.error("Please fill all required fields correctly.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();

    Object.entries(personalData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    Object.entries(businessData).forEach(([key, value]) => {
      if (key === "otherProofImages" && Array.isArray(value)) {
        value.forEach((file) => {
          formData.append("otherProofImages[]", file);
        });
      } else {
        formData.append(key, value);
      }
    });

    Object.entries(bankData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("vendor_id", vendorId);

    try {
      const response = await fetch(
        "http://localhost:8000/api/vendor/vendorinfo",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Vendor Info Submitted!", {
          position: "top-right",
          autoClose: 3000,
        });
        // Optionally navigate to another page or clear the form
        // navigate('/vendor/dashboard');
      } else {
        toast.error("Submission failed. Check your info.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("🔥 Error submitting vendor info:", error);
      toast.error("Something went wrong. Try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const renderPersonalInfo = () => (
    <div className="form-card fade-in">
      <h3>Vendor Personal Information</h3>
      <form>
        <label>Name</label>
        <input
          type="text"
          name="personal_name"
          value={personalData.personal_name}
          onChange={handlePersonalChange}
        />
        {personalErrors.personal_name && (
          <p className="error-message">{personalErrors.personal_name}</p>
        )}

        <label>Address</label>
        <input
          type="text"
          name="personal_address"
          value={personalData.personal_address}
          onChange={handlePersonalChange}
        />
        {personalErrors.personal_address && (
          <p className="error-message">{personalErrors.personal_address}</p>
        )}

        <label>City</label>
        <input
          type="text"
          name="personal_city"
          value={personalData.personal_city}
          onChange={handlePersonalChange}
        />
        {personalErrors.personal_city && (
          <p className="error-message">{personalErrors.personal_city}</p>
        )}

        <label>State</label>
        <input
          type="text"
          name="personal_state"
          value={personalData.personal_state}
          onChange={handlePersonalChange}
        />
        {personalErrors.personal_state && (
          <p className="error-message">{personalErrors.personal_state}</p>
        )}

        <label>Mobile</label>
        <input
          type="text"
          name="personal_phone"
          value={personalData.personal_phone}
          onChange={handlePersonalChange}
        />
        {personalErrors.personal_phone && (
          <p className="error-message">{personalErrors.personal_phone}</p>
        )}

        <label>Unique ID Number</label>
        <input
          type="text"
          name="personal_unique_id"
          value={personalData.personal_unique_id}
          onChange={handlePersonalChange}
        />
        {personalErrors.personal_unique_id && (
          <p className="error-message">{personalErrors.personal_unique_id}</p>
        )}

        <label>ID Photo (Front)</label>
        <input
          type="file"
          name="idPhotoFront"
          accept="image/*"
          onChange={handlePersonalFileChange}
        />
        {personalErrors.idPhotoFront && (
          <p className="error-message">{personalErrors.idPhotoFront}</p>
        )}

        <label>ID Photo (Back)</label>
        <input
          type="file"
          name="idPhotoBack"
          accept="image/*"
          onChange={handlePersonalFileChange}
        />
        {personalErrors.idPhotoBack && (
          <p className="error-message">{personalErrors.idPhotoBack}</p>
        )}
      </form>
    </div>
  );

  const renderBusinessInfo = () => (
    <div className="form-card fade-in">
      <h3>Vendor Business Information</h3>
      <form>
        <label>Business Name</label>
        <input
          type="text"
          name="business_name"
          value={businessData.business_name}
          onChange={handleBusinessChange}
        />
        {businessErrors.business_name && (
          <p className="error-message">{businessErrors.business_name}</p>
        )}

        <label>Business Address</label>
        <input
          type="text"
          name="business_address"
          value={businessData.business_address}
          onChange={handleBusinessChange}
        />
        {businessErrors.business_address && (
          <p className="error-message">{businessErrors.business_address}</p>
        )}

        <label>Business City</label>
        <input
          type="text"
          name="business_city"
          value={businessData.business_city}
          onChange={handleBusinessChange}
        />
        {businessErrors.business_city && (
          <p className="error-message">{businessErrors.business_city}</p>
        )}

        <label>Business State</label>
        <input
          type="text"
          name="business_state"
          value={businessData.business_state}
          onChange={handleBusinessChange}
        />
        {businessErrors.business_state && (
          <p className="error-message">{businessErrors.business_state}</p>
        )}

        <label>Business Phone</label>
        <input
          type="text"
          name="business_phone"
          value={businessData.business_phone}
          onChange={handleBusinessChange}
        />
        {businessErrors.business_phone && (
          <p className="error-message">{businessErrors.business_phone}</p>
        )}

        <label>Business License Number</label>
        <input
          type="text"
          name="blicense_number"
          value={businessData.blicense_number}
          onChange={handleBusinessChange}
        />
        {businessErrors.blicense_number && (
          <p className="error-message">{businessErrors.blicense_number}</p>
        )}

        <label>Address Proof Image</label>
        <input
          type="file"
          name="addressProofImage"
          accept="image/*"
          onChange={handleBusinessFileChange}
        />
        {businessErrors.addressProofImage && (
          <p className="error-message">{businessErrors.addressProofImage}</p>
        )}

        <label>Other Proof Images (Max 5)</label>
        <input
          type="file"
          name="otherProofImages"
          accept="image/*"
          multiple
          onChange={handleBusinessFileChange}
        />
        {businessErrors.otherProofImages && (
          <p className="error-message">{businessErrors.otherProofImages}</p>
        )}
      </form>
    </div>
  );

  const renderBankInfo = () => (
    <div className="form-card fade-in">
      <h3>Vendor Bank Information</h3>
      <form onSubmit={handleVendorSubmit}>
        <label>Bank Name</label>
        <input
          type="text"
          name="bank_name"
          value={bankData.bank_name}
          onChange={handleBankChange}
        />
        {bankErrors.bank_name && (
          <p className="error-message">{bankErrors.bank_name}</p>
        )}

        <label>Account Holder Name</label>
        <input
          type="text"
          name="account_name"
          value={bankData.account_name}
          onChange={handleBankChange}
        />
        {bankErrors.account_name && (
          <p className="error-message">{bankErrors.account_name}</p>
        )}

        <label>Account Number</label>
        <input
          type="text"
          name="account_number"
          value={bankData.account_number}
          onChange={handleBankChange}
        />
        {bankErrors.account_number && (
          <p className="error-message">{bankErrors.account_number}</p>
        )}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );

  const canAccessBusiness = isPersonalComplete();
  const canAccessBank = isBusinessComplete();

  return (
    <div className="vendor-info-container">
      <div className="button-group">
        <button
          className={activeForm === "personal" ? "active-tab" : ""}
          onClick={() => setActiveForm("personal")}
        >
          Personal Info
        </button>

        <button
          className={activeForm === "business" ? "active-tab" : ""}
          onClick={() => {
            if (canAccessBusiness) setActiveForm("business");
            else if (Object.keys(personalErrors).length > 0) {
              toast.error("Please complete the Personal Info form correctly.", {
                position: "top-right",
                autoClose: 3000,
              });
            }
          }}
          disabled={!canAccessBusiness}
        >
          Business Info
        </button>

        <button
          className={activeForm === "bank" ? "active-tab" : ""}
          onClick={() => {
            if (canAccessBank) setActiveForm("bank");
            else if (Object.keys(businessErrors).length > 0) {
              toast.error("Please complete the Business Info form correctly.", {
                position: "top-right",
                autoClose: 3000,
              });
            }
          }}
          disabled={!canAccessBank}
        >
          Bank Info
        </button>
      </div>

      {activeForm === "personal" && renderPersonalInfo()}
      {activeForm === "business" && renderBusinessInfo()}
      {activeForm === "bank" && renderBankInfo()}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default VendorInfo;
