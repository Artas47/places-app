import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const GalleryItem = styled(Link)`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 0.7rem;
  overflow: hidden;
  ${(props) => {
    // console.log("props", props);
    const width = props.width;
    const height = props.height;
    console.log("width", width);
    console.log("height", height);
    if (width > 2000 && height > 1000) {
      return css`
        grid-row: span 2;
        grid-column: span 4;
      `;
    }
    if (width > 1200 && height > 800) {
      return css`
        grid-row: span 2;
        grid-column: span 2;
      `;
    } else if (width > 1200 && height < 800) {
      return css`
        grid-row: span 1;
        grid-column: span 1;
      `;
    }
  }}

  /* box-shadow: 0 2rem 2rem rgb(0, 0, 0, 0.6); */
  align-self: start;
  justify-self: start;
  visibility: ${(props) => (!props.visible ? "visible" : "hidden")};
  transition: all 1s;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  @media only screen and (max-width: 900px) {
    height: ${(props) => (props.height === 0 ? "25rem" : "100%")};
    box-shadow: 0 2rem 2rem rgb(0, 0, 0, 0.2);
    :not(:last-child) {
      margin-bottom: 0.7rem;
    }
  }
`;

export const GalleryItemImg = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  /* filter: brightness(0.4); */
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

export const ImageNotLoaded = styled.div`
  position: absolute;
  font-size: 5rem;
  /* z-index: 999; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
