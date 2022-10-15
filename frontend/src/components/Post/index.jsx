import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as farThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faComment as farComment } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import DeletePopUp from "../DeletePopUp";
import EditPopUp from "../EditPopUp";
import Comments from "../Comments";
import defaultProfilePicture from "../../assets/profile.png";

const Post = ({ post, fetchAllPosts, userId, userPseudo, isAdmin }) => {
    const [isPostUser, setIsPostUser] = useState(false);
    const [showEditMenu, setShowEditMenu] =useState(false);
    const [deletePopUp, setDeletePopUp] = useState({
        show: false,
        id: null
    });
    const [editPopUp, setEditPopUp] = useState({
        show: false,
        id: null, 
        description: null
    });
    const [isLiked, setIsLiked] = useState(false);
    const [allComments, setAllComments] = useState([]);
    const [authorPicture, setAuthorPicture] = useState(defaultProfilePicture);
    const [commentsToggle, setCommentsToggle] = useState(false);
    const [commentsCount, setCommentsCount] = useState(0);
    const [hasCommented, setHasCommented] = useState(false);
    const dateString = post.timestamps;
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: 'numeric', minute: 'numeric' }
        return new Date(dateString).toLocaleDateString('fr-FR', options)
    }
    //const dateFormatted = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'long' }).format(date);

    const handleShowEditMenu = () => {
        showEditMenu ? setShowEditMenu(false) : setShowEditMenu(true);
    }

    const handleEdit = (id, description) => {
        setEditPopUp({
            show: true,
            id,
            description,
        });
        setShowEditMenu(false);
    }

    const handleEditConfirmed = () => {
        fetchAllPosts();
        setEditPopUp({
            show: false,
            id: null, 
            description: null
        });
        setShowEditMenu(false);
    }

    const handleEditCanceled = () => {
        setEditPopUp({
            show: false,
            id: null, 
            description: null
        });
        setShowEditMenu(false);
    };

    const handleDelete = (id) => {
        setDeletePopUp({
            show: true,
            id,
        });
        setShowEditMenu(false);
    }
    
    const handleDeleteConfirmed = () => {
        if (deletePopUp.show && deletePopUp.id) {
            axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_URL}api/posts/${deletePopUp.id}`,
            withCredentials: true,
            data: {
                userId
            },
            })
            .then((res) => {
                fetchAllPosts();
                console.log('Le post a bien été supprimé');
                setDeletePopUp({
                    show: false,
                    id: null
                });
            })
            .catch((err) => {
                console.log(`Echec suppression de post : ${err}`);
            });
        }
      };

    const handleDeleteCanceled = () => {
        setDeletePopUp({
            show: false,
            id: null
        });
    };

    const handleLike = (postId) => {
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}api/posts/${postId}/like`,
            withCredentials: true,
            data: {
                userId,
                like: 1,
            },
            })
            .then((res) => {
                fetchAllPosts();
                isLiked ? setIsLiked(false) : setIsLiked(true);
            })
            .catch((err) => {
                console.log(`Echec like de post : ${err}`);
            });
    }

   

     const fetchAuthor = (authorId) => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/auth/${authorId}`,
            withCredentials: true,
            })
            .then((res) => {
                res.data.imageUrl && setAuthorPicture(res.data.imageUrl);
            })
            .catch((err) => {
                console.log(`Echec de récupération photo de l'auteur : ${err}`);
            });  
     }

     const fetchAllComments = useCallback ( 
        () => {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_URL}api/comments/${post._id}`,
                withCredentials: true,
                // data: {
                //     postId: postId,
                // }
                })
                .then((res) => {
                   if (res.data)  {
                        setAllComments(res.data);
                        // fetchAuthor(res.data.commenterId);
                        setCommentsCount(allComments.length);
                        function findUserId(comment){
                            return comment.commenterId === userId;
                        }
                        if (res.data.find(findUserId)) {
                            setHasCommented(true);
                        }
                    };
                    // setCommentsToggle(true);

                })
                .catch((err) => {
                    console.log(`Echec de récupération des commentaires : ${err}`);
                });
            }, [post._id, allComments.length, userId]);

    useEffect(() => {
        //get the post author Picture
        fetchAuthor(post.userId);
        fetchAllComments();
      }, [post.userId, fetchAllComments]);

    useEffect(() => {
        if (post.userId === userId) {
            setIsPostUser(true);
        } else {
            setIsPostUser(false)
        }
    }, [post.userId, userId]);


    useEffect(() => {
        if (post.usersLiked.includes(userId)) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [post.usersLiked, userId])


    const handleShowComments = (postId) => {
        if (!commentsToggle) {
            setCommentsToggle(true);
        }
        else {
            setCommentsToggle(false);
        }
     }

                return (
            <div className='post--container'>

                <div className='profile--picture__container'>
                    
                </div>
                <div className='post--header'>
                <img className='profile--picture' src={authorPicture} alt={`Avatar de ${post.userPseudo}`} />
                <div className='post--header__right'>
                    <span className='post--author'>{post.userPseudo}</span> 
                    <br />
                    <span className='post--date'>{formatDate(dateString)}</span>
                </div>
                </div>
                {/* <h3 className='post--title'> {post.title} </h3> */}
                <p className='post--description'>{post.description}</p>
                {post.imageUrl ? (
                <img className='post--image' src={post.imageUrl} alt={post.title} />
                ) : null }
                <div className='post--footer'>
                    <div className='post--footer__icon post--like' onClick={() => handleLike(post._id)}>
                        {!isLiked ? (
                        <FontAwesomeIcon icon={farThumbsUp} className='footer--icon empty-thumb-icon' />
                        ) : ( 
                        <FontAwesomeIcon icon={faThumbsUp} className='footer--icon full-thumb-icon' /> 
                        )}
                        <div className='post--like__counter'>{post.likes}</div>
                    </div>
                    <div className='post--footer__icon' onClick={() => handleShowComments(post._id)}>
                        {!hasCommented ? (
                            <FontAwesomeIcon icon={farComment} className='footer--icon empty-comment-icon' />
                        ) : (
                            <FontAwesomeIcon icon={faComment} className='footer--icon full-comment-icon' />  
                        )}
                    
                    <div className='post--comment__counter'>{commentsCount}</div>
                    </div>
                </div>
                    {commentsToggle && 
                        <Comments
                            postId={post._id}
                            userId={userId}
                            fetchAuthor={fetchAuthor}
                            isAdmin={isAdmin}
                            commentsToggle={commentsToggle}
                            fetchAllComments={fetchAllComments}
                            allComments={allComments}
                        />
                    }

                {(isPostUser || isAdmin) ? (
                    <div className='post-edit-dropdown'>
                        <FontAwesomeIcon icon={faEllipsisVertical} className='menu-icon' onClick={handleShowEditMenu}/>
                        {showEditMenu && (
                            <ul className='dropdown-list'>
                                <li key='edit' className='list-item list-edit' onClick={() => handleEdit(post._id, post.description)}>
                                <FontAwesomeIcon icon={faPenToSquare} className='fa-icon'/>
                                     Modifier
                                </li>
                                
                                <li key='delete' className='list-item list-delete' onClick={() => handleDelete(post._id)}>
                                <FontAwesomeIcon icon={faTrash} className='fa-icon'/>
                                     Supprimer
                                </li>

                            </ul>
                        )} 
                    </div>
                ) : null }

                {editPopUp.show && (
                    <EditPopUp 
                    postId={editPopUp.id}
                    postDescription={editPopUp.description}
                    handleEditConfirmed={handleEditConfirmed}
                    handleEditCanceled={handleEditCanceled}
                    />
                )}
                {deletePopUp.show && (
                    <DeletePopUp
                    handleDeleteConfirmed={handleDeleteConfirmed}
                    handleDeleteCanceled={handleDeleteCanceled}
                    />
                )}
            </div>
        )
}

Post.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
}
 
Post.defaultProps = {
    title: '',
    description: '',
    imageUrl: defaultProfilePicture,
}

export default Post