import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const CreatePost = ({userId, fetchAllPosts, userPseudo, refProp}) => {
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [emptyField, setEmptyField] = useState(false)

    const handleDescriptionField = (e) => {
        setEmptyField(false);
        setDescription(e.target.value);  
    }

    const handlePostCreation = (e) => {
        e.preventDefault();
        if (description === "" && imageUrl === "") {
            setEmptyField(true);
        } else {
            const formData = new FormData()
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
                    setDescription("");
                    setImageUrl("");
                    fetchAllPosts();
                })
                .catch((err) => {
                console.log(err);
                });
        }
    };

    return ( 
        <div className='post--container' ref={refProp}>
            <form className='postcreation--form' onSubmit={handlePostCreation}>
                <h2>Créer un post</h2>
                <label htmlFor='description' className='postcreation--label'>Description</label>
                <textarea type='text' id='description' value={description} onChange={handleDescriptionField} className='postcreation--input' />
                <label htmlFor='image' className='postcreation--label'>Image</label>
                <input type='file' id='image' accept='image/*' name="image" onChange={(e) => setImageUrl(e.target.files[0])} className='postcreation--input' />
                <button className='form--btn' type="submit">Publier</button>
                {emptyField && <div className="emptyfields--alert">Veuillez remplir au moins un des champs</div>}
            </form>
        </div>
     );
}
 
export default CreatePost;