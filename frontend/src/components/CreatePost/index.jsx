import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const CreatePost = ({userId, fetchAllPosts, userPseudo}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handlePostCreation = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('imageUrl', imageUrl)
        formData.append('userId', userId)
        formData.append('userPseudo', userPseudo)

        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}api/posts`,
            withCredentials: true,
            data: formData,
          })
            .then((res) => {
                setTitle("");
                setDescription("");
                setImageUrl("");
                fetchAllPosts();
            })
            .catch((err) => {
              console.log(err);
            });
    };

    return ( 
        <div className='postcreation--container'>
            <form className='postcreation--form' onSubmit={handlePostCreation}>
            <h2>Créer un post</h2>
                <label htmlFor='title' className='postcreation--label'>Titre</label>
                <input type='text' id='title' onChange={(e) => setTitle(e.target.value)} value={title}/>
                <label htmlFor='description' className='postcreation--description'>Description</label>
                <textarea type='text' id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                <label htmlFor='image' className='postcreation--image'>Image</label>
                <input type='file' id='image' accept='image/*' name="image" onChange={(e) => setImageUrl(e.target.files[0])} />
                <button className='form--btn' type="submit">Publier</button>
            </form>
        </div>
     );
}
 
export default CreatePost;