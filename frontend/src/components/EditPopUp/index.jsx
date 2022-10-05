import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const EditPopUp = ({postId, handleEditConfirmed, handleEditCanceled}) => {
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newImageUrl, setNewImageUrl] = useState("");

    function handlePostEdit(e) {
        e.preventDefault();
        const formData = new FormData()
        newTitle && formData.append('title', newTitle)
        newDescription && formData.append('description', newDescription)
        newImageUrl && formData.append('imageUrl', newImageUrl)

        axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
            withCredentials: true,
            data: formData,
            })
            .then((res) => {
                handleEditConfirmed();
                console.log('Le post a bien été modifié')
            })
            .catch((err) => {
                console.log(`Echec modification de post : ${err}`);
            });
    }
    
    return ( 
        <div className="edit-popup">
            <h2 className="title">Modifier le post</h2>
            <div className='x-icon' onClick={handleEditCanceled}>
                <FontAwesomeIcon icon={faXmark} className='login-icon'/>
            </div>
            <form onSubmit={handlePostEdit}>
                <label htmlFor='title' className='postcreation--label'>Titre</label>
                <input 
                    type='text' 
                    id='title' 
                    //defaultValue={post.title} 
                    onChange={(e) => setNewTitle(e.target.value)} 
                    value={newTitle}
                />
                <label htmlFor='description' className='postcreation--description'>Description</label>
                <textarea 
                    type='text' 
                    id='description' 
                    //defaultValue={post.description} 
                    value={newDescription} 
                    onChange={(e) => setNewDescription(e.target.value)} 
                />
                <label htmlFor='image' className='postcreation--image'>Image</label>
                <input 
                    type='file' 
                    id='image' 
                    accept='image/*' 
                    name="image" 
                    //defaultValue={post.imageUrl} 
                    onChange={(e) => setNewImageUrl(e.target.files[0])} 
                />
                <button className='form--btn' type="submit">Modifier</button>
            </form>
        </div>
     );
}
 
export default EditPopUp;