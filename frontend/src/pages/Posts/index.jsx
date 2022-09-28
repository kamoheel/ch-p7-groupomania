//import DefaultPicture from '../../assets/profile.png'
import Post from '../../components/Post'
import styled from 'styled-components'
import { Loader } from '../../utils/style/Atoms'
import { useFetch } from '../../utils/hooks'
import colors from '../../utils/style/colors'
import { Link } from 'react-router-dom'


const PostsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const PostContainer = styled.div`
    display: grid;
    gap: 24px;
    grid-template-rows: 350px 350px;
    grid-template-columns: repeat(2, 1fr);
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

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

function Posts() {
    const { data, isLoading, error } = useFetch(`http://localhost:5000/api/posts`)

    const { postsList } = data

    if(error) {
        return <span>Oups il y a un problème</span>
    }

    return (
        <PostsContainer>
            <PageTitle>Les posts</PageTitle>
            <PageSubtitle>Retrouvez ce que vos collègues ont posté</PageSubtitle>
            
                {isLoading ? (
                    <LoaderWrapper>
                        <Loader data-testid="loader" />
                    </LoaderWrapper>
                ) : (
                    <PostContainer>
                    {postsList?.map((post) => (
                        <Link key={`post-${post.id}`} to={`/post/${post.id}`}>
                            <Post
                                label={post.description}
                                picture={post.picture}
                                title={post.title}
                            />
                        </Link>
                    ))}
                    </PostContainer>
                )}
            
        </PostsContainer>
    )
}

export default Posts;