import React, { useState } from 'react';
import axios from 'axios';
import { StyledDiv, PageTitle, PageSubtitle, StyledForm, StyledLabel, StyledButton} from './style';


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
            
            data: {
                email,
                password,
            }
        })
            .then((res) => {
                if (res.data.errors) {
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    window.location = '/';
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <StyledDiv>
            <PageTitle>Connexion</PageTitle>
            <PageSubtitle>Connectez vous pour voir ce que vos collègues ont posté</PageSubtitle>
            <StyledForm onSubmit={handleLogin}>
                    <StyledLabel htmlFor='email'> E-mail : <br />
                        <input 
                            type="email" 
                            id="email" 
                            label="email" 
                            onChange={(e)=>setEmail(e.target.value)} 
                            value={email} 
                        /> 
                        <br />
                    </StyledLabel>
                    <div className='email error'></div>
                    <br />
                    <StyledLabel htmlFor='password'> Mot de Passe : <br />
                        <input 
                            type="password" 
                            id="password" 
                            label="mot de passe" 
                            onChange={(e)=>setPassword(e.target.value)}  
                            value={password}
                        /> 
                        <br />
                    </StyledLabel>
                    <div className='password error'></div>
                    <br />
                    <StyledButton type="submit">Se connecter</StyledButton>
            </StyledForm>
        </StyledDiv>
    )
}

export default LoginComponent