import PropTypes from 'prop-types';
import React, {  } from 'react';
import DefaultPicture from '../../assets/profile.png';
// import { useTheme } from '../../utils/hooks';

const Post = ({ post, fetchAllPosts, userId }) => {

        return (
            <div className='post--container'>
                {/* <div className='profile-picture--container'>
                    <img className='profile-picture' src={imageUrl} alt="photo de profil" />
                </div> */}
                <h3 className='post--title'> {post.title} </h3>
                <p className='post--description'>{post.description}</p>
                <img className='post-image' src={post.imageUrl} alt="image partagée dans le post" />

            </div>
        )
}

Post.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
}
 
Post.defaultProps = {
    title: '',
    description: '',
    imageUrl: DefaultPicture,
}

export default Post