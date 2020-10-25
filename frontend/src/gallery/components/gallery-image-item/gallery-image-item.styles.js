import styled from "styled-components";

export const Image = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  /* filter: brightness(0.4); */
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  /* background-color: red !important; */
  opacity: 0;
  transition: opacity 0.7s !important;
  /* outline: 2px solid red; */
`;
