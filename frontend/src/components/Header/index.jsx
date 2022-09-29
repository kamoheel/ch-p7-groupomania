//import DefaultPicture from '../../assets/profile.png'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NavBar from "../../components/Nav";
import axios from "axios";

const Header= () => {
    const [userId, setUserId] = useState("");
    const [userPseudo, setUserPseudo] = useState("");
    const [allPosts, setAllPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    // const fetchAllPosts = () => {
    //     axios({
    //       method: "GET",
    //       url: `${process.env.REACT_APP_API_URL}api/posts`,
    //       withCredentials: true,
    //       data: {
    //         userId
    //       },
    //     })
    //       .then((res) => {
    //         setAllPosts(res.data);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   };

    useEffect(() => {
        if (!localStorage.getItem("user_info")) {
            
            setIsLoggedIn(false);
            navigate("/login");
            return;
        }
        
        const storageUserId = JSON.parse(localStorage.getItem("user_info")).userId;
        
        //const admin = JSON.parse(localStorage.getItem("user_info")).user.admin;
        setUserPseudo(
          JSON.parse(localStorage.getItem("user_info")).userPseudo
        );
        setIsLoggedIn(true);
    
        // if (admin === 1) {
        //   setIsAdmin(true);
        // }
        setUserId(storageUserId);
        //fetchAllPosts();
      }, [isLoggedIn, navigate]);

    return (
        
        <div>
            <NavBar localUserId={userId} isLoggedIn={isLoggedIn} />
        </div>
    )
}

export default Header;