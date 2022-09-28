//import DefaultPicture from '../../assets/profile.png'
import { useState } from 'react';
import SignupComponent from '../../components/Log/signup'
import LoginComponent from '../../components/Log/login'

const Login = () => {
    const [signupModal, setSignupModal] = useState(true);
    const [loginModal, setLoginModal] = useState(false);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setLoginModal(false);
            setSignupModal(true);
        } else if (e.target.id === "login") {
            setSignupModal(false);
            setLoginModal(true);
        }
    }

    return (
        <div className='container'>

                <div className='container--toggle'>
                <ul>
                    <li id="register" onClick={handleModals} className={signupModal ? 'active-btn' : null}>S'inscrire</li>
                    <li id="login" onClick={handleModals} className={loginModal ? 'active-btn' : null}>Se Connecter</li>
                </ul>
                </div> 
                <div className='container--component'>
                {signupModal && <SignupComponent />}
                {loginModal && <LoginComponent />}
                </div>
            
        </div>
    )
}

export default Login;