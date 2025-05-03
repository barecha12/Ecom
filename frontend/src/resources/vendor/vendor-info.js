import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style/vendor-info.css";

const VendorInfo = () => {
    const [activeForm, setActiveForm] = useState('personal');
    const [vendorId, setVendorId] = useState(null);
    const navigate = useNavigate();
    const [personalData, setPersonalData] = useState({
        personal_name: '',
        personal_address: '',
        personal_city: '',
        personal_state: '',
        personal_phone: '',
        personal_unique_id: '',
        idPhotoFront: null,
        idPhotoBack: null
    });

    const handlePersonalFileChange = (e) => {
        const { name, files } = e.target;
        setPersonalData({ ...personalData, [name]: files[0] });
    };

    const [businessData, setBusinessData] = useState({
        business_name: '',
        business_address: '',
        business_city: '',
        business_state: '',
        business_phone: '',
        blicense_number: '',
        addressProofImage: null,
        otherProofImages: []
    });

    const handleBusinessFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'otherProofImages') {
            const selectedFiles = Array.from(files).slice(0, 5);
            setBusinessData({ ...businessData, [name]: selectedFiles });
        } else {
            setBusinessData({ ...businessData, [name]: files[0] });
        }
    };

    const [bankData, setBankData] = useState({
        bank_name: '',
        account_name: '',
        account_number: ''
    });

    useEffect(() => {
        const vendorInfo = JSON.parse(localStorage.getItem('vendor-info'));
        if (vendorInfo) {
            setVendorId(vendorInfo.vendor_id);
        }
    }, []);

    const isPersonalComplete = Object.entries(personalData).every(([key, val]) => {
        if (typeof val === 'string') return val.trim() !== '';
        if (val instanceof File) return val !== null;
        return false;
    });

    const isBusinessComplete = (
        businessData.business_name.trim() !== '' &&
        businessData.business_address.trim() !== '' &&
        businessData.business_city.trim() !== '' &&
        businessData.business_state.trim() !== '' &&
        businessData.business_phone.trim() !== '' &&
        businessData.blicense_number.trim() !== '' &&
        businessData.addressProofImage !== null
    );

    const handlePersonalChange = (e) => {
        setPersonalData({ ...personalData, [e.target.name]: e.target.value });
    };

    const handleBusinessChange = (e) => {
        setBusinessData({ ...businessData, [e.target.name]: e.target.value });
    };

    const handleBankChange = (e) => {
        setBankData({ ...bankData, [e.target.name]: e.target.value });
    };

    const handleVendorSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.entries(personalData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        Object.entries(businessData).forEach(([key, value]) => {
            if (key === 'otherProofImages' && Array.isArray(value)) {
                value.forEach((file) => {
                    formData.append('otherProofImages[]', file);
                });
            } else {
                formData.append(key, value);
            }
        });

        Object.entries(bankData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        formData.append('vendor_id', vendorId);

        try {
            const response = await fetch("http://localhost:8000/api/vendor/vendorinfo", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                toast.success("Vendor Info Submitted!", {
                    position: "top-right",
                    autoClose: 3000,
                });
              
            } else {
                toast.error("Submission failed. Check your info.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }

        } catch (error) {
            console.error('🔥 Error submitting vendor info:', error);
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
                <input type="text" name="personal_name" value={personalData.personal_name} onChange={handlePersonalChange} />

                <label>Address</label>
                <input type="text" name="personal_address" value={personalData.personal_address} onChange={handlePersonalChange} />

                <label>City</label>
                <input type="text" name="personal_city" value={personalData.personal_city} onChange={handlePersonalChange} />

                <label>State</label>
                <input type="text" name="personal_state" value={personalData.personal_state} onChange={handlePersonalChange} />

                <label>Mobile</label>
                <input type="text" name="personal_phone" value={personalData.personal_phone} onChange={handlePersonalChange} />

                <label>Unique ID Number</label>
                <input type="text" name="personal_unique_id" value={personalData.personal_unique_id} onChange={handlePersonalChange} />

                <label>ID Photo (Front)</label>
                <input type="file" name="idPhotoFront" accept="image/*" onChange={handlePersonalFileChange} />

                <label>ID Photo (Back)</label>
                <input type="file" name="idPhotoBack" accept="image/*" onChange={handlePersonalFileChange} />
            </form>
        </div>
    );

    const renderBusinessInfo = () => (
        <div className="form-card fade-in">
            <h3>Vendor Business Information</h3>
            <form>
                <label>Business Name</label>
                <input type="text" name="business_name" value={businessData.business_name} onChange={handleBusinessChange} />

                <label>Business Address</label>
                <input type="text" name="business_address" value={businessData.business_address} onChange={handleBusinessChange} />

                <label>Business City</label>
                <input type="text" name="business_city" value={businessData.business_city} onChange={handleBusinessChange} />

                <label>Business State</label>
                <input type="text" name="business_state" value={businessData.business_state} onChange={handleBusinessChange} />

                <label>Business Phone</label>
                <input type="text" name="business_phone" value={businessData.business_phone} onChange={handleBusinessChange} />

                <label>Business License Number</label>
                <input type="text" name="blicense_number" value={businessData.blicense_number} onChange={handleBusinessChange} />

                <label>Address Proof Image</label>
                <input type="file" name="addressProofImage" accept="image/*" onChange={handleBusinessFileChange} />

                <label>Other Proof Images (Max 5)</label>
                <input type="file" name="otherProofImages" accept="image/*" multiple onChange={handleBusinessFileChange} />
            </form>
        </div>
    );

    const renderBankInfo = () => (
        <div className="form-card fade-in">
            <h3>Vendor Bank Information</h3>
            <form onSubmit={handleVendorSubmit}>
                <label>Bank Name</label>
                <input type="text" name="bank_name" value={bankData.bank_name} onChange={handleBankChange} />

                <label>Account Holder Name</label>
                <input type="text" name="account_name" value={bankData.account_name} onChange={handleBankChange} />

                <label>Account Number</label>
                <input type="text" name="account_number" value={bankData.account_number} onChange={handleBankChange} />

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );

    const canAccessBusiness = isPersonalComplete;
    const canAccessBank = isBusinessComplete;

    return (
        <div className="vendor-info-container">
            <div className="button-group">
                <button
                    className={activeForm === 'personal' ? 'active-tab' : ''}
                    onClick={() => setActiveForm('personal')}
                >
                    Personal Info
                </button>

                <button
                    className={activeForm === 'business' ? 'active-tab' : ''}
                    onClick={() => {
                        if (canAccessBusiness) setActiveForm('business');
                    }}
                    disabled={!canAccessBusiness}
                >
                    Business Info
                </button>

                <button
                    className={activeForm === 'bank' ? 'active-tab' : ''}
                    onClick={() => {
                        if (canAccessBank) setActiveForm('bank');
                    }}
                    disabled={!canAccessBank}
                >
                    Bank Info
                </button>
            </div>

            {activeForm === 'personal' && renderPersonalInfo()}
            {activeForm === 'business' && renderBusinessInfo()}
            {activeForm === 'bank' && renderBankInfo()}

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default VendorInfo;
