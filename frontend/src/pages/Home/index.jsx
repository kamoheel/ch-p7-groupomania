//import DefaultPicture from '../../assets/profile.png'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Link } from 'react-router-dom'

const PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-bottom: 30px;
  color: #000000;
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
  color: #000000;
`

const StyledLink = styled(Link)`
    padding: 15px;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;
    ${(props) =>
    props.$isFullLink && `color: white; border-radius: 30px; background-color: ${colors.primary};`}
`

function Home() {

    return (
        <div>
            <PageTitle>Bienvenue sur Groupomania</PageTitle>
            <PageSubtitle>Retrouvez ce que vos collègues ont posté</PageSubtitle>
            
            <StyledLink to="/" $isFullLink>Accueil</StyledLink>
                <StyledLink to="/profile">Profil</StyledLink>
                <StyledLink to="/posts">Fil d'actualité</StyledLink>
                {/* {isLoading ? (
                    <LoaderWrapper>
                        <Loader data-testid="loader" />
                    </LoaderWrapper>
                ) : (
                    <LoginComponent />
                )} */}
            
        </div>
    )
}

export default Home;