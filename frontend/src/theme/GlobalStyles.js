import { createGlobalStyle } from 'styled-components';
import colors from './colors';
import { fonts } from './typography';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Italiana&family=Istok+Web:wght@400;500;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${colors.background};
    color: ${colors.text.light};
    font-family: ${fonts.secondary};
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${fonts.primary};
    font-weight: 400;
  }
`;

export default GlobalStyles;
