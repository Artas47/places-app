import styled from "styled-components";

export const Image = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  /* filter: brightness(0.4); */
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  /* background-color: red !important; */
  opacity: 0;
  transition: opacity 0.7s;
  /* outline: 2px solid red; */
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  :after {
    content: "View on map";
    font-size: 1.7rem;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: absolute;
    color: #fff;
    bottom: 0;
    width: 100%;
    height: 5rem;
    background-color: rgba(0, 0, 0, 0.8);
    opacity: 0;
  }
  :hover {
    :after {
      opacity: 1;
      transition: all 0.3s ease-out;
    }
  }
`;
