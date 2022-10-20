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
      //expiration du localStorage après 24h
      const hours = 24;
      const now = new Date().getTime();
      const setupTime = localStorage.getItem('setupTime');
      if (setupTime == null) {
        localStorage.setItem('setupTime', now)
      } else {
        if(now-setupTime > hours*60*60*1000) {
          localStorage.clear();
          localStorage.setItem('setupTime', now);
        }
      }

        if (!localStorage.getItem("user_info")) {
          setIsLoggedIn(false);
          navigate("/login");
          return;
          } else {
          const storageUserId = JSON.parse(localStorage.getItem("user_info")).userId;
          setUserPseudo(
            JSON.parse(localStorage.getItem("user_info")).userPseudo
          );
          setIsLoggedIn(true);
          setUserId(storageUserId);
          fetchAllPosts();
          if (userId) {
          axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/auth/${userId}`,
            withCredentials: true,
            })
            .then((res) => {
                res.data.isAdmin ? setIsAdmin(true) : setIsAdmin(false);
            })
            .catch((err) => {
                console.log(`Echec de récupération info administrateur : ${err}`);
            });
          }
          }
    }, [fetchAllPosts, navigate, isAdmin, userId]);

    return (
        <div className="home--container">
            {/* <h1 className='main--title'>Groupomania, le réseau social de votre entreprise</h1> */}
            {isAdmin ? <h2>Vous êtes administrateur !</h2> : <h2 className='main--subtitle'>Bienvenue <span className="bold">{userPseudo}</span>, retrouvez ce que vos collègues ont publié</h2>}
            {isLoggedIn ? (
              <div>
                <div className='posts--container' id="post-container">
                    <button className="create--btn" onClick={executeScroll} aria-label="Nouvelle publication"><FontAwesomeIcon icon={faPlus} className='create-icon'/></button>
                    {allPosts.map((post, pos) => {
                        allPosts.sort(function(a, b) {
                          if (a.timestamps < b.timestamps) {
                            return 1;
                          }
                          if (a.timestamps > b.timestamps) {
                            return -1;
                          }
                          return 0;
                        });
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
                <button className="scroll--btn" onClick={handleScrollToTop} aria-label="Haut-de-page"><FontAwesomeIcon icon={faArrowUp} className='scroll-icon'/></button>
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