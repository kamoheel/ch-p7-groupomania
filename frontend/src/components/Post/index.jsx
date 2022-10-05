import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import DefaultPicture from '../../assets/profile.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import DeletePopUp from "../DeletePopUp";
import EditPopUp from "../EditPopUp";
// import { useTheme } from '../../utils/hooks';

const Post = ({ post, fetchAllPosts, userId, userPseudo }) => {
    const [isPostUser, setIsPostUser] = useState(false);
    const [deletePopUp, setDeletePopUp] = useState({
        show: false,
        id: null
    });
    const [editPopUp, setEditPopUp] = useState({
        show: false,
        id: null
    });
    const dateString = post.timestamps;
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: 'numeric' }
        return new Date(dateString).toLocaleDateString('fr-FR', options)
    }
    //const dateFormatted = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'long' }).format(date);

    const handleEdit = (id) => {
        setEditPopUp({
            show: true,
            id,
        });
    }

    const handleEditConfirmed = () => {
        fetchAllPosts();
        setEditPopUp({
            show: false,
            id: null
        });
    }

    const handleEditCanceled = () => {
        setEditPopUp({
            show: false,
            id: null
        });
    };

    const handleDelete = (id) => {
        setDeletePopUp({
            show: true,
            id,
        });
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
                console.log('Le post a bien été supprimé')
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

    useEffect(() => {
        if (post.userId === userId) {
            setIsPostUser(true);
        } else {
            setIsPostUser(false)
        }
    }, [post.userId, userId])

        return (
            <div className='post--container'>
                {/* <div className='profile-picture--container'>
                    <img className='profile-picture' src={imageUrl} alt="photo de profil" />
                </div> */}
                <h3 className='post--title'> {post.title} </h3>
                <p className='post--description'>{post.description}</p>
                {post.imageUrl ? (
                <img className='post--image' src={post.imageUrl} alt={post.title} />
                ) : null }
                <p className='post-footer'>
                Posté par {post.userPseudo}, le {formatDate(dateString)}
                </p>
                {isPostUser ? (
                    <div>
                        <button className='form--btn modify-btn' onClick={() => handleEdit(post._id)}>
                        <FontAwesomeIcon icon={faPenToSquare} className='login-icon'/>
                            Modifier
                        </button>
                        {editPopUp.show && (
                            <EditPopUp 
                            postId={editPopUp.id}
                            handleEditConfirmed={handleEditConfirmed}
                            handleEditCanceled={handleEditCanceled}
                            />
                        )}
                        <button className='form--btn delete-btn' onClick={() => handleDelete(post._id)}>
                        <FontAwesomeIcon icon={faTrash} className='login-icon'/>
                            Supprimer
                        </button>
                        {deletePopUp.show && (
                            <DeletePopUp
                            handleDeleteConfirmed={handleDeleteConfirmed}
                            handleDeleteCanceled={handleDeleteCanceled}
                            />
                        )}
                    </div>
                ) : null }


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
    imageUrl: DefaultPicture,
}

export default Post