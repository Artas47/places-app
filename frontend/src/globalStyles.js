import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  html {
    box-sizing: border-box;
    font-size: 62.5%;
    overflow-y: scroll;
    overflow-x: hidden;

  @media only screen and (max-width: 75em) {
    font-size: 55%;
  }
  @media only screen and (max-width: 62.5em) {
    font-size: 50%;
  }
  @media only screen and (max-width: 37.5em) {
    font-size: 47.5%;
  }
  }
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #F3F5F6;
    height: 100%;
    width: 100vw;
    overflow-x: hidden;
  }
`;
