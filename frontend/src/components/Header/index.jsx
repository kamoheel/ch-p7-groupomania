import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors.js'
import Logo from '../../assets/icon-red.png'

const HeaderBanner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40px 30px;
`

const StyledImage = styled.img`
    object-fit: cover;
    height: 50px;
    max-width: 200px;
`

const StyledLink = styled(Link)`
    padding: 15px;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;
    ${(props) =>
    props.$isFullLink && `color: white; border-radius: 30px; background-color: ${colors.primary};`}
`
 
function Header() {
    return (
        <HeaderBanner>
            <StyledImage src={Logo} alt='Logo Shiny' />
            <nav>
                <StyledLink to="/" $isFullLink>Accueil</StyledLink>
                <StyledLink to="/profile">Profil</StyledLink>
                <StyledLink to="/posts">Fil d'actualité</StyledLink>
                
            </nav>
        </HeaderBanner>
    )
}

export default Header