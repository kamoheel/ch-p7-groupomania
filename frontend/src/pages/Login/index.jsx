//import DefaultPicture from '../../assets/profile.png'
import LoginComponent from '../../components/LoginComponent'
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

function Login() {
    const { theme } = useTheme()

    return (
        <div>
            <PageTitle theme={theme}>Connexion</PageTitle>
            <PageSubtitle theme={theme}>Connectez vous pour voir ce que vos collègues ont posté</PageSubtitle>
            <LoginComponent />
            <p>Nouvel utilisateur ? Cliquez ci-dessous pour créer un compte </p>
            <StyledLink to="/signup" $isFullLink>Créer un compte</StyledLink>

            
        </div>
    )
}

export default Login;