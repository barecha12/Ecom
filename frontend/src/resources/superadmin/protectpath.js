
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
function ProtectPathSAdmin(props) {
    let Cmp = props.Cmp
    const navigate = useNavigate();
    useEffect(() => {
        try {
            const adminInfo = localStorage.getItem("admin-info");

            if (!adminInfo) {
                navigate("/superadmin/login");
            } else {
                const admin = JSON.parse(adminInfo);

                if (admin.admin_role_id === "Admin") {
                    navigate("/admin/");
                } else if (!admin.admin_role_id) {
                    navigate("/");
                }
            }
        } catch (err) {
            console.error("Invalid admin-info in localStorage", err);
            navigate("/admin/login");
        }

    }, [])
    return (
        <div>
            <Cmp />
        </div>
    );
}

export default ProtectPathSAdmin;