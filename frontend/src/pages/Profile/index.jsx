import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import defaultProfilePicture from "../../assets/profile.png";

const Profile = () => {
    const { id } = useParams();
    const [userPseudo, setUserPseudo] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [businessUnit, setBusinessUnit] = useState("");
    const [editToggle, setEditToggle] = useState(false);
    const [profileChanged, setProfileChanged] = useState(true);
    // const [errorTextContent, setErrorTextContent] = useState(false);

    // const textRegex = /^[A-Za-z0-9-_]+$/;

    const handleProfileEdit = (e) => {
        e.preventDefault();
        // if (!textRegex.test(businessUnit)) {
        //     setErrorTextContent(true);
        // } else {
        const profileData = new FormData()
        profileData.append('businessUnit', businessUnit)
        profileData.append('imageUrl', profilePicture)
        axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API_URL}api/auth/${id}`,
            withCredentials: true,
            data: profileData,
        })
        .then((res) => {
            setEditToggle(false);
            setProfileChanged(true);
        })
        .catch((err) => {
            console.log(`Echec de modification du profil : ${err}`);
        });
    // }
    }

    const handleEditToggle = () => {
        setEditToggle(true);
    }

    const handleEditCanceled = () => {
        setEditToggle(false);
    }

    useEffect(() => {
        if (profileChanged) {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/auth/${id}`,
            withCredentials: true,
            })
            .then((res) => {
                res.data.pseudo && setUserPseudo(res.data.pseudo);
                res.data.imageUrl && setProfilePicture(res.data.imageUrl);
                res.data.businessUnit && setBusinessUnit(res.data.businessUnit);
            })
            .catch((err) => {
                console.log(`Echec de récupération info de profil : ${err}`);
            });
        setProfileChanged(false);
        }
    }, [id, profileChanged]);

    return (
        <div className="profile--container">
            <button className="form--btn profile--edit" onClick={() => handleEditToggle()} aria-label="Modifier le profil"><FontAwesomeIcon icon={faEdit} className='profile--edit__icon'/></button>
            <h2 className="profile--caption"> Profil Groupomania </h2>
            <img key={userPseudo + "profile-picture"} src={profilePicture ? profilePicture : defaultProfilePicture} alt={"Photo de profil de " + userPseudo } className="profile--image" onClick={() => handleEditToggle()}/>
            <div className="profile--data">
                <h3 className="bold profile--name">{userPseudo}</h3>  
                <p className="bold"> {businessUnit}</p>
            </div>

            {editToggle && (
            <div className="profile--form__container">
                <form className='profile--form' onSubmit={handleProfileEdit}>
                    <div className="form--header">
                        <h3 className="form--title">Modifier le profil</h3>
                        <span className='form--close' onClick={() => handleEditCanceled()}>
                        <FontAwesomeIcon icon={faXmark} className='x-icon'/>
                        </span>
                    </div>
                    <label htmlFor='business-unit' className='profile--label'>Département de travail</label>
                    <input 
                        type='text' 
                        id='business-unit' 
                        className='profile--input'
                        value={businessUnit} 
                        onChange={(e) => setBusinessUnit(e.target.value)} 
                    />
                    {/* {errorTextContent && <div className="alert">Caractères spéciaux non autorisés</div>} */}
                    <label htmlFor='image' className='profile--label'>Image</label>
                    <input 
                        type='file' 
                        id='image' 
                        accept='image/*' 
                        name="image" 
                        className='profile--input'
                        onChange={(e) => setProfilePicture(e.target.files[0])} 
                    />
                    <button className='form--btn' type="submit">Enregistrer</button>
                </form>
            </div>
            )}
        </div>
    )


}

export default Profile