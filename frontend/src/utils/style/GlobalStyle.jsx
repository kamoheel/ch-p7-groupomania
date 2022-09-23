import { createGlobalStyle } from 'styled-components'

const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: 'Lato', Helvetica, sans-serif;
    }
    body {
        background-color: #fff;
        margin: 0;
    }
`

function GlobalStyle() {

  return <StyledGlobalStyle />
}

export default GlobalStyle