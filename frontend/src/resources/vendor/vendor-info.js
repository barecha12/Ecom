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
        mobile: ''
    });

    const [businessData, setBusinessData] = useState({
        shopName: '',
        shopAddress: '',
        shopCity: ''
    });

    const [bankData, setBankData] = useState({
        bankName: '',
        accountHolder: '',
        accountNumber: ''
    });

    const isPersonalComplete = Object.values(personalData).every(val => val.trim() !== '');
    const isBusinessComplete = Object.values(businessData).every(val => val.trim() !== '');

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

        const vendorPayload = {
            ...personalData,
            ...businessData,
            ...bankData
        };

        try {
            console.warn("Fuck",vendorPayload);
            const response = await fetch("http://localhost:8000/api/vendorinfo", {
                method: "POST",
                body: JSON.stringify(vendorPayload),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
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
