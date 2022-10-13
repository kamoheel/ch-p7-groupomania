import { useNavigate, NavLink } from "react-router-dom";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import Post from "../../components/Post";
import CreatePost from "../../components/CreatePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";


const Home= () => {
    const [allPosts, setAllPosts] = useState([]);
    const [userId, setUserId] = useState("");
    const [userPseudo, setUserPseudo] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const createRef = useRef(null);

    const navigate = useNavigate();

    //scroll to create a post
    const executeScroll = () => createRef.current.scrollIntoView();

    const handleScrollToTop = () =>  window.scrollTo(0, 0);

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
          setIsLoggedIn(true);

      
        //   if (admin === 1) {
        //     setIsAdmin(true);
        //   }
          setUserId(storageUserId);
          fetchAllPosts();
    }, [fetchAllPosts, navigate]);

    useEffect(() => {
      axios({
          method: "GET",
          url: `${process.env.REACT_APP_API_URL}api/auth/${userId}`,
          withCredentials: true,
          })
          .then((res) => {
              res.data.isAdmin ? setIsAdmin(true) : setIsAdmin(false);
              console.log("Info admin récupérée");
          })
          .catch((err) => {
              console.log(`Echec de récupération info administrateur : ${err}`);
          });
  }, [isAdmin, userId])

    return (
        <div className="home--container">
            <h1 className='main--title'>Groupomania, le réseau social de votre entreprise</h1>
            {isAdmin ? <h2>Vous êtes administrateur !</h2> : <h2 className='main--subtitle'>Bienvenue <span className="bold">{userPseudo}</span>, retrouvez ce que vos collègues ont publié</h2>}
            {isLoggedIn ? (
              <div>
                <div className='posts--container' id="post-container">
                    <button className="create--btn" onClick={executeScroll}><FontAwesomeIcon icon={faPlus} className='create-icon'/></button>
                    {allPosts.map((post, pos) => {
                        allPosts.sort((a, b) => a.timestamps < b.timestamps );
                        return (
                        <div className="key-posts" key={pos}>
                            <Post
                            post={post}
                            fetchAllPosts={fetchAllPosts}
                            userId={userId}
                            userPseudo={userPseudo}
                            isAdmin={isAdmin}
                            />
                        </div>
                        );
                    })
                }
                </div>
                <CreatePost 
                refProp={createRef}
                fetchAllPosts={fetchAllPosts}
                userId={userId}
                userPseudo={userPseudo}
                />
                <button className="scroll--btn" onClick={handleScrollToTop}><FontAwesomeIcon icon={faArrowUp} className='scroll-icon'/></button>
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