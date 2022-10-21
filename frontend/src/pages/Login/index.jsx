//import DefaultPicture from '../../assets/profile.png'
import { useState} from 'react';
import SignupComponent from '../../components/Log/signup';
import LoginComponent from '../../components/Log/login';

const Login = () => {
    const [signupModal, setSignupModal] = useState(false);
    const [loginModal, setLoginModal] = useState(true);
    const [signupSuccess, setSignupSuccess] = useState(false);


    const handleModals = (e) => {
        if (e.target.id === "register") {
            setLoginModal(false);
            setSignupModal(true);
        } else if (e.target.id === "login") {
            setSignupModal(false);
            setLoginModal(true);
        }
    }

    const handleSignUpSuccess = () => {
        setSignupSuccess(true);
        setSignupModal(false);
        setLoginModal(true);
    }


    return (
        <div className='container'>
                <ul className='container--toggle'>
                    <li id="login" onClick={handleModals} className={loginModal ? 'active-btn' : null}>Connexion</li>
                    <li id="register" onClick={handleModals} className={signupModal ? 'active-btn' : null}>Inscription</li>
                </ul>
                <div className='container--component'>
                    {signupModal && <SignupComponent handleSignUpSuccess={handleSignUpSuccess}/>}
                    {loginModal && (
                    <div>
                        <LoginComponent />
                        {signupSuccess && <h4 className="success">
                        Inscription réussie, veuillez vous connecter
                        </h4>}
                    </div>
                    )}
                </div> 
        </div>
    )
}

export default Login;