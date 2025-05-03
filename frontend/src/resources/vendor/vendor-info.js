import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style/vendor-info.css";

const VendorInfo = () => {
    const [activeForm, setActiveForm] = useState('personal');

    const [personalData, setPersonalData] = useState({
        name: '',
        address: '',
        city: '',
        region: '',
        mobile: '',
        idNumber: '',
        idPhotoFront: null,
        idPhotoBack: null
    });

    const handlePersonalFileChange = (e) => {
        const { name, files } = e.target;
        setPersonalData({ ...personalData, [name]: files[0] });
    };

    const [businessData, setBusinessData] = useState({
        shopName: '',
        shopAddress: '',
        shopCity: '',
        state: '',
        shopMobile: '',
        businessLicenseNumber: '',
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
        bankName: '',
        accountHolder: '',
        accountNumber: ''
    });

    const isPersonalComplete = Object.entries(personalData).every(([key, val]) => {
        if (typeof val === 'string') return val.trim() !== '';
        if (val instanceof File) return val !== null;
        return false;
    });

    const isBusinessComplete = (
        businessData.shopName.trim() !== '' &&
        businessData.shopAddress.trim() !== '' &&
        businessData.shopCity.trim() !== '' &&
        businessData.state.trim() !== '' &&
        businessData.shopMobile.trim() !== '' &&
        businessData.businessLicenseNumber.trim() !== '' &&
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
                value.forEach((file, index) => {
                    formData.append(`otherProofImages[${index}]`, file);
                });
            } else {
                formData.append(key, value);
            }
        });

        Object.entries(bankData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            console.warn('📦 Sending vendor info:', formData);
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
                <input type="text" name="name" value={personalData.name} onChange={handlePersonalChange} />

                <label>Address</label>
                <input type="text" name="address" value={personalData.address} onChange={handlePersonalChange} />

                <label>City</label>
                <input type="text" name="city" value={personalData.city} onChange={handlePersonalChange} />

                <label>Region</label>
                <input type="text" name="region" value={personalData.region} onChange={handlePersonalChange} />

                <label>Mobile</label>
                <input type="text" name="mobile" value={personalData.mobile} onChange={handlePersonalChange} />

                <label>ID Number</label>
                <input type="text" name="idNumber" value={personalData.idNumber} onChange={handlePersonalChange} />

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
                <label>Shop Name</label>
                <input type="text" name="shopName" value={businessData.shopName} onChange={handleBusinessChange} />

                <label>Shop Address</label>
                <input type="text" name="shopAddress" value={businessData.shopAddress} onChange={handleBusinessChange} />

                <label>Shop City</label>
                <input type="text" name="shopCity" value={businessData.shopCity} onChange={handleBusinessChange} />

                <label>State</label>
                <input type="text" name="state" value={businessData.state} onChange={handleBusinessChange} />

                <label>Shop Mobile</label>
                <input type="text" name="shopMobile" value={businessData.shopMobile} onChange={handleBusinessChange} />

                <label>Business License Number</label>
                <input type="text" name="businessLicenseNumber" value={businessData.businessLicenseNumber} onChange={handleBusinessChange} />

                <label>Address Proof (Image)</label>
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
                <input type="text" name="bankName" value={bankData.bankName} onChange={handleBankChange} />

                <label>Account Holder Name</label>
                <input type="text" name="accountHolder" value={bankData.accountHolder} onChange={handleBankChange} />

                <label>Account Number</label>
                <input type="text" name="accountNumber" value={bankData.accountNumber} onChange={handleBankChange} />

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



