import React, { useState } from 'react';
import axios from 'axios';

function LoginComponent() {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = (e) => {
        e.preventDefault();

        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/login`,
            withCredentials: true,
            data: {
                email,
                password,
            }
        })
            .then((res) => {
                    localStorage.setItem("user_info", JSON.stringify(res.data));
                    window.location = '/';
                })
            .catch((err) => {
                if (err.response) {
                    //emailError.innerHTML = "Identifiants Incorrects";
                    passwordError.innerHTML = "Identifiants Incorrects";
                } else {
                console.log(err);
                }
             });
    }
            

    return (
        <div className="form-container">
            <h2 className='form-container--title'>Connexion</h2>
            <form className='form' onSubmit={handleLogin}>
                    <label className='form--label' htmlFor='email'> E-mail : <br />
                        <input 
                            className='form--input'
                            type="email" 
                            id="email" 
                            label="email" 
                            placeholder="exemple@groupomania.fr"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} 
                        /> 
                        <br />
                    </label>
                    <div className='email error'></div>
                    <br />
                    <label className='form--label' htmlFor='password'> Mot de Passe : <br />
                        <input 
                            className='form--input'
                            type="password" 
                            id="password" 
                            label="mot de passe" 
                            placeholder="Votre mot de passe"
                            onChange={(e)=>setPassword(e.target.value)}  
                            value={password}
                        /> 
                        <br />
                    </label>
                    <div className='password error'></div>
                    <br />
                    <button className='form--btn' type="submit">Se connecter</button>
            </form>
        </div>
    )
}

export default LoginComponent