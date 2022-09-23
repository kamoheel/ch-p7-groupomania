import colors from '../../utils/style/colors'
import styled from 'styled-components'

export const PostDescription = styled.span`
    color: #5843e4;
    font-size: 22px;
    font-weight: bold;
`

export const PostTitle = styled.div`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-size: 22px;
  font-weight: normal;
  align-self: center;
  height: 25px;
  display: flex;
  align-items: center;
`

export const PostImage = styled.img`
    height: 150px;
    width: 150px;
    border-radius: 50%;
`
export const PostWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
    border-radius: 30px;
    width: 350px;
    transition: 200ms;
    &:hover {
        cursor: pointer;
        box-shadow: 2px 2px 10px #e2e3e9;
    }
`