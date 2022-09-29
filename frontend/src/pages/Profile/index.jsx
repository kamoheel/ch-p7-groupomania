import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
    const { id } = useParams();
    const [userPseudo, setUserPseudo] = useState("");
    
    useEffect(() => {
        if(localStorage.getItem("user_info")) {
            setUserPseudo(
                JSON.parse(localStorage.getItem("user_info")).userPseudo
            );
        }
    }, []);

    return (
        <h2> Profil Groupomania {'de ' + userPseudo }</h2>
    )


}

export default Profile