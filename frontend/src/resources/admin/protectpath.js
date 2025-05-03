
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
function ProtectPathAdmin(props) {
let Cmp=props.Cmp
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('admin-info') ) {
            navigate("/admin/login");
           
        }
        //  else if(localStorage.getItem('vendor-info')) {
        //     const userInfo = localStorage.getItem("vendor-info");
        //     const vendor = JSON.parse(userInfo);

        //     if(vendor.status === "Pending"){
        //         navigate("/vendor/underreview/");
        //       }else if(vendor.status === "Verified"){
        //         navigate("/vendor/");
        //       }else if(vendor.status === "Rejected"){
        //         navigate("/vendor/vendor-info/");
        //       }else if(vendor.status === "Suspended"){
        //         navigate("/vendor/suspend/");
        //       } 
            
        // }
    }, [])
    return (
        <div>
            <Cmp/>
        </div>
    );
}

export default ProtectPathAdmin;