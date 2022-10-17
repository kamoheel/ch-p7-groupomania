//import DefaultPicture from '../../assets/profile.png'
import { useState} from 'react';
import SignupComponent from '../../components/Log/signup';
import LoginComponent from '../../components/Log/login';

const Login = () => {
    const [signupModal, setSignupModal] = useState(false);
    const [loginModal, setLoginModal] = useState(true);


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

                <ul className='container--toggle'>
                
                    <li id="register" onClick={handleModals} className={signupModal ? 'active-btn' : null}>Inscription</li>
                    <li id="login" onClick={handleModals} className={loginModal ? 'active-btn' : null}>Connexion</li>
                </ul>
                
                <div className='container--component'>
                {signupModal && <SignupComponent />}
                {loginModal && <LoginComponent />}
                </div>
            
        </div>
    )
}

export default Login;