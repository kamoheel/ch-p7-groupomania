import { useEffect, useState } from "react";
import axios from "axios";
import defaultProfilePicture from "../../assets/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const Comment = ({ comment, isAdmin, currentUserId, postId, fetchAllComments }) => {
    const [commentAuthor, setCommentAuthor] = useState("");
    const [authorProfile, setAuthorProfile] = useState("");
    const [isCommentAuthor, setIsCommentAuthor] = useState(false);
    const [showEditMenu, setShowEditMenu] = useState(false);
    const [commentEditPopup, setCommentEditPopup] = useState(false);
    const [newText, setNewText] = useState(`${comment.text}`);
    const dateString = comment.timestamp;
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: 'numeric', minute: 'numeric' }
        return new Date(dateString).toLocaleDateString('fr-FR', options)
    }

    const fetchAuthor = (authorId) => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/auth/${authorId}`,
            withCredentials: true,
            })
            .then((res) => {
                res.data.imageUrl && setAuthorProfile(res.data.imageUrl);
                setCommentAuthor(res.data.pseudo);
            })
            .catch((err) => {
                console.log(`Echec de récupération photo de l'auteur : ${err}`);
            });  
     }

     const handleShowEditMenu = () => {
        showEditMenu ? setShowEditMenu(false) : setShowEditMenu(true);
    }

    const handleCommentDelete = () => {
        axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_URL}api/comments/${comment._id}`,
            withCredentials: true,
            data: {
                postId: postId,
                userId: currentUserId
            }
            })
            .then((res) => {

                console.log('Le post a bien été supprimé');
                setShowEditMenu(false);
                fetchAllComments();
            })
            .catch((err) => {
                console.log(`Echec suppression de post : ${err}`);
            });
    }

    const handleShowEditPopup = () => {
        if (!commentEditPopup) {
            setCommentEditPopup(true); 
            setShowEditMenu(false);
         } else { 
                setCommentEditPopup(false);
         }
            
    }

    const handleCommentEdit = (e) => {
        e.preventDefault();
        axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API_URL}api/comments/${comment._id}`,
            withCredentials: true,
            data: {
                text: newText,
            },
            })
            .then((res) => {
                fetchAllComments();
                console.log('Le post a bien été modifié');
                setShowEditMenu(false);
                setCommentEditPopup(false);
            })
            .catch((err) => {
                console.log(`Echec modification de post : ${err}`);
            });
    }

    useEffect( () => {
        fetchAuthor(comment.commenterId);
    }, [comment.commenterId])

    useEffect( () => {
        (comment.commenterId === currentUserId) && setIsCommentAuthor(true) 
    }, [comment.commenterId, currentUserId]);

    return ( 
    <div className="key--comments" key={comment._id}>
        <div className='comment--header'> 
            <img src={authorProfile ? authorProfile : defaultProfilePicture} alt={"Avatar de " + {commentAuthor}} className='comment--profile--picture' />
            <div>
                <h3 className='comment--author'>{commentAuthor}</h3>
                <p className='comment--date'>{formatDate(dateString)}</p>
            </div>
        </div>
        <p className='comment--text'>{comment.text}</p>

        {commentEditPopup && (
        <div className="comment--edit__container">
            <div className="comment--edit">
                <form className='popup--form' onSubmit={handleCommentEdit}>
                <label htmlFor='content' className='popup--label'>Modifiez votre commentaire</label>
                <textarea 
                    type='content' 
                    id='text' 
                    className='popup--input'
                    value={newText} 
                    onChange={(e) => setNewText(e.target.value)} 
                />
                <button className='form--btn' type="submit">Enregistrer</button>
                </form>
            </div>
        </div>
        )}

        {(isCommentAuthor || isAdmin) ? 
            (
                    <div className='comment-edit-dropdown'>
                        <FontAwesomeIcon icon={faEllipsisVertical} className='menu-icon' onClick={handleShowEditMenu}/>
                        {showEditMenu && (
                            <ul className='dropdown-list'>
                                <li key={'edit' + comment._id} className='list-item list-edit' onClick={handleShowEditPopup}>
                                <FontAwesomeIcon icon={faPenToSquare} className='fa-icon'/>
                                     Modifier
                                </li>
                                
                                <li key={'delete'+ comment._id} className='list-item list-delete' onClick={() => handleCommentDelete(comment._id)}>
                                <FontAwesomeIcon icon={faTrash} className='fa-icon'/>
                                     Supprimer
                                </li>

                            </ul>
                        )} 
                    </div>
            ) : null }

    </div> );
}
 
export default Comment;