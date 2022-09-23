//import DefaultPicture from '../../assets/profile.png'
import { useState } from 'react';
import SignupComponent from '../../components/Profile/signup'
import LoginComponent from '../../components/Profile/login'
import styled from 'styled-components'
import { useTheme } from '../../utils/hooks'
import colors from '../../utils/style/colors'
import { Link } from 'react-router-dom'
import '../../utils/style/Profile.css';

const StyledDiv = styled.div`
width: 80%;
display: flex;
background-color: ${colors.secondary};
border-radius: 30px;
margin: 5px;
`
const StyledListItem = styled.li`
    margin: 5px;
    list-style-type: none;
    cursor: pointer;
    padding: 15px;
    color: #fff;
    text-decoration: none;
    font-size: 18px;
    
    border-radius: 30px; 
`

const Profile = () => {
    const { theme } = useTheme()
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
        <StyledDiv>
            <ul>
                <StyledListItem id="register" onClick={handleModals} className={signupModal ? 'active-btn' : null}>S'inscrire</StyledListItem>
                <StyledListItem id="login" onClick={handleModals} className={loginModal ? 'active-btn' : null}>Se Connecter</StyledListItem>
            </ul>
            <StyledDiv>
            {signupModal && <SignupComponent />}
            {loginModal && <LoginComponent />}
            </StyledDiv>
            
        </StyledDiv>
    )
}

export default Profile;