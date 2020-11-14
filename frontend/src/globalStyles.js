import { createGlobalStyle } from "styled-components";
import img from "./resources/images/e.jpg";

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
    // overflow: -moz-scrollbars-vertical; 
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
    /* background-color: #d1d8e0;
    background-color: #000;
    background-image: url(${img});
    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${img});
    background-size: cover;
    background-attachment: fixed; */
    background-color: #F3F5F6;
    height: 100%;
    width: 100vw;
    overflow-x: hidden;
  }
`;
