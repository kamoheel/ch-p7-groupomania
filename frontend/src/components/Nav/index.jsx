import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from '../../assets/icon-red.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";


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
                            <FontAwesomeIcon icon={faHome} className='nav-icon'/> 
                            <div className="nav--text">Accueil</div>
                        </NavLink>
                    </li>
                    <li className="login">
                        <NavLink className="nav-links" end to={`/login`}>
                            <FontAwesomeIcon icon={faPowerOff} className='login-icon nav-icon'/>
                            <div className="nav--text">Connexion</div>
                        </NavLink>
                    </li>
 
                </ul> 
            </nav>
        )
    };

    return (
        <div className="nav--container">
            <div className="logo--container">
                <img
                    alt="logo de groupomania"
                    src={Logo}
                    onClick={backHome}
                    className="logo-small"
                    width="1400"
                    height="270"
                />
            </div>
            {isLoggedIn ? (
                <nav>
                <ul>
                    <li className="home">
                        <NavLink className="nav-links" end to="/">
                            <FontAwesomeIcon icon={faHome} className='nav-icon'/>
                            <div className="nav--text">Accueil</div>
                        </NavLink>
                    </li>
                    <li className="profil">
                        <NavLink className="nav-links" end to={`/profile/${localUserId}`}>
                            <FontAwesomeIcon icon={faUser} className='nav-icon'/>
                            <div className="nav--text">Profil</div>
                        </NavLink>
                    </li>
                    <li className="signout">
                        <span className="nav-links" onClick={handleDisconnect}>
                            <FontAwesomeIcon icon={faPowerOff} className='nav-icon'/>
                            <div className="nav--text">Déconnexion</div>
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