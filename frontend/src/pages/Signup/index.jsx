//import DefaultPicture from '../../assets/profile.png'
import SignupComponent from '../../components/SignupComponent'
import styled from 'styled-components'
import { useTheme } from '../../utils/hooks'
import colors from '../../utils/style/colors'
import { Link } from 'react-router-dom'


const PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const StyledLink = styled(Link)`
    padding: 15px;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;
    ${(props) =>
    props.$isFullLink && `color: white; border-radius: 30px; background-color: ${colors.primary};`}
`

function Signup() {
    const { theme } = useTheme()

    return (
        <div>
            <PageTitle theme={theme}>Créer un compte</PageTitle>
            <PageSubtitle theme={theme}>Créez un compte pour partager avec vos collègues</PageSubtitle>
            <SignupComponent />
            <p>Déjà enregistré ? Cliquez ci-dessous pour vous connecter </p>
            <StyledLink to="/login" $isFullLink>Se Connecter</StyledLink>

            
        </div>
    )
}

export default Signup;