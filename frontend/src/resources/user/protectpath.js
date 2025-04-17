
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
function ProtectPath(props) {
let Cmp=props.Cmp
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            navigate("/login");
        } 
    }, [])
    return (
        <div>
            <Cmp/>
        </div>
    );
}

export default ProtectPath;