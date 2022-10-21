import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Comment from "../Comment";
import { useEffect } from "react";

const Comments = ({ postId, userId, isAdmin, commentsToggle, pullCommentsCounter, fetchAllComments, allComments}) => {
    const [creationToggle, setCreationToggle] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const [newCommentEmpty, setNewCommentEmpty] = useState(false);
    const [errorCommentContent, setErrorCommentContent] = useState(false);
    const currentUserId = userId;

    const textareaRegex = /^[A-Za-z0-9-_!,.;?]+$/;

    const handleCommentToggle = () => {
        !creationToggle ? setCreationToggle(true) : setCreationToggle(false);
    }

    const handleCommentCreation = (e) => {
        e.preventDefault();
        if (!textareaRegex.test(commentContent)) {
            setErrorCommentContent(true);
        } else {

        if (commentContent) {
            axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_URL}api/comments/`,
                withCredentials: true,
                data: {
                    postId,
                    text: commentContent,
                },
                })
                .then((res) => {
                    fetchAllComments();
                    setCreationToggle(false);
                    setCommentContent("");
                })
                .catch((err) => {
                    console.log(`Echec d'ajout de commentaire : ${err}`);
                });
        } else {
            setNewCommentEmpty(true);
        }
    }
    }

        useEffect( () => {
            fetchAllComments();

            // commentsToggle && ;
        }, [fetchAllComments]);

    return ( 
    <div className="comments-section">
        <button className="comment--create--btn" onClick={handleCommentToggle}><FontAwesomeIcon icon={faPlus} className='create-icon'/></button>
        {creationToggle && 
            <div className="comment--creation">
                <form className='popup--form' onSubmit={handleCommentCreation}>
                <label htmlFor='content' className='popup--label'>Votre commentaire</label>
                <textarea 
                    type='content' 
                    id='text' 
                    className='popup--input'
                    value={commentContent} 
                    onChange={(e) => {setCommentContent(e.target.value); setErrorCommentContent(false)}} 
                />
                {errorCommentContent && <div className="alert">Veuillez ne pas utiliser de caractères spéciaux</div>}
                <button className='form--btn' type="submit">Enregistrer</button>
                {newCommentEmpty && <div className="alert">Veuillez remplir le champs ci-dessus.</div>}
                </form>
            </div>
        }
        <div className='post--comments'>
            {allComments.map((comment, pos) => {
                allComments.sort(function(a, b) {
                    if (a.timestamp < b.timestamp) {
                    return 1;
                    }
                    if (a.timestamp > b.timestamp) {
                    return -1;
                    }
                    return 0;
                });
            return (
            <Comment 
                comment={comment}
                isAdmin={isAdmin}
                currentUserId={currentUserId}
                postId={postId}
                key={comment._id}
                fetchAllComments={fetchAllComments}
                />
            );
        })
        }
        </div> 

    </div>
    );
}
 
export default Comments;