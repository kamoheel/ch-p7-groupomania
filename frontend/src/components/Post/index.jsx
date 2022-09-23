import PropTypes from 'prop-types'
import { Component } from 'react'
import DefaultPicture from '../../assets/profile.png'
// import { useTheme } from '../../utils/hooks'
import { PostImage, PostDescription, PostTitle, PostWrapper } from './style'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
           // isFavorite: false,
        }
    }

//    setIsFavorite = () => {
//         this.setState({ isFavorite: !this.state.isFavorite })
//       }

    render() {
        const {theme, description, picture, title} = this.props
        //const { isFavorite } = this.state
        //const star = isFavorite ? '⭐️' : ''

        return (
            // add onClick={this.setIsFavorite} to the CardWrapper
            <PostWrapper theme={theme}>
                <PostTitle theme={theme}>
                {title}
                    {/* {star} {title} {star} */}
                </PostTitle>
                <PostDescription theme={theme}>{description}</PostDescription>
                <PostImage src={picture} alt="profil" />

            </PostWrapper>
        )
    }
}

// function Post({ label, title, picture }) {
//     const { theme } = useTheme()
//     const [isFavorite, setIsFavorite] = useState(false)
//     const star = isFavorite ? '⭐️' : ''

//     return (
//         <CardWrapper theme={theme} onClick={() => setIsFavorite(!isFavorite)}>
//             <CardLabel theme={theme}>{label}</CardLabel>
//             <CardImage src={picture} alt="freelance" />
//             <CardTitle theme={theme}>
//                 {star} {title} {star}
//             </CardTitle>
//         </CardWrapper>
//     )
// }

Post.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
}
 
Post.defaultProps = {
    title: '',
    description: '',
    picture: DefaultPicture,
    theme: 'light'
}
export default Post