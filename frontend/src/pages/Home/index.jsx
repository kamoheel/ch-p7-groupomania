//import DefaultPicture from '../../assets/profile.png'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Home= () => {
   

    return (
        <div>
            <h1 className='main-title'>Groupomania, le réseau social de votre entreprise</h1>
            <h2 className='main-subtitle'>Retrouvez ce que vos collègues ont posté</h2>
            
        </div>
    )
}

export default Home;