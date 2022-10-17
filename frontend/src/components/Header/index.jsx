import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NavBar from "../../components/Nav";

const Header= () => {
    const [userId, setUserId] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("user_info")) {
            
            setIsLoggedIn(false);
            navigate("/login");
            return;
        }
        const storageUserId = JSON.parse(localStorage.getItem("user_info")).userId;
        setIsLoggedIn(true);
        setUserId(storageUserId);
      }, [isLoggedIn, navigate]);

    return (
        
        <div>
            <NavBar localUserId={userId} isLoggedIn={isLoggedIn} />
            <h1 className='main--title'>Groupomania, le réseau social de votre entreprise</h1>
        </div>
    )
}

export default Header;