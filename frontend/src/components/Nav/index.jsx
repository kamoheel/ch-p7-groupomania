import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from '../../assets/icon-red.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

const NavBar = ({localUserId}) => {
    const navigate = useNavigate();

    const backHome = () => {
        navigate("/");
    };

    const handleDisconnect = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/auth/logout`,
            withCredentials: true,
          })
            .then((res) => {
              localStorage.clear();
              navigate("/login");
            })
            .catch((err) => {
              console.log(err);
            });
        };

    return (
        <div className="container">
            <img
                alt="logo de groupomania"
                src={Logo}
                onClick={backHome}
            />
            <nav>
                <ul>
                    <li className="Home">
                        <NavLink className="nav-links" end to="/">
                            <FontAwesomeIcon icon={faHome} />
                        </NavLink>
                    </li>
                    <li className="profil">
                        <NavLink className="nav-links" end to={`/profile/${localUserId}`}>
                            <FontAwesomeIcon icon={faUser} />
                        </NavLink>
                    </li>
                    <li className="signout">
                        <span className="nav-links" onClick={handleDisconnect}>
                            <FontAwesomeIcon icon={faSignOut} />
                        </span>
                    </li>
                </ul>
            </nav>

        </div>
    )
}

export default NavBar