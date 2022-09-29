import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from '../../assets/icon-red.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ localUserId, isLoggedIn }) => {

    const navigate = useNavigate();

    const backHome = () => {
        navigate("/");
    };

    const handleDisconnect = (isLoggedIn) => {
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

    function GuestNavBar() {
        return (
            <nav>
                <ul>
                    <li className="home">
                        <NavLink className="nav-links" end to="/">
                            <FontAwesomeIcon icon={faHome} />
                        </NavLink>
                    </li>
                    <li className="login">
                        <NavLink className="nav-links" end to={`/login`}>
                            <FontAwesomeIcon icon={faArrowRightToBracket} />
                        </NavLink>
                    </li>
 
                </ul> 
            </nav>
        )
    };

    return (
        <div className="container">
            <img
                alt="logo de groupomania"
                src={Logo}
                onClick={backHome}
                className="logo-small"
            />
            {isLoggedIn ? (
                <nav>
                <ul>
                    <li className="home">
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
                ) : (
                <GuestNavBar />
                )}
        </div>
    )
}

export default NavBar