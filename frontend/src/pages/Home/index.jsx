//import DefaultPicture from '../../assets/profile.png'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../../components/Post";

const Home= () => {
    const [allPosts, setAllPosts] = useState([]);
    const [userId, setUserId] = useState("");
    const [userPseudo, setUserPseudo] = useState("");

    const navigate = useNavigate();

    const fetchAllPosts = () => {
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
          });
      };

    useEffect(() => {
        if (!localStorage.getItem("user_info")) {
            navigate("/login");
            return;
          }
          const storageUserId = JSON.parse(localStorage.getItem("user_info")).userId;
          //const admin = JSON.parse(localStorage.getItem("user_info")).user.admin;
          setUserPseudo(
            JSON.parse(localStorage.getItem("user_info")).userPseudo
          );
      
        //   if (admin === 1) {
        //     setIsAdmin(true);
        //   }
          setUserId(storageUserId);
          fetchAllPosts();
    }, []);

    return (
        <div>
            <h1 className='main-title'>Groupomania, le réseau social de votre entreprise</h1>
            <h2 className='main-subtitle'>Retrouvez ce que vos collègues ont posté</h2>
            <div className='posts-container'>
                {allPosts.map((post, pos) => {
                    allPosts.sort((a, b) => b.timestamps < a.timestamps );
                    return (
                    <div className="key-posts" key={pos}>
                        <Post
                        post={post}
                        fetchAllPosts={fetchAllPosts}
                        userId={userId}
                        // isAdmin={isAdmin}
                        />
                    </div>
                    );
                })
            }
            </div>
        </div>
    )
}

export default Home;