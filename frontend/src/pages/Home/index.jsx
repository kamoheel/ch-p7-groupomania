import { useNavigate, NavLink } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Post from "../../components/Post";
import CreatePost from "../../components/CreatePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

const Home= () => {
    const [allPosts, setAllPosts] = useState([]);
    const [userId, setUserId] = useState("");
    const [userPseudo, setUserPseudo] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    //useCallback to not re-render if the dependancy does not change
    const fetchAllPosts = useCallback(
      () => {
        axios({
          method: "GET",
          url: `${process.env.REACT_APP_API_URL}api/posts`,
          withCredentials: true,
          data: {
            userId
          },
        })
          .then((res) => {
            setAllPosts(res.data);
          })
          .catch((err) => {
            console.log(err);
            // alert("Il y a une erreur, veuillez vous reconnecter")
            // navigate("/login");
            // localStorage.clear();
          }
          );
      }, [userId],
    );

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
          setIsLoggedIn(true)
      
        //   if (admin === 1) {
        //     setIsAdmin(true);
        //   }
          setUserId(storageUserId);
          fetchAllPosts();
    }, [fetchAllPosts, navigate]);

    return (
        <div>
            <h1 className='main-title'>Groupomania, le réseau social de votre entreprise</h1>
            <h2 className='main-subtitle'>Bienvenue {userPseudo}, retrouvez ce que vos collègues ont posté</h2>
            {isLoggedIn ? (
              <div>
                <div className='posts-container'>
                    {allPosts.map((post, pos) => {
                        allPosts.sort((a, b) => b.timestamps < a.timestamps );
                        return (
                        <div className="key-posts" key={pos}>
                            <Post
                            post={post}
                            fetchAllPosts={fetchAllPosts}
                            userId={userId}
                            userPseudo={userPseudo}
                            // isAdmin={isAdmin}
                            />
                        </div>
                        );
                    })
                }
                </div>
                <CreatePost 
                fetchAllPosts={fetchAllPosts}
                userId={userId}
                userPseudo={userPseudo}
                />
              </div>
        ) : (
          <NavLink className="nav-links" end to={`/login`}>
            Par ici pour vous inscrire ou vous connecter !
          <FontAwesomeIcon icon={faPowerOff} className='login-icon'/>
        </NavLink>

        )}
        </div>
    )
}

export default Home;