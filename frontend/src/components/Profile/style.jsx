import colors from '../../utils/style/colors'
import styled from 'styled-components'

export const StyledDiv = styled.div`
display: flex;
flex-direction: column;
`

export const PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-bottom: 5px;
  color: #000000;
`

export const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 5px;
  color: #000000;
  `

export const StyledForm = styled.form`
    width: 80%;
    border-radius: 30px;
    color: #8186a0;
    background-color: ${colors.primary}
    text-decoration: none;
    font-size: 18px;
    margin: auto;
    display: flex;
    flex-direction: column;
`

export const StyledLabel = styled.label`
margin: 5px 0;
text-align: center;
`

export const StyledButton = styled.button`
    padding: 15px;
    margin: auto;
    width: 40%;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;
    color: white; border-radius: 30px; background-color: ${colors.primary};
`